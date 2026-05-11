# ZHPMind 设计原则

> ZHPMind 是张昊鹏的个人 Brain——一个"人生随身笔记本"，同时承载学习、思考、业务运营、人生反思。它是一个会陪伴几十年的活系统。

本文档分三层。第一层和第二层是"宗"，长期不变；第三层是"变"，随工具演化而更新。

---

# 第一层：底层逻辑（不变量）

无论工具叫什么名字，无论 AI 模型如何进化，以下 7 条逻辑不变。

## 1. 认知循环

```
感知 → 记录 → 整理 → 连接 → 理解 → 应用 → 反思 → 修正
                  ↑________________________________________↓
```

这是无限循环，每一轮让理解更深。这就是复利的真正含义——不是工具的复利，是认知的复利。

ZHPMind 的终极目的：让这个循环**转得更快、更深、更不容易断裂**。所有工具都是服务于这个循环的。任何一个环节断裂（记录了没整理、整理了没连接、理解了没应用、应用了没反思），系统就开始衰退。

## 2. 信息三态

所有流入系统的信息只有三种性质，维护方式各异：

**理解**（你对某件事的认知）——会被不断重写和深化。今天的理解被更好的理解覆盖。

**事件**（发生过的事）——不可变，只能追加。一件事发生了就是发生了，不会被"重写"。

**快照**（某时间点的状态）——会过时，被新快照替代，旧快照归档。

这三种性质决定了信息的存放和维护方式：
- 理解 → rewrite-friendly
- 事件 → append-only
- 快照 → version + archive

## 3. Pull + Push 双模采集

信息进入系统只有两条路：

**Pull（人主动找）**——读书、搜索、参会、提问。价值密度高，因为你有目的。瓶颈是人的时间和注意力。

**Push（系统推给你）**——邮件通知、RSS、定期爬取、webhook。价值密度低但覆盖面大。瓶颈是噪声过滤——Push 后必须有过滤层，否则 inbox 变垃圾堆。

一个完整的系统两种都要。AI 在 Push 端的价值远大于 Pull 端。

## 4. 人判断 + AI 执行

在认知循环的每一步：

| 环节 | AI 做什么 | 人做什么 |
|---|---|---|
| 感知 | 自动推送信号（Push） | 主动探索（Pull） |
| 记录 | 自动转录、格式化 | 决定记什么 |
| 整理 | 自动分类、打 tag | 决定分类标准 |
| 连接 | 自动发现关联 | 判断关联是否有意义 |
| 理解 | 生成蒸馏初稿 | 判断蒸馏是否准确 |
| 应用 | 提供 context pack | 做最终决策 |
| 反思 | 调出相关知识照亮经历 | 真正的内省 |
| 修正 | 执行修改、保持一致性 | 决定修正方向 |

原则：**AI 做宽度和速度，人做深度和判断。** 这个系统是为放大你的认知服务的，不是为替代你的判断服务的。

## 5. 三层松耦合

任何个人知识 + AI 系统都分三层：

- **存储层**——数据在哪、什么格式
- **智能层**——AI 怎么读写数据
- **交互层**——人怎么和数据互动

三层之间必须松耦合：存储层换了，其他两层不报废；智能层换了，其他两层不报废；交互层换了，其他两层不报废。

这是"万变不离其宗"的技术保障。

## 6. 开放格式

知识要陪你几十年。在这个时间尺度上，任何工具都可能消亡。

唯一能确保数据活得比工具长的，是开放格式：
- **Markdown**——纯文本，任何编辑器能打开，任何 AI 能读写，20 年后依然可读
- **Git**——版本控制，可回滚，可追溯，去中心化备份
- **文件系统**——不依赖数据库，不依赖云服务

任何叠加在此之上的东西（数据库索引、插件、特定 AI 格式）都是**派生层**——可以从基础数据重建。派生层消失了，数据依然完整。

## 7. 健康度 = 流动性

知识系统健不健康，看的不是页面数量，而是认知循环转不转得动：

