# Wiki Operation Log

This file is append-only. Claudian adds entries; Haopeng reads them.
**Never edit or delete existing entries.**
Format: `## [YYYY-MM-DD] operation | Description`

---

## [2026-04-12] init | Wiki scaffold created

- **Sources touched**: none
- **Pages created**: [[index]] (master catalog)
- **Pages updated**: none
- **Note**: Initial scaffold created by Claudian. Directory structure, schema (CLAUDE.md), index, and log initialized. Wiki is ready for first ingest — drop a source file into `wiki/raw/` to begin.

---

## [2026-04-12] ingest | 亚马逊高阶运营培训手册.pdf

- **Sources touched**: `raw/亚马逊高阶运营培训手册.pdf`
- **Pages created**: [[amazon-advanced-operations-handbook]]、[[a9-algorithm]]、[[listing-optimization]]、[[amazon-ppc-advertising]]、[[amazon-traffic-sources]]
- **Pages updated**: [[index]]（更新索引，新增 5 条目，总页数 5）
- **Note**: 312 页亚马逊跨境运营培训手册，覆盖 9 章：A9 算法、Listing 打造（上/中/深度）、PPC 广告（上/中/下）、售后权重管理、产品选品思维。提取 4 个核心概念页（A9 算法、Listing 优化、PPC 广告、流量来源）+ 1 个摘要页。候选新增页面：`亚马逊选品思维`（第九章内容较多，可单独成页）、`review-management`（第七章评论管理）。

---

## [2026-04-12] update | 补建候选概念页：选品思维 & 评论管理

- **Sources touched**: none（基于已入库来源 `raw/亚马逊高阶运营培训手册.pdf`）
- **Pages created**: [[amazon-product-selection]]、[[amazon-review-management]]
- **Pages updated**: [[index]]（新增 2 条目，总页数更新为 7）
- **Note**: 根据上次 ingest 标记的候选页面补建。选品思维覆盖第九章全部内容（五维度判断、ASIN 群分析、差异化方法论、产品淘汰机制）；评论管理覆盖第三章评论体系和第八章售后全链路（差评处理、退货挽回、私域流量、红人营销）。

---

## [2026-05-08] ingest | Andrej Karpathy From Vibe Coding to Agentic Engineering.md

- **Sources touched**: `raw/Andrej Karpathy From Vibe Coding to Agentic Engineering.md`
- **Pages created**: [[andrej-karpathy-vibe-coding-to-agentic-engineering]]、[[andrej-karpathy]]、[[software-3-0]]、[[vibe-coding]]、[[agentic-engineering]]、[[verifiability]]
- **Pages updated**: [[index]]（新增 6 条目，总页数更新为 13）
- **Note**: Karpathy 在 Sequoia AI Ascent 2025 上的对谈转录（约 29 分钟）。核心议题：Software 1.0/2.0/3.0 范式演进、Vibe Coding vs Agentic Engineering 的区分、LLM 锯齿形能力与可验证性框架、动物 vs 幽灵的 LLM 本质模型、Agent 原生世界、"可以外包思考但不能外包理解"。创建 1 个摘要页、1 个实体页（Karpathy）、4 个概念页（software-3-0、vibe-coding、agentic-engineering、verifiability）。

---

## [2026-05-08] ingest | Boris Cherny Why Coding Is Solved, and What Comes Next.md

