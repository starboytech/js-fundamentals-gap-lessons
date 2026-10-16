# Full Stack — Phase 4: React
## The UI layer. Powers modern web app frontends.

---

## Phase-Opening Misconception

"React is a framework."

React is a library — specifically, a UI library for building component-based interfaces. It solves one problem: declaratively rendering data as HTML and efficiently updating the DOM when data changes. It doesn't handle routing (React Router does that), state management beyond components (Zustand or Context API), or data fetching patterns (React Query does that). You compose these pieces. That's why React has such a large ecosystem.

---

## Lesson 4.1: Why React

### The Problem React Solves

**Before React:** Updating the UI meant directly mutating the DOM. When state changed, you'd manually find the element and update it:

```javascript
// Imperative DOM manipulation
const count = 0;
const display = document.querySelector("#count");

function increment() {
  count++;
  display.textContent = count;          // manually update the DOM
  if (count > 10) button.disabled = true;  // manually update state-dependent UI
  if (count > 5) style.color = "red";   // manually update style
  // ... manage every piece of UI that depends on count
}
```

This becomes unmaintainable when multiple pieces of UI depend on the same data.

**With React:** Describe what the UI should look like for any state. React handles the DOM updates:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <span style={{ color: count > 5 ? "red" : "black" }}>{count}</span>
      <button onClick={() => setCount(c => c + 1)} disabled={count > 10}>
        Increment
      </button>
    </div>
  );
}
```

State changes trigger re-renders. React diffs the new virtual DOM against the previous one and updates only what changed in the real DOM. You describe the UI, React handles the HOW.

### The Virtual DOM

React maintains a virtual DOM — a JavaScript representation of the real DOM. When state changes:
1. React builds a new virtual DOM tree
2. React diffs it against the previous virtual DOM (reconciliation)
3. React applies only the minimal changes to the real DOM

**Why this matters:** Real DOM manipulation is expensive (reflow, repaint). Virtual DOM manipulation is just JavaScript objects. Batch the changes, apply them once.

### React's Rendering Model

```
State/Props Change → Re-render (function called again) → New JSX → Diff → DOM updates
```

React components are functions. When state changes, React calls the function again. The function returns new JSX. React compares new JSX to previous and updates the DOM.

---

## Lesson 4.2: JSX

### What JSX Is

JSX looks like HTML in JavaScript. It's not — it's syntactic sugar that compiles to `React.createElement()` calls.

```jsx
// JSX — what you write:
const element = <h1 className="title">Hello, {name}!</h1>;

// What it compiles to:
const element = React.createElement("h1", { className: "title" }, `Hello, ${name}!`);
```

Differences from HTML:
- `className` not `class` (class is a reserved word in JavaScript)
- `htmlFor` not `for` (for is reserved)
- Self-closing tags required: `<img />`, `<input />`
- Expressions in `{}`: `{user.name}`, `{count + 1}`, `{isLoggedIn && <Dashboard />}`
- Event names are camelCase: `onClick`, `onChange`, `onSubmit`

### Conditional Rendering

```jsx
// && short-circuit (render if truthy)
{isLoggedIn && <Dashboard />}
{courses.length > 0 && <CourseList courses={courses} />}

// Ternary (render one of two)
{isLoading ? <Spinner /> : <Content />}

// Null to render nothing
{error ? <ErrorMessage error={error} /> : null}

// Variables for complex conditions
let content;
if (loading) content = <Spinner />;
else if (error) content = <Error message={error} />;
else content = <CourseList courses={courses} />;

return <div>{content}</div>;
```

### Fragments

```jsx
// Can't return adjacent elements without a wrapper
// ERROR:
return <h1>Title</h1><p>Description</p>;

// Use Fragment (doesn't add a DOM element)
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);

