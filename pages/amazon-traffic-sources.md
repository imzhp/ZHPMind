---
title: "亚马逊流量来源（Amazon Traffic Sources）"
type: concept
tags: [亚马逊, 流量, 站内流量, 站外流量, 关联流量]
created: 2026-04-12
updated: 2026-04-12
sources: ["亚马逊高阶运营培训手册.pdf"]
source_count: 1
---

# 亚马逊流量来源（Amazon Traffic Sources）

理解亚马逊全渠道流量来源，是[[a9-algorithm|A9 算法]]第四大原理"过往流量痕迹（Past Traffic Patterns）"的实操基础，也是[[amazon-ppc-advertising|PPC 广告]]与[[listing-optimization|Listing 优化]]策略制定的前提。

亚马逊一个 Listing 的总流量公式：

$$\text{产品总流量} = \text{广告流量} + \text{搜索流量} + \text{排名流量} + \text{关联流量}$$

> 关联流量和排名流量是产品流量的**源头大头**。关联流量约占亚马逊总流量的 **30%**。

## 站内流量十大入口

### 1. 搜索流量（Search Traffic）

- **Discovered by Customers**：站外关键词推广效果在此实时更新
- **Editorial Recommendation（编辑推荐）**：算法自动匹配 + 可主动联系编辑；用精美 PPT（品牌故事 + 产品对比 + 感谢）争取推荐位；编辑推荐词是最优质的关键词来源之一
- **Filter by Category（类目筛选）**：标题含类目关键词可增加此入口的匹配机会

### 2. 类目流量（Browse Traffic）

- 买家通过类目导航进入
- 标题需含所在类目关键词，提高类目匹配性
- 合理选择类目节点（Category Node）至关重要

### 3. 榜单流量（Best Seller Rank / New Release）

- **Best Seller（BSR）**：BSR 排名只与销量挂钩；谷歌搜索"Best [关键词]"常直接导向 BSR 页面（SEO 价值高）
- **New Release（新品榜）**：权重非常高，位于前台导航热力位置；新品上架初期从 Newest Arrivals 进入有加权
- 其他：Today's Deals、Holiday Gift Guide 等

### 4. 站内 Deals 流量（Amazon Deals）

| Deals 类型 | 说明 |
|-----------|------|
| Lightning Deals（秒杀）| 短时间大量曝光，适合冲 BSR |
| Best Deals（7 Day Deal）| 7 天秒杀 |
| DOTD（Deal of the Day）| 镇店之宝，曝光最强 |
| Prime Day Deal | 会员日，全年最大流量节点 |
| Black Friday Deal | 黑五 |
| Cyber Monday Deal | 网络星期一 |
| Back to School Season | 返校季 |
| Holiday Gift Guide | 礼品季 |

### 5. Coupon（优惠券）流量

- 首页有专属 Coupon 流量入口
- 有买家会直接在 Coupon 页面搜索商品
- 有条件的卖家建议持续开启 Coupon

### 6. 促销流量（Promotion Traffic）

- 开启促销后，Listing 出现绿色"Extra Saving"标签
- 标签本身提升点击率，形成额外曝光

### 7. 关联流量（Related / Associate Traffic）

**约占亚马逊总流量的 30%，是最容易被忽视的大流量入口。**

| 关联类型 | 说明 |
|---------|------|
| FBT（Frequently Bought Together）| 经常一起购买；推多个 ASIN 同时推广可形成自家 FBT |
| Similar Item（看了又看）| 手机端 / 部分 PC 端仍有；前 2 个稳定位置往往连带后续都是自家产品 |
| Video 关联流量 | 亚马逊正在加大 Influencer（红人）视频权重；亚马逊红人计划（Amazon Influencer Program）持续扩张 |

**获取关联流量的方法**：
1. 同时推广多个自家 ASIN（互相 FBT / 互相关联定向广告）
2. 用 SD 广告干预"Featured items you may like"等大流量展示位
3. 上传高质量关联视频

### 8. 买家标签与历史记录流量

