"use client";

import { useEffect } from "react";

/**
 * Fires a one-time GA4 event when someone lands on a first-party booking page.
 */
export function BookingStart({ serviceId, showOnlyScId } = {}) {
  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "booking_start", {
      method: "mangomint",
      ...(serviceId ? { item_id: String(serviceId) } : {}),
      ...(showOnlyScId ? { item_category_id: String(showOnlyScId) } : {}),
    });
  }, [serviceId, showOnlyScId]);

  return null;
}
