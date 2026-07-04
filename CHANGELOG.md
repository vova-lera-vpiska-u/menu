# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.3.1] - 2026-07-04

### Changed

- Rewrote the recipe-list mobile navbar show/hide-on-scroll logic. Extracted it
  into a dedicated `useHideNavbarOnScroll` hook that throttles scroll handling
  with `requestAnimationFrame`, keeps the last scroll position in a ref (so the
  listener attaches once instead of re-binding on every scroll event), uses a
  `passive` listener, ignores sub-threshold jitter, and always reveals the
  navbar near the top of the page.
- The navbar now animates via GPU-composited `transform: translateY` instead of
  the `top` property, and centres itself with auto margins so `transform` is
  reserved solely for the animation across all breakpoints.

## [0.3.0] - 2026-07-03

### Added

- Responsive layout for tablet and desktop. New `@shared/styles/breakpoints`
  helper (breakpoint tokens + `media` query strings + a `CONTAINER_WIDTH` token);
  the `#root` shell now grows from the 500px phone column to `min(1200px, 92vw)`
  from 640px up. Mobile layout is unchanged — every desktop rule sits behind a
  `min-width` media query.

### Changed

- Main page: element grid goes 2 → 3 columns on desktop with larger tiles and
  gaps; the "What about.." carousel shows multiple slides at once; search results
  reflow into a card grid.
- Recipe list: the single-column card stack becomes an `auto-fill` grid
  (`minmax(320px, 1fr)`) and the fixed navbar spans the widened container.
- Recipe detail and login are width-capped and centred for readability on wide
  screens; the plate-overlap effect moved into a named `usePlateOverlap` hook.
- Rewrote the home carousel's active-slide tracking (`use-carousel.ts`) to measure
  real slide positions via `getBoundingClientRect` instead of assuming each slide
  equals the container width — fixes the position dots for partial-width slides.

### Removed

- Dropped `release-it` and `@release-it/keep-a-changelog`. Versioning is now
  done by hand (bump `package.json` + roll `[Unreleased]` into a dated section).
  The plugin's `keepUnreleased: true` config silently skipped the changelog roll
  on release, and the tooling overhead wasn't worth it at this project's scale.

## [0.2.0] - 2026-06-01

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
