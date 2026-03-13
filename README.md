## Retail Performance Tracker

This repository contains the setup for a read-only internal retail reporting app. The current scaffold focuses on clean project structure only. Feature work such as authentication, data fetching, reports, rankings, and incentives should be added later inside the folders below.

## Route structure

- `/` : starter overview page for the scaffold
- `/login` : auth route placeholder
- `/dashboard` : protected app route placeholder
- `/reports` : protected app route placeholder
- `/rankings` : protected app route placeholder
- `/incentives` : protected app route placeholder

In the Next.js app, these live under route groups:

- `web/app/(auth)` : public authentication routes
- `web/app/(app)` : protected application routes

## Folder guide

- `web/app` : Next.js routes, route groups, and page-level layouts
- `web/components/layout` : reusable layout pieces like sidebar, header, and auth shell
- `web/components/shared` : small UI building blocks shared across multiple routes
- `web/lib/auth` : auth-specific helpers and role rules
- `web/lib/constants` : static configuration such as navigation items
- `web/lib/utils` : generic helpers that do not belong to a specific feature
- `web/types` : shared TypeScript types for auth, reports, and future data models

## Beginner-friendly architecture

Use this rule of thumb when adding features:

- Put route-specific UI and page composition in `web/app/...`
- Put reusable presentational components in `web/components/...`
- Put pure helpers, config, and data-access helpers in `web/lib/...`
- Put shared TypeScript contracts in `web/types/...`

This keeps pages thin, shared code discoverable, and feature work easier to extend without mixing UI, business rules, and types in the same files.

## Supabase files

These files are part of the basic Supabase connection setup:

- `web/.env.example` : sample environment variables
- `web/lib/supabase/env.ts` : reads and validates Supabase environment variables
- `web/lib/supabase/client.ts` : browser Supabase client for client components
- `web/lib/supabase/server.ts` : server Supabase client for server components
- `web/lib/supabase/middleware.ts` : session refresh and route protection helper
- `web/middleware.ts` : Next.js middleware entry point
# Milkrun_Delivery_Tracker
