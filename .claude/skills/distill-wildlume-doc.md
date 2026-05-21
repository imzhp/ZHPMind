# Distill 曜野 Project 沉淀文档

> **触发场景**：当 `inbox/` 里出现来自「曜野」project 对话沉淀的 `.md` 文件时（文件名通常含"曜野"或某种 v1/v2 后缀），按本规范 distill 到 `wiki/pages/`。
>
> **使用方法**：在 Obsidian + Claudian 中，把目标文件移到 inbox/ 后，对 Claudian 说："按 distill-wildlume-doc 规范处理 inbox/ 里的曜野新文档"。

---

## 一、命名规范

- 英文小写+连字符
- 不带 v1/v2 等版本后缀（理解类文档 rewrite-friendly，由 git 管版本）
- 曜野业务相关用 `wildlume-` 前缀

### 已知/约定的命名映射

| 原文档主题 | 目标文件名 |
|---|---|
| 曜野业务架构 | `wildlume-business-architecture.md` |
| C 端反馈反哺机制设计-A 方向（产品/工厂）| `wildlume-feedback-product.md` |
| C 端反馈反哺机制设计-B 方向（Listing/分销商）| `wildlume-feedback-listing.md` |
| C 端反馈反哺机制设计-C 方向（选品）| `wildlume-feedback-selection.md` |
| C 端反馈反哺机制设计-D 方向（库存/采购）| `wildlume-feedback-inventory.md` |
| C 端反馈反哺机制设计-E 方向（定价）| `wildlume-feedback-pricing.md` |
| 曜野 Project 推进框架 | `wildlume-project-roadmap.md` |
| 曜野 ERP 整体架构 | `wildlume-erp-architecture.md` |
| 曜野协作工具策略 | `wildlume-collaboration-tools.md` |
| 曜野知识库架构 | `wildlume-knowledge-base.md` |
| 曜野 AI 应用图谱 | `wildlume-ai-map.md` |
| 曜野选品方法论 | `wildlume-product-selection.md` |
| 曜野标准化流程清单 | `wildlume-standard-processes.md` |
| 反哺机制完整闭环图 | `wildlume-feedback-loop-overview.md` |

不在表中的新主题：按 `wildlume-{topic-in-english-kebab}.md` 规则自创，并在本表追加记录。

---

## 二、Frontmatter 模板

```yaml
---
type: framework        # 或 concept / method（按文档性质选）
title: <中文标题>      # 和 H1 标题保持一致
aliases:
  - <中文别名>          # 至少 1 个；便于 wikilink 别名搜索
tags:
  - 业务/曜野           # 业务域，必带
  - <次级标签>           # 如 架构 / 反哺机制 / project-management / c端反馈
created: YYYY-MM-DD     # 文档原始沉淀日期，若未知用今日
source: 曜野 project 对话沉淀（Claude）
---
```

---

## 三、内容改写规则

### 必改

1. **H1 标题**：去掉版本后缀，和 frontmatter `title` 字段保持一致
   - `# 曜野业务架构 v1` → `# 曜野业务架构`

2. **文档级引用替换**：把指向**已存在** wiki/pages 文档的 `《xxx-v1》` / `《xxx》` 引用，替换为 `[[文件名|别名]]` wikilink
   - `《曜野业务架构-v1》` → `[[wildlume-business-architecture|曜野业务架构]]`
   - 替换前先确认目标 wiki 页面已存在；不存在的保留原文

3. **相邻 wikilink 加分隔**：原文中两个《》直接相连时，转换后在两个 `[[]]` 之间补顿号
   - `《A》《B》` → `[[a]]、[[b]]`

### 不要改

1. **描述性的 v1 / v2**：表达"当前版本 / 未来版本"语义的，保留原文
   - "业务架构 v1 没有把…" → 保留
   - "v2 应深挖" → 保留

2. **文档底部 `*文档版本：v1*` 标注**：原文档自带的版本元数据，保留

3. **章节结构、正文内容**：原文一字不动

4. **指向未生成文档的 《》引用**：保留原文（如《曜野 ERP 整体架构 v1》这种未来文档）

---

## 四、操作步骤

1. **读取** inbox/ 下的目标文件
2. **判断主题**，查命名映射表得到目标文件名（不在表里则按规则自创）
3. **生成 frontmatter**（按第二节模板）
4. **改写内容**（按第三节规则）
5. **写入** `wiki/pages/<目标文件名>`
6. **检查冲突**：若目标文件已存在，停下来询问用户（覆盖 / 重命名 / 跳过）
7. **删除** inbox/ 中的原文件
8. **git commit**：commit message 格式 `distill(wildlume): <中文标题>`

---

## 五、批量处理

若 inbox/ 里同时有多份曜野文档，按以下顺序处理：

1. 业务架构类（其他文档可能引用它）
2. 反哺机制各方向
3. Project 管理类
4. 其他

这样后处理的文档可以正确生成指向先处理文档的 wikilink。

---

## 六、自检清单（处理完一份后核对）

- [ ] frontmatter 有 type / title / aliases / tags / created / source 六个字段
- [ ] tags 包含 `业务/曜野`
- [ ] H1 标题与 frontmatter `title` 一致
- [ ] 文档底部和顶部的"版本说明"块保留
- [ ] 已替换的 wikilink 指向真实存在的 wiki/pages 文件
- [ ] 未替换的 《》 引用是有意保留（指向未生成文档或描述性引用）

---

*维护说明：本 skill 文件本身的设计意图和迭代记录应在 `wiki/pages/skill-distill-wildlume-doc.md` 中记录（按 design-principles 的 skillify 机制）。*
