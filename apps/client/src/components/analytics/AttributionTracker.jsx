"use client";

import { useEffect } from "react";
import { captureTouch } from "@/lib/attribution";
import { setUserProperties } from "@/lib/gtag";

/**
 * Records how the visitor arrived, on every entry to the site.
 *
 * Mounted in the root layout so the touch is stored before anyone reaches a
 * booking page — UTM tags and click IDs are only ever present on the landing
 * URL, and they are gone by the time the booking flow starts.
 */
export function AttributionTracker() {
  useEffect(() => {
    const record = captureTouch();
    if (!record) return;

    // User-scoped so GA4 audiences and user-level reports can segment on the
    // original acquisition channel, not just the converting session.
    setUserProperties({
      first_channel: record.first.channel,
      first_source: record.first.source,
    });
  }, []);

  return null;
}
