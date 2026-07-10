# ZHPMind 设计原则

> ZHPMind 是张昊鹏的个人 Brain——一个"人生随身笔记本"，同时承载学习、思考、业务运营、人生反思。它是一个会陪伴几十年的活系统。

本文档分三层。第一层和第二层是"宗"，长期不变；第三层是"变"，随工具演化而更新。

---

# 第一层：底层逻辑（不变量）

无论工具叫什么名字,无论 AI 模型如何进化,以下 7 条逻辑不变。

## 1. 认知循环

```
感知 → 记录 → 整理 → 连接 → 理解 → 应用 → 反思 → 修正
                  ↑________________________________________↓
```

这是无限循环,每一轮让理解更深。这就是复利的真正含义——不是工具的复利,是认知的复利。

ZHPMind 的终极目的:让这个循环**转得更快、更深、更不容易断裂**。所有工具都是服务于这个循环的。任何一个环节断裂(记录了没整理、整理了没连接、理解了没应用、应用了没反思),系统就开始衰退。

## 2. 信息三态

所有流入系统的信息只有三种性质,维护方式各异:

**理解**(你对某件事的认知)——会被不断重写和深化。今天的理解被更好的理解覆盖。

**事件**(发生过的事)——不可变,只能追加。一件事发生了就是发生了,不会被"重写"。

**快照**(某时间点的状态)——会过时,被新快照替代,旧快照归档。

这三种性质决定了信息的存放和维护方式:理解 → rewrite-friendly;事件 → append-only;快照 → version + archive。

## 3. Pull + Push 双模采集

信息进入系统只有两条路:

**Pull(人主动找)**——读书、搜索、参会、提问。价值密度高,因为你有目的。瓶颈是人的时间和注意力。

**Push(系统推给你)**——邮件通知、RSS、定期爬取、webhook。价值密度低但覆盖面大。瓶颈是噪声过滤——Push 后必须有过滤层,否则 inbox 变垃圾堆。

一个完整的系统两种都要。AI 在 Push 端的价值远大于 Pull 端。

## 4. 人判断 + AI 执行

在认知循环的每一步:

| 环节 | AI 做什么 | 人做什么 |
|---|---|---|
| 感知 | 自动推送信号(Push) | 主动探索(Pull) |
| 记录 | 自动转录、格式化 | 决定记什么 |
| 整理 | 自动分类、打 tag | 决定分类标准 |
| 连接 | 自动发现关联 | 判断关联是否有意义 |
| 理解 | 生成蒸馏初稿 | 判断蒸馏是否准确 |
| 应用 | 提供 context pack | 做最终决策 |
| 反思 | 调出相关知识照亮经历 | 真正的内省 |
| 修正 | 执行修改、保持一致性 | 决定修正方向 |

原则:**AI 做宽度和速度,人做深度和判断。** 这个系统是为放大你的认知服务的,不是为替代你的判断服务的。

## 5. 三层松耦合

任何个人知识 + AI 系统都分三层:存储层(数据在哪、什么格式)、智能层(AI 怎么读写数据)、交互层(人怎么和数据互动)。

三层之间必须松耦合:任何一层换了,其他两层不报废。这是"万变不离其宗"的技术保障。

## 6. 开放格式

知识要陪你几十年。在这个时间尺度上,任何工具都可能消亡。唯一能确保数据活得比工具长的,是开放格式:Markdown(纯文本,20 年后依然可读)、Git(版本控制、可回滚、去中心化备份)、文件系统(不依赖数据库、不依赖云服务)。

任何叠加在此之上的东西(数据库索引、插件、特定 AI 格式)都是**派生层**——可以从基础数据重建。派生层消失了,数据依然完整。

## 7. 健康度 = 流动性

知识系统健不健康,看的不是页面数量,而是认知循环转不转得动:有输入吗?消化得过来吗?有连接吗?有输出吗?有修正吗?有归档吗?

**让所有内容流动起来。** 任何阻碍流动的设计都应该被放弃。

---

# 第二层:设计原则(从底层逻辑推导)

## 工作流(从认知循环推导)

认知循环的每一步对应一个工作流。

**基础工作流**:

1. **capture** —— 感知/记录。所有信息先进 inbox,不分类、不判断。
2. **distill** —— 整理/连接/理解。从 inbox 蒸馏到 wiki。AI 生成初稿,满足三条件(见 AI 心法 + 红线)。
3. **apply** —— 把理解用到行动中。调出相关 wiki + 历史经验,打成 context pack 用到 projects。
4. **harvest** —— 从行动中反哺理解。项目中的真实问题、试错结果、最终经验,回流到 wiki。
5. **mirror** —— 反思的双向映射。Book Mirror(外 → 内):读完书/文章,AI 映射到真实生活;Life Mirror(内 → 外):经历一段事件/情感,AI 调出相关知识帮看见自己。
6. **review** —— 定期回顾,驱动循环不断裂。**这是反熵动作**——见下方"review 的具体执行"。

