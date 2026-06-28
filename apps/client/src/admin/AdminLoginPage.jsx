"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { T } from "@artful/shared/tokens";
import { useAuth } from "@/admin/context/AuthContext";
import { LoginView } from "@/admin/views/LoginView";

function AuthConfigNotice() {
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
          maxWidth: 480,
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 16,
          padding: 32,
        }}
      >
        <h1 style={{ margin: "0 0 12px", fontSize: 22, color: T.text }}>Admin auth not configured</h1>
        <p style={{ margin: 0, color: T.textMuted, lineHeight: 1.7, fontSize: 14 }}>
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
          <code>apps/client/.env.local</code>, then restart the dev server.
        </p>
      </div>
    </div>
  );
}

export function AdminLoginPage() {
  const { session, loading, authEnabled } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (authEnabled && !loading && session) {
      router.replace("/admin/overview");
    }
  }, [authEnabled, loading, session, router]);

  if (!mounted || loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: T.bg,
        }}
      >
        <p style={{ color: T.textMuted }}>Loading...</p>
      </div>
    );
  }

  if (!authEnabled) {
    return <AuthConfigNotice />;
  }

  if (session) {
    return null;
  }

  return <LoginView />;
}
