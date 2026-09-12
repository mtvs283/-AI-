# 한국어교육AI연구개발원 홈페이지

업로드 파일:
- index.html
- account.html
- admin.html
- board.html
- jamo-demo.html
- favicon.ico
- favicon.png
- favicon-32.png
- apple-touch-icon.png
- audio/jamo/
- videos/vowel_demo.mp4
- logo.png
- hero-bg.png
- README.md

교사 회원 기능:
- `onmaeum-membership.sql`을 Supabase SQL Editor에서 먼저 실행합니다.
- `onmaeum-platform-access-control.sql`은 교사 협업 공간의 표와 파일 저장소에 회원 등급별 접근 정책을 적용합니다.
- `onmaeum-shared-materials-preview.sql`은 자료공유 목록에서 설명·파일 경로를 인증 교사만 받게 합니다.
- `onmaeum-recruitment-notices.sql`은 한국어강사 모집 공고 표와 동기화 함수를 만듭니다. 실행 후 파일 안의 주석 INSERT로 동기화 키를 따로 넣습니다.
- `onmaeum-admin-role.sql`은 회원 로그인을 관리자 권한으로 씁니다. 실행 후 주석 UPDATE로 관리자 이메일을 지정합니다. `board.html`의 관리자 비밀번호 창은 쓰지 않습니다.
- `onmaeum-admin-teacher-review.sql`은 관리자가 `admin.html`에서 교사 자격 서류를 보고 승인·거절할 수 있게 합니다.
- `onmaeum-teacher-approval-email.sql`은 교사 승인 상태로 바뀔 때 Resend로 안내 메일을 요청합니다. Supabase Vault에 `onmaeum_resend_api_key`를 저장한 다음 실행합니다. 키 값은 소스나 SQL 편집기에 넣지 않습니다.
- 승인 메일은 `noreply@onmaeumkr.com`에서 발송하며 로그인 링크를 포함합니다. 이미 승인된 신청을 다시 승인하거나 거절할 때는 발송하지 않습니다. 과거 승인 건에도 소급 발송하지 않습니다.
- 관리자 화면의 전체 목록에서 신청을 펼치면 메일 상태를 볼 수 있습니다. `접수 완료`는 Resend API의 성공 응답이며 수신함 도착 보장은 아닙니다. 실패·확인 필요 상태는 Resend Emails/Logs에서 확인합니다. 자동 재시도는 하지 않습니다.
- 키 누락이나 발송 요청 저장 오류는 승인을 중단합니다. 비동기 발송 실패가 나중에 발생해도 이미 완료된 승인을 취소하지 않습니다. 발송 요청은 `private.teacher_approval_emails`에 기록되며 API 키와 이메일 본문은 이 기록에 저장하지 않습니다. pg_net 응답은 보존 시간이 있으므로 결과를 오래 지나 조회하면 `확인 필요`로 나올 수 있습니다.
- `account.html`에서 이메일 회원가입, 로그인, 교원자격증 또는 교원자격확인서 한 파일 제출을 처리합니다.
- 가입할 때 일반 회원 또는 교사 회원을 선택합니다.
- 새 회원은 가입 확인을 위해 네이버 교원카페 닉네임을 필수로 입력하며, 관리자는 교사 인증 화면에서 이를 확인합니다. 기존 회원은 `미입력`으로 표시됩니다.
- `requested_membership_type`에는 선택·신청 유형을, `membership_type`에는 실제 승인된 현재 등급을 각각 저장합니다.
- 일반 회원은 자격 서류 없이 가입할 수 있으며 자료 목록과 소개만 열람할 수 있습니다.
- 교사 회원 전환 때 주 활동 지역과 주 근무 유형을 입력합니다.
- 교원자격증 또는 교원자격확인서 중 하나를 반드시 제출하고 관리자 확인이 끝나면 교사 등급으로 전환됩니다.
- 자격증은 비공개 `teacher-certificates` Storage 버킷에 회원별 폴더로 저장합니다.
- 향후 주문·결제·정산 테이블은 `profiles.id`를 회원 식별자로 연결합니다.

