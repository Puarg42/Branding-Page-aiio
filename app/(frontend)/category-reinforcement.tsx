"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";

import styles from "./organizational-thought-space.module.css";
import { BrandIllustration } from "@/components/brand/BrandIllustration";
import { EditorialEyebrow } from "@/components/brand/EditorialEyebrow";
import { TheoryReference } from "@/components/brand/TheoryReference";

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
    concept: "Purpose",
    question: "Can the organization connect everyday work to strategic intent?",
    lines: [
      "Purpose becomes operational when it can be seen inside decisions, roles and capabilities.",
      "Organizational Intelligence keeps intent connected to the work that makes it real.",
    ],
    x: "58%",
    y: "22%",
    dx: "-14px",
    dy: "16px",
    duration: "87s",
    delay: "-21s",
    attentionDelay: "-23s",
    depth: "foreground",
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
  { x: "27%", y: "41%", width: "26%", rotate: "-31deg", duration: "36s", delay: "-16s", tone: "violet" },
  { x: "49%", y: "61%", width: "18%", rotate: "32deg", duration: "40s", delay: "-34s", tone: "quiet" },
  { x: "70%", y: "52%", width: "19%", rotate: "-11deg", duration: "37s", delay: "-27s", tone: "cyan" },
  { x: "19%", y: "86%", width: "24%", rotate: "9deg", duration: "42s", delay: "-6s", tone: "violet" },
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
  { x: "23%", y: "18%", size: "3px", duration: "29s", delay: "-9s" },
  { x: "52%", y: "12%", size: "4px", duration: "34s", delay: "-22s" },
  { x: "79%", y: "19%", size: "3px", duration: "31s", delay: "-14s" },
  { x: "94%", y: "47%", size: "4px", duration: "39s", delay: "-30s" },
  { x: "62%", y: "36%", size: "2px", duration: "28s", delay: "-18s" },
  { x: "43%", y: "44%", size: "3px", duration: "33s", delay: "-27s" },
  { x: "8%", y: "56%", size: "4px", duration: "36s", delay: "-12s" },
  { x: "18%", y: "66%", size: "2px", duration: "30s", delay: "-23s" },
  { x: "47%", y: "78%", size: "3px", duration: "35s", delay: "-15s" },
  { x: "67%", y: "86%", size: "4px", duration: "41s", delay: "-35s" },
  { x: "83%", y: "76%", size: "2px", duration: "27s", delay: "-20s" },
  { x: "5%", y: "29%", size: "3px", duration: "37s", delay: "-28s" },
  { x: "31%", y: "7%", size: "2px", duration: "32s", delay: "-16s" },
  { x: "73%", y: "7%", size: "3px", duration: "38s", delay: "-24s" },
  { x: "96%", y: "68%", size: "2px", duration: "31s", delay: "-11s" },
  { x: "55%", y: "96%", size: "3px", duration: "40s", delay: "-34s" },
] as const;

type ThoughtCluster = "foundation" | "intelligence" | "enabler" | "actionCluster" | "outcome";

const primaryThoughtConcepts = [
  "Memory",
  "Purpose",
  "Trust",
  "Resilience",
  "Leadership",
  "Capability",
  "Execution",
  "Learning",
  "Reality",
  "Adaptation",
] as const;

const primaryThoughtSet = new Set<string>(primaryThoughtConcepts);

const thoughtClusterByConcept: Record<string, ThoughtCluster> = {
  Memory: "foundation",
  Knowledge: "foundation",
  Learning: "foundation",
  "Learning Loops": "foundation",
  Experience: "foundation",
  Culture: "foundation",
  Purpose: "intelligence",
  Context: "intelligence",
  Capability: "intelligence",
  Execution: "intelligence",
  Strategy: "intelligence",
  Alignment: "intelligence",
  Decisions: "intelligence",
  Processes: "intelligence",
  Flow: "intelligence",
  Trust: "enabler",
  Resilience: "enabler",
  Reality: "enabler",
  Governance: "enabler",
  Evidence: "enabler",
  Risk: "enabler",
  Continuity: "enabler",
  Signals: "enabler",
  Leadership: "actionCluster",
  Adaptation: "actionCluster",
  Action: "actionCluster",
  Change: "actionCluster",
  Ownership: "actionCluster",
  Responsibility: "actionCluster",
  Roles: "actionCluster",
  Coordination: "actionCluster",
  Value: "outcome",
  Maturity: "outcome",
  Confidence: "outcome",
  Coherence: "outcome",
  Principles: "outcome",
  Architecture: "outcome",
  Time: "outcome",
  Decentralization: "outcome",
  Complexity: "outcome",
  Interpretation: "outcome",
};

