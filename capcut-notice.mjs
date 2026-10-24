import {END_AT,SOURCE_URL,noticeIsVisible,nextSeoulMidnight} from './notice-window.mjs';
const storageKey='onmaeum-capcut-notice-hidden-until';
let hiddenUntil=0;
try { hiddenUntil=Number(localStorage.getItem(storageKey)) || 0; } catch { /* Dismissal still works without storage. */ }
if(noticeIsVisible(Date.now(),hiddenUntil)) {
  const dialog=document.createElement('dialog');
  dialog.id='capcut-notice';dialog.setAttribute('aria-labelledby','cn-heading');
  dialog.innerHTML=`<div class="cn-main">
    <div class="cn-top"><span class="cn-dot" aria-hidden="true"></span>KOREAN EDU AI INSTITUTE · NOTICE</div>
    <button class="cn-close" type="button" aria-label="공지 닫기" autofocus>×</button>
    <h2 id="cn-heading">캡컷 블랙프라이데이<br>얼리버드 할인 안내</h2>
    <p class="cn-intro">수업 영상 제작을 생각하고 계신 선생님께<br>캡컷의 할인 소식을 전해드립니다.</p>
    <div class="cn-offer"><div><p class="cn-offer-label">CAPCUT PRO · FIRST YEAR</p><div class="cn-percent">최대 <strong>60<small>%</small></strong> 할인</div></div><div><div class="cn-date">10.20 — 10.30</div><div class="cn-offer-note">PC · Mac 데스크톱 전용<br>첫 해 구독 혜택</div></div></div>
    <p class="cn-copy"><span>할인 금액은 계정과 구독 이력에 따라 달라집니다.</span><span>적용 가격과 갱신 요금은 결제 화면에서 확인해 주세요.</span></p>
    <div class="cn-class"><div><span class="cn-tag">등록 교사 전용</span><h3>캡컷, 함께 배워요.</h3><p>희망하시는 선생님들과 일정을 맞춰<br>기초 강의를 진행합니다.</p></div><a class="cn-apply" href="/capcut-class.html">기초 강의 신청 <span aria-hidden="true">↗</span></a></div>
    <div class="cn-source"><span>캡컷 판매·제휴 수익과 관계없는 정보 안내입니다.</span><a href="${SOURCE_URL}" target="_blank" rel="noopener noreferrer">공식 할인 안내 보기 ↗</a></div>
  </div><div class="cn-footer"><label><input type="checkbox" id="cn-hide-today">오늘은 다시 보지 않기</label><button class="cn-done" type="button">닫기</button></div>`;
  document.body.append(dialog);
  const previousOverflow=document.documentElement.style.overflow;
  function dismiss() {
    if(dialog.querySelector('#cn-hide-today').checked) try {localStorage.setItem(storageKey,String(nextSeoulMidnight()));}catch{}
    dialog.close();
  }
  dialog.querySelector('.cn-close').addEventListener('click',dismiss);
  dialog.querySelector('.cn-done').addEventListener('click',dismiss);
  dialog.addEventListener('cancel',event=>{event.preventDefault();dismiss();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dismiss();}});
  dialog.addEventListener('close',()=>{document.documentElement.style.overflow=previousOverflow;});
  function expire() {if(Date.now()>=END_AT){dialog.close();dialog.remove();}}
  document.addEventListener('visibilitychange',expire);
  setTimeout(expire,Math.max(0,END_AT-Date.now()));
  dialog.showModal();document.documentElement.style.overflow='hidden';
}
