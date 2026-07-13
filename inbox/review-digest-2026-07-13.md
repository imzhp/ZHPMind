---
type: snapshot
source: hermes/review-digest
created: 2026-07-13
tags:
  - system-review
---

# ZHPMind 周报 — 2026-07-13

## 总览

| 指标 | 数值 | 状态 |
|---|---|---|
| Inbox 积压（不含系统快照） | 5 条 | ✅ |
| Wiki 孤岛率 | 0.0%（0/119 页） | ✅ |
| Projects 僵尸率 | 0.0%（0/3 项） | ✅ |
| 本周 Wiki 活动 | 5 页新建，4 页修改 | — |
| 本周 Capture（不含系统快照） | 0 条 | — |
| 修正频率（30 天） | 4 页 | ✅ |
| raw 未引用率 | 18.2%（2/11 顶层） | 🔴 raw 淤积 |

---

## Inbox 积压详情

共 5 条用户 capture，已排除 46 个系统快照。

| 文件 | 创建日期 | 蒸馏状态 |
|---|---|---|
| 1随记.md | 2026-04-19 | ❌ 无蒸馏痕迹 |
| Every Claude Code Hack I Know (March 2026).md | 2026-05-30 | ❌ 无蒸馏痕迹 |
| Harness engineering with Claude 14-step roadmap....md | 2026-06-23 | ✅ 已蒸馏（raw_match + page_reference + log_entry） |
| reflection-2026-06-04-fatherhood.md | 2026-06-04 | ❌ 无蒸馏痕迹 |
| vault-maintenance-backlog-2026-06-01.md | 2026-06-01 | ❌ 无蒸馏痕迹 |

4 条 capture 无蒸馏痕迹，其中 `1随记.md` 创建于 2026-04-19，已积压近 3 个月。

---

## Wiki 孤岛页面

无孤岛页面。119 个 wiki 页面全部在 vault 其他 markdown 文件中有 wikilink 反链覆盖。✅

---

## Projects 僵尸项目

无僵尸项目。3 个活跃项目均在 90 天窗口内有修改：

- **amazon-learning**：最后修改 2026-07-10
- **sheep-archive-migration**：最后修改 2026-06-01
- **hermes**：最后修改 2026-07-10

---

## 本周 Wiki 活动

**新建（5 页）**

| 页面 | 创建日期 |
|---|---|
| glucose-friendly-eating | 2026-07-10 |
| glucose-revolution | 2026-07-10 |
| skill-cross-eval | 2026-07-10 |
| skill-review-digest | 2026-07-10 |
| skill-vault-tidy | 2026-07-10 |

本周新建集中在 2026-07-10，涵盖血糖管理知识（glucose 系列）和 skill 元数据文档（3 项系统 skill）。

**修改（4 页，非本周新建）**

| 页面 | 修改日期 |
|---|---|
| index | 2026-07-10 |
| skill-book-mirror | 2026-07-10 |
| skill-concept-fable | 2026-07-10 |
| skill-policy-monitor | 2026-07-10 |

---

## 本周 Capture

本周无新增用户 capture（不含系统快照）。

---

## 修正频率（30 天）

过去 30 天内被修改、创建时间早于 30 天前、且 mtime-ctime ≥ 1 天的 wiki 页面共 **4 页**，状态健康。✅

| 页面 | 创建日期 | 最后修改 |
|---|---|---|
| amazon-keyword-library | 2026-05-28 | 2026-06-19 |
| skill-book-mirror | 2026-06-03 | 2026-07-10 |
| skill-concept-fable | 2026-05-23 | 2026-07-10 |
| skill-policy-monitor | 2026-06-10 | 2026-07-10 |

---

## raw 未引用率 🔴

顶层 raw 文件共 11 个，其中 **2 个未被 wiki/pages 引用**，未引用率 **18.2%**。

未引用文件：

- `Matt Van Horn Every Claude Code Hack I Know March 2026.md`
- `karpathy-llm-wiki-vs-zhpmind.md`

集合型目录：无。

> **建议**：`Matt Van Horn Every Claude Code Hack I Know March 2026.md` 对应 inbox 中仍待蒸馏的 `Every Claude Code Hack I Know (March 2026).md`，二者尚未完成 raw → wiki/pages 的链接闭环，建议蒸馏后在对应 wiki 页面中添加 raw 引用。`karpathy-llm-wiki-vs-zhpmind.md` 暂无对应 wiki 页面，建议判断是否值得独立建页，或并入相关页面（如 `personal-knowledge-base`）后添加引用，以消除游离 raw。

---

## MOC 候选

当前共有 5 个 MOC（ai-engineering-moc、parenting-moc、people-moc、critical-thinking-moc、amazon-moc），覆盖范围广泛。

**真正候选（使用频次 ≥5 且未被现有 MOC wikilink 覆盖）：**

| tag | 频次 |
|---|---|
| wildlume | 6 |
| system-skill | 5 |

**MOC 覆盖透明度**：`wildlume` 和 `system-skill` 均未出现在任何现有 MOC 的 `linked_pages` 中。`wildlume` 指向曜野业务相关内容，当前由 amazon-moc 覆盖部分业务知识，但 wildlume 品牌视角尚无独立 MOC；`system-skill` 则对应 vault 的 skill 元数据文档集群，属系统维护类内容，可评估是否值得独立成 `system-moc`。
