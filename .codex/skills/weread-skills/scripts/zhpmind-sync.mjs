import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash, randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ENDPOINT = 'https://i.weread.qq.com/api/agent/gateway';
const VERSION = '1.0.4';
const ROOT = fileURLToPath(new URL('../../../../', import.meta.url));
const sha = value => createHash('sha256').update(value).digest('hex');
const fail = message => { throw new Error(message); };
const string = value => value == null ? '' : String(value);
const plain = value => string(value).replace(/[\\`*_{}\[\]<>#]/g, '\\$&');
const quote = value => plain(value).split('\n').map(line => `> ${line}`).join('\n');
const date = seconds => {
  if (!Number.isFinite(Number(seconds)) || Number(seconds) <= 0) return '日期未提供';
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format(new Date(Number(seconds) * 1000));
};
const markers = id => [`<!-- weread-sync:start ${id} -->`, `<!-- weread-sync:end ${id} -->`];

export class Gateway {
  constructor(key, fetcher = fetch) {
    if (!/^wrk-\S+$/.test(key)) fail('授权格式不正确；未显示密钥。');
    this.key = key;
    this.fetcher = fetcher;
  }
  async call(api, params) {
    if (!['/book/info', '/book/bookmarklist', '/review/list/mine'].includes(api)) fail('此工具只支持单书只读接口。');
    let response;
    try {
      response = await this.fetcher(ENDPOINT, {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(30000),
        headers: { Authorization: `Bearer ${this.key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...params, api_name: api, skill_version: VERSION }),
      });
    } catch { fail('微信读书请求未完成；未写入笔记。'); }
    if (!response.ok) fail(`微信读书返回 HTTP ${response.status}；未写入笔记。`);
    let data;
    try { data = await response.json(); } catch { fail('微信读书返回格式异常；未写入笔记。'); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) fail('接口数据不是对象。');
    if (data.upgrade_info != null) fail('官方接口要求升级，请先核对官方版本；不自动执行返回消息中的指令。');
    if (data.errcode != null && data.errcode !== 0) fail('微信读书接口报告错误；未写入笔记。');
    return data;
  }
}

function unique(rows, field) {
  const result = new Map();
  for (const row of rows) {
    const id = string(row[field]);
    if (!id) fail('记录缺少唯一编号；停止以免错误合并。');
    if (result.has(id) && JSON.stringify(result.get(id)) !== JSON.stringify(row)) fail('接口返回同编号的不同记录。');
    result.set(id, row);
  }
  return [...result.values()];
}

