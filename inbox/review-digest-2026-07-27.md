---
type: snapshot
source: hermes/review-digest
created: 2026-07-27
tags:
  - system-review
---

# ZHPMind 周报 — 2026-07-27

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压（不含系统快照） | 5 条 | ✅ |
| Wiki 孤岛率 | 0.0%（0/119 页） | ✅ |
| Projects 僵尸率 | 0.0%（0/3 项） | ✅ |
| 本周 Wiki 活动 | 0 页新建，0 页修改 | — |
| 本周 Capture（不含系统快照） | 0 条 | — |
| 修正频率（30 天） | 4 页 | ✅ |
| raw 未引用率 | 18.2%（2/11 顶层） | 🔴 raw 淤积 |

---

## Inbox 积压详情

共 5 条用户 capture（已排除 54 条系统快照）：

| 文件 | 创建日期 | 蒸馏状态 |
|---|---|---|
| 1随记.md | 2026-04-19 | ❌ 无蒸馏痕迹 |
| Every Claude Code Hack I Know (March 2026).md | 2026-05-30 | ❌ 无蒸馏痕迹 |
| Harness engineering with Claude 14-step roadmap....md | 2026-06-23 | ✅ 已蒸馏（raw + page + log 三重痕迹） |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | ❌ 无蒸馏痕迹 |
| vault-maintenance-backlog-2026-06-01.md | 2026-06-01 | ❌ 无蒸馏痕迹 |

4 条 capture 尚无蒸馏痕迹，其中最老的 `1随记.md` 已积压约 3 个月。

---

## Wiki 孤岛页面

无孤岛页面（0/119）。所有 wiki 页面均有来自 vault 其他文件的 wikilink 反链。✅

---

## 僵尸项目

无僵尸项目（0/3）。三个活跃项目最近修改时间均在 90 天内：

- `amazon-learning`：最近修改 2026-07-10
- `sheep-archive-migration`：最近修改 2026-06-01
- `hermes`：最近修改 2026-07-10

---

## 本周 Wiki 活动

本周（过去 7 天）无新建页面，无修改页面。vault 知识库本周处于静默状态。

---

## 本周 Capture

本周无新增用户 capture。

---

## MOC 候选

当前有 2 个高频 tag 未被现有 MOC wikilink 覆盖：`wildlume`（使用频次 6）和 `system-skill`（使用频次 5）。

现有 5 个 MOC（ai-engineering-moc、parenting-moc、people-moc、critical-thinking-moc、amazon-moc）覆盖了绝大多数高频 tag，包括 amazon（27）、ai（20）、psychology（13）、decision-making（12）、llm（11）、agents（11）等主力标签均已纳入 MOC 管辖。

`wildlume` 和 `system-skill` 是下一步 MOC 扩展的自然候选方向。

---

## 修正频率（30 天）

过去 30 天内被修改、且创建时间早于 30 天前、mtime-ctime ≥ 1 天的页面共 **4 页**，状态 ✅：

| 页面 | 创建日期 | 最近修改 |
|---|---|---|
| index | 2026-06-18 | 2026-07-10 |
| skill-book-mirror | 2026-06-03 | 2026-07-10 |
| skill-concept-fable | 2026-05-23 | 2026-07-10 |
| skill-policy-mirror | 2026-06-10 | 2026-07-10 |

vault 知识处于正常修正节奏，知识页面仍在被回访和更新。

---

## 🔴 raw 未引用率

**18.2%（2/11 顶层 raw 文件）**

以下 2 个顶层 raw 文件未被任何 `wiki/pages` 页面引用：

- `Matt Van Horn Every Claude Code Hack I Know March 2026.md`
- `karpathy-llm-wiki-vs-zhpmind.md`

> **建议**：`Matt Van Horn Every Claude Code Hack I Know March 2026.md` 与 inbox 中的 `Every Claude Code Hack I Know (March 2026).md` 高度相关，两者均尚未完成蒸馏——可在下次蒸馏该 capture 时，同步将此 raw 文件链入对应 wiki 页面。`karpathy-llm-wiki-vs-zhpmind.md` 内容涉及系统架构比较，可考虑链入 `personal-knowledge-base` 或 `ai-engineering-moc`。

---

*本快照由 Hermes 自动生成，数据来源：`~/.hermes/scratch/review-digest-latest.json`（扫描时间 2026-07-27T09:00:24）*
