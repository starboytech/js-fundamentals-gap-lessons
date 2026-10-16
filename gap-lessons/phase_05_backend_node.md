# Full Stack — Phase 5: Backend: Node.js + Express + API Design
## Server-side JavaScript + deep API design. Four weeks. The biggest phase.

---

## Phase-Opening Misconception

"Express is the Node.js framework."

Express is ONE Node.js framework — in maintenance mode since 2015. The backend JavaScript landscape has moved: Fastify for production Node.js, Hono for edge-compatible runtimes (Node/Bun/Deno/Cloudflare Workers), NestJS for enterprise applications. Express still has 35M weekly downloads because of existing code — not because it's the right default for new work. This phase teaches Express (unavoidable for understanding the ecosystem) AND the direction things are going.

---

## Lesson 5.1: Node.js Fundamentals

### What Node.js Is

Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript outside the browser — on a server, in a terminal, as a CLI tool.

```bash
node --version       # v20.x LTS (use this)
node script.js       # run a file
node                 # interactive REPL
```

### CommonJS vs ES Modules

```javascript
// CommonJS (older — still used in many Node.js projects)
const express = require("express");
const { readFile } = require("fs");
module.exports = { handler };

// ES Modules (modern — use this in new projects)
import express from "express";
import { readFile } from "fs";
export { handler };
export default router;
```

**In package.json:** `"type": "module"` enables ES modules. Without it, `.js` files use CommonJS.

### npm — Node Package Manager

```bash
npm init -y                     # create package.json with defaults
npm install express             # install and add to dependencies
npm install -D vitest           # install as devDependency (not in production)
npm install --save-exact        # pin exact version (no ^ or ~)
npm update                      # update to latest within semver range
npm audit                       # check for security vulnerabilities
npm ci                          # clean install (uses package-lock.json exactly — for CI)

# package.json scripts
{
  "scripts": {
    "dev": "node --watch server.js",    # hot reload (Node 18+ built-in)
    "start": "node server.js",
    "test": "vitest",
    "build": "tsc"
  }
}
```

---

## Lesson 5.2: File System and HTTP

### File System Module

```javascript
import { readFile, writeFile, readdir, stat } from "fs/promises";
import { createReadStream } from "fs";

// Read file
const content = await readFile("./data.json", "utf-8");
const data = JSON.parse(content);

// Write file
await writeFile("./output.json", JSON.stringify(data, null, 2));

// List directory
const files = await readdir("./uploads");

// Stream large files (don't load into memory)
const stream = createReadStream("./large-video.mp4");
stream.pipe(response);  // pipe to HTTP response
```

### Built-in HTTP Server (Before Express)

```javascript
import { createServer } from "http";

const server = createServer((req, res) => {
  // Parse the URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(3001, () => console.log("Server running on port 3001"));
```

This is what Express wraps — understanding it helps debug Express behavior.

---

## Lessons 5.3–5.5: Express

### Express App Setup

```javascript
import express from "express";
import cors from "cors";
import { json } from "express";

const app = express();

// Middleware (runs before routes)
app.use(cors({ origin: "http://localhost:3000" }));
app.use(json());                              // parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse form data

// Route
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(3001, () => console.log("Running on port 3001"));
```

### Routes and Controllers

```javascript
// routes/courses.js — route definitions
import { Router } from "express";
import * as CourseController from "../controllers/courses.js";

const router = Router();

router.get("/", CourseController.getAll);           // GET /api/courses
router.get("/:id", CourseController.getById);       // GET /api/courses/:id
router.post("/", CourseController.create);          // POST /api/courses
router.put("/:id", CourseController.update);        // PUT /api/courses/:id
router.delete("/:id", CourseController.remove);     // DELETE /api/courses/:id

export default router;

// controllers/courses.js — business logic
export async function getAll(req, res, next) {
  try {
    const { limit = 10, offset = 0, search } = req.query;
    const courses = await CourseService.findAll({ limit, offset, search });
    res.json({ data: courses, total: courses.length });
  } catch (error) {
    next(error);  // pass to error middleware
  }
}

export async function getById(req, res, next) {
  try {
    const course = await CourseService.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    next(error);
  }
}

// Mount the router
app.use("/api/courses", courseRouter);
```

