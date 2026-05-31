---
title: "绘制动态图片的语言 ，一种 AI语言 - Substroke"
source: "https://pmthinking.notion.site/AI-Substroke-2772f8e86e158186a504d1861f2d1133?pvs=25"
block_id: "2772f8e8-6e15-8186-a504-d1861f2d1133"
captured: 2026-05-29
type: raw-public-notion-deep-link
---

# 绘制动态图片的语言 ，一种 AI语言 - Substroke

Source: https://pmthinking.notion.site/AI-Substroke-2772f8e86e158186a504d1861f2d1133?pvs=25

Capture note: extracted from a deeper internal link found inside previously captured raw Notion pages. This is raw evidence, not a distilled ZHPMind wiki page.

## Linked From

- people-pages/21-bret-victor.md: 1

## Page Text

2007-04-17

Substroke Design Dump
Substroke was a research language for drawing dynamic (data-dependent) pictures.

Substroke 一种用于绘制动态(依赖于数据)图片的研究语言。

Substroke visualizes the data, not the code.

Machinery is minimized.

#### 基本概念

• 传统的“可视化”语言(带有方框和箭头)可视化程序结构。这是错误的！艺术家不想造一台机器来画画，他想自己画画。机器被最小化了。

• 作为一种纯函数式语言，没有状态，也没有时间。这消除了一大类复杂和混乱。然而，comic-strip syntax 给人一种舒适的时间和变化的错觉，没有任何缺点。

• comic-strip syntax 为艺术家提供了一个具体的视觉输出在每一点。这与传统语言不同，在传统语言中，程序员必须想象(通常是抽象地)每行代码的作用。

• 这种语言鼓励“几何规划”——用形状交互作用和交叉点构造图片，而不是用数值算法。

• 图形属性(如 Bezier 点和颜色)表示为画布上的对象，因此可以通过几何操作(通过标准的移动、旋转和缩放函数)。这是一个强大的正交性，允许概念上的简单。

• 层允许多个对象交互。链接图层允许艺术家“玩”属性并立即看到结果。泛型链接允许为对象属性提供任意的“接口”。

#### 动机

所谓绘画，我的意思是通过直接操纵图画本身来构建，对所构建的图画有清晰的认识。

动态图片，我指的是一个图形，可以改变，在一个完全一般的方式，根据一组参数。

information graphics

Untitled
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/6515e2db-7d5d-4131-8e1e-658f54ca47d9/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/6515e2db-7d5d-4131-8e1e-658f54ca47d9/Untitled.png

Untitled
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/88a14a4e-da73-438c-8ac9-fec690beea49/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/88a14a4e-da73-438c-8ac9-fec690beea49/Untitled.png

technical drawings.

Untitled
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/a14cb460-783b-43fa-b2bf-5ed954f267bf/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/a14cb460-783b-43fa-b2bf-5ed954f267bf/Untitled.png

Untitled
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/a75cc80f-4684-49ab-9024-d46302ede201/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/a75cc80f-4684-49ab-9024-d46302ede201/Untitled.png

目前，创建这样的图片需要在静态绘图工具(Photoshop，Illustrator 等)中绘制组件或模型，

然后用文本编程语言盲目地操作它们。

与在画布上绘图不同，文本编程不提供视觉反馈

程序员必须想象每个代码元素的效果，并在词汇和图形概念之间维持复杂的心理映射。

这种间接性严重限制了艺术的自由。

此外，大多数视觉艺术家不能处理文本抽象。

结果就是程序员画出来的图片设计得很糟糕，艺术家/程序员组合设计出来的图片也很乏味。

视觉艺术家缺乏创造有效可视化的手段。

#### 哲学

Substroke 是一种用于绘制动态图片的可视化语言。

该语言旨在成为一个“图片方案”。

也就是说，意图是一个简单、优雅的框架，使用简单、基本的构造，允许在库中实现奇特的功能。

这是个研究项目。这是雄心勃勃和探索性的。

语言启发后代比直接使用本身更重要。

改变人们对图形编程的看法比创建终极图形工具更重要。

原则

• 艺术家总是看到和操纵具体的视觉例子。每一个变化的效果可以立即看到的例子。

• 艺术家只看到和操纵具体的例子。唯一的视觉对象就是他画的那些。“代码”相关的可视化元素被最小化。

• 程序非常容易阅读，读者只要扫描一下可视化示例就能理解一个好的程序。

• 所有的语义对象都是图片。也就是说，所有的对象都有一个有意义的外观。没有不可视化的“数据结构”。

• 这种语言鼓励“几何编程”——通过在画布上的几何操作构造图片，使用视觉上有意义的中间对象。

• 艺术家大部分时间都把手放在鼠标或手写笔上，最大限度地减少打字。