- **Sources touched**: `raw/Boris Cherny Why Coding Is Solved, and What Comes Next.md`
- **Pages created**: [[boris-cherny-coding-is-solved]]、[[boris-cherny]]、[[claude-code]]、[[product-overhang]]
- **Pages updated**: [[agentic-engineering]]（新增 Boris 100% AI 工作流案例和演化预测，source_count 更新为 2）、[[vibe-coding]]（新增印刷机类比与软件民主化论述，source_count 更新为 2）、[[index]]（新增 4 条目并更新 2 条目，总页数更新为 17）
- **Note**: Boris Cherny（Claude Code 创造者）在 Sequoia AI Ascent 2026 上的对谈转录（约 25 分钟）。核心议题：编程已被解决（100% AI 写代码）、Claude Code 起源与产品悬垂战略、/loop 工作流（cron 调度循环 agent）、跨学科通才取代纯工程师、Hamilton 七种护城河框架在 AI 时代的重塑、印刷机类比与软件民主化。创建 1 个摘要页、2 个实体页（boris-cherny、claude-code）、1 个概念页（product-overhang）。候选新建页面：`seven-powers`（Hamilton 七种护城河框架），暂仅在摘要页中提及。

---

## [2026-05-10] ingest | Meta-Meta-Prompting The Secret to Making AI Agents Work.md

- **Sources touched**: `raw/Meta-Meta-Prompting The Secret to Making AI Agents Work.md`（从 Clippings/ 复制）
- **Pages created**: [[garry-tan-meta-meta-prompting]]、[[garry-tan]]、[[skillification]]、[[fat-skills-thin-harness]]、[[personal-knowledge-base]]
- **Pages updated**: [[agentic-engineering]]（新增 Garry Tan 视角一节：技能化、Fat Skills / Thin Harness、实体传播和跨模态评估，source_count 更新为 3）、[[index]]（新增 5 条目并更新 2 条目，总页数更新为 22）
- **Note**: Garry Tan（YC CEO）在 X 平台发表的个人 AI 系统深度文章。核心议题：元元提示法（Skillification）——用元技能 Skillify 将手动工作流固化为可复用技能文件，技能组合成工作流网络，修复自动全局生效；书镜（Book Mirror）工作流——将书籍内容双栏映射到个人生活，通过跨模态评估（Opus/GPT/DeepSeek 三模型互打分）持续改进；Fat Skills / Fat Data / Thin Harness 架构——智能驻留在技能和数据中，Harness 只做路由；10 万页 GBrain 知识库——三段式页面结构（编译真相/时间线/来源）+ 实体传播（每次会议后自动更新所有相关页面）+ 100+ cron 任务持续维护。与已有页面的联系：agentic-engineering（Garry 提供知识管理维度的实践补充）、andrej-karpathy（GBrain 受 Karpathy LLM Wiki 启发）、boris-cherny（Fat Harness / Thin Skills 架构呼应）。候选新建页面：`book-mirror`（书镜工作流作为独立概念），暂仅在摘要页中描述。

---

## [2026-05-11] lint | 迁移全库至 v2 type 体系 + 人物页三段式重构

- **Sources touched**: none（结构性维护，无新来源）
- **Pages created**: none
- **Pages updated**: [[amazon-advanced-operations-handbook]]、[[andrej-karpathy-vibe-coding-to-agentic-engineering]]、[[boris-cherny-coding-is-solved]]、[[garry-tan-meta-meta-prompting]]、[[claude-code]]、[[andrej-karpathy]]、[[boris-cherny]]、[[garry-tan]]、[[index]]
- **Note**: [self-reviewed] 执行 CLAUDE.md v2 的全库 lint 迁移。

---

## [2026-05-11] update | 新建三个 MOC 导航页

