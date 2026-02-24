---
description: Perform a deep system audit to check for truth desyncs and logic flaws.
---

This workflow is strictly reserved for the CTO Consultant (Auditor) to actively check the health of the project, ensuring the Lead Developer's memory aligns with the code reality.

1. **Ingest Code Reality:** Use the available file system tools to scan the physical project files (`/src`, `/prisma/schema.prisma`, `package.json`, etc.). Understand what is currently built and configured.
2. **Ingest Memory State:** Read the Lead Developer's tracking files (`.agent/ACTIVE_STEP_STATUS.md` and `.agent/LEAD_DEVELOPER_EXECUTION_LOG.md`).
3. **Ingest Rules:** Quickly scan any `.agent/rules/` that might be relevant to the current milestone.
4. **Compare and Audit:** Methodically compare the claims made in the memory state against the physical files. Are there files claimed to be complete that are actually empty? Are there dependencies required that are missing from `package.json`?
5. **Self-Audit (Optional):** If the `--self` parameter was passed, you MUST also read your own instructions (`.agent/rules/CTO_CONSULTANT_INSTRUCTIONS.md`). Check if you have contradictory directives, operational blindness, or tasks assigned to you that you mechanically cannot perform safely.
6. **Report to CTO:** Stop execution and output a detailed Markdown report to the CTO, outlining:
   - **Audit Result:** (Pass / Fail)
   - **Identified Laps / Desyncs:** (What memory claims differ from reality?)
   - **Identified Rule Conflicts:** (Are agents instructed to do something impossible or contradictory?)
   - **Proposed Patches:** Provide exact action items or `implementation_plan` drafts on how to fix these before proceeding with the Lead Developer's execution.