const thoughtReaderContent: Record<
  string,
  {
    question: string;
    insights: string[];
    related: string[];
  }
> = {
  Memory: {
    question: "What happens when critical organizational knowledge disappears?",
    insights: [
      "Organizations repeatedly lose experience when knowledge remains attached to individuals instead of becoming organizational capability.",
      "Memory is not information. It is accumulated understanding that enables better decisions, faster adaptation and stronger execution.",
      "Preserving memory turns experience into a sustainable advantage.",
    ],
    related: ["Knowledge", "Experience", "Learning", "Culture"],
  },
  Purpose: {
    question: "Can the organization connect everyday work to strategic intent?",
    insights: [
      "Purpose becomes operational when strategic intent is visible inside roles, decisions and capabilities.",
      "Without this connection, purpose remains communication rather than a force that shapes work.",
      "Organizational Intelligence keeps intent connected to the work that makes it real.",
    ],
    related: ["Strategy", "Alignment", "Goals", "Execution"],
  },
  Trust: {
    question: "Can people trust the organization to remember what matters?",
    insights: [
      "Trust grows when decisions do not depend on hidden context or individual memory.",
      "A trusted organization can explain why work happens, who owns it and what consequences a decision creates.",
      "Shared understanding turns organizational memory into confidence.",
    ],
    related: ["Evidence", "Relationships", "Stakeholders", "Decisions"],
  },
  Resilience: {
    question: "Would the organization still function if critical knowledge disappeared tomorrow?",
    insights: [
      "Resilience depends on whether the organization can continue understanding itself when people, markets and systems change.",
      "The more understanding is preserved structurally, the less fragile the operating model becomes.",
      "A resilient organization adapts without losing coherence.",
    ],
    related: ["Continuity", "Adaptation", "Risk", "Stability"],
  },
  Leadership: {
    question: "Can leadership understand consequences before decisions become reality?",
    insights: [
      "Strategic decisions touch processes, ownership, capabilities and operating logic.",
      "Leadership becomes stronger when these relationships are visible before action is taken.",
      "Understanding turns leadership from directional intent into informed organizational movement.",
    ],
    related: ["Ownership", "Responsibility", "Execution", "Trust"],
  },
  Capability: {
    question: "Can understanding become something the organization can use?",
    insights: [
      "Knowledge has limited value until it becomes applicable in real work.",
      "Capability is the point where understanding turns into coordinated action that people and AI can reuse.",
      "The organization becomes more powerful when capability is no longer dependent on individual memory.",
    ],
    related: ["Processes", "Roles", "Action", "Maturity"],
  },
  Execution: {
    question: "Can strategy be translated into the work that makes it real?",
    insights: [
      "Execution fails when strategic intent cannot reach the operating model.",
      "Organizational Intelligence connects intent to work, responsibility and capability.",
      "The result is not more activity. It is more coherent action.",
    ],
    related: ["Strategy", "Decisions", "Performance", "Quality"],
  },
  Learning: {
    question: "Can your organization learn faster than complexity grows?",
    insights: [
      "Learning becomes organizational when it survives beyond individual experience.",
      "Every insight should return to the organization as reusable context, not disappear as a local lesson.",
      "Continuous learning turns operational experience into future capability.",
    ],
    related: ["Memory", "Reflection", "Skills", "Experience"],
  },
  Reality: {
    question: "Does the organization understand what is actually happening?",
    insights: [
      "Dashboards show fragments. Organizational reality lives in the relationships between those fragments.",
      "Understanding reality means connecting work, responsibility, evidence and context into one coherent picture.",
      "Only then can leadership act on the organization as it truly operates.",
    ],
    related: ["Context", "Feedback", "Signals", "Evidence"],
  },
  Adaptation: {
    question: "Can the organization adapt without losing its own logic?",
    insights: [
      "Change becomes safer when the organization understands what must remain coherent.",
      "Adaptation requires memory, context and capability to move together.",
      "The organization evolves without dissolving into fragmentation.",
    ],
    related: ["Change", "Coordination", "Evolution", "Resilience"],
  },
};

