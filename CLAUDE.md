# ZHPMind Vault — Claude Code / Claudian 根指令

这是张昊鹏的 ZHPMind 知识库。你的工作目录就是本 vault 根目录。

**在对 `wiki/` 做任何操作之前,必须先完整阅读并严格遵守权威规范:**

@wiki/CLAUDE.md

`wiki/CLAUDE.md` 是 Claudian 的操作手册(detailed schema)。本文件只是加载器 + 红线;两者冲突时以 `wiki/CLAUDE.md` 为准。

**自动化优先**:凡是能由 agent 完成的机械工作——格式转换(EPUB/PDF → 文本)、文本提取、大文件分块读取——都自动完成,不要推给 Haopeng 手动操作。Haopeng 负责判断与决策,不负责搬运。(对应 design-principles「AI 做宽度和速度,人做深度和判断」。)

---

## 硬红线(覆盖你的默认习惯)

以下规则的存在,是因为过去的会话忽略了规范、把产物散落进自造的文件夹(`20.reading/`、`30.areas/`、`wiki/pages/concept/` 等)。不要重蹈覆辙:

1. **所有蒸馏 / 知识产物只进 `wiki/pages/`,且平铺。** 一本书 → 一个 `wiki/pages/{slug}.md`,`type: book`。
2. **禁止新建任何 Johnny-Decimal 目录或任何新的顶层 / 子目录**(如 `20.reading/`、`30.areas/`、`wiki/books/`、`wiki/pages/concept/`)。`wiki/pages/` 是平铺的,没有子文件夹。
3. **文件名**:小写连字符英文 slug,无日期,无下划线前缀(`asking-the-right-questions.md`,不是 `经营者的财务金三角-蒸馏版.md`)。
4. **标签**:纯英文、小写、连字符。中文书名 / 别名放进 frontmatter 的 `aliases`,绝不作为 tag。
5. **正文语言**:简体中文(见 `wiki/CLAUDE.md` §16)。wiki 页面里不用 emoji。
6. **走完整 distill 工作流**(`wiki/CLAUDE.md` §6):正确 frontmatter、更新 `wiki/pages/index.md` 与 `wiki/log.md`、最后 git commit。
7. **来源太大读不下时,自动用子 agent / 工具提取并分块读取——这是机器该干的活,不要回头问 Haopeng 手动拆。但子 agent 只负责返回提取的文本 / 分块摘要,最终页面一律由你(受本规范约束的主 agent)写入 `wiki/pages/`。绝不让子 agent 直接写文件、也绝不让它自行决定存放位置。** 即「自动分块读取,受控统一写入」。

## 写入前自检(每次写 `wiki/pages/` 前过一遍)

- [ ] 我已经读过 `wiki/CLAUDE.md` 了吗?
- [ ] 产物是否落在 `wiki/pages/` 平铺区,而不是任何子目录 / 顶层新目录?
- [ ] 文件名是否小写连字符英文 slug?tag 是否纯英文?
- [ ] `type` 是否取自 §3.1 的 10 个合法值?
- [ ] 若用了子 agent 提取:最终写入是不是由我主 agent 完成、且落在 `wiki/pages/`?
- [ ] 是否更新了 `index.md` / `log.md` 并准备 commit?
