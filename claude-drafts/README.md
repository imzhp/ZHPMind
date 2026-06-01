# claude-drafts — 跨机交接通道

跨机(mini ⇄ Air)的临时通道,走 Obsidian Sync 同步。

## 用途
- 一台起草 / 交接,另一台接力:冷启动 handoff、草稿、跨机传递。
- 与 `.tmp-claude-reports/` 的区别:后者点开头、**不跨机**(Obsidian Sync 跳过 vault 内 dotfolder),仅供同机 Claude Code ↔ 主对话临时传递;本目录无点、**跨机**。

## 纪律
- 这里装的是 transient 草稿,**不是知识**。git 只跟踪本 README,其余一律 ignore。
  - `.gitignore` 规则:`claude-drafts/*` + `!claude-drafts/README.md`
- 内容经人审定后才进 `wiki/pages/`(+ `raw/`)落库 —— 蒸馏优于存储。
- 测试 / 一次性标记用完即删。