// Or explicit React.Fragment (when you need a key)
return (
  <React.Fragment>
    <h1>Title</h1>
    <p>Description</p>
  </React.Fragment>
);
```

---

## Lesson 4.3: Components and Props

### Functional Components

```jsx
// Component — a function that returns JSX
function CourseCard({ course, onSelect }) {
  return (
    <div className="course-card" onClick={() => onSelect(course.id)}>
      <h3>{course.name}</h3>
      <p>{course.description}</p>
    </div>
  );
}

// Usage:
<CourseCard course={myCourse} onSelect={handleCourseSelect} />
```

### Props

Props flow **one direction**: parent → child. A child cannot directly modify parent props.

```jsx
// All value types can be passed as props:
<Component
  name="Jasmine"           // string
  count={42}              // number (must use {})
  isActive={true}         // boolean (must use {} — not "true")
  course={courseObject}   // object
  tags={["react", "js"]}  // array
  onSelect={handleSelect} // function
  style={{ color: "red" }} // object (double braces: outer={} is JSX, inner{} is object)
/>

// Boolean shorthand
<Button disabled />     // same as disabled={true}
<Button disabled={false} />  // must use {} to pass false
```

### The children Prop

```jsx
// children is whatever is between the opening and closing tags
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage
<Card title="Course Details">
  <p>This course covers React fundamentals.</p>
  <Button>Enroll</Button>
</Card>
```

---

## Lesson 4.4: State with useState

### useState Basics

```jsx
import { useState } from "react";

function Counter() {
  // useState returns [currentValue, setterFunction]
  const [count, setCount] = useState(0);  // 0 is the initial state

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### State Update Rules

```jsx
// React batches state updates — don't read state immediately after setting
setCount(count + 1);
setCount(count + 1);  // WRONG — both use the same count, total +1 not +2

// Use updater function when new state depends on previous:
setCount(prev => prev + 1);
setCount(prev => prev + 1);  // CORRECT — total +2

// Object state — must create new object
const [user, setUser] = useState({ name: "Jasmine", age: 25 });

// WRONG — mutates state
user.name = "Ali";
setUser(user);  // React won't re-render (same reference)

// CORRECT — creates new object
setUser({ ...user, name: "Ali" });

// Array state — must create new array
const [courses, setCourses] = useState([]);

// WRONG
courses.push(newCourse);

// CORRECT
setCourses([...courses, newCourse]);            // add
setCourses(courses.filter(c => c.id !== id));   // remove
setCourses(courses.map(c => c.id === id ? updated : c)); // update
```

### Multiple State Variables

```jsx
// Each piece of independent state gets its own useState
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      {error && <p className="error">{error}</p>}
      <button disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
    </form>
  );
}
```

---

## Lesson 4.5: Lists and Keys

```jsx
function CourseList({ courses }) {
  return (
    <ul>
      {courses.map(course => (
        <li key={course.id}>  {/* key is required — must be unique and stable */}
          <CourseCard course={course} />
        </li>
      ))}
    </ul>
  );
}
```

**The `key` prop:**
- Required for lists — tells React which items changed/added/removed
- Must be unique among siblings
- Must be stable — don't use array index if the list can be reordered or filtered
- Use the item's database ID (always stable and unique)
- Keys are NOT passed to the component — they're internal to React's reconciler

```jsx
// WRONG — index as key breaks on reorder/filter
{courses.map((course, index) => <CourseCard key={index} course={course} />)}

// CORRECT — stable unique ID
{courses.map(course => <CourseCard key={course.id} course={course} />)}
```

---

## Lessons 4.6–4.7: Events and Forms

```jsx
// Controlled inputs — React controls the value
function SearchForm() {
  const [query, setQuery] = useState("");

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}                          // React controls the displayed value
        onChange={e => setQuery(e.target.value)}  // update state on every keystroke
        placeholder="Search courses..."
      />
    </form>
  );
}
// The input's displayed value is always exactly what's in state.
// This is the "controlled input" pattern — required for validation, formatting.
```

---

## Lesson 4.8: useEffect

### What useEffect Does

`useEffect` runs **after render**. It's for side effects: data fetching, subscriptions, DOM manipulation, timers.

```jsx
useEffect(() => {
  // runs after every render
});

useEffect(() => {
  // runs once on mount (empty dependency array)
}, []);

useEffect(() => {
  // runs when courseId changes (and on mount)
}, [courseId]);

useEffect(() => {
  const subscription = subscribe(channel);
  return () => subscription.unsubscribe();  // cleanup on unmount or before next effect
}, [channel]);
```

### The Dependency Array

The dependency array tells React when to re-run the effect. It should contain every reactive value the effect uses.

```jsx
// WRONG: missing dependency causes stale closure
useEffect(() => {
  fetchData(userId);   // uses userId but not in deps — uses stale userId
}, []);

// CORRECT: include all dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

---

## Lessons 4.9–4.10: Data Fetching and Routing

### Fetch in useEffect

```jsx
function CourseDetail({ courseId }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;  // prevent state update on unmounted component

    async function loadCourse() {
      try {
        setLoading(true);
        const data = await fetchCourse(courseId);
        if (!cancelled) setCourse(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCourse();
    return () => { cancelled = true; };  // cleanup prevents state updates after unmount
  }, [courseId]);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <div>{course.name}</div>;
}
```

### React Router v6

```jsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function CourseDetail() {
  const { courseId } = useParams();       // from :courseId in the route
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={() => navigate("/courses")}>Back</button>
      <CourseDetailContent id={courseId} />
    </div>
  );
}
```

---

## Lessons 4.11–4.12: Context and Custom Hooks

### Context — Avoiding Prop Drilling

```jsx
// Without context: pass user down through every level
<App user={user}>
  <Dashboard user={user}>
    <Sidebar user={user}>
      <UserMenu user={user} />  {/* finally used here */}
```

```jsx
// With context: provide once, consume anywhere
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function UserMenu() {
  const { user } = useContext(AuthContext);  // no prop drilling
  return <div>Hello, {user.name}</div>;
}
```

### Custom Hooks

```jsx
// Extract reusable logic into a custom hook (must start with "use")
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    async function load() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Usage — reuse the same logic anywhere
function CourseDetail({ id }) {
  const { data: course, loading, error } = useFetch(`/api/courses/${id}`);
  // ...
}
```

---

## Lesson 4.13: Zustand

### Why Not Redux

Redux requires: action constants, action creators, reducers, selectors, middleware (for async), and a store configuration file. For most apps, this is 5x more code than the problem requires. Zustand is a minimal alternative (8 dependencies, zero boilerplate).

```jsx
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  updateProfile: (updates) => set(state => ({
    user: { ...state.user, ...updates }
  })),
}));

