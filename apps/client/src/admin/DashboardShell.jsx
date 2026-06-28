"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { T } from "@artful/shared/tokens";
import { NAV, PAGE_SUBTITLES } from "./constants/navigation";
import { Sidebar, PageHeader } from "./components/layout";
import { useIsMobile } from "./hooks/useIsMobile";
import { useDashboardData } from "./hooks/useDashboardData";
import { OverviewView } from "./views/OverviewView";
import { InventoryView } from "./views/InventoryView";
import { ForecastView } from "./views/ForecastView";
import { HypothesisView } from "./views/HypothesisView";
import { ProvidersView } from "./views/ProvidersView";
import { AIView } from "./views/AIView";
import { IntegrationsView } from "./views/IntegrationsView";

const views = {
  overview: OverviewView,
  inventory: InventoryView,
  forecast: ForecastView,
  hypothesis: HypothesisView,
  providers: ProvidersView,
  ai: AIView,
  integrations: IntegrationsView,
};

export function DashboardShell() {
  useDashboardData();
  const params = useParams();
  const router = useRouter();
  const sectionParam = Array.isArray(params.section) ? params.section[0] : params.section;
  const active = NAV.some((item) => item.id === sectionParam) ? sectionParam : "overview";

  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "");
  const [showKey, setShowKey] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analysisMode, setAnalysisMode] = useState("ai");
  const [analysisPrefill, setAnalysisPrefill] = useState(null);
  const [analysisContext, setAnalysisContext] = useState(null);
  const isMobile = useIsMobile();

  const current = NAV.find((item) => item.id === active) || NAV[0];
  const ActiveView = views[active];

  const clearAnalysisPrefill = useCallback(() => setAnalysisPrefill(null), []);

  const requestAnalysis = useCallback(
    ({ mode, prefill, context }) => {
      setAnalysisMode(mode);
      if (prefill) setAnalysisPrefill(prefill);
      if (context) setAnalysisContext(context);
      router.push("/admin/ai");
    },
    [router]
  );

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = isMobile && sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, sidebarOpen]);

  function handleNavigate(id) {
    router.push(`/admin/${id}`);
    if (isMobile) {
      setSidebarOpen(false);
    }
  }

  return (
    <div
      className="app-shell"
      style={{
        background: T.bg,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        active={active}
        onNavigate={handleNavigate}
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
        showKey={showKey}
        onToggleShowKey={() => setShowKey((value) => !value)}
        isOpen={!isMobile || sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-main">
        <PageHeader
          title={current.label}
          subtitle={PAGE_SUBTITLES[active]}
          onMenuToggle={() => setSidebarOpen(true)}
          showMenuButton={isMobile}
        />
        <div className="app-content">
          {active === "ai" ? (
            <AIView
              apiKey={apiKey}
              mode={analysisMode}
              onModeChange={setAnalysisMode}
              prefill={analysisPrefill}
              context={analysisContext}
              onPrefillConsumed={clearAnalysisPrefill}
            />
          ) : active === "overview" ? (
            <OverviewView onRequestAnalysis={requestAnalysis} />
          ) : (
            <ActiveView />
          )}
        </div>
      </div>
    </div>
  );
}
