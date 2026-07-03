"use client";

import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { EditorialProgression } from "../components/brand/EditorialProgression";

const motionEase = [0.2, 0, 0, 1] as const;

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const capabilitySequence = [
  {
    title: "Self-Understanding",
    copy: "Your organization continuously interprets its context, decisions, processes and capabilities.",
  },
  {
    title: "New Capabilities",
    copy: "What your organization learns becomes a capability it can use again.",
  },
  {
    title: "Better Decisions",
    copy: "People and AI work from shared context instead of rebuilding it.",
  },
  {
    title: "Coordinated Action",
    copy: "Teams move with clearer priorities, less rework and stronger execution.",
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
          <p className="capability-section-title">The Capability Journey</p>
          <h2>From Organizational Self-Understanding to Organizational Resilience</h2>
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
              <span className="capability-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="capability-closing"
          initial="hidden"
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.95, ease: motionEase }
          }
          variants={variants}
          viewport={{ amount: 0.42, once: true }}
          whileInView="visible"
        >
          <EditorialProgression
            ariaLabel="Capability outcome progression"
            items={[
              { label: "Organizational Self-Understanding", tone: "cyan" },
              { label: "New Organizational Capabilities", tone: "purple" },
              { label: "Better Decisions", tone: "purple" },
              { label: "Coordinated Action", tone: "purple" },
              { label: "Organizational Resilience", tone: "amber" },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
}
