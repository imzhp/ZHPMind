---
type: snapshot
source: chat-claude/handoff
created: 2026-06-04
tags:
  - system/handoff
  - wildlume/amazon-ops
---

# Handoff — Amazon 运营 Skill 提取清单

> **From**: Chat Claude（独立 review + 调研）
> **To**: Codex（执行落地）
> **任务性质**: 从 nexscope-ai 两个开源仓库中,提取所有 Amazon 运营相关的 skill,改写为曜野自有的 Amazon 运营知识资产
> **范围说明**: 不限曜野当前业务,覆盖完整 Amazon 运营链路（作为通用运营知识库）

---

## 0. 背景判断（为什么这样做）

nexscope-ai 的 skill 本质是**分析框架（prompt 层）**,不是数据工具。仓库 README 自己承认 "skills alone can't access live marketplace data"。

因此提取的价值在于**框架/方法论**,而非持续追踪上游更新。决策:
- **一次性挖矿**,不建持续依赖管道（上游无 release、无版本、无 changelog,营销驱动,更新滞后于其 SkillHub 平台）
- 提取的框架 + 卖家精灵 MCP 的真实数据 = 完整 Push 采集闭环
- 第一批改写后存入 ZHPMind `wiki/pages/`（方法论页,见 0.5）,符合 design-principles「skill 模型无关 + 存进 vault 可迭代」

**两个源仓库**（均 MIT,可自由改写）:
- `github.com/nexscope-ai/Amazon-Skills`（27 skill,纯 Amazon）
- `github.com/nexscope-ai/eCommerce-Skills`（86 skill,多平台,本清单只挑 Amazon 相关）

**不追踪上游更新**: 框架是稳定知识,一次性挖矿提取完即断联。上游无 release/版本/changelog,更新已转移到其付费 SkillHub 平台,GitHub 是滞后的营销镜像。不建持续追踪管道（违背「系统吸收复杂度而非分发回来」+「选择性 capture 是纪律」）。

---

## 0.5 落地形态的核心区分（distill ≠ skillify）

**第一批 = distill（知识入库为方法论页),不是 skillify（流程封装为可执行 skill）。**

判断依据: 纯框架类的执行成本几乎为零——读一遍方法论就能直接套用,无需调数据/多步流程/一致性维护。为零成本的东西套 skill 封装是过度工程(多维护负担,无自动化收益)。

因此:
- **第一批落成 `wiki/pages/` 方法论页（type: method)**,作为 Amazon 运营知识资产沉淀
- 将来接卖家精灵后,框架要跟真实数据组合成定时流程时,再从方法论页 **skillify** 成可执行 skill——那时才有封装价值（走 design-principles 的 skillify 正路: 先手做确认复用价值,再提炼）
- 🔴 监控/竞品类（第三批）天然是流程,接 MCP 后才直接做成 Hermes Push skill

---

## 1. 数据依赖标注图例

| 标记 | 含义 | 落地方式 |
|---|---|---|
| 🟢 纯框架 | 不依赖外部实时数据,固定公式/方法论,AI 直接套用 | 直接改写为方法论页,无需接 MCP |
| 🟡 半依赖 | 框架为主,接入真实数据后质量大幅提升 | 改写框架 + 标注可选接入的卖家精灵工具 |
| 🔴 重依赖 | 没有真实数据则输出几乎无意义（纯靠 LLM 编） | 必须接卖家精灵 MCP 才值得落地;否则只提取框架备用 |

卖家精灵 MCP: `https://open.sellersprite.com/mcp`（43 工具,10 站点,需独立订阅）

---

## 2. 提取清单（按职能分类 + 数据依赖）

### A. 选品 / 市场调研 Product & Market Research

