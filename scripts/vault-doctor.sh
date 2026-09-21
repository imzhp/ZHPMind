#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
# vault-doctor.sh — ZHPMind vault 健康度检查
#
# 用途:  纯只读检查 vault 当前状态,挡住 iCloud + git 叠加引起的
#        常见踩坑窗口。不修改任何文件,只报告。
#
# 用法:  ./vault-doctor.sh
#        或自定义 vault 路径:  VAULT_PATH=/path/to/vault ./vault-doctor.sh
#
# 推荐时机:
#   - 每次进行 git commit / push / pull 前
#   - 在两台 Mac 之间切换工作前
#   - 怀疑 vault 状态异常时
# ─────────────────────────────────────────────────────────────────

set -uo pipefail

# ─── 配置 ──────────────────────────────────────────────────────
VAULT_PATH="${VAULT_PATH:-$HOME/Obsidian/ZHPMind}"
INBOX_THRESHOLD=50  # inbox 积压阈值

# ─── 颜色 ──────────────────────────────────────────────────────
if [ -t 1 ]; then
  RED='\033[0;31m'; YELLOW='\033[0;33m'; GREEN='\033[0;32m'
  BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
else
  RED=''; YELLOW=''; GREEN=''; BLUE=''; BOLD=''; NC=''
fi

ISSUES=0
WARNINGS=0

print_header() {
  echo
  echo -e "${BLUE}${BOLD}▶ $1${NC}"
}

print_ok()    { echo -e "  ${GREEN}✓${NC} $1"; }
print_warn()  { echo -e "  ${YELLOW}⚠${NC} $1"; WARNINGS=$((WARNINGS+1)); }
print_error() { echo -e "  ${RED}✗${NC} $1"; ISSUES=$((ISSUES+1)); }

# ─── 0. Vault 路径检查 ─────────────────────────────────────────
print_header "0. Vault 路径"
if [ ! -d "$VAULT_PATH" ]; then
  print_error "vault 路径不存在: $VAULT_PATH"
  echo
  echo "  若 vault 在其他位置,用环境变量覆盖:"
  echo "    VAULT_PATH=/path/to/your/vault ./vault-doctor.sh"
  exit 1
fi
print_ok "vault 存在: $VAULT_PATH"

if [ ! -d "$VAULT_PATH/.git" ]; then
  print_error "vault 未 git 化 (.git 目录不存在)"
  exit 1
fi
print_ok "vault 已 git 化"

cd "$VAULT_PATH" || exit 1

# ─── 1. iCloud 冲突重命名文件 ──────────────────────────────────
# iCloud 检测到双端冲突时会自动加 " 2"/" 3" 后缀
print_header "1. iCloud 冲突重命名文件"
CONFLICT_FILES=$(find . -type f \
  \( -name "* 2.md" -o -name "* 3.md" -o -name "* 4.md" -o -name "* 2" -o -name "* 3" \) \
  -not -path "./.git/*" \
  -not -path "./.obsidian/*" \
  2>/dev/null)

if [ -z "$CONFLICT_FILES" ]; then
  print_ok "未发现冲突重命名文件"
else
  CONFLICT_COUNT=$(echo "$CONFLICT_FILES" | wc -l | tr -d ' ')
  print_error "发现 $CONFLICT_COUNT 个 iCloud 冲突文件:"
  echo "$CONFLICT_FILES" | head -10 | sed 's|^\./|      |'
  [ "$CONFLICT_COUNT" -gt 10 ] && echo "      ... 还有 $((CONFLICT_COUNT-10)) 个"
  echo "      → 处理建议: 逐个 diff 后保留正确版本,删除冲突副本"
fi

# ─── 2. iCloud 未下载占位符 ────────────────────────────────────
# Optimize Mac Storage 把不常用文件撤回云端时留下的占位符
print_header "2. iCloud 未下载文件 (.icloud 占位符)"
ICLOUD_PLACEHOLDERS=$(find . -name "*.icloud" -not -path "./.git/*" 2>/dev/null)

