-- Only verified registered teachers can apply. No email, cron or notification triggers.
create table public.capcut_class_requests (
  user_id uuid primary key references auth.users(id) on delete cascade,
  note text not null default '' check(length(note)<=1000),
  created_at timestamptz not null default now()
);
alter table public.capcut_class_requests enable row level security;
revoke all on public.capcut_class_requests from public,anon,authenticated;
grant select on public.capcut_class_requests to authenticated;
grant insert(user_id,note) on public.capcut_class_requests to authenticated;
create policy teachers_read_own_class_request on public.capcut_class_requests for select to authenticated
using(user_id=(select auth.uid()));
create policy verified_teachers_apply_for_class on public.capcut_class_requests for insert to authenticated
with check(user_id=(select auth.uid()) and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.membership_type='teacher' and p.verification_status='verified'));

create function public.onmaeum_admin_capcut_class_requests()
returns table(user_id uuid,name text,email text,note text,created_at timestamptz)
language plpgsql security definer set search_path='' as $$
begin
  if not public.onmaeum_is_admin(null) then raise exception '관리자만 확인할 수 있습니다.' using errcode='42501'; end if;
  return query select r.user_id,coalesce(nullif(p.full_name,''),nullif(p.display_name,''),'등록 교사'),u.email::text,r.note,r.created_at
  from public.capcut_class_requests r join public.profiles p on p.id=r.user_id join auth.users u on u.id=r.user_id order by r.created_at;
end $$;
revoke all on function public.onmaeum_admin_capcut_class_requests() from public,anon,authenticated;
grant execute on function public.onmaeum_admin_capcut_class_requests() to authenticated;

-- Supersede the previous teacher-only notice and remove personal purchase details.
update public.teacher_announcements set is_active=false,
title='캡컷 블랙프라이데이 할인 안내',
body=E'캡컷 공식 행사 기간은 2026년 10월 20일부터 30일까지입니다.\n할인 조건과 갱신 요금은 캡컷 결제 화면에서 확인해 주세요.\n캡컷 기초 강의는 인증 완료된 등록 교사만 신청할 수 있습니다.'
where slug='capcut-2026-10-24';
