# UI/UX Specification (Frontend Blueprint) - Draft 2: Material Design 3

**Purpose:** This document translates the Human CTO's request for a Google Material Design 3 aesthetic into strict frontend specifications.

> [!NOTE]
> The Orchestrator MUST force the Frontend Worker to read this file before generating React components.

---

## 🎨 Global Aesthetics

- **Vibe:** Google Workspace style. Clean, spacious, light mode. Elevated surfaces with soft shadows and highly legible layouts. **Desktop/Notebook Optimized:** High information density. Do not compromise the desktop layout for mobile responsiveness (Mobile is explicitly out-of-scope for this IDE).
- **Primary Colors:** Material You dynamic pastel tones. E.g., Soft Blue (`#e3f2fd` to `#2196f3`) for primary actions, subtle Mint Green (`#e8f5e9`) for success contexts. Background should be off-white/very light gray (e.g., `#f8f9fa`) to let elevated white cards pop.
- **Typography:** `Roboto` or `Google Sans` (Inter is an acceptable fallback) for UI. `Fira Code` strictly for code blocks.
- **Shapes:** Soft rounded corners on all M3 Cards (e.g., `rounded-2xl` for main panels, `rounded-xl` for inner blocks).

## 🧩 Required shadcn/ui Primitives

_List of components the DevOps worker must run `npx shadcn@latest add ...` for before frontend work begins:_

- `resizable` (For the Split-Pane layout)
- `scroll-area` (For the block editor and preview panes)
- `card` (To contain individual Prompt Blocks - MUST use heavy rounded corners and subtle drop shadows)
- `button` (Floating Action Button style, tonal buttons, ghost variants)
- `input` & `textarea`
- `dropdown-menu`
- `separator`
- `tabs` (Material-style underline indicator for XML vs Markdown)
- `badge` (For block type labels)

## 🏗️ Layout Specifications

_Machine-readable breakdown of the grid/flex structures (e.g., Split-Pane coordinates):_

- **Global Shell:** 100vh, `flex-col`. A top app bar containing the Project Title, Breadcrumbs, and global actions (Deploy, Save, Settings).
- **Below App Bar:** A two-column setup.
- **Left Pane (Block Editor):** ~50% width. A spacious scrolling container. The 'Semantic Prompt Blocks' are stacked vertically. Each block is a highly rounded M3 Card with a soft background tint depending on its role (e.g., pastel blue for Instruction, pastel green for Context).
- **Right Pane (Live Preview):** ~50% width. A `Tabs` component cleanly splitting Compiled XML (top) and Markdown Output (bottom or tabbed). It should look like an elevated white surface.

## 🎬 Micro-Animations & Interactions

- **Hover States:** Elevations increase (shadow grows) when hovering over Prompt Blocks.
- **Transitions:** `ease-in-out` `duration-300` for all surface elevation changes.
- **Ripples:** Standard Material ripple effect on buttons if possible (or standard shadcn opacity transition).
