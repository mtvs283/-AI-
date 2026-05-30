<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>한국어교육AI연구개발원 | Korean Edu AI Institute</title>
  <meta name="description" content="AI 기반 글로벌 한국어 교육 생태계를 만드는 한국어교육AI연구개발원" />
  <style>
    :root{
      --red:#b21f2d;--blue:#123c8c;--ink:#161616;--muted:#6b7280;--paper:#f7f3ea;--gold:#d7a934;--line:rgba(20,20,20,.12)
    }
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:'Noto Serif KR','Nanum Myeongjo',serif;color:var(--ink);background:#f8f5ee;overflow-x:hidden}
    a{text-decoration:none;color:inherit}.wrap{width:min(1180px,92vw);margin:0 auto}.hanji{background:radial-gradient(circle at 20% 20%,rgba(255,255,255,.8),transparent 32%),linear-gradient(135deg,#faf7ef,#eee7db);position:relative}.hanji:before{content:"";position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,rgba(0,0,0,.025) 0 1px,transparent 1px 5px),repeating-linear-gradient(90deg,rgba(0,0,0,.018) 0 1px,transparent 1px 7px);opacity:.32;pointer-events:none}
    header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(248,245,238,.84);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
    nav{height:74px;display:flex;align-items:center;justify-content:space-between}.brand{display:flex;align-items:center;gap:12px;font-weight:900}.brand img{width:46px;height:46px;border-radius:50%}.brand small{display:block;font-size:12px;color:var(--muted);font-weight:700}.menu{display:flex;gap:24px;font-size:15px;font-weight:700}.cta{padding:11px 18px;border-radius:999px;background:var(--red);color:#fff;box-shadow:0 10px 24px rgba(178,31,45,.22)}
    .hero{min-height:100vh;display:grid;place-items:center;padding-top:74px;position:relative;overflow:hidden}.hero:after{content:"한";position:absolute;right:-4vw;bottom:-18vh;font-size:50vw;font-weight:900;color:rgba(18,60,140,.06);line-height:1}.hero-bg{position:absolute;inset:74px 0 auto 0;height:390px;background:url('assets/hero-bg.png') center/cover no-repeat;opacity:.88}.hero-card{position:relative;z-index:2;text-align:center;padding:120px 0 90px}.logo{width:180px;height:180px;object-fit:contain;filter:drop-shadow(0 18px 28px rgba(0,0,0,.16));margin-bottom:28px}.eyebrow{display:inline-flex;gap:8px;align-items:center;padding:8px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.72);font-weight:800;color:var(--blue)}
    h1{font-size:clamp(44px,7vw,92px);line-height:1.05;margin:24px 0 18px;letter-spacing:-.06em}.grad{background:linear-gradient(90deg,var(--red),var(--blue));-webkit-background-clip:text;color:transparent}.lead{font-size:clamp(18px,2.2vw,26px);line-height:1.75;color:#333;margin:0 auto 34px;max-width:780px}.buttons{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}.btn{padding:15px 24px;border-radius:999px;font-weight:900;border:1px solid var(--line);background:#fff}.btn.primary{background:var(--blue);color:#fff}.btn.red{background:var(--red);color:#fff}
    section{position:relative;padding:110px 0}.section-title{text-align:center;margin-bottom:56px}.section-title span{font-weight:900;color:var(--red)}h2{font-size:clamp(34px,4vw,58px);letter-spacing:-.05em;margin:10px 0}.desc{font-size:18px;line-height:1.8;color:#555;max-width:760px;margin:0 auto}.grid{display:grid;gap:22px}.grid-3{grid-template-columns:repeat(3,1fr)}.grid-4{grid-template-columns:repeat(4,1fr)}.card{background:rgba(255,255,255,.78);border:1px solid var(--line);border-radius:28px;padding:32px;box-shadow:0 24px 60px rgba(25,25,25,.08);backdrop-filter:blur(10px)}.card .mark{font-size:42px;color:var(--gold);font-weight:900}.card h3{font-size:25px;margin:18px 0 12px}.card p,.card li{color:#555;line-height:1.75;font-size:16px}.card ul{padding-left:18px;margin:14px 0 0}.split{display:grid;grid-template-columns:1fr 1fr;gap:42px;align-items:center}.quote{font-size:32px;line-height:1.55;font-weight:900;letter-spacing:-.04em}.service{border-top:6px solid var(--blue)}.service.redline{border-top-color:var(--red)}.service.goldline{border-top-color:var(--gold)}
    .flow{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.step{text-align:center;padding:26px 16px;border-radius:24px;background:#fff;border:1px solid var(--line);font-weight:900}.step b{display:block;color:var(--red);font-size:28px;margin-bottom:8px}.pricing{grid-template-columns:repeat(3,1fr)}.price{font-size:34px;font-weight:900;color:var(--blue);margin:14px 0}.footer{background:#111827;color:#fff;padding:60px 0 34px}.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:26px}.footer a,.footer p{color:#d1d5db}.seal{width:90px;border-radius:16px;margin-bottom:14px}
    @media(max-width:900px){.menu{display:none}.grid-3,.grid-4,.pricing,.split,.flow,.footer-grid{grid-template-columns:1fr}.hero-bg{height:270px}.hero-card{padding-top:90px}.logo{width:140px;height:140px}section{padding:78px 0}}
  </style>
</head>
<body>
  <header>
    <nav class="wrap">
      <a class="brand" href="#home"><img src="assets/logo.png" alt="한국어교육AI연구개발원 로고"><div>한국어교육AI연구개발원<small>Korean Edu AI Institute</small></div></a>
      <div class="menu"><a href="#about">철학</a><a href="#services">플랫폼</a><a href="#research">연구개발</a><a href="#training">교육연수</a><a href="#license">기관제휴</a></div>
      <a class="cta" href="#contact">문의하기</a>
    </nav>
  </header>
  <main>
    <section id="home" class="hero hanji">
      <div class="hero-bg"></div>
      <div class="hero-card wrap">
        <img class="logo" src="assets/logo.png" alt="한국어교육AI연구개발원">
        <div class="eyebrow">AI 기반 글로벌 한국어 교육 플랫폼</div>
        <h1>문화로 배우고,<br><span class="grad">AI로 연결하다</span></h1>
        <p class="lead">한국어교육AI연구개발원은 광개토 학습 플랫폼과 온마음 한국어 교사 플랫폼을 하나로 묶어, 전 세계 한국어 교육을 위한 새로운 생태계를 만듭니다.</p>
        <div class="buttons"><a class="btn primary" href="#services">플랫폼 보기</a><a class="btn red" href="#teacher">교원 참여하기</a><a class="btn" href="#license">기관 제휴 문의</a></div>
      </div>
    </section>
    <section id="about" class="hanji">
      <div class="wrap split">
        <div><div class="section-title" style="text-align:left;margin-bottom:20px"><span>교육 철학</span><h2>배움은 교실이 아니라 연결입니다</h2></div><p class="desc" style="margin:0">우리는 AI가 교사를 대체하는 기술이 아니라, 교사의 가능성을 확장하는 도구라고 믿습니다. 언어·문화·사람·기술을 연결해 누구나 자신의 삶 속에서 한국어를 배우고 성장할 수 있도록 돕습니다.</p></div>
        <div class="card quote">“기술보다 사람을,<br>기능보다 교육을,<br>전달보다 이해를<br>먼저 생각합니다.”</div>
      </div>
    </section>
    <section id="services">
      <div class="wrap"><div class="section-title"><span>플랫폼 구조</span><h2>하나의 기관, 세 개의 핵심 축</h2><p class="desc">연구개발원이 중심이 되고, 학습자 플랫폼과 교사 플랫폼이 서비스 브랜드로 연결됩니다.</p></div>
      <div class="grid grid-3">
        <article class="card service"><div class="mark">學</div><h3>광개토</h3><p>AI 기반 글로벌 한국어 학습 플랫폼. 한글, 발음, 문법, 대화, 게임형 학습을 제공합니다.</p><ul><li>학습자용 홈페이지</li><li>AI 대화 연습</li><li>발음 시각화</li></ul></article>
        <article class="card service redline" id="teacher"><div class="mark">心</div><h3>온마음 한국어</h3><p>전 세계 한국어 교사가 함께 콘텐츠를 만들고 검수하는 교사용 협업 플랫폼입니다.</p><ul><li>교사 포털</li><li>콘텐츠 연구소</li><li>AI 제작실</li></ul></article>
        <article class="card service goldline"><div class="mark">AI</div><h3>AI 콘텐츠 연구소</h3><p>챗봇, 쇼츠, 교재, 교육용 게임, 발음 다이어그램을 연구·개발합니다.</p><ul><li>교재 DB</li><li>교육 앱 개발</li><li>특허 기술 정리</li></ul></article>
      </div></div>
    </section>
    <section id="research" class="hanji"><div class="wrap"><div class="section-title"><span>연구개발 영역</span><h2>한국어 교육을 보이게 만듭니다</h2><p class="desc">보이지 않는 발음, 어려운 문법, 추상적인 문화 맥락을 AI와 시각화 기술로 쉽게 전달합니다.</p></div>
      <div class="grid grid-4"><div class="card"><div class="mark">文</div><h3>문법 시각화</h3><p>형태 생성 흐름 중심의 한국어 문법 자료 개발</p></div><div class="card"><div class="mark">音</div><h3>발음 시각화</h3><p>입 모양, 혀 위치, 바람 세기를 그림으로 설명</p></div><div class="card"><div class="mark">筆</div><h3>한글 쓰기</h3><p>SVG 획순 애니메이션과 자모 구조 연구</p></div><div class="card"><div class="mark">遊</div><h3>게임형 학습</h3><p>성인 학습자도 몰입할 수 있는 실전형 한국어 게임</p></div></div>
    </div></section>
    <section id="training"><div class="wrap"><div class="section-title"><span>교육연수원</span><h2>교사를 위한 AI 활용 연수</h2><p class="desc">한국어 교사가 직접 수업 자료를 만들고, 영상·PPT·챗봇·교재를 제작할 수 있도록 돕습니다.</p></div>
      <div class="grid grid-3"><div class="card"><h3>ChatGPT 수업 설계</h3><p>교안, 활동지, 평가 문항, 대화문 제작</p></div><div class="card"><h3>Canva & CapCut</h3><p>카드뉴스, 쇼츠, 수업 자료 디자인</p></div><div class="card"><h3>NotebookLM 발표자료</h3><p>강의자료·PPT·요약자료 자동화</p></div></div></div></section>
    <section id="license" class="hanji"><div class="wrap"><div class="section-title"><span>기관 제휴 · 라이선스</span><h2>기관에 맞는 한국어 교육 시스템을 제공합니다</h2><p class="desc">대학, 세종학당, 어학원, 다문화센터, 기업 교육기관에 플랫폼·콘텐츠·AI 챗봇·교사 연수를 함께 제공합니다.</p></div>
      <div class="flow"><div class="step"><b>01</b>상담</div><div class="step"><b>02</b>도입 설계</div><div class="step"><b>03</b>콘텐츠 제공</div><div class="step"><b>04</b>교사 연수</div><div class="step"><b>05</b>운영 지원</div></div></div></section>
    <section id="contact"><div class="wrap"><div class="section-title"><span>문의</span><h2>함께 만들 교사와 기관을 기다립니다</h2><p class="desc">한국어 교사, 콘텐츠 제작자, 번역 협력자, 기관 파트너와 함께 글로벌 한국어 교육 생태계를 만들어갑니다.</p></div>
      <div class="grid pricing"><div class="card"><h3>교원 참여</h3><p>한국어 수업, 콘텐츠 제작, 검수, 다국어 협업</p><a class="btn primary" href="mailto:kodak2138@gmail.com">지원 문의</a></div><div class="card"><h3>기관 제휴</h3><p>플랫폼 도입, 교육 콘텐츠 라이선스, 교사 연수</p><a class="btn red" href="mailto:kodak2138@gmail.com">제휴 문의</a></div><div class="card"><h3>연수 신청</h3><p>ChatGPT, Canva, CapCut, NotebookLM 실전 워크숍</p><a class="btn" href="mailto:kodak2138@gmail.com">연수 문의</a></div></div></div></section>
  </main>
  <footer class="footer"><div class="wrap footer-grid"><div><img class="seal" src="assets/logo.png" alt="로고"><h3>한국어교육AI연구개발원</h3><p>AI와 사람의 협력으로 새로운 한국어 교육 생태계를 만듭니다.</p></div><div><h4>서비스</h4><p>광개토<br>온마음 한국어<br>AI 콘텐츠 연구소</p></div><div><h4>교육</h4><p>교사 연수<br>워크숍<br>콘텐츠 제작</p></div><div><h4>문의</h4><p>kodak2138@gmail.com</p></div></div><div class="wrap" style="border-top:1px solid rgba(255,255,255,.15);margin-top:36px;padding-top:22px;color:#9ca3af">© 2026 한국어교육AI연구개발원. All rights reserved.</div></footer>
</body>
</html>
