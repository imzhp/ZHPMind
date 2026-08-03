---
type: snapshot
source: hermes/review-digest
created: 2026-08-03
tags:
  - system-review
---

# ZHPMind 周报 — 2026-08-03

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压（不含系统快照） | 5 条 | 🟢 |
| Wiki 孤岛率 | 0.0%（0/119 页） | 🟢 |
| Projects 僵尸率 | 0.0%（0/3 项） | 🟢 |
| 本周 Wiki 活动 | 0 页新建，0 页修改 | — |
| 本周 Capture（不含系统快照） | 0 条 | — |
| 修正频率（30 天） | 4 页 | 🟢 |
| raw 未引用率 | 18.2%（2/11 顶层） | 🔴 raw 淤积 |

---

## Inbox 积压详情

共 5 条用户 capture（排除 58 个系统快照）：

| 文件名 | 创建日期 | 蒸馏状态 |
|---|---|---|
| 1随记.md | 2026-04-19 | ❌ 无蒸馏痕迹 |
| Every Claude Code Hack I Know (March 2026).md | 2026-05-30 | ❌ 无蒸馏痕迹 |
| Harness engineering with Claude 14-step roadmap....md | 2026-06-23 | ✅ 已蒸馏（raw_match + page_reference + log_entry） |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | ❌ 无蒸馏痕迹 |
| vault-maintenance-backlog-2026-06-01.md | 2026-06-01 | ❌ 无蒸馏痕迹 |

**待蒸馏积压**：4 条无蒸馏痕迹，其中最早一条（1随记.md）创建于 2026-04-19，已搁置超过 3 个月。

---

## Wiki 孤岛页面

无孤岛页面。119 个 wiki/pages 页面均有来自 vault 其他文件的 wikilink 反链覆盖。

---

## 僵尸项目

无僵尸项目。3 个活跃项目均在 90 天内有过修改：

- amazon-learning（最后修改：2026-07-10）
- sheep-archive-migration（最后修改：2026-06-01）
- hermes（最后修改：2026-07-10）

---

## 本周 Wiki 活动

本周（过去 7 天）无新建页面，无修改页面。

---

## 本周 Capture

本周（过去 7 天）无新增用户 capture。

---

## 修正频率（30 天）

过去 30 天内共有 4 个 wiki 页面被修改（创建时间早于 30 天前，mtime-ctime ≥ 1 天）：

| 页面 | 创建日期 | 最后修改 |
|---|---|---|
| index | 2026-06-18 | 2026-07-10 |
| skill-book-mirror | 2026-06-03 | 2026-07-10 |
| skill-concept-fable | 2026-05-23 | 2026-07-10 |
| skill-policy-monitor | 2026-06-10 | 2026-07-10 |

修正频率健康，vault 认知处于正常迭代节奏中。

---

## MOC 候选

现有 5 个 MOC：ai-engineering-moc、parenting-moc、people-moc、critical-thinking-moc、amazon-moc。

当前有 2 个高频 tag 未被任何现有 MOC 的 wikilink 覆盖，达到候选阈值（频次 ≥5）：

- **wildlume**（频次 6）：曜野业务相关页面尚无独立 MOC 聚合
- **system-skill**（频次 5）：系统技能类页面尚无独立 MOC 聚合

这两个 tag 对应的知识域在 vault 中已有一定规模，可考虑新建对应 MOC 或将其纳入现有 MOC 的覆盖范围。

---

## raw 未引用率 🔴 raw 淤积

顶层 raw 文件共 11 个，其中 2 个未被任何 wiki/pages 引用（18.2%）：

- `Matt Van Horn Every Claude Code Hack I Know March 2026.md`
- `karpathy-llm-wiki-vs-zhpmind.md`

> **建议**：这两个 raw 文件已在 wiki/raw 中沉积，但尚未生成对应的 wiki/pages 知识蒸馏。`Matt Van Horn Every Claude Code Hack I Know March 2026.md` 与 inbox 中同名 capture 内容对应，可优先处理；`karpathy-llm-wiki-vs-zhpmind.md` 是关于知识管理方法论的比较素材，适合蒸馏进 personal-knowledge-base 或单独建页。建议在下次 Claudian 处理时将二者纳入蒸馏队列，或手动建立 wiki/pages 引用关系。
