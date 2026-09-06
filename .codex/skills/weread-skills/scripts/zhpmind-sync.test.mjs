import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { Gateway, fetchBook, syncBook } from './zhpmind-sync.mjs';

const id = '44026191';
const notePath = 'inbox/测试阅读记录.md';
const highlight = (n = 1) => ({ bookId: id, bookmarkId: `old-chapter-${n}`, chapterUid: 73, range: `${n*100}-${n*100+20}`, markText: `测试原文 ${n}`, createTime: 1677993947, type: 1 });
const review = (text = '测试感想') => ({ review: { reviewId: 'r1', chapterUid: 73, range: '100-120', abstract: '测试原文 1', content: text, createTime: 1677993948 } });
function client({ highlights = [highlight()], pages = [{ totalCount: 0, reviews: [], hasMore: 0 }], wrongBook = false } = {}) {
  let page = 0;
  return { call: async (api, params) => {
    if (api === '/book/info') return { bookId: wrongBook ? 'other' : id, title: '测试书', author: '测试作者', deepLink: 'https://weread.qq.com/book-detail?test=1' };
    if (api === '/book/bookmarklist') return { updated: highlights, chapters: [{ chapterUid: 73, chapterIdx: 12, title: '第一章' }] };
    assert.equal(params.bookid, id);
    assert.equal(params.synckey, page ? pages[page-1].synckey : 0);
    return pages[page++];
  } };
}
function fixture(t) {
  const vault = fs.mkdtempSync(path.join(os.tmpdir(), 'zhpmind-weread-test-'));
  fs.mkdirSync(path.join(vault, 'inbox'));
  fs.mkdirSync(path.join(vault, '.codex'));
  t.after(() => fs.rmSync(vault, { recursive: true, force: true }));
  const note = path.join(vault, notePath), state = path.join(vault, '.codex/weread-sync', `${id}.json`);
  return { vault, note, state, run: (c = client(), extra = {}) => syncBook({ vault, bookId: id, notePath, client: c, today: '2026-09-06', ...extra }) };
}

test('gateway uses flat readonly requests and hides error details', async () => {
  const g = new Gateway('wrk-test-only', async (url, options) => {
    assert.equal(url, 'https://i.weread.qq.com/api/agent/gateway');
    assert.equal(options.redirect, 'error');
    assert.equal(options.headers.Authorization, 'Bearer wrk-test-only');
    assert.deepEqual(JSON.parse(options.body), { bookId: id, api_name: '/book/info', skill_version: '1.0.4' });
    return { ok: true, json: async () => ({ bookId: id }) };
  });
  assert.equal((await g.call('/book/info', { bookId: id })).bookId, id);
  await assert.rejects(g.call('/review/add', {}), /只读/);
  for (const data of [{ upgrade_info: { message: 'untrusted' } }, { errcode: 401, message: 'secret' }]) {
    const guarded = new Gateway('wrk-test-only', async () => ({ ok: true, json: async () => data }));
    await assert.rejects(guarded.call('/book/info', {}), e => !e.message.includes('secret') && !e.message.includes('untrusted'));
  }
  const broken = new Gateway('wrk-test-only', async () => { throw new Error('secret'); });
  await assert.rejects(broken.call('/book/info', {}), /请求未完成/);
});

test('first import and repeated sync are idempotent, including mtimes', async t => {
  const f = fixture(t);
  assert.equal((await f.run()).status, 'created');
  const before = [fs.readFileSync(f.note, 'utf8'), fs.readFileSync(f.state, 'utf8'), fs.statSync(f.note).mtimeMs, fs.statSync(f.state).mtimeMs];
  assert.match(before[0], /第一章/);
  assert.match(before[0], /2023-03-05/);
  assert.equal((await f.run()).status, 'unchanged');
  assert.deepEqual([fs.readFileSync(f.note, 'utf8'), fs.readFileSync(f.state, 'utf8'), fs.statSync(f.note).mtimeMs, fs.statSync(f.state).mtimeMs], before);
});

test('additions, edited thoughts and absent records preserve local writing', async t => {
  const f = fixture(t);
  await f.run();
  fs.writeFileSync(f.note, '我的后来想法\n' + fs.readFileSync(f.note, 'utf8') + '\n末尾的想法\n');
  const withThought = text => client({ highlights: [highlight(), highlight(2)], pages: [{ totalCount: 1, reviews: [review(text)], hasMore: 0 }] });
  await f.run(withThought('第一版想法'));
  await f.run(withThought('修订想法'));
  let note = fs.readFileSync(f.note, 'utf8');
  assert.ok(note.startsWith('我的后来想法\n') && note.endsWith('\n末尾的想法\n'));
  assert.match(note, /修订想法/);
  assert.doesNotMatch(note, /第一版想法/);
  assert.equal((note.match(/测试原文 1/g) || []).length, 1);
  const missing = await f.run(client({ highlights: [] }));
  assert.equal(missing.retainedMissing, 3);
  assert.match(fs.readFileSync(f.note, 'utf8'), /保留上次记录/);
  await f.run(withThought('再次修订'));
  note = fs.readFileSync(f.note, 'utf8');
  assert.doesNotMatch(note, /保留上次记录/);
  assert.equal((note.match(/\^wr-h-/g) || []).length, 2);
});

