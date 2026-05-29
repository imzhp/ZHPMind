---
name: vault-tidy
description: vault 的执行器——基于 review-digest 的 scanner JSON 生成 tidy actions,在三档 scope + 三种模式下执行
trigger: vault tidy, vault 清理, tidy plan, inbox 整理, 归档老条目
created_by: human
version: 1.0
status: draft
---

# vault-tidy

vault 的执行器,跟 review-digest 是"诊断器 ↔ 执行器"对偶。review-digest 报状态,vault-tidy 基于状态生成 + 执行 tidy actions。

设计意图与完整原则见 vault 内反思页 `wiki/pages/skill-vault-tidy.md`。

## 输入(必读)

读 `~/.hermes/cron/output/4923ff1a9586/<最新>.md` 的 `## Script Output` 段(scanner JSON),解析出:
- inbox 文件列表 + 创建时间
- projects 子目录列表 + 最后修改时间
- wiki/pages 列表 + tag 分布
- 各文件 backlink 计数

**24h 时间戳检查**:如果 JSON 的 `scan_date` 字段距今 >24 小时,**立即报错并退出**,提示用户"先跑 `hermes chat -q '运行 review-digest'`"。**不要重新扫描 vault**——scanner 的唯一调用者是 review-digest。

## Scope(硬约束)

### Tier 1 — 允许的低风险 actions

1. **inbox 老化归档**:`inbox/*.md` 创建时间 >30 天且无 distill 痕迹的,move 到 `archive/inbox-{YYYY-MM-DD}/`
2. **projects 僵尸打标**:`projects/<dir>/` 内最后修改时间 >90 天的,在子目录 README.md 的 frontmatter 加 `status: dormant`,**不要 move 目录**
3. **MOC 草稿生成**:某 tag 被 ≥5 个 wiki/pages 引用但 vault 中无 `<tag>-moc.md`,在 `inbox/` 生成草稿 `<tag>-moc-draft.md`

### Tier 2 — 只报告,不动手

4. **wiki 孤岛清单**:列出 `wiki/pages/*.md` 中 backlink = 0 的页面,每个附 1-2 个建议归属(merge 候选 / archive)
5. **raw 未引用清单**:`wiki/raw/*.md` 中无被任何 page 引用的文件

### Tier 3 — 永不做(违反 = 立即拒绝并报告)

6. ❌ 自动 merge wiki pages
7. ❌ delete 任何 wiki/pages/*.md
8. ❌ 自动重写 wiki/pages/* 现有内容
9. ❌ 修改 vault 治理文件:design-principles.md / wiki/CLAUDE.md / wiki/pages/index.md / wiki/log.md

看到 Tier 3 的请求时,**立即拒绝**并告知用户"违反 vault-tidy 硬约束"。

## 执行模式

### `--dry-run`(默认)

产 `inbox/tidy-plan-{YYYY-MM-DD}.md`,格式如下:

```markdown
---
type: snapshot
source: hermes/vault-tidy
mode: dry-run
scanner-json-source: ~/.hermes/cron/output/4923ff1a9586/<file>.md
scanner-timestamp: <iso-8601>
created: {YYYY-MM-DD}
tags: [system/tidy]
---

# vault-tidy plan — {YYYY-MM-DD}

## Tier 1 候选 actions

- [ ] **inbox 归档**:列出每个 inbox 文件 + 创建日期 + 提议 destination
- [ ] **projects 僵尸**:列出每个 dormant project + 最后修改 + 提议加 `status: dormant`
- [ ] **MOC 草稿**:列出符合条件的 tag + 页数

## Tier 2 报告

### wiki 孤岛
- 文件名 | backlinks=0 | 建议归属
- ...

### raw 未引用
- 文件名 | 创建日期
- ...

## 已知局限

(列出本次产 plan 时 skill 未覆盖的边缘情况,诚实声明)

## 元数据

- vault-tidy 版本:1.0
- scanner JSON 时间戳:<...>
- 生成耗时:<...>
```

人在 plan 里勾选 ✅ 后,再跑 `--apply`。

### `--apply`

读取人勾选过的 `inbox/tidy-plan-{date}.md`,执行 ✅ 标记的 Tier 1 actions。

**每个 action 一个独立 git commit**,message 格式:

```
tidy: {action-type} - {summary}

Source: tidy-plan-{date}.md
Action: {detailed-description}
Scanner JSON: {timestamp}
```

每个 commit 之后立即 `git push origin main`。错误中断时止于当前 commit,不 rollback 已 push 的内容,在 `inbox/tidy-error-{timestamp}.md` 报告失败位置。

### `--draft`

dogfood 模式。所有输出写到 `.tmp-claude-reports/draft-tidy-{timestamp}.md`,**vault 完全不动**。用于测试 vault-tidy 本身行为。

## 行为约束

- **每个 action 必须可执行验证**:声明 ≠ 实现。如果声称"已归档 X 文件",必须真的存在新位置且原位置无残留
- **失败时止损**:任何步骤失败,立即停止后续 actions,产 `inbox/tidy-error-{timestamp}.md` 报告
- **不依赖 Curator**:dry-run/apply 自带 ground truth,不期待 Curator 维护
- **诚实 caveat**:每个 plan / apply 输出必须包含 "已知局限" 段

## 输出溯源

每个 action 在执行/计划时标注:
- `source`: review-digest cron output 路径 + 段落定位
- `model`: 调用 vault-tidy 的 Hermes 模型 + 时间
- `mode`: dry-run / apply / draft

## Pitfalls

(待首次 dogfood 后填,从 vault `wiki/pages/skill-vault-tidy.md` References 中的实战 Pitfalls 表同步)
