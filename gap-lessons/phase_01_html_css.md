# Full Stack — Phase 1: HTML & CSS
## Structure and style. Move fast — you need fluency, not depth.

---

## Phase-Opening Misconception

"HTML and CSS are easy — just copy-paste from Google."

HTML and CSS are learnable in 2 weeks. They are not mastered in 2 weeks. The depth is in accessibility (correct semantic HTML changes how screen readers behave), specificity (why your CSS doesn't apply), and layout systems (Flexbox and Grid have actual mental models). You can build UIs without understanding those — you just can't build them correctly or quickly.

---

## Lesson 1.1: HTML Structure

### What HTML Actually Is

HTML is not a programming language. It's a markup language — it describes the structure and meaning of content. The browser reads HTML and builds the DOM (Document Object Model), which is a tree of objects representing each element. JavaScript then manipulates the DOM. CSS styles the DOM.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StudyApp</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Welcome to StudyApp</h1>
  <p>Upload your course material. We teach you, test you, and get you exam-ready.</p>
</body>
</html>
```

Every HTML document needs:
- `<!DOCTYPE html>`: tells the browser this is HTML5 (not older HTML)
- `<html lang="en">`: root element, `lang` helps screen readers and search engines
- `<head>`: metadata not displayed to users
- `<meta charset="UTF-8">`: character encoding — without this, non-ASCII characters break
- `<meta name="viewport" ...>`: makes the page scale correctly on mobile — without this, mobile browsers zoom out and show a tiny desktop page
- `<body>`: everything users see

### Semantic HTML — Use the Right Element

**The misconception:** "I can use `<div>` for everything."

You can. It works. It also breaks screen readers, search engine ranking, and keyboard navigation. A `<div>` has no semantic meaning. `<button>` is focusable with Tab, activatable with Enter/Space, announces itself as a button to screen readers. A `<div onclick>` does none of that.

```html
<!-- WRONG: div soup -->
<div class="header">
  <div class="nav">
    <div class="nav-link">Home</div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="title">B-Tree Indexes</div>
    <div class="content">...</div>
  </div>
</div>

<!-- RIGHT: semantic HTML -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <article>
    <h1>B-Tree Indexes</h1>
    <p>...</p>
  </article>
</main>
```

### Semantic Elements You Must Know

| Element | Use for |
|---------|---------|
| `<header>` | Page header or section header |
| `<nav>` | Navigation links |
| `<main>` | Primary content of the page (one per page) |
| `<article>` | Self-contained content (blog post, card) |
| `<section>` | Thematic grouping within a page |
| `<aside>` | Sidebar content tangentially related to main content |
| `<footer>` | Footer |
| `<h1>–<h6>` | Headings — only one `<h1>` per page, hierarchical |
| `<p>` | Paragraph of text |
| `<ul>` / `<ol>` | Unordered / ordered lists |
| `<li>` | List item |
| `<a href="">` | Link to another page or resource |
| `<img src="" alt="">` | Image — `alt` is required, describes the image |
| `<button>` | Clickable button (for actions, not navigation) |
| `<form>` | Form container |
| `<input>` | Text field, checkbox, radio, etc. |
| `<label>` | Labels an input — must be associated with it |
| `<table>` | Tabular data only — not for layout |

### Forms

```html
<form action="/submit" method="POST">
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required placeholder="you@example.com">
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required minlength="8">
  </div>
  <button type="submit">Sign In</button>
</form>
```

Key points:
- `<label for="email">` connects to `<input id="email">` — clicking the label focuses the input
- `required` = browser validates before submit
- `type="email"` = browser validates email format and shows mobile email keyboard
- `type="password"` = browser hides characters
- `method="POST"` = data in request body (not in URL like `?email=...`)

---

## Lesson 1.2: CSS Basics

### The Cascade and Specificity

**The misconception:** "My CSS isn't working — must be a browser bug."

Almost never. It's specificity. CSS rules conflict — the most specific one wins.

**Specificity is calculated as (a, b, c):**
- `a` = number of ID selectors (`#header`)
- `b` = number of class/attribute/pseudo-class selectors (`.btn`, `[type="text"]`, `:hover`)
- `c` = number of element selectors (`div`, `p`, `h1`)

```css
p                           /* (0,0,1) — specificity 1 */
.text                       /* (0,1,0) — specificity 10 */
#main p                     /* (1,0,1) — specificity 101 */
#main .text p               /* (1,1,1) — specificity 111 */

/* !important overrides everything — only use as a last resort */
p { color: red !important; }
```

**How to debug specificity in practice:**
1. Open Chrome DevTools → select the element
2. In the Styles panel, crossed-out styles are overridden by something more specific
3. Hover over the selector to see its specificity value

### The Box Model

Every HTML element is a box with four layers:

```
┌─────────────────────────────────────────────┐
│               MARGIN (outside)               │
│  ┌───────────────────────────────────────┐  │
│  │             BORDER                     │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │           PADDING               │  │  │
│  │  │  ┌───────────────────────────┐  │  │  │
│  │  │  │        CONTENT            │  │  │  │
│  │  │  │   (width × height)        │  │  │  │
│  │  │  └───────────────────────────┘  │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**Critical: `box-sizing: border-box`**

Default: `width: 200px` + `padding: 20px` = 240px total. Unexpected.
With `box-sizing: border-box`: `width: 200px` IS the total — padding is inside it. Expected.

Add to every project:
```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

### Display Types

```css
display: block;       /* takes full width, stacks vertically (div, p, h1) */
display: inline;      /* width is content-width, flows with text (span, a) */
display: inline-block; /* flows with text but accepts width/height */
display: flex;        /* flexbox container */
display: grid;        /* grid container */
display: none;        /* removes from layout entirely */
```

**The misconception:** "Block vs inline is about layout preference."

It's about semantic meaning. `<p>` is block because paragraphs stack. `<span>` is inline because it marks text within a paragraph. Don't use `display: block` on a `<span>` when you should be using a `<div>`. Use the right element first.

---

## Lesson 1.3: Flexbox

### What Flexbox Solves

Before Flexbox (pre-2013), centering a div horizontally AND vertically required hacks involving absolute positioning and negative margins. Flexbox makes layout predictable.

**The mental model:** Flexbox is a one-dimensional layout system. It arranges items along one axis: either a row (horizontal) or a column (vertical).

```css
.container {
  display: flex;               /* activate flexbox */
  flex-direction: row;         /* default: left-to-right */
  justify-content: space-between; /* distribution along main axis */
  align-items: center;         /* alignment along cross axis */
  flex-wrap: wrap;             /* allow items to wrap to next line */
  gap: 16px;                   /* space between items (better than margin) */
}
```

### Main Axis vs Cross Axis

`flex-direction: row` (default):
- Main axis: horizontal (left → right)
- Cross axis: vertical (top → bottom)

`flex-direction: column`:
- Main axis: vertical (top → bottom)
- Cross axis: horizontal (left → right)

`justify-content` always controls the **main axis**.
`align-items` always controls the **cross axis**.

```css
/* Center everything — the classic Flexbox centering */
.center-both {
  display: flex;
  justify-content: center;  /* center on main axis (horizontal for row) */
  align-items: center;      /* center on cross axis (vertical for row) */
  height: 100vh;            /* need a height for vertical centering to work */
}
```

### justify-content Values

```css
justify-content: flex-start;     /* pack items to start */
justify-content: flex-end;       /* pack items to end */
justify-content: center;         /* center items */
justify-content: space-between;  /* equal space BETWEEN items, none at edges */
justify-content: space-around;   /* equal space AROUND items (half-space at edges) */
justify-content: space-evenly;   /* perfectly equal space everywhere */
```

### flex Property on Items

```css
.item {
  flex: 1;       /* shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
}

/* Makes all items equal width, filling available space */
.nav-item { flex: 1; }

/* One item takes up twice the space */
.main-content { flex: 2; }
.sidebar { flex: 1; }
```

### Real-World Flexbox: Navigation Bar

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
}

