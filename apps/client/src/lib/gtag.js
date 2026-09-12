import { getAttributionParams } from "@/lib/attribution";

/**
 * GA4 event helper.
 *
 * Components fire events from effects during hydration, which can run before
 * the gtag.js library finishes loading. Calling window.gtag directly and
 * bailing out when it is missing silently drops those events — including
 * conversions. Queueing onto dataLayer instead is safe either way: gtag.js
 * drains whatever is already there once it loads.
 *
 * The stub mirrors Google's official snippet by pushing the `arguments` object
 * rather than an array, so queued commands are shaped the way gtag.js expects.
 */
function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
  return window.gtag;
}

export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  ensureGtag()("event", name, params);
}

export function setUserProperties(properties) {
  if (typeof window === "undefined") return;
  ensureGtag()("set", "user_properties", properties);
}

const BOOKING_COMPLETE_KEY = "aam_booking_complete";

/**
 * Reports a conversion-relevant event stamped with acquisition attribution.
 *
 * Carrying the source on the event itself is what makes "which channel produced
 * this" answerable directly, instead of depending on GA4 still holding the
 * session together across the Mangomint redirect or a long booking flow.
 */
export function trackAttributedEvent(name, params = {}) {
  trackEvent(name, { ...getAttributionParams(), ...params });
}

/** A step in the booking funnel. */
export function trackBookingEvent(name, params = {}) {
  trackAttributedEvent(name, { method: "mangomint", ...params });
}

/**
 * An inquiry that is not a booking — a submitted contact form.
 *
 * `generate_lead` is a GA4 recommended event, so it is reported only on a
 * genuine submission. Firing it on a contact *page view* would make the
 * conversion count measure curiosity rather than intent, and would drown out
 * `booking_complete` in any channel comparison.
 */
export function trackLead(params = {}) {
  trackAttributedEvent("generate_lead", params);
}

/** A tap on a phone, SMS, or email link — the no-form path to reaching us. */
export function trackContactClick(method, params = {}) {
  trackAttributedEvent("contact_click", { method, ...params });
}

/**
 * Reports a completed booking at most once per session.
 *
 * A booking can be observed two ways — the iframe's "redirect" postMessage, and
 * the /thank-you landing that Mangomint redirects to. Both happen for a single
 * booking, so the conversion is de-duplicated here.
 */
export function trackBookingComplete(params = {}) {
  if (typeof window === "undefined") return false;

  try {
    if (window.sessionStorage.getItem(BOOKING_COMPLETE_KEY)) return false;
    window.sessionStorage.setItem(BOOKING_COMPLETE_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); still worth reporting.
  }

  trackBookingEvent("booking_complete", params);
  return true;
}
