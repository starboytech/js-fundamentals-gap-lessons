# Full Stack — Phase 0: Web Foundations
## How the internet actually works. No code yet.

---

## What This Phase Is

Before you write a single line of code, you need to understand what happens when a user types a URL and presses Enter. Every debugging session, every performance problem, every security vulnerability traces back to this layer. You can't fix what you don't understand.

**Phase-opening misconception:** "The browser just loads the website."

The browser is the last step in a chain of 7+ operations that happens before any pixel renders. Understanding that chain is what separates a developer who guesses from one who diagnoses.

---

## Lesson 0.1: How the Web Works

### The Complete Request Lifecycle

Type `https://example.com/courses` and press Enter. Here is everything that happens:

**Step 1 — DNS Resolution (the phone book lookup)**
Your browser needs to find example.com's IP address. It doesn't know it, so it asks:
- Check browser DNS cache (fastest — already looked this up recently)
- Check OS DNS cache (`/etc/hosts` or Windows hosts file)
- Ask the **recursive resolver** (your ISP's DNS server, or 8.8.8.8 if you use Google DNS)
- The resolver asks the **root nameserver** → points to the `.com` nameserver
- The `.com` nameserver → points to studyapp's **authoritative nameserver**
- The authoritative nameserver returns: `example.com → 76.76.21.21`
- Browser caches it with TTL (Time To Live — how long it's valid)

**Why DNS TTL matters:** If you change example.com's server IP and DNS TTL is set to 24 hours, some users will still hit the old server for up to 24 hours. Lower TTL = faster propagation. Higher TTL = better performance (fewer lookups). Standard for production: 300 seconds (5 minutes) when preparing a migration, 3600+ during normal operation.

**Step 2 — TCP Connection (the handshake)**
The browser opens a TCP connection to port 443 on 76.76.21.21.

TCP 3-way handshake:
```
Client → Server: SYN (I want to connect)
Server → Client: SYN-ACK (OK, I'm ready)
Client → Server: ACK (Good, let's go)
```
This costs 1 round-trip before any data moves. RTT from New York to London: ~70ms. That 70ms is paid before any HTTP request.

**Step 3 — TLS Handshake (the security negotiation)**
Because this is HTTPS, there's a TLS handshake before HTTP:
- Browser and server agree on cipher suite (encryption algorithm)
- Server sends its SSL certificate (proves it's really example.com, signed by a trusted Certificate Authority)
- Browser verifies the certificate chain (your browser has a built-in list of trusted CAs)
- Session keys are derived (asymmetric crypto to establish symmetric session key)

TLS 1.3 (current standard): 1 RTT for the handshake. TLS 1.2: 2 RTTs. This matters — it's why Cloudflare and Vercel terminate TLS at edge nodes close to users, not at origin servers.

**Step 4 — HTTP Request**
```
GET /courses HTTP/2
Host: example.com
Accept: text/html,application/xhtml+xml
Accept-Language: en-US,en;q=0.9
Cookie: session=abc123
User-Agent: Mozilla/5.0 (...)
```

Key headers:
- `Host`: which virtual host (one server can serve multiple domains)
- `Accept`: what content types the client understands
- `Cookie`: session tokens, auth, preferences
- `User-Agent`: browser and OS info (used for analytics and feature detection)

**Step 5 — Server Processes the Request**
At Vercel/AWS: the request hits a load balancer → routed to an available server → Next.js app processes it → may query the database → builds the HTML response.

**Step 6 — HTTP Response**
```
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: public, max-age=31536000, immutable
Content-Encoding: gzip
Vary: Accept-Encoding
```

Key response headers:
- `Content-Type`: tells the browser what it received
- `Cache-Control`: how long the browser can cache this response (31536000s = 1 year, used for static assets with content-hashed filenames)
- `Content-Encoding: gzip`: the body is compressed — browser decompresses it
- `200 OK` vs `301 Redirect` vs `404 Not Found` vs `500 Server Error`

**Step 7 — Rendering**
Browser parses HTML → builds DOM → parses CSS → builds CSSOM → combines into render tree → layout → paint → composite. JavaScript runs after the DOM is ready (or earlier if deferred).

This is where Core Web Vitals are measured: LCP (when does the main content appear), CLS (does the layout shift), INP (how fast does it respond to clicks).

### HTTP Status Codes — The Ones You'll Debug Daily

| Code | Meaning | When you see it |
|------|---------|----------------|
| 200 | OK | Request succeeded |
| 201 | Created | POST that created a resource |
| 204 | No Content | DELETE that succeeded but has no body to return |
| 301 | Moved Permanently | Redirect (browser caches this permanently) |
| 302 | Found (Temporary Redirect) | Redirect (not cached — use for auth redirects) |
| 400 | Bad Request | Client sent invalid data |
| 401 | Unauthorized | Not logged in (no valid credentials) |
| 403 | Forbidden | Logged in but not allowed (wrong role/permission) |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Trying to create something that already exists |
| 422 | Unprocessable Entity | Validation failed on well-formed request |
| 429 | Too Many Requests | Rate limited |
| 500 | Internal Server Error | Your server crashed |
| 502 | Bad Gateway | Load balancer can't reach your server |
| 503 | Service Unavailable | Server is overloaded or down |

**The 401 vs 403 distinction is commonly confused:** 401 means "I don't know who you are — please authenticate." 403 means "I know who you are — you're not allowed." A logged-in user hitting a route they don't have permission for gets 403, not 401.

### HTTP/1.1 vs HTTP/2 vs HTTP/3

**HTTP/1.1** (1997): One request per TCP connection. Workaround: open 6 connections. Problem: head-of-line blocking — if request 1 is slow, request 2 waits.

**HTTP/2** (2015): Multiplexing — multiple requests over one connection simultaneously. Binary protocol (faster parsing). Header compression. Server push (rarely used correctly in practice). Used by 65%+ of websites in 2025.

**HTTP/3** (2022): Replaces TCP with QUIC (UDP-based). No head-of-line blocking at the transport layer. 0-RTT reconnection. Better on lossy networks (mobile). Used by 30%+ of websites. Next.js on Vercel serves HTTP/3 automatically.

---

## Lesson 0.2: Command Line Mastery

### Why the Command Line

The command line is where professional development actually happens. Not because it's cool — because it's faster, scriptable, repeatable, and works over SSH to production servers where there is no GUI.

**The misconception:** "The GUI does the same thing."

The GUI does a subset of what the command line does. `npm install`, `git push`, `docker run`, `ssh prod-server` — none of these have reliable GUI equivalents in professional toolchains.

### Navigation

```bash
pwd                     # print working directory (where am I?)
ls                      # list files
ls -la                  # list all (including hidden .files) with permissions, sizes, dates
cd /home/learner/courses  # change to absolute path
cd ..                   # go up one directory
cd ~                    # go to home directory
cd -                    # go back to previous directory

# Hidden files start with . — config files live here
ls -la ~                # shows .bashrc, .gitconfig, .ssh/, etc.
```

### Files

```bash
mkdir new-folder              # create directory
mkdir -p a/b/c                # create nested directories at once
touch file.txt                # create empty file
cp source.txt dest.txt        # copy file
cp -r source-dir/ dest-dir/   # copy directory (recursive)
mv old.txt new.txt            # move/rename
rm file.txt                   # delete file (no trash — gone)
rm -rf folder/                # delete folder and all contents (dangerous — no confirmation)
cat file.txt                  # print file contents
less file.txt                 # page through file (q to quit)
```

### Searching

```bash
grep "error" app.log              # find lines containing "error" in file
grep -r "TODO" ./src/             # search recursively through directory
grep -n "export default" *.tsx    # show line numbers in results
find . -name "*.json"             # find files by name pattern
find . -name "*.ts" -newer package.json  # files modified more recently than package.json

# Very useful: pipe output through grep
npm run build 2>&1 | grep "error"  # show only error lines from build output
```

### Environment Variables

```bash
echo $HOME              # print an env variable
export MY_VAR="value"   # set for this session
printenv                # print all env vars

# In .bashrc or .zshrc — persistent across sessions
export EDITOR="code"
export PATH="$PATH:/usr/local/bin"
```

**Why env vars matter for web dev:**
- API keys, database URLs, secret keys live in env vars — never hardcoded in source
- Different values in dev vs production without changing code
- `process.env.DATABASE_URL` in Node.js, `os.environ["DATABASE_URL"]` in Python

### Pipes and Redirection

```bash
command1 | command2          # pipe: output of 1 becomes input of 2
command > file.txt           # redirect stdout to file (overwrites)
command >> file.txt          # redirect stdout to file (appends)
command 2> errors.txt        # redirect stderr to file
command 2>&1                 # redirect stderr to stdout (see both in terminal)
command &                    # run in background

# Real example: build, then grep errors from both stdout and stderr
npm run build 2>&1 | grep -i "error" | head -20
```

---

## Lesson 0.3: Git & GitHub — Professional Standard

### The Misconception

"Git is just backup for code."

Git is how teams of engineers collaborate on codebases with thousands of files without overwriting each other's work. It's the timeline of every change ever made, who made it, and why. It's how you roll back a broken deployment at 2am. It's how you trace a bug to the commit that introduced it.

### How Git Stores Data

Git doesn't store file diffs — it stores snapshots. Each commit is a complete snapshot of every tracked file at that point in time. Git deduplicates: if a file didn't change, the new commit just points to the same stored object. This is why `git checkout` to an old commit restores the entire codebase instantly — no reconstruction needed.

### The Three Areas

```
Working Directory        Staging Area         Repository
(your files on disk) → (git add) → (.git/index) → (git commit) → (.git/)
```

Working directory: the actual files you edit.
Staging area: what will go into the next commit. You can stage only part of your changes.
Repository: the committed history — local.

```bash
git status                # what's changed, what's staged
git diff                  # unstaged changes
git diff --staged         # staged changes (what will go in next commit)
git add file.txt          # stage one file
git add .                 # stage all changes (be careful — don't stage .env)
git add -p                # interactive staging: approve each chunk individually (most professional)
git commit -m "feat: add user authentication"
git log --oneline         # compact history
git log --oneline --graph # history with branch visualization
```

### Conventional Commits (Non-Negotiable in This Course)

Format: `type: short description` (under 72 chars, present tense)

```
feat: add course upload with PDF support
fix: resolve session token expiry on refresh
docs: add API authentication guide to README
chore: upgrade Next.js to 15.1
test: add integration tests for user enrollment
style: format auth service with Prettier
refactor: extract token validation to middleware
```

Why present tense? The commit message completes: "If applied, this commit will... `feat: add course upload`."

**Never commit:** "fix", "wip", "update", "changes". If the description is vague, the commit is too large — split it.

### Branches and Trunk-Based Development

```bash
git branch                           # list branches
git checkout -b feature/user-auth    # create and switch to branch
git checkout main                    # switch back to main
git merge feature/user-auth          # merge branch into current
git branch -d feature/user-auth      # delete branch after merge

# Professional workflow (trunk-based):
git checkout -b fix/login-redirect   # branch from main
# ... make changes, commit ...
git fetch origin                     # get latest remote state
git rebase origin/main               # replay your commits on top of latest main
git push origin fix/login-redirect   # push branch to remote
# → open PR on GitHub → review → squash merge → delete branch
```

**Squash merge:** Collapses all commits on a branch into one clean commit on main. Your main branch has one commit per feature/fix — readable history. Your branch can have messy "WIP" commits during development — nobody sees those.

### SSH Setup (Do This Once, Never Type Password Again)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "you@example.com"

# Add to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard
cat ~/.ssh/id_ed25519.pub
# → Go to GitHub → Settings → SSH Keys → Add New → paste

# Verify it works
ssh -T git@github.com
```

After this, `git push` never asks for a password.

### .gitignore — What Never Goes in the Repo

```gitignore
# Environment and secrets
.env
.env.local
.env.*.local
*.key
*.pem

# Dependencies (installable from package.json)
node_modules/
__pycache__/
*.pyc
.venv/

# Build outputs (reproducible from source)
dist/
.next/
build/
out/

# Editor files
.DS_Store
*.swp
.vscode/settings.json

# Logs
*.log
npm-debug.log*
```

**The rule:** Never commit what can be derived from source + install commands. Never commit secrets. Nothing in `.env`. If a secret is ever committed, assume it's compromised — rotate it immediately, even if you delete it from history.

### The Before Day 1 Checklist

Before any code is written, confirm:
- [ ] SSH key added to GitHub
- [ ] `git config --global user.name "Jasmine Lee"` set
- [ ] `git config --global user.email "you@example.com"` set
- [ ] `git config --global core.editor "code --wait"` (VS Code as default editor)
- [ ] First repo created, README committed, pushed to GitHub

### Debugging History

```bash
# Find the commit that introduced a bug (binary search through history)
git bisect start
git bisect bad                    # current commit is broken
git bisect good v1.0              # this older commit was fine
# Git checks out the midpoint — test it, mark good or bad
git bisect good / git bisect bad  # repeat until Git finds the culprit
git bisect reset                  # done

# Find who last changed a specific line
git blame src/auth/middleware.ts  # shows commit hash + author + date per line

# See changes in a specific commit
git show abc1234

# Find commits that changed a specific string
git log -S "jwtSecret"            # who changed this string and when
```

---

## Lesson 0.4: Dev Environment

### Required Tools

```bash
# Node.js — use nvm, not the system Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts                 # install latest LTS
nvm use --lts
node --version                    # confirm

# npm comes with Node. Check it:
npm --version

# Install pnpm (faster npm alternative — used by many Next.js projects)
npm install -g pnpm

# GitHub CLI
# On Ubuntu/Debian:
sudo apt install gh
# Authenticate:
gh auth login
```

### VS Code Extensions (Install All of These)

```
ESLint                    — syntax error highlighting
Prettier                  — automatic code formatting
TypeScript                — built-in, just confirm it's enabled
GitLens                   — inline git blame in editor
Tailwind CSS IntelliSense — class name autocomplete
ES7+ React Snippets       — rfce → creates full React component
Auto Rename Tag           — rename opening/closing HTML tags together
Path IntelliSense         — autocomplete import paths
REST Client               — test API endpoints from VS Code (like Postman but in-editor)
Error Lens                — shows errors inline instead of only on hover
```

### VS Code Settings Worth Configuring

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": { "typescript": "typescriptreact" },
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

### Starting a Next.js Project

```bash
npx create-next-app@latest my-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd my-app
npm run dev          # starts on localhost:3000
```

Flags explained:
- `--typescript`: use TypeScript (always use TypeScript)
- `--tailwind`: include Tailwind CSS
- `--eslint`: include ESLint config
- `--app`: use App Router (the current standard, not Pages Router)
- `--src-dir`: put source files in `src/` directory
- `--import-alias "@/*"`: `@/components/Button` instead of `../../components/Button`

---

## Phase 0 Check

**Feynman check — explain this without looking:**

1. A user in London types `https://example.com/courses` and presses Enter. Walk through what happens step by step, from the URL to pixels on screen. Include: DNS, TCP, TLS, HTTP, server, response, rendering.

2. What's the difference between a 401 and a 403 response? Give a real example of each for example.com.

3. What does `git add -p` do and why use it instead of `git add .`?

4. Your API key is accidentally committed to GitHub. What do you do?

**Real System Connection:** Vercel's global edge network terminates TLS at the edge node closest to the user (70+ locations worldwide). This cuts the TLS handshake RTT from 300ms (New York to London origin) to ~10ms (London edge node). This is why Next.js apps on Vercel feel fast globally with zero configuration — the web foundations layer is being optimized automatically.
