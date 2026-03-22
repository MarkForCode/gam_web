# Backstage Admin Application - Monorepo Build
# This Dockerfile should be built from the root directory
# docker build -f packages/backstage/Dockerfile -t gam-backstage .

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

# Copy backstage source code
COPY packages/backstage/src ./packages/backstage/src
COPY packages/backstage/config ./packages/backstage/config
COPY packages/backstage/tsconfig.json ./packages/backstage/
COPY packages/backstage/jsconfig.json ./packages/backstage/
COPY packages/backstage/public ./packages/backstage/public

# Build backstage application
RUN NODE_OPTIONS=--openssl-legacy-provider yarn workspace @gam/backstage build

# Production stage
FROM nginx:alpine

# Copy nginx configuration from root
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx
COPY --from=builder /app/packages/backstage/dist /usr/share/nginx/html

# Expose port 8081
EXPOSE 8081

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
