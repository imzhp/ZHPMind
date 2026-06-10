# digest 管线确定性化执行回执

日期：2026-06-10

## 结论

已按 `handoff-digest-pipeline.md` 完成七步修复，并复跑 dogfood。

本次核心变化：

1. scanner 写固定路径 JSON，成为 review-digest / vault-tidy 的唯一数据源。
2. review-digest skill 改为先执行 scanner，再只读固定 JSON。
3. vault-tidy skill 改为只读固定 JSON，不再读 cron output。
4. 指标定义内联到 scanner JSON 与 review-digest skill 文本。
5. 纠偏 2026-06-10 污染 digest 与 changelog。
6. P1/P2/P3 Pitfalls 写入两个 skill 反思页。
7. 复跑 `vault-tidy --draft` dogfood，产物供二轮评审。

## 1. scanner 固定 JSON

修改：

- `~/.hermes/scripts/review-digest-scan.py`

新增固定输出：

```text
~/.hermes/scratch/review-digest-latest.json
```

行为：

- stdout 仍输出完整 JSON，兼容 cron 旧链路。
- 同一份完整 JSON 原子写入固定路径：先写 `.tmp`，再 `os.replace`。
- 顶层新增：
  - `scan_date`：ISO timestamp
  - `scan_day`：`YYYY-MM-DD`
  - `json_output_path`
  - `metric_definitions`
  - `vault_metadata.initial_build_phase`

验证：

```text
scan_date 2026-06-10T18:39:59.756952
scan_day 2026-06-10
correction_frequency 0 red bootstrap True
orphans 0 114 0.0
inbox 5 system_excluded 11
weekly_activity 33 28
raw_unref 2 8
```

正式 scanner 后续由 `run-digest.sh` 再刷新一次，dogfood 使用的固定 JSON 时间戳为：

```text
2026-06-10T18:40:28.664959
```

## 2. review-digest skill

修改：

- `~/.hermes/skills/review-digest.md`

关键约束已写入 skill：

- 第一步执行：

```bash
python3 ~/.hermes/scripts/review-digest-scan.py
```

- 只读取：

```text
~/.hermes/scratch/review-digest-latest.json
```

- 禁止 agent 自行用 `find/stat/ls/rg/execute_code/临场 Python` 重新统计指标。
- 禁止把"本周修改页数"当成"修正频率"。
- changelog 只追加，不 patch 既有条目。

## 3. vault-tidy skill

修改：

- `~/.hermes/skills/vault-tidy.md`

输入源已从 cron output 改为：

```text
~/.hermes/scratch/review-digest-latest.json
```

24h 门保留。过期恢复指引改为：

```bash
python3 ~/.hermes/scripts/review-digest-scan.py
```

或：

```bash
~/.hermes/scripts/run-digest.sh
```

## 4. 手动入口

新增：

```text
~/.hermes/scripts/run-digest.sh
```

作用：

1. 先运行正式 scanner，刷新固定 JSON。
2. 再用显式 skill 文件路径调用 Hermes：
   - `~/.hermes/skills/review-digest.md`

判断：采用薄包装方案，不放入 mac-sync。本次 `~/.hermes` 是 Hermes 应用态配置，mac-sync 当前只版本化 watcher 类脚本；此处用回执记录路径与行为。

## 5. 数据纠偏

已覆盖：

```text
inbox/review-digest-2026-06-10.md
```

污染点已纠正：

- Inbox 积压从污染版 `16 条` 改为固定 JSON 的 `5 条`，系统快照排除 `11 条`。
- 修正频率从污染版 `7 天 / 34 页 / 警报解除` 改为 spec 定义：

```text
修正频率（30 天） = 0 页
```

- 语境说明：当前 `initial_build_phase = true`，0 是初建期结构性结果，不等于认知僵化。
- 正式 scanner 验证孤岛率：

```text
0.0%（0/114 页）
```

changelog 处理：

- 未 patch 旧污染条目。
- 追加了同日更正：

```text
## [2026-06-10] review-digest | 更正

- 覆盖 inbox/review-digest-2026-06-10.md：基于正式 scanner 固定 JSON 重新生成完整快照
- 数据摘要：114 wiki 页、0 孤岛、0 僵尸项目、1 MOC 候选（wildlume）、🔴 修正频率 0（初建期语境）、🔴 raw 未引用率 25%（2/8 顶层文件）
```

## 6. Pitfalls 入反思页

已更新：

- `wiki/pages/skill-review-digest.md`
- `wiki/pages/skill-vault-tidy.md`

写入的三条：

- P1 管线死结：chat review-digest 不写 cron output，而 vault-tidy 只读 cron output + 24h 门。
- P2 skill 加载不可靠：手动 `hermes chat` 可能加载内建 obsidian，而非本地 review-digest。
- P3 指标定义漂移 / 假绿灯：把"本周修改页数"误当修正频率。

vault-tidy 反思页同时注明：首轮 dogfood 中 vault-tidy 自身行为符合 spec，问题在上游数据管线。

## 7. dogfood 二轮评审产物

复跑命令：

```bash
hermes chat -q "请读取并严格执行 /Users/zhanghaopeng/.hermes/skills/vault-tidy.md，以 --draft 模式运行。固定 scanner JSON 位于 /Users/zhanghaopeng/.hermes/scratch/review-digest-latest.json；只读该 JSON，不要读取 cron output，不要重新扫描 vault。draft 产物写入 /Users/zhanghaopeng/Obsidian/ZHPMind/claude-drafts/result-tidy-{timestamp}.md。"
```

产物：

```text
claude-drafts/result-tidy-2026-06-10T104423.md
```

dogfood 证据：

- Hermes 正确加载 `vault-tidy` skill。
- Hermes 只读取固定 JSON：

```text
/Users/zhanghaopeng/.hermes/scratch/review-digest-latest.json
```

- 没有读取 cron output。
- 没有重新扫描 vault。
- `--draft` 输出写入 `claude-drafts/`。

dogfood 结论：

- 24h 检查通过：scanner timestamp `2026-06-10T18:40:28.664959`
- Tier 1 候选：
  - 归档 `inbox/1随记.md` → `archive/inbox-2026-06-10/1随记.md`
  - 生成 `inbox/wildlume-moc-draft.md`
- Projects 僵尸：0
- Wiki 孤岛：0
- raw 未引用：2

## 当前文件状态

本回执写入前，vault 待 watcher 入库的文件包括：

```text
M changelog.md
M inbox/review-digest-2026-06-10.md
M wiki/pages/skill-review-digest.md
M wiki/pages/skill-vault-tidy.md
?? claude-drafts/handoff-digest-pipeline.md
?? claude-drafts/result-dogfood-vault-tidy-log.md
?? claude-drafts/result-tidy-2026-06-10T104423.md
```

本回执写入后还会新增：

```text
?? claude-drafts/result-digest-pipeline.md
```

下一步：移除临时 `.git/index.lock`，交给 ZHPMind auto-commit watcher 入库。