### Middleware

```javascript
// Middleware: a function with (req, res, next)
// next() passes control to the next middleware
// next(error) passes to error middleware

// Request logging middleware
function requestLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.path} ${res.statusCode} ${Date.now() - start}ms`);
  });
  next();  // must call next or request hangs
}

// Authentication middleware
async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];  // "Bearer TOKEN"
    if (!token) return res.status(401).json({ error: "No token provided" });
    
    const payload = verifyToken(token);
    req.user = payload;  // attach user to request for downstream handlers
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Error handling middleware — must have 4 parameters
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status ?? 500).json({
    error: err.message ?? "Internal Server Error",
  });
}

// Order matters:
app.use(requestLogger);          // runs on every request
app.use("/api", requireAuth);    // runs on /api/* routes only
app.use(courseRouter);
app.use(errorHandler);           // must be LAST
```

---

## Lesson 5.6: REST Fundamentals

### Resource Naming

```
GOOD URLs (resource-based, nouns):
GET    /api/courses          — list all courses
GET    /api/courses/123      — get course 123
POST   /api/courses          — create course
PUT    /api/courses/123      — replace course 123
PATCH  /api/courses/123      — partial update course 123
DELETE /api/courses/123      — delete course 123

Nested resources:
GET    /api/courses/123/materials       — materials for course 123
POST   /api/courses/123/materials       — upload material to course 123
DELETE /api/courses/123/materials/456   — delete specific material

BAD URLs (verb-based):
/api/getCourses
/api/createCourse
/api/deleteCourse?id=123
/api/course/list
```

### HTTP Methods: Safe, Idempotent, Unsafe

| Method | Safe (no side effects) | Idempotent (same result if repeated) |
|--------|------------------------|--------------------------------------|
| GET | ✓ | ✓ |
| HEAD | ✓ | ✓ |
| PUT | ✗ | ✓ (same result on every repeat) |
| DELETE | ✗ | ✓ (delete twice = same end state: deleted) |
| POST | ✗ | ✗ (creates duplicate on repeat) |
| PATCH | ✗ | ✗ (can be, but typically isn't) |

**Why idempotency matters for retries:** If a POST request times out, you don't know if the server received it. Retrying creates a duplicate. This is why Stripe, Plaid, and most payment APIs use **idempotency keys** — you send a unique key with every POST, the server returns the cached response if it's already been processed.

---

## Lessons 5.7–5.8: Validation and Secrets

### Request Validation

```javascript
import { body, param, query, validationResult } from "express-validator";

const createCourseValidator = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be 2-100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description max 500 characters"),
  body("name").escape(),  // HTML escape — prevent XSS
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: "Validation failed",
      details: errors.array(),
    });
  }
  next();
}

router.post("/", createCourseValidator, validate, CourseController.create);
```

### Environment Variables — Never Commit Secrets

```javascript
// .env (never commit this file)
DATABASE_URL=postgresql://user:password@localhost:5432/studyapp
JWT_SECRET=your-secret-here-min-32-chars
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://xxx.supabase.co

// .env.example (commit this — shows required vars, no actual values)
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=generate-with-openssl-rand-hex-32
OPENAI_API_KEY=
SUPABASE_URL=

// Loading in Node.js
import "dotenv/config";
const dbUrl = process.env.DATABASE_URL;  // string | undefined

// Fail loudly if required env var is missing
function requireEnv(key) {
  const value = process.env[key];
  if (!value) throw new Error(`Required environment variable ${key} is not set`);
  return value;
}

const jwtSecret = requireEnv("JWT_SECRET");
```

---

## Lessons 5.9–5.10: Authentication

### Password Hashing with bcrypt

```javascript
import bcrypt from "bcryptjs";

