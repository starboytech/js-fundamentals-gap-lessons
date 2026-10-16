# Full Stack — Phase 2: JavaScript Core
## THE most important phase. Everything else depends on this.

---

## Phase-Opening Misconception

"JavaScript is easy — it's just web scripting."

JavaScript is one of the most consistently misunderstood languages. It has unusual behavior around `this`, coercion, and scope that has caught every engineer who has ever written it. The async model breaks the assumption that code runs top-to-bottom. The good news: once you understand these things mechanically, they stop being magic and start being tools.

**JavaScript Warning from the curriculum:** JavaScript is the hardest phase. Not because syntax is hard — because:
1. `this` behaves differently in different contexts
2. Asynchronous code breaks your mental model of "code runs top to bottom"
3. The DOM is messy
4. Every tutorial does it slightly differently

Plan for Phase 2 to feel slow. It's normal. Once async/await clicks, everything after it is fast.

---

## Lesson 2.1: Variables, Types, Operators

### var, let, const — The Difference That Actually Matters

```javascript
// var — function-scoped, hoisted, avoid in modern code
var x = 10;

// let — block-scoped, can be reassigned
let count = 0;
count = 1;  // OK

// const — block-scoped, cannot be reassigned
const MAX_SIZE = 100;
MAX_SIZE = 200;  // TypeError: Assignment to constant variable

// Misconception: const means immutable
const user = { name: "Jasmine" };
user.name = "Ali";    // OK — object properties CAN change
user = { name: "Ali" }; // Error — you can't reassign the const binding
```

**Rule:** Use `const` by default. Use `let` when you know you'll reassign. Never use `var`.

### JavaScript's 8 Types

```javascript
// Primitive types (immutable values)
typeof "hello"        // "string"
typeof 42             // "number"
typeof true           // "boolean"
typeof undefined      // "undefined"
typeof null           // "object"  ← historical bug in JavaScript, be aware
typeof Symbol("id")   // "symbol"
typeof 9007199254740991n // "bigint"

// Reference type
typeof {}             // "object"
typeof []             // "object"  ← arrays are objects
typeof function(){}   // "function"
```

### Type Coercion — The Source of JavaScript Bugs

JavaScript automatically converts types. This creates surprising results:

```javascript
// Implicit coercion
"5" + 3          // "53" — + prefers string concatenation
"5" - 3          // 2    — - converts both to number
"5" * "3"        // 15   — both convert to number
true + true      // 2    — true coerces to 1
false + 1        // 1    — false coerces to 0
null + 1         // 1    — null coerces to 0
undefined + 1    // NaN  — undefined coerces to NaN

// Equality: == vs ===
5 == "5"         // true  — == coerces before comparing
5 === "5"        // false — === never coerces (type must match)
null == undefined // true — special case in ==
null === undefined // false

// ALWAYS use === and !==. Never == or !=.
```

### NaN — Not a Number, But a Number

```javascript
typeof NaN        // "number" — NaN is a number type, but not a valid number
NaN === NaN       // false — NaN is not equal to itself

// Correct way to check for NaN:
Number.isNaN(NaN)      // true
Number.isNaN("hello")  // false (it's a string, not NaN)
isNaN("hello")         // true — global isNaN() converts first, dangerous

// How NaN appears:
parseInt("hello")   // NaN
0 / 0              // NaN
Math.sqrt(-1)      // NaN
```

### Truthy and Falsy

**Falsy values (coerce to false in boolean context):**
```javascript
false, 0, -0, 0n, "", '', ``, null, undefined, NaN
```

**Everything else is truthy**, including: `"0"`, `"false"`, `[]`, `{}`, `function(){}`.

```javascript
// This is why these patterns work:
if (users.length) { ... }        // falsy if 0, truthy if any items
if (user?.name) { ... }          // falsy if null/undefined, truthy if has name
const name = user.name || "Guest";  // fallback for null/undefined/empty string
```

---

## Lesson 2.1b: Conditionals

