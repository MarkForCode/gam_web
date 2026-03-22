# User Web Application - Monorepo Build
# This Dockerfile should be built from the root directory
# docker build -f packages/user-web/Dockerfile -t gam-user-web .

FROM node:24-alpine AS builder

WORKDIR /app

# Copy root package.json and yarn.lock for workspace setup
COPY package.json yarn.lock ./

# Copy all package configurations
COPY packages/shared/package.json ./packages/shared/
COPY packages/backstage/package.json ./packages/backstage/
COPY packages/user-web/package.json ./packages/user-web/

# Install dependencies (workspace mode)
RUN yarn install --frozen-lockfile

# Copy shared source code
COPY packages/shared/src ./packages/shared/src
COPY packages/shared/config ./packages/shared/config
COPY packages/shared/tsconfig.json ./packages/shared/
COPY packages/shared/jsconfig.json ./packages/shared/

# Copy user-web source code
COPY packages/user-web/src ./packages/user-web/src
COPY packages/user-web/config ./packages/user-web/config
COPY packages/user-web/tsconfig.json ./packages/user-web/
COPY packages/user-web/jsconfig.json ./packages/user-web/
COPY packages/user-web/public ./packages/user-web/public

# Build user-web application
RUN NODE_OPTIONS=--openssl-legacy-provider yarn workspace @gam/user-web build

# Production stage
FROM nginx:alpine

# Copy nginx configuration from root
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx
COPY --from=builder /app/packages/user-web/dist /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
