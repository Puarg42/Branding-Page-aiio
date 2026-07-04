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
    title: "Understand Your Organization",
    result: "Organizational Self-Understanding",
    copy: "Your organization gains one trusted representation of how it works.",
    tone: "graphite",
  },
  {
    meta: "Level 2",
    title: "Build Organizational Self-Understanding",
    result: "Organizational Intelligence",
    copy: "Organizational reality becomes connected, interpreted and usable for better decisions.",
    tone: "cyan",
  },
  {
    meta: "Level 3",
    title: "Forge Organizational Capabilities",
    result: "Organizational Capabilities",
    copy: "Intelligence becomes repeatable organizational behavior people and AI can apply.",
    tone: "purple",
  },
  {
    meta: "Level 4",
    title: "Enable Organizational Self-Empowering",
    result: "Organizational Self-Empowering",
    copy: "Capabilities continuously evolve through operational reality, goals and scenarios.",
    tone: "amber",
  },
  {
    meta: "Business Outcome",
    title: "Organizational Resilience",
    result: "Business Outcome",
    copy: "The organization becomes more adaptive, resilient and prepared for change.",
    tone: "white",
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
          <EditorialEyebrow>The Journey</EditorialEyebrow>
          <h2>
            From understanding your organization to{" "}
            <TheoryReference>Organizational Resilience</TheoryReference>
          </h2>
          <p>
            The journey is the business narrative. Each level creates a new
            organizational result before resilience becomes visible.
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
              <h3>{capability.title}</h3>
              <span className="capability-step-result">
                Result:{" "}
                {capability.result === "Business Outcome" ? (
                  capability.result
                ) : (
                  <TheoryReference>{capability.result}</TheoryReference>
                )}
              </span>
              <p>{capability.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
