# Frontend architecture

Trustflow uses feature modules, with React Query as the source of truth for
server state and Zustand reserved for small client-only UI state. This avoids
duplicated API caches and keeps business capabilities independently owned.

## Directory ownership

```text
src/
├── app/                  # Routes, layouts, and route handlers only
├── features/             # Product capabilities
│   └── <feature>/
│       ├── components/   # Feature-specific UI
│       ├── services/     # API functions, query keys, React Query hooks
│       ├── hooks/        # Composed feature behavior
│       ├── stores/       # Feature UI state only, when needed
│       ├── types/        # Domain types
│       ├── utils/        # Feature-only helpers
│       └── index.ts      # Public feature API
├── shared/               # Reusable, domain-agnostic code
│   ├── components/ui/    # UI primitives
│   ├── lib/              # `api` transport and generic utilities
│   └── stores/           # App-wide UI state
├── providers/            # Query and Zustand provider implementations
├── config/               # Application-wide configuration
└── styles/               # Global styles and design tokens
```

`features/marketing` is the initial feature module. Its route imports only its
public API (`@/features/marketing`), rather than individual internal files.

## Dependency rules

```text
app → features → shared
app → shared
providers → shared
```

- Features may use `shared`, but never another feature's internal files.
- `app/` contains route assembly only; no reusable UI or business logic.
- `shared/` must not import from `features/` or `app/`.
- Promote code to `shared` only when it is genuinely domain-agnostic.
- Use `@/features/...` and `@/shared/...` across boundaries; use relative
  imports inside a component folder.

## State ownership

| State | Owner | Examples |
| --- | --- | --- |
| Server state | React Query | users, transactions, permissions, request status |
| Feature UI state | React state or feature store | current form step |
| App UI state | `shared/stores` | mobile navigation, theme, command palette |
| URL state | route/search params | filters, tabs, pagination |

Never copy React Query data into Zustand. React Query owns caching, loading,
errors, refetching, and invalidation. The mobile-navigation flag is an example
of the narrow UI state that belongs in the shared Zustand store.

## Rendering rules

Server Components are the default. Add `"use client"` only for browser APIs,
event handlers, React Query, Zustand, or client-only libraries. Keep route pages
as assembly points and render explicit loading, error, empty, and success
states for every client-side query.

## Server-state conventions

Each feature owns stable, array-based query keys. Mutations invalidate the
smallest affected key range.

```ts
export const orderKeys = {
  all: ["orders"] as const,
  list: (filters: { status?: string }) =>
    [...orderKeys.all, "list", filters] as const,
  detail: (id: string) => [...orderKeys.all, "detail", id] as const,
};
```

Use `api` from `@/shared/lib` for client requests. It throws `ApiError` for a
non-success response; surface that error in the UI rather than swallowing it.

## Review checklist

- Is the route limited to routing and feature composition?
- Is API data in React Query, not Zustand?
- Are query keys stable and mutation invalidation scoped?
- Does the feature export only a deliberate public API?
- Can the component remain a Server Component?
- Is a proposed shared abstraction actually reusable outside this feature?
