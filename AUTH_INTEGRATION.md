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
