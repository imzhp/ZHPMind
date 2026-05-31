---
title: "wiki/raw 引用审计 + review-digest raw 未引用率扩展"
created: 2026-05-30
status: draft
scan_machine: "Mac mini（allowed: ~/Obsidian/ZHPMind, ~/.hermes, ~/.mac-sync）"
note: "主对话 + Filesystem MCP 只读审计。draft-first：未改动任何 wiki/pages，待审后再动。"
---

# wiki/raw 引用审计 — 2026-05-30

> 只读审计，未改动任何 vault 文件。对应 vault-tidy Tier 2「raw/ 未引用文件清单」。
> 判定口径：顶层文件逐个核对 wiki/pages 的 frontmatter `sources:` 与正文 `raw/...` 路径串 / `[[]]` 链接；子目录按集合处理。

## ⚠️ 设备一致性问题（先看这条）

本次扫描在 **Mac mini** 上执行。会话早先在另一台机器（权限根 `~/Obsidian`，无 `.hermes`，判断为 MacBook Air）扫到的 4 个孤儿里，**有 2 个现在 mini 上不存在**：

- `Matt Van Horn Every Claude Code Hack I Know March 2026.md` — mini 无
- `多 Agent 的本质不是分工，而是注意力治理.md` — mini 无

可能是 Obsidian Sync 还没把 Air 的这两个文件同步到 mini，也可能它们是 Air 本地的临时剪藏从未入同步。**这两个的内容判断要么等 sync 追上 mini、要么在 Air 上读。** 这本身也是个信号：长期没同步到的 raw 文件，多半是 Air 本地散落的未处理剪藏。

---

## 一、顶层文件清单

### 🟢 已被 wiki 引用（名副其实）

| 文件 | 被哪些页引用 |
|---|---|
| `Andrej Karpathy From Vibe Coding to Agentic Engineering.md` | andrej-karpathy / …-vibe-coding-to-agentic-engineering / agentic-engineering / vibe-coding / software-3-0 / verifiability（6） |
| `Boris Cherny Why Coding Is Solved...md` | boris-cherny / boris-cherny-coding-is-solved / agentic-engineering / vibe-coding / claude-code / product-overhang（6） |
| `Meta-Meta-Prompting...md` | garry-tan / garry-tan-meta-meta-prompting / fat-skills-thin-harness / skillification / personal-knowledge-base / agentic-engineering（6） |
| `karpathy-claude-md-original.md` | karpathy-claude-md |
| `assets/references/The-Founders-Playbook-05062026_v3.pdf` | ai-native-startup / the-founders-playbook / agentic-engineering / claude-code（4） |
| `assets/books/亚马逊高阶运营培训手册.pdf` | amazon-advanced-operations-handbook（据 index 摘要，未读正文逐字确认源串） |

### 🔴 孤儿 / 待处置

| 文件 | 状态 | 处置判断 |
|---|---|---|
| `karpathy-llm-wiki-vs-zhpmind.md`（mini 在，已读） | 全库零引用 | **不要丢——内部设计提案，需蒸馏/链接**（见 §二） |
| `Obsidian + Claude Code…第二大脑（全教程）.md`（mini 在，已读） | 全库零引用 | **可丢弃或降级 archive**（见 §二） |
| `Matt Van Horn Every Claude Code Hack…md`（mini 无） | 早先零引用，现读不到 | 待 sync / 在 Air 读后定 |
| `多 Agent 的本质不是分工…md`（mini 无） | 早先零引用，现读不到 | 待 sync / 在 Air 读后定 |

### 🟠 引用了但没链对

| 文件 | 情况 |
|---|---|
| `zhpmind-discussion-2026-05-12.md` | 在 zhanghaopeng.md 末尾以纯文本「讨论记录：zhpmind-discussion-2026-05-12」出现，非 `[[]]` 也未进 frontmatter sources，Obsidian 不产生 backlink。改成 `[[zhpmind-discussion-2026-05-12]]` 即转正。 |

---

## 二、已读两个孤儿的处置判断

### `karpathy-llm-wiki-vs-zhpmind.md` → 蒸馏 / 链接，**不丢**

内部分析稿（2026-05-12），不是外部剪藏。基于 Karpathy LLM Wiki Gist + Thariq「HTML is the new markdown」+ Karpathy follow-up，提出对 ZHPMind 的具体修订：

