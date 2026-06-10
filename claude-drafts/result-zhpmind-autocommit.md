# ZHPMind auto-commit watcher 执行回执

日期：2026-06-10

## 当前状态

已执行到 handoff 要求的 diff-first 审阅点，尚未落地安装，未 commit，未 push。

原因：

- handoff 明确要求 diff-first。
- `CLAUDE.md` 规则更新要求「diff 供 Haopeng 审后落」。
- watcher 安装需要写入 `~/.mac-sync/` 与 `~/Library/LaunchAgents/`，属于需要确认的系统级写入。

## 已完成

1. 读取 handoff：
   - `claude-drafts/handoff-zhpmind-autocommit.md`

2. 读取 mac-sync 现有约定与样式：
   - `~/.mac-sync/README.md`
   - `~/.mac-sync/CLAUDE.md`
   - `~/.mac-sync/bin/hermes-watchdog`
   - `~/.mac-sync/launchd/ai.hermes.watchdog.plist`

3. 确认 mac-sync 当前有 Hermes watchdog 先例：
   - `~/.mac-sync/bin/hermes-watchdog`
   - `~/.mac-sync/launchd/ai.hermes.watchdog.plist`
   - `~/Library/LaunchAgents/ai.hermes.watchdog.plist`

4. 生成 auto-commit watcher 审阅稿：
   - `/private/tmp/zhpmind-autocommit`
   - `/private/tmp/ai.zhpmind.autocommit.plist`

5. 生成 `CLAUDE.md` 审阅稿：
   - `/private/tmp/CLAUDE.md.zhpmind-autocommit.proposed`

6. 静态检查：
   - `bash -n /private/tmp/zhpmind-autocommit`：通过
   - `plutil -lint /private/tmp/ai.zhpmind.autocommit.plist`：通过

## watcher 设计摘要

脚本目标路径：

- `~/.mac-sync/bin/zhpmind-autocommit`

plist 目标路径：

- `~/.mac-sync/launchd/ai.zhpmind.autocommit.plist`
- 安装后复制到 `~/Library/LaunchAgents/ai.zhpmind.autocommit.plist`

运行频率：

- 每 10 分钟一次

安全门：

- `.git/index.lock`
- `.git/rebase-merge/`
- `.git/rebase-apply/`
- `.git/MERGE_HEAD`
- 工作区有改动且 2 分钟内有文件刚被修改

git 流程：

1. `git pull --rebase --autostash origin main`
2. 有改动则 `git add -A`
3. commit message：`auto: {YYYY-MM-DD HH:MM} {N} files`
4. commit body 写入 `git status --porcelain` 文件清单
5. `git push origin main`
6. push 失败后重试一次 `pull --rebase --autostash` + `push`
7. 再失败则写 `inbox/alert-git-autocommit-{YYYY-MM-DD}.md`

`.obsidian/` 降频策略：

- 若本轮改动仅有 `.obsidian/`，每天最多 auto-commit 一次。
- 若混有正文、wiki、inbox、claude-drafts 等内容，则随批次一起提交。

日志：

- `~/.mac-sync/zhpmind-autocommit.log`
- stdout：`~/.mac-sync/zhpmind-autocommit.stdout.log`
- stderr：`~/.mac-sync/zhpmind-autocommit.stderr.log`
- 日志保留最近 500 行。

## `CLAUDE.md` proposed diff 摘要

主要修改点：

- distill 工作流末尾从「最后 git commit」改为「交给 git 单写者机制入库」。
- 写入前自检加入 watcher 安全门意识。
- Git 操作纪律改为：
  - 日常 commit / push 默认由 Mac mini auto-commit watcher 执行。
  - Claudian / Hermes / Codex 日常操作不手动 commit / push。
  - Codex 仅在明确 handoff 要求 git 步骤时例外操作，并需检查 watcher 安全门。
  - Air clone 只读，push 禁用或应禁用。
  - 回滚粒度改为 watcher 批次，不再宣称每次 AI 写入一个 commit。

## 待确认后执行

如果 Haopeng 确认继续，下一步执行：

1. 将 `/private/tmp/zhpmind-autocommit` 安装到 `~/.mac-sync/bin/zhpmind-autocommit` 并加执行权限。
2. 将 `/private/tmp/ai.zhpmind.autocommit.plist` 安装到 `~/.mac-sync/launchd/ai.zhpmind.autocommit.plist`。
3. 将 plist 复制到 `~/Library/LaunchAgents/ai.zhpmind.autocommit.plist`。
4. `launchctl bootstrap / kickstart` 或按当前 launchd 状态加载 watcher。
5. 做安全门验证：
   - 临时制造 `.git/index.lock`，确认脚本跳过并写日志。
6. 做真实 commit/push 验证前需再次确认，因为该验证会在 ZHPMind 里制造测试提交并 push。
7. 通过后 commit + push mac-sync 改动。
8. `CLAUDE.md` 经确认后落地，后续由 ZHPMind watcher 入库。

## 当前未执行

- 未写 `~/.mac-sync/`。
- 未写 `~/Library/LaunchAgents/`。
- 未安装 launchd。
- 未修改 ZHPMind 根 `CLAUDE.md`。
- 未做测试 commit。
- 未 push。