- **Sources touched**: none（导航页，不引用 raw 来源）
- **Pages created**: [[amazon-moc]]、[[ai-engineering-moc]]、[[people-moc]]
- **Pages updated**: [[index]]（新增 "Maps of Content" 分组置顶，总页数更新为 25）
- **Note**: [self-reviewed] 新建三个 MOC（Map of Content）导航文件，不设 frontmatter type（MOC 是导航页，不是内容页）。amazon-moc 按七个子主题组织亚马逊/电商相关页面（算法与排名 / Listing 优化 / 广告体系 / 流量来源 / 评论管理 / 选品思维 / 综合运营手册）；ai-engineering-moc 按六个子主题组织 AI/LLM/工程相关页面（范式与能力 / 开发方式 / 工具链 / Agent 架构 / 知识管理 / 战略判断）并附来源文章区；people-moc 列出全部 person 类页面，新增三位思想家的关联关系图。index.md 在原有六组之上增加 "Maps of Content" 首组。发现并修复以下问题：(1) type 字段违规——`summary`（4 处）和 `entity`（4 处）均为旧体系值，替换为 v2 规范值：`summary` → `article`（4 个蒸馏页：amazon-advanced-operations-handbook、andrej-karpathy-vibe-coding-to-agentic-engineering、boris-cherny-coding-is-solved、garry-tan-meta-meta-prompting）；`entity` → `person`（3 个人物页：andrej-karpathy、boris-cherny、garry-tan）；`entity` → `concept`（claude-code，工具/产品类，不属于 person）。(2) 人物页结构违规——andrej-karpathy、boris-cherny、garry-tan 三页缺少三段式结构（Compiled Truth + Timeline + References），已全部重写；现有正文内容梳理入 Compiled Truth，可验证时间节点提取入 Timeline（无法确认的历史事件标注 [unsourced]），来源链接归入 References。(3) index.md 分类结构过时——旧有"综合概览/概念/实体/来源摘要/对比分析"5 组替换为 v2 规范的 6 组（Concepts & Methods / Frameworks / People / Articles & Books / Reflections / Snapshots）；claude-code 从 Entities 移入 Concepts & Methods；article 类页面统一归入 Articles & Books。tags 全库检查无违规（全小写、连字符分隔、纯英文）。updated 字段同步刷新至 2026-05-11。

---

## [2026-05-19] distill | The-Founders-Playbook-05062026_v3.pdf

- **Sources touched**: `raw/assets/references/The-Founders-Playbook-05062026_v3.pdf`
- **Pages created**: [[the-founders-playbook]], [[ai-native-startup]]
- **Pages updated**: [[claude-code]]（添加 CLAUDE.md 机制和 Claude Code Security 章节，增加来源）、[[agentic-engineering]]（添加代理技术债务章节，增加来源）、[[index]]（新增 2 条目，总页数 27）
- **Note**: Anthropic 出版的 36 页创业方法论。核心框架：AI 原生创业四阶段（Idea/MVP/Launch/Scale），每阶段有明确退出标准。新建概念页 ai-native-startup（包含护城河三重奏、与传统创业对比）。代理技术债务（Agentic Technical Debt）作为新的关键概念写入 agentic-engineering 页。Claude Cowork 作为新产品提及（候选新建页：尚未单独建页，但多处引用）。[self-reviewed]

---

## [2026-05-20] distill | 曜野 Project 推进框架

- **Sources touched**: none（来源为 Claude 对话沉淀，文件已在 wiki/pages/test-yaoye.md）
- **Pages created**: [[yaoye-project-roadmap]]
- **Pages updated**: [[index]]（Frameworks 区新增 1 条目，总页数 28）
- **Note**: 按 distill-yaoye-doc 规范处理 test-yaoye.md。内容为 2026-05-20 对话沉淀的曜野 Project 推进框架 v1，包含三层结构（业务层/流程层/基础设施层）、Phase 1 任务清单（14 项）、开新对话标准化做法。原文中指向已存在 wiki 页面的 wikilink（yaoye-business-architecture、yaoye-feedback-product、yaoye-feedback-listing）已验证有效；《曜野业务参考》无对应 wiki 页面，保留原文。重命名：test-yaoye.md → yaoye-project-roadmap.md（按命名映射表）。[self-reviewed]

---

## [2026-05-23] distill | Karpathy CLAUDE.md（外部参考蒸馏 + v2.5 index 补漏）

