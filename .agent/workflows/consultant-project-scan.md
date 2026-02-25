---
description: Perform a deep analytical scan of requirements, MVP specs, and agent alignment to evaluate architectural health.
---

# 🕵️‍♂️ Consultant Project Scan

This workflow commands the Elite CTO Consultant to perform a holistic deep-dive into the architectural integrity of the project's requirements, UI specs, and agent orchestration.

**Process (The Scan Definition):**

1. **Context Ingestion:** Read and analyze `docs/requirements/PRD.md` and `docs/requirements/MVP_SPEC.md` to understand the current and future functional scope.
2. **Actor Evaluation:** Scan the `.agent/rules/` directory to evaluate the exact capabilities, domains, and interaction protocols of all relevant active sub-agents.
3. **Synthesis & Understanding:** Understand the big picture, the specific roles of the agents, and how they function together within the current step boundaries.
4. **Architectural Verification:** Evaluate the orchestration for correctness. Check for "Negative Flow Completeness", workflow gaps, and context collisions.
5. **Reporting Requirement:** Output a structured response starting exactly with:
   - "Erfolg! Ich habe jetzt den vollen Überblick." (If the scan successfully maps the architecture without critical contradictions)
   - "Gescheitert! Diese Punkte ergeben für mich keinen Sinn: [List of discrepancies]" (If there are critical paradoxes in the rules or missing specs)
6. **Actionable Recommendations:** Provide specific fixes for FR/NFR updates or agent rule adjustments if requested by the CTO.

**Usage:**
Type `/consultant-project-scan [optional focus area]` in the chat.
