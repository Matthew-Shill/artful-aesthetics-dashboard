# Artful Analytics Suite

A client-facing analytics dashboard demo for **Artful Aesthetic Medicine**, built by **Amila Health Analytics**. All metrics use illustrative demo data designed for sales presentations and product walkthroughs.

## Features

| Tab | Description |
|-----|-------------|
| **Overview** | KPIs, revenue velocity, treatment combos, suite utilization, lapse risk |
| **Inventory** | Neurotoxin and filler tracking, session logs, waste, reorder planner |
| **Forecast** | XGBoost revenue forecast with confidence intervals and demand signals |
| **Experiments** | Hypothesis testing with statistical results and distribution charts |
| **Providers** | Provider performance, scatter analysis, acquisition LTV |
| **AI Analyst** | Claude-powered chat grounded in dashboard demo data |

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## AI Analyst setup

The AI tab calls the Anthropic API directly from the browser. To enable it locally:

1. Copy `.env.example` to `.env`
2. Add your key: `VITE_ANTHROPIC_API_KEY=sk-ant-...`
3. Or paste the key in the sidebar at runtime

## Project structure

```
src/
├── App.jsx                 # Shell, routing, API key state
├── components/
│   ├── layout/             # Sidebar, page header
│   └── ui/                 # Card, Tag, KPI, DemoBanner
├── constants/              # Navigation, AI system prompt
├── data/                   # Mock demo datasets
├── theme/tokens.js         # Design tokens and chart styles
└── views/                  # One file per dashboard tab
```

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build

## Notes

- Demo data is static and meant for presentation only
- Connect real booking, POS, and inventory exports to replace mock data in production
- Branding: Artful Aesthetic Medicine · Powered by Amila Health Analytics
