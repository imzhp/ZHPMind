---
title: "产品悬垂（Product Overhang）"
type: concept
tags: [ai, product-strategy, startup, llm]
created: 2026-05-08
updated: 2026-05-08
sources: ["Boris Cherny Why Coding Is Solved, and What Comes Next.md"]
source_count: 1
discussions: []
---

# 产品悬垂（Product Overhang）

产品悬垂（Product Overhang）是 AI 产品开发中的一个战略判断框架：**模型能做的事，还没有任何产品把它充分释放出来**。当这个差距存在时，就存在巨大的产品机会——提前进入这个空间、为"下一个模型"而构建，是抢占先机的策略。这一概念在 Anthropic 内部被广泛使用，也是 [[claude-code]] 诞生的直接动因。

## 定义

[[boris-cherny]] 的原话（意译）：

> 模型可以做所有这些事，但还没有产品把它捕捉到。这就是产品悬垂——你可以比当前任何产品走得更远。

产品悬垂的本质是模型能力曲线和产品化程度曲线之间的时间差。模型能力往往以突跃式方式提升（每次发布），而产品化需要时间——这个窗口期就是创业机会所在。

## 典型案例：Claude Code

2024 年底，编程领域的"模型能力边界"已经可以支持"Agent 写全部代码"，但市场上的最先进产品仍停留在 **Typeahead（逐行 Tab 补全）**。这就是产品悬垂：

- **已有能力**：Sonnet 3.5 + 实验性 agent 工作流已可写出完整功能
- **市场现状**：GitHub Copilot 等工具仍以逐行补全为核心体验
- **产品机会**：直接跳过补全，让 Agent 接管整个编码流程

Boris 据此判断、着手构建 Claude Code，并预期头 6 个月不会有产品市场契合（PMF）——因为当时构建的是为了下一代模型能力设计的产品。

## 核心逻辑

产品悬垂策略的逻辑链：

1. **识别差距**：观察当前模型能力 vs. 现有产品的边界
2. **估算时间**：判断模型何时能真正支撑下一级产品
3. **提前建造**：在模型就绪前开始构建，接受早期无人使用的阶段
4. **等待临界点**：当模型能力达到阈值，产品增长突然启动

这与典型的 B2C 产品逻辑不同——不是"先有用户再迭代"，而是"先建好产品等待模型就绪"。

## 与 AI 浪潮的关系

产品悬垂概念在 AI 领域特别重要，原因在于：

- 模型能力以离散式阶梯（而非连续曲线）提升，每次重大发布都可能创造新的悬垂
- 先行者能积累真实用户数据、工程基础设施和品牌认知，这些在模型共同进步时构成差距
- 建在"模型悬垂"上的产品，往往在模型发布时实现爆发式增长（Claude Code 在 Opus 4 发布时的增长即是如此）

## 候选关联页面

Seven Powers 框架（Hamilton Helmer）与产品悬垂密切相关——产品悬垂是识别竞争优势窗口的工具，而 Seven Powers 描述的是窗口关闭后护城河的形态。目前 wiki 尚无 `seven-powers` 专属页面。

## Sources

- `raw/Boris Cherny Why Coding Is Solved, and What Comes Next.md` — Boris Cherny 在 AI Ascent 2026 解释产品悬垂概念及其在 Claude Code 创建中的应用
