import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { roleMeta, type Role } from "@/lib/app-store";

const roles: Role[] = ["farmer", "dealer", "driver"];

export const Route = createFileRoute("/auth/$role")({
  head: ({ params }) => {
    const label = roleMeta[(params.role as Role) ?? "farmer"]?.label ?? "Portal";
    return {
      meta: [
        { title: `${label} Login — AgriLink` },
        { name: "description", content: `Use the central login page to access the ${label} portal.` },
        { property: "og:title", content: `${label} Login — AgriLink` },
        { property: "og:description", content: `This portal is handled through the central login flow.` },
      ],
    };
  },
  component: AuthPage,
});

function AuthPage() {
  const { role } = Route.useParams();
  const navigate = useNavigate();
  const activeRole = (roles.includes(role as Role) ? role : "farmer") as Role;

  // Redirect immediately to the central login page, preserving role in the search params.
  // This removes legacy/demo auth UI and forwards users to the new flow.
  useEffect(() => {
    navigate({ to: "/login", search: { role: activeRole }, replace: true });
  }, [navigate, activeRole]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-center text-sm text-muted-foreground">Redirecting to the login page…</p>
    </div>
  );
}
