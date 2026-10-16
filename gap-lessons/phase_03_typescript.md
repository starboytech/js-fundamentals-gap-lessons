# Full Stack — Phase 3: TypeScript
## Add types to everything you've learned. Catches bugs before runtime.

---

## Phase-Opening Misconception

"TypeScript is just JavaScript with extra syntax."

TypeScript is a **type system** for JavaScript. The extra syntax IS the point: it describes the shape of your data and catches entire categories of bugs at compile time that JavaScript only catches in production. TypeScript has been the fastest-growing language in Stack Overflow surveys two years running. It's required at most companies that write JavaScript.

---

## Lesson 3.1: Why TypeScript Exists

### The Problem TypeScript Solves

```javascript
// JavaScript — this runs fine, crashes in production
function displayUserName(user) {
  return user.name.toUpperCase();
}

displayUserName(null);    // Uncaught TypeError: Cannot read properties of null
displayUserName({ age: 25 }); // Uncaught TypeError: user.name is undefined
displayUserName("alice"); // Returns "ALICE" — but is this what you want?
```

JavaScript can't tell you this is wrong until it runs. In a large codebase, this becomes:
- You change `user.name` to `user.fullName` in one file
- 23 other files still use `user.name`
- The editor doesn't tell you — they all compile fine
- You find out from error monitoring at 2am

```typescript
// TypeScript — these bugs are caught immediately, before any code runs
interface User {
  fullName: string;
  age: number;
}

function displayUserName(user: User): string {
  return user.fullName.toUpperCase();
}

displayUserName(null);           // Error: Argument of type 'null' is not assignable
displayUserName({ age: 25 });    // Error: Property 'fullName' is missing
displayUserName("alice");        // Error: Argument of type 'string' is not assignable to type 'User'
```

TypeScript is a compiler: it reads your code, checks the types, and either passes (compiles to JavaScript) or shows you every bug.

### TypeScript in the Workflow

```bash
# Install TypeScript
npm install -D typescript

# Compile a file
npx tsc file.ts → file.js

# Type-check without building (in CI)
npx tsc --noEmit

# Watch mode — recompile on every save
npx tsc --watch
```

VS Code uses the TypeScript language server automatically — red squiggles as you type, not just when you compile.

---

## Lesson 3.2: Basic Types

### Primitive Types

```typescript
// Explicit type annotation
let name: string = "Jasmine";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// TypeScript can infer types — annotation often not needed
let name = "Jasmine";       // inferred as string
let age = 25;               // inferred as number
let isActive = true;        // inferred as boolean
```

**Inference rule:** If you initialize a variable with a value, TypeScript infers the type. Only annotate when you're declaring without initializing, or when you want to be explicit.

### Arrays

```typescript
let names: string[] = ["Alice", "Bob", "Charlie"];
let scores: number[] = [95, 87, 72];
let flags: boolean[] = [true, false, true];

// Alternative syntax (less common)
let names: Array<string> = ["Alice", "Bob"];

// Array of objects
let users: { id: number; name: string }[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
```

### Tuple

A tuple is an array with a **fixed length** and **specific type at each position**.

```typescript
// [string, number] — exactly 2 elements, string first, number second
let entry: [string, number] = ["Alice", 95];

entry[0];  // TypeScript knows this is string
entry[1];  // TypeScript knows this is number
entry[2];  // Error: Tuple type '[string, number]' of length '2'

// Common use: React's useState returns a tuple
const [count, setCount] = useState<number>(0);  // [number, Dispatch<SetStateAction<number>>]
```

### Enum

```typescript
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Suspended = "SUSPENDED",
}

let userStatus: Status = Status.Active;

// You can use string literals instead (simpler, often preferred)
type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
let status: UserStatus = "ACTIVE";
status = "DELETED"; // Error: not a valid UserStatus
```

### `any` and `unknown`

```typescript
// any: opts out of type checking — dangerous
let anything: any = 42;
anything.foo.bar;    // No error, but crashes at runtime
anything();          // No error, crashes at runtime

// unknown: must type-check before using — safe version of any
let value: unknown = "hello";
value.toUpperCase();                        // Error: Object is of type 'unknown'
if (typeof value === "string") {
  value.toUpperCase();                      // OK — TypeScript knows it's string here
}
```

**Rule:** Never use `any`. Use `unknown` when you genuinely don't know the type, and narrow it before use. `any` disables TypeScript — defeats the purpose.

---

## Lesson 3.3: Interfaces and Type Aliases

### Interface

An interface defines the shape of an object — what properties it has and what types they are.

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "admin";
  createdAt: Date;
  avatarUrl?: string;   // ? = optional
  readonly apiKey: string;  // readonly = can't be changed after creation
}

// Using the interface
const user: User = {
  id: "user_123",
  email: "you@example.com",
  name: "Jasmine Lee",
  role: "student",
  createdAt: new Date(),
  apiKey: "sk_live_abc123",
};