**Moved 2026-10-05** to `materials/js_fundamentals.md` §6.1–6.2, rewritten at beginner level, in teaching order, every example node-verified. One copy only — edit it there.

---

## Lesson 2.2: Functions

### Function Declarations vs Expressions

```javascript
// Declaration — hoisted (can call before the function is defined in code)
function greet(name) {
  return `Hello, ${name}!`;
}

// Expression — not hoisted (must define before calling)
const greet = function(name) {
  return `Hello, ${name}!`;
};

// Arrow function — shorter syntax, no own this binding
const greet = (name) => `Hello, ${name}!`;
const square = n => n * n;           // single param: no parens needed
const add = (a, b) => a + b;         // implicit return (single expression)
const log = (msg) => {               // block body: explicit return needed
  console.log(msg);
  return true;
};
```

### Scope and Closures

```javascript
// Scope: where variables are accessible
const global = "I'm global";

function outer() {
  const outerVar = "I'm in outer";

  function inner() {
    const innerVar = "I'm in inner";
    console.log(outerVar);   // accessible — inner can see outer's scope
    console.log(global);     // accessible — global scope
  }

  console.log(innerVar);     // ReferenceError — outer can't see inner's scope
  inner();
}

// Closure: a function that remembers its lexical scope
function makeCounter() {
  let count = 0;             // count is enclosed by the returned function

  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2 — count persists because the function closed over it
counter(); // 3
```

**Closure is used everywhere:** React's `useState` hook returns a setter that closes over the current state. Event handlers close over component data. Module patterns use closures for private state.

### Hoisting

```javascript
// Function declarations: hoisted completely
greet("Jasmine");  // Works! Function is hoisted
function greet(name) { return `Hi ${name}`; }

// var: hoisted but value is undefined
console.log(x);  // undefined (not ReferenceError)
var x = 5;

// let/const: in "temporal dead zone" — ReferenceError if accessed before declaration
console.log(y);  // ReferenceError
let y = 5;
```

---

## Lessons 2.3–2.5: Arrays and Array Methods

### Array Basics

```javascript
const arr = [1, 2, 3, 4, 5];

arr.length       // 5
arr[0]           // 1
arr[arr.length - 1]  // 5 (last element)
arr[-1]          // undefined (JavaScript doesn't support negative indexing)

// Spread operator — creates a new array (important for immutability)
const copy = [...arr];             // [1, 2, 3, 4, 5]
const extended = [...arr, 6, 7];  // [1, 2, 3, 4, 5, 6, 7]
const merged = [...arr1, ...arr2]; // combines two arrays
```

### Mutation vs Non-Mutation (Critical)

**Mutating methods** — modify the original array:
```javascript
arr.push(6);       // adds to end
arr.pop();         // removes from end
arr.shift();       // removes from beginning
arr.unshift(0);    // adds to beginning
arr.splice(1, 2);  // removes 2 elements starting at index 1
arr.sort();        // sorts in place (default: lexicographic)
arr.reverse();     // reverses in place
```

**Non-mutating methods** — return a new array, original unchanged:
```javascript
arr.concat([6, 7])         // returns new combined array
arr.slice(1, 3)            // returns new array with elements 1 to 2
arr.filter(x => x > 2)    // returns new array with matching elements
arr.map(x => x * 2)       // returns new array with transformed elements
arr.flat()                 // returns new array with nested arrays flattened
```

**Why this matters:** In React, you must NOT mutate state arrays directly — it breaks React's change detection. Always return a new array:
```javascript
// WRONG in React state:
state.items.push(newItem);

// CORRECT in React state:
setState([...state.items, newItem]);
setState(state.items.filter(item => item.id !== removedId));
setState(state.items.map(item => item.id === id ? updated : item));
```

### The Essential Array Methods

