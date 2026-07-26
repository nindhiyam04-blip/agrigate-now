/** Dealer dashboard: browse & filter crops, buy, book drivers, track delivery. */
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CreditCard, Crown, MapPin, Phone, Search, ShoppingCart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, GlassCard, Pill, SectionTitle, StatCard, Stars } from "@/components/ui-kit";
import { DashboardHeader, ProfileTab, ReviewList, SignInGate } from "@/components/dashboard/shared";
import { TransportForm } from "@/routes/farmer";
import { currency, useApp } from "@/lib/app-store";

export const Route = createFileRoute("/dealer")({
  head: () => ({
    meta: [
      { title: "Dealer Dashboard — AgriLink" },
      { name: "description", content: "Browse and filter crops, buy in bulk, book drivers and track deliveries." },
      { property: "og:title", content: "Dealer Dashboard — AgriLink" },
      { property: "og:description", content: "Source produce directly from verified farmers." },
    ],
  }),
  component: DealerDashboard,
});

function DealerDashboard() {
  const { user, crops, orders, buyCrop, addRequest, pushNotification, lang } = useApp();
  const [q, setQ] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [minQty, setMinQty] = useState("");
  const [place, setPlace] = useState("");

  const filtered = useMemo(
    () =>
      crops.filter(
        (c) =>
          (c.name + c.nameTa).toLowerCase().includes(q.toLowerCase()) &&
          c.price <= maxPrice &&
          (!minQty || c.quantity >= Number(minQty)) &&
          c.location.toLowerCase().includes(place.toLowerCase()),
      ),
    [crops, q, maxPrice, minQty, place],
  );

  if (!user || user.role !== "dealer") return <SignInGate role="dealer" />;

  const spend = orders.reduce((s, o) => s + o.amount, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pt-8">
      <DashboardHeader subtitle="Dealer portal · Wholesale sourcing" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Available lots" value={String(crops.length)} hint="matching your region" icon={<ShoppingCart className="size-5" />} />
        <StatCard label="Orders" value={String(orders.length)} hint="this season" icon={<CreditCard className="size-5" />} />
        <StatCard label="Spend" value={currency(spend)} hint="gross procurement" icon={<CreditCard className="size-5" />} />
        <StatCard label="Plan" value="Growth" hint="renews 12 Aug 2026" icon={<Crown className="size-5" />} />
      </div>

      <Tabs defaultValue="browse">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 rounded-2xl p-1">
          <TabsTrigger value="browse" className="rounded-xl">Browse crops</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-xl">Order history</TabsTrigger>
          <TabsTrigger value="drivers" className="rounded-xl">Book driver</TabsTrigger>
          <TabsTrigger value="tracking" className="rounded-xl">Delivery tracking</TabsTrigger>
          <TabsTrigger value="billing" className="rounded-xl">Plans & payments</TabsTrigger>
          <TabsTrigger value="profile" className="rounded-xl">Profile</TabsTrigger>
        </TabsList>

        {/* Browse */}
        <TabsContent value="browse" className="mt-5 space-y-5">
          <GlassCard className="rounded-3xl">
            <div className="grid gap-4 lg:grid-cols-4">
              <Field label="Search crop">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="rounded-xl pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tomato, paddy…" />
                </div>
              </Field>
              <Field label="Location">
                <Input className="rounded-xl" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="District" />
              </Field>
              <Field label="Min quantity">
                <Input className="rounded-xl" inputMode="numeric" value={minQty} onChange={(e) => setMinQty(e.target.value)} placeholder="500" />
              </Field>
              <Field label={`Max price ₹${maxPrice}`}>
                <Slider value={[maxPrice]} min={1} max={100} step={1} onValueChange={([v]) => setMaxPrice(v)} className="mt-4" />
              </Field>
            </div>
          </GlassCard>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <GlassCard key={c.id} className="overflow-hidden rounded-3xl p-0">
                <img src={c.image} alt={c.name} loading="lazy" className="h-40 w-full object-cover" />
                <div className="space-y-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="min-w-0 truncate font-semibold">{lang === "ta" ? c.nameTa : c.name}</h3>
                    <Stars value={c.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {c.quantity} {c.unit} · <span className="font-semibold text-foreground">{currency(c.price)}/{c.unit}</span>
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" /> {c.location} · {c.farmer}
                  </p>
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      className="flex-1 rounded-full gradient-primary text-primary-foreground"
                      onClick={() => {
                        buyCrop(c);
                        pushNotification("Order placed", `${c.name} from ${c.farmer}.`);
                        toast.success(`Order placed for ${c.name}`);
                      }}
                    >
                      Buy now
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full" onClick={() => toast(`Calling ${c.farmer} · ${c.phone}`)}>
                      <Phone className="size-4" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
            {filtered.length === 0 && (
              <GlassCard className="rounded-3xl text-center text-sm text-muted-foreground">
                No crops match these filters.
              </GlassCard>
            )}
          </div>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders" className="mt-5 space-y-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="Order history" subtitle="Every purchase with payment and delivery state." />
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="grid gap-2 rounded-2xl bg-muted/50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{o.crop} · {o.quantity}</p>
                    <p className="truncate text-sm text-muted-foreground">{o.seller} · {o.id} · {o.date}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Pill tone={o.payment === "paid" ? "success" : o.payment === "escrow" ? "sky" : "warning"}>{o.payment}</Pill>
                    <Pill tone={o.delivery === "delivered" ? "success" : "primary"}>{o.delivery}</Pill>
                    <Pill tone="muted">{currency(o.amount)}</Pill>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <ReviewList />
        </TabsContent>

        {/* Drivers */}
        <TabsContent value="drivers" className="mt-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="Book a driver" subtitle="Post a load; verified drivers nearby can accept it." />
            <TransportForm
              onSubmit={(p) => {
                addRequest({ ...p, farmerPhone: "+91 98400 11223", dealerPhone: user.phone });
                pushNotification("Driver requested", `${p.crop}: ${p.from} → ${p.to}`);
                toast.success("Request sent to nearby drivers");
              }}
            />
          </GlassCard>
        </TabsContent>

        {/* Tracking */}
        <TabsContent value="tracking" className="mt-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="Delivery tracking" subtitle="ORD-2304 · Thanjavur → Trichy Mandi" />
            <ol className="relative space-y-6 border-l-2 border-dashed pl-6">
              {[
                ["Order confirmed", "22 Jul, 09:12", true],
                ["Driver assigned — Ravi Kumar (TN 45 BX 8821)", "22 Jul, 10:40", true],
                ["Loaded at farm", "22 Jul, 12:05", true],
                ["In transit — 26 km remaining", "Live", true],
                ["Delivered at Trichy Mandi", "Expected 14:30", false],
              ].map(([label, time, done]) => (
                <li key={label as string} className="relative">
                  <span className={`absolute -left-[31px] top-1 size-4 rounded-full border-2 ${done ? "gradient-primary border-transparent" : "bg-background"}`} />
                  <p className="font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{time}</p>
                </li>
              ))}
            </ol>
            <Button variant="secondary" className="mt-6 rounded-full" onClick={() => toast("Calling driver Ravi Kumar")}>
              <Truck className="size-4" /> Call driver
            </Button>
          </GlassCard>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="mt-5 space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Starter", price: "₹0", perks: ["10 listings/month", "Basic filters", "Email support"] },
              { name: "Growth", price: "₹1,499/mo", perks: ["Unlimited browsing", "Priority driver booking", "Escrow payments"], featured: true },
              { name: "Enterprise", price: "₹4,999/mo", perks: ["Multi-buyer accounts", "Dedicated manager", "API & bulk export"] },
            ].map((p) => (
              <GlassCard key={p.name} className={`rounded-3xl ${p.featured ? "ring-2 ring-primary" : ""}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  {p.featured && <Pill tone="primary">Current</Pill>}
                </div>
                <p className="mt-2 text-2xl font-black text-gradient">{p.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {p.perks.map((x) => (
                    <li key={x}>• {x}</li>
                  ))}
                </ul>
                <Button className="mt-5 w-full rounded-full" variant={p.featured ? "default" : "secondary"} onClick={() => toast.success(`${p.name} plan selected`)}>
                  {p.featured ? "Manage plan" : "Choose plan"}
                </Button>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="rounded-3xl">
            <SectionTitle title="Secure payment" subtitle="256-bit encrypted · UPI, cards and net banking" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Card number">
                <Input className="rounded-xl" placeholder="4242 4242 4242 4242" inputMode="numeric" />
              </Field>
              <Field label="Name on card">
                <Input className="rounded-xl" placeholder="Green Valley Traders" />
              </Field>
              <Field label="Expiry">
                <Input className="rounded-xl" placeholder="08/29" />
              </Field>
              <Field label="CVV">
                <Input className="rounded-xl" placeholder="•••" type="password" />
              </Field>
            </div>
            <Button className="mt-5 rounded-full gradient-primary text-primary-foreground" onClick={() => toast.success("Payment method saved securely")}>
              <CreditCard className="size-4" /> Save payment method
            </Button>
          </GlassCard>
        </TabsContent>

        <TabsContent value="profile" className="mt-5">
          <ProfileTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
