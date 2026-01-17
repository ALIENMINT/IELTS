# 🚀 多项目使用指南

本指南说明如何用同一个Firebase项目管理多个GitHub Pages项目，数据完全隔离。

---

## 📋 架构说明

### Firestore数据结构

```
Firebase项目（共享）
│
└── Firestore数据库
    │
    └── users/
        │
        ├── user123/              ← 用户1
        │   ├── ielts3/          ← 项目1
        │   │   ├── tasks/       ← 任务数据
        │   │   └── ielts_data/  ← IELTS数据
        │   │
        │   ├── learning-app/    ← 项目2
        │   │   ├── tasks/
        │   │   └── ielts_data/
        │   │
        │   └── study-helper/    ← 项目3
        │       ├── tasks/
        │       └── ielts_data/
        │
        └── user456/              ← 用户2
            ├── ielts3/
            ├── learning-app/
            └── ...
```

**关键点**：
- 每个用户有独立的文件夹（`/users/{userId}/`）
- 每个项目有独立的子文件夹（`/users/{userId}/{projectName}/`）
- 项目之间数据完全隔离

---

## 🔧 实施步骤

### 第1步：共享Firebase配置

所有项目的 `js/firebase-config.js` **完全相同**：

```javascript
// 项目1：ielts3/js/firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "my-firebase-project.firebaseapp.com",
  projectId: "my-firebase-project",
  storageBucket: "my-firebase-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
export default firebaseConfig;
```

```javascript
// 项目2：learning-app/js/firebase-config.js
// 🔄 完全相同的配置
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "my-firebase-project.firebaseapp.com",
  projectId: "my-firebase-project",  // 同一个Firebase项目
  storageBucket: "my-firebase-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
export default firebaseConfig;
```

### 第2步：设置项目名称

在每个项目的 `index.html` 中修改项目名称：

#### 项目1：ielts3
```javascript
// d:\Github\ielts3\index.html 第xx行
const projectName = 'ielts3';  // ← 项目名称
dbManager = new DBManager(app, user.uid, projectName);
```

#### 项目2：learning-app
```javascript
// d:\Github\learning-app\index.html 第xx行
const projectName = 'learning-app';  // ← 不同的项目名称
dbManager = new DBManager(app, user.uid, projectName);
```

#### 项目3：study-helper
```javascript
// d:\Github\study-helper\index.html 第xx行
const projectName = 'study-helper';  // ← 再换一个项目名称
dbManager = new DBManager(app, user.uid, projectName);
```

### 第3步：共享Firebase规则

在你的Firebase项目中设置一次安全规则（所有项目共用）：

**路径**: Firestore Database → Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户只能访问自己的数据
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

这个规则保证：
- ✅ user123 只能访问 `/users/user123/...`
- ✅ 不同项目都在同一个规则保护下
- ✅ 项目之间完全隔离（通过路径结构）

---

## 📐 项目命名建议

### 使用规范
- ✅ 全小写
- ✅ 用 `-` 分隔单词（如：`learning-app`）
- ✅ 不包含特殊字符
- ✅ 对应GitHub仓库名称（可选但建议）

### 命名示例

| 项目名称 | GitHub仓库 | URL | 数据路径 |
|---------|----------|-----|---------|
| `ielts3` | ielts3 | yourusername.github.io/ielts3 | `/users/{uid}/ielts3/` |
| `learning-app` | learning-app | yourusername.github.io/learning-app | `/users/{uid}/learning-app/` |
| `study-helper` | study-helper | yourusername.github.io/study-helper | `/users/{uid}/study-helper/` |
| `note-taking` | note-taking | yourusername.github.io/note-taking | `/users/{uid}/note-taking/` |

---

## 🔄 添加新项目的快速流程

当你要创建第二个、第三个项目时：

### 步骤1：复制项目文件（5分钟）
```bash
# 复制整个ielts3文件夹
cp -r d:\Github\ielts3 d:\Github\new-project

# 或手动复制所有文件
```

### 步骤2：修改项目标识（2分钟）
编辑 `index.html`：
```javascript
// 修改这一行
const projectName = 'new-project';  // ← 改成新的项目名称
```

### 步骤3：创建GitHub仓库（2分钟）
```bash
cd d:\Github\new-project

# 初始化git
git init

# 添加并推送
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/new-project.git
git branch -M main
git push -u origin main
```