user.apiKey = "different";  // Error: Cannot assign to 'apiKey' because it is read-only
```

### Interface Extension

```typescript
interface Animal {
  name: string;
  sound(): string;
}

interface Dog extends Animal {
  breed: string;
  fetch(): void;
}

const dog: Dog = {
  name: "Buddy",
  breed: "Labrador",
  sound: () => "Woof",
  fetch: () => console.log("Fetching!"),
};
```

### Type Alias

```typescript
// Type alias — can do everything interface does, plus more
type Point = { x: number; y: number };
type ID = string | number;           // Union type — interface can't do this
type Callback = (value: string) => void;  // Function type

// Intersection — combining types
type AdminUser = User & { permissions: string[] };
```

### Interface vs Type Alias — When to Use Which

| Use | When |
|-----|------|
| `interface` | Defining object shapes, especially when you'll extend them |
| `type` | Union types, intersection types, function types, primitives |
| Either | For plain object shapes — both work |

**Convention in React projects:** Use `interface` for component props and object shapes. Use `type` for unions, utilities, and complex types. This is what you'll see in the Next.js and React TypeScript codebases.

### StudyApp Types

```typescript
// Core domain types for StudyApp
interface Course {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: Date;
  status: "active" | "archived";
}

interface Material {
  id: string;
  courseId: string;
  filename: string;
  fileType: "pdf" | "docx" | "pptx" | "txt" | "md";
  status: "pending" | "processing" | "ready" | "failed";
  chunkCount: number;
  uploadedAt: Date;
}

interface WeakSpot {
  id: string;
  userId: string;
  concept: string;
  courseId: string;
  confidence: "low" | "medium" | "high";
  lastDrilledAt: Date | null;
  resolvedAt: Date | null;
}
```

---

## Lesson 3.4: Functions in TypeScript

### Typed Function Parameters and Return Types

```typescript
// Type every parameter; TypeScript can often infer return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function with type annotation
const multiply = (a: number, b: number): number => a * b;

// Optional parameter (must come after required)
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

// Default parameter (also optional, TypeScript infers type from default)
function createSlug(title: string, separator = "-"): string {
  return title.toLowerCase().replace(/\s+/g, separator);
}
```

### void and never

```typescript
// void: function returns nothing (no return value, or return undefined)
function log(message: string): void {
  console.log(message);
}

// never: function never returns (throws or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}
```

### Function Types

```typescript
// Defining the shape of a function
type EventHandler = (event: MouseEvent) => void;
type Formatter = (value: string) => string;
type AsyncFetch = (url: string) => Promise<Response>;

// Using function types
const onClick: EventHandler = (event) => {
  console.log(event.target);
};

interface Button {
  label: string;
  onClick: EventHandler;  // function type in interface
}
```

### Generic Functions (Preview — Covered in Lesson 3.5)

```typescript
// Without generics — you'd need a separate function for each type:
function firstNumber(arr: number[]): number { return arr[0]; }
function firstString(arr: string[]): string { return arr[0]; }

// With generics — one function works for any type:
function first<T>(arr: T[]): T {
  return arr[0];
}

first([1, 2, 3]);         // returns number, TypeScript knows this
first(["a", "b", "c"]);   // returns string, TypeScript knows this
first([true, false]);     // returns boolean
```

---

## Lesson 3.5: Generics

### What Generics Are

A generic is a **type placeholder**. You define the function/interface/class with a placeholder `T`, and the actual type is filled in at the call site.

```typescript
// Without generics: must pick one type
function identity(value: string): string {
  return value;
}

// With generics: works for any type, preserves type information
function identity<T>(value: T): T {
  return value;
}

identity("hello");   // T is string  → returns string
identity(42);        // T is number  → returns number
identity(true);      // T is boolean → returns boolean
identity({ id: 1 }); // T is { id: number } → returns { id: number }
```

### Generic Interfaces

```typescript
// API response wrapper — same structure for any data type
interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

// Using it:
type UserResponse = ApiResponse<User>;
// → { data: User, error: string | null, status: number }

type CourseListResponse = ApiResponse<Course[]>;
// → { data: Course[], error: string | null, status: number }

// This is how fetch wrapper functions work:
async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const data = await response.json();
  return { data: data as T, error: null, status: response.status };
}

const result = await fetchApi<User>("/api/users/me");
// TypeScript knows result.data is type User
```

### Generic Constraints

Generics can be constrained — require the type to have certain properties.

```typescript
// T must have an id property of type string
function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

getById(courses, "course_123");    // OK — Course has id: string
getById(materials, "mat_456");     // OK — Material has id: string
getById([1, 2, 3], "foo");         // Error: number doesn't have id property

