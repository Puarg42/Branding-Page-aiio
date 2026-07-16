"use client";

import { toast } from "@payloadcms/ui";
import styles from "./ReloadPreviewButton.module.css";

function previewFrame(): HTMLIFrameElement | null {
  const frames = Array.from(document.querySelectorAll<HTMLIFrameElement>("iframe"));
  return (
    frames.find((frame) => {
      try {
        const path = new URL(frame.src, window.location.origin).pathname;
        return /^\/(en|de)(\/|$)/.test(path);
      } catch {
        return false;
      }
    }) ?? null
  );
}

export function ReloadPreviewButton() {
  function reload() {
    const frame = previewFrame();
    if (!frame) {
      toast.error("Open Live Preview first");
      return;
    }
    // Reassigning src works even when browser cross-origin safeguards prevent
    // direct access to contentWindow.location.
    const current = frame.src;
    frame.src = "about:blank";
    requestAnimationFrame(() => {
      frame.src = current;
    });
    toast.success("Preview reloaded");
  }

  return (
    <button className={styles.button} onClick={reload} type="button">
      Reload preview
    </button>
  );
}
