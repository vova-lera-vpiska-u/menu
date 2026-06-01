# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
