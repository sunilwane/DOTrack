# Auth Integration - Setup & Testing Guide

## 🎉 What's Been Implemented

### Backend (already existed)
- ✅ JWT-based authentication with access tokens (1 hour expiry)
- ✅ Refresh token rotation with HttpOnly cookies (7-day expiry)
- ✅ Token revocation on signout
- ✅ CORS configured for `http://localhost:3000`
- ✅ Protected routes with middleware

### Frontend (newly integrated)
- ✅ Auth service layer (`src/services/authService.ts`)
- ✅ Auth context with global state (`src/contexts/AuthContext.tsx`)
- ✅ Protected routes using `ProtectedRoute` component
- ✅ SignIn/SignUp pages connected to backend APIs
- ✅ User profile menu in Topbar with signout functionality
- ✅ Automatic redirect logic (authenticated → dashboard, unauthenticated → login)
- ✅ Token management (localStorage for access token, cookies for refresh token)
- ✅ Error handling and loading states

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- MongoDB Atlas connection (already configured in backend `.env`)

### 1. Install Dependencies

From the project root:
```bash
pnpm install
```



## 🧪 Testing the Auth Flow

### Test 1: Sign Up Flow
1. Open `http://localhost:3000` in your browser
2. Click "Create an account" or navigate to `/signup`
3. Fill in the form:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Password**: Test1234!
4. Click "Create Account"
5. ✅ You should be automatically signed in and redirected to `/dashboard`
6. ✅ Topbar should show your profile icon in the top-right

### Test 2: Sign In Flow
1. Sign out (click profile icon → Sign Out)
2. You'll be redirected to `/login`
3. Enter credentials:
   - **Email**: test@example.com
   - **Password**: Test1234!
4. Click "Sign In"
5. ✅ You should be redirected to `/dashboard`

### Test 3: Protected Routes
1. While signed out, try to access `/dashboard` directly
2. ✅ You should be automatically redirected to `/login`
3. After signing in, you'll be redirected to `/dashboard`

### Test 4: Profile Menu & Sign Out
1. Sign in to the app
2. Click the profile icon in the Topbar (top-right corner)
3. You should see a dropdown with:
   - **User email** (your email address)
   - **User ID** (first 8 chars)
   - **Profile** button (marked "Coming Soon")
   - **Sign Out** button (red)
4. Click "Sign Out"
5. ✅ You should be redirected to `/login`
6. ✅ Access token removed from localStorage
7. ✅ Refresh token cookie cleared

### Test 5: Session Persistence
1. Sign in to the app
2. Refresh the page (F5)
3. ✅ You should remain signed in (no redirect to login)
4. ✅ The user context is restored from the stored token

### Test 6: Refresh Token Flow (Backend Integration)
This happens automatically in the background:
- Access token expires after 1 hour
- If you make a request with an expired access token, you'll get 401
- Frontend can call `/api/auth/refresh` to get a new access token using the refresh cookie
- Refresh token rotates on each refresh (old one deleted, new one created)

---

## 🔍 Technical Details

### Authentication Flow

1. **Sign Up**:
   - `POST /api/auth/signup` → Creates user
   - Automatically calls signin
   - Returns access token + sets refresh token cookie

2. **Sign In**:
   - `POST /api/auth/signin` → Validates credentials
   - Returns access token (stored in localStorage)
   - Sets refresh token in HttpOnly cookie (path: `/api/auth`)

3. **Protected Request**:
   - Frontend sends `Authorization: Bearer <accessToken>` header
   - Backend validates token with `requireAuth` middleware
   - If valid: request proceeds; if invalid: 401 error

4. **Sign Out**:
   - `POST /api/auth/signout` with Bearer token
   - Token added to revoked tokens DB
   - Refresh token cookie cleared
   - LocalStorage cleared

5. **Refresh Token**:
   - `POST /api/auth/refresh` with credentials: include
   - Returns new access token
   - Rotates refresh token cookie

### State Management

- **AuthContext**: Global auth state (user, loading, isAuthenticated)
- **localStorage**: Access token storage
- **Cookies**: Refresh token (HttpOnly, secure in prod)

### Protected Routes

All routes under `<ProtectedRoute>` in the router:
- `/dashboard`
- `/projects`
- `/deployments`
- `/pipelines`
- `/audit-logs`
- `/version-history`
- `/all-projects`
- `/register-project`

