"use client";

import { useEffect } from "react";
import { trackBookingEvent } from "@/lib/gtag";

/**
 * Fires a one-time GA4 event when someone lands on a first-party booking page.
 * Carries the same attribution parameters as `booking_complete`, so funnel
 * drop-off can be compared channel by channel.
 */
export function BookingStart({ serviceId, showOnlyScId } = {}) {
  useEffect(() => {
    trackBookingEvent("booking_start", {
      ...(serviceId ? { item_id: String(serviceId) } : {}),
      ...(showOnlyScId ? { item_category_id: String(showOnlyScId) } : {}),
    });
  }, [serviceId, showOnlyScId]);

  return null;
}
