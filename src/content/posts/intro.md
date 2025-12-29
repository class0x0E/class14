---
title: "Intro"
meta_title: "Intro"
description: "博客介绍文章，欢迎来到14班的班级博客！"
date: 2025-12-28
image: ""
categories: []
authors: []
tags: []
draft: false
---

推荐使用markdown语法喵

## 这是14班的第一篇博客喵

欢迎大家来到14班的班级博客！

## 使用教程

博客的编写规范和markdown语法请参考[这里](https://class0x0e.github.io/elements/)

## 命令行小工具

所有脚本文件都在`scripts`文件夹下，脚本可以拓展命令行和操作，欢迎大家来贡献。

目前实现的功能有：

### 新建作者信息

Astro 项目中，注册作者并不需要去任何网页点击“注册”按钮，而是通过 **文件式注册** 完成的。

```bash
npm run new-author "author文件名"
```

运行后会在`src/content/authors`目录下创建一个新的作者markdown文件，文件内包含作者信息行的模板，记得修改作者信息。

### 创建文章

注意下面是markdown文件的名字，并不是文章内的标题。最后显示在博客上的标题是文章信息行中的`title`字段。

```bash
npm run new-post "markdown文件名"
```

运行后会在`src/content/posts`目录下创建一个新的markdown文件，文件内包含文章信息行的模板，记得修改文章信息。

