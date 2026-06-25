import { MainHeader } from "../main-navigation";
import { EditorClient } from "./editor-client";

export const metadata = {
  title: "aiio HTML-Editor",
  description: "Lokaler HTML-Code-Editor für dauerhafte Textänderungen der aiio Branding Seite.",
};

export default function EditorPage() {
  return (
    <main className="editor-page">
      <MainHeader variant="solid" />
      <EditorClient />
    </main>
  );
}
