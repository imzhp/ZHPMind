---
type: snapshot
source: hermes/review-digest
created: 2026-08-24
tags:
  - system-review
---

# ZHPMind 周报 — 2026-08-24

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压（不含系统快照） | 5 条 | 🟢 |
| Wiki 孤岛率 | 0.0%（0/119 页） | 🟢 |
| Projects 僵尸率 | 0.0%（0/3 项） | 🟢 |
| 本周 Wiki 活动 | 0 页新建，0 页修改 | — |
| 本周 Capture（不含系统快照） | 0 条 | — |
| 修正频率（30 天） | 0 页 | 🔴 认知僵化警告 |
| raw 未引用率 | 18.2%（2/11 顶层） | 🔴 raw 淤积 |

---

## Inbox 积压详情

共 5 条用户 capture（另排除系统快照 79 条）：

| 文件名 | 创建日期 | 蒸馏状态 |
|---|---|---|
| 1随记.md | 2026-04-19 | ⚠️ 无蒸馏痕迹 |
| Every Claude Code Hack I Know (March 2026).md | 2026-05-30 | ⚠️ 无蒸馏痕迹 |
| Harness engineering with Claude 14-step roadmap...md | 2026-06-23 | ✅ 已蒸馏（raw_match + page_reference + log_entry） |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | ⚠️ 无蒸馏痕迹 |
| vault-maintenance-backlog-2026-06-01.md | 2026-06-01 | ⚠️ 无蒸馏痕迹 |

其中 4 条无任何蒸馏痕迹，最早可追溯至 2026-04-19（距今逾 4 个月）。`1随记.md` 和 `reflection-2026-06-04-fatherhood.md` 属于个人反思类，建议优先确认是否已在线下处理，或由 Claudian 提取要点入 wiki。

---

## Wiki 孤岛页面

无孤岛。全部 119 个 wiki 页面均有 wikilink 反链覆盖。🟢

---

## Projects 僵尸项目

无僵尸项目。全部 3 个项目均在 90 天内有活动：

- `amazon-learning`：最后修改 2026-07-10
- `sheep-archive-migration`：最后修改 2026-06-01
- `hermes`：最后修改 2026-07-10

---

## 本周 Wiki 活动

本周（过去 7 天）无新建页面，无修改页面。

---

## 本周 Capture

本周（过去 7 天）无新增用户 capture。

---

## MOC 候选

现有 MOC：ai-engineering-moc、parenting-moc、people-moc、critical-thinking-moc、amazon-moc，共覆盖 200+ 个 tag。

高频 tag 中，以下 2 个尚未被现有 MOC wikilink 覆盖，满足候选条件（使用频次 ≥5）：

| Tag | 使用频次 |
|---|---|
| wildlume | 6 |
| system-skill | 5 |

**wildlume**：曜野品牌相关页面，频次 6，目前无独立 MOC。随着业务参考页面逐步入 vault，可考虑建立 `wildlume-moc` 作为品牌知识中心。

**system-skill**：系统技能相关 tag，频次 5，可能与 `ai-engineering-moc` 或独立的系统架构 MOC 相关，建议先确认这些页面的聚合方向再决定是否新建。

---

## 修正频率（30 天）

🔴 **认知僵化警告**：过去 30 天内，119 个 wiki 页面中，满足条件（创建时间早于 30 天前、且 mtime-ctime ≥ 1 天）的修改页面为 **0 页**。最早页面创建于 2026-04-19，vault 已脱离初建期。

> **建议**：修正频率为零意味着过去一个月内无任何旧页面被回访和修正——知识沉淀后未经验证即成定论，是认知固化的早期信号。建议本周挑选 3–5 个核心页面（可从最早的 5 页入手：`a9-algorithm`、`amazon-review-management`、`software-3-0`、`verifiability`、`product-overhang`），主动与当前认知对照，按需修订。目标不是为改而改，而是建立"回读-校准"的节奏。

---

## raw 未引用率

🔴 **raw 淤积**：顶层 raw 文件共 11 个，其中 2 个（18.2%）未被 `wiki/pages` 任何页面引用：

- `Matt Van Horn Every Claude Code Hack I Know March 2026.md`
- `karpathy-llm-wiki-vs-zhpmind.md`

> **建议**：`Matt Van Horn Every Claude Code Hack I Know March 2026.md` 对应 inbox 中尚未蒸馏的同名 capture，两者均未处理——建议合并处理：先蒸馏 inbox 条目到 wiki page，raw 文件自然获得引用。`karpathy-llm-wiki-vs-zhpmind.md` 是一份比较分析，内容价值较高，建议创建对应 wiki 页面（如 `karpathy-llm-wiki-vs-zhpmind`）并引用，或将核心洞察整合进 `personal-knowledge-base` 页面。

---

## 数据说明

- scan_date：2026-08-24T09:00:24
- 系统快照已排除（inbox 共排除 79 条）
- 集合型目录：无
