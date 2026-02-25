---
description: Restore the project state from the latest savepoint.
---

This workflow restores the workspace to the exact state of the latest savepoint, effectively undoing any catastrophic agentic failures.

1. Verify that a savepoint exists before attempting restoration.
   // turbo

```bash
if [ ! -d ".agent/savepoints/latest" ]; then
  echo "Error: No latest savepoint found."
  exit 1
fi
```

2. Restore the files from the savepoint. We use `--delete` to remove any rogue files that were created _after_ the savepoint was made, ensuring a perfect 1:1 rollback.
   // turbo

```bash
rsync -a --delete --exclude='node_modules' --exclude='.git' --exclude='.next' --exclude='.agent/savepoints' .agent/savepoints/latest/ ./
```

3. Remind the CTO which state was just restored by reading the savepoint log.
   // turbo

```bash
cat .agent/savepoints/latest/savepoint.log
```

4. Confirm to the CTO that the rollback was successfully executed and the project is safe.
