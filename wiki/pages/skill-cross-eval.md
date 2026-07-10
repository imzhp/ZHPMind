---
type: skill
title: cross-eval
status: experimental
created: 2026-06-02
updated: 2026-07-10
tags:
  - system-skill
  - tool-hermes
  - quality-check
sources: []
source_count: 0
discussions: []
references:
  - "~/.hermes/skills/cross-eval/SKILL.md"
  - "~/.hermes/scripts/cross-eval-run.py"
---

# cross-eval — Skill 反思页

`cross-eval` 是 ZHPMind 的独立质量闸门：用不同模型家系审阅同一份证据链与草稿，专门拦截事实错位、来源错位、虚构映射和过度泛化。

## 设计意图

它不替 Haopeng 判断“是否真正共鸣”，只判断草稿是否足够可核、是否把没有证据的内容写成了事实。它尤其服务 [[skill-book-mirror]]，但并不只属于书镜。

## 当前状态

- 权威执行体：`~/.hermes/skills/cross-eval/SKILL.md`，已被 Hermes 发现。
- 脚本：`~/.hermes/scripts/cross-eval-run.py`。
- 当前静态配置已列出 OpenAI/GPT 与 DeepSeek 两个非 Claude 家系；`--check-config` 通过不等于真实调用、额度和路由都通过。
- 因本轮未重新发起外部模型调用，状态保留 `experimental`；下一次真实 staging 草稿评审成功后再升为 active。

## Gate 判据

1. 输入必须同时包含 source 与 draft；Book Mirror 还必须包含 draft 引用的 vault 事实锚点。
2. OpenAI/GPT 与 DeepSeek 都有真实返回才满足跨家系下限；Claude/Anthropic 可作为可选精确位，不是必要依赖。
3. 报告只写 `inbox/cross-eval-*.md`，不直接改 `wiki/pages/`。
4. Book Mirror 按章运行，禁止整书长稿一次性评审。

## 实战 Pitfalls

| Pitfall | 性质 | 应对 |
|---|---|---|
| 静态配置通过被误当作真实可用 | 认证与路由 | 用最小真实草稿验收，保留两家真实返回证据 |
| 只喂书章、不喂右栏来源 | 证据链缺失 | 至少把 `zhanghaopeng.md` 和每条 `[来源:]` 一并作 `--source-ref` |
| 把 Claude 当作 gate 必要条件 | 供应商依赖 | gate 下限只依赖 OpenAI/GPT + DeepSeek |

## References

- 执行体：`~/.hermes/skills/cross-eval/SKILL.md`
- 书镜：[[skill-book-mirror]]
- 相关机制：[[skill-adversarial-review]]
