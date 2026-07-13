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
      "Organizations repeatedly lose experience whenever knowledge remains attached to individuals.",
      "Memory becomes strategic when it turns into reusable organizational capability.",
    ],
    x: "16%",
    y: "20%",
    dx: "18px",
    dy: "-14px",
    duration: "76s",
    delay: "-10s",
    attentionDelay: "-4s",
    depth: "foreground",
    tone: "violet",
  },
  {
    concept: "Context",
    question: "Can leadership see why work happens the way it does?",
    lines: [
      "Decisions become fragile when context is scattered across systems, documents and memory.",
      "Understanding begins when relationships become visible.",
    ],
    x: "46%",
    y: "17%",
    dx: "-16px",
    dy: "18px",
    duration: "88s",
    delay: "-26s",
    attentionDelay: "-17s",
    depth: "signal",
    tone: "cyan",
  },
  {
    concept: "Trust",
    question: "Can people trust the organization to remember what matters?",
    lines: [
      "Trust grows when decisions do not depend on hidden context.",
      "Shared understanding turns organizational memory into confidence.",
    ],
    x: "73%",
    y: "18%",
    dx: "12px",
    dy: "-16px",
    duration: "96s",
    delay: "-44s",
    attentionDelay: "-29s",
    depth: "signal",
    tone: "quiet",
  },
  {
    concept: "Resilience",
    question: "Would the organization still function if critical knowledge disappeared tomorrow?",
    lines: [
      "Resilience depends on whether the organization can keep understanding itself.",
      "Not only when people remember, but when conditions change.",
    ],
    x: "61%",
    y: "39%",
    dx: "-20px",
    dy: "-12px",
    duration: "82s",
    delay: "-18s",
    attentionDelay: "-41s",
    depth: "foreground",
    tone: "violet",
  },
  {
    concept: "Leadership",
    question: "Can leadership understand consequences before decisions become reality?",
    lines: [
      "Strategic decisions touch processes, owners, capabilities and operating logic.",
      "The organization becomes more governable when consequences can be understood early.",
    ],
    x: "24%",
    y: "45%",
    dx: "18px",
    dy: "12px",
    duration: "90s",
    delay: "-38s",
    attentionDelay: "-53s",
    depth: "signal",
    tone: "cyan",
  },
  {
    concept: "Capability",
    question: "Can understanding become something the organization can use?",
    lines: [
      "Knowledge has limited value until it becomes applicable.",
      "Capability is the point where understanding turns into coordinated action.",
    ],
    x: "42%",
    y: "63%",
    dx: "-18px",
    dy: "-18px",
    duration: "80s",
    delay: "-7s",
    attentionDelay: "-65s",
    depth: "foreground",
    tone: "violet",
  },
  {
    concept: "Execution",
    question: "Can strategy be translated into the work that makes it real?",
    lines: [
      "Execution fails when strategic intent cannot reach the operating model.",
      "Intelligence connects intent to work, ownership and capability.",
    ],
    x: "76%",
    y: "61%",
    dx: "14px",
    dy: "-20px",
    duration: "91s",
    delay: "-31s",
    attentionDelay: "-77s",
    depth: "signal",
    tone: "quiet",
  },
  {
    concept: "Learning",
    question: "Can your organization learn faster than complexity grows?",
    lines: [
      "Learning becomes organizational when it survives beyond individual experience.",
      "The system becomes stronger every time reality is understood again.",
    ],
    x: "23%",
    y: "77%",
    dx: "-14px",
    dy: "-16px",
    duration: "98s",
    delay: "-52s",
    attentionDelay: "-89s",
    depth: "signal",
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
    y: "80%",
    dx: "18px",
    dy: "12px",
    duration: "86s",
    delay: "-16s",
    attentionDelay: "-101s",
    depth: "signal",
    tone: "cyan",
  },
  {
    concept: "Adaptation",
    question: "Can the organization adapt without losing its own logic?",
    lines: [
      "Change becomes safer when the organization understands what must remain coherent.",
      "Adaptation requires memory, context and capability to move together.",
    ],
    x: "82%",
    y: "81%",
    dx: "-16px",
    dy: "14px",
    duration: "84s",
    delay: "-23s",
    attentionDelay: "-112s",
    depth: "signal",
    tone: "cyan",
  },
  {
    concept: "Knowledge",
    question: "Where does knowledge become organizational instead of personal?",
    lines: [
      "Knowledge becomes durable when it is connected to work, responsibility and context.",
      "Until then, it remains vulnerable to absence.",
    ],
    x: "34%",
    y: "29%",
    dx: "-12px",
    dy: "16px",
    duration: "94s",
    delay: "-60s",
    attentionDelay: "-124s",
    depth: "midground",
    tone: "quiet",
  },
  {
    concept: "Governance",
    question: "Can governance see the organization it is trying to steer?",
    lines: [
      "Governance becomes effective when principles connect to operating reality.",
      "Rules need context before they can create confidence.",
    ],
    x: "15%",
    y: "58%",
    dx: "11px",
    dy: "-19px",
    duration: "108s",
    delay: "-73s",
    attentionDelay: "-19s",
    depth: "midground",
    tone: "quiet",
  },
  {
    concept: "Ownership",
    question: "Who carries responsibility when the organization changes?",
    lines: [
      "Accountability weakens when ownership is implicit.",
      "Intelligent organizations preserve responsibility as part of operating reality.",
    ],
    x: "68%",
    y: "29%",
    dx: "13px",
    dy: "-15px",
    duration: "101s",
    delay: "-46s",
    attentionDelay: "-36s",
    depth: "midground",
    tone: "quiet",
  },
  {
    concept: "Alignment",
    question: "Does the organization move as one system or as disconnected intentions?",
    lines: [
      "Alignment is not a communication artifact.",
      "It is the ability to connect strategic intent with operating reality.",
    ],
    x: "52%",
    y: "51%",
    dx: "-11px",
    dy: "-13px",
    duration: "89s",
    delay: "-11s",
    attentionDelay: "-62s",
    depth: "midground",
    tone: "violet",
  },
  {
    concept: "Responsibility",
    question: "Can responsibility survive growth, change and complexity?",
    lines: [
      "Responsibility becomes fragile when roles and decisions drift apart.",
      "Organizational Intelligence keeps accountability connected to context.",
    ],
    x: "83%",
    y: "43%",
    dx: "-12px",
    dy: "16px",
    duration: "111s",
    delay: "-83s",
    attentionDelay: "-93s",
    depth: "midground",
    tone: "quiet",
  },
  {
    concept: "Processes",
    question: "Do processes still explain how value is created?",
    lines: [
      "Processes are not diagrams.",
      "They are memory, coordination and capability made visible.",
    ],
    x: "31%",
    y: "88%",
    dx: "16px",
    dy: "-10px",
    duration: "97s",
    delay: "-34s",
    attentionDelay: "-118s",
    depth: "midground",
    tone: "quiet",
  },
  {
    concept: "Culture",
    question: "What does the organization remember through behavior?",
    lines: [
      "Culture is not only values.",
      "It is the repeated memory of how decisions, responsibility and work actually happen.",
    ],
    x: "11%",
    y: "35%",
    dx: "12px",
    dy: "12px",
    duration: "118s",
    delay: "-96s",
    attentionDelay: "-8s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Dependencies",
    question: "Can leaders see what will be affected before change begins?",
    lines: [
      "Hidden dependencies turn change into risk.",
      "Visible relationships make adaptation more deliberate.",
    ],
    x: "86%",
    y: "24%",
    dx: "-13px",
    dy: "11px",
    duration: "103s",
    delay: "-64s",
    attentionDelay: "-48s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Experience",
    question: "Does experience become part of the organization or disappear with people?",
    lines: [
      "Experience compounds only when it can be retained.",
      "Otherwise every change forces the organization to relearn itself.",
    ],
    x: "39%",
    y: "10%",
    dx: "9px",
    dy: "16px",
    duration: "121s",
    delay: "-88s",
    attentionDelay: "-84s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Decisions",
    question: "Can decisions carry the context that made them necessary?",
    lines: [
      "Decision quality depends on the memory around it.",
      "Without context, every decision becomes harder to trust.",
    ],
    x: "54%",
    y: "30%",
    dx: "-9px",
    dy: "-12px",
    duration: "112s",
    delay: "-102s",
    attentionDelay: "-28s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Change",
    question: "Can change happen without dissolving organizational coherence?",
    lines: [
      "Change without understanding creates fragmentation.",
      "Coherent change depends on visible organizational logic.",
    ],
    x: "71%",
    y: "53%",
    dx: "10px",
    dy: "-12px",
    duration: "109s",
    delay: "-28s",
    attentionDelay: "-58s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Value",
    question: "Do you know how your organization creates value?",
    lines: [
      "Value creation becomes governable when relationships behind the work are visible.",
      "The organization can then improve what it actually understands.",
    ],
    x: "49%",
    y: "72%",
    dx: "-14px",
    dy: "12px",
    duration: "116s",
    delay: "-79s",
    attentionDelay: "-73s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Risk",
    question: "Which risks exist because the organization cannot explain itself?",
    lines: [
      "Risk often begins where context is invisible.",
      "Understanding reduces the unknowns hidden inside operations.",
    ],
    x: "77%",
    y: "74%",
    dx: "9px",
    dy: "14px",
    duration: "126s",
    delay: "-14s",
    attentionDelay: "-102s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Continuity",
    question: "Can organizational capability continue when individual memory changes?",
    lines: [
      "Continuity is not stability.",
      "It is the ability to preserve understanding while people, systems and markets move.",
    ],
    x: "18%",
    y: "89%",
    dx: "13px",
    dy: "-9px",
    duration: "124s",
    delay: "-55s",
    attentionDelay: "-132s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Strategy",
    question: "Can strategy find its way into everyday execution?",
    lines: [
      "Strategy remains abstract until it connects to operating logic.",
      "Organizational Intelligence makes that connection durable.",
    ],
    x: "64%",
    y: "12%",
    dx: "-11px",
    dy: "10px",
    duration: "119s",
    delay: "-39s",
    attentionDelay: "-147s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Evidence",
    question: "Can the organization show why a decision is credible?",
    lines: [
      "Evidence gains value when it connects to organizational reality.",
      "Credibility depends on context, not data volume.",
    ],
    x: "88%",
    y: "56%",
    dx: "-10px",
    dy: "-10px",
    duration: "130s",
    delay: "-111s",
    attentionDelay: "-161s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Coherence",
    question: "Can the organization stay coherent while it evolves?",
    lines: [
      "Growth creates drift when relationships are not understood.",
      "Coherence is the quiet discipline behind resilient evolution.",
    ],
    x: "34%",
    y: "50%",
    dx: "8px",
    dy: "-11px",
    duration: "117s",
    delay: "-66s",
    attentionDelay: "-35s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Flow",
    question: "Where does work slow down because context has to be rebuilt?",
    lines: [
      "Organizations lose speed when every team must rediscover what another already knows.",
      "Flow improves when context travels with the work.",
    ],
    x: "27%",
    y: "66%",
    dx: "-8px",
    dy: "13px",
    duration: "123s",
    delay: "-22s",
    attentionDelay: "-92s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Roles",
    question: "Do roles still reflect how the organization really operates?",
    lines: [
      "Roles drift when responsibility changes faster than structure.",
      "Understanding makes responsibility explicit again.",
    ],
    x: "57%",
    y: "58%",
    dx: "8px",
    dy: "-8px",
    duration: "128s",
    delay: "-118s",
    attentionDelay: "-176s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Signals",
    question: "Which signals reveal that the organization no longer understands itself?",
    lines: [
      "Rework, waiting and ambiguity are often symptoms of missing context.",
      "Intelligence begins by reading these signals as organizational information.",
    ],
    x: "13%",
    y: "70%",
    dx: "12px",
    dy: "8px",
    duration: "132s",
    delay: "-51s",
    attentionDelay: "-116s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Principles",
    question: "Can principles shape work without becoming detached from reality?",
    lines: [
      "Principles need a living connection to processes, ownership and decisions.",
      "Otherwise they remain statements rather than organizational behavior.",
    ],
    x: "45%",
    y: "91%",
    dx: "-10px",
    dy: "-9px",
    duration: "121s",
    delay: "-91s",
    attentionDelay: "-151s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Time",
    question: "How much time is lost rebuilding organizational context?",
    lines: [
      "Time disappears when teams repeatedly explain the organization to itself.",
      "Shared understanding gives that time back to work that matters.",
    ],
    x: "86%",
    y: "90%",
    dx: "-11px",
    dy: "-13px",
    duration: "134s",
    delay: "-82s",
    attentionDelay: "-188s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Decentralization",
    question: "Can distributed teams act without losing shared understanding?",
    lines: [
      "Decentralization increases speed only when context remains coherent.",
      "Otherwise autonomy becomes fragmentation.",
    ],
    x: "9%",
    y: "84%",
    dx: "9px",
    dy: "-10px",
    duration: "138s",
    delay: "-130s",
    attentionDelay: "-201s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Complexity",
    question: "Can the organization understand complexity without simplifying it away?",
    lines: [
      "Complexity is not the enemy.",
      "Unseen complexity is.",
    ],
    x: "91%",
    y: "34%",
    dx: "-8px",
    dy: "12px",
    duration: "127s",
    delay: "-103s",
    attentionDelay: "-213s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Interpretation",
    question: "Can the organization interpret its own reality consistently?",
    lines: [
      "Different teams often see different organizations.",
      "Shared interpretation turns local experience into organizational understanding.",
    ],
    x: "39%",
    y: "40%",
    dx: "7px",
    dy: "9px",
    duration: "136s",
    delay: "-76s",
    attentionDelay: "-225s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Action",
    question: "Can understanding move into action without losing meaning?",
    lines: [
      "Action becomes more reliable when the reason behind it remains visible.",
      "Organizational Intelligence keeps meaning attached to execution.",
    ],
    x: "64%",
    y: "70%",
    dx: "-9px",
    dy: "11px",
    duration: "129s",
    delay: "-37s",
    attentionDelay: "-237s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Learning Loops",
    question: "Does improvement return to the organization as reusable understanding?",
    lines: [
      "Organizations mature when lessons do not remain isolated.",
      "Learning loops turn experience into future capability.",
    ],
    x: "30%",
    y: "14%",
    dx: "8px",
    dy: "12px",
    duration: "140s",
    delay: "-124s",
    attentionDelay: "-249s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Confidence",
    question: "Can leaders act with confidence when reality is changing?",
    lines: [
      "Confidence does not come from certainty.",
      "It comes from a living understanding of what is connected.",
    ],
    x: "52%",
    y: "88%",
    dx: "-12px",
    dy: "-7px",
    duration: "133s",
    delay: "-16s",
    attentionDelay: "-261s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Architecture",
    question: "Does the organization have a place where understanding can live?",
    lines: [
      "Intelligence needs architecture.",
      "Otherwise understanding remains temporary, local and fragile.",
    ],
    x: "75%",
    y: "10%",
    dx: "-8px",
    dy: "8px",
    duration: "145s",
    delay: "-70s",
    attentionDelay: "-273s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Maturity",
    question: "How does an organization know that it is becoming more capable?",
    lines: [
      "Maturity shows up when understanding becomes repeatable.",
      "The organization acts with less dependency and more resilience.",
    ],
    x: "7%",
    y: "48%",
    dx: "10px",
    dy: "-8px",
    duration: "142s",
    delay: "-29s",
    attentionDelay: "-285s",
    depth: "background",
    tone: "quiet",
  },
  {
    concept: "Coordination",
    question: "Can coordination happen without constant explanation?",
    lines: [
      "Coordination improves when teams share the same organizational memory.",
      "Less explanation becomes more capacity for meaningful work.",
    ],
    x: "92%",
    y: "72%",
    dx: "-9px",
    dy: "-9px",
    duration: "137s",
    delay: "-113s",
    attentionDelay: "-297s",
    depth: "background",
    tone: "quiet",
  },
] as const;

