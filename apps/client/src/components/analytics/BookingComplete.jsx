"use client";

import { useEffect } from "react";
import { trackBookingComplete } from "@/lib/gtag";
import { siteConfig } from "@/config/site";

/**
 * Fallback completion signal, for bookings that never reach /thank-you.
 *
 * The booking iframe announces a finished booking by posting a JSON *string*
 * to the parent window: {"type":"redirect","redirectUrl":"..."}. Mangomint's
 * own app.js listens for that same message and navigates the parent there.
 *
 * Reporting the conversion straight from this handler is unreliable: the
 * navigation begins in the same tick, and an event still sitting in the
 * dataLayer queue dies with the page. So when the redirect points at our own
 * thank-you page, this waits and lets that page report the booking from a
 * settled page load instead. It only fires itself if the redirect goes
 * somewhere we cannot instrument, or fails to happen at all.
 */
const MANGOMINT_ORIGIN_HINT = "mangomint.com";
const URL_PARAM_MAX = 100;
/** Long enough for a real navigation to tear this page down. */
const REDIRECT_GRACE_MS = 4000;

/** Origin + path only — a configured redirect URL may carry query params. */
function safeUrl(value) {
  if (typeof value !== "string" || value === "") return "";
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`.slice(0, URL_PARAM_MAX);
  } catch {
    return "";
  }
}

/** True when the redirect lands on a page of ours that reports the conversion. */
function landsOnThankYou(value) {
  try {
    const url = new URL(value);
    return (
      url.hostname === window.location.hostname &&
      url.pathname.replace(/\/$/, "") === siteConfig.bookingThankYouPath
    );
  } catch {
    return false;
  }
}

export function BookingComplete() {
  useEffect(() => {
    let graceTimer;

    function onMessage(event) {
      if (!event.origin?.includes(MANGOMINT_ORIGIN_HINT)) return;
      if (typeof event.data !== "string") return;

      let payload;
      try {
        payload = JSON.parse(event.data);
      } catch {
        return;
      }
      if (payload?.type !== "redirect") return;

      const redirectUrl = safeUrl(payload.redirectUrl);
      const params = {
        booking_signal: "iframe_message",
        ...(redirectUrl ? { redirect_url: redirectUrl } : {}),
      };

      if (!landsOnThankYou(payload.redirectUrl)) {
        trackBookingComplete(params);
        return;
      }

      clearTimeout(graceTimer);
      graceTimer = setTimeout(() => {
        trackBookingComplete({ ...params, booking_signal: "iframe_message_no_redirect" });
      }, REDIRECT_GRACE_MS);
    }

    window.addEventListener("message", onMessage);
    return () => {
      clearTimeout(graceTimer);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return null;
}
