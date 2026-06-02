# Handoff — Hermes 三模型 cross-eval skill（红线 #2 落地）

> 目标读者：Codex（mini，落地执行）/ Hermes
> 设计来源：chat-Claude（按需顾问），2026-06-02
> 通道：本文件应置于 `claude-drafts/`，同步到 mini 供 Codex 读；执行结果回写 `claude-drafts/result-hermes-cross-eval.md`

---

## 0. 定位（先读，别把它做窄）

这个 skill **不是"书镜的一个功能"**，它是 ZHPMind **红线第二条（互评）的真正落地**——所有 AI 写入（distill / mirror / harvest / propagation）的通用质检层。现在 `wiki/CLAUDE.md` §13.2 写了原则、停在 self-review；本 skill 把它推进到"目标实现"。书镜只是**第一个、也是最该上它的消费者**（镜射最容易瞎编）。设计时按"通用质检层"建，不要写死成 mirror 专用。

---

## 1. 落地次序（每步是下一步硬前置）

1. **Hermes 立起来**：gateway launchd 持久化 + 重启 + 验通 `vault-tidy` 的 dogfood（这是已部署、就差重启验证的第一个 skill，拿它当平台冒烟测试，证明 Hermes 能端到端跑通一个 skill，再叠三模型）。
2. **多模型接入**：GPT / DeepSeek / 通义(Qwen) 的 API key + Surge 路由 + Hermes 多 profile 配置。
3. **建本 skill**：`~/.hermes/skills/cross-eval.md`（判断层）+ `~/.hermes/scripts/cross-eval-run.py`（确定性层：调各模型 API、聚合、格式化）。flat siblings，不嵌套。
4. **书镜接上**（见 §6）。

---

## 2. 核心设计原则

- **喂证据链，不是喂成品。** 每个评审模型拿到的输入是「raw 原文 + 草稿（+ 被丢弃的候选/中间产物，若有）」，**不是**只看渲染好的页面。只看成品的审查是"制造安全感不是安全性"，抓不出"它编了个来源 / 套了句空话"。这是本 skill 成立的前提，不可省。
- **跨家系才算数。** 草稿作者是 Claudian（Claude 家系），所以评审模型**必须是不同家系**——同家系自审 = self-review 老毛病，等于没审。评审池里至少两个非 Claude 家系。
- **确定性下沉 script，判断留 skill。** 调 API、并发、超时重试、聚合打分、生成报告 = `cross-eval-run.py`；每个模型的评审 rubric、措辞、严重度判定 = `cross-eval.md` 的 prompt。
- **状态边界：只写 inbox。** eval 报告落 `inbox/`，绝不直接改 `wiki/pages/`。修不修、怎么修，是人 + Claudian 的事。
- **gate，不是 advisory。** 报告里给明确裁决（pass / 需修后复评 / 红旗阻断），定稿这一步被它 gate 住——不是只留个注解就放行。

---

## 3. 三模型分工（照 Garry，按可用模型适配）

| 角色 | 模型（建议） | 查什么 |
|---|---|---|
| 精确 | Claude Opus（注意：若作者是 Opus，精确这关换非 Claude 家系顶上，保证跨家系） | 事实/引用是否准确、有没有曲解原作 |
| 遗漏 | GPT | 漏了哪些关键章节/观点、该映射没映射 |
| 太泛 | DeepSeek 或 通义 | 是否套话、放谁身上都成立、缺具体锚点 |

> 关键约束：**评审池里至少 2 个非 Claude 家系**。具体选哪几个 + key/Surge 路由 = Codex 配置项，不在本设计内写死。

---

## 4. 两类内容，两套判据（重要）

书镜（及任何含主观映射的产出）有两列，cross-eval 对两列判据不同：

- **摘要 / 原作列（客观）**：对照 raw 原文查**事实准确性、遗漏、曲解**。这是 self-review 最替不了的地方，三模型在这列价值最大。
- **映射 / 镜射列（主观，关于 Haopeng 本人）**：模型**能**抓的是——① **虚构**：断言了所喂 vault 上下文里没有的关于 Haopeng 的事实；② **太泛**：放谁身上都成立、没锚定具体事实。模型**不能**判的是"这条映射对他真不真 / 戳不戳"——**那只有 Haopeng 是 ground truth**（Garry 自己也还是读自己那页）。所以镜射列：模型当闸门（挡虚构 + 挡太泛），人定终值。报告里把这两类清楚分开，别让模型对镜射的"真伪"下结论。

---

## 5. 输入契约 & 输出格式

**输入**（script 接收）：
- `draft_path`：待评草稿
- `source_refs`：raw 原文路径（书镜 = 对应 epub/原文）
- `discarded`（可选）：作者模型丢弃的候选
- `content_type`：`mirror` / `distill` / `harvest` / `propagation`（决定启用哪套判据）

**输出**：`inbox/cross-eval-{draft-name}-{YYYY-MM-DD}.md`，frontmatter `type: snapshot`、`source: hermes/cross-eval`，正文结构：
- 总裁决：pass / 需修后复评 / 红旗阻断
- 按模型分节：每个模型的发现（分"摘要列问题"和"镜射列问题"两栏）
- 红旗清单：虚构来源 / 编造的关于 Haopeng 的事实 / 事实错误（最高优先）
- 待人定项：镜射列里"无虚构但需你确认是否成立"的条目

---

## 6. 书镜 × cross-eval 完整流（第一个消费者）

1. **Claudian**：每章一个子 agent，产双栏草稿（左=原作观点按章 / 右=映射到 Haopeng 真实生活，调 vault 里 journal/projects/曜野 上下文锚定）。镜射是正文，不是占位。草稿先落 staging（不直接进 wiki/pages）。
2. **Hermes cross-eval**：喂「草稿 + 对应 epub raw + 子 agent 丢弃的候选」，三模型按 §3/§4 跑，报告进 `inbox/`。
3. **Haopeng**：读报告 → 审镜射列（你是 ground truth）+ 据红旗修摘要列。
4. **定稿**（被 gate）：页进 `wiki/pages/`（书页 Mirror 为正文）、index/log、propagation 建 backlink。

---

## 7. skillify

建成后按 skillify 工作流，把本 skill 的设计意图 + 迭代记录落 `wiki/pages/skill-cross-eval.md`（执行文件在 `~/.hermes/`，设计意图在 vault，可讨论可迭代）。

---

## 8. 留给 Codex / Haopeng 的配置项（非设计，落地时定）

- 具体选哪 2–3 个评审模型 + 各自 key + Surge 路由规则
- 并发/超时/重试参数
- gate 是硬阻断定稿，还是出红旗即停等人确认
- eval 报告是否同时 append 一条到 `wiki/log.md`（溯源）
