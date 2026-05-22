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
9. **skillify** —— skill 执行文件由 Hermes 在后台**自动复盘并生成**（`creation_nudge_interval` 触发，每若干轮工具循环后台 agent 检查"刚才的对话里有没有经过试错、调整方向、或者用户期望不同做法的非平凡经验"，三种结果：更新已有 skill / 新建 skill / 无值得保留）。人工只做两件事：决定是否保留 / 修订（Hermes 会给出 review 结果让人裁决），把 skill 的设计意图、应用场景、迭代记录补到 `wiki/pages/skill-xxx.md`。两层通过 skill name 关联——智能层（`~/.hermes/skills/`）放执行，存储层（`wiki/pages/`）放理解。

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
| `moc` | 索引/导航 | 自下而上生长，随主题页累积更新。当某 tag 累积 ≥5 页时建立 |
| `skill` | 工作流定义 | 记录 skill 的设计意图、版本、迭代历史（执行体在 `~/.hermes/skills/` 或 `.claude/skills/`）|

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

**不需要三段式的类型:** `concept` / `method` / `framework` / `moc` / `skill` / `snapshot`。这些页面整页都是 rewrite-friendly。

其中 `snapshot` 的特殊性在于:它表示"某时点的整体状态",通过 frontmatter `updated` 字段标记最新版本时间,通过 `archive/` 目录承载历史版本——**不需要在文件正文内开 Timeline 段**。Timeline 适合事件流(append-only),不适合快照式整页重写。

**关于 sources 字段:**

`sources` 字段的语义是"该页面引用的 wiki/raw/ 文件名列表"。两种合法情况:

- **从 raw 蒸馏的页面:** `sources` 列出所有引用的 raw 文件名,`source_count = len(sources)`
- **对话沉淀产物(没有对应 raw 文件):** `sources: []` + `source_count: 0`,来源信息以正文引言形式记录(如"本文档是 YYYY-MM-DD 对话推演的沉淀产物"),不进 `sources` frontmatter

后者不是"不完整的 distill",而是 vault 内容的合法形态。Lint 检查时需要区分这两种情况。

## 业务实体命名约定

业务实体在 vault 内的 token，**跟其对外标识符（域名、品牌名、官方英文名）保持一致**。这确保 vault 跟外部世界（邮件、ERP、合作伙伴沟通、合同）共享同一套命名空间，认知不打折。

**判断流程：**

1. **该实体有官方英文标识吗？**（自有公司、有英文官网/品牌的供应商或合作伙伴、平台、产品）
   - 有 → 主文件名用对外英文标识，小写连字符
   - 没有 → 走第 2 步

2. **纯本地、纯中文实体？**（本地供应商、华人合作伙伴的中文名、中国本地平台等）
   - 主文件名直接用中文

**别名机制：**

中文常用名、拼音、过渡时期的别名，通过 frontmatter `aliases` 字段挂在主 token 上。Obsidian 会让 `[[别名]]` 自动跳到主页。这一机制同样适用于文件改名后的旧名兼容——把旧文件名加入 aliases,所有指向旧名的 wikilink 经别名解析继续生效,不断链。

**Tag 跟随主 token：**

- 主 token 是英文 → tag 也用英文小写连字符（如 `wildlume`）
- 主 token 是中文 → tag 也用中文（如 `王经理`）
- 不用斜杠分隔（`#wildlume` ✅ / `#业务/wildlume` ❌）
- 不在同一个实体上中英 tag 混用

**举例：**

| 实体 | 对外标识 | 主文件名 | aliases | tag |
|---|---|---|---|---|
| 自有公司 | wildlume（域名/商标）| `wildlume-business-reference.md` | `[yaoye, 曜野, 曜野业务]` | `wildlume` |
| 某海外供应商 | acme-corp（官网）| `acme-corp.md` | `[艾克米]`（如有中文俗称）| `acme-corp` |
| 本地货代王经理 | 无英文 | `王经理.md` | 无 | `王经理` |
| 亚马逊平台 | amazon | `amazon-moc.md` 等 | 无 | `amazon` |

**对已有页面的影响：**

