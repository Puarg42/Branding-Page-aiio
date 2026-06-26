"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";

const capabilities = [
  {
    badge: null,
    label: "Powered by ProcessCollector",
    support: "Capture organizational reality before valuable knowledge disappears.",
    title: "Capture Organizational Knowledge",
  },
  {
    badge: null,
    label: "Powered by ProcessMagnet",
    support:
      "Transform fragmented knowledge into one shared organizational understanding.",
    title: "Create Organizational Understanding",
  },
  {
    badge: null,
    label: "Powered by ProcessForge",
    support:
      "Continuously transform organizational understanding into new organizational capabilities.",
    title: "Develop Organizational Capabilities",
  },
  {
    badge: "Coming Soon",
    label: "Powered by DataForge",
    support: (
      <>
        Learn from the past.
        <br />
        Prepare for the future.
      </>
    ),
    title: "Continuously Evolve",
  },
] as const;

const motionEase = [0.2, 0, 0, 1] as const;

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

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
          <p className="capability-section-title">From Understanding to Capability</p>
          <h2>Organizational Intelligence creates organizational capabilities.</h2>
          <p>
            Organizational understanding only becomes valuable when it continuously
            creates new capabilities.
          </p>
        </motion.div>

        <div className="capability-journey-map" aria-label="Capability journey">
          <div className="capability-journey-line" aria-hidden="true" />
          {capabilities.map((capability, index) => (
            <motion.article
              className="capability-step"
              initial="hidden"
              key={capability.title}
              transition={{
                delay: index * 0.08,
                duration: shouldReduceMotion ? 0 : 0.88,
                ease: motionEase,
              }}
              variants={variants}
              viewport={{ amount: 0.38, once: true }}
              whileInView="visible"
            >
              <span className="capability-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{capability.title}</h3>
              <p>{capability.support}</p>
              <div className="capability-step-footer">
                <span>{capability.label}</span>
                {capability.badge ? <strong>{capability.badge}</strong> : null}
              </div>
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
          <p>Understanding creates Intelligence.</p>
          <span aria-hidden="true">↓</span>
          <p>Intelligence creates Capability.</p>
          <span aria-hidden="true">↓</span>
          <p>Capability creates Resilience.</p>
        </motion.div>
      </div>
    </section>
  );
}
