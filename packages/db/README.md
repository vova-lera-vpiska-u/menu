# @menu/db

Single source of truth for the Supabase-generated database types, shared by
`@menu/backend` and `@menu/frontend`.

These types are consumed as TypeScript source directly (the backend runs via
ts-node/Vercel and the frontend via Vite), so there is no build step.

## Regenerating

Regenerate from the live schema and overwrite `src/supabase.ts`:

```sh
supabase gen types typescript --project-id <project-id> > packages/db/src/supabase.ts
```