- **Featured items you may like** / **Inspired by your browsing history**：在 PC 和手机端首页展示，流量非常大
- **Top Picks for you in [某类目]**：用户频繁浏览某类目后触发
- 可通过 SD 广告干预这些版块（必然有买家标签用于 SD 广告定向）

### 9. 广告流量（Advertising Traffic）

- SP（Sponsored Products）：商品推广广告
- SB / SBV（Sponsored Brands / Video）：品牌广告
- SD（Sponsored Display）：展示广告
- DSP（Demand-Side Platform）：程序化广告（亚马逊在弱化 DSP 功能）
- Post（免费）：目前在 PC 端尾部和部分类目关键词搜索结果下方出现；先做先享红利

### 10. 品牌旗舰店（Brand Store）流量

- SB 广告最优质落地页
- B2B 买家和招商平台会重点考察旗舰店质量
- 积累 Followers → 邮件营销（Customer Engagement）

## 站外七大流量入口

### 1. 站外 Deals 网站

- Dealnews、Woot.com 等
- 适合价格敏感型产品，快速冲 BSR

### 2. 社交媒体（Social Media）

- Facebook、Pinterest、Instagram、TikTok 等
- 通过 Amazon Attribution（归因追踪链接）追踪各渠道 ROI

### 3. 搜索引擎（Search Engine）

- Google、Bing
- **权威链接（Canonical URL）**：亚马逊根据标题生成的标准链接，决定 Listing 在谷歌的 SEO 排名
  - 获取方法：Chrome 浏览器右键检查 → `Ctrl+F` 搜索 `canonical` → 找到亚马逊链接
  - 通常含 5 个核心关键词；若标题有连字符，可能含 6–7 个
  - 标题优化直接影响权威链接的关键词
- 人工 URL（5 种关键词跳转链接）：通过 H10 生成，用于站外引流精准助推关键词排名

### 4. 论坛 / 红人 / 博主

- 海外红人（Influencer）合作
- 论坛帖子（Reddit、Quora 等）

### 5. 媒体网站

- 科技媒体、生活方式媒体的产品评测文章

### 6. EDM 营销（Email Direct Marketing）

- 亚马逊会主动给购买过的用户发 QA 邀请（随机）
- 策略：在老款产品的 QA 中推广新款（"值不值得购买 New Model B？"）

### 7. 独立站 / 官网（D2C）

- Anker 约 40% 的流量来自品牌词直接搜索
- 独立站积累品牌认知 → 亚马逊品牌词搜索量增加 → 提升品牌关联性
- 可通过 Amazon Attribution 追踪独立站带来的亚马逊转化

## URL 超链接五种玩法

通过人工构造 URL，可以精准引导流量并助推关键词排名：

| URL 类型 | 用途 |
|---------|------|
| 权威链接（Canonical URL）| 谷歌 SEO 排名，站外引流核心 |
| 关键词跳转链接（含广告展示）| 带关键词搜索结果 + 广告位 |
| 关键词跳转链接（不含广告展示）| 纯自然搜索结果 |
| Add to Cart 链接 | 引导直接加购，提升 ECR 信号 |
| Buy Together 链接 | 绑定关联商品，促进 FBT 形成 |

> **H10 可以帮助生成所有上述类型的 URL**，推荐使用自动化工具减少手动拼接错误。

## 各类流量的策略优先级

对于不同阶段的 Listing：

**新品期**：
1. 优先获取搜索流量（SP 广告 + 关键词链接 ECR 助力）
2. 激活关联流量（自动广告 + FBT + 多 ASIN 互相定向）
3. 尽早上 Coupon / 促销，出现在额外入口

**成长期**：
1. 维持并扩大搜索排名（关键词 → TOS 打坑位）
2. 利用 Post（免费）每日发布积累品牌词流量
3. 开始布局站外（Deals 网站 + 红人）

**成熟期**：
1. 品牌词保护（SB 广告 + 品牌词广泛匹配）
2. 旗舰店装修 + 邮件营销积累忠实用户
3. 站外 + 独立站建立品牌护城河

## Sources

- `raw/亚马逊高阶运营培训手册.pdf` — 第一章 §2.4（站内十大流量入口、站外七大流量入口，第 4–9 页）；第四章（超链接玩法，第 110–119 页）
