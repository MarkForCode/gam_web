# AGENTS.md - Agent Coding Guidelines

This file provides guidelines for agents operating in the GAM (Guild Account Management) monorepo.

---

## 1. Build, Lint, and Test Commands

### Development

```bash
# Start both apps (user-web: 8080, cms: 8081)
yarn dev
# or: just dev

# Start only user-web
yarn dev:user-web
# or: just dev-user

# Start only cms
yarn dev:cms
# or: just dev-cms
```

### Build

```bash
# Build both applications
yarn build

# Build only user-web
yarn build:user-web

# Build only cms
yarn build:cms
```

### Lint

```bash
# Lint both apps
yarn lint

# Auto-fix lint issues
yarn lint:fix

# Lint specific app
yarn workspace @gam/user-web lint
yarn workspace @gam/cms lint

# TypeScript check only
yarn workspace @gam/user-web tsc
yarn workspace @gam/cms tsc
```

### Test

```bash
# Run all tests
yarn test

# Run tests for specific app
yarn workspace @gam/user-web test
yarn workspace @gam/cms test

# Run component tests only (cms)
yarn workspace @gam/cms test:component

# Run all tests (cms)
yarn workspace @gam/cms test:all
```

### Docker

```bash
# Build and start containers
docker compose up -d

# Build with no cache
docker compose build --no-cache

# View logs
docker compose logs -f
```

---

## 2. Code Style Guidelines

### TypeScript

- **Language Version**: TypeScript 4.0.3+
- **Strict Mode**: Enabled by default in tsconfig.json
- **NoImplicitAny**: Avoid `any`, use proper types or `unknown`

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserLayout.tsx`, `GuildCaptchaInput.tsx` |
| Files (TS/TSX) | PascalCase | `login.ts`, `accountService.ts` |
| Files (LESS) | camelCase | `userLayout.less`, `darkTheme.less` |
| Variables | camelCase | `isLoading`, `userList` |
| Constants | UPPER_SNAKE_CASE | `API_URL`, `MAX_RETRIES` |
| Interfaces | PascalCase with `I` prefix (optional) | `UserProps`, `ApiResponse` |
| Types | PascalCase | `ButtonSize`, `FormState` |

### Imports

```typescript
// 1. React/UMI imports
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { FormattedMessage } from 'umi';

// 2. Ant Design imports
import { Button, Table, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// 3. Internal components (absolute paths)
import { GuildCaptchaInput } from '@/components/Authorized';
import { UserLayout } from '@/layouts';

// 4. Services
import { login } from '@/services/login';

// 5. Styles
import styles from './index.less';

// 6. Types
import type { ConnectProps } from 'umi';
import type { ConnectState } from '@/models/connect';
```

### Formatting

- **Line Length**: Max 100 characters
- **Indentation**: 2 spaces
- **Semicolons**: Required
- **Quotes**: Single quotes for strings
- **Trailing Comma**: Yes (for better diffs)

```typescript
// Good
const userList = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// Bad
const userList = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
```

### React/TypeScript Patterns

```typescript
// Functional component with props
interface UserCardProps {
  name: string;
  email?: string;
  onDelete?: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // ...
  };

  return (
    <div className={styles.card}>
      <span>{name}</span>
      {email && <span>{email}</span>}
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserCard);
```

### Error Handling

```typescript
// Use try-catch with async/await
const fetchUser = async (id: string) => {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    message.error('Failed to load user data');
    throw error;
  }
};
```

### LESS/CSS Guidelines

- Use variables from Ant Design theme
- Dark theme colors defined in `dark-theme.less`:
  ```less
  @dark-bg: #1f1f1f;
  @dark-bg-light: #262626;
  @dark-border: #434343;
  @dark-text: rgba(255, 255, 255, 0.85);
  ```

### File Organization

```
src/
├── components/         # Reusable components
│   └── Authorized/
│       ├── index.tsx
│       └── GuildCaptchaInput.tsx
├── layouts/           # Layout components
│   ├── BasicLayout.tsx
│   └── UserLayout.less
├── pages/             # Page components
│   └── User/
│       └── login/
│           ├── index.tsx
│           └── index.less
├── models/            # DVA models
├── services/          # API services
├── global.less        # Global styles (imports dark-theme.less)
├── dark-theme.less    # Dark theme styles
└── typings.d.ts       # Type declarations
```

### Dark Theme Implementation

When adding new components, include dark theme styles in `dark-theme.less`:

```less
.dark-mode {
  .new-component {
    background: @dark-bg !important;
    color: @dark-text !important;
    border-color: @dark-border !important;
  }
}
```

### API Patterns

```typescript
// Service file structure
import { API_URL } from '@/typings';

const host = API_URL + '/api/v1/endpoint';

export async function fetchData(params: any) {
  const response = await fetch(`${host}?${new URLSearchParams(params)}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
```

---

## 3. Common Patterns

### Connect Umi Models

```typescript
export default connect(({ user, settings }: ConnectState) => ({
  user: user.currentUser,
  ...settings,
}))(MyComponent);
```

### ProTable Usage

```typescript
<ProTable
  request={fetchUsers}
  columns={columns}
  rowKey="id"
  search={{ labelWidth: 80 }}
/>
```

### Form Submission

```typescript
const handleSubmit = async (values: any) => {
  try {
    await saveUser(values);
    message.success('Saved successfully');
    onSuccess?.();
  } catch (error) {
    message.error('Failed to save');
  }
};
```

---

## 4. Testing Guidelines

- Place tests in `__tests__` folder or alongside components with `.test.tsx` suffix
- Use React Testing Library for component tests
- Mock API calls with `jest.mock()`

---

## 5. Pre-commit Checks

Before committing, ensure:

1. `yarn lint` passes
2. `yarn build` completes successfully  
3. No TypeScript errors (`tsc`)
4. Tests pass (`yarn test`)
