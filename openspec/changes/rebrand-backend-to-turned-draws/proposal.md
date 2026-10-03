## Why

The application was cloned from Fairway Draws, a golf-gear raffle platform, to serve as the foundation for the new platform "Turned Draws". To establish Turned Draws as an independent platform and prevent domain confusion, customer-facing mislabeling, and incorrect system identifiers, all backend configurations, email templates, authentication logic, Swagger metadata, and seed data must be rebranded from Fairway Draws to Turned Draws.

## What Changes

- **Environment & Global Configuration**: Update default database connection strings, sender emails, and frontend domain URLs in environment variables and global configuration.
- **API Documentation & Metadata**: Update Swagger documentation title, description, and API reference tags to "Turned Draws API Reference".
- **Authentication & Administration Defaults**:
  - Update default email aliases from `@fairwaydraws.com` to `@turneddraws.com`.
  - Update admin dev credentials and fallback passwords to Turned Draws standards.
  - Update welcome notification messages in authentication flows.
- **Mail Service & Templates**:
  - Update transactional and contact email headers, footers, sender signatures ("Turned Draws Ltd"), and subject lines.
  - Adjust notification theme colors if necessary to match Turned Draws branding.
- **Prisma Seed & Demo Data**:
  - Update host profiles, demo business entities, and category definitions from Fairway Golf to generic / Turned Draws fixtures.
  - Update admin seed account scripts to Turned Draws administrative defaults.
- **DTOs & Documentation Samples**:
  - Clean up example addresses, company names, and email placeholders across DTOs and internal docs.

## Capabilities

### New Capabilities
- `backend-branding-and-configuration`: Covers core backend domain branding, admin identification, mail templating, environment configuration, and demo seeding for Turned Draws.

### Modified Capabilities
<!-- None: this is the initial specification set for the newly cloned project. -->

## Impact

- **Affected Code**: `backend/src/config/`, `backend/src/main.ts`, `backend/src/auth/`, `backend/src/mail/`, `backend/src/tickets/`, `backend/src/users/`, `backend/prisma/seed.ts`, `backend/prisma/create-admins.ts`, `backend/.env`.
- **Database Schema**: No breaking schema changes required (Prisma models are already domain-agnostic).
- **APIs**: No breaking contract changes to endpoints, payload shapes, or response interceptors; Swagger documentation and email bodies reflect the new brand.
