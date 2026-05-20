# Hermes Agent 安装 & review-digest Skill 部署指南

> **执行机器：Haopeng's Mac mini**
> **日期：2026-05-11**
> **Hermes 版本：v0.13.0（The Tenacity Release）**

---

## 阶段一：诊断 & 清理

### 1.1 诊断当前状态

把下面整段贴进终端，截图回报：

```bash
echo "===== 1. hermes 命令 ====="
which hermes 2>&1 || echo "未找到 hermes"
hermes --version 2>&1 || echo "无法执行 hermes --version"

echo ""
echo "===== 2. ~/.hermes 目录 ====="
if [ -d "$HOME/.hermes" ]; then
  ls -la "$HOME/.hermes"
  du -sh "$HOME/.hermes"/* 2>/dev/null
else
  echo "~/.hermes 不存在"
fi

echo ""
echo "===== 3. hermes 进程 ====="
pgrep -lf hermes 2>&1 || echo "无 hermes 进程"

echo ""
echo "===== 4. launchd 里的 hermes ====="
launchctl list 2>/dev/null | grep -i hermes || echo "无 hermes launchd 任务"

echo ""
echo "===== 5. PATH 里的 hermes ====="
ls -la "$HOME/.local/bin/hermes" 2>/dev/null || echo "~/.local/bin/hermes 不存在"

echo ""
echo "===== 6. shell 配置里的 hermes ====="
grep -n -i hermes "$HOME/.zshrc" "$HOME/.zprofile" "$HOME/.bashrc" 2>/dev/null || echo "shell rc 无 hermes 引用"

echo ""
echo "===== 7. git 版本 ====="
git --version

echo ""
echo "===== 8. ZHPMind vault 位置确认 ====="
VAULT_PATH="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/ZHPMind"
if [ -d "$VAULT_PATH" ]; then
  echo "ZHPMind vault 存在于: $VAULT_PATH"
  ls "$VAULT_PATH"/ | head -10
  echo "---"
  [ -d "$VAULT_PATH/.git" ] && echo "✅ vault 已 git 化" || echo "⚠️ vault 未 git 化"
else
  echo "⚠️ ZHPMind vault 未在预期 iCloud 路径找到"
fi
```

### 1.2 如果已有旧安装 → 备份 + 卸载

> 如果诊断显示 `~/.hermes` 不存在，跳过这步直接到阶段二。

```bash
# 备份旧的 skills 和 sessions（以防你之前写过自定义 skill）
BACKUP_DIR="$HOME/hermes-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r "$HOME/.hermes/skills" "$BACKUP_DIR/" 2>/dev/null
cp -r "$HOME/.hermes/sessions" "$BACKUP_DIR/" 2>/dev/null
cp "$HOME/.hermes/config.yaml" "$BACKUP_DIR/" 2>/dev/null
cp "$HOME/.hermes/.env" "$BACKUP_DIR/" 2>/dev/null
echo "备份到: $BACKUP_DIR"
ls -la "$BACKUP_DIR"
```

```bash
# 卸载 gateway 服务（如果有）
hermes gateway uninstall 2>/dev/null || true

# 删除整个 ~/.hermes
rm -rf "$HOME/.hermes"

# 删除 symlink
rm -f "$HOME/.local/bin/hermes"

echo "✅ 旧安装已清理"
```

---

## 阶段二：全新安装

### 2.1 安装 Hermes Agent

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

**安装器会自动处理：** uv、Python 3.11、Node.js、ripgrep、ffmpeg。
**安装位置：** `~/.hermes/hermes-agent/`（代码） + `~/.local/bin/hermes`（symlink）

安装完成后，重新加载 shell：

```bash
source ~/.zprofile
source ~/.zshrc
```

### 2.2 验证安装

```bash
hermes --version
hermes doctor
```

两个命令都截图回报。`hermes doctor` 会检测依赖和环境是否完整。

### 2.3 配置 AI 提供商

```bash
hermes model
```

这会打开交互式选择器。**推荐选 Anthropic**，理由：

- 你日常用 Claude，API key 可以复用
- Hermes 要求至少 64K context 的模型，Claude 满足
- Skill 执行和 cron 可以选便宜模型（后续调整）

