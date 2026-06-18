import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { hypothesisTests } from "../data/hypothesisTests";
import { T, chartTooltip } from "../theme/tokens";
import { DemoBanner, Tag, Divider, Card, CardHeader, CardBody } from "../components/ui";

function bellCurve(mean, std, n = 60) {
  return Array.from({ length: n }, (_, i) => {
    const x = mean - 3.5 * std + (i / (n - 1)) * 7 * std;
    const y = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / std) ** 2) * std * 100;
    return { x: Math.round(x), y: parseFloat(y.toFixed(3)) };
  });
}

export function HypothesisView() {
  const [selected, setSelected] = useState(hypothesisTests[0].id);
  const test = hypothesisTests.find((t) => t.id === selected);
  const effectColor = test.effect === "large" ? T.gold : test.effect === "medium" ? T.sage : T.textMuted;
  const curveA = bellCurve(test.groupA.mean, test.groupA.std);
  const curveB = bellCurve(test.groupB.mean, test.groupB.std);
  const allX = [...new Set([...curveA.map((d) => d.x), ...curveB.map((d) => d.x)])].sort((a, b) => a - b);
  const combined = allX.map((x) => ({
    x,
    a: curveA.find((d) => d.x === x)?.y ?? null,
    b: curveB.find((d) => d.x === x)?.y ?? null,
  }));

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <DemoBanner />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {hypothesisTests.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            style={{
              background: selected === t.id ? T.charcoal : T.surface,
              border: `1px solid ${selected === t.id ? T.charcoal : T.border}`,
              borderRadius: 12,
              padding: "14px 16px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: selected === t.id ? "rgba(255,255,255,0.4)" : T.textMuted,
                marginBottom: 4,
                letterSpacing: "0.05em",
              }}
            >
              {t.type}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: selected === t.id ? T.white : T.text,
                lineHeight: 1.3,
              }}
            >
              {t.name}
            </div>
            <div style={{ marginTop: 8 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 99,
                  background: t.significant
                    ? selected === t.id
                      ? "rgba(255,255,255,0.12)"
                      : T.greenLight
                    : selected === t.id
                      ? "rgba(255,255,255,0.08)"
                      : T.roseLight,
                  color: t.significant
                    ? selected === t.id
                      ? "#A8E6C3"
                      : T.green
                    : selected === t.id
                      ? "#F9BFBB"
                      : T.rose,
                }}
              >
                {t.significant ? "Significant" : "Not significant"}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <CardHeader title="Distribution Overlap" subtitle="Group A vs B — separation indicates effect magnitude" />
          <Divider />
          <CardBody>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={combined} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="da" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={T.gold} stopOpacity={0.45} />
                    <stop offset="95%" stopColor={T.gold} stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="db" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={T.sage} stopOpacity={0.45} />
                    <stop offset="95%" stopColor={T.sage} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="x" tick={{ fill: T.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip {...chartTooltip} formatter={(v, n) => (v != null ? [v.toFixed(3), n] : [null])} />
                <Area type="monotone" dataKey="a" name={test.groupA.label} stroke={T.gold} fill="url(#da)" strokeWidth={2} connectNulls />
                <Area type="monotone" dataKey="b" name={test.groupB.label} stroke={T.sage} fill="url(#db)" strokeWidth={2} connectNulls />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Statistical Results" subtitle={test.hypothesis} />
          <Divider />
          <CardBody style={{ paddingTop: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { label: test.groupA.label + " Mean", value: test.groupA.mean.toLocaleString(), sub: `n = ${test.groupA.n}` },
                { label: test.groupB.label + " Mean", value: test.groupB.mean.toLocaleString(), sub: `n = ${test.groupB.n}` },
                { label: "t-statistic", value: test.tStat, sub: test.type },
                {
                  label: "p-value",
                  value: test.pValue < 0.001 ? "< 0.001" : test.pValue,
                  sub: test.pValue < 0.05 ? "Reject H0" : "Fail to reject H0",
                },
              ].map((s) => (
                <div key={s.label} style={{ background: T.bg, borderRadius: 10, padding: "12px 14px" }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: T.textMuted,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      marginBottom: 4,
                    }}
                  >
                    {s.label}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: T.text }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: T.textMuted, marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: test.significant ? T.greenLight : T.roseLight,
                borderRadius: 10,
                padding: "12px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: test.significant ? T.green : T.rose,
                  marginBottom: 4,
                }}
              >
                {test.significant
                  ? "Statistically significant (alpha = 0.05)"
                  : "Not statistically significant"}
              </div>
              <div style={{ fontSize: 11, color: T.textMid }}>
                95% CI for difference: [{test.ciDiff[0].toLocaleString()}, {test.ciDiff[1].toLocaleString()}] — Effect
                size:{" "}
                <span style={{ fontWeight: 700, color: effectColor }}>{test.effect}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="All Experiments" subtitle="Active hypothesis tests across key business levers" />
        <Divider />
        <CardBody style={{ paddingTop: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Test", "Type", "p-value", "Effect", "Verdict"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "12px 8px",
                      fontSize: 10,
                      fontWeight: 700,
                      color: T.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hypothesisTests.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  style={{
                    borderBottom: `1px solid ${T.border}`,
                    cursor: "pointer",
                    background: selected === t.id ? T.goldLight : "transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <td style={{ padding: "12px 8px", fontSize: 12, fontWeight: 600, color: T.text }}>{t.name}</td>
                  <td style={{ padding: "12px 8px", fontSize: 11, color: T.textMuted }}>{t.type}</td>
                  <td style={{ padding: "12px 8px", fontSize: 12, fontWeight: 700, color: t.pValue < 0.05 ? T.green : T.rose }}>
                    {t.pValue < 0.001 ? "< 0.001" : t.pValue}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    <Tag
                      color={t.effect === "large" ? T.goldDark : t.effect === "medium" ? T.sage : T.textMuted}
                      bg={t.effect === "large" ? T.goldLight : t.effect === "medium" ? T.sageLight : T.bg}
                    >
                      {t.effect}
                    </Tag>
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: t.significant ? T.green : T.rose }}>
                      {t.significant ? "Confirmed" : "Inconclusive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
