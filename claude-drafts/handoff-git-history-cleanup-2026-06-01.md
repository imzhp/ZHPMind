# 交接:git 历史二进制瘦身(filter-repo)— 2026-06-01

> 冷启动用。粘进新会话即可接力。本文件在 `claude-drafts/`(跨机、gitignored、不进历史)。

## 任务
把 git 历史里的二进制 blob(书 PDF + 课程 docx/pdf + 旧 epub)**全部从历史剥掉**,repo 从 **167 MiB** 降到几 MiB,然后 force-push。文件留盘上靠 Obsidian Sync,git 只留 md 文本。**不丢任何笔记。**

## 背景(为什么)
- 今天为修 origin 分叉做了一次 merge,但 push 卡死:repo 167 MiB,几乎全是 `wiki/raw/assets/books/*.pdf`(开放式大脑33M / 控糖革命29M / 亚马逊运营手册25M / 黄仁勋25M[已删盘但还在历史] / 财务金三角17M / Affiliate11M / 养育男孩 / 何以为父 / 学会提问 / Almanack)+ `wiki/raw/qwei-amazon-course-2023/` 下的 docx/pdf。
- 用户已转用 epub(books/ 里 PDF 是废重复件)。原则:**二进制不进 git,靠 Obsidian Sync**。
- `git rm` 只删工作区/未来,历史里的 blob 还在 → 必须 filter-repo 重写历史。

## 当前 git 状态(事实)
- 本地 main = merge commit `a4ebf1d`(已把 origin 的 14 + 本地 11 并齐),`git status` = "ahead of origin/main by 12",**尚未 push**。
- origin/main 仍在旧的 `cb6fb13`(14-only)。
- backup 分支:`backup/mini-main-2026-06-01`(merge 前的本地 main)。
- `.gitignore` 已含:`*.icloud`、`claude-drafts/*` + `!claude-drafts/README.md`、`*.epub`。
- `.gitattributes` 已含:log/changelog/index 的 `merge=union`(commit 188882a)。
- **Air 没有自己的 git**(只靠 Obsidian Sync 拿内容)→ 本次重写只动 **mini + origin**,不用重克隆 Air。

## ⚠️ filter-repo 前必做
1. `git remote -v` **记下 origin 的 URL**(filter-repo 会删掉 remote,事后要重加)。
2. 整盘备份:`cp -R ~/Obsidian/ZHPMind ~/zhpmind-backup-prefilter-$(date +%Y%m%d)`。确认 backup 分支还在。
3. **在 Obsidian 设置里临时关掉 Sync**(防止 filter-repo 删工作区文件被同步成跨机删除)。

## 执行计划(每个不可逆点停下确认)
1. 装:`brew install git-filter-repo`(或 `pip3 install git-filter-repo --break-system-packages`)。
2. 剥(全历史移除 pdf/docx/epub,md 全留):
   `git filter-repo --force --invert-paths --path-glob '*.pdf' --path-glob '*.docx' --path-glob '*.epub'`
3. 验:`git count-objects -vH`(应降到几 MiB);`git log --oneline -6`(历史在、SHA 变了)。
4. **从备份恢复要留的书文件到盘上**(filter-repo 把它们从工作区删了):从 `~/zhpmind-backup-prefilter-*/wiki/raw/assets/books/` 拷回想留的(没 epub 替代的:Almanack/Affiliate/亚马逊运营手册/养育男孩/何以为父/学会提问)。有 epub 替代的(控糖革命/财务金三角/开放式大脑)可不恢复=彻底删。恢复后它们=未跟踪+gitignored,留盘不进 git。
5. 重连 remote:`git remote add origin <第1步记下的 URL>`。
6. force-push:`git push origin main --force`(秒传)。
7. 验:push 快、`git status` = up to date。
8. **再开 Obsidian Sync**,确认两台文件正常。
9. 善后:`.gitignore` 加 `*.pdf`、`*.docx`(二进制永不再进 git)。

## merge 之后还欠的(瘦身完再做,别丢)
- 补提交未跟踪真内容:`wiki/pages/first-principles.md`、`CLAUDE.md`、`wiki/raw/Matt Van Horn…md`、`claude-drafts/README.md`;dedup `wiki/raw/多 Agent … 1.md`(同步冲突副本)。
- 验 `claude-drafts/*` ignore 是否真生效:`git check-ignore -v claude-drafts/handoff-2026-06-01-mcp-stabilization.md`(之前 status 整目录显示,疑似没咬住)。
- `20.reading/`、`30.areas/` 等旧 PARA 编号目录:确认是老结构残骸 → 决定删/迁。
- **治根(③)**:把"git 只在 mini 提交 + 提交前先 fetch/merge + 永不用 reset-to-origin 当创可贴 + 二进制不进 git"写进 `CLAUDE.md`。今天分叉的根就是这条没立。

## 路线图位置
- ① MCP 稳定 ✅(两台只剩 Filesystem + Web Search)
- ② 双机无缝 ✅ 大半(claude-drafts 双向同步已验、作用域宽+对称对齐;剩 git 瘦身 + 上面善后)
- ③ ZHPMind 架构融合审查 — 未开始