test('edited managed region is never overwritten', async t => {
  const f = fixture(t);
  await f.run();
  const changed = fs.readFileSync(f.note, 'utf8').replace('测试原文 1', '本地改动');
  const state = fs.readFileSync(f.state, 'utf8');
  fs.writeFileSync(f.note, changed);
  await assert.rejects(f.run(), /本地修改/);
  assert.equal(fs.readFileSync(f.note, 'utf8'), changed);
  assert.equal(fs.readFileSync(f.state, 'utf8'), state);
});

test('does not take over an existing note or recreate a moved note', async t => {
  const f = fixture(t);
  fs.writeFileSync(f.note, '已有内容');
  await assert.rejects(f.run(), /不接管/);
  assert.equal(fs.readFileSync(f.note, 'utf8'), '已有内容');
  fs.unlinkSync(f.note);
  await f.run();
  fs.renameSync(f.note, f.note + '.moved');
  await assert.rejects(f.run(), /移动或删除/);
  assert.equal(fs.existsSync(f.note), false);
});

test('pagination accepts last page without cursor and rejects incomplete results', async t => {
  const f = fixture(t);
  const r2 = { review: { reviewId: 'r2', content: '第二条' } };
  const data = await fetchBook(client({ pages: [{ totalCount: 2, reviews: [review()], hasMore: 1, synckey: 42 }, { totalCount: 2, reviews: [r2], hasMore: 0 }] }), id);
  assert.equal(data.reviews.length, 2);
  for (const pages of [
    [{ totalCount: 1, reviews: [], hasMore: 0 }],
    [{ totalCount: 1, reviews: [review()], hasMore: 1, synckey: 0 }],
    [{ totalCount: 2, reviews: [review()], hasMore: 1, synckey: 42 }, { totalCount: 3, reviews: [r2], hasMore: 0 }],
  ]) {
    await assert.rejects(f.run(client({ pages })));
    assert.equal(fs.existsSync(f.note), false);
    assert.equal(fs.existsSync(f.state), false);
  }
});

test('many unannotated highlights fold; actual chapter/range controls pairing', async t => {
  const f = fixture(t);
  await f.run(client({ highlights: Array.from({ length: 6 }, (_, n) => highlight(n+1)), pages: [{ totalCount: 1, reviews: [review()], hasMore: 0 }] }));
  const note = fs.readFileSync(f.note, 'utf8');
  assert.match(note, /> \[!quote\]- 划线摘录 · 5 条/);
  assert.equal((note.match(/测试原文 1/g) || []).length, 1);
  assert.ok(note.indexOf('测试感想') < note.indexOf('[!quote]'));
});

test('format-only migrates checked legacy content without fetching or changing source data', async t => {
  const f = fixture(t);
  await f.run();
  const state = JSON.parse(fs.readFileSync(f.state, 'utf8'));
  const sourceData = JSON.stringify(state.data);
  delete state.renderVersion;
  const legacy = '## 微信读书记录\n\n更新于 2026-08-01 · 1 条划线 · 0 条感想\n\n> 测试原文 1';
  state.bodyHash = createHash('sha256').update(legacy).digest('hex');
  fs.writeFileSync(f.state, JSON.stringify(state));
  const prefix = `我的补充\n\n<!-- weread-sync:start ${id} -->\n`;
  const suffix = `\n<!-- weread-sync:end ${id} -->\n\n末尾的补充`;
  fs.writeFileSync(f.note, prefix + legacy + suffix);
  const noNetwork = { call: () => { throw new Error('must not fetch'); } };
  assert.equal((await f.run(noNetwork, { formatOnly: true })).status, 'formatted');
  const note = fs.readFileSync(f.note, 'utf8');
  assert.ok(note.startsWith(prefix) && note.endsWith(suffix));
  assert.match(note, /更新于 2026-08-01/);
  assert.match(note, /\[!quote\]- 划线摘录 · 1 条/);
  assert.doesNotMatch(note, /## 微信读书记录/);
  assert.equal(JSON.stringify(JSON.parse(fs.readFileSync(f.state, 'utf8')).data), sourceData);
  assert.equal((await f.run(noNetwork, { formatOnly: true })).status, 'unchanged');
  fs.writeFileSync(f.note, note.replace('测试原文 1', '用户改写'));
  await assert.rejects(f.run(noNetwork, { formatOnly: true }), /本地修改/);
});

test('invalid identity, traversal, lock and empty responses do not create notes', async t => {
  const f = fixture(t);
  await assert.rejects(f.run(client({ wrongBook: true })), /身份不匹配/);
  await assert.rejects(f.run(client(), { notePath: 'inbox/../outside.md' }), /相对路径/);
  assert.equal((await f.run(client({ highlights: [] }))).status, 'empty');
  fs.writeFileSync(path.join(f.vault, '.codex/weread-sync', `${id}.lock`), 'test lock');
  await assert.rejects(f.run(), /遗留锁/);
  assert.equal(fs.existsSync(f.note), false);
});