// Hashing (on registration)
const COST_FACTOR = 12;  // ~250ms — slow enough to resist brute force
const hash = await bcrypt.hash(password, COST_FACTOR);
// Store hash in database — NEVER store plaintext password

// Verification (on login)
const isValid = await bcrypt.compare(submittedPassword, storedHash);
// Returns true/false — constant time (prevents timing attacks)
```

### JWT Authentication

```javascript
import jwt from "jsonwebtoken";

const JWT_SECRET = requireEnv("JWT_SECRET");  // min 32 chars, random
const ACCESS_TOKEN_EXPIRY = "15m";            // short-lived
const REFRESH_TOKEN_EXPIRY = "7d";            // long-lived

// Creating tokens (on login)
function createTokens(userId, role) {
  const accessToken = jwt.sign(
    { userId, role, type: "access" },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
  const refreshToken = jwt.sign(
    { userId, type: "refresh" },
    JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
  return { accessToken, refreshToken };
}

// Verifying (in auth middleware)
function verifyToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.type !== "access") throw new Error("Wrong token type");
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
```

### Protected Routes

```javascript
// Auth middleware
async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Authentication required" });
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Role-based access
function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}

// Usage
router.get("/admin/stats", requireAuth, requireRole("admin"), statsController);
```

---

## Lesson 5.11: File Uploads

### Why `express.json()` Does Not Help You Here

A file upload is not JSON. The browser sends `multipart/form-data` — a body split into parts with a
boundary string, where each part has its own headers. `express.json()` looks at that and parses
nothing, so `req.body` is empty and `req.file` does not exist. You need a parser built for it.

```javascript
// The request the browser actually sends
POST /api/materials HTTP/1.1
Content-Type: multipart/form-data; boundary=----Boundary7MA4YWxk

------Boundary7MA4YWxk
Content-Disposition: form-data; name="courseId"

cram-101
------Boundary7MA4YWxk
Content-Disposition: form-data; name="file"; filename="week3-notes.pdf"
Content-Type: application/pdf

%PDF-1.7 ...binary...
------Boundary7MA4YWxk--
```

### Multer — Memory vs Disk

```javascript
import multer from "multer";   // require multer@^2.4.0 — 1.x is deprecated with known CVEs

// memoryStorage: file arrives as a Buffer in req.file.buffer.
// Good when you immediately forward it somewhere (S3, Supabase Storage).
// Bad for large files — the whole thing sits in RAM, per concurrent request.
const memoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },   // ALWAYS set a limit
  fileFilter: (req, file, cb) => {
    // Note: this checks the CLIENT-SUPPLIED mimetype. It is a convenience filter,
    // not a security control — see the next section.
    // Keep this callback SYNCHRONOUS: an async fileFilter has been shown to bypass
    // limits.fileSize (CVE-2026-77063), which defeats the cap set just above.
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    cb(null, allowed.includes(file.mimetype));
  },
});

