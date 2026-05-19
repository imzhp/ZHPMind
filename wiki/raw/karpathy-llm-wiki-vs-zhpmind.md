# Karpathy LLM Wiki + Thariq HTML Artifacts：对 ZHPMind 的启示

> 基于 Karpathy 2026-04-03 LLM Wiki Gist + Thariq 2026-05-08 "HTML is the new markdown" + Karpathy 05-11 follow-up
> 日期：2026-05-12

---

## 真正的论点：不是格式之争，是输出通道之争

Thariq（Anthropic 的 Claude Code 工程师）5 月 8 日写了一篇 "HTML is the new markdown"，Karpathy 在 5 月 11 日引用它时说了一段关键的话：

> audio is the human-preferred input to AIs but vision (images/animations/video) is the preferred output from them. Around a ~third of our brains are a massively parallel processor dedicated to vision, it is the 10-lane superhighway of information into brain.

结合 @omarsar0 的实践总结：

> LLM Wikis captures all the important information that lets you and your agents do meaningful work. HTML artifacts present that information in interesting ways that allow you to take important actions along with your agents. My HTML artifacts sit on top of my LLM wikis.

他的具体做法：HTML artifacts 和 agent 双向通信——人在可视化界面上触发行动，agent 执行后更新 artifact。他用这套组合做到了 inbox zero、深度研究、实验设计、趋势追踪。

**完整的论点是三句话：**

1. **Markdown 是给 AI 和存储用的**——持久、可 git、可 AI 读写、几十年不过时
2. **HTML 是给人用的**——视觉化、可交互、可动态生成、利用人脑 1/3 的视觉处理带宽
3. **两者是分层关系，不是替代关系**——wiki（markdown）是积累层，artifacts（HTML）是呈现层，artifacts 从 wiki 动态生成

---

## 这击中了 ZHPMind 的什么

回头看 design-principles，ZHPMind 的三层松耦合是：

- **存储层** = markdown + git ✅ 
- **智能层** = Claudian + Hermes ✅
- **交互层** = Obsidian ← **这里有问题**

当前交互层的定义：

> - 你浏览/编辑 wiki 的界面
> - 移动端捕捉（手机 Obsidian）
> - graph view / backlink 导航
> - Obsidian 是可替换的

Obsidian 本质是一个 **markdown 文件浏览器**。它让你看到的就是 markdown 本身——标题、列表、链接、frontmatter。这对 **编辑和导航** 是够的，但对 **理解和决策** 是不够的。

举个具体例子：review-digest 产出到 `inbox/review-digest-2026-05-12.md`。你在 Obsidian 里打开它，看到的是一个 markdown 表格——inbox 积压 38 条、孤岛率 22%、僵尸率 15%。这些数字你得自己在脑子里换算"38 条是多还是少？上周是多少？趋势在改善还是恶化？"

如果同样的数据用 HTML artifact 呈现：一个仪表盘，红黄绿状态灯、趋势折线图、可点击展开的孤岛页面列表、一键触发 distill 或 archive 的按钮——同样的信息，人脑处理效率完全不同。

**这不是"锦上添花"。这是认知循环的 review 环节能不能真正高效运转的基础设施问题。**

---

## ZHPMind 的架构需要什么改变

### 核心变更：交互层从单层变双层

当前：
```
交互层 = Obsidian（markdown 浏览器）
```

应该变成：
```
交互层 = Obsidian（编辑 + 导航）+ HTML Artifacts（呈现 + 行动）
```

两者的分工：

| 场景 | 用 Obsidian | 用 HTML Artifact |
|---|---|---|
| 编辑 wiki 页面 | ✅ | — |
| 浏览 backlink / graph | ✅ | — |
| 手机快速 capture | ✅ | — |
| review-digest 仪表盘 | — | ✅ |
| 查询结果的综合呈现 | — | ✅ |
| 竞品/趋势可视化 | — | ✅ |
| vault 健康度趋势图 | — | ✅ |
| inbox 分拣界面 | — | ✅ |

