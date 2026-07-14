-- Add nutrition columns to food (migrated from Mongo nutritionSchema)
alter table public.food
  add column if not exists calories numeric,
  add column if not exists protein  numeric,
  add column if not exists fat      numeric,
  add column if not exists carbs    numeric;
