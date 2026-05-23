---
name: concept-fable
description: 给 wiki/pages/ 下的 concept / method / framework 类型页面生成或审查"直觉锚点"段落——用日常场景的寓言或类比包裹概念核心感觉，让陌生概念变成大脑愿意主动复述的画面。
---

# concept-fable

## 调用场景

- Haopeng 说 `/concept-fable [page-name]` 或"给 X 加直觉锚点"或"为 X 写个寓言"
- distill 工作流产出新 concept/method/framework 页时，Claudian 可主动建议"要不要给这个加直觉锚点"
- 已有页面的直觉锚点显得牵强、需要 rewrite 时

## 适用边界（生成前先判断）

| 概念类型 | 处理方式 |
|---|---|
| 感觉型 / 关系型（陌生化、心流、PMF、孤独、协作）| **强烈推荐生成** |
| 方法论（method 类，如 5 Whys、A/B 测试、OKR 设定）| **可选**——类比可能比寓言更合适，看具体情况 |
| 结构型（FIFO、漏斗转化率、库存周转率、布林带）| **警告并询问**——强塞寓言会污染精度。若用户坚持，明确告知"这条直觉锚点服务于'记得有这回事'，不替代结构本身" |
| `type: person / project / snapshot / book / article / reflection` | **拒绝**——不是 concept-fable 的适用对象 |

判断不出来的边界样本，问 Haopeng "这个概念你想要的是'记住感觉'还是'记住结构'？"

## 工作流

### Step 1 — 读目标页

读取 `wiki/pages/[page-name].md`。确认 `type` 是 concept / method / framework 之一。

如果页面已有「## 直觉锚点」段：
- 进入「审查模式」：评估现有寓言对当前 Compiled Truth 是否仍准确，给出 keep / rewrite / remove 建议
- 跳到 Step 5

否则进入「生成模式」，继续 Step 2。

### Step 2 — 类型判断 + 寓言候选生成

读 `.claude/skills/concept-fable/references/prompt-template.md`，按其中的判断流程：

1. 判断概念类型（感觉型 / 方法论 / 结构型）
2. 若结构型，先警告，等 Haopeng 确认是否继续
3. 生成 3 个候选寓言（每个 150-300 字），覆盖不同生活场景（避免都用职场或都用家庭）

### Step 3 — 检验问题 + 比喻成立点

对每个候选寓言，按 prompt template 要求附：

- **2-3 道检验问题**（必须是"概念迁移题"——能用这个寓言推理出新场景的判断/选择，不是"复述寓言细节题"）
- **为什么这个比喻成立**（1-2 句话：核心对应关系 + 边界——比喻**不**对应的部分）

### Step 4 — 输出 + 选择

把 3 个候选寓言、检验问题、成立点输出给 Haopeng，让其选择或要求 mix-and-match。

### Step 5 — 写入页面

按 wiki/CLAUDE.md §3.9 模板写入页面顶部「## 直觉锚点」段：

```markdown
## 直觉锚点

（选定的寓言，150-300 字）

**检验问题**：
1. ...
2. ...

**为什么这个比喻成立**：
（核心对应 + 边界）
```

- 段落 soft limit 100 行——超了拆细或重写
- 位置：在「## 定义」之前
- 刷新 frontmatter `updated`
- 把日期 append 到 frontmatter `discussions`

### Step 6 — 自检（不能省）

逐项过：

- [ ] 寓言是"具体日常场景"还是"另一个抽象概念"？后者不合格，回 Step 2
- [ ] 检验问题是"迁移"还是"复述"？复述题不合格，重写
- [ ] 比喻成立点是否写了**边界**（不对应的部分）？没写不合格
- [ ] 寓言里有没有用比目标概念更抽象的词？有就不合格
- [ ] 段落是否超过 100 行 soft limit？

### Step 7 — Log + Commit

按 wiki/CLAUDE.md §5 写一条 `concept-fable` 日志：

```markdown
## [YYYY-MM-DD] concept-fable | [page-name]: 生成/审查直觉锚点

- **Pages updated**: [[page-name]]
- **Note**: 候选数 / 选定方案 / 类型判断结果
```

Git commit：

```bash
git -C "$VAULT" add -A && git -C "$VAULT" commit -m "wiki: concept-fable [page-name] – 直觉锚点 [生成|rewrite|审查]"
```

## Pitfalls

待首次实战后回填。预期会在以下方向遇到坑（详见 `[[skill-concept-fable]]` 反思页）：

- 寓言陷入"嵌套抽象"
- 检验问题写成复述题
- 结构型概念警告被忽略后产出确实掩盖了关键结构
- 段落超 soft limit

每发生一次，按 `wiki/pages/skill-review-digest.md` Pitfalls 表格式（Pitfall / 性质 / 应对）补到本节。

## References

- prompt 模板：`.claude/skills/concept-fable/references/prompt-template.md`
- 反思页：`wiki/pages/skill-concept-fable.md`
- 规范：design-principles v2.5「内容分类 / 直觉锚点适用边界」+ wiki/CLAUDE.md §3.9
- 范本：`wiki/pages/skill-review-digest.md` 的 SKILL.md 结构
