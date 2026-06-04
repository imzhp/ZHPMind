---
type: result
from: codex
to: chat-claude
task: identity-date-and-book-mirror-source-ref
created: 2026-06-04
---

# Result — 身份时间线传播 + Book Mirror source-ref

## 总裁决

已完成：

1. 校准 `wiki/pages/zhanghaopeng.md` 杭州 / 深圳时间线。
2. 将曜野成立日期 `2022-11-16` 写入业务事实单一来源 `wiki/pages/wildlume-business-reference.md`。
3. 修正活跃 Book Mirror ch-04 staging 草稿中的旧日期及失效推导。
4. 将镜射 cross-eval 的 vault 锚点 `--source-ref` 规则写入 Claudian skill、handoff 与 skillify Pitfall。

## 身份时间线

`wiki/pages/zhanghaopeng.md` 已改：

- 职业主线明确：
  - 2021-08 与妻子从北京搬到杭州。
  - 做抖音短视频约一年，至 2022-08。
  - 2022-10 与陈伟军、柴继云、吕海峰筹划曜野。
  - 2022-11 正式成立，营业执照注册日为 `2022-11-16`。
  - 2023-03 与妻子彻底从杭州搬到深圳。
- Timeline token：`2021-2023` → `2021-08~2022-08`。
- Timeline 新增：`2023-03 | 与妻子彻底从杭州搬到深圳`。
- 已有 `2022-11-16` 成立行保留，未改写。

## 成立日期传播

正式知识层 grep 结果：

- `wiki/pages/zhanghaopeng.md`：`2022-11-16`
- `wiki/pages/wildlume-business-reference.md`：新增 `成立日期：2022-11-16（营业执照注册）。`
- 其他 `wiki/pages/` / `projects/` 业务页未发现“曜野成立于 2023 / 2023 底”的旧值。

活跃 staging：

- `claude-drafts/book-mirror/my-father-before-me/draft/ch-04.md` 已从“曜野成立于 2023 年底、孕期与初创期几乎完全重叠”修为“曜野于 2022-11-16 成立，孕期发生在成立后的第二年，两条身份变化并行推进”。
- 该 staging 文件受 `.gitignore` 的 `claude-drafts/*` 规则保护，不进入 git commit。

有意不改：

- `wiki/raw/zhpmind-discussion-2026-05-12.md`：原始口述证据，保持原样。
- `inbox/cross-eval-ch-04-*.md`：历史评审报告，保持当时输出原样。

## Book Mirror source-ref

已同步：

- `.claude/skills/book-mirror/SKILL.md`
- `claude-drafts/handoff-book-mirror.md`
- `wiki/pages/skill-book-mirror.md`

新硬约束：

```bash
python3 ~/.hermes/scripts/cross-eval-run.py \
  --draft-path claude-drafts/book-mirror/{book-slug}/draft/ch-{NN}.md \
  --source-ref claude-drafts/book-mirror/{book-slug}/source/ch-{NN}.md \
  --source-ref wiki/pages/zhanghaopeng.md \
  --source-ref wiki/pages/{draft-引用的-page}.md \
  --source-ref {draft-引用的其他-vault-文件} \
  --content-type mirror \
  --chapter-id ch-{NN}
```

规则：

- `wiki/pages/zhanghaopeng.md` 每章必带。
- draft 每条 `[来源:]` 文件都必须作为 `--source-ref`。
- `[[page-name]]` 解析为 `wiki/pages/page-name.md`。
- 任一锚点文件缺失则阻断评审。
- 锚点文件不得放进 `--discarded`；该参数只用于被放弃的中间候选。

## 验证

- 正式知识层已无曜野“2023 / 2023 底成立”旧值。
- `git diff --check` 通过。
- 尝试按新规则用 ch-04 + `wiki/pages/zhanghaopeng.md` 跑 `/private/tmp` cross-eval；执行环境因该动作会把私有 draft / 身份页发送到 Anthropic、OpenAI、DeepSeek 外部 API 而拒绝执行。未绕过；实际重跑需要 Haopeng 对这类私有 source-ref 外发再显式授权。
- 提交范围将限定为身份锚点、业务事实页、Book Mirror skill / handoff / skillify、index / log 与结果文件；不包含既有 inbox/raw/Obsidian 脏改动。
