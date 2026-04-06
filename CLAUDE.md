## Project Configuration

- **Language**: TypeScript
- **Package Manager**: npm
- **Add-ons**: none

---

 # CLAUDE.md

  ## Project

  Lejematch frontend — the SvelteKit web app for lejematch.dk, a Danish roommate-finding platform. Users browse room listings, register accounts, post listings, and connect with potential roommates.

  This frontend consumes the Lejematch REST API (Go/Fiber backend, separate repo).

  ## Commands

  ```bash
  # Install dependencies
  npm install

  # Dev server (http://localhost:5173)
  npm run dev

  # Build for production
  npm run build

  # Preview production build
  npm run preview

  # Type check
  npm run check

  # Lint / format
  npm run lint
  npm run format

  Tech Stack

  - Framework: SvelteKit + TypeScript
  - CSS: Tailwind CSS
  - Adapter: @sveltejs/adapter-node (Docker / self-hosted)
  - Auth: HttpOnly cookie containing the JWT, managed server-side

  Architecture

  src/
    hooks.server.ts          → Reads JWT cookie, verifies it, attaches user to locals
    app.d.ts                 → Locals type (locals.user: JwtPayload | null)
    lib/
      api/                   → Typed fetch wrappers per resource (users, listings, auth)
      components/            → Reusable Svelte components
      stores/                → Client-side Svelte stores (non-auth state only)
      types/                 → TypeScript types mirroring backend models
    routes/
      +layout.svelte         → Root layout
      +layout.server.ts      → Passes session user down to all routes
      (auth)/
        login/               → Login page
        register/            → Register page
      listings/
        +page.svelte         → Browse / search listings
        [id]/+page.svelte    → Single listing detail
      dashboard/             → Protected: user's listings and profile

  Auth flow

  1. POST /api/v1/auth/login returns a JWT
  2. SvelteKit server sets it as an HttpOnly cookie — the client JS never sees the token
  3. hooks.server.ts reads and verifies the cookie on every request, populates locals.user
  4. Protected routes check locals.user and redirect to /login if absent
  5. Logout clears the cookie server-side

  API calls

  All calls go through src/lib/api/. Prefer server-side load functions and form actions over client-side fetches for anything requiring auth. Server-side calls attach the JWT as a Bearer header read from locals.

  Environment Variables

  Create a .env file at the project root (not committed):

  API_BASE_URL=http://localhost:3000   # internal Docker service URL in prod
  JWT_SECRET=your-secret-here         # same secret as the backend

  ┌──────────────┬─────────────────────────────────────────────────┐
  │   Variable   │                     Purpose                     │
  ├──────────────┼─────────────────────────────────────────────────┤
  │ API_BASE_URL │ Base URL of the Go backend                      │
  ├──────────────┼─────────────────────────────────────────────────┤
  │ JWT_SECRET   │ Verifies JWT server-side before trusting locals │
  └──────────────┴─────────────────────────────────────────────────┘

  Backend API Reference

  Base path: /api/v1

  ┌────────┬─────────────────────┬──────┬───────────────────────────────────┐
  │ Method │        Path         │ Auth │            Description            │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ POST   │ /auth/login         │ —    │ Returns JWT                       │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ POST   │ /users              │ —    │ Register (creates user + profile) │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ GET    │ /users/:id          │ JWT  │ Get user                          │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ PATCH  │ /users/:id          │ JWT  │ Update user                       │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ DELETE │ /users/:id          │ JWT  │ Delete user                       │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ PUT    │ /users/:id/password │ JWT  │ Change password                   │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ GET    │ /users/:id/profile  │ —    │ Public profile                    │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ PATCH  │ /users/:id/profile  │ JWT  │ Update profile                    │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ GET    │ /listings           │ —    │ Paginated + filterable            │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ GET    │ /listings/:id       │ —    │ Single listing                    │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ POST   │ /listings           │ JWT  │ Create listing                    │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ PATCH  │ /listings/:id       │ JWT  │ Update (owner or admin)           │
  ├────────┼─────────────────────┼──────┼───────────────────────────────────┤
  │ DELETE │ /listings/:id       │ JWT  │ Delete (owner or admin)           │
  └────────┴─────────────────────┴──────┴───────────────────────────────────┘

  Listing query params (GET /listings)

  city, min_price, max_price, room_type (private/shared/apartment), page, limit

  JWT claims

  UserID, Email, IsAdmin, IsActive

  Docker

  Adapter: @sveltejs/adapter-node. Build output is a Node.js server in build/.

  FROM node:20-alpine AS builder
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build

  FROM node:20-alpine
  WORKDIR /app
  COPY --from=builder /app/build ./build
  COPY --from=builder /app/package*.json ./
  RUN npm ci --omit=dev
  EXPOSE 3000
  ENV PORT=3000
  CMD ["node", "build"]

  Notes

  - UI language is Danish
  - Prices are in DKK (kr)
  - AvailableFrom is an ISO date string
  - Images on listings is a JSON array of URL strings