---
title: "亚马逊单品单位经济模型（Amazon Unit Economics）"
type: method
tags: [amazon, unit-economics, profit-margin, pricing, fba, finance]
created: 2026-06-04
updated: 2026-06-04
sources: []
source_count: 0
provenance:
  - repo: "https://github.com/nexscope-ai/eCommerce-Skills"
    commit: "edd175af8ca7f4c00f9b0d9ac64bc32dff17d4c6"
    path: "profit-margin-calculator/profit-margin-calculator-amazon/SKILL.md"
    license: "MIT, Copyright (c) 2026 Nexscope AI"
  - repo: "https://github.com/nexscope-ai/Amazon-Skills"
    commit: "40e6bb6c3b6bcb9fa2e6298d34733997b40e12d8"
    path: "amazon-fba-calculator/SKILL.md"
    license: "MIT, Copyright (c) 2026 Nexscope AI"
---

# 亚马逊单品单位经济模型（Amazon Unit Economics）

本页用于在单个 SKU 层面回答三个问题：每卖一件实际赚多少、价格降到哪里会亏损、目标利润率对应什么价格。它是新品采购、定价调整和 SKU 横向比较的决策模型；与 [[amazon-profit-analysis]] 的区别是，本页关注**单件商品的预测与决策**，后者关注店铺实际经营中的完整利润管理。

## 模型边界

单位经济模型把每件商品的售价拆成成本与利润：

```text
单件净利润 = 售价 - 单件总成本
单件净利率 = 单件净利润 / 售价
```

它适合回答：

- 新品采购前是否存在利润空间
- 当前售价能承受多高的广告投入
- 成本或费率变化后是否仍然盈利
- 为达到目标净利率，售价至少应是多少
- 多个 SKU 中，哪个单位经济结构更健康

它不替代月度 P&L、现金流、库存周转或退货精算；这些经营层问题应连接 [[amazon-profit-analysis]]、[[amazon-cashflow-roi]] 与 [[amazon-inventory-replenishment]]。

## 输入变量

### 必填输入

| 变量 | 含义 |
|---|---|
| 售价 | Listing 当前或拟定销售价格 |
| 产品成本 | 单件采购 / FOB 成本 |
| FBA 配送费 | Amazon 拣货、包装与配送费用 |

### 建议输入

| 变量 | 含义 |
|---|---|
| 入仓运输 | 单件头程或发往 FBA 的运输成本 |
| FBA 仓储费 | 单件对应周期内的仓储成本 |
| 销售佣金率 | 按类目适用的 referral fee |
| 广告费率 | 广告支出占销售额比例 |
| 退货损失 | 按预期退货率折算的单件损失 |
| 其他费用 | 包装、标签、prep 等单件费用 |

输入不足时，不应把缺失项默认为“真实为零”。可以先做粗算，但必须显式标注未计入的成本和估算假设。

## 成本拆解

把成本分为两组，可以让盈亏平衡与定价推导更清楚。

### 固定到单件的成本

```text
单件固定成本 =
  产品成本
  + 入仓运输
  + FBA 配送费
  + FBA 仓储费
  + 退货损失估算
  + 其他费用
```

### 随售价变化的成本

```text
销售佣金 = 售价 × 销售佣金率
广告支出 = 售价 × 广告费率
```

若其他费用也按售价比例计提，应一并加入比例成本率。不要把按比例成本错误地当作固定金额，否则调价后的利润会被高估或低估。

## 核心计算

```text
单件总成本 = 单件固定成本 + 售价 × 比例成本率

单件净利润 = 售价 - 单件总成本

单件净利率 = 单件净利润 / 售价
```

其中：

```text
比例成本率 = 销售佣金率 + 广告费率 + 其他按销售额计提的费率
```

### 盈亏平衡价格

当单件净利润为零：

```text
盈亏平衡价格 = 单件固定成本 / (1 - 比例成本率)
```

这条线不是建议售价，而是“再低就开始亏损”的边界。若计划以亏损换取排名或数据，应把亏损额和期限另行列出，不能把它伪装成健康单位经济。

### 目标利润率定价

```text
目标售价 = 单件固定成本 / (1 - 比例成本率 - 目标净利率)
```

使用该公式前先检查分母是否大于零。若比例成本率与目标净利率之和接近或超过 100%，问题不在定价技巧，而在成本结构或目标本身不可行。

## FBA 费用拆解

FBA 费用是单位经济模型中的一组输入，不应只填一个模糊的“Amazon fee”。

| 费用项 | 需要确认的判断 |
|---|---|
| Size tier | 商品尺寸与重量落在哪个费用档 |
| FBA fulfillment | 当前站点、类目、尺寸档对应的配送费 |
| Monthly storage | 当前月份、尺寸与库存量对应的仓储费 |
| Aged inventory | 库龄是否触发额外仓储费用 |
| Referral fee | 当前类目的销售佣金率 |

源仓库中的 FBA 尺寸档与费用说明使用 2024 年费率，只能用于理解拆解结构，**不得作为当前计费依据**。实际测算必须从目标站点的最新 Seller Central / 官方费用表取得费率。

## 决策输出

每次计算至少输出以下结果：

| 输出 | 用途 |
|---|---|
| 单件成本明细与占售价比例 | 找出最值得优化的成本项 |
| 单件净利润与净利率 | 判断当前单位经济是否成立 |
| 盈亏平衡价格 | 确定价格下限 |
| 目标利润率对应售价 | 支撑定价选择 |
| 假设与未计成本 | 防止粗算被误当成真实利润 |

源方法提供了“净利率 >20% 健康、5–20% 警示、0–5% 危险、<0% 亏损”的启发式分档。该分档可用于初筛，但不是跨类目通用标准；最终判断还需结合周转、现金流、竞争与增长阶段。

## 批量比较

多个 SKU 应使用一致字段并排比较：

```text
SKU / 售价 / 产品成本 / 入仓运输 / FBA 配送 /
仓储 / 佣金 / 广告 / 退货损失 / 其他费用 /
单件净利润 / 净利率 / 盈亏平衡价格
```

比较时不要只按净利率排序。高净利率但低周转、现金占用高的商品，可能弱于净利率较低但周转快的商品。进一步判断连接 [[amazon-cashflow-roi]]。

## 应用边界

- 所有费率、尺寸档、仓储规则和类目佣金均属于动态平台规则，计算前需实时核验。
- 退货损失不能只用退货率代替；若缺少处理费、不可售损失等信息，应明确标为估算。
- 单位经济模型是预测模型，不等于结算报告中的实际利润。
- 广告费率会随产品阶段变化；新品期与成熟期应分别建模。
- 降价、促销或 Coupon 会改变实际成交价，不能只使用 Listing 标价。

## 关联

- [[amazon-profit-analysis]] — 店铺实际经营中的完整利润管理与月度盘点
- [[amazon-cashflow-roi]] — 单次利润之外的现金流与年化 ROI
- [[amazon-inventory-replenishment]] — 仓储、库存与周转对资金效率的影响
- [[amazon-pricing-strategy]] — 在单位经济边界内制定和调整价格
- [[amazon-ppc-campaign-management]] — 用利润空间推导 ACoS 与 Max CPC

## Sources

- `nexscope-ai/eCommerce-Skills@edd175af.../profit-margin-calculator/profit-margin-calculator-amazon/SKILL.md` — 利润拆解、盈亏平衡、目标利润率定价与批量比较框架；Nexscope AI MIT。
- `nexscope-ai/Amazon-Skills@40e6bb6c.../amazon-fba-calculator/SKILL.md` — FBA 费用拆解与尺寸档判断框架；Nexscope AI MIT。
