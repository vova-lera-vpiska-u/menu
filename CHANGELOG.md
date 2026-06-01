# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Externalised the large element artwork to **Supabase Storage** (public `assets`
  bucket, S3-compatible). New `getAssetUrl()` helper in `@shared/lib/asset-url`
  builds public URLs from `VITE_SUPABASE_URL` so the storage origin lives in one
  place.
- Workbox `runtimeCaching` rule (`CacheFirst`, `remote-assets` cache) for the
  Supabase storage origin, so externalised images still work offline after first
  load.
- `docs/ASSETS.md` documenting asset formats, compression targets, where assets
  live, and the add-an-asset workflow.

### Changed

- Element images are now WebP served from Supabase instead of PNGs bundled with
  the app. Recompressed from new full-resolution sources (~1.2 MB → ~132 KB) and
  removed from the precache, shrinking the bundle.
- Main-page cards (element grid, carousel slides, recipe cards) now use an 8px
  radius and a 1px `#d8d8d8` (`COLORS.lightGray`) border, since the new photos
  have no built-in rim.

### Removed

- Bundled element PNGs (`Fire`, `Earth`, `Air`, `5 element`, `Ethanol`, `HLS`)
  from `src/shared/assets/img` — now served from Supabase Storage.

## [0.1.4]

### Fixed

- `npm run lint` now works again: removed the `--ext` flag that the flat-config
  ESLint no longer accepts, and added a global ignore for `dist`/`dev-dist` so
  generated service-worker bundles are no longer linted (was reporting 1,800+
  bogus errors). Enabled `react/jsx-uses-vars` and removed a dead styled
  component; lint is now clean at `--max-warnings 0`.

### Changed

- Moved the two remaining inline `useEffect`s into named hooks
  (`useAdminPageLifecycle`, `useHideNavbarOnScroll`), resolving the
  `exhaustive-deps` warnings and complying with the project hook rule.
- CI now gates deploys: a `check` job runs install/lint/typecheck/build (on push
  and PR) and `deploy` only runs after it passes. Switched to `npm ci`, bumped
  actions to v4, and enabled npm caching.

### Added

- Configured `release-it` with the `@release-it/keep-a-changelog` plugin so
  `npm run release` bumps the version, rolls `[Unreleased]` into a dated section,
  commits, and tags — running lint + typecheck first.

## [0.1.3]

### Security

- Resolved all 15 npm audit advisories (9 high, 6 moderate) via `npm audit fix`.
  Notably fixes the user-facing `react-router-dom` XSS-via-open-redirect
  (6.24.1 → 6.30.4) and bumps `styled-components` (→ 6.4.2), `vite` (→ 6.4.2),
  and `ws`. All updates are within existing major versions; build verified.

## [0.1.2]

### Fixed

- Keyboard no longer activates automatically on app open. The search input
  had an unconditional `autoFocus` that grabbed focus on mount even while the
  search bar was collapsed. Focus is still applied when the user taps the
  search button, and an existing (persisted) search query still opens the bar
  without stealing focus.
