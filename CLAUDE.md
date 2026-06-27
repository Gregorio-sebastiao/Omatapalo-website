@AGENTS.md

# Git Workflow

- All code changes must be committed to the `dev` branch — never commit directly to `main`.
- At the end of a session (or when the user asks), create a PR from `dev` → `main` using `gh pr create`.
- If already on `main`, switch to `dev` first: `git checkout dev`.
