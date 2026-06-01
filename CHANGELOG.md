# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.1.2]

### Fixed

- Keyboard no longer activates automatically on app open. The search input
  had an unconditional `autoFocus` that grabbed focus on mount even while the
  search bar was collapsed. Focus is still applied when the user taps the
  search button, and an existing (persisted) search query still opens the bar
  without stealing focus.
