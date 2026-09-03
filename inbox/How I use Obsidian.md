---
title: "我是如何使用 Obsidian 的"
source: "https://stephango.com/vault"
author:
  - "[[Steph Ango]]"
published:
created: 2026-08-30
description: "我的个人 Obsidian 仓库模板：一种自下而上的方法，用来记录笔记并整理我感兴趣的事物。"
tags:
  - "clippings"
---
我用 [Obsidian](https://stephango.com/obsidian) 来思考、记笔记、写文章，并发布这个网站。这是我自下而上地记录笔记、整理感兴趣事物的方法。它接纳混乱与懒惰，让结构自然涌现。

在 Obsidian 中，“仓库（vault）”就是一个文件夹。这一点很重要，因为它符合我的 [文件优先于应用](https://stephango.com/file-over-app) 理念。若想创造能够长期保存的数字成果，它们必须是你能掌控的文件，并采用易于检索和阅读的格式。Obsidian 给了你这种自由。

以下绝非教条，只是使用 Obsidian 的一种示例。挑选你喜欢的部分即可。

## 仓库模板

1. [下载我的仓库](https://github.com/kepano/kepano-obsidian/archive/refs/heads/main.zip)，或从 [GitHub 仓库](https://github.com/kepano/kepano-obsidian)克隆。
2. 将 `.zip` 文件解压到你选择的文件夹中。
3. 在 Obsidian 中将该文件夹作为仓库打开。

## 主题与相关工具

- 我的主题 [Minimal](https://stephango.com/minimal)，搭配 [Flexoki](https://stephango.com/flexoki) 配色方案。
- 使用 [Obsidian Web Clipper](https://stephango.com/obsidian-web-clipper) 保存网页文章和页面；针对我常剪藏的网站，可参考我的 [剪藏器模板](https://github.com/kepano/clipper-templates)。
- 使用 [Obsidian Sync](https://obsidian.md/sync) 在桌面电脑、手机和平板之间同步笔记。
- 使用 [Obsidian Bases](https://help.obsidian.md/bases) 按类别查看笔记。
- 使用 [Obsidian Maps](https://help.obsidian.md/bases/views/map) 为部分模板提供地图视图。

## 个人规则

我在个人仓库中遵循的规则：

- 避免将内容拆分到多个仓库中。
- 避免用文件夹组织内容。
- 避免使用非标准 Markdown。
- 类别和标签一律使用复数形式。
- 大量使用内部链接。
- 所有日期均采用 `YYYY-MM-DD` 格式。
- 评分使用 7 分制。
- 每周只保留[一份待办清单](https://stephango.com/todos)。

拥有[一致的风格](https://stephango.com/style)，能把未来数百个决定收敛为一个，并帮助我集中注意力。比如，我总是将标签写成复数，因此不必再纠结新标签该如何命名。请选择让你感到舒服的规则，并把它们写下来。建立自己的风格指南；之后也随时可以修改规则。

## 文件夹与组织方式

我只使用极少的文件夹。我避免用文件夹，是因为许多条目同时属于多个思考领域。我的系统面向速度与懒惰。我不想承担反复思考一条内容该放在哪里的额外成本。

我不使用嵌套子文件夹，也很少用文件浏览器导航。我主要通过快速切换器、反向链接，或笔记内的链接来导航。

我的笔记主要通过 `categories` 属性来组织。类别会借助 Obsidian 的 [Bases](https://help.obsidian.md/bases) 功能，展示相关笔记的概览。

**我的大多数笔记都放在仓库根目录**，而不是某个文件夹中。这里记录我的个人世界：日记条目、文章、[常青笔记](https://stephango.com/evergreen-notes)及其他个人笔记。笔记若在根目录，我就知道它要么出自我手，要么与我直接相关。

我使用两个参考文件夹：

- **References（参考资料）**：记录存在于我个人世界之外的事物，如书籍、电影、地点、人物、播客等。文件始终按标题命名，例如 `Book title.md` 或 `Movie title.md`。
- **Clippings（剪藏）**：保存他人写的内容，主要是随笔和文章。

另有三个管理文件夹，使其内容不出现在文件导航中：

- **Attachments（附件）**：存放图片、音频、视频、PDF 等。
- **Daily（每日）**：存放每日笔记，均命名为 `YYYY-MM-DD.md`。我不在每日笔记中写内容；它们仅用于被其他条目链接。
- **Templates（模板）**：存放模板。

为了便于理解，下载版仓库中还包含两个文件夹。在我的个人仓库中，这些笔记会放在根目录，而不是文件夹内。

- **Categories（类别）**：包含各类别笔记的顶层概览，例如 Books、Movies、Podcasts 等。
- **Notes（笔记）**：包含示例笔记。

## 链接

我在笔记中大量使用内部链接。我尽量总是在第一次提及某个事物时就建立链接。我的日记常是一股意识流，记录近期事件，并寻找事物之间的关联。链接往往是*未解析的*，也就是说对应笔记尚未创建。未解析链接很重要，因为它们是未来建立关联时的面包屑。

仓库**根目录**中的一条日记，可能像这样：

```
我和 [[Aisha]] 去 [[Vidiots]] 看了电影 [[Perfect Days]]，然后在 [[Little Ongpin]] 吃了菲律宾菜。我很喜欢《Perfect Days》中的这句话：[[Next time is next time, now is now]]。它让我想起那篇文章……
```

电影、电影院和餐厅分别链接到 **References** 文件夹中的条目。在这些参考笔记中，我记录属性、个人评分，以及对该事物的想法。我使用 [Web Clipper](https://stephango.com/obsidian-web-clipper) 从 IMDB 等数据库中协助填充属性。那句引文对我意义重大，因此它成了根目录中的一篇[常青笔记](https://stephango.com/evergreen-notes)。我提到的文章则放在 **Clippings** 文件夹，因为它不是我写的。

这种高密度链接的风格会随时间推移变得更有价值：我可以追溯想法如何涌现，以及这些想法所延展出的分支路径。

## 分形日记与随机重访

分形日记和随机化，是我驯服不断生长的知识库荒野的方式。

在一天中，我会用 Obsidian 的“唯一笔记（unique note）”快捷键，随时写下独立的想法。这个快捷键会自动创建一篇以 `YYYY-MM-DD HHmm` 为前缀的笔记；我可能会再添加一个描述该想法的标题。

每隔几天，我会回顾这些日记碎片，整理出关键想法。之后每月回顾这些回顾内容，每年再回顾月度回顾（使用[这个模板](https://stephango.com/40-questions)）。最终形成一张关于我生活的分形网络，我可以在不同细节层级中缩放查看。我能追溯每个想法来自何处，以及它们如何浮现并汇聚为更大的主题。

每隔几个月，我会专门安排一次“随机重访”。我用“随机笔记（random note）”快捷键，在仓库中快速随机穿行；也常以较浅深度使用局部关系图查看相关笔记。这有助于我重访旧想法、补全缺失链接，并从过去的思考中获得灵感。它也是进行维护的机会，比如根据个人风格指南中的新规则修正格式。

有人问我能否用语言模型自动化这件事，但我并不想这么做。我享受这个过程。做这些维护能帮助我理解自身的模式。[不要把理解委托出去](https://stephango.com/understand)。

## 属性与模板

我创建的几乎每篇笔记，都从一个[模板](https://github.com/kepano/kepano-obsidian/tree/main/Templates)开始。我重度使用模板，因为它们让我能毫不费力地补充日后检索笔记时有用的信息。每个类别都有一个模板，顶部设有[属性（properties）](https://help.obsidian.md/properties)，用于记录例如：

- **日期**：created、start、end、published
- **人物**：author、director、artist、cast、host、guests
- **主题**：按 genre、type、topic、相关笔记分组
- **地点**：街区、城市、坐标
- **评分**：详见下文

我对属性遵循的一些规则：

- 属性名称和值应尽量能跨类别复用。这样我可以跨类别查找事物。例如，`genre` 在所有媒体类型中共用，意味着我能在同一处查看*科幻*书籍、电影和剧集的档案。
- 模板应尽量可组合。例如，*Person* 和 *Author* 是两个不同的模板，可以添加到同一篇笔记中。
- 简短的属性名输入更快，例如使用 `start`，而非 `start-date`。
- 只要未来有可能包含多个链接或值，就优先使用 `list` 类型属性，而非 `text` 类型。

[.obsidian/types.json](https://github.com/kepano/kepano-obsidian/blob/main/.obsidian/types.json) 文件列出了哪些属性被分配为何种类型（如 `date`、`number`、`text` 等）。

## 评分系统

任何带有 `rating` 的内容，均使用 1 到 7 的整数：

- 7 —— **完美**：必须尝试，改变人生，值得专程去体验
- 6 —— **出色**：值得再次体验
- 5 —— **不错**：不必专程，但令人愉悦
- 4 —— **尚可**：应急时能用
- 3 —— **糟糕**：能不做就别做
- 2 —— **惨不忍睹**：应主动避开，令人反感
- 1 —— **邪恶**：以糟糕的方式改变人生

为什么使用这个量表？相比 4 分或 5 分制，我更喜欢 7 分制，因为我需要在较好的体验上有更细的区分；而 10 分制又过于细致。

## 发布到网站

这个网站直接在 Obsidian 中写作、编辑和发布。为此，我打破了上面的一条规则——我为网站单独设置了一个仓库。我使用名为 [Jekyll](https://jekyllrb.com/) 的*静态网站生成器*，自动将笔记编译为网站，并把 Markdown 转换为 HTML。

我的发布流程易于使用，但搭建起来有些技术门槛。这是因为我希望完全控制网站布局的每个方面。如果你不需要完全控制，可以考虑更易用的 [Obsidian Publish](https://obsidian.md/publish)；我也用它来发布 [Minimal 文档网站](https://minimal.guide/publish/download)。

对于本网站，我通过 [Obsidian Git](https://obsidian.md/plugins?id=obsidian-git) 插件，将 Obsidian 中的笔记推送到 GitHub 仓库。随后，笔记会由我的网站托管服务 [Netlify](https://www.netlify.com/) 使用 [Jekyll](https://jekyllrb.com/) 自动编译。我还使用自己的 [Permalink Opener](https://stephango.com/permalink-opener) 插件，快速在浏览器中打开笔记，以便比较草稿与线上版本。

配色方案是我为本网站创建的 [Flexoki](https://stephango.com/flexoki)。我的 Jekyll 模板未公开，但你可以使用 Maxime Vaillancourt 的[这个模板](https://github.com/maximevaillancourt/digital-garden-jekyll-template)获得相近效果。此外，还有许多可用于编译网站的 Jekyll 替代方案，如 [Quartz](https://quartz.jzhao.xyz/)、[Astro](https://astro.build/)、[Eleventy](https://www.11ty.dev/) 和 [Hugo](https://gohugo.io/)。

## 相关阅读

- [文件优先于应用](https://stephango.com/file-over-app)
- [简明的解释能加速进步](https://stephango.com/concise)
- [常青笔记将想法变成可操作的对象](https://stephango.com/evergreen-notes)
- [每年问自己 40 个问题](https://stephango.com/40-questions)
- [每十年问自己 40 个问题](https://stephango.com/40-questions-decade)
- [我是如何处理待办事项的](https://stephango.com/todos)
