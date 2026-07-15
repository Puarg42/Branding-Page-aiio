"use client";

import { useEffect, useState } from "react";

type TimelineMediaVariant = "glass" | "motion" | "people";

type TimelineMediaProps = {
  image?: string;
  poster?: string;
  title: string;
  variant?: TimelineMediaVariant;
  videoMp4?: string;
  videoWebm?: string;
};

function TimelineMediaFrame({
  expanded = false,
  image,
  poster,
  variant,
  videoMp4,
  videoWebm,
}: Omit<TimelineMediaProps, "title"> & { expanded?: boolean }) {
  const classNames = ["timeline-image"];

  if (expanded) {
    classNames.push("timeline-image-expanded");
  }

  if (videoMp4) {
    classNames.push("timeline-video");

    return (
      <div aria-hidden="true" className={classNames.join(" ")}>
        <video autoPlay loop muted playsInline poster={poster} preload="metadata">
          {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
          <source src={videoMp4} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (variant === "glass" && image) {
    classNames.push("timeline-glass-motion");

    return (
      <div aria-hidden="true" className={classNames.join(" ")}>
        <span className="glass-image-base" style={{ backgroundImage: `url(${image})` }} />
        <span className="glass-pane glass-pane-top" style={{ backgroundImage: `url(${image})` }} />
        <span
          className="glass-pane glass-pane-middle"
          style={{ backgroundImage: `url(${image})` }}
        />
        <span
          className="glass-pane glass-pane-bottom"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
    );
  }

  if (variant === "people" && image) {
    classNames.push("timeline-people-motion");

    return (
      <div aria-hidden="true" className={classNames.join(" ")}>
        <span className="people-image-base" style={{ backgroundImage: `url(${image})` }} />
        <span className="person-layer person-layer-left" style={{ backgroundImage: `url(${image})` }} />
        <span
          className="person-layer person-layer-mid-left"
          style={{ backgroundImage: `url(${image})` }}
        />
        <span
          className="person-layer person-layer-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <span
          className="person-layer person-layer-mid-right"
          style={{ backgroundImage: `url(${image})` }}
        />
        <span
          className="person-layer person-layer-right"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
    );
  }

  if (variant === "motion" && image) {
    classNames.push("timeline-image-motion");

    return (
      <div aria-hidden="true" className={classNames.join(" ")}>
        <span style={{ backgroundImage: `url(${image})` }} />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={classNames.join(" ")}
      style={{ backgroundImage: image ? `url(${image})` : undefined }}
    />
  );
}

export function TimelineMedia(props: TimelineMediaProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  return (
    <div className="timeline-media-shell">
      <button
        aria-label={`${props.title} vergrößern`}
        className="timeline-media-trigger"
        onClick={() => setIsExpanded(true)}
        type="button"
      >
        <TimelineMediaFrame {...props} />
      </button>

      {isExpanded ? (
        <div
          className="timeline-media-lightbox"
          onClick={() => setIsExpanded(false)}
          role="presentation"
        >
          <div
            aria-label={props.title}
            aria-modal="true"
            className="timeline-media-lightbox-frame"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <TimelineMediaFrame {...props} expanded />
          </div>
        </div>
      ) : null}
    </div>
  );
}
