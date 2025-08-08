# ⚡ Duckfolio Workers 快速开始

## 🚀 5分钟部署指南

### 1. 安装工具
```bash
# 安装 Node.js (如果没有)
# 下载: https://nodejs.org/

# 验证
node --version
npm --version
```

### 2. 登录 Cloudflare
```bash
npx wrangler login
```

### 3. 创建 KV 存储
```bash
npx wrangler kv namespace create DUCKFOLIO_CONFIG
```

### 4. 获取并更新配置
```bash
# 获取 Namespace ID
npx wrangler kv namespace list

# 编辑 wrangler.toml，替换 YOUR_NAMESPACE_ID
# 将 id = "REPLACE_WITH_NAMESPACE_ID" 改为你的实际 ID
```

### 5. 设置你的配置
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

### 6. 本地测试
```bash
npx wrangler dev
```
访问: http://127.0.0.1:8787/

### 7. 部署
```bash
npx wrangler deploy
```

### 8. 访问你的网站
你的网站地址: `https://duckfolio.your-subdomain.workers.dev`

## 🔧 自定义配置

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

## 🎯 下一步

- 📖 查看完整教程: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🔄 设置自动部署: 配置 GitHub Actions
- 🌐 绑定自定义域名
- 📊 监控网站性能

---

**�� 完成！你的个人主页已经上线了！**
