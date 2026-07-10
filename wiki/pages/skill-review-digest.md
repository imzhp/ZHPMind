---
type: skill
title: review-digest
status: active
created: 2026-05-11
updated: 2026-07-10
tags:
  - system-skill
  - tool-hermes
sources: []
source_count: 0
discussions: []
references:
  - "~/.hermes/skills/review-digest/SKILL.md"
  - "~/.hermes/scripts/review-digest-scan.py"
  - "~/.hermes/scripts/run-digest.sh"
---

# review-digest — Skill 反思页

`review-digest` 是 ZHPMind 的健康度周报：确定性 scanner 负责事实，Hermes 只负责把固定 JSON 解释成可读快照。它对应认知循环里的 review，而不是另一个自由发挥的知识加工器。

## 设计意图

- 让每周 review 先看到真实的积压、连接、项目、修正和 raw 状态。
- 让下游 [[skill-vault-tidy]] 只读取同一份 scanner JSON，避免两个 agent 对 vault 重复统计。
- 将系统快照和人类 capture 分开，避免告警把 inbox 健康度伪装成知识积压。

## 当前状态

| 部件 | 权威实现 | 边界 |
|---|---|---|
| 扫描 | `~/.hermes/scripts/review-digest-scan.py` | 原子写 `~/.hermes/scratch/review-digest-latest.json` |
| 格式化 | `~/.hermes/skills/review-digest/SKILL.md` | 只读 JSON，不临场重扫 |
| 手动入口 | `~/.hermes/scripts/run-digest.sh` | 先刷新 scanner，再调用 skill |
| 定时入口 | Hermes cron `review-digest`，每周一 09:00 | 写 `inbox/review-digest-{date}.md` |

2026-07-10 已迁为目录式 skill，并通过 `hermes skills list` 发现。Markdown、EPUB、PDF、DOCX 都计入人类输入；`system-alert` 标签的 snapshot 与 `source: hermes/*` 快照都不再计入 inbox 积压或 weekly capture。

## 实战 Pitfalls

| Pitfall | 性质 | 应对 |
|---|---|---|
| 扁平 `.md` 可被 cron 绝对路径读取，却不会被正常技能发现 | 运行入口分叉 | 只保留目录式 `review-digest/SKILL.md`，cron 和包装脚本也指向它 |
| chat 运行与 cron 输出不是同一数据面 | 数据漂移 | 下游只读固定 JSON，不读 cron stdout |
| 系统告警被当成未蒸馏输入 | 指标失真 | scanner 按 `source: hermes/*` 与 `type: snapshot` + `system-alert` 排除 |
| `hermes cron list` 误报 gateway 未运行 | 观测误导 | 以 `launchctl print gui/$(id -u)/ai.hermes.gateway` 判断服务状态 |

## 演化简史

| 版本 | 时间 | 关键改动 |
|---|---|---|
| v4.1 | 2026-06-10 | scanner 固定 JSON 成为唯一数据源 |
| v4.2 | 2026-07-10 | 迁入目录式 skill；修正系统告警计数 |

## References

- 执行体：`~/.hermes/skills/review-digest/SKILL.md`
- scanner：`~/.hermes/scripts/review-digest-scan.py`
- 下游：[[skill-vault-tidy]]
- 原则：[[skillification]]、design-principles「review」与「健康度」
