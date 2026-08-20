-- 온마음 문의 게시판 (약방 수파베이스에 설치)
-- 실행: GitHub로 연 약방 프로젝트 → SQL Editor → 이 파일 전체 붙여넣기 → Run

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.onmaeum_inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  org text,
  email text,
  title text not null,
  content text not null,
  is_secret boolean not null default false,
  password_hash text,
  answer text,
  answered_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.onmaeum_inquiry_settings (
  id int primary key default 1 check (id = 1),
  admin_password_hash text not null
);

alter table public.onmaeum_inquiries enable row level security;
alter table public.onmaeum_inquiry_settings enable row level security;

create or replace function public.onmaeum_is_admin(p_password text)
returns boolean
language sql
stable
security definer
set search_path = public, extensions
as $$
  select coalesce(
    (
      select extensions.crypt(p_password, s.admin_password_hash) = s.admin_password_hash
      from public.onmaeum_inquiry_settings s
      where s.id = 1
    ),
    false
  );
$$;

create or replace function public.onmaeum_list_inquiries()
returns table (
  id bigint,
  title text,
  name text,
  org text,
  is_secret boolean,
  answered boolean,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public, extensions
as $$
  select
    i.id,
    i.title,
    i.name,
    i.org,
    i.is_secret,
    (i.answer is not null) as answered,
    i.created_at
  from public.onmaeum_inquiries i
  order by i.id desc;
$$;

create or replace function public.onmaeum_get_inquiry(p_id bigint, p_password text default null)
returns table (
  id bigint,
  title text,
  name text,
  org text,
  email text,
  content text,
  is_secret boolean,
  answer text,
  answered_at timestamptz,
  created_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public, extensions
as $$
declare
  r public.onmaeum_inquiries%rowtype;
  admin boolean;
begin
  select * into r from public.onmaeum_inquiries where onmaeum_inquiries.id = p_id;
  if not found then
    raise exception '글을 찾을 수 없습니다.';
  end if;

  admin := public.onmaeum_is_admin(p_password);

  if r.is_secret and not admin then
    if r.password_hash is null
       or p_password is null
       or extensions.crypt(p_password, r.password_hash) <> r.password_hash then
      raise exception '비밀번호가 일치하지 않습니다.';
    end if;
  end if;

  return query
  select
    r.id,
    r.title,
    r.name,
    r.org,
    case when admin or not r.is_secret then r.email else null end,
    r.content,
    r.is_secret,
    r.answer,
    r.answered_at,
    r.created_at;
end;
$$;

create or replace function public.onmaeum_create_inquiry(
  p_name text,
  p_org text,
  p_email text,
  p_title text,
  p_content text,
  p_is_secret boolean,
  p_password text
)
returns bigint
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  new_id bigint;
begin
  if p_name is null or length(trim(p_name)) = 0
     or p_title is null or length(trim(p_title)) = 0
     or p_content is null or length(trim(p_content)) = 0 then
    raise exception '이름, 제목, 내용은 필수입니다.';
  end if;
  if coalesce(p_is_secret, false) and (p_password is null or length(p_password) = 0) then
    raise exception '비밀글은 비밀번호가 필요합니다.';
  end if;

  insert into public.onmaeum_inquiries (
    name, org, email, title, content, is_secret, password_hash
  ) values (
    trim(p_name),
    nullif(trim(p_org), ''),
    nullif(trim(p_email), ''),
    trim(p_title),
    trim(p_content),
    coalesce(p_is_secret, false),
    case when coalesce(p_is_secret, false)
      then extensions.crypt(p_password, extensions.gen_salt('bf'))
      else null
    end
  )
  returning id into new_id;

  return new_id;
end;
$$;

revoke all on public.onmaeum_inquiries from anon, authenticated;
revoke all on public.onmaeum_inquiry_settings from anon, authenticated;
grant execute on function public.onmaeum_is_admin(text) to anon, authenticated;
grant execute on function public.onmaeum_list_inquiries() to anon, authenticated;
grant execute on function public.onmaeum_get_inquiry(bigint, text) to anon, authenticated;
grant execute on function public.onmaeum_create_inquiry(text, text, text, text, text, boolean, text) to anon, authenticated;

insert into public.onmaeum_inquiry_settings (id, admin_password_hash)
values (1, extensions.crypt('onmaeum-admin', extensions.gen_salt('bf')))
on conflict (id) do nothing;
