---
title: "AI Engineering MOC"
tags: [moc, ai, llm, agents, software-engineering]
created: 2026-05-11
updated: 2026-05-11
---

# AI Engineering MOC

本 MOC 覆盖 AI / LLM / 工程相关的全部 wiki 页面，按"从范式到实践"的逻辑组织：先理解 LLM 是什么（范式与能力）、再理解怎么用它开发软件（开发方式）、再看具体工具和架构（工具链与 Agent 架构）、最后是知识管理与战略判断层。对应的思想家索引见 [[people-moc]]。

---

## 范式与能力

**[[software-3-0]]** — Karpathy 提出的三代软件范式框架：软件 1.0（手写代码）→ 软件 2.0（训练神经网络）→ 软件 3.0（Prompt + Context + LLM 作为解释器）。LLM 是新型可编程计算机，而非传统意义上的"AI 工具"。

**[[verifiability]]** — 可验证性框架，解释 LLM 能力的锯齿形（Jagged）不均匀分布：可验证域（数学、代码）RL 训练大量，能力飞速提升；不可验证域（审美、开放写作）能力停滞。同时是创业者识别 AI 机会窗口的判断工具。

---

## 开发方式

**[[vibe-coding]]** — Karpathy 提出的 AI 原生开发方式：完全依赖 AI 生成代码、几乎不做人工修正。核心价值是**提升下限**——让任何有想法的人都能绕过"不会写代码"的门槛。局限在于代码质量和系统级设计错误风险。

**[[agentic-engineering]]** — 区别于 Vibe Coding 的专业工程纪律：在保持代码质量、安全标准不降的前提下，协调 Agent 大幅提速。核心是人类担任"设计师 + 指挥官"——把关规格说明、系统边界和代码品味，Agent 负责执行。效率提升远超传统 10x 工程师。

> 关系导读：Vibe Coding 提升地板，Agentic Engineering 是在新地板上继续建高楼。两者是同一范式转型的两个维度，而非竞争关系。

---

## 工具链

**[[claude-code]]** — Anthropic 的 AI 编程 CLI 工具，[[boris-cherny]] 创建。核心功能：`/loop`（cron 调度的持续循环 agent）、`/batch`（大规模并行任务）、sub-agents、Routines（服务器端持久化循环）。Boris 通过它实现了完全 AI 原生的工程工作流，是 Agentic Engineering 当前最极端的实践案例。

---

## Agent 架构

**[[fat-skills-thin-harness]]** — Garry Tan 提出的 AI Agent 系统架构原则：系统智能驻留在技能文件（Fat Skills）和结构化知识库（Fat Data）中，Harness（路由运行时）只做分派，保持精简（Thin Harness）。与 Boris 的"harness 重要性下降"预测在架构层面同方向。

**[[skillification]]** — 技能化方法论：将值得重复的工作流提取为自包含技能文件，技能可组合、修复自动全局生效。Skillify 是元技能（关于如何提取技能的技能），是个人 AI 复利飞轮的操作工具。

---

## 知识管理

**[[personal-knowledge-base]]** — AI 时代的知识库重新定义：不是静态文件柜，而是由 Agent 持续写入、自动关联的运行中神经系统。核心机制是实体传播（Entity Propagation）——每次会议/文章后自动更新所有相关人物/公司页面，形成越用越聪明的复利效应。

---

## 战略判断

**[[product-overhang]]** — 模型能力超前于产品化程度时出现的战略窗口。识别差距 → 估算时间 → 提前建造 → 等待临界点。Claude Code 是其经典案例：2024 年底模型已能支撑"Agent 写全部代码"，但市场最先进形态仍是 Tab 补全。

---

## 来源文章

- [[andrej-karpathy-vibe-coding-to-agentic-engineering]] — Karpathy 在 AI Ascent 2025 的完整对谈蒸馏，覆盖 Software 3.0、Vibe Coding、Agentic Engineering、可验证性等核心框架
- [[boris-cherny-coding-is-solved]] — Boris 在 AI Ascent 2026 的对谈蒸馏，覆盖编程已被解决、loops 工作流、跨学科通才、SaaS 护城河重塑
- [[garry-tan-meta-meta-prompting]] — Garry Tan 文章的完整蒸馏，覆盖技能化、书镜工作流、Fat Skills / Thin Harness、GBrain 复利系统
