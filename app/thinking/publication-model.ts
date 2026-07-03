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
  version: "Version 0.10",
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
    id: "3-organizations-cannot-understand-themselves",
    title: "Organizations Cannot Understand Themselves",
  },
  organizationalUnderstanding: {
    id: "4-organizational-understanding",
    title: "Organizational Understanding",
  },
  organizationalIntelligence: {
    id: "5-organizational-intelligence",
    title: "Organizational Intelligence",
  },
  organizationalCapabilities: {
    id: "6-organizational-capabilities",
    title: "Organizational Capabilities",
  },
  organizationalResilience: {
    id: "7-organizational-resilience",
    title: "Organizational Resilience",
  },
} satisfies Record<string, TheoryChapterReference>;

export const theoryJournalEntries: TheoryJournalEntry[] = [
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