// Using the store — only re-renders when selected state changes
function UserMenu() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  
  return (
    <div>
      <span>{user?.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## Lessons 4.14–4.15: TypeScript and Tailwind in React

### Typed React Components

```tsx
interface CourseCardProps {
  course: Course;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, isSelected = false }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onSelect(course.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(course.id)}
      onKeyDown={handleKeyDown}
      className={`course-card ${isSelected ? "selected" : ""}`}
    >
      <h3>{course.name}</h3>
    </div>
  );
};
```

### Typed useState and Event Handlers

```tsx
const [course, setCourse] = useState<Course | null>(null);
const [courses, setCourses] = useState<Course[]>([]);

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setEmail(event.target.value);
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};
```

---

## Lesson 4.16: Performance

### useMemo and useCallback

```jsx
// useMemo: cache an expensive computation
const filteredCourses = useMemo(
  () => courses.filter(c => c.name.includes(searchQuery)),
  [courses, searchQuery]  // only recompute when these change
);

// useCallback: cache a function reference (for passing to children)
const handleSelect = useCallback(
  (id) => {
    setSelectedId(id);
    onSelect(id);  // outer function from props
  },
  [onSelect]  // only recreate if onSelect changes
);

// React.memo: skip re-rendering a component if props haven't changed
const CourseCard = React.memo(function CourseCard({ course, onSelect }) {
  return <div onClick={() => onSelect(course.id)}>{course.name}</div>;
});
// CourseCard only re-renders if course or onSelect changes
// Useful when the parent re-renders frequently but the component's props are stable
```

### Code Splitting and Lazy Loading

```jsx
import { lazy, Suspense } from "react";

// Load the component only when it's first rendered
const CourseDashboard = lazy(() => import("./CourseDashboard"));
const ExamView = lazy(() => import("./ExamView"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<CourseDashboard />} />
        <Route path="/exam" element={<ExamView />} />
      </Routes>
    </Suspense>
  );
}
```

---

## Lesson 4.17: Accessibility in React

```jsx
// ARIA live regions for dynamic content
function NotificationBanner({ message }) {
  return (
    <div role="alert" aria-live="polite">
      {message}
    </div>
  );
}

// Focus management for modals
function Modal({ isOpen, onClose, children }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();  // focus close button when modal opens
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeButtonRef} onClick={onClose} aria-label="Close dialog">×</button>
      {children}
    </div>
  );
}
```

---

## Lesson 4.18: Testing in React — Vitest + RTL

### Why Vitest (Not Jest) for React/Vite Projects

Vitest is the 2025 standard for React testing:
- Native ESM (Jest needed additional Babel transforms)
- 4-10x faster than Jest (leverages Vite's module graph)
- Zero config with TypeScript
- Compatible with Jest's API (same `describe`/`it`/`expect`)

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});

// src/test/setup.ts
import "@testing-library/jest-dom";
```

### React Testing Library Philosophy

Test what the USER sees — not component internals.

```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseList from "./CourseList";

describe("CourseList", () => {
  const mockCourses = [
    { id: "1", name: "System Design", active: true },
    { id: "2", name: "React Fundamentals", active: false },
  ];

  test("displays all course names", () => {
    render(<CourseList courses={mockCourses} onSelect={vi.fn()} />);
    
    expect(screen.getByText("System Design")).toBeInTheDocument();
    expect(screen.getByText("React Fundamentals")).toBeInTheDocument();
  });

  test("calls onSelect with course id when clicked", async () => {
    const onSelect = vi.fn();
    render(<CourseList courses={mockCourses} onSelect={onSelect} />);
    
    await userEvent.click(screen.getByText("System Design"));
    
    expect(onSelect).toHaveBeenCalledWith("1");
  });

  test("shows empty state when no courses", () => {
    render(<CourseList courses={[]} onSelect={vi.fn()} />);
    expect(screen.getByText(/no courses yet/i)).toBeInTheDocument();
  });
});
```

### MSW (Mock Service Worker)

MSW intercepts real fetch calls in tests — no manual mock needed.

```typescript
// src/test/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/courses", () => {
    return HttpResponse.json([
      { id: "1", name: "System Design" },
    ]);
  }),

  http.post("/api/courses", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: "new_id", ...body }, { status: 201 });
  }),
];

// src/test/setup.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## Phase 4 Milestone: Exam UI Shell

Build the timed exam interface using mock data. Requirements:
- Question display with options (multiple choice)
- 15-second timer per question using `useEffect` + `setInterval`
- Score tracking state
- Results page with correct/incorrect breakdown
- Progress bar (current question / total)
- React Router for exam → results transition
- All props typed with TypeScript
- Vitest + RTL tests for timer behavior and score calculation

---

## Phase 4 Check

**Feynman checks:**

1. What is the virtual DOM and why does React use it?

2. Why do you need the `key` prop on list items? Why is using the array index as a key often wrong?

3. What does `useEffect(() => { ... }, [userId])` do? When does the effect run?

4. What is the difference between `useMemo` and `useCallback`? Give a real example of when you'd use each.

5. What is a controlled input in React? What makes it "controlled"?

**Real System Connection:** Vercel's dashboard (vercel.com/dashboard) is a React + Next.js application. When they redesigned the deployment experience in 2024, they used React's component model to ship the same "deployment card" component across 6 different views with different data. The Zustand store powers the real-time deployment status updates — when a deployment finishes, one store update re-renders every component on the page that displays deployment status.
