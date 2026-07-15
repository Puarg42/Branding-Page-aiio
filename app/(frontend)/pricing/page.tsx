import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("pricing", "/pricing");

export default function PricingPage() {
  return <ResourcePage slug="pricing" />;
}
