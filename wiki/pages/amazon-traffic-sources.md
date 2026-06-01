---
title: "亚马逊流量来源（Amazon Traffic Sources）"
type: concept
tags: [amazon, traffic, internal-traffic, external-traffic, related-traffic, purchase-path, related-traffic-tactics, sd-advertising]
created: 2026-04-12
updated: 2026-05-28
sources: ["亚马逊高阶运营培训手册.pdf", "assets/courses/qwei-amazon-course-2023/文字记录：9.广告的搜索流量和关联流量 2026年5月25日.md"]
source_count: 2
---

# 亚马逊流量来源（Amazon Traffic Sources）

理解亚马逊全渠道流量来源，是[[a9-algorithm|A9 算法]]第四大原理"过往流量痕迹（Past Traffic Patterns）"的实操基础，也是[[amazon-ppc-advertising|PPC 广告]]与[[listing-optimization|Listing 优化]]策略制定的前提。

亚马逊一个 Listing 的总流量公式：

$$\text{产品总流量} = \text{广告流量} + \text{搜索流量} + \text{排名流量} + \text{关联流量}$$

> 关联流量和排名流量是产品流量的**源头大头**。关联流量约占亚马逊总流量的 **30%**[^vs-qwei-9.3]。

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

**约占亚马逊总流量的 30%[^vs-qwei-9.3]，是最容易被忽视的大流量入口。**

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

---

# 云飞扬视角补充：从"流量入口清单"到"消费者购买路径"

手册把流量讲成"十大站内 + 七大站外入口"的清单。云飞扬 2023 课程第 9 节把它**升级成顶层认知**：研究广告 = 研究消费者购买路径，从入口反推广告形式。

## 广告本质 = 流量工具，主做曝光不做转化

**反直觉：广告主要做曝光，不做转化。** 转化由图片/产品质量分决定，跟广告关系不大；广告的任务 = 用有限预算把购买路径上所有曝光位置做有效覆盖。所以广告不是"打几个词"，而是"覆盖几个路径"。中小卖家的广告是效果广告（临门一脚型），区别于品牌广告（电视/户外）。

## 九个购买路径（中小卖家主战场 1–4）

| 路径 | 说明 |
|---|---|
| 1. 搜索→点击→加购→购买 | 标品 / 男性日常 / 刚需高发，最直接 |
| **2. 搜索加购→详情页二次跳转→购买** | **最常见路径**，比价行为驱动，关联流量主战场（手册把它藏在"详情页流量"里不显眼） |
| 3. 多次搜索退出→几天后秒杀/降价回来买 | 广告 7 天归因的经典场景（SP 点击 → SD 营销 → 归因到 SP） |
| 4. 搜索→SB 头条进旗舰店→站内搜→购买 | 适合成熟爆款 + 多 SKU 品牌方；新品/单品慎做 SB 头条 |
| 5–9. SD / 复购 / 谷歌 / 红人 / 品牌广告 | 中大卖家 + 品牌主战场，是 SOP 演进方向 |

## 搜索流量是"门"，关联流量是"摆位"

绝佳比喻：**搜索流量是流量之门**（像商场各个门：地铁口/偏门/小路，是入口但非主体）；**关联流量是商场内部摆位**（分散在各楼层，占主体）。多数产品**搜索流量真实占比约 30%**（详见本页 9.3 口径冲突 footnote），可用"品牌分析搜索词报告 ÷ 业务报告总 PV"实证。**预警阈值：搜索流量到 60% = 不正常**，说明关联流量太少，该拓关联流量。

不同产品类型占比不同：标品红海可能 60%+，混合型约 30%，非标品/蓝海以关联流量为主。

## SD 广告的反直觉细节

- **VCPM 千次曝光 = 触达型**：**半屏停留 1–1.5 秒才计 1 次展现**（数字广告行业标准，产品必须实际进入视野），质量远高于 SP 那种"无效曝光也算"的逻辑。VCPM 适用"线下卖得好但线上认知少 + 工业/配件类"的蓝海建认知；多数出单导向产品用 CPC 或转化优化，VCPM 慎用。
- **SD 定位的站内/站外开关（关键陷阱）**：内容相关投放**不细分品类 = 站内+站外都投**（站外预算贵且不可控）；**加 Prime/4 星等条件细分后 = 只投站内**。**受众投放永远站内+站外，小卖家慎用**（会推到 Fire TV / Kindle / 联盟网站等场外位置，转化差）。

