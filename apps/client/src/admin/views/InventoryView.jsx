import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { inventoryData, getAllProducts, isFillerProduct } from "../data/inventoryData";
import { T, chartTooltip } from "@artful/shared/tokens";
import { DemoBanner, Tag, Divider, Card, CardHeader, CardBody } from "../components/ui";

export function InventoryView() {
  const allProducts = getAllProducts();
  const [activeProduct, setActiveProduct] = useState(allProducts[0].product);
  const selected = allProducts.find((p) => p.product === activeProduct);
  const isFiller = isFillerProduct(activeProduct);
  const unit = isFiller ? "ml" : "units";
  const onHand = isFiller ? selected.totalMlOnHand : selected.totalUnitsOnHand;
  const reorderAlert = onHand <= selected.reorderPoint;
  const providerTotals = selected.sessionLog.reduce((acc, s) => {
    acc[s.provider] = (acc[s.provider] || 0) + (isFiller ? s.ml : s.units);
    return acc;
  }, {});
  const providerData = Object.entries(providerTotals).map(([name, val]) => ({ name, val }));
  const usedTotal = selected.usedThisMonth;
  const wasteRate = usedTotal > 0 ? ((selected.wastedThisMonth / usedTotal) * 100).toFixed(1) : "0.0";

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <DemoBanner />
      <div className="responsive-grid-3" style={{ gap: 10 }}>
        {allProducts.map((p) => {
          const oh = isFillerProduct(p.product) ? p.totalMlOnHand : p.totalUnitsOnHand;
          const alert = oh <= p.reorderPoint;
          return (
            <button
              key={p.product}
              onClick={() => setActiveProduct(p.product)}
              style={{
                background: activeProduct === p.product ? T.charcoal : T.surface,
                border: `1px solid ${activeProduct === p.product ? T.charcoal : alert ? T.rose + "66" : T.border}`,
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
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: activeProduct === p.product ? "rgba(255,255,255,0.4)" : T.textMuted,
                  marginBottom: 4,
                }}
              >
                {isFillerProduct(p.product) ? "Dermal Filler" : "Neurotoxin"}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: activeProduct === p.product ? T.white : T.text,
                  lineHeight: 1.3,
                }}
              >
                {p.product}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: activeProduct === p.product ? "rgba(255,255,255,0.35)" : T.textMuted,
                  marginTop: 3,
                }}
              >
                {p.supplier}
              </div>
              {alert && (
                <div style={{ marginTop: 8 }}>
                  <Tag color={T.rose} bg={T.roseLight}>
                    Reorder
                  </Tag>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="responsive-grid-5">
        {[
          {
            label: `On Hand (${unit})`,
            value: onHand.toLocaleString(),
            sub: reorderAlert ? "Below reorder threshold" : "Sufficient stock",
            alert: reorderAlert,
          },
          { label: `Used This Month (${unit})`, value: usedTotal.toLocaleString(), sub: "of current inventory" },
          {
            label: `Waste (${unit})`,
            value: selected.wastedThisMonth.toString(),
            sub: `${wasteRate}% waste rate`,
          },
          {
            label: "Cost per " + unit,
            value: `$${(isFiller ? selected.costPerMl : selected.costPerUnit).toFixed(2)}`,
            sub: "Acquisition cost",
          },
          {
            label: "Retail per " + unit,
            value: `$${(isFiller ? selected.retailPerMl : selected.retailPerUnit).toFixed(2)}`,
            sub: `${
              inventoryData.marginSummary.find((m) =>
                selected.product.toLowerCase().includes(m.product.toLowerCase().split(" ")[0])
              )?.margin || "—"
            }% gross margin`,
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: s.alert ? T.roseLight : T.bg,
              border: `1px solid ${s.alert ? T.rose + "44" : T.border}`,
              borderRadius: 10,
              padding: "14px 16px",
            }}
          >
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
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: s.alert ? T.rose : T.text,
                letterSpacing: "-0.02em",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, marginTop: 3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="responsive-grid-main-side">
        <Card>
          <CardHeader
            title={`Session Log — ${selected.product}`}
            subtitle={`Tracked per treatment by ${unit}. Partial ${isFiller ? "syringes" : "vials"} logged individually.`}
          />
          <Divider />
          <CardBody style={{ paddingTop: 0 }}>
            <div className="table-scroll">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                  {[
                    "Date",
                    "Client",
                    "Provider",
                    `${unit.charAt(0).toUpperCase() + unit.slice(1)} Used`,
                    "Area",
                    `Remaining in Open ${isFiller ? "Syringe" : "Vial"}`,
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "12px 10px 10px",
                        fontSize: 10,
                        fontWeight: 700,
                        color: T.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selected.sessionLog.map((row, i) => {
                  const used = isFiller ? row.ml : row.units;
                  const rem = row.remaining;
                  const cap = isFiller ? selected.syringeSize : selected.vialSize;
                  return (
                    <tr key={i} style={{ borderBottom: `1px solid ${T.border}88` }}>
                      <td style={{ padding: "11px 10px", fontSize: 12, color: T.textMuted }}>{row.date}</td>
                      <td style={{ padding: "11px 10px", fontSize: 12, color: T.text, fontWeight: 600 }}>{row.client}</td>
                      <td style={{ padding: "11px 10px", fontSize: 12, color: T.text }}>{row.provider}</td>
                      <td style={{ padding: "11px 10px" }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: T.goldDark }}>
                          {used} {unit}
                        </span>
                      </td>
                      <td style={{ padding: "11px 10px", fontSize: 12, color: T.textMid }}>{row.area}</td>
                      <td style={{ padding: "11px 10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 48, height: 5, background: T.bg, borderRadius: 99 }}>
                            <div
                              style={{
                                width: `${Math.round((rem / cap) * 100)}%`,
                                height: "100%",
                                background: rem === 0 ? T.rose : rem < (isFiller ? 0.25 : 20) ? T.amber : T.sage,
                                borderRadius: 99,
                              }}
                            />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: rem === 0 ? T.rose : T.textMid }}>
                            {rem} {unit}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
            {selected.wasteLog.length > 0 && (
              <div
                style={{
                  marginTop: 16,
                  background: T.roseLight,
                  border: `1px solid ${T.rose}33`,
                  borderRadius: 10,
                  padding: "12px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: T.rose,
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  Waste Log
                </div>
                {selected.wasteLog.map((w, i) => (
                  <div key={i} style={{ fontSize: 12, color: T.textMid, display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <span>{w.date}</span>
                    <span style={{ fontWeight: 600 }}>
                      {w.mlWasted || w.unitsWasted} {unit} wasted
                    </span>
                    <span style={{ color: T.textMuted }}>
                      {w.reason} — Lot {w.lot || w.vialLot}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <CardHeader
              title="Usage by Provider"
              subtitle={`${unit.charAt(0).toUpperCase() + unit.slice(1)} consumed this month`}
            />
            <Divider />
            <CardBody>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={providerData} layout="vertical" margin={{ left: 0, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                  <XAxis type="number" tick={{ fill: T.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: T.text, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={76}
                  />
                  <Tooltip {...chartTooltip} formatter={(v) => [`${v} ${unit}`, "Used"]} />
                  <Bar dataKey="val" radius={[0, 6, 6, 0]}>
                    {providerData.map((_, i) => (
                      <Cell key={i} fill={[T.gold, T.sage, T.goldDark][i % 3]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Gross Margin by Product" subtitle="Cost vs retail per unit" />
            <Divider />
            <CardBody style={{ paddingTop: 12 }}>
              {inventoryData.marginSummary.map((m) => (
                <div key={m.product} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: T.text, fontWeight: 600 }}>{m.product}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: T.goldDark }}>{m.margin}%</span>
                  </div>
                  <div style={{ height: 5, background: T.bg, borderRadius: 99 }}>
                    <div
                      style={{
                        width: `${m.margin}%`,
                        height: "100%",
                        background: m.margin > 70 ? T.gold : m.margin > 64 ? T.sage : T.borderDark,
                        borderRadius: 99,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader
          title="Reorder Planner"
          subtitle="Forecast-driven restocking based on current usage rate vs reorder thresholds"
        />
        <Divider />
        <CardBody style={{ paddingTop: 0 }}>
          <div className="table-scroll">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Product", "On Hand", "Reorder At", "Status", "Reorder Qty", "Est. Cost"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "12px 10px 10px",
                      fontSize: 10,
                      fontWeight: 700,
                      color: T.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allProducts.map((p, i) => {
                const isFil = isFillerProduct(p.product);
                const oh = isFil ? p.totalMlOnHand : p.totalUnitsOnHand;
                const alert = oh <= p.reorderPoint;
                const cost = isFil
                  ? (p.reorderQty * p.costPerMl).toFixed(0)
                  : (p.reorderQty * p.costPerUnit).toFixed(0);
                return (
                  <tr
                    key={p.product}
                    style={{
                      borderBottom: `1px solid ${T.border}88`,
                      background: alert ? T.roseLight + "55" : "transparent",
                    }}
                  >
                    <td style={{ padding: "12px 10px", fontSize: 12, fontWeight: 700, color: T.text }}>{p.product}</td>
                    <td style={{ padding: "12px 10px", fontSize: 12, color: T.text, fontWeight: 600 }}>
                      {oh} {isFil ? "ml" : "units"}
                    </td>
                    <td style={{ padding: "12px 10px", fontSize: 12, color: T.textMuted }}>
                      {p.reorderPoint} {isFil ? "ml" : "units"}
                    </td>
                    <td style={{ padding: "12px 10px" }}>
                      {alert ? (
                        <Tag color={T.rose} bg={T.roseLight}>
                          Reorder Now
                        </Tag>
                      ) : (
                        <Tag color={T.green} bg={T.greenLight}>
                          Sufficient
                        </Tag>
                      )}
                    </td>
                    <td style={{ padding: "12px 10px", fontSize: 12, color: T.textMid }}>
                      {p.reorderQty} {isFil ? "ml" : "units"}
                    </td>
                    <td style={{ padding: "12px 10px", fontSize: 12, fontWeight: 700, color: T.goldDark }}>
                      ${parseInt(cost).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