if [ -z "$ICLOUD_PLACEHOLDERS" ]; then
  print_ok "所有文件均已下载到本地"
else
  PH_COUNT=$(echo "$ICLOUD_PLACEHOLDERS" | wc -l | tr -d ' ')
  print_warn "$PH_COUNT 个文件未下载完成"
  echo "$ICLOUD_PLACEHOLDERS" | head -5 | sed 's|^\./|      |'
  [ "$PH_COUNT" -gt 5 ] && echo "      ... 还有 $((PH_COUNT-5)) 个"
  echo "      → 触发下载: 在 Finder 里点击这些文件,或运行 brctl download <文件>"
fi

# ─── 3. Git 锁文件残留 ─────────────────────────────────────────
print_header "3. Git 锁文件残留"
LOCK_FILES=$(find .git -name "*.lock" 2>/dev/null)

if [ -z "$LOCK_FILES" ]; then
  print_ok "无 git 锁文件残留"
else
  print_error "发现 git 锁文件:"
  echo "$LOCK_FILES" | sed 's/^/      /'
  echo "      → 处理建议: 先确认无 git 进程在跑 (ps aux | grep git)"
  echo "        若确实是残留,手动删除: rm <锁文件路径>"
fi

# ─── 4. Git 仓库完整性 ─────────────────────────────────────────
print_header "4. Git 仓库完整性 (git fsck)"
FSCK_OUTPUT=$(git fsck --no-dangling 2>&1)
FSCK_ERRORS=$(echo "$FSCK_OUTPUT" | grep -ciE "error|missing|broken|corrupt" || true)

if [ "$FSCK_ERRORS" -eq 0 ]; then
  print_ok "git 仓库完整"
else
  print_error "git fsck 报错 $FSCK_ERRORS 处:"
  echo "$FSCK_OUTPUT" | head -10 | sed 's/^/      /'
  echo "      → 这是严重信号,可能 iCloud 同步损坏了 .git/"
  echo "        建议: 暂停所有 git 操作,从 GitHub 重新 clone 一份对比"
fi

# ─── 5. iCloud 同步状态 ────────────────────────────────────────
print_header "5. iCloud 当前同步状态"
if command -v brctl &> /dev/null; then
  # brctl status 输出量大,只检查是否在活跃同步
  SYNC_OUTPUT=$(brctl status 2>/dev/null | head -50)
  if echo "$SYNC_OUTPUT" | grep -qiE "uploading|downloading|syncing|pending"; then
    print_warn "iCloud 正在同步中"
    echo "$SYNC_OUTPUT" | grep -iE "uploading|downloading|syncing|pending" | head -3 | sed 's/^/      /'
    echo "      → 谨慎进行 git 操作,等待同步完成更稳妥"
  else
    print_ok "iCloud 当前未在活跃同步"
  fi
else
  print_warn "brctl 命令不可用,跳过 iCloud 同步状态检查"
fi

# ─── 6. .DS_Store 污染 ─────────────────────────────────────────
print_header "6. .DS_Store 文件"
DS_FILES=$(find . -name ".DS_Store" -not -path "./.git/*" 2>/dev/null)

if [ -z "$DS_FILES" ]; then
  print_ok "无 .DS_Store 文件"
else
  DS_COUNT=$(echo "$DS_FILES" | wc -l | tr -d ' ')
  if git check-ignore .DS_Store &> /dev/null 2>&1; then
    print_ok ".DS_Store 已被 .gitignore 忽略 ($DS_COUNT 个文件)"
  else
    print_warn "$DS_COUNT 个 .DS_Store 文件,且未在 .gitignore 中"
    echo "      → 建议: echo '.DS_Store' >> .gitignore"
  fi
fi

# ─── 7. Working tree 状态 ──────────────────────────────────────
print_header "7. Working tree 状态"
UNCOMMITTED=$(git status --porcelain | wc -l | tr -d ' ')
if [ "$UNCOMMITTED" -eq 0 ]; then
  print_ok "working tree 干净 (无未提交变更)"
