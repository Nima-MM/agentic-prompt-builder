# CTO Consultant Context Memory

**Last Updated:** February 2026

## Goal

This document serves as the persistent memory cache for the "CTO Consultant / Peer Architect" Agent. It tracks the current progress of the _Agentic Prompt Builder & Enhancer_ project to ensure the consultant always has the correct state without asking the user repetitive questions.

## Project State (Phase 1 -> Phase 2 Transition)

### Completed

1.  **DevOps Setup (Phase 1):** `docker-compose.yml` and `Dockerfile` are created (Next.js + Postgres 16).
2.  **Architecture Rules & Audits:** Decoupled Compiler Engine is documented. `PROJECT_AUDITOR` is implemented to prevent memory-reality desyncs. The `/audit-system` workflow is active. Orchestrator pipelines hardened with NFC/PFC flow constraints.
3.  **Decoupled Compiler Engine Built (Step 3):** The logic for generating PRD output formats exists in `src/utils/compiler.ts`.
4.  **UI/UX Liaison (Design-First):** `UI_UX_SPEC.md` created with Material Design 3 guidelines optimized for Desktop/Notebook.

### CRITICAL DESYNC (FAILED STEPS)

- **Step 2 (Prisma Schema):** The Lead Developer's logs claim the schema is done, but the `schema.prisma` file is **EMPTY**. This must be rectified before building UI or Server Actions.
- **Phase 2.5 (QA Setup):** Testing frameworks (`jest`, Playwright) and critical UI dependencies (`zustand`, `shadcn/ui`, etc.) are missing from `package.json` despite the QA-Workers/Frontend workers needing them.

### Current Pending Action

The CTO must instruct the Lead Developer (via `/init-task`) to wake up and execute the following remediation task-chain using the newly hardened NFC/PFC pipelines:

`"Achtung Lead Developer: Ein System-Audit hat ergeben, dass dein letzter Kenntnisstand veraltet ist. Step 2 (Prisma Schema) ist physisch leer. Du MUSST folgende Task-Kette sofort als neues Milestone-Ziel ausführen: 1) Beauftrage den DevOps Worker mit der Installation der für künftige Phasen fehlenden Pakete ('zustand', 'lucide-react', 'clsx', 'tailwind-merge', 'class-variance-authority', 'jest' und 'playwright'). 2) Lasse den DevOps Worker 'npx shadcn@latest init' ausführen. 3) Beauftrage den DB Manager, die leere schema.prisma anhand der PRD neu zu schreiben. Vertraue auf deine neue QA-Dependency Pipeline für Retries."`

## Strategic Watchlist

- **Strict Human Control:** The Project Auditor now technically blocks hallucinations, but the CTO must manually confirm every `ACTIVE_STEP_STATUS`.
- **Lead Developer State Timeline:** The Lead Developer's tracking files (`LEAD_DEVELOPER_EXECUTION_LOG.md` and `ACTIVE_STEP_STATUS.md`) currently reflect a past, pre-audit reality. They are not actively "halluzinating", but simply "paused" in the timeline before the empty Prisma schema was discovered. Their state will be re-synchronized upon the next `/init-task` when we inject the new context.
