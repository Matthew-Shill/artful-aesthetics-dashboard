"use client";

import { useEffect } from "react";

/**
 * Fires a one-time GA4 conversion event when someone lands after a Mangomint booking.
 * Mark `booking_complete` as a key event in GA4 → Admin → Events.
 */
export function BookingConversion() {
  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "booking_complete", {
      method: "mangomint",
    });
  }, []);

  return null;
}
