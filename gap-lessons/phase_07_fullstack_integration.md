# Full Stack — Phase 7: Full Stack Integration + Next.js
## Connecting frontend + backend + database into one working app. AI integration.

---

## Phase-Opening Misconception

"Full stack just means the frontend talks to the backend."

Full stack engineering is about the seams: CORS policies, real-time sync, authentication that spans frontend and backend, data fetching strategies that balance performance and freshness, AI integration that doesn't leak API keys or blow past cost budgets. Getting any one piece right is straightforward. Getting all of them right simultaneously — and keeping them maintainable — is the actual skill.

---

## Lesson 7.1: Full Stack Architecture

### How the Pieces Connect

```
Browser (React)
  ↕ HTTPS (fetch, React Query, tRPC, WebSocket)
Next.js Server (App Router)
  ↕ API calls (Server Actions, API routes)
  ↕ Supabase Client (auth + data)
FastAPI Backend (Python, for AI features)
  ↕ Claude API (AI responses)
  ↕ OpenAI API (embeddings)
PostgreSQL (via Supabase)
  ↕ pgvector (RAG retrieval)
Redis (caching, sessions, queues)
```

### Where Logic Lives

**In the database:**
- Data constraints (NOT NULL, CHECK, UNIQUE, FK)
- Row Level Security (who can access which rows)
- Indexes (query performance)
- Complex aggregations (COUNT, SUM with GROUP BY — database does this faster than app code)

**In the backend (FastAPI / Next.js API routes):**
- Business logic (course limit per user, enrollment rules)
- Authentication and authorization
- Input validation beyond DB constraints
- AI API calls, external service calls
- Data transformation before sending to frontend

**In the frontend (React):**
- UI state (loading, open/closed, selected item)
- Form state
- Client-side routing
- Optimistic updates (show success immediately, rollback if server fails)

**Never in the frontend:**
- Authentication decisions ("is this user allowed?") — always verify server-side
- Database queries
- Secret API keys
- Business rule enforcement

---

## Lesson 7.2: CORS

### What CORS Is

Cross-Origin Resource Sharing. A browser security policy: by default, a web page at `example.com` cannot make fetch requests to `api.example.com` — different origin (different subdomain counts).

**Origin = protocol + hostname + port.** `http://localhost:3000` and `http://localhost:3001` are different origins.

### How CORS Works

```
Browser: "I want to make a cross-origin request from example.com to api.example.com"
Browser sends preflight OPTIONS request:
  OPTIONS /api/courses
  Origin: https://example.com
  Access-Control-Request-Method: POST
  Access-Control-Request-Headers: Content-Type, Authorization

Server must respond with:
  Access-Control-Allow-Origin: https://example.com
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
  Access-Control-Allow-Headers: Content-Type, Authorization
  Access-Control-Max-Age: 86400  (cache preflight for 24h)

Then browser allows the actual request.
```

### Configuring CORS

```python
# FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
  CORSMiddleware,
  allow_origins=["https://example.com", "http://localhost:3000"],  # explicit list
  allow_credentials=True,  # allow cookies/auth headers
  allow_methods=["GET", "POST", "PUT", "DELETE"],
  allow_headers=["Content-Type", "Authorization"],
)

# NEVER in production:
allow_origins=["*"]  # allows ANY site to call your API — security disaster for auth endpoints
```

---

## Lesson 7.4: Real-Time

### WebSockets

WebSockets maintain a persistent bidirectional connection. Unlike HTTP (one request → one response → connection closes), a WebSocket stays open and both sides can send messages at any time.

```javascript
// Client (browser)
const ws = new WebSocket("wss://api.example.com/ws");

ws.onopen = () => {
  ws.send(JSON.stringify({ type: "subscribe", courseId: "course_123" }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === "lesson_update") {
    updateLesson(message.data);
  }
};

ws.onclose = () => {
  // Reconnect with exponential backoff
  setTimeout(() => reconnect(), backoff());
};
```

