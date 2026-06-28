-- Public tables: newsletter and contact submissions

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now(),
  source text default 'website'
);

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table newsletter_subscribers enable row level security;
alter table contact_submissions enable row level security;

create policy "Anyone can subscribe to newsletter"
  on newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated users can read newsletter subscribers"
  on newsletter_subscribers for select
  to authenticated
  using (true);

create policy "Anyone can submit contact form"
  on contact_submissions for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated users can read contact submissions"
  on contact_submissions for select
  to authenticated
  using (true);

-- Integration hub tables (admin only)

create table if not exists integration_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('booking', 'pos', 'inventory', 'other')),
  config_json jsonb default '{}',
  status text not null default 'inactive' check (status in ('active', 'inactive', 'error')),
  last_sync_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists sync_runs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references integration_sources(id) on delete cascade,
  status text not null check (status in ('running', 'success', 'error')),
  records_synced integer default 0,
  error text,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

-- Normalized business data

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  external_id text not null,
  source_id uuid references integration_sources(id) on delete set null,
  client_name text,
  service text,
  provider text,
  scheduled_at timestamptz,
  status text,
  created_at timestamptz not null default now(),
  unique (external_id, source_id)
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  external_id text not null,
  source_id uuid references integration_sources(id) on delete set null,
  amount numeric(10, 2),
  service text,
  provider text,
  occurred_at timestamptz,
  created_at timestamptz not null default now(),
  unique (external_id, source_id)
);

create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  units_on_hand numeric(10, 2),
  reorder_point numeric(10, 2),
  last_updated timestamptz not null default now()
);

create table if not exists inventory_sessions (
  id uuid primary key default gen_random_uuid(),
  provider text,
  product text,
  units_used numeric(10, 2),
  waste numeric(10, 2),
  session_date date,
  created_at timestamptz not null default now()
);

alter table integration_sources enable row level security;
alter table sync_runs enable row level security;
alter table appointments enable row level security;
alter table transactions enable row level security;
alter table inventory_items enable row level security;
alter table inventory_sessions enable row level security;

create policy "Authenticated users manage integration_sources"
  on integration_sources for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users manage sync_runs"
  on sync_runs for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users read appointments"
  on appointments for select
  to authenticated
  using (true);

create policy "Authenticated users read transactions"
  on transactions for select
  to authenticated
  using (true);

create policy "Authenticated users read inventory_items"
  on inventory_items for select
  to authenticated
  using (true);

create policy "Authenticated users read inventory_sessions"
  on inventory_sessions for select
  to authenticated
  using (true);
