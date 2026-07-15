import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("partner-finden", "/partner-finden");

export default function PartnerFinderPage() {
  return <ResourcePage slug="partner-finden" />;
}
