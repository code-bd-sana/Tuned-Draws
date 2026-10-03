## 1. Environment & Global Configuration

- [x] 1.1 Update `backend/.env` with Turned Draws SMTP sender, email from, and frontend URLs; verify by checking `.env` entries.
- [x] 1.2 Update `backend/src/config/index.ts` fallback database connection string and default from-email identity; verify TypeScript compilation check passes.
- [x] 1.3 Update `backend/src/notifications/notifications.module.ts` fallback JWT secret; verify with TypeScript check.

## 2. API Documentation & Swagger Branding

- [x] 2.1 Update `backend/src/main.ts` Swagger DocumentBuilder title, description, customSiteTitle, and CORS origins to Turned Draws; verify no compilation errors.

## 3. Authentication & Mail Service Branding

- [x] 3.1 Update `backend/src/auth/auth.service.ts` username alias resolution to `@turneddraws.com`, admin dev fallback passwords, and welcome notification copy; verify code passes type check.
- [x] 3.2 Update `backend/src/mail/mail.service.ts` brand headers, footer signatures ("Turned Draws Ltd"), admin email fallback, and email subject lines; verify email template text.
- [x] 3.3 Update DTO example strings in tickets, auth, users, and admin-hosts modules; verify by inspecting DTO files and running lint check.

## 4. Database Seeds & Admin Fixtures

- [x] 4.1 Update `backend/prisma/create-admins.ts` admin accounts, passwords, and console branding; verify script compiles.
- [x] 4.2 Update `backend/prisma/seed.ts` and `backend/seed-demo.ts` host profile details, business name, and raffle categories to match Turned Draws; verify script compiles.

## 5. Installation, Build & Migration Verification

- [x] 5.1 Run `npm install` inside `backend/` and verify dependencies and `@prisma/client` are generated cleanly.
- [x] 5.2 Run `npx prisma validate` to confirm Prisma schema integrity against PostgreSQL specifications.
- [x] 5.3 Execute `npm run build` in `backend/` and verify the NestJS application builds with zero compilation errors.
