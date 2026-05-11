---
title: "Boris Cherny：为什么编程已被解决，以及接下来会发生什么"
type: article
tags: [ai, software-engineering, agents, claude-code, saas, productivity, llm]
created: 2026-05-08
updated: 2026-05-11
sources: ["Boris Cherny Why Coding Is Solved, and What Comes Next.md"]
source_count: 1
discussions: []
---

# Boris Cherny：为什么编程已被解决，以及接下来会发生什么

本文是 [[boris-cherny]]（[[claude-code]] 的创造者）在 Sequoia Capital 主办的 AI Ascent 2026 大会上的演讲摘要。Boris 阐述了为什么他认为编程已被解决、他个人的 AI 原生工作流、未来团队形态的转变，以及 AI 对 SaaS 格局的重塑。他将当下的变革类比于 15 世纪印刷机的发明。

## Claude Code 的起源：从产品悬垂到代理写代码

Claude Code 诞生于 2024 年底 Anthropic 内部一个小型孵化团队（Anthropic Labs），成员仅数人，产出了 Claude Code、MCP 和桌面 App 三个产品，之后团队解散，目前正在以 Mike Krieger（Instagram 联合创始人、Anthropic CPO）领衔的阵容进入"第二回合"。

驱动 Boris 着手建造的核心判断是 **[[product-overhang]]（产品悬垂）**：模型能做的事，还没有任何产品把它充分释放出来。2024 年底，编程领域的最先进形态还是 Typeahead（逐行补全，Tab 键完成），这是 Sonnet 3.5 第一次实现的东西。但 Boris 的判断是可以直接跨越到"让 Agent 写全部代码"。

Claude Code 头 6 个月几乎无人使用——这是预期之内的，因为他是在为"下一个模型"而构建产品。真正的指数增长始于 2026 年 5 月的 Opus 4，此后随每次模型发布继续陡增（4.5→4.6→4.7）。

## 编程已被解决

Boris 的观点：对他自己和 Claude Code 代码库而言，编程已 100% 由 AI 完成。

- Claude Code 代码库本身用 TypeScript + React 编写（之所以选这个技术栈，是因为当时它在模型训练数据中"分布靠前"，现在模型已经可以处理任何语言和框架）
- 自 2025 年 10/11 月起，模型就写了代码库中 100% 的代码
- Boris 每天通常完成数十个 PR，某天创下了 150 个 PR 的记录
- 但"编程已被解决"并非普遍成立——大型复杂代码库、模型尚不擅长的语言，仍然存在障碍；"通常的答案只是等下一个模型"

## Boris 的个人工作流

Boris 主要用手机工作。他使用 Claude iOS App 的 Code 标签页，同时维护 5–10 个会话，每个会话下跑数百个 sub-agent；夜间会有数千个 agent 进行更深度的工作。

核心工具：**`/loop`**（循环）。原理是让 Claude 用 cron 定时调度一个重复任务。他目前同时运行数十个 loops：

| Loop 用途 | 频率 |
|-----------|------|
| babysit PRs（修 CI、auto-rebase） | 持续 |
| 保持 CI 健康（自动修复 flaky test） | 持续 |
| 抓取 Twitter 反馈并聚类 | 每 30 分钟 |

Anthropic 还发布了 **Routines**：服务器端持久化 loops，即使关闭电脑也继续运行。

## 未来团队：跨学科通才

Boris 预测团队构成将从"跨平台工程师通才"（iOS + Web + Server）演变为**跨学科通才（Cross-disciplinary Generalists）**：

> 工程经理、产品经理、设计师、数据科学家、财务人员、用户研究员——Claude Code 团队里每一个人都写代码。

这一趋势的逻辑：编程变成了一项像"会用 Microsoft Office"一样的基础技能，不再是专属于工程师的壁垒。领域知识才是稀缺资源——"写会计软件的最佳人选不是工程师，而是一个真正懂会计的会计师"。

另一个观察点：Anthropic 内部的技术领先不来自于更好的模型（对外开放相同），而来自于**组织结构和流程的重塑**——Claude 之间通过 Slack 互相沟通，各自独立运行循环任务，全公司无人工编写代码，SQL 全部由模型生成。

## SaaS 格局重塑：Hamilton 七种护城河

Boris 以 Hamilton Helmer 的 **Seven Powers（七种护城河）** 框架分析 AI 对 SaaS 的影响：

**正在削弱的护城河：**
- **转换成本（Switching Costs）**：模型可以轻松帮用户从一个系统迁移到另一个
- **流程权力（Process Power）**：Claude 4.7 可以 hill climb（迭代爬升）任何流程，持续优化直到目标达成

**依然有效的护城河：**
- 网络效应（Network Effects）
- 规模经济（Scale Economies）
- 稀缺资源（Cornered Resources）

**初创公司的结构性优势：** 大公司面临业务流程升级、员工再培训、内部阻力等重塑成本；初创公司可以 AI 原生从零构建，完全没有这些包袱。Boris 认为"未来十年诞生的颠覆性初创公司数量将是过去十年的 10 倍"。

## 软件民主化：印刷机类比

Boris 认为软件编程即将完成与 15 世纪印刷机类似的民主化：

- 印刷机前：仅约 10% 的欧洲人识字，通常受雇于不识字的国王和领主
- 印刷机后 50 年：欧洲出版的文学作品超过此前一千年总量，书价下降约 100 倍
- 几百年后：全球识字率升至约 70%——但仍然存在职业作家

类比到软件：
- 当前：少数专业工程师掌握编程
- 未来：编程成为像"会发短信"一样的普遍技能
- 但仍会有专业软件工程师，就像有职业作家一样

这一进程将比印刷机时代快得多，因为不需要等待教育体系和基础设施建设。

## Claude Code 的进化路径

来自 Q&A 的预测：

- **Harness 将持续简化**：模型越来越强后，安全机制（prompt injection 检测、命令静态验证、权限模式、Human-in-the-loop）将变得不那么重要——"模型会自己做正确的事"
- **模型 vs. 产品的比例变化**：目前约 50/50，未来随模型增强产品 harness 重要性下降
- **并行化将更加自然**：Claude 4.7 已经会主动建议启动 loop，而不需要用户明确要求
- **新产品方向**：Claude Design、大规模并行 agent（/loop + /batch）、Computer Use

## Sources

- `raw/Boris Cherny Why Coding Is Solved, and What Comes Next.md` — AI Ascent 2026 对谈完整转录，Boris 论述编程现状、个人工作流、团队未来和 SaaS 格局