**增强工作流**:

7. **propagation** —— 横向散播。一条新信息进来,自动更新所有相关页。**这是另一个反熵动作**——见下方"propagation 的具体执行"。
8. **output** —— 从 vault 沉淀生成成品(文章、报告、决策书)。复利的最终兑现。
9. **skillify** —— 工作流的自我迭代。skill 在系统中具有"双重存在"——见下方专节。

### propagation 的具体执行

propagation 不是被动发生的,是个**主动审查动作**。任何 distill / harvest 写入 wiki 之后必须跑一次审查:**这条新信息会波及哪些既有页面?**

执行四步:(1) 盘点现状(机械式枚举,ls 出 wiki/pages、projects、活跃 MOC 页清单);(2) 用变更影响矩阵识别影响面;(3) 实际修改(用工具改,不是描述);(4) 自检清单(漏一个不行)。

**变更影响矩阵**:

| 变更类型 | 要审的页 |
|---|---|
| 新 concept 进 wiki/pages/ | 相关 MOC 是否要加入;同主题既有页是否要合并;相关 person 页 References 是否补 |
| 既有 concept 的 Compiled Truth rewrite | 引用它的页是否需要同步更新;旧版本是否要归档 |
| project 阶段性结论 | 对应 concept/framework 页的 Compiled Truth 是否要 rewrite;相关 person 页 Timeline 是否要 append |
| journal 触发的 Life Mirror | 相关 person/concept 页 Timeline 是否要 append(advisory,人决定)|
| 新 inbox 来源(Hermes Push)| wiki/raw/ 是否要建对应原始素材页 |
| skill 反思页(type: skill)更新 | 对应执行体(`~/.hermes/skills/` 或 `.codex/skills/`)是否同步;其他 skill 反思页是否引用了它 |

**关键检查**:每次写入后,是否有一条新事实被波及但**对应页面没改**?如果有,不能算 distill/harvest 完成。

**分层触发策略**:distill 后自动 propagate;harvest 后自动 propagate;journal/Life Mirror 后 AI 给出建议清单等人审。

### review 的具体执行

review 的精神是"看自己看得清楚什么坏了"。两个层次:

**第一层 — 尺寸体检(防膨胀)**:任何 review 动作前先 `wc -l` 关键文件。这是反熵的最高优先级——超尺寸文档会让真正重要的内容看不见,补漏再多也徒劳。soft limits 见"反膨胀"段落。

**第二层 — 健康度指标**:见"监测指标"段落。

**自检偏执**:逐项过清单时"差不多了"不算通过。漏一个不行。这是 review 区别于"翻翻看"的核心——**机械式枚举 + 严格自检**。

### skillify 的具体执行

skillify 是 ZHPMind 真正"长出执行手脚"的机制。skill 在系统中**双重存在**:

- **反思层**(`wiki/pages/skill-{name}.md`,type: skill)—— 记录设计意图、实战 Pitfalls、演化简史、反思与未解决问题。**给未来的你看**。结构规范见下方"skill 写作模板"。
- **执行层**(`~/.hermes/skills/{name}/SKILL.md` 或 `.codex/skills/{name}/SKILL.md` + `references/`; `.claude/skills/` 仅作 legacy 兼容)—— 工作流、决策逻辑、判断标准、产出结构、prompt 模板、代码片段。**给当前 AI 调用**。

两层通过 skill name 关联。文档(反思)和实现(执行)分离,源于第一层「三层松耦合」:换 agent runtime(Hermes → Codex → 未来其他),执行层可以重写,反思层不动。

**skill 怎么产生**:

- **AI 自动复盘产出**(Hermes 主路径)—— `creation_nudge_interval` 触发,后台 agent 检查"刚才的对话里有没有经过试错、调整方向、或者用户期望不同做法的非平凡经验"。三种结果:更新已有 skill / 新建 skill / 无值得保留。人工只做两件事:决定是否保留 / 修订(Hermes 给出 review 结果让人裁决),以及补反思层的设计意图与演化记录。
- **人主动设计**(少数情况)—— 受外部启发(一篇文章、一个 prompt 模板)想沉淀成可复用 skill。流程:先建 `wiki/pages/skill-{name}.md` 反思页占位 → 建执行体 SKILL.md + references → 首次实战后回填 Pitfalls 和反思。

第一次落地的 skill 反思页是**骨架**,没有 Pitfalls 和演化记录——这是正常的。**Pitfalls 段会随实战补血**。骨架本身就是 Skill 系统设计第 1 条「经验沉淀」的容器。

## 内容分类(从信息三态推导)

通过 frontmatter 的 `type` 字段区分,不通过子目录:

