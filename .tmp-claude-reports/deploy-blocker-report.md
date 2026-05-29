# zhpmind-v2.4 部署 — 执行前阻塞报告

> Claude Code 读完 DEPLOY.md 后,按其工作纪律 #2「模糊处停下」/ #3「以本地 vault 为准」做执行前核对。
> **发现 2 个阻塞问题,未执行任何 Phase(含 Phase 0)。vault 仍在 main / cbdb7b0,工作区干净。**

---

## 🔴 阻塞 1:版本前提冲突(致命)

**DEPLOY.md 的假设**(L43):vault 当前是 **v2.3**。

**vault 实际状态:**
- `design-principles.md` = **v2.4**,450 行
- Changelog 顶条:`**2026-05-22 v2.4** —— Phase D 完成后的规则层下游影响审计修订`
- 对应 commit `cbdb7b0`(2026-05-22,**已 push 到 origin/main**)

**存在两个不同的「v2.4」,内容完全无关:**

| | 来源 | 内容 | 已动文件 |
|---|---|---|---|
| **v2.4-X(已落地)** | vault commit `cbdb7b0` | Phase D 下游影响审计:snapshot 非三段式 / sources:[] 合法 / index 加 MOCs·Skills 分区 / aliases 兼容 / Lint 补项 | design-principles.md + wiki/CLAUDE.md |
| **v2.4-Y(交付包)** | `~/Downloads/zhpmind-v2.4/` | neat-freak 反熵心法 + concept-fable 直觉锚点:受众分层 / 反膨胀 / AI 心法+红线 等新章节,~570-580 行 | design-principles.md + 新 skill 页 + Hermes skill |

两者是 **2026-05-22 同日并行起草、互不知情**的产物。交付包的 preparer 不知道 `cbdb7b0` 已经存在并提交。

**如果照 DEPLOY.md Phase 1 执行会发生什么:**

Phase 1 的 `cp design-principles-v2.4.md design-principles.md` 会用 **v2.4-Y 覆盖 v2.4-X**。而 v2.4-Y 基于「v2 + 手动补 v2.3」起草,**不可能包含 v2.4-X 的审计修订**。后果:

1. `design-principles.md` 丢失全部 v2.4-X 审计内容(snapshot/sources/index/aliases/lint 规则)。
2. 但 `wiki/CLAUDE.md` 仍保留 v2.4-X 的改动(DEPLOY.md 全程不碰 wiki/CLAUDE.md)。
3. → **两个规则文件自相矛盾**:例如 wiki/CLAUDE.md §3.1 表写着 snapshot = 标准结构,而被覆盖的 design-principles.md 里没有对应的 snapshot 非三段式规则。
4. v2.4-X 内容仍在 git history(`cbdb7b0`)可追溯,但工作文件已偏离。

**这正是 DEPLOY.md 自己 Phase 1 步骤 #3 + 工作纪律 #3 明示要停下的情况** ——「当前版有没有 v2.3 之后但 v2.4 草稿没覆盖的修订?如果有,提报告,不要直接合并」。只是冲突规模比 DEPLOY.md 预想的大:不是某一节的小修订,而是一整个已提交并 push 的 v2.4 commit。

---

## 🔴 阻塞 2:交付包文件无法访问

`~/Downloads/zhpmind-v2.4/` 受 macOS TCC(隐私权限)保护:

- Bash `ls` / `cp` → `Operation not permitted`
- Read 工具读 `DEPLOY.md` 成功(大概因用户在消息里**显式给了该文件路径**),但读同目录其他文件 → `EPERM`

→ 我**无法读取 / 复制**交付包的 4 个文件(`design-principles-v2.4.md` / `review-digest-v2.md` / `skill-concept-fable.md` / `claudian-concept-fable-prompt.md`)。
→ DEPLOY.md Phase 0「把 4 个文件复制到 `.tmp-claude-reports/incoming/`」**无法执行**。

---

## 需要拍板的事

**阻塞 1 — 两个 v2.4 怎么调和(主对话决策):**
- 选项 A:把交付包的 neat-freak / concept-fable 改动,**重新 merge 到当前 `cbdb7b0` 版本之上**(而非覆盖),版本号顺延为 **v2.5**。
- 选项 B:主对话基于当前 `cbdb7b0` 版重新起草 neat-freak 补丁(精确 diff 形式)。
- 选项 C:其他。

无论选哪个,DEPLOY.md 的 Phase 1「cp 覆盖」都不能直接用,需要改为「在 cbdb7b0 基础上做增量 merge」。

**阻塞 2 — 让我能访问交付包:**
- 把整个 `zhpmind-v2.4/` 目录移到 vault 内(例如直接放到 `.tmp-claude-reports/incoming/`),我就能读;
- 或在 系统设置 → 隐私与安全性 → 文件与文件夹 给终端授予 Downloads 访问权;
- 或用别的方式把 4 个文件内容给我。

---

## 当前状态

- **未执行任何 Phase。** 没有 `git checkout -b v2.4-integration`,没有 mkdir,没有复制文件。
- vault 在 `main` / `cbdb7b0`,工作区干净。
- 仅向传输通道写了本报告。

等主对话拍板阻塞 1 的调和方案 + 解决阻塞 2 的文件访问后,我再按修正后的方案执行。
