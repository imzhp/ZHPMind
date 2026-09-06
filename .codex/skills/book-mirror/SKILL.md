---
name: book-mirror
description: 在用户明确要求按章书镜或组装已审书镜时，生成双栏草稿并按 B 结构组装；保留 cross-eval 与人审门槛。普通阅读、随想、启发讨论和摘要不调用此流程。
---

# book-mirror

## 调用场景

- Haopeng 明确要求按章书镜、继续已指定的章节，或组装已审书镜。
- 仅有 source / draft 文件存在，不是继续执行的授权；普通“这对我有什么启发”不触发此 skill。
- 先读 vault 根 AGENTS.md 和 wiki/CLAUDE.md。只处理本次指定范围，不为凑齐整本自动启动剩余章节。
- 外部评审须在本次材料外发授权范围内；未获授权时停在草稿，不自动发送身份与家庭材料，也不省略证据伪造通过。

## 不变量

1. **源文必须来自确定性拆章**：`source/ch-*.md` 由 `~/.hermes/scripts/book-split.py` 从 EPUB 拆出。Codex 不转写、不摘要源文来替代 source。
2. **draft 只进 staging**：逐章草稿只写 `claude-drafts/book-mirror/{book-slug}/draft/ch-*.md`，不碰 `wiki/pages/`。
3. **右栏必须锚定真实事实**：每条映射都要带日期，并指向 vault 中可核查的 journal / projects / wiki / raw / 对话材料。找不到锚点就写「不生成」，不要泛泛硬凑。
4. **按章 cross-eval**：每章 draft 生成后，用该章 `source/ch-*.md`、`wiki/pages/zhanghaopeng.md` 和该章 draft 每条 `[来源:]` 指向的文件共同做 `--source-ref`。禁止整书长稿一次性评审，也禁止只喂书章源文、不喂镜射事实锚点。
5. **组装被 gate 住**：所有章节 cross-eval 过 + Haopeng 明确认可后，才允许写 `wiki/pages/{book-slug}.md`。
6. **默认 B 结构组装**：正式 book 页采用「核心总览 + 镜射（按章）」结构；不再因“摘要 vs 镜射”关系未决而停下确认。

## Staging 布局

```text
claude-drafts/book-mirror/{book-slug}/
├── manifest.json
├── source/
│   └── ch-{NN}.md
└── draft/
    └── ch-{NN}.md
```

Hermes cross-eval 报告写入 `inbox/cross-eval-*.md`，Codex 不直接写报告。

## Step 0 — 源文拆章检查

先检查：

- `claude-drafts/book-mirror/{book-slug}/manifest.json`
- `claude-drafts/book-mirror/{book-slug}/source/ch-*.md`

如果不存在，停止当前 skill 写作，交给 Hermes 确定性脚本：

```bash
python3 ~/.hermes/scripts/book-split.py \
  wiki/raw/assets/books/{书名-作者}.epub \
  claude-drafts/book-mirror/{book-slug}
```

注意：`source/ch-*.md` 不应有 frontmatter 或 Codex 生成的标题包裹。章节标题看 `manifest.json`。

## Step 1 — 选择本章

对每个待处理章节：

1. 从 `manifest.json` 读取章节标题、源文件名、字符数。
2. 读取对应 `source/ch-{NN}.md`。
3. 如果源文件超过 cross-eval 当前 `--max-chars`，停止，要求 Codex 重新拆分；不要裁切。

## Step 2 — 找 vault 锚点

围绕本章原作观点，读取并筛选真实素材：

- `wiki/pages/zhanghaopeng.md`
- `wiki/pages/wildlume-*.md`
- `projects/**`
- `inbox/**` 中仍未蒸馏但明确相关的随记
- 与本书主题相关的既有 `wiki/pages/*.md`

每条右栏映射必须能回指一个具体事实、事件、决策或反思。可用锚点格式：

- `2026-06-03 [来源:[[wildlume-business-architecture]]] ...`
- `2026-05-29 [来源:projects/amazon-learning/README.md] ...`
- `2026-06-02 [来源:inbox/1随记.md] ...`

禁止把「我可能」「Haopeng 应该」「创业者通常」写成 Haopeng 的事实。

## Step 3 — 写按章双栏 draft

写入：

```text
claude-drafts/book-mirror/{book-slug}/draft/ch-{NN}.md
```

格式：

```markdown
---
type: book-mirror-draft
book: {book-slug}
chapter_id: ch-{NN}
chapter_title: {章标题}
source: claude-drafts/book-mirror/{book-slug}/source/ch-{NN}.md
status: pre-gate
created: YYYY-MM-DD
---

# 第 {N} 章 — {章标题}

| 原作观点 | 映射到我的真实生活 |
|---|---|
| {原作要点 A} | YYYY-MM-DD [来源:...] {锚定一个具体事实的映射} |
| {原作要点 B} | YYYY-MM-DD [来源:...] {锚定一个具体事实的映射} |

## 不生成的候选

| 原作观点 | 不生成原因 |
|---|---|
| {原作要点 C} | 缺少 vault 锚点 / 太泛 / 需要 Haopeng 判断 |
```

