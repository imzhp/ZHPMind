---
title: "Claude handoff for sheep archive distillation"
type: handoff
created: 2026-05-30
status: ready-for-claude-review
source: "https://pmthinking.notion.site/235de36086c6446ebf19d17fcbde8d78?v=2772f8e86e158019a4c7000ca06caf47"
---

# Claude Handoff: Sheep Archive Distillation Prep

这份文档是给 Claude 的交接说明。当前阶段的目标不是马上改写 ZHPMind 正式知识页，而是先理解 Codex 已经抓取了什么、哪些内容可信、哪些内容需要人工复核，然后为后续蒸馏做准备。

## 背景

用户想把公开 Notion 档案库 `sheep archive` 迁移到 ZHPMind。用户没有 Notion 原库导出权限，因此这次迁移只能基于公开页面抓取。

Codex 已按用户授权完成 raw-only 抓取。用户明确限制过：只允许写入 raw 源文件和迁移计划/审计文件，不允许直接修改正式 ZHPMind 页面。

## 当前写作边界

Claude 接手时请遵守这个边界：

- 可以阅读 `wiki/raw/assets/archives/sheep-archive-public/` 下的 raw 抓取内容。
- 可以阅读和补充 `projects/sheep-archive-migration/` 下的迁移计划、审计、蒸馏草稿。
- 不要直接修改 `wiki/pages/`。
- 不要直接修改 `people-moc.md`。
- 不要直接修改 `index.md`。
- 不要直接修改 `wiki/log.md`。
- 不要把 raw 内容直接搬成正式 wiki 页面；正式写入需要用户另行确认。

建议采用单写者协作方式：Claude 先做蒸馏准备和草稿，Codex 或用户后续再决定是否推进到正式 wiki。

## Codex 已抓取的内容

Raw 根目录：

```text
wiki/raw/assets/archives/sheep-archive-public/
```

迁移项目目录：

```text
projects/sheep-archive-migration/
```

### 1. 主库索引

文件：

```text
wiki/raw/assets/archives/sheep-archive-public/sheep-archive-public-index.md
wiki/raw/assets/archives/sheep-archive-public/sheep-archive-public-index.json
```

内容：

- 公开 Notion database 的可见索引。
- 共发现 74 条主库人物/条目记录。
- 可见字段包括 `item`, `bio`, `meta`, `tags`, `twitter`, `site`, `birthday`, `cover`。
- 这里是入口索引，不是完整页面正文。

### 2. Meta 子页面

目录：

```text
wiki/raw/assets/archives/sheep-archive-public/subpages/
```

报告：

```text
projects/sheep-archive-migration/subpage-capture-report.md
```

内容：

- 从主库 `meta` 字段里发现的公开 Notion 子页面。
- 共抓取 40 个 raw 子页面。
- 抓取错误 0。
- 其中 13 个页面被标记为 `Needs Review`，因为公开抓取内容很短，需要人工确认是否本来就短，还是抓取器漏掉了懒加载内容。

### 3. 人物/数据库行详情页

目录：

```text
wiki/raw/assets/archives/sheep-archive-public/people-pages/
```

报告：

```text
projects/sheep-archive-migration/people-page-capture-report.md
```

内容：

- 这是 Notion database 每一行的详情页，也就是 URL 中带 `&p=<row-id>&pm=s` 的页面。
- 共抓取 74 个 raw 人物/行详情页。
- 抓取错误 0。
- 其中 4 个页面被标记为 `Needs Review`：
  - Cal Henderson
  - Edwards Deming
  - Jeff Atwood
  - Linus Lee

重要说明：之前用户指出类似 Steve Jobs 的详情页可能没抓到。后来已经补抓。示例：

```text
wiki/raw/assets/archives/sheep-archive-public/people-pages/06-史蒂夫-乔布斯.md
```

### 4. 深层内部链接页面

目录：

```text
wiki/raw/assets/archives/sheep-archive-public/deep-links/
```

报告：

```text
projects/sheep-archive-migration/deep-link-capture-report.md
projects/sheep-archive-migration/deep-link-final-audit.md
```

内容：

