import { useState, useRef, useEffect } from "react";
import { SYSTEM_PROMPT, SUGGESTED_QUESTIONS } from "../constants/aiPrompt";
import { T } from "../theme/tokens";
import { Tag, Divider, Card, CardHeader, CardBody } from "../components/ui";

export function AIView({ apiKey }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I have full visibility into the demo data loaded in this dashboard — revenue trends, provider performance, the XGBoost forecast, product-level inventory, and all active experiments. What would you like to understand?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text) {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setError(null);
    const next = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          system: SYSTEM_PROMPT,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error.message || "API error. Check your key.");
        setMessages((prev) => prev.slice(0, -1));
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content?.[0]?.text || "No response received." },
        ]);
      }
    } catch {
      setError("Connection failed. If running locally, add your Anthropic API key below.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 18, height: "calc(100vh - 160px)" }}>
      <Card style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardHeader
          title="AI Analyst"
          subtitle="Ask anything about the data in this dashboard"
          right={<Tag>Powered by Claude</Tag>}
        />
        <Divider />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              {m.role === "assistant" && (
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: T.charcoal,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: T.gold,
                    flexShrink: 0,
                    marginTop: 2,
                    fontWeight: 800,
                    letterSpacing: "0.03em",
                  }}
                >
                  AA
                </div>
              )}
              <div
                style={{
                  maxWidth: "76%",
                  background: m.role === "user" ? T.charcoal : T.bg,
                  color: m.role === "user" ? T.white : T.text,
                  borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  padding: "12px 16px",
                  fontSize: 13,
                  lineHeight: 1.65,
                  fontFamily: "inherit",
                }}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: T.charcoal,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: T.gold,
                  fontWeight: 800,
                }}
              >
                AA
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className="pulse-dot"
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: T.gold,
                      animation: `pulse 1.2s ease ${j * 0.2}s infinite`,
                      opacity: 0.4,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {error && (
            <div
              style={{
                background: T.roseLight,
                border: `1px solid ${T.rose}44`,
                borderRadius: 10,
                padding: "12px 16px",
                fontSize: 12,
                color: T.rose,
              }}
            >
              {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <Divider />
        <div style={{ padding: "14px 22px", display: "flex", gap: 10 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && send()}
            placeholder="Ask about revenue, inventory, providers, experiments..."
            style={{
              flex: 1,
              background: T.bg,
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 13,
              color: T.text,
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{
              background: T.charcoal,
              color: T.white,
              border: "none",
              borderRadius: 10,
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading || !input.trim() ? 0.5 : 1,
              transition: "opacity 0.2s",
              fontFamily: "inherit",
            }}
          >
            Send
          </button>
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card>
          <CardHeader title="Suggested Questions" subtitle="Select to ask" />
          <Divider />
          <CardBody style={{ paddingTop: 12 }}>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={loading}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: T.bg,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  marginBottom: 8,
                  fontSize: 12,
                  color: T.text,
                  cursor: "pointer",
                  lineHeight: 1.45,
                  fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
              >
                {q}
              </button>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Data Status" />
          <Divider />
          <CardBody style={{ paddingTop: 12 }}>
            {[
              { label: "Data source", value: "Demo", hi: true },
              { label: "Revenue (Jun)", value: "$58,900" },
              { label: "Dec Forecast", value: "$96,500" },
              { label: "Model R2", value: "0.94" },
              { label: "Active Tests", value: "4" },
              { label: "Products tracked", value: "6" },
              { label: "API key", value: apiKey ? "Set" : "Not set", warn: !apiKey },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "7px 0",
                  borderBottom: `1px solid ${T.border}`,
                }}
              >
                <span style={{ fontSize: 11, color: T.textMuted }}>{s.label}</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: s.hi ? T.gold : s.warn ? T.rose : T.text,
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
