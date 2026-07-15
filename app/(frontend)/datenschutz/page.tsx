import { LegalPage } from "../legal-page";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("datenschutz", "/datenschutz");

export default function DatenschutzPage() {
  return <LegalPage slug="datenschutz" />;
}
