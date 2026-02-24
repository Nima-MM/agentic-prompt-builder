---
description: Perform a deep, strategic system audit to find critical errors or areas for architectural improvement.
---

This workflow is strictly reserved for the CTO Consultant to actively analyze the holistic health and strategy of the project. (Note: Simple memory-vs-reality sync checks are the job of the `Project Auditor` sub-agent, not this workflow).

1. **Ingest Physical Reality:** Scan the physical project codebase (`/src`, `/prisma`, `package.json`, root configs, etc.).
2. **Ingest Documentation:** Scan the business logic and constraints in `/docs` (PRD, MVP_SPEC, System Design).
3. **Ingest Agent Hivemind:** Scan the `.agent/` directory (Orchestration rules, worker instructions, tracking logs).
4. **Holistic Synthesis & Analysis:** Put all three pillars (Code, Docs, Rules) into context. Do they align?
5. **Hunt for Flaws & Improvements:** Identify missing extensions, logical bottlenecks, security risks, or critical omissions.
6. **The `--self` Audit (Optional):** If triggered with the `--self` parameter, heavily prioritize analyzing your own files (`.agent/CTO_CONSULTANT_INSTRUCTIONS.md`, `.agent/CONSULTANT_ACTIVE_MEMORY.md`, `.agent/PROJECT_AUDIT_LOG.md`). Question your own operational blindness: Ensure you are acting effectively as a consultant and not hallucinating or violating constraints.
7. **Report to CTO:** Output a detailed Markdown report. **CRITICAL:** Every identified finding (error, gap, or improvement) MUST be accompanied by an ML-style `Confidence Score (0.00 to 1.00)` indicating the mathematical probability that this finding is accurate and critical.
   - **Format:** `[Confidence: 0.95] - Finding description...`
