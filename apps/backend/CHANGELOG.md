# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
