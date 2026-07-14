"use client";

import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";

export type EditorialSectionNavigatorItem = {
  id: string;
  label: string;
};

type EditorialSectionNavigatorProps = {
  ariaLabel?: string;
  sections: readonly EditorialSectionNavigatorItem[];
};

function getPrefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getScrollOffset() {
  return window.matchMedia("(max-width: 720px)").matches ? 84 : 112;
}

export function EditorialSectionNavigator({
  ariaLabel = "Page sections",
  sections,
}: EditorialSectionNavigatorProps) {
  const items = useMemo(
    () => sections.filter((section) => section.id && section.label),
    [sections],
  );
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setActiveId(items[0]?.id ?? "");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [items]);

  useEffect(() => {
    const sectionElements = items
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-34% 0px -54% 0px",
        threshold: [0, 0.08, 0.2],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    event.preventDefault();
    const targetTop = section.getBoundingClientRect().top + window.scrollY - getScrollOffset();

    window.scrollTo({
      behavior: getPrefersReducedMotion() ? "auto" : "smooth",
      top: Math.max(0, targetTop),
    });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  if (items.length < 2) {
    return null;
  }

  return (
    <nav aria-label={ariaLabel} className="editorial-section-navigator">
      {items.map((section) => (
        <a
          aria-current={section.id === activeId ? "true" : undefined}
          className={section.id === activeId ? "is-active" : undefined}
          href={`#${section.id}`}
          key={section.id}
          onClick={(event) => handleClick(event, section.id)}
        >
          <span>{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
