# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.7.0] - 2026-07-15

### Added

- Recipe form now has a **Recipe** field (multi-line) in both create and edit
  modes, pre-filled from the recipe when editing and saved to `food.recipe`.

## [0.6.0] - 2026-07-15

### Added

- Recipe page header now shows an Edit (pencil) button for logged-in users,
  matching the Figma design. It links to the recipe edit form at `/admin/:id`.
- New reusable `RecipeForm` widget (FSD `widgets/RecipeForm`) shared by the
  create (`/admin`) and edit (`/admin/:id`) pages. The edit page now loads a
  working form with fields pre-filled from the recipe (name, category, tags,
  rating, time, nutrition) and a **Delete recipe** button (with a confirmation
  prompt); create mode has no delete button. Saving an edit navigates back to
  the recipe; deleting returns home.
- Shared `@menu/db` workspace package as the single source of truth for the
  Supabase types, consumed by both the frontend and backend.

### Changed

- Extracted the admin create form and nutrition table into `RecipeForm`,
  removing the duplicated form code from `pages/admin`. `TextButton` now
  accepts `onClick`/`type`/`disabled` so it can drive the delete action
  without submitting the form.
- Frontend now imports Supabase types from `@menu/db` instead of a local copy,
  so the nutrition columns are available and editing pre-fills them.

### Fixed

- Editing a recipe now syncs its tags (the backend rebuilds the `food_tags`
  join rows) instead of silently dropping tag changes.
- Deleting a recipe no longer fails on the `food_tags` / `food_ingredients`
  foreign keys — the backend removes the join rows first.

## [0.5.0] - 2026-07-14

### Added

- Login form now surfaces auth failures: a wrong username/password shows a
  `Wrong username or password` message (new `$loginError` store) instead of
  navigating away, and the submit button shows a `Logging in…` pending state
  while the request is in flight.
- Admin recipe form now validates inputs before submit (name, category, image)
  with inline messages, surfaces backend create failures (including a dedicated
  `Session expired` message on 401), and disables the Save button with a
  `Saving…` label while the create request is pending.
- `BigButton` accepts a `disabled` prop with a subtle opacity/cursor transition.

### Changed

- `userModel` now exposes `loginFx` and `loginPending`/`loginError` stores; the
  Login page awaits the effect instead of navigating optimistically.
- `createRecipeFx` throws the HTTP status (not `statusText`) so callers can map
  specific codes to messages.

## [0.4.0] - 2026-07-14

### Added

- Search bar now submits via a form: pressing Enter, the mobile keyboard's
  search/go key, or clicking the search icon triggers submission. Typing
  `login`/`логин` or `admin`/`админ` and submitting navigates to the login or
  admin route (restoring UI access to the auth flow, which had no entry point
  since the home-page `LOGIN` link was removed).
- Clicking the `Menu` logo now navigates to the home page.

### Changed

- Migrated section reads off the legacy REST server: `getSectionsFx` now reads
  the `categories` table directly from Supabase (the backend no longer exposes
  `GET /sections`). The `Section` type was replaced with the Supabase `Category`
  type (`_id` → `id`), updated at the admin form call site.
- Admin write effects (`createRecipeFx`, `deleteRecipeFx`, `createSectionFx`,
  `createIngredientFx`, `createCategoryFx`) now `await` their `fetch` and throw
  on a non-OK response, so `.doneData` fires only after the request settles and
  failures surface instead of being silently swallowed. Dropped stray trailing
  slashes from the write endpoints.
- Aligned write payloads with the Menu Server OpenAPI contract:
  `createSectionFx` now sends `{ name }` (was `{ name, recipes }`),
  `createIngredientFx` sends `{ name, category?, description? }` (was
  `{ name, price }` — `price` is not a column), and `updateRecipeFx` sends only
  raw `food` columns (snake_case) instead of the full nested recipe with its
  `category`/`tags`/`ingredients` joins.
- Fixed the recipe-edit form inputs to bind to real `food` columns
  (`cover_url`, `time_to_cook`) so edits land on the correct keys.

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
