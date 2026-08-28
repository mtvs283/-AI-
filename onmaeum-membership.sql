-- 온마음 한국어 교사 회원과 자격증 인증 구조
-- Supabase SQL Editor에서 전체 실행한 뒤 account.html의 가입 흐름을 테스트합니다.

begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  display_name text not null,
  requested_membership_type text not null default 'general'
    check (requested_membership_type in ('general', 'teacher')),
  membership_type text not null default 'general'
    check (membership_type in ('general', 'teacher')),
  activity_region text not null default 'not_set'
    check (activity_region in ('not_set', 'seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan', 'sejong', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju', 'overseas')),
  workplace_type text not null default 'not_set'
    check (workplace_type in ('not_set', 'center', 'university_language_institute', 'school', 'private_academy', 'kiip', 'corporate_public', 'online', 'freelance', 'other')),
  verification_status text not null default 'not_submitted'
    check (verification_status in ('not_submitted', 'pending', 'verified', 'rejected')),
  seller_status text not null default 'inactive'
    check (seller_status in ('inactive', 'pending', 'active', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.profiles.id is
  '회원의 영구 식별자. 향후 주문, 결제 고객, 판매자 정산 정보를 이 값에 연결한다.';

create table if not exists public.teacher_verifications (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  file_path text not null,
  original_file_name text not null,
  document_type text not null
    check (document_type in ('teacher_certificate', 'qualification_confirmation')),
  status text not null default 'pending'
    check (status in ('pending', 'verified', 'rejected')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewer_id uuid references auth.users(id),
  review_note text
);

alter table public.profiles enable row level security;
alter table public.teacher_verifications enable row level security;

create policy "members_read_own_profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

create policy "members_update_own_activity_profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "members_read_own_verification"
on public.teacher_verifications for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "members_submit_own_verification"
on public.teacher_verifications for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and split_part(file_path, '/', 1) = (select auth.uid())::text
  and status = 'pending'
  and reviewer_id is null
  and reviewed_at is null
  and review_note is null
);

create policy "members_resubmit_own_verification"
on public.teacher_verifications for update
to authenticated
using (
  (select auth.uid()) = user_id
  and status in ('pending', 'rejected')
)
with check (
  (select auth.uid()) = user_id
  and split_part(file_path, '/', 1) = (select auth.uid())::text
  and status = 'pending'
  and reviewer_id is null
  and reviewed_at is null
  and review_note is null
);

grant select on public.profiles to authenticated;
revoke update on public.profiles from authenticated;
grant update (requested_membership_type, activity_region, workplace_type) on public.profiles to authenticated;
grant select, insert, update on public.teacher_verifications to authenticated;

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

create trigger on_auth_user_created_onmaeum
  after insert on auth.users
  for each row execute procedure private.handle_new_onmaeum_user();

-- 회원 기능을 붙이기 전에 만들어진 기존 Auth 사용자가 있다면 프로필을 보완합니다.
insert into public.profiles (id, full_name, display_name, requested_membership_type, activity_region, workplace_type)
select
  u.id,
  left(coalesce(nullif(trim(u.raw_user_meta_data ->> 'full_name'), ''), '이름 미입력'), 60),
  left(coalesce(nullif(trim(u.raw_user_meta_data ->> 'display_name'), ''), '새 선생님'), 40),
  case when u.raw_user_meta_data ->> 'signup_intent' = 'teacher' then 'teacher' else 'general' end,
  coalesce(nullif(trim(u.raw_user_meta_data ->> 'activity_region'), ''), 'not_set'),
  coalesce(nullif(trim(u.raw_user_meta_data ->> 'workplace_type'), ''), 'not_set')
from auth.users u
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'teacher-certificates',
  'teacher-certificates',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "teachers_upload_own_certificate"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'teacher-certificates'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "teachers_read_own_certificate"
on storage.objects for select
to authenticated
using (
  bucket_id = 'teacher-certificates'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "teachers_replace_own_certificate"
on storage.objects for update
to authenticated
using (
  bucket_id = 'teacher-certificates'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'teacher-certificates'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

-- 운영자 승인은 브라우저의 공개 키로 처리하지 않습니다.
-- 관리자 화면 또는 서버 함수에서만 teacher_verifications.status와
-- profiles.verification_status, profiles.membership_type을 함께 변경해야 합니다.

commit;
