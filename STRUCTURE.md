# 项目结构树

## 完整的项目目录结构

```
ielts3/                                    # 项目根目录
│
├── 📄 index.html                         # ⭐ 主入口文件
│   └── 功能：加载所有模块，处理认证和路由
│
├── 📁 css/                                # 样式文件夹
│   └── styles.css                        # 全局样式和主题（约500行）
│       ├── CSS变量定义
│       ├── Glass Morphism样式
│       ├── 响应式断点
│       └── 动画和过渡效果
│
├── 📁 js/                                 # JavaScript模块文件夹
│   ├── firebase-config.js                # Firebase配置【需修改】
│   │   └── 包含API密钥和项目ID
│   │
│   ├── auth-manager.js                   # 认证管理类
│   │   ├── login() - Google登录
│   │   ├── logout() - 登出
│   │   └── onAuthStateChanged() - 监听状态
│   │
│   └── db-manager.js                     # 数据库管理类
│       ├── addTask() - 添加任务
│       ├── updateTask() - 更新任务
│       ├── deleteTask() - 删除任务
│       ├── onTasksSnapshot() - 监听任务
│       ├── saveAnalysisData() - 保存IELTS数据
│       └── onAnalysisDataSnapshot() - 监听IELTS数据
│
├── 📁 modules/                            # 功能模块文件夹
│   ├── todolist.html                     # 清单模块（约200行）
│   │   ├── 登录后显示
│   │   ├── 任务CRUD操作
│   │   ├── 实时Firebase同步
│   │   └── 响应式任务列表
│   │
│   └── ielts.html                        # IELTS分析模块（约800行）
│       ├── 学情录入部分
│       │   ├── 听力Part输入
│       │   ├── 阅读Passage输入
│       │   └── 笔记记录
│       │
│       └── 趋势分析部分
│           ├── 成绩趋势图表
│           ├── 用时监控
│           └── 弱项云图展示
│
├── 📁 sample/                             # 原始参考文件
│   ├── Todolist.html                     # 原始清单模块
│   └── analyse.html                      # 原始IELTS分析模块
│
├── 📚 文档文件                             # 说明和指南
│   ├── README.md                         # 项目介绍和功能说明
│   ├── DEPLOYMENT.md                     # ⭐ 详细部署指南（必读）
│   ├── USAGE.md                          # 完整使用手册
│   ├── QUICKSTART.md                     # 快速开始指南
│   ├── PROJECT_SUMMARY.md                # 项目完成总结
│   └── STRUCTURE.md                      # 本文件
│
├── 📄 .nojekyll                          # GitHub Pages配置（空文件）
├── 📄 package.json                       # 项目元数据
│
└── 📄 .gitignore                         # Git忽略文件（可选）
    └── 忽略不需要提交的文件
```

---

## 文件详细说明

### 核心文件

#### `index.html` (约250行)
**作用**: 应用主入口
**包含**:
- 登录界面HTML
- 应用主界面框架
- 模块导航栏
- 模块容器
- Firebase SDK引入
- 主要JavaScript逻辑

#### `css/styles.css` (约500行)
**作用**: 全局样式管理
**包含**:
- CSS变量（颜色、间距）
- Glass Morphism样式
- 响应式网格和Flex布局
- 按钮和表单样式
- 导航栏和模块导航
- 登录界面样式
- 动画和过渡效果
- 移动端适配

### JavaScript模块

#### `js/firebase-config.js` (约12行)
**作用**: Firebase配置
**需要修改**: ✅ 是
**内容**:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

#### `js/auth-manager.js` (约40行)
**作用**: 处理用户认证
**关键方法**:
- `login()` - 使用Google账号登录
- `logout()` - 登出用户
- `onAuthStateChanged()` - 监听登录状态
- `getCurrentUser()` - 获取当前用户

#### `js/db-manager.js` (约80行)
**作用**: 管理Firestore数据库操作
**关键方法**:
- 任务操作: `addTask()`, `updateTask()`, `deleteTask()`, `onTasksSnapshot()`
- IELTS操作: `saveAnalysisData()`, `onAnalysisDataSnapshot()`, `getAnalysisData()`

### 功能模块

#### `modules/todolist.html` (约200行)
**作用**: 清单功能模块
**功能**:
- 任务显示和管理
- 添加新任务
- 完成/删除任务
- 实时数据同步
- 完成统计

#### `modules/ielts.html` (约800行)
**作用**: IELTS学习分析模块
**功能**:
- 听力和阅读成绩输入
- 学习笔记记录
- 成绩趋势可视化
- 用时监控
- 题材弱项分析
- 数据导入导出

### 文档文件

| 文件 | 行数 | 用途 | 优先级 |
|------|------|------|--------|
| README.md | ~150 | 项目介绍 | 中 |
| DEPLOYMENT.md | ~250 | 部署指南 | 🔴 高 |
| USAGE.md | ~400 | 使用手册 | 中 |
| QUICKSTART.md | ~200 | 快速开始 | 🔴 高 |
| PROJECT_SUMMARY.md | ~300 | 完成总结 | 低 |

---

## 数据库结构

### Firestore集合结构

```
Firebase Project
└── Firestore Database
    └── users/                          # 用户集合
        └── {userId}/                   # 按用户ID分文件夹
            ├── tasks/                  # 任务子集合
            │   ├── task1/
            │   │   ├── text: "任务内容"
            │   │   ├── completed: false
            │   │   └── createdAt: timestamp
            │   ├── task2/
            │   └── ...
            │
            └── ielts_data/             # IELTS数据子集合
                ├── 2026-01-01/
                │   ├── listening: [...]
                │   ├── reading: [...]
                │   ├── notes: "学习笔记"
                │   └── excluded: false
                ├── 2026-01-02/
                └── ...
```

