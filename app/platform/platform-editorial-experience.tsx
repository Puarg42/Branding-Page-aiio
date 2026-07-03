"use client";

import { useEffect, useState } from "react";
import { BrandCanonLightbox } from "../../components/brand/BrandCanonLightbox";

const sections = [
  { id: "platform-hero", label: "Hero" },
  { id: "capability-layer", label: "The System" },
  { id: "platform-capabilities", label: "Capabilities" },
  { id: "platform-outcome", label: "Outcome" },
] as const;

const capabilityCardSelector = ".website-capability-card[data-capability]";
const revealSelector = [
  ".website-platform-system-section .website-section-heading",
  ".website-capability-section .website-section-heading",
  ".website-platform-outcome-section .website-eyebrow",
  ".website-platform-outcome-section h2",
  ".website-platform-outcome-section p",
  ".website-platform-outcome-ladder",
].join(",");

function getPrefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function revealOutcomeItems(target: Element) {
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (!target.classList.contains("website-platform-outcome-ladder")) {
    return;
  }

  Array.from(target.children).forEach((child) => {
    if (child instanceof HTMLElement) {
      child.classList.add("is-visible");
    }
  });
}

export function PlatformEditorialExperience() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  useEffect(() => {
    const page = document.querySelector(".website-page");

    if (!page) {
      return;
    }

    page.classList.add("platform-editorial-motion");

    return () => {
      page.classList.remove("platform-editorial-motion");
    };
  }, []);

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
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
  }, []);

  useEffect(() => {
    const journey = document.querySelector<HTMLElement>(".website-capability-journey");
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>(".website-capability-journey-step[data-capability]"),
    );
    const cards = Array.from(document.querySelectorAll<HTMLElement>(capabilityCardSelector));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => {
            return Math.abs(first.boundingClientRect.top) - Math.abs(second.boundingClientRect.top);
          })[0];

        const capability = visibleEntry?.target.getAttribute("data-capability");

        if (!capability) {
          return;
        }

        journey?.classList.add("is-active");
        journey?.setAttribute("data-active-capability", capability);

        steps.forEach((step) => {
          step.classList.toggle("is-active", step.getAttribute("data-capability") === capability);
        });
      },
      {
        rootMargin: "-28% 0px -46% 0px",
        threshold: [0.08, 0.2, 0.4],
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    if (getPrefersReducedMotion()) {
      revealTargets.forEach((target) => {
        target.classList.add("is-visible");
        revealOutcomeItems(target);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealOutcomeItems(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (getPrefersReducedMotion()) {
      return;
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".website-capability-layer-visual, .website-card-canon"),
    );
    let animationFrame = 0;

    function updateParallax() {
      const viewportHeight = window.innerHeight;

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
        const progress = clamp(centerOffset / viewportHeight, -1, 1);
        const offset = clamp(progress * -18, -18, 18);

        target.style.setProperty("--editorial-parallax", `${offset.toFixed(2)}px`);
      });
    }

    function scheduleParallax() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateParallax);
    }

    updateParallax();
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", scheduleParallax);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
    };
  }, []);

  return (
    <>
      <BrandCanonLightbox />
      <nav aria-label="Platform sections" className="platform-section-navigator">
        {sections.map((section) => (
          <a
            className={section.id === activeSection ? "is-active" : undefined}
            href={`#${section.id}`}
            key={section.id}
          >
            <span>{section.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
