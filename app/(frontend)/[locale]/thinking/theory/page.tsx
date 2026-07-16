import type { Metadata } from "next";
import { assertLocale } from "@/lib/i18n/config";
import TheoryReader from "../../../thinking/theory/page";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const title =
    locale === "de"
      ? "Theorie der Organizational Intelligence | aiio"
      : "Theory of Organizational Intelligence | aiio";
  return {
    title,
    description:
      locale === "de"
        ? "Die digitale Theorie der Organizational Intelligence."
        : "Read the digital theory of Organizational Intelligence.",
    alternates: { canonical: `/${locale}/thinking/theory` },
  };
}

export default TheoryReader;
