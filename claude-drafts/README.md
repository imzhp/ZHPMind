# claude-drafts — 历史交接与专用 staging

跨机(mini ⇄ Air)的临时通道,走 Obsidian Sync 同步。

## 用途
- 保留已有交接记录和 book-mirror 专用 staging，不因目录存在自动恢复旧任务。
- 普通个人笔记留在笔记区；复用模板存放于 `templates/`。同一任务能完成的工作，不另造 handoff/result 对。
- 本目录替代已退役的旧点目录:无点、可跨机同步,用于 Codex 与其他本地执行面之间的 handoff 与 result 文件；目录名只保留历史兼容性。

## 纪律
- 这里装的是 transient 草稿,**不是知识**。git 跟踪本 README、`handoff-*.md`、`result-*.md`,其余一律 ignore。
  - `.gitignore` 规则:`claude-drafts/*` + `!claude-drafts/README.md` + `!claude-drafts/handoff-*.md` + `!claude-drafts/result-*.md`
- 专项草稿按相应任务的审批与入库规则处理；普通保存不需要经过这里，也不要求蒸馏。
- 历史草稿不自动清理，移动或删除前核对范围与引用。
