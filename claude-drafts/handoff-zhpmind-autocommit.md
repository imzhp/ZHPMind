# Handoff: ZHPMind git 单写者架构(auto-commit watcher)

> 发起:chat-Claude,2026-06-10
> 执行:Codex(Haopeng's Mac mini)
> 背景:2026-06-10 发生 Air(Claudian)与 mini 双头提交同批内容导致 push 冲突。Haopeng 已拍板方案 A:git 提交统一由 mini 承担(常驻职责归常驻机器),两台机器在编辑层面经 Obsidian Sync 保持平等。
> 完成后写 `result-zhpmind-autocommit.md` 回报

---

## Task 1:auto-commit watcher(mini)

### 规格

独立脚本 + launchd 任务,沿用 hermes-watchdog 的模式(`~/.mac-sync/bin/` + `~/.mac-sync/launchd/`,经 mac-sync 版本化):

每 10 分钟运行一次,对 `~/Obsidian/ZHPMind`:

1. **安全门(任一命中则本轮跳过并记日志)**:
   - `.git/index.lock`、`.git/rebase-merge/`、`.git/rebase-apply/`、`.git/MERGE_HEAD` 存在 → 有进行中的 git 操作(可能是 Codex 在做手术),不碰
   - 工作区有改动、但存在 2 分钟内刚被修改的文件 → Obsidian Sync 可能正在传输,等静默(避免提交半同步状态)
2. **先拉后提**:`git pull --rebase --autostash origin main`
   - rebase 冲突 → `git rebase --abort`,记日志,写告警 `inbox/alert-git-autocommit-{YYYY-MM-DD}.md`(frontmatter 同 watchdog 告警格式),当日不重复告警,留给人/Codex 处理
3. **提交**:工作区有改动则 `git add -A` + commit
   - commit message 格式建议:`auto: {YYYY-MM-DD HH:MM} {N} files`,body 列文件清单
   - ⚠️ 判断点:若本轮改动**仅有** `.obsidian/` 下文件,是否降频(如每天只为纯配置改动提交一次)由 Codex 评估后定,避免插件 manifest 噪声刷屏历史
4. **推送**:`git push`;失败(如远端又领先)→ 重试一次 pull --rebase + push;再失败 → 记日志 + 当日告警
5. 日志固定文件,保留最近 500 行(同 watchdog 模式)

### 验证

1. 在 vault 里造一个测试文件 → 下个周期被自动 commit + push,message 格式正确
2. 手动制造 `.git/index.lock` → 该轮跳过且有日志
3. 删除测试文件(让 watcher 再提交一次清理),远端确认两笔 commit 都在

---

## Task 2:root CLAUDE.md 规则更新

在多 agent 分工权威文件(vault root `CLAUDE.md`)中加入 git 单写者规则,要点:

- ZHPMind 的 git commit/push 仅由 mini 上的 auto-commit watcher 执行
- 任何 agent(Claudian、Hermes、Codex 日常操作)**不手动 commit/push**;例外:Codex 执行明确含 git 步骤的 handoff 时可操作,且操作前后需确认 watcher 安全门状态
- Air 上的 git clone 为只读(push 已禁用,见 Task 3)
- 提交粒度与可回滚的诚实表述:回滚粒度 = watcher 的批次(约 10 分钟窗口),溯源依赖页面 frontmatter,不再宣称"每次 AI 写入一个 commit"

措辞由 Codex 起草,与 CLAUDE.md 现有风格一致,diff 供 Haopeng 审后落。

---

## Task 3:Air 侧禁推(Haopeng 在 MacBook Air 上执行,一条命令)

Codex 无法操作 Air;此步骤写在这里备查,由 Haopeng 在 **MacBook Air** 终端执行:

```bash
cd ~/Obsidian/ZHPMind && git remote set-url --push origin DISABLED && git remote -v
```

预期输出:fetch 仍指向 `github.com:imzhp/ZHPMind.git`,push 显示 `DISABLED`。此后 Air 上任何 push 都会直接报错,物理兜底,不依赖 agent 自觉。

---

## 执行节奏提醒

- Diff-first;判断点(`.obsidian` 降频策略、CLAUDE.md 措辞)拿不准就停
- 脚本与 plist 遵守 mac-sync 既有约束:plist 不用 `$HOME`,经 `bash -l -c` 调用
- 完成后 mac-sync commit + push;CLAUDE.md 改动经审后随 vault 正常入库(此后由 watcher 接管)
