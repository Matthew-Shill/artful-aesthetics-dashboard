import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { mockData, treatmentDemandSignals } from "../data/mockData";
import { T, chartTooltip } from "@artful/shared/tokens";
import { DemoBanner, Tag, Divider, Card, CardHeader, CardBody } from "../components/ui";

export function ForecastView() {
  const fcData = mockData.xgbForecast;
  const peakMonth = fcData.filter((d) => d.forecast).reduce((a, b) => (b.forecast > a.forecast ? b : a), { forecast: 0 });

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <DemoBanner />
      <Card>
        <CardHeader
          title="XGBoost Revenue Forecast — Next 6 Months"
          subtitle="Gradient-boosted model trained on 24 months of revenue, seasonality, and treatment-mix signals"
          right={<Tag>95% CI</Tag>}
        />
        <Divider />
        <CardBody>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={fcData} margin={{ top: 12, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="fc1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.gold} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={T.gold} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fc2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.sage} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={T.sage} stopOpacity={0} />
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
              <Tooltip {...chartTooltip} formatter={(v, n) => (v ? [`$${v.toLocaleString()}`, n] : [null])} />
              <ReferenceLine
                x="Jun"
                stroke={T.borderDark}
                strokeDasharray="4 3"
                label={{ value: "Today", position: "top", fill: T.textMuted, fontSize: 10 }}
              />
              <Area type="monotone" dataKey="hi" stroke="none" fill={T.goldLight} name="Upper CI" fillOpacity={0.5} />
              <Area type="monotone" dataKey="lo" stroke="none" fill={T.surface} name="Lower CI" />
              <Area
                type="monotone"
                dataKey="actual"
                stroke={T.gold}
                fill="url(#fc1)"
                strokeWidth={2.5}
                name="Actual"
                dot={{ fill: T.gold, r: 3 }}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke={T.sage}
                fill="url(#fc2)"
                strokeWidth={2}
                strokeDasharray="6 3"
                name="XGBoost Forecast"
                dot={{ fill: T.sage, r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="responsive-grid-4" style={{ gap: 12, marginTop: 20 }}>
            {[
              { label: "Peak Month", value: peakMonth.month, sub: `$${peakMonth.forecast?.toLocaleString()} predicted` },
              { label: "Model R2", value: "0.94", sub: "Variance explained" },
              { label: "MAPE", value: "3.2%", sub: "Mean absolute error" },
              { label: "Confidence", value: "95%", sub: "Prediction interval" },
            ].map((s) => (
              <div key={s.label} style={{ background: T.bg, borderRadius: 10, padding: "14px 16px" }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: T.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 6,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: T.text, letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 3 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader
          title="Treatment Demand Signals"
          subtitle="Predicted seasonal lift per service — use to plan staffing and product orders"
        />
        <Divider />
        <CardBody>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={treatmentDemandSignals} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
              <XAxis dataKey="treatment" tick={{ fill: T.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: T.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip {...chartTooltip} formatter={(v) => [`+${v}%`, "Predicted lift"]} />
              <Legend wrapperStyle={{ fontSize: 11, color: T.textMuted }} />
              <Bar dataKey="jul" name="July" fill={T.gold} radius={[4, 4, 0, 0]} />
              <Bar dataKey="aug" name="August" fill={T.sage} radius={[4, 4, 0, 0]} />
              <Bar dataKey="sep" name="September" fill={T.goldDark} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
}