Obsidian 是你和 **原始知识** 交互的地方——读、写、链接、思考。HTML Artifacts 是你和 **知识的衍生物** 交互的地方——看趋势、做决策、触发行动。

### 这对存储层意味着什么

**存储层不变。** Markdown + git 仍然是 source of truth。HTML artifacts 是 **派生层**——从 markdown 数据动态生成，不持久存储（或者存在 outputs/ 里作为快照）。这完全符合 design-principles 第一层的"开放格式"原则：派生层消失了，数据依然完整。

### 这对智能层意味着什么

Claudian 和 Hermes 的产出需要分两种：

**写入型产出**（给存储层）→ markdown，写进 wiki/pages/ 或 inbox/
- distill、harvest、propagation、capture → 照旧，产出 markdown

**呈现型产出**（给交互层）→ HTML artifact，给人看
- review-digest → 除了写 markdown 快照到 inbox/，同时生成一个可交互的 HTML 仪表盘
- query 结果 → 复杂查询的回答直接生成为 HTML（表格、图表、对比视图）
- inbox 分拣 → 一个 HTML 界面列出 inbox 内容，让你点击决定"distill / archive / delete"
- 业务信号 → 竞品变动、价格趋势等 Push 信号的可视化

### 具体实施路径

不需要一步到位。按价值排序：

**第一步：review-digest 双输出**
review-digest skill 的产出从纯 markdown 变成 markdown + HTML。markdown 继续写入 inbox/（作为 snapshot 存档），HTML 作为"上一次 review 的仪表盘"放在 outputs/ 或一个固定位置（比如 `outputs/dashboard.html`），浏览器打开就能看。

这一步最容易做——review-digest 的数据结构已经定义好了（inbox 积压、孤岛率、僵尸率等），把同样的数据渲染成 HTML 带图表的仪表盘，Hermes 或 Claude Code 都能做。

**第二步：query 结果 HTML 化**
在 Claude 对话里和 vault 相关的深度讨论，当结果是综合性的分析/比较/决策支持时，产出 HTML artifact 而不是纯文本。这一步在 Claude.ai 里已经天然支持（Artifacts 功能），只是目前没有意识地去用。

**第三步：inbox 分拣界面**
weekly review 的第一步是清空 inbox。如果有一个 HTML 界面列出 inbox 全部条目，每条旁边有"distill / archive / skip"按钮，点击后触发 Claudian 或 Hermes 执行——这就是 omarsar0 说的"artifacts 和 agent 双向通信"。

这一步依赖 Hermes gateway 或类似机制来接收 artifact 的指令，技术上最复杂，放在最后。

---

## Karpathy LLM Wiki 的其他战术层启示

以上是架构层面的核心改变。除此之外，Karpathy 的 LLM Wiki gist 在执行层面还有几个值得 ZHPMind 吸收的实践：

### index.md — 给 AI 一个全局导航图

Karpathy 的 wiki 根目录维护一个 `index.md`，列出每个页面的链接 + 一句话摘要，按分类组织。AI 每次操作先读 index → 找到相关页面 → 再深入。ZHPMind 没有这个。MOC 是自下而上生长的（≥5 页才建），粒度太粗且不覆盖所有页面。

建议在 `wiki/pages/` 下维护 `index.md`，由 AI 在每次 distill/harvest 时自动更新。这不替代 MOC——MOC 是主题深度导航，index 是全局目录。

### changelog.md — vault 操作时间线

Karpathy 的 `log.md` 是 append-only 的操作记录。ZHPMind 的 review-digest 是周维度快照，但缺少逐次操作日志。建议在 vault 根目录维护 `changelog.md`，每次 AI 写入追加一行——比 git log 更人类可读，比 review-digest 更细粒度。

### content-lint — 语义层面的健康检查

