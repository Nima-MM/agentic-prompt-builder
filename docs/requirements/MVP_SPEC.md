# **Minimum Viable Product (MVP) Specification**

**Projekt:** Agentic Prompt Builder & Enhancer

**Phase:** 1 & 2 (DevOps Setup, Core Editor Engine & Format-Kompilierung)

**Tech-Stack:** Next.js (App Router), PostgreSQL, Prisma, Zustand, Tailwind CSS, Docker

## **1\. MVP Scope Definition (In/Out)**

Der MVP konzentriert sich darauf, das Kernproblem nativer LLM-Interfaces zu lösen: Die Bereitstellung einer strukturierten Eingabeumgebung mit deterministischer Output-Kompilierung, lauffähig in einer isolierten Container-Umgebung.

### **1.1 In Scope (Was wir bauen)**

* **Docker-First Infrastruktur:** Bereitstellung des Systems über eine docker-compose.yml, welche die Next.js-Applikation und die PostgreSQL-Datenbank lokal orchestriert.
* **Split-Pane UI:** Eine zweigeteilte Benutzeroberfläche. Auf der einen Seite der modulare Editor (Eingabe), auf der anderen Seite die Live-Preview (Ausgabe).
* **Modularer State:** Die Fähigkeit, semantische Prompt-Blöcke (z.B. Persona, Rules) dynamisch hinzuzufügen, zu bearbeiten und zu entfernen.
* **Ergonomische Texteingabe:** Große, sich an den Inhalt anpassende Eingabefelder (Auto-Resize), um Poweruser bei der Eingabe langer Texte nicht einzuschränken.
* **Multi-Format Compiler Engine:** Echtzeit-Übersetzung des modularen States in drei wählbare Zielformate: "Pure Markdown", "Pure XML" oder "Hybrid" (XML für Struktur, Markdown für Inhalt).
* **Frictionless Export:** Ein 1-Click "Copy to Clipboard" Mechanismus für den kompilierten Output.
* **Relational Persistence (Local-First):** Die Applikation speichert Prompts und Blöcke dauerhaft über eine API (Server Actions) in der lokalen PostgreSQL-Datenbank.

### **1.2 Out of Scope (Was wir *nicht* im MVP bauen)**

* **Cloud-Persistenz:** Das Abspeichern der Prompts in einer externen Cloud.
* **Erweiterte Interaktion:** Drag-and-Drop Sortierung von Blöcken (die Reihenfolge ist vorerst durch das Anfügen definiert).
* **KI-Features & Vektor-Suche:** pgvector, Semantic Search oder der Prompt Enhancer (LLM API Anbindungen) werden erst in Phase 3 realisiert.
* **Komplexer Import:** Reverse Engineering oder das Hochladen von bestehenden Legacy-Dateien.
* **Variable Injection:** Das Test-UI für Template-Variablen ({{var}}) wird auf spätere Phasen verschoben.

## **2\. Abstrakte Datenarchitektur (Core State)**

Um die UI zustandsgesteuert zu rendern, den Compiler fehlerfrei zu betreiben und die Daten in PostgreSQL abzubilden, definieren wir den Zustand eines Prompts als relationale Entität.

### **2.1 Datenmodell (Prompt Block)**

Jeder Block im System muss zwingend folgende Eigenschaften aufweisen (Mapping für Prisma Schema):

* **Identifikator (id):** Ein eindeutiger UUID zur Identifikation des Blocks im UI-Rendering und in der Datenbank.
* **Prompt-Relation (promptId):** Fremdschlüssel, der diesen Block einem übergeordneten Prompt-Dokument zuordnet.
* **Reihenfolge (orderIndex):** Ein Integer-Wert, der die Position des Blocks im Gesamt-Prompt bestimmt.
* **Typ (type):** Ein definierter semantischer Wert aus einem festen Set (z.B. persona, knowledge\_base, rules, workflow, context, examples). Dieser Typ bestimmt das spätere Tagging/Heading bei der Kompilierung.
* **Inhalt (content):** Der eigentliche, vom Nutzer eingegebene Rohtext.
* **Aktivitätsstatus (isActive):** Ein boolescher Wert, der es erlaubt, einen Block temporär von der Kompilierung auszuschließen.

### **2.2 Globaler Applikationszustand**

Das Gesamtsystem verwaltet den Zustand auf zwei Ebenen:

1. **Client State (Zustand):** Verwaltet die flüchtigen UI-Eingaben (z.B. den Text, der gerade getippt wird) und den compileMode ('markdown', 'xml', 'hybrid').
2. **Server State (PostgreSQL):** Sichert den bestätigten Zustand der PromptBlock Objekte über Next.js Server Actions.

## **3\. UI / UX Architektur-Vorgaben**

### **3.1 Layout-Struktur (Desktop First)**

Die Benutzeroberfläche muss hochgradig funktional und informationsdicht sein.

* **Globaler Header/Toolbar:**
  * Titel der Applikation.
  * Globaler Umschalter (Segmented Control / Select) für den Kompilierungsmodus (Markdown, XML, Hybrid).
  * Ein dominanter "Copy to Clipboard" Button.
  * Ein "Save" Button zum Auslösen des DB-Syncs (falls kein Auto-Save implementiert wird).
* **Main Workspace (Split-View):**
  * **Editor-Bereich (Input):**
    * Rendert die Liste aller aktuellen Blöcke in Reihenfolge des orderIndex.
    * Jeder Block besteht visuell aus: Einem Selektor für den type, einem Button zum Löschen des Blocks und dem Haupt-Texteingabefeld (content).
    * Am Ende der Liste befindet sich eine gut sichtbare Interaktionsfläche ("+ Neuer Block").
  * **Preview-Bereich (Output):**
    * Ein schreibgeschützter Bereich, der den vom Compiler generierten String anzeigt.
    * Muss optisch als Code-Block erkennbar sein (Monospace-Schriftart).

## **4\. Abstrakte Compiler-Logik**

Die Kernkomponente des MVP ist die deterministische Übersetzungsfunktion. Sie nimmt das Array der aktiven Blöcke und den gewählten Modus entgegen und gibt einen formatierten String zurück. Sie operiert rein client-seitig, um NFR-2.1 (Zero-Latency) zu gewährleisten.

### **4.1 Modus: Markdown Kompilierung**

Die Engine iteriert über alle aktiven Blöcke (sortiert nach orderIndex).

Transformationsregel pro Block:

1. Der type des Blocks wird als Markdown-Header Ebene 2 (\#\# TYP\_IN\_GROSSBUCHSTABEN) gesetzt.
2. Darunter folgt der exakte content.
3. Die Blöcke werden durch einen Markdown-Trenner (---) visuell voneinander getrennt.

### **4.2 Modus: XML Kompilierung**

Die Engine iteriert über alle aktiven Blöcke.

Transformationsregel pro Block:

1. Der type des Blocks wird als öffnendes XML-Tag verwendet (\<typ\_in\_kleinbuchstaben\>).
2. Darunter folgt der exakte content.
3. Der Block wird mit dem entsprechenden schließenden XML-Tag beendet (\</typ\_in\_kleinbuchstaben\>).

### **4.3 Modus: Hybrid Kompilierung**

Die Engine iteriert über alle aktiven Blöcke.

Transformationsregel:

1. Der type des Blocks bildet den strukturellen Rahmen als XML-Tag (\<typ\_in\_kleinbuchstaben\>).
2. Der content wird im Original belassen, wobei die UI sicherstellt, dass der Nutzer hier Markdown schreiben kann.
3. Das XML-Tag wird geschlossen (\</typ\_in\_kleinbuchstaben\>).
