/*
 * Lightweight cookie-consent state. Stored in a first-party cookie so both the
 * client and (future) server code can read the choice. No third-party scripts
 * are loaded until analytics consent is granted.
 */

export const CONSENT_COOKIE = "aiio-consent";
export const CONSENT_VERSION = 1;
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export type ConsentValue = {
  version: number;
  necessary: true;
  analytics: boolean;
  ts: number;
};

export function parseConsent(raw: string | undefined | null): ConsentValue | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentValue>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: Boolean(parsed.analytics),
      ts: typeof parsed.ts === "number" ? parsed.ts : Date.now(),
    };
  } catch {
    return null;
  }
}

export function readConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  return parseConsent(match?.split("=").slice(1).join("="));
}

export function writeConsent(analytics: boolean): ConsentValue {
  const value: ConsentValue = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    ts: Date.now(),
  };
  if (typeof document !== "undefined") {
    const encoded = encodeURIComponent(JSON.stringify(value));
    document.cookie = `${CONSENT_COOKIE}=${encoded}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
  }
  return value;
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics ?? false;
}