교사 협업 공간 접근 범위:
- 비로그인 방문자: 홈페이지·기관 소개·공개 문의 이용, 교사 협업 자료 목록 접근 불가
- 일반 회원: 수업자료 요청·자료공유·수업 고민·강사 모집 공고 목록 열람 가능. 자료공유는 제목·종류·날짜만 보이고 설명·파일은 불가. 등록·댓글·파일 이용 불가
- 인증 완료 교사 회원: 목록 열람, 요청·자료·고민·댓글 등록, 수업자료 파일 업로드·이용 가능
- 교사로 가입했더라도 `verification_status = 'verified'`가 되기 전에는 일반 회원과 같은 범위만 이용합니다.
- 화면 표시와 별개로 Supabase RLS와 권한 정책에서 같은 규칙을 강제합니다.

Supabase Auth 설정:
- Site URL: `https://www.onmaeumkr.com`
- Redirect URLs: `https://www.onmaeumkr.com/account.html`, `https://onmaeumkr.com/account.html`
- 실제 가입 전 이메일 확인 기능이 켜져 있는지 확인합니다.
- 회원이 늘어나기 전 전용 SMTP와 한국어 인증 메일 문구를 설정합니다.

운영 전 확인:
- 개인정보처리방침에 회원정보와 교원자격증의 수집 목적, 보관기간, 파기방법을 명시합니다.
- 자료 테이블과 비공개 파일 버킷은 `membership_type = 'teacher'`이면서 `verification_status = 'verified'`인 회원만 등록·파일 이용이 가능하도록 서버 권한을 유지합니다.
- 실제 결제·정산 정보는 브라우저 회원정보가 아니라 선택한 결제사의 서버 연동으로 처리합니다.

신라문화체 파일은 별도로 GitHub 루트에 `Shilla_Culture(B).ttf` 이름 그대로 업로드해야 큰 제목에 적용됩니다.

활동지역 구인공고 이메일:
- `onmaeum-recruitment-email.sql`은 기존 회원·공고·승인 메일 설정 이후 실행합니다. 기존 Vault의 `onmaeum_resend_api_key`를 재사용합니다.
- 홈페이지 공고 표에 새 공고가 등록되면 활동지역이 일치하는 인증 완료 교사(이메일 확인 완료, 알림 켜짐)에게 보냅니다. 공고 수집 자체는 이 파일의 범위가 아닙니다.
- 최초 실행 시 기존 공고의 마지막 ID를 저장해 과거 공고는 소급 발송하지 않습니다. 동일 회원·원문 URL 조합은 중복 발송하지 않습니다.
- 명시된 광역 지역·온라인·해외를 매칭합니다. 전국은 국내 17개 지역이며 온라인·해외를 포함하지 않습니다. 불명확한 지역은 추측하지 않습니다.
- pg_cron이 5분마다 실행하고 최대 100개 공고·회원 조합을 수신자별 한 통으로 묶습니다. 여러 지역이 일치해도 같은 공고는 한 번만 포함합니다.
- `account.html`에서 알림을 끌 수 있습니다. 발송 직전 인증·지역·수신 설정·마감 여부를 다시 확인하며 이미 발송된 메일은 취소할 수 없습니다.
- 일시 오류는 같은 본문과 idempotency key로 최대 3회 시도합니다. 23시간을 넘긴 재시도는 중복 위험 때문에 중단합니다. 재시도 중 수신 거부·마감 등이 발생하면 해당 묶음을 취소합니다.
- `admin.html`의 발송 현황은 공고·회원 조합 건수입니다. 서비스 접수는 Resend 성공 응답이며 수신함 도착을 뜻하지 않습니다. 실패/확인 필요는 Resend에서 조사합니다.
- private 발송 기록은 일반 회원에게 공개하지 않습니다. API 키는 발송 기록에 저장하지 않으며 접수·실패 확정 시 저장된 메일 본문을 비웁니다.