- **Sources touched**: `raw/karpathy-claude-md-original.md`（本次创建，verbatim 抓取自 multica-ai/andrej-karpathy-skills @ main，MIT）
- **Pages created**: [[karpathy-claude-md]]
- **Pages updated**: [[index]]（Concepts & Methods 新增 karpathy-claude-md；Skills 补 skill-concept-fable；总页数 34 → 36）
- **Note**: [self-reviewed] 蒸馏外部参考——Forrest Chang（Jiayuan Zhang）基于 Andrej Karpathy 对 LLM 编码失败模式的公开观察提炼的 4 原则 CLAUDE.md（Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution）。Concept 页 5 节：是什么 / 4 原则蒸馏 / 演进生态与争议 / 跟 ZHPMind 现规则对照 / v2.6 concept-fable dogfood 活样本。对照核心结论：v2.5 落地后 Think Before Coding（diff 先行 + 模糊处停下）和 Simplicity First（AI 心法三条）已基本对齐；Surgical Changes 类似精神但缺“每一行改动可追到请求”硬判据；Goal-Driven Execution 为最大补漏点（ZHPMind 现 AI 红线管“AI 写什么”，Goal-Driven 管“AI 怎么写”），不立即修，挂 v2.7 backlog。**顺带补 v2.5 遗漏**：skill-concept-fable.md 早于本次入 vault（commit a0ee185）但未在 index 登记，本次一并修复（Skills 区从 1 条到 2 条）。

---

## [2026-05-23] update | skill-review-digest 自我纠错（scanner 落地位置）

- **Sources touched**: 无（反思页内部修订）
- **Pages created**: 无
- **Pages updated**: [[skill-review-digest]]（§1 自我纠错；当前状态加 2026-05-23 观察结论；References 加 scanner 实际路径）
- **Note**: [self-reviewed] §1「changelog ≠ 实现状态」此前 5/20 判断 scanner 未落地，基于 `find ~/.hermes/skills/review-digest -name "*.py"` 无结果。本次 vault-tidy 设计前置 diligence 中查实，scanner 实际落地在 `~/.hermes/scripts/review-digest-scan.py`（独立 scripts/ 目录，跟 skills/ 平级），v4 changelog 准确反映了实现。教训反转：cross-check 文件状态时不要只在 skill 子目录找，Hermes 自身分工是 skill = 行为定义、scripts = 确定性逻辑。附独立 pitfall：SKILL.md 文档用 `review-digest-scanner.py`（带 ner），实际脚本/cron config 用 `review-digest-scan.py`（无 ner），命名漂移但不影响功能。当前状态段加观察结论：5/13 起 cron 实际跑 v4 单文件，v1.1 目录形态未再被调用，可考虑清理。

---

## [2026-05-23] distill | skill-vault-tidy(新 skill 设计:反思页 + SKILL.md 起草)

- **Sources touched**: 无(设计讨论沉淀,无外部素材)
- **Pages created**: [[skill-vault-tidy]]
- **Pages updated**: [[index]](Skills 区新增 skill-vault-tidy;总页数 36 → 37)
- **Note**: [self-reviewed] vault-tidy 是 review-digest 的"执行器"对偶——review-digest 报状态,vault-tidy 基于状态生成 + 执行 tidy actions。本次产出:反思页 wiki/pages/skill-vault-tidy.md(status: draft,引入新状态值 draft 表示"设计完成未部署")+ SKILL.md 单文件 draft(在 .tmp-claude-reports/draft-vault-tidy-skill.md,需手动 cp 到 ~/.hermes/skills/vault-tidy.md)。设计要点:Scope 三档(Tier 1 可自动 / Tier 2 只报告 / Tier 3 永不做);三种执行模式(--dry-run/apply/draft,把 v2.6 显式 draft 一等公民做实);跟 review-digest 接口为读 scanner JSON + 24h 时间戳硬阈值检查。失败模式预防表借鉴 review-digest v1→v4 6 条踩坑(含 2026-05-23 反思页查实的 scanner 位置教训)。当前状态 draft,未部署 Hermes,未跑 dogfood,留待下次会话上 Hermes + dogfood 验证。