```javascript
// Server (Node.js with ws library)
import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

const subscriptions = new Map();  // courseId → Set of WebSocket connections

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const message = JSON.parse(data);
    if (message.type === "subscribe") {
      if (!subscriptions.has(message.courseId)) {
        subscriptions.set(message.courseId, new Set());
      }
      subscriptions.get(message.courseId).add(ws);
    }
  });

  ws.on("close", () => {
    subscriptions.forEach(clients => clients.delete(ws));
  });
});

// Broadcast to all subscribers
function broadcast(courseId, message) {
  const clients = subscriptions.get(courseId) ?? new Set();
  const data = JSON.stringify(message);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
```

### Supabase Realtime

Supabase Realtime is built on PostgreSQL's logical replication. When a row changes in the database, subscribed clients receive the update.

```typescript
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(URL, ANON_KEY);

// Subscribe to changes on a table
const channel = supabase
  .channel("course-updates")
  .on(
    "postgres_changes",
    {
      event: "*",           // INSERT, UPDATE, DELETE
      schema: "public",
      table: "materials",
      filter: `course_id=eq.${courseId}`,
    },
    (payload) => {
      console.log("Material changed:", payload.new);
      refreshMaterials();
    }
  )
  .subscribe();

// Cleanup on component unmount
return () => supabase.removeChannel(channel);
```

**WebSockets vs Supabase Realtime vs SSE:**
- **WebSockets:** bidirectional, use when client also needs to send real-time data (collaborative editing, chat)
- **Supabase Realtime:** easiest setup for database-driven updates, already in your stack
- **SSE (Server-Sent Events):** server → client only, simpler than WebSockets when you don't need bidirectional

---

## Lesson 7.6: React Query / TanStack Query

### Why React Query

Manual `useEffect` + `useState` for data fetching works but misses: automatic retries, background refetching, cache deduplication, loading states across components, pagination, optimistic updates. React Query adds all of these.

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetching data
function CourseList() {
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ["courses"],          // cache key — same key = shared cache
    queryFn: () => fetchCourses(),  // the fetch function
    staleTime: 1000 * 60 * 5,      // data is fresh for 5 minutes (no refetch)
    refetchOnWindowFocus: true,     // refetch when user returns to tab
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <>{courses.map(c => <CourseCard key={c.id} course={c} />)}</>;
}

