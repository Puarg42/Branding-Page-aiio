"use client";

import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";

const motionEase = [0.2, 0, 0, 1] as const;

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const capabilitySequence = [
  {
    title: "Capture Knowledge",
    copy: "Preserve experience before it disappears.",
  },
  {
    title: "Build Understanding",
    copy: "Connect context across people, systems, processes and decisions.",
  },
  {
    title: "Enable Action",
    copy: "Turn shared context into coordinated decisions and execution.",
  },
  {
    title: "Evolve Organizations",
    copy: "Feed outcomes back into learning so capability improves continuously.",
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
          <h2>From knowledge to organizational capability.</h2>
          <p>
            Capture what the organization knows. Connect the context.
            Coordinate action. Improve the capability.
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
          <p>Better use of knowledge.</p>
          <span aria-hidden="true">&darr;</span>
          <p>Faster decisions.</p>
          <span aria-hidden="true">&darr;</span>
          <p>More resilient organizations.</p>
        </motion.div>
      </div>
    </section>
  );
}
