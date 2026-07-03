"use client";

import type { ReactNode } from "react";
import { EditorialJumpArrow } from "./EditorialJumpArrow";
import { TheoryLink } from "./TheoryLink";
import { getCanonicalTheoryLinkForLabel } from "./theory-links";

type TheoryReferenceProps = {
  children: ReactNode;
  href?: string;
};

export function TheoryReference({
  children,
  href,
}: TheoryReferenceProps) {
  const label = typeof children === "string" ? children : "this concept";
  const theoryHref =
    href ??
    (typeof children === "string"
      ? getCanonicalTheoryLinkForLabel(children)
      : "/thinking/theory");

  return (
    <TheoryLink
      aria-label={`Read theoretical foundation for ${label}`}
      className="theory-reference"
      href={theoryHref}
      title="Read theoretical foundation"
    >
      <span className="theory-reference-text">{children}</span>
      <EditorialJumpArrow />
    </TheoryLink>
  );
}