// Practical: a generic state update function
function updateItem<T extends { id: string }>(items: T[], updated: T): T[] {
  return items.map(item => item.id === updated.id ? updated : item);
}
```

### Common Built-in Generic Utilities

```typescript
// Partial<T> — all properties optional
type PartialUser = Partial<User>;
// → { id?: string; email?: string; name?: string; ... }

// Required<T> — all properties required (removes ?)
type RequiredUser = Required<User>;

// Pick<T, K> — select specific properties
type LoginCredentials = Pick<User, "email" | "role">;
// → { email: string; role: "student" | "admin" }

// Omit<T, K> — exclude specific properties
type UserWithoutKey = Omit<User, "apiKey">;
// → all User properties except apiKey

// Record<K, V> — dictionary with K keys and V values
type CourseById = Record<string, Course>;
// → { [id: string]: Course }

// Readonly<T> — all properties readonly
type ImmutableUser = Readonly<User>;
```

---

## Lesson 3.6: TypeScript with the DOM

### HTML Element Types

```typescript
// Selecting DOM elements
const button = document.querySelector<HTMLButtonElement>("#submit");
const input = document.querySelector<HTMLInputElement>("#email");
const container = document.querySelector<HTMLDivElement>("#app");

// TypeScript knows the element type:
button.click();      // OK — HTMLButtonElement has click()
button.value;        // Error — HTMLButtonElement doesn't have value
input.value;         // OK — HTMLInputElement has value
```

### Event Types

```typescript
// Click events
button.addEventListener("click", (event: MouseEvent) => {
  event.preventDefault();
  event.target;       // EventTarget
  event.currentTarget; // EventTarget
});

// Input events
input.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log(target.value);  // cast needed — event.target is EventTarget
});

// Form submission
const form = document.querySelector<HTMLFormElement>("#login-form");
form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const email = formData.get("email") as string;
});
```

### TypeScript with React (Preview)

In React, TypeScript types props, state, and events:

```typescript
interface CourseCardProps {
  course: Course;
  onSelect: (courseId: string) => void;
  isSelected?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, isSelected = false }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onSelect(course.id);
  };

  return (
    <div onClick={handleClick} className={isSelected ? "selected" : ""}>
      <h3>{course.name}</h3>
    </div>
  );
};
```

### tsconfig.json — The Important Options

```json
{
  "compilerOptions": {
    "target": "ES2022",           // output JS version
    "module": "ESNext",           // module system
    "lib": ["ES2022", "DOM"],     // type definitions to include
    "strict": true,               // enables all strict type checks (always use this)
    "noUncheckedIndexedAccess": true,  // array[i] returns T | undefined (safe)
    "exactOptionalPropertyTypes": true, // { a?: string } ≠ { a: string | undefined }
    "noImplicitAny": true,        // error on any implicit any (included in strict)
    "strictNullChecks": true,     // null and undefined are not assignable (included in strict)
    "skipLibCheck": true,         // skip type-checking of .d.ts files (faster build)
    "paths": {
      "@/*": ["./src/*"]          // import alias
    }
  }
}
```

**Always use `"strict": true`.** It enables `noImplicitAny`, `strictNullChecks`, and several others. Code that passes strict mode is code where TypeScript is actually doing its job.

---

## Phase 3 Project: Rewrite the Weather App in TypeScript

Take the Phase 2 weather app (Fetch API + async/await) and add TypeScript:

1. Create `tsconfig.json` with strict mode
2. Type the API response from OpenWeatherMap (define an interface for the JSON shape)
3. Type the DOM element selections
4. Type all function parameters and return values
5. Run `npx tsc --noEmit` — zero errors before done

**Key addition:** Add error handling with typed errors:
```typescript
interface WeatherError {
  code: string;
  message: string;
}

function isWeatherError(error: unknown): error is WeatherError {
  return typeof error === "object" && error !== null && "code" in error;
}

try {
  const weather = await fetchWeather("London");
} catch (error) {
  if (isWeatherError(error)) {
    displayError(error.message);  // TypeScript knows error.message exists
  } else {
    displayError("Unknown error occurred");
  }
}
```

---

## Phase 3 Check

**Feynman checks:**

1. What is the difference between `any` and `unknown`? Why should you never use `any`?

2. Write a generic function `filterBy<T>` that takes an array of T and a predicate function `(item: T) => boolean` and returns a filtered T[]. What constraint (if any) do you need on T?

3. What does `Partial<User>` produce? When would you use it?

4. Your function expects `HTMLInputElement` but `querySelector` returns `Element | null`. How do you handle this correctly in TypeScript?

5. What is `"strict": true` in tsconfig.json and why is it non-negotiable?

**Real System Connection:** Vercel's codebase (Next.js, the Vercel CLI, Vercel's dashboard) is written entirely in TypeScript with strict mode. When they refactored Next.js from Pages Router to App Router, TypeScript's type system caught hundreds of breaking changes at compile time across thousands of files — finding them at compile time, not from user bug reports.
