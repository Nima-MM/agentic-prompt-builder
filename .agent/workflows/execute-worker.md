---
description: Execute a planned task by injecting context into a sub-agent, verifying output, and committing.
---

This workflow executes the Lead Developer's 7-Step loop automatically after the CTO has approved a proposal.

1.  **Branch Creation:** Execute `git checkout -b <branch-name>` using the exact branch name proposed in the planning phase. If the branch already exists, switch to it using `git checkout <branch-name>`.

2.  **Context Injection:** Command the chosen Sub-Agent to perform the task. You MUST inject context by commanding the worker to read `docs/requirements/PRD.md`, their specific `.agent/rules/<NAME>_INSTRUCTIONS.md`, and the `.agent/ACTIVE_STEP_STATUS.md` FIRST.

3.  **Execute Worker Task:** Orchestrate the sub-agent to generate the code based on the approved plan.
4.  **Verify via MCP:** Use the available MCP tools (File system read, DB schema check, or Docker) to independently verify the worker's output against the plan.
5.  **Document State:** Update `.agent/ACTIVE_STEP_STATUS.md`. You MUST overwrite or append the current milestone, blockers, and providing the full Code Dumps of the newly created or modified files.

6.  **Micro-Commit on Branch:** Read `.agent/rules/GIT_CONVENTIONS.md`. Execute a `git add .` and `git commit -m "<Worker>: <type>: <description>"` to save the verified state on the feature branch.
7.  **PR / Merge Request:** Halt execution and state: "Feature branch is ready. Please review the `ACTIVE_STEP_STATUS.md` and the `git diff main`. If approved, please merge to main and delete this branch."
8.  **Post-Execution Log:** After the CTO merges the branch, you MUST append a new chronological entry to `.agent/LEAD_DEVELOPER_EXECUTION_LOG.md` detailing the task completed, any errors or blockers faced, and technical lessons learned.
