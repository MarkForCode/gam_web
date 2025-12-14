# Just 命令使用说明

本项目使用 [just](https://github.com/casey/just) 作为命令运行器，替代传统的 npm scripts。

## 安装 just

如果尚未安装 just，可以使用以下命令：

```bash
# Linux/macOS
curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | bash -s -- --to ~/.local/bin

# 或使用包管理器
# macOS
brew install just

# Ubuntu/Debian
apt install just

# Arch Linux
pacman -S just
```

将 `~/.local/bin` 添加到 PATH：
```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## 常用命令

### 查看所有可用命令
```bash
just
# 或
just --list
```

### 开发相关
```bash
just install          # 安装依赖
just start            # 启动开发服务器
just dev              # 启动开发服务器（带环境变量）
just start-no-mock    # 启动开发服务器（无 mock）
just start-pre        # 预发布环境
just start-test       # 测试环境
```

### 构建相关
```bash
just build            # 构建生产版本
just analyze          # 分析构建包大小
just clean            # 清理构建产物
```

### 代码质量
```bash
just lint             # 运行所有 lint 检查
just lint-js          # JavaScript/TypeScript lint
just lint-fix         # 自动修复 lint 问题
just prettier         # 格式化代码
just tsc              # TypeScript 类型检查
```

### 测试
```bash
just test             # 运行测试
just test-all         # 运行所有测试
just test-component   # 运行组件测试
```

### 其他
```bash
just clean-all        # 清理 node_modules 和构建产物
just reinstall        # 重新安装依赖
just fresh-start      # 清理并重新启动开发服务器
just deploy           # 部署到 GitHub Pages
just update-browserslist  # 更新浏览器列表数据库
```

## 优势

相比 npm scripts，使用 just 的优势：

1. **更快的启动速度** - just 是原生编译的，启动速度比 Node.js 快
2. **更好的语法** - 支持变量、条件、循环等
3. **更清晰的输出** - 自动显示执行的命令
4. **跨平台兼容** - Windows/Linux/macOS 一致的体验
5. **更易于维护** - 配方（recipes）比 JSON 更易读

## 环境变量

项目自动设置了 `NODE_OPTIONS=--openssl-legacy-provider` 以支持 Node.js v17+ 版本。