// diskStorage: streams to disk, so RAM stays flat. You own the filename.
const diskUpload = multer({
  storage: multer.diskStorage({
    destination: "/var/app/uploads",          // NOT inside the served public directory
    filename: (req, file, cb) => cb(null, crypto.randomUUID() + ".pdf"),
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Two caveats on that disk example. It hardcodes ".pdf" and has no fileFilter, so it will
// happily store an .exe under a .pdf name. And with diskStorage the bytes are already on
// disk before your handler runs, so the magic-byte check below cannot gate the write — it
// can only delete afterwards. Prefer memoryStorage for small files you intend to verify.

// Single field named "file"
router.post("/materials", requireAuth, memoryUpload.single("file"), uploadController);
```

### The Four Things That Bite

**1. Never build a path from `file.originalname`.** It is attacker-controlled and may contain
`../`. Generate your own name and keep the original only as a display label.

```javascript
// WRONG — path traversal: originalname could be "../../etc/cron.d/payload"
fs.writeFileSync(path.join(UPLOAD_DIR, file.originalname), file.buffer);

// RIGHT — you choose the name AND the extension; the user's name is data, not a path.
// Deriving the extension from file.originalname would still let the attacker pick it:
// upload "x.html" and you have stored XSS on your own origin the moment anything serves
// that directory. Map from the type you verified yourself, via an allowlist.
const EXT_BY_TYPE = { "application/pdf": ".pdf", "image/png": ".png", "image/jpeg": ".jpg" };
const detected = detectTypeFromBytes(file.buffer);   // content sniff — never file.mimetype
const ext = EXT_BY_TYPE[detected];
if (!ext) return res.status(400).json({ error: "Unsupported file type" });

const storedName = crypto.randomUUID() + ext;
await fs.promises.writeFile(path.join(UPLOAD_DIR, storedName), file.buffer);
await db.query(
  "INSERT INTO materials (user_id, stored_name, display_name) VALUES ($1, $2, $3)",
  [req.user.userId, storedName, file.originalname],   // userId — the field requireAuth sets
);
```

**2. Never trust the declared mimetype.** `Content-Type` is whatever the client wrote. Check the
file's own leading bytes before you believe it.

```javascript
// A real PDF starts with %PDF-, a PNG with the 8-byte PNG signature.
const isPdf = file.buffer.subarray(0, 5).toString("latin1") === "%PDF-";
if (!isPdf) return res.status(400).json({ error: "Not a PDF" });
```

Two things this check is not. It is a **type filter, not a safety check** — a perfectly valid
PDF can still carry an `OpenAction` that runs JavaScript when the document opens. And it is
**deliberately stricter than real readers**: Acrobat and pdf.js accept the `%PDF-` header
anywhere in the first 1024 bytes, so a file with a ZIP or HTML prefix opens in them and fails
here. Strict is the right choice for an upload gate; just do not read it as "this file is safe."

**3. Always cap the size, in two places.** `limits.fileSize` in multer, and a body limit at the
proxy (nginx `client_max_body_size`). Without a cap, one request can exhaust memory or disk.

**4. Never serve uploads from a directory the web server executes.** Store outside the web root and
stream them back through a route that checks authorization first — otherwise an uploaded file
becomes a public URL that bypasses every permission check you wrote.

### The Pattern You Actually Want in Production: Presigned Uploads

Proxying bytes through your API costs you memory, request time and a timeout ceiling. Instead the
server signs a short-lived URL and the browser uploads straight to storage.

```javascript
// 1. Server: authorize, then sign. No file bytes touch this process.
router.post("/materials/presign", requireAuth, async (req, res) => {
  const storedName = `${req.user.userId}/${crypto.randomUUID()}.pdf`;
  const { data, error } = await supabase.storage
    .from("materials")
    .createSignedUploadUrl(storedName);   // hosted Supabase: valid for 2 hours
  if (error) return res.status(500).json({ error: "Could not sign upload" });
  // It returns { signedUrl, path, token } — forward path and token, not just the URL.
  res.json({ path: data.path, token: data.token, storedName });
});

// 2. Browser: the documented client method, using the token the server just handed over.
const { error } = await supabase.storage
  .from("materials")
  .uploadToSignedUrl(path, token, file);

// 3. Browser: tell the API it finished, so the row is written only for a real object.
await fetch("/api/materials/confirm", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ storedName, displayName: file.name }),
});
```

The confirm step matters: if you insert the database row *before* the upload, a failed or abandoned
upload leaves a row pointing at nothing. Write the row when the object exists.

---

## Lesson 5.12: Testing APIs — Jest + Supertest

### Unit vs Integration, Decided by What You Let It Touch

**Unit test:** one function, no network, no database, no filesystem. Fast (milliseconds), and it
fails with a precise cause.

**Integration test:** a real HTTP request through the real router, middleware and database. Slower,
but it is the only kind that catches a wrong status code, a missing middleware, a broken route path
or a serialization bug — the failures that actually reach your users.

Write both. Most beginner suites are all unit tests of pure helpers, which is how a project ends up
with 90% coverage and a broken login route.

### The One Change That Makes an Express App Testable

Split app construction from listening. If `app.js` calls `listen()`, importing it in a test starts a
real server and fights for the port.

```javascript
// app.js — builds and exports, never listens
import express from "express";
export function createApp({ db }) {
  const app = express();
  app.use(express.json());
  app.use("/api/courses", coursesRouter(db));
  app.use(errorHandler);
  return app;
}

// server.js — the only file that binds a port
import { createApp } from "./app.js";
createApp({ db: realDb }).listen(process.env.PORT || 3000);
```

### Supertest — Drive the App Without a Port

```javascript
import request from "supertest";
import { createApp } from "../app.js";

const app = createApp({ db: testDb });

describe("POST /api/courses", () => {
  it("creates a course and returns 201 with the row", async () => {
    const res = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${tokenFor(testUser)}`)
      .send({ name: "Databases", description: "Indexes and plans" })
      .expect(201)
      .expect("Content-Type", /json/);

    expect(res.body).toMatchObject({ name: "Databases", userId: testUser.id });
    expect(res.body.id).toBeDefined();
  });

  it("rejects an unauthenticated request with 401", async () => {
    await request(app).post("/api/courses").send({ name: "X" }).expect(401);
  });

  it("rejects a short name with 422 and names the field", async () => {
    const res = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${tokenFor(testUser)}`)
      .send({ name: "D" })
      .expect(422);   // the shape Lesson 5.7's validate middleware returns

    expect(res.body.details[0].path).toBe("name");
  });
});
```

`request(app)` starts the app on an ephemeral port for the duration of the call, so tests run in
parallel without port collisions.

### The Database in an Integration Test

Do not mock it. A mocked database cannot fail the way a real one does — constraint violations,
cascades, null handling. Use a real test database and reset state between tests.

```javascript
// The correct default for HTTP-level integration tests: truncate between tests.
afterEach(async () => {
  await testDb.query("TRUNCATE courses, materials RESTART IDENTITY CASCADE");
});
```

**Why not the transaction trick?** You will see this advice everywhere — `BEGIN` in
`beforeEach`, `ROLLBACK` in `afterEach` — and through a connection **pool it silently does
nothing**. `pool.query("BEGIN")` opens a transaction on one client and hands that client back
to the pool; your request handler then checks out a *different* client, so its writes run in
autocommit and really commit, while the stranded client sits idle-in-transaction holding
locks. node-postgres says it outright: *"Do not use transactions with the pool.query method."*
It appears to work at pool size 1 and breaks the moment concurrency changes — a green suite
isolating nothing.

Rollback-based isolation is real, but only when the test and the handler share **one
connection** — which is what Rails and Django do, and what `pg-transactional-tests` emulates
by rewriting `BEGIN`/`COMMIT` into savepoints. Until you have wired that up, truncate.

Point `DATABASE_URL` at a dedicated test database in `.env.test`. A suite that truncates the
development database once teaches the lesson permanently, and expensively.

### What an API Test Should Assert

| Assert | Why it catches real bugs |
|---|---|
| Status code | A route that returns 200 on failure breaks every client's error handling |
| Body shape, not exact body | Asserting the whole object makes every new field a failing test |
| 401 unauthenticated, 403 wrong user | The most common security defect is an authorization check that was never wired up |
| 422 with the offending field named | Proves validation runs at the boundary, not deep in a controller (Lesson 5.7's shape) |
| The second identical POST | With an idempotency key (Lesson 5.15), the retry must not create a second row |

### Jest or Vitest

Both run this code almost unchanged; `describe`/`it`/`expect` are the same API. Jest is the
incumbent; Vitest reuses an existing Vite config instead of adding a second build pipeline, which is
why it now leads on npm downloads — vitest 77.1M vs jest 33.7M weekly (npm registry, week of
2026-09-05). If the project already builds with Vite, start with Vitest — Lesson 4.18 makes that case for
React. This lesson keeps Jest in its title because the Jest + Supertest pairing is what you
will meet in existing codebases; the assertions above are identical either way.

---

## Lesson 5.13: Error Handling Patterns

```javascript
// Async wrapper — eliminates try/catch in every controller
function asyncHandler(fn) {
  return function(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Use it:
router.get("/:id", asyncHandler(async (req, res) => {
  const course = await CourseService.findById(req.params.id);
  if (!course) throw createError(404, "Course not found");
  res.json(course);
}));

// Custom error factory
function createError(status, message, details = {}) {
  const error = new Error(message);
  error.status = status;
  error.details = details;
  return error;
}

// Global error handler
function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;
  const message = status < 500 ? err.message : "Internal Server Error";
  
  if (status >= 500) {
    console.error("[ERROR]", err);  // log 5xx errors
  }
  
  res.status(status).json({ error: message, ...(err.details ?? {}) });
}
```

---

## Lesson 5.14: REST API Design Depth

### Richardson Maturity Model

**Level 0 — HTTP as transport (RPC over HTTP):**
```
POST /api        { action: "getCourse", id: "123" }
POST /api        { action: "createCourse", name: "React" }
```

**Level 1 — Resources:**
```
POST /api/courses/123  { action: "getCourse" }
POST /api/courses      { action: "create", name: "React" }
```

**Level 2 — HTTP Verbs + Status Codes:**
```
GET    /api/courses/123   → 200 OK
POST   /api/courses       → 201 Created
DELETE /api/courses/123   → 204 No Content
```
This is where most professional APIs live.

**Level 3 — Hypermedia (HATEOAS):**
```json
{
  "id": "123",
  "name": "React Fundamentals",
  "_links": {
    "self": "/api/courses/123",
    "materials": "/api/courses/123/materials",
    "enroll": { "href": "/api/enrollments", "method": "POST" }
  }
}
```
Rarely implemented in practice. REST at Level 2 is the real-world target.

### API Versioning Strategies

**URL path (most common):** `/api/v1/courses`
- Pros: explicit, easy to test, cacheable
- Cons: breaks REST (the resource's URL changes)
- Use when: public API, breaking changes common

**Accept header:** `Accept: application/vnd.studyapp.v2+json`
- Pros: same URL, semantically correct
- Cons: harder to test in browser, complex routing
- Use when: strict REST purists or internal APIs

**Query parameter:** `/api/courses?version=2`
- Pros: simple
- Cons: URLs are no longer cacheable consistently
- Avoid in general

### Pagination

**Offset-based:**
```
GET /api/courses?limit=10&offset=0    → first 10
GET /api/courses?limit=10&offset=10   → second 10
```
Problem: if a new item is inserted while paginating, items shift — you get duplicates or skip items.

**Cursor-based (correct for dynamic data):**
```
GET /api/courses?limit=10
→ { data: [...], nextCursor: "course_123" }

GET /api/courses?limit=10&cursor=course_123
→ { data: [...], nextCursor: "course_456" }
```
Cursor is the ID (or encoded timestamp+ID) of the last item seen. Stable even as data changes.

---

## Lesson 5.15: Idempotency Keys

### The Problem: Non-Idempotent POST

```
Client → POST /api/payments { amount: 100 }
  ↓ Network timeout (client doesn't know if server received it)
  ↓ Client retries: POST /api/payments { amount: 100 }
Server receives BOTH → charges user twice
```

### The Solution: Idempotency Key

```javascript
// Client sends a unique key with the request
const idempotencyKey = crypto.randomUUID();

await fetch("/api/payments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Idempotency-Key": idempotencyKey,
  },
  body: JSON.stringify({ amount: 100 }),
});