.navbar-logo { font-size: 1.5rem; font-weight: bold; }
.navbar-links { display: flex; gap: 32px; }
.navbar-cta { /* button styling */ }
```

---

## Lesson 1.4: CSS Grid

### What Grid Solves

Flexbox is one-dimensional. Grid is two-dimensional: rows AND columns at the same time. For complex page layouts (dashboards, card grids), Grid is the right tool.

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);    /* 3 equal columns */
  grid-template-rows: auto;                  /* rows size to content */
  gap: 24px;                                 /* space between cells */
}
```

**`1fr`** = one fraction of available space. `repeat(3, 1fr)` = 3 equal columns.

### grid-template-columns Patterns

```css
/* 3 equal columns */
grid-template-columns: repeat(3, 1fr);

/* Sidebar + content */
grid-template-columns: 250px 1fr;

/* Sidebar + content + aside */
grid-template-columns: 200px 1fr 200px;

/* Auto-fill: as many columns as fit, each at least 250px wide */
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
/* This is how responsive card grids work — no media queries needed */
```

### Spanning Items Across Cells

```css
.header { grid-column: 1 / -1; }  /* span all columns (1 to last) */
.sidebar { grid-row: 2 / 4; }     /* span 2 rows */
.featured { grid-column: span 2; } /* span 2 columns from current position */
```

