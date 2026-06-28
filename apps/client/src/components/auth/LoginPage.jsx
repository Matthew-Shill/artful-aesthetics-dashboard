"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPostLoginPath } from "@/config/admin";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/layout/Logo";
import styles from "./login.module.css";

function AuthConfigNotice() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign in unavailable</h1>
        <p className={styles.subtitle}>
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
          <code>apps/client/.env.local</code>, then restart the dev server.
        </p>
      </div>
    </div>
  );
}

export function LoginPage() {
  const { session, loading, authEnabled, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (authEnabled && !loading && session?.user?.email) {
      router.replace(getPostLoginPath(session.user.email));
    }
  }, [authEnabled, loading, session, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted || loading) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );
  }

  if (!authEnabled) {
    return <AuthConfigNotice />;
  }

  if (session) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Logo className={styles.logo} />
        <p className={styles.eyebrow}>Welcome back</p>
        <h1 className={styles.title}>Sign in to your account</h1>
        <p className={styles.subtitle}>
          Access your appointments, purchase history, and personalized recommendations.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />

          <button type="submit" disabled={submitting} className={styles.button}>
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={styles.footerNote}>
          New patient?{" "}
          <Link href={siteConfig.bookingUrl} className={styles.inlineLink}>
            Book a consultation
          </Link>
        </p>
      </div>
    </div>
  );
}
