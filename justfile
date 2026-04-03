# justfile for GAM Monorepo Project
# Commands for managing the monorepo with separate backstage and user-web apps

# 设置 Node.js 选项以支持旧版 OpenSSL
export NODE_OPTIONS := "--openssl-legacy-provider"

# 默认命令：显示所有可用命令
default:
    @just --list

# ============ 工作区管理 ============

# 安装依赖（所有工作区）
install:
    yarn bootstrap

# 清理所有工作区
clean:
    yarn clean

# 重新安装依赖
reinstall: clean install

# ============ 开发命令 ============

# 启动所有应用（用户Web + 后台管理）
dev:
    yarn dev

# 启动用户 Web 应用（端口 8080）
dev-user:
    yarn dev:user-web

# 启动后台管理应用（端口 8081）
dev-backstage:
    yarn dev:backstage

# ============ 构建命令 ============

# 构建所有应用
build:
    yarn build

# 构建用户 Web 应用
build-user:
    yarn build:user-web

# 构建后台管理应用
build-backstage:
    yarn build:backstage

# ============ Lint 和格式化 ============

# 运行所有 lint 检查
lint:
    yarn lint

# 修复 lint 问题
lint-fix:
    yarn lint:fix

# ============ 测试 ============

# 运行测试
test:
    yarn test

# ============ Docker 相关命令（单应用） ============

# 构建用户 Web Docker 镜像
docker-build-user:
    docker build --target nginx-user-web --build-arg APP=user-web -t gam-user-web:latest .

# 构建后台管理 Docker 镜像
docker-build-backstage:
    docker build --target nginx-cms --build-arg APP=cms -t gam-cms:latest .

# 构建所有 Docker 镜像
docker-build-all: docker-build-user docker-build-backstage
    @echo "✅ 所有 Docker 镜像构建完成"

# 运行用户 Web 容器
docker-run-user:
    docker run -d -p 8080:8080 --name gam-user-web gam-user-web:latest

# 运行后台管理容器
docker-run-backstage:
    docker run -d -p 8081:8081 --name gam-backstage gam-backstage:latest

# 停止用户 Web 容器
docker-stop-user:
    docker stop gam-user-web || true
    docker rm gam-user-web || true

# 停止后台管理容器
docker-stop-backstage:
    docker stop gam-backstage || true
    docker rm gam-backstage || true

# 停止所有应用容器
docker-stop-all: docker-stop-user docker-stop-backstage
    @echo "✅ 所有容器已停止"

# ============ Docker Compose 相关命令 ============

# 使用 Docker Compose 启动所有服务
docker-up:
    docker compose up -d

# 使用 Docker Compose 启动用户 Web
docker-up-user:
    docker compose up -d user-web

# 使用 Docker Compose 启动后台管理
docker-up-backstage:
    docker compose up -d backstage

# 停止 Docker Compose 服务
docker-down:
    docker compose down --rmi local

# 查看所有日志
docker-logs:
    docker compose logs -f

# 查看用户 Web 日志
docker-logs-user:
    docker compose logs -f user-web

# 查看后台管理日志
docker-logs-backstage:
    docker compose logs -f backstage

# 重新构建并启动（Docker Compose）
docker-rebuild: docker-down docker-build-all docker-up
    @echo "✅ 所有服务已重新构建并启动"

# 清理所有 Docker 资源
docker-clean:
    docker compose down -v
    docker rmi gam-user-web:latest gam-cms:latest || true
    @echo "✅ Docker 资源已清理"
