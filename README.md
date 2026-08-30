# 한국어교육AI연구개발원 홈페이지

업로드 파일:
- index.html
- account.html
- admin.html
- board.html
- logo.png
- hero-bg.png
- README.md

교사 회원 기능:
- `onmaeum-membership.sql`을 Supabase SQL Editor에서 먼저 실행합니다.
- `onmaeum-platform-access-control.sql`은 교사 협업 공간의 표와 파일 저장소에 회원 등급별 접근 정책을 적용합니다.
- `onmaeum-recruitment-notices.sql`은 한국어강사 모집 공고 표와 동기화 함수를 만듭니다. 실행 후 파일 안의 주석 INSERT로 동기화 키를 따로 넣습니다.
- `onmaeum-admin-role.sql`은 회원 로그인을 관리자 권한으로 씁니다. 실행 후 주석 UPDATE로 관리자 이메일을 지정합니다. `board.html`의 관리자 비밀번호 창은 쓰지 않습니다.
- `onmaeum-admin-teacher-review.sql`은 관리자가 `admin.html`에서 교사 자격 서류를 보고 승인·거절할 수 있게 합니다.
- `account.html`에서 이메일 회원가입, 로그인, 교원자격증 또는 교원자격확인서 한 파일 제출을 처리합니다.
- 가입할 때 일반 회원 또는 교사 회원을 선택합니다.
- `requested_membership_type`에는 선택·신청 유형을, `membership_type`에는 실제 승인된 현재 등급을 각각 저장합니다.
- 일반 회원은 자격 서류 없이 가입할 수 있으며 자료 목록과 소개만 열람할 수 있습니다.
- 교사 회원 전환 때 주 활동 지역과 주 근무 유형을 입력합니다.
- 교원자격증 또는 교원자격확인서 중 하나를 반드시 제출하고 관리자 확인이 끝나면 교사 등급으로 전환됩니다.
- 자격증은 비공개 `teacher-certificates` Storage 버킷에 회원별 폴더로 저장합니다.
- 향후 주문·결제·정산 테이블은 `profiles.id`를 회원 식별자로 연결합니다.

교사 협업 공간 접근 범위:
- 비로그인 방문자: 홈페이지·기관 소개·공개 문의 이용, 교사 협업 자료 목록 접근 불가
- 일반 회원: 수업자료 요청·자료공유·수업 고민·강사 모집 공고 목록 열람 가능, 등록·댓글·파일 이용 불가
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