```javascript
const courses = [
  { id: "1", name: "System Design", active: true },
  { id: "2", name: "JavaScript", active: false },
  { id: "3", name: "React", active: true },
];

// map — transform each element, returns new array of same length
const names = courses.map(course => course.name);
// ["System Design", "JavaScript", "React"]

// filter — keep elements that pass the test
const activeCourses = courses.filter(course => course.active);
// [{ id: "1", ... }, { id: "3", ... }]

// find — first element that passes the test (or undefined)
const sysdesign = courses.find(course => course.name === "System Design");
// { id: "1", name: "System Design", active: true }

// some — true if ANY element passes
const hasActive = courses.some(course => course.active);   // true

// every — true if ALL elements pass
const allActive = courses.every(course => course.active);  // false

// reduce — accumulate to a single value
const total = [10, 20, 30].reduce((acc, val) => acc + val, 0);  // 60

// forEach — iterate (returns undefined — use when you don't need the result)
courses.forEach(course => console.log(course.name));

// flat + flatMap — for nested arrays
const nested = [[1, 2], [3, 4]];
nested.flat();          // [1, 2, 3, 4]
nested.flatMap(arr => arr.map(n => n * 2));  // [2, 4, 6, 8]
```

---

## Lesson 2.5a: Loops

**Moved 2026-10-05** to `materials/js_fundamentals.md` §7.1, rewritten at beginner level, in teaching order, every example node-verified. One copy only — edit it there.

---

## Lesson 2.5b: Callbacks and Higher-Order Functions

**Moved 2026-10-05** to `materials/js_fundamentals.md` §10.2 (functions as values) and §11.1 (callbacks, array iterator methods), rewritten at beginner level, in teaching order, every example node-verified. One copy only — edit it there.

---

## Lesson 2.6: Objects

```javascript
// Object literal
const user = {
  id: "user_123",
  name: "Jasmine",
  age: 25,
};

// Property access
user.name         // "Jasmine" — dot notation
user["name"]      // "Jasmine" — bracket notation (needed for dynamic keys)
user.missing      // undefined — no error (unlike accessing property of undefined)

// Shorthand property (when variable name matches key)
const name = "Jasmine";
const age = 25;
const user = { name, age };  // same as { name: name, age: age }

// Computed property names
const key = "email";
const obj = { [key]: "test@example.com" };  // { email: "test@example.com" }
```

### Object Destructuring

```javascript
const user = { id: "1", name: "Jasmine", role: "admin" };

// Basic destructuring
const { id, name } = user;
console.log(id);    // "1"
console.log(name);  // "Jasmine"

// With rename
const { name: userName } = user;
console.log(userName);  // "Jasmine"

// With default value
const { avatar = "/default.png" } = user;
console.log(avatar);  // "/default.png" (user has no avatar property)

// In function parameters (very common in React)
function UserCard({ id, name, role = "student" }) {
  return `${name} (${role})`;
}
```

### Object Spread

```javascript
// Non-destructive update (returns new object)
const updated = { ...user, name: "Ali" };
// { id: "1", name: "Ali", role: "admin" }
// original user is unchanged

// Merging objects
const merged = { ...defaults, ...userPreferences };
// userPreferences keys override defaults
```

---

## Lesson 2.7: DOM Manipulation

### Selecting Elements

```javascript
// querySelector — returns first match (or null)
const button = document.querySelector("#submit");        // by ID
const card = document.querySelector(".course-card");     // by class
const input = document.querySelector("input[type=email]"); // by attribute

// querySelectorAll — returns NodeList of all matches
const cards = document.querySelectorAll(".course-card");  // NodeList
const cardsArray = Array.from(cards);  // convert to Array to use .map()

// getElementById — faster but by ID only
const title = document.getElementById("page-title");
```

### Creating and Inserting Elements

```javascript
// Create
const card = document.createElement("div");
card.className = "course-card";
card.textContent = "System Design";   // safe — no XSS

// NEVER use innerHTML with user-provided data — XSS vulnerability
card.innerHTML = `<h3>${userInput}</h3>`;  // DANGEROUS if userInput contains <script>

// Insert
document.body.appendChild(card);                    // add to end of body
container.insertBefore(card, container.firstChild); // add to start
existingElement.after(card);                        // insert after specific element
existingElement.before(card);                       // insert before specific element

// Remove
card.remove();
```

