# 多阶段构建 Dockerfile
FROM node:16-alpine AS builder

# 设置工作目录
WORKDIR /app

# 设置 Node.js 选项以支持旧版 OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider

# 复制 package 文件
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN yarn build

# 生产阶段
FROM nginx:alpine

# 复制 nginx 配置
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
