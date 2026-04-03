# GAM Project Documentation

## Project Overview

GAM (Guild Account Management) is a monorepo application consisting of two web applications:

- **CMS (Backstage)**: Admin management console for managing users, announcements, payments, and commodities
- **User-Web**: User-facing portal for account management, trading, and commodity browsing

### Tech Stack

- **Framework**: UmiJS
- **UI Library**: Ant Design Pro
- **Language**: TypeScript
- **Package Manager**: Yarn (Workspaces)
- **Container**: Docker + nginx

---

## Project Structure

```
gam_web/
├── apps/
│   ├── cms/                    # Admin/CMS application (port 8081)
│   │   ├── config/             # App configuration
│   │   └── src/
│   │       ├── components/     # Reusable components
│   │       ├── layouts/        # Layout components
│   │       ├── pages/          # Page components
│   │       ├── services/       # API service layer
│   │       ├── global.less     # Global styles (imports dark-theme.less)
│   │       └── dark-theme.less # Consolidated dark theme styles
│   │
│   └── user-web/               # User-facing web application (port 8080)
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
├── doc.md                      # This documentation
└── README.md                   # Project overview
```

---

## Available Commands

### Development

```bash
# Start both applications (user-web: 8080, cms: 8081)
just dev

# Start only user-web
just dev-user

# Start only cms
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
# Build all Docker images
just docker-build-all

# Start all containers
just docker-up

# Stop all containers
just docker-down

# Rebuild and start (full rebuild)
just docker-rebuild

# View logs
just docker-logs
just docker-logs-user  # user-web logs
just docker-logs-cms   # cms logs
```

---

## Dark Theme Implementation

### Overview

The dark theme is consolidated into a single CSS file (`dark-theme.less`) per application to ensure consistency and ease of maintenance.

### File Locations

- **CMS**: `apps/cms/src/dark-theme.less`
- **User-Web**: `apps/user-web/src/dark-theme.less`

### How It Works

1. Each app imports the dark theme in `global.less`:
   ```less
   @import './dark-theme.less';
   ```

2. The dark mode is activated by adding the `.dark-mode` class to the root element (`#root`)

3. The dark mode is enabled by default in `config/defaultSettings.ts`:
   ```typescript
   darkMode: true,
   ```

### Color Palette

| Variable | Value | Usage |
|----------|-------|-------|
| `@dark-bg` | `#1f1f1f` | Main background |
| `@dark-bg-light` | `#262626` | Input backgrounds, dropdowns |
| `@dark-border` | `#434343` | Borders, dividers |
| `@dark-text` | `rgba(255, 255, 255, 0.85)` | Primary text |
| `@dark-text-secondary` | `rgba(255, 255, 255, 0.65)` | Secondary text |
| `@dark-text-placeholder` | `rgba(255, 255, 255, 0.45)` | Placeholder text |
| `@dark-hover` | `#434343` | Hover states |
| Primary Color | `#40e0d0` | 拂晓蓝 - buttons, links, accents |

### Adding New Dark Theme Styles

When adding new components or pages, add styles under the `.dark-mode` selector:

```less
.dark-mode {
  .new-component {
    background: @dark-bg !important;
    color: @dark-text !important;
  }
}
```

### Key Selectors Covered

- Layout: `.ant-layout`, `.ant-layout-header`, `.ant-layout-footer`, `.ant-layout-sider`
- ProLayout: `.ant-pro-layout`, `.ant-pro-sider`, `.ant-pro-global-header`, `.ant-pro-page-container`
- Forms: `.ant-input`, `.ant-select-selector`, `.ant-picker`, `.ant-input-affix-wrapper`
- Tables: `.ant-table`, `.ant-table-thead`, `.ant-table-tbody`
- Modals: `.ant-modal-content`, `.ant-modal-header`, `.ant-modal-body`
- Cards: `.ant-card`, `.ant-card-head`, `.ant-card-body`
- And 100+ more selectors...

---

## API Configuration

### Environment

| Application | API URL | Description |
|-------------|---------|-------------|
| CMS | `http://localhost:8833` | Backstage admin API |
| User-Web | `http://localhost:8834` | Guild user API |

