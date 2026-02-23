# State Management Strategy

This document formally dictates how state is handled across the application bounds. **The Frontend Worker must strictly adhere to these principles.**

## 1. Volatile UI State (The Frontend Domain)

All interactive, highly frequent, and uncommitted data must reside in **Zustand**.

**Use Cases for Zustand:**

1.  **Drafting Prompts:** The text currently being typed in a block's `textarea` (must instantly reflect in the UI).
2.  **UI Flags:** The currently selected compile mode (Markdown vs. XML).
3.  **Local Drag & Drop:** Transitory ordering states before a user explicitly saves or a debounced save triggers.

**Constraints:**

- Zustand is memory-only. If the browser tab closes, uncommitted Zustand state is lost.

## 2. Persistent Business State (The Backend Domain)

All data that defines a finalized Prompt or Prompt Block architecture belongs in **PostgreSQL**. The bridge to this state is governed by **Next.js Server Actions**.

**Use Cases for Server Actions & Prisma:**

1.  **Saving a Block:** Pushing the drafted content of a `PromptBlock` to the database.
2.  **Deleting a Block:** Permanently removing a block's UUID from the database.
3.  **Loading Prompts:** Fetching the initial state upon page load (Server Components can pre-load this before hydrating Zustand).

## 3. The Bridge: Optimistic Updates

To meet the NFR for "Zero-Latency" interaction, the Frontend must utilize **Optimistic UI Updates** when communicating with Server Actions.

**Execution Flow:**

1.  User modifies a block.
2.  Zustand updates instantly (Local State).
3.  Frontend calls `updateBlock(id, newContent)` Server Action.
4.  _Optional:_ If the Server Action fails, Zustand must rollback to the previous state and alert the user. If successful, the UI remains perfectly in sync with the database gracefully.