## SB/SBV/SBA 归因水分

- **归因 14 天**（vs SP 7 天）→ 出单归因水分大。
- **同品牌多店铺出单都归因到打广告这家**（反直觉）：品牌授权多家店时，别家出单也算到打广告这家头上，数据极易虚高（iPhone 100 家授权店类比）。**单品牌单店铺架构天然规避此坑。**
- 预算紧张时不投 SB/SBV/SD，只投 SP（数据失真 + 14 天归因 + 预算高，预算足时再加）。

## SP 广告位认知重塑

**SP 投关键词 = 投 ASIN，广告位都是搜索 + 详情页两种**（三档 TOS/ROS/PP）——打破"投关键词=搜索位、投 ASIN=详情页"的误区。SD 广告位最广（目录/秒杀/旗舰店/详情页贴片/post + 站外）。**首页同一产品可同时 4–5 次曝光**（TOS + 旁边自然位 + Amazon's Choice + Highly Rated + SBV），这是广告不停的真正原因。

## 关联流量的核心打法

- **SP 卡 PP 加百分比**：详情页竞价差异小，可加百分比（跟卡 TOP 同逻辑）。
- **ROS 加不了百分比**（反直觉）：ROS 流量位差异太大（首页第二行 vs 第七页第三行 CPC 天差地别），亚马逊无法统一加价。
- **用低竞价 + PP 百分比建立 ASIN-ASIN 相关性**（关联流量核心打法）：长期跑几周，session 涨而关键词排名变化不大 = 关联流量积累成功。非标品打 ASIN 却跑出搜索流量 = 没建 ASIN-ASIN 相关性。
- **蓝海无词可打：SD 围猎大牌 FBT + 自定义图片/视频**（桌面装饰品案例：贴台历下，吸大牌 10%–20% 流量）；季节性非标品适合 SD 受众种草（VCPM 触达 + 创意视频）。

> 注：云飞扬"销量飙升但商机探测器搜索点击数平稳 = 站外"的反直觉站外判断法，记录在 [[amazon-product-selection]] 的选品实操闭环中（与本页关联流量打法互补）。

## Footnotes

[^vs-qwei-9.3]: ⚠️ **数据口径冲突注（2026-05-27）**：云飞扬亚马逊课程第 9 节（广告的搜索流量和关联流量）给出反向口径——**搜索流量约 30%**（关联流量是主体），通过"品牌分析搜索词报告 ÷ 业务报告总 PV"可实证验证。云飞扬认为 wiki 这里 30% 的归属反了：应是"搜索流量约 30%"而非"关联流量约 30%"。差异可能源于产品类型分布（标品 vs 非标品）或数据采样方法。**当前以云飞扬数据驱动结论为准，wiki 原数字保留作来源对照**。

## Sources

- `raw/亚马逊高阶运营培训手册.pdf` — 第一章 §2.4（站内十大流量入口、站外七大流量入口，第 4–9 页）；第四章（超链接玩法，第 110–119 页）
- `raw/assets/courses/qwei-amazon-course-2023/文字记录：9.广告的搜索流量和关联流量 2026年5月25日.md` —— 云飞扬第 9 节（1:48:00 + 答疑，购买路径 / SD 广告 / 关联流量打法）（原蒸馏自 v2 通义听悟 docx，已重指向 v1 飞书妙记主源 / 2026-06-01）
- 蒸馏溯源：经 `.tmp-claude-reports/amazon-cross-source-diff-draft.md`（v0.9.16）跨源对照后提炼，云飞扬层为第 2 源；9.3 搜索流量 30% 口径冲突已在本页 footnote 标注（2026-05-27）。蒸馏模型 Claude Opus 4.7，2026-05-28
