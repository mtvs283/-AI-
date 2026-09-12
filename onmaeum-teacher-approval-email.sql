-- 교사 인증 상태가 verified로 바뀔 때만 Resend 발송 요청을 저장합니다.
-- 기존 승인 함수/회원 권한은 변경하지 않습니다. 과거 승인 건은 발송하지 않습니다.
begin;
create extension if not exists pg_net with schema extensions;

create table if not exists private.teacher_approval_emails (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  request_id bigint,
  created_at timestamptz not null default now(),
  status text not null default 'queued',
  provider_id text
);
alter table private.teacher_approval_emails enable row level security;
revoke all on private.teacher_approval_emails from public, anon, authenticated;
create index if not exists teacher_approval_emails_user_created_idx
  on private.teacher_approval_emails(user_id, created_at desc);

create or replace function private.send_teacher_approval_email()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  recipient text;
  api_key text;
  email_id uuid := gen_random_uuid();
  queued_request bigint;
begin
  select email into recipient from auth.users where id = new.user_id;
  select decrypted_secret into api_key from vault.decrypted_secrets
    where name = 'onmaeum_resend_api_key';
  if nullif(trim(recipient), '') is null then
    raise exception '승인 안내를 받을 이메일이 없습니다. 회원 이메일을 확인해 주세요.';
  end if;
  if api_key is null or api_key not like 're_%' then
    raise exception 'Resend 메일 설정이 없어 승인하지 못했습니다. 발송 설정을 확인해 주세요.';
  end if;

  queued_request := net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || api_key,
      'Content-Type', 'application/json',
      'Idempotency-Key', 'teacher-approval/' || email_id::text
    ),
    body := jsonb_build_object(
      'from', '한국어교육AI연구개발원 <noreply@onmaeumkr.com>',
      'to', jsonb_build_array(recipient),
      'subject', '[온마음] 교사 회원 승인이 완료되었습니다',
      'text', E'안녕하세요, 선생님.\n\n한국어교육AI연구개발원 교사 회원 승인이 완료되었습니다.\n로그인 후 교사 회원 서비스를 이용하실 수 있습니다.\n\n내 계정: https://www.onmaeumkr.com/account.html\n\n함께해 주셔서 감사합니다.\n한국어교육AI연구개발원',
      'html', '<p>안녕하세요, 선생님.</p><h2>교사 회원 승인이 완료되었습니다.</h2><p>한국어교육AI연구개발원에 로그인하여 교사 회원 서비스를 이용해 주세요.</p><p><a href="https://www.onmaeumkr.com/account.html">로그인하고 내 계정 확인하기</a></p><p>함께해 주셔서 감사합니다.<br>한국어교육AI연구개발원</p>'
    ),
    timeout_milliseconds := 10000
  );
  insert into private.teacher_approval_emails(id, user_id, request_id)
    values (email_id, new.user_id, queued_request);
  return new;
end;
$$;
revoke all on function private.send_teacher_approval_email() from public, anon, authenticated;

create or replace trigger teacher_approval_email
after update of status on public.teacher_verifications
for each row when (new.status = 'verified' and old.status is distinct from 'verified')
execute function private.send_teacher_approval_email();

-- Resend의 API 접수 성공은 수신함 도착과 구별합니다.
-- pg_net 응답 보존 시간 내 조회한 결과를 영구 기록합니다.
create or replace function public.onmaeum_admin_approval_email_status(p_user_id uuid)
returns text language plpgsql security definer set search_path = ''
as $$
declare
  mail private.teacher_approval_emails%rowtype;
  response net._http_response%rowtype;
  result_status text;
begin
  if not public.onmaeum_is_admin(null) then
    raise exception '관리자만 확인할 수 있습니다.';
  end if;
  select * into mail from private.teacher_approval_emails
    where user_id = p_user_id order by created_at desc limit 1;
  if not found then return 'not_requested'; end if;
  if mail.status <> 'queued' then return mail.status; end if;
  select * into response from net._http_response where id = mail.request_id;
  if not found then
    return case when mail.created_at < now() - interval '1 minute' then 'unknown' else 'queued' end;
  end if;
  result_status := case when response.status_code between 200 and 299
    and coalesce(response.timed_out, false) = false and response.error_msg is null
    then 'accepted' else 'failed' end;
  update private.teacher_approval_emails set status = result_status
    where id = mail.id;
  return result_status;
end;
$$;
revoke all on function public.onmaeum_admin_approval_email_status(uuid) from public, anon;
grant execute on function public.onmaeum_admin_approval_email_status(uuid) to authenticated;
commit;
