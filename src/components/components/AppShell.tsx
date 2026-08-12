/**
 * AppShell — glass header (logo left / app name center / hamburger right),
 * slide-out navigation menu, notifications, dark mode + language toggles
 * and the shared footer.
 */
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Info,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  MessageSquareHeart,
  Moon,
  PhoneCall,
  ScrollText,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useApp } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout, t, lang, setLang, dark, toggleDark, notifications, markAllRead } = useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  const menuItems = [
    { to: "/about", label: t("nav.about"), icon: Info },
    { to: "/feedback", label: t("nav.feedback"), icon: MessageSquareHeart },
    { to: "/contact", label: t("nav.contact"), icon: PhoneCall },
    { to: "/privacy", label: t("nav.privacy"), icon: ShieldCheck },
    { to: "/terms", label: t("nav.terms"), icon: ScrollText },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 px-3 pt-3">
        <div className="glass mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-full px-3 py-2 sm:px-5">
          {/* Logo — left */}
          <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="AgriLink home">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-sm">
              <Leaf className="size-5" />
            </span>
          </Link>

          {/* App name — center */}
          <Link to="/" className="min-w-0 text-center">
            <span className="block truncate font-display text-lg font-bold tracking-tight sm:text-xl">
              Agri<span className="text-gradient">Link</span>
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
              {t("hero.badge")}
            </span>
          </Link>

          {/* Actions + hamburger — right */}
          <div className="flex shrink-0 items-center gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full"
                  aria-label={t("common.notifications")}
                  onClick={markAllRead}
                >
                  <Bell className="size-5" />
                  {unread > 0 && (
                    <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 rounded-2xl p-0">
                <p className="border-b px-4 py-3 text-sm font-semibold">
                  {t("common.notifications")}
                </p>
                <ul className="max-h-80 divide-y overflow-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className="px-4 py-3">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.body}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{n.time}</p>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open menu">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass w-[300px] border-l-0 sm:w-[340px]">
                <SheetHeader>
                  <SheetTitle className="font-display text-xl">{t("nav.menu")}</SheetTitle>
                </SheetHeader>

                <nav className="mt-2 flex flex-col gap-1 px-4">
                  <MenuLink
                    to="/"
                    icon={Leaf}
                    label={t("nav.home")}
                    onNavigate={() => setOpen(false)}
                  />
                  {user && (
                    <MenuLink
                      to={`/${user.role}`}
                      icon={LayoutDashboard}
                      label={t("common.dashboard")}
                      onNavigate={() => setOpen(false)}
                    />
                  )}
                  {menuItems.map((m) => (
                    <MenuLink
                      key={m.to}
                      to={m.to}
                      icon={m.icon}
                      label={m.label}
                      onNavigate={() => setOpen(false)}
                    />
                  ))}
                  {user && (
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                        navigate({ to: "/" });
                      }}
                      className="mt-2 flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                      <LogOut className="size-4" />
                      {t("nav.logout")}
                    </button>
                  )}
                </nav>

                <div className="mt-6 space-y-3 px-4">
                  <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-3 py-2">
                    <span className="text-sm font-medium">Dark mode</span>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                      onClick={toggleDark}
                    >
                      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-3 py-2">
                    <span className="text-sm font-medium">Language</span>
                    <div className="flex gap-1">
                      {(["en", "ta"] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => setLang(l)}
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                            lang === l
                              ? "gradient-primary text-primary-foreground"
                              : "bg-background text-muted-foreground",
                          )}
                        >
                          {l === "en" ? "EN" : "தமிழ்"}
                        </button>
                      ))}
                    </div>
                  </div>
                  {!user && (
                    <Button
                      className="w-full rounded-full gradient-primary text-primary-foreground"
                      onClick={() => {
                        setOpen(false);
                        navigate({ to: "/auth/$role", params: { role: "farmer" } });
                      }}
                    >
                      {t("common.login")}
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-16 border-t bg-card/40 py-8">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 text-sm text-muted-foreground sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <p>© 2026 AgriLink — Farm to Dealer Marketplace. Built for Indian agri supply chains.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-primary">
              {t("nav.privacy")}
            </Link>
            <Link to="/terms" className="hover:text-primary">
              {t("nav.terms")}
            </Link>
            <Link to="/contact" className="hover:text-primary">
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MenuLink({
  to,
  icon: Icon,
  label,
  onNavigate,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}
