export const canonicalTheoryIds = {
  organizationalCapabilities: "organizational-capabilities",
  organizationalIntelligence: "organizational-intelligence",
  organizationalResilience: "organizational-resilience",
  organizationalSelfUnderstanding: "organizational-self-understanding",
  organizationalUnderstanding: "organizational-understanding",
} as const;

export const canonicalTheoryLinks = {
  organizationalCapabilities: `/thinking/theory#${canonicalTheoryIds.organizationalCapabilities}`,
  organizationalIntelligence: `/thinking/theory#${canonicalTheoryIds.organizationalIntelligence}`,
  organizationalResilience: `/thinking/theory#${canonicalTheoryIds.organizationalResilience}`,
  organizationalSelfUnderstanding: `/thinking/theory#${canonicalTheoryIds.organizationalSelfUnderstanding}`,
  organizationalUnderstanding: `/thinking/theory#${canonicalTheoryIds.organizationalUnderstanding}`,
} as const;

export const theoryReturnStorageKey = "aiio:theory-return";
export const theoryRestoreStorageKey = "aiio:restore-scroll";

export type TheoryReturnState = {
  hash: string;
  path: string;
  scrollY: number;
  search: string;
  sectionId?: string;
  sourceLabel: string;
  timestamp: number;
};

const canonicalIdsByChapterTitle: Record<string, string> = {
  "Organizational Capabilities": canonicalTheoryIds.organizationalCapabilities,
  "Organizational Intelligence": canonicalTheoryIds.organizationalIntelligence,
  "Organizational Resilience": canonicalTheoryIds.organizationalResilience,
  "Organizational Understanding": canonicalTheoryIds.organizationalUnderstanding,
  "Organizations Cannot Understand Themselves": canonicalTheoryIds.organizationalSelfUnderstanding,
};

export function getCanonicalTheoryChapterId(title: string, fallbackId: string) {
  const titleWithoutNumber = title.replace(/^\d+\.\s*/, "");

  return canonicalIdsByChapterTitle[titleWithoutNumber] ?? fallbackId;
}

export function getCanonicalTheoryLinkForLabel(label: string) {
  const normalized = label.trim().toLowerCase();

  if (normalized === "organizational self-understanding") {
    return canonicalTheoryLinks.organizationalSelfUnderstanding;
  }

  if (normalized === "organizational intelligence") {
    return canonicalTheoryLinks.organizationalIntelligence;
  }

  if (
    normalized === "organizational capabilities" ||
    normalized === "organizational capability"
  ) {
    return canonicalTheoryLinks.organizationalCapabilities;
  }

  if (normalized === "organizational resilience") {
    return canonicalTheoryLinks.organizationalResilience;
  }

  if (normalized === "organizational understanding") {
    return canonicalTheoryLinks.organizationalUnderstanding;
  }

  return "/thinking/theory";
}
