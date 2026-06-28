"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isAllowedAdminEmail } from "@/config/admin";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const AuthContext = createContext(null);

const supabase = getSupabaseBrowserClient();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      supabase,
      session,
      loading,
      authEnabled: !!supabase,
      isAdmin: isAllowedAdminEmail(session?.user?.email),
      signIn: async (email, password) => {
        if (!supabase) throw new Error("Auth not configured");
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      },
      signOut: async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
      },
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
