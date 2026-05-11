---
title: "Fat Skills, Thin Harness（脂肪技能，精简 Harness）"
type: concept
tags: [ai, agents, architecture, software-engineering, llm]
created: 2026-05-10
updated: 2026-05-10
sources: ["Meta-Meta-Prompting The Secret to Making AI Agents Work.md"]
source_count: 1
discussions: []
---

# Fat Skills, Thin Harness（脂肪技能，精简 Harness）

Fat Skills, Thin Harness（脂肪技能，精简 Harness）是 [[garry-tan]] 提出的 AI Agent 系统架构原则，是他整个个人 AI 操作系统的设计哲学。核心主张是：**系统智能应该驻留在技能文件和数据中，而非 Harness（运行时/路由层）**。Harness 只做一件事——判断哪个技能适用，然后分派——除此之外不应携带任何领域知识。这一原则与 [[boris-cherny]] 在 [[agentic-engineering]] 中预测"harness 重要性持续下降"的论断高度一致。

## 四层架构

```
┌──────────────────────────────────────┐
│           精简 Harness               │ ← 路由逻辑，几千行代码
│  (OpenClaw / Hermes Agent)           │   不知道书镜/会议/创始人
└──────────────┬───────────────────────┘
               │ 分派
┌──────────────▼───────────────────────┐
│           脂肪技能（100+）            │ ← 操作知识单元
│  book-mirror / meeting-prep /        │   每个技能一个 Markdown 文件
│  enrich / media-ingest / skillify   │   含触发词、指令、边缘情况
└──────────────┬───────────────────────┘
               │ 读写
┌──────────────▼───────────────────────┐
│           脂肪数据（~10 万页）        │ ← 结构化知识库（GBrain）
│  人 / 公司 / 会议 / 书 / 文章 / 想法  │   全部链接、可搜索、持续更新
└──────────────┬───────────────────────┘
               │ 调用
┌──────────────▼───────────────────────┐
│           可互换模型层                │ ← 按任务类型选模型
│  Opus 4.7 / GPT-5.5 /               │   技能决定调用哪个模型
│  DeepSeek V4-Pro / Groq Llama        │   Harness 不关心
└──────────────────────────────────────┘
```

## 为什么 Harness 要薄

Harness 越厚，以下问题越严重：
- 领域逻辑混入路由逻辑，难以维护
- 某个场景的改进无法被其他场景复用
- 模型升级时需要改动 Harness，而非只改技能文件

Garry 的 Harness（OpenClaw）只有几千行路由逻辑，不知道"书镜"是什么，不知道"会议准备"是什么。它只知道：收到消息 → 匹配技能 → 分派。[[boris-cherny]] 预测 Claude Code（作为 harness）未来可能只需约 100 行代码，印证了同一方向。

## 为什么技能要厚

技能文件是"固化操作知识"的地方：
- 触发条件（什么情况用这个技能）
- 分步指令（精确到模型应该做什么）
- 边缘情况（第一次出错后的修复）
- 模型选择（这个任务用哪个模型最好）
- 质量验证（是否运行跨模态评估）

厚技能的好处：**每次改进都沉淀在文件里，不依赖用户记忆，不依赖每次重新提示**。这是 [[skillification]] 的核心机制。

## 为什么数据要厚

数据（知识库）是整个系统的护城河：

> "代码里的价值不如数据里的价值。复利生长在数据里。"

10 万页结构化知识意味着：
- 书镜的右栏能引用具体的创始人对话，而非泛泛而谈
- 会议准备能提供角度（Angles），而非只是事实
- Enrich 技能能生成有上下文深度的人物页面，而非维基百科摘要

数据的复利效应：第 20 次书镜知道前 19 次，越用越聪明。

## 模型的正确定位

这套架构的一个推论是对模型角色的重新定位：

> "模型只是引擎，不是汽车。裸模型比有系统包裹的模型更笨。"

Garry 同时用 4 种模型，每种模型负责它最擅长的任务类型。切换或升级模型不影响技能文件，不影响知识库。系统的智能来自积累，而非来自某个特定模型的能力。

这与 Karpathy 的 [[software-3-0]] 论点呼应：Prompt 和 Context 是控制杆，而非模型本身。

## 与 Agentic Engineering 的联系

[[agentic-engineering]] 的"精简 Harness 理论"（Boris Cherny 的预测：模型对齐度提升后，harness 重要性下降）从产品角度给出了同样结论。Fat Skills / Thin Harness 从**架构角度**给出了实现路径：不要让 harness 变厚，主动把知识放进技能和数据层。

## Sources

- `raw/Meta-Meta-Prompting The Secret to Making AI Agents Work.md` — Garry Tan 对 Fat Skills / Fat Data / Thin Harness 架构的完整描述和论证
