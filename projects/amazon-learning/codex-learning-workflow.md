# Amazon Learning — Codex 工作流

本项目把课程素材转成“可验证的学习者知识网”，不是把未实操的内容写成 SOP。Codex 是过程稿、审查与入库的单一执行者；Haopeng 保留信度、取舍和是否进入长期知识的最终判断。

## 分工

| 角色 | 职责 | 不做什么 |
|---|---|---|
| Haopeng | 目标、信度、实操边界、入库裁决 | 手动维护结构与 diff |
| Codex | 读源、过程稿、结构审查、入库、propagation | 冒充实操者或替代业务判断 |
| Hermes cross-eval | 独立审证据链与草稿 | 直接写 wiki 或判定个人共鸣 |

Claudian 只是 Codex 在 Obsidian 内的界面，不是第二位主笔。

## 阶段

1. 在 `projects/amazon-learning/` 写过程稿：知识地图、概念清单、方法论候选、理解检验、沙盘记录。
2. 每个结论明确标成课程原话、外部验证、个人理解或待实操验证。
3. Codex 做只读收口审查：已有页面、命名、type、来源、MOC、传播影响和“是否误写成 SOP”。
4. Haopeng 决定哪些可入库；不确定的继续留在 projects。
5. Codex 入库：更新页面、MOC、index、log，并把 git 留给 auto-commit watcher。
6. 对需要独立质量闸门的长材料或镜射草稿，运行 [[skill-cross-eval]]；它通过后才是“可审”，不是“正确”。

## 入库红线

- 没有实操证据，不写运营 SOP。
- 没有来源或适用边界，不进入 `wiki/pages/`。
- 不为课程术语机械建页；先检查是否已被现有 Amazon 页面覆盖。
- 过程稿留在 projects；长期理解才进 wiki。
- 每次入库后检查 `amazon-moc`、`index.md`、`log.md` 与关联页面。

## 阶段交接模板

```markdown
## 阶段结果

- 目标：
- 读取的来源：
- 过程稿：
- 已确认结论：
- 待验证 / 待实操：
- 建议入库候选：
- 可能影响的现有页面：
- 需要 Haopeng 判断：
```

## 参考

- 项目定义：[README.md](README.md)
- vault 规范：`design-principles.md`、`wiki/CLAUDE.md`
- 质量 gate：[[skill-cross-eval]]
