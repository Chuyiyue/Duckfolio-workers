# 🚀 Duckfolio Workers 部署教程

本教程将指导你如何将 Duckfolio 项目部署到 Cloudflare Workers，实现静态站点托管与动态配置管理。

## 📋 前置要求

### 1. 安装必要工具
```bash
# 安装 Node.js (推荐 v18+)
# 下载地址: https://nodejs.org/

# 验证安装
node --version
npm --version
```

### 2. 安装 Wrangler CLI
```bash
npm install -g wrangler
# 或者使用 npx (推荐)
npx wrangler --version
```

### 3. 登录 Cloudflare
```bash
npx wrangler login
```

## 🔧 本地开发

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd Duckfolio-workers
```

### 2. 安装依赖
```bash
npm --prefix site install
```

### 3. 本地开发
```bash
npx wrangler dev
```

访问 `http://127.0.0.1:8787/` 查看效果

## 🗄️ 配置 KV 存储

### 1. 创建 KV Namespace
```bash
npx wrangler kv namespace create DUCKFOLIO_CONFIG
```

### 2. 获取 Namespace ID
```bash
npx wrangler kv namespace list
```

### 3. 更新 wrangler.toml
将获取到的 Namespace ID 替换 `wrangler.toml` 中的：
```toml
[[kv_namespaces]]
binding = "DUCKFOLIO_CONFIG"
id = "YOUR_NAMESPACE_ID_HERE"  # 替换这里
preview_id = "local-preview-id"
```

### 4. 配置 KV 数据
```bash
# 方式1: 通过命令行
npx wrangler kv key put --binding=DUCKFOLIO_CONFIG platform-config '{
  "site": {
    "name": "我的个人主页",
    "title": "张三",
    "avatar": "https://example.com/avatar.jpg"
  },
  "links": {
    "github": "https://github.com/yourusername",
    "x": "https://x.com/yourusername",
    "email": "mailto:your@email.com"
  }
}'

# 方式2: 通过文件
npx wrangler kv key put --binding=DUCKFOLIO_CONFIG platform-config --file=platform-config.json
```

## 🌐 部署到 Cloudflare Workers

### 1. 部署
```bash
npx wrangler deploy
```

### 2. 验证部署
访问你的 Workers URL: `https://duckfolio.your-subdomain.workers.dev`

### 3. 自定义域名 (可选)
```bash
# 添加自定义域名
npx wrangler domain add your-domain.com
```

## ⚙️ 配置管理

### 1. 环境变量配置
在 `wrangler.toml` 中设置：
```toml
[vars]
SITE_NAME = "我的个人主页"
SITE_TITLE = "张三"
AVATAR_URL = "https://example.com/avatar.jpg"
LINK_GITHUB = "https://github.com/yourusername"
LINK_X = "https://x.com/yourusername"
LINK_EMAIL = "mailto:your@email.com"
```

### 2. 配置优先级
1. **KV 存储** (最高优先级)
2. **环境变量** (中等优先级)
3. **静态文件** (最低优先级)

### 3. 更新配置
```bash
# 更新 KV 配置
npx wrangler kv key put --binding=DUCKFOLIO_CONFIG platform-config '{"site":{"name":"新名称"}}'

# 重新部署
npx wrangler deploy
```

## 🔄 持续部署

### 1. GitHub Actions (推荐)
创建 `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm --prefix site install
        
      - name: Build site
        run: npm --prefix site run build
        
      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

### 2. 设置 Secrets
在 GitHub 仓库设置中添加：
- `CLOUDFLARE_API_TOKEN`: 你的 Cloudflare API Token

## 🐛 故障排除

### 1. 构建失败
```bash
# 清理缓存
rm -rf site/.next site/out
npm --prefix site run build
```

### 2. KV 配置问题
```bash
# 查看当前配置
npx wrangler kv key get --binding=DUCKFOLIO_CONFIG platform-config

# 删除配置重新设置
npx wrangler kv key delete --binding=DUCKFOLIO_CONFIG platform-config
```

### 3. 权限问题
确保你的 API Token 有足够权限：
- Workers Scripts:Edit
- Workers KV Storage:Edit
- Account Settings:Read

## 📊 监控与分析

### 1. 查看日志
```bash
npx wrangler tail
```

### 2. 性能监控
在 Cloudflare Dashboard 中查看：
- Workers 执行时间
- KV 读取次数
- 错误率

## 🔧 高级配置

### 1. 自定义路由
在 `worker.js` 中添加：
```javascript
if (url.pathname === "/api/health") {
  return new Response("OK", { status: 200 });
}
```

### 2. 缓存策略
```javascript
// 在 worker.js 中设置缓存头
headers: {
  "cache-control": "public, max-age=3600",
}
```

### 3. 环境分离
```toml
# wrangler.toml
[env.production]
name = "duckfolio-prod"

[env.staging]
name = "duckfolio-staging"
```

## 📚 参考资源

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [KV 存储文档](https://developers.cloudflare.com/workers/runtime-apis/kv/)

## 🆘 获取帮助

如果遇到问题：
1. 查看 [Cloudflare Workers 社区](https://community.cloudflare.com/)
2. 检查 [GitHub Issues](https://github.com/your-repo/issues)
3. 查看 Workers 日志: `npx wrangler tail`

---

**🎉 恭喜！你的 Duckfolio 现在已经成功部署到 Cloudflare Workers 了！**
