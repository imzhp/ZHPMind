# result-policy-monitor

执行日期：2026-06-10

## Stage 0 短报告

### 1. Hermes 内建能力

- `blogwatcher`：Hermes 已启用 builtin `blogwatcher`，但它只是封装 `blogwatcher-cli`；当前机器没有验证到 `blogwatcher-cli` 可用。它的能力偏 RSS/Atom 拉取、自动发现、HTML selector scraping、SQLite 已读状态。可借鉴抓取思路，但不适合作为 policy-monitor 的唯一采集层，因为本 skill 需要硬规则过滤、去重、失败健康状态和固定 JSON 输出。
- `feeds`：磁盘上只有 `/Users/zhanghaopeng/.hermes/skills/feeds/DESCRIPTION.md`，没有 `SKILL.md`，也没有出现在 `hermes skills list` 的 enabled 列表；不能作为可执行能力复用。
- 结论：采集脚本仍应自建；`policy-scan.py` 是首版唯一确定性数据源。

### 2. RSSHub 自托管评估

- 本机当前 shell 无 `docker`、`podman`、`colima`、`orb`，/Applications 也未查到 Docker / OrbStack / Podman / Colima。RSSHub Docker @ mini 当前不可开箱运行。
- `docs.rsshub.app` 与 `rsshub.app` 公共实例当前从本机返回 Cloudflare 403，不能用公共实例完成路线实测。
- GitHub API 查询 RSSHub routes 命中匿名 rate limit；raw 猜测路径未能确认 gov.cn / 雨果网 / gs.amazon.cn 关键 routes。
- 结论：一期按“官方 RSS 优先 + 自有 page-diff fallback”设计；RSSHub 作为以后可插拔源适配器，不进入首版验收路径。gov.cn、雨果网、gs.amazon.cn 首版按 page-diff 源处理。

### 3. 官方 RSS 实测

- GOV.UK Atom 可用：`https://www.gov.uk/search/news-and-communications.atom?organisations%5B%5D=department-for-business-and-trade&order=updated-newest` 返回 200，content-type `application/atom+xml`。
- GOV.UK all Atom 可用：`https://www.gov.uk/search/all.atom?organisations%5B%5D=department-for-business-and-trade&order=updated-newest` 返回 200，content-type `application/atom+xml`。
- Consilium 候选 `https://www.consilium.europa.eu/en/press/press-releases/rss.xml` 当前返回 Cloudflare 403 challenge；从本机不可作为稳定 feed 直接接入。
- EUR-Lex 当前页面/API 多次返回 CloudFront/WAF 202 challenge 或 DNS transient；未能实测到可直接消费 RSS。

### 4. 判断点建议

- RSSHub 容器归属：先不引入。若以后引入，建议归 Hermes 侧，而不是 mac-sync；原因是它服务的是 Hermes policy-scan 的源适配器，端口、健康检查、失败告警都应与 skill/cron 同域。
- 端口/重启策略：若以后启用，用固定 localhost 端口 `1200`，launchd/容器自启动由 Hermes 维护，并在 policy-scan JSON 的 source health 中暴露 RSSHub 不可用状态。
- 是否继续：已继续阶段 1，但将 RSSHub 相关源降级为 page-diff fallback，不等待 Docker/RSSHub。

## 已落地

- 新增 scanner 草稿并部署到 `~/.hermes/scripts/policy-scan.py`
- 新增外置源配置 `~/.hermes/scripts/policy-monitor-sources.yaml`
- 新增 Hermes skill `~/.hermes/skills/policy-monitor.md`
- 新增 vault 反思页 `wiki/pages/skill-policy-monitor.md`，状态为 `draft`
- 更新 `wiki/pages/index.md` 与 `wiki/log.md`，避免新 skill 页成为孤岛
- dogfood 边界：首版只写 `claude-drafts/result-policy-{date}.md`，不写 inbox，不设 cron

## 验证

- `python3 ~/.hermes/scripts/policy-scan.py --check-config`：通过。13 个源，A-F 组齐全，2 个 RSS，11 个 page-diff。
- `PYTHONPYCACHEPREFIX=/private/tmp/pycache python3 -m py_compile ~/.hermes/scripts/policy-scan.py`：通过。直接 `py_compile` 会因沙盒不能写 `~/.hermes/scripts/__pycache__` 失败，已改用 `/private/tmp` pycache 验证。
- `python3 ~/.hermes/scripts/policy-scan.py`：通过并写出 `~/.hermes/scratch/policy-scan-latest.json`。摘要：13 源、11 OK、2 failed、首跑 baseline 候选 0。
- 失败源：`eu-consilium-press` 403；`cn-customs-news` 403。均已进入 JSON source health，不中断整轮。
- `hermes skills list`：当前列表未显示 `review-digest` / `vault-tidy` / `policy-monitor` 这类 ZHPMind 单文件本地 skill；执行体文件已落位，但 skill list 不是可靠验收点，需后续用 chat 实际触发或 gateway reload 观察。
- dogfood 日志：已写 `claude-drafts/result-policy-2026-06-10.md`；未写 inbox，符合 7 天草稿期约束。

## vault-tidy 顺手毕业项

- `vault-tidy` spec 升 v1.1：把 dogfood 中的 MOC 语义覆盖判定写入执行体和反思页
- `wiki/pages/skill-vault-tidy.md` 已核实 `status: active`，无需从 draft 改 active