---

## [2026-05-28] distill | 云飞扬 2023 课程 Phase 1（选品 + 财务铁三角 + 专利）

- **Sources touched**: `raw/qwei-amazon-course-2023-v2/`（2.产品开发方法论 / 如何分析市场容量 / 13.利润管理和利润分析 / 1.1三万块钱还能做亚马逊吗 / 14.库存管理，需求预测和备货节奏 / 4.专利筛查：选品全流程实操）
- **Pages created**: [[amazon-profit-analysis]]、[[amazon-cashflow-roi]]、[[amazon-inventory-replenishment]]、[[amazon-patent-screening]]
- **Pages updated**: [[amazon-product-selection]]（新增云飞扬层为第 2 源：财务决策器/垄断分型/市场容量实操/测款方法论/小宠笼实操闭环，source_count 1→2）、[[amazon-moc]]（新增财务与现金流/库存与备货/专利与合规三个子主题）、[[index]]（新增 4 条目 + 更新 product-selection，总页数 37→41）
- **Note**: 把 `.tmp-claude-reports/amazon-cross-source-diff-draft.md`（v0.9.16，云飞扬 2023 课程 18 节 / 915 条目 / 90% 独有，对照国民哥哥手册的跨源 diff）按“主对话直接写 vault 工作流”落地为正式 wiki，分三期，本次为 Phase 1（选品 + 财务铁三角 + 专利）。源材料为通义听悟清洗 v2 版（飞书 v1 作交叉验证）。云飞扬层与国民哥哥手册互补：手册讲选品五维度判断，云飞扬讲财务模型决策器（CPA/毛利额/广告依赖度 → ROI>1 或 毛利率>30% 二选一）+ 现金流铁三角（年化 ROI=单次 ROI×周转次数）。5 个用户点名 ⭐⭐⭐：三种头程 ROI 差一倍 + 毛利率陷阱 + 爆品带中等品 → product-selection；站外判断 → product-selection；超额利润警惕专利 → product-selection + patent-screening。🏢 曜野潜在场景条目未收入 wiki（归曜野 Project），仅收 💡通用 + 🏷️Amazon 专属。前向链接预埋 amazon-pricing-strategy（Phase 3 建）。draft 保留在 .tmp-claude-reports/ 作溯源。蒸馏模型 Claude Opus 4.7。Phase 2（广告 SOP）/ Phase 3（关键词/工具/方法论/价格）待续。

---

## [2026-05-28] distill | 云飞扬 2023 课程 Phase 2（广告 SOP）

- **Sources touched**: `raw/qwei-amazon-course-2023-v2/`（6.自然排名和广告排名的逻辑 / 8.广告投放全链路拆解 / 9.广告的搜索流量和关联流量 / 10.数据维度理解广告优化和案例实践 / 11.新品推广全流程）
- **Pages created**: [[amazon-new-product-launch]]
- **Pages updated**: [[amazon-ppc-advertising]]（新增云飞扬财务决策层+优化诊断 SOP 为第 2 源，source_count 1→2）、[[amazon-traffic-sources]]（新增云飞扬购买路径+关联流量打法为第 2 源，source_count 1→2）、[[amazon-moc]]（广告/流量条目补云飞扬层 + 新增“新品推广”子主题）、[[index]]（新增 amazon-new-product-launch + ppc/traffic 转 2 源，总页数 41→42）
- **Note**: Phase 2（广告 SOP）落地。云飞扬补的是手册之外的财务决策层 + 认知重塑 + 优化诊断 SOP：核心是 §10.2 整体盈亏 ACoS = 毛利率÷广告依赖度（⭐⭐⭐，“盈亏平衡 ACoS=毛利率”的升级，从广告不亏到链接不亏）、§8.3 路径 A 传统 vs 路径 B 战略性亏损、§8.10 四象限黄金法则（横轴 CVR 纵轴 ACoS，先判预算花完没）、§10.7 四层级诊断 L1-L4、§10.8 低毛利无法优化（80% 是选品财务问题）。traffic 页补 §9 购买路径升级（广告主做曝光不做转化 / 门 vs 摆位 / VCPM 半屏 1-1.5 秒 / SD 站内站外陷阱 / SB 同品牌多店铺归因虚高）；9.3 搜索流量 30% 口径冲突 footnote 已于 2026-05-27 预置，本次未重复。new-product-launch 新建页是 §11 集大成（11.9 八项指标预估vs实际全接近=可预测性首次验证⭐⭐、11.10 让产品适应你的标准⭐⭐⭐、全程只动竞价不动投放）。诚实断层：§6.1-6.4 自然/广告排名机制源材料未恢复，未硬编，已在 ppc Sources 标注待补。前向链接 amazon-pricing-strategy 仍待 Phase 3 建。draft 保留在 .tmp-claude-reports/ 作溯源。蒸馏模型 Claude Opus 4.7。Phase 3（关键词词库/数据化运营/商机探测器/价格策略）待续。

