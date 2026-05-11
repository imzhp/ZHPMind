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
