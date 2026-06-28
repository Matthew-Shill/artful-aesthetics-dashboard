export const CALENDLY_URL = "https://calendly.com/amilahealthanalytics/30min";

export const ANALYSIS_TIERS = {
  ai: {
    id: "ai",
    label: "Instant Analysis",
    icon: "✦",
    description: "AI-powered insights, available now",
  },
  expert: {
    id: "expert",
    label: "Expert Review",
    icon: "◉",
    description: "Personal analysis from the Amila team",
  },
};

export const TEAM = [
  {
    id: "nadine",
    name: "Nadine Shill",
    role: "Lead Data Analyst",
    email: "nadine@amilahealthanalytics.com",
    calendlyUrl: CALENDLY_URL,
    initials: "NS",
    specialties: ["Retention strategy", "Experiment design", "Revenue forecasting"],
  },
];

export const PRIMARY_ANALYST = TEAM[0];

export function buildLapseRiskPrompt(client) {
  return `${client.name} has a ${client.risk}% lapse risk with LTV ${client.ltv}. Last visit: ${client.lastVisit}. Signal: ${client.tag}. Why are they flagged and what retention actions should we take?`;
}

export function buildLapseRiskContext(client) {
  return {
    type: "lapse-risk",
    title: "Lapse Risk — Retention Strategy",
    summary: `${client.name} · ${client.risk}% risk · LTV ${client.ltv} · ${client.lastVisit}`,
    client,
  };
}
