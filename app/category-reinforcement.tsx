"use client";

import {
  motion,
  useReducedMotion,
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

const strategicRealityQuestions = [
  {
    question: "Could your organization explain why work is performed the way it is?",
  },
  {
    question: "How dependent is your business on individual experts?",
  },
  {
    question:
      "Could your organization continue operating after losing key organizational knowledge?",
  },
  {
    question: "How resilient is your operating model?",
  },
  {
    question:
      "Can leadership understand the consequences of strategic decisions before they happen?",
  },
  {
    question: "Do you really know how your organization creates value?",
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
    <section className="reality-check-section" id="organizational-reality-check">
      <motion.div className="reality-check-inner" {...reveal}>
        <div className="reality-check-header">
          <EditorialEyebrow>Organizational Reality Check</EditorialEyebrow>
          <h2>Before organizations can evolve, leaders need to see what is actually true.</h2>
          <p>
            The decisive questions are rarely operational. They reveal whether the organization can understand itself when complexity, decisions and responsibility begin to move faster than individual memory.
          </p>
        </div>

        <ol className="reality-question-list" aria-label="Strategic organizational reality questions">
          {strategicRealityQuestions.map((item, index) => (
            <li className="reality-question-item" key={item.question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item.question}</p>
            </li>
          ))}
        </ol>

        <div className="reality-check-transition">
          <p>
            If these questions are difficult to answer, the challenge is no longer better documentation. It is Organizational Intelligence.
          </p>
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
