---
title: concept-fable
type: skill
status: active
created: 2026-05-23
updated: 2026-05-23
tags:
  - skill
  - concept-learning
  - distill
sources: []
source_count: 0
discussions:
  - "2026-05-22"
  - "2026-05-23"
references:
  - ".claude/skills/concept-fable/SKILL.md"
  - ".claude/skills/concept-fable/references/"
---

# concept-fable — Skill 反思页

> 这是 ZHPMind 里第二篇 skill 反思页（第一篇是 `[[skill-review-digest]]`），落地 design-principles v2.5 第二层「skillify」「内容分类 / 直觉锚点段落」与「Skill 系统设计」原则。skill 执行在 `.claude/skills/concept-fable/`，反思层在本页。

## 设计意图

绕过术语硬啃，把抽象概念变成可记忆的具体故事——给学习者一个"直觉锚点"，让新概念从陌生的标签变成大脑愿意主动复述的画面。

**核心痛点**：分享完概念后听者点头说懂、转头就忘。这种问题加大讲解力度解决不了，因为问题不在讲的人不努力，而在大脑对抽象概念的留存机制天然偏弱。故事是大脑愿意主动复述的载体。

**为什么落在 Claudian 而不是 Hermes**：concept-fable 是 vault 内的深度加工——给一个 wiki 页面（concept/method/framework）加直觉锚点段落，属于"距 wiki 最近"的 skill。按 design-principles v2.5「执行体归属」，vault 内深度加工归 Claudian。Hermes 通过 Gateway 暴露的轻量调用（手机端要寓言但不写入 vault）是备选 surface，暂不实现。

**为什么这是人工设计的 skill 而非 Hermes 自动复盘产出**：受外部启发（Amanda Askell 原版 prompt + 公众号文章优化版）想沉淀成可复用 skill。按 design-principles v2.5「skill 怎么产生」的「人主动设计」路径：先建反思页占位 → 建执行体 → 首次实战后回填 Pitfalls 和反思。

## 实战 Pitfalls

待首次实战后回填。预期会在以下几个方向遇到坑：

- 寓言生成时陷入"嵌套概念解释概念"（用一个抽象概念解释另一个抽象概念，背离用日常场景包裹的初衷）
- 检验问题写成"复述比喻"（如"老王为什么走小巷？"）而非"概念迁移"
- 结构型概念触发警告后用户选择继续，结果产出确实掩盖了关键结构
- 直觉锚点段落超过 100 行 soft limit

每条踩坑发生后按照 `wiki/pages/skill-review-digest.md` 的 Pitfalls 表格式补：Pitfall / 性质（工具调用约束 / 环境约束 / 平台约束 / 业务语义校准 / 平台陷阱）/ 应对。

## 演化简史

| 版本 | 时间 | 关键改动 |
|---|---|---|
| v1.0 | 2026-05-23 | 初版。执行体 `.claude/skills/concept-fable/SKILL.md` + `references/prompt-template.md`；反思页骨架本页。 |

## 当前状态

```
.claude/skills/concept-fable/
├── SKILL.md                          ← 工作流 spec
└── references/
    └── prompt-template.md            ← 完整 prompt 模板
```

无 `.bak` 链（首发）。无 Hermes 端镜像（暂不在 `~/.hermes/skills/` 部署——Claudian 主战场）。

## 反思与未解决问题

**1. 边界 dogfood 待跑**（v2.4-Y 5-22 对话遗留的 step 2 验证）

skill 当前的「适用边界」表是基于理论分类（感觉型 / 方法论 / 结构型 / person-project）。这个分类需要用真实概念跑过才能验证：

- **陌生化**（感觉型，预期 fable 效果好）
- **Jobs-to-be-Done**（介于感觉型和方法论之间——边界模糊样本）
- **库存周转率**（结构型，预期 fable 警告应该触发）

每个跑完写一句"比直接看百度百科多给了什么 / 少了什么"。结果回填到 `.claude/skills/concept-fable/references/prompt-template.md` 的「适用边界」段，把判断标准从纸上谈兵变成数据。

**2. 直觉锚点段落是否需要 archive 机制**

按 design-principles，直觉锚点是 rewrite-friendly 的——半年后觉得牵强可以重写。但跟"Compiled Truth rewrite 时旧版归档"不同，目前对寓言旧版没有归档约定。是否需要在 `archive/fables/` 下保留历史寓言？等第一个被 rewrite 的寓言出现再决定。

**3. Hermes 备选路径的取舍**

按 design-principles v2.5「执行体归属」末段，Hermes Gateway 暴露的轻量调用（手机端要寓言不写入 vault）是合理 surface。但部署 Hermes 镜像意味着同一个 skill 要在两个地方维护——违反「skill 双重存在」的"一份执行体"原则。

未解决：未来如果手机端有强需求，是把 Claudian 的执行体复制到 Hermes（双份维护），还是让 Hermes 通过子进程调用 Claudian（单份维护但耦合 Claude Code）？这个决策等真有手机端需求时再做。

**4. propagation 时是否要触发跨页 fable 一致性检查**

如果两个 concept 页面的直觉锚点用了相似的寓言素材（比如都用了"老王走路"），是否要在 propagation 工作流加一个"寓言素材重复"检查？暂不做——过早优化。等第一次撞车再说。

## References

- 执行体 spec：`.claude/skills/concept-fable/SKILL.md`
- prompt 模板：`.claude/skills/concept-fable/references/prompt-template.md`
- 备份链：暂无（首发）
- design-principles 对应小节：
  - 第二层「内容分类 / concept 写作模板」「直觉锚点适用边界」「skill 写作模板（D9）」
  - 第二层「Skill 系统设计」5 条原则
  - 第三层「Claudian skills」表
- 范本参考：`[[skill-review-digest]]`（vault 内最完整的 skill 反思页范本）
- 来源溯源：
  - Amanda Askell（Anthropic）原版"寓言故事 prompt"
  - 公众号文章《分享一个很实用的寓言故事 prompt——5 分钟帮你理解任何新概念》
  - 2026-05-22 / 2026-05-23 主对话「文章启发与工作流融合」「v2.5 整合规划」

## 元注

本页面是按 design-principles v2.5 §3.8（D9）规范产出的**第一个**纯人工设计 skill 反思页（区别于 `[[skill-review-digest]]` 那个 Hermes 自动维护的范本）。它验证了 D9 规范对"人主动设计的 skill"这条路径同样可用：骨架先立，Pitfalls 留空，实战后补血。

如果实战后发现 D9 规范有缺陷（比如 Pitfalls 占位的方式让人忘了回填、status 字段的 active/deprecated/experimental 三值不够用等），把发现回灌到 design-principles v2.5 修订。**这份反思页本身就是 v2.5 D9 规范的第一个 testbed**。
