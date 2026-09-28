<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Helpdesk

Responsive ticket management application (helpdesk) with three role-based dashboards:

- **Admin**: manages the system as a whole (users, technicians, clients, and all tickets).
- **Technician**: works on the tickets assigned to them.
- **Client**: opens tickets and follows their progress.

## Project context

- The layout comes from the Figma file linked in `README.md`, and the business rules below come from the statement of the Rocketseat Full-Stack final challenge ("Gestão de chamados"). The statement's tech stack (Express, Vite, a separate API) is deliberately not followed.
- The backend (database, authentication, Server Actions) will live in this Next.js app. The frontend is being built first against sample data in `data/`, so pages and components must not need changes when the database arrives: keep `data/` functions async and returning raw typed values (`Date`, amounts in cents), and plan writes as Server Actions that call `data/`. The ORM, database and auth library are still to be chosen.

## Business rules

- **Ticket statuses**: only "Aberto" (`open`), "Em atendimento" (`in_progress`) and "Encerrado" (`closed`). The admin can set any status, including reopening. The assigned technician only moves forward: starting a ticket sets "Em atendimento" and closing it sets "Encerrado". The client can't change anything on a ticket after creating it.
- **Tickets**: a client creates tickets, choosing a service category and an available technician as the one responsible. Every ticket has at least one service, and the assigned technician can add more. A ticket shows the price of the requested service, the price of each additional service and the total.
- **Services**: only the admin creates, edits and deactivates them, and each one has a price. Deactivating is a soft delete: the service stops appearing when creating tickets but stays on existing ones.
- **Admin**: creates, lists and edits technician accounts (with a temporary password the technician changes after the first login; technicians are never deleted), lists, edits and deletes client accounts, and lists all tickets.
- **Technician**: edits their own profile, including a photo, lists the tickets assigned to them and adds services to them. Can't create tickets or manage client accounts. New technicians default to 08:00–12:00 and 14:00–18:00, stored as a list of hours (`["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]`).
- **Client**: creates, edits and deletes their own account, including a photo, and sees the history of their tickets. Deleting a client account, by the client or the admin, also deletes all of its tickets.
- **Access**: every screen except sign-in and sign-up requires authentication, and each role only reaches its own area and data.
- **Sample data** (in `data/` as each screen is built, and later the database seed): one admin; three technicians working 08–12 and 14–18, 10–14 and 16–20, and 12–16 and 18–22; at least five services (e.g. software installation, hardware installation, virus removal, printer support, backup and data recovery).

## Stack

- Next.js 16 (App Router, `app/` directory) with React 19
- TypeScript
- Tailwind CSS v4
- Tailwind Variants (`tailwind-variants`) for component variants
- Base UI (`@base-ui/react`) for unstyled interactive primitives
- Lucide icons (`lucide-react`)
- ESLint
- Prettier

