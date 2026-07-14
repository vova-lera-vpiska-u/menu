# Monetisation Strategy

> Status: **planning / forward-looking**. The app is being developed as a personal
> project for now. None of this is built yet — the goal of this document is to
> capture the options and, just as importantly, the cheap architectural decisions
> that keep these doors open so future monetisation doesn't require a rewrite.

## Guiding principle

Build personal-quality now, monetise later — but don't architect yourself into a
corner. One decision unlocks almost everything below at near-zero cost today:

- **Give recipes an `owner_id` (= `auth.uid()`) and use real Supabase Auth accounts**
  instead of a single hardcoded admin. Single-user today, but it's the prerequisite
  for per-user collections, premium features, and B2B multi-tenancy — and adding it
  after data exists is a painful migration.

---

## Options, ranked by fit to this app

### 🥇 1. "Find a place that serves it" — discovery → ordering affiliate

Turn the recipe app into a **decision** app: pick a dish, then choose

- **Cook it** → recipe (what exists today), or
- **Order / find it nearby** → restaurant discovery + delivery.

The second path is pure affiliate revenue with no inventory and no premium content.

- Deep-link to delivery aggregators (Yandex Eda / Delivery Club / Wolt / Uber Eats,
  by region) — most run affiliate or referral programs.
- Or a reservation/discovery affiliate (Yelp / 2GIS / Google Places-style lookup →
  commission on bookings).

**Why it's the strongest fit:** it monetises the exact moment of intent — "I want
this but I'm not going to cook it" — feels like a feature rather than an ad, and
needs only a dish → cuisine/keyword mapping plus a places lookup.

**What it needs:** dish→keyword mapping, a places/delivery API, an affiliate account.

### 🥈 2. Affiliate / grocery & bar-tool links

The "cook it" branch of the same engine. Each recipe's ingredient list becomes a
"buy the ingredients" basket via a grocery-delivery affiliate; cocktail tools and
spirits via a retail affiliate.

- Low effort once ingredient data is populated — the schema already models
  `ingredients` + `food_ingredients`.
- Complements option 1: same outbound-link mechanism, different branch.

### 🥉 3. Subscription / premium

Recipe apps monetise subscriptions through **utility**, not paywalled recipes:

- Shopping-list export, meal planning, "save to collection," ad-free, curated menus.

**Defer until there's a retained audience** — paid tiers on an empty app convert
nobody. Requires real user accounts and per-user data (the `owner_id` hedge).

### B2B SaaS — bars/cafés host & manage their menu

Highest revenue ceiling, but it's a **pivot, not a feature**: multi-tenant data,
billing, onboarding, per-venue branding. Don't pursue proactively. Thanks to the
`owner_id` + Supabase Auth hedge, if a venue ever asks you're a tenancy layer away,
not a rewrite away.

### Ads — skip

Low yield at small scale, hurts the clean UX, and the affiliate paths monetise the
same traffic far better.

---

## Recommended path

1. **Now** — finish the MVP, keep it personal, add `owner_id` to recipes and move to
   real Supabase Auth accounts.
2. **First monetisation (when wanted)** — ship the **"find a place / buy ingredients"**
   outbound layer. Lowest friction, no premium content required.
3. **If it gets traction** — layer premium *utility* features (collections, shopping
   lists, meal planning) as a subscription.
4. **Only if a venue asks** — consider the B2B tenancy play.

---

## Cheap hedges to make now (so later is easy)

- [ ] Real Supabase Auth accounts (not a single hardcoded admin)
- [ ] `owner_id` on recipes
- [ ] Keep ingredient data structured (already modelled) so grocery affiliate is trivial
- [ ] Store dish metadata (cuisine/type) that a places lookup can key off later
