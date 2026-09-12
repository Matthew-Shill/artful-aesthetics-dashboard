"use client";

import { useEffect } from "react";
import { trackBookingComplete } from "@/lib/gtag";

/**
 * Fires the GA4 conversion event when someone lands after a Mangomint booking.
 * Mark `booking_complete` as a key event in GA4 → Admin → Events.
 *
 * This is the authoritative completion signal: Mangomint redirects here after a
 * booking, and a fresh page load gives the event time to reach Google. The
 * iframe message that BookingComplete watches is the fallback for when the
 * redirect does not land, and it defers to this page.
 */
export function BookingConversion() {
  useEffect(() => {
    trackBookingComplete({ booking_signal: "thank_you_page" });
  }, []);

  return null;
}
