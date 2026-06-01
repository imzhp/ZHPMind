---
type: snapshot
created: 2026-06-01
tags:
  - system/maintenance
---

# Vault 善后待办 — 旧结构孤儿内容迁移（2026-06-01）

reorg（课程/档案归入 `assets/`、amazon sources 由 qwei-v2 重指 v1）已完成并提交+推送。
以下是核查中发现的**旧结构遗留的孤儿内容**——不是废弃物，删了会丢知识。
每篇需判断：**平铺进 `wiki/pages/` / 归档 `archive/` / 已被取代**。建议作为独立一轮处理，别在疲劳收尾时批量扫。

## 1. 财务金三角集群（最完整的一组）

- `inbox/经营者的财务金三角.epub` — 原书（未蒸馏入库）
- `20.reading/经营者的财务金三角-蒸馏版.md` — 旧蒸馏版
- `30.areas/finance/Financial Golden Triangle/` — README / core-framework / intuitive-anchors / reading-guide / book-index（结构化笔记）
- 现状：index 无对应页，未进平铺 wiki。
- 建议：合并蒸馏为一个 `wiki/pages/financial-golden-triangle.md`（book 类，双栏映射），epub 进 `wiki/raw/assets/books/`。与 amazon 财务页（cashflow-roi / profit-analysis）有交叉，注意互链。

## 2. 何以为父（育儿书）

- `wiki/pages/books/何以为父-影响彼此一生的父子关系.md` + `书籍索引-何以为父系列.md`（旧 `books/` 子目录）
- inbox 育儿书 epub：`何以为父…epub`、`养育男孩.epub`、`如何让孩子自觉又主动….epub`
- 建议：`books/` 两篇按命名规范平铺进 `wiki/pages/` + 登记 index；epub 进 `assets/books/` 或留 inbox 待蒸馏。

## 3. wiki/pages 其余旧子目录（待查）

- `concept/`、`concepts/`、`method/`、`methods/` — 还没逐个看，可能有更多孤儿页。处理同上：平铺或归档，清空后删空目录。

## 4. index.md 漏登 + 重复键

- 漏登的已存在页：`critical-thinking-framework`、`critical-thinking-writing-speaking`、`obstacles-to-critical-thinking`、`ten-critical-questions`、`skill-adversarial-review`（约 5 个）
- frontmatter 有重复的 `updated:` / `最后更新` 键
- 建议：迁移完上面孤儿页后，一次性重生成 index（含新平铺进来的页），顺手去重键。

## 5. 同步冲突 / 重复副本

- `wiki/raw/多 Agent 的本质不是分工，而是注意力治理 1.md`（与无 1 版同为 11.34 KB）→ 已给 `git rm` 命令
- `inbox/多 Agent 的本质不是分工，而是注意力治理.md` — 与 wiki/raw 版重复（capture 残留，已进 raw 应清 inbox）。确认后删。

---

> 这些都需要你逐项判断（平铺 / 归档 / 取代），是认知循环的活，不是机械清理。下次开一轮专门做。
