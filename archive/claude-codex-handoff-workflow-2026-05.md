# Claude + Codex 接力工作流

> 适用场景：在 ZHPMind 中持续使用 Claude 和 Codex 协作，尤其是 `projects/amazon-learning/` 这类长周期蒸馏项目。
>
> 核心原则：Claude 做深度语义蒸馏，Codex 做结构审查、系统收口和仓库级验证；Haopeng 做最终判断。

---

## 1. 为什么需要接力工作流

ZHPMind 不是普通笔记库，而是一个长期运转的个人知识系统。它有自己的规则：

- `projects/` 承载活的工作和过程稿。
- `wiki/raw/` 承载可追溯的原始素材。
- `wiki/pages/` 承载长期可复用的知识页。
- `wiki/pages/index.md` 是主目录。
- `wiki/log.md` 是 append-only 操作日志。
- `design-principles.md` 是系统宪法。
- `wiki/CLAUDE.md` 是 wiki 操作手册。

如果 Claude 和 Codex 同时自由写入，很容易出现：

- 重复建页。
- 旧页面未 propagation。
- `index.md` 漏更新。
- `log.md` 漏记录。
- frontmatter 不一致。
- 过程稿过早进入长期 wiki。
- 两个 AI 互相覆盖对方修改。

所以协作方式不是“两个 AI 同时干”，而是“一个主笔，一个审查，按交接包接力”。

---

## 2. 三方分工

### Haopeng

Haopeng 是判断者，不是整理工。

负责：

- 决定当前阶段目标。
- 判断哪些内容值得长期保存。
- 判断方法论信度，尤其是 Amazon 这种尚未实操的领域。
- 决定是否从 `projects/` 推进到 `wiki/pages/`。
- 在 Claude 和 Codex 结论冲突时做最终裁决。

不需要负责：

- 手动维护 index。
- 手动检查所有 frontmatter。
- 手动查所有 propagation 影响面。
- 手动整理 git diff。

### Claude

Claude 是深度蒸馏主笔。

适合负责：

- 阅读长材料、课程逐字稿、书、文章。
- 做语义理解和知识拆解。
- 生成课程结构图。
- 提炼概念清单和方法论清单。
- 进行学习者视角的理解检验。
- 写 `projects/amazon-learning/` 下的过程稿。
- 对内容含义、概念边界、课程逻辑做第一轮判断。

不适合直接负责：

- 最终全库结构收口。
- 大范围同步 `index.md`、`log.md`、MOC、旧页面。
- 仓库级 diff 审查。
- 多文件规范一致性检查。

### Codex

Codex 是系统审查员和收口执行者。

适合负责：

- 读取 `design-principles.md` 和 `wiki/CLAUDE.md` 后做规则一致性检查。
- 检查 frontmatter、`type`、`sources`、`source_count`。
- 检查 wikilink、MOC、index、log。
- 判断 Claude 产出应该留在 `projects/` 还是进入 `wiki/pages/`。
- 做 propagation 影响面审查。
- 检查重复页面、命名冲突、页面尺寸、孤岛风险。
- 做 git status / diff / commit 前审查。
- 执行最终落盘。

不适合替代 Haopeng 做：

- 业务真实性最终判断。
- 是否“真的会用”的信度裁决。
- 项目方向取舍。

---

## 3. 总原则

### 原则 1：同一时间只有一个写入者

任何阶段都必须明确：

- 当前谁可以写文件。
- 另一个 AI 是否只读。
- 写入范围是什么。

推荐规则：

- Claude 写 `projects/amazon-learning/` 过程稿时，Codex 只读 review。
- Codex 做 wiki 入库和结构收口时，Claude 暂停写入。
- 需要双重检查时，第二个 AI 只读 review git diff。

### 原则 2：长材料先进 projects，不直接进 wiki

Claude 对课程、书、文章的理解，先落在：

```text
projects/amazon-learning/
```

只有通过检查后，才进入：

```text
wiki/pages/
```

这能避免“刚学过”被误写成“已经掌握”。

### 原则 3：wiki 入库必须走收口清单

任何内容进入 `wiki/pages/` 前，都要检查：

- 是否有清晰 type。
- 是否有来源。
- 是否有信度标记或适用边界。
- 是否影响已有页面。
- 是否需要更新 MOC。
- 是否需要更新 index。
- 是否需要追加 log。

### 原则 4：Claude 负责内容深度，Codex 负责系统不变形

Claude 的产出优先追求理解深度。

Codex 的工作优先追求：

