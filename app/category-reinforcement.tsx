"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";

const motionEase = [0.2, 0, 0, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const staticReveal: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const mirrorElements = [
  "People",
  "Processes",
  "Documents",
  "Enterprise Systems",
  "Artificial Intelligence",
  "Data",
] as const;

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
    statement: "Every improvement strengthens the organization.",
    support: "Not just one project.",
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
    featured: true,
    outcome: "Self-Enabling Organizations",
  },
] as const;

const categoryProgression = [
  "Business Process Management",
  "Knowledge Management",
  "Artificial Intelligence",
  "Organizational Intelligence",
  "Self-Enabling Organizations",
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
        <svg
          aria-hidden="true"
          className="mirror-connection-map"
          focusable="false"
          viewBox="0 0 1200 680"
        >
          <path className="mirror-line mirror-line-1" d="M600 340 C480 260 356 190 214 150" />
          <path className="mirror-line mirror-line-2" d="M600 340 C452 354 310 370 158 430" />
          <path className="mirror-line mirror-line-3" d="M600 340 C552 210 506 144 430 86" />
          <path className="mirror-line mirror-line-4" d="M600 340 C712 214 822 144 988 112" />
          <path className="mirror-line mirror-line-5" d="M600 340 C742 360 898 382 1062 454" />
          <path className="mirror-line mirror-line-6" d="M600 340 C610 462 638 548 718 612" />
        </svg>

        <motion.div
          className="mirror-center"
          {...reveal}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.1, ease: motionEase, delay: 0.12 }}
        >
          <span>Living Organizational Memory</span>
          <strong aria-hidden="true">↓</strong>
          <span>Organizational Understanding</span>
        </motion.div>

        {mirrorElements.map((element, index) => (
          <motion.span
            className={`mirror-element mirror-element-${element
              .toLowerCase()
              .replaceAll(" ", "-")}`}
            initial="hidden"
            key={element}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.12 + index * 0.08,
              duration: shouldReduceMotion ? 0 : 0.95,
              ease: motionEase,
            }}
            variants={shouldReduceMotion ? staticReveal : fadeUp}
            viewport={{ amount: 0.35, once: true }}
            whileInView="visible"
          >
            {element}
          </motion.span>
        ))}
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
        <p className="category-evolution-title">Category Evolution</p>
        <h2>Every technological revolution required new infrastructure.</h2>
      </motion.div>

      <div className="category-timeline" aria-label="Infrastructure evolution timeline">
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
            {"outcome" in stage ? (
              <strong className="category-stage-outcome">{stage.outcome}</strong>
            ) : null}
          </motion.article>
        ))}
      </div>

      <motion.div
        className="category-reference-model"
        {...reveal}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: motionEase, delay: 0.16 }}
      >
        <p className="category-reference-label">Category Model</p>
        <ol aria-label="aiio category evolution reference model">
          {categoryProgression.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
