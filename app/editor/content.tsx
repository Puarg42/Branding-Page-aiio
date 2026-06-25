export const editableContent: Record<string, string> = {};
export const contentVersion = "source-files";

export function getEditableContent(id: string, fallback: string) {
  void id;
  return fallback;
}

export function RichText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