### Modifying Elements

```javascript
// Text
element.textContent = "New text";  // safe, no HTML parsing
element.innerHTML = "<strong>Bold</strong>";  // parses HTML (dangerous with user data)

// Attributes
element.setAttribute("href", "/courses");
element.getAttribute("data-id");
element.removeAttribute("disabled");

// Classes
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("selected");
element.classList.contains("active");  // true/false
```

---

## Lesson 2.8: Events

### addEventListener

```javascript
const button = document.querySelector("#submit");

button.addEventListener("click", function(event) {
  event.preventDefault();   // prevent default behavior (form submit, link navigate)
  event.stopPropagation();  // stop event from bubbling up to parent elements
  console.log(event.target);  // element that was clicked
  console.log(event.currentTarget);  // element the listener is attached to
});
```

### Event Bubbling and Delegation

Events bubble: a click on a child element also triggers click handlers on all ancestors.

```javascript
// WITHOUT delegation — 1000 event listeners for 1000 list items
const items = document.querySelectorAll(".item");
items.forEach(item => {
  item.addEventListener("click", handleItemClick);
});

// WITH delegation — 1 event listener on the parent
document.querySelector(".item-list").addEventListener("click", function(event) {
  const item = event.target.closest(".item");  // find nearest .item ancestor
  if (item) {
    handleItemClick(item);
  }
});
```

**Event delegation is the correct pattern for dynamic lists** — items added after the listener is set up will automatically be handled.

### Common Events

```javascript
// Mouse
element.addEventListener("click", handler);
element.addEventListener("dblclick", handler);
element.addEventListener("mouseover", handler);
element.addEventListener("mouseout", handler);

// Keyboard
document.addEventListener("keydown", (e) => console.log(e.key));
document.addEventListener("keyup", handler);

// Form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const email = data.get("email");
});
input.addEventListener("input", (e) => console.log(e.target.value));
input.addEventListener("change", handler);  // fires after blur

// Document
document.addEventListener("DOMContentLoaded", handler);  // DOM ready, before images
window.addEventListener("load", handler);                // everything loaded
window.addEventListener("resize", handler);
```

---

## Lessons 2.9–2.11: Asynchronous JavaScript

### The Event Loop — Why JavaScript is "Non-Blocking"

**The misconception:** "JavaScript can do multiple things at once."

JavaScript has **one thread** — it can only do one thing at a time. What it can do: schedule work to happen later and continue running other code in the meantime.

**The call stack:** Where JavaScript tracks what function is currently running. LIFO (Last In First Out). When a function calls another function, the new function goes on top.

**The event loop model:**
```
Call Stack  →  Web APIs  →  Task Queue  →  Call Stack
```

```javascript
console.log("1");           // runs immediately

setTimeout(() => {
  console.log("2");         // scheduled for later (even if delay is 0)
}, 1000);

console.log("3");           // runs immediately

// Output: 1, 3, 2
// "2" runs AFTER "1" and "3" even though it appears between them
```

The `setTimeout` callback goes to the Web APIs (browser handles timing). When the timer expires, the callback goes to the task queue. The event loop only picks up from the task queue when the call stack is empty.

### Callbacks and Callback Hell

```javascript
// Synchronous (runs top to bottom)
function readFile() { return "file contents"; }

// Asynchronous with callback — doesn't return the value, calls a function with it
function readFileAsync(callback) {
  // ... async operation ...
  callback(null, "file contents"); // Node.js convention: (error, result)
}

readFileAsync(function(error, data) {
  if (error) { handle(error); return; }
  processData(data, function(error, processed) {
    if (error) { handle(error); return; }
    saveData(processed, function(error) {
      if (error) { handle(error); return; }
      console.log("Done"); // "Callback hell" — deep nesting
    });
  });
});
```