// Mutations (create, update, delete)
function CreateCourseForm() {
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: (data) => createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      // invalidate cache → React Query refetches "courses" automatically
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      createMutation.mutate({ name: e.target.name.value });
    }}>
      <button disabled={createMutation.isPending}>
        {createMutation.isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
```

---

## Lesson 7.7: Forms with React Hook Form + Zod

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define schema with Zod
const courseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().max(500).optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

function CreateCourseForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = async (data: CourseFormData) => {
    await createCourse(data);  // type-safe, validated data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Course Name</label>
        <input id="name" {...register("name")} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Course"}
      </button>
    </form>
  );
}
```

---

## Lesson 7.8: Security Fundamentals — OWASP Top 10, XSS, CSRF, Injection

### The Misconception

"Security is a later concern — I'll harden it before launch."

Every item below is a *design* decision, not a hardening pass. The OWASP Top 10:2025 is compiled
from more than 2.8 million applications, and the two categories this lesson covers are among the
most frequently observed: **Injection (A05:2025) appears 1,404,249 times, at 3.08% average
incidence**, and **Authentication Failures (A07:2025) 1,120,673 times**. One of two categories new in 2025 —
**Mishandling of Exceptional Conditions (A10:2025), 769,581 occurrences** — is the one this
curriculum already teaches in Lesson 5.13.

### Injection: Parameterize, Always

The rule is mechanical: user input never becomes part of a query string. It travels as a parameter,
which the driver sends separately from the SQL text.

```javascript
// WRONG — the input IS the query. "'; DROP TABLE courses; --" ends the session's day.
const rows = await db.query(`SELECT * FROM courses WHERE user_id = '${req.user.userId}'`);

// RIGHT — $1 is a placeholder; the value is transmitted apart from the statement
const rows = await db.query("SELECT * FROM courses WHERE user_id = $1", [req.user.userId]);
```

**An ORM does not make you safe by itself.** The safety comes from parameterization, so the moment
you drop to raw SQL you are back to doing it by hand.

```typescript
// Drizzle: the sql template tag parameterizes interpolations
await db.execute(sql`SELECT * FROM courses WHERE name = ${userInput}`);   // safe

// The same library, unsafe — string concatenation before the tag sees it
await db.execute(sql.raw("SELECT * FROM courses WHERE name = '" + userInput + "'"));
```

The same rule generalizes past SQL: never build a shell command, a file path, or a NoSQL filter by
concatenating user input.

### XSS: What React Gives You, and Where the Hole Is

React escapes interpolated values, so `{userComment}` renders as text even if it contains a script
tag. There are exactly two common ways to give that protection away.

```jsx
// 1. dangerouslySetInnerHTML — the name is the warning
<div dangerouslySetInnerHTML={{ __html: lesson.body }} />          // stored XSS if body is user content

// Sanitize first if you must render HTML at all.
// DOMPurify needs a DOM: in a Next.js Server Component (the default) this throws. Either
// mark the component "use client", or use isomorphic-dompurify, or construct it against
// jsdom on the server: createDOMPurify(new JSDOM("").window)
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(lesson.body) }} />

// 2. A URL taken from user input
<a href={profile.website}>Site</a>        // "javascript:fetch('/api/keys').then(...)" executes on click
const safe = /^https?:\/\//.test(profile.website) ? profile.website : "#";
```

A Content-Security-Policy header is the backstop: it tells the browser which script sources are
allowed, so an injected inline script does not run even if one slips through.

```javascript
import helmet from "helmet";
app.use(helmet());   // sets CSP, X-Content-Type-Options, Referrer-Policy and more
```

Expect to configure it. Helmet's default CSP is `default-src 'self'`, which **blocks every
CDN script and every inline `<script>` or `onclick` you have** — a blank page with console
errors, not a warning. Its HSTS default is also a year, which will pin `https://localhost` in
development if you are not careful.

### CSRF: The Attack That Needs No XSS

A page on another origin makes the browser send a request to your API. The browser **attaches your
cookies automatically**, so the request arrives authenticated even though the user never intended
it.

```html
<!-- On evil.example. The victim is logged into StudyApp in another tab. -->
<form action="https://example.com/api/account/delete" method="POST">
  <input type="hidden" name="confirm" value="yes">
</form>
<script>document.forms[0].submit();</script>
```

**What does not help here: CORS.** Lesson 7.2 taught it as the cross-origin control, so this
is the moment to be precise — that form is a "simple request", so there is no preflight. The
browser sends it and your server acts on it. CORS only stops the attacker's JavaScript from
*reading* the response, and by then the write has happened. CORS is not a CSRF defense.

**Whether you are exposed depends on how you authenticate:**

| Auth mechanism | CSRF exposure | The trade |
|---|---|---|
| Session cookie | Yes — cookies are sent automatically cross-site | Set `SameSite=Lax` **explicitly** — Chromium defaults to it, Firefox and Safari do **not** — plus a CSRF token on state-changing requests |
| `Authorization: Bearer` header | No — the attacker's page cannot add your header | But a token in `localStorage` is readable by any XSS, which cookies with `HttpOnly` are not |

```javascript
// Cookie sessions: the flags are the control
res.cookie("sid", sessionId, {
  httpOnly: true,     // JavaScript cannot read it — blunts XSS token theft
  secure: true,       // HTTPS only
  sameSite: "lax",    // not sent on cross-site POST
  maxAge: 1000 * 60 * 60 * 24 * 7,
});
```

Neither choice is safe on its own, and neither forces you to accept the other attack. Cookie
sessions need `SameSite` **plus** a CSRF token (OWASP recommends a synchronizer token, or a
signed double-submit cookie when you need to stay stateless) and the `__Host-` prefix. Bearer
tokens need you to keep XSS out, which is what the section above is for. You are choosing
which class you must mitigate explicitly — not which one you have to live with.

### Secrets

**28.65 million new hardcoded secrets were detected in public GitHub commits in 2025** (GitGuardian,
State of Secrets Sprawl 2026). Server-side keys go in the environment, are never referenced in
client code, and are rotated once exposed.

```javascript
// Next.js makes the boundary explicit: NEXT_PUBLIC_ is compiled into the browser bundle
const key = process.env.ANTHROPIC_API_KEY;                  // server only — correct
const leaked = process.env.NEXT_PUBLIC_ANTHROPIC_KEY;       // shipped to every visitor — never
```

Add `.env*` to `.gitignore` before the first commit, not after. A secret committed once lives in the
history even after you delete the line, so the fix is rotation, not a follow-up commit.

### The Checklist

- Every query parameterized; no string-built SQL, shell commands or paths
- No `dangerouslySetInnerHTML` on user content without sanitization; URLs scheme-checked
- `helmet()` on, CSP set
- Cookies `httpOnly` + `secure` + `sameSite`; or Bearer tokens with the XSS trade understood
- Authorization checked per request on the server — never by hiding a button
- Secrets in the environment, `.env` ignored, rotated on exposure
- Validation at the boundary with a schema (Lessons 5.7–5.8), errors handled (Lesson 5.13)

---

## Lesson 7.9: End-to-End Testing with Playwright

### Where E2E Sits

Unit tests check a function. Integration tests check your API through real HTTP (Lesson 5.12).
**End-to-end tests drive a real browser against the running app** — the only level that proves the
frontend, the API and the database work *together*, and the only one that catches "the button is
disabled because the CSS class never applied."

They are also the slowest and the most brittle, so the rule is few and high-value: the flows whose
failure means the product is down. For StudyApp that is sign in, upload material, generate a
lesson, take an exam.

### A First Test

```typescript
// e2e/courses.spec.ts
import { test, expect } from "@playwright/test";

test("a signed-in user can create a course and see it listed", async ({ page }) => {
  await page.goto("/courses");

  await page.getByRole("button", { name: "New course" }).click();
  await page.getByLabel("Course name").fill("Databases");
  await page.getByRole("button", { name: "Create" }).click();

  await expect(page.getByRole("heading", { name: "Databases" })).toBeVisible();
});
```

Two things in that test are deliberate:

**Query by role and label, not by CSS class.** `getByRole("button", { name: "New course" })` finds
the element the way a screen reader would. A class-based selector (`.btn-primary-2`) breaks on every
restyle and proves nothing about accessibility; a role-based one fails loudly when a `<div onclick>`
replaces a `<button>` — the exact defect Lesson 1.8 teaches you to avoid.

**No waits.** Playwright auto-waits for each element to be visible, enabled and stable before
acting, and `expect(...).toBeVisible()` retries until it passes or times out. Adding
`waitForTimeout(2000)` is how a suite becomes both slow and flaky — if something needs a sleep, the
test is asserting on the wrong signal.

### Page Object Model — Keep Selectors in One Place

Once you have a dozen tests, every one of them knows how to log in. Change the login form and you
edit a dozen files.

```typescript
// e2e/pages/CoursesPage.ts
import { Page, expect } from "@playwright/test";

export class CoursesPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/courses");
  }

  async create(name: string) {
    await this.page.getByRole("button", { name: "New course" }).click();
    await this.page.getByLabel("Course name").fill(name);
    await this.page.getByRole("button", { name: "Create" }).click();
  }

  async expectListed(name: string) {
    await expect(this.page.getByRole("heading", { name })).toBeVisible();
  }
}

// e2e/courses.spec.ts
test("creates a course", async ({ page }) => {
  const courses = new CoursesPage(page);
  await courses.goto();
  await courses.create("Databases");
  await courses.expectListed("Databases");
});
```

### Log In Once, Not Per Test

Signing in through the UI in every test multiplies the slowest flow by the size of your suite. Do it
once in setup, save the browser state, and reuse it.

```typescript
// e2e/auth.setup.ts
import { test as setup } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(process.env.E2E_USER!);
  await page.getByLabel("Password").fill(process.env.E2E_PASS!);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("/courses");
  await page.context().storageState({ path: "e2e/.auth/user.json" });
});

// Add e2e/.auth/ to .gitignore. That file holds a real signed-in session — committing it is
// committing a credential. In CI, re-derive it from E2E_USER / E2E_PASS secrets.

// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,   // in CI, always start a clean server
  },
  retries: process.env.CI ? 2 : 0,          // top-level
  use: {
    trace: "on-first-retry",                // inside `use`
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: "e2e/.auth/user.json" },
      dependencies: ["setup"],
    },
  ],
});
```

`webServer` means the suite starts the app itself, so `npx playwright test` is the whole command
locally and in CI.

### Debugging, and CI

```bash
npx playwright test --ui          # time-travel runner: step through, inspect the DOM at each action
npx playwright test --debug       # step with the inspector open
npx playwright show-trace trace.zip   # a failed CI run, replayed locally with screenshots and network
```

The trace is what makes E2E failures diagnosable rather than infuriating: on a CI failure you get
the DOM, console and network at every step instead of one screenshot. Turn it on for retries only,
so passing runs stay fast.

In GitHub Actions the browsers must be installed in the runner — `npx playwright install
--with-deps` (add `--only-shell` to skip full Chromium on a headless runner) — and the report
uploaded as an artifact. Lesson 8.5 builds the pipeline but has no E2E job yet; adding one is
the natural exercise once this suite is green.

### What Not to E2E

Anything a cheaper test can prove. Validation messages, error states and edge cases belong in unit
and integration tests; a browser is a slow way to check that a 400 has the right shape. Keep the E2E
suite to the handful of flows you would roll back a deploy for.

---

## Lessons 7.10, 7.10a, 7.10b: AI Integration

### Wiring Up the Claude API

```typescript
// app/api/ai/lesson/route.ts — Next.js API route
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,  // server-side only — never expose to client
});

export async function POST(request: Request) {
  const { concept, retrievedChunks, userId } = await request.json();

  // Rate limiting check before the expensive API call
  const allowed = await checkRateLimit(userId, "lesson_generation", { limit: 10, window: 3600 });
  if (!allowed) {
    return new Response("Rate limit exceeded", { status: 429 });
  }

  // Streaming response to the browser
  const stream = await anthropic.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Based on this course material, explain "${concept}":

${retrievedChunks}

Use the Feynman teaching method. Include: misconception, plain English definition, why it exists, analogy, real system connection, and a Feynman check question.`,
      },
    ],
    system: STATIC_LESSON_SYSTEM_PROMPT,
  });

  // Stream the response back to the browser
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta") {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
```

```typescript
// Client: consuming the stream
async function loadLesson(concept: string) {
  setLoading(true);
  setContent("");

  const response = await fetch("/api/ai/lesson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ concept }),
  });

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    setContent(prev => prev + decoder.decode(value));  // update as chunks arrive
  }

  setLoading(false);
}
```

### Structured Output with Zod

```typescript
import { z } from "zod";

