# Full Stack — Phase 8: Deployment & DevOps
## Getting your apps running in production, not just locally.

---

## Phase-Opening Misconception

"Deployment is just uploading files."

Deployment is the difference between a project and a product. Local code that works on your machine means nothing if a stranger can't use it. This phase covers: building production Docker images, GitHub Actions CI/CD, environment variable management across environments, error monitoring, and hardening three portfolio projects for job applications.

---

## Lesson 8.1: Deployment Models

### The Four Options

**Static hosting:** Pre-built HTML/CSS/JS served from a CDN. No server required.
- What: Next.js apps with `next export`, plain React (Vite build), documentation sites
- Where: Vercel (best for Next.js), Cloudflare Pages, GitHub Pages
- Cost: free for small apps
- Limits: no server-side code, no SSR, no API routes

**Server hosting:** A persistent server running your app.
- What: Express/FastAPI backends, apps that need persistent state or long-running processes
- Where: Render, Railway, Fly.io, DigitalOcean App Platform, AWS EC2
- Cost: $5-20/month for small servers
- When: backend APIs, apps with WebSockets, anything that needs persistent processes

**Serverless:** Code runs on-demand in functions, no persistent server.
- What: Next.js API routes (on Vercel), AWS Lambda, Cloudflare Workers
- Where: Vercel (auto for Next.js), AWS, Cloudflare
- Cost: pay per invocation (very cheap for low traffic, can get expensive at scale)
- Limits: function timeout (~30s), cold starts, no persistent connections (WebSockets need workarounds)

**Container hosting:** Your Dockerfile runs as a container.
- What: anything with a Dockerfile
- Where: Render (web services), Railway, AWS ECS, GCP Cloud Run, Fly.io
- Cost: based on CPU/memory used
- Best for: predictable workloads, services with specific dependencies, microservices

**For the portfolio projects:**
- Next.js frontend → Vercel (zero-config, free tier)
- FastAPI backend → Render (web service with Dockerfile)
- PostgreSQL → Supabase managed database

---

## Lesson 8.2: Vercel

### Deploying Next.js to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (first time — asks to link to a project)
vercel

# Deploy to production
vercel --prod

# Or use GitHub integration — push to main → auto-deploy
# In Vercel dashboard: New Project → Import from GitHub
```

### Preview Deployments

Every PR gets a unique preview URL: `https://studyapp-pr-42-username.vercel.app`
- Run automatically on every push to a PR branch
- Share with teammates for review
- Inherits production environment variables (except secrets you choose to exclude)
- Deleted when PR is merged

### Environment Variables in Vercel

```bash
# Via CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add ANTHROPIC_API_KEY production

# NEXT_PUBLIC_ prefix = exposed to browser (only use for non-secret values)
# Without prefix = server-side only (for secrets)
```

In Vercel dashboard: Settings → Environment Variables → can set different values per environment (production / preview / development).

### Vercel Deployment Configuration

```json
// vercel.json — optional, for custom configuration
{
  "functions": {
    "app/api/**/*": {
      "maxDuration": 60    // increase timeout for AI endpoints (default 10s on hobby)
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

---

## Lesson 8.3: Render — Deploying FastAPI

### Deploying the FastAPI Backend

```yaml
# render.yaml — infrastructure as code for Render
services:
  - type: web
    name: studyapp-api
    runtime: docker
    region: oregon
    plan: starter              # $7/month
    healthCheckPath: /health
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: studyapp-db
          property: connectionString
      - key: ANTHROPIC_API_KEY
        sync: false            # set manually in Render dashboard (not in this file)
    autoDeploy: true           # deploy on every push to main

databases:
  - name: studyapp-db
    plan: starter              # managed PostgreSQL
    postgresMajorVersion: 16
```

### FastAPI Health Check Endpoint

```python
from fastapi import FastAPI
from datetime import datetime

app = FastAPI()

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
    }
```

Render pings this endpoint every 30 seconds. If it fails, Render restarts the service. This is why a proper health check (that actually verifies DB connectivity) is important:

```python
@app.get("/health")
async def health(db = Depends(get_db)):
    try:
        await db.execute("SELECT 1")    # verify DB is accessible
        return { "status": "ok" }
    except Exception as e:
        return JSONResponse({"status": "error", "detail": str(e)}, status_code=503)
