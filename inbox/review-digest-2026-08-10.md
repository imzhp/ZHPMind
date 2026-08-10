---
type: snapshot
source: hermes/review-digest
created: 2026-08-10
tags:
  - system-review
---

# ZHPMind 周报 — 2026-08-10

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

共 5 条待处理 capture（已排除 62 条系统快照）：

| 文件 | 创建日期 | 蒸馏状态 |
|---|---|---|
| 1随记.md | 2026-04-19 | ❌ 无蒸馏痕迹 |
| Every Claude Code Hack I Know (March 2026).md | 2026-05-30 | ❌ 无蒸馏痕迹 |
| Harness engineering with Claude 14-step roadmap...md | 2026-06-23 | ✅ 已蒸馏（raw + page + log 均有记录） |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | ❌ 无蒸馏痕迹 |
| vault-maintenance-backlog-2026-06-01.md | 2026-06-01 | ❌ 无蒸馏痕迹 |

其中 4 条无蒸馏痕迹，最早积压自 2026-04-19（`1随记.md`，已逾 3 个月）。

---

## Wiki 孤岛页面

共 119 页，孤岛数：0。所有页面均有来自 vault 其他文件的 wikilink 反链，连通性良好。

---

## Projects 僵尸项目

共 3 个项目，无僵尸项目（90 天阈值内均有活动）：

- **amazon-learning**：最后修改 2026-07-10
- **sheep-archive-migration**：最后修改 2026-06-01
- **hermes**：最后修改 2026-07-10

---

## 修正频率（30 天）

🔴 过去 30 天内，119 个 wiki 页面中，无任何一个创建超过 30 天的页面被修改（count=0）。`is_bootstrap_period=false`，此为真实告警，不属于初建期豁免。

最早创建的 5 个页面供参考：`a9-algorithm`、`amazon-review-management`（均创建于 2026-04-19）、`software-3-0`、`verifiability`、`product-overhang`（均创建于 2026-05-08）。

> **建议**：vault 已度过初建期，却在过去 30 天内零修订，说明已有知识未经更新迭代。建议从最早创建的 amazon 运营类页面入手，检查内容是否仍符合当前操盘实践（如关税、定价策略等随市场变化较快的知识点）。可每周选 2–3 页做一轮 review，逐步建立修订节奏。

---

## MOC 候选

现有 5 个 MOC：`ai-engineering-moc`、`parenting-moc`、`people-moc`、`critical-thinking-moc`、`amazon-moc`，已覆盖大量高频 tag。

检测到 **2 个** 高频 tag 尚未被现有 MOC wikilink 覆盖：

| Tag | 使用频次 |
|---|---|
| wildlume | 6 |
| system-skill | 5 |

`wildlume` 是曜野业务相关 tag，频次 6，可考虑建立 `wildlume-moc` 来聚合品牌/选品/供应链维度的页面。`system-skill` 频次 5，与 Hermes 技能体系相关，可视重要性决定是否单独建 MOC 或并入 `ai-engineering-moc`。

---

## 本周 Wiki 活动

过去 7 天内无新建或修改的 wiki 页面（新建 0 页，修改 0 页）。

---

## raw 未引用率

🔴 顶层 raw 文件共 11 个，其中 2 个未被 `wiki/pages` 任何页面引用（18.2%）：

- `Matt Van Horn Every Claude Code Hack I Know March 2026.md`
- `karpathy-llm-wiki-vs-zhpmind.md`

> **建议**：`Matt Van Horn Every Claude Code Hack I Know March 2026.md` 与 inbox 中同名 capture 相关，对应 wiki 页面尚未创建或未建立引用链接；`karpathy-llm-wiki-vs-zhpmind.md` 从文件名判断是一份对比分析素材，建议确认是否需要蒸馏为独立页面，或在现有 `personal-knowledge-base` 等页面中作为参考引入。两者建议优先处理，避免 raw 层继续积压。