const weakSpotAnalysisSchema = z.object({
  detected_weak_spots: z.array(z.object({
    concept: z.string(),
    confidence: z.enum(["low", "medium", "high"]),
    reason: z.string(),
  })),
  overall_understanding: z.enum(["poor", "developing", "solid"]),
  next_topic_recommendation: z.string(),
});

// Ask Claude for structured output
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [
    {
      role: "user",
      content: `Analyze this student's explanation of B-trees:
"${studentExplanation}"

Return a JSON object matching this schema: ${JSON.stringify(weakSpotAnalysisSchema.shape)}`,
    },
  ],
});

// Extract and validate JSON
const rawJson = response.content[0].text;
const jsonMatch = rawJson.match(/\{[\s\S]*\}/);
if (!jsonMatch) throw new Error("No JSON in response");

const analysis = weakSpotAnalysisSchema.parse(JSON.parse(jsonMatch[0]));
// analysis is fully typed and validated
```

### Prompt Versioning

```typescript
// prompts/lesson.ts — prompts are code, version-controlled
export const LESSON_PROMPT_V2 = {
  version: "2.0",
  system: `You are StudyApp's AI tutor...`,
  template: (concept: string, materials: string) => `
    Based on these materials:
    ${materials}
    
    Teach "${concept}" using the Feynman method.
  `,
};

