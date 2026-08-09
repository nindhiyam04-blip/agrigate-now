import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type Role, useApp } from "@/lib/app-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — AgriLink" },
      { name: "description", content: "Sign in to AgriLink and access your portal." },
      { property: "og:title", content: "AgriLink Login" },
      { property: "og:description", content: "Secure login for farmer, dealer, and driver portals." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const searchRole =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("role")
          : null;
      const selectedRole =
        searchRole === "farmer" || searchRole === "dealer" || searchRole === "driver"
          ? (searchRole as Role)
          : undefined;

      const role = await login(email, password, selectedRole);
      navigate({ to: `/${role}` });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-5 py-10">
      <div className="rounded-3xl border border-muted/30 bg-background/80 p-8 shadow-lg">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Login</p>
          <h1 className="mt-3 text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Sign in to access your AgriLink dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full rounded-xl border border-muted/30 bg-background px-4 py-2 text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full gradient-primary text-primary-foreground"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm font-medium text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}