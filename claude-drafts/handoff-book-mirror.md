---
type: handoff
from: chat-claude
to: codex + haopeng
task: book-mirror-wiring-and-review-standard
created: 2026-06-02
updated: 2026-06-04
---

# 书镜：按章吐稿对接 + 镜射列审核标准

> 前置已就绪：Hermes cross-eval 已建、按章评审硬约束已加、Claude + GPT + DeepSeek 三模型路径已验。
> 本文件 Part A 给 Codex 实现（Claudian 侧 + 一个确定性脚本）；Part B 给 Haopeng 用、并喂进 cross-eval prompt + skillify 进 vault。

---

## 全流程（一本书）

```
1. [确定性脚本] 拆书：epub → 每章 verbatim 源文              (Codex 建 book-split.py)
2. [Claudian]   每章子 agent：读该章源 + 调我 vault 真实素材 → 双栏 draft   (book-mirror skill)
3. [Hermes]     每章 cross-eval（喂 draft + 该章源）→ inbox 报告           (已建)
4. [Haopeng]    逐章审报告：按 Part B 标准 改/删/留/升格
5. [组装·gate]  全章过 + 你认可 → 组装进 wiki/pages/{book}.md + index/log/propagation
```

关键纪律：**源文必须是 verbatim 原文，不能由 Claudian 转写**。cross-eval 的证据链诚实性全靠这个——评审模型要对照的是书的真话，不是作者模型的复述。所以拆书是确定性步骤、独立于 Claudian。

---

## Part A — 按章吐稿对接（Codex 实现）

### 暂存布局

```
claude-drafts/book-mirror/{book-slug}/
├── source/ch-{NN}.md     ← 确定性拆出的 verbatim 章节原文
└── draft/ch-{NN}.md      ← Claudian 的该章双栏镜射稿（pre-gate，不进 wiki/pages）
eval 报告 → inbox/cross-eval-{book-slug}-ch{NN}-{date}.md（Hermes 写）
```

claude-drafts/ 同步可见、Codex/Hermes 可读；Hermes 只往 inbox 写报告（守状态边界）。

### 步骤 1：拆书脚本（新建 `~/.hermes/scripts/book-split.py`，确定性 .py）

- 入参：epub 路径（`wiki/raw/assets/books/{书名-作者}.epub`）+ 输出目录
- 按 epub TOC 拆成每章 verbatim 文本 → `source/ch-{NN}.md`
- 若某章超过 cross-eval 的 `--max-chars`（mirror 默认不允许裁切）→ 再细分 `ch-{NN}a` / `ch-{NN}b`
- 不做任何改写/摘要，原样落盘

### 步骤 2：Claudian book-mirror skill（每章子 agent）

对每个 `ch-{NN}`：读 `source/ch-{NN}.md` + 调我 vault 里相关真实素材（journal / projects / 曜野 上下文）→ 产 `draft/ch-{NN}.md`，**双栏**（照 Garry）：

```
## 第 {N} 章 — {章标题}

| 原作观点 | 映射到我的真实生活 |
|---|---|
| {原作要点 A} | [2026-06-XX] {锚定我一个具体事实的映射} |
| {原作要点 B} | [2026-06-XX] {…} |
```

- 左栏 = 原作观点（理解，可重写）；右栏 = 映射（**每条带日期** = 事件/反思，append）
- 右栏必须锚定 vault 里的真实事实；**禁止泛泛、禁止虚构我没有的事实**
- draft 只进 staging，不碰 wiki/pages

### 步骤 3：每章 cross-eval（Hermes，已建）

镜射 cross-eval 的证据链必须同时包含：

1. 该章 verbatim 源文。
2. `wiki/pages/zhanghaopeng.md`（每章必带）。
3. draft 每条 `[来源:]` 指向的 vault 文件；`[[page-name]]` 解析为对应 `wiki/pages/page-name.md`。

这些文件都必须作为重复的 `--source-ref` 传入。缺任一锚点文件则阻断评审；不得只喂书章源文，也不得把事实锚点放进 `--discarded`。

```bash
python3 ~/.hermes/scripts/cross-eval-run.py \
  --draft-path claude-drafts/book-mirror/{slug}/draft/ch-{NN}.md \
  --source-ref claude-drafts/book-mirror/{slug}/source/ch-{NN}.md \
  --source-ref wiki/pages/zhanghaopeng.md \
  --source-ref wiki/pages/{draft-引用的-page}.md \
  --source-ref {draft-引用的其他-vault-文件} \
  --content-type mirror --chapter-id {NN}
```

