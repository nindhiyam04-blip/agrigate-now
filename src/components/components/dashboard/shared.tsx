// @ts-nocheck
/** Shared dashboard chrome: role header, sign-in guard and profile editor. */
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, GlassCard, Stars } from "@/components/ui-kit";
import { roleMeta, useApp, type Role } from "@/lib/app-store";

export function SignInGate({ role }: { role: Role }) {
  return (
    <div className="mx-auto max-w-md px-5 pt-20 text-center">
      <GlassCard className="rounded-3xl p-8">
        <h1 className="text-2xl font-bold">{roleMeta[role].label} dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to the {roleMeta[role].label.toLowerCase()} portal to continue.
        </p>
        <Button
          asChild
          className="mt-6 w-full rounded-full gradient-primary text-primary-foreground"
        >
          <Link to="/auth/$role" params={{ role }}>
            Go to login
          </Link>
        </Button>
      </GlassCard>
    </div>
  );
}

export function DashboardHeader({ subtitle }: { subtitle: string }) {
  const { user } = useApp();
  if (!user) return null;
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl gradient-primary text-lg font-bold text-primary-foreground">
          {user.avatar}
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold sm:text-2xl">{user.name}</h1>
          <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <Stars value={4.8} />
        <p className="text-xs text-muted-foreground">{user.location}</p>
      </div>
    </header>
  );
}

export function ProfileTab() {
  const { user, updateProfile } = useApp();
  const [form, setForm] = useState(user);
  if (!user || !form) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <GlassCard className="rounded-3xl">
        <h3 className="text-lg font-semibold">Edit profile</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <Input
              className="rounded-xl"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Phone">
            <Input
              className="rounded-xl"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
          <Field label="Email">
            <Input
              className="rounded-xl"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label="Location">
            <Input
              className="rounded-xl"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </Field>
        </div>
        <Button
          className="mt-5 rounded-full gradient-primary text-primary-foreground"
          onClick={() => {
            updateProfile(form);
            toast.success("Profile updated");
          }}
        >
          Save changes
        </Button>
      </GlassCard>

      <GlassCard className="rounded-3xl">
        <h3 className="text-lg font-semibold">Verification & trust</h3>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex justify-between">
            <span className="text-muted-foreground">Aadhaar / KYC</span>
            <span className="font-semibold text-success">Verified</span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Bank account</span>
            <span className="font-semibold text-success">Linked</span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Rating</span>
            <Stars value={4.8} />
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Member since</span>
            <span className="font-semibold">Mar 2024</span>
          </li>
        </ul>
      </GlassCard>
    </div>
  );
}

export function ReviewList() {
  const reviews = [
    { by: "Green Valley Traders", text: "Clean grading, delivered on time.", stars: 5 },
    { by: "FreshCart Wholesale", text: "Good quality, packing could improve.", stars: 4 },
    { by: "Ravi Kumar (Driver)", text: "Loading was quick and organised.", stars: 5 },
  ];
  return (
    <GlassCard className="rounded-3xl">
      <h3 className="text-lg font-semibold">Ratings & reviews</h3>
      <ul className="mt-4 space-y-4">
        {reviews.map((r) => (
          <li key={r.by} className="rounded-2xl bg-muted/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-sm font-semibold">{r.by}</p>
              <Stars value={r.stars} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
