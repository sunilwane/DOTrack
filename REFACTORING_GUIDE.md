# Backend Refactoring Documentation

## Overview
The backend has been refactored to follow better separation of concerns and code organization principles.

## New Structure

### Services Layer

#### 1. **githubService.ts**
Handles all GitHub API interactions.

**Location:** `apps/backend/src/services/githubService.ts`

**Responsibilities:**
- Fetch user's GitHub repositories
- Fetch repository collaborators
- Fetch repository contributors  
- Get GitHub user information
- Get user's primary email

**Key Methods:**
```typescript
- getUserRepos(accessToken: string): Promise<GitHubRepo[]>
- getRepoCollaborators(accessToken: string, owner: string, repo: string): Promise<GitHubCollaborator[]>
- getRepoContributors(accessToken: string, owner: string, repo: string): Promise<GitHubCollaborator[]>
- getRepoCollaboratorsOrContributors(accessToken: string, owner: string, repo: string): Promise<GitHubCollaborator[]>
- getUserInfo(accessToken: string): Promise<any>
- getUserPrimaryEmail(accessToken: string): Promise<string | undefined>
```

**Usage Example:**
```typescript
import { githubService } from '../services/githubService';

const repos = await githubService.getUserRepos(token);
const collaborators = await githubService.getRepoCollaboratorsOrContributors(token, 'owner', 'repo');
```

---

#### 2. **oauthService.ts**
Manages OAuth flows for Google and GitHub authentication.

**Location:** `apps/backend/src/services/oauthService.ts`

**Responsibilities:**
- Build OAuth authorization URLs
- Exchange authorization codes for access tokens
- Parse OAuth state parameters

**Key Methods:**
```typescript
- buildGoogleAuthUrl(config: OAuthConfig, returnTo: string): string
- buildGithubAuthUrl(config: OAuthConfig, returnTo: string): string
- exchangeGoogleCode(config: OAuthConfig, code: string): Promise<any>
- exchangeGithubCode(config: OAuthConfig, code: string): Promise<any>
- parseState(state?: string): { returnTo: string }
```

**Usage Example:**
```typescript
import { oauthService } from '../services/oauthService';

const url = oauthService.buildGithubAuthUrl({ clientId, callbackUrl, clientSecret }, '/dashboard');
const tokenData = await oauthService.exchangeGithubCode(config, code);
```

---

### Controllers Layer

#### **authController.ts**
Now focused solely on HTTP request/response handling.

**Responsibilities:**
- Validate request data
- Call appropriate service methods
- Format and send HTTP responses
- Handle errors

**Benefits:**
- Thin controllers - easier to test
- Business logic moved to services
- Better code reusability
- Clearer separation of concerns

---

## Frontend Refactoring

### Reusable Icon Components

#### **ChevronLeftIcon.tsx & ChevronRightIcon.tsx**
SVG icons as reusable React components.

**Location:** `apps/frontend/src/Components/icons/`

**Features:**
- Forcefully white color for dark theme visibility
- Customizable size and className props
- Pure SVG implementation (no external dependencies)

**Usage Example:**
```typescript
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';

<ChevronLeftIcon size={18} />
<ChevronRightIcon size={18} className="custom-class" />
```

**Exported from:** `apps/frontend/src/Components/icons/index.ts`

---

## Code Organization Principles Applied

### 1. **Separation of Concerns**
- Controllers handle HTTP only
- Services contain business logic
- Models define data structures

### 2. **Reusability**
- Services can be used across multiple controllers
- Icon components can be used anywhere in the frontend
- No code duplication

### 3. **Testability**
- Services can be unit tested independently
- Controllers are simpler to test
- Mock services easily for testing

### 4. **Maintainability**
- Changes to GitHub API logic only affect githubService
- OAuth logic changes only affect oauthService
- Easy to find and fix bugs

### 5. **Scalability**
- Easy to add new OAuth providers
- Simple to extend GitHub functionality
- Clean architecture for future features

---

## Migration Guide

### Before (Old Pattern)
```typescript
// All logic in controller
export const getGithubRepos = async (req: AuthRequest, res: Response) => {
  // ... auth checks ...
  const reposRes = await fetch('https://api.github.com/user/repos?per_page=100', {
    headers: { Authorization: `token ${token}` },
  });
  const reposJson = await reposRes.json();
  res.json(reposJson);
};
```

### After (New Pattern)
```typescript
// Controller - thin layer
export const getGithubRepos = async (req: AuthRequest, res: Response) => {
  // ... auth checks ...
  const repos = await githubService.getUserRepos(token);
  res.json(repos);
};

// Service - business logic
async getUserRepos(accessToken: string): Promise<GitHubRepo[]> {
  const response = await fetch(`${this.baseUrl}/user/repos?per_page=100`, {
    headers: { Authorization: `token ${accessToken}` },
  });
  return await response.json();
}
```

---

## Best Practices Going Forward

1. **Always create services for business logic**
   - Don't put business logic in controllers
   - Keep controllers thin

2. **Make components reusable**
   - Extract common UI elements
   - Use prop interfaces for flexibility

3. **Use TypeScript interfaces**
   - Define clear types for all data structures
   - Helps catch errors early

4. **Keep files focused**
   - One responsibility per file
   - Easier to navigate codebase

5. **Document your code**
   - Add comments for complex logic
   - Update documentation when making changes

---

## Files Modified/Created

### Backend
- ✅ Created: `services/githubService.ts`
- ✅ Created: `services/oauthService.ts`
- ✅ Modified: `controllers/authController.ts`

### Frontend
- ✅ Created: `Components/icons/ChevronLeftIcon.tsx`
- ✅ Created: `Components/icons/ChevronRightIcon.tsx`
- ✅ Modified: `Components/icons/index.ts`
- ✅ Modified: `Components/common/Pagination.tsx`

---

## Testing Checklist

- [ ] Test GitHub OAuth flow
- [ ] Test Google OAuth flow
- [ ] Test fetching GitHub repos
- [ ] Test fetching collaborators
- [ ] Test pagination icons visibility
- [ ] Test error handling in services
- [ ] Verify no TypeScript errors
- [ ] Test on dark theme

---

## Future Improvements

1. Add error handling middleware
2. Implement request caching in services
3. Add rate limiting for GitHub API
4. Create service interfaces for better testability
5. Add unit tests for all services
6. Implement logging service
7. Add API response validation using Zod