const thoughtSpaceConnections = [
  { from: "Memory", to: "Knowledge", cluster: "foundation", bend: -8 },
  { from: "Memory", to: "Experience", cluster: "foundation", bend: 10 },
  { from: "Memory", to: "Learning", cluster: "foundation", bend: 12 },
  { from: "Memory", to: "Culture", cluster: "foundation", bend: -12 },
  { from: "Learning", to: "Learning Loops", cluster: "foundation", bend: 6 },
  { from: "Purpose", to: "Strategy", cluster: "intelligence", bend: -10 },
  { from: "Purpose", to: "Alignment", cluster: "intelligence", bend: 8 },
  { from: "Purpose", to: "Execution", cluster: "intelligence", bend: 12 },
  { from: "Capability", to: "Processes", cluster: "intelligence", bend: -7 },
  { from: "Capability", to: "Roles", cluster: "intelligence", bend: 8 },
  { from: "Capability", to: "Action", cluster: "intelligence", bend: 10 },
  { from: "Execution", to: "Decisions", cluster: "intelligence", bend: -9 },
  { from: "Execution", to: "Value", cluster: "intelligence", bend: 6 },
  { from: "Context", to: "Reality", cluster: "intelligence", bend: 9 },
  { from: "Context", to: "Interpretation", cluster: "intelligence", bend: -11 },
  { from: "Trust", to: "Evidence", cluster: "enabler", bend: -8 },
  { from: "Trust", to: "Decisions", cluster: "enabler", bend: 8 },
  { from: "Trust", to: "Leadership", cluster: "enabler", bend: -12 },
  { from: "Resilience", to: "Continuity", cluster: "enabler", bend: 8 },
  { from: "Resilience", to: "Risk", cluster: "enabler", bend: -10 },
  { from: "Resilience", to: "Adaptation", cluster: "enabler", bend: 14 },
  { from: "Reality", to: "Signals", cluster: "enabler", bend: 6 },
  { from: "Reality", to: "Evidence", cluster: "enabler", bend: -8 },
  { from: "Leadership", to: "Ownership", cluster: "actionCluster", bend: -7 },
  { from: "Leadership", to: "Responsibility", cluster: "actionCluster", bend: 9 },
  { from: "Leadership", to: "Execution", cluster: "actionCluster", bend: -11 },
  { from: "Adaptation", to: "Change", cluster: "actionCluster", bend: 7 },
  { from: "Adaptation", to: "Coordination", cluster: "actionCluster", bend: -9 },
  { from: "Adaptation", to: "Coherence", cluster: "actionCluster", bend: 11 },
  { from: "Governance", to: "Principles", cluster: "outcome", bend: -6 },
  { from: "Governance", to: "Responsibility", cluster: "outcome", bend: 8 },
  { from: "Value", to: "Maturity", cluster: "outcome", bend: 10 },
  { from: "Confidence", to: "Evidence", cluster: "outcome", bend: -12 },
  { from: "Coherence", to: "Alignment", cluster: "outcome", bend: 7 },
] as const;

const thoughtPositionByConcept = Object.fromEntries(
  thoughtSpaceConcepts.map((thought) => [
    thought.concept,
    { x: Number.parseFloat(thought.x), y: Number.parseFloat(thought.y) },
  ]),
) as Record<string, { x: number; y: number }>;

function getThoughtCluster(concept: string): ThoughtCluster {
  return thoughtClusterByConcept[concept] ?? "foundation";
}

function getThoughtReader(concept: string) {
  const thought = thoughtSpaceConcepts.find((item) => item.concept === concept) ?? thoughtSpaceConcepts[0];
  return (
    thoughtReaderContent[concept] ?? {
      question: thought.question,
      insights: thought.lines,
      related: [],
    }
  );
}