Callback hell: deep nesting, error handling repeated in every callback, hard to read, harder to maintain. Promises solve this.

### Promises

A Promise is an object representing the eventual result of an async operation. It's in one of three states:
- **Pending:** hasn't resolved or rejected yet
- **Fulfilled:** succeeded (resolved with a value)
- **Rejected:** failed (rejected with an error)

```javascript
// Creating a Promise
const promise = new Promise((resolve, reject) => {
  // Simulate async operation
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve("Data loaded");  // fulfills the promise
    } else {
      reject(new Error("Failed to load"));  // rejects the promise
    }
  }, 1000);
});

// Using a Promise
promise
  .then(data => {
    console.log(data);    // "Data loaded" — runs on fulfillment
    return processData(data);  // can return another Promise
  })
  .then(processed => {
    return saveData(processed);
  })
  .catch(error => {
    console.error(error); // runs if ANY .then() rejects
  })
  .finally(() => {
    console.log("Done");  // runs always, regardless of success/failure
  });

// Running multiple promises concurrently
const [users, courses] = await Promise.all([
  fetchUsers(),    // starts both immediately
  fetchCourses(),  // starts immediately (doesn't wait for fetchUsers)
]);
// waits for BOTH to complete — total time = max(fetchUsers, fetchCourses)
```

### Tasks vs Microtasks: why a promise beats `setTimeout(0)`

**Sources:** [MDN, Using microtasks with queueMicrotask()](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide) · [MDN Reference, JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model) *(added 2026-10-09: the event loop above has one queue; real JavaScript has two)*

**The misconception:** "Everything async waits in one line, first come first served."

There are **two** queues, and one always goes first. MDN: "Microtasks have higher priority and the microtask queue is drained first before the task queue is pulled."

- **Task queue:** `setTimeout` / `setInterval` callbacks, events like clicks. MDN: "A timeout or interval created with setTimeout() or setInterval() is reached, causing the corresponding callback to be added to the task queue."
- **Microtask queue:** promise callbacks (`.then`, `.catch`, `.finally`, and the code after an `await`). MDN: "JavaScript promises and the Mutation Observer API both use the microtask queue to run their callbacks"

Predict the order before reading the answer:

```javascript
console.log("1 sync");

setTimeout(() => console.log("4 task: setTimeout 0"), 0);

Promise.resolve().then(() => console.log("3 microtask: then"));

console.log("2 sync");

// Output: 1 sync, 2 sync, 3 microtask: then, 4 task: setTimeout 0
```

What happened, step by step:
1. The whole script is itself a task. It runs to the end first, so both `sync` lines print.
2. The call stack is now empty. Before the event loop takes the **next task**, it empties the microtask queue, so the `.then` runs.
3. Only then does the timer's callback, waiting in the task queue, get its turn. `0` ms means "as soon as possible after that", never "right now".

The rule MDN states for the loop: "The oldest runnable task in the task queue will be executed during a single iteration of the event loop. After that, microtasks will be executed until the microtask queue is empty, and then the browser may choose to update rendering."

**Why you care:** if a promise callback keeps queueing more promise callbacks, the timers, clicks and screen updates never get a turn. MDN warns: "there's a real risk of getting the event loop endlessly processing microtasks." A frozen page with no error is often this.

**Interview version:** "Sync code first, then all microtasks (promises), then one task (timer, event), then all microtasks again, and repeat."

### Async/Await — The Modern Pattern

Async/await is syntactic sugar over Promises. It makes async code look synchronous.

```javascript
// Same logic as the .then() chain above:
async function loadAndProcess() {
  try {
    const data = await fetchData();           // waits here (non-blocking)
    const processed = await processData(data); // waits here
    await saveData(processed);
    console.log("Done");
  } catch (error) {
    console.error("Failed:", error);           // catches any async error
  }
}

// async function always returns a Promise
loadAndProcess();  // returns Promise<void>

// Concurrent fetching with async/await (correct)
const [users, courses] = await Promise.all([fetchUsers(), fetchCourses()]);

// Sequential (each waits for the previous — use when results depend on each other)
const user = await fetchUser(id);
const courses = await fetchUserCourses(user.id);  // depends on user.id
```

