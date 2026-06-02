---
type: result
from: codex
to: chat-claude
task: hermes-cross-eval
created: 2026-06-02
---

# Result — Hermes cross-eval

## 总裁决

**部分落地,正式 gate 暂不可用。**

已完成:

- Hermes gateway launchd 持久化确认 + restart
- `vault-tidy --draft` dogfood 通过,证明 Hermes CLI + skill 执行链能跑通
- `cross-eval` skill 执行体安装到 Hermes
- `cross-eval-run.py` 确定性脚本安装并可静态检测 GPT / DeepSeek / Qwen 三家系候选
- Book Mirror 工作流已接入 cross-eval gate 文档
- skillify 反思页已落 `wiki/pages/skill-cross-eval.md`

阻塞:

- OpenRouter 真实调用返回 `HTTP 401: User not found`,所以三模型 eval 不能正式启用
- gateway launchd 是 running,但 gateway error log 显示 Telegram token rejected;消息平台健康未通过

## 1. Hermes 平台冒烟

### gateway

- `hermes --version`:Hermes Agent v0.13.0
- launchd plist:`~/Library/LaunchAgents/ai.hermes.gateway.plist`
- `launchctl print gui/501/ai.hermes.gateway`:state = running
- 执行 `hermes gateway restart`:成功,`runs = 2`,新 pid 可见

### vault-tidy dogfood

命令:

```bash
hermes chat -Q -s vault-tidy -q "运行 vault-tidy --draft..."
```

结果:

- PASS(vault 正式内容未被 Hermes 写入)
- session_id:`20260602_203010_7630ee`
- 生成了旧路径 `.tmp-claude-reports/draft-tidy-2026-06-02_2030.md`
- 该旧目录只含本次 dogfood 草稿,已清理,避免退役通道回流

dogfood 暴露的 drift:

- `~/.hermes/skills/vault-tidy.md` 的 `--draft` 段仍写 `.tmp-claude-reports/`,应后续改到 `claude-drafts/result-tidy-*.md`

## 2. 多模型接入状态

静态配置:

```json
{
  "available_models": [
    {"role": "遗漏", "family": "openai", "provider": "openrouter", "model": "openai/gpt-4o-mini"},
    {"role": "太泛", "family": "deepseek", "provider": "openrouter", "model": "deepseek/deepseek-chat"},
    {"role": "精确", "family": "qwen", "provider": "openrouter", "model": "qwen/qwen-2.5-72b-instruct"}
  ],
  "non_claude_families": ["deepseek", "openai", "qwen"],
  "static_gate_configured": true
}
```

真实 dogfood:

- 使用 `/private/tmp/cross-eval-draft-smoke.md` + `/private/tmp/cross-eval-source-smoke.md`
- 首次普通沙箱调用失败:`URLError(PermissionError(1, 'Operation not permitted'))`
- 提升网络权限后真实调用 OpenRouter,三路均失败:`HTTP 401: {"error":{"message":"User not found.","code":401}}`

结论:

- 配置候选足够,但 OpenRouter key / 账户 / 路由不可用
- 正式启用前需要修 OpenRouter,或补原生 `OPENAI_API_KEY` / `DEEPSEEK_API_KEY` / `DASHSCOPE_API_KEY`

## 3. cross-eval skill 已安装

安装位置:

- `~/.hermes/skills/cross-eval.md`
- `~/.hermes/scripts/cross-eval-run.py`
- `~/.hermes/skills/cross-eval/SKILL.md`

说明:

- handoff 指定 flat siblings:`cross-eval.md` + `scripts/cross-eval-run.py`
- 但 Hermes 当前 skill prompt 快照只扫描目录式 `SKILL.md` / `DESCRIPTION.md`
- 因此保留 handoff 指定单文件,同时加一个目录式注册镜像;脚本仍放 `~/.hermes/scripts/`,不嵌到 skill 目录

验证:

```bash
hermes skills list | rg "cross-eval|review-digest|vault-tidy"
```

结果:

- `cross-eval` local enabled
- `review-digest` local enabled
- `vault-tidy` local enabled

脚本行为:

- `--check-config` 是静态体检,只验证候选模型数量
- 正式 eval 会实际调用模型;成功评审的非 Claude 家系少于两个时,报告总裁决为 `红旗阻断`
- 报告默认写 `inbox/cross-eval-{draft-name}-{YYYY-MM-DD}.md`

## 4. 书镜已接入 gate

已更新 `wiki/CLAUDE.md`:

- Book Mirror 不再直接写 `wiki/pages/`
- 新流程:staging 草稿 → Hermes cross-eval → Haopeng 审报告 → 通过 gate 后写 `## Mirror`
- §13.2 记录 Hermes `cross-eval` 作为目标执行体,并标明正式启用前需保证多模型认证可用

## 5. skillify

新增:

- `wiki/pages/skill-cross-eval.md`

更新:

- `wiki/pages/index.md` Skills 区加入 `[[skill-cross-eval]]`

`skill-cross-eval.md` 当前状态为 `draft`,因为执行体已注册,但三模型真实调用被 OpenRouter 401 阻塞。

## 后续修复清单

1. 修 OpenRouter key / 账户状态,或补原生 OpenAI / DeepSeek / DashScope key。
2. 再跑一次 `/private/tmp` 最小 dogfood,要求至少两个非 Claude 家系成功返回。
3. 用真实 Book Mirror staging 草稿跑一次 cross-eval,检查 inbox 报告可读性。
4. 修 `vault-tidy --draft` 的旧落点 `.tmp-claude-reports/`。
5. 修 gateway Telegram token rejected,否则 launchd running 但消息平台不可用。