写作要求：

- 左栏可以用自己的话概括原作观点，但必须忠实于本章。
- 右栏每格只放一条清晰映射；复杂映射拆多行。
- 每条右栏都要有日期与来源。
- 找不到真实映射时，宁可放进「不生成的候选」，不要硬写。
- draft 不更新 `wiki/log.md`，不更新 `wiki/pages/index.md`，不提交正式书页。

## Step 4 — 每章 cross-eval

draft 写完后，调用 Hermes cross-eval：

先从 draft 中收集证据链：

1. 该章书籍源文 `source/ch-{NN}.md`。
2. 身份锚点 `wiki/pages/zhanghaopeng.md`（每章必带）。
3. 每条镜射 `[来源:]` 指向的 vault 文件；`[[page-name]]` 解析为对应 `wiki/pages/page-name.md`，显式路径按原路径加入。
4. 任一来源文件不存在时，停止并修正 draft；不得省略来源继续评审。
5. 锚点文件必须作为 `--source-ref`，不得放进 `--discarded`。`--discarded` 只用于被放弃的中间候选。

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

处理结果：

- `红旗阻断`：必须改或删对应行，重跑该章。
- `需修后复评`：按报告修 draft，重跑该章。
- `pass`：进入 Haopeng 人审。
- `待人定项`：交给 Haopeng 判定留 / 精修 / 删。

## Step 5 — Haopeng 人审

Haopeng 对每章做唯一 ground truth 判断：

- 这条映射真的贴合吗？
- 锚点是否准确？
- 是否值得留在书页？
- 是否有特别戳中的条目需要升格成独立 `reflection` 页？

Codex 只能记录决定，不能替 Haopeng 判定 resonance。

## Step 6 — 组装进 book 页

只有满足全部条件才进入组装：

- 所有 `draft/ch-*.md` 已生成。
- 每章都有对应 cross-eval 报告。
- 每章没有未解决的红旗或需修项。
- Haopeng 明确说可以组装。

组装目标：

```text
wiki/pages/{book-slug}.md
```

组装规则：

1. 如果 book 页不存在，按 `wiki/CLAUDE.md` 的 `type: book` 规范创建。
2. 默认按 B 结构组装：
   - 顶部 `## 核心总览`：把现有摘要收缩为几段，属于理解层，可重写。
   - 下方 `## 镜射（按章）`：页面主体，按章列出「原作观点」与「带日期映射」，右栏 append-only。
3. 不做“镜射双栏吃掉摘要”。摘要保留，但降为核心总览；镜射另起，并作为页面主体。
4. 如果已有 `## Mirror` / `## 镜射` 占位，把占位替换为 `## 镜射（按章）`。
5. 如果已有正式镜射内容，不覆盖旧映射；按日期追加新一轮 reread 小节。
6. 仅对真正适合 mirror 的人生 / 心理 / 哲学书执行本结构；方法书、业务书默认不走 mirror。
7. 组装后按 `wiki/CLAUDE.md` §4–5 更新实际受影响的索引与日志；不自动传播到人物页、概念页，不自行 git，留给 mini watcher。

推荐组装形态：

```markdown
## 核心总览

（将既有摘要收缩为几段，保留原书最核心的理解。）

## 镜射（按章）

### 第 {N} 章 — {章标题}

| 原作观点 | 映射到我的真实生活 |
|---|---|
| ... | YYYY-MM-DD [来源:...] ... |
```

## 自检清单

- [ ] source 来自 `book-split.py`，不是 Codex 转写。
- [ ] draft 只写入 `claude-drafts/book-mirror/.../draft/`。
- [ ] 每条右栏有日期。
- [ ] 每条右栏有真实 vault 来源。
- [ ] 没有把猜测写成 Haopeng 事实。
- [ ] 每章都按章跑 cross-eval。
- [ ] 每章 cross-eval 都把 `wiki/pages/zhanghaopeng.md` 与所有 `[来源:]` 文件作为 `--source-ref`。
- [ ] 没有在 gate 前写 `wiki/pages/`。
- [ ] 组装时采用 `## 核心总览` + `## 镜射（按章）`。
- [ ] 核心总览保留并收缩既有摘要，没有让双栏吃掉摘要。
- [ ] 镜射列 append-only，没有覆盖旧 Mirror / 旧镜射。

## References

- Handoff：`claude-drafts/handoff-book-mirror.md`
- cross-eval：`~/.hermes/skills/cross-eval/SKILL.md`
- 拆书脚本：`~/.hermes/scripts/book-split.py`
- 规范：`wiki/CLAUDE.md` §13 Book Mirror / cross-eval
