# UI/UX Specification (Frontend Blueprint) - Draft 5: Clean Modern (Notion/Apple Hybrid)

**Purpose:** This document translates the Human CTO's provided visual mockup into strict frontend specifications for the worker agents. The aesthetic is clean, flat, and highly legible, prioritizing subtle borders over heavy shadows.

> [!NOTE]
> The Orchestrator MUST force the Frontend Worker to read this file before generating React components.

---

## 🎨 Global Aesthetics

- **Vibe:** "Notion meets Apple". Extremely clean, light mode. High information density but feels spacious due to padding. Distinct flat surfaces separated by subtle 1px borders rather than z-index elevations or heavy drop shadows.
- **Primary Colors:**
  - **Primary Action (Buttons, Active states):** Soft Indigo/Purple (`#6366f1` / `bg-indigo-500`).
  - **Backgrounds:** Global App Background (`#f9fafb`), Sidebar Background (`#f9fafb`), Main Content / Cards (`#ffffff`).
  - **Text:** Headings (`#111827`), Secondary Text (`#6b7280`).
  - **Accents:** Indigo for active sidebar items and focus states.
- **Typography:** `Inter` or `San Francisco` system stack for all UI text. `Fira Code` or `JetBrains Mono` strictly for Prompt/Code block contents within cards.
- **Shapes:** Consistent, moderate rounding. Action buttons use `rounded-md`. Main cards/panels use `rounded-lg`. Avoid extreme pill-shapes.

## 🧩 Required shadcn/ui Primitives

_List of components the DevOps worker must run `npx shadcn@latest add ...` for before frontend work begins:_

- `resizable` (For the Split-Pane layout)
- `scroll-area`
- `card` (To contain Prompt Blocks - MUST use subtle borders `border-slate-200`, pure white background, and NO drop-shadows `shadow-none`)
- `button` (Solid indigo for primary, subtle ghost/icon variants for edit/delete actions)
- `input` & `textarea`
- `separator`
- `tabs`
- `badge`
- `select` (For the Format Selection Dropdown)

## 🏗️ Layout Specifications (Adaptive & Resizable)

_Machine-readable breakdown of the grid/flex structures based on the mockup and system reqs:_

- **Main Container:** A 100vh full-screen web app. It MUST use the `shadcn/ui` `<ResizablePanelGroup>` setup horizontally.
- **Left Pane (Sidebar/Navigation):** Wrapping the first `<ResizablePanel>` (Default size ~20-25%). Light gray background. Contains a single, flat navigation: Logo, Home, My Prompts, Settings. Uses minimalist Lucide Icons. Active states have a very subtle gray highlight and indigo text. **No taxonomy or category groupings for MVP** (reserved for Phase 3).
- **Right Pane (Main Workspace):** Wrapping the second `<ResizablePanel>` (Default size ~75-80%). Pure white background.
  - **Header Area:** Large crisp title ("Prompt Templates") with secondary subtext and a primary Indigo Action Button ("+ New Template") aligned top-right.
  - **Workspace Editor (The Blocks):** The semantic prompt blocks are stacked vertically within a scroll area. Each block is a flat white `<Card>` with a 1px soft border. Text inside uses a monospace font. Action icons (Edit, Copy, Delete) are minimal, un-bordered icons pinned to the top-right of each card.
  - **Conversion / Export Area (Bottom Right):** Located at the bottom right corner of the active workspace. This area contains a **Selection-Dropdown** for output formats (options: `XML`, `Markdown`, `Hybrid`) and a primary **Convert-Button** next to it.
- **Granular Block Resizing:** Every `<textarea>` within a Prompt Block Card MUST have the standard CSS `resize-y` utility applied, allowing the user to dynamically adjust the block's height via a bottom-right grab handle.
- **The Drag Handle:** Between the Left and Right panes, there MUST be a clean, minimalist `<ResizableHandle>`.

## 🎬 Micro-Animations & Interactions

- **Hover States:** Instead of shadows increasing, cards and list items receive a very faint gray background tint (`hover:bg-gray-50`) on hover.
- **Transitions:** Fast, snappy `ease-in-out` `duration-150` for color and background shifts.
- **Focus States:** Distinct indigo focus rings (`ring-indigo-500`) on inputs and textareas for accessibility.
