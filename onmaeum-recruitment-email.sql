-- 새 구인공고 -> 활동지역이 맞는 인증 교사 -> 5분 단위 개인별 묶음 메일.
-- 이전 공고는 소급 발송하지 않음. 같은 회원/원문 URL은 한 번만 발송.
begin;
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron;
alter table public.profiles add column if not exists recruitment_email_enabled boolean not null default true;
grant update (recruitment_email_enabled) on public.profiles to authenticated;

create table if not exists private.recruitment_email_config (
 id integer primary key check(id=1), baseline_id bigint not null
);
insert into private.recruitment_email_config values (1, (select coalesce(max(id),0) from public.recruitment_notices)) on conflict do nothing;
create table if not exists private.recruitment_email_batches (
 id uuid primary key default gen_random_uuid(), payload jsonb not null,
 request_id bigint, status text not null default 'queued', attempts integer not null default 0,
 created_at timestamptz not null default now(), last_attempt_at timestamptz, http_status integer
);
create table if not exists private.recruitment_email_queue (
 user_id uuid not null references public.profiles(id) on delete cascade,
 source_url text not null, notice_id bigint references public.recruitment_notices(id) on delete set null,
 batch_id uuid references private.recruitment_email_batches(id),
 status text not null default 'pending', created_at timestamptz not null default now(),
 primary key(user_id, source_url)
);
alter table private.recruitment_email_config enable row level security;
alter table private.recruitment_email_batches enable row level security;
alter table private.recruitment_email_queue enable row level security;
revoke all on private.recruitment_email_config, private.recruitment_email_batches, private.recruitment_email_queue from public, anon, authenticated;
create index if not exists recruitment_email_pending_idx on private.recruitment_email_queue(status, created_at);

create or replace function private.recruitment_region_codes(region text)
returns text[] language sql immutable set search_path = '' as $$
 select coalesce(array_agg(distinct code),array[]::text[]) from (
 select r.code from regexp_split_to_table(lower(coalesce(region,'')), '[,/;|·]+') token
 cross join (values
 ('seoul','서울(특별시)?|seoul'),('busan','부산(광역시)?|busan'),('daegu','대구(광역시)?|daegu'),
 ('incheon','인천(광역시)?|incheon'),('gwangju','광주(광역시)?|gwangju'),('daejeon','대전(광역시)?|daejeon'),
 ('ulsan','울산(광역시)?|ulsan'),('sejong','세종(특별자치시)?|sejong'),('gyeonggi','경기(도)?|gyeonggi'),
 ('gangwon','강원(도|특별자치도)?|gangwon'),('chungbuk','충북|충청북도|chungbuk'),('chungnam','충남|충청남도|chungnam'),
 ('jeonbuk','전북(특별자치도)?|전라북도|jeonbuk'),('jeonnam','전남|전라남도|jeonnam'),
 ('gyeongbuk','경북|경상북도|gyeongbuk'),('gyeongnam','경남|경상남도|gyeongnam'),
 ('jeju','제주(도|특별자치도)?|jeju'),('online','온라인|완전[[:space:]]*재택|online'),('overseas','해외|overseas')
 ) r(code, pattern)
 where trim(token) ~ ('^(' || r.pattern || ')([[:space:]]|$)')
 union select unnest(array['seoul','busan','daegu','incheon','gwangju','daejeon','ulsan','sejong','gyeonggi','gangwon','chungbuk','chungnam','jeonbuk','jeonnam','gyeongbuk','gyeongnam','jeju'])
 where trim(coalesce(region,'')) = '전국'
 ) matched;
$$;
revoke all on function private.recruitment_region_codes(text) from public, anon, authenticated;

