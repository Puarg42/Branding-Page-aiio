"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { BrandIllustration } from "../components/brand/BrandIllustration";

const motionEase = [0.2, 0, 0, 1] as const;

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const capabilitySequence = [
  "Capture Knowledge",
  "Build Understanding",
  "Enable Action",
  "Evolve Organizations",
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
          className="capability-model-stage"
          initial="hidden"
          transition={transition}
          variants={variants}
          viewport={{ amount: 0.28, once: true }}
          whileInView="visible"
        >
          <BrandIllustration variant="BC-002" />
        </motion.div>

        <motion.div
          className="capability-journey-intro"
          initial="hidden"
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.95, ease: motionEase, delay: 0.08 }
          }
          variants={variants}
          viewport={{ amount: 0.45, once: true }}
          whileInView="visible"
        >
          <p className="capability-section-title">The Capability Journey</p>
          <h2>How organizations become intelligent.</h2>
          <p>Knowledge becomes understanding. Understanding becomes action. Action becomes capability.</p>
        </motion.div>

        <div className="capability-sequence" aria-label="Capability progression">
          {capabilitySequence.map((capability, index) => (
            <div className="capability-sequence-step" key={capability}>
              <span>{capability}</span>
              {index < capabilitySequence.length - 1 ? (
                <em aria-hidden="true">↓</em>
              ) : null}
            </div>
          ))}
        </div>

        <motion.div
          className="capability-stack-stage"
          initial="hidden"
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.95, ease: motionEase, delay: 0.08 }
          }
          variants={variants}
          viewport={{ amount: 0.28, once: true }}
          whileInView="visible"
        >
          <BrandIllustration variant="BC-002" />
        </motion.div>

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
