# Docker 部署指南

本项目支持使用 Docker 进行容器化部署。

## 📦 文件说明

- `Dockerfile` - 多阶段构建配置，生产环境使用 Nginx 提供服务
- `nginx.conf` - Nginx 服务器配置
- `docker-compose.yml` - Docker Compose 编排配置
- `.dockerignore` - Docker 构建忽略文件

## 🚀 快速开始

### 方式一：使用 just 命令（推荐）

```bash
# 构建并启动生产环境
just docker-build
just docker-run

# 或使用 Docker Compose
just docker-up

# 开发模式（带热重载）
just docker-dev

# 查看日志
just docker-logs

# 停止服务
just docker-stop
# 或
just docker-down

# 重新构建
just docker-rebuild

# 清理所有 Docker 资源
just docker-clean
```

### 方式二：直接使用 Docker 命令

#### 生产环境部署

```bash
# 1. 构建镜像
docker build -t gam_web:latest .

# 2. 运行容器
docker run -d -p 8080:80 --name gam_web gam_web:latest

# 3. 访问应用
# 打开浏览器访问 http://localhost:8080
```

#### 使用 Docker Compose

```bash
# 生产模式
docker-compose up -d web

# 开发模式（支持热重载）
docker-compose up dev

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## 🏗️ 构建说明

### 多阶段构建

Dockerfile 使用多阶段构建优化镜像大小：

1. **构建阶段** - 使用 Node.js 16 Alpine 镜像编译应用
2. **生产阶段** - 使用轻量级 Nginx Alpine 镜像提供服务

### 镜像大小优化

- 使用 Alpine Linux 基础镜像（体积小）
- 多阶段构建，只保留必要的生产文件
- 使用 npm ci 代替 npm install（更快、更可靠）
- .dockerignore 排除不必要的文件

## 🔧 配置说明

### 端口映射

- **生产模式**: 8080:80（主机端口:容器端口）
- **开发模式**: 8000:8000

可以在 `docker-compose.yml` 中修改端口映射。

### 环境变量

在 `docker-compose.yml` 中可以配置环境变量：

```yaml
environment:
  - NODE_ENV=production
  - API_URL=https://api.example.com
```

### Nginx 配置

`nginx.conf` 包含以下特性：

- ✓ Gzip 压缩
- ✓ 静态资源缓存
- ✓ React Router History 模式支持
- ✓ 安全响应头
- ✓ API 代理配置（可选）

如需代理 API 请求，取消注释 nginx.conf 中的代理配置部分。

## 📊 资源使用

### 镜像大小

- 最终镜像大小：约 50-60 MB（Nginx + 构建产物）
- 构建缓存：约 500 MB（包含 Node.js 和依赖）

### 性能

- 启动时间：< 5 秒
- 内存占用：约 10-20 MB（Nginx）

## 🔍 故障排查

### 构建失败

```bash
# 清理 Docker 缓存
docker builder prune -f

# 无缓存重新构建
docker build --no-cache -t gam_web:latest .
```

### 容器无法启动

```bash
# 查看容器日志
docker logs gam_web

# 或使用 Compose
docker-compose logs web
```

### 端口被占用

修改 `docker-compose.yml` 中的端口映射：

```yaml
ports:
  - "8081:80"  # 修改主机端口
```

## 🌐 生产环境部署

### 使用环境变量

创建 `.env` 文件：

```env
NODE_ENV=production
API_URL=https://api.production.com
PORT=8080
```

### 使用自定义域名

修改 `nginx.conf` 中的 `server_name`：

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    # ...
}
```

### 添加 HTTPS

使用反向代理（如 Traefik、Nginx Proxy Manager）或修改 Dockerfile 添加 SSL 证书。

## 📝 开发模式说明

开发模式使用卷挂载实现热重载：

```bash
# 启动开发容器
just docker-dev

# 或
docker-compose up dev
```

代码修改会自动重新编译，无需重启容器。

## 🔒 安全建议

1. 不要在镜像中包含敏感信息（使用环境变量）
2. 定期更新基础镜像
3. 使用非 root 用户运行（生产环境）
4. 启用 HTTPS
5. 配置防火墙规则

## 📚 更多信息

- [Docker 官方文档](https://docs.docker.com/)
- [Nginx 官方文档](https://nginx.org/en/docs/)
- [Node.js Docker 最佳实践](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