## Commands

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run lint`: run ESLint
- `npm run typecheck`: generate Next.js route types and run the TypeScript compiler
- `npm run format`: format all files with Prettier

## Guidelines

- Code is indented with 4 spaces (see `.prettierrc.json`). Run `npm run format` after editing files.
- A pre-commit hook (husky + lint-staged) runs ESLint and Prettier on staged files, then `npm run typecheck`, and blocks commits with lint or type errors. Fix the errors instead of bypassing it with `--no-verify`.
- Commit messages are written in English and follow [Conventional Commits](https://www.conventionalcommits.org/), enforced by commitlint in a commit-msg hook: `type(optional scope): subject`, with a lowercase subject and no trailing period. Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Typed routes are enabled (`typedRoutes` in `next.config.ts`), so `<Link href>` and router calls must point to existing routes.
- Import from other folders with the `@/` alias, which points to the project root (e.g. `@/lib/tickets`, `@/components/tickets/ticket-card`). Use relative `./` imports only for files in the same folder. Prettier sorts imports into groups (packages, `@/`, relative), so don't order them by hand.
- Every screen must be responsive and work on mobile, tablet, and desktop.
- Design tokens live in `app/theme.css`; `app/globals.css` only holds imports and global styles.
- Use only the design system colors defined in `app/theme.css` (e.g. `bg-blue-base`, `text-gray-200`, `bg-feedback-done`). Tailwind's default palette is disabled, and the gray scale is inverted compared to Tailwind's: `gray-100` is the darkest and `gray-600` the lightest.
- Typography uses Lato (400 and 700, normal and italic; italic is used for input helper text) and the design system sizes in `app/theme.css`: `text-xl` (24px), `text-lg` (20px), `text-md` (16px), `text-sm` (14px), `text-xs` (12px), `text-xxs` (10px). These replace Tailwind's scale (no `text-base`, `text-2xl`, etc.). `text-xl`, `text-lg`, and `text-xxs` are bold by default (`text-xxs` also has 6% letter spacing); `text-xxs` is always paired with `uppercase`. Only `font-normal` and `font-bold` exist.
- Border radius uses the design system scale in `app/theme.css`: `rounded-sm` (5px: buttons, tags, menus), `rounded-md` (10px: cards, tables, modals), `rounded-lg` (20px: content panels), plus `rounded-full` for avatars and status tags. Tailwind's default radius scale is disabled.
- The only shadow is `shadow-md` (dropdowns) from `app/theme.css`; Tailwind's default shadow scales (`shadow`, `inset-shadow`, `drop-shadow`, `text-shadow`) are disabled.
- Build menus, popovers, dialogs, selects and similar interactive primitives with Base UI (`@base-ui/react`) and style them with Tailwind; don't hand-roll focus management, keyboard navigation or positioning. Its docs ship with the package in `node_modules/@base-ui/react/docs/`. Dropdown styles are shared in `components/ui/dropdown.ts`.
- Every page that reads data gets a `loading.tsx` with a skeleton that mirrors its layout, built from `Skeleton` (`@/components/ui/skeleton`) plus a visually hidden `role="status"` message. Keep each skeleton in the same file as the component it mirrors (e.g. `TicketInfoCardSkeleton` in `components/tickets/ticket-details.tsx`) so they change together. A `loading.tsx` also wraps every nested route, so when a page has child routes, put the page and its `loading.tsx` in a route group (e.g. `app/admin/tickets/(list)/`) so its skeleton doesn't show on the children. Actions that write data show their pending state (disabled button, "Salvando…") with the pending flag `useActionState` returns as its third value (`const [state, formAction, isPending] = useActionState(...)`).
- Each role has its own route segment (`app/admin`, later `app/client` and `app/technician`), whose layout renders `DashboardShell` with that role's menu.
- Each page exports `metadata` with only its own name as `title` (e.g. `title: "Chamados"`); the root layout's `title.template` renders it as "Chamados | Helpdesk".
- Build component variants with `tv` from `@/lib/variants`, which teaches the class merger the design system sizes (without it, `text-xxs` is read as a color and dropped). ESLint blocks importing `tv` from `tailwind-variants` directly.
- Import icons only from `@/components/icons`, which re-exports the Lucide icons from the Figma "Ícones" frame (plus the `LucideIcon` type). ESLint blocks importing from `lucide-react` directly. Don't add icons that aren't in the design; if the design gains one, export it from `components/icons.ts`. Size icons with Tailwind (`size-4`) and color them with `text-*` classes; they inherit `currentColor`.
- Enforce role-based access on the server, not only by hiding UI elements.

## Code Conventions

- Name files and folders in kebab-case (`ticket-card.tsx`); the exported component stays PascalCase (`TicketCard`).
- Write identifiers in English, including domain terms (`ticket`, `technician`, `client`) and route segments, since they become URLs (`app/tickets` → `/tickets`); user-facing text is in Portuguese (pt-BR).
- Use names that say what a value is within its scope: `assignedTickets` over `data` or `result`, `isTicketClosed` over `flag`. Avoid vague names like `data`, `temp`, or `x`.
- Don't reinvent the wheel: before hand-rolling a solution to a well-known problem (dates, validation, forms, accessible menus and dialogs, etc.), check whether the platform (Web APIs, `Intl`, React, Next.js) or an established library already solves it. Prefer the platform when it's enough (`Intl` for dates and currency), then a mature library (Base UI for interactive primitives, Zod for validation, date-fns for date math). If you still write it by hand, say why.
- Keep functions and components focused on one responsibility. Extract a block when it has a clear purpose and earns a name, not before, and don't add abstractions or options for hypothetical future needs.
- Keep logic out of the JSX, so the returned markup reads as a composition of tags: compute derived values above the `return`, and move them to `lib/` or a hook when they're domain rules, reused, or long. Screens hold only their data, state, handlers, and JSX. Simple conditionals and `.map` stay inline.
- Organize `components/` by domain: `ui/` for design system primitives (buttons, inputs, tables, tags), `dashboard/` for the dashboard shell (sidebar, headers, menus), and one folder per domain for its screens' pieces (`tickets/`, later `technicians/`, `clients/`, `services/`). Components used across domains (`logo.tsx`, `user-label.tsx`, `icons.ts`) stay at the root of `components/`.
- Put data access in `data/` (e.g. `@/data/tickets`), the Data Access Layer: each file starts with `import "server-only"`, performs the authorization checks, and is the only place that touches the database and secret environment variables.
- Put pure helpers in `lib/` (safe to import on both server and client) and client hooks in `hooks/`. Keep constants used by a single file in that file; move them to `lib/` once they're shared.
- Name a function `use*` only if it calls React hooks; logic that only transforms its inputs is a plain function.
- Components are Server Components by default. Add `"use client"` only to the smallest component that needs state, effects, or browser APIs.
