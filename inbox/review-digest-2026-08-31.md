---
type: snapshot
source: hermes/review-digest
created: 2026-08-31
tags:
  - system-review
---

# ZHPMind 周报 — 2026-08-31

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压（不含系统快照） | 7 条 | 🟢 |
| Wiki 孤岛率 | 0.0%（0/119 页） | 🟢 |
| Projects 僵尸率 | 33.3%（1/3 项） | 🟡 |
| 本周 Wiki 活动 | 0 页新建，0 页修改 | — |
| 本周 Capture（不含系统快照） | 2 条 | — |
| 修正频率（30 天） | 0 页 | 🔴 认知僵化警告 |
| raw 未引用率 | 18.2%（2/11 顶层） | 🔴 raw 淤积 |

---

## Inbox 积压详情

共 7 条用户 capture（另排除系统快照 81 条）：

| 文件 | 创建日期 | 蒸馏状态 |
|---|---|---|
| 1随记.md | 2026-04-19 | ❌ 无蒸馏痕迹 |
| Every Claude Code Hack I Know (March 2026).md | 2026-05-30 | ❌ 无蒸馏痕迹 |
| Harness engineering with Claude 14-step roadmap from one agent to a self-improving system..md | 2026-06-23 | ✅ 已蒸馏（raw + page + log 均有记录） |
| How I use Obsidian.md | 2026-08-30 | ❌ 无蒸馏痕迹 |
| How to remember everything you read (stop trying).md | 2026-08-30 | ❌ 无蒸馏痕迹 |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | ❌ 无蒸馏痕迹 |
| vault-maintenance-backlog-2026-06-01.md | 2026-06-01 | ❌ 无蒸馏痕迹 |

6 条待蒸馏，其中 2 条（How I use Obsidian、How to remember everything you read）为昨日新增，其余均为积压超过 2 个月的历史 capture。

---

## Wiki 孤岛

🟢 无孤岛页面。119 页全部有反链覆盖。

---

## Projects 僵尸详情

| 项目 | 最后修改 | 状态 |
|---|---|---|
| amazon-learning | 2026-07-10 | 🟢 活跃 |
| hermes | 2026-07-10 | 🟢 活跃 |
| sheep-archive-migration | 2026-06-01 | 🟡 僵尸（超 90 天未更新） |

**sheep-archive-migration** 上次修改为 2026-06-01，已停滞约 91 天。

---

## 本周 Wiki 活动

本周（过去 7 天）无新建页面，无修改页面。

---

## 本周 Capture

本周新增 2 条用户 capture（均来自 2026-08-30）：

- How I use Obsidian.md
- How to remember everything you read (stop trying).md

---

## 修正频率（30 天）

🔴 **认知僵化警告**：过去 30 天内，满足"创建时间早于 30 天前 + mtime-ctime ≥ 1 天"的 wiki 页面数为 **0**。

> **建议**：vault 目前有 119 个 wiki 页面，其中最早建立的页面（a9-algorithm、amazon-review-management 等）已存在超过 4 个月，理论上应随认知深化出现自然修正。0 修正页可能意味着：(1) 知识页面蒸馏后未持续迭代；(2) 外部学习未反馈到已有页面。建议在下次阅读/学习后，有意识地回访并更新 1-2 个相关 wiki 页面，形成修正习惯。

---

## raw 未引用率

🔴 **raw 淤积**：顶层 raw 文件 11 个，未被 wiki/pages 引用的有 **2 个**（18.2%）：

1. `Matt Van Horn Every Claude Code Hack I Know March 2026.md`
2. `karpathy-llm-wiki-vs-zhpmind.md`

> **建议**：这两份 raw 文件已存入 vault 但尚未被任何 wiki 页面引用。`Every Claude Code Hack I Know` 与 `claude-code`、`agentic-engineering` 等主题高度相关，可考虑蒸馏后链入 ai-engineering-moc；`karpathy-llm-wiki-vs-zhpmind` 是一份对比分析，可作为 `personal-knowledge-base` 页面的参考来源。

---

## MOC 候选

现有 MOC：ai-engineering-moc、parenting-moc、people-moc、critical-thinking-moc、amazon-moc，共 5 个。

高频 tag 中，以下 2 个尚未被任何 MOC wikilink 覆盖，满足候选条件（频次 ≥ 5）：

| Tag | 频次 |
|---|---|
| wildlume | 6 |
| system-skill | 5 |

**wildlume**（频次 6）：曜野相关页面已积累至 6 个，可考虑建立 wildlume-moc，将业务知识与 amazon-moc 区分，单独管理品牌与产品层面的知识。

**system-skill**（频次 5）：围绕系统技能/元技能的页面达 5 个，已接近形成独立知识群，可考虑纳入 ai-engineering-moc 或新建 meta-skill-moc。