选择过程中会要求你输入 API key。如果你还没有 Anthropic API key，需要去 [console.anthropic.com](https://console.anthropic.com) 创建。

> ⚠️ **API key 是敏感信息，不要粘贴到对话里。** 直接在终端输入即可。
>
> ⚠️ **粘贴时不回显是正常的**（看起来什么都没输入）——这是终端的安全设计。不要因此反复粘贴，容易导致密钥错乱。如果配置后验证失败，直接执行 `vim ~/.hermes/.env` 检查 key 是否准确，不对就手动修改（vim 编辑模式：按 `i` 进入插入，改完按 `Esc` → 输入 `:wq` → 回车保存退出）。

### 2.4 验证对话能力

```bash
hermes chat -q "你好，请告诉我你现在可以使用的工具列表。"
```

如果能正常回复并列出工具，说明安装成功。截图回报。

### 2.5 确认关键目录结构

```bash
echo "===== Hermes 目录结构 ====="
ls -la ~/.hermes/
echo ""
echo "===== Skills 目录 ====="
ls ~/.hermes/skills/ 2>/dev/null || echo "skills 目录为空或不存在"
echo ""
echo "===== Config ====="
cat ~/.hermes/config.yaml 2>/dev/null | head -30
```

### 2.6 关键约束知识（长期会用到）

装完之后有几个 Hermes 的固有约束，先知道能少踩坑：

| 项 | 默认值 | 说明 |
|---|---|---|
| `config.yaml` 热加载 | ❌ 不支持 | 改完必须重启 hermes 才生效 |
| `creation_nudge_interval` | 15 | 每 15 轮工具循环触发一次后台 skill 自动复盘（见 skillify 工作流） |
| `memory_char_limit` | 2200 字符 | `MEMORY.md`（agent 笔记：环境、项目惯例、踩过的坑）字符上限。如果发现经常被打满，调到 4000 |
| `user_char_limit` | 1375 字符 | `USER.md`（用户画像：偏好、沟通风格、工作习惯）字符上限 |
| `nudge_interval` | 10 | 每 10 轮提醒 agent 主动存记忆。觉得记忆不够好可调到 5 |
| `flush_min_turns` | 6 | 退出前至少 6 轮才触发记忆刷新 |
| 摘要预算公式 | `min(context * 0.05, ceiling)` | 200K 模型给 10K token 摘要预算，1M 模型给 50K |

**注意 Hermes 的三个本地文件和 ZHPMind 是分开的，互不污染**：

- `~/.hermes/SOUL.md` —— Hermes 的人格定义（你想让它是什么样的 agent）
- `~/.hermes/MEMORY.md` —— Hermes 的工作笔记（它对环境的认知）
- `~/.hermes/USER.md` —— Hermes 眼中的你（沟通偏好/工作习惯）

这三个文件是 Hermes 自我维护的，不要写进 ZHPMind vault。ZHPMind 是你的脑，这三个是 Hermes 的脑。

这些值都在 `~/.hermes/config.yaml` 里。**不用立刻改，先按默认跑两周观察使用情况，再针对性调整。**

---

## 阶段三：配置 review-digest Skill

### 3.1 这个 Skill 做什么

**review-digest** 是 ZHPMind 的健康度周报。它扫描 vault 自身，产出一份结构化摘要到 `inbox/`，让你在每周 review 时一眼看到系统状态。

**产出内容（对应 design-principles 的健康度指标）：**

| 检查项 | 说明 |
|---|---|
| inbox 积压 | inbox/ 下未处理条目数，>50 条警告 |
| wiki 孤岛率 | wiki/pages/ 中无 backlink 的页面占比，>30% 警告 |
| projects 僵尸率 | projects/ 中 >3 月未修改的项目占比 |
| 本周新增 | 本周新建 / 修改的 wiki 页面列表 |
| 本周 capture | 本周新增到 inbox 的条目数 |
| MOC 候选 | 某 tag 下 ≥5 页但还没有 MOC 的主题 |

**频率：** weekly（每周一次，通过 Hermes cron 触发）
**产出位置：** `inbox/review-digest-YYYY-MM-DD.md`

### 3.2 创建 Skill 文件

> 下面的命令会在 `~/.hermes/skills/` 下创建 skill 文件。
> 你需要先确认 ZHPMind vault 的实际路径——诊断脚本的输出会告诉你。
> 默认假设是：`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/ZHPMind`

```bash
cat > ~/.hermes/skills/review-digest.md << 'SKILL_EOF'
---
name: review-digest
description: ZHPMind vault 健康度周报。扫描 vault 状态，生成结构化 digest 写入 inbox。
trigger: weekly review, vault health check, 周报, review digest
created_by: human
version: 1.0
---

# Review Digest — ZHPMind 健康度周报

## 目标

扫描 ZHPMind vault，生成一份健康度 digest，写入 `inbox/review-digest-{YYYY-MM-DD}.md`。
这是认知循环的 **review** 环节——让系统的主人看到系统自身的状态。

## Vault 路径

```
~/Library/Mobile Documents/iCloud~md~obsidian/Documents/ZHPMind
```

如果路径不存在，报错退出，不要猜测其他路径。

## 扫描步骤

按顺序执行以下检查：

### 1. Inbox 积压

- 统计 `inbox/` 下的 `.md` 文件数量（不含子目录中的 `.obsidian` 等系统文件）
- 如果 >50，标记为 🔴 警告
- 如果 20-50，标记为 🟡 注意
- 如果 <20，标记为 🟢 正常

### 2. Wiki 孤岛率

- 扫描 `wiki/pages/` 下所有 `.md` 文件
- 对每个文件名（不含 `.md`），在整个 vault 中搜索 `[[文件名]]` 或 `[[文件名|` 形式的引用
- 如果一个 wiki 页面在 vault 中没有任何其他文件链接到它（0 个 backlink），视为"孤岛"
- 孤岛率 = 孤岛数 / wiki 总页数
- >30% 标 🔴，15-30% 标 🟡，<15% 标 🟢
- 列出所有孤岛页面的文件名

### 3. Projects 僵尸率

- 扫描 `projects/` 下的一级子目录
- 对每个子目录，找到其中最近修改的 `.md` 文件的修改时间
- 如果距今 >90 天，视为"僵尸项目"
- 僵尸率 = 僵尸数 / 活跃项目总数
- 列出所有僵尸项目及其最后修改日期

### 4. 本周活动

- 扫描 `wiki/pages/` 中过去 7 天内修改过的文件，列出文件名和修改日期
- 扫描 `wiki/pages/` 中过去 7 天内新建的文件（创建时间在 7 天内），单独标注

### 5. 本周 Capture

- 统计 `inbox/` 中过去 7 天内新增的文件数量
- 列出文件名

### 6. MOC 候选检测

- 扫描 `wiki/pages/` 所有文件的 frontmatter `tags` 字段
- 统计每个 tag 被多少个页面使用
- 如果某 tag 被 ≥5 个页面使用，但 vault 中不存在对应的 `MOC-{tag名}.md` 文件，则标记为 MOC 候选
- 列出所有 MOC 候选及其页面数

### 7. 修正频率

- 在 `wiki/pages/` 中，统计过去 30 天内被修改过（但不是新建的）的页面数量
- 如果为 0，标 🔴（认知僵化警告）

## 输出格式

将结果写入 `inbox/review-digest-{YYYY-MM-DD}.md`，格式如下：

```markdown
---
type: snapshot
source: hermes/review-digest
created: {YYYY-MM-DD}
tags:
  - system/review
---

# ZHPMind 周报 — {YYYY-MM-DD}

## 总览

| 指标 | 状态 | 数值 |
|---|---|---|
| Inbox 积压 | {emoji} | {N} 条 |
| Wiki 孤岛率 | {emoji} | {N}%（{孤岛数}/{总数}）|
| Projects 僵尸率 | {emoji} | {N}%（{僵尸数}/{总数}）|
| 本周 wiki 活动 | — | {新建 N} 篇新建，{修改 N} 篇修改 |
| 本周 capture | — | {N} 条 |
| 修正频率（30天） | {emoji} | {N} 篇 |

## Inbox 积压详情

（如果 >20 条，列出最旧的 10 条文件名和创建日期）

## Wiki 孤岛页面

（列出所有孤岛页面文件名）

## 僵尸项目

（列出项目名 + 最后修改日期）

## MOC 候选

| Tag | 使用页数 |
|---|---|
| {tag} | {N} |

## 本周新建 Wiki 页面

（列表）

## 本周修改 Wiki 页面

（列表）
```

## 注意事项

- 不要修改 vault 中的任何现有文件——只在 inbox/ 下创建新文件
- 文件名中的日期用 ISO 格式：YYYY-MM-DD
- frontmatter 中的 `type: snapshot` 和 `source: hermes/review-digest` 是必须的——符合 ZHPMind 的信息三态分类（快照类，定期被新快照替代）
- 如果 vault 路径不存在或权限不足，报错退出并说明原因
SKILL_EOF

echo "✅ review-digest.md 已创建"
ls -la ~/.hermes/skills/review-digest.md
```

### 3.3 验证 Skill 已注册

```bash
hermes skills
```

截图回报。在列表中应该能看到 `review-digest`。

### 3.4 手动测试一次

```bash
hermes chat -q "运行 review-digest skill，扫描我的 ZHPMind vault 并生成周报。"
```

看输出是否正确。重点确认：
1. 它找到了 vault 路径
2. 各项指标数值合理
3. 输出文件确实写到了 `inbox/` 下

确认无误后截图回报。

### 3.5 设置 Cron 自动执行

每周一早上 9 点自动运行：

```bash
hermes cron add \
  --schedule "0 9 * * 1" \
  --prompt "运行 review-digest skill，扫描 ZHPMind vault 生成本周健康度周报。"
```

确认 cron 已添加：

```bash
hermes cron list
```

截图回报。

### 3.6 启动 Cron 调度器（如果还没运行）

```bash
hermes cron start
```

如果你想让 cron 在系统重启后自动运行（推荐），安装 gateway 服务：

```bash
hermes gateway install
```

这会创建一个 launchd plist，让 Hermes gateway 和 cron scheduler 随系统启动。

---

## 验证清单

完成所有步骤后，确认以下几项：

- [ ] `hermes --version` 显示 v0.13.0 或更新
- [ ] `hermes doctor` 无红色错误
- [ ] `hermes model` 已配置 Anthropic（或你选择的 provider）
- [ ] `hermes skills` 列表中有 `review-digest`
- [ ] 手动测试生成了 `inbox/review-digest-2026-05-11.md`
- [ ] `hermes cron list` 显示周一 9:00 的 review-digest 任务
- [ ] cron scheduler 正在运行

---

## 目录结构映射

安装完成后，Hermes 在你系统中的位置：

```
~/.hermes/
├── hermes-agent/     ← Hermes 代码（git clone）
├── config.yaml       ← 主配置（模型、工具、终端后端）
├── .env              ← API keys（敏感）
├── SOUL.md           ← Agent 人格（后续定制）
├── skills/
│   └── review-digest.md  ← 👈 我们创建的第一个 skill
├── sessions/         ← 对话记录（SQLite）
├── cron/             ← 定时任务定义
└── logs/             ← 调度器 & gateway 日志

~/.local/bin/hermes   ← CLI 入口（symlink）
```

与 ZHPMind 的接口关系：

```
Hermes Agent ──写入──→ ZHPMind/inbox/review-digest-*.md
                        ↓
              Claudian ──蒸馏──→ wiki/pages/（如果 digest 中发现需要行动的项）
```

---

## 下一步（本次不做，记录待办）

1. **SOUL.md 定制** —— 告诉 Hermes 你是谁、你的工作上下文、ZHPMind 的结构。
   - **推荐做法**：装完后先用 Hermes 正常对话 2~3 天（让 session search 积累上下文），然后直接问它：「你根据这几天的对话，给我推荐一个 SOUL.md 配置」。它会调动 session 记忆做总结，比你一开始硬写好用很多。
   - SOUL.md 在 `~/.hermes/SOUL.md`，默认是注释掉的空文件。
   - 内容方向参考：**思考模式**（先验证后回答、先计划后执行、交付即验证）、**自我约束**(不确定就说不确定、不重复踩坑、发现冲突主动指出)、**输出纪律**（结论先行、高危预警、代码/命令为主）——这些和 ZHPMind 的 AI 红线（溯源/互评/可回滚）一脉相承。
2. **Auxiliary 副驾 LLM 路由配置** —— Hermes 支持为 8 类任务（vision/web_extract/compression/session_search/approval/skills_hub/mcp/flush_memories）分别指定模型。`review-digest` 这种扫描型任务可以用便宜模型跑，主对话保留 Claude。长期能省钱。
3. **Gateway 配置** —— 如果你想通过手机消息触发 Hermes（Telegram/Signal/微信）
4. **更多 Skills** —— design-principles 里规划的 policy-monitor、product-trend-watch、email-triage、competitor-watch。这些 skill 需要先配 web_search（exa/Tavily/firecrawl 任选）和反爬浏览器（Camofox）才能跑。
5. **Cross-modal eval 启用** —— 用 Hermes 多 profile 机制实现：主 profile 跑 Claude 做 distill，worker profile 跑不同家系模型（如 qwen）做 eval。这是 AI 红线"互评"约束的技术落地。
6. **`~/.hermes/` 入备份链路** —— 把 `config.yaml`、`skills/`、`SOUL.md`、`MEMORY.md`、`USER.md`、`cron/` 纳入 mac-sync。**排除** `.env`（敏感）、`state.db`（机器特定，几十兆）、`sessions/`、`logs/`。
