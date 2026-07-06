---
type: snapshot
source: hermes/review-digest
created: 2026-07-06
tags:
  - system-review
---

# ZHPMind 周报 — 2026-07-06

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压（不含系统快照） | 30 条 | 🟡 |
| Wiki 孤岛率 | 0.0%（0/117 页） | 🟢 |
| Projects 僵尸率 | 0.0%（0/3 项） | 🟢 |
| 本周 Wiki 活动 | 0 页新建，0 页修改 | — |
| 本周 Capture（不含系统快照） | 8 条 | — |
| 修正频率（30 天） | 25 页 | 🟢 |
| raw 未引用率 | 18.2%（2/11 顶层） | 🔴 raw 淤积 |

> **建议**：`wiki/raw/` 中有 2 个顶层文件未被任何 `wiki/pages` 页面引用。建议尽快处理：要么在相关页面中添加 wikilink，要么评估是否蒸馏为新的 wiki 页面。详见下方「raw 未引用率」章节。

---

## Inbox 积压详情

共 30 条用户 capture（另有 13 条系统快照已排除）。其中 1 条有蒸馏痕迹，29 条无痕迹。

### 已有蒸馏痕迹（1 条）

| 文件 | 创建日期 | 蒸馏信号 |
|---|---|---|
| Harness engineering with Claude 14-step roadmap from one agent to a self-improving system..md | 2026-06-23 | raw_match、page_reference、log_entry |

### 尚无蒸馏痕迹（29 条）

| 文件 | 创建日期 |
|---|---|
| 1随记.md | 2026-04-19 |
| Every Claude Code Hack I Know (March 2026).md | 2026-05-30 |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 |
| vault-maintenance-backlog-2026-06-01.md | 2026-06-01 |
| alert-git-autocommit-2026-06-10.md | 2026-06-10 |
| alert-git-autocommit-2026-06-11.md | 2026-06-11 |
| alert-git-autocommit-2026-06-16.md | 2026-06-16 |
| alert-git-autocommit-2026-06-17.md | 2026-06-17 |
| alert-git-autocommit-2026-06-18.md | 2026-06-18 |
| alert-git-autocommit-2026-06-20.md | 2026-06-20 |
| alert-git-autocommit-2026-06-22.md | 2026-06-22 |
| alert-git-autocommit-2026-06-23.md | 2026-06-23 |
| alert-git-autocommit-2026-06-24.md | 2026-06-24 |
| alert-git-autocommit-2026-06-25.md | 2026-06-25 |
| alert-git-autocommit-2026-06-26.md | 2026-06-26 |
| alert-git-autocommit-2026-06-29.md | 2026-06-29 |
| alert-git-autocommit-2026-06-30.md | 2026-06-30 |
| alert-git-autocommit-2026-07-01.md | 2026-07-01 |
| alert-git-autocommit-2026-07-02.md | 2026-07-02 |
| alert-git-autocommit-2026-07-03.md | 2026-07-03 |
| alert-git-autocommit-2026-07-04.md | 2026-07-04 |
| alert-git-autocommit-2026-07-05.md | 2026-07-05 |
| alert-git-autocommit-2026-07-06.md | 2026-07-06 |
| alert-hermes-watchdog-2026-06-24.md | 2026-06-24 |
| alert-hermes-watchdog-2026-06-25.md | 2026-06-25 |
| alert-hermes-watchdog-2026-06-26.md | 2026-06-26 |
| alert-hermes-watchdog-2026-06-27.md | 2026-06-27 |
| alert-hermes-watchdog-2026-06-28.md | 2026-06-28 |
| alert-hermes-watchdog-2026-06-29.md | 2026-06-29 |

---

## Wiki 孤岛页面

无孤岛。全部 117 个 wiki 页面均有反链覆盖。🟢

---

## 僵尸项目

无僵尸。3 个项目均活跃。🟢

| 项目 | 最后修改 |
|---|---|
| amazon-learning | 2026-06-10 |
| sheep-archive-migration | 2026-06-01 |
| hermes | 2026-05-20 |

---

## MOC 候选

当前有 2 个标签使用频次 ≥5 且未被现有 MOC wikilink 覆盖：

| 标签 | 使用频次 |
|---|---|
| wildlume | 6 |
| system-skill | 5 |

**现有 MOC 覆盖透明度**：vault 中现有 5 个 MOC（ai-engineering-moc、parenting-moc、people-moc、critical-thinking-moc、amazon-moc），分别覆盖 34、34、62、25、97 个标签。`wildlume` 和 `system-skill` 均不在任何现有 MOC 的覆盖范围内，是真正的候选空白。

---

## 本周 Wiki 活动

本周（过去 7 天）无新建或修改的 wiki 页面。

---

## 修正频率（30 天）

过去 30 天内有 25 个页面被修正（创建时间早于 30 天前、修改时间在 30 天内、且 mtime-ctime ≥ 1 天）。状态：🟢

| 页面 | 创建日期 | 最后修改 |
|---|---|---|
| affiliate-marketing-complete-guide | 2026-05-29 | 2026-06-10 |
| amazon-cashflow-roi | 2026-06-01 | 2026-06-10 |
| amazon-data-driven-operations | 2026-06-01 | 2026-06-10 |
| amazon-inventory-replenishment | 2026-06-01 | 2026-06-10 |
| amazon-keyword-library | 2026-05-28 | 2026-06-19 |
| amazon-opportunity-explorer | 2026-06-01 | 2026-06-09 |
| amazon-patent-screening | 2026-06-01 | 2026-06-10 |
| amazon-ppc-advertising | 2026-06-01 | 2026-06-10 |
| amazon-pricing-strategy | 2026-06-01 | 2026-06-10 |
| amazon-profit-analysis | 2026-06-01 | 2026-06-10 |
| amazon-traffic-sources | 2026-06-01 | 2026-06-10 |
| critical-thinking-moc | 2026-06-02 | 2026-06-07 |
| first-principles | 2026-06-02 | 2026-06-10 |
| judgment-and-decision-making | 2026-06-02 | 2026-06-07 |
| karpathy-claude-md | 2026-05-23 | 2026-06-10 |
| listing-optimization | 2026-06-01 | 2026-06-10 |
| my-father-before-me | 2026-06-02 | 2026-06-10 |
| obstacles-to-critical-thinking | 2026-05-31 | 2026-06-07 |
| parenting-alliance | 2026-06-02 | 2026-06-10 |
| parenting-moc | 2026-06-02 | 2026-06-10 |
| people-moc | 2026-06-02 | 2026-06-08 |
| prospect-theory | 2026-06-02 | 2026-06-07 |
| skill-concept-fable | 2026-05-23 | 2026-06-10 |
| wildlume-business-reference | 2026-05-29 | 2026-06-10 |
| zhanghaopeng | 2026-06-04 | 2026-06-10 |

---

## raw 未引用率 🔴

顶层 raw 文件共 11 个，其中 2 个（18.2%）未被 `wiki/pages` 任何页面引用：

- `Matt Van Horn Every Claude Code Hack I Know March 2026.md`
- `karpathy-llm-wiki-vs-zhpmind.md`

集合型目录：无。

> **建议**：这 2 个 raw 文件存有实质内容但尚未建立引用链路。建议处理方向：(1) `Matt Van Horn Every Claude Code Hack I Know March 2026.md` 可关联到 Claude Code 相关页面，或在 `ai-engineering-moc` 下新建蒸馏页面；(2) `karpathy-llm-wiki-vs-zhpmind.md` 可关联到 `personal-knowledge-base` 页面，或作为独立笔记蒸馏入 wiki。两者都已超过 30 天未被引用，优先级较高。
