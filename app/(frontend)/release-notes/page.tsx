import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("release-notes", "/release-notes");

export default function ReleaseNotesPage() {
  return <ResourcePage slug="release-notes" />;
}
