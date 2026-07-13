"use client";

import type { CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";

import styles from "./organizational-thought-space.module.css";
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

const thoughtSpaceQuestions = [
  {
    question: "Could your organization explain itself?",
    context:
      "Structures, responsibilities and decisions become resilient only when the organization can make its own logic visible.",
    x: "8%",
    y: "14%",
    dx: "18px",
    dy: "-12px",
    duration: "52s",
    delay: "-8s",
    scale: "large",
    tone: "violet",
  },
  {
    question: "How dependent is your business on individual experts?",
    context:
      "When context lives inside a few minds, continuity depends on people being available at exactly the right moment.",
    x: "52%",
    y: "10%",
    dx: "-14px",
    dy: "16px",
    duration: "58s",
    delay: "-22s",
    scale: "medium",
    tone: "cyan",
  },
  {
    question:
      "What part of your advantage exists only inside people's heads?",
    context:
      "Competitive advantage becomes fragile when the organization cannot preserve the knowledge that makes it work.",
    x: "28%",
    y: "34%",
    dx: "14px",
    dy: "18px",
    duration: "64s",
    delay: "-31s",
    scale: "small",
    tone: "quiet",
  },
  {
    question: "How resilient is your operating model?",
    context:
      "Resilience depends on whether the organization can keep understanding itself while conditions change.",
    x: "67%",
    y: "36%",
    dx: "-18px",
    dy: "-10px",
    duration: "56s",
    delay: "-15s",
    scale: "large",
    tone: "violet",
  },
  {
    question:
      "Can leadership understand the consequences of strategic decisions before they happen?",
    context:
      "Strategy becomes executable when leadership can see how decisions touch processes, capabilities and responsibility.",
    x: "7%",
    y: "58%",
    dx: "16px",
    dy: "12px",
    duration: "62s",
    delay: "-38s",
    scale: "medium",
    tone: "cyan",
  },
  {
    question: "Do you really know how your organization creates value?",
    context:
      "Value creation becomes governable when the organization can understand the relationships behind its work.",
    x: "43%",
    y: "62%",
    dx: "-16px",
    dy: "-16px",
    duration: "54s",
    delay: "-5s",
    scale: "large",
    tone: "violet",
  },
  {
    question: "Can strategy be translated into execution?",
    context:
      "Execution improves when strategic intent connects to the capabilities, owners and operating logic that make it real.",
    x: "74%",
    y: "68%",
    dx: "10px",
    dy: "-18px",
    duration: "60s",
    delay: "-27s",
    scale: "small",
    tone: "quiet",
  },
  {
    question: "Would the organization still function if critical knowledge disappeared tomorrow?",
    context:
      "An intelligent organization reduces the distance between what people know and what the organization can retain.",
    x: "18%",
    y: "80%",
    dx: "-12px",
    dy: "-14px",
    duration: "66s",
    delay: "-44s",
    scale: "small",
    tone: "quiet",
  },
  {
    question: "Can your organization learn faster than complexity grows?",
    context:
      "The next management capability is the ability to continuously turn organizational reality into shared understanding.",
    x: "58%",
    y: "82%",
    dx: "18px",
    dy: "10px",
    duration: "57s",
    delay: "-12s",
    scale: "medium",
    tone: "cyan",
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

export function OrganizationalRealityCheck() {
  const reveal = useReveal(0.95);

  return (
    <section className={styles.section} id="organizational-reality-check">
      <motion.div className={styles.shell} {...reveal}>
        <div className={styles.intro}>
          <EditorialEyebrow>Thought Space</EditorialEyebrow>
          <h2>Strategic questions move through every intelligent organization.</h2>
          <p>
            They rarely appear one after another. They exist simultaneously, shaping decisions, resilience and the ability to evolve.
          </p>
        </div>

        <div
          aria-label="Strategic organizational thought space"
          className={styles.field}
        >
          <div className={styles.orbit} aria-hidden="true" />
          {thoughtSpaceQuestions.map((thought) => (
            <article
              className={[
                styles.thought,
                styles[thought.scale],
                styles[thought.tone],
              ].join(" ")}
              key={thought.question}
              style={
                {
                  "--thought-delay": thought.delay,
                  "--thought-duration": thought.duration,
                  "--thought-dx": thought.dx,
                  "--thought-dy": thought.dy,
                  "--thought-x": thought.x,
                  "--thought-y": thought.y,
                } as CSSProperties
              }
              tabIndex={0}
            >
              <h3>{thought.question}</h3>
              <p>{thought.context}</p>
            </article>
          ))}
        </div>

        <p className={styles.transition}>
          If these questions are difficult to answer, the challenge is no longer better documentation. It is Organizational Intelligence.
        </p>
      </motion.div>
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
