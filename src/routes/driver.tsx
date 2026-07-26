/** Driver dashboard: transport requests, vehicle, earnings and live status. */
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, IndianRupee, MapPin, Phone, Route as RouteIcon, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, GlassCard, Pill, SectionTitle, StatCard } from "@/components/ui-kit";
import { DashboardHeader, ProfileTab, ReviewList, SignInGate } from "@/components/dashboard/shared";
import { currency, useApp } from "@/lib/app-store";

export const Route = createFileRoute("/driver")({
  head: () => ({
    meta: [
      { title: "Driver Dashboard — AgriLink" },
      { name: "description", content: "Accept transport requests, manage vehicle details, track earnings and delivery status." },
      { property: "og:title", content: "Driver Dashboard — AgriLink" },
      { property: "og:description", content: "Find loads near you and get paid per delivery." },
    ],
  }),
  component: DriverDashboard,
});

function DriverDashboard() {
  const { user, requests, setRequestStatus, pushNotification } = useApp();
  if (!user || user.role !== "driver") return <SignInGate role="driver" />;

  const open = requests.filter((r) => r.status === "open");
  const accepted = requests.filter((r) => r.status === "accepted");
  const history = requests.filter((r) => r.status === "delivered" || r.status === "rejected");
  const earnings = requests.filter((r) => r.status === "delivered").reduce((s, r) => s + r.payout, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pt-8">
      <DashboardHeader subtitle="Driver portal · TN 45 BX 8821" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open requests" value={String(open.length)} hint="within 60 km" icon={<Truck className="size-5" />} />
        <StatCard label="Active trips" value={String(accepted.length)} hint="in progress" icon={<RouteIcon className="size-5" />} />
        <StatCard label="Earnings" value={currency(earnings)} hint="settled payouts" icon={<IndianRupee className="size-5" />} />
        <StatCard label="Completion" value="98%" hint="last 50 trips" icon={<Check className="size-5" />} />
      </div>

      <Tabs defaultValue="requests">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl p-1">
          <TabsTrigger value="requests" className="rounded-xl">Requests</TabsTrigger>
          <TabsTrigger value="live" className="rounded-xl">Live delivery</TabsTrigger>
          <TabsTrigger value="vehicle" className="rounded-xl">Vehicle</TabsTrigger>
          <TabsTrigger value="earnings" className="rounded-xl">Earnings</TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl">History</TabsTrigger>
          <TabsTrigger value="profile" className="rounded-xl">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-5 space-y-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="Transportation requests" subtitle="Accept or reject loads posted by farmers and dealers." />
            <div className="space-y-3">
              {open.map((r) => (
                <div key={r.id} className="grid gap-3 rounded-2xl bg-muted/50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{r.crop} · {r.weight}</p>
                    <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
                      <MapPin className="size-3" /> {r.from} → {r.to} · {r.distanceKm} km
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Pill tone="success">{currency(r.payout)}</Pill>
                      <Pill tone="muted">{r.id}</Pill>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Button size="sm" variant="secondary" className="rounded-full" onClick={() => toast(`Calling farmer ${r.farmerPhone}`)}>
                      <Phone className="size-4" /> Farmer
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full" onClick={() => toast(`Calling dealer ${r.dealerPhone}`)}>
                      <Phone className="size-4" /> Dealer
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full gradient-primary text-primary-foreground"
                      onClick={() => {
                        setRequestStatus(r.id, "accepted");
                        pushNotification("Delivery accepted", `${r.id} ${r.from} → ${r.to}`);
                        toast.success("Request accepted");
                      }}
                    >
                      <Check className="size-4" /> Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-destructive"
                      onClick={() => {
                        setRequestStatus(r.id, "rejected");
                        toast("Request rejected");
                      }}
                    >
                      <X className="size-4" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
              {open.length === 0 && <p className="text-sm text-muted-foreground">No open requests right now.</p>}
            </div>
          </GlassCard>
          <ReviewList />
        </TabsContent>

        <TabsContent value="live" className="mt-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="Live delivery status" subtitle={accepted[0] ? `${accepted[0].id} · ${accepted[0].from} → ${accepted[0].to}` : "Accept a request to start a trip."} />
            {accepted.length > 0 ? (
              <>
                <Progress value={64} className="h-3 rounded-full" />
                <div className="mt-3 flex justify-between text-sm text-muted-foreground">
                  <span>{accepted[0].from}</span>
                  <span>64% · ETA 42 min</span>
                  <span>{accepted[0].to}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button className="rounded-full gradient-primary text-primary-foreground" onClick={() => { setRequestStatus(accepted[0].id, "delivered"); toast.success("Marked as delivered"); }}>
                    Mark delivered
                  </Button>
                  <Button variant="secondary" className="rounded-full" onClick={() => toast("Location shared with farmer and dealer")}>
                    Share live location
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No active trip.</p>
            )}
          </GlassCard>
        </TabsContent>

        <TabsContent value="vehicle" className="mt-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="Vehicle details" subtitle="Keep documents current to receive high-value loads." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Vehicle type"><Input className="rounded-xl" defaultValue="Tata 407 — Open body" /></Field>
              <Field label="Registration number"><Input className="rounded-xl" defaultValue="TN 45 BX 8821" /></Field>
              <Field label="Capacity"><Input className="rounded-xl" defaultValue="4 ton" /></Field>
              <Field label="Licence number"><Input className="rounded-xl" defaultValue="TN45 20180012345" /></Field>
              <Field label="Insurance valid till"><Input className="rounded-xl" type="date" defaultValue="2027-03-31" /></Field>
              <Field label="Service area"><Input className="rounded-xl" defaultValue="Thanjavur · Trichy · Madurai" /></Field>
            </div>
            <Button className="mt-5 rounded-full gradient-primary text-primary-foreground" onClick={() => toast.success("Vehicle details saved")}>
              Save vehicle details
            </Button>
          </GlassCard>
        </TabsContent>

        <TabsContent value="earnings" className="mt-5 grid gap-5 lg:grid-cols-2">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="Earnings dashboard" subtitle="Weekly payouts, settled every Monday." />
            <div className="flex items-end gap-3">
              {[42, 68, 55, 80, 72, 95, 61].map((v, i) => (
                <div key={i} className="flex-1 text-center">
                  <div className="mx-auto w-full rounded-t-xl gradient-primary" style={{ height: `${v * 1.6}px` }} />
                  <p className="mt-2 text-xs text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</p>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="rounded-3xl">
            <h3 className="text-lg font-semibold">Payout summary</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["This week", currency(14200)],
                ["This month", currency(58400)],
                ["Pending settlement", currency(4200)],
                ["Lifetime", currency(742500)],
              ].map(([k, v]) => (
                <li key={k} className="flex justify-between rounded-2xl bg-muted/50 px-4 py-3">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-semibold">{v}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </TabsContent>

        <TabsContent value="history" className="mt-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle title="Delivery history" />
            <div className="space-y-3">
              {history.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl bg-muted/50 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{r.crop} · {r.weight}</p>
                    <p className="truncate text-sm text-muted-foreground">{r.from} → {r.to} · {r.distanceKm} km</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Pill tone={r.status === "delivered" ? "success" : "muted"}>{r.status}</Pill>
                    <Pill tone="muted">{currency(r.payout)}</Pill>
                  </div>
                </div>
              ))}
              {history.length === 0 && <p className="text-sm text-muted-foreground">No completed trips yet.</p>}
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="profile" className="mt-5">
          <ProfileTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
