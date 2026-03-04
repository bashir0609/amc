/**
 * spam-check.ts
 * Shared anti-spam utilities for all API form routes.
 *
 * 1. checkHoneypot  — rejects bots that fill hidden fields
 * 2. checkRateLimit — limits 5 submissions / IP / 10 minutes
 * 3. checkScript    — rejects non-Latin character scripts (Cyrillic, Arabic, CJK, etc.)
 */

// ---------------------------------------------------------------------------
// 1. Honeypot
// ---------------------------------------------------------------------------
/**
 * Returns true (is spam) when the honeypot field has been filled.
 * Real users never see or interact with the field.
 */
export function isHoneypotFilled(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

// ---------------------------------------------------------------------------
// 2. In-memory rate limiter
// ---------------------------------------------------------------------------
const RATE_LIMIT_MAX = 5;          // max submissions
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

interface RateEntry {
  count: number;
  resetAt: number;
}

// Key: `${ip}:${routeKey}`
const rateLimitStore = new Map<string, RateEntry>();

/**
 * Returns true (is rate-limited) when the IP has exceeded the allowed
 * number of requests within the time window.
 *
 * @param ip       - client IP address
 * @param routeKey - e.g. "contact", "booking", "shop-enquiry"
 */
export function isRateLimited(ip: string, routeKey: string): boolean {
  const key = `${ip}:${routeKey}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    // First request or window has expired — reset
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true; // over the limit
  }

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// 3. Script / language validation
// ---------------------------------------------------------------------------
/**
 * Regex covering non-Latin Unicode blocks that spammers commonly use:
 * - Cyrillic       \u0400–\u04FF
 * - Arabic         \u0600–\u06FF
 * - CJK Unified    \u4E00–\u9FFF
 * - Hangul         \uAC00–\uD7AF
 * - Hebrew         \u0590–\u05FF
 * - Thai           \u0E00–\u0E7F
 * - Devanagari     \u0900–\u097F
 *
 * Numbers, spaces, punctuation, and standard Latin (including accented
 * characters like é, ü, ñ) are permitted.
 */
const NON_LATIN_SCRIPT_REGEX =
  /[\u0400-\u04FF\u0600-\u06FF\u4E00-\u9FFF\uAC00-\uD7AF\u0590-\u05FF\u0E00-\u0E7F\u0900-\u097F]/;

/**
 * Returns true (is spam) when any of the supplied field strings contain
 * characters from a non-Latin script.
 *
 * @param fields - array of field values to check (undefined/null values are skipped)
 */
export function containsNonLatinScript(
  fields: (string | null | undefined)[]
): boolean {
  return fields.some(
    (value) =>
      typeof value === "string" && NON_LATIN_SCRIPT_REGEX.test(value)
  );
}

// ---------------------------------------------------------------------------
// Helper: extract client IP from Next.js request headers
// ---------------------------------------------------------------------------
/**
 * Returns the best available client IP from a Next.js request.
 * Falls back to "unknown" if no IP can be determined.
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
