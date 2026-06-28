# Artful Aesthetics

Monorepo for **Artful Aesthetic Medicine** — public website and owner analytics dashboard in a single Next.js app, backed by one Supabase project.

## Apps

| App | Package | URL | Description |
|-----|---------|-----|-------------|
| **Client** | `@artful/client` | `artfulaestheticmedicine.com` | Public website + admin dashboard at `/admin` |
| **Admin (legacy)** | `@artful/admin` | — | Deprecated Vite app; dashboard now lives in the client app |

## Quick start

```bash
npm install
cp apps/client/.env.example apps/client/.env.local
# Add your Supabase URL + anon key
npm run dev:client
```

- Public site: http://localhost:3000  
- Admin login: http://localhost:3000/admin/login

## Admin access

Dashboard access is restricted to:

- `erica@artfulaestheticmedicine.com` (Owner)
- `nadine@nadineshill.com` (Data Analyst)

Create both users in **Supabase → Authentication → Users** with email/password. Only these emails can sign in; all other accounts are rejected even if they exist in Supabase Auth.

## Supabase — one project is enough

Use a **single Supabase project** for:

- Public contact & newsletter forms
- Admin login (Supabase Auth)
- Integration sync tables
- Live dashboard data (when synced)

You do **not** need separate Supabase projects for client vs admin.

## Project structure

```
apps/
├── client/              Next.js — public site + /admin dashboard
└── admin/               Legacy Vite app (optional local dev)
packages/
└── shared/              Design tokens, Supabase helpers
supabase/
├── migrations/          Database schema
└── functions/           Edge Functions (AI proxy, sync stubs)
```

## Environment setup

1. Copy `apps/client/.env.example` → `apps/client/.env.local`
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Run migrations: `supabase db push` (requires Supabase CLI)
4. Create admin users in Supabase Auth (see above)

Optional: `NEXT_PUBLIC_ANTHROPIC_API_KEY` for AI Analyst in dev (prefer Edge Function in production).

## Deployment (Vercel)

**One Vercel project:**

- Root Directory: `apps/client`
- Domain: `artfulaestheticmedicine.com`
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

In Supabase Auth settings, set site URL to your production domain and allow redirect URLs for `/admin/*`.

## Scripts

- `npm run dev:client` — public site + admin dashboard
- `npm run build:client` — production build
- `npm run dev:admin` — legacy standalone admin (deprecated)