### Named Template Areas

```css
.layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 64px 1fr 60px;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }
```

**When to use Flexbox vs Grid:**
- One row of items (nav, button group): Flexbox
- Items that need to flow/wrap unpredictably: Flexbox
- Complex page layout (header/sidebar/content): Grid
- Card grid where rows AND columns matter: Grid
- Center one item: Flexbox (simpler)
- In practice: you'll use both. Grid for page structure, Flexbox for items within a grid cell.

---

## Lesson 1.5: Responsive Design

### Mobile-First

**The misconception:** "Design for desktop first, then make it work on mobile."

In 2025: 60% of web traffic is mobile. Mobile connections are slower. Mobile devices are less powerful. Design for mobile first, enhance for larger screens.

Mobile-first CSS:
```css
/* Default styles = mobile */
.container {
  padding: 16px;
  font-size: 1rem;
}

/* Enhance at larger screens */
@media (min-width: 768px) {   /* tablet and up */
  .container { padding: 24px; }
}

@media (min-width: 1024px) {  /* desktop */
  .container { padding: 32px; }
  font-size: 1.125rem;
}
```

### Viewport Units

```css
100vw   /* 100% of viewport width */
100vh   /* 100% of viewport height */
100dvh  /* 100% of dynamic viewport height (excludes mobile browser chrome) */
```

**The `dvh` problem:** On mobile, `100vh` includes the browser address bar, causing elements to be hidden behind it. Use `100dvh` for elements that should fill the visible screen.

### rem vs px vs em

```css
/* px — fixed, doesn't scale with user preferences */
font-size: 16px;

/* rem — relative to root font-size (html element) */
/* If user sets browser font-size preference to large, rem values scale up */
font-size: 1rem;    /* = 16px at default browser settings */
font-size: 1.5rem;  /* = 24px at default */

/* em — relative to parent element's font-size */
/* Compounds when nested — harder to reason about */
font-size: 1.25em;
```

**Use rem for font sizes and spacing (scales with user preferences).** Use px for borders and elements where absolute size matters. Avoid em for font-size.

### Common Breakpoints (Tailwind defaults)

```css
sm:  640px   /* small screens and up */
md:  768px   /* medium (tablets) */
lg:  1024px  /* large (laptops) */
xl:  1280px  /* extra large */
2xl: 1536px  /* very large monitors */
```

---

## Lessons 1.6 & 1.7: Tailwind CSS

### What Tailwind Is

