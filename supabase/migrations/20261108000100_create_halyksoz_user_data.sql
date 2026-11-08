create table if not exists public.user_data (
  user_id uuid primary key references auth.users (id) on delete cascade,
  profile jsonb not null check (jsonb_typeof(profile) = 'object'),
  progress jsonb not null default '{"completed": [], "words": [], "mistakes": [], "activity": []}'::jsonb
    check (jsonb_typeof(progress) = 'object'),
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;
revoke all on table public.user_data from anon, authenticated;
grant select, insert, update on table public.user_data to authenticated;

create policy "Users can read their own Halyk Soz data"
  on public.user_data for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own Halyk Soz data"
  on public.user_data for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own Halyk Soz data"
  on public.user_data for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create or replace function public.keep_halyksoz_account_path()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  level_order text[] := array['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  current_level text;
  current_index integer;
begin
  if tg_op = 'UPDATE' then
    if old.profile ->> 'ageGroup' is distinct from new.profile ->> 'ageGroup' then
      raise exception 'Возрастная группа аккаунта не меняется после регистрации';
    end if;

    current_level := old.profile ->> 'level';
    if current_level is distinct from new.profile ->> 'level' then
      current_index := array_position(level_order, current_level);
      if old.profile ->> 'ageGroup' = 'child'
        or current_index is null
        or current_index >= array_length(level_order, 1)
        or new.profile ->> 'level' is distinct from level_order[current_index + 1]
        or not coalesce(old.progress -> 'completed' ? ('exam-' || current_level), false)
      then
        raise exception 'Следующий уровень открывается после прохождения итогового теста';
      end if;
    end if;

    new.updated_at := now();
  end if;
  return new;
end;
$$;

create trigger keep_halyksoz_account_path
  before update on public.user_data
  for each row execute function public.keep_halyksoz_account_path();
