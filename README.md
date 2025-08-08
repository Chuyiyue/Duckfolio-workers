# 🦆 Duckfolio Workers

**Duckfolio Workers** 是一个基于 Cloudflare Workers 的个人主页项目，将 [Duckfolio](https://github.com/Chuyiyue/Duckfolio) 上游项目适配为完全运行在 Workers 环境的静态站点。

## ✨ 项目特色

- 🚀 **零服务器成本** - 完全运行在 Cloudflare Workers 免费额度内
- ⚡ **极速加载** - 全球 CDN 分发，毫秒级响应
- 🎨 **现代设计** - 基于 Next.js 15 + Tailwind CSS 4 构建
- 🌗 **主题切换** - 支持深色/浅色主题自动切换
- 💫 **流畅动画** - 使用 Framer Motion 实现自然过渡
- 🔧 **动态配置** - 支持通过 KV 存储或环境变量实时更新配置
- 📱 **完全响应式** - 适配所有设备尺寸

## 🖼️ 页面预览

### 首页 - Profile
![Profile Preview](https://blog.yorlg.it/wp-content/uploads/2025/05/Duckfolio-Profile.png)

### 链接页 - Links
![Links Preview](https://blog.yorlg.it/wp-content/uploads/2025/05/Duckfolio-Links.png)

## 🚀 快速部署

### 方式一：界面化部署（推荐小白用户）

#### 1. 准备项目文件
1. 下载或克隆本项目到本地
2. 确保项目结构完整（包含 `site/` 目录和 `worker.js`）

#### 2. 构建静态文件
```bash
# 进入 site 目录
cd site

# 安装依赖
npm install

# 构建静态文件
npm run build
```

构建完成后，`site/out/` 目录会包含所有静态文件。

#### 3. 在 Cloudflare Dashboard 中部署

##### 步骤 1：创建 Workers 项目
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击左侧菜单的 **Workers & Pages**
3. 点击 **Create application**
4. 选择 **Create Worker**
5. 输入项目名称（如：`duckfolio`）
6. 点击 **Deploy**

##### 步骤 2：上传静态文件
1. 在 Workers 项目页面，点击 **Settings** 标签
2. 找到 **Assets** 部分
3. 点击 **Upload assets**
4. 选择 `site/out/` 目录中的所有文件
5. 点击 **Upload**

##### 步骤 3：配置 Worker 代码
1. 在 **Code** 标签页中
2. 将 `worker.js` 的内容复制粘贴到编辑器中
3. 点击 **Save and deploy**

##### 步骤 4：配置 KV 存储（可选）
1. 在 **Settings** 标签页中
2. 找到 **KV Namespace Bindings**
3. 点击 **Add binding**
4. 变量名输入：`DUCKFOLIO_CONFIG`
5. 选择或创建 KV Namespace
6. 点击 **Save**

##### 步骤 5：添加配置数据
1. 在 **Workers & Pages** 页面
2. 点击你的 KV Namespace
3. 点击 **Add entry**
4. Key 输入：`platform-config`
5. Value 输入你的配置 JSON：
```json
{
  "site": {
    "name": "我的个人主页",
    "title": "你的名字",
    "avatar": "https://example.com/avatar.jpg"
  },
  "links": {
    "github": "https://github.com/yourusername",
    "x": "https://x.com/yourusername",
    "email": "mailto:your@email.com"
  }
}
```

##### 步骤 6：访问你的网站
你的网站地址：`https://duckfolio.your-subdomain.workers.dev`

### 方式二：命令行部署（推荐开发者）

#### 1. 安装工具
```bash
# 安装 Node.js
# 下载地址: https://nodejs.org/

# 验证安装
node --version
npm --version
```

#### 2. 登录 Cloudflare
```bash
npx wrangler login
```

#### 3. 创建 KV 存储
```bash
npx wrangler kv namespace create DUCKFOLIO_CONFIG
```

#### 4. 更新配置
```bash
# 获取 Namespace ID
npx wrangler kv namespace list

# 编辑 wrangler.toml，替换 YOUR_NAMESPACE_ID
```

#### 5. 设置配置数据
```bash
npx wrangler kv key put --binding=DUCKFOLIO_CONFIG platform-config '{
  "site": {
    "name": "我的个人主页",
    "title": "你的名字",
    "avatar": "https://example.com/avatar.jpg"
  },
  "links": {
    "github": "https://github.com/yourusername",
    "x": "https://x.com/yourusername",
    "email": "mailto:your@email.com"
  }
}'
```

#### 6. 本地测试
```bash
npx wrangler dev
```

#### 7. 部署
```bash
npx wrangler deploy
```

## ⚙️ 配置说明

### 支持的链接平台
- `github` - GitHub
- `x` / `twitter` - X (Twitter)
- `email` / `mail` - 邮箱
- 其他平台会自动生成默认图标

### 配置示例
```json
{
  "site": {
    "name": "欢迎语",
    "title": "你的名字",
    "avatar": "头像URL"
  },
  "links": {
    "github": "https://github.com/username",
    "x": "https://x.com/username",
    "email": "mailto:your@email.com",
    "telegram": "https://t.me/username",
    "weibo": "https://weibo.com/username"
  }
}
```

## 🔧 高级功能

### 配置优先级
1. **KV 存储** (最高优先级)
2. **环境变量** (中等优先级)
3. **静态文件** (最低优先级)

### 环境变量配置
在 Cloudflare Dashboard 的 Workers 设置中添加环境变量：
- `SITE_NAME` - 站点名称
- `SITE_TITLE` - 页面标题
- `AVATAR_URL` - 头像URL
- `LINK_GITHUB` - GitHub链接
- `LINK_X` - X链接
- `LINK_EMAIL` - 邮箱链接

## 📚 详细文档

- 📖 [完整部署教程](./DEPLOYMENT.md)
- ⚡ [快速开始指南](./QUICKSTART.md)
- 🔄 [自动部署配置](./.github/workflows/deploy.yml)

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| [Cloudflare Workers](https://developers.cloudflare.com/workers/) | 边缘计算平台 |
| [Next.js](https://nextjs.org/) | React 框架 |
| [Tailwind CSS](https://tailwindcss.com/) | 样式框架 |
| [Framer Motion](https://www.framer.com/motion/) | 动画库 |
| [Zustand](https://github.com/pmndrs/zustand) | 状态管理 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- 上游项目：[Duckfolio](https://github.com/Chuyiyue/Duckfolio)
- 图标：[Lucide Icons](https://lucide.dev/)
- UI 组件：[Shadcn UI](https://ui.shadcn.com/)

---

**🎉 开始构建你的个人主页吧！**