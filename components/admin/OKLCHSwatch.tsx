"use client";

import { useField, useFieldPath } from "@payloadcms/ui";

export function OKLCHSwatch() {
  const path = useFieldPath();
  const { value } = useField<string>({ path });
  if (!value?.startsWith("oklch(")) return null;
  return (
    <span
      aria-label={`Color preview ${value}`}
      style={{
        background: value,
        border: "1px solid var(--theme-elevation-300)",
        borderRadius: 4,
        display: "inline-block",
        height: 24,
        marginTop: 6,
        width: 48,
      }}
    />
  );
}
