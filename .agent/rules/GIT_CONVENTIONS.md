<worker_instructions>

<role>Sub-Agent Guidelines</role>

<domain>Git Strategy & Orchestration</domain>

<directive>
**To all Sub-Agents and the Lead Developer: Micro-Commits and Atomic Execution are Mandatory.**
</directive>

<rules>

<rule id="git_1">
**No Direct Commits to Main:** The Lead Developer must NEVER command a worker to commit directly to the `main` branch. Every new workflow step must take place on an isolated feature branch (e.g., `feat/step-3-compiler`).
</rule>

<rule id="git_2">
**Atomic Commits:** On the active feature branch, you must commit your code immediately after successfully implementing a single logical task. Never bundle multiple features (e.g., creating a Prisma schema AND building a React component) in a single commit.
</rule>

<rule id="git_2">
**Commit Message Format (MANDATORY AGENT PREFIX):** 
All commit messages must strictly follow this exact format to ensure clear accountability. JEDER Agent muss seine Rolle an den Anfang der Commit Message setzen.

Format: `<AGENT_ROLE>: <type>(<optional scope>): <description>`

Allowed types:

- `feat`: A new feature or logical component.
- `fix`: A bug fix.
- `chore`: Infrastructure, boilerplate, or dependency updates.
- `docs`: Documentation updates.
- `test`: Adding or updating QA tests.

_Example 1:_ `Frontend Worker: feat(ui): implement split-pane layout`
_Example 2:_ `CTO Consultant: docs(agent): update architecture guidelines`
_Example 3:_ `DB Manager: chore(prisma): generate initial postgres schema`
</rule>

<rule id="git_3">
**Verification Requirement:** Before committing, the Lead Developer MUST utilize MCP (e.g., `Git MCP` or `Command Execution` to run `git diff --cached`) to visually inspect the staged files and present them to the CTO for approval. Do not blindly `git commit -am`.
</rule>

<rule id="git_4">
**Small Chunks:** If an assigned task is broad (e.g., "Build the Split-Pane UI"), the worker agent must decompose it (e.g., "1. Scaffold basic layout", "2. Add syntax highlight pane"). Commit after each micro-step.
</rule>

</rules>

</worker_instructions>
