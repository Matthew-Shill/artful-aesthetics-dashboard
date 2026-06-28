"use client";

import { useState } from "react";
import { createSupabaseClient } from "@artful/shared/supabase";
import { Button } from "@/components/ui";
import styles from "../ui/ui.module.css";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const supabase = createSupabaseClient({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    if (!supabase) {
      setStatus({
        type: "error",
        message: "Contact form is temporarily unavailable. Please call us directly.",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
    });

    if (error) {
      setStatus({ type: "error", message: "Something went wrong. Please try again or call us." });
    } else {
      setStatus({ type: "success", message: "Thank you! We'll be in touch soon." });
      setForm({ name: "", email: "", phone: "", message: "" });
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
        <label htmlFor="name" className={styles.formLabel}>Name</label>
        <input id="name" required value={form.name} onChange={update("name")} className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>Email</label>
        <input id="email" type="email" required value={form.email} onChange={update("email")} className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.formLabel}>Phone (optional)</label>
        <input id="phone" type="tel" value={form.phone} onChange={update("phone")} className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.formLabel}>Message</label>
        <textarea id="message" required value={form.message} onChange={update("message")} className={styles.formTextarea} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
