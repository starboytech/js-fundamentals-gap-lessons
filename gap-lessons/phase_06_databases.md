# Full Stack — Phase 6: Databases
## Where data lives. You use Supabase already — this is what's under the hood.

---

## Phase-Opening Misconception

"Supabase handles the database — I don't need to understand SQL."

Supabase is PostgreSQL. When Supabase is slow, the fix is in the SQL. When your Row Level Security policy blocks a request it shouldn't, you debug it in SQL. When you need complex aggregations, joins, or transactions, they happen in SQL. Supabase is a managed layer over PostgreSQL — PostgreSQL is the thing you're building on.

---

## Lesson 6.1: Relational Database Fundamentals

### What a Relational Database Is

A relational database stores data in **tables** (relations): rows of records, columns of fields. The "relational" part is that tables can have relationships to each other, enforced by the database itself.

**Primary key:** A column (or set of columns) that uniquely identifies each row. Every table has one.

**Foreign key:** A column that references the primary key of another table. Enforces referential integrity — you can't add a `course_id` that doesn't exist in the `courses` table.

```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- user_id REFERENCES users(id) = foreign key
-- ON DELETE CASCADE = if the user is deleted, their courses are deleted too
```

### The Four Relationships

**One-to-Many:** One user has many courses. One course has many materials.
```sql
-- The "many" side holds the foreign key
courses.user_id → users.id  -- each course has one user, each user has many courses
```

**Many-to-Many:** One user can enroll in many courses; one course can have many enrolled users.
```sql
-- Need a junction table
CREATE TABLE enrollments (
  user_id   UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, course_id)  -- composite primary key
);
```

**One-to-One:** Uncommon. User has one profile, profile belongs to one user.
**Self-referential:** A category can have a parent category (also a category).

---

## Lesson 6.2: SQL Basics

### Core Statements

```sql
-- SELECT
SELECT name, email FROM users;                      -- specific columns
SELECT * FROM courses;                              -- all columns (avoid in production)
SELECT name, email AS user_email FROM users;        -- alias
SELECT DISTINCT role FROM users;                    -- unique values only

-- WHERE
SELECT * FROM courses WHERE user_id = 'uuid_here';
SELECT * FROM users WHERE name LIKE '%Jasmine%';   -- % is wildcard
SELECT * FROM courses WHERE created_at > '2026-01-01';
SELECT * FROM courses WHERE status IN ('active', 'processing');
SELECT * FROM courses WHERE description IS NULL;   -- null check
SELECT * FROM courses WHERE description IS NOT NULL;

-- ORDER BY and LIMIT
SELECT * FROM courses ORDER BY created_at DESC LIMIT 10;
SELECT * FROM courses ORDER BY name ASC, created_at DESC;  -- multi-column sort
SELECT * FROM courses LIMIT 10 OFFSET 20;          -- offset pagination

-- INSERT
INSERT INTO courses (user_id, name, description)
VALUES ('uuid', 'System Design', 'Advanced sysdesign course');

INSERT INTO courses (user_id, name)
SELECT id, 'Default Course' FROM users WHERE role = 'student';  -- insert from select

-- UPDATE
UPDATE courses
SET name = 'System Design Pro', description = 'Updated desc'
WHERE id = 'course_uuid';

-- DELETE
DELETE FROM courses WHERE id = 'course_uuid';
DELETE FROM courses WHERE created_at < '2025-01-01';  -- bulk delete

-- Transactions (atomic — all or nothing)
BEGIN;
  UPDATE users SET credits = credits - 100 WHERE id = 'user_1';
  UPDATE users SET credits = credits + 100 WHERE id = 'user_2';
  -- If either fails, ROLLBACK is automatic on error
COMMIT;
```

---

## Lesson 6.3: SQL Joins

### The Types of Joins