// On timeout, retry with the SAME key:
await fetch("/api/payments", {
  method: "POST",
  headers: {
    "Idempotency-Key": idempotencyKey,  // same key
  },
  body: JSON.stringify({ amount: 100 }),
});
```

```javascript
// Server: check before processing
async function handlePayment(req, res) {
  const idempotencyKey = req.headers["idempotency-key"];

  // Check if we've seen this key before
  const cached = await redis.get(`idempotency:${idempotencyKey}`);
  if (cached) {
    return res.json(JSON.parse(cached));  // return cached response
  }

  // Process the payment
  const result = await processPayment(req.body);

  // Cache the response with TTL
  await redis.setex(`idempotency:${idempotencyKey}`, 86400, JSON.stringify(result));

  res.status(201).json(result);
}
```

This is exactly how Stripe implements it — their docs require `Idempotency-Key` for all payment requests.

---

## Lesson 5.16: GraphQL

### What Problem GraphQL Solves

**REST problem — over-fetching:**
```
GET /api/users/123
→ { id, name, email, createdAt, role, avatar, address, preferences, ... }
// Mobile app only needed: id, name, avatar
```

**REST problem — under-fetching (N+1 requests):**
```
GET /api/courses                    → 20 courses
GET /api/courses/1/instructor       → instructor for course 1
GET /api/courses/2/instructor       → instructor for course 2
... 20 more requests
```

**GraphQL solution — client specifies exactly what it needs:**
```graphql
query {
  courses {
    id
    name
    instructor {
      name
      avatar
    }
  }
}
```
One request. Exactly the fields requested.

### Schema Definition Language (SDL)

```graphql
type Course {
  id: ID!              # ! = required (non-null)
  name: String!
  description: String  # optional
  instructor: User!
  materials: [Material!]!  # list of non-null Materials, non-null list
  createdAt: String!
}

