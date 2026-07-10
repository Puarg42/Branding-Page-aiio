"use client";

import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { EditorialEyebrow } from "../components/brand/EditorialEyebrow";

const motionEase = [0.2, 0, 0, 1] as const;

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const capabilitySequence = [
  {
    meta: "Level 1",
    title: "Build memory",
    copy: "Your organization preserves knowledge, context and decisions as shared Organizational Memory.",
    tone: "graphite",
  },
  {
    meta: "Level 2",
    title: "Understand itself",
    copy: "Organizational Memory becomes continuously interpretable as Organizational Self-Understanding.",
    tone: "cyan",
  },
  {
    meta: "Level 3",
    title: "Create capabilities",
    copy: "Self-understanding becomes intelligence and repeatable behavior people and AI can apply.",
    tone: "purple",
  },
  {
    meta: "Level 4",
    title: "Become resilient",
    copy: "The organization adapts faster because its capabilities improve with feedback and change.",
    tone: "amber",
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
          <h2>From Organizational Memory to resilience.</h2>
          <p>
            This is the customer transformation. aiio helps the organization
            move from preserved memory to self-understanding, stronger
            capabilities and better adaptation.
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
              <p>{capability.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
