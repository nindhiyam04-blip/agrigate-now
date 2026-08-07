/** Role-specific login page: Google, mobile OTP (UI) and create account. */
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, BadgeIndianRupee, Smartphone, Sprout, Truck } from "lucide-react";
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
  const activeRole = (roles.includes(role as Role) ? role : "farmer") as Role;
  const { login, pushNotification } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const enter = (method: string) => {
    login(activeRole, name);
    pushNotification(
      "Signed in",
      `Welcome to the ${roleMeta[activeRole].label} portal via ${method}.`,
    );
    toast.success(`Signed in as ${roleMeta[activeRole].label}`);
    navigate({ to: `/${activeRole}` });
  };

  const Icon = roleIcons[activeRole];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 pt-10 lg:flex-row lg:items-center">
      <div className="flex-1">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
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
            <p className="text-xs text-muted-foreground">Demo mode — no real credentials needed</p>
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full justify-center gap-3 rounded-full py-6 text-sm font-semibold"
          onClick={() => enter("Google")}
        >
          <GoogleMark /> Continue with Google
        </Button>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <Tabs defaultValue="otp">
          <TabsList className="grid w-full grid-cols-2 rounded-full">
            <TabsTrigger value="otp" className="rounded-full">
              Mobile OTP
            </TabsTrigger>
            <TabsTrigger value="create" className="rounded-full">
              Create account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="otp" className="mt-4 space-y-3">
            <Field label="Mobile number">
              <Input placeholder="+91 98400 00000" inputMode="tel" className="rounded-xl" />
            </Field>
            {otpSent && (
              <Field label="Enter 6-digit OTP">
                <Input
                  placeholder="• • • • • •"
                  inputMode="numeric"
                  className="rounded-xl tracking-[0.5em]"
                />
              </Field>
            )}
            <Button
              className="w-full rounded-full gradient-primary text-primary-foreground"
              onClick={() =>
                otpSent ? enter("mobile OTP") : (setOtpSent(true), toast("OTP sent (demo: 123456)"))
              }
            >
              <Smartphone className="size-4" /> {otpSent ? "Verify & continue" : "Send OTP"}
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
            <Field label="Mobile number">
              <Input placeholder="+91 98400 00000" inputMode="tel" className="rounded-xl" />
            </Field>
            <Field label="District">
              <Input placeholder="Thanjavur" className="rounded-xl" />
            </Field>
            <Button
              className="w-full rounded-full gradient-primary text-primary-foreground"
              onClick={() => enter("new account")}
            >
              Create {roleMeta[activeRole].label} account
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
