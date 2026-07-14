-- Give food_ingredients a stable display order. Without it PostgREST returned
-- nested ingredient rows in an unspecified order. Backfill existing rows from
-- their physical insertion order (ctid) per recipe.
alter table public.food_ingredients
  add column if not exists position integer not null default 0;

with ordered as (
  select id, row_number() over (partition by food_id order by ctid) - 1 as pos
  from public.food_ingredients
)
update public.food_ingredients fi
set position = ordered.pos
from ordered
where ordered.id = fi.id;
