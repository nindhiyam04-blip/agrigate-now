/** Driver dashboard: transport requests, dedicated driver profile, documents verification, and real-time location tracking. */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Check,
  IndianRupee,
  MapPin,
  Phone,
  Route as RouteIcon,
  Truck,
  X,
  ShieldCheck,
  FileCheck,
  Navigation,
  Compass,
  AlertTriangle,
  FileText
} from "lucide-react";
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
      {
        name: "description",
        content:
          "Accept transport requests, manage dedicated driver profile & identity documents, track live location and earnings.",
      },
      { property: "og:title", content: "Driver Dashboard — AgriLink" },
      { property: "og:description", content: "Find loads near you and get paid per delivery." },
    ],
  }),
  component: DriverDashboard,
});

function DriverDashboard() {
  const { user, requests, setRequestStatus, pushNotification, updateDriverLocation, verifyDriverAccount } = useApp();

  // Location simulation state
  const [address, setAddress] = useState(user?.driverProfile?.location.currentAddress || "Thanjavur Highway, TN");
  const [lat, setLat] = useState(user?.driverProfile?.location.latitude || 10.7867);
  const [lng, setLng] = useState(user?.driverProfile?.location.longitude || 79.1378);
  const [isLive, setIsLive] = useState(user?.driverProfile?.location.isLiveTracking ?? true);

  if (!user || user.role !== "driver") return <SignInGate role="driver" />;

  const driverProfile = user.driverProfile;
  const isVerified = user.isVerified && driverProfile?.isVerified !== false;

  const open = requests.filter((r) => r.status === "open");
  const accepted = requests.filter((r) => r.status === "accepted");
  const history = requests.filter((r) => r.status === "delivered" || r.status === "rejected");
  const earnings = requests
    .filter((r) => r.status === "delivered")
    .reduce((s, r) => s + r.payout, 0);

  const handleSimulateMove = () => {
    const nextLat = Number((lat + (Math.random() - 0.5) * 0.05).toFixed(4));
    const nextLng = Number((lng + (Math.random() - 0.5) * 0.05).toFixed(4));
    setLat(nextLat);
    setLng(nextLng);
    updateDriverLocation(nextLat, nextLng, address, isLive);
    toast.success(`Updated live GPS location: ${nextLat}, ${nextLng}`);
  };

  // Verification Gate for Unverified Drivers
  if (!isVerified) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 pt-12">
        <GlassCard className="rounded-3xl p-8 text-center border-amber-500/30 bg-amber-500/5">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            <AlertTriangle className="size-10" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Driver Verification Pending</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your driver identity documents and vehicle credentials have been submitted and are under verification before activating full driver features.
          </p>

          <div className="mt-6 rounded-2xl bg-background/80 p-5 text-left text-sm space-y-3 border border-muted/30">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <FileCheck className="size-4 text-primary" /> Submitted Credentials & Proof Documents
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              <div><span className="text-muted-foreground">Driver Name:</span> <span className="font-medium">{user.name}</span></div>
              <div><span className="text-muted-foreground">Email / Phone:</span> <span className="font-medium">{user.email} · {user.phone}</span></div>
              <div><span className="text-muted-foreground">Vehicle Number:</span> <span className="font-medium">{driverProfile?.vehicleNumber || "TN 45 BX 8821"}</span></div>
              <div><span className="text-muted-foreground">Government ID:</span> <span className="font-medium">{driverProfile?.govtIdType || "Aadhaar Card"} ({driverProfile?.govtIdNumber || "XXXX-XXXX-9912"})</span></div>
              <div><span className="text-muted-foreground">ID Proof Doc:</span> <span className="font-medium text-primary">{driverProfile?.govtIdProofUrl || "aadhaar_proof.pdf"}</span></div>
              <div><span className="text-muted-foreground">Driving License:</span> <span className="font-medium">{driverProfile?.licenseNumber || "TN45 20180012345"}</span></div>
              <div><span className="text-muted-foreground">License Proof Doc:</span> <span className="font-medium text-primary">{driverProfile?.licenseProofUrl || "driving_license_proof.pdf"}</span></div>
              <div><span className="text-muted-foreground">Status:</span> <span className="font-semibold text-amber-500">Under Review</span></div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              className="rounded-full gradient-primary text-primary-foreground font-semibold"
              onClick={async () => {
                await verifyDriverAccount();
                toast.success("Identity verified and driver account activated!");
              }}
            >
              <ShieldCheck className="size-4 mr-2" /> Approve & Activate Driver Profile
            </Button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pt-8">
      <DashboardHeader subtitle={`Driver Portal · ${driverProfile?.vehicleNumber || "TN 45 BX 8821"} · Verified`} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Open requests"
          value={String(open.length)}
          hint="within 60 km"
          icon={<Truck className="size-5" />}
        />
        <StatCard
          label="Active trips"
          value={String(accepted.length)}
          hint="in progress"
          icon={<RouteIcon className="size-5" />}
        />
        <StatCard
          label="Earnings"
          value={currency(earnings)}
          hint="settled payouts"
          icon={<IndianRupee className="size-5" />}
        />
        <StatCard
          label="Verification"
          value="Verified"
          hint="ID & License Proof Stored"
          icon={<ShieldCheck className="size-5 text-emerald-500" />}
        />
      </div>

      <Tabs defaultValue="requests">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl p-1">
          <TabsTrigger value="requests" className="rounded-xl">
            Requests
          </TabsTrigger>
          <TabsTrigger value="location" className="rounded-xl">
            Live GPS Tracking
          </TabsTrigger>
          <TabsTrigger value="live" className="rounded-xl">
            Live delivery
          </TabsTrigger>
          <TabsTrigger value="vehicle" className="rounded-xl">
            Vehicle & Proofs
          </TabsTrigger>
          <TabsTrigger value="earnings" className="rounded-xl">
            Earnings
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl">
            History
          </TabsTrigger>
          <TabsTrigger value="profile" className="rounded-xl">
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-5 space-y-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle
              title="Transportation requests"
              subtitle="Accept or reject loads posted by farmers and dealers."
            />
            <div className="space-y-3">
              {open.map((r) => (
                <div
                  key={r.id}
                  className="grid gap-3 rounded-2xl bg-muted/50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {r.crop} · {r.weight}
                    </p>
                    <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
                      <MapPin className="size-3" /> {r.from} → {r.to} · {r.distanceKm} km
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Pill tone="success">{currency(r.payout)}</Pill>
                      <Pill tone="muted">{r.id}</Pill>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full"
                      onClick={() => toast(`Calling farmer ${r.farmerPhone}`)}
                    >
                      <Phone className="size-4" /> Farmer
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full"
                      onClick={() => toast(`Calling dealer ${r.dealerPhone}`)}
                    >
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
              {open.length === 0 && (
                <p className="text-sm text-muted-foreground">No open requests right now.</p>
              )}
            </div>
          </GlassCard>
          <ReviewList />
        </TabsContent>

        {/* Real-time Location Tracking Tab */}
        <TabsContent value="location" className="mt-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle
              title="Real-Time Location Tracking"
              subtitle="Broadcast live GPS coordinates to farmers and dealers during transport trips."
            />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 rounded-2xl bg-muted/40 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Navigation className="size-5 text-primary" /> Live GPS Broadcast Status
                  </h3>
                  <Pill tone={isLive ? "success" : "muted"}>
                    {isLive ? "LIVE BROADCAST ACTIVE" : "OFFLINE"}
                  </Pill>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-muted/30 pb-2">
                    <span className="text-muted-foreground">Current Coordinates</span>
                    <span className="font-mono font-semibold">{lat}, {lng}</span>
                  </div>
                  <div className="flex justify-between border-b border-muted/30 pb-2">
                    <span className="text-muted-foreground">Current Location Address</span>
                    <span className="font-semibold">{address}</span>
                  </div>
                  <div className="flex justify-between border-b border-muted/30 pb-2">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-mono text-xs">{driverProfile?.location?.lastUpdatedAt ? new Date(driverProfile.location.lastUpdatedAt).toLocaleTimeString() : "Just now"}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Button
                    size="sm"
                    className="rounded-full gradient-primary text-primary-foreground"
                    onClick={handleSimulateMove}
                  >
                    <Compass className="size-4 mr-1" /> Simulate GPS Movement
                  </Button>
                  <Button
                    size="sm"
                    variant={isLive ? "outline" : "default"}
                    className="rounded-full"
                    onClick={() => {
                      const nextLive = !isLive;
                      setIsLive(nextLive);
                      updateDriverLocation(lat, lng, address, nextLive);
                      toast(nextLive ? "Live GPS broadcast started" : "Live GPS broadcast paused");
                    }}
                  >
                    {isLive ? "Pause Tracking" : "Start Live Tracking"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Update Location Info</h3>
                <Field label="Address / Landmark">
                  <Input
                    className="rounded-xl"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Latitude">
                    <Input
                      className="rounded-xl font-mono"
                      type="number"
                      step="0.0001"
                      value={lat}
                      onChange={(e) => setLat(Number(e.target.value))}
                    />
                  </Field>
                  <Field label="Longitude">
                    <Input
                      className="rounded-xl font-mono"
                      type="number"
                      step="0.0001"
                      value={lng}
                      onChange={(e) => setLng(Number(e.target.value))}
                    />
                  </Field>
                </div>
                <Button
                  className="w-full rounded-full gradient-primary text-primary-foreground"
                  onClick={() => {
                    updateDriverLocation(lat, lng, address, isLive);
                    toast.success("Real-time location updated");
                  }}
                >
                  Save Location Coordinates
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="live" className="mt-5">
          <GlassCard className="rounded-3xl">
            <SectionTitle
              title="Live delivery status"
              subtitle={
                accepted[0]
                  ? `${accepted[0].id} · ${accepted[0].from} → ${accepted[0].to}`
                  : "Accept a request to start a trip."
              }
            />
            {accepted.length > 0 ? (
              <>
                <Progress value={64} className="h-3 rounded-full" />
                <div className="mt-3 flex justify-between text-sm text-muted-foreground">
                  <span>{accepted[0].from}</span>
                  <span>64% · ETA 42 min</span>
                  <span>{accepted[0].to}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    className="rounded-full gradient-primary text-primary-foreground"
                    onClick={() => {
                      setRequestStatus(accepted[0].id, "delivered");
                      toast.success("Marked as delivered");
                    }}
                  >
                    Mark delivered
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-full"
                    onClick={() => toast(`Live GPS (${lat}, ${lng}) shared with farmer and dealer`)}
                  >
                    Share live location ({lat}, {lng})
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No active trip.</p>
            )}
          </GlassCard>
        </TabsContent>

        {/* Dedicated Driver Vehicle & Identity Documents Profile */}
        <TabsContent value="vehicle" className="mt-5">
          <GlassCard className="rounded-3xl space-y-6">
            <SectionTitle
              title="Vehicle Details & Identity Proof Documents"
              subtitle="Verified vehicle registration, government ID proof, and driving license details."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Vehicle Type">
                <Input
                  className="rounded-xl"
                  defaultValue={driverProfile?.vehicleType || "Tata 407 — Open body"}
                />
              </Field>
              <Field label="Registration / Wheeler Number">
                <Input
                  className="rounded-xl"
                  defaultValue={driverProfile?.vehicleNumber || "TN 45 BX 8821"}
                />
              </Field>
              <Field label="Max Load Capacity">
                <Input
                  className="rounded-xl"
                  defaultValue={driverProfile?.capacity || "4 ton"}
                />
              </Field>
              <Field label="Phone Number">
                <Input
                  className="rounded-xl"
                  defaultValue={driverProfile?.phone || user.phone}
                />
              </Field>
              <Field label="Email Address">
                <Input
                  className="rounded-xl"
                  defaultValue={driverProfile?.email || user.email}
                  disabled
                />
              </Field>
              <Field label="Insurance Valid Till">
                <Input className="rounded-xl" type="date" defaultValue="2027-03-31" />
              </Field>
            </div>

            {/* Document Proof Section */}
            <div className="rounded-2xl border border-muted/30 bg-muted/20 p-5 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <FileText className="size-5 text-primary" /> Verified Identity & License Documents
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-background p-4 border border-muted/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Government ID Proof</span>
                    <Pill tone="success">Verified</Pill>
                  </div>
                  <p className="text-sm font-semibold">{driverProfile?.govtIdType || "Aadhaar Card"}</p>
                  <p className="text-xs font-mono text-muted-foreground">ID Number: {driverProfile?.govtIdNumber || "XXXX-XXXX-9912"}</p>
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <FileCheck className="size-3" /> Proof Document: {driverProfile?.govtIdProofUrl || "aadhaar_proof_verified.pdf"}
                  </p>
                </div>

                <div className="rounded-xl bg-background p-4 border border-muted/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Driving License</span>
                    <Pill tone="success">Verified</Pill>
                  </div>
                  <p className="text-sm font-semibold">License No: {driverProfile?.licenseNumber || "TN45 20180012345"}</p>
                  <p className="text-xs text-muted-foreground">Expiry Date: {driverProfile?.licenseExpiry || "2029-12-31"}</p>
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <FileCheck className="size-3" /> License Document: {driverProfile?.licenseProofUrl || "driving_license_verified.pdf"}
                  </p>
                </div>
              </div>
            </div>

            <Button
              className="mt-5 rounded-full gradient-primary text-primary-foreground"
              onClick={() => toast.success("Driver profile and vehicle details updated")}
            >
              Save Vehicle & Profile Details
            </Button>
          </GlassCard>
        </TabsContent>

        <TabsContent value="earnings" className="mt-5 grid gap-5 lg:grid-cols-2">
          <GlassCard className="rounded-3xl">
            <SectionTitle
              title="Earnings dashboard"
              subtitle="Weekly payouts, settled every Monday."
            />
            <div className="flex items-end gap-3">
              {[42, 68, 55, 80, 72, 95, 61].map((v, i) => (
                <div key={i} className="flex-1 text-center">
                  <div
                    className="mx-auto w-full rounded-t-xl gradient-primary"
                    style={{ height: `${v * 1.6}px` }}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </p>
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
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-muted/50 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {r.crop} · {r.weight}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {r.from} → {r.to} · {r.distanceKm} km
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Pill tone={r.status === "delivered" ? "success" : "muted"}>{r.status}</Pill>
                    <Pill tone="muted">{currency(r.payout)}</Pill>
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <p className="text-sm text-muted-foreground">No completed trips yet.</p>
              )}
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
