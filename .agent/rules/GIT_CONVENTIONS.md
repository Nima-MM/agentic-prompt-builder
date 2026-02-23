<worker_instructions>

<role>Sub-Agent Guidelines</role>

<domain>Git Strategy & Orchestration</domain>

<directive>
**To all Sub-Agents and the Boss Agent: Micro-Commits and Atomic Execution are Mandatory.**
</directive>

<rules>

<rule id="git_1">
**Atomic Commits:** You must commit your code immediately after successfully implementing a single logical task. Never bundle multiple features (e.g., creating a Prisma schema AND building a React component) in a single commit.
</rule>

<rule id="git_2">
**Commit Message Format:** All commit messages must follow the standard:
`<Agent Name>: <type>: <description>`

Allowed types:

- `feat`: A new feature or logical component.
- `fix`: A bug fix.
- `chore`: Infrastructure, boilerplate, or dependency updates.
- `docs`: Documentation updates.

_Example:_ `Backend Worker: feat: Implement Prisma PromptBlock schema`
</rule>

<rule id="git_3">
**Verification Requirement:** Before committing, the Boss Agent MUST utilize MCP (e.g., `Git MCP` or `Command Execution` to run `git diff --cached`) to visually inspect the staged files and present them to the CTO for approval. Do not blindly `git commit -am`.
</rule>

<rule id="git_4">
**Small Chunks:** If an assigned task is broad (e.g., "Build the Split-Pane UI"), the worker agent must decompose it (e.g., "1. Scaffold basic layout", "2. Add syntax highlight pane"). Commit after each micro-step.
</rule>

</rules>

</worker_instructions>
