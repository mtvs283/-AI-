-- 새 회원의 네이버 교원카페 닉네임을 필수로 받고 관리자 교사 인증 목록에 표시합니다.
-- 기존 회원은 값이 없으므로 관리자 화면에서 '미입력'으로 표시합니다.
begin;

alter table public.profiles
  add column if not exists naver_teacher_cafe_nickname text;

comment on column public.profiles.naver_teacher_cafe_nickname is
  '가입 확인을 위해 회원이 입력한 네이버 교원카페 닉네임. 기존 회원은 null일 수 있다.';

create or replace function private.handle_new_onmaeum_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if nullif(trim(new.raw_user_meta_data ->> 'naver_teacher_cafe_nickname'), '') is null then
    raise exception '네이버 교원카페 닉네임을 입력해 주세요.';
  end if;

  insert into public.profiles (
    id, full_name, display_name, naver_teacher_cafe_nickname,
    requested_membership_type, activity_region, activity_regions, workplace_type
  )
  values (
    new.id,
    left(coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), '이름 미입력'), 60),
    left(coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), '새 선생님'), 40),
    left(trim(new.raw_user_meta_data ->> 'naver_teacher_cafe_nickname'), 50),
    case when new.raw_user_meta_data ->> 'signup_intent' = 'teacher' then 'teacher' else 'general' end,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'activity_region'), ''), 'not_set'),
    case
      when jsonb_typeof(new.raw_user_meta_data -> 'activity_regions') = 'array'
      then array(select jsonb_array_elements_text(new.raw_user_meta_data -> 'activity_regions'))
      else array[]::text[]
    end,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'workplace_type'), ''), 'not_set')
  );
  return new;
end;
$$;

revoke all on function private.handle_new_onmaeum_user() from public, anon, authenticated;

drop function if exists public.onmaeum_admin_list_verifications();
create function public.onmaeum_admin_list_verifications()
returns table (
  user_id uuid,
  email text,
  full_name text,
  display_name text,
  naver_teacher_cafe_nickname text,
  activity_region text,
  activity_regions text[],
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
set search_path = ''
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
    p.naver_teacher_cafe_nickname,
    p.activity_region,
    p.activity_regions,
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

revoke all on function public.onmaeum_admin_list_verifications() from public, anon;
grant execute on function public.onmaeum_admin_list_verifications() to authenticated;

commit;
