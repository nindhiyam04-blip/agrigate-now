/**
 * Real authentication helpers backed by the Lovable Cloud database.
 * Resolves the signed-in user's role, profile and role-specific record.
 */
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Role, SessionUser } from "@/lib/app-store";

export const PENDING_ROLE_KEY = "agrilink-pending-role";
export const POST_AUTH_KEY = "agrilink-post-auth";

export const isRole = (v: unknown): v is Role =>
  v === "farmer" || v === "dealer" || v === "driver";

export function rememberRole(role: Role) {
  try {
    localStorage.setItem(PENDING_ROLE_KEY, role);
    sessionStorage.setItem(POST_AUTH_KEY, "1");
  } catch {
    /* storage unavailable */
  }
}

function readPendingRole(): Role | null {
  try {
    const v = localStorage.getItem(PENDING_ROLE_KEY);
    return isRole(v) ? v : null;
  } catch {
    return null;
  }
}

/** Creates the role row and its farmer/dealer/driver record if missing. */
async function ensureRoleRecords(userId: string, role: Role) {
  await supabase.from("user_roles").insert({ user_id: userId, role }).select();

  const table = ({ farmer: "farmers", dealer: "dealers", driver: "drivers" } as const)[role];
  const { data: existing } = await supabase
    .from(table)
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();
  if (!existing) {
    await supabase.from(table).insert({ user_id: userId } as never);
  }
}

/** Loads (and if needed provisions) the app session for an authenticated user. */
export async function resolveSessionUser(authUser: User): Promise<SessionUser | null> {
  const { data: roleRows } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", authUser.id);

  let role = (roleRows?.[0]?.role as Role | undefined) ?? null;
  const wanted = readPendingRole();

  if (!role) {
    const chosen =
      wanted ?? (isRole(authUser.user_metadata?.role) ? (authUser.user_metadata.role as Role) : null);
    if (!chosen) return null;
    await ensureRoleRecords(authUser.id, chosen);
    role = chosen;
  } else if (wanted && wanted !== role) {
    // Role already claimed — keep the original one.
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, location, avatar_url")
    .eq("id", authUser.id)
    .maybeSingle();

  const name =
    profile?.full_name?.trim() ||
    (authUser.user_metadata?.full_name as string | undefined) ||
    authUser.email?.split("@")[0] ||
    "AgriLink user";

  return {
    id: authUser.id,
    name,
    email: authUser.email ?? "",
    phone: profile?.phone ?? "",
    role,
    location: profile?.location ?? "",
    avatar: name.slice(0, 2).toUpperCase(),
  };
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  if (error) {
    if (error.message.toLowerCase().includes("invalid login credentials")) {
      throw new Error("Incorrect email or password.");
    }
    if (error.message.toLowerCase().includes("email not confirmed")) {
      throw new Error("Confirm your email first — check your inbox for the link.");
    }
    throw error;
  }
  // Never treat a missing session as a successful sign-in.
  if (!data.session || !data.user) {
    throw new Error("Sign-in failed — please try again.");
  }
  return data.session;
}

export async function signUpWithEmail(opts: {
  email: string;
  password: string;
  fullName: string;
  role: Role;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: opts.email.trim().toLowerCase(),
    password: opts.password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/${opts.role}`,
      data: { full_name: opts.fullName, role: opts.role },
    },
  });
  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("weak") || msg.includes("pwned")) {
      throw new Error("That password is too common — pick a stronger, unique one.");
    }
    if (msg.includes("already registered") || msg.includes("already been registered")) {
      throw new Error("An account with this email already exists — sign in instead.");
    }
    if (msg.includes("invalid") && msg.includes("email")) {
      throw new Error("Enter a valid email address.");
    }
    throw error;
  }
  return { needsConfirmation: !data.session };
}

