---
type: snapshot
source: hermes/review-digest
created: 2026-06-10
tags:
  - system-review
---

# ZHPMind 周报 — 2026-06-10

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压（不含系统快照） | 5 条 | 🟢 正常 |
| Wiki 孤岛率 | 0.0%（0/114 页） | 🟢 健康 |
| Projects 僵尸率 | 0.0%（0/3 项） | 🟢 健康 |
| 本周 Wiki 活动 | 33 页新建，28 页修改 | — |
| 本周 Capture（不含系统快照） | 2 条 | — |
| 修正频率（30 天） | 0 页 | 🔴 认知僵化警告 |
| raw 未引用率 | 25.0%（2/8 顶层） | 🔴 raw 淤积 |

---

## Inbox 积压详情

5 条用户 capture（另有 11 条系统快照已排除），全部尚无蒸馏痕迹（`no_trace`）：

| 文件 | 创建 | 最后修改 | 蒸馏状态 |
|---|---|---|---|
| 1随记.md | 2026-04-19 | 2026-06-02 | no_trace |
| Every Claude Code Hack I Know (March 2026).md | 2026-05-30 | 2026-05-30 | no_trace |
| alert-git-autocommit-2026-06-10.md | 2026-06-10 | 2026-06-10 | no_trace |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | 2026-06-04 | no_trace |
| vault-maintenance-backlog-2026-06-01.md | 2026-06-01 | 2026-06-01 | no_trace |

---

## Wiki 孤岛页面

无孤岛。114 页 wiki 全部具有 wikilink 反链覆盖。

---

## Projects 僵尸率

3 个活跃项目，无僵尸（最后修改均在 90 天内）：

| 项目 | 最后修改 | 状态 |
|---|---|---|
| amazon-learning | 2026-06-10 | 活跃 |
| sheep-archive-migration | 2026-06-01 | 活跃 |
| hermes | 2026-05-20 | 活跃 |

---

## MOC 候选

当前 5 个 MOC（`ai-engineering-moc`、`parenting-moc`、`people-moc`、`critical-thinking-moc`、`amazon-moc`）共覆盖 200+ 个 tag。高频 tag 中有 1 个尚未被任何现有 MOC 的 wikilink 覆盖：

- **wildlume**：tag 使用频次 6，未被任何 MOC 覆盖。

可考虑新建 `wildlume-moc` 或在 `amazon-moc` / 相关业务页面中增加跨链来关联曜野业务节点。

---

## 本周 Wiki 活动

本周新建 33 页，修改（非本周新建）28 页，合计 61 次写入动作。

**新建页面（33 页）：**

amazon-backend-keywords、amazon-fba-prep、amazon-fee-rates-snapshot、amazon-keyword-library、amazon-listing-build-and-audit、amazon-listing-visual-planning、amazon-moc、amazon-new-product-launch、amazon-ppc-campaign-management、amazon-product-line-operations-handbook、amazon-product-selection、amazon-tariff-landed-cost、amazon-unit-economics、anchoring-effect、anders-ericsson、attachment-styles、availability-heuristic、counselling-for-toads、daniel-kahneman、dual-process-theory、gottman-four-horsemen、intimate-relationships、mental-representation、on-contradiction、peak、peak-end-rule、planning-fallacy、principal-contradiction、skill-review-digest、skill-vault-tidy、thinking-fast-and-slow、transactional-analysis、zhanghaopeng

**修改页面（28 页，非本周新建）：**

affiliate-marketing-complete-guide、agentic-engineering、ai-engineering-moc、amazon-cashflow-roi、amazon-data-driven-operations、amazon-inventory-replenishment、amazon-opportunity-explorer、amazon-patent-screening、amazon-ppc-advertising、amazon-pricing-strategy、amazon-profit-analysis、amazon-traffic-sources、critical-thinking-moc、first-principles、index、judgment-and-decision-making、karpathy-claude-md、listing-optimization、my-father-before-me、obstacles-to-critical-thinking、parenting-alliance、parenting-moc、people-moc、prospect-theory、skill-book-mirror、skill-concept-fable、skill-cross-eval、wildlume-business-reference

---

## 修正频率（30 天）

🔴 触发「认知僵化警告」（count = 0）

> **语境说明**：当前 vault 处于初建期（`initial_build_phase = true`）。114 页中有 105 页创建于过去 30 天内，能满足「创建时间早于 30 天前且 mtime-ctime ≥ 1 天」的页面极少，修正频率为 0 是结构性必然，不代表知识已固化或停止迭代。建议在 vault 多数页面创建时间超过 30 天后（预计 2026 年 8 月前后）重新评估该指标的有效性。届时若仍为 0，才需要真正关注认知僵化风险。

---

## raw 未引用率

🔴 25.0%（顶层 8 个 raw 文件中有 2 个未被 wiki/pages 引用）

未被引用的文件：

- `Matt Van Horn Every Claude Code Hack I Know March 2026.md`
- `karpathy-llm-wiki-vs-zhpmind.md`

> **建议**：上述 2 个 raw 文件有蒸馏价值但尚未链入 wiki/pages。建议 Claudian 下次处理时优先蒸馏，或在相关页面（如 `claude-code`、`karpathy-llm-wiki-vs-zhpmind` 对应概念页）的 `sources:` 字段中补充引用，避免 raw 层持续淤积。
