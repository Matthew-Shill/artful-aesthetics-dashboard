"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { T } from "@artful/shared/tokens";
import { useAuth } from "@/admin/context/AuthContext";
import { DashboardShell } from "./DashboardShell";

export function AdminDashboardGate() {
  const { session, loading, authEnabled, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && authEnabled) {
      if (!session) {
        router.replace("/login");
      } else if (!isAdmin) {
        router.replace("/account");
      }
    }
  }, [authEnabled, isAdmin, loading, session, router]);

  if (loading) {
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

  if (!authEnabled || !session || !isAdmin) {
    return null;
  }

  return <DashboardShell />;
}
