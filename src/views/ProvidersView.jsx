import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { mockData } from "../data/mockData";
import { T, chartTooltip } from "../theme/tokens";
import { DemoBanner, Card, CardHeader, CardBody, Divider } from "../components/ui";

export function ProvidersView() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <DemoBanner />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {mockData.providers.map((p) => (
          <Card key={p.name}>
            <div style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: T.gold, fontWeight: 700, marginTop: 2 }}>
                    ${p.revenue.toLocaleString()} / mo
                  </div>
                </div>
                <div
                  style={{
                    background: T.goldLight,
                    color: T.goldDark,
                    fontSize: 12,
                    fontWeight: 800,
                    padding: "5px 10px",
                    borderRadius: 8,
                  }}
                >
                  {p.sentiment}
                </div>
              </div>
              {[
                { label: "Rebooking", val: p.rebooking, color: p.rebooking >= 80 ? T.gold : T.sage },
                { label: "Upsell", val: p.upsell, color: p.upsell >= 65 ? T.green : T.textMuted },
              ].map((m) => (
                <div key={m.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: T.textMuted, fontWeight: 600 }}>{m.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: m.color }}>{m.val}%</span>
                  </div>
                  <div style={{ height: 5, background: T.bg, borderRadius: 99 }}>
                    <div style={{ width: `${m.val}%`, height: "100%", background: m.color, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <CardHeader title="Rebooking vs Upsell" subtitle="Top-right quadrant indicates highest-impact providers" />
          <Divider />
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis
                  type="number"
                  dataKey="rebooking"
                  name="Rebooking %"
                  domain={[70, 100]}
                  tick={{ fill: T.textMuted, fontSize: 11 }}
                  label={{ value: "Rebooking %", position: "insideBottom", offset: -8, fill: T.textMuted, fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="upsell"
                  name="Upsell %"
                  domain={[55, 80]}
                  tick={{ fill: T.textMuted, fontSize: 11 }}
                  label={{ value: "Upsell %", angle: -90, position: "insideLeft", fill: T.textMuted, fontSize: 11 }}
                />
                <Tooltip
                  {...chartTooltip}
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ payload }) => {
                    if (!payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div
                        style={{
                          background: T.surface,
                          border: `1px solid ${T.border}`,
                          borderRadius: 10,
                          padding: "10px 14px",
                          fontSize: 12,
                        }}
                      >
                        <div style={{ fontWeight: 700, color: T.text }}>{d.name}</div>
                        <div style={{ color: T.textMuted }}>Rebooking: {d.rebooking}%</div>
                        <div style={{ color: T.textMuted }}>Upsell: {d.upsell}%</div>
                      </div>
                    );
                  }}
                />
                <Scatter data={mockData.providers} fill={T.gold}>
                  {mockData.providers.map((_, i) => (
                    <Cell key={i} fill={[T.gold, T.sage, T.goldDark][i % 3]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="LTV by Acquisition Source" subtitle="Where your highest-value clients originate" />
          <Divider />
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mockData.acquisitionLTV} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis
                  type="number"
                  tick={{ fill: T.textMuted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <YAxis
                  type="category"
                  dataKey="source"
                  tick={{ fill: T.text, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...chartTooltip} formatter={(v) => [`$${v.toLocaleString()}`, "Avg LTV"]} />
                <Bar dataKey="ltv" radius={[0, 8, 8, 0]}>
                  {mockData.acquisitionLTV.map((_, i) => (
                    <Cell key={i} fill={[T.gold, T.goldDark, T.sage, T.textMuted, T.rose][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
