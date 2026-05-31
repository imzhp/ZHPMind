---
type: skill
title: review-digest
status: active
created: 2026-05-11
updated: 2026-05-23
tags:
  - system/skill
  - tool/hermes
references:
  - "~/.hermes/skills/review-digest/SKILL.md"
  - "~/.hermes/skills/review-digest/references/"
---

# review-digest — Skill 反思页

> 这是 ZHPMind 里第一篇 skill 反思页，落地 design-principles 第二层的「Skill 系统设计」原则：skill 执行在智能层（`~/.hermes/skills/`），设计意图与演化记录在存储层（`wiki/pages/skill-{name}.md`），两层通过 skill name 关联。

## 设计意图

review-digest 是 ZHPMind 的**健康度周报**。它扫描 vault 自身，产出一份结构化摘要到 `inbox/`，让每周 review 时一眼看到系统状态。

这是 design-principles 第一层「认知循环」里 review 环节的自动化体现——人不可能每次手动扫 vault，需要 skill 把「看到系统当前状态」这件事自动化。

**为什么产出位置选在 `inbox/` 而不是 `outputs/`**：digest 是信息三态中的**快照类**（`type: snapshot`），不是对外输出，应该进入下一轮 review 的待消化队列。这跟 design-principles 第一层「信息三态」一致：快照 → version + archive，由更新的快照替代旧快照。

## 健康度指标对应

| 指标 | 警戒 | 对应 design-principles |
|---|---|---|
| inbox 积压 | >50 🔴 | 「消化得过来吗？」 |
| wiki 孤岛率 | >30% 🔴 | 「有连接吗？」 |
| projects 僵尸率 | >50% 🔴 | 「有完结吗？」 |
| 本周 capture | — | 「有输入吗？」 |
| 本周活动 | — | 「在流动吗？」 |
| MOC 候选 | — | 「该聚合的聚合了吗？」 |
| 修正频率 | =0 🔴 | 「有修正吗？认知没僵化吧？」 |
| raw 未引用率 | >0 🟡 / >15% 🔴 | 「raw 是不是淤积了未蒸馏素材？」（inbox↔raw 生命周期）|

## 演化简史（v1 → v4）

5/11-5/13 期间快速演化的 4 个版本。**真正驱动这些演化的不是 Curator**（Curator 截至 5/19 总共才跑过 1 次），而是 **skill_manage 在主对话期间的迭代**：每次跟 Hermes 谈"扫描 vault 健康度"任务时，`creation_nudge_interval` 触发后台 skill review，Hermes 通过 skill_manage 更新文件，每次自动留 `.bak`。

| 版本 | 时间 | 关键改动 |
|---|---|---|
| v1.0 | 5/11 | 初版手写（单文件 `review-digest.md`） |
| v1.1 | 5/12 23:16 | 升级为目录格式（`review-digest/SKILL.md` + `references/`），首次加入 **Pitfalls 小节** |
| v2.0 | 5/12 23:46 | 排除 `source: hermes/*` 系统快照防自递归；MOC 检测从 `MOC-{tag}.md` 改为 `*-moc.md`（匹配 vault 实际命名）；🔴 必须附具体建议 |
| v3.0 | 5/13 00:18 | MOC 检测改用 wikilinks-as-source |
| v4.0 | 5/13 00:54 | changelog 声明「架构重构：scanner.py 分离」——**但 scanner.py 实际未落地** |

## 当前状态（两版本并存）

`~/.hermes/skills/` 下并存两份 review-digest：

```
~/.hermes/skills/
├── review-digest/              ← 目录形态（v1.1）
│   ├── SKILL.md                ← 当前实际内容
│   └── references/
│       ├── backlink-scanner.md
│       └── yaml-lite-parser.md
├── review-digest.md            ← 单文件遗留（v4 changelog）
├── review-digest.md.v1.bak
├── review-digest.md.v2.bak
└── review-digest.md.v3.bak
```

哪个被 Hermes 实际加载，运行时观察即可（看 digest 产出 frontmatter 是否包含 changelog 字段、🔴 是否附建议等）。Curator 的 Consolidation Pass 看到的是「1 agent-created skill」（单数），所以 Hermes 内部只识别一个 review-digest，重复版本可能在未来 Curator pass 中被合并。

**2026-05-23 运行时观察结论**：cron output（`~/.hermes/cron/output/4923ff1a9586/`）显示 5/13 起跑的是 **v4 单文件**（prompt 含 scanner JSON 的 `## Script Output` 段），v1.1 目录形态从 5/13 起未再被调用。两版本并存确实是历史遗留，可考虑清理（目录式 v1.1+ 3 个 .bak）。

## 实战 Pitfalls

这些是 skill 真正变"聪明"的部分——每条都是被 fix 过的踩坑记录，比方法论更有价值。