else
  print_warn "$UNCOMMITTED 个未提交变更"
  git status --short | head -8 | sed 's/^/      /'
  [ "$UNCOMMITTED" -gt 8 ] && echo "      ... 还有 $((UNCOMMITTED-8)) 个"
fi

# ─── 8. Remote 同步状态 ────────────────────────────────────────
print_header "8. Remote (origin) 同步状态"
if git remote get-url origin &> /dev/null; then
  # 静默 fetch
  if git fetch --quiet 2>/dev/null; then
    AHEAD=$(git rev-list --count "@{u}..HEAD" 2>/dev/null || echo "?")
    BEHIND=$(git rev-list --count "HEAD..@{u}" 2>/dev/null || echo "?")

    if [ "$AHEAD" = "0" ] && [ "$BEHIND" = "0" ]; then
      print_ok "与 origin 同步 (0 ahead / 0 behind)"
    elif [ "$BEHIND" != "0" ] && [ "$BEHIND" != "?" ] && [ "$AHEAD" != "0" ] && [ "$AHEAD" != "?" ]; then
      print_warn "本地与 origin 分叉: $AHEAD ahead, $BEHIND behind"
      echo "      → 需要 merge 或 rebase 协调"
    elif [ "$BEHIND" != "0" ] && [ "$BEHIND" != "?" ]; then
      print_warn "本地落后 origin $BEHIND 个 commit"
      echo "      → 建议: git pull"
    elif [ "$AHEAD" != "0" ] && [ "$AHEAD" != "?" ]; then
      print_warn "本地领先 origin $AHEAD 个 commit (未 push)"
      echo "      → 建议: git push"
    else
      print_warn "无法判断同步状态 (upstream 未设置?)"
    fi
  else
    print_warn "git fetch 失败 (网络问题或权限)"
  fi
else
  print_warn "未配置 origin remote"
  echo "      → 若准备走 L3 路径,先在 GitHub 创建私有 repo 并设置 remote"
fi

# ─── 9. Vault 规模快照 ─────────────────────────────────────────
print_header "9. Vault 规模"
MD_TOTAL=$(find . -name "*.md" -not -path "./.git/*" -not -path "./.obsidian/*" 2>/dev/null | wc -l | tr -d ' ')
INBOX_COUNT=$(find inbox -maxdepth 1 -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
WIKI_COUNT=$(find wiki/pages -maxdepth 1 -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
RAW_COUNT=$(find wiki/raw -maxdepth 1 -type f 2>/dev/null | wc -l | tr -d ' ')

echo "      总 md 文件数:    $MD_TOTAL"
echo "      inbox 条目数:    $INBOX_COUNT"
echo "      wiki/pages 数:   $WIKI_COUNT"
echo "      wiki/raw 数:     $RAW_COUNT"

if [ "$INBOX_COUNT" -gt "$INBOX_THRESHOLD" ]; then
  print_warn "inbox 积压 >$INBOX_THRESHOLD 条,建议蒸馏处理"
fi

# ─── 总结 ──────────────────────────────────────────────────────
echo
echo "═════════════════════════════════════════════════════════"
if [ "$ISSUES" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
  echo -e "${GREEN}${BOLD}  ✓ 全部检查通过,vault 健康${NC}"
elif [ "$ISSUES" -eq 0 ]; then
  echo -e "${YELLOW}${BOLD}  ⚠ $WARNINGS 项警告 (无致命问题)${NC}"
  echo -e "${YELLOW}    可以继续 git 操作,但建议先看看上面的警告${NC}"
else
  echo -e "${RED}${BOLD}  ✗ $ISSUES 项问题, $WARNINGS 项警告${NC}"
  echo -e "${RED}    建议处理 ✗ 标记的问题后再进行 git 操作${NC}"
fi
echo "═════════════════════════════════════════════════════════"
echo

# 退出码: 有 issue 返回 1,纯警告或无事返回 0 (便于自动化场景)
[ "$ISSUES" -eq 0 ] && exit 0 || exit 1