Tailwind is a utility-first CSS framework. Instead of writing custom CSS classes, you apply small utility classes directly in HTML.

```html
<!-- Traditional CSS -->
<style>
.card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
<div class="card">...</div>

<!-- Tailwind -->
<div class="bg-white rounded-lg p-6 shadow-md">...</div>
```

**The misconception:** "Tailwind is just inline styles."

Inline styles can't do responsive design, hover states, or dark mode without JavaScript. Tailwind classes compile to a CSS file — they're real CSS classes with pseudo-class support.

### Core Utility Pattern

```
property-value

bg-white        → background-color: white
text-gray-600   → color: #4B5563
text-xl         → font-size: 1.25rem
font-bold       → font-weight: 700
p-4             → padding: 1rem (4 × 0.25rem)
px-4            → padding-left: 1rem; padding-right: 1rem
py-2            → padding-top: 0.5rem; padding-bottom: 0.5rem
m-auto          → margin: auto
mt-4            → margin-top: 1rem
w-full          → width: 100%
h-screen        → height: 100vh
flex            → display: flex
items-center    → align-items: center
justify-between → justify-content: space-between
gap-4           → gap: 1rem
rounded-lg      → border-radius: 0.5rem
border          → border: 1px solid
shadow-md       → box-shadow: medium drop shadow
```

### Responsive Prefixes

```html
<!-- Mobile: full width. Medium+: half width. Large+: one third -->
<div class="w-full md:w-1/2 lg:w-1/3">

<!-- Mobile: column. Medium+: row -->
<div class="flex flex-col md:flex-row">

<!-- Mobile: 1 column. Small+: 2 columns. Large+: 3 columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

Format: `{breakpoint}:{utility}`. Without a prefix, the utility applies to all screen sizes (mobile first).

### Hover and Focus States

```html
<button class="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 
               text-white px-4 py-2 rounded-lg transition-colors">
  Sign In
</button>
```

`hover:` applies on mouse hover. `focus:` applies when element is focused (keyboard nav).
`transition-colors` enables smooth color transitions — without it, hover changes snap.

### Dark Mode

```html
<!-- In tailwind.config.ts: darkMode: 'class' -->

<html class="dark">
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    Content adapts to dark mode
  </div>
</html>
```

Add `dark:` prefix before any utility. The `dark` class on `<html>` triggers dark mode. Toggle it with JavaScript (`document.documentElement.classList.toggle('dark')`).

### Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],  // scan these files for class names
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
export default config
```

Tailwind scans your content files and generates only the CSS classes you actually use. A production Tailwind build is typically ~10-50KB — the full Tailwind CSS file is 3MB.

### StudyApp Component: Course Card

```html
<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 
            dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">System Design</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">9 phases · 45 lessons</p>
    </div>
    <span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 
                 text-xs font-medium px-2.5 py-0.5 rounded-full">Active</span>
  </div>
  <div class="mt-4">
    <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
      <span>Progress</span>
      <span>67%</span>
    </div>
    <div class="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
      <div class="bg-blue-600 h-2 rounded-full" style="width: 67%"></div>
    </div>
  </div>
</div>
```

---

## Lesson 1.8: Accessibility (a11y)

### Why Accessibility Is Non-Negotiable

**The misconception:** "Accessibility is for a small number of users with disabilities."

26% of adults in the US have some kind of disability. Screen readers, keyboard-only navigation, high-contrast mode, voice control — these aren't edge cases. And accessible HTML is better HTML for everyone: cleaner structure, better SEO, more maintainable code.

### WCAG 2.1 Core Principles (POUR)

**Perceivable:** Users can perceive all information. Images need `alt` text. Videos need captions. Color is never the only way to convey information.

**Operable:** Users can operate the interface. Keyboard accessible. Focus indicators visible. No keyboard traps. Touch targets ≥ 44×44px.

**Understandable:** Users can understand content and UI. Language declared on `<html>`. Error messages are clear. Form fields are labeled.