- 有输入吗？（不输入 = 停滞）
- 消化得过来吗？（inbox 无限增长 = 梗阻）
- 有连接吗？（全是孤岛 = 碎片化）
- 有输出吗？（只进不出 = 仓库，不是神经系统）
- 有修正吗？（旧知识不更新 = 僵化）
- 有归档吗？（过时不清理 = 噪声淹没信号）

**让所有内容流动起来。** 任何阻碍流动的设计都应该被放弃。

---

# 第二层：设计原则（从底层逻辑推导）

## 工作流（从认知循环推导）

认知循环的每一步对应一个工作流。

**基础工作流**（认知循环直接对应）：

1. **capture** —— 感知/记录。所有信息先进 inbox，不分类，不判断。
2. **distill** —— 整理/连接/理解。从 inbox 蒸馏到 wiki。AI 生成初稿，满足三条件（见下方红线）。
3. **apply** —— 把理解用到行动中。调出相关 wiki + 历史经验，打成 context pack 用到 projects。
4. **harvest** —— 从行动中反哺理解。项目中的真实问题、试错结果、最终经验，回流到 wiki。
5. **mirror** —— 反思的双向映射。
   - Book Mirror（外 → 内）：读完书/文章，AI 映射到你的真实生活。
   - Life Mirror（内 → 外）：经历一段事件/情感，AI 调出相关知识帮你看见自己。
6. **review** —— 定期回顾，驱动循环不断裂。

**增强工作流**（认知循环的加速器）：

7. **propagation** —— 横向散播。一条新信息进来，自动更新所有相关页。分层策略：distill 后自动 propagate；journal 后 AI 建议你审；harvest 后自动 propagate。
8. **output** —— 从 vault 沉淀生成成品（文章、报告、决策书）。复利的最终兑现。
9. **skillify** —— 把手做过一次的工作流提炼成可复用 skill。skill 的设计意图和迭代记录也存在 wiki 里。

## 内容分类（从信息三态推导）

通过 frontmatter 的 `type` 字段区分，不通过子目录：

| type | 信息性质 | 维护方式 |
|---|---|---|
| `concept` | 理解 | rewrite-friendly |
| `method` | 理解 | rewrite-friendly |
| `framework` | 理解 | rewrite-friendly |
| `person` | 事件 + 理解 | 三段式（见下） |
| `article` | 理解（一次性蒸馏） | 基本不改 |
| `book` | 理解（双栏映射） | 基本不改 |
| `reflection` | 理解 + 事件 | mirror 产物，可 rewrite |
| `snapshot` | 快照 | 定期更新，旧版归档 |

**三段式结构**（对事件类和混合类页面严格执行）：

```markdown
---
type: person
title: XXX
tags: [...]
---

## Compiled Truth
（当前最佳理解，人主导编辑，rewrite-friendly）

---

- YYYY-MM-DD [来源:xxx] 事件描述
- YYYY-MM-DD [来源:xxx] 事件描述

## References
- [[wiki/raw/相关原始素材]]
```

Compiled Truth 在上（理解），Timeline 在中（事件，append-only），References 在下（溯源）。

概念类页面（`concept` / `method` / `framework`）不需要三段式——它们整页都是 rewrite-friendly。

## 信号采集设计（从 Pull + Push 推导）

- **Pull**（人手动）：读书、搜文章、参会、日记、灵感 → 人丢进 inbox
- **Push**（系统自动）：政策监控、邮件分拣、选品数据、竞品动态、社交信号 → 系统写入 inbox，经过滤层

