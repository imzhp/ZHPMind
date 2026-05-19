---
type: snapshot
source: hermes/review-digest
created: 2026-05-18
tags:
  - system/review
---

# ZHPMind 周报 — 2026-05-18

## 总览

| 指标           | 状态     | 数值                      |
| ------------ | ------ | ----------------------- |
| Inbox 积压     | 🟢 正常  | 3 条                     |
| Wiki 孤岛率     | 🟢 正常  | 0%（0/27）                |
| Projects 僵尸率 | — N/A  | projects/ 目录为空          |
| 本周 Wiki 活动   | —      | 新建 13 页，修改 0 页          |
| 本周 Capture   | —      | 0 条                     |
| MOC 候选       | 🟢 全覆盖 | 0 候选                    |
| 修正频率（30天）    | 🔴 注意  | 0 页被修正（Bootstrap 期，见说明） |

---

## 1. Inbox 积压详情

共 **3** 条，状态 🟢 正常，无需列出最旧条目。

| 文件名 | 创建日期 | 最后修改 |
|--------|----------|----------|
| 2026-04-19.md | 2026-04-19 | 2026-04-20 |
| 2026-04-20.md | 2026-04-20 | 2026-05-12 |
| 2026-04-29.md | 2026-04-29 | 2026-05-07 |

> 另有 2 个系统快照文件已排除统计。

---

## 2. Wiki 孤岛页面

孤岛率 **0%**（0/27），状态 🟢 正常。

所有 27 个 wiki 页面均已被至少一处链接引用，无孤岛。

> ⚠️ 注意：vault 处于 Bootstrap 期（最老页面创建于 2026-04-19，距今约 29 天），大量页面同期新建。若孤岛率未来上升，可能需要关注新建页面的链接质量。

---

## 3. 僵尸项目

`projects/` 目录当前为空，暂无数据。

---

## 4. 本周新建 Wiki 页面（13 页）

以下页面均创建于 2026-05-11 至 2026-05-12：

| 页面 | 创建日期 |
|------|----------|
| ai-engineering-moc | 2026-05-11 |
| amazon-advanced-operations-handbook | 2026-05-11 |
| amazon-moc | 2026-05-11 |
| andrej-karpathy-vibe-coding-to-agentic-engineering | 2026-05-11 |
| andrej-karpathy | 2026-05-11 |
| boris-cherny-coding-is-solved | 2026-05-11 |
| boris-cherny | 2026-05-11 |
| claude-code | 2026-05-11 |
| garry-tan-meta-meta-prompting | 2026-05-11 |
| garry-tan | 2026-05-11 |
| index | 2026-05-11 |
| people-moc | 2026-05-11 |
| zhanghaopeng | 2026-05-12 |

---

## 5. 本周修改 Wiki 页面

过去 7 天内无仅修改（非新建）的页面。

---

## 6. 本周 Capture

过去 7 天 inbox 无新增文件，capture 数量为 **0**。

---

## 7. MOC 候选检测

高频 tag 与现有 MOC 覆盖情况：

| Tag | 使用页数 | 已有 MOC |
|-----|----------|----------|
| ai | 16 | ✅ ai-engineering-moc |
| llm | 9 | ✅ ai-engineering-moc |
| agents | 8 | ✅ ai-engineering-moc |
| software-engineering | 8 | ✅ ai-engineering-moc |
| amazon | 8 | ✅ amazon-moc |

所有高频 tag（≥5 页）均已被现有 MOC 覆盖，**无新增 MOC 候选**。

现有 MOC 覆盖统计：

- `ai-engineering-moc`：链接 14 个页面，覆盖 28 个 tag
- `people-moc`：链接 12 个页面，覆盖 31 个 tag
- `amazon-moc`：链接 7 个页面，覆盖 29 个 tag

---

## 8. 修正频率说明（30 天）

过去 30 天内被**修正**（非新建）的页面数：**0** 🔴

⚠️ **Bootstrap 期免责说明**：vault 全部 27 个页面均在过去 30 天内新建（最早创建于 2026-04-19）。修正频率为 0 的根本原因是系统刚刚搭建，页面尚未进入"沉淀→修正"的迭代周期，而非认知僵化。

建议在 vault 建立 60 天后（约 2026-06-19 后）再观察此指标是否仍为 0，届时若持续为 0 才需要主动干预。
