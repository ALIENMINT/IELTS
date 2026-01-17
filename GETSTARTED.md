# 🎯 开始使用 - 完整指南

欢迎使用**学习助手多模块云端同步平台**！本指南将指导你从零开始，在30分钟内部署并运行应用。

---

## 📋 前置准备（5分钟）

### 需要的账号
- ✅ GitHub账号 (https://github.com/signup)
- ✅ Google账号 (https://accounts.google.com)
- ✅ Firebase账号 (https://console.firebase.google.com - 免费)

### 需要的工具
- ✅ 文本编辑器 (VS Code / Sublime / Notepad++)
- ✅ Git客户端 (https://git-scm.com)
- ✅ 网络浏览器

---

## 🚀 第1步：准备Firebase项目（8分钟）

### 1.1 创建Firebase项目

1. 访问 https://console.firebase.google.com
2. 点击 **"添加项目"**
3. 输入项目名称（如：`ielts-learning-2026`）
4. ⚠️ **取消勾选** "为此项目启用 Google Analytics"
5. 点击 **"创建项目"** 并等待完成

### 1.2 添加Web应用

1. 项目创建完成后，点击 **"</>"** 按钮（Web图标）
2. 输入应用昵称（如：`IELTS Learning App`）
3. 点击 **"注册应用"**
4. **复制Firebase配置信息** - 保存到临时文件

你将看到类似这样的代码：
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "project.firebaseapp.com",
  projectId: "project-id",
  storageBucket: "project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

### 1.3 启用Google认证

1. 进入Firebase控制台，选择你的项目
2. 左侧菜单 → **"Build"** → **"Authentication"**
3. 点击 **"Sign-in method"** 标签
4. 点击 **"Google"** 行
5. 打开 **"启用"** 开关
6. 选择或创建 Support email（你的邮箱即可）
7. 点击 **"保存"**

### 1.4 创建Firestore数据库

1. 左侧菜单 → **"Build"** → **"Firestore Database"**
2. 点击 **"创建数据库"**
3. 选择 Cloud Firestore 位置
   - 推荐: 离你最近的位置
   - 例：亚洲地区选择 `asia-southeast1`
4. 点击 **"下一步"**
5. 选择 **"在测试模式下启动"** (临时，后续会优化规则)
6. 点击 **"创建"**

### 1.5 配置Firestore安全规则

1. Firestore Database → **"Rules"** 标签
2. 删除所有内容，替换为：
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```
3. 点击 **"发布"**

### 1.6 配置授权域名

1. 左侧菜单 → **"项目设置"** (齿轮图标)
2. 选择 **"Authentication"** 标签
3. 向下滚动找到 **"授权域"**
4. 点击 **"添加域"**
5. 输入：`yourusername.github.io`
   - ℹ️ **重要提示**：输入主域名而不是具体项目路径
   - ✅ `yourusername.github.io` ← 正确（支持所有子路径）
   - ❌ `yourusername.github.io/ielts3` ← 不需要
6. 点击 **"添加"**

#### 💡 多项目场景说明
如果你有多个GitHub Pages项目，**只需添加一次主域名**即可：
- 所有项目都会自动获得授权
- 例如：`yourusername.github.io/project1`、`yourusername.github.io/project2` 等都能使用
- 你可以为每个项目创建单独的Web应用或共享同一个Firebase项目

✅ Firebase配置完成！

---

## 📝 第2步：修改应用配置（2分钟）

### 2.1 打开配置文件

在你克隆的项目中，打开文件：
```
d:\Github\ielts3\js\firebase-config.js
```

### 2.2 替换Firebase配置

将文件内容替换为你在第1.2步复制的配置：

```javascript
// ❌ 原来的配置（删除）
const firebaseConfig = {
  apiKey: "AIzaSyAY2JHi7EK-w2J-or7L28geJfnhQRj51cw",
  authDomain: "mytodoapp-8e830.firebaseapp.com",
  projectId: "mytodoapp-8e830",
  storageBucket: "mytodoapp-8e830.firebasestorage.app",
  messagingSenderId: "484535488942",
  appId: "1:484535488942:web:01f66d0da5bc2da6b9f83f",
  measurementId: "G-X9NL7JJ9DL"
};

// ✅ 替换为你的配置
const firebaseConfig = {
  apiKey: "你从Firebase复制的apiKey",
  authDomain: "你的项目.firebaseapp.com",
  projectId: "你的项目ID",
  storageBucket: "你的项目.appspot.com",
  messagingSenderId: "你的消息发送者ID",
  appId: "你的应用ID"
  // measurementId可选，如果没有就删除这行
};
```

### 2.3 保存文件

按 **Ctrl+S** 保存更改

✅ 配置更新完成！

---

## 🐙 第3步：推送代码到GitHub（8分钟）

### 3.1 创建GitHub仓库

1. 访问 https://github.com/new
2. 仓库名称: `ielts3` (必须是这个名字用于GitHub Pages)
3. ⚠️ 仓库描述: `Multi-module learning platform with Firebase sync`
4. ⚠️ 选择 **Public** (公开)
5. ⚠️ 不要勾选任何初始化选项
6. 点击 **"Create repository"**

### 3.2 配置Git并推送

打开命令行/终端，执行以下命令：

```bash
# 进入项目目录
cd d:\Github\ielts3

# 初始化git（如果还没初始化）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: Multi-module learning platform with Firebase sync"

# 添加远程仓库（替换yourusername为你的GitHub用户名）
git remote add origin https://github.com/yourusername/ielts3.git

# 创建并切换到main分支
git branch -M main

# 推送到GitHub
git push -u origin main
```

⚠️ **重要**: 如果要求输入用户名和密码：
- 用户名: 你的GitHub用户名
- 密码: 你的GitHub个人访问令牌 (PAT)
  - 获取方式: Settings → Developer settings → Personal access tokens → Generate new token
  - 权限: 选择 `repo` (完整权限)

✅ 代码推送完成！

---

## 🌐 第4步：启用GitHub Pages（3分钟）

### 4.1 进入仓库设置

1. 访问你的仓库: https://github.com/yourusername/ielts3
2. 点击 **"Settings"** (顶部菜单)
3. 左侧菜单找到 **"Pages"**

### 4.2 配置Pages

1. 在 **"Build and deployment"** 部分：
   - Source: 选择 **"Deploy from a branch"**
   - Branch: 选择 **"main"** 和 **"/ (root)"**
2. 点击 **"Save"**

### 4.3 等待部署

- 部署通常需要 1-2 分钟
- 你会看到 "Your site is live at..." 的消息
- 或者重新刷新页面直到看到绿色的 ✅ 图标

✅ GitHub Pages部署完成！

---

## ✅ 第5步：验证应用（4分钟）

### 5.1 访问应用

在浏览器中访问：
```
https://yourusername.github.io/ielts3
```

你应该看到：
- 紫色渐变背景
- 中央的登录卡片
- "学习助手" 标题
- "使用 Google 登录" 按钮

### 5.2 测试登录

1. 点击 **"使用 Google 登录"** 按钮
2. 选择你的Google账号（建议用常用的账号）
3. 点击 **"继续"** 或授权

### 5.3 测试功能

登录成功后，你应该看到：

✅ **顶部导航栏**
- "学习助手" 标题
- 绿色同步指示点
- 你的邮箱地址
- "退出登录" 按钮

✅ **模块导航**
- "清单" 标签（选中）
- "IELTS" 标签

✅ **清单模块**
1. 输入任务名称（如："完成雅思真题")
2. 点击 **"添加"** 按钮
3. 任务应该立即出现在下面的列表中
4. 点击左侧复选框测试完成/取消完成
5. 点击垃圾桶图标测试删除

✅ **IELTS模块**
1. 点击 **"IELTS"** 标签
2. 应该看到三个统计卡片（听力、阅读、总分）
3. 点击日期选择器选择今天的日期
4. 输入听力和阅读的得分
5. 点击 **"学情录入"** 和 **"趋势分析"** 标签切换

### 5.4 验证同步

1. **在同一浏览器的另一标签页**再次访问应用URL
2. 你应该自动登录
3. 之前添加的任务应该仍然存在
4. 这说明数据已成功同步到Firebase

✅ 应用验证完成！

---

## 🎉 现在你已经可以使用了！

### 下一步建议

1. **在不同设备测试**
   - 用同一Google账号在手机/平板上登录
   - 数据应该自动同步

2. **阅读使用手册**
   - 打开 `USAGE.md` 了解详细功能
   - 查看每个模块的完整功能说明

3. **个性化配置**（可选）
   - 修改 `README.md` 个性化说明
   - 在 `package.json` 中更新项目信息
   - 自定义 `css/styles.css` 中的颜色变量

---

## 🆘 遇到问题？

### 问题1: 登录失败

❌ 错误信息: "登录尝试失败"

✅ 解决步骤:
1. 检查网络连接
2. 查看浏览器控制台 (F12 → Console)
3. 确认Firebase配置是否正确
   - 打开 `js/firebase-config.js`
   - 检查复制的配置是否完整
4. 在Firefox或Chrome中重试
5. 清除浏览器缓存 (Ctrl+Shift+Delete)

### 问题2: 页面无法访问

❌ 错误: 404或页面空白

✅ 解决步骤:
1. 确认URL正确: `https://yourusername.github.io/ielts3`
   - 替换 `yourusername` 为你的GitHub用户名
   - 确保全小写
2. 等待2-3分钟（GitHub Pages部署需要时间）
3. 清除缓存后刷新 (Ctrl+Shift+R)
4. 检查仓库设置中GitHub Pages是否启用

### 问题3: 数据无法保存

❌ 任务添加后消失

✅ 解决步骤:
1. 检查顶部是否显示你的邮箱（确认已登录）
2. 打开浏览器控制台 (F12 → Console) 查看错误信息
3. 在Firebase控制台检查Firestore是否有数据
4. 尝试重新登录

### 问题4: 模块加载失败

❌ IELTS模块显示空白

✅ 解决步骤:
1. 检查 `modules/` 目录是否存在以下文件:
   - todolist.html
   - ielts.html
2. 查看浏览器控制台错误
3. 尝试在另一个浏览器中访问

### 更多帮助

- 📖 查看 `DEPLOYMENT.md` 的故障排除章节
- 📖 查看 `USAGE.md` 的常见问题
- 🐛 提交GitHub Issue (Discussions标签)

---

## 📚 后续学习资源

### 项目文档（按阅读顺序）
1. **QUICKSTART.md** - 快速参考卡
2. **USAGE.md** - 完整使用手册
3. **DEPLOYMENT.md** - 深入部署指南
4. **STRUCTURE.md** - 项目结构详解
5. **PROJECT_SUMMARY.md** - 项目完成总结

### 官方文档
- [Firebase文档](https://firebase.google.com/docs)
- [GitHub Pages指南](https://pages.github.com)
- [JavaScript教程](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🚀 常见下一步操作

### 修改应用名称和样式
```
编辑文件: index.html
修改内容:
- 页面标题 <title>
- 导航栏名称 .brand
- 应用图标
```

### 添加自己的颜色主题
```
编辑文件: css/styles.css
修改内容:
- :root 中的CSS变量
- --primary-color
- --background-color
等等...
```

### 实现数据备份
```
使用IELTS模块的导出功能:
1. IELTS模块 → "Excel 导出"
2. 保存为备份文件
3. 定期导出保存
```

---

## ✨ 功能概览

### 清单模块
| 功能 | 说明 |
|------|------|
| 添加任务 | 输入内容后按Enter或点击添加 |
| 完成任务 | 点击复选框标记完成/未完成 |
| 删除任务 | 点击垃圾桶图标删除 |
| 实时同步 | 数据自动保存到Firebase |
| 多设备同步 | 其他设备自动显示最新数据 |

### IELTS分析模块
| 功能 | 说明 |
|------|------|
| 学情录入 | 记录听力和阅读的得分 |
| 笔记记录 | 记录学习心得和总结 |
| 成绩预估 | 自动计算Band分数 |
| 趋势分析 | 查看成绩进度和改进方向 |
| 数据导出 | 导出为Excel或TXT文件 |

---

## 📞 获取帮助

### 按优先级顺序尝试

1. **自助排查**
   - 查看浏览器控制台错误
   - 阅读相关文档

2. **在线资源**
   - Firebase官方文档
   - GitHub Pages帮助
   - Stack Overflow搜索

3. **社区支持**
   - 提交GitHub Issue
   - 查看项目Discussion

4. **联系开发者**
   - 发送邮件说明问题
   - 提供截图/错误信息

---

## 🎓 学习要点

通过本项目你可以学到：

✅ **前端技术**
- 现代HTML5布局
- CSS3动画和Grid/Flex
- 原生JavaScript（不依赖框架）

✅ **云端技术**
- Firebase Authentication认证
- Firestore实时数据库
- 云端数据同步

✅ **Web部署**
- GitHub Pages静态托管
- Git版本控制
- 自动化CI/CD

✅ **应用架构**
- 模块化代码组织
- 类设计模式
- MVC架构思想

---

## 🎯 快速命令参考

### Git命令
```bash
# 查看修改状态
git status

# 更新代码（修改后）
git add .
git commit -m "描述你的修改"
git push origin main

# 查看历史
git log --oneline
```

### Firebase命令
```bash
# 部署Firebase函数（如果添加了）
firebase deploy

# 查看日志
firebase functions:log
```

---

## 🌟 好，现在开始吧！

1. ✅ 完成第1-4步
2. ✅ 验证应用可以正常访问和使用
3. ✅ 用Google账号登录测试
4. ✅ 添加几个任务或IELTS数据测试
5. ✅ 在另一个设备上验证同步

**祝你使用愉快！🎉**

如有任何问题，请查阅相关文档或提交Issue。

---

**创建时间**: 2026年1月17日  
**最后更新**: 2026年1月17日  
**版本**: 1.0.0
