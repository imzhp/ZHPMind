---
title: "Harness Engineering with Claude: 14 步路线图"
type: article
tags: [ai, agents, harness, claude-code, software-engineering, agentic-engineering]
created: 2026-06-18
updated: 2026-06-18
sources: ["Harness engineering with Claude 14-step roadmap from one agent to a self-improving system..md"]
source_count: 1
discussions: []
---

# Harness Engineering with Claude: 14 步路线图

这篇文章是 0xMovez AI 在 Substack 发布的操作指南，系统阐述了 Harness Engineering（运行环境工程）的 14 步路线图——从单个 Agent 到自我改进系统的完整建设路径。核心论断是：**循环（loop）只和它运行的底层 Harness 一样好；坏底座上的循环只是更快地制造垃圾。** 本文与 [[fat-skills-thin-harness]] 的 Garry Tan 视角和 [[agentic-engineering]] 的 Karpathy/Boris 视角形成三角互补，提供了最具操作性的 Harness 构建步骤。

## 三层楼模型

区分三个层级是所有"我的 Agent 混乱"问题的根源：

| 楼层 | 定义 | 特点 |
|------|------|------|
| **Harness（底层）** | 单个 Agent 运行的环境 | 静态配置：模型、工具、权限、上下文 |
| **Loop（中层）** | 按计时器触发 Harness、生成辅助 Agent、自我续接 | 动态调度，运行在 Harness 之上 |
| **自我改进系统（顶层）** | Loop + 记忆，复利积累 | 每次运行让下次更聪明 |

操作原则：**把常驻事实放进上下文（context），把强制性规则放进 hooks，把流程放进 skills，把隔离任务放进 subagents。** 把这四件事混在一起，是 Agent 表现不稳定、费用居高不下的根本原因。

## Harness 的四个要素

一个 Harness 本质上只有四样东西：**模型**（负责思考）、**工具**（可调用的能力）、**权限**（工具的许可范围）、**上下文**（每次运行开始时读取的内容）。所有其他机制——subagents、hooks、memory——都是在塑造这四个要素的某一个。整个 Harness 住在 `.claude/` 目录：

```
.claude/
├─ CLAUDE.md          # 常驻事实，每次会话都读
├─ settings.json      # 权限、模型、hooks 配置
├─ .mcp.json          # 外部工具连接
├─ rules/             # 路径范围内的行为规则
├─ agents/            # subagent 定义（~30 行/个）
├─ skills/            # 可复用工作流
└─ agent-memory/      # 跨次运行的状态文件
```

一条保持 Harness 整洁的黄金规则：**每个文件都能用一句话说明它存在的理由；说不出理由，就删掉。**

## CLAUDE.md = 事实，Skills = 流程，Hooks = 强制执行

这三个机制各司其职，混用是主要的设计错误：

**CLAUDE.md — 常驻事实（suggestion，可被忽略）**
每次会话都读取。存放的是 Agent 在每个会话里都需要知道的事实（"我们用 pnpm，不用 npm"；"auth 中间件顺序是 rate_limit → jwt → rbac"）。主流错误是让它膨胀成程序文档。实践原则：**CLAUDE.md 的主文件建议不超过 500 tokens**。大声朗读每一行——如果它是"事实"，留在这里；如果它是"流程"，移入 skill；如果它是"针对某个路径的规则"，移入 `rules/`。

**Skills — 可复用流程（SKILL.md 文件）**
Agent 以 `/skill-name` 调用，或在任务匹配 skill 描述时自动触发。与 subagent 不同，skill 在**同一**上下文窗口运行——只是可复用的指令块。触发创建 skill 的信号：**你注意到自己在每次新对话里粘贴同样的指令。** PR 检查清单、发布流程、评估程序——写一次，永久调用。Skill 是 Harness 随时间改进的单元：每次流程在新方式下失败，把教训加进 skill，下次运行就继承了它（详见 [[skillification]]）。

**Hooks — 确定性执行（enforcement，不可绕过）**
这是与前两者的本质区别：CLAUDE.md 是建议，模型可以忽略；**Hooks 是 Agent 无法绕过的 shell 命令**，在 Agent 生命周期的固定节点触发，退出码可以**阻断操作**。两个在几乎所有 Harness 里都值得的 Hooks：