// Track which prompt version generated each lesson (for A/B testing)
await db.insert(lessonLog).values({
  userId,
  concept,
  promptVersion: LESSON_PROMPT_V2.version,
  tokensUsed: response.usage.output_tokens,
  generatedAt: new Date(),
});
```

### Cost Tracking Per Request

```typescript
// Track costs per user/request
const tokenCost = {
  "claude-sonnet-4-6": { input: 3.00, output: 15.00 },  // per million tokens
};

function calculateCost(model: string, inputTokens: number, outputTokens: number): number {
  const pricing = tokenCost[model];
  return (inputTokens * pricing.input + outputTokens * pricing.output) / 1_000_000;
}

const response = await anthropic.messages.create({ /* ... */ });
const cost = calculateCost(
  "claude-sonnet-4-6",
  response.usage.input_tokens,
  response.usage.output_tokens
);

// Store for monitoring
await db.insert(aiUsageLog).values({
  userId,
  model: "claude-sonnet-4-6",
  inputTokens: response.usage.input_tokens,
  outputTokens: response.usage.output_tokens,
  costUsd: cost,
  requestType: "lesson_generation",
});
```

### Basic RAG Pipeline

```typescript
// Embed user's question
const questionEmbedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: userQuestion,
});

// Retrieve relevant chunks from pgvector
const { data: chunks } = await supabase.rpc("match_chunks", {
  query_embedding: questionEmbedding.data[0].embedding,
  match_threshold: 0.5,
  match_count: 5,
  p_course_id: courseId,
});