### Public Routes

- `/` (Landing)
- `/login`
- `/signup`
- `/connect` (Wallet connection)

---

## 🐛 Troubleshooting

### "Invalid credentials" on sign in
- Ensure you've signed up first with the same email/password
- Check backend logs for errors
- Verify MongoDB connection

### "Failed to fetch" errors
- Ensure backend is running on `http://localhost:5000`
- Ensure frontend is running on `http://localhost:3000`
- Check browser console for CORS errors

### Cookies not working
- Check browser DevTools → Application → Cookies
- Ensure `credentials: 'include'` in fetch calls (✅ already configured)
- Ensure backend CORS allows credentials (✅ already configured)

### Stuck on loading screen
- Clear localStorage: `localStorage.clear()`
- Clear cookies for `localhost`
- Hard refresh: Ctrl+Shift+R

### TypeScript errors
- Run `pnpm install` in both apps/backend and apps/frontend
- Check that all new files are in the correct folders

---

## 📝 API Endpoints Reference

See `apps/backend/docs/auth-api.md` for detailed API documentation including:
- Request/response formats
- Error codes
- Testing with cURL/Postman
- Refresh token flow details

---

## ✅ Verification Checklist

- [x] Backend connects to MongoDB
- [x] Backend runs on port 5000
- [x] Frontend runs on port 3000
- [x] Can create new account
- [x] Can sign in with existing account
- [x] Protected routes redirect to login when unauthenticated
- [x] User menu appears in Topbar after sign in
- [x] Sign out clears session and redirects to login
- [x] Session persists on page refresh
- [x] No TypeScript errors in frontend

---

## 🎯 Next Steps

Optional enhancements you could add:
1. **Profile page** - Replace dummy profile button with actual user profile page
2. **Password reset** - Add forgot password flow with email
3. **Email verification** - Verify email before allowing sign in
4. **Remember me** - Optional extended session
5. **OAuth providers** - Google, GitHub integration for SocialAuth component
6. **Token refresh automation** - Automatically refresh token before expiry
7. **Role-based access** - Admin vs user permissions
8. **Multi-factor auth** - Add 2FA support

---

## **Continue with GitHub (Social Login) — Implementation Details**

- **Overview:** The project implements GitHub OAuth as a social sign-in option. The flow is initiated from the frontend, handled by backend endpoints, and results in a local account (created if needed) with a stored GitHub access token on the user record.

- **Env vars (DO NOT COMMIT VALUES):**
   - `GITHUB_CLIENT_ID` — GitHub OAuth App client ID
   - `GITHUB_CLIENT_SECRET` — GitHub OAuth App client secret (keep secret)
   - `GITHUB_CALLBACK_URL` — Backend callback URL registered in the GitHub app
   - `FRONTEND_URL` — Frontend base URL (used to redirect after login)

