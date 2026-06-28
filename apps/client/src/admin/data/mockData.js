function generateXGBForecast() {
  const historical = [
    { month: "Jan", actual: 41200, forecast: null, lo: null, hi: null },
    { month: "Feb", actual: 44800, forecast: null, lo: null, hi: null },
    { month: "Mar", actual: 40500, forecast: null, lo: null, hi: null },
    { month: "Apr", actual: 53200, forecast: null, lo: null, hi: null },
    { month: "May", actual: 61400, forecast: null, lo: null, hi: null },
    { month: "Jun", actual: 58900, forecast: null, lo: null, hi: null },
  ];
  const base = [63000, 57500, 72000, 80500, 88000, 96500];
  const noise = [0.04, 0.05, 0.04, 0.03, 0.04, 0.03];
  return [
    ...historical,
    ...["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => ({
      month: m,
      actual: null,
      forecast: base[i],
      lo: Math.round(base[i] * (1 - noise[i] * 2)),
      hi: Math.round(base[i] * (1 + noise[i] * 2)),
    })),
  ];
}

export const mockData = {
  xgbForecast: generateXGBForecast(),
  kpis: [
    { label: "Monthly Revenue", value: "$61,400", delta: "+27% vs last month", up: true },
    { label: "Active Clients", value: "892", delta: "+14 this week", up: true },
    { label: "Avg Client LTV", value: "$3,840", delta: "+$210 vs Q1", up: true },
    { label: "Churn Risk Alerts", value: "4", delta: "High-value clients", up: false },
  ],
  revenueVelocity: [
    { month: "Jan", revenue: 41200, prev: 36000 },
    { month: "Feb", revenue: 44800, prev: 39000 },
    { month: "Mar", revenue: 40500, prev: 38500 },
    { month: "Apr", revenue: 53200, prev: 43000 },
    { month: "May", revenue: 61400, prev: 47500 },
    { month: "Jun", revenue: 58900, prev: 50000 },
  ],
  providers: [
    { name: "Erica E.", rebooking: 91, upsell: 74, sentiment: 4.9, revenue: 22400 },
    { name: "Lena A.", rebooking: 86, upsell: 70, sentiment: 4.8, revenue: 19200 },
    { name: "Dr. Gallen", rebooking: 78, upsell: 62, sentiment: 4.7, revenue: 16500 },
  ],
  lapseRisk: [
    { name: "Claudette M.", lastVisit: "89d ago", ltv: "$4,200", risk: 92, tag: "Botox · Filler" },
    { name: "Priya S.", lastVisit: "67d ago", ltv: "$3,800", risk: 78, tag: "Microneedling" },
    { name: "Taylor W.", lastVisit: "54d ago", ltv: "$6,100", risk: 65, tag: "IPL · Laser" },
    { name: "Nadia R.", lastVisit: "48d ago", ltv: "$2,900", risk: 51, tag: "Dermal Filler" },
  ],
  acquisitionLTV: [
    { source: "Referral", ltv: 5800, clients: 98 },
    { source: "Event", ltv: 4100, clients: 34 },
    { source: "Instagram", ltv: 3200, clients: 142 },
    { source: "Google", ltv: 2900, clients: 201 },
    { source: "Walk-in", ltv: 1800, clients: 67 },
  ],
  treatmentCombos: [
    { combo: "Botox + Filler", count: 134, delta: 12 },
    { combo: "HydraFacial + LED", count: 98, delta: 8 },
    { combo: "Peel + Microneedling", count: 64, delta: 21 },
    { combo: "Laser + SPF Pkg", count: 76, delta: -3 },
    { combo: "Filler + PRP", count: 51, delta: 5 },
  ],
  roomUtil: [
    { name: "Suite 1", util: 87, rev: 18400 },
    { name: "Suite 2", util: 72, rev: 15200 },
    { name: "Suite 3", util: 61, rev: 12800 },
    { name: "Suite 4", util: 44, rev: 9300 },
  ],
};

export const treatmentDemandSignals = [
  { treatment: "Laser", jul: 34, aug: 28, sep: 18 },
  { treatment: "Botox", jul: 12, aug: 19, sep: 31 },
  { treatment: "HydraFacial", jul: 10, aug: 12, sep: 14 },
  { treatment: "Peels", jul: 5, aug: 22, sep: 38 },
  { treatment: "Filler", jul: 15, aug: 20, sep: 28 },
];