本次 v2.3 仅修订规则。基于本规则，以下文件存在偏离，**但本次不处理**，作为 v2.3 完成后的迁移任务列入待办：
- 4 个 `yaoye-*` 页面应迁移到 `wildlume-*`（主名 + alias 保留 yaoye）
- 根目录 `wildlume-business-reference.md` 与 wiki/pages 版本的双份并存需要合并（具体策略下一步定）
- 含中文 tag（`业务/曜野`、`反哺机制` 等）和含斜杠 tag（`业务/曜野`、`system/skill`、`tool/hermes`）的页面需要 tag 规范化

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

## Skill 系统设计（从工具实践沉淀）

skill 是 design-principles 的物理载体——它把工作流编码为可执行单元。基于 Hermes 实战观察，skill 系统应遵循以下原则：

1. **经验沉淀**：每个 agent-created skill 在 SKILL.md 内设置专门的 Pitfalls 小节，记录每次跑 skill 时遇到的工具/环境/平台/业务约束。每条 Pitfall 必须包含「为什么会出错」和「对应做法」。这是 skill_manage 在主对话期间通过 `creation_nudge_interval` 触发的后台 review 自动维护的，是 skill 真正变"聪明"的机制。

2. **方法论与实现分离**：SKILL.md 讲方法论（决策逻辑、判断标准、产出结构），具体代码片段、命名约定、查询模板放 `references/{name}.md`。SKILL.md 引用 references 用相对路径。这让 SKILL.md 保持短而可读，让具体实现可独立更新。

3. **来源分层**：`~/.hermes/skills/` 下两类共存——bundled（Hermes 官方预装，登记在 `.bundled_manifest`，跟着 Hermes 升级走）和 agent-created（用户/主对话生成，不登记到 manifest，由 Curator 处理 deduplication）。两类在「溯源」原则下含义不同：bundled 溯源到上游 repo，agent-created 溯源到本机 `.bak` 链 + vault git。

4. **协议互通**：Hermes 的目录 skill 格式（`{skill}/SKILL.md` + `references/`）与 Anthropic Claude Code / Claude.ai 的 skill 协议一致。这意味着第一层「三层松耦合」中"智能层换了其他两层不报废"的原则，在 skill 粒度上得到了**协议级保障**——换 agent runtime，skill 不用重写。

5. **维护机制分工**：skill_manage（主对话内、高频、跟着任务走、自动备份 `.bak`）做单 skill 的迭代；Curator（后台 batch、低频、合并/聚类/去重）做 skill 池子的整理。**不要把 Curator 当作 skill 演化的主驱动力**——它处理的是"杂乱"，不是"进化"。

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
│   ├── pages/       ← 所有 wiki 页面（平铺，tag + MOC 导航，frontmatter type 区分）
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

**Cross-modal eval 的技术实现**：Hermes 支持多 profile（同一台机器上跑多个独立 agent 实例，各自的模型、记忆、skill 完全隔离）。蒸馏类任务用主 profile + worker profile 双跑——主 profile 跑 Claude 做 distill，worker profile 跑不同家系的模型（如 qwen）做 eval。两个模型对同一份输入独立产出，结果不一致时进入人工裁决。这就是 AI 红线"互评"约束在工具层的落地路径。

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

**2026-05-22 v2.4** —— Phase D 完成后的规则层下游影响审计修订:

- **snapshot 结构要求显式化**:`snapshot` 类型不走三段式(跟 `concept` / `framework` / `moc` / `skill` 同列为"整页 rewrite-friendly")。时间维度由 frontmatter `updated` + `archive/` 历史版本承载,不在文件正文开 Timeline 段。修复 v2.3 type 表扩展时遗漏的 snapshot 结构语义。同步修订 wiki/CLAUDE.md §3.1 表、§3.4 三段式说明、§12 Lint "三段式合规"检查项(移除 `type: snapshot`)。
- **对话沉淀产物 sources: [] 合法化**:对话推演产生的 wiki 页面没有对应 raw 文件,`sources: []` + `source_count: 0` 是合法状态,不算"不完整的 distill"。新增"关于 sources 字段"说明小段,同步修订 wiki/CLAUDE.md §3.2 frontmatter 注释和 §12 Lint 检查规则。
- **wiki/CLAUDE.md §4 Index 分区补全**:补 MOCs / Skills 两个分区(v2.3 type 表扩展时遗漏的下游 propagation)。配合 D5 (commit b6ab657) 已经在 index.md 实际加的 Skills 分区。
- **aliases 字段"迁移兼容"用法显式化**:Phase D 实战中大量使用 aliases 挂载旧文件名(D2/D4),作为 wikilink 修复期间的兜底。本次显式认可此用法。
- **wiki/CLAUDE.md §12 Lint 补充检查项**:tags 合规(全小写、纯英文、连字符)、业务实体命名约定合规。
- **第三层物理结构描述微调**:`wiki/pages` 不只是"概念/方法/人物/反思",而是所有 wiki 页面(通过 frontmatter type 区分)。

