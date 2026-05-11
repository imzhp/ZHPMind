---
title: "Agentic Engineering（代理工程）"
type: concept
tags: [ai, software-engineering, agents, llm, productivity]
created: 2026-05-08
updated: 2026-05-10
sources: ["Andrej Karpathy From Vibe Coding to Agentic Engineering.md", "Boris Cherny Why Coding Is Solved, and What Comes Next.md", "Meta-Meta-Prompting The Secret to Making AI Agents Work.md"]
source_count: 3
discussions: []
---

# Agentic Engineering（代理工程）

Agentic Engineering（代理工程）是 [[andrej-karpathy]] 提出的工程纪律，指在**保持专业软件原有质量标准的前提下**，通过协调 AI Agent 来大幅提升工程效率。它区别于 [[vibe-coding]] 的关键在于：速度提升，但质量不降——不能因为使用了 AI 就引入漏洞或放弃对代码质量的责任。

## 定义

Karpathy 的原话（意译）：

> Vibe Coding 是关于提升所有人的下限；Agentic Engineering 是关于在不牺牲质量标准的情况下，协调这些 Agent 使其更快地工作——那些 Agent 是有些不稳定的、随机的，但又极其强大的实体。

Agent 是不稳定的（Fallible）、随机的（Stochastic）、但极其强大的。如何协调它们去更快地工作，同时不引入漏洞、不降低可维护性——这就是 Agentic Engineering 作为工程纪律的核心命题。

## 能力倍增的幅度

Karpathy 认为 Agentic Engineering 带来的效率提升远超"10x 工程师"的传统说法：

> 10x 不是你能获得的提升倍数。我感觉真正擅长这个的人，从我的视角来看，提升幅度远远超过 10x。

这意味着 Agentic Engineering 的天花板极高——差异不只在于速度，而在于能完成的项目规模和复杂度的数量级跃迁。

## 人类在 Agentic Engineering 中的角色

当前阶段，Agent 类似于"实习生"——能力惊人，但需要人类扮演"设计师 + 指挥官"的角色：

**品味与审美（Taste）**
Agent 产出的代码往往"能跑但令人揪心"：过多复制粘贴、脆弱的抽象、冗余的结构。人类必须负责把关代码质量，而不是仅仅验收"能运行"。这是 RL 训练尚未覆盖的领域。

**规格说明与顶层设计（Spec Design）**
Agent 会犯系统级的设计错误。典型案例：Menu Gen 中 Agent 尝试用邮件地址关联 Google 账户和 Stripe 支付账户（用户可能用不同邮件注册，导致充值无法匹配账户）。人类必须定义正确的数据结构和系统边界，Agent 负责填空。

Karpathy 的建议：不要只依赖 Agent 的"Plan 模式"，而要与 Agent 共同设计一份极其详细的规格文档（Spec）——从顶层分类到子系统接口，人类把关框架，Agent 负责细节。

**基本原理（Fundamentals）**
API 细节（如 PyTorch 中 `keepdim` vs `keep_dims`、`reshape` vs `permute`）可以完全交给 Agent——它们有极好的记忆力。但基本原理（如张量 view 与独立 storage 的性能差异）人类仍需理解，否则无法发现 Agent 的低效选择。

## 招聘 Agentic Engineer 的新范式

Karpathy 认为大多数公司招聘流程仍停留在旧范式（算法题），他提出新的评估方式：

1. 给候选人一个大型真实项目（如：实现一个 Twitter 克隆）
2. 要求高质量、高安全性
3. 用 Agent 模拟真实用户在上面活动
4. 再用 10 个对抗性 Agent（如 Codex）尝试攻击这个系统
5. 评估候选人是否能防住攻击

这种考法考察的是**在真实工程压力下使用 Agent 工具链的综合能力**，而非个人手写代码能力。

## 工具投资与工作流设置

类比于以前工程师会花大量时间配置 Vim 或 VS Code，Agentic Engineering 同样需要投资于工具链设置：
- 熟练使用 Claude Code、Codex 等工具的所有功能
- 建立适合自己工作方式的 Agent 工作流
- 理解不同工具在不同任务类型上的优缺点

