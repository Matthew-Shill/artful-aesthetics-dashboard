/**
 * First-party acquisition attribution.
 *
 * GA4 already attributes conversions by session source/medium, but that chain
 * breaks in the two places this site is most exposed:
 *
 * 1. Booking happens in a Mangomint iframe, and finishing it navigates the top
 *    window to /thank-you. If that navigation carries a booking.mangomint.com
 *    referrer, GA4 starts a *new* session and credits the booking to Mangomint
 *    instead of Google or Instagram.
 * 2. Picking a treatment and a time regularly takes longer than GA4's 30-minute
 *    session timeout, which rolls the session over to "direct".
 *
 * So the acquisition touch is captured on arrival and stored first-party, then
 * replayed as event parameters on the booking events. That makes the answer to
 * "did this booking come from Google, socials, or somewhere else" a property of
 * the conversion event itself rather than something GA4 has to reconstruct.
 */

const STORAGE_KEY = "aam_attribution";
const SCHEMA_VERSION = 1;
/** Roughly GA4's default acquisition lookback. */
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
/** GA4 truncates event parameter values beyond 100 characters. */
const VALUE_MAX = 100;

export const CHANNELS = {
  PAID_SEARCH: "paid_search",
  ORGANIC_SEARCH: "organic_search",
  PAID_SOCIAL: "paid_social",
  ORGANIC_SOCIAL: "organic_social",
  EMAIL: "email",
  SMS: "sms",
  REFERRAL: "referral",
  DIRECT: "direct",
};

/** Click IDs that identify the ad network on their own, before any UTM tagging. */
const CLICK_IDS = [
  { param: "gclid", source: "google", channel: CHANNELS.PAID_SEARCH },
  { param: "gbraid", source: "google", channel: CHANNELS.PAID_SEARCH },
  { param: "wbraid", source: "google", channel: CHANNELS.PAID_SEARCH },
  { param: "msclkid", source: "bing", channel: CHANNELS.PAID_SEARCH },
  // Meta stamps fbclid on organic posts and stories too, so it is not proof of spend.
  { param: "fbclid", source: "facebook", channel: CHANNELS.ORGANIC_SOCIAL },
  { param: "ttclid", source: "tiktok", channel: CHANNELS.PAID_SOCIAL },
  { param: "li_fat_id", source: "linkedin", channel: CHANNELS.PAID_SOCIAL },
];

/** Matched as hostname substrings, so regional domains (google.co.uk) resolve too. */
const SEARCH_HOSTS = [
  ["google.", "google"],
  ["bing.", "bing"],
  ["duckduckgo.", "duckduckgo"],
  ["search.yahoo.", "yahoo"],
  ["ecosia.", "ecosia"],
  ["search.brave.", "brave"],
  ["startpage.", "startpage"],
  ["yandex.", "yandex"],
  ["baidu.", "baidu"],
];

const SOCIAL_HOSTS = [
  ["instagram.", "instagram"],
  ["facebook.", "facebook"],
  ["messenger.", "facebook"],
  ["fb.", "facebook"],
  ["tiktok.", "tiktok"],
  ["pinterest.", "pinterest"],
  ["linkedin.", "linkedin"],
  ["lnkd.in", "linkedin"],
  ["youtube.", "youtube"],
  ["youtu.be", "youtube"],
  ["twitter.", "x"],
  ["x.com", "x"],
  ["t.co", "x"],
  ["reddit.", "reddit"],
  ["snapchat.", "snapchat"],
  ["threads.", "threads"],
  ["nextdoor.", "nextdoor"],
];

const EMAIL_HOSTS = [
  ["mail.google.", "gmail"],
  ["outlook.", "outlook"],
  ["mail.yahoo.", "yahoo_mail"],
];

/**
 * Referrers that must never count as an acquisition touch. Mangomint hands the
 * visitor back mid-booking, so treating it as a new source would overwrite the
 * very attribution this module exists to protect.
 */
const IGNORED_HOSTS = ["mangomint.com"];

const PAID_MEDIUMS = ["cpc", "ppc", "paid", "cpm", "cpv", "cpa", "display", "retargeting"];
const SOCIAL_SOURCES = SOCIAL_HOSTS.map(([, name]) => name);

function clean(value) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, VALUE_MAX);
}

