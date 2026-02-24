# ADR 0002: Server Actions Over REST API

**Date:** 2026-02-24
**Status:** Accepted

## Context

The Agentic Prompt Builder persists `Prompt` and `PromptBlock` data to a local PostgreSQL container using Prisma. We need to decide how the React 19 Client Components (the IDE interface) communicate with the Node.js backend to mutate this data.

Historically, this would be achieved via a REST API (e.g., `POST /api/blocks`).

## Decision

We mandate the exclusive use of **Next.js Server Actions** for all internal CRUD operations regarding prompts and blocks. No traditional REST API routes will be created for UI-to-Database communication.

## Rationale

- **Type Safety:** Server Actions seamlessly bridge the gap between the client UI and the Prisma DB. Type definitions for parameters and return types are inferred across the network boundary natively by TypeScript without needing GraphQL or OpenAPI schemas.
- **Reduced Boilerplate:** We remove the need for `fetch` logic, endpoint scaffolding, and complex request body parsing. Functions written in `src/actions/` can be directly imported and invoked by Client Components.
- **Optimistic UI:** Next.js and React 19 natively support optimistic updates using Server Actions, heavily supporting our requirement for "Zero-Latency Rendering" (NFR-2.1) perceptually.

## Consequences

- **Positive:** Massively simplified developer experience, enhanced type safety, built-in CSRF protection, and natively supported loading states.
- **Negative:** The tight coupling of Client and Server code within the Next.js framework means external third-party apps cannot currently call these endpoints (unlike REST). This is acceptable for Phase 1 & 2. (Phase 3 may require decoupling via a dedicated API/MCP export).
