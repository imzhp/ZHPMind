# 交接：MCP 稳定化 + 待办全景（2026-06-01）

> 给新对话冷启动用。把这份完整粘进新会话，不必从头复述。本文件放在 `claude-drafts/`，跨机同步（mini / Air 都能开）。

---

## 立即目标（新对话第一件事）

彻底稳定 Claude Desktop 的 MCP：**只留 Filesystem + Web Search 两个稳定核心常驻**；Chrome 浏览器 MCP、Figma、Google Drive 等重而少用的先全关，需要时再开。

### 可直接粘给新对话的两段

**① 目标与诊断**
> 帮我彻底稳定 Claude Desktop 的 MCP：我只要 Filesystem + Web Search 这两个稳定核心常驻；Chrome 浏览器 MCP、Figma、Google Drive 这些重而少用的先全关掉（要用再开）。现象是：每轮工具阵容飘忽（web_search / Filesystem 时有时无），浏览器 MCP 一调用就 4 分钟超时。我有两台常用 Mac（mini + Air），要无缝切换。先诊断、再给我一次性可粘贴的修复步骤。

**② 任务上下文**
> 背景在 ZHPMind 项目里。按顺序解决：① MCP 稳定 ② 双机无缝 ③ 从头审查 ZHPMind 的架构融合。first-principles 页已修好并加了第一版 callout 镜射；Book Mirror 结构（callout 手写 vs 按章双栏生成）待我定。

---

## 第 2 条（MCP）根因诊断

- 不是"某个服务崩了"，是**连接器阵容每轮飘忽** + **重型 MCP（尤其 Chrome 浏览器）一调用就 4 分钟挂死**，拖垮整轮。
- **修复方向**：减连接器到稳定核心（Filesystem + Web Search），关掉重的。连接器越少，工具阵容越稳越快。
- **关键约束**：Claude Desktop 的 MCP 配置在 `~/Library/Application Support/Claude/`，**不在 Claude 的允许目录内（够不着）**。所以诊断只能：(a) 用户贴连接器设置截图，或 (b) Claude 指着用户在 Desktop 设置里逐项关停。**这是一次性配置，不是日常活。**

---

## 待办顺序（已和用户确认）

1. **MCP 稳定**（本次新对话）
2. **双机无缝**：旧点目录不跨机同步 → 已收敛到 `claude-drafts/` 作跨机通道；git 提交统一在 mini，由 Claude 记着提示、不让用户操心"在哪台"。
3. **从头审查 ZHPMind 架构融合**：诚实标出 Karpathy / Garry Tan / neat-freak / Hermes 里"该对齐却改差""我们原创更优""人家有我们没做"的三类。已起草过一版（见对话）。核心发现：**系统造了精密机器，但认知循环只转了 capture+distill 两步**；互评（三硬约束之一）从没建；Push 侧（Hermes 那批 skill）基本没运行；review-digest 从没真跑。

---

## 当前状态（事实）

- **vault**：`/Users/zhanghaopeng/Obsidian/ZHPMind`（Obsidian Sync Plus；git 仅在 mini 提交、作本地回滚+GitHub 备份；不跨机 git pull）。
- **first-principles 页**：已修（aliases 去作者、加 `author` 字段、标签砍到 4、加 Mirror、第八章接 `[[critical-thinking-framework]]` 回链），并已写入**第一版 callout 逐点镜射**（6 条 + 整体镜射，钉在曜野/判断力/ZHPMind 上）。源文件名暂留 `第一性原理.epub`（未改名）。
- **Book Mirror 结构决策（待用户拍板，属宪法层）**：callout（手写好编辑、可追加 dated）vs 按章双栏（Garry 式，但他的是**机器生成**、右栏引用真实页面、非手敲）。双栏对比样本在 `claude-drafts/first-principles-mirror-two-column-sample.md`。已核实"双栏"是 Garry 本人原话（raw 里他原文），但他**没放实际截图**。**真正的岔路口**：book-mirror 将来手写还是 skillify 成生成管线。
- **昨晚悬案**：那次 `git add -A` 把 130MB 书 PDF + 一堆旧散件都暂存了；建议 `git reset` 撤掉、别提交（`.gitignore` 没排除 PDF/EPUB——是否让大文件进 git 是个待定决定）。first-principles 修复在盘上、走 Obsidian Sync，与提交无关。
- **散件待清**（不可逆删除，归用户执行）：`30.areas/finance/Financial Golden Triangle/`、`wiki/pages/concept/*Open Brain*`、`wiki/pages/method/The Yes Brain*`、`wiki/books/*学会提问*`、`wiki/pages/concepts/*` 等。
- **源书改名**（书名-作者）：脚本曾写到另一台的 `.tmp`（不同步，已丢失语境）；规则已定（`书名-作者`、多作者首作者+等、译作用中文名、进 `wiki/raw/assets/books/`、作者入 `author` 字段不入 aliases），仅 3 个已定稿源需立即改名（Almanack→Eric Jorgenson、Affiliate 完全指南→Affren、第一性原理→李善友），其余随各自蒸馏带上。

---

## 协作原则（Claude 自己照做，不必每次问用户）

- **我直接做完，不问**：查事实（作者/版本/术语）、执行已定规则、清明显格式错、补回链、只读诊断、文本类改动直写并留 git 痕迹。
- **必须停下问用户**：动宪法（design-principles / wiki/CLAUDE.md）、不可逆操作（永久删除 / git push / filter-repo）、花钱、对外发布、隐私边界、真正的方向性歧义。
- **默认值**：拿不准 → 用最合理做法做掉 + 标注假设 + 留可回滚开关，让用户事后否决；**不是**每步事前问。
- **写后必读回校验**（已成固定动作，防"写成功但在另一台"）。
- **核心病根（用户已点明）**：别把"审核"做成"逐步确认"，别把该 AI 消化的复杂度倒回给用户。
