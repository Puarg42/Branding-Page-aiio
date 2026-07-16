import type { CSSProperties, ReactNode } from "react";
import {
  themeFontCSS,
  themeFontLinks,
  themeStyle,
  type ThemeRecord,
} from "@/lib/cms/theme";

type CSSVariables = CSSProperties & Record<`--${string}`, string | number>;

export function ThemeBoundary({
  children,
  theme,
}: {
  children: ReactNode;
  theme: ThemeRecord | null;
}) {
  const googleLinks = themeFontLinks(theme);
  return (
    <div
      data-theme={theme?.slug ?? "editorial-default"}
      style={themeStyle(theme) as CSSVariables}
    >
      {googleLinks.length ? (
        <>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link
            crossOrigin="anonymous"
            href="https://fonts.gstatic.com"
            rel="preconnect"
          />
        </>
      ) : null}
      {googleLinks.map((href) => (
        <link href={href} key={href} rel="stylesheet" />
      ))}
      {themeFontCSS(theme) ? (
        <style dangerouslySetInnerHTML={{ __html: themeFontCSS(theme) }} />
      ) : null}
      {children}
    </div>
  );
}
