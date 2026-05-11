---
title: "Garry Tan"
type: person
tags: [ai, venture-capital, founders, builders, y-combinator]
created: 2026-05-10
updated: 2026-05-11
sources: ["Meta-Meta-Prompting The Secret to Making AI Agents Work.md"]
source_count: 1
discussions: []
---

# Garry Tan

## Compiled Truth

Garry Tan 是 Y Combinator（YC）的 CEO，硅谷最具影响力的技术创业者和投资人之一。早年参与创立博客平台 Posterous（被 Twitter 收购），后加入 YC 成为合伙人，2023 年回归担任 CEO，每年帮助数千个早期创始人。2025–2026 年间，他公开分享了自己如何用 AI 重新成为一名"建造者"，并开源了整套个人 AI 操作系统，规模达约 10 万页结构化知识、100+ 技能文件、每日 100+ cron 任务。

**核心 AI 架构主张：**

- **[[fat-skills-thin-harness]]**（Fat Skills / Fat Data / Thin Harness）：系统价值驻留在技能文件和结构化知识库中；Harness（路由运行时）只做分派，不含领域知识。与 [[boris-cherny]] "harness 重要性下降"预测在架构层面给出了同方向的实现路径
- **[[skillification]]（技能化）**：将任何值得重复的工作流提取为自包含技能文件（Skill File），技能之间可组合，修复自动全局生效——这是个人 AI 复利飞轮的核心机制
- **模型只是引擎，不是汽车**：裸模型比有系统包裹的模型更笨；系统价值来自积累的技能和数据，而非特定模型
- **个人拥有复利 AI 系统 vs. 使用企业中心化 AI 工具**：差距等同于写日记 vs. 拥有神经系统

**个人 AI 系统三个核心开源项目：**

| 项目 | 角色 |
|------|------|
| GStack | 编程技能框架（87,000+ Stars），含可编程浏览器 |
| GBrain | 知识基础设施，含 39 个可安装技能，97.6% 长记忆召回率 |
| OpenClaw / Hermes Agent | 精简 Harness（路由运行时） |

**思想渊源：** 受 [[andrej-karpathy]] 的 LLM Wiki 想法启发，将其扩展实现为 GBrain；系统实现了 [[boris-cherny]] 所描述的"Agent loops"架构的知识管理版本；[[fat-skills-thin-harness]] 架构与 [[agentic-engineering]] 中的"精简 Harness 理论"高度呼应。

## Timeline

- 2026-01-01 [来源:Meta-Meta-Prompting The Secret to Making AI Agents Work.md] 发表文章《元元提示法与 AI Agent 系统的秘密》，公开分享完整个人 AI 操作系统架构、书镜工作流、技能化方法论和复利哲学
- 2025-12-01 [来源:Meta-Meta-Prompting The Secret to Making AI Agents Work.md] AI 工具达到让 Garry 重拾"建造乐趣"的临界点，开始在个人时间密集开发个人 AI 系统，逐步形成 GBrain + GStack + OpenClaw 三件套
- 2023-01-01 [unsourced] 回归 YC 担任 CEO，领导 YC 支持数千个早期创始人
- 2010-01-01 [unsourced] 加入 YC 成为合伙人（曾任）
- 2008-01-01 [unsourced] 联合创立博客平台 Posterous，后被 Twitter 收购
- 2007-01-01 [unsourced] 作为技术投资人，投资过 Coinbase、Stripe、Instacart 等

## References

- `raw/Meta-Meta-Prompting The Secret to Making AI Agents Work.md` — Garry Tan 对其个人 AI 系统的完整自述
- [[garry-tan-meta-meta-prompting]] — 文章的完整蒸馏页
- [[skillification]] — Garry 提出并实践的技能化方法论
- [[fat-skills-thin-harness]] — Garry 的 AI Agent 架构原则
- [[personal-knowledge-base]] — Garry 的 GBrain 10 万页知识库详解
- [[andrej-karpathy]] — GBrain 受其 LLM Wiki 想法启发
