import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeIndianRupee, Sprout, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, GlassCard } from "@/components/ui-kit";
import { roleMeta, useApp, type Role } from "@/lib/app-store";

const roles: Role[] = ["farmer", "dealer", "driver"];
const roleIcons = { farmer: Sprout, dealer: BadgeIndianRupee, driver: Truck } as const;

export const Route = createFileRoute("/auth/$role")({
  head: ({ params }) => {
    const label = roleMeta[(params.role as Role) ?? "farmer"]?.label ?? "Portal";
    return {
      meta: [
        { title: `${label} Login — AgriLink` },
        {
          name: "description",
          content: `Sign in to the AgriLink ${label} portal with Google or mobile OTP.`,
        },
        { property: "og:title", content: `${label} Login — AgriLink` },
        { property: "og:description", content: `Access your AgriLink ${label} dashboard.` },
      ],
    };
  },
  component: AuthPage,
});

function AuthPage() {
  const { role } = Route.useParams();
  const navigate = useNavigate();
  const activeRole = (roles.includes(role as Role) ? role : "farmer") as Role;
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
      </div>

      <GlassCard className="w-full rounded-3xl p-6 sm:p-8 lg:max-w-md">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl gradient-primary text-primary-foreground">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="font-semibold">Role-specific auth is now centralized</p>
            <p className="text-xs text-muted-foreground">Use the login or registration pages to continue.</p>
          </div>
        </div>

        <div className="grid gap-3">
          <Button asChild className="w-full rounded-full gradient-primary text-primary-foreground">
            <Link to="/login">Go to Login</Link>
          </Button>
          <Button asChild className="w-full rounded-full border border-border bg-background text-muted-foreground hover:bg-muted">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.8l7.8 6.1C12.3 13.9 17.6 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.3z"
      />
      <path
        fill="#FBBC05"
        d="M10.4 28.1a14.6 14.6 0 010-9.2l-7.8-6.1a23.5 23.5 0 000 21.4l7.8-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 47.5c6.2 0 11.5-2 15.4-5.5l-7.5-5.8c-2.1 1.4-4.8 2.3-7.9 2.3-6.4 0-11.7-4.4-13.6-10.4l-7.8 6.1C6.5 42.1 14.6 47.5 24 47.5z"
      />
    </svg>
  );
}
