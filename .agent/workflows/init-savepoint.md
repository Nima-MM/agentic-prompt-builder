---
description: Set an architectural savepoint before risky operations.
---

This workflow creates a physical backup of the current workspace state so that the CTO can roll back using `/load-savepoint` if an execution fails catastrophically.

1. Create the savepoint directories.
   // turbo

```bash
mkdir -p .agent/savepoints/latest
```

2. Sync the current project state into the savepoint, strictly excluding heavy build artifacts, git history, and the savepoints folder itself.
   // turbo

```bash
rsync -a --delete --exclude='node_modules' --exclude='.git' --exclude='.next' --exclude='.agent/savepoints' ./ .agent/savepoints/latest/
```

3. **Agent Instruction:** Take the CTO's custom message (e.g. "soweit so gut: ...") from their prompt, and execute a command to write it to the `savepoint.log` with the current timestamp.

```bash
echo "[$(date -Iseconds)] SAVEPOINT: <INSERT_CTO_MESSAGE_HERE>" > .agent/savepoints/latest/savepoint.log
```

4. Confirm to the CTO that the savepoint is active.
