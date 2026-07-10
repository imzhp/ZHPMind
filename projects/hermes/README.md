# Hermes — 当前运行手册

Hermes 在 ZHPMind 中只负责定时、扫描和外部信号；知识蒸馏与正式入库由 Codex 执行。

## 当前运行面

| 项 | 当前实现 |
|---|---|
| Gateway | launchd 服务 `ai.hermes.gateway` |
| 周报 | `review-digest`，每周一 09:00 |
| 质量 gate | `cross-eval`，按需触发 |
| 清理计划 | `vault-tidy`，按需触发，不设 cron |
| 政策监控 | `policy-monitor`，仍处于 draft，不设 cron |

## 权威路径

- `~/.hermes/skills/{name}/SKILL.md`：本地 skill 的唯一形态。
- `~/.hermes/scripts/review-digest-scan.py`：周报的确定性事实层。
- `~/.hermes/scratch/review-digest-latest.json`：review-digest 与 vault-tidy 的唯一共享数据源。
- `~/.hermes/scripts/cross-eval-run.py`：跨家系评审脚本。

## 维护纪律

- 用 `launchctl print gui/$(id -u)/ai.hermes.gateway` 判断 gateway；`hermes cron list` 的 gateway 提示在本机不可靠。
- skill 迁移后先检查 `hermes skills list`，再改 cron 或 wrapper 路径。
- Hermes 写入以 `inbox/` 与 `claude-drafts/` 为主，不直接改 `wiki/pages/` 或治理文件。
- 所有 vault 改动交给 auto-commit watcher；Hermes 不自行 commit 或 push。

## 历史资料

早期安装说明已归档到 `archive/hermes-install-guide-2026-05.md`。它记录当时环境，不再作为当前配置依据。
