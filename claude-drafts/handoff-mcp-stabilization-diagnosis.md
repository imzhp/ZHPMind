---
type: snapshot
source: chat-claude/handoff
created: 2026-06-05
tags:
  - system/handoff
  - mcp
---

# Handoff — Filesystem MCP hang 根因诊断（只读）

> **From**: Chat Claude（独立诊断设计）
> **To**: Codex（Mac mini，原生 shell)
> **范围**: **纯只读诊断,不动任何文件、不改任何配置。** 查清 Filesystem MCP 反复 hang 的根因,写 result 回执。修复方案等诊断结果出来再单独定（很可能涉及 Claude Desktop 配置,需 Haopeng 手动,Codex 够不着那个目录)。

---

## 0. 背景与已排除项

**现象**: 2026-06-05 这轮长对话中,Filesystem MCP 反复 hang——调用 4 分钟无响应,需 Haopeng 重启 Claude Desktop 才恢复。一轮对话内出现 3–4 次。卡的**只有 Filesystem MCP**;web_search 全程正常。

**关键: 卡住的操作都是读写 claude-drafts/ 和 wiki/pages/ 里的小 md 文件,没有一次直接触及大文件。** 这是核心矛盾点——hang 不是当次操作的文件大小造成的。

**已排除（不要再查/不要再做)**:
- ❌ 大文件进 git → 已排除。`.gitignore` 已 ignore `*.epub` `*.pdf` `*.docx`,且 2026-06-01 已做过 filter-repo 瘦身。**不要再清理大文件、不要再跑 filter-repo。**
- ❌ 连接器过多 → 已处理。Haopeng 已关掉 Chrome/Figma/Google Drive 等,现仅 Filesystem + Web Search 常驻。

**因此根因聚焦在两个假说**(见下),都需要在 mini 上实测才能证伪/证实。

---

## 1. 假说 A：Obsidian Sync 占位符触发等待

`wiki/raw/assets/books/` 有 ~88MB 电子书(最大 `亚马逊高阶运营培训手册.pdf` 25MB)。`.gitignore` 里有 `*.icloud` 一行,说明 vault 历史上出现过 iCloud 占位符。

**假说**: 这些大文件可能被存储优化机制存成"按需下载占位符"(dataless 文件)。当 Filesystem MCP 的某次调用扫描/stat 到这些占位符时,系统触发下载等待 → MCP 调用 hang。即使后续调用是小 md,前一次卡在占位符上的调用没返回,会阻塞整个 server(见假说 B)。

**诊断命令（只读)**:

```bash
VAULT="$HOME/Obsidian/ZHPMind"

echo "===== 1. books 目录文件的 dataless/占位符状态 ====="
# macOS: 用 brctl 或检查文件的 dataless 属性
ls -la@ "$VAULT/wiki/raw/assets/books/"
echo "--- 检查是否有 .icloud 占位符 ---"
find "$VAULT" -name "*.icloud" 2>/dev/null || echo "无 .icloud 占位符"

echo ""
echo "===== 2. 文件是否真实落盘(对比逻辑大小 vs 实际占用块) ====="
# 占位符的实际磁盘占用会远小于逻辑大小
for f in "$VAULT/wiki/raw/assets/books/"*.pdf; do
  echo "$f"
  stat -f "  逻辑大小: %z bytes  实际块: %b blocks" "$f"
done

echo ""
echo "===== 3. 检查 dataless 标记(SF_DATALESS / 云端占位) ====="
# st_flags 中的 dataless 位
for f in "$VAULT/wiki/raw/assets/books/"*.pdf "$VAULT/wiki/raw/assets/books/"*.epub; do
  flags=$(stat -f "%Sf" "$f" 2>/dev/null)
  echo "$(basename "$f"): flags=[$flags]"
done

echo ""
echo "===== 4. Obsidian Sync 是否设置了选择性同步/按需下载 ====="
echo "（这一项需 Haopeng 在 Obsidian 设置→Sync 里确认,Codex 查不到 GUI 设置)"
```

