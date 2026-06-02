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

8. **书 / 文档源材料统一归 `wiki/raw/assets/books/`,命名 `书名-作者.{epub,pdf,docx}`;页面 `sources:` 写 raw 相对路径 `assets/books/书名-作者.ext`。** 蒸馏时从 inbox 或别处读取的源材料,读完**必须落到 `wiki/raw/assets/books/`**——绝不留在 `wiki/raw/` 顶层或任何其他位置。`wiki/raw/` 顶层只放文章 / 讨论类 raw(`.md`);书 / 课程的二进制源(epub / pdf / docx)一律进 `assets/books/`。作者从你的知识判定、直接写进文件名(如 `死亡否认-厄内斯特·贝克尔.epub`),不必反问 Haopeng。理由:源归位 + `sources:` 路径稳定 = 溯源不断;历史上反复把 epub 丢在 `raw/` 顶层、`sources:` 写裸文件名,造成归档散乱、移动即断链(2026-06-02 一次性归位 6 本后立此规)。

## 写入前自检(每次写 `wiki/pages/` 前过一遍)

- [ ] 我已经读过 `wiki/CLAUDE.md` 了吗?
- [ ] 产物是否落在 `wiki/pages/` 平铺区,而不是任何子目录 / 顶层新目录?
- [ ] 文件名是否小写连字符英文 slug?tag 是否纯英文?
- [ ] `type` 是否取自 §3.1 的 10 个合法值?
- [ ] 若用了子 agent 提取:最终写入是不是由我主 agent 完成、且落在 `wiki/pages/`?
- [ ] 若涉及书 / 文档源:源是否已归 `wiki/raw/assets/books/`(命名 `书名-作者`)、`sources:` 写的是否为 `assets/books/...` 相对路径?
- [ ] 是否更新了 `index.md` / `log.md` 并准备 commit?

---

## Git 操作纪律(commit 卫生)

ZHPMind 的 git 只为「可回滚 + GitHub 备份」服务(design-principles 第一层「开放格式」),不是日常跨设备同步通道——同步走 Obsidian Sync。基于此,以下纪律覆盖你的默认 git 习惯:

1. **只在 Mac mini 提交。** 所有 `git commit` / `git push` 一律在 Mac mini 上执行;MacBook Air 等其他设备只读、只靠 Obsidian Sync 同步,绝不在其上提交。理由:单一提交点,避免多设备并行提交制造分叉与同步冲突副本(`xxx 1.md` 一类)。
2. **提交前先 fetch/merge。** 每次提交前先 `git fetch origin && git merge origin/main`(或 `git pull --no-rebase`),把远端变更并进来再提交。理由:即便只在 mini 提交,GitHub 端仍可能存在手动改动;先合后提,避免 non-fast-forward 被拒后病急乱投医。
3. **不拿 `git reset --hard origin/main` 当创可贴。** 工作树乱了 / 提交错了,先用 `git status`、`git diff`、`git stash`、`git restore <file>` 定点处理。`reset --hard` 到远端等于「丢弃本地全部未推送改动」的核武器,只在确认本地确无任何要保留内容时才用。理由:历史上曾用 reset-to-origin 抹平表面问题,连带丢失过未提交的蒸馏产物。
4. **二进制源(epub / pdf / docx)不入 git。** 电子书 / 课程 / PDF 等二进制源材料一律由 `.gitignore` 排除(`*.epub` / `*.pdf` / `*.docx`,2026-06-01 用 filter-repo 瘦身后立规),仅靠「本地留盘 + Obsidian Sync」保存,不进 git 历史。理由:二进制不可 diff、体积大、撑爆仓库且无版本控制价值——git 只管可读可 diff 的 markdown。日后新增其他二进制格式(如 .mobi / .azw3)时,同步往 `.gitignore` 补对应 glob。