| Skill（源） | 仓库 | 数据依赖 | 框架价值 | 建议接入的卖家精灵工具 |
|---|---|---|---|---|
| amazon-product-research | Amazon | 🔴 | 选品评估维度（需求/竞争/利润/壁垒） | `product_research` `market_research` `asin_sales_trend` |
| amazon-niche-finder | Amazon | 🔴 | 蓝海打分模型（需求/竞争/margin/增长） | `market_research` `keyword_research` |
| amazon-keyword-research | Amazon | 🔴 | 长尾词挖掘 + 机会打分 | `keyword_miner` `keyword_research` `traffic_keyword` |
| amazon-trending-products | Amazon | 🔴 | BSR 模式 + 季节性识别 | `product_research` `google_trend` |
| amazon-sales-estimator | Amazon | 🔴 | BSR→销量换算逻辑（三模式） | `bsr_prediction` `asin_prediction` `asin_sales_trend` |
| amazon-seller-analytics | Amazon | 🔴 | 店铺画像分析（营收/组合/轨迹） | `competitor_lookup` `product_research` |
| market-gap-analysis | eComm | 🟡 | 市场空白识别（竞品盲区/差评痛点/搜索缺口） | `review` `market_research` `keyword_research` |

> **判断**: 这一类几乎全 🔴。框架本身有提取价值（评估维度是稳定知识）,但**不接卖家精灵就别真跑**——纯 LLM 编的"选品分析"会误导决策。优先级:框架先入库,接 MCP 后再激活为可执行 skill。

---

### B. Listing 优化 Listing Optimization

| Skill（源） | 仓库 | 数据依赖 | 框架价值 | 建议接入的卖家精灵工具 |
|---|---|---|---|---|
| amazon-listing-optimization | Amazon | 🟡 | **8 维度评分体系 + 竞品 ASIN 对标**（核心资产） | `traffic_keyword` `keyword_order` `asin_detail` |
| amazon-backend-keywords | Amazon | 🟢 | 250 字节后端词优化（去重/优先级/字节计算） | 可选 `keyword_miner` 补词源 |
| amazon-search-optimization | Amazon | 🟡 | A9/A10 算法因子 + 索引逻辑 | `traffic_keyword` `keyword_order` |
| amazon-a-plus-content | Amazon | 🟢 | A+ 模块布局 + 对比图 + 文案框架 | 无 |
| amazon-listing-images | Amazon | 🟢 | 主图/场景图 shot list + 信息图规划 | 无 |
| amazon-product-photography | Amazon | 🟢 | 产品摄影规划（与 listing-images 重叠,考虑合并） | 无 |
| product-title-optimization | eComm | 🟢 | 标题规则 + 关键词位置 + CTR | 可选 `keyword_order` |
| product-description-generator | eComm | 🟢 | 多平台描述生成（Amazon 段可单独提取） | 无 |

> **判断**: Listing 类是**提取价值最高的一组**。多数 🟢（框架即用,如 8 维评分、字节计算、A+ 布局都是稳定方法论）。`amazon-listing-optimization` 的 8 维度评分是整个库里最值钱的单个资产。建议把 listing-images 和 product-photography 合并为一页。

---

### C. 广告 / PPC Advertising

| Skill（源） | 仓库 | 数据依赖 | 框架价值 | 建议接入的卖家精灵工具 |
|---|---|---|---|---|
| amazon-ppc-campaign | Amazon | 🟡 | **ACoS 目标计算 + 词分组 + bid 策略**（核心资产） | `keyword_order` `traffic_keyword` |
| amazon-advertising-strategy | Amazon | 🟢 | SP+SB+SD 组合 + 预算分配框架 | 无 |
| amazon-negative-keywords | Amazon | 🟡 | 否词管理 + 浪费削减 + 节省估算 | `keyword_order`（反查出单词,定位无效词） |
| amazon-display-ads | Amazon | 🟢 | SD 受众定向 + 重定向 + 创意 | 无 |

> **判断**: PPC 框架（ACoS 计算、否词逻辑）是 🟢/🟡,稳定且高价值。bid 优化要接真实流量词数据才能落地。

---