type Query {                              # read operations
  courses: [Course!]!
  course(id: ID!): Course                 # nullable (may not exist)
}

type Mutation {                           # write operations
  createCourse(name: String!, description: String): Course!
  updateCourse(id: ID!, name: String): Course!
  deleteCourse(id: ID!): Boolean!
}
```

### The N+1 Problem in GraphQL

```javascript
// NAIVE resolver — N+1 problem
const resolvers = {
  Course: {
    instructor: async (course) => {
      return await db.users.findById(course.instructorId);  // 1 query per course
    }
  }
};
// 20 courses = 21 queries (1 for courses list + 20 for instructors)

// CORRECT: DataLoader batching
import DataLoader from "dataloader";

const userLoader = new DataLoader(async (userIds) => {
  const users = await db.users.findMany({ where: { id: { in: userIds } } });
  return userIds.map(id => users.find(u => u.id === id));
});

const resolvers = {
  Course: {
    instructor: (course) => userLoader.load(course.instructorId),
    // DataLoader batches all loads within one tick → 1 query total
  }
};
```

---

## Lesson 5.17: gRPC

### Protocol Buffers

gRPC uses Protocol Buffers (protobuf) — a binary serialization format. More efficient than JSON (smaller payload, faster parse). Schema-first: define the API in a `.proto` file, generate client and server code.

```protobuf
// course.proto
syntax = "proto3";
package course;