- Codex 从已经抓下来的 raw 页面中继续扫描内部 Notion 链接。
- 发现内部 Notion page id 总数：254。
- 当前已经落 raw 的 page id 总数：243。
- deep-link raw 文件数：127。
- 剩余不可抓 internal page id：14。

这 14 个剩余项已经重试过，公开 Notion API 没有返回可用 root page block，或拒绝请求。它们多半是 block anchor、残留链接、database/view 链接或非公开可加载页面。请在蒸馏时把它们视为缺口记录，而不是强行补写。

最终审计文件：

```text
projects/sheep-archive-migration/deep-link-final-audit.md
wiki/raw/assets/archives/sheep-archive-public/deep-link-final-audit.md
wiki/raw/assets/archives/sheep-archive-public/deep-link-final-audit.json
```

## 重要限制

这次不是 Notion 官方导出，因此 raw 内容有这些限制：

- 没有隐藏属性。
- 没有评论。
- 没有页面历史。
- 没有 owner-only 附件。
- 图片、cover、外部附件不保证完整。
- 公开页面短内容可能是原文就短，也可能是公开渲染限制导致。
- 不要把 raw 抓取当作 100% 完整 Notion 镜像。

## Claude 的第一步任务

请先不要写正式 wiki 页面。建议按下面顺序做准备：

1. 阅读迁移计划和三个审计报告：

```text
projects/sheep-archive-migration/migration-plan.md
projects/sheep-archive-migration/subpage-capture-report.md
projects/sheep-archive-migration/people-page-capture-report.md
projects/sheep-archive-migration/deep-link-final-audit.md
```

2. 建立一个蒸馏优先级清单，先不要改正式页面。建议输出到：

```text
projects/sheep-archive-migration/distillation-priorities.md
```

3. 优先处理高价值、资料较完整的人物/主题，而不是先处理短页面。

4. 把 `Needs Review` 页面单独列出来，不要混入正式蒸馏批次。

5. 对每个准备蒸馏的人物，先做 source map：

```text
人物名
- 主入口 raw: ...
- people page raw: ...
- subpages: ...
- deep links: ...
- external links: ...
- review flags: ...
```

## 建议的蒸馏批次

### Batch 1: Computing / Design / Human Augmentation

优先级最高，适合先进入 ZHPMind，因为和 AI、设计、工具思想、交互、个人知识系统的连接最强。

- Alan Kay
- Bret Victor
- Doug Engelbart
- Dieter Rams
- Ralph Ammer
- Ivan Zhao
- Josh Miller
- 史蒂夫 · 乔布斯

### Batch 2: Product / Founder / Business Judgment

适合沉淀产品判断、创业判断、组织判断。

- 段永平
- 张一鸣
- 黄峥
- Patrick Collison
- Brian Chesky
- 凯文凯利（KK）

### Batch 3: Arts / Philosophy / Orientation

适合更慢地蒸馏，避免变成普通人物传记。

- Edward Hopper
- René Girard
- Visakan Veerasamy
- Inge Druckrey
- Christopher Alexander
- Jonathan Blow

## 蒸馏格式建议

Claude 可以先为每个人物生成草稿，而不是正式 wiki 页面。草稿建议放在：

```text
projects/sheep-archive-migration/drafts/
```

建议每篇草稿包含：

```markdown
# 人物名

## 一句话定位

## 为什么进入 ZHPMind

## 核心思想

## 关键证据

## 与 ZHPMind 的连接

## 可引用原始材料

## 需要复核

## 不确定/不要过度推断
```

注意：`关键证据` 要引用 raw 文件路径，不要只给概括。`不确定/不要过度推断` 是必须项，因为这次抓取不是官方导出。

## Handoff

当前交接状态：

- Codex 已完成 raw-only 抓取。
- Codex 已完成深层内部链接追踪。
- 仍有 14 个公开接口不可抓页面，已记录在 final audit。
- 正式 ZHPMind 页面尚未改动。
- Claude 的下一步应该是蒸馏准备，而不是正式发布。

Claude 请先输出：

1. `distillation-priorities.md`
2. `source-map.md`
3. 第一批 3-5 个人物的草稿目录和样例

完成后再交回给用户确认是否进入正式 wiki rollout。
