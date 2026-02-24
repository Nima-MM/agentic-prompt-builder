---
description: Initialize a new execution step for the MVP build.
---

This workflow is used by the Lead Developer to safely prepare and plan the next architectural step according to the CTO's directives.

1.  **Ingest Context:** Read `.agent/rules/ORCHESTRATION_RULES.md` and `.agent/ACTIVE_STEP_STATUS.md` to understand the current rules and the exact code state left behind by the previous step.

2.  **Analyze Request:** If the CTO provided a specific step (e.g., "Step 3: Decoupled Compiler"), locate that step within `docs/requirements/MVP_SPEC.md` and `.agent/rules/TECH_STACK.md`.

3.  **Propose Plan:** Output a detailed step-by-step plan on how to build this feature. Specify exactly which sub-agent (Worker) will be tasked.

4.  **Branch Generation:** Propose a specific Git branch name for this task following the format `feat/step-<number>-<short-description>`. Explicity state: "We will execute this on branch: `<branch-name>`".

5.  **Halt for Approval:** Stop execution and ask the CTO: "This is my plan for the next step. Do I have your approval to proceed on the proposed branch? If yes, please trigger `/execute-worker`."