- 结构正确。
- 可追溯。
- 可回滚。
- 不膨胀。
- 不漏同步。

---

## 4. 标准接力流程

### Step 1：Haopeng 指定阶段

每次开始前，先用一句话规定角色和边界。

示例：

```text
Claude 现在做 amazon-learning W1 课程结构图。只写 projects/amazon-learning/，不要写 wiki/pages。完成后输出 Handoff。
```

或：

```text
Codex 现在只读检查 Claude 的 W1 产出，不修改文件。重点看是否符合 ZHPMind 规则，以及下一步能否进入 wiki。
```

### Step 2：Claude 做过程稿

Claude 在 `projects/amazon-learning/` 里写过程文件，例如：

```text
projects/amazon-learning/01-course-knowledge-map.md
projects/amazon-learning/02-concept-list.md
projects/amazon-learning/03-method-list.md
projects/amazon-learning/04-fable-checks/
projects/amazon-learning/05-sandbox-simulation.md
```

Claude 本阶段不直接写：

```text
wiki/pages/
wiki/pages/index.md
wiki/log.md
```

### Step 3：Claude 输出 Handoff

每次 Claude 完成阶段后，必须输出固定格式 Handoff。

可以写在本轮产出文件末尾，也可以单独写：

```text
projects/amazon-learning/HANDOFF.md
```

Handoff 模板见第 7 节。

### Step 4：Codex 只读 review

Codex 读取：

- 本阶段产出。
- Handoff。
- `design-principles.md`。
- `wiki/CLAUDE.md`。
- 相关 MOC 和已有 wiki 页面。

Codex 输出：

- 哪些内容可以进入 wiki。
- 哪些内容必须继续留在 projects。
- 哪些页面可能重复。
- 需要新建哪些页面。
- 需要更新哪些旧页面。
- 需要更新哪些 MOC / index / log。
- 有哪些信度风险。

### Step 5：Haopeng 裁决

Haopeng 决定：

- 是否继续让 Claude 深挖。
- 是否让 Codex 执行入库。
- 是否降低某些内容信度。
- 是否暂缓 SOP / 方法论页。

### Step 6：唯一写入者执行落盘

进入写入阶段时，明确唯一写入者。

推荐：

```text
Codex 现在是唯一写入者。根据已确认方案执行 wiki 入库。写完后检查 git diff、index、log、frontmatter、sources、source_count、MOC 和 propagation。
```

写入结束后，Codex 应输出：

- 创建了哪些页面。
- 更新了哪些页面。
- 哪些内容留在 projects。
- propagation 改了哪些旧页。
- index/log 是否已更新。
- 是否还有未处理风险。

### Step 7：另一个 AI 只读复核

如果 Codex 写入，让 Claude 只读检查语义是否变形。

如果 Claude 写入，让 Codex 只读检查结构是否合规。

---

## 5. amazon-learning 推荐节奏

### W1：课程知识结构图

主笔：Claude

产出：

```text
projects/amazon-learning/01-course-knowledge-map.md
```

目标：

- 梳理课程全局结构。
- 看讲师如何组织知识。
- 暂不做信度判断。
- 暂不进 wiki。

Codex review 重点：

- 结构是否能支撑后续概念拆分。
- 是否混入过早方法论结论。
- 是否能映射到现有 Amazon MOC。

### W2：硬概念清单 + 多源验证

主笔：Claude

产出：

```text
projects/amazon-learning/02-concept-list.md
```

目标：

- 提取 30-50 个 atomic concept。
- 每个概念标记课程说法、官方来源、外部来源。
- 初步标记信度。

Codex review 重点：

- 哪些概念已有 wiki 页。
- 哪些概念适合新建 wiki 页。
- 哪些概念只是术语，不值得独立成页。
- `amazon-moc` 是否需要扩展。

### W3：方法论清单 + adversarial review

主笔：Claude

产出：

```text
projects/amazon-learning/03-method-list.md
projects/amazon-learning/adversarial-reviews/
```

目标：

- 提取课程中的判断框架和操作方法。
- 用对立专家视角反驳。
- 标记接受 / 驳回 / 待验证。

Codex review 重点：

- 方法论是否冒充实操 SOP。
- 是否需要保留在 projects，暂不进 wiki。
- 哪些可以写成 `type: method`。
- 哪些必须加应用边界和低信度标记。

### W4：概念理解检验

主笔：Claude

产出：

```text
projects/amazon-learning/04-fable-checks/
```

目标：