```sql
-- INNER JOIN: only rows with matches in BOTH tables
SELECT courses.name, users.email
FROM courses
INNER JOIN users ON courses.user_id = users.id;
-- Missing: courses with no user (impossible with FK constraint)
-- Missing: users with no courses (very common — user has no courses)

-- LEFT JOIN: all rows from left table, matching from right (or NULL)
SELECT users.email, COUNT(courses.id) AS course_count
FROM users
LEFT JOIN courses ON users.id = courses.user_id
GROUP BY users.email;
-- Includes users with 0 courses (course_count = 0)

-- RIGHT JOIN: all rows from right table (rarely used — just swap tables)

-- FULL OUTER JOIN: all rows from both tables
SELECT users.email, courses.name
FROM users
FULL OUTER JOIN courses ON users.id = courses.user_id;
-- Includes users with no courses AND courses with no users
```

**When to use which:**
- Almost always: `LEFT JOIN` (get all from main table, optional data from related)
- When you need only matched: `INNER JOIN`
- Full outer: data audit / finding orphaned records

### Multi-Table Joins

```sql
-- Get courses with their materials count and user email
SELECT
  c.id,
  c.name,
  u.email AS owner,
  COUNT(m.id) AS material_count
FROM courses c
LEFT JOIN users u ON c.user_id = u.id
LEFT JOIN materials m ON m.course_id = c.id
GROUP BY c.id, c.name, u.email
ORDER BY material_count DESC;
```

---

## Lesson 6.4: SQL Advanced

```sql
-- GROUP BY with aggregate functions
SELECT role, COUNT(*) AS count FROM users GROUP BY role;
SELECT user_id, COUNT(*) AS course_count FROM courses GROUP BY user_id;
SELECT user_id, SUM(chunk_count) AS total_chunks FROM materials GROUP BY user_id;

-- HAVING: filter on aggregated results (WHERE can't use aggregate functions)
SELECT user_id, COUNT(*) AS course_count
FROM courses
GROUP BY user_id
HAVING COUNT(*) > 5;  -- only users with more than 5 courses

-- Subquery
SELECT * FROM users
WHERE id IN (
  SELECT user_id FROM courses WHERE created_at > '2026-01-01'
);

-- EXISTS (more efficient for subqueries that just check existence)
SELECT * FROM users u
WHERE EXISTS (
  SELECT 1 FROM courses c WHERE c.user_id = u.id AND c.status = 'active'
);

-- Window functions (aggregate without collapsing rows)
SELECT
  name,
  created_at,
  ROW_NUMBER() OVER (ORDER BY created_at) AS row_num,
  RANK() OVER (PARTITION BY user_id ORDER BY created_at) AS user_course_rank
FROM courses;

-- CTE (Common Table Expression) — named subquery, more readable
WITH active_users AS (
  SELECT id, email FROM users WHERE last_login > now() - interval '30 days'
),
recent_courses AS (
  SELECT user_id, COUNT(*) AS count
  FROM courses
  WHERE created_at > now() - interval '7 days'
  GROUP BY user_id
)
SELECT au.email, rc.count
FROM active_users au
JOIN recent_courses rc ON au.id = rc.user_id;
```

---

## Lesson 6.5: Database Design and Normalization

### Normalization Goals

Normalization eliminates redundancy (storing the same data in multiple places) and prevents update anomalies (updating one copy but not others).

**1NF (First Normal Form):** Each column contains atomic values (no lists, no sets).
```sql
-- VIOLATES 1NF:
users: id, name, courses = "System Design, React, JavaScript"  -- multiple values in one column

-- CORRECT:
courses table with foreign key to users
```

**2NF (Second Normal Form):** All non-key columns depend on the ENTIRE primary key (applies to composite keys).
```sql
-- VIOLATES 2NF (composite PK: user_id + course_id):
enrollments: user_id, course_id, user_email, course_name
-- user_email depends only on user_id, not on the full composite key

-- CORRECT: user_email lives in users table, accessed via JOIN
```

