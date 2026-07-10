---
type: skill
title: book-mirror
status: draft
created: 2026-06-03
updated: 2026-07-10
tags:
  - system-skill
  - tool-codex
  - book-mirror
  - quality-check
sources: []
source_count: 0
references:
  - claude-drafts/handoff-book-mirror.md
  - .codex/skills/book-mirror/SKILL.md
  - ~/.hermes/scripts/book-split.py
  - ~/.hermes/scripts/cross-eval-run.py
  - skill-cross-eval.md
  - garry-tan-meta-meta-prompting.md
---

# book-mirror

book-mirror 是 ZHPMind 的书籍镜射工作流：把一本书按章拆成 verbatim 源文，让 Codex 逐章生成「原作观点 / 映射到我的真实生活」双栏草稿，再由 Hermes cross-eval 和 Haopeng 人审共同 gate，最后组装进正式 book 页。

它不是普通摘要工具。摘要回答“这本书说了什么”；book-mirror 回答“这本书怎样照见 Haopeng 的真实生活、项目、关系和决策”。

## 是什么

- **Codex 执行体**：`.codex/skills/book-mirror/SKILL.md`
- **确定性拆书脚本**：`~/.hermes/scripts/book-split.py`
- **评审 gate**：`~/.hermes/scripts/cross-eval-run.py`
- **当前状态**：`status: draft`。Part A 执行链已落地；`book-split.py` 已通过 `/private/tmp` 最小 EPUB dogfood；OpenAI/GPT + DeepSeek gate 已通过 smoke，Claude 槽位仅作历史/可选补充，首本仍在按章试跑。

## 设计意图

Garry Tan 的 Book Mirror 给了一个核心启发：读书不是把书变成摘要，而是让每章原作者思想和读者真实生活互相映照。ZHPMind 的版本需要再加三道约束：

1. **证据链诚实**：源文必须是 EPUB 确定性拆出的 verbatim 文本，不能让 LLM 转写。
2. **镜射不虚构**：右栏映射必须锚定 vault 里的真实事实，每条带日期和来源。
3. **模型只做闸门，人做 ground truth**：cross-eval 查虚构、太泛、缺锚点；Haopeng 判断 resonance 是否真的成立。

## Part A 流程

### 1. 拆书

```bash
python3 ~/.hermes/scripts/book-split.py \
  wiki/raw/assets/books/{书名-作者}.epub \
  claude-drafts/book-mirror/{book-slug}
```

输出：

```text
claude-drafts/book-mirror/{book-slug}/
├── manifest.json
├── source/ch-{NN}.md
└── draft/ch-{NN}.md
```

`source/ch-*.md` 是 cross-eval 的证据链，不加 frontmatter、不加 LLM 解释。

### 2. 按章吐稿

Codex 对每章生成 staging draft：

```markdown
| 原作观点 | 映射到我的真实生活 |
|---|---|
| {原作要点 A} | YYYY-MM-DD [来源:...] {锚定一个具体事实的映射} |
```

找不到真实锚点时放进「不生成的候选」，不要硬写。

### 3. 按章 cross-eval

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

镜射事实锚点也是证据链：每章必须把 `wiki/pages/zhanghaopeng.md` 和 draft 所有 `[来源:]` 文件一并作为 `--source-ref`。只喂书章原文时，评审模型无法核验 Haopeng 事实，会产生“来源不可验证”的红旗或假放行。任一锚点文件缺失、任一章红旗未修，整本不组装。

## 已定组装结构

2026-06-03 已定：正式 book 页采用 B 结构，Codex 默认按此组装，不再停下确认“摘要 vs 镜射”的关系。

```markdown
## 核心总览

（现有摘要收缩到几段，理解层，可重写。）

## 镜射（按章）

### 第 {N} 章 — {章标题}

| 原作观点 | 映射到我的真实生活 |
|---|---|
| ... | YYYY-MM-DD [来源:...] ... |
```

理由：

- 守信息三态：核心总览是理解层，镜射右栏是带日期的事件 / 反思。
- 不破坏已提交蒸馏稿：摘要保留并收缩，不被双栏吃掉。
- 粒度自然：主题摘要和按章镜射不硬塞进同一张表。
- Garry 的“镜射是正文”通过“镜射占页面主体”实现，不靠物理上吃掉摘要。

适用边界：

- 人生 / 心理 / 哲学书：适合 mirror。
- 方法书 / 业务书：默认不走 mirror，除非 Haopeng 明确指定。

## Part B 审核标准

模型查：

| 问题 | 判定 |
|---|---|
| 虚构 Haopeng 事实 | 红旗，必须改或删 |
| 太泛 | 补锚点或删 |
| 缺锚点 | 补具体来源或删 |
| 无虚构但是否成立 | 标成待人定，不替 Haopeng 判断 |

Haopeng 查：

- 这条映射真的贴合吗？
- 锚点事实是否准确？
- 是否值得留在书页？
- 是否需要升格成独立 `reflection` 页？

## 实战 Pitfalls

| Pitfall | 性质 | 应对 |
|---|---|---|
| 源文若由 LLM 转写，cross-eval 会在伪证据链上评审 | 证据链污染 | 源文只由 `book-split.py` 确定性拆出，Codex 不碰 source |
| 同一 XHTML 多个 TOC anchor 可能被误拆成一整章 | EPUB 结构陷阱 | `book-split.py` 已支持 fragment 截段，`/private/tmp` dogfood 验证通过 |
| 右栏容易写成“创业者通常会...” | 泛化陷阱 | 每条必须带日期和 vault 来源；无锚点放入「不生成的候选」 |
| cross-eval 只喂书章源文，没喂 `[来源:]` 锚点文件，模型无法核验 Haopeng 事实 | 证据链缺口 | 每章强制把 `wiki/pages/zhanghaopeng.md` + 所有 `[来源:]` 文件作为重复的 `--source-ref`；缺文件即阻断，不放进 `--discarded` |
| 摘要与镜射关系曾未定，组装时容易停顿 | 流程未定 | 已定 B 结构：`## 核心总览` + `## 镜射（按章）` |
| 模型容易越权判断 resonance | 职责边界 | cross-eval 只查虚构 / 太泛 / 缺锚点；是否真的戳中由 Haopeng 判 |

## 待解决

- 用首本章节按新 source-ref 规则重跑完整 cross-eval，确认 Haopeng 事实可核验。
- 首本完成后回填真实 Pitfalls，特别是“锚点搜索不足”和“按章镜射过密”两类风险。
- 决定首本候选：优先人生 / 心理 / 哲学书，不从方法书或业务书开始。

## References

- [[garry-tan-meta-meta-prompting]] — Book Mirror 灵感来源
- [[skill-cross-eval]] — 按章互评 gate
- `claude-drafts/handoff-book-mirror.md` — 本工作流 handoff
- `.codex/skills/book-mirror/SKILL.md` — Codex 执行体
- `~/.hermes/scripts/book-split.py` — EPUB 确定性拆章脚本
