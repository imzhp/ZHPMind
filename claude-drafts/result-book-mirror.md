---
type: result
from: codex
to: chat-claude
task: book-mirror
created: 2026-06-03
updated: 2026-06-04
---

# Result — Book Mirror Part A

## 总裁决

已按 `claude-drafts/handoff-book-mirror.md` 的 Part A 落地基础执行链,并按 2026-06-03 定稿补齐组装规则与 skillify 页。

- 确定性拆书脚本:`~/.hermes/scripts/book-split.py`
- Claudian skill:`.claude/skills/book-mirror/SKILL.md`
- cross-eval 接入方式:按章调用现有 `~/.hermes/scripts/cross-eval-run.py`
- skillify 页:`wiki/pages/skill-book-mirror.md`

Claude + GPT + DeepSeek 三模型 gate 已通过 smoke。首本已进入按章试跑阶段；当前新增硬约束是镜射 cross-eval 必须同时读取书章源文与全部 vault 事实锚点。

## 0. 本次追加

按 handoff Part A #4 已定方案,已把组装规则从“摘要 vs 镜射未决则停下确认”改为默认 B 结构:

```markdown
## 核心总览

（现有摘要收缩到几段，理解层，可重写。）

## 镜射（按章）

### 第 {N} 章 — {章标题}

| 原作观点 | 映射到我的真实生活 |
|---|---|
| ... | YYYY-MM-DD [来源:...] ... |
```

同步修改:

- `.claude/skills/book-mirror/SKILL.md`
  - Step 6 默认按 B 结构组装
  - 删除“遇到摘要 vs 镜射未决就停下确认”的旧规则
  - 明确人生 / 心理 / 哲学书适合 mirror;方法书 / 业务书默认不走 mirror
  - Step 4 强制把 `wiki/pages/zhanghaopeng.md` 与 draft 所有 `[来源:]` 文件作为 `--source-ref`
- `wiki/pages/skill-book-mirror.md`
  - 新增 skillify 反思页
  - 收录 Part A 流程、Part B 审核标准、B 结构组装、Pitfalls 与待解决问题
- `wiki/pages/index.md`
  - Skills 区新增 `[[skill-book-mirror]]`
  - index 更新时间与页面数更新为 86
- `wiki/log.md`
  - 追加 `2026-06-03 skillify | book-mirror 组装规则定稿 + skill 反思页`

## 1. book-split.py

新增:

```text
~/.hermes/scripts/book-split.py
```

用途:

- 输入 EPUB 路径 + Book Mirror staging 根目录
- 从 EPUB container / OPF 读取 manifest、spine、nav / ncx TOC
- 优先按 EPUB TOC 拆章;没有 TOC 时回退到 spine
- 从 XHTML/HTML 中确定性提取纯文本
- 输出到:

```text
claude-drafts/book-mirror/{book-slug}/source/ch-{NN}.md
```

关键约束:

- `source/ch-*.md` 不加 frontmatter、不加生成标题、不写 Claudian 评论,避免污染 cross-eval 证据链。
- 章节标题、EPUB href、字符数、拆分关系写入 `manifest.json`。
- 默认 `--max-chars 60000`,与 cross-eval 当前默认对齐。
- 超长章按段落继续拆成 `ch-01a.md` / `ch-01b.md`。
- 非破坏默认:若 `source/` 非空,不覆盖;需要重拆时显式传 `--force`。

使用:

```bash
python3 ~/.hermes/scripts/book-split.py \
  wiki/raw/assets/books/{书名-作者}.epub \
  claude-drafts/book-mirror/{book-slug}
```

## 2. Claudian book-mirror skill

新增:

```text
.claude/skills/book-mirror/SKILL.md
```

职责:

- 检查 `manifest.json` 与 `source/ch-*.md`
- 逐章读取 source 与 vault 真实素材
- 生成 `draft/ch-{NN}.md` 双栏草稿
- 每条右栏映射必须带日期与 vault 来源
- 找不到真实锚点时写入「不生成的候选」,不硬凑
- draft 只进 staging,不碰 `wiki/pages/`
- 每章调用 cross-eval
- 全章过 + Haopeng 认可后,才组装进 book 页

双栏 draft 目标:

```markdown
| 原作观点 | 映射到我的真实生活 |
|---|---|
| {原作要点 A} | YYYY-MM-DD [来源:...] {锚定一个具体事实的映射} |
```

## 3. 组装流程

skill 中已写入 gate:

- 任一章无报告、红旗未修、或 Haopeng 未认可,不写 `wiki/pages/`。
- 正式 book 页默认按 B 结构组装:`## 核心总览` + `## 镜射（按章）`。
- 如果 book 页已有 `## Mirror` / `## 镜射` 占位,通过 gate 后替换为 `## 镜射（按章）`。
- 如果已有正式镜射,不覆盖旧映射,按日期追加 reread 小节。
- 摘要保留但收缩为核心总览;不再让“双栏吃掉摘要”。
- 组装后再更新 `wiki/pages/index.md`、`wiki/log.md` 并提交。

## 4. 验证状态

已验证:

- Claudian skill 结构沿用现有 `.claude/skills/{name}/SKILL.md` 目录式协议。
- `book-split.py` 使用 Python 标准库,不依赖额外安装。
- `book-split.py` 的默认 `--max-chars 60000` 与 cross-eval 当前默认一致。
- `book-split.py` 语法检查通过。
- `book-split.py` 已加可执行位。
- `/private/tmp` 最小 EPUB dogfood 通过:同一 XHTML 文件内两个 TOC anchor 被拆成 `source/ch-01.md` 与 `source/ch-02.md`。

dogfood 输出:

```json
{"manifest": "/private/tmp/book-mirror-smoke/out/manifest.json", "written": 2, "warnings": []}
```

manifest 关键段:

```json
{
  "book_title": "Smoke Book",
  "chapters": [
    {
      "file": "source/ch-01.md",
      "title": "Chapter One",
      "epub_href": "OEBPS/chapters.xhtml",
      "epub_fragment": "c1",
      "chars": 66
    },
    {
      "file": "source/ch-02.md",
      "title": "Chapter Two",
      "epub_href": "OEBPS/chapters.xhtml",
      "epub_fragment": "c2",
      "chars": 43
    }
  ],
  "warnings": []
}
```

待首本前验证:

- 用真实 EPUB 跑一次 `book-split.py`。
- 抽查 `manifest.json` 与 2-3 个 `source/ch-*.md` 是否按 TOC 拆章。
- 用首本章节按新 source-ref 规则重跑完整 cross-eval。

## 下一步

首本建议流程:

```bash
python3 ~/.hermes/scripts/book-split.py \
  wiki/raw/assets/books/{书名-作者}.epub \
  claude-drafts/book-mirror/{book-slug}
```

然后让 Claudian 按 `book-mirror` skill 逐章生成:

```text
claude-drafts/book-mirror/{book-slug}/draft/ch-{NN}.md
```

再按章跑:

```bash
python3 ~/.hermes/scripts/cross-eval-run.py \
  --draft-path claude-drafts/book-mirror/{book-slug}/draft/ch-{NN}.md \
  --source-ref claude-drafts/book-mirror/{book-slug}/source/ch-{NN}.md \
  --source-ref wiki/pages/zhanghaopeng.md \
  --source-ref wiki/pages/{draft-引用的-page}.md \
  --source-ref {draft-引用的其他-vault-文件} \
  --content-type mirror \
  --chapter-id ch-{NN}
```