```

---

## Lesson 8.4: Docker Production Hardening

### Multi-Stage Builds

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci                          # install all deps including dev

COPY . .
RUN npm run build                   # compile TypeScript, build Next.js

# Stage 2: Production image (much smaller)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Only copy what's needed to run the app
COPY --from=builder /app/.next/standalone ./    # standalone output
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Create non-root user (security: don't run as root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
```

Multi-stage builds: dev dependencies are in Stage 1 (builder) only. Stage 2 (runner) only has what the app needs to run. Result: 150MB instead of 800MB image.

```dockerfile
# FastAPI multi-stage
FROM python:3.12-slim AS builder
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --target=/dependencies -r requirements.txt

FROM python:3.12-slim AS runner
WORKDIR /app

COPY --from=builder /dependencies /usr/local/lib/python3.12/site-packages/
COPY app/ ./app/

RUN useradd --no-create-home --shell /bin/false appuser
USER appuser

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Secrets in Production (Not ENV)

```bash
# NEVER: secrets in Dockerfile ENV (appears in image layers and logs)
ENV DATABASE_URL=postgresql://user:password@...  # WRONG

# CORRECT: inject at runtime via the hosting platform
# Render: set in dashboard → encrypted at rest → injected as env vars
# Vercel: set in dashboard → never in vercel.json
# Docker: use Docker secrets (Swarm/Compose) or a secrets manager

# For Docker Compose in local development (secrets file pattern):
secrets:
  db_password:
    file: ./secrets/db_password.txt

services:
  api:
    secrets:
      - db_password
    environment:
      DB_PASSWORD_FILE: /run/secrets/db_password
```

### Docker Networking

```yaml
# docker-compose.yml
services:
  api:
    networks:
      - app-network
    environment:
      # Use service name as hostname — NOT localhost
      DATABASE_URL: postgresql://postgres:password@db:5432/studyapp
                                                  # ↑ service name
  db:
    image: postgres:16
    networks:
      - app-network
    # NOT exposed to host — only accessible via app-network
    # No 'ports' mapping = database only reachable from within the network

  nginx:
    image: nginx:alpine
    networks:
      - app-network
    ports:
      - "80:80"      # only nginx faces the internet
      - "443:443"

networks:
  app-network:
    driver: bridge
```

---

## Lesson 8.5: CI/CD with GitHub Actions

### Complete CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: testpassword
          POSTGRES_DB: studyapp_test
        ports:
          - 5432:5432
        options: --health-cmd pg_isready --health-interval 10s --health-timeout 5s --health-retries 5

    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"           # cache node_modules between runs
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npx tsc --noEmit
      
      - name: Lint
        run: npm run lint
      
      - name: Run tests
        env:
          DATABASE_URL: postgresql://postgres:testpassword@localhost:5432/studyapp_test
        run: npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}'
      
      - name: Build
        run: npm run build

  docker:
    runs-on: ubuntu-latest
    needs: test          # only runs if test job passes
    if: github.ref == 'refs/heads/main'   # only on main branch push
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker image
        run: docker build -t studyapp-api .
      
      - name: Test Docker image runs
        run: |
          docker run -d --name test-container -p 8000:8000 \
            -e DATABASE_URL=${{ secrets.TEST_DATABASE_URL }} \
            studyapp-api
          sleep 10
          curl -f http://localhost:8000/health
          docker stop test-container

  deploy:
    needs: docker
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Deploy to Render
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK_URL }}
        # Render deploy hook: Settings → Deploy Hook → copy URL → add as GitHub secret
```

### Branch Protection Rules

In GitHub: Repository → Settings → Branches → Add rule for `main`:
- Require pull request before merging
- Require status checks to pass before merging (select your CI jobs)
- Require linear history (no merge commits — squash only)
- Restrict pushes (no direct pushes to main)

These rules mean: nothing gets to main without passing CI + code review.

---

## Lesson 8.6: Monitoring

### Sentry for Error Tracking

```typescript
// sentry.client.config.ts (Next.js)
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,    // sample 10% of requests for performance data
  
  // Don't track errors from known bots
  ignoreErrors: ["BotDetectedError"],
});

// sentry.server.config.ts (for API routes)
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

```typescript
// Catching and reporting errors
import * as Sentry from "@sentry/nextjs";

