# Hermes 维护两件套执行回执

日期：2026-06-10

## 结论

已完成：

- 修复 `review-digest` skill 的正式 scanner 脚本路径引用
- 清理 `review-digest` / `vault-tidy` 重复 skill 注册形态
- 抢救 `/private/tmp/vault_scan.py` 到 `claude-drafts/tmp-vault-scan-20260610.py`
- 创建并安装独立 Hermes watchdog LaunchAgent
- 更新 vault 侧 skill 反思页
- mac-sync 侧已本地 commit，ZHPMind 侧待本文件随维护记录 commit

未 push。

## Task 1：review-digest skill 修复与重复清理

### 1a. 脚本名引用修复

已将 `~/.hermes/skills/review-digest.md` 中的旧引用：

```text
review-digest-scanner.py
```

改为正式路径：

```text
~/.hermes/scripts/review-digest-scan.py
```

验证：

```text
hermes chat -q "读取 review-digest skill，只回答它要求使用的正式 scanner 脚本完整路径。不要扫描 vault，不要写任何文件。"
```

Hermes 返回：

```text
~/.hermes/scripts/review-digest-scan.py
```

过程显示 `skill_view review-digest`，未重新扫描 vault，未写文件。

### 1b. 重复 skill 清理

已删除：

```text
~/.hermes/skills/review-digest/
~/.hermes/skills/vault-tidy/
~/.hermes/skills/review-digest.md.v1.bak
~/.hermes/skills/review-digest.md.v2.bak
~/.hermes/skills/review-digest.md.v3.bak
```

保留：

```text
~/.hermes/skills/review-digest.md
~/.hermes/skills/vault-tidy.md
```

判断依据：

- `review-digest/` 目录版是 v1.1 旧形态
- 目录版 `references/` 的有效 Pitfalls 已沉淀进 `wiki/pages/skill-review-digest.md`
- `vault-tidy/` 目录版内容与单文件权威版一致
- `review-digest.md.v1/v2/v3.bak` 的演化链已记录在 vault 反思页

验证：

- `hermes skills list` 无 ambiguous 报错
- 文件层只剩扁平 `review-digest.md` / `vault-tidy.md`
- `hermes chat -q` 可唯一读取 `vault-tidy`

`vault-tidy` 验证返回要点：

```text
--draft 输出到 claude-drafts/result-tidy-{timestamp}.md
--draft 不允许修改 wiki/pages
```

### 1c. 临场扫描器抢救与判断

已抢救：

```text
claude-drafts/tmp-vault-scan-20260610.py
```

判断：

- 临场脚本有 `user_captures` / `snapshot_files` 命名上的改进
- 正式脚本已有更完整逻辑：系统快照排除、`distill_status`、`raw_unreferenced`、`correction_frequency`
- 不建议直接合并临场脚本；如后续要改，只做小范围命名优化

### 1d. vault 侧 skill 文档同步

已更新：

```text
wiki/pages/skill-review-digest.md
wiki/pages/skill-vault-tidy.md
```

记录内容：

- 2026-06-10 维护收敛
- 正式执行体路径
- 重复目录清理
- 非破坏性 Hermes 解析验证

## Task 2：Hermes watchdog

### 文件位置

mac-sync 侧新增：

```text
~/.mac-sync/bin/hermes-watchdog
~/.mac-sync/launchd/ai.hermes.watchdog.plist
```

实际安装：

```text
~/Library/LaunchAgents/ai.hermes.watchdog.plist
```

日志：

```text
~/.mac-sync/hermes-watchdog.log
~/.mac-sync/hermes-watchdog.stdout.log
~/.mac-sync/hermes-watchdog.stderr.log
```

本地日检状态：

```text
~/.mac-sync/.notify-state/hermes-watchdog-digest-last-date
```

`.notify-state/` 已在 mac-sync 中忽略，不入 git。

### 行为

- 每 10 分钟运行一次
- 先用 `pgrep -f '[h]ermes_cli.main gateway run'` 检测 Hermes 裸后台 gateway
- 再 fallback 到 `launchctl print gui/$(id -u)/ai.hermes.gateway`
- gateway 不存在时执行 `hermes gateway start`
- 每天检查一次最新 `inbox/review-digest-*.md` mtime
- 默认超过 8 天写 `inbox/alert-hermes-watchdog-{YYYY-MM-DD}.md`
- 日志保留最近 500 行

### 验证

plist：

```text
/Users/zhanghaopeng/.mac-sync/launchd/ai.hermes.watchdog.plist: OK
```

脚本：

```text
bash -n /Users/zhanghaopeng/.mac-sync/bin/hermes-watchdog
```

通过，无输出。

LaunchAgent：

```text
runs = 2
last exit code = 0
run interval = 600 seconds
```

注意：`state = not running` 是正常状态，因为 watchdog 是短任务，跑完即退出，等待下一个 600 秒 interval。

gateway 拉起验证：

1. 执行 `hermes gateway stop`
2. 确认 `pgrep -lf 'hermes_cli.main gateway run'` 无进程
3. 执行 `launchctl kickstart gui/$(id -u)/ai.hermes.watchdog`
4. watchdog 重新拉起 gateway

当前 gateway 证据：

```text
50376 /Users/zhanghaopeng/.hermes/hermes-agent/venv/bin/python -m hermes_cli.main gateway run --replace
```

watchdog 日志证据：

```text
2026-06-10 16:18:16 gateway not running: state=not running; attempting start
2026-06-10 16:18:17 gateway start command succeeded
2026-06-10 16:18:17 gateway post-check: evidence=process:50376 launchctl_state=not running
2026-06-10 16:18:17 digest freshness skipped: already checked today
```

digest 告警验证：

- 临时 `HERMES_WATCHDOG_DIGEST_MAX_DAYS=0`
- 强制 `HERMES_WATCHDOG_FORCE_DIGEST_CHECK=1`
- 成功生成 `inbox/alert-hermes-watchdog-2026-06-10.md`
- 验证 frontmatter：

```yaml
type: snapshot
source: watchdog
created: 2026-06-10
tags: [system-alert]
```

- 测试告警已删除

## mac-sync commit

已在 `~/.mac-sync` 创建本地 commit：

```text
0b7de0a feat: add Hermes gateway watchdog
```

状态：

```text
main...origin/main [ahead 1]
```

未 push。

## 已知剩余风险

- `hermes gateway status/list` 仍只看 launchd，会把裸后台 gateway 误报为 not running；watchdog 已绕开此问题，改用进程检测作为第一证据。
- Hermes gateway 启动日志仍显示 launchd `bootstrap exit 5`，这是本次 watchdog 要缓解的根因环境，而不是已被 Hermes 自身修复。
- `review-digest` cron 之前的 import error 属 Hermes 内部工具模块兼容问题，本次维护解决 gateway 存活和 skill 重复/路径漂移，不等于修复 cron job 的内部 import error。