**3NF (Third Normal Form):** No transitive dependencies — non-key columns must depend directly on the primary key, not on other non-key columns.
```sql
-- VIOLATES 3NF:
courses: id, user_id, user_email, user_name
-- user_email and user_name depend on user_id, not on the course id

-- CORRECT: user data in users table
```

### Practical StudyApp Schema

```sql
-- Users (managed by Supabase Auth in production)
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Courses
CREATE TABLE courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL CHECK (length(name) >= 2 AND length(name) <= 100),
  description TEXT CHECK (length(description) <= 500),
  status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Materials
CREATE TABLE materials (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  filename    TEXT NOT NULL,
  file_type   TEXT NOT NULL CHECK (file_type IN ('pdf', 'docx', 'pptx', 'txt', 'md')),
  file_size   INTEGER NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending'
              CHECK (status IN ('pending', 'processing', 'ready', 'failed')),
  chunk_count INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Chunks (for RAG)
CREATE TABLE chunks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  embedding   VECTOR(1536),  -- pgvector
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Weak spots
CREATE TABLE weak_spots (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id    UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  concept      TEXT NOT NULL,
  confidence   TEXT NOT NULL DEFAULT 'low' CHECK (confidence IN ('low', 'medium', 'high')),
  last_drilled TIMESTAMPTZ,
  resolved_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_courses_user_id ON courses(user_id);
CREATE INDEX idx_materials_course_id ON materials(course_id);
CREATE INDEX idx_chunks_material_id ON chunks(material_id);
CREATE INDEX idx_chunks_embedding ON chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX idx_weak_spots_user_course ON weak_spots(user_id, course_id);
```

---

## Lesson 6.6: PostgreSQL Specifics

### Data Types

```sql
UUID           -- universally unique identifier (prefer over serial for distributed systems)
TEXT           -- unlimited-length string (PostgreSQL equivalent of VARCHAR(n) but more flexible)
INTEGER        -- 4-byte integer (-2B to 2B)
BIGINT         -- 8-byte integer (for large IDs, counts)
DECIMAL(p,s)   -- exact decimal (for money: DECIMAL(19,4))
BOOLEAN        -- true/false
TIMESTAMPTZ    -- timestamp with timezone (always use this, not TIMESTAMP)
DATE           -- date only (no time)
JSONB          -- binary JSON — indexed, fast — use this instead of JSON
ARRAY          -- native arrays: TEXT[], INTEGER[]
```

**Why TIMESTAMPTZ not TIMESTAMP:** TIMESTAMP stores without timezone context. If your server changes timezone or you have users in multiple timezones, TIMESTAMP becomes ambiguous. TIMESTAMPTZ stores in UTC, displays in local timezone.

**Why JSONB for flexible data:**
```sql
-- Store metadata that varies by material type
ALTER TABLE materials ADD COLUMN metadata JSONB;

-- Query inside JSONB
SELECT * FROM materials WHERE metadata->>'author' = 'Jasmine';
SELECT * FROM materials WHERE (metadata->>'pages')::integer > 100;

-- Index a JSONB field
CREATE INDEX idx_materials_metadata_author ON materials ((metadata->>'author'));
```

### Transactions and ACID

```sql
-- ACID in PostgreSQL:
-- Atomicity: either all operations in a transaction succeed, or none do
-- Consistency: constraints enforced throughout (FK, CHECK, UNIQUE)
-- Isolation: transactions don't see each other's uncommitted changes
-- Durability: committed data survives crashes (WAL — Write-Ahead Log)

BEGIN;
  -- Create material record
  INSERT INTO materials (course_id, filename, file_type, file_size)
  VALUES ('course_uuid', 'sysdesign.pdf', 'pdf', 2048000)
  RETURNING id INTO material_id;
  
  -- Update course material count
  UPDATE courses
  SET material_count = material_count + 1,
      updated_at = now()
  WHERE id = 'course_uuid';
  
  -- If any statement fails → automatic ROLLBACK
COMMIT;
```

---

## Lessons 6.7: ORMs — Prisma vs Drizzle

