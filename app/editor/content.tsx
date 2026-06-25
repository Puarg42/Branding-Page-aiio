import contentStore from "./content-store.json";
import { editableContentVersion } from "./content-version";

export const editableContent = contentStore as Record<string, string>;
export const contentVersion = editableContentVersion;

export function getEditableContent(id: string, fallback: string) {
  return editableContent[id] ?? fallback;
}

export function RichText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
