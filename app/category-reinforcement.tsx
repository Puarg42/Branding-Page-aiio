"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";

import { OrganizationalMindVisual } from "./visual-language";

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
    statement: "Your most experienced expert retires.",
    support: (
      <>
        Nothing is lost.
        <br />
        Your organization remembers.
      </>
    ),
  },
  {
    statement: "Artificial Intelligence answers with confidence.",
    support: "Because it understands your organization.",
  },
  {
    statement: "Your organization continuously develops new capabilities.",
    support: "Without starting from zero.",
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
    foundation: "Knowledge Management",
  },
  {
    era: "AI Age",
    foundation: "Artificial Intelligence",
  },
  {
    era: "Next Age",
    foundation: "Organizational Intelligence",
  },
  {
    era: "Outcome",
    foundation: "Self-Enabling Organizations",
    featured: true,
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
  const shouldReduceMotion = useReducedMotion();
  const reveal = useReveal(1);

  return (
    <section className="ceo-moment-section" id="monday-morning">
      <p className="ceo-moment-title">Imagine Monday Morning.</p>
      {ceoMoments.map((moment, index) => (
        <section className="ceo-moment" key={moment.statement}>
          <motion.div
            className="ceo-moment-copy"
            {...reveal}
            transition={{
              ...reveal.transition,
              delay: shouldReduceMotion ? 0 : index * 0.04,
            }}
          >
            <h2>{moment.statement}</h2>
            <p>{moment.support}</p>
          </motion.div>
        </section>
      ))}
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
        <h2>Every organization already contains intelligence.</h2>
        <p>
          Organizational knowledge already exists.
          <br />
          The challenge is making it visible.
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
          <OrganizationalMindVisual />
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
        <p className="category-evolution-title">Why Now?</p>
        <h2>Every technological revolution required new infrastructure.</h2>
      </motion.div>

      <div className="category-timeline" aria-label="Why Now infrastructure progression">
        <div className="category-timeline-line" aria-hidden="true" />
        {infrastructureStages.map((stage, index) => (
          <motion.article
            className={`category-timeline-stage${
              "featured" in stage && stage.featured ? " is-featured" : ""
            }`}
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
            <h3>{stage.foundation}</h3>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
