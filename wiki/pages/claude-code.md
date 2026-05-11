---
title: "Claude Code"
type: concept
tags: [ai, tools, anthropic, software-engineering, agents, cli]
created: 2026-05-08
updated: 2026-05-11
sources: ["Boris Cherny Why Coding Is Solved, and What Comes Next.md"]
source_count: 1
discussions: []
---

# Claude Code

Claude Code 是 Anthropic 开发的 AI 编程命令行工具（CLI），由 [[boris-cherny]] 于 2024 年底在 Anthropic Labs 创建。它是 [[agentic-engineering]] 的核心平台，允许用户通过自然语言指令让 AI Agent 完成完整的代码编写、PR 提交、CI 修复等工程任务。从最初的无人问津到指数级增长，Claude Code 的成功轨迹与底层模型能力的提升紧密绑定。

## 起源

Claude Code 诞生于 Anthropic Labs——Anthropic 内部的一个小型孵化团队（仅数人），同期产出了 MCP（Model Context Protocol）和 Claude 桌面 App。团队遵循"为下一个模型而构建"的策略：在底层模型能力就绪之前预先建好产品，接受头 6 个月几乎无用户的阶段。

创建动机是识别到 **[[product-overhang]]（产品悬垂）**：2024 年底编程领域最先进的形态还是 Typeahead（Tab 补全逐行代码），但模型能力已经可以支撑"让 Agent 写全部代码"的跃迁。

## 增长轨迹

| 时间节点 | 事件 |
|---------|------|
| 2024 年底 | Anthropic Labs 团队开始构建 |
| 2025 年初发布 | 上线，但增长平缓 |
| 2026 年 5 月 | Opus 4 发布，指数增长开始 |
| 此后 | 随 4.5 → 4.6 → 4.7 每次模型发布持续增长 |

## 技术架构

Claude Code 代码库本身用 TypeScript + React 编写（选择这两个技术栈是因为它们在模型训练数据中"分布靠前"，适合早期模型能力不足时使用）。Boris 预测 Claude Code 的 harness 未来可能只需约 100 行代码——随着模型越来越强，大多数安全机制和验证逻辑将变得多余。

## 核心功能

- **CLI 主界面**：在终端中直接与 AI Agent 交互
- **桌面 App**：图形界面版本
- **iOS App（Code 标签页）**：支持手机端多会话管理
- **VS Code / JetBrains 插件**：IDE 集成
- **`/loop`（循环）**：通过 cron 调度持续执行的重复任务（PR 看护、CI 修复、数据监控等）
- **`/batch`（批处理）**：大规模并行执行多个 agent 任务
- **Sub-agents（子代理）**：在一个会话内启动多个并行子任务
- **Routines（例程）**：服务器端持久化 loop，关闭电脑后仍继续运行

## 在 Agentic Engineering 中的地位

Claude Code 是当前 [[agentic-engineering]] 工作流的主要载体。[[andrej-karpathy]] 在 AI Ascent 2025 的演讲中将其列为核心工具之一；[[boris-cherny]] 本人则通过它实现了完全 AI 原生的开发方式（见 [[boris-cherny-coding-is-solved]]）。

## MCP 集成

Claude Code 支持通过 MCP（Model Context Protocol）连接任意外部服务（Salesforce、Google Docs、Google Calendar、Slack 等），使 Agent 能够跨工具执行知识工作，而不仅限于代码库操作。

## Sources

- `raw/Boris Cherny Why Coding Is Solved, and What Comes Next.md` — Boris Cherny 对 Claude Code 起源、架构决策、功能演进和未来路线图的系统阐述
