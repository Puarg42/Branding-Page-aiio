"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    let animationFrame = 0;

    function updateProgress() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, nextProgress)));
    }

    function onScroll() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateProgress);
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
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  return (
    <aside className="theory-sidebar" aria-label="Theory table of contents">
      <div className="theory-sidebar-intro">
        <p className="theory-sidebar-eyebrow">Theory</p>
        <h2>Organizational Intelligence</h2>
        <p>A Theory of Organizational Understanding</p>
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
              <a className={chapter.id === activeId ? "is-active" : ""} href={`#${chapter.id}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
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
