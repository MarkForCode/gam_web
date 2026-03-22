# User Web Application
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN NODE_OPTIONS=--openssl-legacy-provider yarn workspace @gam/user-web build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx
COPY --from=builder /app/packages/user-web/dist /usr/share/nginx/html

# Expose port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
