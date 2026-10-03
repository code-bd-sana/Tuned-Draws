## Purpose

Defines the brand identity, configuration parameters, email templates, administrative access defaults, and API documentation for Turned Draws backend services.

## ADDED Requirements

### Requirement: Global Configuration and Environment Defaulting
The backend system SHALL use "Turned Draws" identity in all default connection fallbacks, frontend routing links, and outgoing email addresses when environment variables are not explicitly overridden.

#### Scenario: Fallback email sender format
- **WHEN** the mail service initializes without an explicit `FROM_EMAIL` override
- **THEN** it SHALL use `'Turned Draws <noreply@turneddraws.com>'` as the sender identity

#### Scenario: Fallback database connection naming
- **WHEN** the application starts without a custom `DATABASE_URL`
- **THEN** the default fallback connection SHALL target `turned_draws` rather than `fairway_draws`

### Requirement: Swagger API Documentation Branding
The Swagger API documentation at `/api/docs` SHALL reflect the "Turned Draws" platform identity, description, and page title.

#### Scenario: Developer visits Swagger UI
- **WHEN** a client or developer navigates to the Swagger documentation endpoint
- **THEN** the page title and document title SHALL display "Turned Draws API Reference"
- **THEN** the description SHALL state "Welcome to the Turned Draws Platform API Documentation"

### Requirement: Turned Draws Authentication and Alias Resolution
The authentication service SHALL resolve username logins without domain to the `@turneddraws.com` domain and validate default administrative accounts.

#### Scenario: Username-only admin login
- **WHEN** an admin logs in using a plain username alias (e.g., `admin`)
- **THEN** the authentication service SHALL resolve the lookup against `@turneddraws.com` candidates

#### Scenario: Welcome notification generation
- **WHEN** a new user or host registers on the platform
- **THEN** the welcome notification message SHALL read "Welcome to Turned Draws!" or "Welcome to Turned Draws Host Portal!"

### Requirement: Email Notification Branding
All outgoing emails sent via the mail service SHALL feature the Turned Draws brand name, corporate footer, and corresponding subject titles.

#### Scenario: User receives contact form confirmation or verification email
- **WHEN** an email verification or inquiry is dispatched
- **THEN** the subject line SHALL include "- Turned Draws"
- **THEN** the footer signature SHALL state "Turned Draws Ltd"

### Requirement: Seed and Demo Fixture Alignment
Database seed scripts SHALL populate the database with Turned Draws host profiles, admin accounts, and generic or woodworking/draw-aligned product categories.

#### Scenario: Administrator runs database seed
- **WHEN** `npm run prisma:seed` is executed
- **THEN** the default host profile business name SHALL NOT contain "Fairway"
- **THEN** seeded administrator accounts SHALL use Turned Draws domains or generic administrative addresses
