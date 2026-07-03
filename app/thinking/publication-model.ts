import { canonicalTheoryIds } from "../../components/brand/theory-links";

export type TheoryChapterReference = {
  id: string;
  title: string;
};

export type TheoryJournalEntry = {
  affectedChapters: TheoryChapterReference[];
  coreThesis: string;
  date: string;
  version: string;
  whyItMatters: string;
};

export const theoryPublication = {
  edition: "Living Publication",
  lastUpdated: "July 3, 2026",
  readingTime: "Approx. 40 min reading",
  title: "Theory",
  version: "Version 0.11",
} as const;

export const theoryEditorialRules = [
  "Every Theory revision updates Thinking.",
  "Thinking always references affected Theory chapters.",
  "Theory always represents the current consolidated state.",
  "Thinking documents the evolution.",
] as const;

export const theoryChapterReferences = {
  prologue: {
    id: "prologue",
    title: "Prologue",
  },
  observation: {
    id: "1-observation",
    title: "Observation",
  },
  missingLayer: {
    id: "2-the-missing-layer",
    title: "The Missing Layer",
  },
  organizationalSelfUnderstanding: {
    id: canonicalTheoryIds.organizationalSelfUnderstanding,
    title: "Organizations Cannot Understand Themselves",
  },
  organizationalUnderstanding: {
    id: canonicalTheoryIds.organizationalUnderstanding,
    title: "Organizational Understanding",
  },
  organizationalIntelligence: {
    id: canonicalTheoryIds.organizationalIntelligence,
    title: "Organizational Intelligence",
  },
  organizationalCapabilities: {
    id: canonicalTheoryIds.organizationalCapabilities,
    title: "Organizational Capabilities",
  },
  organizationalResilience: {
    id: canonicalTheoryIds.organizationalResilience,
    title: "Organizational Resilience",
  },
} satisfies Record<string, TheoryChapterReference>;

export const theoryJournalEntries: TheoryJournalEntry[] = [
  {
    affectedChapters: [
      theoryChapterReferences.organizationalSelfUnderstanding,
      theoryChapterReferences.organizationalIntelligence,
      theoryChapterReferences.organizationalCapabilities,
      theoryChapterReferences.organizationalResilience,
    ],
    coreThesis:
      "Theory becomes the canonical knowledge reference for the aiio website.",
    date: "July 3, 2026",
    version: "0.11",
    whyItMatters:
      "This revision introduces canonical chapter anchors, context-aware return navigation, alignment with Platform terminology, an updated capability hierarchy and the deep-link architecture that connects website concepts to their consolidated Theory chapters.",
  },
  {
    affectedChapters: [
      theoryChapterReferences.prologue,
      theoryChapterReferences.observation,
      theoryChapterReferences.missingLayer,
      theoryChapterReferences.organizationalSelfUnderstanding,
      theoryChapterReferences.organizationalUnderstanding,
      theoryChapterReferences.organizationalIntelligence,
      theoryChapterReferences.organizationalCapabilities,
      theoryChapterReferences.organizationalResilience,
    ],
    coreThesis:
      "Organizational Self-Understanding as the Missing Management Capability",
    date: "July 3, 2026",
    version: "0.10",
    whyItMatters:
      "This revision formalizes Organizational Self-Understanding as a management capability, introduces the Capability Model, clarifies the Capability -> Outcome -> Business Value distinction, separates Knowledge from Understanding and positions Organizational Resilience as the business outcome of continuously developed organizational capabilities.",
  },
];
