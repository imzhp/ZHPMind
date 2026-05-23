---
title: "Karpathy CLAUDE.md(4 原则)"
aliases: [claude-md-4-principles, andrej-karpathy-skills]
type: concept
tags: [ai-skill-design, ai-behavior, external-reference]
created: 2026-05-23
updated: 2026-05-23
sources: [karpathy-claude-md-original.md]
source_count: 1
discussions: []
---

# Karpathy CLAUDE.md(4 原则)

一份在 Claude Code 社区被广泛采用的 AI 行为规范文件,提出 LLM 编码工作中的 4 条失败模式与对应原则。**不是 Karpathy 本人撰写**——是 Forrest Chang(Jiayuan Zhang)基于 Andrej Karpathy 对 LLM 编码工作的公开观察提炼成的单文件 CLAUDE.md,作为 Claude Code 项目级配置的基线。截至 2026 年中,仓库 [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) 148K stars,事实标准。

## 是什么

- **作者归属**:Forrest Chang(Jiayuan Zhang)创作,multica-ai 组织维护
- **来源依据**:基于 Andrej Karpathy 多次公开描述的 LLM 编码 4 大失败模式(silent wrong assumptions / overengineering / unrelated edits / vague imperatives)
- **现状定位**:Claude Code 社区默认配置基线,衍生到 Cursor / Codex 等 agent runtime
- **4 原则名称**:Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution
- **原文**:[[karpathy-claude-md-original]](verbatim 65 行)

## 4 原则蒸馏

### Think Before Coding

> **Don't assume. Don't hide confusion. Surface tradeoffs.**

核心动作:实施前显式状态假设,多种解读并列呈现不默默选一个,见到更简方案要直说,不清楚就停下并具名困惑点。

本质:把"假设"和"模糊"从内部隐含状态推到外部显式状态。默认行为是"停下来问"而非"猜着做"。

### Simplicity First

> **Minimum code that solves the problem. Nothing speculative.**

核心动作:不写未请求的功能,不为一次性代码做抽象,不加未要求的"灵活性",不处理不可能的错误场景。200 行能压到 50 行就重写。

本质:对抗 LLM 倾向"完整性"(把所有可能用到的边缘情况都先写上)的默认偏好。

### Surgical Changes

> **Touch only what you must. Clean up only your own mess.**

核心动作:不"顺手优化"相邻代码、注释、格式;不重构未坏的东西;匹配现有风格哪怕自己有更好的写法;无关的死代码只提不删。判据是:**每一行改动都能追溯到用户请求**。

本质:"clean up only your own mess" 最反直觉——多数 AI 倾向"既然看见了就顺手清理",Surgical Changes 把这种欲望明确叫停。

### Goal-Driven Execution

> **Define success criteria. Loop until verified.**

核心动作:把模糊指令转成可验证目标。"修 bug" → "写一个能复现 bug 的测试,然后让它通过"。多步任务先写简要计划,每步标 verify 检查。强成功标准让 agent 能独立循环;弱标准需要不断澄清。

本质:这是 4 原则里**最具结构性创新**的一条,也是 ZHPMind 现规则**最缺**的一条(详见下方对照)。

## 演进生态与已知争议

**演进路径**:Andrej Karpathy 在多次公开演讲、X 推文中描述 LLM 编码 4 大失败模式 → Forrest Chang(Jiayuan Zhang)把观察提炼成一个 65 行 CLAUDE.md 配置文件 → 社区扩散到 Cursor、Codex 等其他 agent runtime,跨 IDE 复用。截至 2026 年中,相关仓库累计 ~220K stars,成为 Claude Code 配置事实标准。

**已知争议**:

- **Simplicity First 滥用会抑制正当的抽象建立**——codebase 演化中确实需要架构层抽象,Simplicity First 太严会让 agent 拒绝必要的设计工作
- **Surgical Changes 严格执行会阻止读者欢迎的"附带清理"**——例如顺手修正一个明显的拼写错误
- **跨 agent runtime 移植问题**:文件为 Claude Code 优化,迁移到其他 agent(Codex / Cursor)时原则措辞需要 reformulation

## 跟 ZHPMind 现有规则的对照

ZHPMind v2.5 设计原则([[design-principles]])+ wiki/CLAUDE.md v3 + Claude Code 协作节奏原则三条综合对照:

| Karpathy 原则 | ZHPMind 对应位置 | 状态 |
|---|---|---|
| Think Before Coding | (1) Claude Code 节奏原则三条:diff 先行 / 模糊处停下 / 核对计划假设;(2) design-principles AI 心法「关键检查不能省」 | ✅ 已对齐 |
| Simplicity First | design-principles 「AI 心法」三条:减优于加 / 合并优于追加 / 删除优于保留 | ✅ 已对齐,且 ZHPMind 更细化 |
| Surgical Changes | (1) wiki/CLAUDE.md §2.2 Ownership Contract 明确各 path 谁能写;(2) propagation 四步限定影响范围 | ⚠️ 类似精神但更松,**无"每一行改动可追到请求"硬判据** |
| Goal-Driven Execution | 无明文对应 | 🔴 **最大补漏点** |

