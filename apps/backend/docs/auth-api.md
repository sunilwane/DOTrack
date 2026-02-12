# Auth API Reference

## Environment
| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string. Example: `mongodb+srv://paliwalnishant0_db_user:<db_password>@dotrack.f5msydg.mongodb.net/DOTrack?retryWrites=true&w=majority` |
| `JWT_SECRET` | Strong random secret used to sign tokens (keep it secret and rotate regularly) |
| `PORT` | Port the Express server listens on (default `5000`)

> Copy `.env.example` to `.env` and fill in your real values; do **not** commit `.env` to git.

## Auth routes
All routes are mounted under `/api/auth` from `routes/auth.ts`.

### `POST /api/auth/signup`
Registers a new user.
- **Body:** `{ "email": "user@example.com", "password": "T0pS3cret!", "name": "User Name" }`
- **Response:** `201 Created` with `{ "id": "<userId>", "email": "user@example.com", "name": "User Name" }`
- **Errors:** `400` when email/password missing or already registered.

### `POST /api/auth/signin`
Authenticates an existing user.
- **Body:** `{ "email": "user@example.com", "password": "T0pS3cret!" }`
- **Response:** `200 OK` with `{ "token": "<jwt>" }`. Token expires after 1 hour.
- **Errors:** `401` when credentials are invalid.

### `POST /api/auth/signout`
Revokes the bearer token.
- **Header:** `Authorization: Bearer <token>`
- **Response:** `200 OK` with `{ "ok": true }`
- **Behaviour:** The token is stored in `RevokedTokenModel` and future requests with the same token will be rejected.

## Middleware
- `middlewares/authMiddleware.ts` checks `Authorization` header, validates the JWT with `jsonwebtoken`, and ensures the token has not been revoked.
- Protected routes should use `requireAuth` to have `req.user` populated with the token payload.

## Security notes
1. **Hashing:** passwords are hashed with `bcrypt` before storage (`utils/hash.ts`).
2. **JWT:** tokens are signed with `JWT_SECRET`; rotate secrets safely and invalidate old tokens by signing out.
3. **Revocation:** tokens that are signed out are inserted into MongoDB with a TTL, so they cannot be reused.
4. **Validation:** always validate request data before calling the service layer (add schema validation later).

## Testing the APIs securely
1. Set up `.env` with real `MONGO_URI` and `JWT_SECRET`.
2. Start the backend (`pnpm dev` or `pnpm start`).
3. Use Postman/cURL:
   - Signup first to create a user.
   - Signin to receive a token.
   - Call any protected endpoint (or `POST /api/auth/signout`) using `Authorization: Bearer <token>` header.
   - Signout and confirm subsequent requests with that token fail.

### Testing `POST /api/auth/refresh` (refresh token rotation)

Overview:
- The refresh flow uses an HttpOnly cookie named `refreshToken` (path: `/api/auth`).
- `POST /api/auth/refresh` expects the cookie and returns a new `accessToken` in the JSON body while rotating the refresh cookie.

Prerequisites:
- Backend running (default `http://localhost:5000` or your `PORT`).
- Cookies must be preserved/sent by your client (Postman, browser, or curl with cookie jar).

Steps — Postman (recommended for manual tests):
1. Send `POST /api/auth/signin` with JSON body `{ "email": "user@example.com", "password": "..." }`.
   - Response body includes `accessToken`.
   - The server sets an HttpOnly cookie named `refreshToken` (check Postman's Cookies tab).
2. With the cookie present, send `POST /api/auth/refresh` to `http://localhost:5000/api/auth/refresh`.
   - Ensure Postman will send cookies for that host (Cookies tab or enable `Send cookies`/`Automatically follow redirects`).
3. Inspect the response JSON — you should receive a new `{ "accessToken": "<jwt>" }`.
4. Inspect response `Set-Cookie` headers — the `refreshToken` cookie will be rotated (new value and expiry).

Steps — curl (command-line):
1. Sign in and save cookies:

```bash
curl -i -c cookiejar.txt -X POST http://localhost:5000/api/auth/signin \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"T0pS3cret!"}'
```

2. Call refresh using the saved cookie jar:

```bash
curl -i -b cookiejar.txt -X POST http://localhost:5000/api/auth/refresh
```

- Check the response body for the new `accessToken` and `Set-Cookie` headers for the rotated `refreshToken`.

Steps — browser / fetch (integration test):
- From a frontend app on `FRONTEND_URL` use `fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' })` so the browser sends the HttpOnly cookie.
- Remember: the cookie is HttpOnly, so JavaScript cannot read it — only the browser will send it.

Expected responses and errors:
- `200 OK` with `{ "accessToken": "<jwt>" }` when the refresh cookie is valid.
- `401 Unauthenticated` when the cookie is missing.
- `401 Invalid refresh token` when the cookie is present but invalid/rotated/revoked.

Troubleshooting:
- If cookies are not sent from the browser, confirm `credentials: 'include'` and CORS `Access-Control-Allow-Credentials` are configured on the backend.
- In production the cookie is `secure` and uses `SameSite=None`; test locally using `NODE_ENV=development` or adjust `FRONTEND_URL`/`domain` as appropriate.
- If using curl, always use `-c`/`-b` to persist and send cookies.
- To simulate an invalid refresh token, clear the cookie and call `POST /api/auth/refresh` to verify the `401` behavior.

## Next steps
- Replace `requireAuth` placeholder uses with actual route protection (e.g., add `GET /api/auth/me`).
- Implement email confirmation or refresh tokens if needed for your security posture.
