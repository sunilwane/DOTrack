# Refactoring Guide

This is the single source of truth for refactoring information in this repository.

It replaces:
- `FRONTEND_REFACTOR_REFERENCE.md`
- `FRONTEND_REFACTOR_SUMMARY.md`

Last updated: 2026-02-19

## Scope

This project has refactoring work across:
- Backend service and controller organization
- Frontend architecture, shared utilities, hooks, and reusable components

## Backend Refactoring

### Structure
- Controllers are kept thin (request/response only)
- Business logic moved to services

### Key backend modules
- `apps/backend/src/services/githubService.ts`
- `apps/backend/src/services/oauthService.ts`
- `apps/backend/src/controllers/authController.ts`

### Expected pattern

Before:
- Controller directly handled external API calls and business logic

After:
- Controller validates input and delegates to service methods
- Services encapsulate external integrations and business rules

## Frontend Refactoring

### Shared hooks added
- `apps/frontend/src/hooks/useAsync.ts`
- `apps/frontend/src/hooks/useFormSubmit.ts`
- `apps/frontend/src/hooks/useFetch.ts`
- `apps/frontend/src/hooks/useToggle.ts`
- `apps/frontend/src/hooks/index.ts`

### Shared UI components added
- `apps/frontend/src/Components/common/LoadingSpinner.tsx`
- `apps/frontend/src/Components/common/ErrorAlert.tsx`
- `apps/frontend/src/Components/common/FormError.tsx`
- `apps/frontend/src/Components/common/Modal.tsx`
- `apps/frontend/src/Components/common/EmptyState.tsx`
- `apps/frontend/src/Components/common/index.ts`

### Shared utilities added
- `apps/frontend/src/utils/logger.ts`
- `apps/frontend/src/utils/errorHandler.ts`
- `apps/frontend/src/utils/index.ts`

### Shared types/constants added
- `apps/frontend/src/types/common.ts`
- `apps/frontend/src/types/index.ts`
- `apps/frontend/src/constants/index.ts`

## Migration Patterns

### Async/loading/error state
Use `useAsync` or `useFetch` instead of repeating `loading/error/data` state logic in each page.

### Form submit flows
Use `useFormSubmit` instead of page-level try/catch/loading duplication.

### Boolean UI state
Use `useToggle` for open/close/toggle state instead of manual state handlers.

### Error UI
Use `ErrorAlert` or `FormError` instead of custom inline error blocks.

### Loading UI
Use `LoadingSpinner` instead of repeating spinner markup.

### Modals
Use shared `Modal` instead of inline modal implementations.

### Logging and errors
- Prefer `logger` over `console.log/error`
- Use `handleError`/`getErrorMessage` for consistent user-safe error messages

### Constants usage
Prefer constants from `apps/frontend/src/constants/index.ts` for routes, storage keys, and defaults.

## Validation Checklist

After each refactor batch:
1. Run `npm run lint` in `apps/frontend`
2. Run `npm run build` in `apps/frontend`
3. Verify critical flows:
   - Login and signup
   - Project list and project viewer
   - Pipeline upload and modal flows
   - Dashboard and marketplace primary paths