### API Endpoints

**CMS (Backstage)**
- Login: `/api/v1/backstage/login`
- Captcha: `/api/v1/backstage/login/captcha`

**User-Web (Guild)**
- Login: `/api/v1/guild/login`
- Account: `/api/v1/guild/account`
- Commodity: `/api/v1/guild/commodity`
- Deal: `/api/v1/guild/deal`
- Announcement: `/api/v1/guild/announce`
- File: `/api/v1/guild/file`
- Trial/Register: `/api/v1/guild/trial`

### Changing API URL

Edit in respective config file:
- `apps/cms/config/config.ts` (production) / `config.dev.ts` (development)
- `apps/user-web/config/config.ts` (production) / `config.dev.ts` (development)

---

## Docker Configuration

### Ports

| Service | Container Port | Host Port |
|---------|----------------|-----------|
| user-web | 80 | 8080 |
| cms | 80 | 8081 |

### Multi-Stage Build

The Dockerfile uses three stages:

1. **base-deps**: Install Node.js dependencies
2. **builder**: Build the application with `yarn build`
3. **runner**: Copy dist to nginx container

### Building Images

```bash
# Build specific app
docker build --target runner --build-arg APP_NAME=user-web -t gam-user-web:latest .
docker build --target runner --build-arg APP_NAME=cms -t gam-cms:latest .

# Using justfile
just docker-build-user
just docker-build-cms
```

### Docker Compose Services

```yaml
services:
  user-web:
    image: gam_web-user-web:latest
    ports:
      - "8080:80"
  cms:
    image: gam_web-cms:latest
    ports:
      - "8081:80"
```

---

## Troubleshooting

### Container Conflicts

**Problem**: Error: "container name is already in use"

**Solution**:
```bash
# Remove stale containers
docker ps -a --filter "name=gam_user_web" --filter "name=gam_cms" -q | xargs -r docker rm -f

# Or use justfile
just docker-down
just docker-up
```

### CSS Not Updating

**Problem**: Changes to LESS/CSS files don't appear in browser

**Solutions**:
1. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. Clear browser cache
3. Rebuild with `--no-cache`:
   ```bash
   docker compose build --no-cache
   docker compose up -d --no-recreate
   ```

### Docker Build Errors

**Problem**: Build fails with "APP_NAME is undefined"

**Solution**: Ensure `--build-arg APP_NAME` matches the app directory name:
- For cms: `APP_NAME=cms`
- For user-web: `APP_NAME=user-web`

### Build Errors

**Problem**: Node.js OpenSSL error

**Solution**: Use legacy provider:
```bash
NODE_OPTIONS=--openssl-legacy-provider yarn build
```
(This is already configured in the justfile and Dockerfile)

### Port Already in Use

**Problem**: "Port 8080 is already in use"

**Solution**:
```bash
# Find and kill process using the port
lsof -i :8080
kill <PID>

# Or use a different port in docker-compose.yml
```

---

## Development Workflow

### Starting Development

```bash
# Install dependencies
just install  # or yarn

# Start both apps
just dev
```

### Making Dark Theme Changes

1. Edit `apps/*/src/dark-theme.less`
2. Rebuild the app:
   ```bash
   docker compose build --no-cache <service>
   docker compose up -d --no-recreate <service>
   ```
3. Clear browser cache and refresh

### Adding New Pages

1. Create page in `apps/*/src/pages/`
2. Add LESS file if needed (import from `dark-theme.less` for dark theme support)
3. Add route in `config/routes.ts`
4. Rebuild and test

---

## File Naming Conventions

- **Components**: PascalCase (`UserLayout.tsx`, `GuildCaptchaInput.tsx`)
- **Styles**: Same name as component (`.less`)
- **Services**: Lowercase with descriptive names (`login.ts`, `commodity.ts`)
- **Config**: `config.ts` for production, `config.dev.ts` for development

---

## Additional Resources

- [UmiJS Documentation](https://umijs.org/)
- [Ant Design Pro](https://pro.ant.design/)
- [Ant Design Components](https://ant.design/components/overview)
- [Docker Documentation](https://docs.docker.com/)
