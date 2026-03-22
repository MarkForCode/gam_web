# This is a legacy Dockerfile for reference only
# For the new monorepo setup, use docker-compose.yml which builds:
# - packages/user-web/Dockerfile (port 8080)
# - packages/backstage/Dockerfile (port 8081)

FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# Build both apps using monorepo
RUN NODE_OPTIONS=--openssl-legacy-provider yarn build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# This image now only serves as reference - see docker-compose.yml for actual builds
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
