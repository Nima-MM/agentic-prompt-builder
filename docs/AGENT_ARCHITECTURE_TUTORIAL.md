# Agentic Project Architecture: A Beginner's Guide

Welcome to the **Agentic Prompt Builder**! This isn't just a standard Next.js project. It is built using an "Agentic Workflow," meaning artificial intelligence (AI) agents write the code, while you (the Human CTO) make the architectural decisions and approve their work.

To make this work without the AI breaking things, we use a highly structured file system. This tutorial explains the two most important folders: `docs/` and `.agent/`.

---

## 🏗️ 1. The `docs/` Directory (The "What")

The `docs/` folder contains the long-term, human-written vision for the project. The AI agents read these files to understand _what_ they are supposed to build.

- **`docs/requirements/PRD.md` (Product Requirements Document):** The absolute source of truth. It defines the features, user personas, and non-functional requirements (like performance).
- **`docs/requirements/MVP_SPEC.md` (Minimum Viable Product):** A filtered version of the PRD. It lists the exact, step-by-step features we are building _right now_ to get a working version 1.0.
- **`docs/architecture/` (The Blueprint):** Contains the technical design (`SYSTEM_DESIGN.md`) and Architectural Decision Records (`decisions/000X-...md`). ADRs are strict rules (e.g., "We use Next.js Server Actions, NO REST APIs") that the AI must never violate.

---

## 🧠 2. The `.agent/` Directory (The "How" & The "Mind")

If `docs/` is the blueprint, `.agent/` is the management system. This folder contains the memories, rules, and automated workflows that keep the AI agents in line.

### 📜 A. The Rulebook (`.agent/rules/`)

AI agents need strict boundaries, otherwise, they write inconsistent code.

- **`ORCHESTRATION_RULES.md` & `AGENT_COMMUNICATION.md`:** These define the "Chain of Command." The Human CTO is at the top. The "Boss Agent" manages the project but must ask for permission before modifying the file system. Agents are not allowed to prompt each other directly.
- **`TECH_STACK.md` & `GIT_CONVENTIONS.md`:** Enforces exactly which technologies the AI can use (Next.js, Tailwind, Prisma) and how it must save its work (using Git feature branches).
- **Worker Instructions (e.g., `FRONTEND_WORKER_INSTRUCTIONS.md`, `LOGIC_WORKER...`):** We don't use one giant AI for everything. The Boss Agent delegates tasks to specialized "Sub-Agents." These files are their job descriptions. For example, the Logic Worker is strictly forbidden from using React so it writes pure, fast backend code.

### 💾 B. The Memory System (Root of `.agent/`)

Because AI chats eventually lose context, we force the AI to write its memories into the file system.

- **`ACTIVE_STEP_STATUS.md`:** The instantaneous "status report." Before the Boss Agent asks you for permission to proceed, it must write exactly what it just built and where the code is located into this file.
- **`CONSULTANT_ACTIVE_MEMORY.md`:** The private memory of the CTO Consultant (an auditing AI). It tracks where the project is and what risks to watch out for.
- **`PROJECT_AUDIT_LOG.md`:** The long-term, overarching architectural history. Useful for humans conducting compliance reviews after the project is done.
- **`BOSS_EXECUTION_LOG.md`:** The private diary of the Boss Agent. It logs every task it completed, the errors it made, and what it learned.

### ⚙️ C. The Automation (`.agent/workflows/`)

To save the Human CTO from typing massive instructions repeatedly, we use Antigravity IDE `/workflows`.

- **`init-task.md`:** When you type `/init-task` in the chat, the IDE automatically forces the Boss Agent to read the rules, look at the MVP spec, propose a plan for the next feature, and suggest a Git branch.
- **`execute-worker.md`:** When you type `/execute-worker`, the IDE automatically checks out the Git branch, injects the worker instructions into the AI, generates the code, updates the memory logs, and prepares a Git commit for your review.

---

### 🚀 Summary of the Daily Workflow

**How you build software here:**

1. You trigger `/init-task "Step X: Feature Name"`.
2. The Boss Agent reads `.agent/rules/` and `docs/`, then proposes a plan.
3. You review the plan. If good, you type `/execute-worker`.
4. The AI writes code on a new Git branch and updates `ACTIVE_STEP_STATUS.md`.
5. You review the code. If good, you merge the branch to `main`.
