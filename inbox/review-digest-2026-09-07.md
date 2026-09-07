---
type: snapshot
source: hermes/review-digest
created: 2026-09-07
tags:
  - system-review
---

# ZHPMind 周报 — 2026-09-07

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压（不含系统快照） | 6 条 | 🟢 |
| Wiki 孤岛率 | 0.0%（0/119 页） | 🟢 |
| Projects 僵尸率 | 0.0%（0/2 项） | 🟢 |
| 本周 Wiki 活动 | 0 页新建，1 页修改 | — |
| 本周 Capture（不含系统快照） | 2 条 | — |
| 修正频率（30 天） | 1 页 | 🟡 |
| raw 未引用率 | 18.2%（2/11 顶层） | 🔴 raw 淤积 |

---

## Inbox 积压详情

共 6 条用户 capture，均无蒸馏痕迹（`no_trace`）。

| 文件名 | 创建日期 | 蒸馏状态 |
|---|---|---|
| 1随记.md | 2026-04-19 | ❌ no_trace |
| How I use Obsidian.md | 2026-08-30 | ❌ no_trace |
| How to remember everything you read (stop trying).md | 2026-08-30 | ❌ no_trace |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | ❌ no_trace |
| 折叠屏的高端感从哪里来.md | 2026-09-05 | ❌ no_trace |
| 纳瓦尔宝典-阅读记录.md | 2026-09-06 | ❌ no_trace |

> 注：本周新增 capture 为「折叠屏的高端感从哪里来」与「纳瓦尔宝典-阅读记录」，其余均为历史积压。所有文件待 Claudian 蒸馏处理。

---

## Wiki 孤岛页面

当前无孤岛页面。119 个 wiki 页面均有来自 vault 其他 markdown 文件的 wikilink 反链覆盖。

---

## 僵尸项目

当前无僵尸项目。2 个活跃项目：

- **amazon-learning**：最后修改 2026-09-06（近期活跃）
- **hermes**：最后修改 2026-07-10（距今约 59 天，未超 90 天阈值）

---

## MOC 候选

当前有 2 个 tag 使用频次 ≥5 且未被现有 MOC wikilink 覆盖：

- **wildlume**（6 次）：曜野业务相关，尚无专属 MOC
- **system-skill**（5 次）：系统技能/Hermes 工具体系相关，尚无专属 MOC

**现有 MOC 覆盖透明度**：vault 共有 5 个 MOC（amazon-moc、ai-engineering-moc、parenting-moc、people-moc、critical-thinking-moc），合计覆盖 219 个 tag，连接 95 个 wiki 页面。

---

## 本周 Wiki 活动

本周（2026-09-01 至 2026-09-07）无新建页面，修改 1 页：

- **a9-algorithm**（修改于 2026-09-01）

---

## 修正频率（30 天）

过去 30 天内，共 1 个 wiki 页面满足修正定义（创建时间早于 30 天前、mtime-ctime ≥ 1 天）：

- **a9-algorithm**：创建 2026-04-19，本次修改 2026-09-01

当前状态 🟡，尚未触发 🔴 认知僵化警告。119 个 wiki 页面中仅 1 页在 30 天内被回溯修正，属偏低水平，可关注是否有更多旧知识需要更新迭代。

---

## raw 未引用率 🔴

顶层 raw 文件共 11 个，其中 2 个未被 `wiki/pages` 引用（18.2%）：

- **Matt Van Horn Every Claude Code Hack I Know March 2026.md**
- **karpathy-llm-wiki-vs-zhpmind.md**

无集合型目录（collections 为空）。

> **建议**：以上 2 个 raw 文件有实质内容（Claude Code 实践技巧、Karpathy LLM Wiki 与 ZHPMind 对比），建议优先处理：  
> 1. `karpathy-llm-wiki-vs-zhpmind.md` 可蒸馏为 wiki 页面或引用到 `personal-knowledge-base` / `ai-engineering-moc`；  
> 2. `Matt Van Horn Every Claude Code Hack...` 可作为 `claude-code` 或 `agentic-engineering` 页面的原始素材，提交 Claudian 蒸馏后在对应 wiki 页面建立引用。  
> 处理后 raw 淤积率将降至 0%。
