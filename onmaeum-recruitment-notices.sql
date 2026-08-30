-- 한국어강사 모집 공고 (회원 전체 열람, 원문 대신 링크만)
-- 1) 이 파일 전체를 SQL Editor에서 실행합니다.
-- 2) 아래 주석 처리된 INSERT의 키를 본인만 아는 긴 문자열로 바꿔 따로 실행합니다.

begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.recruitment_notices (
  id bigint generated always as identity primary key,
  source_url text not null,
  organization text not null,
  position text not null,
  region text,
  deadline date,
  collected_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint recruitment_notices_source_url_key unique (source_url)
);

create table if not exists private.recruitment_sync (
  id int primary key default 1 check (id = 1),
  key_hash text not null
);

alter table public.recruitment_notices enable row level security;

revoke all on public.recruitment_notices from public, anon, authenticated;
grant select on public.recruitment_notices to authenticated;

drop policy if exists "members_read_recruitment_notices" on public.recruitment_notices;
create policy "members_read_recruitment_notices"
on public.recruitment_notices for select
to authenticated
using (true);

create or replace function public.sync_recruitment_notices(notices jsonb, sync_key text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  key_ok boolean;
  upserted integer := 0;
begin
  select extensions.crypt(sync_key, s.key_hash) = s.key_hash
  into key_ok
  from private.recruitment_sync s
  where s.id = 1;

  if not coalesce(key_ok, false) then
    raise exception 'forbidden';
  end if;

  if notices is null or jsonb_typeof(notices) <> 'array' then
    raise exception 'notices must be a JSON array';
  end if;

  insert into public.recruitment_notices (source_url, organization, position, region, deadline)
  select
    left(trim(item->>'source_url'), 2000),
    left(trim(item->>'organization'), 200),
    left(trim(coalesce(nullif(trim(item->>'position'), ''), item->>'title')), 200),
    left(nullif(trim(item->>'region'), ''), 80),
    case
      when (item->>'deadline') ~ '^\d{4}-\d{2}-\d{2}$' then (item->>'deadline')::date
      else null
    end
  from jsonb_array_elements(notices) as item
  where coalesce(trim(item->>'source_url'), '') <> ''
    and coalesce(trim(item->>'organization'), '') <> ''
    and coalesce(trim(coalesce(nullif(trim(item->>'position'), ''), item->>'title')), '') <> ''
  on conflict (source_url) do update
  set
    organization = excluded.organization,
    position = excluded.position,
    region = excluded.region,
    deadline = excluded.deadline,
    updated_at = now();

  get diagnostics upserted = row_count;

  delete from public.recruitment_notices
  where deadline is not null
    and deadline < (timezone('Asia/Seoul', now()))::date;

  return jsonb_build_object('ok', true, 'upserted', upserted);
end;
$$;

revoke all on function public.sync_recruitment_notices(jsonb, text) from public;
grant execute on function public.sync_recruitment_notices(jsonb, text) to anon, authenticated;

comment on table public.recruitment_notices is
  '한국어강사 모집 공고. 회원만 열람. 원문 없이 기관·직무·지역·마감·원문 링크만 저장.';

comment on function public.sync_recruitment_notices(jsonb, text) is
  '오후 수집 에이전트용. notices 배열 원소: source_url, organization, position, region, deadline(YYYY-MM-DD).';

commit;

-- 2단계: 위 실행이 끝난 뒤, 키만 바꿔 아래 네 줄을 실행하세요. 이 키는 Git에 올리지 마세요.
-- insert into private.recruitment_sync (id, key_hash)
-- values (1, extensions.crypt('본인만-아는-긴-동기화-키', extensions.gen_salt('bf')))
-- on conflict (id) do update set key_hash = excluded.key_hash;