• 单词优于语义标点符号。艺术术语(几何术语)比编程术语更受欢迎。

Substroke 是一种基于扩展不可变记录的语言。

在这方面，它与研究语言 Piccola 非常相似(我是在完成这里的大部分工作之后才发现它的!).

Substroke 是一种纯粹的语言。函数没有状态或外部效应。事实上，没有“时间”的概念——只有依赖关系。

SubStroke 是一种懒惰的语言。计算是通过沿着依赖关系图从输出向后进行的。只有在“需要”时才计算属性。(如果“被需要”可能意味着“作为函数应用”、“提取了一个属性”或“是一个必需的属性”。)

尽管是一种纯粹的语言与不可变的数据，漫画语法提供了舒适的熟悉的感觉变化图片，甚至允许对象的属性是“设置”。

#### Strips and Panels

Substroke is conceptually a transform language

从概念上来说，是一种转换的语言。艺术家从转换一幅画到另一幅画的角度来思考:

Untitled
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/22cb1bcc-7a11-49b6-a2a0-89355d2b9870/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/22cb1bcc-7a11-49b6-a2a0-89355d2b9870/Untitled.png

In the top-level case of transforming a set of data into an information graphic, the initial "picture" might be a block of text:

在将一组数据转换为信息图形的顶级情况下，最初的“图片”可能是一个文本块:

Untitled
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/67e1e483-11c2-4ef0-a117-419aa923d522/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/67e1e483-11c2-4ef0-a117-419aa923d522/Untitled.png

A chain of transforms is called a strip (in analogy to a comic strip or film strip). Each picture in the strip is called a panel. Strips should appear comfortable to artists -- if you were to take a series of snapshots as an artist drew a picture, it might look like this.

一连串的转换被称为连环画(类似于连环漫画或电影连环画)。每张图片在条被称为一个面板。对于艺术家来说，条带应该看起来很舒服——如果您在艺术家画画时拍摄一系列快照，它可能看起来像这样。

http://worrydream.com/substroke/overview_strip.png

http://worrydream.com/substroke/overview_strip.png

#### Functions and Properties

A function is a strip with a name.

Untitled
下面的函数没有提供任何抽象
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/f5b967ca-eccd-4907-866a-b040f240c282/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/f5b967ca-eccd-4907-866a-b040f240c282/Untitled.png

Untitled
下面的函数是抽象的，因为它接受一个直接对象
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/34f1a1ec-fac3-450a-8800-f3848ecca665/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/34f1a1ec-fac3-450a-8800-f3848ecca665/Untitled.png

Untitled
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/05814347-9b1a-47e5-b853-7b5259cb1c51/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/05814347-9b1a-47e5-b853-7b5259cb1c51/Untitled.png

函数可以具有属性。这些属性本身就是函数，它们可能有也可能没有直接对象。

函数的strip 可以引用属性。这些属性可以相互引用。

Untitled
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/15db2fde-2a84-426f-b380-a5c1ca21afa9/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/15db2fde-2a84-426f-b380-a5c1ca21afa9/Untitled.png

当函数应用于panel时，它的属性可以被参数覆盖:

Untitled
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/c3130bc7-854c-4288-be43-64ff67b1d477/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/c3130bc7-854c-4288-be43-64ff67b1d477/Untitled.png

Objects

The function below has no strip of its own -- it has only properties. Such a function is called an object constructor:

下面的函数没有自己的条带——它只有属性。这样的函数称为对象构造函数:

http://worrydream.com/substroke/overview_constructor.png

http://worrydream.com/substroke/overview_constructor.png

Labels

为了引用前面面板中的对象，我们可以使用代词 It。“ It”和“ It’s”是同义词。

Untitled
https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/fc0c85e7-d033-44b8-adbd-0b805c34d735/Untitled.png

https://prod-files-secure.s3.us-west-2.amazonaws.com/3d586856-b101-41dc-ba15-661b97880507/fc0c85e7-d033-44b8-adbd-0b805c34d735/Untitled.png

We can refer to an object in any panel by giving the panels labels. A label can be used anywhere within the function's strip or properties (even in earlier strips!). Below, the second panel is labeled "Greenie", and is used in the fourth panel.

我们可以通过给面板标签来引用任何面板中的对象。标签可以在函数的带或属性中的任何位置使用(即使是在早期的带中!).下面，第二个面板被标记为“ Greenie”，并在第四个面板中使用。

http://worrydream.com/substroke/overview_label.png

http://worrydream.com/substroke/overview_label.png

A label (including "It") can be applied like a function. By giving parameters to this function, we can "set" the object's properties. (Note that objects are immutable, so by "set", we mean "reconstruct the object with some properties overridden".)

## Capture Metadata

- block_count: 112
- chars: 7237
