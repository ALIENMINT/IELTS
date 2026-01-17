# 学习助手 - 多模块云端同步平台

这是一个基于Firebase和GitHub Pages的多模块学习平台，支持云端同步和离线使用。

## 功能特性

### 📝 清单模块 (Todolist)
- Google账号登录认证
- 实时任务同步
- 任务完成状态管理
- 云端数据持久化

### 📊 IELTS分析模块
- 雅思学习数据记录
- 听力和阅读成绩追踪
- 学习笔记记录
- 数据导入导出（Excel/TXT）
- 趋势分析和可视化

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (Vanilla)
- **云服务**: Firebase Authentication & Firestore
- **部署**: GitHub Pages (静态托管)
- **库**: 
  - Chart.js (数据可视化)
  - Font Awesome (图标)
  - Tailwind CSS (样式框架)

## 快速开始

### 前置要求
- GitHub账号
- Google账号（用于登录）
- Firebase项目（配置API密钥）

### 部署步骤

1. **Fork或克隆此仓库**
   ```bash
   git clone https://github.com/yourusername/ielts3.git
   cd ielts3
   ```

2. **配置Firebase密钥** (js/firebase-config.js)
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     // ... 其他配置
   };
   ```

3. **推送到GitHub**
   ```bash
   git add .
   git commit -m "初始化项目"
   git push origin main
   ```

4. **启用GitHub Pages**
   - 进入仓库Settings → Pages
   - 选择 "Deploy from a branch"
   - 选择 main 分支和 root 目录
   - 保存

5. **访问应用**
   - 您的应用将在 `https://yourusername.github.io/ielts3` 上线

## 项目结构

```
ielts3/
├── index.html              # 主入口文件
├── css/
│   └── styles.css         # 全局样式
├── js/
│   ├── firebase-config.js # Firebase配置
│   ├── auth-manager.js    # 认证管理
│   └── db-manager.js      # 数据库管理
├── modules/
│   ├── todolist.html      # 清单模块
│   └── ielts.html         # IELTS分析模块
└── sample/                # 原始样本文件（参考用）
    ├── Todolist.html
    └── analyse.html
```

## 使用指南

### 清单模块
1. 点击导航栏中的"清单"标签
2. 输入任务内容并点击"添加"
3. 点击任务左侧复选框标记完成
4. 点击垃圾桶图标删除任务
5. 所有数据自动同步到Firebase

### IELTS模块
1. 点击导航栏中的"IELTS"标签
2. **学情录入**标签：
   - 选择日期
   - 输入听力和阅读的题材与得分
   - 输入阅读用时
   - 记录学习笔记
3. **趋势分析**标签：
   - 查看成绩趋势曲线
   - 查看用时统计
   - 查看题材错题云图
4. **导出功能**：
   - Excel导出：保存所有数据
   - 笔记导出：保存为TXT文件

## 数据安全

- 所有数据存储在Firebase Firestore中
- 每个用户只能访问自己的数据（基于UID隔离）
- 支持离线使用（数据自动同步）
- Google认证确保账号安全

## 浏览器兼容性

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- 移动浏览器 ✅

## 常见问题

**Q: 数据会丢失吗？**
A: 不会。所有数据存储在Firebase云端，支持跨设备同步。

**Q: 可以离线使用吗？**
A: 可以。输入的数据会在设备本地缓存，联网后自动同步。

**Q: 如何导入之前的数据？**
A: IELTS模块支持Excel导入，保持格式一致即可。

## 支持与反馈

如有问题或建议，请提交Issue或联系开发者。

## 许可证

MIT License

---

**最后更新**: 2026年1月17日
