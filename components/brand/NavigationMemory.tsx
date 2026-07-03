"use client";

import { useEffect } from "react";
import { theoryRestoreStorageKey, type TheoryReturnState } from "./theory-links";

function parseRestoreState(value: string | null): TheoryReturnState | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as TheoryReturnState;
  } catch {
    return null;
  }
}

export function NavigationMemory() {
  useEffect(() => {
    const restoreState = parseRestoreState(sessionStorage.getItem(theoryRestoreStorageKey));

    if (!restoreState || restoreState.path !== window.location.pathname) {
      return;
    }

    sessionStorage.removeItem(theoryRestoreStorageKey);

    const restoreScrollPosition = () => {
      window.scrollTo({
        behavior: "auto",
        top: Math.max(0, restoreState.scrollY),
      });
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(restoreScrollPosition);
    });
  }, []);

  return null;
}
