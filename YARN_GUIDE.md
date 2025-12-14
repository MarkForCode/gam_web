# Yarn 使用指南

本项目已从 npm 迁移到 yarn 作为包管理器。

## ✅ 已完成的迁移

1. ✅ 生成了 `yarn.lock` 文件
2. ✅ 删除了 `package-lock.json`
3. ✅ 更新了 `justfile` 中的所有命令
4. ✅ 更新了 `package.json` 中的脚本
5. ✅ 更新了 `Dockerfile` 和 `docker-compose.yml`

## 🚀 常用命令对比

### 安装依赖

```bash
# npm
npm install

# yarn
yarn
# 或
yarn install
```

### 添加依赖

```bash
# npm
npm install lodash

# yarn
yarn add lodash
```

### 添加开发依赖

```bash
# npm
npm install --save-dev webpack

# yarn
yarn add --dev webpack
# 或
yarn add -D webpack
```

### 删除依赖

```bash
# npm
npm uninstall lodash

# yarn
yarn remove lodash
```

### 运行脚本

```bash
# npm
npm run build
npm run dev

# yarn
yarn build
yarn dev
```

### 全局安装

```bash
# npm
npm install -g create-react-app

# yarn
yarn global add create-react-app
```

## 📦 使用 just 命令（推荐）

项目配置了 just 命令，所有常用操作都可以通过 just 执行：

```bash
# 安装依赖
just install

# 开发
just start
just dev

# 构建
just build
just analyze

# 测试
just test
just test-all

# 代码检查
just lint
just lint-fix
just prettier

# Docker
just docker-build
just docker-up

# 查看所有命令
just --list
```

## ⚡ Yarn 优势

### 1. 更快的安装速度
- 并行安装包
- 离线模式（缓存已安装的包）
- 更高效的依赖解析

### 2. 更可靠
- `yarn.lock` 确保团队成员安装相同版本
- `--frozen-lockfile` 在 CI/CD 中确保依赖一致性

### 3. 更好的用户体验
- 更清晰的输出信息
- 更友好的错误提示
- 交互式升级工具

### 4. Workspaces 支持
- 原生支持 monorepo
- 更好的多包管理

## 🔧 Yarn 配置

### 设置淘宝镜像（中国用户）

```bash
# 查看当前镜像
yarn config get registry

# 设置淘宝镜像
yarn config set registry https://registry.npmmirror.com

# 恢复官方镜像
yarn config set registry https://registry.yarnpkg.com
```

### 查看配置

```bash
# 查看所有配置
yarn config list

# 查看特定配置
yarn config get <key>

# 设置配置
yarn config set <key> <value>
```

## 📝 常见问题

### Q: 如何清理缓存？

```bash
yarn cache clean
```

### Q: 如何查看已安装的包？

```bash
# 列出所有依赖
yarn list

# 列出顶层依赖
yarn list --depth=0

# 检查特定包
yarn why lodash
```

### Q: 如何升级依赖？

```bash
# 交互式升级
yarn upgrade-interactive

# 升级所有依赖到最新版本
yarn upgrade

# 升级特定包
yarn upgrade lodash
```

### Q: 如何检查过时的包？

```bash
yarn outdated
```

### Q: 安装时遇到权限问题？

```bash
# 不要使用 sudo
# 而是配置 yarn 全局目录
yarn config set prefix ~/.yarn
```

### Q: CI/CD 中如何使用？

```bash
# 使用 frozen-lockfile 确保依赖一致
yarn install --frozen-lockfile

# 在 Docker 中
yarn install --frozen-lockfile --production
```

## 🔄 回退到 npm（如需要）

如果需要回退到 npm：

```bash
# 1. 删除 yarn.lock 和 node_modules
rm -rf yarn.lock node_modules

# 2. 使用 npm 重新安装
npm install

# 3. 更新 justfile 中的命令（将 yarn 改回 npm）
```

## 📚 更多信息

- [Yarn 官方文档](https://yarnpkg.com/)
- [Yarn CLI 命令](https://yarnpkg.com/cli)
- [Yarn vs npm](https://yarnpkg.com/getting-started/migration)

## 💡 提示

1. **提交 yarn.lock** - 始终将 `yarn.lock` 提交到版本控制
2. **不要混用** - 不要在同一项目中混用 npm 和 yarn
3. **CI/CD** - 在 CI/CD 中使用 `--frozen-lockfile` 标志
4. **缓存** - 在 CI/CD 中缓存 `~/.cache/yarn` 以加速构建
