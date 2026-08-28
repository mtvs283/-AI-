-- 기존 온마음 교사 회원 표에 활동 정보와 자격서류 종류를 추가합니다.
-- 2026-08-29 이후 가입 화면과 함께 한 번 실행합니다.

begin;

alter table public.profiles
  add column if not exists requested_membership_type text not null default 'general',
  add column if not exists membership_type text not null default 'general',
  add column if not exists activity_region text not null default 'not_set',
  add column if not exists workplace_type text not null default 'not_set';

alter table public.teacher_verifications
  add column if not exists document_type text not null default 'teacher_certificate';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_requested_membership_type_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles add constraint profiles_requested_membership_type_check
      check (requested_membership_type in ('general', 'teacher'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_membership_type_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles add constraint profiles_membership_type_check
      check (membership_type in ('general', 'teacher'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_activity_region_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles add constraint profiles_activity_region_check
      check (activity_region in ('not_set', 'seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan', 'sejong', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju', 'overseas'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_workplace_type_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles add constraint profiles_workplace_type_check
      check (workplace_type in ('not_set', 'center', 'university_language_institute', 'school', 'private_academy', 'kiip', 'corporate_public', 'online', 'freelance', 'other'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'teacher_verifications_document_type_check'
      and conrelid = 'public.teacher_verifications'::regclass
  ) then
    alter table public.teacher_verifications add constraint teacher_verifications_document_type_check
      check (document_type in ('teacher_certificate', 'qualification_confirmation'));
  end if;
end
$$;

create or replace function private.handle_new_onmaeum_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, display_name, requested_membership_type, activity_region, workplace_type)
  values (
    new.id,
    left(coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), '이름 미입력'), 60),
    left(coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), '새 선생님'), 40),
    case when new.raw_user_meta_data ->> 'signup_intent' = 'teacher' then 'teacher' else 'general' end,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'activity_region'), ''), 'not_set'),
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'workplace_type'), ''), 'not_set')
  );
  return new;
end;
$$;

revoke all on function private.handle_new_onmaeum_user() from public, anon, authenticated;

revoke update on public.profiles from authenticated;
grant update (requested_membership_type, activity_region, workplace_type) on public.profiles to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
      and policyname = 'members_update_own_activity_profile'
  ) then
    create policy "members_update_own_activity_profile"
    on public.profiles for update
    to authenticated
    using ((select auth.uid()) = id)
    with check ((select auth.uid()) = id);
  end if;
end
$$;

commit;
