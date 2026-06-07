---
title: "People MOC"
tags: [moc, people]
created: 2026-05-11
updated: 2026-06-08
---

# People MOC

本 MOC 覆盖 wiki 中全部 `type: person` 页面，并梳理人物之间的思想关联。当前人物分布于五个维度：**AI 工程**（Karpathy、Boris、Garry）、**财富与幸福哲学**（Naval）、**存在主义心理学**（Becker）、**行为经济学与认知心理学**（Kahneman），以及**专业技能获取**（Ericsson），合并构成一张"在 AI 时代如何积累财富与构建幸福生活、理解人类行为深层驱动力、以正确方式培养真正的能力"的全景图。

---

## 人物索引

### [[zhanghaopeng]]

vault 的主人与身份锚点。曜野（Wildlume）跨境供应链创始人、ZHPMind 系统的设计者与唯一操作者。与下面几位思想家不同——他是这个体系的主体，所有知识最终服务于他的认知循环。

---

### [[andrej-karpathy]]

AI 领域顶级研究员与工程师。OpenAI 联合创始人、Tesla Head of AI（Autopilot 工程落地）、Eureka Labs 创始人。以深度学习教育和第一性原理思考著称。

**核心贡献：** [[software-3-0]]（LLM 作为可编程计算机）、[[vibe-coding]]（AI 原生开发方式）、[[agentic-engineering]]（专业工程纪律）、[[verifiability]]（锯齿形能力框架）。

---

### [[boris-cherny]]

Anthropic 工程师，[[claude-code]] 的创造者。"工程师中的工程师"，著有《Programming TypeScript》，却在 2026 年停止手写代码——完全依赖 AI Agent 完成所有开发工作，是 Agentic Engineering 最极端的现实案例。

**核心贡献：** [[claude-code]]、MCP 协议、[[product-overhang]] 战略框架、`/loop` 工作范式。

---

### [[garry-tan]]

Y Combinator CEO，技术创业者与投资人。2025 年末重拾"建造者"身份，开源了整套个人 AI 操作系统（GBrain + GStack + OpenClaw），规模达约 10 万页结构化知识、100+ 技能文件、每日 100+ cron 任务。

**核心贡献：** [[skillification]]（技能化方法论）、[[fat-skills-thin-harness]]（Agent 架构原则）、[[personal-knowledge-base]]（GBrain 知识系统）。

---

---

### [[naval-ravikant]]

企业家、天使投资人，AngelList 联合创始人。以极简推文将财富逻辑和幸福哲学同时带入大众视野。核心主张：财富来自持有（equity）而非出卖时间；幸福是可学习的技能，是消除"缺乏感"后的默认状态。

**核心贡献：** 四种杠杆体系（劳动力/资本/代码/媒体）、专业知识（Specific Knowledge）框架、欲望即痛苦（Desire = Suffering）、理性的佛教（Rational Buddhism）。

---

### [[daniel-kahneman]]

2002 年诺贝尔经济学奖得主，行为经济学奠基人（1934–2024）。以心理学实验方法证明人类决策系统性偏离理性经济人假设。

**核心贡献：** [[prospect-theory|前景理论]]（与 Tversky 合作，1979）、[[dual-process-theory|双系统理论]]（系统一/系统二框架）、[[availability-heuristic|可得性启发]]、[[anchoring-effect|锚定效应]]、[[peak-end-rule|峰终定律]]、[[planning-fallacy|规划谬误]]。

---

### [[anders-ericsson]]

瑞典裔美国心理学家（1947–2021），佛罗里达州立大学教授，刻意练习（Deliberate Practice）理论的创立者。用三十余年实证研究证明：杰出成就主要由后天训练决定，而非先天才能；专家与新手的真正差距在于[[mental-representation|心理表征]]的密度与精度。

**核心贡献：** [[peak|刻意练习框架]]（三层练习质量梯度：天真练习 / 有目的练习 / 刻意练习）、[[mental-representation|心理表征]]（专家优势的机制解释）、杰出人物四阶段路线图、对"1万小时法则"的质量修正。

---

### [[ernest-becker]]

美国文化人类学家兼存在主义心理学家（1924–1974）。核心命题：对死亡的恐惧是人类行为的终极驱动力，人类一切文化活动本质上都是为了在象征层面否认死亡。

**核心贡献：** [[the-denial-of-death|《死亡否认》]]（1973 年普利策奖）、[[immortality-project|不朽筹划]]（英雄主义心理学核心框架）、[[causa-sui|自因]]（伊底帕斯式筹划的重读）、宇宙英雄主义（cosmic heroism）。

---

## 思想关联图

```
Karpathy ──"LLM Wiki" 想法────────────────────► Garry Tan（GBrain 的启发来源）
           │
           └──"Agentic Engineering" 框架──────► Boris Cherny（最极端实践案例）
                                               │
Garry Tan ──"Fat Harness / Thin Skills"────────┘
           （架构层面与 Boris "harness 重要性下降"预测同方向）

Naval ──────杠杆×专业知识→财富──────────────────► 与 Garry "Fat Skills / Fat Data" 呼应
           │                                     （技能积累是护城河的共识）
           └──幸福是可学的技能──────────────────► 独立于 AI 工程脉络，补充人生哲学维度

Becker ─────死亡恐惧是一切行为的底层──────────► Naval"欲望即痛苦"的更深一层基础
           │                                     （压制欲望其实是压制死亡焦虑的一种）
           └──人格是"必要谎言"──────────────────► 独立的存在主义心理学脉络
```

**跨维度汇聚节点：**
- **技能积累是护城河**：Garry 的 Fat Skills / Fat Data；Naval 的专业知识（无法培训）；Boris 的"领域知识是稀缺资源"；Ericsson 的[[mental-representation|心理表征]]积累——四者共指同一结构
- **Harness 要薄**：Boris + Garry 共识
- **人类角色转变**：Karpathy 的"设计师 + 指挥官"；Boris 的"整年不手写代码但仍做决策"；Garry 的"角度（Angles）"；Naval 的"判断力 > 执行力"
- **Ericsson × Naval**：Naval 的"专业知识无法被培训"说明了目标（specific knowledge）；Ericsson 的刻意练习说明了方法（如何系统获得该知识）——互为表里
- **Ericsson × Kahneman**：都是挑战"常识"的实证心理学家。Kahneman 证明人类决策系统性偏离理性（[[dual-process-theory|双系统]]）；Ericsson 证明人类能力系统性超越先天限制（刻意练习）——一个揭示人类认知的上限偏差，一个揭示人类潜能的下限误判