create or replace function private.recruitment_html(value text)
returns text language sql immutable set search_path = '' as $$
 select replace(replace(replace(replace(replace(coalesce(value,''),'&','&amp;'),'<','&lt;'),'>','&gt;'),'"','&quot;'),'''','&#39;');
$$;
revoke all on function private.recruitment_html(text) from public, anon, authenticated;

create or replace function private.enqueue_recruitment_email()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
 if new.id <= (select baseline_id from private.recruitment_email_config where id=1)
   or (new.deadline is not null and new.deadline < (now() at time zone 'Asia/Seoul')::date)
   or new.source_url !~ '^https?://' then return new; end if;
 insert into private.recruitment_email_queue(user_id,source_url,notice_id)
 select p.id,new.source_url,new.id from public.profiles p join auth.users u on u.id=p.id
 where p.membership_type='teacher' and p.verification_status='verified' and p.recruitment_email_enabled
   and u.email_confirmed_at is not null and nullif(trim(u.email),'') is not null
   and coalesce(nullif(p.activity_regions,array[]::text[]), array[p.activity_region]) && private.recruitment_region_codes(new.region)
 on conflict(user_id,source_url) do nothing;
 return new;
end; $$;
revoke all on function private.enqueue_recruitment_email() from public, anon, authenticated;
create or replace trigger enqueue_recruitment_email after insert or update of region, deadline on public.recruitment_notices
for each row execute function private.enqueue_recruitment_email();

create or replace function private.dispatch_recruitment_emails()
returns void language plpgsql security definer set search_path = '' as $$
declare b record; response record; api_key text; body jsonb; batch uuid; requested bigint; new_status text;
begin
 if not pg_try_advisory_xact_lock(784123092) then return; end if;
 -- API 응답을 저장하고, 동일 본문/동일 idempotency key로만 일시 오류를 재시도합니다.
 for b in select * from private.recruitment_email_batches where status='sending' loop
   select * into response from net._http_response where id=b.request_id;
   if found then
     new_status := case when response.status_code between 200 and 299 and response.error_msg is null and not coalesce(response.timed_out,false) then 'accepted'
       when (response.status_code=429 or response.status_code>=500 or response.status_code is null) and b.attempts<3 then 'retry'
       else 'failed' end;
     update private.recruitment_email_batches set status=new_status,http_status=response.status_code,
       payload=case when new_status in ('accepted','failed') then '[]'::jsonb else payload end where id=b.id;
     update private.recruitment_email_queue set status=new_status where batch_id=b.id;
   elsif b.last_attempt_at < now()-interval '2 minutes' then
     update private.recruitment_email_batches set status=case when attempts<3 then 'retry' else 'unknown' end where id=b.id;
     update private.recruitment_email_queue set status=case when b.attempts<3 then 'retry' else 'unknown' end where batch_id=b.id;
   end if;
 end loop;
 select decrypted_secret into api_key from vault.decrypted_secrets where name='onmaeum_resend_api_key';
 if api_key is null or api_key not like 're_%' then return; end if;
 -- 24시간을 넘긴 요청은 중복 위험 때문에 자동 재전송하지 않습니다.
 update private.recruitment_email_batches set status='unknown',payload='[]'::jsonb where status='retry' and created_at<now()-interval '23 hours';
 update private.recruitment_email_queue q set status='unknown' from private.recruitment_email_batches expired_batch where q.batch_id=expired_batch.id and expired_batch.status='unknown';
 select * into b from private.recruitment_email_batches where status='retry' order by created_at limit 1;
 if found then
   -- 재시도 시 수신 거부/마감 등이 생긴 묶음은 본문을 바꾸지 않고 취소합니다.
   if exists(select 1 from private.recruitment_email_queue q
     left join public.profiles p on p.id=q.user_id left join auth.users u on u.id=q.user_id
     left join public.recruitment_notices n on n.id=q.notice_id
     where q.batch_id=b.id and (p.id is null or not p.recruitment_email_enabled or p.membership_type<>'teacher'
       or p.verification_status<>'verified' or u.email_confirmed_at is null or n.id is null
       or n.deadline < (now() at time zone 'Asia/Seoul')::date
       or not(coalesce(nullif(p.activity_regions,array[]::text[]),array[p.activity_region]) && private.recruitment_region_codes(n.region)))) then
     update private.recruitment_email_batches set status='skipped',payload='[]'::jsonb where id=b.id;
     update private.recruitment_email_queue set status='skipped' where batch_id=b.id;
     return;
   end if;
   batch:=b.id; body:=b.payload;
 else
   -- 대기 중 수신 거부, 지역 변경, 인증 취소, 마감 또는 삭제된 공고는 취소합니다.
   update private.recruitment_email_queue q set status='skipped' where q.status='pending' and not exists(
     select 1 from public.profiles p join auth.users u on u.id=p.id join public.recruitment_notices n on n.id=q.notice_id
     where p.id=q.user_id and p.recruitment_email_enabled and p.membership_type='teacher' and p.verification_status='verified'
       and u.email_confirmed_at is not null and nullif(trim(u.email),'') is not null and n.source_url ~ '^https?://'
       and (n.deadline is null or n.deadline >= (now() at time zone 'Asia/Seoul')::date)
       and coalesce(nullif(p.activity_regions,array[]::text[]),array[p.activity_region]) && private.recruitment_region_codes(n.region)
   );
   batch:=gen_random_uuid();
   if not exists(select 1 from private.recruitment_email_queue where status='pending') then return; end if;
   insert into private.recruitment_email_batches(id,payload) values(batch,'[]'::jsonb);
   -- 한 번에 최대 100개 공고/회원 조합을 개인별 한 통으로 묶습니다.
   with chosen as (update private.recruitment_email_queue q set batch_id=batch,status='sending'
     where (q.user_id,q.source_url) in (select user_id,source_url from private.recruitment_email_queue where status='pending' order by created_at,user_id,source_url limit 100)
     returning q.*),
   grouped as (
     select q.user_id,u.email,count(*) as cnt,
       string_agg('<li><strong>'||private.recruitment_html(n.position)||'</strong><br>'||private.recruitment_html(n.organization)||' · '||private.recruitment_html(n.region)||'<br>마감: '||coalesce(n.deadline::text,'공고문 확인')||'<br><a href="'||private.recruitment_html(n.source_url)||'">공고 원문 보기</a></li>','' order by n.id) as items
     from chosen q
     join public.recruitment_notices n on n.id=q.notice_id join auth.users u on u.id=q.user_id group by q.user_id,u.email
   ) select jsonb_agg(jsonb_build_object('from','한국어교육AI연구개발원 <noreply@onmaeumkr.com>','to',jsonb_build_array(email),
     'subject','[온마음] 활동지역 새 한국어강사 모집 공고 '||cnt||'건',
     'html','<h2>활동지역에 맞는 새 모집 공고입니다.</h2><ul>'||items||'</ul><p>지원 조건과 마감 여부는 각 기관의 원문에서 확인해 주세요.</p><p><a href="https://www.onmaeumkr.com/account.html">활동지역 변경 · 공고 알림 끄기</a></p><p>한국어교육AI연구개발원</p>')) into body from grouped;
   if body is null then raise exception '공고 메일 묶음을 만들지 못했습니다.'; end if;
   update private.recruitment_email_batches set payload=body where id=batch;
 end if;
 requested:=net.http_post(url:='https://api.resend.com/emails/batch',
   headers:=jsonb_build_object('Authorization','Bearer '||api_key,'Content-Type','application/json','Idempotency-Key','recruitment/'||batch::text),
   body:=body,timeout_milliseconds:=10000);
 update private.recruitment_email_batches set status='sending',request_id=requested,attempts=attempts+1,last_attempt_at=now() where id=batch;
 update private.recruitment_email_queue set status='sending' where batch_id=batch;
end; $$;
revoke all on function private.dispatch_recruitment_emails() from public, anon, authenticated;

create or replace function public.onmaeum_recruitment_email_summary()
returns jsonb language plpgsql security definer set search_path = '' as $$
begin
 if not public.onmaeum_is_admin(null) then raise exception '관리자만 확인할 수 있습니다.'; end if;
 return (select jsonb_build_object('pending',count(*) filter(where status='pending'),'sending',count(*) filter(where status in ('sending','retry')),
   'accepted',count(*) filter(where status='accepted'),'failed',count(*) filter(where status in ('failed','unknown')),
   'skipped',count(*) filter(where status='skipped')) from private.recruitment_email_queue);
end; $$;
revoke all on function public.onmaeum_recruitment_email_summary() from public,anon;
grant execute on function public.onmaeum_recruitment_email_summary() to authenticated;
select cron.schedule('onmaeum-recruitment-email','*/5 * * * *','select private.dispatch_recruitment_emails()');
commit;
