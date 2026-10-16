# JavaScript Fundamentals + Full-Stack Gap Lessons

Self-study material for a full-stack web bootcamp, in two parts:

1. **JavaScript fundamentals** — a 29-section reference (`materials/js_fundamentals.md`) plus
   runnable lesson files for the first 8 teaching days (`week-3/` → `week-5/`), each with an
   exit check.
2. **Gap lessons** — `gap-lessons/phase_00` → `phase_08`: a full-stack curriculum (web
   foundations → HTML/CSS → JS → TypeScript → React → Node → databases → integration → DevOps).
   `GAP_LESSONS.md` lists the lessons a typical bootcamp syllabus skips, and the week of the
   bootcamp each one fits.

All lesson files are **blank**: every `____` is yours to fill in.

---

## Setup

Requires [Node.js](https://nodejs.org) (current LTS).

```
npm install          # optional: ESLint + Prettier for the lesson files
npm run lint
```

Run any lesson from this folder: `node week-4/day5_strings_arrays.js`

Recommended VS Code extension: **Better Comments** (aaron-bond) — the files use its colours:
`// !` red = warnings and concepts · `// ?` blue = questions for you · `// *` green = key rules ·
`// TODO` orange = unpack steps.

## How a lesson file works

Every concept runs **TRACE → RUN → MODIFY → WRITE**:

1. **TRACE** — fill every `____` *before* running. Predict, don't guess-and-check.
2. **RUN** — run the file and compare the output with your predictions.
3. **MODIFY** — add a *new* line for your change (don't edit the TRACE line, so your
   prediction stays comparable).
4. **WRITE** — write the asked-for code from nothing, using names that start with `my`.

The confidence blank takes one word: `confident`, `unsure` or `guess`. A right answer you
guessed doesn't count as known — re-check it later. A wrong answer you were confident about is the
most important thing to fix.

Each day ends with an **exit check** (`exit_dayN.js`): no hints, no looking back. Some exits and
lessons point at small files in `*_errors/` folders — those are **broken on purpose** to teach
Node's error messages. Read the error, then fix the file.

## The JS days

| Day | File | Sections |
|-----|------|----------|
| 1 | `week-3/day1_running_js.js` | 1.1 What JS is · 1.2 First program |
| 2 | `week-3/day2_reading_errors_variables.js` | 1.3 Reading errors · 2.1 Variables |
| 3 | `week-3/day3_types_numbers.js` | 2.2 Types and const · 3.1 Numbers and Math |
| 4 | `week-4/day4_operators_strings.js` | 3.2 Operators · 4.1 Strings |
| 5 | `week-4/day5_strings_arrays.js` | 4.2 String methods · 5.1 Arrays |
| 6–7 | `week-4/day6_conditionals_loops.js` | 6.1 Conditionals · 6.2 Logic, switch, ternary · 7.1 Loops |
| 8 | `week-5/day8_functions.js` | 8.1 Functions · 8.2 Expressions, arrows, callbacks |

Sections 9.1–12.9 (scope, closures, the call stack, array iterator methods, objects, classes,
inheritance, prototypes, errors) are in `materials/js_fundamentals.md` with runnable examples but
no lesson file yet. Every example in that file was run with `node` and its `// prints:` lines
match the real output.

## Sources

The JS material is written from MDN Learn ("Dynamic scripting with JavaScript"), the MDN
reference, the Node.js docs and Codecademy's "Learn JavaScript"; each section links the pages it
draws on. The gap lessons draw on The Odin Project, MDN and official docs. A running example app,
"StudyApp", ties the gap lessons together.
