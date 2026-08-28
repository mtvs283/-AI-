# 한국어교육AI연구개발원 홈페이지

업로드 파일:
- index.html
- account.html
- logo.png
- hero-bg.png
- README.md

교사 회원 기능:
- `onmaeum-membership.sql`을 Supabase SQL Editor에서 먼저 실행합니다.
- `account.html`에서 이메일 회원가입, 로그인, 교원자격증 또는 교원자격확인서 한 파일 제출을 처리합니다.
- 가입할 때 일반 회원 또는 교사 회원을 선택합니다.
- `requested_membership_type`에는 선택·신청 유형을, `membership_type`에는 실제 승인된 현재 등급을 각각 저장합니다.
- 일반 회원은 자격 서류 없이 가입할 수 있으며 자료 목록과 소개만 열람할 수 있습니다.
- 교사 회원 전환 때 주 활동 지역과 주 근무 유형을 입력합니다.
- 교원자격증 또는 교원자격확인서 중 하나를 반드시 제출하고 관리자 확인이 끝나면 교사 등급으로 전환됩니다.
- 자격증은 비공개 `teacher-certificates` Storage 버킷에 회원별 폴더로 저장합니다.
- 향후 주문·결제·정산 테이블은 `profiles.id`를 회원 식별자로 연결합니다.

Supabase Auth 설정:
- Site URL: `https://www.onmaeumkr.com`
- Redirect URLs: `https://www.onmaeumkr.com/account.html`, `https://onmaeumkr.com/account.html`
- 실제 가입 전 이메일 확인 기능이 켜져 있는지 확인합니다.
- 회원이 늘어나기 전 전용 SMTP와 한국어 인증 메일 문구를 설정합니다.

운영 전 확인:
- 개인정보처리방침에 회원정보와 교원자격증의 수집 목적, 보관기간, 파기방법을 명시합니다.
- 자료 테이블과 비공개 파일 버킷을 만들 때 `profiles.membership_type = 'teacher'`인 인증 회원만 다운로드할 수 있도록 서버 권한을 별도로 설정합니다.
- 실제 결제·정산 정보는 브라우저 회원정보가 아니라 선택한 결제사의 서버 연동으로 처리합니다.

신라문화체 파일은 별도로 GitHub 루트에 `Shilla_Culture(B).ttf` 이름 그대로 업로드해야 큰 제목에 적용됩니다.
