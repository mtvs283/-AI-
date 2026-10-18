import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {storyPages,storyCover,getStoryPage,getAnnotation} from './별나무-본문.mjs';

test('한국어·베트남어 본문 20쪽',()=>{
 assert.equal(storyPages.length,20);
 for(const [index,page] of storyPages.entries()){
  assert.equal(page.pageNumber,index+1);
  assert.match(page.koreanText,/[가-힣]/);
  assert.match(page.vietnameseText,/[ăâđêôơưáàảãạếềễệ]/i);
  assert.equal(page.koreanSegments.map(s=>s.text).join(''),page.koreanText);
  assert.equal(getStoryPage(index+1),page);
 }
 assert.equal(getStoryPage(21),null);
});
test('모든 쪽에 원어 설명·한국어 설명·예문을 갖춘 주석 4개 이상',()=>{
 for(const page of storyPages){
  const entries=Object.entries(page.annotations);
  assert.ok(entries.length>=4);
  const linked=page.koreanSegments.filter(s=>s.annotationId).map(s=>s.annotationId);
  assert.equal(new Set(linked).size,entries.length);
  for(const [id,a] of entries){
   assert.ok(linked.includes(id));assert.equal(getAnnotation(page.pageNumber,id),a);
   assert.ok(a.translation.trim().length>15);assert.doesNotMatch(a.translation,/[가-힣]/);
   assert.match(a.explanation,/[가-힣]/);assert.match(a.note,/^예문 · /);
  }
 }
});
test('표지·본문 이미지 21개는 실제 16:9 WebP',()=>{
 for(const image of [storyCover.image,...storyPages.map(p=>p.image)]){
  const b=fs.readFileSync(new URL(image,import.meta.url));
  assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');
  const chunk=b.toString('ascii',12,16);let w,h;
  if(chunk==='VP8 '){w=b.readUInt16LE(26)&0x3fff;h=b.readUInt16LE(28)&0x3fff;}
  else if(chunk==='VP8X'){w=1+b.readUIntLE(24,3);h=1+b.readUIntLE(27,3);}
  else throw Error(`검사하지 못한 이미지 형식: ${chunk}`);
  assert.equal(w*9,h*16);assert.ok(w>=1280);assert.ok(b.length>30000);
 }
});
test('거북이와 원숭이 방식의 한 뷰어·언어 연결·주석 순서·표지 이동',()=>{
 const html=fs.readFileSync(new URL('./별나무.html',import.meta.url),'utf8');
 assert.ok(html.includes("from './별나무-본문.mjs'"));
 assert.ok(html.includes('page.vietnameseText'));assert.ok(html.includes('lang="vi"'));
 assert.ok(html.includes('처음으로 ↺'));assert.ok(html.includes("document.querySelector('#story-hint').hidden = true"));
 assert.ok(html.indexOf('id="annotation-translation"')<html.indexOf('id="annotation-explanation"'));
 assert.ok(html.includes("event.key === 'Escape'"));
 assert.doesNotMatch(html,/tagalog|거북이와 원숭이|story-turtle-monkey/);
});
test('최종 폴더는 한국어 이름 파일 24개',()=>{
 const names=fs.readdirSync(new URL('.',import.meta.url));
 assert.equal(names.length,24);
 assert.ok(names.every(name=>name.startsWith('별나무')));
 assert.equal(names.filter(n=>n.endsWith('.webp')).length,21);
 assert.equal(names.filter(n=>n.endsWith('.html')).length,1);
});
