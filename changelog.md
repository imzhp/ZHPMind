     1|# ZHPMind Changelog
     2|
     3|> AI agent（Hermes / Claudian）每次写入 vault 时追加记录。规范见 design-principles.md。
     4|
     5|## [2026-05-12] review-digest | 健康度周报
     6|
     7|- 更新 inbox/review-digest-2026-05-12.md（本周快照：27 wiki 页、1 孤岛、5 MOC 候选、🔴 修正频率为零）
     8|
     9|

## [2026-05-13] review-digest | 周报

- 新建 inbox/review-digest-2026-05-13.md（覆盖式写入，快照语义）

## [2026-05-18] review-digest | 健康度周报

- 新建 inbox/review-digest-2026-05-18.md

## [2026-05-25] review-digest | 健康度周报

- 新建 inbox/review-digest-2026-05-25.md（覆盖写入，快照语义）


## [2026-05-25] review-digest | 健康度周报

- 新建 inbox/review-digest-2026-05-25.md（覆盖写入，快照语义）

## [2026-05-30] distill | karpathy-llm-wiki-vs-zhpmind → html-artifacts-presentation-layer

- 新建 wiki/pages/html-artifacts-presentation-layer.md（concept，蒸馏自 raw/karpathy-llm-wiki-vs-zhpmind.md；该 raw 由孤儿转为被引用源）
- 更新 wiki/pages/index.md（Concepts & Methods 新增条目，页数 50→51）

## [2026-05-30] vault-tidy | raw 引用审计后续

- 更新 wiki/pages/skill-review-digest.md（健康度指标表 + Pitfalls 表各加一行：raw 未引用率）
- 更新 ~/.hermes/scripts/review-digest-scan.py（新增 scan_raw_unreferenced，挂入 metrics）
- 丢弃 wiki/raw/Obsidian + Claude Code…第二大脑（全教程）.md（外部入门剪藏，已被超越；由 Haopeng 执行 git rm）
- raw 审计完整记录见 .tmp-claude-reports/draft-raw-audit-2026-05-30.md
