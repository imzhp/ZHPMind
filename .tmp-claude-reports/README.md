# Claude Code ↔ 主对话 传输通道

本目录是主对话 / Claude Code / Hermes Agent 之间的工作产物中转区。

## 当前策略(2026-05-26 修订)

- **drafts 和诊断报告进 git** ——`.gitignore` 规则改为白名单式精确排除(只 ignore `.bak` / `.tmp` / scratch / incoming),其余默认入库。
- **每版必 commit** ——任何 `.tmp-claude-reports/*.md` 修改完立刻 commit,消息格式 `draft: v0.X — <一句话概括>` 或 `report: <主题>`。
- **跨设备同步**:Obsidian Sync 配置应开启 "Sync hidden / dot files",让本目录跨设备一致(但 `.git/` 仍排除在 Sync 外,让 git 自己管 git)。

## 策略变更背景

2026-05-26 因原 `.gitignore` 把整个 `.tmp-claude-reports/*` 排除(只白名单 README.md),vault 从 iCloud 迁移到 Obsidian Sync 时,所有 draft 文件物理丢失。Sync File Recovery 默认排除 dot-folders,无法找回。amazon 对照表 v0.9 重建后,即作为新策略的"灾备基线"立刻 commit。

## 使用约定

- `*-draft.md` —— 主对话维护的 draft 文档,频繁迭代,每版 commit
- `report-*.md` / `diagnostic-*.md` —— Claude Code 或 Hermes 产出的报告
- `incoming-*/` —— 临时输入材料,**不入 git**
- `scratch-*` —— 一次性试验文件,**不入 git**
- `*.bak` / `*.tmp` —— 备份和临时文件,**不入 git**

## 跟 vault 其他目录的边界

- `inbox/` —— 真正的"未处理素材"(Pull + Push 入口),会被 distill 到 wiki
- `wiki/raw/` —— 已被 wiki 引用的永久原始素材
- `.tmp-claude-reports/` —— 主对话/工具之间的过程产物,长期保留但不属于 wiki 知识体
