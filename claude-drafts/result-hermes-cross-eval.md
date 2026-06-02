---
type: result
from: codex
to: chat-claude
task: hermes-cross-eval
created: 2026-06-02
updated: 2026-06-02
---

# Result — Hermes cross-eval review 1-4

## 总裁决

已按 `claude-drafts/review-hermes-cross-eval.md` 的 1-4 打包处理。第 5 项 Telegram token rejected 按要求单独排,本轮不修。

当前状态:**代码/执行体已按 Claude / GPT / DeepSeek 原生三模型方案改完,但正式 gate 仍被凭据阻塞。**

阻塞原因不是脚本逻辑,而是本机缺少:

- `OPENAI_API_KEY`
- `DEEPSEEK_API_KEY`

因此本轮无法提供「GPT + DeepSeek 两家真实返回」。我实际跑了 `/private/tmp` dogfood:Claude/Anthropic 精确位真实返回 pass;OpenAI/DeepSeek 因没有 key 不进入模型列表,gate 正确红旗阻断。

## 1. 模型认证 + Garry 三模型

已改 `~/.hermes/scripts/cross-eval-run.py`:

- 新增 Anthropic messages API 路径:
  - endpoint:`https://api.anthropic.com/v1/messages`
  - header:`x-api-key`, `anthropic-version: 2023-06-01`
  - payload:system 单独传,`max_tokens` 必填
  - response:`content[].text`
- 默认模型集改为:
  - Claude / Anthropic:role=`精确`,family=`claude`,默认模型 `claude-opus-4-6`
  - GPT / OpenAI:role=`遗漏`,family=`openai`,默认模型 `gpt-4o-mini`
  - DeepSeek:role=`太泛`,family=`deepseek`,默认模型 `deepseek-chat`
- 移除默认 Qwen / DashScope 分支
- OpenRouter 改为显式 fallback:
  - 只有设置 `CROSS_EVAL_ENABLE_OPENROUTER=1` 才启用
  - 默认不走 OpenRouter,避免单聚合器单点故障
- gate 语义保持 fail-safe:
  - Claude 精确位不计入跨家系下限
  - GPT/OpenAI + DeepSeek 两家非 Claude 都成功才满足 gate
  - 少于两个非 Claude 成功返回 → `红旗阻断`

## 2. Book Mirror 按章评审

已改 `cross-eval-run.py`:

- 新增 `--chapter-id`
- `content_type=mirror` 默认不允许 head/tail 裁切
- mirror 输入超过 `--max-chars` 时直接退出,提示拆成「每章 draft + 每章 source」再跑
- 只有显式传 `--allow-clip` 才允许裁切,且文档注明不用于 Book Mirror
- 报告 frontmatter 增加 `chapter_id`
- 报告配置段增加 `clipped_inputs`

本地裁切 gate 验证:

```text
python3 ~/.hermes/scripts/cross-eval-run.py ... --content-type mirror --max-chars 10
/private/tmp/cross-eval-source-smoke.md is 107 chars, above --max-chars=10. For Book Mirror / mirror eval, split by chapter and run one chapter draft + one chapter source per eval, or pass --allow-clip only for non-book short-form review.
```

已更新 `wiki/CLAUDE.md`:

- Book Mirror 流程改成每章 staging → Hermes cross-eval → Haopeng 审报告 → 通过 gate 后写 `## Mirror`

## 3. skill 权威收敛

已执行:

- 删除 `~/.hermes/skills/cross-eval.md`
- 保留并定义唯一权威:`~/.hermes/skills/cross-eval/SKILL.md`
- 脚本仍在:`~/.hermes/scripts/cross-eval-run.py`

验证:

```text
hermes skills list | rg -n "cross-eval|review-digest|vault-tidy"
5:│ cross-eval              │                      │ local   │ local   │ enabled │
7:│ review-digest           │                      │ local   │ local   │ enabled │
8:│ vault-tidy              │                      │ local   │ local   │ enabled │
```

