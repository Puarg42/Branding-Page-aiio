# Release Candidate RC-01

Purpose

Document the Branding Page V1 release candidate review, validation status and remaining launch considerations.

## Release Scope

RC-01 freezes the current category-launch narrative for the aiio Branding Page V1.

No new concepts were introduced during the release candidate review.

## Current Landing Page Sequence

1. Hero
2. The Problem
3. The Missing Layer
4. Monday Morning
5. The Organization Mirror
6. Built around Organizational Intelligence
7. Category Evolution
8. From Understanding to Capability
9. Demo
10. Footer

## Review Summary

CEO Perspective

The page now makes the business value visible through the loss of knowledge, lack of AI context and the promise of organizational self-understanding.

Investor Perspective

The page positions Organizational Intelligence as a category-level infrastructure shift rather than a product portfolio.

Brand Perspective

The page is more memorable after removing duplicated explanatory sections. Typography and silence carry more of the story.

## Technical Validation

- Lint: Passed
- Vinext production build: Passed
- Next/Vercel production build: Passed
- Local content check: Passed
- Cumulative Layout Shift in local Lighthouse run: 0.002

## Lighthouse Status

A Lighthouse run against the local development server produced non-release performance numbers because it measured the dev environment rather than the Vercel production preview.

Local dev measurement:

- Performance: 71
- Accessibility: 90
- Best Practices: 100
- SEO: 100
- CLS: 0.002
- LCP: 12.4s

This measurement should not be treated as the release score.

## Deployment Status

The branch `feature/category-design-v1` is pushed to GitHub at commit `247a9ae`.

GitHub shows a Vercel Preview deployment record for commit `247a9ae`.

Manual Vercel CLI deployment is currently blocked because the local Vercel token is expired.

## Remaining Issues

- Retrieve and verify the exact Vercel Preview URL once GitHub/Vercel status access is available.
- Run Lighthouse against the Vercel Preview URL, not the local dev server.
- Confirm desktop, tablet and mobile visually in the hosted preview.
- Review accessibility contrast and heading order once the hosted preview is reachable.

## Recommendations Before Launch

- Optimize the hero image path if the hosted Lighthouse LCP remains below target.
- Remove unused CSS for deleted experimental sections in a dedicated cleanup pass after RC-01.
- Keep the story frozen unless a launch-blocking issue is found.