try {
  await processUpload(file);
} catch (error) {
  Sentry.captureException(error, {
    tags: { feature: "file_upload" },
    user: { id: userId },
    extra: { filename: file.name, fileSize: file.size },
  });
  return new Response("Upload failed", { status: 500 });
}
```

Sentry gives you:
- Stack traces for every error (with source maps — shows original TypeScript, not compiled JS)
- Error frequency and affected users
- Session replay (watch what the user did before the error)
- Performance monitoring (slow transactions)

### Structured Logging

```python
# FastAPI — structured logging with JSON output
import structlog
import logging

log = structlog.get_logger()

@app.post("/api/analyze")
async def analyze(request: AnalyzeRequest, user=Depends(get_current_user)):
    log.info(
        "analyze_request",
        user_id=user.id,
        job_description_length=len(request.job_description),
    )
    
    try:
        result = await claude_analyze(request)
        log.info(
            "analyze_success",
            user_id=user.id,
            tokens_used=result.usage.total_tokens,
        )
        return result
    except Exception as e:
        log.error("analyze_failed", user_id=user.id, error=str(e))
        raise
```

JSON-structured logs are machine-readable — you can query them in Datadog, Logtail, or CloudWatch.

---

## Lesson 8.7: Domain, DNS, HTTPS

### Custom Domain on Vercel

```bash
# Add domain in Vercel dashboard:
# Project → Settings → Domains → Add Domain

# Then update DNS at your registrar (Namecheap, Cloudflare, etc.):
# CNAME: example.com → cname.vercel-dns.com
# A:     example.com → 76.76.21.21  (Vercel's IP)
```

DNS propagation takes 1-48 hours (usually much faster). Vercel automatically provisions a Let's Encrypt SSL certificate once DNS is pointing to them.

### SSL/HTTPS Everywhere

```yaml
# nginx config: redirect HTTP to HTTPS
server {
  listen 80;
  server_name example.com;
  return 301 https://$host$request_uri;  # permanent redirect
}

server {
  listen 443 ssl;
  server_name example.com;
  
  ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
  
  # HSTS — tells browsers to always use HTTPS (cached for 1 year)
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  
  location / {
    proxy_pass http://localhost:3000;
  }
}
```

Vercel and Render handle SSL automatically. If running your own server (VPS), use Certbot for Let's Encrypt.

---

## Phase 8 Project: Production-Harden All 3 Portfolio Projects

By the end of Phase 8, all three portfolio projects must have:

**Portfolio Project 1 (AI Practice Exam Generator):**
- [ ] Custom domain (e.g., examgen.example.com)
- [ ] GitHub Actions: run Vitest + build + Docker build on every PR
- [ ] Sentry initialized in Next.js and FastAPI
- [ ] Render deploy hook in GitHub Actions (auto-deploy on merge to main)
- [ ] Environment variables: documented in `.env.example`, set in Vercel + Render dashboards
- [ ] Lighthouse score: run audit, fix to 90+ on Performance, Accessibility

**Portfolio Project 2 (Job Application Intelligence):**
- Same CI/CD pipeline
- Supabase RLS: audit all tables have policies
- Rate limiting on AI endpoints

**Portfolio Project 3 (Real-Time Collaborative Tool):**
- WebSocket server on Render
- Health check endpoint
- CI: test WebSocket connection in pipeline

**The check:** Open incognito window. Navigate to each URL. Create an account. Use the core feature. It works. No errors in Sentry.

---

## Phase 8 Check

**Feynman checks:**

1. What is a multi-stage Docker build? Why does it produce a smaller image than a single-stage build?

2. What is a GitHub Actions CI pipeline? What happens when a PR fails the CI checks?

3. Where do production secrets (API keys, database passwords) live in a deployed app? Where do they NOT live?

4. What is Sentry and what problem does it solve that `console.log` doesn't?

5. Your Render service keeps restarting. The health check is failing. What are the first three things you check?

**Real System Connection:** Vercel uses GitHub Actions (or their own CI infrastructure) to build and deploy their own products. Their `vercel/vercel` monorepo on GitHub has 40+ GitHub Actions workflows — test runners, security scanners, deployment pipelines, release automation. Looking at an open-source company's `.github/workflows/` directory is one of the best ways to learn CI/CD from production examples.