service CourseService {
  rpc GetCourse (GetCourseRequest) returns (Course);
  rpc ListCourses (ListCoursesRequest) returns (ListCoursesResponse);
  rpc CreateCourse (CreateCourseRequest) returns (Course);
  rpc WatchCourse (GetCourseRequest) returns (stream CourseUpdate);  // server streaming
}

message Course {
  string id = 1;
  string name = 2;
  string description = 3;
}

message GetCourseRequest {
  string id = 1;
}
```

**The four service types:**
- **Unary:** one request → one response (like REST)
- **Server streaming:** one request → stream of responses (log streaming)
- **Client streaming:** stream of requests → one response (uploading chunks)
- **Bidirectional:** stream in both directions (real-time collaboration)

**When gRPC beats REST:**
- Internal microservice-to-microservice calls (lower latency, smaller payload)
- Streaming data (real-time updates)
- Strong contracts enforced at compile time (protobuf schema)

**When REST wins:**
- Public APIs (gRPC-Web workaround needed for browsers — adds complexity)
- Third parties consuming your API (JSON is universal)
- Simple CRUD (REST is simpler)

---

## Lesson 5.18: API Documentation

### OpenAPI / Swagger

FastAPI auto-generates OpenAPI docs at `/docs`. For Express, use `swagger-jsdoc`:

```javascript
// JSDoc comment on routes — swagger-jsdoc parses these
/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: List all courses
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get("/", CourseController.getAll);
```

Good API documentation includes:
- Every endpoint with all parameters
- Every response code and what triggers it
- Example request and response bodies
- Authentication requirements
- Rate limits

---

## Lesson 5.19: Docker Dev Environment

### Why Docker Now (Not Just for Deployment)

"Works on my machine" — the most common phrase in software development. Docker eliminates it by packaging the application and its environment together.

```dockerfile
# Dockerfile for the Node.js app
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci                  # install exact versions from package-lock.json

