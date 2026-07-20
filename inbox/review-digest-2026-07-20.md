---
type: snapshot
source: hermes/review-digest
created: 2026-07-20
tags:
  - system-review
---

# ZHPMind 周报 — 2026-07-20

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

## Inbox 积压详情（5 条）

| 文件 | 创建日期 | 蒸馏状态 |
|---|---|---|
| 1随记.md | 2026-04-19 | ❌ no_trace |
| Every Claude Code Hack I Know (March 2026).md | 2026-05-30 | ❌ no_trace |
| Harness engineering with Claude 14-step roadmap...md | 2026-06-23 | ✅ has_trace（raw + page + log） |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | ❌ no_trace |
| vault-maintenance-backlog-2026-06-01.md | 2026-06-01 | ❌ no_trace |

4 条 capture 尚无蒸馏痕迹，其中 `1随记.md` 和 `vault-maintenance-backlog-2026-06-01.md` 已积压超 6 周。

---

## Wiki 孤岛率

119 页中无孤岛页面，所有页面至少被 vault 内其他 markdown 文件 wikilink 引用一次。🟢 健康。

---

## Projects 僵尸率

3 个活跃项目均在 90 天内有更新：

- `amazon-learning`：最后修改 2026-07-10
- `hermes`：最后修改 2026-07-10
- `sheep-archive-migration`：最后修改 2026-06-01

无僵尸项目。🟢

---

## 本周 Wiki 活动

本周（过去 7 天）无新建页面，无修改页面。

---

## 本周 Capture

本周（过去 7 天）无新用户 capture 写入 inbox。

---

## MOC 候选

当前有 2 个高频 tag 尚未被现有 MOC wikilink 覆盖：

- **wildlume**（使用 6 次）：曜野业务相关知识尚无专属 MOC 聚合
- **system-skill**（使用 5 次）：hermes skill 体系相关知识散落在各页，缺乏 MOC 聚合

现有 MOC 已覆盖 5 个领域：`ai-engineering-moc`（18 页）、`parenting-moc`（13 页）、`people-moc`（28 页）、`critical-thinking-moc`（12 页）、`amazon-moc`（24 页）。

---

## 修正频率（30 天）

过去 30 天内共 4 页 wiki 被修改（创建时间早于 30 天前，且 mtime-ctime ≥ 1 天）：

| 页面 | 创建日期 | 最后修改 |
|---|---|---|
| index | 2026-06-18 | 2026-07-10 |
| skill-book-mirror | 2026-06-03 | 2026-07-10 |
| skill-concept-fable | 2026-05-23 | 2026-07-10 |
| skill-policy-monitor | 2026-06-10 | 2026-07-10 |

修正频率 4 页，🟢 正常。vault 在持续修订中。

---

## 🔴 raw 未引用率（18.2%）

顶层 raw 文件 11 个，其中 2 个未被 `wiki/pages` 任何页面引用：

1. `Matt Van Horn Every Claude Code Hack I Know March 2026.md`
2. `karpathy-llm-wiki-vs-zhpmind.md`

> **建议**：这 2 个文件已持续多周未被蒸馏。`Matt Van Horn Every Claude Code Hack I Know March 2026.md` 与 inbox 中同主题的 `Every Claude Code Hack I Know (March 2026).md` 可能是同源素材，建议合并处理后一并蒸馏到 `ai-engineering-moc` 相关页面；`karpathy-llm-wiki-vs-zhpmind.md` 内容涉及 ZHPMind 设计对比，适合蒸馏为架构反思页面或补充到 `personal-knowledge-base`。建议在下次 Claudian 会话中优先处理这两个文件，避免 raw 层长期淤积。
