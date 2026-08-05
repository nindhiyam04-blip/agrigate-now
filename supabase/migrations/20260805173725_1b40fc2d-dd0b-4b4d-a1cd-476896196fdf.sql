-- ROLE ENUM
create type public.app_role as enum ('farmer', 'dealer', 'driver');
create type public.listing_status as enum ('available', 'reserved', 'sold', 'expired');
create type public.payment_status as enum ('pending', 'escrow', 'paid', 'refunded');
create type public.delivery_status as enum ('preparing', 'assigned', 'in-transit', 'delivered', 'cancelled');

-- SHARED updated_at TRIGGER FN
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- PROFILES
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  location text,
  avatar_url text,
  language text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant select on public.profiles to anon;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create trigger profiles_updated_at before update on public.profiles for each row execute function public.update_updated_at_column();

-- USER ROLES
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select, insert on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "Users can claim own role" on public.user_roles for insert to authenticated with check (auth.uid() = user_id);

-- FARMERS
create table public.farmers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  farm_name text not null default '',
  farm_size_acres numeric(10,2),
  primary_crops text[] not null default '{}',
  district text,
  state text,
  verified boolean not null default false,
  rating numeric(2,1) not null default 5.0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.farmers to authenticated;
grant select on public.farmers to anon;
grant all on public.farmers to service_role;
alter table public.farmers enable row level security;
create policy "Farmers are viewable by everyone" on public.farmers for select using (true);
create policy "Users manage own farmer record" on public.farmers for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own farmer record" on public.farmers for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create trigger farmers_updated_at before update on public.farmers for each row execute function public.update_updated_at_column();

-- DEALERS
create table public.dealers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  business_name text not null default '',
  license_number text,
  market_name text,
  district text,
  state text,
  subscription_plan text not null default 'free',
  verified boolean not null default false,
  rating numeric(2,1) not null default 5.0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.dealers to authenticated;
grant select on public.dealers to anon;
grant all on public.dealers to service_role;
alter table public.dealers enable row level security;
create policy "Dealers are viewable by everyone" on public.dealers for select using (true);
create policy "Users insert own dealer record" on public.dealers for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own dealer record" on public.dealers for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create trigger dealers_updated_at before update on public.dealers for each row execute function public.update_updated_at_column();

-- DRIVERS
create table public.drivers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  vehicle_type text not null default '',
  vehicle_number text,
  capacity_tons numeric(6,2),
  license_number text,
  available boolean not null default true,
  rating numeric(2,1) not null default 5.0,
  total_deliveries integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.drivers to authenticated;
grant select on public.drivers to anon;
grant all on public.drivers to service_role;
alter table public.drivers enable row level security;
create policy "Drivers are viewable by everyone" on public.drivers for select using (true);
create policy "Users insert own driver record" on public.drivers for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own driver record" on public.drivers for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create trigger drivers_updated_at before update on public.drivers for each row execute function public.update_updated_at_column();

-- CROP LISTINGS
create table public.crop_listings (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid not null references public.farmers(id) on delete cascade,
  name text not null,
  name_ta text,
  quantity numeric(12,2) not null,
  unit text not null default 'kg',
  price_per_unit numeric(12,2) not null,
  harvest_date date,
  location text,
  image_urls text[] not null default '{}',
  description text,
  status public.listing_status not null default 'available',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index crop_listings_farmer_id_idx on public.crop_listings(farmer_id);
create index crop_listings_status_idx on public.crop_listings(status);
grant select, insert, update, delete on public.crop_listings to authenticated;
grant select on public.crop_listings to anon;
grant all on public.crop_listings to service_role;
alter table public.crop_listings enable row level security;
create policy "Available listings are public" on public.crop_listings for select using (
  status = 'available' or exists (select 1 from public.farmers f where f.id = farmer_id and f.user_id = auth.uid())
);
create policy "Farmers create own listings" on public.crop_listings for insert to authenticated with check (
  exists (select 1 from public.farmers f where f.id = farmer_id and f.user_id = auth.uid())
);
create policy "Farmers update own listings" on public.crop_listings for update to authenticated using (
  exists (select 1 from public.farmers f where f.id = farmer_id and f.user_id = auth.uid())
) with check (
  exists (select 1 from public.farmers f where f.id = farmer_id and f.user_id = auth.uid())
);
create policy "Farmers delete own listings" on public.crop_listings for delete to authenticated using (
  exists (select 1 from public.farmers f where f.id = farmer_id and f.user_id = auth.uid())
);
create trigger crop_listings_updated_at before update on public.crop_listings for each row execute function public.update_updated_at_column();

-- ORDERS
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique default 'ORD-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6)),
  listing_id uuid references public.crop_listings(id) on delete set null,
  farmer_id uuid not null references public.farmers(id) on delete cascade,
  dealer_id uuid not null references public.dealers(id) on delete cascade,
  driver_id uuid references public.drivers(id) on delete set null,
  crop_name text not null,
  quantity numeric(12,2) not null,
  unit text not null default 'kg',
  total_amount numeric(14,2) not null,
  payment_status public.payment_status not null default 'pending',
  delivery_status public.delivery_status not null default 'preparing',
  pickup_location text,
  drop_location text,
  distance_km numeric(8,2),
  driver_payout numeric(12,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index orders_farmer_id_idx on public.orders(farmer_id);
create index orders_dealer_id_idx on public.orders(dealer_id);
create index orders_driver_id_idx on public.orders(driver_id);
grant select, insert, update on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "Participants can view orders" on public.orders for select to authenticated using (
  exists (select 1 from public.farmers f where f.id = farmer_id and f.user_id = auth.uid())
  or exists (select 1 from public.dealers d where d.id = dealer_id and d.user_id = auth.uid())
  or exists (select 1 from public.drivers dr where dr.id = driver_id and dr.user_id = auth.uid())
);
create policy "Dealers create orders" on public.orders for insert to authenticated with check (
  exists (select 1 from public.dealers d where d.id = dealer_id and d.user_id = auth.uid())
);
create policy "Participants update orders" on public.orders for update to authenticated using (
  exists (select 1 from public.farmers f where f.id = farmer_id and f.user_id = auth.uid())
  or exists (select 1 from public.dealers d where d.id = dealer_id and d.user_id = auth.uid())
  or exists (select 1 from public.drivers dr where dr.id = driver_id and dr.user_id = auth.uid())
) with check (
  exists (select 1 from public.farmers f where f.id = farmer_id and f.user_id = auth.uid())
  or exists (select 1 from public.dealers d where d.id = dealer_id and d.user_id = auth.uid())
  or exists (select 1 from public.drivers dr where dr.id = driver_id and dr.user_id = auth.uid())
);
create trigger orders_updated_at before update on public.orders for each row execute function public.update_updated_at_column();

-- AUTO PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();