- **核心提案**：交互层从单层（Obsidian）升级为双层（Obsidian 编辑/导航 + HTML Artifacts 呈现/行动），artifacts 是从 markdown 动态生成的派生层
- **战术建议**：建 `wiki/pages/index.md` 全局目录、建 `changelog.md` 操作日志、content-lint skill、query→wiki 的 crystallize 回写

**关键**：其中一部分已经落地了——`wiki/pages/index.md` 现在确实存在且「由 Claudian 自动维护」。也就是说这份稿子是 ZHPMind 演化的**实际驱动来源之一**，却没有任何页面引用它做溯源。

→ 建议二选一：**(a)** 把仍然 live 的部分（双层交互层 / content-lint / crystallize）蒸馏成 wiki 页，本文件作 raw 溯源；**(b)** 若认为内容已被 design-principles 演化吸收，至少从 design-principles 讨论链 / personal-knowledge-base 链接它，让它从孤儿转为「index.md / changelog 决策的溯源」。无论哪种，留在 raw，但必须链上。

附带洞察：它和 `zhpmind-discussion-2026-05-12.md` 都是**内部分析稿**而非外部剪藏——这可能是 raw 里一个值得显式承认的子类（「内部讨论产物」），生命周期跟外部剪藏不同：外部剪藏不蒸馏就该回 inbox/丢；内部分析稿即使不单独成页，也该作为决策溯源被链接保留。

### `Obsidian + Claude Code…第二大脑（全教程）.md` → 可丢弃 / 降级 archive

外部剪藏，公众号/推文体的入门教程（含一堆 twitter 配图），普及 Karpathy LLM-Wiki 方法。内容是入门安利级，且**已被 ZHPMind 自身实现 + karpathy-claude-md + design-principles 完全超越**（上面那份 llm-wiki-vs-zhpmind 自己就写了「ZHPMind 更完整」）。里面的战术点（Web Clipper、raw/wiki/index.md/log.md 结构）也都已在 `raw/README.md` 和现有 vault 结构里。

→ 没有可蒸馏的剩余价值。建议**丢弃**；若想留个「ZHPMind 起点故事」的念想，移到 `archive/` 而非占着 raw（raw 是活跃蒸馏源，它进不了任何蒸馏）。

---

## 三、子目录（集合，不逐文件判孤儿）

| 集合 | 性质 | 引用状态 |
|---|---|---|
| `qwei-amazon-course-2023/` | 飞书妙记 v1 课程语料（≈45 个 .docx/.mm/.md/.pdf） | amazon-* 蒸馏源，进行中（Section 13 等仍 Phase 1），部分成员暂无引用属预期 |
| `qwei-amazon-course-2023-v2/` | 通义听悟 v2 课程语料（18 个 `*_原文.docx`） | 已确认被引用（amazon-profit-analysis 的 sources 指向 `qwei-amazon-course-2023-v2/13.利润管理和利润分析`） |
| `sheep-archive-public/` | 国民哥哥 baseline 归档（自带 README/index/manifest + 子目录） | diff baseline 语料库，集合级保留 |
| `assets/` | 附件（两 PDF 均被引用 + 图片类） | 按附件处理，不计入未引用率 |

进行中语料库不能按单文件判孤儿。scanner（§四）对子目录只做集合级统计。

---

## 四、review-digest 扩展：新增「raw 未引用率」

部署位置 `~/.hermes/scripts/review-digest-scan.py`（mini 上 `.hermes` 已在权限内，可做；按你的意思等 gateway 重启再 deploy，不急）。

### 4.1 scanner 增量