"AI 原生"工程师和"用 AI 当搜索替代品"的工程师之间的差距，很大程度上来自于对工具链的投资深度。

## 未来展望：Taste 与判断力的边界

Karpathy 认为审美和判断力的重要性**暂时**无法被 Agent 替代，因为：
- 简洁性、审美目前不在 RL 奖励范围内
- 他尝试让 LLM 持续简化 nanoGPT 时，模型"像在拔牙"——明显超出了 RL 训练覆盖的电路

但他也认为这不是根本性障碍——只是实验室尚未做到而已。随着 RL 覆盖范围扩展，这条边界会持续移动。

## 现实案例：Boris Cherny 的 100% AI 工作流

[[boris-cherny]]（[[claude-code]] 的创造者）在 AI Ascent 2026 上提供了当前最极端的 Agentic Engineering 实例：

- 自 2025 年 10/11 月起，其代码库 100% 由 AI 写成，本人整年未手写一行代码
- 每天完成数十个 PR，某天最高达 150 个 PR
- 同时维持 5–10 个会话，数百个 sub-agent 并行，夜间有数千个 agent 工作
- 核心工具：**`/loop`**（通过 cron 调度的持续循环任务），包括 PR 看护、CI 自动修复、Twitter 反馈聚类等

这与 [[andrej-karpathy]] 描述的"不稳定但强大的 Agent + 人类把关"框架一致，但 Boris 案例显示随着模型能力提升（特别是 Opus 4 后），人类把关的比重在持续下降。

## Agentic Engineering 的演化方向

Boris Cherny 的预测：
- 随着模型对齐程度提高，当前大量安全机制（prompt injection 检测、权限验证、human-in-the-loop）将变得多余
- 产品 harness（如 Claude Code 本身）的重要性将相对模型重要性持续下降——他预测 Claude Code 本身未来可能只需约 100 行代码
- 并行化将成为模型的内置行为，而非需要用户手动管理

## Garry Tan 的视角：知识管理层的 Agentic Engineering

[[garry-tan]] 在其个人 AI 系统中提供了 Agentic Engineering 在**知识管理**维度的完整实践案例，与 Karpathy 的工程场景和 Boris 的编程场景形成三角互补：

- **技能化（Skillification）**：将每次手动工作流提取为可复用技能文件，修复自动全局生效——这是 Karpathy"审美与判断力把关"的知识沉淀机制。详见 [[skillification]]
- **[[fat-skills-thin-harness]] 架构**：把系统智能放进技能和数据中，保持 Harness 精简——与 Boris 的"harness 重要性下降"预测在架构层面给出了实现路径
- **实体传播（Entity Propagation）**：每次会议后自动更新所有相关人物/公司页面——这是"不稳定 Agent + 人类把关"框架在知识管理中的自动化实现
- **跨模态评估**：同时调用多个模型对技能输出打分，发现错误后写回技能文件——是 Agentic Engineering 中质量把关机制的标准化实现

Garry 的核心论断与 Karpathy 的 Agentic Engineering 高度呼应：

> "模型只是引擎，不是汽车。裸模型比有系统包裹的模型更笨。"

这对应 Karpathy 的"Agent 是实习生，需要人类设计师和指挥官"——但 Garry 的系统更进一步：随着技能和数据积累，对人类实时把关的依赖在持续降低。

## Sources

- `raw/Andrej Karpathy From Vibe Coding to Agentic Engineering.md` — Karpathy 对 Agentic Engineering 的定义、人类角色、招聘范式和工程纪律的系统阐述
- `raw/Boris Cherny Why Coding Is Solved, and What Comes Next.md` — Boris Cherny 100% AI 工作流的现实案例及 Agentic Engineering 的演化预测
- `raw/Meta-Meta-Prompting The Secret to Making AI Agents Work.md` — Garry Tan 在知识管理维度的 Agentic Engineering 实践：技能化、Fat Skills / Thin Harness 架构和实体传播机制
