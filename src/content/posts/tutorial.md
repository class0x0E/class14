---
title: 博客基本教程
meta_title: ""
description: 博客仓库的拉取，nodejs环境的搭建，博客的本地运行与部署
date: 2025-12-30
image: images/posts/gugugaga.png
categories: ["关于本博客"]
authors: ["biscuit","undine"]
tags: ["基本教程"]
draft: false
---

推荐使用markdown语法喵，[文章标题头的注意事项参考](https://class0x0e.github.io/elements/)

基于老六fork并成功创建pr的伟大实践经验。

### 推荐编辑器

#### vscode

[vscode](https://code.visualstudio.com/)

理由：

1. 免费开源

2. 插件丰富，支持markdown预览，git图形化，代码补全等功能

#### typora

[typora](https://typora.io/)

理由：

我不知道，没用过，这一块让老六补充

### github上创建账号和安装git

参考官网文档：[github注册](https://git-scm.com/book/zh/v2/GitHub-%E8%B4%A6%E6%88%B7%E7%9A%84%E5%88%9B%E5%BB%BA%E5%92%8C%E9%85%8D%E7%BD%AE)

不要选任何付费套餐，免费版完全够用。

#### git安装

<Tabs client:load>
<Tab name="Windows">

##### windows下git安装

从官网安装：[git for windows](https://git-scm.com/download)

建议安装最新稳定版，找关键词`the latest (x.xx.x) x64 version of Git for Windows`这样的。

在安装流程里面参考[这一篇](https://www.cnblogs.com/xueweisuoyong/p/11914045.html)

安装完了之后打开cmd，输入

```bash
git --version
```

如果显示版本号说明安装成功
</Tab>

<Tab name="Linux">

##### linux下git安装

大部分linux发行版都自带git，如果没有可以通过包管理器安装。

<Tabs client:load>
<Tab name="Debian/Ubuntu">

##### 对于Debian/Ubuntu系

```bash
sudo apt update
sudo apt install git
```

</Tab>

<Tab name="Arch">

##### 对于Arch系

```bash
sudo pacman -S git
```

</Tab>

<Tab name="Fedora">

##### 对于Fedora系

```bash
sudo dnf install git
```

</Tab>
</Tabs>

安装完了之后打开终端，输入

```bash
git --version
```

如果显示版本号说明安装成功
</Tab>
<Tab name="macOS">

##### macOS下git安装

鼠鼠没有用过mac，希望懂哥补充
</Tab>

</Tabs>

#### git信息配置

先配置用户名和邮箱：用户名是你的github用户名（主页左上角的那个），邮箱是你注册github时使用的邮箱

```bash
git config --global user.name "你的github用户名"
git config --global user.email "你注册github时使用的邮箱"
```

配置ssh这一步可以跳过，老六实验过能直接clone，如果不行再来配置

### 博客仓库的fork与克隆

在和老六的实验中，确定了每个人fork一份博客仓库到自己的github账号下，再克隆到本地，通过pull request的方式提交文章是可行的。

先打开博客仓库页面：[class0x0E/class0x0e.github.io](https://github.com/class0x0E/class0x0e.github.io)点击右上角的Fork按钮，进入create a new fork页面:

1. owner选择你的github账号

2. repository name默认是原仓库名，建议把class0x0e换成自己有标识度的名字，但是结尾的.github.io不能改，不然路径错误会导致你自己的仓库博客显示问题

选好之后点击create fork按钮，等待fork完成。

fork完成之后，就相当于你在自己的github账号下有了一份博客仓库的拷贝。之后你所有的改动都是在这个fork出来的仓库上进行的。

在你想存放博客仓库的目录下打开终端，输入

```bash
git clone 你的fork仓库url
```

这样就把fork的博客仓库克隆到本地了

### nodejs环境的搭建

博客是基于[Astro](https://astro.build/)框架搭建的，需要nodejs环境（很神奇的是astro只支持nodejs的偶数版本）。

<Notice type="tip">
其实单纯写博客不需要安装nodejs环境，但是如果想在本地运行博客预览和调试就需要。如果电脑空间不够，或者装不明白可以跳过这一步。
</Notice>

先检查自己电脑nodejs的版本：

```bash
node -v
```

如果显示版本号且是偶数版本（比如v18.16.0），说明已经安装好了，跳过下面的安装步骤。如果是奇数版本或者提示命令不存在，就需要安装或者切换版本了。

<Tabs client:load>
<Tab name="Windows">

##### windows下nodejs安装

看老六的那篇windows上安装nodejs的文章：[windows下安装nodejs和fnm](https://class0x0e.github.io/posts/windows-nodejs-fnm/)

</Tab>

<Tab name="Linux">

##### linux下nodejs安装

先装fnm，fnm是一个nodejs版本管理工具，可以方便地安装和切换nodejs版本。不推荐用nvm。

<Tabs client:load>
<Tab name="Debian/Ubuntu">

##### 对于Debian/Ubuntu系安装fnm和nodejs

建议使用官方的安装脚本：

```bash
sudo apt update
sudo apt install curl
curl -fsSL https://fnm.vercel.app/install | bash  #这里根据需要，用的bash就填bash，zsh就填zsh，fish就填fish
```

</Tab>
<Tab name="Arch">

##### 对于Arch系安装fnm和nodejs

```bash
sudo pacman -S fnm
```

</Tab>
<Tab name="Fedora">

##### 对于Fedora系安装fnm和nodejs

```bash
sudo dnf install fnm
```

</Tab>
</Tabs>

然后按照终端输出的提示，把fnm的初始化代码添加到对应的shell配置文件中（比如~/.bashrc，~/.zshrc，~/.config/fish/config.fish等）

```bash
source ~/.bashrc  # 或 ~/.zshrc
fnm --version ## 测试是否安装成功
fnm --help    ## 查看帮助
```

安装好fnm之后就可以安装nodejs了，我用的24.x版本，能稳定跑，建议不要换成别的版本

```bash
fnm install 24  # 安装nodejs 24.x.x最新版本
fnm use 24      # 切换到nodejs 24.x.x
```

</Tab>
<Tab name="macOS">

##### macOS下nodejs安装

鼠鼠没有用过mac，希望懂哥补充
</Tab>
</Tabs>

完成之后再检查一下nodejs和npm版本：

```bash
node -v #应该显示v24.x.x
npm -v
```

### 博客的本地运行与部署

进入之前克隆下来的博客仓库目录，打开终端，运行以下命令安装依赖：

```bash
npm install
```

安装完成之后运行以下命令启动本地预览服务器：

```bash
npm run dev
```

这个命令会启动一个本地服务器。

每次写完博客之后，可以运行下面两个命令：

```bash
npm run build

npm run preview
```

第一个命令是把博客编译打包成静态文件，第二个命令是启动一个本地服务器预览打包后的效果。

输出类似：

```bash
 Local    http://localhost:4321/
```

ctrl+点击链接就可以在浏览器中预览博客了，可以检查一下内容排版有没有出bug，确保没问题了之后再提交。

### 提交文章

下面的教程假设你已经fork并克隆了博客仓库到本地，并且已经配置好了git。基于命令行，如果用vscode的图形化界面也是没问题的。

#### 设置远程仓库地址和上游仓库

因为博客是基于你fork出来的仓库进行修改的，所以你提交改动和同步改动的作用对象也是你的fork仓库。

先检查一下当前仓库的存储库地址：

```bash
git remote -v
```

输出类似：

```bash
origin https://github.com/你的github用户名/你的fork仓库名.git (fetch)
```

如果显示的地址不是你的fork仓库地址，就需要重新设置一下：

```bash
git remote set-url origin 你的fork仓库url
```

然后把我的仓库地址添加为上游仓库：

```bash
git remote add upstream https://github.com/class0x0E/class0x0e.github.io.git
```

再次检查一下：

```bash
git remote -v
```

如果origin显示的是你的fork仓库地址，upstream显示的是我的仓库地址，就说明设置成功了。不对的话就

```bash
git remote set-url origin 你的fork仓库url
```

#### 同步上游仓库（我的仓库）的改动到你的fork仓库

<Notice type="note">
每次提交到你的fork仓库之前，先同步一下上游仓库（我的仓库）的改动，避免冲突：
</Notice>

```bash
git fetch upstream
git checkout master # 如果你的分支不是master，请改成你的默认分支名
git merge upstream/master # 如果你的分支不是master，请改成你的默认分支名
git push origin master # 如果你的分支不是master，请改成你的默认分支名
```

#### 提交并推送改动到你的fork仓库

对于每次写完博客之后，先把改动提交到你的fork仓库：

```bash
git add .  #.表示添加所有改动的文件，如果只想添加某个文件可以把.换成文件路径
git commit -m "这里写本次改动的简短描述" #建议写清楚点，比如"添加了第一篇博客"
git push origin master # 如果你的分支不是master，请改成你的默认分支名
```

其中，commit命令是往本地的fork仓库提交改动，push命令是把本地fork仓库的改动推送到远程fork仓库。建议每次写完一篇博客就commit一次，push可以多攒几次commit一起push。

对于博客文章来说，commit的多少无所谓，主要是看你写的内容和格式有没有问题。

<Notice type="warning">
如果你打算改动页面设置，一定一定一定一定要单独commit一次，并且在commit信息中说明是改动了页面设置，否则出问题了回滚会很麻烦。
</Notice>

#### 创建pull request把改动推送到我的仓库

然后到你的github账号下打开你的fork仓库页面，点击“Compare & pull request”按钮，填写标题和描述，提交pull request。这一步把你的改动从fork的远程提交到我的仓库的远程。

我会定期查看pull request，审核通过之后就会合并，一般来说是攒了3、4个pr之后action一次。action之后博客网站就会更新。