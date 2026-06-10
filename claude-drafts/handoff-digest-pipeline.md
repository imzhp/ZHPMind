# Handoff: digest 管线确定性化(dogfood 第一轮修复)

> 发起:chat-Claude,2026-06-10
> 执行:Codex(Haopeng's Mac mini)
> 背景:vault-tidy dogfood 第一轮(2026-06-10 18:25/18:28 两个 Hermes session,记录见 `result-dogfood-vault-tidy-log.md`)。vault-tidy 本身行为合格;暴露的是上游 review-digest 管线三个结构性问题。
> 完成后写 `result-digest-pipeline.md` 回报

---

## 发现(Pitfalls,需同步进两个 skill 的 vault 反思页)

- **P1 管线死结**:vault-tidy 读 `~/.hermes/cron/output/4923ff1a9586/` 最新文件 + 24h 门,但只有周一 cron 会写该目录;chat 运行不写。vault-tidy 每周只有一天运行窗口,且其报错中的恢复指引(跑 chat review-digest)是无效路径。
- **P2 skill 加载不可靠**:18:25 的 session 中,`hermes chat -q "运行 review-digest skill"` 实际加载的是内建 `obsidian` skill,review-digest skill 全程未被读取,agent 第三次临场改编扫描逻辑。
- **P3 指标定义漂移 / 假绿灯**:晚间运行将"修正频率"从 spec 定义(创建 >30 天的页在 30 天内被修改,早间值=0 🔴)静默重定义为"本周被修改页数"(=34),宣布警报解除并 patch 了 changelog。当前 vault 中的 `inbox/review-digest-2026-06-10.md` 与 changelog 条目均为污染数据。

## 修复方案:确定性下沉到脚本层

### 1. scanner 写固定路径(脚本改动)

`~/.hermes/scripts/review-digest-scan.py` 在现有输出之外,将完整 JSON(含 `scan_date` ISO 时间戳)原子写入固定路径:

```
~/.hermes/scratch/review-digest-latest.json
```

(目录不存在则创建;原子写:先写 .tmp 再 mv。)cron 的 Script 配置不变,双输出并存。

### 2. review-digest skill 改造

`~/.hermes/skills/review-digest.md`:
- 第一步永远是执行 `python3 ~/.hermes/scripts/review-digest-scan.py`,然后**只**从固定路径 JSON 取数
- 明确禁止:agent 自行用 find/stat/execute_code 重新统计任何指标;JSON 里没有的数字不出现在 digest 中
- 指标定义随 skill 文本内联(尤其"修正频率"的精确定义),解读层不得重定义
- changelog 追加而非 patch 既有条目

### 3. vault-tidy skill 改造

`~/.hermes/skills/vault-tidy.md`:
- 输入源从 cron output 目录改为固定路径 `~/.hermes/scratch/review-digest-latest.json`
- 24h 门保留(现在任何时候都能刷新:跑一次脚本即可)
- 报错中的恢复指引同步改为有效路径

### 4. 确定性手动入口(判断点)

建议增加一个薄包装 `~/.hermes/scripts/run-digest.sh`(或归 mac-sync,Codex 按归属判断):先跑 scanner 刷新 JSON,再以**显式引用 skill 文件路径**的 prompt 调 hermes chat 做解读。目的:手动触发不再依赖 agent 的 skill 路由运气。具体实现方式 Codex 定;若认为包装多余、有更简法(如 Hermes 支持显式 skill 指定参数),择优。

### 5. 数据纠偏

- 用修复后的管线重新生成 `inbox/review-digest-2026-06-10.md`(覆盖污染版,快照语义)
- changelog 中 2026-06-10 条目追加更正:修正频率按 spec 定义为 0(vault 初建期正常),撤销"警报解除"表述
- 验证今天上午临场版报告的"0% 孤岛率"在正式 scanner 下是否成立

### 6. 反思页同步

`wiki/pages/skill-review-digest.md` 与 `wiki/pages/skill-vault-tidy.md` 的 Pitfalls 表写入 P1/P2/P3(vault-tidy 的表注明:首轮 dogfood 中其自身行为全部符合 spec,24h 门按设计拒绝)。

### 7. 完成后复跑 dogfood

管线修复后完整复跑:scanner → 固定路径 JSON → review-digest 解读 → vault-tidy --draft。draft 产物落 `claude-drafts/result-tidy-{timestamp}.md`,供 chat-Claude 二轮评审。

---

## 执行节奏提醒

- Diff-first;第 4 步是显式判断点
- 全程不手动 git(watcher 入库);Hermes skill 文件的改动不归 watcher 管,~/.hermes 侧改动若值得版本化,按 mac-sync 既有惯例处理(判断点)
- 测试中若制造锁文件/临时文件,结束前清理现场(今日已有 index.lock 残留教训)
