# Handoff: Hermes 维护两件套(skill 修复 + 看门狗)

> 发起:chat-Claude,2026-06-10
> 执行:Codex(Haopeng's Mac mini)
> 背景:2026-06-10 Hermes 修复会话(详见 `result-hermes-repair.md`)发现的遗留问题
> 完成后写 `result-hermes-maintenance.md` 回报

---

## Task 1:review-digest skill 引用修复 + 重复清理

### 1a. 修脚本名引用(根因 bug)

- 现状:`~/.hermes/skills/review-digest.md`(v4.0)文本中引用的脚本名为 `review-digest-scanner.py`
- 实际脚本:`~/.hermes/scripts/review-digest-scan.py`(存在且为 cron 配置所引用的正确文件)
- 后果:交互式调用时 agent 按 skill 文本 find 不到脚本,临场重写扫描器(2026-06-10 实际发生,见 result 文件),指标计算逻辑每次不同,违反"脚本做确定性、LLM 做解读"原则
- 修法:将 skill 文本中所有 `review-digest-scanner.py` 改为 `review-digest-scan.py`,并写明完整路径 `~/.hermes/scripts/review-digest-scan.py`
- 验证:`hermes chat -q "运行 review-digest skill"`,确认 agent 直接执行正式脚本而非临场写

### 1b. 清理重复 skill 注册

- 现状:`~/.hermes/skills/` 下同时存在:
  - `review-digest.md`(v4.0,权威)+ `review-digest/` 目录(v1.1 旧版,含 SKILL.md 和 references/)
  - `vault-tidy.md`(vault 部署的权威版)+ `vault-tidy/` 目录(来源待查)
- 后果:`Ambiguous skill name: 2 skills`,加载哪份不确定
- 修法:
  1. 先确认两个目录版的来源和内容(可能是 0.16 skill sync 或 hub 引入,也可能是早期残留)——⚠️ 判断点:如目录版含权威版没有的有用内容(如 references/ 下的 yaml-lite-parser.md、backlink-scanner.md),先迁移到权威侧或 vault 再删
  2. 删除目录版,只保留扁平 .md(与 vault 单向部署模式一致:vault SKILL.md → ~/.hermes/skills/{name}.md)
  3. `review-digest.md.v1/v2/v3.bak` 三个备份文件:git 历史已覆盖,可删(⚠️ 判断点:确认 vault 侧有对应版本记录后再删)
- 验证:`hermes skills list` 无 ambiguous 警告;`hermes chat` 调用 review-digest 和 vault-tidy 均能唯一解析

### 1c. 临场扫描器的可取改进(可选,需 Haopeng 确认后做)

- 2026-06-10 临场脚本 `/tmp/vault_scan.py`(重启会丢失,**先抢救副本**到 `claude-drafts/tmp-vault-scan-20260610.py`)
- 它有一个正式脚本可能没有的改进:inbox 统计区分"用户 capture"与"系统快照"(`review-digest-*` 前缀剔除),避免 digest 自身污染积压指标
- 动作:diff 临场版与 `review-digest-scan.py`,如正式版缺此逻辑,提议合并(出 diff 给 Haopeng 确认,不直接改)

### 1d. 同步 vault 侧 skill 文档

- 如 `wiki/pages/` 下有 review-digest 的 skill 页,在迭代记录中追加本次修复(脚本名 bug + 重复清理),保持 vault 与部署一致

---

## Task 2:Hermes 看门狗(独立 launchd)

### 背景

- 0.16 升级后 launchd 无法管理 gateway(`bootstrap exit 5`),gateway 以裸后台进程运行:**不随登录自启、崩溃不拉起**
- 2026-06-02~06-08 已发生一次"gateway 静默死 6 天"事故(cron 失败无任何通知通道)
- 原则:看门狗必须在 Hermes 体系之外,不能让 Hermes 监控自己

### 规格

独立 shell 脚本 + launchd 任务,每 10 分钟运行:

1. **gateway 保活**:检测 gateway 进程是否存活(脚本内自行确定可靠的检测方式,如 pgrep 匹配 gateway 特征字符串);死了则拉起(`hermes gateway install` 已验证会以后台进程方式启动;如有更轻的 start 命令优先用)并记录日志
2. **digest 新鲜度**(每天检查一次即可,可在脚本内按小时判断):`~/Obsidian/ZHPMind/inbox/` 中最新 `review-digest-*.md` 的 mtime 若超过 8 天,写告警文件 `inbox/alert-hermes-watchdog-{YYYY-MM-DD}.md`(frontmatter: `type: snapshot` / `source: watchdog`),已存在当日告警则不重复写

### 约束(mac-sync 既有规矩)

- launchd plist 中**不使用 `$HOME`**,通过 `bash -l -c` 调用脚本(禁忌 #3)
- zsh/脚本内不依赖 inline `#` 注释行为
- 脚本与 plist 建议归 mac-sync 管理(如 `~/.mac-sync/` 下合适位置),随同步体系版本化——⚠️ 判断点:具体放置位置由 Codex 按 mac-sync 现有结构定
- 日志写固定文件并控制大小(如保留最近 500 行)

### 验证

1. 手动 kill gateway → 10 分钟内被拉起,日志有记录
2. 临时把新鲜度阈值调成 0 天 → 告警文件出现在 inbox → 调回 8 天并清理测试告警
3. `launchctl list` 中看门狗任务存在且无异常退出码

---

## 执行节奏提醒

- Diff-first:1a/1b/1c 的修改先出 diff 供审,确认后再动
- 1c 的合并、1b 的备份删除、Task 2 的放置位置是已标注的判断点,拿不准就停下来问
- 全部完成后:git commit(vault 侧改动)+ `result-hermes-maintenance.md` 回报
