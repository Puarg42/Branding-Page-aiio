# AIIO Working Rules v1.0

This document defines how ChatGPT, Codex and the user should work together on the aiio branding and website project.

## 1. Collaboration Method

Use this sequence:

1. Analyze.
2. Discuss the intended change.
3. Confirm direction.
4. Produce one clear Codex prompt.
5. Review the result.

Do not jump directly to a Codex prompt when the user expects discussion first.

## 2. Prompt Discipline

Prefer one well-defined sprint over many small prompts.

A good Codex prompt contains:

- branch
- objective
- files or sections in scope
- exact constraints
- what not to change
- commit message
- expected return format

Do not mix unrelated goals in one sprint.

## 3. Scope Control

When working on Platform, do not change Home, Theory, Thinking, Company, navigation or Brand Canon unless explicitly asked.

When working on copy polish, do not redesign.

When working on layout, do not rewrite the theory.

When working on Brand Canon, do not change page narratives unless explicitly asked.

## 4. GitHub Workflow

Repository:

Puarg42/Branding-Page-aiio

Current working branch:

feature/value-narrative-v1

Preferred direct-analysis files for Platform:

- app/platform/page.tsx
- app/website-architecture.tsx
- app/globals.css
- components/brand/BrandIllustration.tsx

Use GitHub file reads for code-based review whenever possible.

## 5. Codex Return Format

Codex should return only:

- commit SHA
- preview URL
- changed files
- build status

## 6. Brand Canon Rules

Brand Canon assets are official.

Do not modify, recolor, crop, regenerate or overwrite Brand Canon assets unless the task is explicitly about creating or revising Brand Canon.

Pages adapt to Brand Canon. Brand Canon does not adapt to pages.

BC102 is an explanatory architectural figure, not a hero image.

BC201-BC204 are official capability assets and should be presented consistently, with equal sizing, object-fit: contain and soft fade/mask behavior where needed.

## 7. Image Generation Rules

No more image generation unless explicitly requested.

When image generation is requested, always use the actual reference image in the current conversation. Do not rely on memory or file names such as BC102 unless the image is available.

No generic AI imagery.
No robots.
No brains.
No neon sci-fi.
No people in Brand Canon illustrations.

## 8. Writing Rules

The organization is the protagonist.

Prefer:

- Your organization understands itself.
- Your organization develops new capabilities.
- Your organization evolves.

Avoid:

- aiio understands your organization.
- aiio optimizes your organization.
- AI makes decisions.

Business Value leads. Theory proves. Product delivers.

Avoid technical language on Home and Platform:

- knowledge graph
- vector database
- embeddings
- RAG

Use those only in technical architecture or deeper theory contexts.

## 9. Platform Rules

The Platform page must explain one Organizational Intelligence System with four complementary capabilities.

It is not a product catalogue.

Capability sequence:

1. Understand Your Organization / ProcessCollector
2. Build Organizational Self-Understanding / ProcessMagnet
3. Forge Organizational Capabilities / ProcessForge
4. Enable Organizational Self-Empowering / DataForge

Business outcome:

Organizational Resilience

The Platform page should feel like an executive story:

Why the system exists -> how it works -> four capabilities -> organizational outcome.

## 10. Review Standards

Evaluate every change against these questions:

- Does a CEO understand why this matters?
- Does an investor see a category, not just software?
- Does the page communicate one system rather than unrelated products?
- Is the theory supporting business value rather than becoming self-referential?
- Does the visual language feel premium, calm and editorial?

## 11. Current Working Priority

Finish Platform page polish before reopening Home, Theory, Company or new Brand Canon work.

Current Platform focus:

- executive copy polish
- visual hierarchy
- rhythm
- conclusion strength
- no new images
- no architecture changes
