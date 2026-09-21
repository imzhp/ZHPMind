---
type: snapshot
source: hermes/review-digest
created: 2026-09-21
tags:
  - system-review
---

# ZHPMind 周报 — 2026-09-21

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压（不含系统快照） | 6 条 | 🟢 |
| Wiki 孤岛率 | 0.0%（0/119 页） | 🟢 |
| Projects 僵尸率 | 0.0%（0/2 项） | 🟢 |
| 本周 Wiki 活动 | 0 页新建，0 页修改 | — |
| 本周 Capture（不含系统快照） | 0 条 | — |
| 修正频率（30 天） | 1 页 | 🟡 |
| raw 未引用率 | 18.2%（2/11 顶层） | 🔴 raw 淤积 |

---

## Inbox 积压详情

共 6 条用户 capture，均无蒸馏痕迹（`no_trace`）：

| 文件名 | 创建日期 | 修改日期 | 蒸馏状态 |
|---|---|---|---|
| 1随记.md | 2026-04-19 | 2026-06-02 | no_trace |
| How I use Obsidian.md | 2026-08-30 | 2026-08-30 | no_trace |
| How to remember everything you read (stop trying).md | 2026-08-30 | 2026-08-30 | no_trace |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | 2026-06-04 | no_trace |
| 折叠屏的高端感从哪里来.md | 2026-09-05 | 2026-09-05 | no_trace |
| 纳瓦尔宝典-阅读记录.md | 2026-09-06 | 2026-09-06 | no_trace |

6 条全部无蒸馏痕迹，但总量不超警戒，状态绿灯。其中 `1随记.md` 创建于 4 月，积压时间最长，可优先处理。

---

## Wiki 孤岛页面

无。119 个页面全部有反链覆盖。🟢

---

## 僵尸项目

无。2 个活跃项目均在 90 天内有更新：

- `amazon-learning`：最后修改 2026-09-06
- `hermes`：最后修改 2026-07-10

---

## 修正频率（30 天）

过去 30 天内，符合"创建时间早于 30 天前 + mtime-ctime ≥ 1 天"定义的修订页面共 **1 页**：

- `a9-algorithm`（创建 2026-04-19，修改 2026-09-01）

修正频率为 1，处于正常范围。

---

## raw 未引用率 🔴

顶层 raw 文件共 11 个，未被 `wiki/pages` 引用的有 **2 个**（18.2%）：

1. `Matt Van Horn Every Claude Code Hack I Know March 2026.md`
2. `karpathy-llm-wiki-vs-zhpmind.md`

无集合型目录（collections 为空）。

> **建议**：这两个 raw 文件已积压一段时间，未被任何 wiki 页面引用。建议 Claudian 在下次处理时：
> 1. `Matt Van Horn Every Claude Code Hack I Know March 2026.md` — 可蒸馏进 `ai-engineering-moc` 或相关 claude-code 页面；
> 2. `karpathy-llm-wiki-vs-zhpmind.md` — 可作为 `personal-knowledge-base` 或 `zhanghaopeng` 页面的参考原材料，或单独建页入库。
> 两者都值得处理，不应长期留存于 raw 而无引用。

---

## MOC 候选

当前 vault 共有 5 个 MOC：`ai-engineering-moc`、`parenting-moc`、`people-moc`、`critical-thinking-moc`、`amazon-moc`。

高频 tag 中未被现有 MOC wikilink 覆盖的候选（≥5 次）：

| Tag | 使用频次 | 建议 |
|---|---|---|
| `wildlume` | 6 | 曜野业务相关内容已有一定积累，可考虑建 `wildlume-moc` |
| `system-skill` | 5 | 系统技能类内容，可考虑纳入现有 MOC 或独立建页 |

现有 MOC 覆盖透明度：5 个 MOC 共覆盖 200+ 个 tag，覆盖率良好。`wildlume` 和 `system-skill` 是当前唯二的真正空白候选。

---

## 本周 Wiki 活动

本周（2026-09-15 至 2026-09-21）无新建 wiki 页面，无修改记录。vault 处于静默期。

---

## 本周 Capture

本周无新增用户 capture。
