export const NAV = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "inventory", label: "Inventory", icon: "◫", badge: "alert" },
  { id: "forecast", label: "Forecast", icon: "⟁" },
  { id: "hypothesis", label: "Experiments", icon: "⌬" },
  { id: "providers", label: "Providers", icon: "◉" },
  { id: "ai", label: "AI Analyst", icon: "✦", badge: "ai" },
];

export const PAGE_SUBTITLES = {
  overview: "Business health — the metrics that actually move the needle",
  inventory:
    "Unit-level product tracking — neurotoxins by unit, filler by ml, partial syringe logging, waste and reorder management",
  forecast:
    "XGBoost model with 95% prediction intervals, trained on 24 months of revenue and treatment-mix signals",
  hypothesis: "Statistically rigorous experiments across key business levers",
  providers: "Retention, upsell conversion, and revenue contribution by provider",
  ai: "Ask anything about the data in this dashboard — powered by Claude",
};
