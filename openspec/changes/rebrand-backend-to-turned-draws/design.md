## Context

See `proposal.md` for motivation. The backend is a NestJS monolithic application utilizing Prisma ORM with PostgreSQL. The existing codebase contained approximately 40 references to "Fairway" and "Fairway Draws" across environment variables, global configs, email templates, Swagger definitions, authentication resolvers, and seed scripts. The Prisma schema itself is domain-neutral and does not include hardcoded brand identifiers in table or column names.

## Goals / Non-Goals

**Goals:**
- Perform a complete, coherent brand transition across all backend configuration, auth, email, and API documentation files.
- Keep the database schema fully backward-compatible without destructive column/table migrations.
- Update development and test seed scripts to generate Turned Draws demo data (host profile, categories, admin users).
- Verify the backend successfully compiles and boots with updated configuration.

**Non-Goals:**
- Modifying frontend components or assets (deferred to a subsequent frontend track).
- Modifying core raffle business rules, ticket allocation logic, or payment processing flows.
- Replacing the database engine or ORM.

## Decisions

### Decision 1: Domain-Neutral Category Strategy
- **Choice**: Provide sensible general raffle / craft / luxury categories in the seed script (`Turned Goods & Crafts`, `Luxury Goods`, `Electronics & Tech`, `Experiences`, `Gift Cards`) while allowing dynamic creation via the existing Category CRUD endpoints.
- **Alternatives Considered**: Keeping golf categories (`Drivers & Woods`, etc.) was rejected as it directly conflicts with Turned Draws identity.

### Decision 2: Admin Authentication Alias Handling
- **Choice**: Update username alias candidate checking in `backend/src/auth/auth.service.ts` to append `@turneddraws.com`, while providing configurable admin seed accounts in `backend/prisma/create-admins.ts`.
- **Alternatives Considered**: Removing alias fallback entirely was considered, but keeping it ensures developer convenience when testing login via plain usernames.

### Decision 3: Zero-Downtime Database Migration Compatibility
- **Choice**: Because `backend/prisma/schema.prisma` already defines generic entities (`User`, `Raffle`, `Ticket`, `Category`, `HostProfile`), no breaking database DDL migrations are required. The changes are strictly code, config, and data seed updates.
- **Alternatives Considered**: Dropping the database was rejected; existing tables can be reseeded or migrated without data loss.

## Risks / Trade-offs

- **[Risk]** Broken local SMTP if `info@turneddraws.com` credentials are not yet configured on the host machine.
  - **Mitigation**: Fall back gracefully in `MailService` when credentials are not supplied, logging an informational warning rather than crashing the NestJS server.
- **[Risk]** Old session tokens or cookies referencing legacy secret keys.
  - **Mitigation**: Update `JWT_SECRET` in `.env` and verify authorization guards function with newly minted tokens.

## Migration Plan

1. Update `.env` and `src/config/index.ts` with Turned Draws defaults.
2. Update `main.ts`, `auth.service.ts`, `mail.service.ts`, and DTOs.
3. Update `backend/prisma/seed.ts` and `create-admins.ts`.
4. Run `npm install` in `backend/` to ensure Prisma client and dependencies are installed.
5. Execute `npx prisma generate` and `npm run prisma:seed`.
6. Start dev server `npm run start:dev` and verify Swagger docs at `/api/docs`.
