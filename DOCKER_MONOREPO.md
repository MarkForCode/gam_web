# Docker Setup for GAM Monorepo

This guide explains how to build and run the monorepo applications using Docker.

## 📋 Prerequisites

- Docker installed
- Docker Compose installed
- Working directory: project root

## 🐳 Individual Docker Builds

### Build Individual Apps

**Build User-Web (port 8080):**

```bash
docker build -f packages/user-web/Dockerfile -t gam-user-web:latest .
```

**Build Backstage (port 8081):**

```bash
docker build -f packages/backstage/Dockerfile -t gam-backstage:latest .
```

**Build Both:**

```bash
docker build -f packages/user-web/Dockerfile -t gam-user-web:latest .
docker build -f packages/backstage/Dockerfile -t gam-backstage:latest .
```

Or use justfile:

```bash
just docker-build-all
```

### Run Individual Containers

**Run User-Web:**

```bash
docker run -d -p 8080:8080 --name gam-user-web gam-user-web:latest
```

**Run Backstage:**

```bash
docker run -d -p 8081:8081 --name gam-backstage gam-backstage:latest
```

Or use justfile:

```bash
just docker-run-user
just docker-run-backstage
```

### Stop Containers

**Stop User-Web:**

```bash
docker stop gam-user-web && docker rm gam-user-web
```

**Stop Backstage:**

```bash
docker stop gam-backstage && docker rm gam-backstage
```

Or use justfile:

```bash
just docker-stop-all
```

## 🐳 Docker Compose (Recommended)

Docker Compose makes it easy to manage both applications together.

### Start All Services

```bash
docker compose up -d
```

This starts:

- User-Web at http://localhost:8080
- Backstage at http://localhost:8081

Or use justfile:

```bash
just docker-up
```

### Start Individual Services

```bash
# Start only user-web
docker compose up -d user-web

# Start only backstage
docker compose up -d backstage
```

Or use justfile:

```bash
just docker-up-user
just docker-up-backstage
```

### View Logs

```bash
# All services
docker compose logs -f

# User-Web only
docker compose logs -f user-web

# Backstage only
docker compose logs -f backstage
```

Or use justfile:

```bash
just docker-logs
just docker-logs-user
just docker-logs-backstage
```

### Stop Services

```bash
docker compose down
```

Or use justfile:

```bash
just docker-down
```

### Rebuild and Restart

```bash
# Rebuild images and restart services
docker compose down
docker build -f packages/user-web/Dockerfile -t gam-user-web:latest .
docker build -f packages/backstage/Dockerfile -t gam-backstage:latest .
docker compose up -d
```

Or use justfile (one command):

```bash
just docker-rebuild
```

### Clean Up All Docker Resources

```bash
docker compose down -v
docker rmi gam-user-web:latest gam-backstage:latest
```

Or use justfile:

```bash
just docker-clean
```

## 📝 docker-compose.yml Structure

```yaml
version: "3.8"

services:
  user-web:
    build:
      context: .
      dockerfile: packages/user-web/Dockerfile
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - REACT_APP_ENV=prod

  backstage:
    build:
      context: .
      dockerfile: packages/backstage/Dockerfile
    ports:
      - "8081:8081"
    environment:
      - NODE_ENV=production
      - REACT_APP_ENV=prod
```

## 🔧 Dockerfile Explanation

Both Dockerfiles follow a multi-stage build pattern:

### Stage 1: Builder

- Base: `node:24-alpine`
- Installs dependencies using yarn workspaces
- Copies shared and app-specific code
- Builds the application with webpack

### Stage 2: Runtime

- Base: `nginx:alpine`
- Copies nginx configuration
- Copies built artifacts from Stage 1
- Exposes port (8080 or 8081)

### Key Features

- ✅ Workspace support: Copies all package.json files
- ✅ Shared code: Includes @gam/shared src
- ✅ Node 24 support: Uses `--openssl-legacy-provider` flag
- ✅ Lightweight: Alpine base images
- ✅ Production-ready: Nginx web server

## 🚀 Common Workflows

### Local Development

```bash
# Terminal 1: User-Web
yarn dev:user-web

# Terminal 2: Backstage
yarn dev:backstage
```

### Docker Development

```bash
# Build and run
just docker-build-all
just docker-up
```

### Rebuild After Code Changes

```bash
just docker-rebuild
```

### Debug Container

```bash
docker exec -it gam-user-web sh
docker exec -it gam-backstage sh
```

## 🔗 Access URLs

- **User-Web:** http://localhost:8080
- **Backstage:** http://localhost:8081

## ⚠️ Troubleshooting

### Port Already in Use

```bash
# Find process using port 8080
lsof -ti:8080 | xargs kill -9

# Find process using port 8081
lsof -ti:8081 | xargs kill -9
```

### Build Fails with Module Errors

- Ensure all `package.json` files are present
- Verify `@gam/shared` package exists
- Check NODE_OPTIONS flag is set correctly

### Container Exits Immediately

```bash
# Check logs
docker compose logs user-web
docker compose logs backstage
```

## 📊 Size Optimization

Current Docker image sizes:

- User-Web: ~300MB
- Backstage: ~300MB

To reduce size:

1. Use Alpine base images (already done)
2. Remove development dependencies in production
3. Multi-stage builds (already done)
4. Nginx instead of Node server (already done)

## 🔐 Production Considerations

- Change environment variables in docker-compose.yml
- Use secrets for sensitive data
- Implement proper error logging
- Add health checks
- Set resource limits
- Use private registry for images

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [UMI Documentation](https://umijs.org/)
- [Nginx Documentation](https://nginx.org/)
