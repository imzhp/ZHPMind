# ZHPMind auto-commit watcher 执行回执

日期：2026-06-10

## 结论

已按 `review-zhpmind-autocommit-feedback.md` 修复并执行到底。

完成项：

- 修复 watcher 脚本 2 个必修项 + 2 个建议项。
- 安装脚本到 `~/.mac-sync/bin/zhpmind-autocommit`。
- 安装 plist 到：
  - `~/.mac-sync/launchd/ai.zhpmind.autocommit.plist`
  - `~/Library/LaunchAgents/ai.zhpmind.autocommit.plist`
- 加载 launchd 任务 `ai.zhpmind.autocommit`。
- 验证 `.git/index.lock` 安全门。
- 执行真实测试 commit + push。
- 删除测试文件并再次由 watcher 自动 commit + push。
- mac-sync 新 watcher 文件已 commit + push。
- ZHPMind 根 `CLAUDE.md` 已落地 git 单写者规则。

## Review 修复

脚本修复点：

1. 修复 `.obsidian` 每日戳判断时机。
   - 在 `git add` 前捕获 `was_pure_obsidian`。
   - commit 成功后使用该变量写入每日戳。

2. 修复静默门被 `.obsidian` 运行时文件卡死。
   - `recent_file_changed()` 同时 prune `.git` 和 `.obsidian`。

3. 告警 frontmatter 改为：
   - `source: zhpmind-autocommit`

4. 修复 `pipefail + grep -q` 潜在误判。
   - `has_changes()` 改为判断 `git status --porcelain` 字符串非空。

静态检查：

```text
bash -n /private/tmp/zhpmind-autocommit
bash -n claude-drafts/review-autocommit/zhpmind-autocommit
plutil -lint /private/tmp/ai.zhpmind.autocommit.plist
plutil -lint claude-drafts/review-autocommit/ai.zhpmind.autocommit.plist
```

结果：全部通过。

## launchd 安装验证

安装位置：

```text
/Users/zhanghaopeng/.mac-sync/bin/zhpmind-autocommit
/Users/zhanghaopeng/.mac-sync/launchd/ai.zhpmind.autocommit.plist
/Users/zhanghaopeng/Library/LaunchAgents/ai.zhpmind.autocommit.plist
```

`launchctl print gui/501/ai.zhpmind.autocommit` 摘要：

```text
state = not running
runs = 5
last exit code = 0
run interval = 600 seconds
```

说明：这是短任务，每 10 分钟运行一次；当前 `not running` 正常，`last exit code = 0`。

## 安全门验证

首轮 kickstart 时，因工作区有最近 2 分钟内修改的文件，静默门正确跳过：

```text
2026-06-10 17:29:25 skip: working tree has changes and files modified within last 2 minutes
2026-06-10 17:30:25 skip: working tree has changes and files modified within last 2 minutes
```

临时创建 `.git/index.lock` 后再次 kickstart，安全门正确跳过：

```text
2026-06-10 17:31:26 skip: git operation marker exists: /Users/zhanghaopeng/Obsidian/ZHPMind/.git/index.lock
```

验证后已移除 `.git/index.lock`。

## 真实测试 commit + push

测试文件：

```text
inbox/autocommit-test-2026-06-10.md
```

第一笔 watcher 自动提交并 push：

```text
119203e auto: 2026-06-10 17:34 5 files
```

日志证据：

```text
2026-06-10 17:34:55 pull --rebase --autostash ok
2026-06-10 17:34:56 commit ok: auto: 2026-06-10 17:34 5 files
2026-06-10 17:34:59 push ok
```

随后删除测试文件，第二笔 watcher 自动提交并 push：

```text
c29c823 auto: 2026-06-10 17:37 1 files
```

日志证据：

```text
2026-06-10 17:37:43 pull --rebase --autostash ok
2026-06-10 17:37:43 commit ok: auto: 2026-06-10 17:37 1 files
2026-06-10 17:37:47 push ok
```

清理后 ZHPMind 状态：

```text
## main...origin/main
HEAD...origin/main = 0 0
```

## mac-sync commit + push

mac-sync 提交：

```text
7f73ea0 feat: add ZHPMind auto-commit watcher
```

说明：

- 初次 push 时远端领先，被拒绝。
- 已执行 `git pull --rebase origin main`。
- rebase 后 push 成功。

mac-sync 状态：

```text
## main...origin/main
HEAD...origin/main = 0 0
```

## CLAUDE.md 更新

已落地 git 单写者规则：

- 日常 commit / push 由 Mac mini auto-commit watcher 统一执行。
- Claudian / Hermes / Codex 日常操作默认不手动 commit / push。
- Codex 只有在明确 handoff 要求 git 步骤时例外操作，并需确认 watcher 安全门。
- Air clone 只读，push 禁用或应禁用。
- 回滚粒度改为 watcher 批次，不再宣称每次 AI 写入一个 commit。

## 当前最终状态

ZHPMind watcher 已安装、已加载、已实测 commit + push。

注意：本回执文件更新发生在上述两笔测试提交之后，将由刚安装的 watcher 在下一轮自动提交并 push。