// Augment the prompt with retrieved context
const context = chunks.map(c => c.content).join("\n\n---\n\n");
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 2048,
  messages: [{
    role: "user",
    content: `Using only the following course materials, answer: "${userQuestion}"\n\n${context}`,
  }],
});
```

---

## Lesson 7.11: tRPC

### End-to-End Type Safety Without Code Generation

```typescript
// server/routers/courses.ts
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const coursesRouter = router({
  list: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(10) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.courses.findMany({
        where: eq(courses.userId, ctx.user.id),
        limit: input.limit,
      });
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(2).max(100) }))
    .mutation(async ({ ctx, input }) => {
      const [course] = await ctx.db.insert(courses).values({
        userId: ctx.user.id,
        name: input.name,
      }).returning();
      return course;
    }),
});

// Client — TypeScript knows the exact return type automatically
const { data: courses } = trpc.courses.list.useQuery({ limit: 20 });
// courses is: Course[] | undefined — fully typed, no manual type import

const createMutation = trpc.courses.create.useMutation();
await createMutation.mutateAsync({ name: "New Course" });
// If you pass { name: 123 } — TypeScript error at compile time
```

---

## Lesson 7.12: Core Web Vitals

### The Three Metrics Google Measures

**LCP (Largest Contentful Paint):** How long until the main content appears. Target: < 2.5 seconds.
- Fix: use `<Image>` from `next/image` (auto-optimization), preload critical resources, eliminate render-blocking scripts

**INP (Interaction to Next Paint):** How fast the page responds to user clicks. Target: < 200ms.
- Fix: break long JavaScript tasks into smaller chunks, defer non-critical work

**CLS (Cumulative Layout Shift):** How much the layout jumps as content loads. Target: < 0.1.
- Fix: always specify width and height on images, use skeleton loading placeholders

### Next.js Performance Features

```typescript
// next/image — automatic optimization, lazy loading, correct sizing
import Image from "next/image";
<Image src="/hero.png" alt="Hero" width={800} height={400} priority />
// priority: preload above-the-fold images (only use for hero/LCP element)

