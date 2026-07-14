"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import {
  theoryRestoreStorageKey,
  theoryReturnStorageKey,
  type TheoryReturnState,
} from "../../../components/brand/theory-links";
import { EditorialEyebrow } from "../../../components/brand/EditorialEyebrow";
import { theoryPublication } from "../publication-model";

type TheorySidebarChapter = {
  id: string;
  title: string;
};

type TheorySidebarProps = {
  chapters: TheorySidebarChapter[];
};

export function TheorySidebar({ chapters }: TheorySidebarProps) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [returnState, setReturnState] = useState<TheoryReturnState | null>(null);

  function handleChapterClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const chapter = document.getElementById(id);

    if (!chapter) {
      return;
    }

    event.preventDefault();
    chapter.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  }

  function handleReturnClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!returnState) {
      return;
    }

    event.preventDefault();
    try {
      sessionStorage.setItem(theoryRestoreStorageKey, JSON.stringify(returnState));
    } catch {
      // The fallback URL still returns the reader to the originating page.
    }

    const returnHash = returnState.sectionId ? `#${returnState.sectionId}` : returnState.hash;

    window.location.assign(`${returnState.path}${returnState.search}${returnHash}`);
  }

  useEffect(() => {
    let animationFrame = 0;
    let hashFrame = 0;
    let returnStateFrame = 0;

    function updateProgress() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, nextProgress)));
    }

    function onScroll() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateProgress);
    }

    const hashId = window.location.hash.replace(/^#/, "");

    if (hashId && chapters.some((chapter) => chapter.id === hashId)) {
      hashFrame = window.requestAnimationFrame(() => setActiveId(hashId));
    }

    try {
      const storedReturnState = sessionStorage.getItem(theoryReturnStorageKey);

      if (storedReturnState) {
        const nextReturnState = JSON.parse(storedReturnState) as TheoryReturnState;
        returnStateFrame = window.requestAnimationFrame(() => setReturnState(nextReturnState));
      }
    } catch {
      returnStateFrame = window.requestAnimationFrame(() => setReturnState(null));
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
        root: null,
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0, 0.08, 0.18],
      },
    );

    chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section))
      .forEach((section) => observer.observe(section));

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(hashFrame);
      window.cancelAnimationFrame(returnStateFrame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  const returnHash = returnState?.sectionId ? `#${returnState.sectionId}` : returnState?.hash ?? "";
  const returnHref = returnState
    ? `${returnState.path}${returnState.search}${returnHash}`
    : "/thinking";
  const returnLabel = returnState ? `Back to ${returnState.sourceLabel}` : "Back to Thinking";

  return (
    <aside className="theory-sidebar" aria-label="Theory table of contents">
      <Link className="theory-publisher-logo" href="/" aria-label="aiio Startseite">
        <span className="aiio-logo" aria-hidden="true" />
        <span className="sr-only">aiio</span>
      </Link>

      <a className="theory-back-link" href={returnHref} onClick={handleReturnClick}>
        <span aria-hidden="true">&larr;</span>
        {returnLabel}
      </a>

      <div className="theory-sidebar-intro">
        <EditorialEyebrow>Theory</EditorialEyebrow>
        <h2>Organizational Intelligence</h2>
        <p>The Theory of Organizational Intelligence</p>
      </div>

      <div className="theory-publication-meta" aria-label="Publication details">
        <span>{theoryPublication.title}</span>
        <span>{theoryPublication.version}</span>
        <span>{theoryPublication.edition}</span>
        <span>Last updated {theoryPublication.lastUpdated}</span>
        <span>{chapters.length} Chapters</span>
        <span>{theoryPublication.readingTime}</span>
      </div>

      <div className="theory-progress" aria-label="Reading progress">
        <div className="theory-progress-meta">
          <span>Reading progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="theory-progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <nav className="theory-sidebar-nav" aria-label="Contents">
        <p>Contents</p>
        <ol>
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <a
                className={chapter.id === activeId ? "is-active" : ""}
                href={`#${chapter.id}`}
                onClick={(event) => handleChapterClick(event, chapter.id)}
              >
                <span>{`T${String(index).padStart(2, "0")}`}</span>
                <span>{chapter.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="theory-sidebar-note">
        <span aria-hidden="true">*</span>
        <p>
          <strong>This theory is living.</strong>
          It evolves with insights, experience and the organizations that apply it.
        </p>
      </div>
    </aside>
  );
}
