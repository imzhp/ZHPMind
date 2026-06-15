---
type: snapshot
source: hermes/review-digest
created: 2026-06-15
tags:
  - system-review
---

# ZHPMind 周报 — 2026-06-15

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压（不含系统快照） | 6 条 | 🟢 |
| Wiki 孤岛率 | 0.0%（0/115 页） | 🟢 |
| Projects 僵尸率 | 0.0%（0/3 项） | 🟢 |
| 本周 Wiki 活动 | 9 页新建，22 页修改 | — |
| 本周 Capture（不含系统快照） | 2 条 | — |
| 修正频率（30 天） | 0 页 | 🔴 |
| raw 未引用率 | 25.0%（2/8 顶层） | 🔴 |

---

## Inbox 积压详情

共 6 条用户 capture，11 条系统快照已排除。所有 6 条均为 `no_trace`（无蒸馏痕迹）：

| 文件 | 创建日期 | 蒸馏状态 |
|---|---|---|
| 1随记.md | 2026-04-19 | 无蒸馏痕迹 |
| Every Claude Code Hack I Know (March 2026).md | 2026-05-30 | 无蒸馏痕迹 |
| alert-git-autocommit-2026-06-10.md | 2026-06-10 | 无蒸馏痕迹 |
| alert-git-autocommit-2026-06-11.md | 2026-06-11 | 无蒸馏痕迹 |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | 无蒸馏痕迹 |
| vault-maintenance-backlog-2026-06-01.md | 2026-06-01 | 无蒸馏痕迹 |

6 条全部待蒸馏，其中 `1随记.md`（创建于 2026-04-19）积压最久，已近两个月。

---

## Wiki 孤岛页面

🟢 无孤岛。115 个 wiki 页面均被其他文件 wikilink 引用，连接度健康。

---

## Projects 僵尸项目

🟢 无僵尸项目。3 个活跃项目均在 90 天内有修改：

- **amazon-learning**：最后修改 2026-06-10
- **sheep-archive-migration**：最后修改 2026-06-01
- **hermes**：最后修改 2026-05-20

---

## 本周 Wiki 活动

**新建（9 页）**：

| 页面 | 创建日期 |
|---|---|
| amazon-keyword-library | 2026-06-10 |
| amazon-moc | 2026-06-08 |
| amazon-new-product-launch | 2026-06-08 |
| amazon-ppc-campaign-management | 2026-06-08 |
| amazon-product-line-operations-handbook | 2026-06-08 |
| amazon-product-selection | 2026-06-08 |
| skill-policy-monitor | 2026-06-10 |
| skill-review-digest | 2026-06-10 |
| skill-vault-tidy | 2026-06-10 |

**仅修改（22 页）**：

affiliate-marketing-complete-guide、agentic-engineering、ai-engineering-moc、amazon-cashflow-roi、amazon-data-driven-operations、amazon-inventory-replenishment、amazon-opportunity-explorer、amazon-patent-screening、amazon-ppc-advertising、amazon-pricing-strategy、amazon-profit-analysis、amazon-traffic-sources、first-principles、index、karpathy-claude-md、listing-optimization、my-father-before-me、parenting-alliance、parenting-moc、skill-concept-fable、wildlume-business-reference、zhanghaopeng

---

## 本周 Capture（不含系统快照）

共 2 条：

- **alert-git-autocommit-2026-06-10.md**（2026-06-10）
- **alert-git-autocommit-2026-06-11.md**（2026-06-11）

---

## MOC 候选

现有 5 个 MOC：ai-engineering-moc、parenting-moc、people-moc、critical-thinking-moc、amazon-moc，覆盖大量高频 tag。

**真实候选（高频 tag 且未被 MOC wikilink 覆盖，≥5 次）**：

| Tag | 使用频次 |
|---|---|
| wildlume | 6 |
| system-skill | 5 |

两个候选都有建 MOC 的依据：`wildlume` 代表曜野业务体系，`system-skill` 代表 Hermes skill 管理知识。可根据规模和连接需要决定是否新建。

---

## 🔴 修正频率（30 天）：0 页

过去 30 天内，无页面满足"创建时间早于 30 天前 + 修改时间在近 30 天内 + mtime-ctime ≥ 1 天"的条件。

> **语境说明**：vault 处于初建期（`initial_build_phase = true`）。115 个 wiki 页面中，99 页在近 30 天内新建，最老的页面（a9-algorithm、amazon-review-management）创建于 2026-04-19，至今约 57 天。修正频率为 0 不等于认知僵化——vault 本身太新，绝大多数页面尚未进入可被"修正"的成熟周期。建议在 vault 建立满 3 个月（约 2026-07 月底）后重新评估该指标，届时应有更多页面满足"创建早于 30 天"的条件，修正频率才具有实质意义。

---

## 🔴 raw 未引用率：25.0%（2/8 顶层）

`wiki/raw/` 顶层共 8 个文件，其中 2 个未被 `wiki/pages` 引用：

- **Matt Van Horn Every Claude Code Hack I Know March 2026.md**
- **karpathy-llm-wiki-vs-zhpmind.md**

无集合型目录（collections 为空）。

> **建议**：以上 2 个 raw 文件已有对应 inbox capture（`Every Claude Code Hack I Know (March 2026).md` 尚未蒸馏），可在下次蒸馏时从 raw 提取关键内容写入对应 wiki 页面，建立引用关系，消除 raw 淤积。