## 4. vault-tidy --draft 落点

已改:

- `~/.hermes/skills/vault-tidy.md`
- `~/.hermes/skills/vault-tidy/SKILL.md`

`--draft` 落点从:

```text
.tmp-claude-reports/draft-tidy-{timestamp}.md
```

改为:

```text
claude-drafts/result-tidy-{timestamp}.md
```

## --check-config 输出

当前本机真实输出:

```json
{
  "available_models": [
    {
      "role": "精确",
      "family": "claude",
      "provider": "anthropic",
      "model": "claude-opus-4-6"
    }
  ],
  "non_claude_families": [],
  "static_gate_configured": false
}
```

解释:

- Anthropic key 可用,Claude 精确位进入候选
- `OPENAI_API_KEY` 未配置
- `DEEPSEEK_API_KEY` 未配置
- 因此 GPT + DeepSeek 两家非 Claude 不满足 gate

Hermes `status` 也确认:

```text
OpenRouter    ✓ sk-o...a667
OpenAI        ✗ (not set)
DeepSeek      ✗ (not set)
Anthropic     ✓ sk-a...QQAA
```

## /tmp dogfood 证据

命令:

```bash
python3 ~/.hermes/scripts/cross-eval-run.py \
  --draft-path /private/tmp/cross-eval-draft-smoke.md \
  --source-ref /private/tmp/cross-eval-source-smoke.md \
  --content-type mirror \
  --chapter-id smoke-ch01 \
  --output-dir /private/tmp \
  --timeout 90
```

结果文件:

```text
/private/tmp/cross-eval-cross-eval-draft-smoke-2026-06-02-234745.md
```

总裁决:

```text
verdict: 红旗阻断 (成功评审的非 Claude 家系只有 0 个: none)
```

Claude/Anthropic 真实返回证据:

```text
## 模型: 精确 / claude / anthropic / claude-opus-4-6

裁决: pass

摘要列问题:
未发现实质性问题。摘要列与 source 中 "the launch had two phases: research first, then pricing" 一致。

镜射列问题:
未发现问题。镜射列明确声明这是 smoke test,不是关于 Haopeng 的断言。

红旗:
虚构来源: 未发现
编造的关于 Haopeng 的事实: 未发现
事实错误: 未发现
```

未能提供两家非 Claude 真实返回的原因:

- `OPENAI_API_KEY` 缺失 → GPT 不进入模型列表
- `DEEPSEEK_API_KEY` 缺失 → DeepSeek 不进入模型列表
- 按 review 要求已默认弃用 OpenRouter,所以不再用 OpenRouter 401 的聚合器路径凑数

## Vault 文档同步

已更新:

- `wiki/CLAUDE.md`
  - cross-eval 目标执行体改为 Claude / GPT / DeepSeek
  - 权威路径改为 `~/.hermes/skills/cross-eval/SKILL.md`
  - 说明 OpenAI / DeepSeek 原生认证仍待补齐
- `wiki/pages/skill-cross-eval.md`
  - 权威执行体、按章评审、凭据状态、Pitfalls 全部同步
- `wiki/pages/index.md`
  - skill-cross-eval 状态改为待补 OpenAI / DeepSeek key

## 未处理

- review 第 5 项 Telegram token rejected:按用户要求单独排,本轮未处理。

## 下一步

补齐以下两个 key 后重跑 dogfood:

```bash
OPENAI_API_KEY=...
DEEPSEEK_API_KEY=...
```

然后再次运行:

```bash
python3 ~/.hermes/scripts/cross-eval-run.py \
  --draft-path /private/tmp/cross-eval-draft-smoke.md \
  --source-ref /private/tmp/cross-eval-source-smoke.md \
  --content-type mirror \
  --chapter-id smoke-ch01 \
  --output-dir /private/tmp \
  --timeout 90
```

验收条件:报告里至少出现 `openai` 与 `deepseek` 两个 `ok` 模型分节,总裁决不因模型数不足而红旗阻断。
