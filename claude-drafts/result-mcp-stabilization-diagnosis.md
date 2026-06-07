---
type: result
from: codex
to: chat-claude
task: mcp-stabilization-diagnosis
created: 2026-06-05
updated: 2026-06-05
mode: read-only-diagnosis
---

# Result — Filesystem MCP hang 只读诊断

## 总裁决

本轮只执行诊断命令并写本 result 回执；未修改配置，未改 vault 正式内容，未执行 git 命令。

结论：

- **假说 A（Obsidian / iCloud dataless 占位符触发等待）：当前证据不成立。**
- **假说 B（Claude Filesystem 使用 reference Node server，hung call 会放大为后续调用排队）：部分成立 / 关键触发仍证据不足。**

更准确地说：已确认 Claude Desktop 的 Filesystem 是 Claude Extension 形态，底层使用 `@modelcontextprotocol/server-filesystem`；但本轮无法直接观察运行中的 MCP 子进程，也没有捕获 hang 当刻的调用栈 / 日志，所以“单次 hung call 阻塞所有后续”仍是合理高优先级假说，不是已闭环事实。

## 诊断范围

执行了 handoff 中第 1–9 项只读诊断，并补充两个只读定位命令：

- `ps` 兜底查看进程
- 在 `~/Library/Application Support/Claude` 中搜索 MCP / filesystem 配置痕迹

补充命令只读，不写文件、不改配置。

## 假说 A：dataless / 占位符

### 证据

`wiki/raw/assets/books/` 中大文件均可正常 `ls -la@`。

未发现 `.icloud` 占位符：

```text
find "$VAULT" -name "*.icloud"
# 无输出
```

PDF 逻辑大小与实际块数匹配，没有明显“逻辑很大、实际占用极小”的占位符特征：

```text
Affiliate Marketing 完全指南.pdf
  逻辑大小: 11699958 bytes  实际块: 22856 blocks
The Almanack of Naval Ravikant.pdf
  逻辑大小: 2151662 bytes  实际块: 4208 blocks
亚马逊高阶运营培训手册.pdf
  逻辑大小: 26307438 bytes  实际块: 51384 blocks
```

PDF / EPUB 的 `st_flags` 均为 `-`，未见 `dataless`：

```text
Affiliate Marketing 完全指南.pdf: flags=[-]
The Almanack of Naval Ravikant.pdf: flags=[-]
亚马逊高阶运营培训手册.pdf: flags=[-]
何以为父-迈克尔·戴蒙德.epub: flags=[-]
养育男孩-史蒂夫·比达尔夫.epub: flags=[-]
决策与判断-斯科特·普劳斯.epub: flags=[-]
如何让孩子自觉又主动-丹尼尔·西格尔.epub: flags=[-]
学会提问-尼尔·布朗.epub: flags=[-]
死亡否认-厄内斯特·贝克尔.epub: flags=[-]
第一性原理-李善友.epub: flags=[-]
经营者的财务金三角-闻静.epub: flags=[-]
金字塔原理-芭芭拉·明托.epub: flags=[-]
```

### 判读

**A 当前不成立。**

至少在 mini 上当前 `wiki/raw/assets/books/` 这些 PDF / EPUB 不是 dataless 占位符，也没有 `.icloud` 文件。若 Filesystem MCP hang 是由“按需下载占位符”触发，触发点不在这批 books 文件。

仍需 Haopeng GUI 确认的项：

- Obsidian Sync 是否对其他目录启用了选择性同步 / 按需下载。

但就本轮命令证据，A 不是主因。

## 假说 B：reference Node server / hung call 放大器

### 已确认事实

`~/Library/Application Support/Claude/claude_desktop_config.json` 存在，但内容只有 Claude Desktop preferences，没有 `mcpServers` 或 filesystem server 配置段。

Claude Desktop 的 Filesystem 实际以 Extension 形态安装：

```text
~/Library/Application Support/Claude/Claude Extensions/ant.dir.ant.anthropic.filesystem/
```

Extension manifest / package 摘要：

```text
manifest name: Filesystem
manifest version: 0.2.2
server: {"type":"node","entry_point":"dist/index.js","mcp_config":{"command":"node","args":["${__dirname}/dist/index.js","${user_config.allowed_directories}"]}}
user_config.allowed_directories: multiple directory picker, required
long_description mentions @modelcontextprotocol/server-filesystem: true

package name: @modelcontextprotocol/server-filesystem
package version: 2026.1.14
mcpName: io.github.modelcontextprotocol/server-filesystem
```

因此，“使用官方 reference filesystem server / Node 实现”这部分成立；但它不是全局 npm 包，也不是 `npx` 每次拉取。

### 进程观测限制

handoff 的 `pgrep` 在当前 Codex 受管环境不可用：

```text
pgrep: Cannot get process list
```

`ps` 兜底也被系统拒绝：

```text
operation not permitted: ps
```

所以本轮无法直接观察运行中的 filesystem MCP 子进程状态。

### allowed dirs 可达性

handoff 中列出的常见 allowed dirs 均可达：

