import { T } from "../../theme/tokens";
import { NAV } from "../../constants/navigation";

export function Sidebar({ active, onNavigate, apiKey, onApiKeyChange, showKey, onToggleShowKey }) {
  return (
    <div
      style={{
        width: 230,
        background: T.sidebar,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div style={{ padding: "28px 22px 22px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: T.gold,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Artful Aesthetic
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: T.white,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          Analytics
          <br />
          Suite
        </div>
        <div
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.18)",
            marginTop: 6,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Powered by Amila
        </div>
      </div>

      <div style={{ padding: "16px 12px", flex: 1 }}>
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              background: active === item.id ? T.sidebarActive : "transparent",
              border: "none",
              borderRadius: 10,
              padding: "10px 12px",
              marginBottom: 3,
              color: active === item.id ? T.white : "rgba(255,255,255,0.36)",
              fontSize: 13,
              fontWeight: active === item.id ? 700 : 400,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 14, opacity: active === item.id ? 1 : 0.45 }}>{item.icon}</span>
            {item.label}
            {item.badge === "ai" && (
              <span
                style={{
                  marginLeft: "auto",
                  background: "rgba(201,169,110,0.18)",
                  color: T.gold,
                  fontSize: 9,
                  fontWeight: 800,
                  padding: "2px 7px",
                  borderRadius: 99,
                  letterSpacing: "0.05em",
                }}
              >
                AI
              </span>
            )}
            {item.badge === "alert" && (
              <span
                style={{
                  marginLeft: "auto",
                  background: "rgba(192,84,74,0.2)",
                  color: T.rose,
                  fontSize: 9,
                  fontWeight: 800,
                  padding: "2px 7px",
                  borderRadius: 99,
                }}
              >
                1
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Anthropic API Key
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="sk-ant-..."
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              padding: "6px 8px",
              fontSize: 10,
              color: T.white,
              outline: "none",
              fontFamily: "inherit",
              minWidth: 0,
            }}
          />
          <button
            onClick={onToggleShowKey}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              padding: "6px 8px",
              fontSize: 10,
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            {showKey ? "Hide" : "Show"}
          </button>
        </div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.18)", marginTop: 5, lineHeight: 1.4 }}>
          Required when running outside of claude.ai
        </div>
      </div>

      <div style={{ padding: "12px 22px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", marginBottom: 3 }}>Englewood, CO</div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.gold,
              boxShadow: `0 0 6px ${T.gold}`,
            }}
          />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)" }}>Live · June 2026</span>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle }) {
  return (
    <div
      style={{
        padding: "24px 30px 18px",
        borderBottom: `1px solid ${T.border}`,
        background: T.surface,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: T.gold,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        Artful Aesthetic Medicine
      </div>
      <h1
        style={{
          margin: 0,
          fontSize: 22,
          fontWeight: 800,
          color: T.text,
          letterSpacing: "-0.025em",
        }}
      >
        {title}
      </h1>
      <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4 }}>{subtitle}</div>
    </div>
  );
}
