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

## Stack

- Next.js 16 (App Router, `app/` directory) with React 19
- TypeScript
- Tailwind CSS v4
- Tailwind Variants (`tailwind-variants`) for component variants
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
- Import from other folders with the `@/` alias, which points to the project root (e.g. `@/lib/tickets`, `@/components/ticket-card`). Use relative `./` imports only for files in the same folder. Prettier sorts imports into groups (packages, `@/`, relative), so don't order them by hand.
- Every screen must be responsive and work on mobile, tablet, and desktop.
- Design tokens live in `app/theme.css`; `app/globals.css` only holds imports and global styles.
- Use only the design system colors defined in `app/theme.css` (e.g. `bg-blue-base`, `text-gray-200`, `bg-feedback-done`). Tailwind's default palette is disabled, and the gray scale is inverted compared to Tailwind's: `gray-100` is the darkest and `gray-600` the lightest.
- Typography uses Lato (400 and 700, normal and italic; italic is used for input helper text) and the design system sizes in `app/theme.css`: `text-xl` (24px), `text-lg` (20px), `text-md` (16px), `text-sm` (14px), `text-xs` (12px), `text-xxs` (10px). These replace Tailwind's scale (no `text-base`, `text-2xl`, etc.). `text-xl`, `text-lg`, and `text-xxs` are bold by default (`text-xxs` also has 6% letter spacing); `text-xxs` is always paired with `uppercase`. Only `font-normal` and `font-bold` exist.
- Border radius uses the design system scale in `app/theme.css`: `rounded-sm` (5px: buttons, tags, menus), `rounded-md` (10px: cards, tables, modals), `rounded-lg` (20px: content panels), plus `rounded-full` for avatars and status tags. Tailwind's default radius scale is disabled.
- Each page exports `metadata` with only its own name as `title` (e.g. `title: "Chamados"`); the root layout's `title.template` renders it as "Chamados | Helpdesk".
- Build component variants with `tv` from `@/lib/variants`, which teaches the class merger the design system sizes (without it, `text-xxs` is read as a color and dropped). ESLint blocks importing `tv` from `tailwind-variants` directly.
- Import icons only from `@/components/icons`, which re-exports the Lucide icons from the Figma "Ícones" frame (plus the `LucideIcon` type). ESLint blocks importing from `lucide-react` directly. Don't add icons that aren't in the design; if the design gains one, export it from `components/icons.ts`. Size icons with Tailwind (`size-4`) and color them with `text-*` classes; they inherit `currentColor`.
- Enforce role-based access on the server, not only by hiding UI elements.

## Code Conventions

- Name files and folders in kebab-case (`ticket-card.tsx`); the exported component stays PascalCase (`TicketCard`).
- Write identifiers in English, including domain terms (`ticket`, `technician`, `client`) and route segments, since they become URLs (`app/tickets` → `/tickets`); user-facing text is in Portuguese (pt-BR).
- Use names that say what a value is within its scope: `assignedTickets` over `data` or `result`, `isTicketClosed` over `flag`. Avoid vague names like `data`, `temp`, or `x`.
- Keep functions and components focused on one responsibility. Extract a block when it has a clear purpose and earns a name, not before, and don't add abstractions or options for hypothetical future needs.
- Keep logic out of the JSX, so the returned markup reads as a composition of tags: compute derived values above the `return`, and move them to `lib/` or a hook when they're domain rules, reused, or long. Screens hold only their data, state, handlers, and JSX. Simple conditionals and `.map` stay inline.
- Put data access in `data/` (e.g. `@/data/tickets`), the Data Access Layer: each file starts with `import "server-only"`, performs the authorization checks, and is the only place that touches the database and secret environment variables.
- Put pure helpers in `lib/` (safe to import on both server and client) and client hooks in `hooks/`. Keep constants used by a single file in that file; move them to `lib/` once they're shared.
- Name a function `use*` only if it calls React hooks; logic that only transforms its inputs is a plain function.
- Components are Server Components by default. Add `"use client"` only to the smallest component that needs state, effects, or browser APIs.
