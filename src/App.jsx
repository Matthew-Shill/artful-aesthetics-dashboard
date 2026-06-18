import { useState } from "react";
import { T } from "./theme/tokens";
import { NAV, PAGE_SUBTITLES } from "./constants/navigation";
import { Sidebar, PageHeader } from "./components/layout";
import { OverviewView } from "./views/OverviewView";
import { InventoryView } from "./views/InventoryView";
import { ForecastView } from "./views/ForecastView";
import { HypothesisView } from "./views/HypothesisView";
import { ProvidersView } from "./views/ProvidersView";
import { AIView } from "./views/AIView";

const views = {
  overview: OverviewView,
  inventory: InventoryView,
  forecast: ForecastView,
  hypothesis: HypothesisView,
  providers: ProvidersView,
  ai: AIView,
};

export default function App() {
  const [active, setActive] = useState("overview");
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_ANTHROPIC_API_KEY || "");
  const [showKey, setShowKey] = useState(false);

  const current = NAV.find((n) => n.id === active);
  const ActiveView = views[active];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: T.bg,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      <Sidebar
        active={active}
        onNavigate={setActive}
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
        showKey={showKey}
        onToggleShowKey={() => setShowKey((v) => !v)}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>
        <PageHeader title={current.label} subtitle={PAGE_SUBTITLES[active]} />
        <div style={{ padding: "24px 30px 36px" }}>
          {active === "ai" ? <AIView apiKey={apiKey} /> : <ActiveView />}
        </div>
      </div>
    </div>
  );
}
