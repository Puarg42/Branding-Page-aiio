"use client";

import { useEffect, useMemo, useState } from "react";
import { editableGroups, type EditableBlock } from "./editor-data";

type Drafts = Record<string, string>;

const STORAGE_KEY = "aiio-html-editor-drafts-v1";

function flattenBlocks() {
  return editableGroups.flatMap((group) =>
    group.blocks.map((block) => ({
      ...block,
      groupTitle: group.title,
    })),
  );
}

function normalizeValue(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function buildChangePackage(changes: Array<EditableBlock & { nextValue: string }>) {
  if (changes.length === 0) {
    return "Keine Änderungen erfasst.";
  }

  return [
    "Bitte übernimm folgende Textänderungen in die aiio Branding Seite:",
    "",
    ...changes.flatMap((change, index) => [
      `${index + 1}. ${change.label}`,
      `Quelle: ${change.source}`,
      `Feld: ${change.id}`,
      `Format: ${change.field === "html" ? "HTML" : "Text"}`,
      "Neuer Inhalt:",
      change.nextValue,
      "",
    ]),
  ].join("\n");
}

export function EditorClient() {
  const blocks = useMemo(() => flattenBlocks(), []);
  const [selectedId, setSelectedId] = useState(blocks[0]?.id ?? "");
  const [drafts, setDrafts] = useState<Drafts>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {};
    }

    try {
      return JSON.parse(saved) as Drafts;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return {};
    }
  });
  const [status, setStatus] = useState("");

  const selectedBlock = blocks.find((block) => block.id === selectedId) ?? blocks[0];
  const currentValue = drafts[selectedBlock.id] ?? selectedBlock.value;
  const changedBlocks = blocks
    .filter(
      (block) =>
        Object.hasOwn(drafts, block.id) &&
        normalizeValue(drafts[block.id]) !== normalizeValue(block.value),
    )
    .map((block) => ({
      ...block,
      nextValue: drafts[block.id],
    }));

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  }, [drafts]);

  function updateValue(value: string) {
    setDrafts((current) => ({
      ...current,
      [selectedBlock.id]: value,
    }));
  }

  function resetSelected() {
    setDrafts((current) => {
      const next = { ...current };
      delete next[selectedBlock.id];
      return next;
    });
    setStatus("Der aktuelle Textblock wurde zurückgesetzt.");
  }

  function resetAll() {
    setDrafts({});
    setStatus("Alle Entwürfe wurden gelöscht.");
  }

  async function copyPackage() {
    const text = buildChangePackage(changedBlocks);

    await navigator.clipboard.writeText(text);
    setStatus("Änderungspaket wurde in die Zwischenablage kopiert.");
  }

  async function saveDirectly() {
    if (changedBlocks.length === 0) {
      return;
    }

    const changes = Object.fromEntries(
      changedBlocks.map((change) => [change.id, change.nextValue]),
    );

    try {
      const response = await fetch("http://localhost:4179/save", {
        body: JSON.stringify({ changes }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = (await response.json()) as { error?: string; saved?: string[] };

      if (!response.ok) {
        throw new Error(result.error ?? "Speichern fehlgeschlagen");
      }

      setStatus(
        `${result.saved?.length ?? changedBlocks.length} Textblock/Textblöcke dauerhaft gespeichert. Die Website-Seite in Edge bitte neu laden, dann erscheint der neue Stand.`,
      );
    } catch (error) {
      setStatus(
        `Direktes Speichern ist nicht aktiv. Starte zuerst im Projekt: npm run editor:direct. Details: ${
          error instanceof Error ? error.message : "unbekannter Fehler"
        }`,
      );
    }
  }

  function downloadPackage() {
    const payload = JSON.stringify(
      {
        createdAt: new Date().toISOString(),
        changes: changedBlocks.map((change) => ({
          field: change.id,
          format: change.field,
          label: change.label,
          nextValue: change.nextValue,
          source: change.source,
        })),
      },
      null,
      2,
    );
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "aiio-textaenderungen.json";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("JSON-Datei wurde vorbereitet.");
  }

  return (
    <section className="editor-shell">
      <div className="editor-hero">
        <div>
          <p className="eyebrow">HTML Editor</p>
          <h1>Code direkt bearbeiten.</h1>
          <p>
            Wähle links einen Textblock, bearbeite den HTML- oder Text-Code und
            speichere erst dann dauerhaft. Entwürfe bleiben bis dahin lokal in
            diesem Browser erhalten.
          </p>
        </div>
        <div className="editor-status-card">
          <strong>{changedBlocks.length}</strong>
          <span>geänderte Textblöcke</span>
        </div>
      </div>

      <div className="editor-layout">
        <aside className="editor-sidebar" aria-label="Textblöcke">
          {editableGroups.map((group) => (
            <div className="editor-group" key={group.id}>
              <h2>{group.title}</h2>
              {group.blocks.map((block) => {
                const isChanged =
                  drafts[block.id] &&
                  normalizeValue(drafts[block.id]) !== normalizeValue(block.value);

                return (
                  <button
                    className={block.id === selectedId ? "editor-block is-active" : "editor-block"}
                    key={block.id}
                    onClick={() => setSelectedId(block.id)}
                    type="button"
                  >
                    <span>{block.label}</span>
                    {isChanged ? <small>geändert</small> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <div className="editor-workspace">
          <div className="editor-panel">
            <div className="editor-panel-heading">
              <div>
                <p className="eyebrow">{selectedBlock.source}</p>
                <h2>{selectedBlock.label}</h2>
                <p>{selectedBlock.helper}</p>
              </div>
              <button className="editor-ghost-button" onClick={resetSelected} type="button">
                Zurücksetzen
              </button>
            </div>

            <p className="plain-editor-note">
              {selectedBlock.field === "html"
                ? "Dieser Block speichert HTML. Beispiele: <strong>fett</strong>, <br>, <a href=\"/kontakt\">Link</a>."
                : "Dieser Block speichert reinen Text. HTML-Tags werden hier als Text angezeigt."}
            </p>
            <textarea
              className="plain-editor code-editor"
              onChange={(event) => updateValue(event.target.value)}
              spellCheck={false}
              value={currentValue}
            />
          </div>

          <div className="editor-panel">
            <div className="editor-panel-heading">
              <div>
                <p className="eyebrow">Vorschau</p>
                <h2>So wirkt der Text.</h2>
              </div>
            </div>
            {selectedBlock.field === "html" ? (
              <div
                className="editor-preview"
                dangerouslySetInnerHTML={{ __html: currentValue }}
              />
            ) : (
              <div className="editor-preview">{currentValue}</div>
            )}
          </div>

          <div className="editor-actions-panel">
            <button
              className="button editor-direct-button"
              disabled={changedBlocks.length === 0}
              onClick={saveDirectly}
              type="button"
            >
              Dauerhaft speichern
            </button>
            <button className="button" disabled={changedBlocks.length === 0} onClick={copyPackage} type="button">
              Änderungspaket kopieren
            </button>
            <button
              className="button secondary"
              disabled={changedBlocks.length === 0}
              onClick={downloadPackage}
              type="button"
            >
              JSON herunterladen
            </button>
            <button className="editor-ghost-button" onClick={resetAll} type="button">
              Alle Entwürfe löschen
            </button>
            {status ? <p>{status}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
