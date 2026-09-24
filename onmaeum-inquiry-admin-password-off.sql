-- 문의 게시판: 공용 관리자 비밀번호를 없애고 회원 로그인만 관리자로 인정합니다.
-- onmaeum-inquiry-admin-fix.sql을 먼저 실행하고, 관리자 로그인으로 비밀글이
-- 열리는 것을 확인한 다음에 이 파일을 실행합니다.
--
-- 이유: onmaeum-inquiries.sql은 관리자 비밀번호 초기값 onmaeum-admin을 넣습니다.
-- 이 값은 공개 저장소의 SQL 파일에 그대로 적혀 있어, 누구나 그 비밀번호로
-- 모든 비밀글의 본문과 작성자 이메일을 읽을 수 있습니다.
-- 로그인 기반 관리자(profiles.is_admin)만 남기고 이 통로를 막습니다.

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
  -- p_password는 더 이상 관리자 인증에 쓰지 않습니다.
  -- 비밀글 작성자의 글 비밀번호 확인은 onmaeum_get_inquiry가 따로 처리합니다.
  if auth.uid() is null then
    return false;
  end if;

  begin
    select exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    ) into ok;
  exception
    when undefined_table then
      return false;
    when undefined_column then
      return false;
  end;

  return coalesce(ok, false);
end;
$$;

revoke all on function public.onmaeum_is_admin(text) from public;
grant execute on function public.onmaeum_is_admin(text) to anon, authenticated;

-- 저장된 공용 관리자 비밀번호 해시를 비웁니다.
-- 표를 만들 때 not null이었으므로 제약을 먼저 풉니다.
alter table public.onmaeum_inquiry_settings
  alter column admin_password_hash drop not null;

update public.onmaeum_inquiry_settings
set admin_password_hash = null
where id = 1;
