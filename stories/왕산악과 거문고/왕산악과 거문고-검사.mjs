import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {storyCover,storyPages,getStoryPage,getAnnotation,culturalNotes} from './왕산악과 거문고-본문.mjs';
const html=fs.readFileSync(new URL('./왕산악과 거문고.html',import.meta.url),'utf8');

test('한국어 본문 20쪽과 페이지별 주석 4개 이상',()=>{
 assert.equal(storyPages.length,20);
 for(const [index,page] of storyPages.entries()){
  assert.equal(page.pageNumber,index+1);assert.equal(page.koreanSegments.map(s=>s.text).join(''),page.koreanText);
  assert.ok(Object.keys(page.annotations).length>=4);
  const ids=page.koreanSegments.filter(s=>s.annotationId).map(s=>s.annotationId);
  assert.equal(ids.length,Object.keys(page.annotations).length);
  for(const id of ids){const a=getAnnotation(page.pageNumber,id);assert.ok(a);assert.ok(page.koreanText.includes(a.phrase));assert.match(a.explanation,/[가-힣]/);assert.match(a.note,/^예문 · /);}
  assert.ok(!('vietnameseText' in page));assert.ok(!('englishText' in page));
 }
 assert.equal(getStoryPage(21),null);
});
test('제목과 본문 문화 용어 설명 및 한국어 전용 화면',()=>{
 assert.equal(getAnnotation('cover','거문고'),culturalNotes['거문고']);
 for(const term of ['고구려','진나라','칠현금','거문고','술대','현학금','현금'])assert.ok(storyPages.some(p=>Object.values(p.annotations).some(a=>a.phrase===term&&a.type==='문화')));
 const body=html.slice(html.indexOf('<body>'),html.indexOf('<script type="module">'));
 assert.doesNotMatch(body,/Tiếng Việt|lang="vi"|한국어 · Korean|annotation-translation|cover-title-partner/);
 assert.ok(html.includes('culturalButton.dataset.annotationId'));
 assert.ok(html.includes('white-space: nowrap'));
});
test('표지와 본문 그림 21개는 실제 16:9 WebP',()=>{
 const paths=[storyCover.image,...storyPages.map(p=>p.image)];assert.equal(new Set(paths).size,21);
 for(const name of paths){const b=fs.readFileSync(new URL(name,import.meta.url));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');assert.equal(b.toString('ascii',12,16),'VP8 ');const w=b.readUInt16LE(26)&0x3fff,h=b.readUInt16LE(28)&0x3fff;assert.equal(w*9,h*16);assert.ok(w>=1280);assert.ok(b.length>30000);}
});
test('실제 뷰어 코드의 주석·닫기·이동·마지막 표지 복귀',()=>{
 let focused=null;const ids=new Map();
 class Element{
  constructor(tag='div'){this.tag=tag;this.listeners={};this.children=[];this.dataset={};this.style={};this.hidden=true;this.attributes={};this.classList={add(){},remove(){}};}
  addEventListener(n,f){(this.listeners[n]??=[]).push(f)}
  fire(n,e={}){for(const f of this.listeners[n]??[])f({target:this,preventDefault(){},...e})}
  append(...c){this.children.push(...c)}replaceChildren(...c){this.children=[...c]}
  setAttribute(k,v){this.attributes[k]=v}focus(){focused=this}
  closest(s){return s==='.annotation-trigger'&&this.className==='annotation-trigger'?this:null}
  contains(e){return e===this||this.children.includes(e)}
  getBoundingClientRect(){return {left:40,right:100,top:100,bottom:130,width:60}}
 }
 const get=s=>{if(!ids.has(s))ids.set(s,new Element());return ids.get(s)};
 const doc={querySelector:get,createElement:t=>new Element(t),createTextNode:text=>({text}),listeners:{},addEventListener(n,f){this.listeners[n]=f}};
 const loc={hostname:'localhost',href:'http://localhost/?preview=1',search:'?preview=1'};
 const win={innerWidth:1400,innerHeight:900,matchMedia:()=>({matches:false}),scrollTo(){},addEventListener(){}};
 const context={storyCover,storyPages,getStoryPage,getAnnotation,document:doc,window:win,location:loc,URL,URLSearchParams,Image:Element,history:{replaceState(_,__,u){loc.href=String(u)}}};
 const script=html.match(/<script type="module">([\s\S]*?)<\/script>/)[1].replace(/\s*import[^;]+;/,'');
 vm.runInNewContext(script,context);
 assert.equal(get('#story-content').hidden,false);assert.equal(get('#page-status').textContent,'표지');
 const cultural=get('#cover-title').children.find(e=>e.tag==='button');assert.ok(cultural);cultural.fire('click');assert.equal(get('#annotation-title').textContent,'거문고');assert.equal(get('#annotation-popover').hidden,false);
 get('#popover-close').fire('click');assert.equal(focused,cultural);
 get('#next-page').fire('click');assert.equal(get('#page-status').textContent,'1 / 20');assert.equal(get('#story-hint').hidden,true);
 for(let n=1;n<=20;n++){
  const buttons=get('#korean-text').children.filter(e=>e.tag==='button');assert.ok(buttons.length>=4);
  for(const button of buttons){get('#korean-text').fire('click',{target:button});assert.equal(get('#annotation-title').textContent,getAnnotation(n,button.dataset.annotationId).lemma);get('#popover-close').fire('click');assert.equal(focused,button);}
  if(n<20)get('#next-page').fire('click');
 }
 assert.equal(get('#next-page').textContent,'처음으로 ↺');get('#next-page').fire('click');assert.equal(get('#page-status').textContent,'표지');
 doc.listeners.keydown({key:'ArrowRight'});assert.equal(get('#page-status').textContent,'1 / 20');get('#previous-page').fire('click');assert.equal(get('#page-status').textContent,'표지');
});
test('한국어 이름의 최종 파일 24개',()=>{
 const names=fs.readdirSync(new URL('.',import.meta.url));assert.equal(names.length,24);assert.ok(names.every(n=>n.startsWith('왕산악과 거문고')));
 assert.equal(names.filter(n=>n.endsWith('.webp')).length,21);
});
