# **Product Requirements Document (PRD)**

**Projekt:** Agentic Prompt Builder & Enhancer

**Typ:** Self-Hosted Web Appliance (Docker-First)

**Zielgruppe:** LLM Poweruser, AI Engineers, Prompt Architects, DevOps-Teams

## **1\. Executive Summary & Vision**

### **1.1 Problem Statement**

Im Jahr 2026 hat sich das Prompt-Engineering von simplen Textanweisungen hin zu komplexen, programmcode-ähnlichen Strukturen (Agentic Workflows) entwickelt. Native LLM-Chat-Interfaces versagen bei der Verwaltung solcher Prompts: Es fehlen Syntax-Highlighting, Validierungsmechanismen für XML-Strukturen, relationale Versionskontrolle und die Möglichkeit, Prompts modular und iterativ zu testen.

### **1.2 Die Lösung**

Entwicklung einer containerisierten Web-Applikation zur Konstruktion, Optimierung (Enhancement) und Verwaltung von komplexen, agentischen System-Prompts. Das Tool agiert als spezialisierte IDE (Integrated Development Environment). Es bietet eine strikt strukturierte Umgebung, um Prompts aus wiederverwendbaren semantischen Blöcken aufzubauen und in State-of-the-Art Formaten (XML, Markdown, Hybrid) für den direkten Export deterministisch zu kompilieren. Die Bereitstellung erfolgt robust über Docker.

## **2\. Funktionale Anforderungen (FR) \- Core Features**

### **FR-1: Modularer Prompt-Editor (Die IDE-Erfahrung)**

Das System muss eine interaktive, blockbasierte GUI bieten, die den Aufbau von Prompts in logische, semantische Sektionen zwingt.

* **FR-1.1 (Block-Lifecycle):** Nutzer müssen Blöcke dynamisch hinzufügen, entfernen, duplizieren und umsortieren können. Blöcke müssen einklappbar sein. Das System muss Template-Variablen (z.B. {{user\_input}}) innerhalb der Blöcke unterstützen. Ein dediziertes 'Variable Injection & Test' UI-Panel erlaubt es dem Nutzer, Testwerte zu verifizieren.
* **FR-1.2 (Syntax & Intellisense):** Tiefe Unterstützung für Syntax-Highlighting (Markdown, JSON-Schema und XML/HTML).

### **FR-2: Format-Kompilierung (Compiler Engine)**

Das System muss die modularen Eingaben über einen abstrakten State in einen maschinenlesbaren String überführen.

* **FR-2.1 (Pure Markdown):** Generierung eines reinen Markdown-Dokuments mit strikter Hierarchie.
* **FR-2.2 (Pure XML mit Auto-Linting):** Fokus auf strikte Parsing-Grenzen. Erfordert einen internen XML-Linter, der fehlerhaftes Escaping sanitisiert, um deterministisch gültiges XML zu erzeugen.
* **FR-2.3 (Hybrid-Modus):** XML für logische System-Regeln und Markdown für inhaltliche Text-Hierarchien innerhalb der Knoten.

### **FR-3: Export, Import & Integration**

* **FR-3.0 (Heuristischer Import):** Das System muss rohe Legacy-Text-Prompts einlesen und automatisch in modulare Blöcke aufschlüsseln können.
* **FR-3.1 (Frictionless Clipboard):** 1-Click "Copy to Clipboard" der kompilierten Prompts.
* **FR-3.2 (File-System Export):** Prompts müssen als .md, .xml, .txt oder strukturierte .json (Export des abstrakten AST-States) heruntergeladen werden können.

### **FR-4: Prompt Enhancer (KI-gestützte Optimierung)**

* **FR-4.1:** Integration einer Audit-Funktion, die einen Entwurfs-Prompt analysiert und strukturell verbessert. Der Enhancer generiert einen Diff-Vergleich (Vorher/Nachher). Der Nutzer muss Änderungen explizit akzeptieren.
* **FR-4.2 (Token-Awareness):** Der Enhancer muss Token-Limits beachten und aktiv Kürzungen vorschlagen, falls das System-Prompt unverhältnismäßig groß wird.

### **FR-5: Persistenz & Agentic Search**

* **FR-5.1 (CRUD & Relationale Datenbank):** Das System muss erstellte Prompts, Snippets und Projekt-Workspaces persistent und ausfallsicher in einer vollwertigen relationalen Datenbank (PostgreSQL) speichern.
* **FR-5.2 (Semantic Vector Search):** Das System muss Prompts auch über inhaltliche Beschreibungen (Semantik) finden können. Dies erfordert die native Integration eines Embedding-Modells und Vektor-Suchfunktionen (z.B. pgvector) auf Datenbankebene, um Suchanfragen (z.B. "Zeig mir den Prompt für den Datenbank-Agenten") semantisch mit dem inhaltlichen Kontext der Bibliothek abzugleichen.

