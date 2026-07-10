---
type: skill
title: vault-tidy
status: active
created: 2026-05-23
updated: 2026-07-10
tags:
  - system-skill
  - tool-hermes
sources: []
source_count: 0
discussions: []
references:
  - "~/.hermes/skills/vault-tidy/SKILL.md"
  - "~/.hermes/scratch/review-digest-latest.json"
---

# vault-tidy — Skill 反思页

`vault-tidy` 是 [[skill-review-digest]] 的执行器：周报说明哪里可能堵塞，它只基于同一份固定 JSON 生成或执行低风险动作。它不是全库重写器。

## 设计意图

- 把“看见问题”转化为可审的清理计划。
- 限制自动化的权限，宁可报告也不越界改知识正文。
- 让 MOC 候选基于实际语义覆盖判断，避免把 tag 数量误当作建页理由。

## 当前状态

执行体为 `~/.hermes/skills/vault-tidy/SKILL.md`，已被 Hermes 发现；它是 on-demand skill，**没有 cron**。2026-07-10 从扁平文件迁入目录式结构，`--apply` 不再自行 commit 或 push，统一交给 vault 的 auto-commit watcher。

## Scope 三档

| 档位 | 动作 | 处理 |
|---|---|---|
| Tier 1 | 老 inbox 归档、项目 dormant 标记、MOC 草稿 | 先 plan，人勾选后才 apply |
| Tier 2 | wiki 孤岛、raw 未引用 | 只报告，不动手 |
| Tier 3 | merge/delete/rewrite wiki、修改治理文件 | 永远拒绝 |

## 输入与模式

- 唯一输入：`~/.hermes/scratch/review-digest-latest.json`；超过 24 小时立即退出。
- `--dry-run`：在 `inbox/` 生成可审 plan。
- `--draft`：只写 `claude-drafts/result-tidy-*.md`，用于 dogfood。
- `--apply`：仅执行人勾选的 Tier 1 项，保留 diff 给 watcher 入库。

## 实战 Pitfalls

| Pitfall | 性质 | 应对 |
|---|---|---|
| 两个 agent 各自扫描 vault | 数据口径漂移 | 只读 review-digest 固定 JSON |
| 同名 MOC 不存在就盲目新建 | 导航膨胀 | 先判断语义相关 MOC 是否已实质覆盖 tag 页面集合 |
| `--apply` 自行 commit/push | 多写者冲突 | 只写文件，交给 watcher 统一入库 |
| 扁平 skill 不被发现 | 注册不稳定 | 目录式 `SKILL.md` 为唯一执行体 |

## 演化简史

| 版本 | 时间 | 关键改动 |
|---|---|---|
| v1.1 | 2026-06-10 | MOC 候选加入语义覆盖判定 |
| v1.2 | 2026-07-10 | 迁入目录式 skill；取消自行 git 写入 |

## References

- 执行体：`~/.hermes/skills/vault-tidy/SKILL.md`
- 上游：[[skill-review-digest]]
- 原则：[[skillification]]、design-principles「减优于加」
