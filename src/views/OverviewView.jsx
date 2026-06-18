import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockData } from "../data/mockData";
import { T, chartTooltip } from "../theme/tokens";
import {
  DemoBanner,
  Tag,
  Divider,
  Card,
  CardHeader,
  CardBody,
  KPICard,
} from "../components/ui";
import { AnalysisActionButtons } from "../components/analysis";
import { buildLapseRiskPrompt, buildLapseRiskContext } from "../constants/amilaTeam";

export function OverviewView({ onRequestAnalysis }) {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <DemoBanner />
      <div className="responsive-grid-4">
        {mockData.kpis.map((k) => (
          <KPICard key={k.label} {...k} />
        ))}
      </div>
      <div className="responsive-grid-main-side">
        <Card>
          <CardHeader title="Revenue Velocity" subtitle="Month-over-month vs prior year" />
          <Divider />
          <CardBody>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={mockData.revenueVelocity} margin={{ top: 12, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={T.gold} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={T.gold} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="month" tick={{ fill: T.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: T.textMuted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip {...chartTooltip} formatter={(v) => [`$${v.toLocaleString()}`]} />
                <Area type="monotone" dataKey="revenue" stroke={T.gold} fill="url(#g1)" strokeWidth={2.5} name="This Year" />
                <Area
                  type="monotone"
                  dataKey="prev"
                  stroke={T.borderDark}
                  fill="none"
                  strokeWidth={1.5}
                  strokeDasharray="5 3"
                  name="Last Year"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Treatment Combos" subtitle="Most co-booked services" />
          <Divider />
          <CardBody style={{ paddingTop: 12 }}>
            {mockData.treatmentCombos.map((t, i) => (
              <div
                key={t.combo}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "9px 0",
                  borderBottom: i < mockData.treatmentCombos.length - 1 ? `1px solid ${T.border}` : "none",
                }}
              >
                <span style={{ fontSize: 12, color: T.text, fontWeight: 500 }}>{t.combo}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: T.textMuted }}>{t.count}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.delta > 0 ? T.green : T.rose }}>
                    {t.delta > 0 ? "+" : "-"}
                    {Math.abs(t.delta)}%
                  </span>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <div className="responsive-grid-2">
        <Card>
          <CardHeader title="Suite Utilization" subtitle="Revenue generated per treatment room" />
          <Divider />
          <CardBody style={{ paddingTop: 16 }}>
            {mockData.roomUtil.map((r) => (
              <div key={r.name} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{r.name}</span>
                  <span style={{ fontSize: 12, color: T.gold, fontWeight: 700 }}>${r.rev.toLocaleString()}</span>
                </div>
                <div style={{ height: 7, background: T.bg, borderRadius: 99, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${r.util}%`,
                      height: "100%",
                      background: r.util > 80 ? T.gold : r.util > 60 ? T.sage : T.borderDark,
                      borderRadius: 99,
                    }}
                  />
                </div>
                <div style={{ fontSize: 10, color: T.textMuted, marginTop: 3 }}>{r.util}% utilized</div>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            title="Lapse Risk"
            subtitle="High-LTV clients showing churn signals"
            right={<Tag color={T.rose} bg={T.roseLight}>4 urgent</Tag>}
          />
          <Divider />
          <CardBody style={{ paddingTop: 12 }}>
            {mockData.lapseRisk.map((c, i) => (
              <div
                key={c.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 0",
                  borderBottom: i < mockData.lapseRisk.length - 1 ? `1px solid ${T.border}` : "none",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ minWidth: 0, flex: "1 1 120px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: T.textMuted, marginTop: 1 }}>
                    {c.tag} · {c.lastVisit}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: T.gold, fontWeight: 700 }}>{c.ltv}</span>
                  <div style={{ width: 48, height: 5, background: T.bg, borderRadius: 99 }}>
                    <div
                      style={{
                        width: `${c.risk}%`,
                        height: "100%",
                        background: c.risk >= 80 ? T.rose : c.risk >= 60 ? T.goldDark : T.sage,
                        borderRadius: 99,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: c.risk >= 80 ? T.rose : T.goldDark,
                      minWidth: 26,
                    }}
                  >
                    {c.risk}%
                  </span>
                </div>
                {onRequestAnalysis && (
                  <AnalysisActionButtons
                    compact
                    onAi={() =>
                      onRequestAnalysis({
                        mode: "ai",
                        prefill: buildLapseRiskPrompt(c),
                        context: buildLapseRiskContext(c),
                      })
                    }
                    onExpert={() =>
                      onRequestAnalysis({
                        mode: "expert",
                        context: buildLapseRiskContext(c),
                      })
                    }
                  />
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
