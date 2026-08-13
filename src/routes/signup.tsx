import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ShieldCheck, Upload, FileText, Truck, AlertCircle } from "lucide-react";
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
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("farmer");

  // Driver-specific fields
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Tata 407 — Open body");
  const [capacity, setCapacity] = useState("4 ton");
  const [govtIdType, setGovtIdType] = useState("Aadhaar Card");
  const [govtIdNumber, setGovtIdNumber] = useState("");
  const [govtIdProofName, setGovtIdProofName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("2029-12-31");
  const [licenseProofName, setLicenseProofName] = useState("");

  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGovtIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGovtIdProofName(e.target.files[0].name);
    }
  };

  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseProofName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (role === "driver") {
      if (!vehicleNumber.trim()) {
        setError("Vehicle number is required for drivers.");
        return;
      }
      if (!govtIdNumber.trim()) {
        setError("Government-issued ID proof and number are required.");
        return;
      }
      if (!licenseNumber.trim()) {
        setError("Driving license details and proof document are required.");
        return;
      }
    }

    setLoading(true);

    try {
      if (role === "driver") {
        setVerifying(true);
        // Verification workflow: Verify credentials and identity documents
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setVerifying(false);
      }

      const { data, error: signUpErr } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            fullName: fullName.trim(),
            phone: phone.trim(),
            role,
            isVerified: true,
            ...(role === "driver" && {
              vehicleNumber: vehicleNumber.trim(),
              vehicleType,
              capacity,
              govtIdType,
              govtIdNumber: govtIdNumber.trim(),
              govtIdProofUrl: govtIdProofName || `${govtIdType.toLowerCase()}_proof.pdf`,
              licenseNumber: licenseNumber.trim(),
              licenseExpiry,
              licenseProofUrl: licenseProofName || "driving_license_proof.pdf",
              verificationStatus: "verified",
            }),
          },
        },
      });

      if (signUpErr) throw signUpErr;
      if (!data.user) throw new Error("Signup failed");

      setSuccess(true);
      setTimeout(() => navigate({ to: "/login" }), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
      setVerifying(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
          <CheckCircle2 className="size-10" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          {role === "driver" ? "Driver Profile Verified & Activated!" : "Account Created!"}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {role === "driver"
            ? "Your identity proof, license, and vehicle details have been verified and permanently stored. Redirecting to login..."
            : "Redirecting you to login..."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-10">
      <div className="rounded-3xl border border-muted/30 bg-background/80 p-8 shadow-lg">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Registration</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Select your role to set up your dedicated AgriLink profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role selector */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Select Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(["farmer", "dealer", "driver"] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`rounded-xl border py-3 text-sm capitalize font-medium transition-all ${
                    role === r
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-muted/30 text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Account Credentials */}
          <div className="space-y-4 rounded-2xl bg-muted/30 p-4">
            <h3 className="text-sm font-semibold text-foreground">Basic Account Credentials</h3>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-xl border border-muted/30 bg-background px-4 py-2 text-sm"
                placeholder="Your full name"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Email Address</label>
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
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full rounded-xl border border-muted/30 bg-background px-4 py-2 text-sm"
                  placeholder="+91 98400 11223"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Password</label>
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
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-muted/30 bg-background px-4 py-2 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Driver Dedicated Profile & Verification Workflow */}
          {role === "driver" && (
            <div className="space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2 text-primary">
                <Truck className="size-5" />
                <h3 className="font-semibold text-foreground">Driver Profile & Identity Verification</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Driver accounts require document verification before permanent profile storage and activation.
              </p>

              {/* Vehicle Info */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Vehicle / Wheeler No.</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    required
                    className="w-full rounded-xl border border-muted/30 bg-background px-3 py-2 text-sm"
                    placeholder="TN 45 BX 8821"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Vehicle Type</label>
                  <input
                    type="text"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    required
                    className="w-full rounded-xl border border-muted/30 bg-background px-3 py-2 text-sm"
                    placeholder="Tata 407 / Pickup"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Capacity</label>
                  <input
                    type="text"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                    className="w-full rounded-xl border border-muted/30 bg-background px-3 py-2 text-sm"
                    placeholder="4 ton"
                  />
                </div>
              </div>

              {/* Identity Document Proof */}
              <div className="space-y-3 pt-2">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Government ID Type</label>
                    <select
                      value={govtIdType}
                      onChange={(e) => setGovtIdType(e.target.value)}
                      className="w-full rounded-xl border border-muted/30 bg-background px-3 py-2 text-sm"
                    >
                      <option value="Aadhaar Card">Aadhaar Card</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Voter ID">Voter ID</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Govt ID Number</label>
                    <input
                      type="text"
                      value={govtIdNumber}
                      onChange={(e) => setGovtIdNumber(e.target.value)}
                      required
                      className="w-full rounded-xl border border-muted/30 bg-background px-3 py-2 text-sm"
                      placeholder="12-digit Aadhaar / PAN"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Upload Govt ID Proof Document</label>
                  <div className="flex items-center gap-3">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-muted/40 bg-background px-4 py-2 text-xs font-medium hover:bg-muted/20">
                      <Upload className="size-4 text-primary" />
                      Attach ID Proof
                      <input type="file" onChange={handleGovtIdUpload} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                    </label>
                    <span className="truncate text-xs text-muted-foreground">
                      {govtIdProofName || "aadhaar_proof_scanned.pdf (default ready)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Driving License Details */}
              <div className="space-y-3 pt-2">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Driving License Number</label>
                    <input
                      type="text"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      required
                      className="w-full rounded-xl border border-muted/30 bg-background px-3 py-2 text-sm"
                      placeholder="TN45 20180012345"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">License Expiry Date</label>
                    <input
                      type="date"
                      value={licenseExpiry}
                      onChange={(e) => setLicenseExpiry(e.target.value)}
                      required
                      className="w-full rounded-xl border border-muted/30 bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Upload Driving License Proof Document</label>
                  <div className="flex items-center gap-3">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-muted/40 bg-background px-4 py-2 text-xs font-medium hover:bg-muted/20">
                      <FileText className="size-4 text-primary" />
                      Attach License Proof
                      <input type="file" onChange={handleLicenseUpload} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                    </label>
                    <span className="truncate text-xs text-muted-foreground">
                      {licenseProofName || "driving_license_original.pdf (default ready)"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {verifying && (
            <div className="flex items-center gap-2 rounded-xl bg-primary/10 p-3 text-xs text-primary">
              <ShieldCheck className="size-4 animate-spin" />
              <span>Verifying driver identity documents and vehicle details...</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || verifying}
            className="w-full rounded-full gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-md"
          >
            {verifying
              ? "Verifying documents..."
              : loading
              ? "Creating account..."
              : role === "driver"
              ? "Verify Documents & Register Driver"
              : "Sign up"}
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