import test from 'node:test';
import assert from 'node:assert/strict';
import { END_AT, noticeIsVisible, nextSeoulMidnight } from './notice-window.mjs';
test('popup stops at the configured Seoul midnight, including already open pages',()=>{
  assert.equal(END_AT,Date.parse('2026-10-31T00:00:00+09:00'));
  assert.equal(noticeIsVisible(END_AT-1,0),true);
  assert.equal(noticeIsVisible(END_AT,0),false);
  assert.equal(noticeIsVisible(END_AT+1,0),false);
});
test('today dismissal expires at the next Seoul midnight',()=>{
  const now=Date.parse('2026-10-24T18:00:00+09:00');
  const until=nextSeoulMidnight(now);
  assert.equal(until,Date.parse('2026-10-25T00:00:00+09:00'));
  assert.equal(noticeIsVisible(now,until),false);
  assert.equal(noticeIsVisible(until,until),true);
});
