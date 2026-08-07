/** Home page: agricultural hero, portal chooser and feature highlights. */
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeIndianRupee,
  CloudSun,
  Languages,
  MapPinned,
  ShieldCheck,
  Sprout,
  Star,
  Truck,
  Users,
} from "lucide-react";
import heroImg from "@/assets/hero-farm.jpg";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui-kit";
import { roleMeta, useApp } from "@/lib/app-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriLink — Farm to Dealer Marketplace" },
      {
        name: "description",
        content:
          "Farmers list crops, dealers buy in bulk and drivers deliver. Secure payments, live tracking and Tamil + English support.",
      },
      { property: "og:title", content: "AgriLink — Farm to Dealer Marketplace" },
      {
        property: "og:description",
        content:
          "Sell your harvest at a fair price. One marketplace for farmers, dealers and drivers.",
      },
    ],
  }),
  component: Home,
});

const roleIcons = { farmer: Sprout, dealer: BadgeIndianRupee, driver: Truck } as const;

function Home() {
  const { t, lang, crops } = useApp();

  return (
    <div className="px-3 pt-4">
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]">
        <img
          src={heroImg}
          alt="Farmer harvesting crops at sunrise with a delivery truck on the field road"
          width={1920}
          height={1088}
          className="h-[520px] w-full object-cover sm:h-[600px]"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-6 sm:px-12">
            <div className="max-w-2xl rise-in">
              <span className="glass inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
                {t("hero.badge")}
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight text-primary-foreground drop-shadow sm:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-4 max-w-xl text-base text-primary-foreground/90 sm:text-lg">
                {t("hero.subtitle")}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full gradient-primary px-7 text-primary-foreground shadow-lg"
                >
                  <Link to="/auth/$role" params={{ role: "farmer" }}>
                    {t("hero.cta")}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="rounded-full px-7">
                  <Link to="/about">Learn more</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 hidden sm:block">
          <GlassCard className="float-slow w-56 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Live listings</p>
            <p className="mt-1 text-3xl font-bold">{crops.length}</p>
            <p className="text-xs text-muted-foreground">across 6 districts today</p>
          </GlassCard>
        </div>
      </section>

      {/* Portals */}
      <section className="mx-auto mt-14 max-w-6xl px-2">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Three portals, one marketplace</h2>
          <p className="mt-2 text-muted-foreground">
            Pick the portal that matches your role. Each has its own login and dashboard.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {(Object.keys(roleMeta) as Array<keyof typeof roleMeta>).map((role, i) => {
            const Icon = roleIcons[role];
            return (
              <GlassCard key={role} className="rise-in" style={{ animationDelay: `${i * 90}ms` }}>
                <span className="grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold">
                  {lang === "ta" ? roleMeta[role].labelTa : roleMeta[role].label} Portal
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{roleMeta[role].blurb}</p>
                <Button asChild className="mt-5 w-full rounded-full" variant="secondary">
                  <Link to="/auth/$role" params={{ role }}>
                    Continue as {roleMeta[role].label}
                  </Link>
                </Button>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto mt-16 max-w-6xl px-2">
        <h2 className="text-center text-3xl font-bold">Everything the chain needs</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <GlassCard key={f.title} className="rounded-2xl">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                  <f.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto mt-16 max-w-6xl px-2">
        <GlassCard className="grid gap-6 rounded-3xl p-8 text-center sm:grid-cols-4">
          {[
            ["12,400+", "Farmers onboarded"],
            ["3,100+", "Verified dealers"],
            ["₹48 Cr", "Traded this season"],
            ["4.8/5", "Average rating"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="text-3xl font-black text-gradient">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </GlassCard>
      </section>
    </div>
  );
}

const features = [
  {
    icon: Sprout,
    title: "Crop listings",
    body: "Upload produce with photos, quantity, harvest date and price per kg or ton.",
  },
  {
    icon: Truck,
    title: "Transport built in",
    body: "Request a driver from the listing; drivers accept and share live status.",
  },
  {
    icon: ShieldCheck,
    title: "Secure payments",
    body: "Escrow-style payment flow with clear paid / pending states for every order.",
  },
  {
    icon: CloudSun,
    title: "AI weather alerts",
    body: "Field-level rain and heat warnings before your harvest window.",
  },
  {
    icon: MapPinned,
    title: "Location filters",
    body: "Dealers filter by crop, price, quantity and district in one search bar.",
  },
  {
    icon: Languages,
    title: "Tamil + English",
    body: "Switch language anytime from the menu — the whole app follows.",
  },
  {
    icon: Star,
    title: "Ratings & reviews",
    body: "Every farmer, dealer and driver carries a public trust score.",
  },
  {
    icon: Users,
    title: "Direct contact",
    body: "Call or chat between farmer, dealer and driver without middlemen.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Price prediction",
    body: "Upcoming: mandi price forecasts so you sell on the best day.",
  },
];
