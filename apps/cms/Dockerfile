# CMS Application - Monorepo Build
# This Dockerfile should be built from the root directory
# docker build -f apps/cms/Dockerfile -t gam-cms .

FROM node:24-alpine AS builder

WORKDIR /app

# Copy root package.json and yarn.lock for workspace setup
COPY package.json yarn.lock ./

# Copy all package configurations
COPY apps/cms/package.json ./apps/cms/

# Install dependencies (workspace mode)
RUN yarn install --frozen-lockfile

# Copy cms source code (includes copied shared code)
COPY apps/cms/src ./apps/cms/src
COPY apps/cms/config ./apps/cms/config
COPY apps/cms/tsconfig.json ./apps/cms/
COPY apps/cms/jsconfig.json ./apps/cms/
COPY apps/cms/public ./apps/cms/public

# Build cms application  
RUN cd /app/apps/cms && NODE_OPTIONS=--openssl-legacy-provider yarn build

# Production stage
FROM nginx:alpine

# Copy nginx configuration from root
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx
COPY --from=builder /app/apps/cms/dist /usr/share/nginx/html

# Expose port 8081
EXPOSE 8081

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