### 步骤4：启用GitHub Pages（1分钟）
- 进入新仓库的Settings → Pages
- 选择main分支和/ (root)文件夹
- 保存

✅ **完成！新项目自动使用同一Firebase，数据完全隔离**

---

## ✨ 优势对比

### vs. 为每个项目创建独立Firebase

| 方面 | 共享Firebase | 独立Firebase |
|------|-----------|-----------|
| 配置工作量 | ⭐ 少 | ⭐⭐⭐ 多 |
| 授权域配置 | ⭐ 1次 | ⭐⭐⭐ 多次 |
| 维护复杂度 | ⭐ 简单 | ⭐⭐⭐ 复杂 |
| 免费额度 | ⭐⭐ 共享 | ⭐⭐⭐ 各自独立 |
| 数据共享 | ⭐⭐⭐ 容易 | ⭐ 困难 |
| 成本 | 💰 低 | 💰 较高 |
| **推荐** | **✅** | ❌ |

---

## 🔒 数据安全

### 是否不同用户能看到彼此的数据？

❌ **不能**

**原因**：
- Firebase安全规则限制：每个用户只能访问自己的 `/users/{uid}/...`
- 不同用户的uid不同，无法访问其他用户的数据

**验证方式**：
```
用户1 (uid: user123) 登录项目A
  ↓
可访问：/users/user123/ielts3/tasks ✅
无法访问：/users/user456/ielts3/tasks ❌

用户2 (uid: user456) 登录项目B
  ↓
可访问：/users/user456/learning-app/tasks ✅
无法访问：/users/user123/learning-app/tasks ❌
```

---

## 📊 数据隔离验证

### 在Firebase控制台查看数据结构

1. 打开 https://console.firebase.google.com
2. 进入你的项目 → Firestore Database
3. 应该看到这样的结构：

```
users/
├── user1/
│   ├── ielts3/
│   │   ├── tasks/
│   │   │   ├── xxxxx1: {text: "...", completed: true}
│   │   │   └── xxxxx2: {text: "...", completed: false}
│   │   └── ielts_data/
│   │       └── 2026-01-18: {listening: [...]}
│   │
│   └── learning-app/
│       ├── tasks/
│       │   └── yyyyy1: {text: "...", completed: false}
│       └── notes/
│           └── note1: {content: "..."}
```

✅ 数据清晰分离，互不影响

---

## 🛠️ 常见问题

### Q1：我能在一个浏览器同时登录两个项目吗？

✅ **可以**

在两个不同的标签页中分别打开：
- `yourusername.github.io/ielts3` → 登录用户A
- `yourusername.github.io/learning-app` → 登录用户B

或者同一个用户登录两个项目，数据独立存储。

### Q2：改变projectName会丢失原来的数据吗？

✅ **不会，数据永远在Firebase中**

```javascript
// 改前
const projectName = 'ielts3';
// 数据在：/users/{uid}/ielts3/

// 改后
const projectName = 'ielts3-old';
// 原数据仍在：/users/{uid}/ielts3/
// 新数据会写入：/users/{uid}/ielts3-old/
```

如果要继续访问原数据，改回原来的项目名称即可。

### Q3：能否把数据从一个项目移到另一个项目？

✅ **可以，通过Firebase控制台手动操作**

或者编写一个简单的迁移脚本来复制数据。

### Q4：多个项目共享会不会导致Firestore配额溢出？

⚠️ **取决于项目数量和用户量**

Firebase免费额度：
- 每天 50,000 次读取
- 每天 20,000 次写入
- 每天 20,000 次删除

**估算**：
- 1000个用户，每个每天50次操作 = 50,000次读取 ✅ 刚好在限额内
- 超过这个量级建议升级到按量付费或分离项目

---

## 📚 相关文档

- [Firebase安全规则文档](https://firebase.google.com/docs/firestore/security/start)
- [Firestore数据结构最佳实践](https://firebase.google.com/docs/firestore/best-practices)

---

## 🎯 总结

| 步骤 | 操作 | 时间 |
|------|------|------|
| 1 | 设置Firebase（一次性） | 10分钟 |
| 2 | 修改index.html中的projectName | 1分钟 |
| 3 | 部署到GitHub | 5分钟 |
| 4 | 每增加一个新项目 | 10分钟 |

✅ **就这么简单！多个项目，一个Firebase，数据完全隔离！**

---

**版本**: 1.0.0  
**创建日期**: 2026年1月18日  
**最后更新**: 2026年1月18日
