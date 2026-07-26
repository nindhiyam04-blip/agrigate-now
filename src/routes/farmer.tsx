/** Farmer dashboard: list crops, orders, payments, transport, weather & AI. */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  CloudSun,
  ImagePlus,
  IndianRupee,
  LineChart,
  MessageCircle,
  PackageCheck,
  Phone,
  Sprout,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, GlassCard, Pill, SectionTitle, StatCard } from "@/components/ui-kit";
import { DashboardHeader, ProfileTab, ReviewList, SignInGate } from "@/components/dashboard/shared";
import { currency, useApp } from "@/lib/app-store";

export const Route = createFileRoute("/farmer")({
  head: () => ({
    meta: [
      { title: "Farmer Dashboard — AgriLink" },
      { name: "description", content: "Upload crops, track orders and payments, request transport and view weather alerts." },
      { property: "og:title", content: "Farmer Dashboard — AgriLink" },
      { property: "og:description", content: "Manage your listings, orders and transport in one place." },
    ],
  }),
  component: FarmerDashboard,
});

function FarmerDashboard() {
  const { user, crops, orders, addCrop, addRequest, pushNotification } = useApp();
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "kg" as "kg" | "ton",
    price: "",
    harvestDate: "",
    location: "",
    image: "",
  });

  if (!user || user.role !== "farmer") return <SignInGate role="farmer" />;

  const myCrops = crops;
  const earnings = orders.filter((o) => o.payment === "paid").reduce((s, o) => s + o.amount, 0);

  const submit = () => {
    if (!form.name || !form.quantity || !form.price) {
      toast.error("Crop name, quantity and price are required");
      return;
    }
    addCrop({
      name: form.name,
      nameTa: form.name,
      quantity: Number(form.quantity),
      unit: form.unit,
      price: Number(form.price),
      harvestDate: form.harvestDate || new Date().toISOString().slice(0, 10),
      location: form.location || user.location,
      farmer: user.name,
      phone: user.phone,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=70",
    });
    pushNotification("Crop listed", `${form.name} is now visible to dealers.`);
    toast.success("Crop listed for sale");
    setForm({ name: "", quantity: "", unit: "kg", price: "", harvestDate: "", location: "", image: "" });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pt-8">
      <DashboardHeader subtitle="Farmer portal · Thanjavur cluster" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active listings" value={String(myCrops.length)} hint="visible to dealers" icon={<Sprout className="size-5" />} />
        <StatCard label="Open orders" value={String(orders.length)} hint="this season" icon={<PackageCheck className="size-5" />} />
        <StatCard label="Earnings" value={currency(earnings)} hint="settled payments" icon={<IndianRupee className="size-5" />} />
        <StatCard label="Transport" value="2 active" hint="drivers assigned" icon={<Truck className="size-5" />} />
      </div>

      <Tabs defaultValue="upload">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl p-1">
          <TabsTrigger value="upload" className="rounded-xl">Upload crop</TabsTrigger>
          <TabsTrigger value="listings" className="rounded-xl">My listings</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-xl">Orders & payments</TabsTrigger>
          <TabsTrigger value="transport" className="rounded-xl">Transport</TabsTrigger>
          <TabsTrigger value="insights" className="rounded-xl">Weather & AI</TabsTrigger>
          <TabsTrigger value="profile" className="rounded-xl">Profile</TabsTrigger>
        </TabsList>

        {/* Upload */}
        <TabsContent value="upload" className="mt-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="Upload crops for sale" subtitle="Dealers see your listing instantly." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Crop name">
                <Input className="rounded-xl" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Tomato" />
              </Field>
              <Field label="Quantity">
                <div className="flex gap-2">
                  <Input className="rounded-xl" inputMode="numeric" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="500" />
                  <div className="flex shrink-0 overflow-hidden rounded-xl border">
                    {(["kg", "ton"] as const).map((u) => (
                      <button
                        key={u}
                        onClick={() => setForm({ ...form, unit: u })}
                        className={`px-3 text-sm font-semibold transition-colors ${form.unit === u ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </Field>
              <Field label={`Price per ${form.unit} (₹)`}>
                <Input className="rounded-xl" inputMode="decimal" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="24" />
              </Field>
              <Field label="Harvest date">
                <Input className="rounded-xl" type="date" value={form.harvestDate} onChange={(e) => setForm({ ...form, harvestDate: e.target.value })} />
              </Field>
              <Field label="Farm location">
                <Input className="rounded-xl" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Village, District" />
              </Field>
              <Field label="Crop image URL">
                <Input className="rounded-xl" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Paste image link" />
              </Field>
            </div>

            <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed p-6 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <ImagePlus className="size-5" />
              Upload crop images (drag & drop or browse)
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setForm({ ...form, image: URL.createObjectURL(file) });
                    toast.success(`${file.name} attached`);
                  }
                }}
              />
            </label>

            <Button className="mt-5 rounded-full gradient-primary text-primary-foreground" onClick={submit}>
              Publish listing
            </Button>
          </GlassCard>
        </TabsContent>

        {/* Listings */}
        <TabsContent value="listings" className="mt-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myCrops.map((c) => (
              <GlassCard key={c.id} className="overflow-hidden rounded-3xl p-0">
                <img src={c.image} alt={c.name} loading="lazy" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="min-w-0 truncate font-semibold">{c.name}</h3>
                    <Pill tone={c.status === "available" ? "success" : "muted"}>{c.status}</Pill>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.quantity} {c.unit} · {currency(c.price)}/{c.unit}
                  </p>
                  <p className="text-xs text-muted-foreground">Harvest {c.harvestDate} · {c.location}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders" className="mt-5 space-y-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="View orders" subtitle="Chat or call the dealer and follow payment status." />
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="grid gap-3 rounded-2xl bg-muted/50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{o.crop} · {o.quantity}</p>
                    <p className="truncate text-sm text-muted-foreground">{o.buyer} · {o.id} · {o.date}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Pill tone={o.payment === "paid" ? "success" : o.payment === "escrow" ? "sky" : "warning"}>
                        Payment: {o.payment}
                      </Pill>
                      <Pill tone={o.delivery === "delivered" ? "success" : "primary"}>{o.delivery}</Pill>
                      <Pill tone="muted">{currency(o.amount)}</Pill>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button size="sm" variant="secondary" className="rounded-full" onClick={() => toast("Opening chat with " + o.buyer)}>
                      <MessageCircle className="size-4" /> Chat
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full" onClick={() => toast("Calling " + o.buyer)}>
                      <Phone className="size-4" /> Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <ReviewList />
        </TabsContent>

        {/* Transport */}
        <TabsContent value="transport" className="mt-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="Transportation request" subtitle="Post a load and nearby drivers will accept it." />
            <TransportForm
              onSubmit={(payload) => {
                addRequest({ ...payload, farmerPhone: user.phone, dealerPhone: "+91 90876 33221" });
                pushNotification("Transport requested", `${payload.crop}: ${payload.from} → ${payload.to}`);
                toast.success("Transport request posted");
              }}
            />
          </GlassCard>
        </TabsContent>

        {/* Insights */}
        <TabsContent value="insights" className="mt-5 grid gap-5 lg:grid-cols-2">
          <GlassCard className="rounded-3xl">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl gradient-harvest text-harvest-foreground">
                <CloudSun className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">AI Weather Alert</h3>
                <p className="text-xs text-muted-foreground">Thanjavur · next 5 days</p>
              </div>
            </div>
            <p className="mt-4 rounded-2xl bg-warning/15 p-4 text-sm">
              Moderate showers (18 mm) expected Tuesday evening. Move harvested paddy under cover and
              delay spraying by 48 hours.
            </p>
            <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
              {[
                ["Mon", "34°", "☀️"],
                ["Tue", "29°", "🌧️"],
                ["Wed", "30°", "⛅"],
                ["Thu", "33°", "☀️"],
                ["Fri", "32°", "⛅"],
              ].map(([d, temp, ic]) => (
                <div key={d} className="rounded-2xl bg-muted/60 py-3">
                  <p className="font-semibold">{d}</p>
                  <p className="text-lg">{ic}</p>
                  <p className="text-muted-foreground">{temp}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="rounded-3xl">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl gradient-primary text-primary-foreground">
                <LineChart className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Crop Price Prediction</h3>
                <Pill tone="sky">Future feature</Pill>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Forecasts from mandi history, rainfall and arrivals will tell you the best week to sell.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["Tomato", "₹22 → ₹26 /kg", "+18% in 2 weeks"],
                ["Paddy", "₹28 → ₹27 /kg", "-3% in 2 weeks"],
                ["Onion", "₹48 → ₹55 /kg", "+14% in 3 weeks"],
              ].map(([crop, range, delta]) => (
                <li key={crop} className="flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3">
                  <span className="font-medium">{crop}</span>
                  <span className="text-muted-foreground">{range}</span>
                  <Pill tone={delta.startsWith("+") ? "success" : "warning"}>{delta}</Pill>
                </li>
              ))}
            </ul>
          </GlassCard>
        </TabsContent>

        <TabsContent value="profile" className="mt-5">
          <ProfileTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function TransportForm({
  onSubmit,
}: {
  onSubmit: (p: { crop: string; from: string; to: string; distanceKm: number; weight: string; payout: number }) => void;
}) {
  const [f, setF] = useState({ crop: "", from: "", to: "", distanceKm: "", weight: "", payout: "" });
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Crop">
          <Input className="rounded-xl" value={f.crop} onChange={(e) => setF({ ...f, crop: e.target.value })} placeholder="Tomato" />
        </Field>
        <Field label="Pickup">
          <Input className="rounded-xl" value={f.from} onChange={(e) => setF({ ...f, from: e.target.value })} placeholder="Hosur" />
        </Field>
        <Field label="Drop">
          <Input className="rounded-xl" value={f.to} onChange={(e) => setF({ ...f, to: e.target.value })} placeholder="Koyambedu" />
        </Field>
        <Field label="Distance (km)">
          <Input className="rounded-xl" inputMode="numeric" value={f.distanceKm} onChange={(e) => setF({ ...f, distanceKm: e.target.value })} placeholder="120" />
        </Field>
        <Field label="Weight">
          <Input className="rounded-xl" value={f.weight} onChange={(e) => setF({ ...f, weight: e.target.value })} placeholder="800 kg" />
        </Field>
        <Field label="Offered payout (₹)">
          <Input className="rounded-xl" inputMode="numeric" value={f.payout} onChange={(e) => setF({ ...f, payout: e.target.value })} placeholder="3500" />
        </Field>
      </div>
      <Button
        className="mt-5 rounded-full gradient-primary text-primary-foreground"
        onClick={() => {
          if (!f.crop || !f.from || !f.to) {
            toast.error("Crop, pickup and drop are required");
            return;
          }
          onSubmit({
            crop: f.crop,
            from: f.from,
            to: f.to,
            distanceKm: Number(f.distanceKm) || 50,
            weight: f.weight || "500 kg",
            payout: Number(f.payout) || 2500,
          });
          setF({ crop: "", from: "", to: "", distanceKm: "", weight: "", payout: "" });
        }}
      >
        <Truck className="size-4" /> Request driver
      </Button>
    </>
  );
}
