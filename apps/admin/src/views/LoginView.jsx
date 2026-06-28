import { useState } from "react";
import { T } from "@artful/shared/tokens";
import { useAuth } from "../context/AuthContext";

export function LoginView() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: T.bg,
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.goldDark, margin: "0 0 8px" }}>
          Admin Dashboard
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px", color: T.text }}>
          Artful Analytics Suite
        </h1>
        <p style={{ fontSize: 14, color: T.textMuted, margin: "0 0 28px" }}>
          Sign in to access the admin dashboard.
        </p>

        {error && (
          <div style={{ background: T.roseLight, color: T.rose, padding: "12px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.border}`, borderRadius: 10, marginBottom: 16, boxSizing: "border-box" }}
          />
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.border}`, borderRadius: 10, marginBottom: 24, boxSizing: "border-box" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: T.gold,
              color: T.white,
              border: "none",
              borderRadius: 10,
              fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
