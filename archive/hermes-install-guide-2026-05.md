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

## 阶段三：review-digest Skill — 设计意图与演化反思

> **本节是文档化反思，不是安装步骤**。review-digest 不需要从零安装：它已经在 `~/.hermes/skills/` 下，由 skill_manage（Hermes 主对话期间的自动维护机制）持续迭代。
>
> 具体可执行内容（SKILL.md 完整文本）由 Hermes 自行维护，见 `~/.hermes/skills/review-digest/SKILL.md`。本文件只放"为什么这么设计、是怎么演化的"。

### 3.1 设计意图

review-digest 是 ZHPMind 的健康度周报。它扫描 vault 自身，产出一份结构化摘要到 `inbox/`，让每周 review 时一眼看到系统状态。

这是 design-principles 第一层「认知循环」里 **review 环节** 的自动化体现——人不可能每次手动扫 vault，需要 skill 把"看到系统当前状态"这件事自动化。

产出位置选在 `inbox/` 而不是 `outputs/` 是有意的：digest 是信息三态中的**快照类**（`type: snapshot`），不是对外输出，应该进入下一轮 review 的待消化队列。

产出指标对应 design-principles 的健康度监测：

| 检查项 | 说明 | 警戒 |
|---|---|---|
| inbox 积压 | inbox/ 下 `.md` 数（排除 `source: hermes/*` 系统快照） | >50 🔴 |
| wiki 孤岛率 | wiki/pages/ 中无 backlink 占比 | >30% 🔴 |
| projects 僵尸率 | >3 月未修改项目占比 | >50% 🔴 |
| 本周活动 | 7 天内修改/新建 wiki 页 | — |
| 本周 capture | 7 天内新增 inbox 条目 | — |
| MOC 候选 | tag 用 ≥5 页但无对应 `*-moc.md` | — |
| 修正频率 | 30 天内被改但非新建的 wiki 页 | =0 🔴 |

频率：每周一次，通过 Hermes cron 触发（见 3.4）。

### 3.2 演化反思（v1 → v4）

这个 skill 在 5/11-5/13 期间经历了快速演化，**不是 Curator 做的**——Curator 截至 5/19 总共才跑过 1 次，且本次结论为「无改动可做」。真正驱动演化的是 **skill_manage 在主对话期间的迭代**：每次用户跟 Hermes 谈"扫描 vault 健康度"任务时，`creation_nudge_interval` 触发后台 skill review，Hermes 通过 skill_manage 更新文件，每次自动留 `.bak`。

| 版本 | 时间 | 关键改动 |
|---|---|---|
| v1.0 | 5/11 | 初版手写（review-digest.md 单文件） |
| v1.1 | 5/12 23:16 | 升级为目录格式（review-digest/SKILL.md + references/），首次加入 Pitfalls 小节 |
| v2.0 | 5/12 23:46 | 排除 `source: hermes/*` 系统快照防自递归；MOC 检测从 `MOC-{tag}.md` 改为 `*-moc.md`（匹配 vault 实际命名）；🔴 必须附具体建议 |
| v3.0 | 5/13 00:18 | MOC 检测改用 wikilinks-as-source |
| v4.0 | 5/13 00:54 | changelog 声明"架构重构：scanner.py 分离"，**但 scanner.py 实际未落地**——这是 changelog ≠ 实现状态的实例 |

**当前状态**：`~/.hermes/skills/` 下并存两份 review-digest：

- `review-digest/SKILL.md`（v1.1，目录形态，含 references/backlink-scanner.md + references/yaml-lite-parser.md）
- `review-digest.md`（v4 changelog，单文件遗留）+ `review-digest.md.v[1-3].bak` 三个备份

哪个被 Hermes 实际加载，运行时观察即可（看 digest 产出 frontmatter 是否包含 changelog 字段、🔴 是否附建议等）。Curator 的 Consolidation Pass 看到的是「1 agent-created skill」（单数），所以 Hermes 内部只识别一个 review-digest，重复版本可能在未来 Curator pass 中被合并。

### 3.3 五条实战 Pitfalls（v1.1 SKILL.md 提炼）

这些是 skill_manage 在每次跑 skill 遇到问题后沉淀进 skill 的实战经验。**比"如何写 skill" 的方法论更有价值——它们是 fix 过的踩坑记录**。

| Pitfall | 性质 | 应对 |
|---|---|---|
| `python3 -c '...'` 触发审批门控 | 工具调用约束 | 把脚本写入 `/tmp/*.py`，用 `terminal('python3 /tmp/x.py')` 执行 |
| `pyyaml` 在沙箱不可用 | 环境约束 | 内联轻量 frontmatter 解析器，参见 `references/yaml-lite-parser.md` |
| `grep -oh '[[...]]'` 漏 alias 形式 | 平台约束（macOS grep 单行） | Python `os.walk` + `re.findall` 全文扫描，参见 `references/backlink-scanner.md` |
| 新建页面当天必然是孤岛 | 业务语义校准 | 报告中对"今日新建"的孤岛加注说明为预期状态 |
| macOS `ctime ≠ 创建时间` | 平台陷阱（iCloud vault 尤甚） | 用 `os.stat(fpath).st_birthtime`（macOS 专有）获取真实创建时间 |

这正是 design-principles 第二层「经验沉淀」原则的实战体现——skill 不只是方法论，更是被 fix 过的踩坑记录。

### 3.4 设置 Cron 自动执行

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

### 3.5 启动 Cron 调度器（如果还没运行）

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
