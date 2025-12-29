import fs from 'fs';
import path from 'path';

// 获取命令行输入的标题
const title = process.argv[2] || 'New Post';
// 转换成文件名格式 (例如: "Hello World" -> "hello-world")
const slug = title.toLowerCase().replace(/\s+/g, '-');
const date = new Date().toISOString().split('T')[0];
const fileName = `${slug}.md`;
const filePath = path.join(process.cwd(), 'src/content/posts', fileName);

// 文章模板
const template = 
`---
title: ${title}
meta_title: ""
description: ""
date: ${date}
image: 
categories: []
authors: []
tags: []
draft: false
---

推荐使用markdown语法喵，[文章标题头的注意事项参考](https://class0x0e.github.io/elements/)

`;

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, template);
  console.log(`✅ 成功！新文章已创建在: ${filePath}`);
} else {
  console.error(`❌ 错误：文件 ${fileName} 已存在！请更换标题！`);
}