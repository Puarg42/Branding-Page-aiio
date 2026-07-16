"use client";

import { useState } from "react";
import { toast, useField } from "@payloadcms/ui";
import { useLocale } from "@payloadcms/ui/providers/Locale";
import styles from "./DeepLTranslateButton.module.css";

type Props = {
  path?: string;
  field?: { name?: string };
};

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function DeepLTranslateButton({ path, field }: Props) {
  const locale = useLocale();
  const fieldPath = path ?? field?.name ?? "";
  const { value, setValue } = useField<string>({ path: fieldPath });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const target = locale?.code;
  const canTranslate =
    (target === "en" || target === "de") &&
    typeof value === "string" &&
    value.trim().length > 0;

  async function translate() {
    if (!canTranslate) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/deepl/translate", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          text: value,
          targetLocale: target,
          field: field?.name,
        }),
      });
      const result = (await response.json()) as {
        text?: string;
        error?: string;
      };
      if (!response.ok || !result.text) {
        throw new Error(result.error || `DeepL request failed (${response.status})`);
      }
      const translated =
        field?.name === "slug" ? slugify(result.text) : result.text;
      setValue(translated);
      toast.success(`Translated to ${target.toUpperCase()}`);
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Translation failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.root}>
      <button
        className={styles.button}
        disabled={!canTranslate || loading}
        onClick={translate}
        type="button"
      >
        {loading
          ? "Translating…"
          : `Translate with DeepL → ${target?.toUpperCase() ?? "locale"}`}
      </button>
      {!canTranslate && !loading ? (
        <span className={styles.status}>Enter source text first</span>
      ) : null}
      {error ? (
        <span className={`${styles.status} ${styles.error}`} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
