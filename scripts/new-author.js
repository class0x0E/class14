import fs from 'fs';
import path from 'path';

const name = process.argv[2] || 'new-author';
const slug = name.toLowerCase().replace(/\s+/g, '-');
const fileName = `${slug}.md`;
const filePath = path.join(process.cwd(), 'src/content/authors', fileName);

const template =
`---
title: ${name}
meta_title: ""
image: 
description: 
social:
    qq: 
    wechat: 
    bilibili:
---

[填写建议参考](https://class0x0e.github.io/authors/)
`

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, template);
  console.log(`✅ 成功！新作者信息已创建在: ${filePath}`);
} else {
  console.error(`❌ 错误：文件 ${fileName} 已存在！请更换名字！`);
}