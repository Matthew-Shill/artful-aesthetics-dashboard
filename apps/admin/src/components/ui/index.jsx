import { T } from "@artful/shared/tokens";

export function DemoBanner({ message }) {
  return (
    <div
      className="demo-banner"
      style={{
        background: T.goldLight,
        border: `1px solid ${T.gold}55`,
        borderRadius: 10,
        padding: "10px 18px",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: T.gold,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 12, color: T.goldDark, lineHeight: 1.5 }}>
        {message ? (
          message
        ) : (
          <>
            <strong>Demo data.</strong> All figures are illustrative placeholders. Connect your booking and POS exports to populate every metric with live data.
          </>
        )}
      </span>
    </div>
  );
}

export function Tag({ children, color = T.gold, bg = T.goldLight }) {
  return (
    <span
      style={{
        background: bg,
        color,
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 99,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

export function Divider() {
  return <div style={{ height: 1, background: T.border }} />;
}

export function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 14,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, right }) {
  return (
    <div
      className="card-header-row"
      style={{
        padding: "18px 22px 14px",
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{title}</div>
        {subtitle && (
          <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{subtitle}</div>
        )}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

export function CardBody({ children, style = {} }) {
  return <div style={{ padding: "0 22px 20px", ...style }}>{children}</div>;
}

export function KPICard({ label, value, delta, up }) {
  return (
    <Card>
      <div style={{ padding: "20px 22px" }}>
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
          {label}
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: T.text,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div style={{ marginTop: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: up ? T.green : T.rose }}>
            {up ? "+ " : "- "}
            {delta}
          </span>
        </div>
      </div>
    </Card>
  );
}
