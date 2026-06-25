# Technical Review

## Ziel

Kurzprüfung des aktuellen Projekts zur Vorbereitung der nächsten Entwicklungsphase. Es wurden keine bestehenden Komponenten, Texte oder Styles verändert.

## Prüfumfang

- Statische Durchsicht der App-Struktur unter `app/`
- Suche nach Komponenten, Wrapper-Routen und exportierten Datenstrukturen
- Suche nach wiederholten Produkt- und Messaging-Texten
- Prüfung von Linting über das vorhandene Projektkommando

## Ergebnis

Der aktuelle Stand ist grundsätzlich stabil. Der Lint-Check läuft ohne Fehler durch. Die wichtigsten nächsten Verbesserungen betreffen Wartbarkeit, zentrale Content-Pflege und die Reduzierung von Wiederholungen.

## Ungenutzte Komponenten und Exporte

- In `app/site-content.ts` sind `architecturePath`, `operatingModel` und `platformPromises` exportiert, werden aktuell aber außerhalb der Datei nicht verwendet.
- Die Editor-Struktur unter `app/editor/` ist als Route vorhanden, wirkt aber aktuell eher wie ein internes Hilfswerkzeug. Vor einer Weiterentwicklung sollte entschieden werden, ob sie produktiv bleibt oder aus der Website-Struktur herausgelöst wird.
- Im Asset-Bereich `public/system-layers/` liegen viele Varianten ähnlicher Layer- und Stack-Bilder. Das ist kein Code-Problem, sollte aber vor einem Design-System-Schritt inventarisiert werden.

## Doppelte Komponenten und Muster

- `SmartLink` und `isExternalLink` existieren sowohl in `app/main-navigation.tsx` als auch in `app/site-footer.tsx`. Ein gemeinsamer Link-Helper könnte Header und Footer konsistenter machen.
- Viele Ressourcenseiten bestehen als dünne Wrapper um `ResourcePage`, zum Beispiel Academy, Blog, Facts, Downloadcenter, Support und weitere. Das ist mit dem App-Router nachvollziehbar, könnte aber durch eine klar dokumentierte Routing-Konvention wartbarer werden.
- Die drei Produktseiten `collector`, `magnet` und `forge` folgen demselben Muster mit eigener Metadata und `LayerPage`. Metadata könnte perspektivisch aus `site-content.ts` abgeleitet werden.

## Doppelte Texte

- Produkt- und Layer-Botschaften stehen mehrfach in `app/page.tsx`, `app/site-content.ts`, `app/llms.txt/route.ts`, den Produkt-Metadaten und der Historie unter `app/about-us/page.tsx`.
- Begriffe wie `Recognition Layer`, `Understanding Layer`, `Activation Layer`, `OIS` und `Organizational Intelligence System` sind über mehrere Dateien verteilt. Das erhöht das Risiko inkonsistenter Weiterentwicklung.
- CTA- und Kontaktformulierungen wiederholen sich in `app/resource-pages.tsx`, auch wenn `standardContactForm` bereits einen Teil zentralisiert.

## Mögliche Refactorings

- Zentrale Content-Quelle für Produkt-, Layer- und OIS-Messaging schaffen.
- Gemeinsame Link-Komponente oder Link-Utility für Header und Footer extrahieren.
- Produktseiten-Metadata aus der Produktarchitektur ableiten.
- Ressourcenrouten und `resourcePages` stärker dokumentieren, damit neue Seiten nach einem klaren Muster ergänzt werden.
- Asset-Inventar für Hero-, Layer- und historische Bilder erstellen und nicht mehr genutzte Varianten später gezielt entfernen.

## Empfohlene nächste Schritte

1. Messaging-Quelle für OIS, Layer und Produkttexte definieren.
2. Produktarchitektur in `PRODUCT_ARCHITECTURE.md` inhaltlich ausarbeiten.
3. Ressourcenseiten und Navigationsstruktur in `WEBSITE_ARCHITECTURE.md` dokumentieren.
4. Asset-Inventar erstellen, bevor weitere Bildvarianten generiert werden.
5. Erst nach dieser Dokumentation technische Refactorings durchführen.