COPY . .

EXPOSE 3001
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml — run everything together locally
version: "3.9"
services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/studyapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
    develop:
      watch:
        - action: sync
          path: ./src
          target: /app/src   # sync changes without rebuild

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: studyapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

**Key Docker networking rule:** Containers reference each other by **service name**, not `localhost`.
- ✓ `postgresql://db:5432/studyapp` (service name `db`)
- ✗ `postgresql://localhost:5432/studyapp` (this is the container's own localhost)

```bash
docker compose up -d          # start all services in background
docker compose logs -f api    # follow logs from api service
docker compose exec db psql -U postgres  # open psql inside db container
docker compose down           # stop and remove containers
docker compose down -v        # also remove volumes (delete database)
```

---

## Lesson 5.20: Beyond Express — Hono

```javascript
import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";

const app = new Hono();

app.use("/*", cors());
app.use("/api/*", jwt({ secret: Bun.env.JWT_SECRET }));

app.get("/api/courses", async (c) => {
  const user = c.get("jwtPayload");          // from jwt middleware
  const { limit = "10" } = c.req.query();
  const courses = await db.query("SELECT * FROM courses WHERE user_id = $1 LIMIT $2",
                                  [user.userId, parseInt(limit)]);
  return c.json(courses);
});

app.post("/api/courses", async (c) => {
  const body = await c.req.json<{ name: string }>();
  const user = c.get("jwtPayload");
  const course = await db.create({ name: body.name, userId: user.userId });
  return c.json(course, 201);
});

// Same code runs on Node.js, Bun, Deno, and Cloudflare Workers
export default app;

// Bun server
Bun.serve({ fetch: app.fetch, port: 3001 });

// Cloudflare Workers — export default, it just works
```

**Why Hono matters:** When an interviewer asks "have you used anything beyond Express?" — saying "I built an endpoint with Hono to understand the runtime-agnostic model" is a real differentiator.

---

## Phase 5 Milestone: Job Application Intelligence Backend

FastAPI API that accepts a job description and resume, calls the Claude API, returns structured gap analysis.

Requirements:
- Full auth: bcrypt + JWT access/refresh tokens
- Protected routes (require valid JWT)
- User data in PostgreSQL (not Supabase managed — write your own schema)
- `POST /api/analyze` — accepts job description + resume text, calls Claude API, returns skills match percentage + gap analysis
- OpenAPI docs auto-generated (`/docs`)
- Input validation with Pydantic (FastAPI)
- Error handling middleware
- Docker Compose: FastAPI + PostgreSQL

---

## Phase 5 Check

**Feynman checks:**

1. What is middleware in Express? What's the purpose of calling `next()` vs `next(error)`?

2. What makes a POST request non-idempotent? How do idempotency keys solve the retry problem?

3. What is the N+1 problem in GraphQL? How does DataLoader solve it?

4. In Docker Compose, why can't you use `localhost` to connect from the `api` container to the `db` container?

5. What is the difference between a 401 and 403 response? In JWT auth, when does each appear?

**Real System Connection:** Stripe's API is a masterclass in REST design: Level 2 Richardson, cursor-based pagination, idempotency keys required for all payment mutations, versioned with `Stripe-Version` header, comprehensive OpenAPI spec, webhooks for async events. When studying any Stripe endpoint, you're studying what "professional API design" looks like in production at scale.
