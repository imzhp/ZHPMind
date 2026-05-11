---
title: "技能化（Skillification）"
type: concept
tags: [ai, agents, meta-skill, workflow, automation, compounding-systems]
created: 2026-05-10
updated: 2026-05-10
sources: ["Meta-Meta-Prompting The Secret to Making AI Agents Work.md"]
source_count: 1
discussions: []
---

# 技能化（Skillification）

技能化（Skillification）是 [[garry-tan]] 提出并实践的方法论：将任何**值得重复的工作流**提取为一个自包含的技能文件（Skill File），注册到 Agent 的解析器（Resolver）中，使其可被触发词一键调用。这是文章所谓"元元提示法（Meta-Meta-Prompting）"的真正含义——提示（Prompt）不是针对单次任务编写的，而是提炼为可持续迭代和自动改进的**操作知识单元**。

## 核心循环

```
手动完成一件事
     ↓
用 /skillify 提取可复用技能
     ↓
技能文件包含：触发词 + 详细指令 + 边缘情况
     ↓
运行 check_resolvable 验证注册到解析器
     ↓
下次重复时：一句话触发 → 技能自动运行
     ↓
发现问题 → 运行 Cross-Modal Evaluation → 修复写回技能文件
```

每一次修复，都**永久改善所有使用该技能的工作流**。这是技能化产生复利效应的机制。

## Skillify：元技能

Skillify 是技能化的操作工具，本身也是一个技能——元技能（Meta-Skill）：

- **输入**：刚刚完成的一次手动操作
- **过程**：检查刚才发生了什么，提取可重复模式，识别边缘情况，写出规范的技能文件
- **输出**：一个可立即注册的技能文件 + 检查清单

这就是文章标题"元元提示法"的含义：Skillify 是一个"关于如何写提示的提示"，将提示变成了可编程、可迭代、可积累的工程制品。

## 技能的结构

技能文件是独立的 Markdown 文件，包含：
- 触发条件（什么情况下应用此技能）
- 详细指令（分步骤，含判断逻辑）
- 边缘情况处理
- 调用哪个模型
- 调用哪些其他技能（组合关系）

技能本身不是代码，而是**结构化的操作知识**，任何人（包括非工程师）都可以阅读和修改。

## 技能组合

技能可以相互调用，形成工作流网络。以 [[garry-tan-meta-meta-prompting#书镜（Book Mirror）]] 的书镜流水线为例：

```
book-mirror
├── brain-ops        ← 存储和检索
├── enrich           ← 添加上下文
├── cross-modal-eval ← 质量评估
└── pdf-generation   ← 输出格式
```

改进 `brain-ops` 或 `cross-modal-eval` 后，所有调用它们的上层技能自动受益。这是技能架构相对于单一大 Prompt 的核心优势：**模块化改进，全局生效**。

## 跨模态评估（Cross-Modal Evaluation）

技能质量保证的标准工具。针对技能的输出，同时调用多个模型从不同角度打分：

| 模型 | 评估维度 |
|------|---------|
| Opus 4.7 1M | 精确性（事实错误、细节准确度） |
| GPT-5.5 | 召回率（是否遗漏重要内容） |
| DeepSeek V4-Pro | 泛化性（是否流于套话，缺乏具体性） |

发现问题后，修复被写回技能文件——下一次运行自动包含修复。这是技能版本迭代的标准流程。

## 与 Agentic Engineering 的关系

技能化可以看作 [[agentic-engineering]] 的"知识沉淀层"：

- Agentic Engineering 强调人类担任"设计师 + 指挥官"角色，把关 Agent 的质量
- 技能化提供了一种机制，把这种把关的**结果**（修复、边缘情况处理、正确指令）固化为可重复的资产
- 两者共同回答的问题：如何让 Agent 越用越聪明，而不是每次都从零开始

## GBrain 中的技能生态

[[garry-tan]] 开源的 GBrain 附带 39 个可安装技能，包括：

| 技能名 | 功能 |
|--------|------|
| book-mirror | 书籍内容映射到个人生活 |
| meeting-ingestion | 会议录音 → 结构化摘要 + 实体传播更新 |
| enrich | 人物名 → 五源合并的大脑页面 |
| media-ingest | 视频/音频/PDF/截图 → 转录 + 实体提取 |
| perplexity-research | 网络研究 + 大脑已有知识去重 |
| skillify | 从手动操作提取新技能（元技能本身） |

## Sources

- `raw/Meta-Meta-Prompting The Secret to Making AI Agents Work.md` — Garry Tan 对技能化方法论、Skillify 元技能和 GBrain 技能生态的完整阐述
