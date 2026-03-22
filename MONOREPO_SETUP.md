# GAM Monorepo Setup

This project has been migrated from a single application to a **monorepo with separate Backstage (Admin) and User-Web applications**.

## 📁 Project Structure

```
gam_web/
├── packages/
│   ├── shared/          # Shared components, services, utilities
│   ├── backstage/       # Admin application (port 8081)
│   └── user-web/        # User-facing application (port 8080)
├── config/              # Legacy config files (for reference)
├── src/                 # Legacy source files (can be deleted after verification)
├── docker-compose.yml   # Multi-service Docker setup
├── package.json         # Root workspace config
└── yarn.lock
```

## 🚀 Getting Started

### Installation

```bash
# Install all dependencies across workspaces
yarn bootstrap
```

### Development

**Run all apps:**

```bash
yarn dev
```

**Run specific app:**

```bash
# User-Web on port 8080
yarn dev:user-web

# Backstage on port 8081
yarn dev:backstage
```

### Building

**Build all apps:**

```bash
yarn build
```

**Build specific app:**

```bash
yarn build:backstage
yarn build:user-web
```

## 🐳 Docker

### Build and Run with Docker Compose

```bash
# Build all Docker images
yarn docker:build

# Start all services
yarn docker:up

# Stop all services
yarn docker:down
```

This will start:

- **User-Web**: http://localhost:8080
- **Backstage**: http://localhost:8081

## 📦 Packages

### `@gam/shared`

Shared components, services, and utilities used by both applications.

**Exports:**

- Components in `src/components/`
- Services in `src/services/`
- Utilities in `src/utils/`
- Type definitions in `src/types/`
- Models (DVA) in `src/models/`

**Usage in other packages:**

```typescript
import { SomeComponent } from "@gam/shared/components";
import { api } from "@gam/shared/services";
```

### `@gam/backstage`

Admin backstage application for managing guild, commodities, and users.

**Port:** 8081 (development), 8081 (production)

**Features:**

- Guild management (`/guild/admin/*`)
- Member management
- Announcements
- Fund tracking
- Commodity management
- User management

**Access:** Admin users only (authority: `['ADMIN']`)

### `@gam/user-web`

User-facing application for browsing and purchasing commodities.

**Port:** 8080 (development), 8080 (production)

**Features:**

- Commodity browsing (`/commodity/list`)
- Purchase history (`/commodity/listmydeallist`)
- Commodity details (`/commodity/detail/:id`)
- Personal account settings
- Order tracking

**Access:** Regular users (authority: `['NORMAL', 'ADMIN']`)

## 🔄 Workspace Commands

```bash
# Run command in specific workspace
yarn workspace @gam/backstage dev
yarn workspace @gam/user-web build

# Run linting across all packages
yarn lint

# Run tests across all packages
yarn test
```

## 📝 Migration Notes

### Import Paths

All imports from shared modules use the `@gam/shared/` namespace:

```typescript
// ✅ Correct
import { Button } from "@gam/shared/components";
import { fetchUser } from "@gam/shared/services";

// ❌ Incorrect (old format)
import { Button } from "@/components";
```

### Route-Based Access Control

Routes are now separated by application:

- **Backstage** (`packages/backstage/config/routes.ts`): Admin-only routes
- **User-Web** (`packages/user-web/config/routes.ts`): User-only routes

### Environment Variables

Set in `docker-compose.yml` or `.env` files in each package:

- `REACT_APP_ENV`: Environment (dev, test, prod)
- `API_URL`: Backend API address
- `NODE_ENV`: Node environment

## 🔧 Troubleshooting

### Port already in use

```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Kill process on port 8081
lsof -ti:8081 | xargs kill -9
```

### Dependencies not installing

```bash
# Clean and reinstall
yarn clean
yarn bootstrap
```

### Build fails with OpenSSL error

This is normal - the build scripts use `NODE_OPTIONS=--openssl-legacy-provider` for Node 24 compatibility with webpack 4.

## 📚 Additional Resources

- [UMI Documentation](https://umijs.org/docs)
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- [Docker Compose](https://docs.docker.com/compose/)

## ✅ What's New

- **Team Separation**: Backstage and User-Web teams can work independently
- **Independent Scaling**: Deploy only what you need
- **Shared Code**: Common utilities in `@gam/shared`
- **Separate Builds**: Each app builds independently
- **Docker Support**: Easy multi-container deployment

## 🎯 Next Steps

1. Verify both applications run locally
2. Test all features in both apps
3. Update CI/CD pipelines to build both apps
4. Deploy to production separately
5. Monitor performance and logs separately
