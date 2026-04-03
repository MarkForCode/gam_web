# GAM (Guild Account Management)

Monorepo containing two web applications for managing guild accounts, trading, and administrative functions.

## Features

### CMS (Backstage) - Port 8081
- User account management
- Announcement management
- Payment processing
- Commodity management
- Administrative dashboard

### User-Web - Port 8080
- User account center
- Commodity browsing and trading
- Deal history
- Platform selection
- Registration and authentication

## Tech Stack

- **Framework**: UmiJS
- **UI Library**: Ant Design Pro
- **Language**: TypeScript
- **Package Manager**: Yarn (Workspaces)
- **Container**: Docker + nginx

## Quick Start

### Prerequisites

- Node.js >= 24.0.0
- Docker & Docker Compose
- Just (task runner) - `cargo install just` or `npm install -g just`

### Installation

```bash
# Install dependencies
yarn
# or: just install
```

### Development

```bash
# Start both applications
just dev

# Start only user-web (port 8080)
just dev-user

# Start only cms (port 8081)
just dev-cms
```

### Build

```bash
# Build both applications
just build

# Build only user-web
just build-user

# Build only cms
just build-cms
```

### Docker

```bash
# Build and start all containers
just docker-up

# Stop all containers
just docker-down

# Rebuild and start (full rebuild)
just docker-rebuild
```

## Available Commands

| Command | Description |
|---------|-------------|
| `just install` | Install dependencies |
| `just dev` | Start both apps in development |
| `just dev-user` | Start user-web (port 8080) |
| `just dev-cms` | Start cms (port 8081) |
| `just build` | Build both apps |
| `just build-user` | Build user-web |
| `just build-cms` | Build cms |
| `just docker-up` | Start all containers |
| `just docker-down` | Stop all containers |
| `just docker-rebuild` | Full rebuild and start |
| `just docker-logs` | View all logs |
| `just docker-logs-user` | View user-web logs |
| `just docker-logs-cms` | View cms logs |

## Project Structure

```
gam_web/
├── apps/
│   ├── cms/                    # Admin/CMS application
│   │   ├── config/             # App configuration
│   │   └── src/
│   │       ├── components/     # Reusable components
│   │       ├── layouts/        # Layout components
│   │       ├── pages/          # Page components
│   │       ├── services/       # API service layer
│   │       ├── global.less     # Global styles
│   │       └── dark-theme.less # Dark theme styles
│   │
│   └── user-web/               # User-facing web application
│       ├── config/
│       └── src/
│           ├── components/
│           ├── layouts/
│           ├── pages/
│           ├── services/
│           ├── global.less
│           └── dark-theme.less
│
├── justfile                    # Task runner commands
├── docker-compose.yml          # Docker compose configuration
├── Dockerfile                  # Multi-stage Docker build
├── nginx.conf                  # nginx configuration
├── package.json                # Root package.json with workspaces
├── doc.md                      # Full documentation
└── README.md                   # This file
```

## Environment Configuration

### API URLs

| Application | API URL | Description |
|-------------|---------|-------------|
| CMS | `http://localhost:8833` | Backstage admin API |
| User-Web | `http://localhost:8834` | Guild user API |

### Docker Ports

| Service | Host Port |
|---------|-----------|
| user-web | 8080 |
| cms | 8081 |

## Dark Theme

The project uses a consolidated dark theme system. See [doc.md](./doc.md#dark-theme-implementation) for details.

## Documentation

For more detailed information, see [doc.md](./doc.md):
- Dark theme implementation and color palette
- API configuration
- Docker setup
- Troubleshooting guide

## License

MIT
