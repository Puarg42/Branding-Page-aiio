import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("click-demos", "/click-demos");

export default function ClickDemosPage() {
  return <ResourcePage slug="click-demos" />;
}
