"use client";

import { useActionState, useId } from "react";
import {
  initialLeadState,
  submitLead,
} from "@/app/(frontend)/actions/submit-lead";
import styles from "./LeadForm.module.css";

type LeadFormProps = {
  /** Route or context the lead originated from, e.g. "/live-demo/kontakt". */
  source: string;
  buttonLabel?: string;
  /** Preset value for the topic field (e.g. per resource page). */
  topic?: string;
};

const CONSENT_LABEL =
  "I agree that aiio may contact me about my request. I can withdraw consent at any time.";

export function LeadForm({ source, buttonLabel = "Send message", topic }: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(submitLead, initialLeadState);
  const baseId = useId();
  const nameError = state.fieldErrors?.name;
  const emailError = state.fieldErrors?.email;
  const consentError = state.fieldErrors?.consent;

  if (state.status === "success") {
    return (
      <p className={`${styles.status} ${styles.statusSuccess}`} role="status" aria-live="polite">
        {state.message}
      </p>
    );
  }

  return (
    <form className={styles.form} action={formAction} noValidate>
      <input type="hidden" name="source" value={source} />
      {topic ? <input type="hidden" name="topic" value={topic} /> : null}

      {/* Honeypot — hidden from users, catches bots. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${baseId}-company-url`}>Company URL</label>
        <input
          id={`${baseId}-company-url`}
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${baseId}-name`}>
          Name <span className={styles.required}>*</span>
        </label>
        <input
          className={styles.input}
          id={`${baseId}-name`}
          name="name"
          required
          autoComplete="name"
          aria-invalid={nameError ? "true" : undefined}
          aria-describedby={nameError ? `${baseId}-name-error` : undefined}
        />
        {nameError ? (
          <span className={styles.fieldError} id={`${baseId}-name-error`} role="alert">
            {nameError}
          </span>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${baseId}-email`}>
          Email <span className={styles.required}>*</span>
        </label>
        <input
          className={styles.input}
          id={`${baseId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={emailError ? "true" : undefined}
          aria-describedby={emailError ? `${baseId}-email-error` : undefined}
        />
        {emailError ? (
          <span className={styles.fieldError} id={`${baseId}-email-error`} role="alert">
            {emailError}
          </span>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${baseId}-company`}>
          Company
        </label>
        <input
          className={styles.input}
          id={`${baseId}-company`}
          name="company"
          autoComplete="organization"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${baseId}-message`}>
          Message
        </label>
        <textarea className={styles.textarea} id={`${baseId}-message`} name="message" />
      </div>

      <div className={styles.field}>
        <label className={styles.consent}>
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={consentError ? "true" : undefined}
          />
          <span>{CONSENT_LABEL}</span>
        </label>
        {consentError ? (
          <span className={styles.fieldError} role="alert">
            {consentError}
          </span>
        ) : null}
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit" disabled={isPending}>
          {isPending ? "Sending…" : buttonLabel}
        </button>
        {state.status === "error" ? (
          <span className={`${styles.status} ${styles.statusError}`} role="alert" aria-live="assertive">
            {state.message}
          </span>
        ) : null}
      </div>
    </form>
  );
}
