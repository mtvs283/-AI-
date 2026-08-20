-- 온마음 문의: 관리자 답변 저장 + 작성자에게 메일

create or replace function public.onmaeum_answer_inquiry(
  p_id bigint,
  p_password text,
  p_answer text
)
returns boolean
language plpgsql
security definer
set search_path = public, net, extensions
as $$
declare
  r public.onmaeum_inquiries%rowtype;
  s public.onmaeum_inquiry_settings%rowtype;
  html text;
begin
  if p_answer is null or length(trim(p_answer)) = 0 then
    raise exception '답변 내용을 입력하세요.';
  end if;
  if not public.onmaeum_is_admin(p_password) then
    raise exception '관리자만 답변할 수 있습니다.';
  end if;

  select * into r from public.onmaeum_inquiries where id = p_id;
  if not found then
    raise exception '글을 찾을 수 없습니다.';
  end if;

  update public.onmaeum_inquiries
  set answer = trim(p_answer), answered_at = now()
  where id = p_id;

  select * into s from public.onmaeum_inquiry_settings where id = 1;

  if r.email is not null
     and s.resend_api_key is not null
     and s.resend_api_key like 're_%' then
    html :=
      '<p>' || coalesce(r.name, '') || ' 선생님, 문의에 답변드립니다.</p>'
      || '<p><b>문의 제목:</b> ' || coalesce(r.title, '') || '</p>'
      || '<p style="white-space:pre-wrap">' || replace(trim(p_answer), chr(10), '<br>') || '</p>'
      || '<p>— 한국어교육AI연구개발원</p>'
      || '<p><a href="https://www.onmaeumkr.com/board.html">게시판 열기</a></p>';

    perform net.http_post(
      url := 'https://api.resend.com/emails',
      headers := jsonb_build_object(
        'Authorization', 'Bearer ' || s.resend_api_key,
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'from', '온마음 문의 <noreply@onmaeumkr.com>',
        'to', ARRAY[r.email],
        'subject', '[온마음] 문의 답변: ' || coalesce(r.title, ''),
        'html', html
      )
    );
  end if;

  return true;
end;
$$;

grant execute on function public.onmaeum_answer_inquiry(bigint, text, text) to anon, authenticated;