// next/font — eliminate FOUT (flash of unstyled text)
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
// fonts load inline — no separate network request

// dynamic() — code split and lazy load components
import dynamic from "next/dynamic";
const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <ChartSkeleton />,
  ssr: false,    // don't render on server (useful for browser-only libraries)
});

// Bundle analyzer
// next.config.ts:
const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: true });
```

---

## Lessons 7.13–7.14: Next.js

### App Router — Server vs Client Components

```typescript
// SERVER component (default in App Router — runs on server, no "use client")
// - Can access databases and APIs directly
// - Cannot use useState, useEffect, event handlers
// - Rendered HTML is sent to browser (fast, SEO-friendly)
async function CourseList() {
  const courses = await db.query.courses.findMany();  // direct DB access — no API call
  return <ul>{courses.map(c => <li key={c.id}>{c.name}</li>)}</ul>;
}

// CLIENT component ("use client" directive at top)
// - Runs in browser
// - Can use useState, useEffect, event handlers
// - Cannot directly access databases
"use client";
import { useState } from "react";

function CourseFilter() {
  const [filter, setFilter] = useState("");
  return <input value={filter} onChange={e => setFilter(e.target.value)} />;
}
```

**Mental model:** Start server-side. Only move to client when you need interactivity.

### Data Fetching Strategies

```typescript
// Server Component — runs on every request
async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);    // fresh on every request
  return <CourseView course={course} />;
}

// generateStaticParams — Static Site Generation for known pages
export async function generateStaticParams() {
  const courses = await db.getAllCourses();
  return courses.map(c => ({ id: c.id }));
}
// These pages are pre-built at deploy time — instant response

// revalidate — Incremental Static Regeneration
export const revalidate = 60;  // rebuild page at most once per 60 seconds
```

### Authentication in Next.js with Supabase

```typescript
// middleware.ts — runs on EVERY request before rendering
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });
  
  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession();
  
  // Redirect unauthenticated users
  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
```

---

## Phase 7 Projects

### P1: Real-Time Collaborative System Design Tool
Multi-user architecture diagram builder:
- React + TypeScript frontend
- WebSockets for live sync (draw shapes → all users see updates)
- Node.js + PostgreSQL backend (persist diagram state)
- AI design review (paste your diagram description → Claude reviews it)
- Shareable public links (anyone can view without account)
- Deployed live

### Milestone: AI Practice Exam Generator (Portfolio Project 1)
Full product, wired end to end:
- Next.js frontend + FastAPI backend + PostgreSQL + Supabase Auth
- Upload course material (PDF) → chunked + embedded → stored in pgvector
- Claude API generates exam questions from material
- Timed exam UI (from Phase 4 shell)
- Results breakdown + score history
- Demo mode (no account needed)
- Deployed live to Vercel with custom domain

---

## Phase 7 Check

**Feynman checks:**

1. What is CORS and when does it trigger? Why does `allow_origins=["*"]` break authentication?

2. What is the difference between a React Query `queryKey` and a `mutationFn`? What does `invalidateQueries` do?

3. What is the difference between a Server Component and a Client Component in Next.js App Router? When do you add `"use client"`?

4. Why should API keys for Claude/OpenAI never appear in client components? How do you prevent this in Next.js?

5. What is tRPC? What problem does it solve that REST + manual TypeScript types doesn't?

**Real System Connection:** Cal.com (open-source Calendly alternative, 30k+ GitHub stars) uses the T3 stack: Next.js + tRPC + Prisma + PostgreSQL + TypeScript. Their `packages/trpc/server/routers/` directory is a real-world example of production tRPC — 40+ procedures, auth middleware, Zod validation. Reading their router definitions is the best way to see how tRPC scales.
