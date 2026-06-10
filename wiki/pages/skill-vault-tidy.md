---
type: skill
title: vault-tidy
status: active
created: 2026-05-23
updated: 2026-06-10
tags:
  - system-skill
  - tool-hermes
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
- **关系**:接收 review-digest 固定路径 scanner JSON 作为输入,生成 tidy actions 输出到 vault
- **当前状态**:`status: active`——已部署到 Hermes 并注册成功(2026-06-02),首次 `--draft` dogfood 通过;`--apply` 暂被 Pitfall #4(scanner 缺 distill 字段)挡住,且需先有 <24h 新鲜 scanner JSON

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
| `--draft` | `claude-drafts/result-tidy-*.md`,vault 完全不动 | dogfood 模式:测 skill 本身行为,产物不进 vault |

## 跟 review-digest 的接口

vault-tidy **不重新扫描 vault**——读固定 JSON `~/.hermes/scratch/review-digest-latest.json` 作为输入,职责分清:

- **review-digest** = ground truth(看到了什么)
- **vault-tidy** = action plan(基于看到的做什么)

**24h 时间戳检查**:如果最新 scanner JSON 的 `scan_date` ISO 时间戳距今 >24 小时,vault-tidy **立即报错并退出**,提示先跑 `python3 ~/.hermes/scripts/review-digest-scan.py` 或 `~/.hermes/scripts/run-digest.sh`。避免基于过时数据生成 actions。

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
| 自递归(扫描时把 digest 自己也算上) | 输入是固定路径 scanner JSON,不重新扫描;天然规避自递归 |
| pyyaml 不可用 / grep 漏 alias / ctime 错 | 不读 vault 文件,所有数据来自 scanner JSON;天然规避底层陷阱 |

## 实战 Pitfalls(2026-06-02 部署 + 首次 --draft dogfood)

首次部署即注册失败,排查链:`status` 撞车 → gateway 重载方式 → 观测点不可靠;dogfood 用了 30h 陈旧 JSON,意外成了 24h gate 的活体验证。

| Pitfall | 性质 | 应对 |
|---|---|---|
| **#1 ZHPMind 的 `status: draft` 抄进执行体 frontmatter → Hermes skill loader 静默跳过、不注册** | 部署 / 平台陷阱 | 执行体 `~/.hermes/skills/vault-tidy.md` frontmatter **不带 `status` 字段**;draft 状态只留本反思页。对照:review-digest 无 status 故正常注册。已修(删该行)。 |
| **#2 `launchctl kickstart -k` 杀掉 gateway 后未及时恢复 → `hermes skills list` 空 → 误判"未注册"(假阴性)** | 操作陷阱 | 重载用**不带 `-k`** 的 `launchctl kickstart` + 轮询 `hermes skills list` 非空再判。 |
| **#3 本机观测点不可靠** | 平台陷阱 | `launchctl list` 会空 → 用 `launchctl print gui/$(id -u)/ai.hermes.gateway`;`hermes skills list \| tail -1` 抓 Rich 尾随空行 → 用 `tail -5`。 |
| **#4 scanner JSON 缺 distill 状态字段 → Tier 1「inbox 老化归档」核心条件"无 distill 痕迹"无法判定** | 设计缺陷(挡 --apply) | --apply 做 inbox 归档前**先扩展 review-digest scanner 增 distill 状态检测**;此前该 action 只能产"待人工确认"候选,不可自动执行。 |
| **#5 30h stale JSON 产生假阳性**(`critical-thinking-moc` 已存在却报候选、页数 57 vs 实际 70、已删的 `多 Agent…治理 1.md` 仍上榜) | 生成偏差(数据时效) | 24h gate 在 dry-run/apply 会中止(正确),draft 放行但产物不可 apply。**改进**:24h 警告触发时对所有 state-derived 结论(MOC 存在性 / 孤岛率 / 页数 / raw 清单)**统一降权**,而非零散 caveat——本次反在「已知局限 #4」声称候选"可信",过度自信。 |
| **#6 P1 管线死结**:vault-tidy 读 cron output + 24h 门，但 chat review-digest 不写 cron output | 架构陷阱 | 输入源改为 `~/.hermes/scratch/review-digest-latest.json`；任何时候可先跑 `python3 ~/.hermes/scripts/review-digest-scan.py` 刷新 |
| **#7 P2 skill 加载不可靠**:手动 `hermes chat` 可能加载内建 obsidian 而不是 review-digest | 路由陷阱 | 手动入口改用 `~/.hermes/scripts/run-digest.sh`，显式引用 `~/.hermes/skills/review-digest.md` |
| **#8 P3 上游假绿灯**:review-digest 把"本周修改页数"误当修正频率 | 上游语义漂移 | vault-tidy 只相信固定 JSON 内 `metrics.correction_frequency`；首轮 dogfood 中 vault-tidy 自身行为符合 spec，24h 门按设计拒绝 stale 数据 |

**dogfood 同时验证到位(正向)**:三档 scope 守住、**Tier 3 零违规**、诚实 caveat 段到位、sheep-archive-public(251 文件 100% 未引用)正确判为越界并交还人类、vault 零改动、24h gate 逻辑正确。

## 2026-06-10 维护记录

- 清理重复部署形态：删除 `~/.hermes/skills/vault-tidy/` 目录版，只保留权威单文件 `~/.hermes/skills/vault-tidy.md`
- 验证 `hermes chat -q` 可唯一读取 `vault-tidy` skill，`--draft` 输出边界仍为 `claude-drafts/result-tidy-{timestamp}.md`
- 再次确认 `--draft` 不允许修改 `wiki/pages`；Tier 3 对 `wiki/pages/*` 自动重写仍为硬拒绝

## 2026-06-10 dogfood 管线修复

首轮 dogfood 证明 vault-tidy 的三档 scope、Tier 3 拒绝、24h 新鲜度门和 `--draft` 边界均符合 spec；问题出在上游 review-digest 数据管线。修复后 vault-tidy 的输入从 cron output 目录切换为固定 JSON：

```text
~/.hermes/scratch/review-digest-latest.json
```

这让 review-digest 的 chat 运行、cron 运行和 vault-tidy 的 draft/apply 共享同一个确定性数据源。cron output 只保留为历史兼容，不再承担下游接口职责。

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
- **(挡 --apply)给 review-digest scanner 加 distill 状态字段**——见 Pitfall #4,是 inbox 老化归档安全自动执行的前置
- **--apply 端到端仍未验证**:首次 dogfood 是 --draft + stale 数据;需在 <24h 新鲜 scanner JSON 上跑 --dry-run 产 actionable plan,人勾选后再试 --apply

## References

- [[skill-review-digest]] — review-digest 反思页(诊断器对偶)
- [[design-principles]] — ZHPMind 设计宪法(AI 心法、AI 红线、Skill 系统设计三节)
- [[karpathy-claude-md]] — Karpathy 4 原则(Surgical Changes + Goal-Driven Execution 是 vault-tidy 设计基础)
- 执行体位置:`~/.hermes/skills/vault-tidy.md`
- scanner JSON 来源:`~/.hermes/scratch/review-digest-latest.json`
