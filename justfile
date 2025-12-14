# justfile for gam_web project

# 设置 Node.js 选项以支持旧版 OpenSSL
export NODE_OPTIONS := "--openssl-legacy-provider"

# 默认命令：显示所有可用命令
default:
    @just --list

# 安装依赖
install:
    yarn install

# 开发模式启动
start:
    UMI_ENV=dev yarn umi dev

# 开发模式启动（带环境变量）
dev:
    REACT_APP_ENV=dev MOCK=none UMI_ENV=dev yarn umi dev

# 开发模式启动（无 mock）
start-no-mock:
    MOCK=none UMI_ENV=dev yarn umi dev

# 开发模式启动（无 UI）
start-no-ui:
    UMI_UI=none UMI_ENV=dev yarn umi dev

# 预发布环境启动
start-pre:
    REACT_APP_ENV=pre UMI_ENV=dev yarn umi dev

# 测试环境启动
start-test:
    REACT_APP_ENV=test MOCK=none UMI_ENV=dev yarn umi dev

# 构建生产版本
build:
    yarn umi build

# 分析构建包大小
analyze:
    ANALYZE=1 yarn umi build

# 运行所有 lint 检查
lint:
    yarn umi g tmp
    @just lint-js
    @just lint-style
    @just lint-prettier

# JavaScript/TypeScript lint 检查
lint-js:
    eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src

# JavaScript/TypeScript lint 修复
lint-fix:
    eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src
    @just lint-style

# Prettier 检查
lint-prettier:
    prettier --check "src/**/*" --end-of-line auto

# Style lint 修复
lint-style:
    stylelint --fix "src/**/*.less" --syntax less

# 格式化代码
prettier:
    prettier -c --write "src/**/*"

# TypeScript 类型检查
tsc:
    tsc --noEmit

# 运行测试
test:
    yarn umi test

# 运行所有测试
test-all:
    node ./tests/beforeTest
    node ./tests/run-tests.js

# 运行组件测试
test-component:
    yarn umi test ./src/components

# 清理构建产物
clean:
    rm -rf dist

# 清理 node_modules 和构建产物
clean-all:
    rm -rf node_modules dist

# 重新安装依赖
reinstall: clean-all install

# 生成临时文件
postinstall:
    yarn umi g tmp

# 国际化：移除中文
i18n-remove:
    pro i18n-remove --locale=zh-CN --write

# 获取区块
fetch-blocks:
    pro fetch-blocks
    @just prettier

# 部署到 GitHub Pages
deploy: build
    gh-pages -d dist

# 更新浏览器列表数据库
update-browserslist:
    yarn dlx browserslist@latest --update-db

# 开发：清理并重新启动
fresh-start: clean postinstall dev

# === Docker 相关命令 ===

# 构建 Docker 镜像
docker-build:
    docker build -t gam_web:latest .

# 运行 Docker 容器（生产模式）
docker-run:
    docker run -d -p 8080:80 --name gam_web gam_web:latest

# 停止 Docker 容器
docker-stop:
    docker stop gam_web || true
    docker rm gam_web || true

# 使用 Docker Compose 启动（生产模式）
docker-up:
    docker-compose up -d web

# 使用 Docker Compose 启动（开发模式）
docker-dev:
    docker-compose up dev

# 停止 Docker Compose 服务
docker-down:
    docker-compose down

# 查看 Docker 日志
docker-logs:
    docker-compose logs -f web

# 重新构建并启动
docker-rebuild: docker-down docker-build docker-up

# 清理 Docker 资源
docker-clean:
    docker-compose down -v
    docker rmi gam_web:latest || true
