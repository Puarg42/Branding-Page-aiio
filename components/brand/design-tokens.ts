export const aiioDesignTokens = {
  border: {
    subtle: "rgb(255 255 255 / 10%)",
    strong: "rgb(255 255 255 / 18%)",
  },
  breakpoint: {
    desktop: "1180px",
    mobile: "720px",
    tablet: "960px",
  },
  color: {
    background: "#050508",
    body: "rgb(232 229 238 / 76%)",
    caption: "rgb(232 229 238 / 56%)",
    eyebrow: "#a884ff",
    heading: "#ffffff",
    level: {
      collector: "#b9bcc4",
      dataforge: "#ffb24a",
      forge: "#9b6cff",
      magnet: "#22d3ee",
    },
    violet: "#5a328a",
  },
  duration: {
    fast: "180ms",
    medium: "280ms",
    slow: "520ms",
  },
  easing: {
    standard: "cubic-bezier(.2, .8, .2, 1)",
  },
  radius: {
    card: "18px",
    panel: "28px",
    soft: "12px",
  },
  shadow: {
    soft: "0 24px 80px rgb(0 0 0 / 28%)",
  },
  spacing: {
    card: "clamp(22px, 3vw, 34px)",
    section: "clamp(92px, 12vw, 168px)",
    shell: "min(1180px, calc(100% - 40px))",
  },
  typography: {
    body: "clamp(1rem, 1.2vw, 1.1rem)",
    bodyLarge: "clamp(1.1rem, 1.55vw, 1.35rem)",
    caption: ".78rem",
    display: "clamp(3rem, 8vw, 7.6rem)",
    eyebrow: ".75rem",
    hero: "clamp(4rem, 9vw, 9rem)",
    sectionTitle: "clamp(2.35rem, 5vw, 5.6rem)",
  },
} as const;