两者的统一入口都是 **inbox/**。inbox 是 Pull 和 Push 的汇合点。

## AI 红线（从人判断 AI 执行推导）

**AI 可以直接写 wiki/pages/**，但每次写入必须同时满足三条硬约束：

1. **溯源** —— 标明来自哪个 raw、哪次 distill、哪个模型、什么时间
2. **互评** —— 通过 cross-modal eval（至少两个模型）
3. **可回滚** —— vault git 化，每次 AI 写入对应一个 commit

不要"事前人审"。信任靠可验证、可回滚、可追溯建立，不靠事前禁止。

**AI 不自动修改 projects/** —— 保护你的思考节奏。但主动调用时可辅助。AI 可以读 projects/。

**不设 AI 禁入区。** 情感内容是 mirror 工作流的核心载体。隐私通过"源头不记敏感数据"控制：证件号、银行卡号、密码、API key 不写进 vault。

## 技术架构约束（从三层松耦合推导）

- **存储层**：markdown + git。不依赖任何特定工具的私有格式。
- **智能层**：skills 是模型无关的（描述工作流逻辑，不绑定特定 LLM）。
- **交互层**：浏览界面可替换。底层数据不依赖交互层的特有功能。

## 文件格式（从开放格式推导）

- 核心数据 = markdown + git（生存条件）
- 派生层（数据库索引、插件配置）= 可从 markdown 重建，消失不影响核心
- `[[wikilink]]` 语法：微弱锁定但广泛兼容，可接受

## 监测指标（从健康度推导）

| 指标 | 警戒信号 | 含义 |
|---|---|---|
| inbox 积压 | >50 条未处理 | 消化跟不上输入 |
| wiki 孤岛率 | 无 backlink 页面 >30% | 蒸馏后没连接 |
| projects 僵尸率 | >3 月未动项目 >50% | 启动太多没收尾 |
| outputs 缺失 | wiki 写一年无产出 | 复利没兑现 |
| 修正频率 | 半年无 wiki 页被重写 | 认知僵化 |

---

# 第三层：当前工具映射（这一层是"变"的）

## 物理结构

```
ZHPMind/
├── inbox/           ← Pull + Push 的统一入口（含 Obsidian Clipper 剪藏）
├── wiki/
│   ├── pages/       ← 概念/方法/人物/反思（平铺，tag + MOC 导航）
│   └── raw/         ← 已被 wiki 引用的原始素材（永久保留）
├── projects/        ← 活的工作（每个项目一个子文件夹）
├── outputs/         ← 完成产出（报告、文章、对外文档）
└── archive/         ← 按原结构镜像归档
```

**inbox 和 raw 的区别是生命周期**：inbox 是"未来的可能性"（会被清空）；raw 是"过去的记忆"（作为引用源永久保留）。

## 导航

- **tag** —— 多维度标记（`#业务/曜野` `#健康` `#育儿` 等），内容驱动
- **MOC（Maps of Content）** —— 自下而上生长：某 tag 下 ≥5 页时建主题导航页
- **backlink** —— 自然连接，流动的最小单位

## 底层逻辑 → 工具来源映射

底层逻辑定了之后，具体方法从"教条"变成"工具箱里的零件"：

| 底层逻辑 | 从 Karpathy 取 | 从 Garry Tan 取 | 我们的原创 |
|---|---|---|---|
| 认知循环 | Obsidian IDE + LLM 蒸馏范式 | skill 系统 + skillify 闭环 | Life Mirror（双向） |
| 信息三态 | wiki 的 rewrite 哲学 | compiled truth + timeline 三段式 | 三态显式分类 |
| Pull + Push | Pull：人手动喂 LLM | Push：signal-detector + recipes | — |
| 人判断 AI 执行 | "LLM 写，人审" | 三条硬约束（溯源+互评+可回滚） | 不设 AI 禁入区 |
| 三层松耦合 | Obsidian(交互) + Claude Code(智能) + markdown(存储) | GBrain(检索) + skills(智能) + git(存储) | 显式三层命名 |
| 开放格式 | markdown + git | markdown + git | — |
| 健康度 | （无显式监测） | maintain + doctor + skillpack-check | "流动"作为第一性原则 |

## 当前三层的具体工具

**存储层 = markdown + git（ZHPMind vault）**
- source of truth，人类可读可编辑
- git 化保护 AI 写入（每次 commit）
- 开放格式保证长期存活

**智能层 = Claudian（vault 内）+ Hermes Agent（vault 外）**

Claudian（Claude Code in Obsidian）负责 vault 内的深度加工：
- distill（蒸馏 inbox → wiki）
- query（跨 vault 检索）
- reflect（日记 → 洞察）
- mirror（Book Mirror + Life Mirror）
- 质量维护（lint、cross-modal eval）

Hermes Agent 负责 vault 外的信号采集和自动化：
- Push 信号采集（政策/邮件/选品/竞品/社交）→ 写入 inbox/
- review digest（weekly/monthly/annual）
- 健康度监测
- cron 自动化
- skillify 执行层

两者的接口是 **inbox/** —— Hermes 把外部信号搬到 inbox，Claudian 从 inbox 蒸馏到 wiki。

**交互层 = Obsidian**
- 你浏览/编辑 wiki 的界面
- 移动端捕捉（手机 Obsidian）
- graph view / backlink 导航
- Obsidian 是可替换的——如果明天出现更好的 markdown 浏览器，切换只需指向同一个 ZHPMind 目录

## 曜野业务的 Push 信号采集规划（Hermes skills）

| skill 名 | 信号源 | 频率 | 产出位置 |
|---|---|---|---|
| policy-monitor | 海关/税务/平台公告 | daily | inbox/ |
| product-trend-watch | 电商平台/Google Trends | weekly | inbox/ |
| email-triage | 邮箱（供应商/平台/客户） | hourly | inbox/ |
| competitor-watch | 竞品 listing 变化 | daily | inbox/ |
| review-digest | vault 自身 | weekly | inbox/ |

参考 GBrain 的 recipes 设计，在 Hermes 里实现。随业务变化可增减。

## 节奏

| 频率 | 内容 |
|---|---|
| daily | capture 到 inbox（手机端为主）；Hermes Push 采集运行 |
| weekly | 清空 inbox + 蒸馏 + review digest + 15 分钟回顾 |
| monthly | deep review + 健康度检查 + 补 MOC + 30–60 分钟回顾 |
| annual | archive 归档 + 年度反思 + 重写过时 wiki + 2 小时回顾 |

节奏由你承诺，Hermes 触发。

## Skillify：工作流的自我迭代

第一次手做完一个工作流后，提炼成可复用 skill：
- skill 执行文件存在智能层（~/.hermes/skills/ 或 Claudian 的 CLAUDE.md 规范）
- skill 的设计意图和迭代记录存在 vault（`wiki/pages/skill-xxx.md`）
- 这样 skill 本身也是知识体系的一部分，可讨论、可迭代、可归档

---

# 这份文档本身的角色

**第一层和第二层** = "宗"。长期不变。除非你对"人 + AI + 知识管理"的根本理解变了。

**第三层** = "变"。随工具演化更新。出现更好的工具，换映射，不动逻辑。

**使用场景**：
- 未来开新对话时，把这份文档粘进去，不需要从零再聊
- Hermes 接入时，这是 skill 设计的依据
- 年度 review 时，回头看"我当初怎么想的、是不是还认这个原则"

宪法可以修订，修订记录在 Changelog 里。

---

# Changelog

**2026-05-11 v2** —— 从第一性原理重写。核心变化：
- 建立三层架构：底层逻辑（不变量）→ 设计原则（推导）→ 工具映射（可变）
- 7 条底层逻辑：认知循环、信息三态、Pull+Push、人判断 AI 执行、三层松耦合、开放格式、健康度=流动性
- Karpathy 和 Garry Tan 降级为第三层的参考来源，不再是框架起点
- 新增：曜野业务 Push 信号采集规划
- 新增：skillify 机制
- 新增：propagation 分层策略
- 新增：output 作为工作流
- 保留 v1 洞察：流动、不设 AI 禁入区、双向 Mirror

**2026-05-11 v1** —— 初版。基于和 Claude 的多轮讨论收敛。
