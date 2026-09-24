-- 문의 게시판: 관리자가 답변을 등록해도 저장되지 않던 문제를 고칩니다.
-- 온마음 회원용 SQL Editor에서 이 파일 전체를 실행합니다.
--
-- 원인: onmaeum_answer_inquiry가 onmaeum_inquiry_settings.resend_api_key를 읽는데
-- 그 컬럼은 어느 SQL에서도 만들지 않습니다. 없는 필드를 읽는 순간 함수 전체가
-- 실패하고, 같은 트랜잭션이라 앞서 실행한 답변 저장까지 되돌아갔습니다.
--
-- 해결: 다른 메일 기능과 같이 Vault의 onmaeum_resend_api_key를 씁니다.
-- 메일은 보조 기능이므로 발송에 실패해도 답변은 남깁니다.
-- 반환값은 메일을 실제로 접수했는지를 뜻합니다.

create extension if not exists pg_net with schema extensions;

create or replace function public.onmaeum_answer_inquiry(
  p_id bigint,
  p_password text,
  p_answer text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  r public.onmaeum_inquiries%rowtype;
  api_key text;
  mailed boolean := false;
  html text;
begin
  if p_answer is null or length(trim(p_answer)) = 0 then
    raise exception '답변 내용을 입력하세요.';
  end if;

  if not public.onmaeum_is_admin(p_password) then
    raise exception '관리자만 답변할 수 있습니다.';
  end if;

  update public.onmaeum_inquiries
  set answer = trim(p_answer), answered_at = now()
  where onmaeum_inquiries.id = p_id
  returning * into r;

  if not found then
    raise exception '글을 찾을 수 없습니다.';
  end if;

  begin
    select decrypted_secret into api_key
    from vault.decrypted_secrets
    where name = 'onmaeum_resend_api_key';

    if r.email is not null
       and api_key is not null
       and api_key like 're_%' then
      html :=
        '<p>' || coalesce(r.name, '') || ' 선생님, 문의에 답변드립니다.</p>'
        || '<p><b>문의 제목:</b> ' || coalesce(r.title, '') || '</p>'
        || '<p style="white-space:pre-wrap">' || replace(trim(p_answer), chr(10), '<br>') || '</p>'
        || '<p>— 한국어교육AI연구개발원</p>'
        || '<p><a href="https://www.onmaeumkr.com/board.html">게시판 열기</a></p>';

      perform net.http_post(
        url := 'https://api.resend.com/emails',
        headers := jsonb_build_object(
          'Authorization', 'Bearer ' || api_key,
          'Content-Type', 'application/json',
          'Idempotency-Key', 'inquiry-answer/' || gen_random_uuid()::text
        ),
        body := jsonb_build_object(
          'from', '온마음 문의 <noreply@onmaeumkr.com>',
          'to', jsonb_build_array(r.email),
          'subject', '[온마음] 문의 답변: ' || coalesce(r.title, ''),
          'html', html
        ),
        timeout_milliseconds := 10000
      );
      mailed := true;
    end if;
  exception
    when others then
      mailed := false;
  end;

  return mailed;
end;
$$;

grant execute on function public.onmaeum_answer_inquiry(bigint, text, text) to anon, authenticated;
