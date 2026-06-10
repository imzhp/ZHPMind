---
type: snapshot
source: hermes/policy-monitor
created: 2026-06-10
tags:
  - system-review
---

# 政策监控草稿 — 2026-06-10

## 置顶行动项

本次无置顶行动项。

这是 `policy-monitor` 首跑 baseline：scanner 默认不把历史列表页上的既有条目当作“今日新增政策”，因此 `candidate_pool` 为 0 是预期行为。

## 分组摘要

本次无新增候选。

## 折叠观察

本次无 `NEEDS_SCORING` 条目，也无硬规则丢弃项。

<details>
<summary>丢弃记录</summary>

本次无丢弃项。

</details>

## 源健康状态

| 状态 | 数量 |
|---|---:|
| OK | 11 |
| Failed | 2 |

失败源：

| 源 | 状态 | 错误 |
|---|---:|---|
| eu-consilium-press | 403 | HTTP_403 |
| cn-customs-news | 403 | HTTP_403 |

## 背压状态

当前 inbox 用户 capture 数：5；阈值：50；未触发背压。

## 已知局限

- 首跑是 baseline，不代表近期没有重要政策，只代表从下一次扫描开始可稳定识别新增。
- Consilium 与海关总署页面当前 403，需要继续观察；失败已进入 source health，不会中断整轮。
- RSSHub 未进入首版路径；gov.cn、雨果网、gs.amazon.cn 按 page-diff 处理。