**When to use Promise.all vs sequential await:**
- Independent operations: `Promise.all` (parallel, faster)
- Dependent operations (result of first needed for second): sequential await

**Common mistake: `forEach` with an `async` callback does not wait.** MDN (Array.prototype.forEach): "forEach() expects a synchronous function — it does not wait for promises." Use `for...of` with `await` (one at a time, in order) or `Promise.all` with `.map()` (all at once, results in input order).

```javascript
const wait = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

const out = [];
[30, 10, 20].forEach(async (ms) => {
  out.push(await wait(ms, ms));
});
console.log(out.length);   // 0: forEach returned before any callback finished

const inOrder = [];
for (const ms of [30, 10, 20]) {
  inOrder.push(await wait(ms, ms));   // really waits, each in turn
}
console.log(inOrder);      // [ 30, 10, 20 ]
console.log(out);          // [ 10, 20, 30 ]: filled later, in FINISH order
console.log(await Promise.all([30, 10, 20].map((ms) => wait(ms, ms))));  // [ 30, 10, 20 ]
```
(Run as an ES module file: top-level `await` works there. Output checked on Node 26.)

---

## Lesson 2.12: Fetch API

### GET Request

```javascript
async function fetchCourses() {
  try {
    const response = await fetch("https://api.example.com/courses");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;  // re-throw so callers can handle it
  }
}
```

**Common mistake:** `fetch()` only rejects on network failure — a 404 or 500 does NOT cause rejection. Always check `response.ok`.

### POST Request

```javascript
async function createCourse(courseData) {
  const response = await fetch("https://api.example.com/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create course");
  }

  return response.json();
}
```

### Loading and Error States Pattern

```javascript
// The pattern for every async operation in a UI:
let state = { loading: false, data: null, error: null };

async function loadCourses() {
  state.loading = true;
  state.error = null;
  updateUI(state);

  try {
    state.data = await fetchCourses();
  } catch (error) {
    state.error = error.message;
  } finally {
    state.loading = false;
  }

  updateUI(state);
}
```

This pattern (loading/data/error) maps directly to React state management.

---

## Lesson 2.13: ES6+ Features

### Template Literals

```javascript
const name = "Jasmine";
const phase = 2;
const message = `Hello, ${name}! You're on Phase ${phase}.`;
// Multi-line (the newline is real in the string)
const html = `
  <div class="card">
    <h3>${name}</h3>
  </div>
`;
```

**Recognise:** a function name written right before a template, `` String.raw`C:\new` `` (gives `C:\new`, the backslash kept) or `` sql`SELECT ...` ``, is a **tagged template**: the function receives the pieces and the `${}` values and decides what comes out. You will meet tags as syntax in styled-components and SQL clients (week 9); you will rarely write the function yourself.

### Optional Chaining and Nullish Coalescing

```javascript
// Optional chaining — short-circuits to undefined if any step is null/undefined
const city = user?.address?.city;        // undefined if user or address is null
const len = user?.courses?.length;       // undefined instead of TypeError

// Works with methods and arrays too
const fullName = user?.getName?.();      // calls only if getName exists
const first = users?.[0]?.name;         // array access safe

// Nullish coalescing — fallback only for null/undefined (not for 0, "", false)
const nameNullish = user.name ?? "Guest";   // "Guest" only if name is null or undefined
const countNullish = user.count ?? 0;        // 0 only if count is null or undefined