```python
def scan_raw_unreferenced(vault_root):
    """审计 wiki/raw：顶层文件逐个核对是否被 wiki/pages 引用；子目录按集合统计。
    引用判定覆盖本 vault 实际用法：frontmatter sources（带/不带扩展名）、
    正文 `raw/...` 路径串、子目录相对路径、[[stem]] / ![[...]] 链接。"""
    import os
    pages_dir = os.path.join(vault_root, "wiki", "pages")
    raw_dir = os.path.join(vault_root, "wiki", "raw")

    corpus = []
    for root, _dirs, files in os.walk(pages_dir):
        for fn in files:
            if fn.endswith(".md"):
                try:
                    with open(os.path.join(root, fn), "r", encoding="utf-8") as f:
                        corpus.append(f.read())
                except Exception:
                    pass
    corpus_text = "\n".join(corpus)

    def is_referenced(rel_path):
        base = os.path.basename(rel_path)
        stem = os.path.splitext(base)[0]
        rel_noext = os.path.splitext(rel_path)[0]
        candidates = {base, stem, rel_path, rel_noext, "raw/" + rel_path}
        return any(c and len(c) >= 4 and c in corpus_text for c in candidates)

    EXCLUDE_TOP = {"README.md", ".gitkeep", ".DS_Store"}
    EXCLUDE_DIRS = {"assets"}

    top_files, subdirs = [], []
    for entry in sorted(os.listdir(raw_dir)):
        p = os.path.join(raw_dir, entry)
        if os.path.isfile(p):
            if entry not in EXCLUDE_TOP and not entry.startswith("."):
                top_files.append(entry)
        elif os.path.isdir(p) and entry not in EXCLUDE_DIRS:
            subdirs.append(entry)

    top_unref = [f for f in top_files if not is_referenced(f)]

    collections = []
    for d in subdirs:
        members = []
        for root, _dirs, files in os.walk(os.path.join(raw_dir, d)):
            for fn in files:
                if fn.startswith(".") or fn == "README.md":
                    continue
                rel = os.path.relpath(os.path.join(root, fn), raw_dir)
                members.append(rel)
        unref = [m for m in members if not is_referenced(m)]
        collections.append({"name": d, "total": len(members),
                            "referenced": len(members) - len(unref),
                            "unreferenced": unref})

    total = len(top_files)
    rate = round(100 * len(top_unref) / total, 1) if total else 0.0
    return {"raw_top_level_total": total, "raw_unreferenced": top_unref,
            "raw_unreferenced_rate": rate, "collections": collections}
```

接线：主函数把返回并进输出 JSON 新键（如 `"raw_check"`）。

### 4.2 SKILL.md 输出增项

总览表加一行：`| raw 未引用率 | {emoji} | {N}%（{未引用数}/{顶层数}）|`
正文加「raw 未引用文件（顶层，每个标 蒸馏/降级 inbox/丢弃）」+「raw 子目录集合级表」。
阈值（可调，raw 应趋近 100% 被引用，比 wiki 孤岛率严）：`>0 → 🟡`，`>15% → 🔴`。

### 4.3 `skill-review-digest.md` 设计层增项（待审后再写 wiki/pages）

健康度指标表加一行：
`| raw 未引用率 | >0 🟡 / >15% 🔴 | 「raw 是不是淤积了未蒸馏素材？」（inbox↔raw 生命周期 + 健康度「有归档吗/噪声」）|`

Pitfalls 表加一条（本次实测沉淀）：
`| raw 引用多为 `raw/路径` 串 + frontmatter sources，少用 [[]] | 平台/业务语义校准 | scanner 不能只扫 [[wikilink]]；须同时匹配 basename(±ext)/子目录相对路径(±ext)/raw/ 前缀串，否则 6 个真被引用的 raw 文件全误判成孤儿 |`

---

## 五、已知局限 & 待办

scanner v1 局限：
1. 「引用」= 文件名在任意 wiki 页出现（链接或纯文本都算），故 🟠 那种「纯文本提及未链上」v1 不会 flag——区分功能性 backlink vs 纯文本留 v2。
2. 子目录 `unreferenced` 仅参考，不进头条 rate（进行中语料库属预期）。
3. stem 子串匹配理论有碰撞风险；本 vault 顶层名长且独特，实测无碰撞。
4. **设备一致性**：scanner 跑哪台机就以那台 vault 状态为准。三机 sync 未追平时结果会不同（如本次 mini 少 2 个文件）。

待办：
- [ ] sync 追平后 / 在 Air 上读 `Matt Van Horn…` 和 `多 Agent…` → 定处置
- [ ] `karpathy-llm-wiki-vs-zhpmind.md`：蒸馏成页 或 从 design-principles/personal-knowledge-base 链接（你拍方向）
- [ ] `Obsidian + Claude Code…全教程`：丢弃 或 移 archive（你定）
- [ ] `zhpmind-discussion-2026-05-12`：在 zhanghaopeng.md 把纯文本改成 `[[]]`
- [ ] §4.3 两处增项写进 `wiki/pages/skill-review-digest.md`（draft-first，审后再动）
- [ ] §4.1 scanner 部署到 `~/.hermes/scripts/`（gateway 重启后）