| type | 信息性质 | 维护方式 | 页面结构 |
|---|---|---|---|
| `concept` | 理解 | rewrite-friendly | 标准结构 + 可选直觉锚点 |
| `method` | 理解 | rewrite-friendly | 同上 |
| `framework` | 理解 | rewrite-friendly | 同上 |
| `person` | 事件 + 理解 | 三段式 | Compiled Truth + Timeline + References |
| `article` | 理解(一次性蒸馏)| 基本不改 | 标准结构 |
| `book` | 理解(双栏映射)| 基本不改 | 标准结构 + Mirror 区 |
| `reflection` | 理解 + 事件 | mirror 产物,可 rewrite | 三段式 |
| `snapshot` | 快照 | 定期更新,旧版归档 | 标准结构 |
| `moc` | 索引/导航 | 自下而上生长 | 标准结构 |
| `skill` | 工作流反思 | 随实战补血 | skill 反思页结构(见下) |

**三段式结构**(对 person / reflection 强制执行):

```markdown
## Compiled Truth
(当前最佳理解,人主导编辑,rewrite-friendly)

## Timeline
- YYYY-MM-DD [来源:xxx] 事件描述

## References
- [[wiki/raw/相关原始素材]]
```

Compiled Truth 在上(理解),Timeline 在中(事件,append-only),References 在下(溯源)。

**Timeline 归档机制**:Timeline 是 append-only 但不是 unlimited-append。soft limit 30 条。超过启动"压缩 + 归档":早期条目按时间段聚合成叙述并入 Compiled Truth("早期阶段…"),原始条目搬到 `archive/timeline/{页名}-{年}.md`,当前段保留最近 ~20 条。

**不需要三段式**:`concept` / `method` / `framework` / `moc` / `skill` / `snapshot`。这些整页都是 rewrite-friendly。

`snapshot` 的特殊性:表示"某时点的整体状态",通过 frontmatter `updated` 字段 + `archive/` 历史版本承载时间维度,**不在文件正文开 Timeline 段**。

### 关于 sources 字段

`sources` 字段语义是"该页面引用的 wiki/raw/ 文件名列表"。两种合法情况:

- **从 raw 蒸馏的页面**:`sources` 列出引用的 raw 文件名,`source_count = len(sources)`。
- **对话沉淀产物**(无对应 raw 文件):`sources: []` + `source_count: 0`,来源信息以正文引言形式记录("本文档是 YYYY-MM-DD 对话推演的沉淀产物")。

后者不是"不完整的 distill",是 vault 合法形态。Lint 时需区分。

### concept / method / framework 写作模板

```markdown
---
type: concept   # 或 method / framework
title: XXX
tags: [...]
---

## 直觉锚点(可选)
(一段寓言或类比,用具体故事勾住核心感觉。soft limit 100 行。
不是 once-and-done——半年后觉得牵强的话,rewrite 它。)

## 定义
(精炼定义,1-3 句话)

## 要点
(核心结构、关键变量、判断标准)

## 应用边界
(什么场景适用、什么场景不适用、容易误用的地方)

## References
- [[来源页]]
```

**直觉锚点适用边界**:

| 概念类型 | 是否用直觉锚点 |
|---|---|
| 感觉型 / 关系型(陌生化、心流、PMF…)| 强烈推荐 |
| 方法论(method 类)| 可选——类比可能比寓言更合适 |
| 结构型(FIFO、OKR-KR、漏斗转化率…)| 不强求——强塞会污染精度 |
| person / project / snapshot | 不用 |

### skill 写作模板(D9)

`wiki/pages/skill-{name}.md` 是**反思页**(meta-level),不是工作流 spec。spec 在执行层(`~/.hermes/skills/{name}/SKILL.md` 或 `.codex/skills/{name}/SKILL.md`; `.claude/skills/` 仅作 legacy 兼容)。

```markdown
---
type: skill
title: {name}              # 不带 skill- 前缀,单纯 skill name
status: active             # active | deprecated | experimental
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [skill, ...]
sources: []                # 通常对话沉淀产物
source_count: 0
discussions: []
references:                # 指向执行体物理路径(~/.hermes/skills/ 或 .codex/skills/,跟执行体实际位置一致)
  - "~/.hermes/skills/{name}/SKILL.md"   # 或 ".codex/skills/{name}/SKILL.md"
  - "~/.hermes/skills/{name}/references/"
---

# {name} — Skill 反思页

> 一段引言(这是什么 skill / 落地了 design-principles 哪条原则 / 来源)

## 设计意图
(这个 skill 解决什么问题、为什么需要它)

## 实战 Pitfalls
(每条 Pitfall = 一次踩坑记录,比方法论更有价值。表格形式:Pitfall / 性质 / 应对。
首版骨架可以留空,写"待首次实战后回填"。Hermes skill_manage 会自动累积;
人工设计的 skill 由人在每次跑完后手工补。)

## 演化简史
(vN 时间 关键改动)

## 当前状态
(执行体实际文件结构、版本,跟反思页声明的差异说明)

## 反思与未解决问题
(用得怎样、有什么待解决的、有什么洞察。这是反思页区别于 spec 的核心)

## References
- 执行体:`~/.hermes/skills/{name}/SKILL.md` 或 `.codex/skills/{name}/SKILL.md`(按实际位置; `.claude/skills/` 仅作 legacy 兼容)
- references:`~/.hermes/skills/{name}/references/`(同上路径前缀)
- 备份链:`~/.hermes/skills/{name}.md.v[1-N].bak`(如有)
- design-principles 对应小节
```