**Robust:** Content is compatible with assistive technologies. Use semantic HTML. Don't override native browser behaviors without replacements.

### The Most Common Accessibility Mistakes

**1. Missing alt text on images**
```html
<!-- BAD: no alt text -->
<img src="b-tree.png">

<!-- BAD: meaningless alt text -->
<img src="b-tree.png" alt="image">

<!-- GOOD: describes what the image shows -->
<img src="b-tree.png" alt="B-tree diagram showing balanced node structure with 3 levels">

<!-- GOOD: decorative image (ignored by screen readers) -->
<img src="decorative-divider.png" alt="">
```

**2. Non-semantic buttons**
```html
<!-- BAD: div as button — not keyboard focusable, not announced as button -->
<div onclick="submit()">Submit</div>

<!-- GOOD: uses button element -->
<button type="submit">Submit</button>

<!-- GOOD: if must be a div, add ARIA -->
<div role="button" tabindex="0" onkeydown="handleKey(event)" onclick="submit()">Submit</div>
```

**3. No form labels**
```html
<!-- BAD: placeholder is not a label (disappears when typing) -->
<input type="email" placeholder="Email">

<!-- GOOD: visible label associated with input -->
<label for="email">Email</label>
<input type="email" id="email" placeholder="you@example.com">

<!-- GOOD: visually hidden label (screen reader only) -->
<label for="search" class="sr-only">Search</label>
<input type="search" id="search" placeholder="Search courses...">
```

**4. Color contrast**
Text must have sufficient contrast against its background:
- Normal text: 4.5:1 ratio (WCAG AA)
- Large text (≥18pt or 14pt bold): 3:1 ratio

Gray text on white (`#9CA3AF` on `#FFFFFF`) fails at 2.85:1. Use `#6B7280` (3.98:1) or darker.
Tools: Chrome DevTools accessibility tree, WebAIM Contrast Checker.

### ARIA Attributes (When Semantic HTML Isn't Enough)

```html
<!-- Loading state -->
<button aria-disabled="true" aria-busy="true">
  <span aria-hidden="true">Spinner</span>
  Saving...
</button>

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm deletion</h2>
  ...
</div>

<!-- Live region — announces updates to screen readers without focus -->
<div aria-live="polite" aria-atomic="true">
  {uploadStatus}  <!-- screen reader announces when this changes -->
</div>

<!-- Icon button with no visible text -->
<button aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>
```

**The ARIA rule:** Never use ARIA to fix broken semantics. Fix the HTML first. ARIA is for patterns that have no HTML equivalent (live regions, complex widgets like tabs or comboboxes).

### Keyboard Navigation

Every interactive element must be keyboard accessible:
- `<a>`, `<button>`, `<input>`, `<select>`, `<textarea>` are focusable by default
- Focus order follows DOM order — arrange HTML logically
- Skip links: `<a href="#main" class="sr-only focus:not-sr-only">Skip to main content</a>` — lets keyboard users jump past navigation

```css
/* Never remove focus ring completely */
/* BAD: */
:focus { outline: none; }

/* GOOD: style it but keep it */
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

---

## Phase 1 Check

**Feynman checks:**

1. What is the difference between `<div>` and `<article>`? When would you use each?

2. Without looking: what does `flex-direction`, `justify-content`, and `align-items` each control? Which axis does each work on?

3. Write the Tailwind classes for a card that is: white background (dark mode: dark gray), rounded corners, medium shadow, 24px padding, and changes to a darker shadow on hover.

4. Why is `box-sizing: border-box` the first thing you add to every project?

5. A designer gives you a button with no visible focus state. They say "the outline looks ugly." What do you say back?

**Real System Connection:** GitHub's entire UI is built with their Primer Design System, which uses semantic HTML + accessible components. When GitHub's navigation was audited for accessibility in 2022, fixing it required rethinking component structure from the ground up — not just adding ARIA attributes. The lesson: semantic HTML from the start costs nothing. Retrofitting accessibility into div soup costs weeks.