### 步骤 5：组装 + gate

全章 cross-eval 过 + Haopeng 认可后，Claudian 组装进 `wiki/pages/{book}.md`，**按已定结构（见下 #4）**：顶部 `## 核心总览`（现有摘要收缩到几段，理解层、可重写）+ 下方 `## 镜射（按章）`（主体：每章 原作观点 ‖ 带日期映射，append）。frontmatter 按现有 book 页规范，再 index / log / propagation。**这一步被 gate 住**——任一章未过或你未认可，不写 wiki/pages。

### 留给 Codex / Haopeng 定的

1. `book-split.py` 是否新建（建议建，verbatim 拆章是证据链前提）。
2. 章粒度 = epub TOC；超长章自动细分。
3. 组装由 Claudian 做、你确认后提交。
4. **最终书页结构 —— 已定（2026-06-03）：摘要保留、镜射另起，镜射作主体；不做"双栏吃掉摘要"。** 页面 = 顶部 `## 核心总览`（现有摘要收缩到几段，理解层、可重写）+ 下方 `## 镜射（按章）`（主体：每章 原作观点 ‖ 带日期映射，append）。理由：① 守信息三态——「理解」与「事件」不焊进同一表格格子（Layer-1 不变量，压过 Garry 双栏这个 Layer-3 渲染细节）；② 不毁已提交的蒸馏稿，非破坏、可回退；③ 主题摘要与按章镜射粒度对不上，硬塞别扭。Garry 的"镜射是正文"靠"镜射占页面主体 + 摘要缩成总览头"实现，不靠物理左右两栏。**仅适用于真正走 mirror 的人生/心理/哲学书；方法/业务书不走 mirror。Claudian 组装时按此默认结构直接组，不再停下确认。**

---

## Part B — 镜射列审核标准

**两个审查者，范围不同。别让模型干人的活，也别让人重做模型能做的。**

### B1 模型查（cross-eval 三模型，自动）—— 只查模型能查的

- 🔴 **虚构**：映射断言了源文 / vault 上下文里**没有**的关于 Haopeng 的事实 → 红旗，必须改或删
- 🟡 **太泛**：放谁身上都成立、无具体锚点 → 改成锚定，或删
- 🟡 **缺锚点**：没引用一个具体事实 / 事件 / 决策 → 补锚点，或删
- 模型**不判**："一条无虚构、有锚点、够具体的映射，是否真的成立" —— 那是 Haopeng 的事，模型只能列进"待人定"

### B2 Haopeng 查（人，唯一 ground truth）—— 只有你能判的

- **真伪 / resonance**：这条映射真的贴合吗？连接是真的，还是硬凑的？
- **锚点准确性**：模型锚到"你把曜野转向 X"——这事实对吗？（模型核不了，你能）
- **价值**：留着能加深理解，还是噪声？
- **升格**：哪几条特别戳中 → 升成独立 `reflection` 页（像 desires-energy-trap），propagation 建链

### B3 逐条决策表（你过每章 eval 报告时照这个走）

| 报告里的标记 | 你的动作 |
|---|---|
| 🔴 虚构 / 事实错 | 必须改或删；改完**重跑该章 cross-eval** |
| 🟡 太泛 / 缺锚点 | 补锚点改写，或删 |
| 待人定（模型放行、请你确认） | 你判：留 / 精修 / 删 |
| 模型全过 + 你认可 | 留在书页镜射列；特别戳中的 → 升 reflection 页 |

### B4 三态约束（守你的 Layer-1 不变量）

- 镜射列每条**带日期** = 事件 / 反思，append-only；同章 re-read 不覆盖旧映射，加新日期条
- 原作列 = 理解，可重写
- 这样"双栏"（照 Garry）与"信息三态"（你的宪法）不打架

### skillify

把 Part A 流程 + Part B 标准落 `wiki/pages/skill-book-mirror.md`（或并入 skill-cross-eval.md），作为以后所有书镜的规矩，可讨论可迭代。

---

## 一个搁置的宪法张力（不在本轮，记一笔）

design-principles 把 `book` 归为"理解（双栏映射），基本不改"，但镜射列本质是"事件（dated append）"。这俩在宪法层有张力。本设计用"左栏理解 / 右栏带日期事件"先实务化解了，但哪天 review 宪法时值得正式理一理 book 类型的三态归属。