| Pitfall | 性质 | 应对 |
|---|---|---|
| `python3 -c '...'` 触发审批门控 | 工具调用约束 | 把脚本写入 `/tmp/*.py`，用 `terminal('python3 /tmp/x.py')` 执行 |
| `pyyaml` 在沙箱不可用 | 环境约束 | 内联轻量 frontmatter 解析器，见 `references/yaml-lite-parser.md` |
| `grep -oh '[[...]]'` 漏 alias 形式 | 平台约束（macOS grep 单行） | Python `os.walk` + `re.findall` 全文扫描，见 `references/backlink-scanner.md` |
| 新建页面当天必然是孤岛 | 业务语义校准 | 报告中对「今日新建」的孤岛加注说明为预期状态 |
| macOS `ctime ≠ 创建时间` | 平台陷阱（iCloud vault 尤甚） | 用 `os.stat(fpath).st_birthtime`（macOS 专有）获取真实创建时间 |
| raw 引用多为 `raw/路径` 串 + frontmatter sources，少用 `[[]]`（2026-05-30 raw 审计） | 平台/业务语义校准 | scanner 不能只扫 `[[wikilink]]`；须同时匹配 basename(±ext)/子目录相对路径(±ext)/`raw/` 前缀串，否则真被引用的 raw 会被误判成孤儿 |

## 反思与未解决问题

**1. ~~changelog ≠ 实现状态~~ → 自我纠错（2026-05-23）**

> 此前（5/13-5/20）的判断：v4.0 的 changelog 写「scanner.py 架构重构」，但 `find ~/.hermes/skills/review-digest -name "*.py"` 找不到任何脚本文件，故推断“Hermes 在 changelog 里描述了一个意图但没真的落地”。

**这个判断错了**——scanner 实际落地在 `~/.hermes/scripts/review-digest-scan.py`（独立的 `scripts/` 目录，跟 `skills/` 平级，**不在** `skills/review-digest/` 子目录下）。`find` 命令查错位置。v4 changelog 不是空声明，准确反映了实现。

cron 输出文件（`~/.hermes/cron/output/4923ff1a9586/2026-05-13_00-21-37.md` 起）的 `## Script Output` 段含有完整 JSON 扫描结果，证实 scanner 自 5/13 起就在 production 跑。

**真正的教训反转**：cross-check 实际文件状态时，**不要只在 skill 自己的子目录里找**——Hermes 把可执行脚本放在 `~/.hermes/scripts/`，跟 `skills/` 平级。这是 Hermes 自身的目录分工（skill = 行为定义，scripts = 确定性逻辑），不是文档跟实现不一致。

**附：命名漂移（独立小 pitfall）**：v4 SKILL.md 内文用 `review-digest-scanner.py`（带 ner），cron config 和实际脚本是 `review-digest-scan.py`（无 ner）。功能不受影响（Hermes 通过 cron config 里的 `script` 字段 resolve），但是个值得记录的小 pitfall——LLM 自主维护的 skill 文档里的脚本命名跟实际文件不一致。

**2. Curator 的实际工作 vs 我对它的预期**

之前规划 Hermes 工具栈时，把 Curator 当成"skill 自我维护的主力"。实际上 Curator 是**很低频的后台 batch maintainer**——做合并、聚类、去重，不做单个 skill 的内容迭代。`run_count: 1` at 5/19 04:41，且结论是"无改动可做"。

修正后的角色分工写进了 design-principles v2.2「Skill 系统设计」第 5 条：**skill_manage 做迭代，Curator 做整理，两者不要混淆**。

**3. `created_by: human` 字段被 Curator 忽略**

SKILL.md v1.1 frontmatter 明明写 `created_by: human`，但 Curator 看到的是「1 agent-created skill」。Curator 的判断逻辑大概率是基于"是否在 `.bundled_manifest`"——不在 = agent-created，与 frontmatter 字段无关。

这意味着 design-principles 里 AI 红线的「溯源」原则在 skill 层级需要更细的颗粒度：bundled 溯源到上游 repo，agent-created 溯源到本机 `.bak` 链。`created_by` 这个 frontmatter 字段不被 Curator 使用，是个名义而非实质的标记。

**4. 两版本并存是历史遗留，不是设计**

目录形态（v1.1）和单文件（v4）并存是**演化过程中没清理的痕迹**。下次 Curator 跑 Consolidation Pass 时可能会处理，也可能不会（Curator 看到的是「1 skill」而不是「2 skill」，所以也许它根本不知道有重复）。

值得未来观察：如果 Curator 总是看到「1」，那么"两版本并存"是 Hermes 看得见的最终状态，需要手动决定哪个保留。

## References

- skill 执行文件：`~/.hermes/skills/review-digest/SKILL.md`
- 相关脚本/模板：`~/.hermes/skills/review-digest/references/`
- 单文件遗留：`~/.hermes/skills/review-digest.md`（实际为 v4 active，见 §1 纠错）
- **scanner 脚本（实际生效）**：`~/.hermes/scripts/review-digest-scan.py`（2026-05-23 补）
- 备份链：`~/.hermes/skills/review-digest.md.v[1-3].bak`
- Curator 日志：`~/.hermes/logs/curator/`
- design-principles 对应小节：「Skill 系统设计（从工具实践沉淀）」

## 元注

这份 wiki 页面本身就是 design-principles 第二层「Skill 系统设计」第 1 条「经验沉淀」原则的实例——它把 skill 的设计、演化、踩坑沉淀进了 vault。如果未来有第二个 agent-created skill 值得记录，应该按同样的模板再建一份 `skill-{name}.md`。
