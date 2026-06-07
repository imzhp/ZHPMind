# Handoff → Codex:提交「思考快与慢」蒸馏批次(修正版)

> **目标执行者:Codex(Mac mini,native shell/git)**
> **vault:`~/Obsidian/ZHPMind`**
> **日期:2026-06-07**

---

## 当前真实状态(已诊断,作为基线)

- `HEAD` = `origin/main` = `3faeb90`,`0 ahead / 0 behind`(与远端同步)
- 无 unrelated histories;`.git` 仅 4.5M;无被追踪的 `pdf/epub/docx` —— filter-repo 清理完好
- ⚠️ Claudian 此前报告的 "unrelated histories"、"PDF 仍被追踪" 是过期/误判,当前不存在
- ✅ **工作树是脏的(有一批待提交的蒸馏成果)—— 这是预期状态,就是要提交的对象,不是停止条件**

## 绝对不要做

- ❌ `git merge --allow-unrelated-histories`(会焊回旧历史、重引大二进制)
- ❌ `git rm --cached` 清 PDF(没有被追踪的)
- ❌ filter-repo / 历史重写 / force-push
- ❌ **`git push`** —— 留给 Haopeng

## 待提交内容

**核心蒸馏(进 commit 1):**
- 新建 7 页:`anchoring-effect` `availability-heuristic` `daniel-kahneman` `dual-process-theory` `peak-end-rule` `planning-fallacy` `thinking-fast-and-slow`
- 传播/导航更新:`critical-thinking-moc` `judgment-and-decision-making` `obstacles-to-critical-thinking` `people-moc` `prospect-theory` `index` `wiki/log.md`

**杂项(进 commit 2):**
- 多Agent 笔记 inbox→raw 归位、删旧 inbox 日记、`reflection-2026-06-04-fatherhood.md`(保留)、`cross-eval-ch-04-*.md`、MCP 诊断 handoff/result、`.obsidian/community-plugins.json`

**需判断(不要盲提交):**
- `inbox/1随记.md`(疑似误建)
- `wiki/pages/zhanghaopeng.md`(被改,但 Kahneman 蒸馏按理不该碰)

---

## 执行步骤

### 0. 进入 + 复核基线
```
cd ~/Obsidian/ZHPMind
git status
git rev-list --left-right --count HEAD...origin/main
```
预期:`HEAD` 仍是 `3faeb90`、计数为 `0  0`。工作树脏是正常的。

### 1. Provenance 红线检查(硬门槛)
```
for f in anchoring-effect availability-heuristic daniel-kahneman dual-process-theory peak-end-rule planning-fallacy thinking-fast-and-slow; do
  echo "[$f]"; head -15 "wiki/pages/$f.md" | grep -iE 'source|created|model|distill|溯源' || echo "  缺 provenance"
done
```
任一新页缺溯源字段 → 停,不提交,写报告。

### 2. 判断两个可疑项
```
cat "inbox/1随记.md"
git diff wiki/pages/zhanghaopeng.md
```
- `1随记.md`:空/测试/误建 → `rm "inbox/1随记.md"`;有真实内容 → 留 untracked、报告说明
- `zhanghaopeng.md`:若是身份时间线校准的合理延续 → 留在 commit 1;若不相关/意外 → `git restore --staged wiki/pages/zhanghaopeng.md` 排除并报告

### 3. commit 1 —— 蒸馏 + 传播
```
git add wiki/pages/ wiki/log.md
git commit -m "distill: 思考快与慢(卡尼曼)— 7 概念页 + 传播更新"
```

### 4. commit 2 —— 杂项归位与整理
```
git add -A
git commit -m "chore: 多Agent 笔记归位 raw、inbox 整理、书镜反思锚点、MCP 诊断 handoff"
```

### 5. 收尾(不 push)
```
git log --oneline -5
git status
```

---

## 停止条件(任一触发 → 停下写报告)

- 任一新页缺 provenance 字段
- `1随记.md` / `zhanghaopeng.md` 判断不明朗
- **基线被改动**:`HEAD` 不再是 `3faeb90`,或本地已领先/落后 `origin/main`(注意:工作树脏 **不是** 停止条件,那是预期)
- 任何 commit 报错或出现意料外的 staged 内容

## 报告

写入 `claude-drafts/result-kahneman-distill-commit.md`:两个 commit 的 hash + 文件清单、两个可疑项怎么处理的、provenance 检查结果、最终 `git status` 与 `git log` 顶部、是否就绪等 push。
