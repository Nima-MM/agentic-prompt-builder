# UI/UX Specification (Frontend Blueprint)

**Purpose:** This document is the bridge between the Human CTO's visual ideas (sketches, images) and the AI Frontend Worker's code execution. It translates aesthetic intent into strict `shadcn/ui` and `Tailwind` dependencies.

> [!NOTE]
> The CTO Consultant parses images provided in the chat and writes the machine-readable specifications here. The Orchestrator MUST force the Frontend Worker to read this file before generating React components.

---

## 🎨 Global Aesthetics

- **Vibe:** Developer-focused, Hacker-style IDE. Dark mode exclusive. High information density with subtle glassmorphism (translucency on panels).
- **Primary Colors:** Deep Slate (`#0f172a` background), True Black panels (`#000000` or `#09090b`), and sharp Neon Indigo/Violet accents (`#6366f1` or `#8b5cf6`).
- **Typography:** `Inter` for UI elements. `JetBrains Mono` or `Fira Code` strictly for editor blocks and XML/Markdown previews.

## 🧩 Required shadcn/ui Primitives

_List of components the DevOps worker must run `npx shadcn@latest add ...` for before frontend work begins:_

- `resizable` (Crucial for the Split-Pane layout)
- `scroll-area` (For the block editor and preview panes)
- `card` (To contain individual Prompt Blocks)
- `button` (Ghost, Outline, Default variants)
- `input` & `textarea`
- `dropdown-menu` (For block actions like Duplicate/Delete)
- `separator`
- `command` (For the `Cmd+K` command palette)
- `tabs` (To switch between XML and Markdown preview)

## 🏗️ Layout Specifications

_Machine-readable breakdown of the grid/flex structures (e.g., Split-Pane coordinates):_

- **Global Shell:** 100vh, `flex-row`. A narrow leftmost vertical sidebar (Icons only) for navigation.
- **Left Pane (Sidebar/Explorer):** ~20% width. Contains a list of saved prompts and a palette of draggable "Semantic Blocks".
- **Middle Pane (Block Editor):** ~40% width. A vertical `flex-col` stack of Prompt Blocks. Each block is a `Card` containing the block title, drag-handle, and a code editor textarea.
- **Right Pane (Live Preview):** ~40% width. A `Tabs` component switching between compiled XML and Markdown output.
- **Bottom Pane (Console/Terminal):** A collapsible horizontal pane at the bottom for compiler logs or test outputs.

## 🎬 Micro-Animations & Interactions

- **Hover States:** Subtle glow or border highlight on Prompt Blocks when hovering.
- **Transitions:** `duration-200 ease-in-out` on buttons and tab switches.
- **Drag & Drop:** Immediate visual feedback (ghosting) when reordering blocks.
