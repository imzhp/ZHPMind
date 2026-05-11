---
title: "Vibe Coding"
type: concept
tags: [ai, software-engineering, llm, productivity]
created: 2026-05-08
updated: 2026-05-08
sources: ["Andrej Karpathy From Vibe Coding to Agentic Engineering.md", "Boris Cherny Why Coding Is Solved, and What Comes Next.md"]
source_count: 2
discussions: []
---

# Vibe Coding

Vibe Coding 是由 [[andrej-karpathy]] 于 2025 年初在 X（原 Twitter）上提出的开发方式，指完全依赖 AI 生成代码、几乎不做人工修正、更注重"感觉对了"而非精确控制的编程模式。其核心价值在于**降低软件开发的门槛**——让任何人都能通过 AI 构建出以前需要专业程序员才能实现的东西。

## 定义与起源

Karpathy 描述他自己进入 Vibe Coding 状态的经过：

> 我不记得上次纠正 AI 输出是什么时候了，然后我就越来越信任这个系统，然后我就 Vibe Coding 了。

2024 年 12 月是他认为的关键转折点——最新模型的输出质量达到了几乎不需要修正的水准，整个开发体验从"偶尔有帮助但需要频繁修正"跃迁到了"可以完全信任"。这一转变触发了他的范式切换。

## Vibe Coding 的本质：提升地板

Vibe Coding 的核心作用是**提升所有人的能力下限**：

- 没有编程基础的产品经理可以直接构建原型
- 研究人员可以快速把想法落地成工具
- 任何有想法的人都可以绕过"不会写代码"这一传统门槛

这是对软件民主化的一次真实推进，而非营销噞号。

## 与 Agentic Engineering 的区别

| 维度 | Vibe Coding | [[agentic-engineering]] |
|------|------------|------------------------|
| **目标** | 提升下限（Floor）——让每个人都能做 | 保持质量上限（Ceiling）——让专业工程师更快 |
| **质量责任** | 对质量不设严格要求，"能用就行" | 仍对安全性、可维护性、架构质量负责 |
| **适用对象** | 所有人，尤其是非专业开发者 | 专业工程师和技术团队 |
| **类比** | 让所有人能盖房子的预制板 | 在新工具加持下速度更快的专业建筑团队 |

Vibe Coding 提升了地板，[[agentic-engineering]] 是在这块新地板上继续建高楼。

## 局限性

Vibe Coding 模式下容易产生的问题：

- **代码质量**：过多复制粘贴、缺乏良好抽象、脆弱的接口——Karpathy 原话："sometimes I get a little bit of a heart attack"（有点让人揪心）
- **系统级错误**：Agent 会做出从人类视角看匪夷所思的设计决策，例如 Menu Gen 案例中 Agent 尝试用邮件地址（而非用户 ID）关联 Google 账户和 Stripe 支付账户——因为用户可能用不同邮件注册两个服务，导致充值与账户无法关联
- **安全漏洞**：AI 不会主动检查所有边界条件，Vibe Coding 产生的代码可能引入漏洞而用户浑然不知
- **技术债**：速度快但结构差，随着项目增长维护成本急剧上升

## Vibe Coding 在 Software 3.0 中的位置

Vibe Coding 是 [[software-3-0]] 范式的一种实践形式——它将"给 LLM 的 Prompt"作为编程接口，把 Agent 当作执行环境。极端形式的 Vibe Coding 甚至让应用本身消失（见 Menu Gen 案例）：不再需要构建 app，直接把图片和指令交给 LLM 即可。

## 软件民主化：印刷机类比

[[boris-cherny]] 提供了一个历史类比来理解 Vibe Coding 的长期影响。15 世纪印刷机发明前，欧洲仅约 10% 的人识字；印刷机发明后 50 年，出版物超过此前千年总量，书价下降 100 倍；几百年后全球识字率达 70%——但仍存在职业作家。

类比到软件：编程将从少数专业工程师掌握的技能演变为"像会发短信一样"的普遍技能。这一进程将比印刷机时代快得多，因为无需等待教育基础设施建设。

**领域知识反转**：当编程变得极易获取后，稀缺资源从"会写代码"转移为"懂领域"——"写会计软件的最佳人选不是工程师，而是真正懂会计的会计师"（Boris Cherny，AI Ascent 2026）。

这一视角与 Karpathy 的 [[vibe-coding]] 定义相互呼应：Vibe Coding 提升的是地板，而软件民主化是这块新地板被社会广泛接受后的长期结果。

## Sources

- `raw/Andrej Karpathy From Vibe Coding to Agentic Engineering.md` — Karpathy 对 Vibe Coding 的原始定义、起源故事、与 Agentic Engineering 的对比，以及 Menu Gen 局限性案例
- `raw/Boris Cherny Why Coding Is Solved, and What Comes Next.md` — Boris Cherny 的印刷机类比与软件民主化论述，强化了 Vibe Coding 的长期社会影响
