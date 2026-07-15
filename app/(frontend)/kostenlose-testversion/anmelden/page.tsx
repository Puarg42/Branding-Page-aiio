import { ResourcePage } from "../../resource-pages";
import { resourceRouteMetadata } from "../../seo";

export const metadata = resourceRouteMetadata("testen", "/kostenlose-testversion/anmelden");

export default function TrialSignupPage() {
  return <ResourcePage slug="testen" />;
}
