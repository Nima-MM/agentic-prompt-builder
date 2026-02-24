---
description: Execute a planned task by injecting context into a sub-agent, verifying output, and committing.
---

This workflow executes the Lead Developer's 7-Step loop automatically after the CTO has approved a proposal.

1.  **Branch Creation:** Execute `git checkout -b <branch-name>` using the exact branch name proposed in the planning phase. If the branch already exists, switch to it using `git checkout <branch-name>`.

2.  **Micro-Task Delegation (The Hub Firewall):** You (the Lead Developer) hold the master context (`PRD.md`, architecture). You MUST NOT command the chosen Sub-Agent to read the `PRD.md` or `MVP_SPEC.md`. Instead, you must act as a translator. Command the worker to read _only_ their specific `.agent/rules/<NAME>_INSTRUCTIONS.md` and provide them with a highly specific, surgical Micro-Task (e.g., "Build a React component that renders a blue button based on this CSS structure. Do not worry about database logic.").

3.  **Execute Worker Task:** Orchestrate the sub-agent to generate the code based on the approved plan.
4.  **Execute QA Worker (NEW):** IMMEDIATELY after the code worker finishes, you MUST assign the corresponding `QA_WORKER` (e.g., Logic QA, Frontend QA) to write automated tests for the new code.
5.  **Verify via MCP:** Use the available MCP tools (File system read, DB schema check, or Docker) to independently verify both the implementation and the passing tests.
6.  **Project Auditor Verification (The Gatekeeper):** Before proceeding to commit, you MUST assign the `PROJECT_AUDITOR` to read the `ACTIVE_STEP_STATUS.md` and use MCP tools to verify the physical files on disk match the claims. You may only proceed to step 7 if the Auditor returns `STATUS: PASS`. If `FAIL`, you must assign the appropriate code worker to fix the missing code, and re-run step 6.
7.  **Document State:** Update `.agent/ACTIVE_STEP_STATUS.md`. You MUST overwrite or append the current milestone, blockers, and providing the full Code Dumps of the newly created or modified files.

8.  **Micro-Commit on Branch:** Read `.agent/rules/GIT_CONVENTIONS.md`. Execute a `git add .` and `git commit -m "<Worker>: <type>: <description>"` to save the verified state on the feature branch.
9.  **PR / Merge Request:** Halt execution and state: "Feature branch is ready. Please review the `ACTIVE_STEP_STATUS.md` and the `git diff main`. If approved, please merge to main and delete this branch."
10. **Post-Execution Log:** After the CTO merges the branch, you MUST append a new chronological entry to `.agent/LEAD_DEVELOPER_EXECUTION_LOG.md` detailing the task completed, any errors or blockers faced, and technical lessons learned.