// vs OR operator (falls back for ANY falsy)
const nameOr = user.name || "Guest";        // "Guest" if name is "", 0, false, null, or undefined
const countOr = user.count || 0;             // 0 even if count is genuinely 0 (wrong!)
```

**Recognise:** `x ??= 5` assigns only when `x` is `null` or `undefined`; `x ||= 5` assigns when `x` is any falsy value (logical assignment, ES2021). Both are short for the `??` / `||` forms above.

### Destructuring, the extras (taught here, after JS Day 15)

JS Day 15 (§12.3) teaches `const { name } = obj`, nested destructuring and array destructuring. Four more forms appear in every Express route (week 7) and React component (week 11). §2.6 shows the first three in passing; this is where they are taught.

```javascript
const post = { id: 7, username: "ada", likes: 0, password: "x1" };

// 1. Default value: used only when the property is missing (undefined)
const { role = "user" } = post;
console.log(role);              // user

// 2. Renaming: take `username`, name the variable `author`
const { username: author } = post;
console.log(author);            // ada

// 3. Parameter destructuring: unpack the object the caller passes in
function show({ id, likes = 0 }) {
  return `${id}:${likes}`;
}
console.log(show(post));        // 7:0
console.log(show({ id: 8 }));   // 8:0

// 4. Object rest: everything except the properties you named
const { password, ...safe } = post;
console.log(safe);              // { id: 7, username: 'ada', likes: 0 }
```

- A default applies only when the value is `undefined`. `const { role = "user" } = { role: null }` gives `null`, unlike `??`.
- In `{ username: author }` the left side is the property and the right side is the new variable; `username` itself is not created.
- Object rest is how an Express handler strips a field before sending a user back (`const { password, ...safeUser } = user`). ESLint's recommended `no-unused-vars` flags the unused `password` unless its `ignoreRestSiblings` option is turned on.
- MDN covers all four on one page: Destructuring (developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring).

---

## Lesson 2.14: Modules

Paired case: CommonJS (`require` / `module.exports`, the instructor's class files and his week-7 Express repo) was met on JS Day 15 (§12.3, "Reading the instructor's files"). This lesson is the ES module side, which is what this course's folder uses (`"type": "module"`).

### Named vs Default Exports

```javascript
// Named exports — can export multiple from one file
export function fetchCourses() { ... }
export const API_URL = "https://api.example.com";
export class CourseService { ... }

// Default export — ONE per file, name on import is your choice
// App.js
export default function App() { ... }

// UserService.js (a different file: a second `export default` in App.js would be
// "SyntaxError: Duplicate export of 'default'")
export default class UserService { ... }
```

```javascript
// Named imports — name must match exactly (or use alias)
import { fetchCourses, API_URL } from "./api/courses.js";
import { fetchCourses as getCourses } from "./api/courses.js";  // alias

// Default import — name is your choice
import App from "./App.js";
import MyApp from "./App.js";  // same thing, different local name

// Import everything
import * as courseApi from "./api/courses.js";
courseApi.fetchCourses();
courseApi.API_URL;
```

Write the file extension. In Node's ES modules (and in a browser loading modules without a bundler) a relative
import must name the file in full: `from "./api/courses"` stops with `ERR_MODULE_NOT_FOUND` (Node docs, ESM:
"Mandatory file extensions"). A bundler such as Vite resolves extension-less imports for you, and Airbnb's guide
(10.10) prefers leaving `.js` out in bundled projects; outside a bundler, write it.

### Module Bundlers (Vite)

In development, you import modules directly in JavaScript. In production, all those files must be bundled into a smaller set of files (fewer network requests). Vite handles this.

```bash
# Vite handles: TypeScript → JavaScript, JSX → JavaScript
# module resolution, tree-shaking (removing unused code), minification, code splitting
npm create vite@latest my-project -- --template react-ts
```

---

## Lessons 2.15–2.16: Error Handling and OOP

### Error Handling

```javascript
// try/catch/finally
try {
  const data = JSON.parse(userInput);   // throws SyntaxError if invalid JSON
  processData(data);
} catch (error) {
  // error is type Error with: name, message, stack
  console.error(error.name);     // "SyntaxError"
  console.error(error.message);  // human-readable description
  console.error(error.stack);    // full stack trace
} finally {
  cleanup();  // runs no matter what
}

