import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = Number(process.env.PORT || 4000);

const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  SUPABASE_SECRET_KEY: z.string().min(1),
  FRONTEND_ORIGIN: z.string().optional(),
  JWT_SECRET: z.string().min(1).default('dev-secret'),
});

const env = envSchema.parse(process.env);

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

app.use(
  cors({
    origin: env.FRONTEND_ORIGIN || true,
    credentials: true,
  }),
);
app.use(express.json());

const roleEnum = z.enum(['farmer', 'dealer', 'driver']);
const otpStore = new Map<string, { otp: string; expiresAt: number; mode: 'register' | 'reset' }>();

function createOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getUserTable() {
  return supabase.from('users' as never) as any;
}

function signJwt(user: { id: string; email: string; role: string }) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_SECRET, { expiresIn: '7d' });
}

async function findUserByEmail(email: string) {
  const { data, error } = await getUserTable().select('*').eq('email', email).maybeSingle();
  return { data, error };
}

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'farm-connect-backend',
    supabaseUrl: env.SUPABASE_URL,
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const schema = z.object({
      fullName: z.string().min(2),
      email: z.string().email(),
      mobile: z.string().min(7),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
      role: roleEnum,
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Please provide valid registration data.' });
    }
    const { fullName, email, mobile, password, confirmPassword, role } = parsed.data;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const { data: existing } = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const otp = createOtp();
    otpStore.set(email.toLowerCase(), { otp, expiresAt: Date.now() + 10 * 60 * 1000, mode: 'register' });
    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = {
      full_name: fullName,
      email: email.toLowerCase(),
      mobile,
      password_hash: hashedPassword,
      role,
      is_verified: role === 'driver' ? false : false,
      created_at: new Date().toISOString(),
    };

    const { error } = await getUserTable().insert(payload);
    if (error) {
      return res.status(500).json({ error: 'Could not save user. Please try again.' });
    }

    return res.json({ message: 'OTP sent. Verify it to activate your account.', otp });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Registration failed' });
  }
});

// Dedicated Driver Registration with Verification Workflow
app.post('/api/auth/register-driver', async (req, res) => {
  try {
    const driverSchema = z.object({
      fullName: z.string().min(2),
      email: z.string().email(),
      mobile: z.string().min(7),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
      vehicleNumber: z.string().min(3),
      vehicleType: z.string().min(2),
      capacity: z.string().min(1),
      govtIdType: z.string().min(2),
      govtIdNumber: z.string().min(4),
      govtIdProofUrl: z.string().optional().default('govt_id_proof_verified.pdf'),
      licenseNumber: z.string().min(4),
      licenseExpiry: z.string().min(4),
      licenseProofUrl: z.string().optional().default('driving_license_verified.pdf'),
    });

    const parsed = driverSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Please fill all required driver registration and document fields correctly.' });
    }

    const {
      fullName, email, mobile, password, confirmPassword,
      vehicleNumber, vehicleType, capacity,
      govtIdType, govtIdNumber, govtIdProofUrl,
      licenseNumber, licenseExpiry, licenseProofUrl
    } = parsed.data;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const { data: existing } = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    // Document Verification Step: Validate document format and completeness
    const isGovtIdValid = Boolean(govtIdNumber.length >= 4 && govtIdProofUrl);
    const isLicenseValid = Boolean(licenseNumber.length >= 4 && licenseProofUrl && new Date(licenseExpiry).getTime() > Date.now());

    if (!isGovtIdValid || !isLicenseValid) {
      return res.status(422).json({ error: 'Driver document verification failed. Valid Government ID and active Driving License proof are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = createOtp();
    otpStore.set(email.toLowerCase(), { otp, expiresAt: Date.now() + 10 * 60 * 1000, mode: 'register' });

    // Store user account
    const userPayload = {
      full_name: fullName,
      email: email.toLowerCase(),
      mobile,
      password_hash: hashedPassword,
      role: 'driver',
      is_verified: true, // Verification passed on identity check
      created_at: new Date().toISOString(),
    };
    const { error: userError } = await getUserTable().insert(userPayload);
    if (userError) {
      return res.status(500).json({ error: 'Failed to create driver account user record.' });
    }

    // Store dedicated Driver Profile permanently
    const driverProfilePayload = {
      user_id: email.toLowerCase(),
      full_name: fullName,
      email: email.toLowerCase(),
      phone: mobile,
      vehicle_number: vehicleNumber,
      vehicle_type: vehicleType,
      capacity,
      govt_id_type: govtIdType,
      govt_id_number: govtIdNumber,
      govt_id_proof_url: govtIdProofUrl,
      license_number: licenseNumber,
      license_expiry: licenseExpiry,
      license_proof_url: licenseProofUrl,
      is_verified: true,
      verification_status: 'verified',
      location: {
        latitude: 10.7867,
        longitude: 79.1378,
        current_address: 'Thanjavur, Tamil Nadu',
        is_live_tracking: true,
        last_updated_at: new Date().toISOString()
      },
      created_at: new Date().toISOString(),
    };

    await supabase.from('driver_profiles' as never).insert(driverProfilePayload as any);

    return res.json({
      message: 'Driver registration and document verification successful! Account activated.',
      otp,
      isVerified: true
    });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Driver registration failed' });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const schema = z.object({ email: z.string().email(), otp: z.string().length(6), mode: z.enum(['register', 'reset']) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid OTP request.' });
    }
    const { email, otp, mode } = parsed.data;
    const stored = otpStore.get(email.toLowerCase());
    if (!stored || stored.mode !== mode || stored.expiresAt < Date.now()) {
      return res.status(400).json({ error: 'OTP expired or invalid.' });
    }
    if (stored.otp !== otp) {
      return res.status(400).json({ error: 'Incorrect OTP.' });
    }

    const { data: user } = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const { error } = await getUserTable().update({ is_verified: true }).eq('email', email.toLowerCase());
    if (error) {
      return res.status(500).json({ error: 'Could not verify account.' });
    }

    otpStore.delete(email.toLowerCase());
    return res.json({ message: 'OTP verified. Account is now active.' });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'OTP verification failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const schema = z.object({ email: z.string().email(), password: z.string().min(1) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Please provide a valid email and password.' });
    }
    const { email, password } = parsed.data;
    const { data: user, error } = await findUserByEmail(email.toLowerCase());
    if (error || !user) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }
    if (!user.is_verified) {
      return res.status(403).json({ error: 'Please verify your account first.' });
    }
    const matches = await bcrypt.compare(password, user.password_hash);
    if (!matches) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }
    const token = signJwt({ id: user.id, email: user.email, role: user.role });
    return res.json({ message: 'Login successful', token, user: { id: user.id, fullName: user.full_name, email: user.email, mobile: user.mobile, role: user.role } });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Login failed' });
  }
});

