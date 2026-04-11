---
title: "A9 算法（A9 Algorithm）"
type: concept
tags: [亚马逊, 算法, 排名, 关键词, 流量]
created: 2026-04-12
updated: 2026-04-12
sources: ["亚马逊高阶运营培训手册.pdf"]
source_count: 1
---

# A9 算法（A9 Algorithm）

A9 算法是亚马逊商品搜索排名的核心规则，名称来源于"Algorithm"共 9 个字母。2018 年前其官方文档曾公开，现已下线。它决定了一个 Listing 在特定关键词搜索结果中的排序位置，是[[listing-optimization|Listing 优化]]和[[amazon-ppc-advertising|PPC 广告]]策略的根基。

## 四大原理

### 原理一：搜索收录（Searching Indexing）

亚马逊首先对 Listing 的文字内容建立索引（Index），用于匹配买家搜索词。

**会被收录的字段**：
- 标题（Title）
- 五点描述（Bullet Points）
- 搜索词（Search Terms / ST）
- 长描述（Product Description）
- A+ 内容
- 预期用途、商品类型、特定风格、相关主题等属性字段

**两种收录用途**：
- **Index by Search**（搜索流量收录）：用于关键词搜索匹配
- **Browsed**（类目归类）：用于类目导航流量

**实操要点**：
- 严格遵守各字段字数限制，超字数可能被降权
- 必读类目 BTG（Buy It Again Trigger Guide，亚马逊官方 Listing 风格指南）
- `Item Package Qty` 上架后无法更改，需谨慎填写

### 原理二：商品匹配度（Product Relevance）

亚马逊判断商品与买家搜索意图的匹配程度，核心指标：

| 指标 | 说明 |
|------|------|
| 转化率（Conversion Rate） | 浏览后下单的比例，最重要的信号 |
| 匹配关联性（Keyword Relevance） | 关键词在 Listing 中的位置与密度 |
| 客户满意度留存度 | 好评数量、星级等 |
| 预期转化率（ECR, Expected Conversion Rate）| 新品无历史数据时，亚马逊用此预估；老客户复购 / 加购 / Wish List / QA 均纳入计算 |

> 运营误区：卖不好不一定是价格太高，价格是影响转化率众多因素中最后才考虑的。

**新品的 ECR 是无限大，不是 0**：这是新品期可利用的核心红利——开低 Bid 捡漏广告，或一开始冲高 Bid 快速建立质量得分。

### 原理三：过往搜索痕迹（Past Search Patterns）

算法会记录买家的历史搜索行为，用 FBT（Frequently Bought Together，经常一起购买）、Similar Item、Bundle 等关联算法推荐商品。

**实操意义**：关联流量（Related Traffic）约占亚马逊总流量的 30%，不可忽视，详见[[amazon-traffic-sources]]。

### 原理四：过往流量痕迹（Past Traffic Patterns）

亚马逊追踪商品历史流量的来源质量和转化表现，影响未来的流量分配。

**流量类型**：
- 站内：自然搜索、广告（SP/SB/SD）、Post、Store 旗舰店
- 站外：Amazon Attribution 追踪链接、联盟（Affiliate）、站外 Deals 网站、社交媒体、搜索引擎、红人/博主
- URL 短链：5 种关键词跳转链接

详见[[amazon-traffic-sources]]。

## 三大核心支柱

### 支柱一：转化率（9 大因素）

1. **Product Rank（BSR 排名）**：BSR 仅与销量相关；New Release 榜单有新品加权
2. **Review（评论）**：新品有 6–10 条高质量评论即可显著提升转化
3. **QA**：有人问 = 客户感兴趣，亚马逊给流量倾斜
4. **Image Size and Quality（图片质量）**：主图决定约 80% 点击率
5. **Price（价格）**：影响转化率，但不是首要因素
6. **Parent-Child Product（父子变体）**：合并评论，但需确保变体属性匹配
7. **页面停留与跳转率**：停留时间长、跳出率低，对转化信号正向
8. **Listing 完整性**：字段填写越完整，亚马逊越认为是正规品牌
9. **Listing 包装（A+ / 视频等）**：提升页面专业度与买家信任

### 支柱二：相关性（7 大因素）

1. Title（标题）
2. Features / Bullet Points（五点描述）
3. Product Description（长描述）
4. Brand Name & Manufacturer Part Number（品牌名与型号）
5. Category & Sub-category（类目与子类目）
6. Search Terms（搜索词后台字段）

> 关键词的"顺序"影响相关性：搜索"蓝牙音箱"时，"蓝牙音箱"的匹配度高于"音箱蓝牙"。

### 支柱三：客户满意度与保留率（5 个因素）

1. Negative Seller Feedback（卖家差评反馈）
2. Order Processing Speed（订单处理速度）
3. IPI（Inventory Performance Index，库存绩效指数）
4. Perfect Order Percentage（完美订单比例）
5. 订单缺陷率（ODR, Order Defect Rate）

## 关键词排名稳定性

**影响关键词排名的因素**（按优先级）：
1. 曝光量（Impression）
2. 点击率（CTR）
3. 转化率（Conversion Rate）

**5 种上首页方法**（市面主流）：
1. 站内 PPC 广告冲排名
2. 关键词跳转链接（URL）辅助
3. 站外引流（Deals 网站 + 红人）
4. ECR 加购/Wish List 提权重
5. 权威链接（Canonical URL）占 Google SEO

**关联流量（3 种方法）**：
- FBT（Frequently Bought Together）：同时推广多个 ASIN，互相形成 FBT 关系
- Similar Item（看了又看）：前 2 个稳定的 Similar Item 往往连带后续都是自家产品
- Video 关联：亚马逊正在加大 Influencer（红人）视频的权重

## 账号权重层级

| 账号类型 | 特征 |
|----------|------|
| 普通 SC 账号 | 权重最差，流量有上限 |
| 美国个人号（SSN） | 流量不封顶，旺季自发货不影响单量 |
| 美国企业号（EIN） | 可销售杀虫剂、农药等特殊品类 |
| Merch 账号 | 设计师账号，前台显示"Sold by Amazon" |
| 品牌加速计划 | 所有营销工具免费使用 |

## Sources

- `raw/亚马逊高阶运营培训手册.pdf` — 第一章：A9 算法全解析（第 1–21 页）
