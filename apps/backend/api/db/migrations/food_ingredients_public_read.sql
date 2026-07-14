-- Allow public read access to food_ingredients (RLS was enabled with no SELECT
-- policy, so the anon client received an empty ingredients list). Mirrors the
-- "Enable read access for all users" policy on the other public tables.
create policy "Enable read access for all users"
  on public.food_ingredients
  for select
  to public
  using (true);