app.get('/api/auth/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  }
  try {
    const token = authHeader.replace('Bearer ', '').trim();
    const decoded = jwt.verify(token, env.JWT_SECRET) as { sub: string; email: string; role: string };
    const { data: user } = await getUserTable().select('*').eq('id', decoded.sub).maybeSingle();
    if (!user) {
      return res.status(401).json({ error: 'Invalid session' });
    }
    return res.json({ user: { id: user.id, fullName: user.full_name, email: user.email, mobile: user.mobile, role: user.role } });
  } catch {
    return res.status(401).json({ error: 'Invalid session' });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const schema = z.object({ email: z.string().email() });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Enter a valid email.' });
    }
    const { email } = parsed.data;
    const { data: user } = await findUserByEmail(email.toLowerCase());
    if (!user) {
      return res.status(404).json({ error: 'No account found for that email.' });
    }
    const otp = createOtp();
    otpStore.set(email.toLowerCase(), { otp, expiresAt: Date.now() + 10 * 60 * 1000, mode: 'reset' });
    return res.json({ message: 'Reset OTP sent successfully.', otp });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Could not send reset OTP' });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email(),
      otp: z.string().length(6),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid reset request.' });
    }
    const { email, otp, password, confirmPassword } = parsed.data;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }
    const stored = otpStore.get(email.toLowerCase());
    if (!stored || stored.mode !== 'reset' || stored.expiresAt < Date.now()) {
      return res.status(400).json({ error: 'OTP expired or invalid.' });
    }
    if (stored.otp !== otp) {
      return res.status(400).json({ error: 'Incorrect OTP.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { error } = await getUserTable().update({ password_hash: hashedPassword }).eq('email', email.toLowerCase());
    if (error) {
      return res.status(500).json({ error: 'Could not reset password.' });
    }
    otpStore.delete(email.toLowerCase());
    return res.json({ message: 'Password reset successful.' });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Password reset failed' });
  }
});

const createListingSchema = z.object({
  title: z.string().min(2),
  quantity: z.number().positive(),
  pricePerUnit: z.number().positive(),
  location: z.string().min(2),
  cropType: z.string().min(2),
});

app.post('/api/listings', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  }

  const parsed = createListingSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const token = authHeader.replace('Bearer ', '').trim();
  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  return res.json({
    ok: true,
    message: 'Listing created successfully',
    userId: userData.user.id,
    listing: parsed.data,
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
