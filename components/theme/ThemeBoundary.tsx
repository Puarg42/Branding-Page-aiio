import type { CSSProperties, ReactNode } from "react";
import {
  themeFontCSS,
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
  return (
    <div
      data-theme={theme?.slug ?? "editorial-default"}
      style={themeStyle(theme) as CSSVariables}
    >
      {themeFontCSS(theme) ? (
        <style dangerouslySetInnerHTML={{ __html: themeFontCSS(theme) }} />
      ) : null}
      {children}
    </div>
  );
}
