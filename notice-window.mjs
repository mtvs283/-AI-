// CapCut publishes October 20–30. This site's display cutoff is Seoul midnight.
export const END_AT = Date.parse('2026-10-31T00:00:00+09:00');
export const SOURCE_URL = 'https://www.capcut.com/ko-kr/tools/capcut-black-friday-sale';
export function noticeIsVisible(now=Date.now(),hiddenUntil=0) { return now<END_AT && now>=Number(hiddenUntil || 0); }
export function nextSeoulMidnight(now=Date.now()) { const offset=9*60*60*1000; return Math.floor((now+offset)/86400000)*86400000+86400000-offset; }
