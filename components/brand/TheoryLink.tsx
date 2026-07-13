"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { theoryReturnStorageKey, type TheoryReturnState } from "./theory-links";

type TheoryLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

const sourceLabels: Record<string, string> = {
  "/": "Home",
  "/company": "Company",
  "/datenschutz": "Privacy",
  "/impressum": "Legal",
  "/live-demo/kontakt": "Request a Conversation",
  "/partners": "Partners",
  "/platform": "Platform",
  "/thinking": "Thinking",
};

function getSourceLabel(pathname: string) {
  return sourceLabels[pathname] ?? document.title.replace(/\s*\|\s*aiio.*$/i, "") ?? "previous page";
}

function getCurrentSectionId() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("section[id], article[id], main[id]"),
  );
  let currentSection: HTMLElement | undefined;

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 140) {
      currentSection = section;
    }
  });

  return currentSection?.id || window.location.hash.replace(/^#/, "") || undefined;
}

function shouldStoreTheoryReturnState(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  ) {
    return false;
  }

  const target = event.currentTarget.target;

  if (target && target !== "_self") {
    return false;
  }

  try {
    const url = new URL(href, window.location.origin);

    return url.origin === window.location.origin && url.pathname === "/thinking/theory";
  } catch {
    return false;
  }
}

export function TheoryLink({ href, onClick, ...props }: TheoryLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (!shouldStoreTheoryReturnState(event, href)) {
      return;
    }

    if (window.location.pathname === "/thinking/theory") {
      return;
    }

    const returnState: TheoryReturnState = {
      hash: window.location.hash,
      path: window.location.pathname,
      scrollY: window.scrollY,
      search: window.location.search,
      sectionId: getCurrentSectionId(),
      sourceLabel: getSourceLabel(window.location.pathname),
      timestamp: Date.now(),
    };

    try {
      sessionStorage.setItem(theoryReturnStorageKey, JSON.stringify(returnState));
    } catch {
      // If session storage is unavailable, the link still behaves as a normal Theory link.
    }
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
