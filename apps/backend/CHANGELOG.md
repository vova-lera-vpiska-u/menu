# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.2.3] - 2026-07-15

### Changed

- `POST /recipes` no longer requires an image. When no file is sent the recipe
  is created with an empty `cover_url` instead of returning a 400.

## [1.2.2] - 2026-07-15

### Added

- `food_ingredients` now has a `position` column and a public read policy.
  Recipe writes persist each ingredient row's position by array index so the
  arranged order is preserved, and the anon client can read the join table
  (previously blocked by RLS with no SELECT policy). See migrations
  `food_ingredients_position.sql` and `food_ingredients_public_read.sql`.

## [1.2.1] - 2026-07-15

### Fixed

- Auth session lifetime bumped from 24h to 30 days: the `/login` JWT
  (`expiresIn`) and the httpOnly `jwt` cookie `expires` now both last 30 days,
  so the single admin no longer gets logged out daily.
- Logout now clears the `jwt` cookie with matching `sameSite: "none"` so the
  cookie is reliably removed (attributes must match the ones set on `/login`).

## [1.2.0] - 2026-07-15

### Added

- Recipe create/update now persist ingredients. `POST /recipes` and
  `PUT /recipes/:id` accept an `ingredients` array (`{name, amount, unit,
  optional}`), find-or-create each ingredient by name, and rebuild the
  `food_ingredients` join rows (amount/unit/optional columns added by migration).

## [1.1.0] - 2026-07-15

### Added

- `GET /me` endpoint that verifies the httpOnly `jwt` cookie via `requireAuth`
  and returns `{ username, role }`, letting the frontend restore auth state on
  page load instead of logging the user out on every reload.

## [1.0.2] - 2026-07-15

### Fixed

- Serverless function crashed on Vercel with "native WebSocket not found":
  `@supabase/supabase-js` (2.110+) needs a native `WebSocket`, unavailable on
  Node 20. The Vercel function runtime is bumped to `nodejs22.x` (and the
  esbuild target to `node22`) in `build.mjs`.

## [1.0.1] - 2026-07-15

### Added

- `PUT /recipes/:id` now syncs tags: it pulls `tags` out of the body and
  rebuilds the `food_tags` join rows for the recipe.

### Fixed

- `DELETE /recipes/:id` no longer violates the `food_tags` /
  `food_ingredients` foreign keys — the join rows are removed before the
  recipe row.

### Changed

- Supabase types are now imported from the shared `@menu/db` package instead
  of a local copy.
