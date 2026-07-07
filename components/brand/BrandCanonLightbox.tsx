"use client";

import { useEffect, useMemo, useRef, useState, type TouchEvent, type WheelEvent } from "react";
import {
  brandCanonAssets,
  type BrandIllustrationVariant,
} from "./BrandIllustration";

const brandCanonNavigationVariants: BrandIllustrationVariant[] = [
  "BC-001",
  "BC-002",
  "BC-003",
  "BC-004",
  "BC-005",
  "BC-006",
  "BC201",
  "BC202",
  "BC203",
  "BC204",
];

type BrandCanonOpenEvent = CustomEvent<{
  variant: BrandIllustrationVariant;
}>;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getTouchDistance(touches: TouchEvent<HTMLDivElement>["touches"]) {
  if (touches.length < 2) {
    return 0;
  }

  const first = touches[0];
  const second = touches[1];
  const deltaX = first.clientX - second.clientX;
  const deltaY = first.clientY - second.clientY;

  return Math.hypot(deltaX, deltaY);
}

export function BrandCanonLightbox() {
  const [activeVariant, setActiveVariant] = useState<BrandIllustrationVariant | null>(null);
  const [zoom, setZoom] = useState(1);
  const touchDistanceRef = useRef(0);

  const activeAsset = activeVariant ? brandCanonAssets[activeVariant] : null;
  const canNavigateBrandCanon = activeVariant
    ? brandCanonNavigationVariants.includes(activeVariant)
    : false;

  const activeBrandCanonIndex = useMemo(() => {
    if (!activeVariant) {
      return -1;
    }

    return brandCanonNavigationVariants.indexOf(activeVariant);
  }, [activeVariant]);

  function closeLightbox() {
    setActiveVariant(null);
    setZoom(1);
  }

  function switchBrandCanonAsset(direction: -1 | 1) {
    if (!canNavigateBrandCanon || activeBrandCanonIndex < 0) {
      return;
    }

    const nextIndex =
      (activeBrandCanonIndex + direction + brandCanonNavigationVariants.length) %
      brandCanonNavigationVariants.length;

    setZoom(1);
    setActiveVariant(brandCanonNavigationVariants[nextIndex]);
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();

    const direction = event.deltaY > 0 ? -0.14 : 0.14;
    setZoom((currentZoom) => clamp(currentZoom + direction, 1, 3.2));
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchDistanceRef.current = getTouchDistance(event.touches);
  }

  function handleTouchMove(event: TouchEvent<HTMLDivElement>) {
    const nextDistance = getTouchDistance(event.touches);

    if (!nextDistance || !touchDistanceRef.current) {
      return;
    }

    event.preventDefault();
    const delta = (nextDistance - touchDistanceRef.current) / 260;
    touchDistanceRef.current = nextDistance;
    setZoom((currentZoom) => clamp(currentZoom + delta, 1, 3.2));
  }

  function handleTouchEnd() {
    touchDistanceRef.current = 0;
  }

  useEffect(() => {
    function handleOpen(event: Event) {
      const { variant } = (event as BrandCanonOpenEvent).detail;
      setZoom(1);
      setActiveVariant(variant);
    }

    window.addEventListener("aiio:brand-canon-open", handleOpen);

    return () => {
      window.removeEventListener("aiio:brand-canon-open", handleOpen);
    };
  }, []);

  useEffect(() => {
    if (!activeVariant) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        switchBrandCanonAsset(-1);
      }

      if (event.key === "ArrowRight") {
        switchBrandCanonAsset(1);
      }
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeBrandCanonIndex, activeVariant, canNavigateBrandCanon]);

  if (!activeVariant || !activeAsset) {
    return null;
  }

  return (
    <div
      aria-label="Brand Canon figure viewer"
      aria-modal="true"
      className="brand-canon-lightbox"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeLightbox();
        }
      }}
      role="dialog"
    >
      <button
        aria-label="Close Brand Canon viewer"
        className="brand-canon-lightbox-close"
        onClick={closeLightbox}
        type="button"
      >
        Close
      </button>

      {canNavigateBrandCanon ? (
        <>
          <button
            aria-label="Previous Brand Canon illustration"
            className="brand-canon-lightbox-nav is-prev"
            onClick={() => switchBrandCanonAsset(-1)}
            type="button"
          >
            Prev
          </button>
          <button
            aria-label="Next Brand Canon illustration"
            className="brand-canon-lightbox-nav is-next"
            onClick={() => switchBrandCanonAsset(1)}
            type="button"
          >
            Next
          </button>
        </>
      ) : null}

      <div
        className="brand-canon-lightbox-stage"
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
      >
        <img
          alt={activeAsset.alt}
          className="brand-canon-lightbox-image"
          src={activeAsset.src}
          style={{ transform: `scale(${zoom})` }}
        />
      </div>

      <p className="brand-canon-lightbox-caption">
        {activeVariant} <span>{activeAsset.alt}</span>
      </p>
    </div>
  );
}