**Phase D(2026-05-21~22)迁移任务完成确认:**
v2.3 Changelog 列出的"不在本次范围内的迁移任务"全部在 Phase D 完成:
- 4 个 `yaoye-*` 页面 → `wildlume-*`(D3 commit 66a09ab)
- 根目录 `wildlume-business-reference.md` 与 wiki/pages 版本合并 A 版本迁入 wiki/pages(D2 commit 30703fe)
- 全 vault tag 规范化(D4 commit 8a7e59b)
- `skill-review-digest.md` type: skill 合规(D5 commit b6ab657 入 index)
- 业务实体命名约定全 vault 落地(全 Phase D)

**协作工作流元洞察:**
Phase D 中段切换到"Filesystem MCP 直读 vault 内 .tmp-claude-reports/"传输通道后,主对话和 Claude Code 协作效率显著提升。Claude Code 节奏三原则:diff 先行、模糊处停下、核对计划假设。此模式适用于未来所有"长流程多 commit"工作。

**2026-05-21 v2.3** —— 命名规范补缺，基于 vault 现状审计：

- **type 表扩展**：新增 `moc` 和 `skill` 两个值，修补内部矛盾（已定义系统但 type 表未覆盖）
- **同步更新三段式豁免列表**：`moc` 和 `skill` 加入无需三段式的页面类型
- **新增“业务实体命名约定”章节**：确立“vault 内 token 跟对外标识符一致”原则。理由：自有公司 wildlume 是注册商标，yaoye 拼音未注册，vault 内若用 yaoye 会跟邮件/ERP/合作沟通脱节
- **不在本次范围内的迁移任务**（列入待办，后续单独处理）：
  - 4 个 `yaoye-*` 页面 → `wildlume-*`
  - 根目录 `wildlume-business-reference.md` 与 wiki 版本合并
  - 全 vault tag 规范化（去中文 tag、去斜杠 tag）
  - 3 个 MOC 文件补 `type: moc`
  - `skill-review-digest.md` 的 `type: skill` 现在合规，无需改动

**2026-05-20 v2.2** —— 基于第一次 Hermes 端到端实战的观察校准：
- **新增第二层「Skill 系统设计」小节**（5 条原则）：经验沉淀（Pitfalls）、方法论与实现分离（SKILL.md + references/）、来源分层（bundled vs agent-created）、协议互通（Anthropic skill 格式）、维护机制分工（skill_manage vs Curator）。
- **修正认知**：skill_manage 才是 skill 演化的主驱动（主对话期间、高频），Curator 是后台合并整理（低频，5/12 至今仅 1 次）。之前对 Curator 的角色描述过高估了。
- **不变**：第一层 7 条底层逻辑、第二层其他设计原则、v2.1 的修订内容全部保留。

**2026-05-20 v2.1** —— 基于 LufzzLiz《上手 Hermes Agent 后建议先尝试的十件事情》的实测文章对照修订：
- **skillify 从"设计 gap"改为"已落地"**。Hermes 原生支持后台 skill 自动复盘（`creation_nudge_interval` 触发，默认 15 轮），自动判断"有没有值得固化的经验"并写入 `~/.hermes/skills/`。人工层面只剩"在 wiki/pages/ 写设计意图 + 决定是否保留"。
- **Cross-modal eval 明确技术路径**：用 Hermes 多 profile 机制（主 profile 跑 Claude + worker profile 跑 qwen 等不同家系模型）。"互评"从原则变为可执行配置。
- **不变**：第一层 7 条底层逻辑、第二层设计原则全部保留。第三层只是补技术注解。

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
