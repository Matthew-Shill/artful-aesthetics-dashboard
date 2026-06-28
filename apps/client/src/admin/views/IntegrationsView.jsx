import { useEffect, useState } from "react";
import { T } from "@artful/shared/tokens";
import { useAuth } from "../context/AuthContext";
import { Card, CardHeader, CardBody, Tag, DemoBanner } from "../components/ui";

const INTEGRATION_TYPES = [
  { type: "booking", label: "Booking System", function: "sync-booking" },
  { type: "pos", label: "Point of Sale", function: "sync-pos" },
  { type: "inventory", label: "Inventory Software", function: "sync-inventory" },
];

export function IntegrationsView() {
  const { supabase, session } = useAuth();
  const [sources, setSources] = useState([]);
  const [syncRuns, setSyncRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase || !session) {
      setLoading(false);
      return;
    }

    async function load() {
      const [sourcesRes, runsRes] = await Promise.all([
        supabase.from("integration_sources").select("*").order("created_at"),
        supabase.from("sync_runs").select("*").order("started_at", { ascending: false }).limit(10),
      ]);
      setSources(sourcesRes.data || []);
      setSyncRuns(runsRes.data || []);
      setLoading(false);
    }

    load();
  }, [supabase, session]);

  async function triggerSync(source) {
    const integration = INTEGRATION_TYPES.find((i) => i.type === source.type);
    if (!integration || !supabase) return;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const { data: { session: currentSession } } = await supabase.auth.getSession();

    await fetch(`${supabaseUrl}/functions/v1/${integration.function}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentSession?.access_token}`,
      },
      body: JSON.stringify({ sourceId: source.id }),
    });

    const { data: runs } = await supabase
      .from("sync_runs")
      .select("*")
      .order("started_at", { ascending: false })
      .limit(10);
    setSyncRuns(runs || []);
  }

  if (!supabase) {
    return (
      <DemoBanner message="Connect Supabase to manage integrations. Edge function stubs are ready in supabase/functions/." />
    );
  }

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <DemoBanner message="Integration adapters are scaffolded. Add credentials to integration_sources when external software APIs are available." />

      <Card>
        <CardHeader title="Connected Sources" subtitle="External software linked to the dashboard" />
        <CardBody>
          {loading ? (
            <p style={{ color: T.textMuted, fontSize: 13 }}>Loading...</p>
          ) : sources.length === 0 ? (
            <p style={{ color: T.textMuted, fontSize: 13 }}>
              No integrations configured yet. Insert rows into the integration_sources table via Supabase Studio.
            </p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {sources.map((source) => (
                <div
                  key={source.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 14,
                    border: `1px solid ${T.border}`,
                    borderRadius: 12,
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{source.name}</p>
                    <p style={{ margin: "4px 0 0", fontSize: 12, color: T.textMuted }}>
                      {source.type} · Last sync: {source.last_sync_at ? new Date(source.last_sync_at).toLocaleString() : "Never"}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Tag color={source.status === "active" ? "green" : source.status === "error" ? "rose" : "amber"}>
                      {source.status}
                    </Tag>
                    <button
                      type="button"
                      onClick={() => triggerSync(source)}
                      style={{
                        padding: "8px 14px",
                        background: T.goldLight,
                        border: `1px solid ${T.border}`,
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Sync Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Recent Sync Runs" subtitle="Latest integration sync activity" />
        <CardBody>
          {syncRuns.length === 0 ? (
            <p style={{ color: T.textMuted, fontSize: 13 }}>No sync runs yet.</p>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {syncRuns.map((run) => (
                <div key={run.id} style={{ fontSize: 12, color: T.textMid, padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                  <strong>{run.status}</strong> · {run.records_synced ?? 0} records ·{" "}
                  {new Date(run.started_at).toLocaleString()}
                  {run.error && <span style={{ color: T.rose }}> · {run.error}</span>}
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
