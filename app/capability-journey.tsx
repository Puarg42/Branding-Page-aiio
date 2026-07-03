"use client";

import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { EditorialEyebrow } from "../components/brand/EditorialEyebrow";
import { TheoryReference } from "../components/brand/TheoryReference";

const motionEase = [0.2, 0, 0, 1] as const;

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const capabilitySequence = [
  {
    meta: "Level 1",
    title: "Organizational Self-Understanding",
    copy: "Your organization continuously interprets its context, decisions, processes and capabilities.",
    tone: "cyan",
  },
  {
    meta: "Level 2",
    title: "Organizational Intelligence",
    copy: "Understanding becomes coherent decisions, shared direction and organizational learning.",
    tone: "purple",
  },
  {
    meta: "Level 3",
    title: "Organizational Capabilities",
    copy: "What your organization learns becomes repeatable execution it can improve.",
    tone: "amber",
  },
  {
    meta: "Outcome",
    title: "Organizational Resilience",
    copy: "Your organization adapts with less rework, stronger execution and more confidence.",
    tone: "violet",
  },
] as const;

export function CapabilityJourney() {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : fadeIn;
  const transition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: motionEase };

  return (
    <section className="capability-journey-section" id="capabilities">
      <div className="capability-journey-inner">
        <motion.div
          className="capability-journey-intro"
          initial="hidden"
          transition={transition}
          variants={variants}
          viewport={{ amount: 0.45, once: true }}
          whileInView="visible"
        >
          <EditorialEyebrow>The Capability Journey</EditorialEyebrow>
          <h2>
            From{" "}
            <TheoryReference>Organizational Self-Understanding</TheoryReference>{" "}
            to <TheoryReference>Organizational Resilience</TheoryReference>
          </h2>
          <p>
            Your organization becomes resilient when understanding turns into
            capability, decisions and coordinated action.
          </p>
        </motion.div>

        <div className="capability-journey-map" aria-label="Capability progression">
          <span className="capability-journey-line" aria-hidden="true" />
          {capabilitySequence.map((capability, index) => (
            <motion.article
              className="capability-step"
              data-tone={capability.tone}
              initial="hidden"
              key={capability.title}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.85, ease: motionEase, delay: index * 0.06 }
              }
              variants={variants}
              viewport={{ amount: 0.32, once: true }}
              whileInView="visible"
            >
              <span className="capability-step-level">{capability.meta}</span>
              <span className="capability-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>
                <TheoryReference>{capability.title}</TheoryReference>
              </h3>
              <p>{capability.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
