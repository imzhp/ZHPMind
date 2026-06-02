---
type: result
from: codex
to: chat-claude
task: channel-and-toolmap
created: 2026-06-02
---

# Result — channel-and-toolmap

## 执行摘要

已按 `claude-drafts/handoff-channel-and-toolmap.md` 完成 A/B/C:

- handoff / result 通道从 `.tmp-claude-reports/` 改为 `claude-drafts/`
- `.gitignore` 改为跟踪 `claude-drafts/README.md`、`claude-drafts/handoff-*.md`、`claude-drafts/result-*.md`
- `design-principles.md` 第三层智能层映射补入 Codex / Claude Code 与 chat-Claude
- `.tmp-claude-reports/` 已退役:tracked 文件用 `git rm -r` 移除,未跟踪残余用 `rm -rf` 清理

## 主要改动

### A. handoff 落点收敛到 claude-drafts

- `CLAUDE.md`
  - `handoff-{task}.md` 落点改为 `claude-drafts/handoff-{task}.md`
  - `result-{task}.md` 落点改为 `claude-drafts/result-{task}.md`

- `.gitignore`
  - 删除 `.tmp-claude-reports/` 相关 ignore 规则
  - `claude-drafts/` 段改为跟踪 README + handoff/result 文件

### B. design-principles 第三层工具映射

- `design-principles.md`
  - 第三层「当前三层的具体工具」中,智能层从 `Claudian + Hermes` 扩展为:
    - Claudian
    - Codex / Claude Code
    - chat 里的 Claude
    - Hermes
  - 仅修改第三层「变」层,不动第一/二层逻辑,不触 v2.7 gate
  - 操作细节指向根 `CLAUDE.md`「智能层分工与 handoff 约定」

当前 `design-principles.md` 行数:552,低于 600 soft limit。

### C. 退役 .tmp-claude-reports

- `.tmp-claude-reports/` 已不存在
- 18 个 tracked 文件已通过 `git rm -r .tmp-claude-reports` 从索引移除
- 未跟踪残余目录已清理
- 不做内容迁移;旧草稿通过 git history 保留

## 旧引用处理

已将正式页面中的旧草稿路径改成「历史草稿,见 git history」语义,避免退役目录后形成正文死链接。

保留项:

- `claude-drafts/handoff-channel-and-toolmap.md` 内仍含旧路径,因为它是本任务说明本身
- `wiki/log.md` 内仍含旧路径,因为 `wiki/log.md` 是 append-only 历史日志,按规则不编辑旧记录

## 额外纳入

`.gitignore` 放开后,以下 handoff 文件进入可跟踪状态:

- `claude-drafts/handoff-2026-06-01-mcp-stabilization.md`
- `claude-drafts/handoff-channel-and-toolmap.md`
- `claude-drafts/handoff-git-history-cleanup-2026-06-01.md`

## Commit

Commit hash: 30c70d197a14565ae76ae58e74cc99f35542ab15
