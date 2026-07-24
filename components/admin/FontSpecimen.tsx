"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormFields } from "@payloadcms/ui";
import styles from "./FontSpecimen.module.css";

type UploadValue =
  | number
  | string
  | { id?: number | string; url?: string; filename?: string }
  | null
  | undefined;

type FontFile = {
  file: UploadValue;
  weight: string;
  style: "normal" | "italic";
};

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function googleWeights(stylesheetURL: string) {
  try {
    const url = new URL(stylesheetURL);
    return Array.from(
      new Set(
        url.searchParams
          .getAll("family")
          .flatMap((family) => {
            const axisValues = family.split("@")[1];
            if (!axisValues) return ["400"];
            return axisValues
              .split(";")
              .map((entry) => entry.split(",").at(-1) ?? "")
              .filter((entry) => /^\d{3}$/.test(entry));
          }),
      ),
    );
  } catch {
    return [];
  }
}

export function FontSpecimen() {
  const values = useFormFields(([fields]) => {
    const files = new Map<number, Partial<FontFile>>();
    for (const [path, state] of Object.entries(fields)) {
      const match = path.match(/(?:^|\.)files\.(\d+)\.(file|weight|style)$/);
      if (!match) continue;
      const index = Number(match[1]);
      const row = files.get(index) ?? {};
      if (match[2] === "file") row.file = state.value as UploadValue;
      if (match[2] === "weight") row.weight = stringValue(state.value, "400");
      if (match[2] === "style") {
        row.style = state.value === "italic" ? "italic" : "normal";
      }
      files.set(index, row);
    }
    return {
      name: stringValue(fields.name?.value, "Untitled Font"),
      cssFamily: stringValue(fields.cssFamily?.value),
      fallback: stringValue(
        fields.fallback?.value,
        "ui-sans-serif, system-ui, sans-serif",
      ),
      provider: fields.provider?.value === "google" ? "google" : "local",
      googleFontsURL: stringValue(fields.googleFontsURL?.value),
      files: [...files.values()]
        .filter((row): row is FontFile => Boolean(row.file))
        .map((row) => ({
          file: row.file,
          weight: row.weight || "400",
          style: row.style || "normal",
        })),
    };
  });
  const [sample, setSample] = useState(
    "Organizational Intelligence changes how organizations understand themselves.",
  );
  const [resolvedFiles, setResolvedFiles] = useState<
    Array<FontFile & { url: string }>
  >([]);

  useEffect(() => {
    let cancelled = false;
    async function resolve() {
      const resolved = await Promise.all(
        values.files.map(async (entry) => {
          if (
            entry.file &&
            typeof entry.file === "object" &&
            entry.file.url
          ) {
            return { ...entry, url: entry.file.url };
          }
          const id =
            entry.file && typeof entry.file === "object"
              ? entry.file.id
              : entry.file;
          if (!id) return null;
          try {
            const response = await fetch(`/api/media/${id}?depth=0`, {
              credentials: "same-origin",
            });
            const media = (await response.json()) as { url?: string };
            return media.url ? { ...entry, url: media.url } : null;
          } catch {
            return null;
          }
        }),
      );
      if (!cancelled) {
        setResolvedFiles(
          resolved.filter(
            (entry): entry is FontFile & { url: string } => entry !== null,
          ),
        );
      }
    }
    void resolve();
    return () => {
      cancelled = true;
    };
  }, [values.files]);

  const safeFamily = values.cssFamily.replace(/["{};]/g, "");
  const fontStack = safeFamily
    ? `"${safeFamily}", ${values.fallback}`
    : values.fallback;
  const fontCSS = useMemo(
    () =>
      resolvedFiles
        .map(
          (entry) =>
            `@font-face{font-family:"${safeFamily}";src:url("${entry.url}") format("woff2");font-weight:${entry.weight.replace(/[^0-9 ]/g, "") || "400"};font-style:${entry.style};font-display:swap;}`,
        )
        .join(""),
    [resolvedFiles, safeFamily],
  );
  const detectedWeights =
    values.provider === "google"
      ? googleWeights(values.googleFontsURL)
      : Array.from(new Set(resolvedFiles.map((file) => file.weight)));
  const weights = detectedWeights.length ? detectedWeights : ["400"];
  const ready =
    Boolean(safeFamily) &&
    (values.provider === "google"
      ? Boolean(values.googleFontsURL)
      : resolvedFiles.length > 0);

  return (
    <section className={styles.root}>
      {values.provider === "google" && values.googleFontsURL ? (
        <link href={values.googleFontsURL} rel="stylesheet" />
      ) : null}
      {fontCSS ? <style dangerouslySetInnerHTML={{ __html: fontCSS }} /> : null}

      <div className={styles.header}>
        <h3 className={styles.title}>Font specimen · {values.name}</h3>
        <span className={styles.meta}>
          {values.provider === "google"
            ? "Google Fonts"
            : `${resolvedFiles.length} local file${resolvedFiles.length === 1 ? "" : "s"}`}
        </span>
      </div>

      {!ready ? (
        <p className={styles.empty}>
          Add a CSS Family and either a Google Fonts URL or at least one uploaded
          WOFF2 file to render the specimen.
        </p>
      ) : (
        <>
          <label className={styles.label} htmlFor="font-specimen-sample">
            Editable sample
          </label>
          <input
            className={styles.sampleInput}
            id="font-specimen-sample"
            onChange={(event) => setSample(event.target.value)}
            value={sample}
          />

          <div className={styles.scale} style={{ fontFamily: fontStack }}>
            {[
              ["64", "4rem"],
              ["40", "2.5rem"],
              ["28", "1.75rem"],
              ["20", "1.25rem"],
              ["16", "1rem"],
            ].map(([label, size]) => (
              <div className={styles.scaleRow} key={label}>
                <span className={styles.label}>{label}px</span>
                <span className={styles.sample} style={{ fontSize: size }}>
                  {sample}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.characterGrid} style={{ fontFamily: fontStack }}>
            <span className={styles.label}>Uppercase</span>
            <p className={styles.characters}>ABCDEFGHIJKLMNOPQRSTUVWXYZ ÄÖÜ</p>
            <span className={styles.label}>Lowercase</span>
            <p className={styles.characters}>abcdefghijklmnopqrstuvwxyz äöüß</p>
            <span className={styles.label}>Numerals & punctuation</span>
            <p className={styles.characters}>
              0123456789 · € $ % & @ # ? ! : ; ( ) [ ] “ ” — →
            </p>
          </div>

          <div className={styles.weights}>
            <span className={styles.label}>Available weights</span>
            {weights.map((weight) => (
              <div className={styles.weightRow} key={weight}>
                <span className={styles.label}>{weight}</span>
                <span
                  style={{
                    fontFamily: fontStack,
                    fontSize: "1.25rem",
                    fontWeight: weight,
                  }}
                >
                  The organization understands itself.
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
