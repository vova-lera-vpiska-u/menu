# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
