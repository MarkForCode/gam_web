# Docker Quick Start - GAM Monorepo

## 🚀 TL;DR - Start Everything in 3 Commands

```bash
# From project root
just docker-build-all    # Build both images (~5 mins, one time)
just docker-up           # Start services
just docker-logs         # View logs
```

Then access:

- **User-Web:** http://localhost:8080
- **Backstage:** http://localhost:8081

## ✋ Stop Services

```bash
just docker-down
```

## 🔄 Rebuild & Restart (After Code Changes)

```bash
just docker-rebuild
```

## 🧹 Clean Everything

```bash
just docker-clean
```

---

## 📋 All Docker Commands (via justfile)

### Build

```bash
just docker-build-user        # Build user-web image
just docker-build-backstage   # Build backstage image
just docker-build-all         # Build both
```

### Run Individual Containers

```bash
just docker-run-user          # Run user-web container
just docker-run-backstage     # Run backstage container
```

### Stop Individual Containers

```bash
just docker-stop-user         # Stop user-web
just docker-stop-backstage    # Stop backstage
just docker-stop-all          # Stop both
```

### Docker Compose (Recommended)

```bash
just docker-up                # Start all services
just docker-up-user           # Start user-web only
just docker-up-backstage      # Start backstage only
just docker-down              # Stop services
```

### Logs

```bash
just docker-logs              # View all logs
just docker-logs-user         # View user-web logs
just docker-logs-backstage    # View backstage logs
```

### Maintenance

```bash
just docker-rebuild           # Rebuild & restart
just docker-clean             # Remove everything
```

---

## 🔍 Manual Docker Commands

If you prefer not to use justfile:

### Build Images

```bash
docker build -f packages/user-web/Dockerfile -t gam-user-web:latest .
docker build -f packages/backstage/Dockerfile -t gam-backstage:latest .
```

### Start with Compose

```bash
docker compose up -d
docker compose logs -f
docker compose down
```

### Start Individual Containers

```bash
# User-Web
docker run -d -p 8080:8080 --name gam-user-web gam-user-web:latest

# Backstage
docker run -d -p 8081:8081 --name gam-backstage gam-backstage:latest
```

---

## 📊 What Each App Does

| App       | Port | Purpose                                                  |
| --------- | ---- | -------------------------------------------------------- |
| User-Web  | 8080 | Regular user interface - browse products, make purchases |
| Backstage | 8081 | Admin interface - manage products, users, orders         |

---

## ⚙️ Environment Variables

Both Docker images use:

- `NODE_ENV=production`
- `REACT_APP_ENV=prod`

Modify in `docker-compose.yml` if needed.

---

## 🐛 Troubleshooting

### Ports Already in Use

```bash
# Kill process using port 8080
lsof -ti:8080 | xargs kill -9

# Kill process using port 8081
lsof -ti:8081 | xargs kill -9
```

### Container Won't Start

```bash
# Check logs
docker compose logs user-web
docker compose logs backstage

# Or for individual containers
docker logs gam-user-web
docker logs gam-backstage
```

### Out of Disk Space

```bash
# Clean up unused Docker resources
docker system prune -a
```

---

## 📚 Full Documentation

For more detailed information, see:

- `DOCKER_MONOREPO.md` - Comprehensive Docker guide
- `MONOREPO_SETUP.md` - Monorepo structure & development
- `justfile` - All available commands

---

## 🎯 Common Scenarios

### Development

```bash
# Terminal 1
yarn dev:user-web

# Terminal 2
yarn dev:backstage
```

### Production Ready

```bash
just docker-build-all
just docker-up
```

### Test Changes in Docker

```bash
# Make code changes
just docker-rebuild
# Test at localhost:8080 and localhost:8081
```

### Inspect Container

```bash
docker exec -it gam-user-web sh
docker exec -it gam-backstage sh
```

---

## 📞 Need Help?

1. Check `DOCKER_MONOREPO.md` for detailed guides
2. Check container logs: `just docker-logs`
3. Verify ports aren't in use: `lsof -i :8080`
4. Ensure code is built: `yarn build`
5. Try full rebuild: `just docker-clean && just docker-build-all && just docker-up`
