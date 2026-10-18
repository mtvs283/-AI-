
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';
import * as data from './별나무-본문.mjs';
const name='별나무',partner=true;
const folder=new URL('.',import.meta.url);
const html=fs.readFileSync(new URL('./별나무.html',import.meta.url),'utf8');
const baseline='C:/Users/kodak/.codex/visualizations/2026/10/17/01a14b3e-099f-7901-bf18-73b5618b2afd/서유기1기준-재제작전/별나무/';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
test('원고·번역·80개 주석을 수정 전과 똑같이 보존',async()=>{
 const old=await import(new URL('file:///'+baseline+'별나무-본문.mjs'));
 const manuscript=m=>m.storyPages.map(p=>({ko:p.koreanText,vi:p.vietnameseText,annotations:p.annotations}));
 assert.deepEqual(manuscript(data),manuscript(old));assert.equal(data.storyPages.length,20);
 for(const p of data.storyPages){assert.ok(Object.keys(p.annotations).length>=4);assert.equal(p.koreanSegments.map(s=>s.text).join(''),p.koreanText);}
});
test('승인 서유기1 화면 코드 사용: 전체 16:9 그림 위 본문, 좌우 패널 금지',()=>{
 const css=html.match(/<style>([\s\S]*?)<\/style>/)[1];
 const ref=fs.readFileSync(new URL('../journey-west-1/story-journey-west-1.css',folder),'utf8').split('/* Approved cover/page 1 contain baked lettering:')[0].replaceAll('#zh-block','#partner-block').replaceAll('data-mode=zh','data-mode=vi');
 assert.ok(css.startsWith(ref));assert.ok(css.includes('aspect-ratio:16/9'));assert.ok(css.includes('.page-text{position:absolute;'));
 assert.doesNotMatch(html,/grid-template-columns|illustration-wrap|class="text-panel"|background:\s*#c7d8c8/);
 assert.ok(html.includes('id="scene-image"'));assert.ok(html.includes('id="return-cover"'));
 assert.equal(html.includes('id="partner-block"'),partner);
});
test('그림 21개 모두 새 그림이며 원본 비율과 실제 파일을 확인',()=>{
 const names=[data.storyCover.image,...data.storyPages.map(p=>p.image)];assert.equal(new Set(names).size,21);
 for(const path of names){const name=path.replace('./','');const b=fs.readFileSync(new URL(path,folder));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');assert.equal(b.toString('ascii',12,16),'VP8 ');const w=b.readUInt16LE(26)&0x3fff,h=b.readUInt16LE(28)&0x3fff;assert.equal(w*9,h*16);assert.ok(w>=1600);assert.notEqual(hash(b),hash(fs.readFileSync(baseline+name)));}
 const p=data.illustrationPrompts??data.illustrationProduction;
 assert.ok(p.referenceAssets.length>=2);assert.ok(p.referenceAssets.every(a=>a.includes('/journey-west-1/')));
});
test('실제 뷰어의 80개 주석, 언어, 키보드, 표지 복귀와 문화 설명',()=>{
 let focused=null;const ids=new Map();
 class E{constructor(tag='div'){this.tag=tag;this.listeners={};this.children=[];this.dataset={};this.style={};this.hidden=true;this.open=false;this.isConnected=true;}addEventListener(n,f){(this.listeners[n]??=[]).push(f)}fire(n,e={}){for(const f of this.listeners[n]??[])f({target:this,preventDefault(){},...e})}append(...xs){this.children.push(...xs)}replaceChildren(...xs){this.children=[...xs]}setAttribute(k,v){this[k]=v}focus(){focused=this}showModal(){this.open=true}close(){this.open=false}closest(){return null}getBoundingClientRect(){return {left:10,right:100,top:10,bottom:100}}}
 const get=s=>{if(!ids.has(s))ids.set(s,new E());return ids.get(s)};
 const modes=partner?['ko','vi','both'].map(mode=>{const e=new E('button');e.dataset.mode=mode;return e}):[];
 const doc={body:new E(),querySelector:get,querySelectorAll:()=>modes,createElement:t=>new E(t),createTextNode:text=>({textContent:text}),listeners:{},addEventListener(n,f){this.listeners[n]=f}};
 const loc={href:'http://localhost/?preview=1',hostname:'localhost',search:'?preview=1'};
 const context={...data,document:doc,window:{addEventListener(){}},location:loc,URL,URLSearchParams,Image:E,history:{pushState(_,__,u){loc.href=String(u)}}};
 const script=html.match(/<script type="module">([\s\S]*?)<\/script>/)[1].replace(/\s*import[^;]+;/,'');vm.runInNewContext(script,context);
 assert.equal(get('#story-content').hidden,false);assert.equal(get('#page-status').textContent,'표지');
 if(!partner){const b=get('#cover-title').children.find(x=>x.tag==='button');b.fire('click');assert.equal(get('#annotation-title').textContent,'거문고');get('#annotation-dialog').fire('cancel');assert.equal(focused,b);}
 get('#start-reading').fire('click');
 for(let n=1;n<=20;n++){
  assert.equal(get('#page-status').textContent,n+' / 20');const buttons=get('#ko-text').children.flatMap(p=>p.children.filter(x=>x.tag==='button'));assert.ok(buttons.length>=4);
  for(const b of buttons){b.fire('click');const a=data.getAnnotation(n,b.dataset.annotationId);assert.equal(get('#annotation-title').textContent,a.lemma);assert.equal(get('#annotation-explanation').textContent,a.explanation);if(partner)assert.equal(get('#annotation-translation').textContent,a.translation);get('#annotation-dialog').fire('cancel');assert.equal(focused,b);}
  if(n<20)get('#next').fire('click');
 }
 assert.equal(get('#return-cover').hidden,false);get('#return-cover').fire('click');assert.equal(get('#page-status').textContent,'표지');assert.equal(focused,get('#start-reading'));
 doc.listeners.keydown({key:'ArrowRight',target:new E(),preventDefault(){}});assert.equal(get('#page-status').textContent,'1 / 20');
 if(partner){modes[1].fire('click');assert.equal(get('#ko-block').hidden,true);modes[0].fire('click');assert.equal(get('#partner-block').hidden,true);}
});
test('최종 폴더의 파일 수는 24개 유지',()=>{
 const names=fs.readdirSync(folder);assert.equal(names.length,24);assert.equal(names.filter(n=>n.endsWith('.webp')).length,21);assert.equal(names.filter(n=>n.endsWith('.html')).length,1);
});