### D. 竞品分析 Competitor Analysis

| Skill（源） | 仓库 | 数据依赖 | 框架价值 | 建议接入的卖家精灵工具 |
|---|---|---|---|---|
| amazon-competitor-analysis | Amazon | 🔴 | 全维度拆解（listing/价格/评论/广告/定位） | `competitor_lookup` `asin_detail` `traffic_keyword` `review` |
| amazon-competitor-monitoring | Amazon* | 🔴 | **实时竞品追踪**（价格/库存/新品/评论速度/广告） | `asin_sales_trend` `keepa_info` `asin_coupon_trend` |
| amazon-brand-analytics | Amazon | 🔴 | ABA 解读（SFR/点击份额/转化份额/购物篮） | `aba_research_weekly` `aba_research_monthly` `aba_research_trend` |
| amazon-review-analyzer | Amazon | 🔴 | 差评语义聚类 + 痛点提炼 + 竞品洞察 | `review` |
| amazon-review-checker | eComm | 🟡 | 评论真实性识别（刷评/时间聚类/已验证购买） | `review` |
| product-review-analysis | eComm | 🔴 | 评论痛点/赞扬模式/功能需求/情感 | `review` |
| product-differentiation-amazon | eComm | 🔴 | **从竞品弱点+差评痛点生成 USP**（高价值） | `review` `competitor_lookup` |

> **判断**: 竞品类全 🔴/🟡。这是**最依赖卖家精灵的一组**——没有真实评论/销量/流量数据,这些 skill 形同虚设。但框架（ABA 解读法、差评聚类法、USP 生成法）是稳定知识,值得先提取。`amazon-competitor-monitoring` 是 SkillHub 上有、GitHub README 未列的新 skill,需 Codex clone 时确认目录是否存在。
> *标注 Amazon* = SkillHub 列出但 README 未收录,落地前先 `git clone` 验证目录。

---

### E. 价格 / 利润 Pricing & Profitability

| Skill（源） | 仓库 | 数据依赖 | 框架价值 | 建议接入的卖家精灵工具 |
|---|---|---|---|---|
| amazon-fba-calculator | Amazon | 🟢 | **FBA 费用全拆解**（referral/fulfillment/storage/净利） | 无（公式固定） |
| profit-margin-calculator-amazon | eComm | 🟢 | **利润计算 + break-even + 定价建议**（比上者更完整） | 无 |
| tariff-calculator-amazon | Amazon | 🟢 | **关税/进口税/landed cost/VAT**（跨境核心） | 无 |
| amazon-shipping-calculator | Amazon | 🟢 | FBA/FBM 运费 + 体积重 + 移除费 | 无 |
| amazon-buy-box | Amazon | 🟡 | Buy Box 资格因子 + 竞价 + FBA/FBM 影响 | `competitor_lookup`（看竞品定价） |
| amazon-deal-finder | Amazon | 🟢 | 秒杀/Coupon/Prime 专享 + ROI 计算 | 无 |
| competitive-pricing-strategy | eComm | 🟡 | 心理定价 + MAP 合规 + 重定价 | `competitor_lookup` `keepa_info` |
| dynamic-pricing-ecommerce | eComm | 🟡 | 需求/竞品响应式动态定价模型 | `keepa_info`（历史价格） |

> **判断**: 价格类是**第二高价值组**,多数 🟢。FBA 计算、利润计算、关税计算都是纯公式,直接改写即用,且对跨境运营刚需。`profit-margin-calculator-amazon` 比 `amazon-fba-calculator` 更完整,二选一或合并。tariff-calculator 单独高价值。

---

### F. 监控 / 预警 Monitoring & Alerts