function getConnectionPath(from: string, to: string, bend = 0) {
  const start = thoughtPositionByConcept[from];
  const end = thoughtPositionByConcept[to];

  if (!start || !end) {
    return "";
  }

  const firstX = start.x + (end.x - start.x) * 0.36;
  const secondX = start.x + (end.x - start.x) * 0.64;
  const firstY = start.y + (end.y - start.y) * 0.36 + bend;
  const secondY = start.y + (end.y - start.y) * 0.64 - bend;

  return `M ${start.x} ${start.y} C ${firstX} ${firstY}, ${secondX} ${secondY}, ${end.x} ${end.y}`;
}

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
  const [autoFocusIndex, setAutoFocusIndex] = useState(0);
  const [hoverConcept, setHoverConcept] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [pointer, setPointer] = useState({ active: false, x: 50, y: 50 });

  useEffect(() => {
    if (selectedConcept || hoverConcept) {
      return;
    }

    const interval = window.setInterval(() => {
      setAutoFocusIndex((index) => (index + 1) % primaryThoughtConcepts.length);
    }, 7200);

    return () => window.clearInterval(interval);
  }, [hoverConcept, selectedConcept]);

  const autonomousConcept = primaryThoughtConcepts[autoFocusIndex];
  const activeConcept = hoverConcept ?? selectedConcept ?? autonomousConcept;
  const activeReader = getThoughtReader(activeConcept);
  const activeCluster = getThoughtCluster(activeConcept);
  const relatedConcepts = activeReader.related;

  return (
    <section className={styles.section} id="organizational-reality-check">
      <motion.div className={styles.shell} {...reveal}>
        <div className={styles.marker}>
          <EditorialEyebrow>Thought Space</EditorialEyebrow>
        </div>

        <div
          aria-label="Organizational thought space"
          className={styles.experience}
          style={
            {
              "--reader-accent": `var(--thought-${activeCluster})`,
            } as CSSProperties
          }
        >
          <div
            className={styles.network}
            onPointerLeave={() => {
              setHoverConcept(null);
              setPointer((current) => ({ ...current, active: false }));
            }}
            onPointerMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setPointer({
                active: true,
                x: ((event.clientX - rect.left) / rect.width) * 100,
                y: ((event.clientY - rect.top) / rect.height) * 100,
              });
            }}
            style={
              {
                "--pointer-active": pointer.active ? 1 : 0,
                "--pointer-x": `${pointer.x}%`,
                "--pointer-y": `${pointer.y}%`,
              } as CSSProperties
            }
          >
            <svg
              aria-hidden="true"
              className={styles.connections}
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {thoughtSpaceConnections.map((connection) => {
                const isActive =
                  connection.from === activeConcept || connection.to === activeConcept;
                const isRelated =
                  relatedConcepts.includes(connection.from) || relatedConcepts.includes(connection.to);
                const path = getConnectionPath(connection.from, connection.to, connection.bend);

                if (!path) {
                  return null;
                }

                return (
                  <path
                    className={[
                      styles.connection,
                      styles[connection.cluster],
                      isActive ? styles.activeConnection : "",
                      isRelated ? styles.relatedConnection : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    d={path}
                    key={`${connection.from}-${connection.to}`}
                  />
                );
              })}
            </svg>

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

            {thoughtSpaceConcepts.map((thought) => {
              const isPrimary = primaryThoughtSet.has(thought.concept);
              const isActive = activeConcept === thought.concept;
              const isSelected = selectedConcept === thought.concept;
              const isRelated = relatedConcepts.includes(thought.concept);
              const cluster = getThoughtCluster(thought.concept);
              const nodeClassName = [
                styles.node,
                isPrimary ? styles.primaryNode : styles.secondaryNode,
                styles[cluster],
                isActive ? styles.activeNode : "",
                isSelected ? styles.selectedNode : "",
                isRelated ? styles.relatedNode : "",
              ]
                .filter(Boolean)
                .join(" ");
              const nodeStyle = {
                "--node-attention-delay": thought.attentionDelay,
                "--node-delay": thought.delay,
                "--node-duration": thought.duration,
                "--node-dx": thought.dx,
                "--node-dy": thought.dy,
                "--node-x": thought.x,
                "--node-y": thought.y,
              } as CSSProperties;

              if (isPrimary) {
                return (
                  <button
                    aria-describedby="thought-space-reader"
                    aria-pressed={isSelected}
                    className={nodeClassName}
                    data-concept={thought.concept}
                    key={thought.concept}
                    onBlur={() => setHoverConcept(null)}
                    onClick={() => setSelectedConcept(thought.concept)}
                    onFocus={() => setHoverConcept(thought.concept)}
                    onPointerEnter={() => setHoverConcept(thought.concept)}
                    style={nodeStyle}
                    type="button"
                  >
                    <span className={styles.nodeBody}>
                      <span className={styles.nodeCore} aria-hidden="true" />
                      <span className={styles.nodeLabel}>{thought.concept}</span>
                    </span>
                  </button>
                );
              }

              return (
                <span
                  aria-hidden="true"
                  className={nodeClassName}
                  data-concept={thought.concept}
                  key={thought.concept}
                  style={nodeStyle}
                >
                  <span className={styles.nodeBody}>
                    <span className={styles.nodeCore} />
                    <span className={styles.nodeLabel}>{thought.concept}</span>
                  </span>
                </span>
              );
            })}
          </div>

          <aside
            aria-live="polite"
            className={styles.reader}
            id="thought-space-reader"
          >
            <p className={styles.readerEyebrow}>Focus</p>
            <h3>{activeConcept}</h3>
            <span className={styles.readerLine} aria-hidden="true" />
            <p className={styles.readerQuestion}>{activeReader.question}</p>
            <div className={styles.readerInsights}>
              {activeReader.insights.map((insight) => (
                <p key={insight}>
                  <span aria-hidden="true" />
                  {insight}
                </p>
              ))}
            </div>
            <div className={styles.readerRelated} aria-label={`Related concepts for ${activeConcept}`}>
              {relatedConcepts.map((concept) => (
                <span key={concept}>{concept}</span>
              ))}
            </div>
            <p className={styles.readerHint}>
              {selectedConcept
                ? "Select another concept to redirect attention."
                : "Hover or select a concept to guide the field."}
            </p>
          </aside>
        </div>
      </motion.div>
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