- **Frontend trigger:**
   - The SocialAuth button builds an anchor to the backend: [apps/frontend/src/Components/common/SocialAuth.tsx](apps/frontend/src/Components/common/SocialAuth.tsx#L1-L40)
   - Example href: `${VITE_API_BASE_URL}/api/auth/github?returnTo=${encodeURIComponent(returnTo)}`
   - Clicking this link performs a full-page redirect to the backend `GET /api/auth/github` endpoint.

- **Backend: `GET /api/auth/github` (redirect to GitHub)**
   - Reads `GITHUB_CLIENT_ID` and `GITHUB_CALLBACK_URL` from env.
   - Accepts optional `returnTo` query param (frontend route to return to after login).
   - Encodes `state` as JSON (currently contains `{ returnTo }`) and passes it through GitHub's `state` parameter.
   - Requests these scopes: `read:user repo user:email`.
   - Redirects the browser to the GitHub authorization URL:
      `https://github.com/login/oauth/authorize?client_id=...&redirect_uri=...&scope=...&state=...`

- **Backend: callback — `GET /api/auth/github/callback`**
   - GitHub returns a `code` (authorization code) and the same `state`.
   - Backend exchanges the `code` for an access token by POSTing to `https://github.com/login/oauth/access_token` with `client_id`, `client_secret`, `code`, and `redirect_uri`.
   - The request uses `Accept: application/json` and expects `access_token` in the response.

- **Fetch GitHub user info**
   - With the `access_token`, backend calls `https://api.github.com/user` to get `name`, `login`, `id`, and possibly `email`.
   - If `email` is not present on the `/user` response, the backend calls `https://api.github.com/user/emails` to obtain primary/verified email.

- **Create / update local user**
   - Backend calls `authService.findOrCreateUserByGithub(email, name, githubId, githubUsername, accessToken)` which:
      - Finds an existing user by normalized email and updates GitHub fields, or
      - Creates a new user with a randomly-generated local password (so the account can exist without a password the user entered).
   - The GitHub access token is saved on the user record field `githubAccessToken` (see `apps/backend/src/services/authService.ts`).

- **Local tokens & cookie**
   - After user creation/update the backend creates standard JWT access token + refresh token via `createTokensForUser`.
   - The refresh token is set as an HttpOnly cookie using `getRefreshCookieOptions()` (path `/api/auth`). See [apps/backend/src/utils/cookies.ts](apps/backend/src/utils/cookies.ts#L1-L40).
   - Finally the backend redirects the browser to `${FRONTEND_URL}${returnTo}`.

- **Scopes explained:**
   - `read:user` — read profile information (name, login, avatar)
   - `user:email` — read a user's email addresses (needed when public email is not set)
   - `repo` — read access to repositories (used later by `GET /api/auth/github/repos`)

- **Security & best practices**
   - Never store `GITHUB_CLIENT_SECRET` in the repository — keep it in your environment or secrets manager.
   - The `state` parameter is used to carry `returnTo` — for stronger CSRF protection you can include a server-generated nonce in `state` and verify it on callback.
   - The GitHub access token is stored on the user document so the app can call GitHub APIs on behalf of the user (e.g., list repos). Treat that token as sensitive.
   - Refresh token cookie is HttpOnly and scoped to `/api/auth` to limit exposure.

- **GitHub OAuth App setup (quick guide)**
   1. In GitHub, go to Settings → Developer settings → OAuth Apps → New OAuth App.
   2. Set the **Homepage URL** to your frontend `FRONTEND_URL` (e.g., `http://localhost:3000`).
   3. Set the **Authorization callback URL** to your backend `GITHUB_CALLBACK_URL` (e.g., `http://localhost:5000/api/auth/github/callback`).
   4. Create the app and copy `Client ID` and `Client Secret` into your environment variables (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`).

- **Testing the flow locally**
   - Start backend and frontend.
   - Click "Continue with GitHub" on the login page (SocialAuth button): [apps/frontend/src/Components/common/SocialAuth.tsx](apps/frontend/src/Components/common/SocialAuth.tsx#L1-L40).
   - Complete GitHub consent screen; confirm redirect lands back on the frontend route you expected.
   - Verify in the backend logs that a new or existing user was linked and that a refresh cookie was set.
   - Confirm you can fetch repos via `GET /api/auth/github/repos` (requires logged-in user with stored `githubAccessToken`).

- **Troubleshooting**
   - If `access_token` is not returned: verify `client_id`, `client_secret`, and `redirect_uri` match the GitHub app settings.
   - If no email found: ensure the GitHub account has at least one verified email or the `user:email` scope is present.
   - If redirect fails with CORS or cookie issues: check `FRONTEND_URL`, cookie `path` (`/api/auth`) and `credentials`/CORS settings.

---

---

## 📂 New Files Created

- `apps/frontend/src/services/authService.ts` - API service layer
- `apps/frontend/src/contexts/AuthContext.tsx` - Auth state management
- `apps/frontend/src/Components/ProtectedRoute.tsx` - Protected route wrapper
- `apps/frontend/.env` - Environment config
- `apps/frontend/.env.example` - Environment template

## 📝 Modified Files

- `apps/frontend/src/main.tsx` - Added AuthProvider
- `apps/frontend/src/router/index.tsx` - Added protected routes
- `apps/frontend/src/pages/Login/SignIn.tsx` - Connected to backend API
- `apps/frontend/src/pages/Login/SignUp.tsx` - Connected to backend API
- `apps/frontend/src/Components/common/Topbar.tsx` - Added user menu with signout
- `apps/frontend/vite.config.ts` - Set port to 3000
- `apps/backend/docs/auth-api.md` - Added refresh token testing guide

---

**Happy Testing! 🚀**