| Skill（源） | 仓库 | 数据依赖 | 框架价值 | 建议接入的卖家精灵工具 |
|---|---|---|---|---|
| amazon-rank-tracker | Amazon | 🔴 | 排名因子 + 变化诊断 + 改进策略 | `traffic_keyword` `keyword_order` |
| amazon-keyword-tracker | Amazon | 🔴 | 关键词排名监控（自然+广告位） | `traffic_keyword` `keyword_research_trends` |
| amazon-price-tracker | Amazon | 🔴 | 竞品价格/Buy Box 历史/促销监测 | `keepa_info` `asin_coupon_trend` |
| competitor-price-tracker | eComm | 🔴 | 价格变化预警 + 价格战响应 | `keepa_info` |
| review-monitoring | eComm | 🔴 | 差评预警 + 竞品追踪 + 响应流程 | `review` |
| restock-alert | eComm | 🟡 | 补货预警逻辑 | 自有库存数据 / SP-API |
| sales-tracking-tool | eComm | 🟡 | 销售 KPI 看板 + 异常检测 | 自有店铺数据 / SP-API |

> **判断**: 监控类**天然是 Hermes Push 闭环的主战场**。全 🔴/🟡,价值完全取决于数据接入。这一组应优先对接卖家精灵 + 做成定时 Hermes skill,写入 inbox。对应 design-principles 里规划的 `competitor-watch` `product-trend-watch`。

---

### G. 供应链 / 物流 / 运营 Supply Chain & Operations

| Skill（源） | 仓库 | 数据依赖 | 框架价值 | 建议接入的卖家精灵工具 |
|---|---|---|---|---|
| amazon-fba-prep | Amazon | 🟢 | FBA 入仓准备（贴标/包装/防拒收） | 无 |
| supply-chain-optimization-amazon | eComm | 🟢 | **FBA 库存 + IPI 分数 + 仓储费 + 补货优化** | 无（方法论） |
| warehouse-optimization | eComm | 🟢 | 安全库存 + 再订货点 + ABC 分析 | 无 |
| amazon-global-selling | Amazon | 🟢 | 国际站扩张（EU/UK/JP 合规/物流/本地化） | 无 |
| cross-border-ecommerce | eComm | 🟢 | 跨境扩张（选市场/物流/支付/税务合规） | 无 |
| brand-protection-amazon | eComm | 🟡 | **跟卖/假货/MAP 违规/Brand Registry 投诉** | `trademark_list` `trademark_detail`（商标库） |
| ecommerce-returns-management | eComm | 🟢 | 退货率削减 + 逆向物流 + 根因分析 | 无 |

> **判断**: 供应链/运营类多数 🟢,框架即用,且跨境刚需。`supply-chain-optimization-amazon`（IPI/补货）、`brand-protection-amazon`（跟卖维权）、`cross-border-ecommerce` 是这组里最值钱的三个。brand-protection 可接卖家精灵的商标库工具。

---

## 3. 提取优先级建议（供 Haopeng 决策）

按「框架价值 × 落地成本」排序:

**第一批（🟢 纯框架,无需 MCP,直接 distill 为 wiki 方法论页)** — 立即可做,价值确定。约 7 个方法论页（合并掉 2 组重叠):

1. **amazon 利润测算**（合并 `profit-margin-calculator-amazon` + `amazon-fba-calculator`)
   - 以 profit-margin 为主干（含 break-even + 定价建议),FBA 费用拆解作为其中一节
2. **amazon 关税与 landed cost**（`tariff-calculator-amazon`)— 跨境核心
3. **amazon listing 优化**（`amazon-listing-optimization`)— 8 维度评分体系,最高价值单项
4. **amazon listing 视觉规划**（合并 `amazon-listing-images` + `amazon-product-photography`)
5. **amazon 后端关键词**（`amazon-backend-keywords`)— 250 字节优化/去重/字节计算
6. **amazon PPC 框架**（`amazon-ppc-campaign` 的 ACoS+分组+bid 框架部分)
7. **amazon FBA 入仓准备**（`amazon-fba-prep`)— 贴标/包装/防拒收

