---
title: "Garry Tan：元元提示法与 AI Agent 系统的秘密"
type: article
tags: [ai, agents, personal-knowledge-base, skillification, second-brain, compounding-systems]
created: 2026-05-10
updated: 2026-05-11
sources: ["Meta-Meta-Prompting The Secret to Making AI Agents Work.md"]
source_count: 1
discussions: []
---

# Garry Tan：元元提示法与 AI Agent 系统的秘密

[[garry-tan]]（Y Combinator CEO）在 2026 年发表的这篇文章，以具体案例揭示了他如何将个人 AI 从"聊天窗口"升级为一套持续复利的操作系统。核心论点是：AI 系统的价值不在于单次提示质量，而在于**可复用技能（Skills）的积累**——技能构建技能，每次改进都自动惠及所有使用该技能的工作流。这套架构被他称为"脂肪技能、脂肪数据、精简 Harness（Fat Skills, Fat Code, Thin Harness）"。

## 书镜（Book Mirror）：AI 如何读懂你的生活

Garry 的"书镜"工作流是理解整套系统的最佳入口。以 Pema Chödrön 的《当一切崩塌》为例：

1. 系统提取全书 22 章内容
2. 每章启动一个子 Agent，同时完成两件事：摘要原作者思想 + 将思想映射到 Garry 的真实生活
3. 映射是"具体的"，不是泛泛而谈——调用的是 Garry 的家族背景、YC 工作、与创始人的谈话记录、治疗师的分析模式

输出是 3 万字的"大脑页面"，双栏排版：左栏 Pema 说了什么，右栏对应到 Garry 正在经历的事。整个过程约 40 分钟，Garry 已用这套方法读完 20+ 本书。

**关键改进迭代**：第一版书镜有三个事实错误（把父母关系写错）。因此强制加入了跨模态评估（Cross-Modal Evaluation）步骤：Opus 4.7 查精确性、GPT-5.5 查遗漏、DeepSeek V4-Pro 检查是否过于泛泛。修复被固化进技能文件，后续所有书镜自动受益。

## 技能化（Skillification）：技能构建技能

这是文章的核心概念，也是标题"元元提示法"的真正含义。详见 [[skillification]]。

要点：
- **Skillify** 是一个元技能，输入是"刚刚手动做了一件事"，输出是一个可复用的技能文件（含触发条件、指令、边缘情况处理）
- 技能文件被注册到解析器（Resolver），之后只需说关键词即可触发
- 书镜工作流就是从第一次手动操作中被 Skillify 提取出来的
- 技能之间可以组合：书镜调用 brain-ops（存储）、enrich（上下文）、cross-modal-eval（质量）、pdf-generation（输出）

## 会议准备：系统自己准备好了

Demis Hassabis 来 YC 做壁炉谈话前，Garry 不到两分钟就获得了：
- Demis 的完整大脑页面（数月积累：文章、播客、自己的笔记）
- 其公开 AGI 时间线观点（"50% 靠规模/50% 靠创新，5–10 年内实现 AGI"）
- Mallaby 传记要点
- 研究优先级（持续学习、世界模型、长期记忆）
- Garry 自己对 AI 的公开立场交叉参照
- 三个演示脚本 + 基于双方世界观异同的对话切入点

准备的不只是事实，而是**角度**（Angles）——这是人工检索无法做到的。

## Fat Skills / Fat Data / Thin Harness 架构

详见 [[fat-skills-thin-harness]]。简述：

| 层级 | 描述 | 规模 |
|------|------|------|
| 精简 Harness | 路由逻辑，不含领域知识 | 几千行代码（OpenClaw / Hermes Agent） |
| 脂肪技能 | 各自独立的 Markdown 技能文件 | 100+ 个技能 |
| 脂肪数据 | 结构化知识库，每人/公司/会议/书/文章一个页面 | 约 10 万页 |
| 模型层 | 可互换，按任务选用 | Opus 4.7、GPT-5.5、DeepSeek V4-Pro、Groq |

核心主张："模型只是引擎，不是汽车。" 系统价值在于积累的数据和技能，而非特定模型。

## 100 万页大脑的结构

[[personal-knowledge-base]] 中有详细记录。每个页面三段结构：
- 顶部：编译后的真相（当前最佳理解）
- 中间：只追加不删除的时间线（按时间顺序的事件）
- 底部：原始数据附件（来源材料）

每个人、公司、会议、书、文章、想法都有对应页面，全部链接、可搜索、每天自动更新。类比：这不是文件柜，而是**神经系统**——连接、标记变化、把当下最相关的东西浮出水面。

## 复利论点

Garry 用"凌晨两点的建造者"作为叙事框架，实质论点是：

> 个人拥有复利 AI 系统 vs. 使用企业中心化 AI 工具，差距等同于写日记 vs. 拥有神经系统。

每次会议增加大脑，每本书丰富下一本书的语境，每个技能让下一个工作流更快，每个人物页面让下次会议准备更锐利。系统今天比两个月前强 10 倍，两个月后会再强 10 倍。

## 如何开始

Garry 给出的具体入门步骤：
1. **选一个 Harness**：OpenClaw、Hermes Agent 或自建（保持精简，只做路由）
2. **用 GBrain 启动知识库**：97.6% 的长记忆召回率，附 39 个可安装技能
3. **做一件真实的事**：写报告、研究一个人、分析投资组合——用 Agent 迭代直到满意，然后用 Skillify 提取成可复用技能
4. **坚持使用并审查输出**：运行跨模态评估，把发现的错误固化进技能文件——六个月后拥有无法被任何聊天机器人复制的系统

## Sources

- `raw/Meta-Meta-Prompting The Secret to Making AI Agents Work.md` — Garry Tan 对其个人 AI 系统架构、书镜工作流、技能化方法论和复利哲学的完整阐述
