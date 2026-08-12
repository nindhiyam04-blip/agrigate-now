import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Role } from "@/lib/app-store";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — AgriLink" },
      { name: "description", content: "Create your AgriLink account." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("farmer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            fullName: fullName.trim(),
            role,
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error("Signup failed");

      setSuccess(true);
      setTimeout(() => navigate({ to: "/login" }), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-md px-5 py-10 text-center">
        <h1 className="text-2xl font-bold text-foreground">Account created!</h1>
        <p className="mt-3 text-sm text-muted-foreground">Redirecting you to login...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 py-10">
      <div className="rounded-3xl border border-muted/30 bg-background/80 p-8 shadow-lg">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Sign Up</p>
          <h1 className="mt-3 text-3xl font-bold text-foreground">Create account</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Join AgriLink as a farmer, dealer, or driver.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-xl border border-muted/30 bg-background px-4 py-2 text-sm"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-muted/30 bg-background px-4 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl border border-muted/30 bg-background px-4 py-2 text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">I am a</label>
            <div className="grid grid-cols-3 gap-2">
              {(["farmer", "dealer", "driver"] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`rounded-xl border px-3 py-2 text-sm capitalize ${
                    role === r
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-muted/30 text-muted-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full gradient-primary text-primary-foreground"
          >
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-medium text-primary hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