> **合并标准**: 想不出「只想看 A 不看 B」的场景 → 合并为一页。
> **A+ 内容**（`amazon-a-plus-content`)、**供应链优化**（`supply-chain-optimization-amazon`)、**跟卖维权**（`brand-protection-amazon`)、**跨境扩张**（`cross-border-ecommerce`)也是 🟢,可纳入第一批或紧随其后,视 Haopeng 节奏。

**第二批（🟡 框架 + 可选接 MCP)** — 接卖家精灵后激活:
- amazon-search-optimization / amazon-buy-box / amazon-negative-keywords
- competitive-pricing-strategy / amazon-review-checker / market-gap-analysis

**第三批（🔴 重依赖,先入框架,接 MCP 后做成 Hermes Push skill)** — 监控/竞品闭环:
- amazon-competitor-monitoring / amazon-price-tracker / amazon-rank-tracker
- amazon-brand-analytics / amazon-review-analyzer / product-differentiation-amazon
- amazon-product-research / amazon-keyword-research / amazon-niche-finder / amazon-sales-estimator

---

## 4. Codex 执行步骤建议

1. **clone 两个仓库到临时目录**（非 vault 内）,`git log` 记录当前 commit SHA 作为 provenance 锚点
2. **验证 SkillHub 独有 skill**: 确认 `amazon-competitor-monitoring` 等 README 未列项的目录是否真实存在
3. **逐个读 SKILL.md**,提取框架核心（评分维度/公式/方法论步骤),剥离营销话术和"用 Nexscope"的引流文案
4. **改写为 ZHPMind 格式**:
   - 第一批 → `wiki/pages/` 方法论页（type: method),**不做成可执行 skill**
   - 提取框架核心（评分维度/公式/方法论步骤),剥离营销话术和"用 Nexscope"引流文案
   - provenance: 标注源 commit SHA + nexscope MIT 来源
   - 严守 design-principles 三条硬约束:溯源、互评（cross-modal eval)、可回滚
5. **合并重叠项**:
   - `profit-margin-calculator-amazon` + `amazon-fba-calculator` → 一页（利润测算)
   - `amazon-listing-images` + `amazon-product-photography` → 一页（视觉规划)
6. **命名约定**: 落地前 `ls wiki/pages/` 确认现有 MOC/前缀约定,不凭记忆建名（待 Haopeng/Codex 核实是 `skill-amazon-*` 还是 `wildlume/amazon-ops` MOC 归类)
7. **数据接入分离**: 第一批无 MCP 依赖;🟡🔴 项在内容中预留卖家精灵 MCP 工具调用位,标注「待接入」
8. **diff-first**: 改写后先写到 `claude-drafts/` 供 Haopeng 审,批准后再入 wiki/pages/ + 改 index.md + log.md

---

## 5. 待 Haopeng 拍板的开放问题

**已拍板（2026-06-04)**:
- ✅ 不追踪上游更新,一次性挖矿
- ✅ 第一批落成 wiki 方法论页（distill),不做 skill;将来接 MCP 再 skillify
- ✅ 合并重叠项（利润测算、视觉规划）
- ✅ 第一批现在就让 Codex 跑,不阻塞卖家精灵决策

**仍待定**:
1. **卖家精灵订阅**: 第三批（🔴 监控/竞品）价值完全取决于此。先订最低档跑通闭环,还是先只做框架?
2. **命名空间**: vault 里用 `skill-amazon-*` 前缀,还是 `wildlume/amazon-ops` tag + MOC?→ Codex 落地前 `ls wiki/pages/` 核实现有约定
3. **第一批边界**: 核心 7 页之外,A+ 内容/供应链/跟卖维权/跨境扩张这 4 个 🟢 项,是否一并纳入第一批?

---

*本清单基于 2026-06-04 抓取的两仓库 README + SkillHub 页面。SKILL.md 正文细节由 Codex 在 clone 后逐个读取确认。上游无版本号,落地时以 clone 当下的 commit SHA 为准。*