Karpathy 的 Lint 操作包括找矛盾、过时内容、缺失页面。review-digest 目前只做结构健康（统计指标），缺少内容健康（矛盾检测、过时标记、断链修复）。建议作为 Hermes 第二个 skill，频率 monthly。

### query-to-wiki — 让好问题变成知识

Karpathy 的关键实践：查询 wiki 时，好的综合分析应该回写为新 wiki 页面。ZHPMind 在 Claude 对话里的深度讨论目前留在聊天记录里不回流。建议在 Claudian 工作流中增加显式的 crystallize 操作。

---

## ZHPMind 已经超越 Karpathy 的地方

这些不需要改：

- **信息三态**（理解/事件/快照）+ frontmatter type 分类 → Karpathy 的 wiki 没有
- **完整认知循环**（9 个工作流）→ Karpathy 只有 ingest/query/lint
- **AI 三条红线**（溯源+互评+可回滚）→ Karpathy 无质量约束
- **Push 信号采集**（Hermes skills）→ Karpathy 纯 Pull
- **apply / harvest / mirror / output** → Karpathy 完全没涉及

---

## 对 design-principles 的修订建议

集中在第三层「当前工具映射」：

**1. 交互层定义改写**

```
交互层 = Obsidian（编辑 + 导航）+ HTML Artifacts（呈现 + 行动）
- Obsidian：浏览/编辑 wiki 的主界面，移动端捕捉，graph view / backlink 导航
- HTML Artifacts：从 wiki 数据动态生成的可视化/可交互界面
  （仪表盘、查询结果、分拣界面、信号可视化）
- Artifacts 是派生层，可从 markdown 数据重建；消失不影响核心数据
- 两者可独立替换，互不依赖
```

**2. 智能层产出类型显式化**

```
产出分两种形态：
- 写入型（markdown → 存储层）：distill、harvest、propagation、capture、snapshot
- 呈现型（HTML → 交互层）：仪表盘、查询综合、分拣界面、信号可视化
同一次操作可同时产出两种形态。
```

**3. 底层逻辑不变**

完全不碰第一层和第二层。"三层松耦合"反而被强化——交互层从单一工具变成两种互补模式，但都不绑定存储层格式。

---

## 行动清单

| 优先级 | 改进项 | 性质 | 下一步 |
|---|---|---|---|
| **P0** | 修订 design-principles 交互层定义：Obsidian + HTML Artifacts 双模 | 架构 | 可以现在就改 |
| **P1** | review-digest 增加 HTML 仪表盘输出 | 实施 | Hermes 安装后，改 review-digest skill |
| **P1** | 建立 wiki/pages/index.md 全局目录 | 实施 | 下次 distill 时启动 |
| **P1** | 建立 changelog.md 操作日志 | 实施 | 立即可做 |
| **P2** | query 结果在 Claude 对话中有意识地使用 Artifacts 呈现 | 习惯 | 从下次深度讨论开始 |
| **P2** | 增加 content-lint skill | 实施 | review-digest 稳定后 |
| **P3** | inbox 分拣 HTML 界面 + agent 双向通信 | 实施 | 依赖 Hermes gateway |
| **P3** | 设计 crystallize 操作（对话 → wiki 回写） | 实施 | 需要 Claudian 支持 |
| **P3** | design-principles 和 skill 设计意图存入 vault | 实施 | 随时可做 |

---

## 一句话总结

Karpathy 的 LLM Wiki 在存储和编译层面和 ZHPMind 高度重合（ZHPMind 更完整）。真正的新洞察来自 Thariq + Karpathy 的 follow-up：**知识系统的交互层不应该只是 markdown 浏览器，还需要一个动态生成的视觉化呈现层（HTML artifacts），因为人脑消费信息的最高带宽通道是视觉，不是文字。** 这意味着 ZHPMind 的交互层需要从 "Obsidian" 升级为 "Obsidian + HTML Artifacts" 双模结构。
