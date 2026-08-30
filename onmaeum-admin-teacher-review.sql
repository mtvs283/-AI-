-- 관리자가 홈페이지에서 교사 자격 서류를 보고 승인·거절합니다.
-- 온마음 회원용 SQL Editor에서 이 파일 전체를 실행합니다.
-- 먼저 onmaeum-membership.sql, onmaeum-admin-role.sql이 있어야 합니다.

create or replace function public.onmaeum_admin_list_verifications()
returns table (
  user_id uuid,
  email text,
  full_name text,
  display_name text,
  activity_region text,
  workplace_type text,
  document_type text,
  file_path text,
  original_file_name text,
  status text,
  submitted_at timestamptz,
  review_note text
)
language plpgsql
stable
security definer
set search_path = public, auth
as $$
begin
  if not public.onmaeum_is_admin(null) then
    raise exception '관리자만 볼 수 있습니다.';
  end if;

  return query
  select
    v.user_id,
    u.email::text,
    p.full_name,
    p.display_name,
    p.activity_region,
    p.workplace_type,
    v.document_type,
    v.file_path,
    v.original_file_name,
    v.status,
    v.submitted_at,
    v.review_note
  from public.teacher_verifications v
  join public.profiles p on p.id = v.user_id
  join auth.users u on u.id = v.user_id
  order by
    case v.status when 'pending' then 0 when 'rejected' then 1 else 2 end,
    v.submitted_at desc;
end;
$$;

create or replace function public.onmaeum_admin_review_teacher(
  p_user_id uuid,
  p_approve boolean,
  p_note text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  found_row boolean := false;
begin
  if not public.onmaeum_is_admin(null) then
    raise exception '관리자만 처리할 수 있습니다.';
  end if;
  if p_user_id is null then
    raise exception '회원을 찾을 수 없습니다.';
  end if;

  if coalesce(p_approve, false) then
    update public.teacher_verifications
    set
      status = 'verified',
      reviewed_at = now(),
      reviewer_id = auth.uid(),
      review_note = nullif(trim(coalesce(p_note, '')), '')
    where user_id = p_user_id;
    found_row := found;

    update public.profiles
    set
      membership_type = 'teacher',
      verification_status = 'verified',
      requested_membership_type = 'teacher',
      updated_at = now()
    where id = p_user_id;
  else
    update public.teacher_verifications
    set
      status = 'rejected',
      reviewed_at = now(),
      reviewer_id = auth.uid(),
      review_note = nullif(trim(coalesce(p_note, '')), '')
    where user_id = p_user_id;
    found_row := found;

    update public.profiles
    set
      membership_type = 'general',
      verification_status = 'rejected',
      updated_at = now()
    where id = p_user_id;
  end if;

  if not found_row then
    raise exception '제출된 서류를 찾을 수 없습니다.';
  end if;
end;
$$;

revoke all on function public.onmaeum_admin_list_verifications() from public, anon;
revoke all on function public.onmaeum_admin_review_teacher(uuid, boolean, text) from public, anon;
grant execute on function public.onmaeum_admin_list_verifications() to authenticated;
grant execute on function public.onmaeum_admin_review_teacher(uuid, boolean, text) to authenticated;

drop policy if exists "admins_read_teacher_certificates" on storage.objects;
create policy "admins_read_teacher_certificates"
on storage.objects for select
to authenticated
using (
  bucket_id = 'teacher-certificates'
  and exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and is_admin is true
  )
);
