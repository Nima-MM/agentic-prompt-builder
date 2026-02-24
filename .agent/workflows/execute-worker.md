---
description: Execute a planned task by injecting context into a sub-agent, verifying output, and committing.
---

This workflow executes the Boss Agent's 7-Step loop automatically after the CTO has approved a proposal.

1.  **Context Injection:** Command the chosen Sub-Agent to perform the task. You MUST inject context by commanding the worker to read `docs/requirements/PRD.md`, their specific `.agent/rules/<NAME>_INSTRUCTIONS.md`, and the `.agent/STATE_OF_THE_UNION.md` FIRST.

2.  **Execute Worker Task:** Orchestrate the sub-agent to generate the code based on the approved plan.
3.  **Verify via MCP:** Use the available MCP tools (File system read, DB schema check, or Docker) to independently verify the worker's output against the plan.
4.  **Document State:** Update `.agent/STATE_OF_THE_UNION.md`. You MUST overwrite or append the current milestone, blockers, and providing the full Code Dumps of the newly created or modified files.

5.  **Micro-Commit:** Read `.agent/rules/GIT_CONVENTIONS.md`. Execute a `git add .` and `git commit -m "<Worker>: <type>: <description>"` to save the verified state. Report success to the CTO.
