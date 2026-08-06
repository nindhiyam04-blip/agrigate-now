/** Role-specific login page: Google sign-in, email sign-in and create account. */
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, BadgeIndianRupee, Loader2, Sprout, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, GlassCard } from "@/components/ui-kit";
import { roleMeta, useApp, type Role } from "@/lib/app-store";
import { rememberRole, signInWithEmail, signUpWithEmail } from "@/lib/auth";

const roles: Role[] = ["farmer", "dealer", "driver"];
const roleIcons = { farmer: Sprout, dealer: BadgeIndianRupee, driver: Truck } as const;


export const Route = createFileRoute("/auth/$role")({
  head: ({ params }) => {
    const label = roleMeta[(params.role as Role) ?? "farmer"]?.label ?? "Portal";
    return {
      meta: [
        { title: `${label} Login — AgriLink` },
        { name: "description", content: `Sign in to the AgriLink ${label} portal with Google or mobile OTP.` },
        { property: "og:title", content: `${label} Login — AgriLink` },
        { property: "og:description", content: `Access your AgriLink ${label} dashboard.` },
      ],
    };
  },
  component: AuthPage,
});

function AuthPage() {
  const { role } = Route.useParams();
  const activeRole = (roles.includes(role as Role) ? role : "farmer") as Role;
  const { user, authLoading } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  // Already signed in → go to the portal.
  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: `/${user.role}`, replace: true });
    }
  }, [authLoading, user, navigate]);



  const emailSignIn = async () => {
    if (!email || !password) return toast.error("Enter your email and password");
    rememberRole(activeRole);
    setBusy(true);
    try {
      await signInWithEmail(email, password);
      toast.success("Signed in");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  const createAccount = async () => {
    if (!name.trim() || !email || password.length < 6) {
      return toast.error("Name, email and a 6+ character password are required");
    }
    rememberRole(activeRole);
    setBusy(true);
    try {
      const { needsConfirmation } = await signUpWithEmail({
        email,
        password,
        fullName: name.trim(),
        role: activeRole,
      });
      if (needsConfirmation) {
        toast.success("Check your email to confirm your account, then sign in.");
      } else {
        toast.success(`Welcome to the ${roleMeta[activeRole].label} portal`);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not create the account");
    } finally {
      setBusy(false);
    }
  };

  const Icon = roleIcons[activeRole];


  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 pt-10 lg:flex-row lg:items-center">
      <div className="flex-1">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Back home
        </Link>
        <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
          {roleMeta[activeRole].label} <span className="text-gradient">Portal</span>
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">{roleMeta[activeRole].blurb}</p>

        <div className="mt-7 flex flex-wrap gap-2">
          {roles.map((r) => (
            <Link
              key={r}
              to="/auth/$role"
              params={{ role: r }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                r === activeRole
                  ? "gradient-primary text-primary-foreground shadow"
                  : "glass-soft text-muted-foreground hover:text-primary"
              }`}
            >
              {roleMeta[r].label}
            </Link>
          ))}
        </div>
      </div>

      <GlassCard className="w-full rounded-3xl p-6 sm:p-8 lg:max-w-md">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl gradient-primary text-primary-foreground">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="font-semibold">Sign in to continue</p>
            <p className="text-xs text-muted-foreground">
              Your {roleMeta[activeRole].label.toLowerCase()} account is created on first sign-in
            </p>
          </div>
        </div>

        <Tabs defaultValue="signin">

          <TabsList className="grid w-full grid-cols-2 rounded-full">
            <TabsTrigger value="signin" className="rounded-full">
              Sign in
            </TabsTrigger>
            <TabsTrigger value="create" className="rounded-full">
              Create account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-4 space-y-3">
            <Field label="Email">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="rounded-xl"
              />
            </Field>
            <Field label="Password">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="rounded-xl"
              />
            </Field>
            <Button
              className="w-full rounded-full gradient-primary text-primary-foreground"
              disabled={busy}
              onClick={() => void emailSignIn()}
            >
              {busy && <Loader2 className="size-4 animate-spin" />} Sign in
            </Button>
          </TabsContent>

          <TabsContent value="create" className="mt-4 space-y-3">
            <Field label="Full name">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-xl"
              />
            </Field>
            <Field label="Email">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="rounded-xl"
              />
            </Field>
            <Field label="Password">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="At least 6 characters"
                className="rounded-xl"
              />
            </Field>
            <Button
              className="w-full rounded-full gradient-primary text-primary-foreground"
              disabled={busy}
              onClick={() => void createAccount()}
            >
              {busy && <Loader2 className="size-4 animate-spin" />} Create{" "}
              {roleMeta[activeRole].label} account
            </Button>
          </TabsContent>
        </Tabs>


        <p className="mt-5 text-center text-xs text-muted-foreground">
          By continuing you agree to our{" "}
          <Link to="/terms" className="text-primary underline-offset-2 hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </GlassCard>
    </div>
  );
}

