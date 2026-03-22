# Backstage Admin Application - Monorepo Build
# This Dockerfile should be built from the root directory
# docker build -f packages/backstage/Dockerfile -t gam-backstage .

FROM node:24-alpine AS builder

WORKDIR /app

# Copy root package.json and yarn.lock for workspace setup
COPY package.json yarn.lock ./

# Copy all package configurations
COPY packages/backstage/package.json ./packages/backstage/

# Install dependencies (workspace mode)
RUN yarn install --frozen-lockfile

# Copy backstage source code (includes copied shared code)
COPY packages/backstage/src ./packages/backstage/src
COPY packages/backstage/config ./packages/backstage/config
COPY packages/backstage/tsconfig.json ./packages/backstage/
COPY packages/backstage/jsconfig.json ./packages/backstage/
COPY packages/backstage/public ./packages/backstage/public

# Build backstage application  
RUN cd /app/packages/backstage && NODE_OPTIONS=--openssl-legacy-provider yarn build

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
