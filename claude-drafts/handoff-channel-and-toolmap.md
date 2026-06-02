---
type: handoff
from: chat-claude
to: codex
task: handoff 通道收敛到 claude-drafts（改通道 + 退役 .tmp-claude-reports）+ design-principles 第三层映射
created: 2026-06-02
updated: 2026-06-02
---

# Handoff — 三件事（A 改通道 / B 补宪法映射 / C 退役 .tmp-claude-reports）

> 你能从 `claude-drafts/` 读到这份,就证明这个通道可用(可见 + Obsidian 同步 + 在 mini 上)。总目标:把 agent 间 handoff 通道**收敛成 `claude-drafts/` 一个**,退役隐藏且单机的 `.tmp-claude-reports/`。

## 任务 A：handoff 落点改到 claude-drafts

**A1.** 根 `CLAUDE.md`「智能层分工与 handoff 约定」节:把两处落点
`.tmp-claude-reports/handoff-{task}.md` → `claude-drafts/handoff-{task}.md`,
`.tmp-claude-reports/result-{task}.md` → `claude-drafts/result-{task}.md`。

**A2.** `.gitignore` 的 claude-drafts 段(现为 `claude-drafts/*` + `!claude-drafts/README.md`),在 README 行后补两行,让 handoff/result 入 git(供 Codex glob 发现 + 跨机同步 + 不丢):
```
!claude-drafts/handoff-*.md
!claude-drafts/result-*.md
```
该段注释由"仅跟踪 README"更新为"跟踪 README + handoff-*/result-*"。

## 任务 B：design-principles 第三层智能层映射补 Codex + chat-Claude

**目标**:`design-principles.md` 第三层「当前三层的具体工具」的智能层映射现在只列 **Claudian + Hermes**,补进 **Codex / Claude Code** 和 **chat 里的 Claude**,与根 `CLAUDE.md`「智能层分工与 handoff 约定」节一致。

**约束**:第三层(「变」层)更新——不动第一/二层逻辑,**不触 v2.7 gate**;宪法只放角色映射,操作细节指向根 `CLAUDE.md` 该节、不重复;**先读**当前智能层那段(原文 `**智能层 = Claudian（vault 内）+ Hermes Agent（vault 外）**` 起)再整合。

**文案**(措辞按宪法风格微调)——智能层四角色协作,接口分两类(inbox + handoff 文件):
- **Claudian**(Obsidian 内)—— vault 内深加工:distill / mirror / propagation / reflect。
- **Codex / Claude Code**(mini,原生 shell/git/python/文件)—— 默认执行者:脚本、git、批量/结构性/大文件改动、落地已定方案;优先一处闭环(设计→执行→自检)。
- **chat 里的 Claude**(claude.ai,有 web + 跨会话 memory)—— 按需顾问(Haopeng 主动 pull):web 研究、独立评审、开放式策略;不接 vault 批量/重活。
- **Hermes**(mini,gateway + cron)—— vault 外信号采集 + 定时自动化,只写 inbox。

接口:Hermes↔Claudian 走 **inbox/**;Codex↔chat-Claude 走 **handoff 文件**(细节见根 `CLAUDE.md` 该节,宪法不重复)。

## 任务 C：退役 .tmp-claude-reports/（收敛到单一通道）

**原则**:它里面的 draft/报告**都是 git 跟踪的**,`git rm` 后**历史永久保留**——溯源链在 git history 里,比留一个杂物文件夹更可靠。不做内容迁移。

**C1.** `grep -rn "tmp-claude-reports" .`(排除 .git)全 vault 找引用,逐处更新或删除:
- 根 `CLAUDE.md`(A1 已处理 handoff 段;若别处还有引用,一并改/删);
- `wiki/CLAUDE.md` §2.1 那句「`.tmp-claude-reports/` 存在但 git-ignored,作 Claude Code ↔ 主对话传输通道」→ 改为指向 `claude-drafts/`,或直接删(通道已收敛);
- `.gitignore` 里 `.tmp-claude-reports/*`、`.tmp-claude-reports/incoming-*/` 等那一组规则 → 删(文件夹退役)。

**C2.** 退役文件夹:`git rm -r .tmp-claude-reports`(跟踪文件,历史留底)→ 再 `rm -rf .tmp-claude-reports`(清未跟踪残余 + 目录)。若 `git rm` 因未跟踪/已改动报错,先 `git status` 看清、确认无在用内容,再用 `-f`。

**C3.** 不迁移内容;但若你扫到**确实还在用**的活草稿,单独 `git mv` 到 `claude-drafts/` 后再退役。

## 提交 + 回报

- A/B/C 一并 commit(mini,先 `git fetch origin && git merge origin/main`);push。
- 结果写到 `claude-drafts/result-channel-and-toolmap.md`(改了哪些文件/段、design-principles 版本号、`.tmp-claude-reports` 退役确认、commit hash),我复核。
