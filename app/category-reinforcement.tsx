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

const thoughtSpaceConcepts = [
  {
    concept: "Memory",
    question: "What happens when critical organizational knowledge disappears?",
    lines: [
      "Organizations repeatedly lose experience when knowledge remains attached to individuals.",
      "Memory becomes strategic when it turns into reusable organizational capability.",
    ],
    x: "12%",
    y: "17%",
    dx: "18px",
    dy: "-14px",
    duration: "72s",
    delay: "-10s",
    depth: "near",
    tone: "violet",
  },
  {
    concept: "Context",
    question: "Can leadership see why work happens the way it does?",
    lines: [
      "Decisions become fragile when context is scattered across systems, documents and memory.",
      "Understanding begins when relationships become visible.",
    ],
    x: "48%",
    y: "13%",
    dx: "-16px",
    dy: "18px",
    duration: "84s",
    delay: "-26s",
    depth: "mid",
    tone: "cyan",
  },
  {
    concept: "Ownership",
    question: "Who carries responsibility when the organization changes?",
    lines: [
      "Accountability weakens when ownership is implicit.",
      "Intelligent organizations preserve responsibility as part of their operating reality.",
    ],
    x: "76%",
    y: "22%",
    dx: "12px",
    dy: "-16px",
    duration: "92s",
    delay: "-44s",
    depth: "far",
    tone: "quiet",
  },
  {
    concept: "Resilience",
    question: "Would the organization still function if critical knowledge disappeared tomorrow?",
    lines: [
      "Resilience depends on whether the organization can keep understanding itself.",
      "Not only when people remember, but when conditions change.",
    ],
    x: "62%",
    y: "39%",
    dx: "-20px",
    dy: "-12px",
    duration: "78s",
    delay: "-18s",
    depth: "near",
    tone: "violet",
  },
  {
    concept: "Leadership",
    question: "Can leadership understand consequences before decisions become reality?",
    lines: [
      "Strategic decisions touch processes, owners, capabilities and operating logic.",
      "The organization becomes more governable when these consequences can be understood early.",
    ],
    x: "19%",
    y: "47%",
    dx: "18px",
    dy: "12px",
    duration: "88s",
    delay: "-38s",
    depth: "mid",
    tone: "cyan",
  },
  {
    concept: "Capability",
    question: "Can understanding become something the organization can use?",
    lines: [
      "Knowledge has limited value until it becomes applicable.",
      "Capability is the point where understanding turns into coordinated action.",
    ],
    x: "43%",
    y: "62%",
    dx: "-18px",
    dy: "-18px",
    duration: "76s",
    delay: "-7s",
    depth: "near",
    tone: "violet",
  },
  {
    concept: "Execution",
    question: "Can strategy be translated into the work that makes it real?",
    lines: [
      "Execution fails when strategic intent cannot reach the operating model.",
      "Intelligence connects intent to work, ownership and capability.",
    ],
    x: "79%",
    y: "64%",
    dx: "14px",
    dy: "-20px",
    duration: "86s",
    delay: "-31s",
    depth: "far",
    tone: "quiet",
  },
  {
    concept: "Learning",
    question: "Can your organization learn faster than complexity grows?",
    lines: [
      "Learning becomes organizational when it survives beyond individual experience.",
      "The system becomes stronger every time reality is understood again.",
    ],
    x: "24%",
    y: "79%",
    dx: "-14px",
    dy: "-16px",
    duration: "94s",
    delay: "-52s",
    depth: "far",
    tone: "quiet",
  },
  {
    concept: "Reality",
    question: "Does the organization understand what is actually happening?",
    lines: [
      "Dashboards show fragments.",
      "Organizational Intelligence connects fragments into a living sense of reality.",
    ],
    x: "58%",
    y: "84%",
    dx: "18px",
    dy: "12px",
    duration: "82s",
    delay: "-16s",
    depth: "mid",
    tone: "cyan",
  },
  {
    concept: "Trust",
    question: "Can people trust the organization to remember what matters?",
    lines: [
      "Trust grows when decisions do not depend on hidden context.",
      "Shared understanding turns organizational memory into confidence.",
    ],
    x: "35%",
    y: "28%",
    dx: "-12px",
    dy: "16px",
    duration: "90s",
    delay: "-60s",
    depth: "far",
    tone: "quiet",
  },
  {
    concept: "Adaptation",
    question: "Can the organization adapt without losing its own logic?",
    lines: [
      "Change becomes safer when the organization understands what must remain coherent.",
      "Adaptation requires memory, context and capability to move together.",
    ],
    x: "70%",
    y: "82%",
    dx: "-16px",
    dy: "14px",
    duration: "80s",
    delay: "-23s",
    depth: "mid",
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
        <div className={styles.marker}>
          <EditorialEyebrow>Thought Space</EditorialEyebrow>
        </div>

        <div
          aria-label="Organizational thought space"
          className={styles.field}
        >
          <div className={styles.orbit} aria-hidden="true" />
          {thoughtSpaceConcepts.map((thought) => (
            <article
              className={[
                styles.thought,
                styles[thought.depth],
                styles[thought.tone],
              ].join(" ")}
              key={thought.concept}
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
              <h3>{thought.concept}</h3>
              <div className={styles.unfold}>
                <p className={styles.question}>{thought.question}</p>
                <div className={styles.context}>
                  {thought.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
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
