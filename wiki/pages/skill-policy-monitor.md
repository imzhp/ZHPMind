---
type: skill
title: policy-monitor
status: draft
created: 2026-06-10
updated: 2026-06-10
tags:
  - system-skill
  - tool-hermes
  - policy-monitor
references:
  - design-principles.md
  - skill-review-digest.md
  - skill-vault-tidy.md
---

# policy-monitor

policy-monitor 是 ZHPMind 的第一个“Push skill”试点：它不是整理已有知识，而是每天从公开政策源里抓取变化，先进入 7 天 dogfood 草稿期，验证过滤精度后再考虑写入 inbox。

## 当前状态

- **执行体**：`~/.hermes/skills/policy-monitor.md`
- **确定性 scanner**：`~/.hermes/scripts/policy-scan.py`
- **源配置**：`~/.hermes/scripts/policy-monitor-sources.yaml`
- **固定 JSON**：`~/.hermes/scratch/policy-scan-latest.json`
- **状态**：`status: draft`，前 7 天只写 `claude-drafts/result-policy-{date}.md`，不写 inbox，不设 cron

## 设计边界

policy-monitor 复用 [[skill-review-digest]] 的稳定管线：脚本负责抓取、diff、去重、硬规则过滤和源健康；LLM 只负责对 `NEEDS_SCORING` 条目做相关性判断和写 digest。这样避免 LLM 临场抓网页、漏掉丢弃记录，或者把今天看到的旧列表误当新政策。

## Stage 0 结论

| 项 | 结论 | 处理 |
|---|---|---|
| Hermes `blogwatcher` | 可借鉴，但依赖 `blogwatcher-cli`，不满足固定 JSON 和硬规则要求 | 不直接复用 |
| Hermes `feeds` | 只有 DESCRIPTION，没有可执行 skill | 不复用 |
| RSSHub | 本机无 Docker/Podman/Colima/OrbStack；公共 docs/实例 403 | 不阻塞首版 |
| GOV.UK Atom | 实测 200 + `application/atom+xml` | 首版接入 |
| Consilium / EUR-Lex | 从本机触发 403/WAF 或 DNS 波动 | 首版 page-diff + 源健康暴露 |

若以后启用 RSSHub，归 Hermes 侧维护，固定 localhost `1200`，由 scanner 把可用性写进 JSON。

## 源分组

| 组 | 范围 | 首版通道 |
|---|---|---|
| A | 欧盟关税与海关 | TAXUD / Consilium / EUR-Lex page-diff |
| B | 欧盟产品合规 | EUDR / Safety Gate page-diff |
| C | 中国出口侧 | gov.cn / 海关总署 page-diff |
| D | 平台侧 | 亚马逊全球开店 page-diff |
| E | 转发/聚合 | 雨果网 / 出海网 / 店小秘 page-diff |
| F | 英国侧 | GOV.UK Atom |

## 验收

- scanner 固定输出 `~/.hermes/scratch/policy-scan-latest.json`
- 源失败不中断，且 source health 可见
- 同 URL / 近似标题去重
- 丢弃记录带理由码
- 首跑 baseline 不产生洪水
- dogfood 7 天期间 inbox 零写入

## Pitfalls

- RSSHub 不应成为首版隐性依赖；如果容器没跑，系统仍应退回 page-diff。
- 政策监控的价值在“少而准”，不是抓得多。营销、课程、招商、直播预告要在硬规则层先丢。
- 二级媒体只能补中文时效，不能替代官方源；重要结论必须回到官方链接核验。