**反思页不写工作流步骤**——那是 SKILL.md 的事。反思页只关心"为什么、怎么演化、踩过什么坑、还有什么没解决"。

## 业务实体命名约定

业务实体在 vault 内的 token,**跟其对外标识符(域名、品牌名、官方英文名)保持一致**。这确保 vault 跟外部世界(邮件、ERP、合作伙伴沟通、合同)共享同一套命名空间,认知不打折。

**判断流程**:(1) 该实体有官方英文标识吗?有 → 主文件名用对外英文标识,小写连字符;没有 → 走 (2)。(2) 纯本地、纯中文实体?→ 主文件名直接用中文。

**别名机制**:中文常用名、拼音、过渡时期的别名,通过 frontmatter `aliases` 字段挂在主 token 上。Obsidian 会让 `[[别名]]` 自动跳到主页。三种用法:(1) 业务实体页挂载中文别名/拼音;(2) 实体页挂载常用别名;(3) 文件改名时挂载旧文件名,作为 wikilink 修复期间的兼容兜底——不断链。

**Tag 跟随主 token**:主 token 英文 → tag 也英文(`#wildlume`);主 token 中文 → tag 也中文(`#王经理`)。不用斜杠分隔(`#wildlume` ✅ / `#业务/wildlume` ❌),不在同一实体中英 tag 混用。

| 实体 | 对外标识 | 主文件名 | aliases | tag |
|---|---|---|---|---|
| 自有公司 | wildlume | `wildlume-business-reference.md` | `[yaoye, 曜野, 曜野业务]` | `wildlume` |
| 海外供应商 | acme-corp | `acme-corp.md` | `[艾克米]` | `acme-corp` |
| 本地货代 | 无英文 | `王经理.md` | 无 | `王经理` |

## 信号采集设计(从 Pull + Push 推导)

