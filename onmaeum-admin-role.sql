-- 회원 로그인을 관리자 권한으로 씁니다.
-- 온마음 회원용 SQL Editor에서 이 파일 전체를 실행합니다.
-- kodak2133@gmail.com이 관리자가 되고, 비밀글도 비밀번호 없이 읽습니다.
-- 문의 표가 아직 없으면 먼저 onmaeum-inquiries.sql을 실행하세요.

begin;

alter table public.profiles
  add column if not exists is_admin boolean not null default false;

comment on column public.profiles.is_admin is
  '사이트 관리자. 회원 로그인만으로 문의 답변 등이 열립니다. 브라우저는 이 값을 바꿀 수 없습니다.';

create or replace function public.onmaeum_is_admin(p_password text default null)
returns boolean
language plpgsql
stable
security definer
set search_path = public, extensions
as $$
declare
  ok boolean := false;
begin
  if auth.uid() is not null then
    begin
      select exists (
        select 1
        from public.profiles
        where id = auth.uid()
          and is_admin is true
      ) into ok;
      if ok then
        return true;
      end if;
    exception
      when undefined_table then
        null;
      when undefined_column then
        null;
    end;
  end if;

  if p_password is null or length(trim(p_password)) = 0 then
    return false;
  end if;

  begin
    select extensions.crypt(p_password, s.admin_password_hash) = s.admin_password_hash
    into ok
    from public.onmaeum_inquiry_settings s
    where s.id = 1;
    return coalesce(ok, false);
  exception
    when undefined_table then
      return false;
  end;
end;
$$;

revoke all on function public.onmaeum_is_admin(text) from public;
grant execute on function public.onmaeum_is_admin(text) to anon, authenticated;

commit;

update public.profiles
set is_admin = true
where id = (
  select id from auth.users where lower(email) = 'kodak2133@gmail.com'
);

-- 관리자는 비밀글 비밀번호 없이 본문·이메일을 읽습니다. 문의 표가 있을 때만 실행됩니다.
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

  admin := false;
  begin
    if auth.uid() is not null then
      select exists (
        select 1 from public.profiles
        where id = auth.uid() and is_admin is true
      ) into admin;
    end if;
  exception
    when undefined_table then
      admin := false;
    when undefined_column then
      admin := false;
  end;
  if not coalesce(admin, false) then
    admin := public.onmaeum_is_admin(p_password);
  end if;

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

grant execute on function public.onmaeum_get_inquiry(bigint, text) to anon, authenticated;