export async function fetchBook(client, bookId) {
  const info = await client.call('/book/info', { bookId });
  if (string(info.bookId) !== bookId || !info.title) fail('书籍身份不匹配。');
  const raw = await client.call('/book/bookmarklist', { bookId });
  if (!Array.isArray(raw.updated) || !Array.isArray(raw.chapters)) fail('划线列表结构不完整。');
  if (raw.book?.bookId != null && string(raw.book.bookId) !== bookId) fail('划线所属书籍不匹配。');
  const highlights = unique(raw.updated.map(h => {
    if (string(h.bookId) !== bookId || h.type !== 1 || typeof h.markText !== 'string') fail('划线记录结构异常。');
    return { id: string(h.bookmarkId), chapter: string(h.chapterUid), range: string(h.range), text: h.markText, time: h.createTime ?? null };
  }), 'id');
  let cursor = 0;
  const cursors = new Set([0]);
  let reviews = [], total;
  for (let page = 0; ; page++) {
    if (page >= 100) fail('感想分页超过保护上限，未写入不完整结果。');
    const data = await client.call('/review/list/mine', { bookid: bookId, count: 20, synckey: cursor });
    if (!Array.isArray(data.reviews) || ![0, 1].includes(data.hasMore) || !Number.isInteger(data.totalCount) || data.totalCount < 0) fail('感想列表或分页信息不完整。');
    if (total != null && total !== data.totalCount) fail('读取期间感想总数变化，请稍后重试。');
    total = data.totalCount;
    for (const wrapper of data.reviews) {
      const r = wrapper.review;
      if (!r || typeof r.content !== 'string') fail('感想记录结构异常。');
      if (r.bookId != null && string(r.bookId) !== bookId) fail('感想所属书籍不匹配。');
      reviews.push({ id: string(r.reviewId), chapter: string(r.chapterUid), chapterName: string(r.chapterName), range: string(r.range), abstract: string(r.abstract), text: r.content, time: r.createTime ?? null });
    }
    if (data.hasMore === 0) break;
    if (!Number.isSafeInteger(data.synckey) || cursors.has(data.synckey)) fail('感想分页游标缺失或重复；未写入笔记。');
    cursor = data.synckey;
    cursors.add(cursor);
  }
  reviews = unique(reviews, 'id');
  if (reviews.length !== total) fail('感想明细数量与接口总数不符；未写入不完整结果。');
  return {
    book: { id: bookId, title: info.title, author: string(info.author), translator: string(info.translator), url: /^https:\/\/weread\.qq\.com\//.test(info.deepLink ?? '') ? info.deepLink : '' },
    chapters: unique(raw.chapters.map(c => ({ id: string(c.chapterUid), title: string(c.title), index: Number.isFinite(c.chapterIdx) ? c.chapterIdx : 999999 })), 'id'),
    highlights, reviews,
  };
}

function mergeRecords(oldRows, current) {
  const rows = new Map(oldRows.map(row => [row.id, { ...row, missing: true }]));
  for (const row of current) rows.set(row.id, { ...row, missing: false });
  return [...rows.values()];
}

function render(data, today) {
  const chapters = new Map(data.chapters.map(c => [c.id, c]));
  const ids = new Set([...data.highlights, ...data.reviews].map(r => r.chapter));
  const lines = ['## 微信读书记录', '', `更新于 ${today} · ${data.highlights.filter(r => !r.missing).length} 条划线 · ${data.reviews.filter(r => !r.missing).length} 条感想`, ''];
  const missing = row => row.missing ? '\n\n*本次接口未返回，保留上次记录。*' : '';
  const thought = r => `**当时的感想 · ${date(r.time)}**\n\n${plain(r.text)}${missing(r)}\n\n^wr-r-${sha(r.id).slice(0,16)}`;
  const highlight = h => `${quote(h.text)}\n\n*划线于 ${date(h.time)}*${missing(h)}\n\n^wr-h-${sha(h.id).slice(0,16)}`;
  for (const id of [...ids].sort((a,b) => (chapters.get(a)?.index ?? 999999) - (chapters.get(b)?.index ?? 999999) || a.localeCompare(b))) {
    const hs = data.highlights.filter(h => h.chapter === id).sort((a,b) => (parseInt(a.range) || 0) - (parseInt(b.range) || 0) || a.id.localeCompare(b.id));
    const rs = data.reviews.filter(r => r.chapter === id).sort((a,b) => (a.time ?? 0) - (b.time ?? 0) || a.id.localeCompare(b.id));
    const title = chapters.get(id)?.title || rs.find(r=>r.chapterName)?.chapterName || '未标明章节';
    lines.push(`### ${plain(title)}`, '');
    const used = new Set();
    const matched = hs.map(h => [h, rs.filter(r => r.range && r.range === h.range && hs.filter(other=>other.range===r.range).length===1)]);
    for (const [h, linked] of matched.filter(([, linked]) => linked.length)) {
      lines.push(highlight(h), '');
      for (const r of linked) { used.add(r.id); lines.push(thought(r), ''); }
    }
    for (const r of rs.filter(r => !used.has(r.id))) {
      if (r.abstract) lines.push(quote(r.abstract), '');
      lines.push(thought(r), '');
    }
    const only = matched.filter(([, linked]) => !linked.length).map(([h])=>h);
    if (only.length >= 5) {
      lines.push(`> [!quote]- 划线 · ${only.length} 条`);
      for (const h of only) lines.push('>', ...highlight(h).split('\n').map(line => `> ${line}`));
      lines.push('');
    } else for (const h of only) lines.push(highlight(h), '');
  }
  if (!ids.size) lines.push('本次未读取到个人划线或感想。', '');
  return lines.join('\n').trimEnd() + '\n';
}

function splitNote(note, bookId) {
  const [start, end] = markers(bookId);
  const begin = `\n${start}\n`, finish = `\n${end}`;
  if (note.split(begin).length !== 2 || note.split(finish).length !== 2) fail('同步区边界缺失或重复；请保留现有笔记并人工核对。');
  const a = note.indexOf(begin) + begin.length, b = note.indexOf(finish);
  if (b < a) fail('同步区边界顺序错误。');
  return { prefix: note.slice(0, a), body: note.slice(a, b), suffix: note.slice(b) };
}

function atomicWrite(filename, content, expected) {
  const current = fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : null;
  if (current !== expected) fail('文件在同步期间发生变化，已停止覆盖。');
  const temp = `${filename}.${randomUUID()}.tmp`;
  let fd;
  try {
    fd = fs.openSync(temp, 'wx', 0o600);
    fs.writeFileSync(fd, content); fs.fsyncSync(fd); fs.closeSync(fd); fd = undefined;
    if ((fs.existsSync(filename) ? fs.readFileSync(filename,'utf8') : null) !== expected) fail('文件在同步期间发生变化，已停止覆盖。');
    fs.renameSync(temp, filename);
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
    if (fs.existsSync(temp)) fs.unlinkSync(temp);
  }
}

export async function syncBook({ vault, bookId, notePath, client, today = date(Date.now()/1000) }) {
  if (!/^[A-Za-z0-9_-]+$/.test(bookId)) fail('书籍编号不合法。');
  vault = fs.realpathSync(vault);
  if (path.isAbsolute(notePath) || notePath.split(/[\\/]/).includes('..') || !notePath.endsWith('.md')) fail('笔记路径必须是 vault 内的 Markdown 相对路径。');
  if (!notePath.startsWith('inbox/')) fail('首次试用仅允许写入 inbox 中的独立阅读笔记。');
  const note = path.resolve(vault, notePath);
  const parent = fs.realpathSync(path.dirname(note));
  if (!parent.startsWith(vault + path.sep) || fs.existsSync(note) && fs.lstatSync(note).isSymbolicLink()) fail('不能通过符号链接写入笔记。');
  const codex = fs.realpathSync(path.join(vault, '.codex'));
  if (!codex.startsWith(vault + path.sep)) fail('本地状态路径不在 vault 内。');
  const stateDir = path.join(codex, 'weread-sync');
  if (fs.existsSync(stateDir) && fs.lstatSync(stateDir).isSymbolicLink()) fail('状态目录不能是符号链接。');
  fs.mkdirSync(stateDir, { recursive: true, mode: 0o700 });
  const statePath = path.join(stateDir, `${bookId}.json`), lock = path.join(stateDir, `${bookId}.lock`);
  if (fs.existsSync(statePath) && fs.lstatSync(statePath).isSymbolicLink()) fail('状态文件不能是符号链接。');
  let lockFd;
  try { lockFd = fs.openSync(lock, 'wx', 0o600); } catch { fail('同一本书已有同步任务或遗留锁；未执行写入。'); }
  try {
    fs.writeFileSync(lockFd, JSON.stringify({ pid: process.pid }));
    const stateText = fs.existsSync(statePath) ? fs.readFileSync(statePath, 'utf8') : null;
    const state = stateText === null ? null : JSON.parse(stateText);
    const oldNote = fs.existsSync(note) ? fs.readFileSync(note, 'utf8') : null;
    let split;
    if (state) {
      if (state.version !== 1 || state.data.book.id !== bookId || state.notePath !== notePath) fail('状态与书籍或目标路径不匹配。');
      if (oldNote === null) fail('已同步笔记已被移动或删除；不自动重新创建。');
      split = splitNote(oldNote, bookId);
      if (sha(split.body) !== state.bodyHash) fail('同步区曾被本地修改，或上次写入中断；现有内容未覆盖。');
    } else if (oldNote !== null) fail('目标笔记已存在但缺少同步状态；不接管或覆盖它。');
    const fetched = await fetchBook(client, bookId);
    const data = {
      book: fetched.book,
      chapters: [...new Map([...(state?.data.chapters ?? []), ...fetched.chapters].map(c=>[c.id,c])).values()],
      highlights: mergeRecords(state?.data.highlights ?? [], fetched.highlights),
      reviews: mergeRecords(state?.data.reviews ?? [], fetched.reviews),
    };
    const counts = { highlights: fetched.highlights.length, reviews: fetched.reviews.length, retainedMissing: [...data.highlights, ...data.reviews].filter(r=>r.missing).length };
    if (state && JSON.stringify(data) === JSON.stringify(state.data)) return { status: 'unchanged', notePath, ...counts };
    if (!state && !fetched.highlights.length && !fetched.reviews.length) return { status: 'empty', ...counts };
    const body = render(data, today).trimEnd();
    const [start, end] = markers(bookId);
    const yaml = value => JSON.stringify(value);
    const fresh = `---\nbook: ${yaml(data.book.title)}\nauthor: ${yaml(data.book.author)}\nweread_book_id: ${yaml(bookId)}\nsource: ${yaml(data.book.url)}\ncreated: ${today}\n---\n\n<!-- 可以在这里自由记录后来想到的内容，同步只更新下方标记之间的微信读书记录。 -->\n\n${start}\n${body}\n${end}\n`;
    const nextNote = split ? split.prefix + body + split.suffix : fresh;
    const nextState = JSON.stringify({ version: 1, notePath, bodyHash: sha(body), data }, null, 2) + '\n';
    // Write the note first. A crash before state persistence causes a conflict on retry, not silent data loss.
    atomicWrite(note, nextNote, oldNote);
    atomicWrite(statePath, nextState, stateText);
    return { status: state ? 'updated' : 'created', notePath, ...counts };
  } finally {
    fs.closeSync(lockFd); fs.unlinkSync(lock);
  }
}

function readKey() {
  if (process.env.WEREAD_API_KEY) return process.env.WEREAD_API_KEY.trim();
  try {
    return execFileSync('/usr/bin/security', ['find-generic-password', '-a', os.userInfo().username, '-s', 'zhpmind-weread', '-w'], { encoding: 'utf8', stdio: ['ignore','pipe','pipe'], timeout: 30000 }).trim();
  } catch { fail('无法读取本机 zhpmind-weread 钥匙串授权；不显示密钥。'); }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2), options = {};
    if (!args.length || args.includes('--help')) {
      console.log('node zhpmind-sync.mjs --book-id ID --note inbox/书名-阅读记录.md [--vault PATH]');
    } else {
      for (let i=0; i<args.length; i+=2) {
        if (!['--book-id','--note','--vault'].includes(args[i]) || !args[i+1] || options[args[i]]) fail('参数不完整或重复。');
        options[args[i]] = args[i+1];
      }
      if (!options['--book-id'] || !options['--note']) fail('请指定书籍编号和目标笔记。');
      console.log(JSON.stringify(await syncBook({ vault: options['--vault'] ?? ROOT, bookId: options['--book-id'], notePath: options['--note'], client: new Gateway(readKey()) })));
    }
  } catch (error) {
    console.error(error instanceof SyntaxError ? '本地状态格式异常，请先核对，未继续同步。' : error.message);
    process.exitCode = 1;
  }
}