**判读**: 如果第 2 项里某文件"实际块"远小于"逻辑大小",或第 3 项 flags 含 `dataless`,说明假说 A 成立——大文件是占位符,扫描时触发下载 hang。

---

## 2. 假说 B：reference Node server 无 stuck-detection,hung call 阻塞后续

Haopeng 既往经验记录: "Filesystem MCP reference Node server 没有 stuck-detection;一个 hung call 阻塞所有后续调用;crashes if any allowed-directory path is transiently unavailable。"

**假说**: 现用的是 `@modelcontextprotocol/server-filesystem` 官方 reference 实现(Node)。它单线程串行处理,一次调用卡住(无论卡在占位符下载、还是某个 allowed-dir 路径瞬时不可用),后续所有调用排队等死,直到重启。这解释了"为什么卡在小 md 上"——卡的不是这次调用,是之前某次没返回的残留。

**诊断命令（只读)**:

```bash
echo "===== 5. Claude Desktop MCP 配置(确认用的哪个 Filesystem server) ====="
CFG="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
if [ -f "$CFG" ]; then
  cat "$CFG"
else
  echo "配置文件未找到,确认路径"
fi

echo ""
echo "===== 6. Filesystem MCP 进程状态 ====="
pgrep -lf "server-filesystem" || pgrep -lf "modelcontextprotocol" || echo "未找到运行中的 filesystem MCP 进程"

echo ""
echo "===== 7. Node 版本 ====="
node --version

echo ""
echo "===== 8. allowed-directories 里的路径是否都真实可达 ====="
# config 里列的每个 allowed dir,逐个 test
for d in "$HOME/Documents" "$HOME/Obsidian" "$HOME/Downloads" "$HOME/Desktop" "$HOME/.hermes" "$HOME/.mac-sync"; do
  if [ -d "$d" ]; then echo "✅ $d 可达"; else echo "🔴 $d 不存在/不可达 ← 可能是 crash 诱因"; fi
done

echo ""
echo "===== 9. 已安装的 filesystem MCP server 版本 ====="
npm list -g 2>/dev/null | grep -i filesystem || echo "非全局安装,可能用 npx 每次拉取"
```

**判读**: 
- 第 5 项确认实际用的 server 包名/版本/启动方式
- 第 8 项任何一个 🔴 都是 crash 诱因(尤其 `~/.hermes`——Haopeng 记录里 MacBook Air 没有此路径会 crash;mini 上有,但要确认没有其他列了不存在的路径)
- 第 9 项: 如果是 npx 每次拉取,版本可能不固定

---

## 3. 修复路径预判（诊断后再定,先不做）

诊断结果出来后,可能的修复方向(供参考,**本次不执行**):

- **若假说 A 成立**: 在 Obsidian Sync 设置里把 `wiki/raw/assets/` 排除出同步/设为始终保持下载;或把电子书移出 vault 目录树(放到 vault 外的固定位置,Obsidian 里用 vault 外引用)。
- **若假说 B 成立**: 换更稳的 Filesystem MCP 实现,或给 allowed-directories 瘦身(去掉不常用的 scope,减少扫描面)。这涉及改 `claude_desktop_config.json` → **Haopeng 手动,Codex 够不着**。
- **两者可能叠加**: A 是触发器,B 是放大器。

---

## 4. Codex 本次只做

1. 跑上面第 1–9 项诊断命令(全只读)
2. 把输出汇总,对两个假说各给"成立/不成立/证据不足"的判断
3. 写 result 回执到 `claude-drafts/result-mcp-stabilization-diagnosis.md`
4. **不动任何文件,不改任何配置,不跑 git 操作**

诊断结果回来后,Chat Claude + Haopeng 再定修复方案。

---

*本 handoff 基于 2026-06-05 实测现象 + Haopeng 既往 MCP 经验记录。已排除大文件/连接器两条路径,聚焦占位符 + Node server 稳定性两个假说。*
