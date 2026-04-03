# ============ 1. 基礎依賴階段 (快取層) ============
FROM node:24-alpine AS base-deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY apps/cms/package.json ./apps/cms/
COPY apps/user-web/package.json ./apps/user-web/
RUN yarn install --frozen-lockfile

# ============ 2. CMS 編譯階段 ============
FROM base-deps AS build-cms
COPY apps/cms ./apps/cms
RUN cd apps/cms && NODE_OPTIONS=--openssl-legacy-provider yarn build

# ============ 3. User-Web 編譯階段 ============
FROM base-deps AS build-user-web
COPY apps/user-web ./apps/user-web
RUN cd apps/user-web && NODE_OPTIONS=--openssl-legacy-provider yarn build

# ============ 4. CMS Nginx 階段 ============
FROM nginx:alpine AS nginx-cms
COPY --from=build-cms /app/apps/cms/dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ============ 5. User-Web Nginx 階段 ============
FROM nginx:alpine AS nginx-user-web
COPY --from=build-user-web /app/apps/user-web/dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
