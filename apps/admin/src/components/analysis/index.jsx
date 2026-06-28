import { T } from "@artful/shared/tokens";
import { ANALYSIS_TIERS, PRIMARY_ANALYST, CALENDLY_URL } from "../../constants/amilaTeam";
import { Card, CardHeader, CardBody, Divider, Tag } from "../ui";

export function AnalysisTierToggle({ mode, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {Object.values(ANALYSIS_TIERS).map((tier) => {
        const selected = mode === tier.id;
        return (
          <button
            key={tier.id}
            type="button"
            onClick={() => onChange(tier.id)}
            style={{
              flex: 1,
              background: selected ? T.charcoal : T.surface,
              border: `1px solid ${selected ? T.charcoal : T.border}`,
              borderRadius: 10,
              padding: "10px 12px",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: selected ? T.white : T.text,
                marginBottom: 2,
              }}
            >
              {tier.icon} {tier.label}
            </div>
            <div
              style={{
                fontSize: 10,
                color: selected ? "rgba(255,255,255,0.55)" : T.textMuted,
                lineHeight: 1.4,
              }}
            >
              {tier.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function BookConsultationButton({ href = CALENDLY_URL, style = {}, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        background: T.gold,
        color: T.white,
        border: "none",
        borderRadius: 10,
        padding: "10px 18px",
        fontSize: 12,
        fontWeight: 700,
        textDecoration: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "opacity 0.15s",
        ...style,
      }}
    >
      {children || "Book a 30-min call ↗"}
    </a>
  );
}

export function ExpertReviewPanel({ context }) {
  const analyst = PRIMARY_ANALYST;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card>
        <CardHeader
          title="Amila Expert Review"
          subtitle="Personal analysis from our data team"
          right={<Tag color={T.sage} bg={T.sageLight}>Human</Tag>}
        />
        <Divider />
        <CardBody style={{ paddingTop: 16 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: T.charcoal,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 800,
                color: T.gold,
                flexShrink: 0,
              }}
            >
              {analyst.initials}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{analyst.name}</div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{analyst.role}</div>
              <div style={{ fontSize: 11, color: T.gold, marginTop: 4 }}>{analyst.email}</div>
            </div>
          </div>

          <p style={{ fontSize: 12, color: T.textMid, lineHeight: 1.65, margin: "0 0 16px" }}>
            Get a tailored analysis session with someone from the Amila team — strategy review,
            experiment design, retention planning, and actionable recommendations for your practice.
          </p>

          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: T.textMuted,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Specialties
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {analyst.specialties.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 11,
                    background: T.bg,
                    border: `1px solid ${T.border}`,
                    borderRadius: 99,
                    padding: "4px 10px",
                    color: T.text,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <BookConsultationButton style={{ width: "100%" }} />
        </CardBody>
      </Card>

      {context && (
        <Card>
          <CardHeader title="Your Request Context" subtitle={context.title} />
          <Divider />
          <CardBody style={{ paddingTop: 12 }}>
            <p style={{ fontSize: 12, color: T.textMid, lineHeight: 1.6, margin: 0 }}>
              {context.summary}
            </p>
            <p style={{ fontSize: 11, color: T.textMuted, marginTop: 10, marginBottom: 0, lineHeight: 1.5 }}>
              This context will help Nadine prepare for your session. Mention it when you book, or
              email{" "}
              <a
                href={`mailto:${analyst.email}?subject=${encodeURIComponent(context.title)}&body=${encodeURIComponent(`Hi Nadine,\n\nI'd like to discuss:\n${context.summary}\n\n`)}}`}
                style={{ color: T.gold, fontWeight: 600 }}
              >
                {analyst.email}
              </a>
              .
            </p>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader title="What to Expect" />
        <Divider />
        <CardBody style={{ paddingTop: 12 }}>
          {[
            { step: "1", text: "Book a 30-minute slot via Calendly" },
            { step: "2", text: "Nadine reviews your dashboard data and question" },
            { step: "3", text: "Live walkthrough with actionable recommendations" },
            { step: "4", text: "Follow-up summary delivered after the call" },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                padding: "8px 0",
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: T.goldLight,
                  color: T.goldDark,
                  fontSize: 11,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.step}
              </span>
              <span style={{ fontSize: 12, color: T.text, lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

export function AnalysisActionButtons({ onAi, onExpert, compact = false }) {
  const btnStyle = {
    background: "transparent",
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    padding: compact ? "3px 7px" : "5px 10px",
    fontSize: compact ? 9 : 10,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    transition: "background 0.15s",
  };

  return (
    <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
      <button
        type="button"
        onClick={onAi}
        title="Get instant AI analysis"
        style={{ ...btnStyle, color: T.goldDark, borderColor: `${T.gold}66` }}
      >
        ✦ AI
      </button>
      <button
        type="button"
        onClick={onExpert}
        title="Request expert review from Amila team"
        style={{ ...btnStyle, color: T.sage, borderColor: `${T.sage}66` }}
      >
        ◉ Expert
      </button>
    </div>
  );
}

export function ExpertUpsellCard({ onBookExpert }) {
  return (
    <div
      style={{
        background: T.sageLight,
        border: `1px solid ${T.sage}44`,
        borderRadius: 10,
        padding: "12px 16px",
        fontSize: 12,
        color: T.textMid,
        lineHeight: 1.55,
      }}
    >
      <strong style={{ color: T.text }}>Want a personalized strategy?</strong> AI insights are a
      great starting point.{" "}
      {onBookExpert ? (
        <button
          type="button"
          onClick={onBookExpert}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            color: T.sage,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "inherit",
            textDecoration: "underline",
          }}
        >
          Book time with our team
        </button>
      ) : (
        <BookConsultationButton
          style={{
            display: "inline",
            background: "none",
            color: T.sage,
            padding: 0,
            fontSize: "inherit",
            textDecoration: "underline",
          }}
        />
      )}
      .
    </div>
  );
}
