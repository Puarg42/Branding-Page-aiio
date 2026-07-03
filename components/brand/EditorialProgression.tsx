"use client";

import type { ReactNode } from "react";

type EditorialProgressionTone =
  | "amber"
  | "cyan"
  | "graphite"
  | "purple"
  | "violet"
  | "white";

export type EditorialProgressionItem = {
  connectorBefore?: string;
  label: ReactNode;
  meta?: ReactNode;
  tone?: EditorialProgressionTone;
};

type EditorialProgressionProps = {
  ariaLabel: string;
  className?: string;
  items: EditorialProgressionItem[];
  orientation?: "horizontal" | "vertical";
};

export function EditorialProgression({
  ariaLabel,
  className,
  items,
  orientation = "vertical",
}: EditorialProgressionProps) {
  const classNames = [
    "editorial-progression",
    `is-${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure aria-label={ariaLabel} className={classNames}>
      <ol>
        {items.map((item, index) => (
          <li
            className={`is-${item.tone ?? "white"}`}
            data-connector={index === 0 ? undefined : item.connectorBefore ?? "↓"}
            key={`${index}-${String(item.meta ?? "")}`}
          >
            {item.meta ? <span>{item.meta}</span> : null}
            <strong>{item.label}</strong>
          </li>
        ))}
      </ol>
    </figure>
  );
}