- **PreToolUse 安全门**：阻断危险命令（`rm -rf`、读取 `.env`、push 到 main）。退出码 2 = 在执行前拦截。模型无法用语言绕过它。
- **PostToolUse 格式化器**：每次编辑后自动运行 linter/formatter。Agent 永远不会提交未格式化的代码，因为 Harness 自动格式化了。

Hooks 用于"**必须发生**"或"**绝对不能发生**"的事——安全、格式化、审计日志。**不要**用 Hooks 做判断题；那是模型的事。一个好的 Harness 有一两个精准的 Hooks，不是二十个。

## 最有价值的 Subagent：写作与审查的分离

Subagent 的核心价值不是并行本身，而是**隔离上下文，防止噪声污染主线程**。读取 40 个文件的研究任务、需要全新视角的审查、产出大量日志的评估——这些都属于 subagent，不要让它们污染主对话上下文。

**几乎每个 Harness 里最有价值的 subagent 是那个检查主 Agent 工作的 reviewer**：模型审查自己的产出时会对自己太宽容；一个拥有全新上下文窗口的独立 reviewer 能发现写作者说服自己接受的东西。这是让每个上层 Loop 可信的"写作者 vs 审查者分离"（writer-vs-checker split）。

## 记忆：让 Harness 积累，而非每次重启

Agent 忘记两次运行之间的一切。**Harness 不必如此。** 状态文件（`agent-memory/STATE.md` 或类似）记录尝试过什么、什么有效、什么失败、哪些规则存活下来。

让记忆产生复利的三步模式：
1. **离开前写入**：每次运行结束时更新状态文件——学到的教训、验证的事实、下一步
2. **开始时读取**：每次运行开始时读取状态文件和相关 skills，续接而非重启
3. **蒸馏进 skills**：当一个教训是通用的（"Windows CI runner 需要 bash 而非 PowerShell"），它从状态文件毕业，进入 skill——应用于每个未来的项目

```markdown
## 已验证事实（停止猜测这些）
- prc 是美元，不是分（用 SELECT MIN/MAX 验证）
- auth 中间件顺序：rate_limit → jwt → rbac

## 教训（把通用的蒸馏进 skills）
- Windows CI runner 的 TLS 1.2 在 PowerShell 下失败——用 bash
- >1M 行的表上的 Migrations 必须分 10k 块批处理

## 上次会话（续接，不要重启）
2026-06-11 · 3 个修复合并，2 个上报。下一步：验证限流修复
```

## 自我改进的真实含义

当三个楼层锁合在一起，就产生了自我改进：每次运行产出 → reviewer subagent 检查 → 结果写入记忆 → 通用教训蒸馏进 skills → 下次运行继承了更好的 skills 和更丰富的记忆。

> "模型没有变。它周围的 Harness 变得更精准了。这才是'自我改进'的真实含义——不是一个会学习的模型，而是一个会积累的 Harness。"

构成自我改进的四个 Harness 部件：subagent 评估工作（客观检查，全新上下文）、记忆记录结论（跨次运行存活）、skills 保存规则（下次运行应用）、loop 再次执行（带着上次学到的一切）。

## 建设顺序与反模式

**建设顺序**（顺序是关键）：先让一次人工运行在干净 Harness 上可靠 → 添加上下文和权限 → 添加 reviewer subagent → 添加记忆 → 最后才包上 Loop。好 Harness 上的 Loop 复利增长；坏 Harness 上的 Loop 只是更快地流血。

**八个让每个 Loop 更差的 Harness 错误**：

| 反模式 | 后果 |
|--------|------|
| 使用默认 Harness | 无上下文、无规则、无记忆——Agent 每次会话从头推导 |
| CLAUDE.md 膨胀 | 流程塞进常驻上下文，每次运行都变贵 |
| 强制性规则写在 CLAUDE.md 里 | 模型可以忽略建议，无法忽略退出码为 2 的 hook |
| 一个 Agent 写作又给自己打分 | 加一个全新上下文窗口的 reviewer subagent |
| 没有记忆 | 每次运行从零重启，状态文件让明天续接今天 |
| 在坏 Harness 上包 Loop | Loop 只是更快地产生垃圾，先建好基础 |
| 二十个 Hooks | 一两个精准的比一堆没人理解的好 |
| 发布 Harness 前未扫描 | 泄露的密钥和过宽的权限传播到安装它的每个人 |

## Sources

- `raw/Harness engineering with Claude 14-step roadmap from one agent to a self-improving system..md` — 0xMovez AI Substack 文章，Claude Code Harness Engineering 14 步路线图全文
