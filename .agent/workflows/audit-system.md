---
description: Perform a deep, strategic system audit to find critical errors or areas for architectural improvement.
---

This workflow is strictly reserved for the CTO Consultant to actively analyze the holistic health and strategy of the project. (Note: Simple memory-vs-reality sync checks are the job of the `Project Auditor` sub-agent, not this workflow).

1. **Ingest Physical Reality:** Scan the physical project codebase (`/src`, `/prisma`, `package.json`, root configs, etc.).
2. **Ingest Documentation:** Scan the business logic and constraints in `/docs` (PRD, MVP_SPEC, System Design).
3. **Ingest Agent Hivemind:** Scan the `.agent/` directory (Orchestration rules, worker instructions, tracking logs).
4. **Holistic Synthesis & Analysis (TCA & Self-Healing Enforced):** Put all three pillars (Code, Docs, Rules) into context. Do they align? **CRITICAL A:** Apply your `TEMPORAL_CONTEXT_AWARENESS` rule. Do not accuse the Orchestrator of hallucinating if their past logs simply reflect a frozen state before physical desyncs were discovered. Treat these as "Pending Remediation". **CRITICAL B:** Before flagging missing packages, code gaps, or logic errors as 'Critical', you MUST cross-reference them with the Escalation and Error-Handling routines of **ALL AGENTS** in the system. Does the Lead Developer have a pipeline to fix it? Does a QA-Worker have validation rules for it? If any agent is explicitly designed to auto-remediate the issue during their normal workflow, you MUST flag it as an 'Expected Auto-Remediation' with a low confidence risk, not a fatal flaw.
5. **Hunt for Flaws & Improvements:** Identify missing extensions, logical bottlenecks, security risks, or critical omissions.
6. **The `--self` Audit (Optional):** If triggered with the `--self` parameter, heavily prioritize analyzing your own files (`.agent/CTO_CONSULTANT_INSTRUCTIONS.md`, `.agent/CONSULTANT_ACTIVE_MEMORY.md`, `.agent/PROJECT_AUDIT_LOG.md`). Question your own operational blindness: Ensure you are acting effectively as a consultant and not hallucinating or violating constraints.
7. **Report to CTO:** Output a detailed Markdown report. **CRITICAL:** Every identified finding (error, gap, or improvement) MUST be accompanied by an ML-style `Confidence Score (0.00 to 1.00)` indicating the mathematical probability that this finding is accurate and critical.
   - **Format:** `[Confidence: 0.95] - Finding description...`
