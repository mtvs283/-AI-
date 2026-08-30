-- 자료공유: 로그인한 회원은 제목 목록만, 설명·파일 경로는 인증 교사만 받습니다.
-- 온마음 회원용 SQL Editor에서 이 파일 전체를 실행합니다.

create or replace function public.onmaeum_list_shared_materials()
returns table (
  title text,
  category text,
  note text,
  file_path text,
  file_name text,
  created_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  verified boolean := false;
begin
  if auth.uid() is null then
    return;
  end if;

  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and membership_type = 'teacher'
      and verification_status = 'verified'
  ) into verified;

  return query
  select
    s.title,
    s.category,
    case when verified then s.note else null end,
    case when verified then s.file_path else null end,
    case when verified then s.file_name else null end,
    s.created_at
  from public.shared_materials s
  order by s.created_at desc
  limit 12;
end;
$$;

revoke all on function public.onmaeum_list_shared_materials() from public, anon;
grant execute on function public.onmaeum_list_shared_materials() to authenticated;

revoke select on public.shared_materials from authenticated;
grant insert on public.shared_materials to authenticated;