- 对核心概念做直觉锚点或理解检验。
- 记录 Haopeng 是否真的能答出迁移问题。

Codex review 重点：

- 哪些直觉锚点适合进入 wiki。
- 哪些比喻会污染精度。
- 哪些结构型概念不该强行寓言化。

### W5：沙盘演练

主笔：Claude + Haopeng

产出：

```text
projects/amazon-learning/05-sandbox-simulation.md
```

目标：

- 用一个具体 SKU 假执行完整流程。
- 记录卡壳点。
- 暴露“记得住但不会用”的内容。

Codex review 重点：

- 哪些卡壳点应该变成学习 backlog。
- 哪些结论可以 harvest 到 wiki。
- 哪些仍然不能写成 SOP。

### W6：wiki 入库

主笔：Codex

目标：

- 将经过验证的内容沉淀到 `wiki/pages/`。
- 更新 Amazon MOC。
- 更新 index。
- 追加 log。
- 做 propagation。
- 检查 frontmatter 和来源。

可能创建：

```text
wiki/pages/concept-amazon-*.md
wiki/pages/method-amazon-*.md
wiki/pages/amazon-operations-moc.md
```

但是否使用 `concept-amazon-*` 命名，需要先和现有命名风格对齐。当前库中已有：

```text
wiki/pages/a9-algorithm.md
wiki/pages/amazon-ppc-advertising.md
wiki/pages/amazon-product-selection.md
wiki/pages/listing-optimization.md
```

所以最终命名应优先保持现有风格，不机械套新前缀。

---

## 6. 切换口令

### 给 Claude：蒸馏主笔模式

```text
你现在是 ZHPMind 的深度蒸馏主笔。

任务：处理 amazon-learning 当前阶段。

边界：
- 只写 projects/amazon-learning/。
- 不写 wiki/pages/。
- 不写 wiki/pages/index.md。
- 不写 wiki/log.md。
- 不改 design-principles.md 或 wiki/CLAUDE.md。

要求：
- 先读 projects/amazon-learning/README.md。
- 按当前阶段产出过程稿。
- 明确区分课程原文、你的理解、待验证判断。
- 不把未实操的方法论写成 SOP。
- 完成后输出 Handoff。
```

### 给 Claude：语义复核模式

```text
你现在只读复核 Codex 的本轮修改。

重点检查：
- 语义有没有被压扁或误解。
- Amazon 课程原意有没有被改写错。
- 方法论边界是否清楚。
- 信度标记是否保守。
- 是否有“没实操却写成 SOP”的问题。

不要修改文件，只输出 review。
```

### 给 Codex：系统审查模式

```text
你现在是 ZHPMind 的系统审查员。

任务：只读检查 Claude 在 projects/amazon-learning/ 的产出。

边界：
- 不修改任何文件。
- 先读 design-principles.md、wiki/CLAUDE.md、wiki/pages/index.md、projects/amazon-learning/README.md。
- 再读 Claude 本轮产出。

重点检查：
- 哪些内容能进 wiki/pages。
- 哪些内容必须留在 projects。
- 是否已有重复页面。
- 需要新建或更新哪些页面。
- 需要 propagation 到哪些旧页。
- index/log/MOC/frontmatter/sources/source_count 会如何变化。
- 有哪些信度风险。
```

### 给 Codex：唯一写入者模式

```text
你现在是本轮唯一写入者。

任务：根据已确认方案执行 ZHPMind 入库和收口。

要求：
- 执行前先读 design-principles.md 和 wiki/CLAUDE.md。
- 不改 projects/ 中 Claude 的过程稿，除非本轮明确要求。
- 新建或更新 wiki/pages 时补齐 frontmatter。
- 更新相关 MOC。
- 更新 wiki/pages/index.md。
- 追加 wiki/log.md。
- 做 propagation 影响面审查。
- 写完后检查 git status 和 git diff。
- 最终报告创建、更新、保留、风险。
```

### 给 Codex：提交前 review 模式

```text
你现在只做提交前 review，不修改文件。

请检查当前 git diff：
- 是否违反 design-principles.md。
- 是否违反 wiki/CLAUDE.md。
- 是否漏了 index/log/MOC。
- 是否有 frontmatter 错误。
- 是否有 sources/source_count 不一致。
- 是否有重复页面或命名漂移。
- 是否有不该进入 wiki 的低信度内容。
```

---

## 7. Handoff 模板

每次 Claude 完成一个阶段后，输出：

