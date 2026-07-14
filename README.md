# menu

Monorepo for the **menu** project (pnpm workspaces).

## Getting started

```bash
pnpm install            # install all workspaces
pnpm dev                # run frontend + backend in parallel
pnpm dev:frontend       # frontend only
pnpm dev:backend        # backend only
pnpm build              # build all apps
```

Each app keeps its own `.env` (git-ignored). See the app-level READMEs for details.

## History

`apps/frontend` and `apps/backend` were merged from the standalone `menu-frontend`
and `menu-server` repositories with their full git history preserved (subtree merge).
