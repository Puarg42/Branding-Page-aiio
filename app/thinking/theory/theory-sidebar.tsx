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

    function updateReadingState() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      const currentChapter = chapters
        .map((chapter) => document.getElementById(chapter.id))
        .filter((section): section is HTMLElement => Boolean(section))
        .reduce((current, section) => {
          if (section.getBoundingClientRect().top <= window.innerHeight * 0.34) {
            return section.id;
          }

          return current;
        }, chapters[0]?.id ?? "");

      setProgress(Math.min(100, Math.max(0, nextProgress)));
      setActiveId(currentChapter);
    }

    function onScroll() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateReadingState);
    }

    updateReadingState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
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
