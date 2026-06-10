# Handoff: policy-monitor(管线 A 首个 Push skill)

> 发起:chat-Claude,2026-06-10
> 执行:Codex(Haopeng's Mac mini)
> 设计输入:`draft-policy-monitor-sources.md` v3(源清单 + 优先级,本 handoff 的权威附件)
> 架构依赖:digest 管线确定性化已落地(`result-digest-pipeline.md`)——本 skill 完全复用"脚本产 JSON 固定路径 + LLM 只做解读"模式
> 完成后写 `result-policy-monitor.md` 回报

---

## 设计总则(不可妥协的四条)

1. **聚合不散装**:每次运行最多产出一份 `inbox/policy-digest-{YYYY-MM-DD}.md`;无命中不产文件。永不把条目 1:1 写入 inbox。
2. **确定性下沉**:抓取、去重、diff、硬规则过滤全部在脚本层(JSON 输出到固定路径);LLM 只做相关性评分与 digest 撰写,禁止自行抓取或重定义规则。
3. **证据链**:digest 末尾折叠段保留本次全部丢弃项(标题 + 链接 + 丢弃理由码),供人审"它替我扔了什么"。
4. **背压**:写 inbox 前统计积压(排除系统快照);>50 时本次改为追加到周聚合缓存,周一随 digest 一并产出;告警一次。

## 阶段 0:基础设施评估(先做,产短报告再继续)

1. 拆解 Hermes 内建 `blogwatcher` 与 `feeds` skill:能否复用其页面 diff / RSS 拉取能力?结论写进回执,能复用则不造轮子。
2. RSSHub 自托管评估:Docker @ mini;验证关键路由可用性(gov.cn 政策库、雨果网、gs.amazon.cn)。路由不可用的源回退页面 diff。
3. 验证官方 RSS:Consilium、EUR-Lex、GOV.UK Atom(三者为设计假设,需实测确认具体 feed URL)。
4. ⚠️ 判断点:RSSHub 容器的归属(mac-sync 管理 vs Hermes 侧)与端口/重启策略。

## 阶段 1:采集脚本 policy-scan.py

- 源配置外置:`sources.yaml`(源 URL、类型 rss/page-diff、分组 A–F、频率、过滤锚点),禁止硬编码进脚本——加减源只改配置
- 每源拉取 → 与上次快照 diff → 新条目进候选池
- **硬规则层**(脚本内):
  - 直接收录:命中品类词表(初版见下)或分组锚点词(见 sources v3 各组)
  - 直接丢弃:营销类特征词(促销/大卖/爆单/课程/直播预告等),理由码 MARKETING
  - 其余 → 标记 NEEDS_SCORING 交 LLM 层
- 输出 JSON 原子写固定路径:`~/.hermes/scratch/policy-scan-latest.json`(含 scan_date、各源状态、候选池、丢弃池)
- 源失败容错:单源抓取失败不中断整轮,JSON 中记录源健康状态;连续 3 天失败的源在 digest 中提示

### 品类词表初版(写入 sources.yaml,标注"待 Haopeng 增补")

中文:藤编、柳编、编织家具、户外家具、花园家具、家居
英文:rattan、wicker、woven furniture、outdoor/garden furniture
编码:CN 46 章(编结材料制品)、9401(坐具)、9403(其他家具)
法规专名:EUDR、GPSR、PPWR、ESPR、IOSS、OSS、UKCA、de minimis、€150、£135

## 阶段 2:policy-monitor skill(LLM 解读层)

`~/.hermes/skills/policy-monitor.md`,严格仿照修复后的 review-digest 形态:

- 第一步执行 policy-scan.py,只读固定 JSON
- 对 NEEDS_SCORING 条目按内联评分标准打分:能引发经营动作(费用/合规/截止日期/税率)→ 收录置顶;周边相关 → 收录折叠;无关 → 丢弃(理由码 LLM_IRRELEVANT)
- digest 结构:置顶行动项(含生效日期倒计时)→ 分组摘要(A–F)→ 折叠丢弃记录 → 源健康状态 → 已知局限
- frontmatter:`type: snapshot` / `source: hermes/policy-monitor` / 溯源字段同既有规范
- changelog 追加一行

## 阶段 3:dogfood(强制,不可跳过)

1. `--draft` 模式先行:**前 7 天**产物只写 `claude-drafts/result-policy-{date}.md`,不碰 inbox、不设 cron
2. Haopeng 每日花 2 分钟审:置顶项准不准、丢弃记录里有没有错杀
3. 7 天后 chat-Claude 二轮评审(过滤精度 + Pitfalls),通过后才授予 inbox 写入权 + daily cron(建议北京时间上午 8:00,欧洲前一日动态已齐)
4. Pitfalls 写入 `wiki/pages/skill-policy-monitor.md`(新建,status: draft,随转正改 active)

## 验收标准

- [ ] sources.yaml 覆盖 v3 清单 A–F 全部一期源(美国侧 H 组不部署)
- [ ] 单源失败不中断;源健康可见
- [ ] 同一条目跨源去重(同 URL 或标题高相似)
- [ ] 丢弃记录完整带理由码
- [ ] 背压逻辑可测(临时把阈值调 0 验证转周聚合路径)
- [ ] draft 7 天期间 inbox 零写入
- [ ] 全程不手动 git(watcher 入库)

## 判断点汇总

- 阶段 0 全部三项
- 词表增补幅度(初版从宽还是从严,倾向从宽 + 靠丢弃记录迭代)
- 周聚合缓存的存放位置
- 拿不准就停,写进回执问