### 本地存储结构

```
浏览器LocalStorage
└── ielts_study_tracker_v4_local    # IELTS数据缓存
    {
      "2026-01-01": {
        "listening": [...],
        "reading": [...],
        "notes": "...",
        "excluded": false
      },
      "2026-01-02": {...},
      ...
    }
```

---

## 文件大小估算

| 文件/文件夹 | 行数 | 大小 |
|-----------|------|------|
| index.html | ~250 | ~15KB |
| css/styles.css | ~500 | ~20KB |
| js/firebase-config.js | ~12 | <1KB |
| js/auth-manager.js | ~40 | ~2KB |
| js/db-manager.js | ~80 | ~4KB |
| modules/todolist.html | ~200 | ~12KB |
| modules/ielts.html | ~800 | ~45KB |
| 文档 | ~1200 | ~100KB |
| **总计** | **~3000+** | **~200KB** |

---

## 依赖关系图

```
index.html (主文件)
├── firebase SDK (CDN)
│   ├── firebase-app.js
│   ├── firebase-auth.js
│   └── firebase-firestore.js
├── firebase-config.js (配置)
├── auth-manager.js (认证类)
├── db-manager.js (数据库类)
├── css/styles.css (全局样式)
├── modules/todolist.html (模块1)
│   ├── styles.css
│   └── DOM操作
├── modules/ielts.html (模块2)
│   ├── styles.css
│   ├── chart.js (数据可视化)
│   └── DOM操作
└── 外部资源
    ├── Font Awesome (CDN) - 图标
    ├── Tailwind CSS (CDN) - 样式框架
    └── Chart.js (CDN) - 图表库
```

---

## 部署文件清单

部署到GitHub Pages时需要包含：

```
必需文件:
✅ index.html
✅ css/styles.css
✅ js/firebase-config.js
✅ js/auth-manager.js
✅ js/db-manager.js
✅ modules/todolist.html
✅ modules/ielts.html
✅ .nojekyll

可选文件:
⏺ README.md
⏺ DEPLOYMENT.md
⏺ USAGE.md
⏺ package.json

不需要部署:
❌ sample/ (参考用)
❌ node_modules/ (静态网站不需要)
❌ .git/ (自动忽略)
```

---

## 扩展点

### 易于添加新模块
```javascript
// 在index.html中添加新模块按钮
<button class="nav-item" data-module="new-module">新模块</button>

// 在modules/new-module.html中定义模块
<div id="module-new-module">...</div>

// 在index.html的loadModules()中加载
fetch('./modules/new-module.html')
  .then(res => res.text())
  .then(html => { ... })
```

### 易于修改样式
所有颜色都定义为CSS变量，修改非常方便：
```css
:root {
  --primary-blue: #3b82f6;
  --primary-indigo: #4f46e5;
  /* ... */
}
```

---

## 代码风格

### 命名规范
- HTML IDs: kebab-case (例: `task-input`)
- CSS类: kebab-case (例: `.glass-card`)
- JavaScript变量: camelCase (例: `currentUser`)
- JavaScript类: PascalCase (例: `AuthManager`)

### 代码组织
- 按功能分离（Authentication/Database）
- 模块化设计（独立的HTML/JS）
- 清晰的注释说明
- 一致的缩进（2空格）

---

## 版本控制

### 建议的Git提交信息格式
```
Initial setup: Multi-module learning platform
Add todolist module
Add IELTS analysis module
Fix: Firebase synchronization issue
Docs: Add deployment guide
```

### 推荐的分支管理
```
main (生产分支)
  ├── gh-pages (GitHub Pages分支，可选)
  └── develop (开发分支，可选)
```

---

## 性能指标

### 目标性能
- 首屏加载时间: < 2秒
- 模块切换: < 500ms
- 任务添加: < 1秒（网络延迟）
- Firebase同步延迟: < 3秒

### 优化建议
1. 启用浏览器缓存
2. 使用CDN加速CSS/JS库
3. 压缩HTML/CSS/JS
4. 优化图片大小
5. 使用Service Worker离线支持

---

## 安全考虑

### 已实现的安全措施
✅ Firebase Google认证  
✅ Firestore安全规则（UID隔离）  
✅ HTTPS传输（GitHub Pages）  
✅ 环境变量分离（firebase-config.js）  

### 后续可增强的安全措施
- [ ] CSP安全策略头
- [ ] CORS跨域配置
- [ ] API速率限制
- [ ] 定期安全审计

---

## 维护建议

### 定期检查
- [ ] Firebase使用配额
- [ ] 错误日志和异常
- [ ] 用户反馈
- [ ] 安全更新

### 备份策略
- [ ] 定期导出用户数据
- [ ] Firebase自动备份
- [ ] Git仓库备份

---

## 相关资源链接

### 项目文档
- [README.md](README.md) - 项目介绍
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南
- [USAGE.md](USAGE.md) - 使用手册

### 外部资源
- [Firebase官方文档](https://firebase.google.com/docs)
- [GitHub Pages指南](https://pages.github.com)
- [MDN Web文档](https://developer.mozilla.org)

---

## 快速参考

### 关键文件修改清单
```
必须修改:
□ js/firebase-config.js
  └── 替换为你的Firebase项目配置

可选修改:
□ package.json
  └── 更新项目信息
□ README.md
  └── 个性化项目描述
```

### 关键目录说明
```
css/        ← 修改样式的地方
js/         ← 修改逻辑的地方（大部分不需要改）
modules/    ← 修改功能模块的地方
sample/     ← 参考用，无需修改
```

---

**项目完成于**: 2026年1月17日
**最后更新**: 2026年1月17日
**版本**: 1.0.0