### Prisma

Schema-first ORM. Define schema in `schema.prisma` → Prisma generates TypeScript types + client.

```prisma
// schema.prisma
model Course {
  id          String    @id @default(uuid())
  userId      String    @map("user_id")
  name        String
  description String?
  status      String    @default("active")
  createdAt   DateTime  @default(now()) @map("created_at")
  user        User      @relation(fields: [userId], references: [id])
  materials   Material[]

  @@map("courses")
}
```

```typescript
// Generated Prisma client usage
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CRUD
const course = await prisma.course.create({
  data: { name: "System Design", userId: user.id },
});

const courses = await prisma.course.findMany({
  where: { userId: user.id, status: "active" },
  include: { materials: true },   // JOIN automatically
  orderBy: { createdAt: "desc" },
  take: 10,                       // LIMIT
  skip: 0,                        // OFFSET
});

const updated = await prisma.course.update({
  where: { id: courseId },
  data: { name: newName },
});
```

Migrations:
```bash
npx prisma migrate dev --name add_chunk_count     # create migration
npx prisma migrate deploy                          # apply in production
npx prisma studio                                  # visual database browser
```

### Drizzle

Code-first ORM. Schema in TypeScript → Drizzle generates SQL migrations. SQL-close API — if you know SQL, you know Drizzle.

```typescript
import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";

// Schema definition (in TypeScript)
export const courses = pgTable("courses", {
  id:          uuid("id").primaryKey().defaultRandom(),
  userId:      uuid("user_id").notNull().references(() => users.id),
  name:        text("name").notNull(),
  description: text("description"),
  status:      text("status").notNull().default("active"),
  createdAt:   timestamp("created_at").notNull().defaultNow(),
});

// Query using Drizzle's TypeScript API
const userCourses = await db
  .select()
  .from(courses)
  .where(and(eq(courses.userId, userId), eq(courses.status, "active")))
  .orderBy(desc(courses.createdAt))
  .limit(10);

// Raw SQL when needed (Drizzle makes this easy)
const result = await db.execute(sql`
  SELECT c.*, COUNT(m.id) AS material_count
  FROM courses c
  LEFT JOIN materials m ON m.course_id = c.id
  WHERE c.user_id = ${userId}
  GROUP BY c.id
`);
```

**Drizzle advantages:** 7.4kb bundle vs Prisma's 1.6MB. Zero native dependencies. Works on edge runtimes (Cloudflare Workers). SQL-close API makes complex queries transparent.

**Rule from curriculum:** Build this phase's project with Prisma (learn the migration system and abstraction model), then rewrite one query in Drizzle to feel the difference.

---

## Lessons 6.8–6.9: Supabase Deep Dive

### Row Level Security (RLS)

RLS is a PostgreSQL feature (Supabase enables it by default). Policies define who can read/write which rows — enforced at the database level, not the application level.

```sql
-- Enable RLS on a table
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their own courses
CREATE POLICY "Users can view own courses"
ON courses FOR SELECT
USING (auth.uid() = user_id);

-- Policy: users can only insert courses for themselves
CREATE POLICY "Users can insert own courses"
ON courses FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: users can only update their own courses
CREATE POLICY "Users can update own courses"
ON courses FOR UPDATE
USING (auth.uid() = user_id);

-- Admin policy: service role can do anything (for backend operations)
CREATE POLICY "Service role has full access"
ON courses
USING (auth.role() = 'service_role');
```

**Why RLS matters:** Without RLS, a bug in your application layer could expose one user's data to another. With RLS, even if the application has a bug, the database itself enforces data isolation.

### Supabase Client (Next.js)

```typescript
// lib/supabase/server.ts (for server components and API routes)
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => cookieStore.set({ name, value, ...options }),
        remove: (name, options) => cookieStore.set({ name, value: "", ...options }),
      },
    }
  );
}

// Using in an API route
const supabase = createClient();
const { data: { user }, error } = await supabase.auth.getUser();
if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// Query — RLS automatically filters to this user's data
const { data: courses, error: coursesError } = await supabase
  .from("courses")
  .select("*, materials(count)")
  .order("created_at", { ascending: false });
```

