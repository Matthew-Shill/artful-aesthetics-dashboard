"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import styles from "./account.module.css";

export function AccountPage() {
  const { session, loading, authEnabled, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && authEnabled && !session) {
      router.replace("/login");
    }
  }, [authEnabled, loading, session, router]);

  async function handleSignOut() {
    await signOut();
    router.replace("/login");
  }

  if (loading || !session) {
    return (
      <section className="section">
        <div className="container">
          <p className={styles.loading}>Loading...</p>
        </div>
      </section>
    );
  }

  const email = session.user?.email ?? "your account";

  return (
    <section className="section">
      <div className={`container ${styles.wrap}`}>
        <p className={styles.eyebrow}>My Account</p>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Signed in as {email}</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Your portal is coming soon</h2>
          <p className={styles.cardText}>
            We&apos;re building a personalized experience where you can view past purchases, see
            recommended products, and book appointments in one place.
          </p>
          <div className={styles.actions}>
            <Button href="/contact" variant="primary">
              Contact us
            </Button>
            <button type="button" onClick={handleSignOut} className={styles.signOut}>
              Sign out
            </button>
          </div>
        </div>

        <p className={styles.backLink}>
          <Link href="/">← Back to home</Link>
        </p>
      </div>
    </section>
  );
}