**Pull**(人手动):读书、搜文章、参会、日记、灵感 → 人丢进 inbox。**Push**(系统自动):政策监控、邮件分拣、选品数据、竞品动态、社交信号 → 系统写入 inbox,经过滤层。两者统一入口都是 **inbox/**。

## AI 心法 + 红线(从人判断 AI 执行推导)

### 心法(事中约束)

AI 在所有写入动作中默认遵循三条心法。这三条不是禁止条款,是**写入时的优先级**:

1. **减优于加** —— 能删的先删,不能删的迁去合适位置,最后剩下才是该加的。每次写入完毕问一句:这条加的是必要的,还是"上次会话告诉下次会话发生了什么"的便条?后者就是病。
2. **合并优于追加** —— 新信息是对旧信息的更新时,改旧条目,不要新增。新加前先 grep 同关键字,看现有条目能不能并。
3. **删除优于保留** —— 已完成的临时计划、被推翻的决策、被新版本取代的事实、单次事故的流水账——删,不要保留"以防万一"。

**关键检查不能省**——每个 skill 里的自检步骤、检验问题、影响面审查,"差不多就行"是失效的开始。对人和 AI 同样适用。

### 红线(事后约束)

AI 可以直接写 wiki/pages/,但每次写入必须同时满足三条硬约束:(1) **溯源**——标明来自哪个 raw、哪次 distill、哪个模型、什么时间;(2) **互评**——通过 cross-modal eval(至少两个模型);(3) **可回滚**——vault git 化,每次 AI 写入对应一个 commit。不要"事前人审"。信任靠可验证、可回滚、可追溯建立。

### 其他

**AI 不自动修改 projects/** —— 保护思考节奏。主动调用时可辅助,可读 projects/。

**不设 AI 禁入区。** 情感内容是 mirror 工作流的核心载体。隐私通过"源头不记敏感数据"控制:证件号、银行卡号、密码、API key 不写进 vault。

## Skill 系统设计(从工具实践沉淀)

skill 是 design-principles 的物理载体——它把工作流编码为可执行单元。基于 Hermes 实战观察的 5 条原则:

1. **经验沉淀**:每个 agent-created skill 在 SKILL.md 内设置 Pitfalls 小节,记录工具/环境/平台/业务约束。每条 Pitfall 含「为什么会出错」+「对应做法」。skill_manage 在主对话期间通过 `creation_nudge_interval` 触发的后台 review 自动维护,是 skill 真正变"聪明"的机制。
2. **方法论与实现分离**:SKILL.md 讲方法论(决策逻辑、判断标准、产出结构),具体代码、命名约定、查询模板放 `references/{name}.md`。SKILL.md 引用 references 用相对路径,保持短而可读。
3. **来源分层**:`~/.hermes/skills/` 下两类共存——bundled(Hermes 官方预装,登记在 `.bundled_manifest`,跟着 Hermes 升级)和 agent-created(用户/主对话生成,不登记 manifest,由 Curator 处理 deduplication)。「溯源」原则下 bundled 溯源到上游 repo,agent-created 溯源到本机 `.bak` 链 + vault git。
4. **协议互通**:Hermes 与 Codex 的目录 skill 格式都采用 `{skill}/SKILL.md` + `references/` 的可迁移结构；旧 `.claude/skills/` 保留作历史兼容。第一层「三层松耦合」中"智能层换了其他两层不报废"的原则,在 skill 粒度上得到物理保障——换 agent runtime,skill 的反思层不重写,执行层可低成本迁移。
5. **维护机制分工**:skill_manage(主对话内、高频、跟着任务走、自动备份 `.bak`)做单 skill 的迭代;Curator(后台 batch、低频、合并/聚类/去重)做 skill 池子的整理。**不要把 Curator 当作 skill 演化的主驱动力**——它处理的是"杂乱",不是"进化"。

## 受众分层

ZHPMind 的内容服务于三层受众。**职责不重叠,写入时要分清"这条给谁看"**:

| 位置 | 受众 | 职责 | 不同步的代价 |
|---|---|---|---|
| `design-principles.md` + `AGENTS.md` + `wiki/CLAUDE.md` + `~/.hermes/skills/{name}/SKILL.md` + `.codex/skills/{name}/SKILL.md` | **当前 AI**(Codex、Claudian UI、Hermes 操作时读的规则手册)| 不变量、设计原则、AI 心法 + 红线、工具映射、skill 执行 spec | AI 走弯路、违反原则 |
| `wiki/pages/` 主体(含 skill 反思页 `skill-{name}.md`)| **未来的你**(半年/几年后的自己)| 沉淀的理解、可复用概念、长期价值的连接、skill 设计意图与演化记录 | 当年想清楚的事日后想不起来 |
| `projects/` + `outputs/` | **当前的你 + 协作者** | 活的工作、对外的成品 | 项目进展丢失、对外成品不一致 |

**写入时的判断**:这条信息**主要**给哪一层看?给当前 AI 的规则 → design-principles / CLAUDE.md / SKILL.md;给未来的你的理解 → wiki/pages/(含 skill 反思页);给当前项目的进展 → projects/。

**skill 反思页的归属**:文件位置在 `wiki/pages/skill-{name}.md`,主受众是未来的你(复盘 skill 演化、设计意图、踩坑历史)。AI 在 skillify 时**会参考**反思页,但参考不等于主受众。**反思层 vs 执行层** 物理分离也对应着 **未来的你 vs 当前 AI** 受众分离。

**不能混**:design-principles 里不抄 wiki 的具体内容;wiki/pages 里不写"我提醒下次会话…"(这是给 AI 的便条,不是给未来你的理解);projects 里的临时结论要 harvest 进 wiki,不留在 projects。

## 反膨胀

文档会病变。**最常见的病变模式**:每次写完都在文件顶部加一段历史叙事——"X 时刻起 Y 上线,详见 docs/Z.md"。一次很爽,半年后顶部就是 200 行 blockquote 把真正的内容推到看不见。

这条警告对 ZHPMind 多个文档都成立:design-principles.md(是宪法不是变更日志,叙事归 Changelog);wiki/CLAUDE.md(是操作手册不是变更日志);wiki/pages/ 单页(Compiled Truth 是当前理解不是历史);三段式 Timeline(append-only 但不是 unlimited-append);MOC 页(是导航不是清单堆栈)。

### soft limits

| 对象 | soft limit | 超过怎么办 |
|---|---|---|
| `design-principles.md` | 600 行 | 自审"加的是宪法还是叙事";叙事迁 Changelog;非不变量的内容迁 wiki/pages/ |
| `wiki/CLAUDE.md` | 900 行 | 同上原则;含 spec 表、Lint 清单,limit 较宽。注:v2.5 起草时 800 估值偏紧,落地实测 872 行后调到 900 |
| `wiki/pages/` 单文件 | 500 行 | 多半塞了多件事,拆主题、抽出子页 |
| 三段式 Timeline 段 | 30 条 | 早期条目压缩并入 Compiled Truth,原始条目归档 `archive/timeline/` |
| MOC 页 | 200 行 | 分级(建次级 MOC)或拆主题 |
| inbox 单条 | 100 行 | 这不是 capture 是初稿,应该走 distill |
| `~/.hermes/skills/{name}/SKILL.md` | 150 行 | 拆 skill 或迁部分逻辑到 `references/`;复杂 skill 可略超 |

**超尺寸优先级 > 补本次漏掉的同步**——膨胀让重要内容被挤出视线,补再多漏也徒劳。

### 宪法自审

design-principles.md 本身要被同样的标准审视:

- weekly review-digest 报告 design-principles.md 和 wiki/CLAUDE.md 净增长。单次修订净涨幅 > 30 行 → 红灯,回头审"加的是宪法还是叙事"
- 每次修订时强制自检:"这条加的是不变量、原则、还是变更记录?"前两者留正文,后者归 Changelog
- 每年 review 时整体扫一遍:"哪些原则一年没被触发过、是不是该删/合并"

宪法的可信度靠它自己接受同样的标准来维持。

## 技术架构约束(从三层松耦合推导)

存储层:markdown + git,不依赖任何特定工具的私有格式。智能层:skills 是模型无关的(描述工作流逻辑,不绑定特定 LLM)。交互层:浏览界面可替换,底层数据不依赖交互层的特有功能。

## 文件格式(从开放格式推导)

核心数据 = markdown + git(生存条件)。派生层(数据库索引、插件配置)可从 markdown 重建,消失不影响核心。`[[wikilink]]` 语法:微弱锁定但广泛兼容,可接受。

## 监测指标(从健康度推导)

### A 组 — 整体指标

| 指标 | 警戒信号 | 含义 |
|---|---|---|
| inbox 积压 | >50 条未处理 | 消化跟不上输入 |
| wiki 孤岛率 | 无 backlink 页面 >30% | 蒸馏后没连接 |
| projects 僵尸率 | >3 月未动项目 >50% | 启动太多没收尾 |
| outputs 缺失 | wiki 写一年无产出 | 复利没兑现 |
| 修正频率 | 半年无 wiki 页被重写 | 认知僵化 |

### B 组 — 内部膨胀指标

| 指标 | 警戒信号 | 含义 |
|---|---|---|
| design-principles 净增长 | 单次修订 >30 行 | 可能塞了历史叙事 |
| wiki/CLAUDE.md 净增长 | 单次修订 >30 行 | 同上 |
| wiki 单页超 500 行 | 列出所有超限页 | 应拆分 |
| Timeline 段超 30 条 | 列出所有超限三段式页 | 应归档压缩 |
| MOC 页超 200 行 | 列出所有超限 MOC | 应分级 |
| inbox 单条超 100 行 | 列出所有超限条目 | 应走 distill |

两组指标都由 weekly review-digest 跑出。

---

# 第三层:当前工具映射(这一层是"变"的)

## 物理结构

```
ZHPMind/
├── inbox/           ← Pull + Push 的统一入口(含 Obsidian Clipper 剪藏)
├── wiki/
│   ├── CLAUDE.md    ← wiki 操作手册(历史文件名，智能层规则)
│   ├── pages/       ← 所有 wiki 页面(平铺,tag + MOC 导航,frontmatter type 区分)
│   ├── raw/         ← 已被 wiki 引用的原始素材(永久保留)
│   └── log.md       ← Append-only 操作日志
├── projects/        ← 活的工作(每个项目一个子文件夹)
├── outputs/         ← 完成产出(报告、文章、对外文档)
└── archive/         ← 按原结构镜像归档(含 archive/timeline/)
```

`claude-drafts/` 是历史命名的 AI handoff 通道,跟踪 `handoff-*.md` 与 `result-*.md`,不算正式知识结构；它不再表示 active Claude 依赖。

**inbox 和 raw 的区别是生命周期**:inbox 是"未来的可能性"(会被清空);raw 是"过去的记忆"(作为引用源永久保留)。

## 导航

- **tag** —— 全小写、纯英文、连字符(如 `#wildlume` `#ecommerce`),中文实体用中文 tag;不用斜杠分隔
- **MOC(Maps of Content)** —— 自下而上生长:某 tag 下 ≥5 页时建 `{topic}-moc.md`(小写+连字符+后缀)
- **backlink** —— 自然连接,流动的最小单位

## 底层逻辑 → 工具来源映射

| 底层逻辑 | 从 Karpathy 取 | 从 Garry Tan 取 | 从 neat-freak 取 | 我们的原创 |
|---|---|---|---|---|
| 认知循环 | Obsidian + LLM 蒸馏 | skill 系统 + skillify | — | Life Mirror(双向)|
| 信息三态 | wiki rewrite 哲学 | compiled truth + timeline | — | 三态显式分类 |
| Pull + Push | Pull 人手动喂 | Push signal-detector | — | — |
| 人判断 AI 执行 | LLM 写人审 | 三硬约束 | 编辑非记录员、三心法、检查不省 | 不设 AI 禁入区 |
| 三层松耦合 | Obsidian + LLM + md | GBrain + skills + git | 三层受众显式分离 | 显式三层命名 |
| 开放格式 | md + git | md + git | — | — |
| 健康度 | (无显式监测)| maintain + doctor + skillpack-check | 尺寸体检 + 自检偏执 + 变更影响矩阵 | "流动"作为第一性原则 |

## 当前三层的具体工具

**存储层 = markdown + git(ZHPMind vault)**:source of truth;git 化保护 AI 写入;开放格式保证长期存活。

**智能层 = Claudian UI(Codex provider) + Codex + Hermes**

Claudian UI(Obsidian 内,使用 Codex provider)负责 vault 内深加工:distill / mirror / propagation / reflect。

Codex(mini / desktop,原生 shell/git/python/文件)是默认执行者:脚本、git、批量/结构性/大文件改动、落地已定方案,优先一处闭环(设计→执行→自检)。

Claude provider / chat-Claude 已退出现役；仅在历史来源、旧 handoff、旧文章标题中保留语义引用。

Hermes(mini,gateway + cron)负责 vault 外信号采集和定时自动化:Push 信号采集 → inbox/、review-digest、健康度监测、cron 自动化、skillify 执行层,只写 inbox。

两类接口分工:Hermes ↔ vault 深加工层走 **inbox/**;Codex ↔ Obsidian 侧工作走 **handoff 文件**。操作细节见根 `AGENTS.md` 与 `CLAUDE.md`「智能层分工与 handoff 约定」,宪法不重复。

**Cross-modal eval 技术实现**:Hermes 支持多 provider / profile,用至少两个可用模型家系做独立评审。当前有效下限是 OpenAI/GPT + DeepSeek；Claude / Anthropic 槽位仅作历史或可选补充,不能作为 gate 的必要依赖。结果不一致进入人工裁决。这就是 AI 红线"互评"在工具层的落地路径。

**交互层 = Obsidian**:浏览/编辑、移动端捕捉、graph view / backlink 导航。Obsidian 可替换——切换只需指向同一个 ZHPMind 目录。

## Hermes skills 规划

| skill 名 | 信号源/触发 | 频率 | 产出位置 | 状态 |
|---|---|---|---|---|
| review-digest | vault 自身 | weekly | inbox/ | **v2(含 B 组内部膨胀)** |
| policy-monitor | 海关/税务/平台公告 | daily | inbox/ | 规划中 |
| product-trend-watch | 电商平台/Google Trends | weekly | inbox/ | 规划中 |
| email-triage | 邮箱 | hourly | inbox/ | 规划中 |
| competitor-watch | 竞品 listing | daily | inbox/ | 规划中 |
| vault-tidy | 手动触发 | on-demand | vault 内变更 | **规划中(v2.5 落地后启动)** |

## Codex vault skills(`.codex/skills/`)

按协议互通原则,Codex vault skill 用目录式结构,与 Hermes skill 的物理组织保持接近；`.claude/skills/` 仅保留为 legacy 兼容副本:

```
.codex/skills/
├── {name}/
│   ├── SKILL.md
│   └── references/
│       └── *.md
```

| skill 名 | 职责 | 状态 |
|---|---|---|
| book-mirror | 按章生成 Book Mirror 双栏草稿并按 B 结构组装 | active |
| concept-fable | 给 concept/method/framework 页生成或审查直觉锚点 | active |

## 节奏

| 频率 | 内容 |
|---|---|
| daily | capture 到 inbox(手机端为主);Hermes Push 采集运行 |
| weekly | 清空 inbox + 蒸馏 + propagation 审查 + review digest(A+B 组)+ 15 分钟回顾 |
| monthly | deep review + 健康度检查 + 补 MOC + 30–60 分钟回顾 |
| annual | archive 归档 + 年度反思 + 重写过时 wiki + 整体宪法自审 + 2 小时回顾 |

---

# 这份文档本身的角色

**第一层和第二层** = "宗"。长期不变。除非对"人 + AI + 知识管理"的根本理解变了。

**第三层** = "变"。随工具演化更新。

**使用场景**:未来开新对话时粘进去;Hermes/Codex 接入时作 skill 设计依据;年度 review 回头看"是不是还认这个原则"。

宪法可以修订,修订记录在 Changelog 里。**修订本身要遵循反膨胀**——见上方"宪法自审"。

---

# Changelog

**2026-07-10 v2.6** —— 主运行时切到 Codex，Claude provider 退出 active lane：
- 第三层工具映射改为 Claudian UI(Codex provider) + Codex + Hermes；Claude provider / chat-Claude 仅保留历史语义引用
- skill 执行层主路径改为 `.codex/skills/`，`.claude/skills/` 仅作 legacy 兼容
- 受众分层加入 `AGENTS.md`，并把 cross-modal eval 的 active gate 改为 OpenAI/GPT + DeepSeek 等可用模型家系
- `claude-drafts/` 明确为历史命名的 AI handoff 通道，不再表示 active Claude 依赖

**2026-05-23 v2.5** —— 整合 neat-freak(KKKKhazix/khazix-skills)反熵心法 + 寓言故事 prompt(Amanda Askell 原版 + 公众号优化版)直觉锚点,并完成 D9(skill 反思页结构规范)。基于 v2.4-X(cbdb7b0)增量叠加:
- 第二层新增「AI 心法」三条(减/合并/删 + 检查不省),章节改名「AI 心法 + 红线」;保留 X 的三条事后红线
- 第二层新增「受众分层」:规则文件(design-principles + wiki/CLAUDE.md + SKILL.md)归"当前 AI";wiki/pages 主体(含 skill 反思页 `skill-{name}.md`)归"未来的你";projects + outputs 归"当前的你 + 协作者"。明确反思层 vs 执行层物理分离对应"未来你 vs 当前 AI"受众分离
- 第二层新增「反膨胀」(CLAUDE.md 病警告 + soft limits 表 + 宪法自审机制),soft limits 表包含 wiki/CLAUDE.md
- 工作流扩充:propagation 增加变更影响矩阵 + 四步骤(融入 X 的分层策略);review 增加尺寸体检 + 自检偏执;skillify 融合 X 的「Hermes 自动复盘」机制与 Y 的「双重存在」原则
- 内容分类新增 concept/method/framework 写作模板(含可选直觉锚点段落)和 **skill 反思页结构(D9)**(向 vault 现有 skill-review-digest.md 范本对齐;references 字段支持 ~/.hermes/skills/ 或 .claude/skills/ 两种执行体路径);Timeline 段加归档机制
- 监测指标扩充:A 组保留 + B 组内部膨胀(含 CLAUDE.md 净增长)
- 第三层新增 Claudian skills 段(目录式结构,与 Hermes/Anthropic 协议互通);Hermes skills 表 review-digest 升级 v2、新增 vault-tidy 规划
- 第三层 tag 例子按 v2.3/v2.4-X 规则修正为 `#wildlume`(非 `#业务/wildlume`,修复 v2.4-X 自相矛盾)
- 物理结构图补全 wiki/CLAUDE.md 和 wiki/log.md
- 工具来源映射表新增 neat-freak 列
- 配套修订:wiki/CLAUDE.md → v3(同步 AI 心法 / 受众契约 / Lint 内部膨胀检查项 / §3.6 MOC 命名 / §3.8 references 路径备选)
- **落地实测后微调(2026-05-23 Phase 2.3)**:wiki/CLAUDE.md 实测 872 行(v2.4-X 704 + v2.5 净增 168),超 800 soft limit。原因复盘:v2.5 起草时 800 估值未足够预留 D9 + AI 心法 + 直觉锚点 + propagation 重写等新章节空间。反膨胀表 wiki/CLAUDE.md soft limit 由 800 调到 900(97% 利用率,留 ~28 行余量)。这是修复起草时的估值疏漏,不是常态抬规则——下次扩展 CLAUDE.md 必须配套瘦身计划,不能再撞墙抬 limit。

**2026-05-22 v2.4-X** —— Phase D 完成后规则层下游影响审计修订(cbdb7b0):snapshot 不走三段式;对话沉淀产物 sources:[] 合法化;wiki/CLAUDE.md §4 Index 补 MOCs/Skills 分区;aliases 字段迁移兼容用法显式化;§12 Lint 补 tags/命名约定检查项;第三层 wiki/pages 描述扩展为"所有 wiki 页面"。Phase D(D1-D5 + infra,5/21-22)迁移任务全部完成。详见 commit cbdb7b0 message。

**2026-05-21 v2.3** —— 命名规范补缺:type 表扩展 `moc` + `skill`;新增「业务实体命名约定」整章节(vault 内 token 跟对外标识符一致)。

**2026-05-20 v2.2** —— Hermes 实战观察校准:新增「Skill 系统设计」整章节(5 条原则);修正认知(skill_manage 才是演化主驱动,Curator 是 batch 整理)。

**2026-05-20 v2.1** —— LufzzLiz 实测文章对照修订:skillify 从「设计 gap」改为「已落地」;Cross-modal eval 明确技术路径(Hermes 多 profile)。

**2026-05-11 v2** —— 从第一性原理重写:三层架构;7 条底层逻辑;曜野业务 Push 采集规划;skillify、propagation、output。Karpathy 和 Garry Tan 降级为第三层参考。

**2026-05-11 v1** —— 初版。
