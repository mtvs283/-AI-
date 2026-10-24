create table public.teacher_announcements (
  slug text primary key,
  title text not null,
  body text not null,
  published_at timestamptz not null default now(),
  is_active boolean not null default true
);
alter table public.teacher_announcements enable row level security;
revoke all on public.teacher_announcements from public, anon, authenticated;
grant select on public.teacher_announcements to authenticated;
create policy verified_teacher_read on public.teacher_announcements
for select to authenticated using (
  is_active and exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid())
      and p.membership_type = 'teacher'
      and p.verification_status = 'verified'
  )
);
