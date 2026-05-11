---
title: "Karpathy：从 Vibe Coding 到 Agentic Engineering"
type: article
tags: [ai, llm, software-engineering, agentic-engineering, vibe-coding]
created: 2026-05-08
updated: 2026-05-11
sources: ["Andrej Karpathy From Vibe Coding to Agentic Engineering.md"]
source_count: 1
discussions: []
---

# Karpathy：从 Vibe Coding 到 Agentic Engineering

2026 年 4 月，[[andrej-karpathy]] 在 Sequoia AI Ascent 2025 上与合伙人 Stephanie Zhan 对谈，系统梳理了软件开发范式从 [[vibe-coding]] 到 [[agentic-engineering]] 的演进，深入阐述了大语言模型（LLM）作为新型计算范式（[[software-3-0]]）的深层含义，以及 AI 时代人类应保留的核心技能。

## 转折点：2024 年 12 月

Karpathy 将 2024 年 12 月定义为明确的范式转折点。在这之前，AI 工具虽有帮助但时常出错，需要频繁人工修正；12 月开始，他发现最新模型产出几乎不需要纠错，开始真正"信任这个系统"，自然而然地进入了 Vibe Coding 状态。

他鼓励所有人重新审视 AI：不能再把它当成 ChatGPT 式的问答工具，而要认识到真正的 Agentic Workflow（代理工作流）已经在 2024 年 12 月实际可用了。许多人错过了这个转变。

## 软件范式的三代演进

见 [[software-3-0]]。核心结论：**软件 3.0 不只是"编程变快了"，而是全新类型的信息处理变为可能**——自动从文档生成知识库、把菜单照片直接渲染成带图片的版本，这些以前根本不存在于可能性空间中。

## Vibe Coding vs. Agentic Engineering

这是本次对谈最核心的区分：

- **[[vibe-coding]]**：提升下限（Floor）——让所有人，包括非专业开发者，都能构建出以前需要专业程序员的东西
- **[[agentic-engineering]]**：保持质量上限（Ceiling）——在专业软件的质量、安全标准不降的前提下，用 Agent 大幅提速

Karpathy 的比喻：Vibe Coding 提升了所有人的地板；Agentic Engineering 是在这块新地板上继续建高楼，速度更快，但地基同样牢固。

## 可验证性与锯齿形智能

见 [[verifiability]]。核心结论：LLM 能力极度不均匀——能重构 10 万行代码库、发现零日漏洞，却告诉你应该步行去 50 米外的洗车店。这种"锯齿"来自 RL 训练覆盖范围和实验室数据优先级选择，对创业者和使用者都有直接含义。

## 动物与幽灵：如何理解 LLM 的本质

Karpathy 在一篇文章中提出"动物 vs. 幽灵"的比喻：

- LLM **不是**动物智能——对它发火、恳求、激励，都不会改变它的工作效果
- LLM 是**幽灵**：被预训练统计数据塑造的基底，加上强化学习叠加的"附肢"，缺乏内在动机、好奇心、或进化赋予的驱动力

这种认知帮助使用者更理性地设定预期，知道什么策略有效、什么策略是自欺欺人。

## Agent 原生世界

当前世界仍然是为人类设计的——文档、框架、服务控制台，一切都假设有人类在操作。Karpathy 对 Agent 原生（Agent-Native）基础设施充满期待：

> 给一个 prompt，LLM 直接构建并部署应用，不需要人类触碰 DNS 配置或任何控制台。

他的 Menu Gen 部署经历（需要手动配置 Vercel、DNS、各种服务）恰好说明了这个缺口。他的测试标准很清晰：能否完全通过 prompt 部署一个线上应用，是衡量基础设施是否 Agent 原生的试金石。

未来图景：**我的 Agent 和你的 Agent 谈判安排会议**。

## 人类在 AI 时代保留的核心技能

随着 Agent 承担更多执行工作，人类的价值越来越集中在以下方面：

**理解（Understanding）** — 最重要。Karpathy 引用令他深思的一条推文：
> "你可以外包你的思考，但不能外包你的理解（You can outsource your thinking but you can't outsource your understanding）。"

理解是方向感的来源——不理解就无法有效指挥 Agent，无法判断它的输出是否合理。

**品味与审美（Taste）** — Agent 产出的代码往往"能跑但让人揪心"：过多复制粘贴、脆弱的抽象、糟糕的结构。这是 RL 尚未覆盖的领域，人类仍然是把关者。

**规格说明与顶层设计（Spec Design）** — Agent 会犯系统级的设计错误（如 Menu Gen 案例：用邮件地址而非用户 ID 关联支付账户）。人类必须定义正确的数据结构和系统边界，Agent 负责填空。

**基本原理（Fundamentals）** — API 细节（如 PyTorch 的参数名）可以放手给 Agent；但基本原理（如张量 view vs. 独立 storage 的性能含义）人类仍需理解，否则无法发现 Agent 的低效选择。

## Sources

- `raw/Andrej Karpathy From Vibe Coding to Agentic Engineering.md` — AI Ascent 2025 对谈完整转录，涵盖 Software 3.0、Vibe Coding、Agentic Engineering、可验证性、幽灵 vs. 动物、Agent 原生世界等核心议题
