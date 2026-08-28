# 한국어교육AI연구개발원 홈페이지

업로드 파일:
- index.html
- account.html
- logo.png
- hero-bg.png
- README.md

교사 회원 기능:
- `onmaeum-membership.sql`을 Supabase SQL Editor에서 먼저 실행합니다.
- `account.html`에서 이메일 회원가입, 로그인, 교원자격증 한 파일 제출을 처리합니다.
- 자격증은 비공개 `teacher-certificates` Storage 버킷에 회원별 폴더로 저장합니다.
- 향후 주문·결제·정산 테이블은 `profiles.id`를 회원 식별자로 연결합니다.

Supabase Auth 설정:
- Site URL: `https://www.onmaeumkr.com`
- Redirect URLs: `https://www.onmaeumkr.com/account.html`, `https://onmaeumkr.com/account.html`
- 실제 가입 전 이메일 확인 기능이 켜져 있는지 확인합니다.
- 회원이 늘어나기 전 전용 SMTP와 한국어 인증 메일 문구를 설정합니다.

운영 전 확인:
- 개인정보처리방침에 회원정보와 교원자격증의 수집 목적, 보관기간, 파기방법을 명시합니다.
- 실제 결제·정산 정보는 브라우저 회원정보가 아니라 선택한 결제사의 서버 연동으로 처리합니다.

신라문화체 파일은 별도로 GitHub 루트에 `Shilla_Culture(B).ttf` 이름 그대로 업로드해야 큰 제목에 적용됩니다.
