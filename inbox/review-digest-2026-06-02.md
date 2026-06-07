---
type: snapshot
source: hermes/review-digest
created: 2026-06-02
tags:
  - system/review
---

# ZHPMind 周报 — 2026-06-02

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压 | 6 条 | 🟢 正常 |
| Wiki 孤岛率 | 0 / 84 页 = 0% | 🟢 正常 |
| Projects 僵尸率 | 0 / 3 项 = 0% | 🟢 正常 |
| 本周 wiki 活动 | 新建 56 页 / 修改 1 页 | — |
| 本周 Capture | 3 条 | — |
| 修正频率（30天） | 0 页被修正 | 🔴 Bootstrap 期，暂不告警 |

---

## Inbox 积压

共 6 条，低于阈值 20，无需列出。

**待蒸馏提醒**：以下 5 条 inbox 文件尚无蒸馏痕迹（`no_trace`），建议 Claudian 处理：

- `2026-04-19.md`（创建 2026-04-19）
- `2026-04-20.md`（创建 2026-04-20）
- `2026-04-29.md`（创建 2026-04-29）
- `Every Claude Code Hack I Know (March 2026).md`（创建 2026-05-30）
- `vault-maintenance-backlog-2026-06-01.md`（创建 2026-06-01）

已有蒸馏痕迹（`has_trace`）：
- `多 Agent 的本质不是分工，而是注意力治理.md`（raw_match）

---

## Wiki 孤岛页面

🟢 **无孤岛**。全部 84 个 wiki 页面均有反链，连通性优秀。

> 注：本周新建 56 个页面，大量页面今日才入 vault，孤岛率为 0 属于 MOC 结构良好的体现。

---

## 僵尸项目

🟢 **无僵尸项目**。共 3 个活跃项目，均在 90 天内有修改记录：

| 项目 | 最后修改 |
|---|---|
| amazon-learning | 2026-05-29 |
| sheep-archive-migration | 2026-06-01 |
| hermes | 2026-05-20 |

---

## MOC 候选

以下 tag 使用频率 ≥5，但尚无对应 MOC 文件：

| Tag | 使用页数 |
|---|---|
| `wildlume` | 6 |

**建议**：创建 `wildlume-moc.md`，将曜野相关页面（`wildlume-business-architecture`、`wildlume-business-reference` 等）统一收拢。

已存在的 MOC 及覆盖情况（供参考）：

| MOC | 链接页数 | 覆盖的主要 tag |
|---|---|---|
| amazon-moc | 16 | amazon, ppc, listing, product-selection 等 |
| ai-engineering-moc | 14 | ai, agents, llm, software-engineering 等 |
| people-moc | 18 | people, person, founders 等 |
| parenting-moc | 13 | parenting, open-brain, psychology 等 |
| critical-thinking-moc | 8 | critical-thinking, decision-making 等 |

---

## 本周新建 Wiki 页面（56 页）

> ⚡ 本周大爆发：单周新建 56 页，覆盖 Amazon 运营、批判性思维、养育、心理学多个主题域。

**2026-06-02 新建（26 页）**

- asking-the-right-questions
- boys-development-phases
- causa-sui
- cognitive-dissonance
- critical-thinking-moc
- ernest-becker
- expectant-father-emotional-coach
- father-hunger
- first-principles
- immortality-project
- index
- judgment-and-decision-making
- mece
- my-father-before-me
- open-brain-vs-defensive-brain
- parenting-alliance
- parenting-moc
- people-moc
- prospect-theory
- raising-boys
- scqa
- skill-vault-tidy
- steve-biddulph
- the-denial-of-death
- the-pyramid-principle
- the-yes-brain
- yes-brain-balance
- yes-brain-empathy
- yes-brain-insight
- yes-brain-resilience
- zhanghaopeng

**2026-06-01 新建（13 页）**

- amazon-cashflow-roi
- amazon-data-driven-operations
- amazon-inventory-replenishment
- amazon-keyword-library
- amazon-new-product-launch
- amazon-opportunity-explorer
- amazon-patent-screening
- amazon-ppc-advertising
- amazon-pricing-strategy
- amazon-product-selection
- amazon-profit-analysis
- amazon-traffic-sources
- listing-optimization

**2026-05-31 新建（4 页）**

- critical-thinking-framework
- critical-thinking-writing-speaking
- financial-golden-triangle
- obstacles-to-critical-thinking
- ten-critical-questions

**2026-05-29 ~ 2026-05-30 新建（8 页）**

- affiliate-marketing-complete-guide（05-29）
- desires-energy-trap（05-29）
- naval-ravikant-almanack（05-29）
- naval-ravikant（05-29）
- wildlume-business-architecture（05-29）
- wildlume-business-reference（05-29）
- skill-review-digest（05-30）

---

## 本周修改 Wiki 页面（1 页）

| 页面 | 最后修改 |
|---|---|
| amazon-moc | 2026-05-28 |

---

## 修正频率（过去 30 天）

🔴 **0 页**被修正（修改但非新建）。

> **Bootstrap 期说明**：vault 于 2026-04-19 启动，距今约 44 天，84 页中有 82 页在最近 30 天内新建。系统处于高速建设期，修正频率为 0 属预期状态——大部分页面刚写入，尚未进入迭代修订周期。建议在 vault 满 90 天后再将此指标作为健康告警依据。

最早的 5 个页面（已有修订窗口）：

| 页面 | 创建日期 |
|---|---|
| a9-algorithm | 2026-04-19 |
| amazon-review-management | 2026-04-19 |
| software-3-0 | 2026-05-08 |
| verifiability | 2026-05-08 |
| product-overhang | 2026-05-08 |

---

## 附加：wiki/raw 未被引用文件

以下 `wiki/raw/` 文件未被任何 wiki 页面引用（未经蒸馏入库）：

| 文件 | 状态 |
|---|---|
| Matt Van Horn Every Claude Code Hack I Know March 2026.md | ⚠️ 未引用 |
| karpathy-llm-wiki-vs-zhpmind.md | ⚠️ 未引用 |
| 多 Agent 的本质不是分工，而是注意力治理.md | ⚠️ 未引用 |

未引用率：3 / 8 = 37.5% 🔴 — 建议 Claudian 将这些原始素材蒸馏成 wiki 页面，或主动在相关页面中建立链接。
