---
type: skill
title: cross-eval
status: draft
created: 2026-06-02
updated: 2026-06-02
tags:
  - system/skill
  - tool/hermes
  - quality-check
references:
  - design-principles.md
  - wiki/CLAUDE.md
  - skill-adversarial-review.md
  - garry-tan-meta-meta-prompting.md
  - claude-drafts/handoff-hermes-cross-eval.md
---

# cross-eval

cross-eval 是 ZHPMind 红线 #2「互评」的执行层:所有 AI 写入在定稿前,用跨家系模型对「证据链 + 草稿」做独立评审。它不是书镜的附属功能;书镜只是第一个消费者,因为镜射最容易把"看起来懂你"写成虚构或泛话。

## 是什么

- **执行体位置**:`~/.hermes/skills/cross-eval.md`
- **注册镜像**:`~/.hermes/skills/cross-eval/SKILL.md`（Hermes 当前 loader 需要目录式 `SKILL.md` 才会进入 skill list）
- **确定性脚本**:`~/.hermes/scripts/cross-eval-run.py`
- **当前状态**:`status: draft`——执行体已安装并在 `hermes skills list` 中 enabled;静态模型候选足够,但 OpenRouter dogfood 返回 `401 User not found`,正式 gate 暂不可用

## 设计意图

第一版 ZHPMind 的互评停在 self-review:同一个 Claude 家系写完再批评自己。这个机制能抓一部分粗错,但抓不住同家系盲点,也容易把"我知道我要检查"误当成真的安全。

cross-eval 把红线推进到可执行 gate:

1. **喂证据链,不是喂成品**:模型必须同时看到 raw/source 与 draft。
2. **跨家系才算数**:至少两个非 Claude 家系成功评审,否则总裁决红旗阻断。
3. **只写 inbox**:报告进入 `inbox/cross-eval-*.md`,不直接改 `wiki/pages/`。
4. **gate,不是 advisory**:报告必须给 `pass` / `需修后复评` / `红旗阻断`。

## 判据

| 内容列 | 模型能判什么 | 模型不能判什么 |
|---|---|---|
| 摘要 / 原作列 | 事实错误、引用错位、遗漏、曲解 | 原作者未明说但人类读者的最终解释取舍 |
| 映射 / 镜射列 | 虚构 Haopeng 事实、太泛、缺锚点 | 这条映射对 Haopeng 是否真的成立 |

镜射列的 ground truth 是 Haopeng。模型只当闸门,挡虚构和泛话;最后的"真不真"必须人定。

## 使用方式

```bash
python3 ~/.hermes/scripts/cross-eval-run.py \
  --draft-path path/to/staging-draft.md \
  --source-ref wiki/raw/source.md \
  --content-type mirror
```

静态配置体检:

```bash
python3 ~/.hermes/scripts/cross-eval-run.py --check-config
```

注意:`--check-config` 只证明本机有足够候选模型配置,不验证 key / 额度 / Surge / OpenRouter 路由。真实可用性以正式 eval 或最小 dogfood 的模型调用结果为准。

## 书镜接入流

1. Claudian 生成 staging 草稿,先不写 `wiki/pages/`。
2. Hermes cross-eval 读取 raw 原文、staging 草稿、丢弃候选（若有）,写 `inbox/cross-eval-*.md`。
3. Haopeng 审报告:摘要列红旗必须修;镜射列由 Haopeng 判断是否成立。
4. 通过 gate 后,再把镜射写入 book 页 `## Mirror` 区,更新 links / index / log / git commit。

## 实战 Pitfalls

| Pitfall | 性质 | 应对 |
|---|---|---|
| **#1 handoff 指定单文件 `~/.hermes/skills/cross-eval.md`,但 Hermes 当前 prompt 快照只扫描目录式 `SKILL.md` / `DESCRIPTION.md`** | 平台陷阱 | 保留单文件作为 handoff 要求的执行体,同时加 `~/.hermes/skills/cross-eval/SKILL.md` 注册镜像;脚本仍放 `~/.hermes/scripts/`,不嵌套。 |
| **#2 静态配置可通过不等于真实可用** | 认证 / 路由陷阱 | `--check-config` 只看候选;最小 dogfood 实际调用 OpenRouter,当前返回 `401 User not found`,所以正式 gate 暂停。 |
| **#3 gateway launchd running 不等于消息平台健康** | 平台观测陷阱 | 本次 `launchctl print` 显示 running,但 gateway error log 有 Telegram token rejected;平台冒烟要同时看 launchd 和 platform logs。 |
| **#4 vault-tidy dogfood 仍写旧 `.tmp-claude-reports/`** | 旧通道漂移 | 不纳入本次修复范围,但应后续把 vault-tidy `--draft` 落点改到 `claude-drafts/result-tidy-*.md`。 |

## 待解决

- 修复 OpenRouter key / 账户 / 路由,或补原生 `OPENAI_API_KEY`、`DEEPSEEK_API_KEY`、`DASHSCOPE_API_KEY`。
- 用真实 staging book mirror 草稿跑一次 cross-eval,确认 report 结构可读。
- 决定是否把 cross-eval 报告摘要 append 到 `wiki/log.md`。
- 后续若 Hermes 支持单文件 drop-in 注册,移除目录式注册镜像,回到 handoff 期望的 flat sibling 结构。

## References

- [[design-principles]] — AI 红线与 Hermes 多 profile 互评目标
- [[garry-tan-meta-meta-prompting]] — Garry 的书镜 cross-modal eval 来源
- [[skill-adversarial-review]] — cross-role eval,与 cross-eval 互补
- 执行体:`~/.hermes/skills/cross-eval.md`
- 脚本:`~/.hermes/scripts/cross-eval-run.py`
