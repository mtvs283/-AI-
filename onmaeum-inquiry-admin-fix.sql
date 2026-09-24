-- 문의 게시판: 관리자로 로그인해도 비밀글이 열리지 않던 문제를 고칩니다.
-- 온마음 회원용 SQL Editor에서 이 파일 전체를 실행합니다.
--
-- 원인: onmaeum_get_inquiry의 반환 컬럼 이름에 id가 있어서, 함수 안의
-- `where id = auth.uid()`에서 id가 반환 변수인지 profiles의 컬럼인지 모호해집니다.
-- PostgreSQL은 이때 오류를 냅니다. 이 문장은 로그인한 사용자일 때만 실행되므로
-- 비로그인 방문자는 정상이고 관리자만 실패했습니다.
--
-- 해결: 모호한 문장을 없애고, 관리자 판별은 onmaeum_is_admin 하나로 모읍니다.

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
        from public.profiles p
        where p.id = auth.uid()
          and p.is_admin is true
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
  site_admin boolean;
begin
  select * into r from public.onmaeum_inquiries where onmaeum_inquiries.id = p_id;
  if not found then
    raise exception '글을 찾을 수 없습니다.';
  end if;

  site_admin := coalesce(public.onmaeum_is_admin(p_password), false);

  if r.is_secret and not site_admin then
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
    case when site_admin or not r.is_secret then r.email else null end,
    r.content,
    r.is_secret,
    r.answer,
    r.answered_at,
    r.created_at;
end;
$$;

revoke all on function public.onmaeum_is_admin(text) from public;
grant execute on function public.onmaeum_is_admin(text) to anon, authenticated;
grant execute on function public.onmaeum_get_inquiry(bigint, text) to anon, authenticated;
