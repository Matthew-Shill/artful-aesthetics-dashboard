# Artful Aesthetics

Monorepo for **Artful Aesthetic Medicine** — public website and owner analytics dashboard in a single Next.js app, backed by one Supabase project.

## Apps

| App | Package | URL | Description |
|-----|---------|-----|-------------|
| **Client** | `@artful/client` | `www.artfulaestheticmedicine.com` (apex redirects here) | Public website + admin dashboard at `/admin` |
| **Admin (legacy)** | `@artful/admin` | — | Deprecated Vite app; dashboard now lives in the client app |

## Quick start

```bash
npm install
cp apps/client/.env.example apps/client/.env.local
# Add your Supabase URL + anon key
npm run dev:client
```

- Public site: http://localhost:3000  
- Admin login: http://localhost:3000/login

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
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (defaults to the live GA4 property if omitted).
3. Run migrations: `supabase db push` (requires Supabase CLI)
4. Create admin users in Supabase Auth (see above)

Optional: `NEXT_PUBLIC_ANTHROPIC_API_KEY` for AI Analyst in dev (prefer Edge Function in production).

## Analytics & conversion tracking

GA4 property `G-DRMHQ428LB` (override with `NEXT_PUBLIC_GA_MEASUREMENT_ID`). Events are queued via `src/lib/gtag.js`, which pushes to `dataLayer` rather than calling `window.gtag` directly — effects can run before the tag loads, and a direct call would silently drop the event.

| Event | Fires on | Purpose |
|-------|----------|---------|
| `booking_start` | `/book`, `/get-started`, `/consultation`, every service page | Top of the booking funnel |
| `booking_complete` | The `/thank-you` landing after a Mangomint booking | The conversion — mark as a key event |

Both carry the same attribution parameters, so funnel drop-off can be compared channel by channel.

### How booking completion is detected

Mangomint redirects to `https://www.artfulaestheticmedicine.com/thank-you` (`siteConfig.bookingThankYouPath`) after a booking. That page is `noIndex` and disallowed in `robots.js` — don't link to it from the site. The redirect is configured by Mangomint support on their side; there is no self-service setting, so it has to be re-requested if the account is ever rebuilt.

That landing is the authoritative signal. There is also a fallback: booking happens in a cross-origin iframe whose internals are invisible, but the iframe announces a finished booking by posting a JSON string to the parent window.

```json
{ "type": "redirect", "redirectUrl": "..." }
```

Mangomint's own `booking.mangomint.com/app.js` listens for that and does `window.location = redirectUrl`. `BookingComplete` listens for the same message, but deliberately **waits** rather than reporting immediately: the navigation starts in the same tick, and an event still queued in the `dataLayer` dies with the page. If the redirect lands on `/thank-you` the page reports the booking itself; the fallback only fires when the redirect points somewhere uninstrumented or never happens. `trackBookingComplete` de-duplicates per session either way, so a booking counts once. The `booking_signal` parameter records which path reported it.

### Knowing where a booking came from

GA4's own session attribution is not trustworthy here, for two reasons. The Mangomint redirect can hand the visitor back with a `booking.mangomint.com` referrer, which starts a *new* GA4 session and credits the booking to Mangomint instead of Google or Instagram. And choosing a treatment and a time routinely takes longer than the 30-minute session timeout, which rolls the session over to "direct".

So `src/lib/attribution.js` captures the acquisition touch on arrival — UTM tags, ad click IDs (`gclid`, `fbclid`, `msclkid`, …) and referrer — classifies it into a channel, and stores it in `localStorage` for 90 days. `AttributionTracker` in the root layout runs that on every entry, because the tags only exist on the landing URL and are long gone by the time booking starts. The stored touch is then replayed onto the booking events, which makes the channel a property of the conversion rather than something GA4 has to reconstruct.

Last touch uses the last-non-direct-click convention: a later direct visit does not erase the click that earned the visit. `attr_channel` is one of `paid_search`, `organic_search`, `paid_social`, `organic_social`, `email`, `sms`, `referral`, `direct`.

| Parameter | Meaning |
|-----------|---------|
| `attr_channel` / `attr_source` / `attr_medium` | Converting (last non-direct) touch |
| `attr_campaign` / `attr_referrer` | Campaign tag and referring host, when present |
| `attr_first_channel` / `attr_first_source` | The very first touch — what originally found us |
| `attr_landing_page` | First page of the journey |
| `attr_touches` | Distinct acquisition touches before booking |
| `attr_days_to_book` | Days from first touch to booking |

Parameters are prefixed because GA4 reserves the bare `source`, `medium`, `campaign`, `term` and `content` event parameters for manual campaign attribution — sending those would *rewrite* the traffic source instead of describing it.

### GA4 setup

These are console-side and not covered by deploying the site.

1. Admin → Events: mark `booking_complete` as a key event.
2. Admin → Data streams → Configure tag settings → **List unwanted referrals**: add `mangomint.com`. Without this the post-booking redirect registers as a referral and restarts the session, so GA4's own acquisition reports credit bookings to Mangomint. The `attr_*` parameters are unaffected, but the standard reports are.
3. Admin → Custom definitions: register the `attr_*` parameters above as event-scoped custom dimensions, and `first_channel` / `first_source` as user-scoped ones. Parameters are not queryable in reports or explorations until registered, and registration is not retroactive — do it before you want the data.
4. Admin → Data filters: confirm **Developer Traffic** is not set to `Active`. It permanently discards any event carrying `debug_mode`, and excluded data is never recoverable.

## Deployment (Vercel)

**One Vercel project:**

- Root Directory: `apps/client`
- Domain: `www.artfulaestheticmedicine.com` (set as primary; apex `artfulaestheticmedicine.com` should redirect to www)
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`

In Supabase Auth settings, set site URL to `https://www.artfulaestheticmedicine.com` and allow redirect URLs for `/login` and `/admin/*`.

## Scripts

- `npm run dev:client` — public site + admin dashboard
- `npm run build:client` — production build
- `npm run dev:admin` — legacy standalone admin (deprecated)
