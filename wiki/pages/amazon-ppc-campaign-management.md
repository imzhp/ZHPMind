---
title: "亚马逊 PPC Campaign 管理框架（Amazon PPC Campaign Management）"
type: method
tags: [amazon, ppc, advertising, acos, bidding, keyword-funnel, campaign-management]
created: 2026-06-04
updated: 2026-06-04
sources: []
source_count: 0
provenance:
  - repo: "https://github.com/nexscope-ai/Amazon-Skills"
    commit: "40e6bb6c3b6bcb9fa2e6298d34733997b40e12d8"
    path: "amazon-ppc-campaign/SKILL.md"
    license: "MIT, Copyright (c) 2026 Nexscope AI"
---

# 亚马逊 PPC Campaign 管理框架（Amazon PPC Campaign Management）

本页把 PPC 管理拆成两个模式：新品阶段搭建 Campaign 结构，投放后根据搜索词与 ACoS 持续优化。它聚焦财务边界、关键词漏斗、Campaign 隔离和调价动作；与 [[amazon-ppc-advertising]] 的区别是，本页是**活动搭建与周期管理框架**，后者是 Amazon 广告体系的综合知识页。

## 两种工作模式

| 模式 | 适用场景 | 输入 | 输出 |
|---|---|---|---|
| Build | 新品或新建广告结构 | 产品、利润、预算、关键词、竞品 | Campaign 蓝图、分组、初始 bid 与否词 |
| Optimize | 已有广告持续优化 | Campaign 数据、搜索词报告、当前 ACoS | 迁移、否词、调价与预算重分配计划 |

两种模式都必须先建立财务边界。没有利润空间与目标 ACoS，bid 决策就只是在追逐流量。

## 财务框架

### 盈亏平衡 ACoS

```text
盈亏平衡 ACoS = 广告前利润 / 售价
```

它表示把全部广告前利润用于广告时的 ACoS 上限。达到这一值时，广告后利润约为零。

### 目标 ACoS

```text
目标 ACoS = 盈亏平衡 ACoS - 目标广告后净利率
```

新品阶段和成熟阶段可以使用不同目标，但必须明确亏损或利润目标，而不是把“启动期”当成无限期高 ACoS 的理由。

### Max CPC

```text
Max CPC = 售价 × 目标 ACoS × 转化率
```

Max CPC 是单位经济允许的点击成本上限，不等于实际起始 bid。实际 bid 还取决于当前拍卖环境；若 Amazon 建议 bid 高于 Max CPC，需要明确选择：接受阶段性亏损、提高售价、改善转化，或放弃该词。

上述财务输入应连接 [[amazon-unit-economics]]，避免用不完整成本计算虚假的 ACoS 空间。

## Build：搭建 Campaign

### 1. 收集必要信息

至少确认：

- 售价与落地成本
- Amazon 费用
- 月度广告预算
- 产品所处阶段
- 目标关键词
- 可用的竞品 ASIN

缺少转化率时可以使用估算值做情景分析，但必须明确标注；不能把估算后的 Max CPC 当成真实上限。

### 2. 建立关键词来源

关键词来自：

- 已完成的关键词研究
- 竞品 Listing 中的有效候选词
- 卖家已有词表

关键词研究与优先级连接 [[amazon-keyword-library]]。在 Listing 尚未充分覆盖目标词时，应先回到 [[amazon-listing-build-and-audit]]，避免用广告弥补内容基础问题。

### 3. 默认四类 Campaign

| 优先级 | Campaign | 角色 |
|---:|---|---|
| P1 | Auto Discovery | 发现真实搜索词 |
| P2 | Manual Exact | 精准承接高信心关键词 |
| P3 | Manual Broad | 测试变体和长尾词 |
| P4 | Product Targeting | 定向竞品商品页 |

预算有限时，源方法建议先启动 Auto + Exact，随后基于数据增加 Broad 与 Product Targeting。这是默认结构，不是所有商品必须永久维持的固定架构。

### 4. 关键词漏斗

```text
Auto：发现搜索词
  ↓ 有订单的词
Broad：扩大测试
  ↓ 被验证的词
Exact：精准放大
```

关键词迁移后，在来源 Campaign 中加入对应否定词，减少重复花费与内部竞争。关键词漏斗的目标是让发现、测试和放大各自承担清晰职责。

### 5. 设置初始 bid

源方法将 Max CPC 作为财务护栏，并建议结合 Amazon 当前建议 bid：

