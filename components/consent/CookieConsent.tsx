"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, writeConsent } from "@/lib/consent";
import styles from "./CookieConsent.module.css";

/**
 * First-party cookie consent banner. Renders only when no valid choice is
 * stored. No analytics/third-party scripts run until analytics consent is
 * granted (gate future scripts with `hasAnalyticsConsent()`).
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Cookie is only readable on the client; reading during render would cause
    // a hydration mismatch, so this mount-only sync is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  function decide(analytics: boolean) {
    writeConsent(analytics);
    setVisible(false);
  }

  return (
    <section
      className={styles.banner}
      role="region"
      aria-label="Cookie consent"
    >
      <p className={styles.copy}>
        We use necessary cookies to run this site and, with your consent,
        optional cookies to understand usage. See our{" "}
        <Link className={styles.link} href="/datenschutz">
          privacy notice
        </Link>
        .
      </p>
      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.decline}`}
          type="button"
          onClick={() => decide(false)}
        >
          Decline optional
        </button>
        <button
          className={`${styles.button} ${styles.accept}`}
          type="button"
          onClick={() => decide(true)}
          autoFocus
        >
          Accept all
        </button>
      </div>
    </section>
  );
}
