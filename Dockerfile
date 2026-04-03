# ============ 1. 基礎依賴階段 ============
FROM node:24-alpine AS base-deps
WORKDIR /app
COPY package.json yarn.lock ./
# 自動複製所有 apps 下的 package.json (保持 monorepo 結構)
COPY apps/ ./apps/
# 過濾掉不需要的檔案，只安裝依賴
RUN yarn install --frozen-lockfile

# ============ 2. 通用編譯階段 ============
FROM base-deps AS builder
ARG APP_NAME
COPY apps/${APP_NAME} ./apps/${APP_NAME}
# 執行該專案的 build
RUN cd apps/${APP_NAME} && NODE_OPTIONS=--openssl-legacy-provider yarn build

# ============ 3. 最終 Nginx 階段 ============
FROM nginx:alpine AS runner
ARG APP_NAME
# 從 builder 階段動態複製 dist
# 注意：這裡假設你的 build 產出都在 apps/專案名/dist
COPY --from=builder /app/apps/${APP_NAME}/dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]