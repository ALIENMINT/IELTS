# 快速参考卡

## 🚀 快速部署（3步）

### 1️⃣ 配置Firebase密钥
编辑 `js/firebase-config.js`：
```javascript
const firebaseConfig = {
  apiKey: "你的KEY",
  authDomain: "你的项目.firebaseapp.com",
  projectId: "你的项目ID",
  // ... 复制其他配置
};
```

### 2️⃣ 推送到GitHub
```bash
git add .
git commit -m "Initial setup"
git push origin main
```

### 3️⃣ 启用GitHub Pages
Settings → Pages → 选择main分支 → 保存

✅ 完成！应用在 `https://username.github.io/ielts3` 上线

---

## 📁 项目结构一览

```
ielts3/
├── index.html              ← 主页面（入口）
├── css/styles.css          ← 全局样式
├── js/
│   ├── firebase-config.js  ← Firebase配置（需修改！）
│   ├── auth-manager.js     ← 登录管理
│   └── db-manager.js       ← 数据库操作
├── modules/
│   ├── todolist.html       ← 清单模块
│   └── ielts.html          ← IELTS分析模块
└── README.md / DEPLOYMENT.md / USAGE.md
```

---

## 💾 Firebase设置检查清单

- [ ] 创建Firebase项目
- [ ] 添加Web应用
- [ ] 启用Google认证
- [ ] 创建Firestore数据库
- [ ] 更新安全规则（保护用户数据）
- [ ] 复制config到 `firebase-config.js`
- [ ] 添加授权域：`yourusername.github.io`

---

## 🔄 数据同步流程

```
用户输入 → 本地保存 → Firebase同步 → 云端存储
   ↓                              ↓
 立即显示                   自动备份
   ↓                              ↓
其他设备 ← ← ← ← ← ← ← ← 实时同步
```

---

## 👥 用户数据隔离

每个Google账号有独立数据空间：
```
Firebase Database
├── users/
│   ├── user_id_1/
│   │   ├── tasks/     ← 用户1的任务
│   │   └── ielts_data/ ← 用户1的IELTS数据
│   ├── user_id_2/
│   │   ├── tasks/     ← 用户2的任务
│   │   └── ielts_data/ ← 用户2的IELTS数据
```

安全规则确保每个用户只能访问自己的数据。

---

## 🎯 功能对比

| 功能 | 清单模块 | IELTS模块 |
|------|--------|----------|
| 云端同步 | ✅ | ✅ |
| 实时更新 | ✅ | ✅ |
| 数据导出 | ❌ | ✅ Excel/TXT |
| 数据导入 | ❌ | ✅ Excel |
| 离线使用 | ✅ | ✅ |
| 多设备同步 | ✅ | ✅ |

---

## 🐛 常见问题速解

| 问题 | 原因 | 解决 |
|------|------|------|
| 登不上 | Firebase配置错 | 检查js/firebase-config.js |
| 页面空白 | 模块加载失败 | 检查modules/目录文件是否存在 |
| 数据不保存 | 未登录或网络问题 | 检查顶部用户显示，验证网络 |
| 样式错乱 | CSS没加载 | 检查css/styles.css路径 |

---

## 📞 获取帮助

1. 🔍 检查浏览器控制台（F12 → Console）
2. 📖 查看 DEPLOYMENT.md 部署指南
3. 📚 查看 USAGE.md 使用手册
4. 🆘 提交GitHub Issue

---

## 🔐 安全建议

1. ✅ **定期更新Firebase规则** - 防止数据泄露
2. ✅ **只在HTTPS上使用** - GitHub Pages默认HTTPS
3. ✅ **定期备份数据** - 使用Excel导出功能
4. ✅ **监控异常登录** - 注意账号访问历史

---

## 📱 浏览器兼容性

| 浏览器 | 支持 | 备注 |
|--------|------|------|
| Chrome | ✅ | 推荐 |
| Firefox | ✅ | 完全支持 |
| Safari | ✅ | iOS 12+ |
| Edge | ✅ | 基于Chromium |
| 手机浏览器 | ✅ | 响应式设计 |

---

## 🎓 学习路径建议

### 第一周
- 使用清单模块组织日常任务
- 熟悉模块切换
- 测试同步功能

### 第二周
- 开始使用IELTS模块记录练习
- 积累数据（至少5天）
- 查看初步的趋势分析

### 第三周+
- 根据弱项云图有针对地复习
- 定期导出数据分析
- 利用趋势图表指导学习

---

## 🚀 下一步行动

```
现在：
1. 修改 firebase-config.js
2. 推送代码到GitHub
3. 启用GitHub Pages

测试：
4. 访问应用URL
5. 用Google账号登录
6. 测试添加任务和数据

优化：
7. 根据USAGE.md优化工作流
8. 定期备份导出数据
9. 根据需求扩展功能
```

---

## 📊 使用统计示例

```
你的学习数据可能看起来这样：

日期        听力    阅读    总分
2026-01-01  26/40   28/40   54/80  Band 6.5
2026-01-02  28/40   30/40   58/80  Band 7.0
2026-01-03  30/40   31/40   61/80  Band 7.0
2026-01-04  32/40   32/40   64/80  Band 7.5  ← 进步！
2026-01-05  31/40   33/40   64/80  Band 7.5

趋势：显著进步！✨
```

---

## 🎉 准备好了吗？

按照以下顺序：

1. 阅读 `DEPLOYMENT.md` 了解部署细节
2. 修改 `firebase-config.js` 添加你的Firebase配置
3. 推送代码到GitHub
4. 启用GitHub Pages
5. 打开应用URL开始使用
6. 根据 `USAGE.md` 了解详细用法

祝你使用愉快！🚀

---

**最后更新**: 2026年1月17日
**版本**: 1.0.0
