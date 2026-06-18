---
title: "Kimi K2 群集自改进循环：10 步剧本"
type: article
tags: [ai, agents, multi-agent, swarm, kimi, skillification, compounding-systems, agentic-engineering]
created: 2026-06-18
updated: 2026-06-18
sources: ["The Self-Improving Loop a 300-agent swarm on Kimi K2.6, verified by Opus 4.8.md"]
source_count: 1
discussions: []
---

# Kimi K2 群集自改进循环：10 步剧本

这篇文章由 0xMovez（[@0xMovez](https://x.com/0xMovez)，即 [[harness-engineering-with-claude]] 的同一作者）发布，阐述了 Kimi K2.6 的 300 代理群集（swarm）如何通过技能化机制实现自改进循环。核心论点：**群集的廉价并行解决了上下文窗口崩溃问题，而验证门（Verify Gate）+ 技能库复利积累才是让群集在第 50 次运行仍比第 1 次更聪明的架构秘密**。本文与 [[harness-engineering-with-claude]] 形成互补——后者聚焦 Claude Harness 构建，本文聚焦 Kimi 群集的运行剧本。

## Kimi K2.6 群集规格

Kimi K2.6 与多数人理解的"聊天盒子"不同——它的群集层有以下关键指标：

| 规格 | K2.5 | K2.6 |
|------|------|------|
| 并行子代理数 | 100 | **300** |
| 协调步骤总预算 | 1,500 | **4,000** |
| 平均每代理步数 | ~15 | ~13 |

输出是真实文件，非聊天回复：一次运行可生成 100+ 个文件、10 万字文献综述、或 2 万行数据集。价格：$0.95/M 输入，$4.00/M 输出，缓存命中 $0.16。这一价格让"扔掉重跑"在经济上可行，改变了愿意尝试的边界。

## 为什么群集不崩溃

单 Agent 在长任务中会因上下文窗口填满而降级为有损摘要（lossy summarization）——每个推理步骤之后的质量都在变差。群集的结构性解决方案是：**每个子代理在自己的有界上下文窗口（bounded context window）中工作，只有结构化输出回传协调器**。这就是为什么群集不会在突破单 Agent 能力的任务上崩溃。

## 10 步剧本

### 步骤 1：写规范（Spec），不是提示词

一行提示给群集授权去决定一切，它会决定错。规范是合同，提示是愿望。规范定义七件事：

```
GOAL: 一句话——可交付物，而非话题
SCOPE: 明确范围内外
RULES: 什么算有效行（验证标准）
SOURCES: 一手来源，无聚合器
OUTPUT: 文件类型/数量/命名/格式细节
ON CONFLICT: 标记该行，绝不静默解决
STOP CONDITION: 何时停止猜测并上报
```

关键：**Kimi 自己决定分解方式**——你描述目标，群集自己建组织架构图。这与 CrewAI、LangGraph、AutoGen 需要人工连线的方式根本不同。

规范是整个循环中杠杆率最高的工件，因为它在步骤 6 中成为可复用技能的种子。

### 步骤 2：运行前审阅分解计划

提交规范后，Kimi 在执行前先展示执行计划——多少子代理、各自处理什么、依赖顺序、步骤预算。审阅三件事：是否理解范围、代理数量是否与任务体量匹配、输出计划是否符合实际需求。检查计划不花钱，跳过可能代价高昂。

```python
"Show me the proposed decomposition before running:
- how many sub-agents, and what each one handles
- the dependency order (what blocks what)
- estimated step budget
- where the biggest quality-drop risk sits
Do NOT execute yet. Wait for my confirmation."
```

### 步骤 3：让它浪费——这就是重点

执行后，第一波代理并行处理所有独立子任务；结果落地后，协调器基于依赖图启动下一波，直到依赖图解析完毕。每个子代理在独立上下文中工作，只有结构化输出回传。Kimi 的低价使"先运行后判断"比"纠结应不应该跑"更经济。

### 步骤 4：要求真实文件，不要聊天回复

输出规范要用精确目标：

```
"A comprehensive report" → 代理权限停早
"40-page PDF + 20,000-row CSV + 14 PNG charts" → 代理有质量目标
```

始终用输出领先规范。精确性是差别所在。

### 步骤 5：验证门（Verify Gate）——让诚实的模型盯住输出

群集的已知缺陷：除非明确要求验证，它产出自信但引用不足的论断，独立子代理有时相互矛盾。"看起来做完了"与"确实是对的"是两件事。

**Opus 4.8 只做一件事：反驳，不是赞美。** Anthropic 报告它比 4.7 少约 4 倍地放过自己代码中的缺陷，是第一个在不加批评地上报有缺陷结果上得分为 0% 的 Claude 版本。廉价的大量产出只有在可信任的东西检查工作时才是超能力——保留验证门。

这对应 [[harness-engineering-with-claude]] 中的"写作者 vs 审查者分离"（writer-vs-checker split）原则，在群集层的具体实现。

### 步骤 6：将整个工作流保存为技能

这是让循环自我改进的节拍。一次运行后，告诉 Kimi 将整个工作流捕获为可复用技能：输入格式、代理步骤、输出格式。

第一次运行 20 分钟，之后每次 30 秒。这是"自学习"的诚实版本：**模型不在运行之间重新训练权重；系统周围的技能库在变聪明**。竞争对手无法在一周内复制你的技能库——它由数月真实运行构建。这是 [[skillification]] 在群集场景的具体实现。

```python
"Save this entire workflow as a reusable Skill: '[name]'
Capture: input format, agent steps that worked,
output format and naming convention, validation rules from spec."
```

### 步骤 7：将自己的文档输入为群知识

技能捕获流程；文档转技能（Document-to-Skill）捕获领域知识。上传最佳作品（成交提案、精磨报告、幻灯片），Kimi 将其结构和风格指纹捕获为技能，所有 300 个并行代理自动应用。每喂入一个 PDF、文字稿或电子表格，都成为全部代理可据此定位的上下文，不再依赖通用训练数据。

### 步骤 8：将验证反馈变成永久规则

步骤 5 捕获一次缺陷；步骤 8 确保群集再也不犯同样错误。将 Opus 的修复清单烘焙进一个 `CONSTRAINTS.md` 文件，Kimi 在每次会话开始时自动读取：

```markdown
# CONSTRAINTS.md — loaded automatically
- every claimed figure must trace to a primary source or be flagged
- no silent conflict resolution — surface contradictions
- [rule distilled from last run's Opus feedback]
- [the mistake you never want repeated]
```

这是循环从自身失败中学习：运行 #1 被 Opus 标记的漂移，变成运行 #2 的硬规则。经过几个项目后，CONSTRAINTS.md 成为自我执行的活文档——验证门需要捕获的越来越少。

### 步骤 9：用新输入重放技能——看成本崩溃

运行 #2 不从零开始：从步骤 6-8 构建的技能、群集知识和约束文件开始。相同工作流，新文件，极少的设置。第一次竞争监控需要完整规范和验证；第四次是 30 秒提示词加上已保存技能，输出更锐利，因为它继承了之前所有运行的所有修复。

```python
"Run the saved skill '[name]' on these new inputs.
Apply CONSTRAINTS.md. Use the captured output format.
Report only deviations from the skill's expected shape."
```

### 步骤 10：将循环提升为后台代理

一旦循环稳定且有技能支撑，停止手动启动。将 Kimi 指向触发器——定时计划、新文件投放、竞争对手的定价页——让它主动运行完整循环，只上报可交付物和偏差。竞争监控是干净的例子：运行 #1 手动构建和验证；当它成为后台代理时，每周并行检查每个竞争对手并将摘要投入收件箱，零边际时间成本。

## 群集自改进的复利结构

```
规范 → 群集执行（300代理 × 4000步）
           ↓
      Opus 4.8 验证门（只找毛病）
           ↓
   缺陷 → CONSTRAINTS.md（永久规则）
   流程 → Skill 文件（可复用工作流）
   领域知识 → 文档技能（群集知识）
           ↓
      下次运行继承所有改进
```

**群集不是更快的聊天盒子——它是可以学习的运营基础设施。** 闭源实验室在竞争谁的模型更聪明；这个系统在竞争谁的设置在第 50 次运行时比第 1 次更锐利。开源权重模型实现了一个自学习群集，与 DeepSeek 重新框定推理成本的方式有着相同的结构形状。

## Sources

- `raw/The Self-Improving Loop a 300-agent swarm on Kimi K2.6, verified by Opus 4.8.md` — @0xMovez 发布的 Kimi K2.6 群集完整 10 步操作剧本，含规范模板、验证门机制、技能化与后台代理升级
