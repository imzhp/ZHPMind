# ZHPMind 单书阅读记录同步

这是本地扩展，不是腾讯官方功能。官方 API 文档基于 Tencent/WeChatReading 的 Apache-2.0 版本，commit `315698a8da1810fab0bbf24a52b38a6960e54cdc`，skill version `1.0.4`。

用户明确要求同步某本书时使用。不扫描全书架，不设定时任务，不回写微信读书，不蒸馏、不生成感想。正式 wiki 摘要不是个人阅读记录，不覆盖它。

## 调用

先按 `search.md` 搜索并确认书名、作者和 bookId；随后按 `book.md`、`notes.md` 核对接口。本次已确认《纳瓦尔宝典》（埃里克·乔根森，赵灿译）为 `44026191`。

在 vault 根目录运行：

```sh
node .codex/skills/weread-skills/scripts/zhpmind-sync.mjs --book-id 44026191 --note inbox/纳瓦尔宝典-阅读记录.md
```

凭据优先取进程内的 `WEREAD_API_KEY`，否则读取本机 Keychain：service `zhpmind-weread`、account 为当前系统用户名。不输出凭据，不放入命令参数、笔记或 Git。未配置时请用户在本机设置，不在聊天中索要密钥。

## 保存与边界

- 按章节显示实际划线和个人感想；只有同章节、同 range 且唯一匹配时才把感想接在划线后。单章至少五条无感想划线时折叠展示。没有感想就不补写。
- 笔记中 `weread-sync:start/end` 注释之间是同步区；上方和下方可以自由记录后来想法。同步区内被手动修改时停止，先核对差异，不以删除状态文件绕过保护。
- 以来源 ID 合并新增和修改；来源未返回的旧记录保留并标注，不自动删除。完全无变化时不重写文件。
- 只允许 `inbox/` 中的独立笔记。目标已存在但无状态、原笔记被移动或缺失、分页不完整、接口失败或要求升级时停止，不覆盖已有内容。
- `.codex/weread-sync/<bookId>.json` 是本机私有同步状态，含记录与校验值，无密钥，不入 Git。它与笔记需配套；当前由 mini 单点运行，不能声称已支持 Air 接续。跨机或恢复后缺少状态要先核对，不自动接管。
- 同一本书有锁时停止；确认没有运行中的同步进程后才处理遗留锁。笔记写入后状态写入前中断，会在下次提示冲突，不自动修复。
- 返回 `created` / `updated` / `unchanged` / `empty` 和计数；只有实际成功才报告完成。书签内容不在接口导出范围。

测试命令（合成数据、临时目录，无账户调用）：

```sh
node --test .codex/skills/weread-skills/scripts/zhpmind-sync.test.mjs
```
