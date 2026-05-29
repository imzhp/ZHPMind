---
type: skill
title: vault-tidy
status: draft
created: 2026-05-23
updated: 2026-05-23
tags:
  - system/skill
  - tool/hermes
references:
  - design-principles.md
  - skill-review-digest.md
  - karpathy-claude-md.md
---

# vault-tidy

vault 的「**执行器**」,跟 [[skill-review-digest|review-digest]] 是"诊断器 ↔ 执行器"对偶。在认知循环里,把「修正」环节从纯人工 → AI 辅助、人保留拍板权。对应 design-principles 第一层「健康度 = 流动性」——digest 看见梗阻,tidy 动手疏通。

## 是什么

- **执行体位置**:`~/.hermes/skills/vault-tidy.md`(单文件,跟 review-digest v4 同模式)
- **触发**:cron 周一 9:30(review-digest 9:00 之后半小时)+ on-demand `hermes chat -q "运行 vault-tidy"`
- **关系**:接收 review-digest 的 scanner JSON 作为输入,生成 tidy actions 输出到 vault
- **当前状态**:`status: draft`——反思页 + SKILL.md 已写,未部署到 Hermes,未跑过 dogfood

## Scope 三档

| 档位 | 动作 | 风险 | 默认模式 |
|---|---|---|---|
| **Tier 1(低风险,可自动)** | inbox 老化归档(>30 天未蒸馏 → `archive/inbox-{date}/`);projects 僵尸打标(>90 天加 `status: dormant` frontmatter,**不 move**);MOC 草稿生成(tag ≥5 页未有 MOC) | 低 | dry-run → apply |
| **Tier 2(中风险,只报不动)** | wiki 孤岛归属建议(列出每个孤岛 + 建议 merge/archive);raw/ 未引用文件清单 | 中 | 仅 dry-run 产 report,人决定后手动处理 |
| **Tier 3(高风险,永不做)** | 自动 merge wiki pages;自动 delete 有 backlink 的页;自动重写 wiki 内容;改动 vault 治理文件(design-principles / CLAUDE.md / index / log)| 高 | ❌ 硬拒绝 |

**关键自律**:Tier 3 拒绝是硬约束——违反 v2.5「减优于加」+ v2.6「displacive 写入禁区」。SKILL.md 里作为 first-line 红线写入。

## 三种执行模式

把 v2.6「显式 `--draft` 一等公民」做实——dogfood 不是事后补丁,是设计 day 1 就有的 first-class mode。

| 模式 | 写哪里 | 用途 |
|---|---|---|
| `--dry-run`(默认) | vault `inbox/tidy-plan-{date}.md` | 标准用法:产计划,人审完再 apply |
| `--apply` | 真实 vault,每个 action = 1 个 git commit | 接受人在 plan 里勾选 ✅ 的项,真实执行 |
| `--draft` | `.tmp-claude-reports/draft-tidy-*.md`,vault 完全不动 | dogfood 模式:测 skill 本身行为,产物不进 vault |

## 跟 review-digest 的接口

vault-tidy **不重新扫描 vault**——读 `~/.hermes/cron/output/4923ff1a9586/<latest>.md` 的 `## Script Output` 段(scanner JSON)作为输入,职责分清:

- **review-digest** = ground truth(看到了什么)
- **vault-tidy** = action plan(基于看到的做什么)

**24h 时间戳检查**:如果最新 scanner JSON 的 `scan_date` 字段距今 >24 小时,vault-tidy **立即报错并退出**,提示"先跑 `hermes chat -q '运行 review-digest'`"。避免基于过时数据生成 actions。

**为什么不直接 invoke scanner**:避免跟 review-digest cron 产生 race;让 review-digest 保持 scanner 唯一调用者的清晰角色。这也对应 Karpathy「Surgical Changes」——vault-tidy 只动 vault-tidy 该动的事,不染指 scanner 的职责。

## AI 红线对接(v2.5 三条件)

- **溯源**:每个 action 标 `source = review-digest cron output 路径 + 段落定位 + Hermes 模型 + 时间`
- **互评**:plan 阶段过 cross-modal eval(至少两个模型对 plan 评分)
- **可回滚**:`--apply` 每个 action 对应一个独立 git commit,message 格式 `tidy: {action-type} - {summary}`,便于细粒度 revert

## 失败模式预防

借 review-digest v1→v4 的踩坑(含 2026-05-23 反思页查实新教训):

| review-digest 教训 | vault-tidy 怎么避 |
|---|---|
| **scanner.py 位置在 `scripts/` 不在 `skills/`**(2026-05-23 查实) | vault-tidy 文档明示:不写自己的 scanner;只读 review-digest 的 scanner JSON。所有路径精确引用实际文件名 |
| changelog 命名漂移(scanner vs scan) | SKILL.md 里所有脚本路径用"实际文件名"而非"语义命名",避免文档跟实现漂移 |
| 两版本并存是遗留不是设计 | 单文件结构从 day 1,不允许后续升级到目录式 |
| `created_by` 不被 Curator 用 | 不依赖 Curator,dry-run/apply 分离自带 ground truth |
| 自递归(扫描时把 digest 自己也算上) | 输入是 scanner JSON,不重新扫描;天然规避自递归 |
| pyyaml 不可用 / grep 漏 alias / ctime 错 | 不读 vault 文件,所有数据来自 scanner JSON;天然规避底层陷阱 |

## 触发节奏

| 频率 | 内容 |
|---|---|
| 周一 9:00 | review-digest cron(已有) |
| 周一 9:30 | vault-tidy cron 自动 `--dry-run`,产 `inbox/tidy-plan-{date}.md` |
| 周日(人) | 看 tidy-plan,勾选要 apply 的项,可选 `--apply` |
| 临时 | `hermes chat -q "运行 vault-tidy"` |

## 待解决问题

- **24h 检查太严还是太松**:某些场景(度假回来一周后)24h 不够,可能需要可配置阈值
- **`--apply` 的安全网**:即便 git commit 可回滚,某些 action(如 inbox 归档)涉及大量文件移动,error recovery 模式没设计
- **跟 Curator 的对接**:Curator 可能合并/重命名 skill 文件,vault-tidy 的输出引用如何稳定
- **Tier 2 的"建议"输出格式**:用什么 markdown 结构让 review 最快?待 dogfood 检验
- **多次 `--draft` dogfood 之间**:产物如何避免冲突(用时间戳还是序号?)
- 留 placeholder 等首次 dogfood 后填实战 Pitfalls

## References

- [[skill-review-digest]] — review-digest 反思页(诊断器对偶)
- [[design-principles]] — ZHPMind 设计宪法(AI 心法、AI 红线、Skill 系统设计三节)
- [[karpathy-claude-md]] — Karpathy 4 原则(Surgical Changes + Goal-Driven Execution 是 vault-tidy 设计基础)
- 执行体位置:`~/.hermes/skills/vault-tidy.md`
- scanner JSON 来源:`~/.hermes/cron/output/4923ff1a9586/<latest>.md` 的 `## Script Output` 段