---

## [2026-05-28] distill | 云飞扬 2023 课程 Phase 3（关键词/工具/方法论/价格）— 全 18 节蒸馏完结

- **Sources touched**: `raw/qwei-amazon-course-2023-v2/`（3.商机探测器推广成本预估产品开发表 / 5.数据化运营入门 / 7.关键词词库文案和广告投放词选择 / 16.价格策略制定和执行 / 小红圈直播3-30关键词调研相关性2.0）
- **Pages created**: [[amazon-keyword-library]]（§7 + 小红圈相关性 2.0 合一页，2 源）、[[amazon-data-driven-operations]]（§5 方法论枢纽）、[[amazon-opportunity-explorer]]（§3 工具底层）、[[amazon-pricing-strategy]]（§16）
- **Pages updated**: [[listing-optimization]]（新增云飞扬文案反直觉取舍为第 2 源，source_count 1→2）、[[amazon-moc]]（新增数据化运营/关键词词库/选品工具/价格策略四个子主题 + Listing 补云飞扬文案）、[[index]]（新增 4 条目 + listing 转 2 源，总页数 42→46）
- **Note**: Phase 3 落地，**整个 18 节 / 915 条目跨源 diff 蒸馏全部完结（Phase 1+2+3）**，amazon-cross-source-diff-draft 使命达成。本期五块：§3 商机探测器（工具操作底层，之前每节引用的“预估”动作的实现；⭐⭐⭐ 转化率 vs 大盘=好/一般/垃圾终极判据 + 总销量倒推 + 搜索转化率高≠蓝海）/ §5 数据化运营（方法论枢纽，80% 难题可数据解释 + 关键词四象限源头 + ACoS 拆解链 + 广告归因 7 天）/ §7 关键词词库（财富+护城河 + SIFT 占位率反推）/ §16 价格策略（螺旋两轮 + 降价缩广告 5.8 万案例 + c-访问转化率=衡量降价唯一指标）/ 小红圈相关性 2.0。**小红圈并入 keyword-library 一页**作工具实操层（Sources 分两条标注 §7 + 小红圈，source_count 2），未单独成页。**建好 pricing-strategy 接通了 Phase 1/2 预埋的 [[amazon-pricing-strategy]] 前向链接（profit-analysis/inventory/patent），红链清零**。§7.5 文案部分增补到 listing-optimization，词库与投放主体在 keyword-library。诚实断层延续：ppc §6.1-6.4 排名机制仍待重读源材料补。draft 保留在 .tmp-claude-reports/ 作溯源。蒸馏模型 Claude Opus 4.7。至此 Amazon 簇 15 页（5 篇双源：product-selection/ppc-advertising/traffic-sources/keyword-library/listing-optimization），完整 SOP 链全互链。