// Custom error types
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Using custom errors
throw new ValidationError("email", "Invalid email format");

// Handling specific error types
try {
  await createUser(data);
} catch (error) {
  if (error instanceof ValidationError) {
    showFieldError(error.field, error.message);
  } else if (error instanceof ApiError && error.status === 409) {
    showError("Email already in use");
  } else {
    showError("Something went wrong");
    console.error(error);  // log the unexpected error
  }
}
```

### OOP in JavaScript

```javascript
class Animal {
  #name;  // private field (#) — can't be accessed outside the class
  
  constructor(name, sound) {
    this.#name = name;
    this.sound = sound;
  }

  speak() {
    return `${this.#name} says ${this.sound}`;
  }

  get name() { return this.#name; }       // getter
  set name(value) { this.#name = value; }  // setter
  
  static create(name, sound) {            // static method — called on class, not instance
    return new Animal(name, sound);
  }
}

class Dog extends Animal {
  #breed;

  constructor(name, breed) {
    super(name, "Woof");  // must call super() before using this
    this.#breed = breed;
  }

  fetch() { return `${this.name} fetches the ball!`; }

  speak() {  // override parent method
    return `${super.speak()} — I'm a ${this.#breed}!`;
  }
}

const dog = new Dog("Buddy", "Labrador");
dog.speak();   // "Buddy says Woof — I'm a Labrador!"
dog.fetch();   // "Buddy fetches the ball!"
```

### The `this` Keyword — The Most Confusing Part of JavaScript

`this` refers to the object that called the function. **The calling context determines `this`, not where the function is defined.**

```javascript
const obj = {
  name: "Jasmine",
  greet() {
    console.log(this.name);   // "Jasmine" — obj called greet()
  },
};
obj.greet();  // "Jasmine"

const greet = obj.greet;
greet();      // undefined — no calling object, this is global (or undefined in strict mode)

// Arrow functions: no own this — inherit from surrounding scope
const obj = {
  name: "Jasmine",
  greet: () => {
    console.log(this.name);   // undefined — arrow function has no own this
  },
  delayedGreet() {
    setTimeout(() => {
      console.log(this.name); // "Jasmine" — arrow inherits this from delayedGreet
    }, 1000);
  },
};
```

**Pattern:** In classes and objects, use regular methods. In callbacks that need to preserve `this`, use arrow functions.

---

## Phase 2 Projects

### DOM Calculator
Build a calculator using only HTML, CSS, and JavaScript. No libraries. Requirements:
- Display current input and result
- +, -, ×, ÷, clear, equals
- Keyboard support (number keys + Enter)
- Handle division by zero

### Weather App
```javascript
// Fetch from OpenWeatherMap API
const API_KEY = "your_key_from_openweathermap.org";
const city = document.querySelector("#city-input").value;

const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);
const weather = await response.json();
// Display: weather.main.temp, weather.weather[0].description, weather.name
```

### Milestone: JavaScript Quiz App
10 questions, 15-second timer per question, score tracking, localStorage persistence.
Must use: modules (separate files), async/await (loading questions), event delegation, DOM manipulation.

---

## Phase 2 Check

**Feynman checks:**

1. What is the event loop? Why does `setTimeout(() => ..., 0)` run after synchronous code?

2. What is the difference between `fetch()` resolving and the request succeeding? How do you check if a fetch actually succeeded?

3. Explain the `this` keyword. What does `this` refer to in a regular method vs an arrow function?

4. What's the difference between `map()` and `forEach()`? When do you use each?

5. What is a closure? Give a real example from a web app.

**Real System Connection:** Node.js's entire architecture is built on the JavaScript event loop — the same model as the browser. This is why Node.js can handle thousands of concurrent connections with a single thread: I/O operations (database queries, file reads, API calls) are handed off to the OS while the event loop continues processing other requests. Express, Fastify, and Next.js API routes all leverage this model. When you write `await prisma.user.findMany()`, you're using the event loop to handle database I/O without blocking the server.
