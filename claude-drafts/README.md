# claude-drafts — 跨机交接通道

跨机(mini ⇄ Air)的临时通道,走 Obsidian Sync 同步。

## 用途
- 一台起草 / 交接,另一台接力:冷启动 handoff、草稿、跨机传递。
- 本目录替代已退役的旧点目录:无点、可跨机同步,用于 Codex / Claude Code ↔ chat-Claude 的 handoff 与 result 文件。

## 纪律
- 这里装的是 transient 草稿,**不是知识**。git 跟踪本 README、`handoff-*.md`、`result-*.md`,其余一律 ignore。
  - `.gitignore` 规则:`claude-drafts/*` + `!claude-drafts/README.md` + `!claude-drafts/handoff-*.md` + `!claude-drafts/result-*.md`
- 内容经人审定后才进 `wiki/pages/`(+ `raw/`)落库 —— 蒸馏优于存储。
- 测试 / 一次性标记用完即删。