---

## Lesson 6.10: Database Performance

### EXPLAIN ANALYZE

```sql
EXPLAIN ANALYZE
SELECT c.*, COUNT(m.id)
FROM courses c
LEFT JOIN materials m ON m.course_id = c.id
WHERE c.user_id = 'uuid'
GROUP BY c.id;
```

Output to read:
- **Seq Scan**: reading the entire table (index is missing or not used)
- **Index Scan**: using an index (fast)
- **rows=X loops=1**: how many rows were processed
- **actual time=0.05..2.1 rows=5**: actual timing and rows returned

If you see Seq Scan on a large table: you need an index on the column in the WHERE clause.

### The N+1 Problem in ORMs

```typescript
// N+1 — 1 query for courses + 1 query per course for materials
const courses = await prisma.course.findMany({ where: { userId } });
for (const course of courses) {
  const materials = await prisma.material.findMany({ where: { courseId: course.id } });
  // This fires 1 query per course — 20 courses = 21 total queries
}

// CORRECT: eager loading with include
const courses = await prisma.course.findMany({
  where: { userId },
  include: { materials: true },   // Prisma does 2 queries total (not N+1)
});
```

---

## Lesson 6.11: Redis Caching

### When to Cache

Cache when: the data is expensive to compute, changes rarely, and is read often. Don't cache when: data changes frequently, consistency is critical, or the query is already fast.

```javascript
import { createClient } from "redis";
const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

// Cache-aside pattern (most common)
async function getCourses(userId) {
  const cacheKey = `courses:${userId}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Cache miss — fetch from database
  const courses = await db.fetchCourses(userId);
  
  // Store in cache with TTL
  await redis.setEx(cacheKey, 300, JSON.stringify(courses));  // 5 minute TTL
  
  return courses;
}

// Invalidate cache when data changes
async function createCourse(userId, courseData) {
  const course = await db.createCourse(userId, courseData);
  await redis.del(`courses:${userId}`);  // clear stale cache
  return course;
}
```

**Redis data structures:**
- `string` — any value (JSON, numbers, flags). Use: cache, session tokens
- `list` — ordered list. Use: queues, recent activity feed
- `set` — unique values. Use: tags, user permissions
- `sorted set` — scored unique values. Use: leaderboards, rate limiting
- `hash` — field-value map. Use: storing user sessions

---

## Phase 6 Milestone: Job Application Intelligence — Fully Deployed

Wire the Phase 5 FastAPI backend to a React frontend:
- Job description input form
- Resume upload (text extraction)
- Claude API analysis → skills match percentage + gap list
- Application tracker (PostgreSQL table: user_id, job_title, company, status, created_at)
- Full Supabase schema with RLS enabled on all tables
- Deployed live to Vercel (frontend) + Render (FastAPI backend)
- Public URL that a stranger can use

---

## Phase 6 Check

**Feynman checks:**

1. What is referential integrity and how does a foreign key enforce it? What happens if you try to delete a user who has courses, and `ON DELETE CASCADE` is not set?

2. What is the difference between INNER JOIN and LEFT JOIN? Give an example of when you'd need each for StudyApp data.

3. What does `EXPLAIN ANALYZE` tell you? How do you identify that an index is missing from the output?

4. What is Row Level Security in Supabase? Why does it matter for security, even if your application layer also checks authorization?

5. What is the N+1 problem? Show the wrong Prisma code and the correct fix.

**Real System Connection:** Supabase runs on top of PostgreSQL. Every `supabase.from("courses").select()` is a SQL query running on a managed PostgreSQL instance. The Supabase dashboard's "Table Editor" is just a UI for running SQL. The "SQL Editor" runs raw PostgreSQL queries. Understanding PostgreSQL IS understanding Supabase at its core.
