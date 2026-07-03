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
    title: "Organizational Intelligence",
    copy: "Your organization continuously interprets itself and turns self-understanding into direction.",
    tone: "cyan",
  },
  {
    meta: "Level 2",
    title: "Organizational Capabilities",
    copy: "Intelligence becomes reusable organizational abilities people and AI can apply.",
    tone: "purple",
  },
  {
    meta: "Level 3",
    title: "Organizational Self-Empowering",
    copy: "Capabilities evolve until the organization increasingly empowers itself to improve.",
    tone: "amber",
  },
  {
    meta: "Business Outcome",
    title: "Organizational Resilience",
    copy: "Self-empowering organizations adapt with less rework, stronger execution and more confidence.",
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
          <EditorialEyebrow>The Journey</EditorialEyebrow>
          <h2>
            From{" "}
            <TheoryReference>Organizational Intelligence</TheoryReference>{" "}
            to <TheoryReference>Organizational Resilience</TheoryReference>
          </h2>
          <p>
            Your organization becomes resilient when intelligence creates
            capabilities and capabilities create self-empowerment.
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
