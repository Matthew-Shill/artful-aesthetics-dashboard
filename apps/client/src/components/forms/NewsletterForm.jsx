"use client";

import { useState } from "react";
import { createSupabaseClient } from "@artful/shared/supabase";
import styles from "../ui/ui.module.css";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const supabase = createSupabaseClient({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    if (!supabase) {
      setStatus({ type: "error", message: "Newsletter signup is temporarily unavailable." });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: email.trim().toLowerCase(),
      source: "website",
    });

    if (error) {
      if (error.code === "23505") {
        setStatus({ type: "success", message: "You're already subscribed. Thank you!" });
      } else {
        setStatus({ type: "error", message: "Something went wrong. Please try again." });
      }
    } else {
      setStatus({ type: "success", message: "Success! You're subscribed to our newsletter." });
      setEmail("");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {status && (
        <div className={status.type === "success" ? styles.formSuccess : styles.formError}>
          {status.message}
        </div>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="newsletter-email" className={styles.formLabel}>
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.formInput}
          placeholder="your@email.com"
        />
      </div>
      <button type="submit" className={styles.btnPrimary} disabled={loading}>
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
