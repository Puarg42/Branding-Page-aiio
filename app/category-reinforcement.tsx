"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Transition,
  type Variants,
} from "framer-motion";

import { BrandIllustration } from "../components/brand/BrandIllustration";
import { EditorialEyebrow } from "../components/brand/EditorialEyebrow";
import { TheoryReference } from "../components/brand/TheoryReference";

const motionEase = [0.2, 0, 0, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const staticReveal: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const ceoMoments = [
  {
    statement: "A key expert leaves.",
    support: "The context remains available. Decisions do not start from zero.",
  },
  {
    statement: "A production issue occurs.",
    support:
      "Your organization can trace what changed, what depends on it and who needs to act.",
  },
  {
    statement: "A new regulation appears.",
    support:
      "Obligations connect to processes, owners and capabilities before work fragments.",
  },
] as const;

const infrastructureStages = [
  {
    era: "Industrial Age",
    foundation: "Machines",
  },
  {
    era: "Process Age",
    foundation: "Business Process Management",
  },
  {
    era: "Digital Age",
    foundation: "Digital Systems",
  },
  {
    era: "AI Age",
    foundation: "Artificial Intelligence",
  },
  {
    era: "Next Age",
    foundation: "Organizational Intelligence",
    tone: "cyan",
  },
  {
    era: "Outcome",
    foundation: "Organizational Resilience",
    featured: true,
    tone: "violet",
  },
] as const;

function useReveal(duration = 0.95) {
  const shouldReduceMotion = useReducedMotion();
  const transition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration, ease: motionEase };

  return {
    initial: "hidden" as const,
    transition,
    variants: shouldReduceMotion ? staticReveal : fadeUp,
    viewport: { amount: 0.35, once: true },
    whileInView: "visible" as const,
  };
}

export function CeoMondayMoment() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(
      ceoMoments.length - 1,
      Math.max(0, Math.floor(progress * ceoMoments.length)),
    );

    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  });

  return (
    <section className="ceo-moment-section" id="monday-morning" ref={sectionRef}>
      <div className="ceo-scrolly-sticky">
        <div className="ceo-scrolly-shell">
          <div className="ceo-scrolly-chapter">
            <EditorialEyebrow>Imagine Monday Morning</EditorialEyebrow>
            <ol className="ceo-scenario-indicator" aria-label="Monday Morning scenarios">
              {ceoMoments.map((moment, index) => (
                <li
                  className={[
                    index === activeIndex ? "is-active" : "",
                    index < activeIndex ? "is-complete" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={moment.statement}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{moment.statement}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="ceo-scenario-stage" aria-live="polite">
            {ceoMoments.map((moment, index) => {
              const cardState =
                index === activeIndex
                  ? "is-active"
                  : index < activeIndex
                    ? "is-previous"
                    : "is-upcoming";

              return (
                <article
                  aria-hidden={index !== activeIndex}
                  className={`ceo-moment-card ${cardState}`}
                  data-step={String(index + 1).padStart(2, "0")}
                  key={moment.statement}
                >
                  <span className="ceo-scenario-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2>{moment.statement}</h2>
                  <p>{moment.support}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OrganizationMirror() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = useReveal(1.05);

  return (
    <section className="organization-mirror-section" id="organization-mirror">
      <motion.div className="organization-mirror-intro" {...reveal}>
        <p className="mirror-section-title">The Organization Mirror</p>
        <h2>Fragmented knowledge needs a mirror.</h2>
        <p>
          The knowledge already exists.
          <br />
          The challenge is seeing the relationships.
        </p>
      </motion.div>

      <div className="organization-mirror-visual" aria-label="Organization Mirror visualization">
        <motion.div
          {...reveal}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.1, ease: motionEase, delay: 0.12 }
          }
        >
          <BrandIllustration decorative={false} interactive variant="BC-001" />
        </motion.div>
      </div>
    </section>
  );
}

export function CategoryEvolution() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = useReveal(1);

  return (
    <section className="category-evolution-section" id="category-evolution">
      <motion.div className="category-evolution-intro" {...reveal}>
        <EditorialEyebrow>Why Now</EditorialEyebrow>
        <h2>A new era of complexity requires a new organizational capability.</h2>
      </motion.div>

      <div className="category-timeline" aria-label="Why Now infrastructure progression">
        <div className="category-timeline-line" aria-hidden="true" />
        {infrastructureStages.map((stage, index) => (
          <motion.article
            className={[
              "category-timeline-stage",
              "featured" in stage && stage.featured ? "is-featured" : "",
              "tone" in stage ? `is-${stage.tone}` : "",
            ]
              .filter(Boolean)
              .join(" ")}
            initial="hidden"
            key={stage.era}
            transition={{
              delay: shouldReduceMotion ? 0 : index * 0.1,
              duration: shouldReduceMotion ? 0 : 0.92,
              ease: motionEase,
            }}
            variants={shouldReduceMotion ? staticReveal : fadeUp}
            viewport={{ amount: 0.34, once: true }}
            whileInView="visible"
          >
            <span className="category-stage-dot" aria-hidden="true" />
            <p>{stage.era}</p>
            <h3>
              {stage.foundation === "Organizational Intelligence" ||
              stage.foundation === "Organizational Resilience" ? (
                <TheoryReference>{stage.foundation}</TheoryReference>
              ) : (
                stage.foundation
              )}
            </h3>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
