import { LegalPage } from "../legal-page";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("impressum", "/impressum");

export default function ImpressumPage() {
  return <LegalPage slug="impressum" />;
}
