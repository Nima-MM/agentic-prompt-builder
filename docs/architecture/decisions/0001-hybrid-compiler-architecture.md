# ADR 0001: Hybrid Compiler Architecture

**Date:** 2026-02-23
**Status:** Accepted

## Context

The core capability of the Agentic Prompt Builder is taking an array of discrete `PromptBlock` objects and deterministicially compiling them into a singular output format (e.g., Markdown, XML, or a Hybrid structure). We must decide where and how this compilation logic executes.

Initial considerations explored whether compilation should happen on the backend server (to keep the client thin) or dynamically within React render cycles.

## Decision

We will build a **Dual-Compiler Engine** as a pure, decoupled TypeScript utility running entirely on the client outside of the React render DOM lifecycle.

- It will reside in a dedicated file (e.g., `src/utils/compiler.ts`).
- It accepts a strictly typed array of blocks and a mode format, returning a pure string.
- It executes locally within the browser context using standard JavaScript string manipulation.

## Rationale

- **Zero-Latency Promise (NFR-2.1):** By executing compilation entirely client-side, we bypass all network latency. As a power-user types, the Live-Preview updates instantly (< 50ms) without waiting for a server roundtrip.
- **Decoupled Architecture:** Keeping the compiler out of React's component logic means the compiler can be unit-tested in isolation instantly.
- **Low Compute Overhead:** String concatenation and template generation is trivial for modern browsers; there is no need to offload this compute to the Node.js BFF.

## Consequences

- **Positive:** The Live Preview feels instantaneous and native. High testability for the `compiler.ts` logic.
- **Negative:** The user's browser must download the logic for compilation, slightly increasing the initial JavaScript bundle size, though the impact for this specific feature is practically negligible.