const thoughtSpaceTraces = [
  { x: "16%", y: "25%", width: "22%", rotate: "-8deg", duration: "34s", delay: "-4s", tone: "violet" },
  { x: "43%", y: "23%", width: "28%", rotate: "12deg", duration: "41s", delay: "-18s", tone: "cyan" },
  { x: "55%", y: "45%", width: "24%", rotate: "-19deg", duration: "38s", delay: "-31s", tone: "violet" },
  { x: "22%", y: "55%", width: "20%", rotate: "23deg", duration: "46s", delay: "-12s", tone: "quiet" },
  { x: "36%", y: "71%", width: "31%", rotate: "-6deg", duration: "43s", delay: "-25s", tone: "cyan" },
  { x: "64%", y: "74%", width: "21%", rotate: "18deg", duration: "39s", delay: "-8s", tone: "violet" },
  { x: "10%", y: "78%", width: "18%", rotate: "-24deg", duration: "48s", delay: "-39s", tone: "quiet" },
  { x: "72%", y: "31%", width: "16%", rotate: "28deg", duration: "44s", delay: "-21s", tone: "cyan" },
] as const;

const thoughtSpaceFragments = [
  { x: "18%", y: "32%", size: "4px", duration: "26s", delay: "-5s" },
  { x: "41%", y: "21%", size: "3px", duration: "32s", delay: "-13s" },
  { x: "69%", y: "16%", size: "5px", duration: "29s", delay: "-21s" },
  { x: "86%", y: "38%", size: "3px", duration: "36s", delay: "-8s" },
  { x: "57%", y: "48%", size: "4px", duration: "31s", delay: "-25s" },
  { x: "27%", y: "61%", size: "3px", duration: "35s", delay: "-17s" },
  { x: "72%", y: "69%", size: "4px", duration: "30s", delay: "-11s" },
  { x: "35%", y: "83%", size: "5px", duration: "38s", delay: "-29s" },
  { x: "11%", y: "74%", size: "3px", duration: "33s", delay: "-19s" },
  { x: "90%", y: "83%", size: "4px", duration: "37s", delay: "-32s" },
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
          <div className={styles.traces} aria-hidden="true">
            {thoughtSpaceTraces.map((trace, index) => (
              <span
                className={[styles.trace, styles[trace.tone]].join(" ")}
                key={`${trace.x}-${trace.y}-${index}`}
                style={
                  {
                    "--trace-delay": trace.delay,
                    "--trace-duration": trace.duration,
                    "--trace-rotate": trace.rotate,
                    "--trace-width": trace.width,
                    "--trace-x": trace.x,
                    "--trace-y": trace.y,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <div className={styles.fragments} aria-hidden="true">
            {thoughtSpaceFragments.map((fragment, index) => (
              <span
                key={`${fragment.x}-${fragment.y}-${index}`}
                style={
                  {
                    "--fragment-delay": fragment.delay,
                    "--fragment-duration": fragment.duration,
                    "--fragment-size": fragment.size,
                    "--fragment-x": fragment.x,
                    "--fragment-y": fragment.y,
                  } as CSSProperties
                }
              />
            ))}
          </div>
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
                  "--thought-attention-delay": thought.attentionDelay,
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
