# Gap Lessons — what a typical full-stack bootcamp skips

The full curriculum is in `gap-lessons/` (9 phases). These are the lessons that fill the gaps in
a typical 18-week full-stack bootcamp (HTML/CSS → JS → Express → SQL → React → TypeScript →
testing → Docker → AWS). Each is placed in the week the bootcamp teaches the topic beside it.

## The three placement rules

1. **Pre-expose the layer beneath; never pre-teach the same layer.** Meeting a *component*
   concept early lowers the load when the main lesson lands. Teaching the *same* skill a rival
   way first is interference.
2. **Rival tools land the same week.** Where the bootcamp teaches one tool and these lessons
   teach its competitor, study them together: compare first, then name the principle.
3. **Read a gap lesson after the bootcamp covers the topic**, unless it is a layer beneath (rule 1).

## By bootcamp week

| Wk | Bootcamp topic | Gap lessons (`gap-lessons/phase_XX`) |
|----|----------------|--------------------------------------|
| 1–2 | HTML, CSS, Flexbox, Bootstrap | (none yet: they land in week 5, below) |
| 3–4 | Git, JS variables → objects, higher-order functions | (none yet) |
| 5 | DOM, events | **Tailwind** (1.6–1.7) · **WCAG / ARIA** (1.8) · **CSS Grid** (1.4) · **ES6+** (2.13) · **Git team workflows** (0.3) · **OOP, prototypes, `this`** (2.16) |
| 6 | Async, promises, fetch | **Error handling patterns** (2.15) · **Modules / Vite** (2.14) · **Call stack + event loop** (2.9) |
| 7 | REST, Express, MVC | **REST depth / Richardson maturity** (5.14) · **Idempotency keys** (5.15) |
| 8 | Middleware, validation, CORS | **OWASP Top 10** (7.8) · **OpenAPI / Swagger** (5.18) · **GraphQL** (5.16) · **gRPC** (5.17) · **Hono** (5.20) |
| 9 | SQL, PostgreSQL, an ORM | **Normalization 1NF–3NF + ER** (6.5) · **EXPLAIN ANALYZE + N+1** (6.10) · **Redis caching** (6.11) · **Supabase RLS** (6.8) · **Drizzle / Prisma** (6.7) |
| 10 | Auth: bcrypt, JWT, RBAC | **Real-time: WebSockets / Socket.io / SSE** (7.4) · **Supabase Auth** (6.9) |
| 11 | React components, hooks | **Accessibility in React** (4.17) |
| 12 | React Router, custom hooks | **Context + Zustand** (4.11, 4.13) · **React performance** (4.16) · **TanStack Query** (7.6) · **React Hook Form + Zod** (7.7) · **Core Web Vitals** (7.12) |
| 13 | TypeScript | **TS with the DOM** (3.6) · **React + TS** (4.14) · **Next.js core: App Router, RSC, SSR/SSG/ISR** (7.13) · **tRPC** (7.11) |
| 14 | Jest, integration tests | **Vitest** (4.18) · **Playwright E2E** (7.9) |
| 15 | Docker, Compose, reverse proxies | **Multi-stage Docker builds + networking** (8.4) · **nginx** (in phase 8) |
| 16 | AWS deploy, CI/CD | **Sentry, structured logging, uptime** (8.6) |
| 17 | Agile, code review | **Next.js production patterns** (7.14) |
| 18 | Interview prep, demo day | consolidation |

## The four paired cases

The highest-value pairs: the bootcamp's tool and its rival, studied in the same week.

| Wk | Bootcamp tool | Rival | The abstraction |
|----|---------------|-------|-----------------|
| 2–5 | Bootstrap | Tailwind | component classes vs utility classes |
| 9 | Sequelize | Drizzle / Prisma | schema-first vs code-first; what an ORM hides |
| 14 | Jest | Vitest | runners are interchangeable; test *design* is the skill |
| 15 | Caddy | nginx | reverse proxies as a category, not a config file |

Check current npm download numbers yourself before quoting popularity: they move monthly.

## Not in the bootcamp at all

Phases 0–8 also cover topics outside the gap list (e.g. HTTP and DNS in phase 0, the AI/LLM
integration lessons in phase 7). Read them as depth once the bootcamp week that relates is done.
