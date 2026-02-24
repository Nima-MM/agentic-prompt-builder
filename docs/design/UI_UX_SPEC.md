# UI/UX Specification (Frontend Blueprint) - Draft 3: MD1 & Bootstrap Hybrid

**Purpose:** This document translates the Human CTO's request for a classic Material Design 1 and Bootstrap layout (with adaptive MD4 concepts) into strict frontend specifications for the worker agents.

> [!NOTE]
> The Orchestrator MUST force the Frontend Worker to read this file before generating React components.

---

## 🎨 Global Aesthetics

- **Vibe:** Classic Google Cloud Platform / Solid SaaS structure. Distinct, crisp elevated surfaces. Highly adaptive and responsive layout (fluid down to mobile if necessary, though desktop is primary). We are dropping "dense desktop-only" constraints in favor of a clean, responsive web application structure.
- **Primary Colors:** Bootstrap-style or classic MD1 solid colors. Primary Action Blue (`#1976d2` or `#0d6efd`), clean white cards (`#ffffff`), set against a light gray background (`#f3f4f6` or `#f8f9fa`).
- **Typography:** `Roboto` system stack. Standard, legible font sizes. Editor blocks use `Fira Code`.
- **Shapes:** Moderate rounding. Use `rounded-md` or `rounded-lg` max. Avoid the extreme pill-shapes of M3.

## 🧩 Required shadcn/ui Primitives

_List of components the DevOps worker must run `npx shadcn@latest add ...` for before frontend work begins:_

- `resizable` (For the Split-Pane layout on desktop, stacking on mobile)
- `scroll-area`
- `card` (To contain individual Prompt Blocks - MUST use crisp MD1 drop shadows `shadow-md` and `rounded-md`)
- `button` (Solid filled primary buttons, prominent secondary standard buttons)
- `input` & `textarea`
- `dropdown-menu`
- `toast` (For classic bottom-up notification alerts)
- `tabs`
- `badge`

## 🏗️ Layout Specifications (Adaptive)

_Machine-readable breakdown of the grid/flex structures:_

- **Responsive Behavior:** The layout MUST be built with standard breakpoints (`md:`, `lg:`).
- **Global Shell:** A classic top-navbar (`h-14` or `h-16`) spanning `w-full` with the logo and primary actions (Save, Deploy) on the right.
- **Main Container:** Below the navbar, a responsive container. On Desktop (`lg`), it uses the Split-Pane setup. On Mobile (`< lg`), it stacks vertically (Editor on top, Preview on bottom).
- **Left Pane (Block Editor):** The 'Semantic Prompt Blocks' stack vertically. Each block has a clear, solid top-border colored by category (e.g., Blue for Context, Green for Instruction).
- **Right Pane (Live Preview):** A highly contrasted area (perhaps a darker background for the XML/Markdown preview to separate it from the white/grey editor).

## 🎬 Micro-Animations & Interactions

- **Adaptive Transitions:** Fluid width/height changes when panels resize or stack.
- **Hover States:** Slight upward translation (`-translate-y-1`) and shadow-intensity increase on cards.
- **Snappiness:** Keep animations fast (150ms-200ms) to ensure it feels like a native tool.
