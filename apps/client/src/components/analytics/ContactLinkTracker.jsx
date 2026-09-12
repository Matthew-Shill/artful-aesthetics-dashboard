"use client";

import { useEffect } from "react";
import { trackContactClick } from "@/lib/gtag";

/**
 * Reports taps on phone, SMS, and email links.
 *
 * Plenty of visitors skip the contact form and just tap "call" — on mobile that
 * hands them straight to the dialer, which is invisible to analytics otherwise.
 *
 * This listens at the document instead of wiring a handler into each link:
 * they are spread across the header, footer, service pages, location pages and
 * the thank-you page, and `Button` renders them as plain anchors. A single
 * delegated listener covers every one, including any added later.
 */
const METHODS = [
  ["tel:", "phone"],
  ["sms:", "sms"],
  ["mailto:", "email"],
];

/** Suppresses the duplicate hit from a double-tap on touch devices. */
const REPEAT_WINDOW_MS = 1000;

export function ContactLinkTracker() {
  useEffect(() => {
    const lastFired = new Map();

    function onClick(event) {
      const link = event.target?.closest?.("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const match = METHODS.find(([prefix]) => href.toLowerCase().startsWith(prefix));
      if (!match) return;

      const method = match[1];
      const now = Date.now();
      if (now - (lastFired.get(method) || 0) < REPEAT_WINDOW_MS) return;
      lastFired.set(method, now);

      trackContactClick(method, { page_path: window.location.pathname });
    }

    // Capture phase, so the event is still recorded if a handler on the link
    // stops propagation before it reaches the document.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
