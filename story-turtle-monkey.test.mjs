import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const dataPath = new URL('./story-turtle-monkey-data.mjs', import.meta.url);
const pagePath = new URL('./story-turtle-monkey.html', import.meta.url);
const homePath = new URL('./index.html', import.meta.url);

test('20쪽 전체의 본문과 클릭 주석을 제공한다', async () => {
  assert.ok(existsSync(dataPath), '주석 데이터 모듈이 아직 없다');

  const { getAnnotation, getStoryPage, storyPages } = await import(dataPath.href);
  assert.equal(storyPages.length, 20);
  assert.equal(storyPages[0].pageNumber, 1);
  assert.equal(storyPages.at(-1).pageNumber, 20);
  assert.deepEqual(
    storyPages.map((page) => page.pageNumber),
    Array.from({ length: 20 }, (_, index) => index + 1)
  );
  assert.ok(storyPages.every((page) => page.koreanSegments.some((segment) => segment.annotationId)));
  assert.ok(storyPages.every((page) => page.image.endsWith('.webp')));
  assert.ok(
    storyPages.every((page) => existsSync(new URL(page.image, import.meta.url))),
    '모든 페이지의 WebP 그림 파일이 있어야 한다'
  );
  assert.match(storyPages[0].koreanText, /떠내려오는/);
  assert.equal(getAnnotation(1, 'drift').lemma, '떠내려오다');
  assert.equal(getAnnotation(1, 'unknown'), null);
  assert.equal(getStoryPage(20).pageNumber, 20);
  assert.equal(getStoryPage(21), null);
});

test('동화 페이지가 인증 확인과 접근 가능한 탐색 UI를 포함한다', () => {
  assert.ok(existsSync(pagePath), '동화 HTML 페이지가 아직 없다');

  const html = readFileSync(pagePath, 'utf8');
  assert.match(html, /story-turtle-monkey-data\.mjs/);
  assert.match(html, /@supabase\/supabase-js/);
  assert.match(html, /id="access-gate"/);
  assert.match(html, /id="story-content"/);
  assert.match(html, /id="previous-page"/);
  assert.match(html, /id="next-page"/);
  assert.match(html, /history\.replaceState/);
  assert.match(html, /max-height:\s*calc\(100dvh - 24px\)/);
  assert.match(html, /overflow-y:\s*auto/);
  assert.match(html, /closeButton\.focus\(\)/);
  assert.match(html, /let nextImagePreload/);
  assert.match(html, /role="dialog"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /className\s*=\s*['"]annotation-trigger['"]/);
});

test('자료공유 목록에 필리핀 이중언어 동화를 고정 자료로 제공한다', () => {
  const html = readFileSync(homePath, 'utf8');
  assert.match(html, /필리핀 구전설화 이중언어 동화 \(타갈로그어\)/);
  assert.match(html, /\.\/story-turtle-monkey\.html/);
  assert.match(html, /이중언어 동화/);
});

test('데스크톱 동화 화면은 100dvh 안에 고정되고 모바일에서만 문서 스크롤을 허용한다', () => {
  const html = readFileSync(pagePath, 'utf8');
  assert.match(html, /body\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(html, /main\s*\{[^}]*height:\s*calc\(100dvh - 64px\)/s);
  assert.match(html, /#story-content\s*\{[^}]*height:\s*100%/s);
  assert.match(html, /\.book-page\s*\{[^}]*flex:\s*1[^}]*min-height:\s*0/s);
  assert.match(html, /\.story-nav\s*\{[^}]*flex:\s*0 0 54px/s);
  assert.match(html, /@media \(max-width:\s*820px\)[\s\S]*body\s*\{[^}]*overflow-y:\s*auto/s);
});
