---
title: "Boris Cherny"
type: person
tags: [ai, engineer, anthropic, claude-code]
created: 2026-05-08
updated: 2026-05-11
sources: ["Boris Cherny Why Coding Is Solved, and What Comes Next.md"]
source_count: 1
discussions: []
---

# Boris Cherny

## Compiled Truth

Boris Cherny 是 Anthropic 工程师，[[claude-code]] 的创造者。被誉为"工程师中的工程师"（Engineer's Engineer），著有《Programming TypeScript》，却在 2026 年成为"整年未手写一行代码"的典型案例——完全依赖 AI Agent 完成全部开发工作。他是将 [[agentic-engineering]] 从理论推向极端实践的代表人物。

**核心贡献：**

- **[[claude-code]]**：2024 年底在 Anthropic Labs 以小团队方式（数人）创建。创建动机来自对 **[[product-overhang]]（产品悬垂）** 的判断——当时模型已能支撑"Agent 写全部代码"，但市场最先进形态仍是 Tab 补全。同期还产出 MCP（Model Context Protocol）和 Claude 桌面 App
- **MCP（Model Context Protocol）**：AI Agent 与外部工具交互的标准接口协议，由 Anthropic Labs 同期开发

**核心观点：**

- **编程已被解决**：对其个人代码库而言，AI 已 100% 写代码；每天数十个 PR，最高 150 个/天
- **`/loop` 是未来**：通过 cron 调度的持续循环 agent 是最重要的工作范式转变
- **跨学科通才**：未来最有价值的人才是领域专家 + 编码能力的组合；编程将成为像"会用 Microsoft Office"一样的基础技能，领域知识才是稀缺资源
- **Harness 重要性下降**：随着模型对齐度提升，当前大量安全机制将变得多余；他预测 Claude Code 本身未来可能只需约 100 行代码
- **软件民主化**：类比 15 世纪印刷机——印刷机后 50 年出版物超过此前千年总量，书价下降 100 倍；编程正在经历同样的民主化进程

**2026 年工作方式：** 主要通过手机工作，同时维持 5–10 个 Claude Code 会话，每个会话下跑数百个 sub-agent；夜间有数千个 agent 并行工作；维护数十个 `/loop` 循环任务，涵盖 PR 看护、CI 维护、Twitter 反馈聚类等。

## Timeline

- 2026-01-01 [来源:Boris Cherny Why Coding Is Solved, and What Comes Next.md] 在 Sequoia AI Ascent 2026 发表演讲，阐述"编程已被解决"、loops 工作流、跨学科通才和 SaaS 格局重塑
- 2026-05-01 [来源:Boris Cherny Why Coding Is Solved, and What Comes Next.md] Claude Code 随 Opus 4 发布实现指数增长，此后随 4.5→4.6→4.7 每次模型发布持续陡增
- 2025-10-01 [来源:Boris Cherny Why Coding Is Solved, and What Comes Next.md] 自 2025 年 10/11 月起，其代码库 100% 由 AI 编写，本人停止手写代码
- 2024-12-01 [来源:Boris Cherny Why Coding Is Solved, and What Comes Next.md] 在 Anthropic Labs 以小团队开始构建 Claude Code，同期产出 MCP 和 Claude 桌面 App；头 6 个月几乎无用户——预期之内，因为是为"下一个模型"而构建
- 2024-01-01 [unsourced] 加入 Anthropic，在 Anthropic Labs（内部孵化团队）工作
- 2010-01-01 [unsourced] 著有《Programming TypeScript》，TypeScript 领域权威参考书；在 Y Combinator 时期作为多家初创公司早期雇员
- 2000-01-01 [来源:Boris Cherny Why Coding Is Solved, and What Comes Next.md] 中学时期在网上发布 TI-83 Plus 计算器 BASIC 编程指南（本人称"极其尴尬"）

## References

- `raw/Boris Cherny Why Coding Is Solved, and What Comes Next.md` — AI Ascent 2026 对谈，Boris 阐述个人工作流、Claude Code 起源和技术预测
- [[boris-cherny-coding-is-solved]] — 对谈的完整蒸馏页
- [[claude-code]] — Boris 创建的 AI 编程 CLI 工具
- [[product-overhang]] — 驱动 Claude Code 创建的核心战略判断框架
- [[agentic-engineering]] — Boris 提供了该工程纪律的最极端实践案例