```text
✅ /Users/zhanghaopeng/Documents 可达
✅ /Users/zhanghaopeng/Obsidian 可达
✅ /Users/zhanghaopeng/Downloads 可达
✅ /Users/zhanghaopeng/Desktop 可达
✅ /Users/zhanghaopeng/.hermes 可达
✅ /Users/zhanghaopeng/.mac-sync 可达
```

未发现这些路径中存在“当前不可达”的 crash 诱因。

### 配置痕迹

在 Claude Application Support 中搜索 MCP / filesystem，定位到：

- Extension manifest / package / dist files
- sentry breadcrumb 中有 `dxt/extensions/ant.dir.ant.anthropic.filesystem/versions`

`~/.claude.json` 中没有该 filesystem extension 的 allowed directories 直接配置；只看到历史项目路径与 GitHub repo paths，其中包括：

```text
/Users/zhanghaopeng/Library/Mobile Documents/iCloud~md~obsidian/Documents/ZHPMind
/Users/zhanghaopeng/.mac-sync
```

这看起来更像历史 Claude Code / repo path 记录，不足以证明是 Filesystem Extension 当前 allowed directories。

### 判读

**B 部分成立。**

成立部分：

- Claude Filesystem 是 Node Extension。
- 底层确认为 `@modelcontextprotocol/server-filesystem@2026.1.14`。
- server 启动方式是 `node dist/index.js ${user_config.allowed_directories}`。

不成立 / 未证实部分：

- handoff 中的常见 allowed dirs 当前都可达，没有发现不可达路径作为直接 crash 诱因。
- 本轮无法观察进程，无法证明当下有 hung 子进程。
- 没有 hang 当刻日志，无法直接证明“一个 hung call 阻塞所有后续调用”。

## 额外观察

Node 版本：

```text
node --version
v22.22.3
```

Claude Electron / Extension 日志里显示 Claude 自身运行时还有 Node `24.15.0`，但 Extension package 由 Claude Desktop 管理；本轮不做版本修改。

全局 npm：

```text
npm list -g | grep -i filesystem
# 非全局安装
```

因此不建议沿“全局 npm 包版本漂移 / npx 每次拉取”方向继续排查。

## 结论矩阵

| 假说 | 判断 | 证据 |
|---|---|---|
| A: books / raw assets 是 dataless 占位符，扫描触发下载等待 | 不成立 | 无 `.icloud`; 实际块数正常; flags 无 `dataless` |
| B1: 实际使用官方 reference filesystem Node server | 成立 | Claude Extension manifest + package.json 确认 |
| B2: allowed directories 中存在不可达路径导致 crash | 暂不成立 | handoff 列出的 6 个目录均可达 |
| B3: 一次 hung call 阻塞后续所有 Filesystem 调用 | 证据不足但仍合理 | 现象符合；但本轮无法看进程 / 无 hang 当刻日志 |
| 全局 npm / npx 版本不固定 | 不成立 | Extension 内置 package `2026.1.14`; 非全局安装 |

## 建议给下一轮修复讨论的方向

本轮不执行修复，仅给判断依据：

1. **优先把 Filesystem Extension 的 allowed directories 收窄到实际需要的目录。**
   - 当前已确认 server 启动参数吃 `user_config.allowed_directories`。
   - 即使所有路径可达，scope 太宽仍会放大扫描面与潜在阻塞面。
   - 这需要 Haopeng 在 Claude Desktop / Extensions UI 中手动改。

2. **如果再次 hang，抓取 Claude Desktop 日志和 Extension 运行期日志。**
   - 本轮 sentry 搜索只能证明 Extension 存在，不能证明 hang 根因。
   - 需要 hang 当刻或刚重启后的日志片段，尤其是 filesystem extension stderr/stdout。

3. **不建议继续围绕 books dataless / git 大文件清理排查。**
   - 当前证据不支持。
   - handoff 已明确大文件进 git 与连接器过多两条已排除。

4. **若仍频繁复现，考虑替换 Filesystem 实现或给 Filesystem Extension 加 watchdog / stuck-detection。**
   - 这是修复方案讨论范围，不在本次只读诊断执行范围内。

## 本轮边界确认

- 未修改 Claude Desktop 配置。
- 未修改 Filesystem Extension。
- 未修改 vault 正式文件。
- 未运行 git 命令。
- 唯一写入：本 result 回执 `claude-drafts/result-mcp-stabilization-diagnosis.md`。

## 处置决定（2026-06-05）

诊断后不深挖根因（坐实 B3 需进程状态+hang 当刻日志，沙盒拿不到，成本高且修复方向不变），改为低成本缓解+观察。

已执行（Haopeng 手动）：Filesystem Extension 的 allowed directories 从 6 个收窄到 3 个。

- 收窄前：Documents / Obsidian / Downloads / Desktop / .hermes / .mac-sync
- 收窄后：Obsidian / .hermes / .mac-sync（去掉几乎用不到的 Documents/Downloads/Desktop）
- 已重启 Claude Desktop 生效

观察期判据：频率明显降→scope 过宽是放大器，收工；照样犯→Extension 自身 stuck 缺陷，换实现或等官方加 watchdog。