## **3\. Nicht-Funktionale Anforderungen (NFR) \- Systemqualität**

### **NFR-1: Privacy & Zero-Trust (Self-Hosted Security)**

* **NFR-1.1 (Absolute Datenhoheit):** Da proprietäres Firmenwissen in Prompts fließt, **muss** die Applikation "On-Premise" / "Self-Hosted" sein. Es gibt keine Telemetrie und keine erzwungene Public-Cloud-Anbindung. Das gesamte System (Frontend, Backend, Datenbank) läuft isoliert in lokalen Containern.
* **NFR-1.2 (Secret Management):** API-Keys (für externe LLMs) müssen sicher über Environment-Variablen (.env in Docker) oder via AES-256 symmetrischer Verschlüsselung in der PostgreSQL-Datenbank abgelegt werden. Plaintext-Keys in der DB sind streng verboten.

### **NFR-2: Performance, Rendering & UX**

* **NFR-2.1 (Zero-Latency Rendering):** Das Tippen im Editor und das automatische Kompilieren der Live-Preview muss in absoluter Echtzeit (\< 50ms) passieren. State-Updates der UI müssen vom Datenbank-Sync entkoppelt sein (Optimistic UI Updates mit Debouncing von mind. 2000ms für Background-Saves via Next.js API).
* **NFR-2.2 (Multi-Pane Desktop UX):** Die UI muss informationsdicht und für Desktop-Monitore und Notebook-Displays optimiert sein. Das Standard-Layout ist ein resizable Multi-Pane-Setup.
* **NFR-2.3 (Modularität & Hotkeys):** Fenstergrößen, Textfelder etc. müssen stufenlos verstellbar sein. Poweruser erwarten eine tiefgreifende Tastatursteuerung (Command-Palette wie in VS Code via Cmd/Ctrl \+ K, Shortcuts für "Neuer Block", "Export", "Kompilieren").

### **NFR-3: Docker-First Deployment Architecture**

* **NFR-3.1 (DevOps & Reproducibility):** Die gesamte Applikation (Development und Production) muss zwingend containerisiert sein, um das "Works on my machine"-Problem zu eliminieren. Entwickler und Endnutzer starten das System einheitlich über docker-compose up. Lokale "Bare-Metal" Installationen via npm run dev auf dem Host-OS sind zu vermeiden.
* **NFR-3.2 (Service Architektur):** Die Distribution besteht standardmäßig aus mindestens zwei Services: Dem Web-Applikations-Container (Next.js) und dem Datenbank-Container (PostgreSQL).

## **4\. Projektphasen-Planung (Milestones & DoD)**

### **Phase 1: Domain Modeling & DevOps Setup (PoC)**

* **Ziele:** Setup der docker-compose.yml (Next.js \+ Postgres) Frontend, Backend, DB. Eine git-workflow-strategie. Einrichtung von git. Definition des Datenbankschemas (Prisma).
* **Deliverable:** Laufende Container-Umgebung. Ordnerstruktur ist strikt nach Next.js App Router Best Practices (z.B. src/app, src/components, src/lib) getrennt. Der Agent Manager kann erfolgreich Daten in die lokale Postgres-DB schreiben und lesen. Für jeden isolierten Implementierungsschritt existiert ein sauberer, atomarer Git-Commit.

### **Phase 2: Core Engine & MVP (Minimum Viable Product)**

* **Ziele:** Volle Implementierung der React-UI (Block-Editor). Fertigstellung der "Compiler Engine" (Pure MD, Pure XML, Hybrid). Anbindung der UI an das Backend zur Speicherung der Prompts in Postgres.
* **Deliverable:** Lokal gehostete Web-Appliance. Nutzer können Prompts bauen, persistieren und fehlerfrei herauskopieren.

### **Phase 3: Enhancer & Semantic Search**

* **Ziele:** Integration von pgvector in die Postgres-Datenbank. Anbindung lokaler LLMs (z.B. Ollama als dritter Docker-Service unter zwingender Nutzung des NVIDIA Container Toolkits für GPU-Passthrough) oder externer APIs für das Prompt-Enhancement inkl. Diff-Viewer.
* **Deliverable:** Das System fungiert nun als intelligentes, semantisch durchsuchbares Enterprise-Prompt-Repository.

### **Phase 4: UX Polish & Release-Pipeline**

* **Ziele:** Integration von fortschrittlichem Syntax-Highlighting. Dark Mode.
* **CI/CD:** Aufbau automatisierter CI-Pipelines. Bei Releases wird das offizielle, produktionsfertige Docker-Image in eine Registry gepusht.
