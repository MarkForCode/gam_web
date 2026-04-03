# User Web Application - Monorepo Build
# This Dockerfile should be built from the root directory
# docker build -f apps/user-web/Dockerfile -t gam-user-web .

FROM node:24-alpine AS builder

WORKDIR /app

# Copy root package.json and yarn.lock for workspace setup
COPY package.json yarn.lock ./

# Copy all package configurations
COPY apps/user-web/package.json ./apps/user-web/

# Install dependencies (workspace mode)
RUN yarn install --frozen-lockfile

# Copy user-web source code (includes copied shared code)
COPY apps/user-web/src ./apps/user-web/src
COPY apps/user-web/config ./apps/user-web/config
COPY apps/user-web/tsconfig.json ./apps/user-web/
COPY apps/user-web/jsconfig.json ./apps/user-web/
COPY apps/user-web/public ./apps/user-web/public

# Build user-web application
RUN cd /app/apps/user-web && NODE_OPTIONS=--openssl-legacy-provider yarn build

# Production stage
FROM nginx:alpine

# Copy nginx configuration from root
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx
COPY --from=builder /app/apps/user-web/dist /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