| Campaign | 起始 bid 的相对逻辑 |
|---|---|
| Exact | 建议 bid 与 Max CPC 中较低者 |
| Broad | Exact bid 的较低比例 |
| Auto | Exact bid 的较低比例 |
| Product Targeting | Exact bid 的较低比例 |

源文件给出了具体比例区间，但拍卖环境动态变化，比例只能作为初始假设。实际调整必须基于当前建议 bid、曝光、点击、订单与 ACoS。

### 6. 建立初始否词

源方法分为三类：

- 跨 Campaign 否词：隔离 Exact 与发现型 Campaign
- 无关词：产品、材质、场景或意图不匹配
- 泛低意图词：可能带来浪费的修饰词

否词前应判断搜索意图，不能因为短期无订单就过早切断潜在有效词。

### 7. 输出搭建蓝图

每个 Campaign 至少记录：

- 名称与角色
- 每日预算
- bid 策略
- 广告组
- 关键词 / ASIN target
- 初始 bid
- 否词
- 启动日期与首次复盘时间

## Optimize：优化 Campaign

### 1. 收集数据

最低需要：

- Campaign 名称与类型
- 总体及分 Campaign ACoS
- 广告支出与广告销售额
- 产品利润率

若有搜索词报告、关键词级 ACoS、CTR 和转化率，可以做更细的动作判断。数据缺失时，应限制结论粒度。

### 2. 五维审计

| 维度 | 核心问题 |
|---|---|
| 财务健康 | 当前 ACoS 是否低于盈亏平衡与目标 ACoS |
| Campaign 效率 | 哪类 Campaign 在消耗预算、哪类产生收入 |
| 关键词表现 | 哪些词盈利、边缘、亏损或有点击无订单 |
| 预算分配 | 支出是否流向被验证的有效对象 |
| 遗漏机会 | 是否存在可迁移词、未否定浪费词、预算不足的赢家 |

### 3. 搜索词漏斗动作

源方法给出的启发式规则：

- 有 2+ orders 的搜索词：考虑从 Auto / Broad 迁移至 Exact，并在来源中否定
- 10+ clicks 且 0 sales：考虑加入否词
- 点击不足：进入观察清单，等待更多数据

这些是动作触发器，不是统计定律。商品客单价、转化周期和数据质量不同，阈值应作为待验证假设。

### 4. Bid 调整

源方法建议只对有足够点击数据的关键词做 ACoS 驱动调价，并给出以下启发式：

| 表现 | 动作方向 |
|---|---|
| ACoS 远高于目标 | 较大幅度降 bid |
| ACoS 高于目标 | 小幅降 bid |
| ACoS 接近目标 | 暂不调整 |
| ACoS 低于目标 | 小幅提高 bid，测试扩量 |
| 多次点击无订单 | 暂停或否定 |

源文件还给出 20+ clicks、10–50% 等具体动作阈值。它们适合作为初始管理规则，不应被视为跨品类通用最优值。

### 5. 输出周期计划

优化结果分成四类：

1. 立即添加的否词
2. 本周完成的关键词迁移
3. 本周完成的 bid 调整
4. 下周期执行的预算重分配

每项动作应记录：原状态、动作、判断依据、预期结果和下一次复盘时间。

## 应用边界

- ACoS 决策依赖真实、完整的单位经济；成本漏项会直接抬高错误的可承受 ACoS。
- 搜索词迁移、否词与调价阈值是启发式规则，需要用自身数据校准。
- Amazon 建议 bid、拍卖竞争和广告规则均为动态输入，必须实时查看。
- 广告结构的职责是控制与学习，不应因追求结构整齐而制造过多 Campaign。
- 本方法不接 Seller Central，也不自动执行广告变更；所有动作都需人工核验。

## 关联

- [[amazon-ppc-advertising]] — Amazon 广告体系、广告类型与底层认知的现有综合页
- [[amazon-unit-economics]] — 盈亏平衡 ACoS 与 Max CPC 的财务基础
- [[amazon-keyword-library]] — Campaign 关键词来源与分层
- [[amazon-listing-build-and-audit]] — 投放前的 Listing 质量与关键词覆盖检查
- [[amazon-data-driven-operations]] — 用数据进行假设、检验与复盘

## Sources

- `nexscope-ai/Amazon-Skills@40e6bb6c.../amazon-ppc-campaign/SKILL.md` — Build / Optimize 双模式、ACoS 公式、四类 Campaign、关键词漏斗、否词与调价规则；Nexscope AI MIT。
