---
type: snapshot
source: hermes/review-digest
created: 2026-06-02
tags:
  - system/review
---

# ZHPMind 周报 — 2026-06-02

## 总览

| 指标 | 状态 | 数值 | 说明 |
|---|---|---|---|
| Inbox 积压 | 🟢 | 11 条 | 健康 |
| Wiki 孤岛率 | 🟢 | 0%（0/75） | 无孤立页面 |
| Projects 僵尸率 | 🟢 | 0%（0/3） | 所有项目活跃 |
| 本周 wiki 活动 | 🟢 | 新建 46 页 / 修改 1 页 | 本周建库爆发期 |
| 本周 Capture | 🟢 | 4 条 | 正常 |
| MOC 候选 | ⚠️ | 10 个 tag 待建 MOC | 见下方详情 |
| 修正频率（30天） | 🔴 | 0 条修正 | 见说明 |

---

## 🔴 修正频率说明

过去 30 天内被修改（非新建）的页面：**0 条**。

这不一定是问题——vault 在过去一周内集中建立了 46 个新页面，大部分页面的"出生时间"就在本周，还没有进入修正循环。这是新库的正常状态。**建议**：在 2 周后再次运行 review-digest，如果修正频率仍为 0，则需要关注知识是否只进不改。

---

## ⚠️ MOC 候选

以下 tag 被 ≥5 个页面使用，但检测脚本未找到对应 `moc-{tag}.md` 文件。

> **注意**：vault 使用 `{tag}-moc.md` 命名规范（如 `amazon-moc.md`、`critical-thinking-moc.md`），而检测脚本查找的是 `moc-{tag}.md`。标注 ✅ 的 tag 已确认存在对应 MOC（命名规范不同导致误报），标注 🆕 的是真正缺失 MOC 的候选。

| Tag | 页面数 | MOC 状态 |
|---|---|---|
| ai | 18 | 🆕 **建议新建 ai-moc.md** |
| amazon | 18 | ✅ amazon-moc.md 已存在 |
| llm | 9 | 🆕 **建议新建 llm-moc.md** |
| agents | 9 | 🆕 **建议新建 agents-moc.md** |
| software-engineering | 8 | 🆕 **建议新建 software-engineering-moc.md** |
| critical-thinking | 7 | ✅ critical-thinking-moc.md 已存在 |
| wildlume | 6 | 🆕 考虑新建 wildlume-moc.md（或用 wildlume-business-architecture 代替） |
| moc | 5 | — meta 标签，无需建 MOC |
| open-brain | 5 | 🆕 **建议新建 open-brain-moc.md** |
| psychoanalysis | 5 | 🆕 **建议新建 psychoanalysis-moc.md** |

**优先级建议**：ai（18页）和 agents（9页）+ llm（9页）最急，这三个是当前 vault 密度最高但没有导航锚点的区域。

---

## 本周新建 Wiki 页面（46 页）

本周建库爆发——大多数页面在 2026-06-01 和 2026-06-02 集中创建，属于系统初建期的正常现象。孤岛率为 0% 说明链接结构建得很好。

**2026-06-02 新建（今日）**

- asking-the-right-questions
- causa-sui
- critical-thinking-moc
- ernest-becker
- expectant-father-emotional-coach
- father-hunger
- immortality-project
- index
- my-father-before-me
- open-brain-vs-defensive-brain
- parenting-alliance
- parenting-moc
- people-moc
- the-denial-of-death
- the-yes-brain
- yes-brain-balance
- yes-brain-empathy
- yes-brain-insight
- yes-brain-resilience

**2026-06-01 新建**

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
- first-principles
- listing-optimization
- zhanghaopeng

**2026-05-29 ~ 2026-05-31 新建**

- affiliate-marketing-complete-guide（05-29）
- critical-thinking-framework（05-31）
- critical-thinking-writing-speaking（05-31）
- desires-energy-trap（05-29）
- financial-golden-triangle（05-31）
- naval-ravikant-almanack（05-29）
- naval-ravikant（05-29）
- obstacles-to-critical-thinking（05-31）
- skill-review-digest（05-30）
- ten-critical-questions（05-31）
- wildlume-business-architecture（05-29）
- wildlume-business-reference（05-29）

---

## 本周修改的已有 Wiki 页面

- amazon-moc（2026-05-28 修改）

---

## 本周 Inbox Capture（4 条）

- Every Claude Code Hack I Know (March 2026).md（2026-05-30）
- 多 Agent 的本质不是分工，而是注意力治理.md（2026-05-30）
- vault-maintenance-backlog-2026-06-01.md（2026-06-01）
- review-digest-2026-06-01.md（2026-06-01）

---

## 整体评估

**现阶段 vault 处于健康的"初建爆发期"**：75 个 wiki 页面，孤岛率 0%，所有项目活跃，inbox 不积压。

本周的两个主要知识群：
1. **亚马逊运营体系**：12+ 页面系统化覆盖（选品、PPC、库存、定价、流量等）
2. **心智与育儿**：ernest-becker、yes-brain 系列、parenting-moc 等一批新页面——这是一次认知视角的主动扩展

**下一步建议**：
1. 为 ai / llm / agents 三个核心 tag 补充 MOC 导航页
2. 2 周后再运行 review-digest 观察修正频率
3. inbox 中的两篇 Claude Code 和多 Agent 文章值得蒸馏进 wiki