**解读**:

ZHPMind v2.5 落地后,Think Before Coding 和 Simplicity First 已经基本对齐——前者通过 Claude Code 协作节奏的三原则实现,后者通过 AI 心法的「减/合并/删」三条 even more granular。Surgical Changes 在 vault 写入场景被 Ownership Contract 隐含,但缺少 Karpathy 那条硬判据"每一行改动都能追溯到用户请求"。

**真正的补漏点是 Goal-Driven Execution**:ZHPMind 现 AI 红线管的是"AI **写什么**"(三条件:溯源 / 互评 / 可回滚),Goal-Driven Execution 管的是"AI **怎么写**"的行为方式层——把模糊任务转成可验证标准。这条不进 design-principles v2.7+ 是认知盲区。

这条不立即修——等积累 2-3 个完整工作流再决定如何形式化(同 Pitfall #7/#8 backlog 逻辑,见 `.tmp-claude-reports/concept-fable-dogfood.md` v2.7 backlog 段)。

## 活样本:v2.6 concept-fable dogfood

2026-05-23 v2.6 二轮验证 dogfood 会话对 Karpathy 4 原则各有具体体现。下面 5 个 case 引自 `.tmp-claude-reports/concept-fable-dogfood.md`(暂存,git-ignored)。

### Case 1 — Think Before Coding:`--draft` 模式切换的显式化

dogfood 文档明确标注:「模式:`--draft`(A.3 dogfood,LLM 常识输入,跳 Step 5/6/7,产物不进 vault)」。LLM 进入 dogfood 分支前主动声明假设、跳过的 Step、产物归属。

这正是 Karpathy "State your assumptions explicitly" 的最小活样本——LLM 没默默切换模式,而是把模式切换的逻辑外显,允许人审查。

### Case 2 — Simplicity First:不强凑 5 候选

JTBD 和库存周转率两次 dogfood 都给 3 个候选(不是 5 个),评估笔记诚实承认工具边界:"JTBD 后期的方法学是结构化框架,寓言完全够不着"、"读完 3 个寓言仍不能让你判断'我公司的周转率 8 是好是坏'"。

这跟 Simplicity First "No abstractions for single-use code" 精神相通——不为完整性而强加多余产出,承认工具边界比硬塞产出更负责。

### Case 3 — Surgical Changes:每跑一个概念追加一节

dogfood 文档 README 明确"每跑一个概念追加一节",每次新跑不重写之前候选的措辞、不"顺手优化"已有 Pitfall 表。新发现叠加,旧记录保持原貌作溯源链。

这是 Surgical Changes 在文档版本管理上的活样本——每次写入只动当前批次范围,既往内容保持现状,后续读者能看到完整演化轨迹。

### Case 4 — Goal-Driven Execution:Pitfall #2 修复评估

二轮验证不止说"修了",给出**可验证的成功标准三条**(B 约束自动被注意到 / 候选无牵强 / 精确对应 Shklovsky 立场)+ **诚实 caveat**(此次修复部分依赖 LLM 注意力专门集中,需再观察 2-3 次)+ **v2.7 backlog 启动条件三条**。

这是 Karpathy "Define success criteria. Loop until verified" 的范本——不是模糊"修了",而是定义了什么算"真修了"、什么算"还没真修",以及继续 loop 的触发条件。**一份文档展示了 Karpathy 4 原则中最缺失那一条在 ZHPMind 协作里实际可实现**。

### Case 5 — Goal-Driven 自身的反例:Pitfall #7

同一份文档末尾诚实标注 Pitfall #7:"`--draft` 的 enforcement 全靠 LLM 自觉,无 harness 机制"。prompt-based skill 无法 enforce 自己的协议——这正是 Karpathy 批评的"vague imperatives with no success criteria"的最终深度。

这条 Pitfall 是上方对照表缺漏分析的实证支撑:Goal-Driven Execution 不被显式纳入规则时,即便 LLM 当下能体现这条原则,production 调用稳定性无法保证。

## 这页的 takeaway

Karpathy CLAUDE.md 4 原则在 ZHPMind 协作上下文里**基本可迁移,且 v2.5 已经吸收了一半**(Think Before Coding + Simplicity First)。剩下两条:Surgical Changes 现有规则隐含但缺硬判据,Goal-Driven Execution 完全缺失。但这两条都不立即修——把 Karpathy 4 原则钉在这里作为外部锚点,让未来每次新工作流跑完都能对照检视,等积累 2-3 个完整工作流再讨论如何形式化进 design-principles v2.7+。

## References

- [[karpathy-claude-md-original]] — 原文 verbatim 抓取(2026-05-23)
- [[design-principles]] — ZHPMind 设计宪法(对照对象)
- [[skill-concept-fable]] — v2.6 dogfood 反思页(§5 活样本素材源)
- `.tmp-claude-reports/concept-fable-dogfood.md` — v2.5-v2.6 dogfood 实测记录(暂存,git-ignored)
- `multica-ai/andrej-karpathy-skills` GitHub 仓库(148K stars,MIT license)