```markdown
## Handoff

### 本轮任务

- 阶段：
- 目标：
- 写入范围：

### 本轮读了什么

- `path/to/source-1`
- `path/to/source-2`

### 本轮产出了什么

- `projects/amazon-learning/...`

### 核心结论

- ...
- ...
- ...

### 建议进入 wiki 的内容

| 候选页面 | 建议 type | 来源 | 信度 | 理由 |
|---|---|---|---|---|
| `page-name` | concept / method / framework / article | ... | ... | ... |

### 建议继续留在 projects 的内容

| 内容 | 原因 | 下一步 |
|---|---|---|
| ... | 未验证 / 太过程化 / 仍是草稿 | ... |

### 可能影响的已有页面

- `wiki/pages/...`
- `wiki/pages/...`

### 不确定点

- ...
- ...

### 需要 Codex 检查

- frontmatter
- sources/source_count
- 是否重复建页
- MOC 是否要更新
- index/log 是否要更新
- propagation 影响面
- 是否有低信度内容误入长期 wiki
```

---

## 8. Codex Review 输出模板

Codex 只读 review 时，输出：

```markdown
## Review 结论

### 总体判断

（可进入下一阶段 / 需要返工 / 建议暂缓入库）

### 可进入 wiki 的内容

| 内容 | 建议页面 | type | 条件 |
|---|---|---|---|
| ... | ... | ... | ... |

### 不应进入 wiki 的内容

| 内容 | 原因 | 建议位置 |
|---|---|---|
| ... | ... | `projects/amazon-learning/...` |

### 需要更新的已有页面

- `wiki/pages/...`：原因
- `wiki/pages/...`：原因

### 需要更新的导航和日志

- `wiki/pages/index.md`
- `wiki/pages/amazon-moc.md`
- `wiki/log.md`

### 风险

- ...
- ...

### 建议下一步

1. ...
2. ...
3. ...
```

---

## 9. 入库前检查清单

任何内容从 `projects/amazon-learning/` 进入 `wiki/pages/` 前，检查：

```markdown
- [ ] 这条内容已经不是过程稿。
- [ ] 有明确的长期价值。
- [ ] 有明确来源。
- [ ] 没有把课程话术当成事实。
- [ ] 没有把未实操的方法论写成 SOP。
- [ ] 已检查是否存在重复页面。
- [ ] 已选择正确 type。
- [ ] frontmatter 完整。
- [ ] `sources` 和 `source_count` 一致。
- [ ] tag 符合规则。
- [ ] 需要的 wikilink 已补。
- [ ] 相关旧页已 propagation。
- [ ] MOC 已更新。
- [ ] index 已更新。
- [ ] log 已追加。
- [ ] git diff 已检查。
```

---

## 10. 冲突处理规则

### Claude 认为可以入库，Codex 认为不该入库

默认暂缓入库，留在 `projects/`。

原因：长期 wiki 的错误成本高于过程稿的延迟成本。

### Claude 和 Codex 对页面类型判断不同

按以下优先级判断：

1. 是否是稳定理解：`concept` / `method` / `framework`
2. 是否是一次性来源蒸馏：`article` / `book`
3. 是否是人物：`person`
4. 是否是状态快照：`snapshot`
5. 是否是导航：`moc`
6. 是否是工作流反思：`skill`

拿不准时，先留在 `projects/`。

### Claude 想写 SOP

如果没有真实实操数据，默认不写 SOP。

可以改写为：

- 学习者理解。
- 方法论候选。
- 沙盘演练记录。
- 待实操验证清单。

### Codex 发现 schema 和语义表达冲突

先保语义，再调结构。

但如果语义无法被准确结构化，暂缓入库。

---

## 11. 推荐文件布局

`amazon-learning` 项目期推荐：

```text
projects/amazon-learning/
├── README.md
├── claude-codex-handoff-workflow.md
├── HANDOFF.md
├── 01-course-knowledge-map.md
├── 02-concept-list.md
├── 03-method-list.md
├── 04-fable-checks/
├── 05-sandbox-simulation.md
└── adversarial-reviews/
```

`HANDOFF.md` 可以覆盖更新，也可以按阶段拆分：

```text
handoff-w1.md
handoff-w2.md
handoff-w3.md
```

如果担心覆盖历史，优先按阶段拆分。

---

## 12. 一句话版本

Claude 负责把长材料变成有深度的过程稿。

Codex 负责判断这些过程稿如何安全进入 ZHPMind。

Haopeng 负责判断哪些东西真正值得成为自己的长期知识。

每次切换都靠 Handoff，不靠上下文记忆猜测。

