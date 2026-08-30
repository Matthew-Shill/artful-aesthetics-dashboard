"use client";

import { useEffect } from "react";

/**
 * TEMPORARY DIAGNOSTIC CODE — remove once we know whether Mangomint signals
 * the parent (and before replacing this with a real booking_complete).
 *
 * Passive listener: watches Mangomint iframe postMessage + src/load changes and
 * forwards each signal to GA4 as mangomint_iframe_signal. Does not wrap fetch/XHR
 * or alter booking behavior.
 *
 * Delete this file and its import from app/layout.jsx when done.
 */
const GA_PARAM_MAX = 100;
const MANGOMINT_ORIGIN_HINT = "mangomint.com";
const BOOKING_IFRAME_SRC_HINT = "booking.mangomint.com";
const PII_KEY_PATTERN =
  /name|email|phone|card|address|token|password|ssn|dob|birth/i;

function truncate(value, max = GA_PARAM_MAX) {
  const str = value == null ? "" : String(value);
  return str.length > max ? str.slice(0, max) : str;
}

function redactPii(value) {
  if (value == null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(redactPii);

  const out = {};
  for (const [key, child] of Object.entries(value)) {
    if (PII_KEY_PATTERN.test(key)) continue;
    out[key] = redactPii(child);
  }
  return out;
}

function serializeMessageData(data) {
  if (data === undefined || data === null) return "";
  try {
    if (typeof data === "string") return truncate(data);
    return truncate(JSON.stringify(redactPii(data)));
  } catch {
    return truncate(String(data));
  }
}

function iframeSrc(el) {
  return el?.getAttribute?.("src") || "";
}

function isMangomintIframe(el) {
  return el?.tagName === "IFRAME" && iframeSrc(el).includes(BOOKING_IFRAME_SRC_HINT);
}

function findIframeForSource(source) {
  if (!source) return null;
  for (const iframe of document.querySelectorAll("iframe")) {
    try {
      if (iframe.contentWindow === source) return iframe;
    } catch {
      // Cross-origin access can throw; skip.
    }
  }
  return null;
}

function fireGtagEvent(params, attempt = 0) {
  if (typeof window.gtag === "function") {
    window.gtag("event", "mangomint_iframe_signal", params);
    return;
  }
  if (attempt >= 10) return;
  window.setTimeout(() => fireGtagEvent(params, attempt + 1), 250);
}

function emitSignal({
  postMessage,
  messageData = "",
  messageOrigin = "",
  iframeSrcBefore = "",
  iframeSrcAfter = "",
}) {
  fireGtagEvent({
    post_message: postMessage ? "yes" : "no",
    message_data: truncate(messageData),
    message_origin: truncate(messageOrigin),
    iframe_src_before: truncate(iframeSrcBefore),
    iframe_src_after: truncate(iframeSrcAfter),
    signal_ts: String(Date.now()),
    debug_mode: true,
  });
}

export function MangomintIframeDiagnostic() {
  useEffect(() => {
    const lastSrcByIframe = new WeakMap();
    const attachedIframes = new WeakSet();
    const loadHandlers = new WeakMap();

    function attachIframe(iframe) {
      if (!isMangomintIframe(iframe) || attachedIframes.has(iframe)) return;
      attachedIframes.add(iframe);

      const initialSrc = iframeSrc(iframe);
      lastSrcByIframe.set(iframe, initialSrc);

      const onLoad = () => {
        const after = iframeSrc(iframe);
        const before = lastSrcByIframe.get(iframe) || after;
        emitSignal({
          postMessage: false,
          iframeSrcBefore: before,
          iframeSrcAfter: after,
        });
        lastSrcByIframe.set(iframe, after);
      };

      loadHandlers.set(iframe, onLoad);
      iframe.addEventListener("load", onLoad);
    }

    function scanExisting() {
      document.querySelectorAll("iframe").forEach(attachIframe);
    }

    function onMessage(event) {
      const origin = event.origin || "";
      if (!origin.includes(MANGOMINT_ORIGIN_HINT)) return;

      const iframe = findIframeForSource(event.source);
      const after = iframeSrc(iframe);
      const before = iframe ? lastSrcByIframe.get(iframe) || after : after;

      emitSignal({
        postMessage: true,
        messageData: serializeMessageData(event.data),
        messageOrigin: origin,
        iframeSrcBefore: before,
        iframeSrcAfter: after,
      });

      if (iframe) lastSrcByIframe.set(iframe, after);
    }

    const domObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "src") {
          const iframe = mutation.target;
          if (iframe.tagName !== "IFRAME") continue;

          const after = iframeSrc(iframe);
          const before = lastSrcByIframe.get(iframe) || mutation.oldValue || "";
          const isMangomint =
            after.includes(BOOKING_IFRAME_SRC_HINT) ||
            before.includes(BOOKING_IFRAME_SRC_HINT) ||
            attachedIframes.has(iframe);

          if (!isMangomint || after === before) continue;

          emitSignal({
            postMessage: false,
            iframeSrcBefore: before,
            iframeSrcAfter: after,
          });
          lastSrcByIframe.set(iframe, after);
          attachIframe(iframe);
        }

        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            if (node.tagName === "IFRAME") {
              attachIframe(node);
              return;
            }
            node.querySelectorAll?.("iframe").forEach(attachIframe);
          });
        }
      }
    });

    scanExisting();
    window.addEventListener("message", onMessage);
    domObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
      attributeOldValue: true,
    });

    return () => {
      window.removeEventListener("message", onMessage);
      domObserver.disconnect();
      document.querySelectorAll("iframe").forEach((iframe) => {
        const handler = loadHandlers.get(iframe);
        if (handler) iframe.removeEventListener("load", handler);
      });
    };
  }, []);

  return null;
}