function hostOf(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function matchHost(host, table) {
  const hit = table.find(([needle]) => host.includes(needle));
  return hit ? hit[1] : "";
}

function isSelf(host) {
  if (typeof window === "undefined") return false;
  return host === window.location.hostname || host.endsWith(`.${window.location.hostname}`);
}

/** Maps an explicitly tagged utm_medium onto a channel bucket. */
function channelForTaggedTouch(source, medium) {
  const isSocialSource = SOCIAL_SOURCES.includes(source);

  if (PAID_MEDIUMS.some((paid) => medium.includes(paid))) {
    return isSocialSource ? CHANNELS.PAID_SOCIAL : CHANNELS.PAID_SEARCH;
  }
  if (medium.includes("email") || medium.includes("newsletter")) return CHANNELS.EMAIL;
  if (medium.includes("sms") || medium.includes("text")) return CHANNELS.SMS;
  if (medium.includes("social")) return CHANNELS.ORGANIC_SOCIAL;
  if (medium.includes("organic")) return CHANNELS.ORGANIC_SEARCH;
  if (isSocialSource) return CHANNELS.ORGANIC_SOCIAL;
  return CHANNELS.REFERRAL;
}

/** Classifies the current page load into a single acquisition touch. */
export function readCurrentTouch() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const referrer = clean(document.referrer);
  const referrerHost = hostOf(document.referrer);
  const landingPage = clean(window.location.pathname);
  const now = Date.now();

  const base = {
    campaign: clean(params.get("utm_campaign")),
    term: clean(params.get("utm_term")),
    content: clean(params.get("utm_content")),
    referrer: referrerHost,
    landing_page: landingPage,
    ts: now,
  };

  // A referrer we deliberately ignore must not masquerade as a referral touch.
  const ignored = IGNORED_HOSTS.some((host) => referrerHost.includes(host)) || isSelf(referrerHost);

  const utmSource = clean(params.get("utm_source")).toLowerCase();
  if (utmSource) {
    const medium = clean(params.get("utm_medium")).toLowerCase() || "referral";
    return {
      ...base,
      source: utmSource,
      medium,
      channel: channelForTaggedTouch(utmSource, medium),
    };
  }

  const click = CLICK_IDS.find(({ param }) => params.get(param));
  if (click) {
    // Instagram and Facebook both stamp fbclid; the referrer disambiguates.
    const source = click.param === "fbclid" ? matchHost(referrerHost, SOCIAL_HOSTS) || click.source : click.source;
    return {
      ...base,
      source,
      medium: click.channel.startsWith("paid") ? "cpc" : "social",
      channel: click.channel,
      click_id: click.param,
    };
  }

  if (!referrerHost || ignored) {
    return { ...base, source: "(direct)", medium: "(none)", channel: CHANNELS.DIRECT, referrer: "" };
  }

  // Webmail is checked first: mail.google.com would otherwise match the Google
  // search host and report an email click as organic search.
  const email = matchHost(referrerHost, EMAIL_HOSTS);
  if (email) {
    return { ...base, source: email, medium: "email", channel: CHANNELS.EMAIL };
  }

  const search = matchHost(referrerHost, SEARCH_HOSTS);
  if (search) {
    return { ...base, source: search, medium: "organic", channel: CHANNELS.ORGANIC_SEARCH };
  }

  const social = matchHost(referrerHost, SOCIAL_HOSTS);
  if (social) {
    return { ...base, source: social, medium: "social", channel: CHANNELS.ORGANIC_SOCIAL };
  }

  return { ...base, source: referrerHost, medium: "referral", channel: CHANNELS.REFERRAL };
}

function readRecord() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw);
    if (record?.v !== SCHEMA_VERSION || !record.first || !record.last) return null;
    if (Date.now() - record.first.ts > MAX_AGE_MS) return null;
    return record;
  } catch {
    return null;
  }
}

function writeRecord(record) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private browsing or a full quota. Attribution degrades to GA4's own
    // session attribution rather than breaking the page.
  }
}

/**
 * Records this page load against the stored journey and returns the result.
 *
 * Last touch follows the last-non-direct-click convention: a direct arrival
 * later in the journey does not erase the Google or Instagram click that
 * actually earned the visit.
 */
export function captureTouch() {
  const touch = readCurrentTouch();
  if (!touch) return null;

  const existing = readRecord();
  if (!existing) {
    const record = { v: SCHEMA_VERSION, first: touch, last: touch, touches: 1 };
    writeRecord(record);
    return record;
  }

  if (touch.channel === CHANNELS.DIRECT) return existing;

  const isRepeatOfLast =
    touch.source === existing.last.source &&
    touch.medium === existing.last.medium &&
    touch.campaign === existing.last.campaign;
  if (isRepeatOfLast) return existing;

  const record = {
    ...existing,
    last: touch,
    touches: (existing.touches || 1) + 1,
  };
  writeRecord(record);
  return record;
}

/**
 * Attribution as GA4 event parameters.
 *
 * Names are prefixed because GA4 reserves the bare `source`, `medium`,
 * `campaign`, `term` and `content` parameters for manual campaign attribution —
 * sending those would rewrite the traffic source instead of describing it.
 * Each of these needs registering as a custom dimension before it shows up in
 * reports; see the analytics section of the README.
 */
export function getAttributionParams() {
  const record = readRecord() || captureTouch();
  if (!record) return {};

  const { first, last } = record;
  const daysToBook = Math.floor((Date.now() - first.ts) / (24 * 60 * 60 * 1000));

  return {
    attr_channel: last.channel,
    attr_source: last.source,
    attr_medium: last.medium,
    ...(last.campaign ? { attr_campaign: last.campaign } : {}),
    ...(last.referrer ? { attr_referrer: last.referrer } : {}),
    attr_first_channel: first.channel,
    attr_first_source: first.source,
    attr_landing_page: first.landing_page,
    attr_touches: record.touches || 1,
    attr_days_to_book: daysToBook,
  };
}
