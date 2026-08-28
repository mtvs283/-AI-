-- 온마음 교사 협업 공간 전체에 회원 등급별 접근 권한을 적용합니다.
-- 비로그인은 접근 불가, 일반 회원은 목록 열람만, 인증 교사는 열람·등록·파일 이용이 가능합니다.

begin;

alter table public.shared_materials enable row level security;
alter table public.material_requests enable row level security;
alter table public.worry_posts enable row level security;
alter table public.worry_comments enable row level security;

drop policy if exists "allow public insert shared materials" on public.shared_materials;
drop policy if exists "allow public read shared materials" on public.shared_materials;
drop policy if exists "shared_materials insert" on public.shared_materials;
drop policy if exists "shared_materials read" on public.shared_materials;

drop policy if exists "allow public insert material requests" on public.material_requests;
drop policy if exists "allow public read material requests" on public.material_requests;
drop policy if exists "material_requests insert" on public.material_requests;
drop policy if exists "material_requests read" on public.material_requests;

drop policy if exists "worry_posts insert" on public.worry_posts;
drop policy if exists "worry_posts read" on public.worry_posts;
drop policy if exists "worry_comments insert" on public.worry_comments;
drop policy if exists "worry_comments read" on public.worry_comments;

revoke all on public.shared_materials from anon, authenticated;
revoke all on public.material_requests from anon, authenticated;
revoke all on public.worry_posts from anon, authenticated;
revoke all on public.worry_comments from anon, authenticated;

grant select, insert on public.shared_materials to authenticated;
grant select, insert on public.material_requests to authenticated;
grant select, insert on public.worry_posts to authenticated;
grant select, insert on public.worry_comments to authenticated;

create policy "members_read_shared_materials"
on public.shared_materials for select
to authenticated
using (true);

create policy "verified_teachers_add_shared_materials"
on public.shared_materials for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and membership_type = 'teacher'
      and verification_status = 'verified'
  )
);

create policy "members_read_material_requests"
on public.material_requests for select
to authenticated
using (true);

create policy "verified_teachers_add_material_requests"
on public.material_requests for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and membership_type = 'teacher'
      and verification_status = 'verified'
  )
);

create policy "members_read_worry_posts"
on public.worry_posts for select
to authenticated
using (true);

create policy "verified_teachers_add_worry_posts"
on public.worry_posts for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and membership_type = 'teacher'
      and verification_status = 'verified'
  )
);

create policy "members_read_worry_comments"
on public.worry_comments for select
to authenticated
using (true);

create policy "verified_teachers_add_worry_comments"
on public.worry_comments for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and membership_type = 'teacher'
      and verification_status = 'verified'
  )
);

drop policy if exists "allow public read teaching materials" on storage.objects;
drop policy if exists "allow public upload teaching materials" on storage.objects;

create policy "verified_teachers_read_teaching_materials"
on storage.objects for select
to authenticated
using (
  bucket_id = 'teaching-materials'
  and exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and membership_type = 'teacher'
      and verification_status = 'verified'
  )
);

create policy "verified_teachers_upload_teaching_materials"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'teaching-materials'
  and exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and membership_type = 'teacher'
      and verification_status = 'verified'
  )
);

commit;
