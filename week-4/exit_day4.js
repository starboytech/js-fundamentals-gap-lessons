// ################################################################
// #  DAY 4 EXIT CHECK — trace a chain of updates, then build a sentence
// ################################################################
//
// ── 1. THE GOAL ──────────────────────────────────────────────────
// Part 1: follow x through five updates and predict the final number BEFORE you run anything.
// Part 2: write a program that builds one sentence from variables with a template literal.
//
// ── 2. PART 1: YOUR PREDICTION (fill before running) ─────────────
// x starts at 8. The five updates run in this order, one after the other:
//   x += 4;
//   x *= 2;
//   x -= 5;
//   x++;
//   x /= 4;
// After x += 4  x is: ____
// After x *= 2  x is: ____
// After x -= 5  x is: ____
// After x++     x is: ____
// After x /= 4  x is: ____
// MY CONFIDENCE on the FINAL number (confident / unsure / guess): ____
//
// ── 3. PART 1 LIVE LINES (already written; do not change) ────────
// Run the file AFTER you fill section 2:
//   node week-4/exit_day4.js
let x = 8;
x += 4;
x *= 2;
x -= 5;
x++;
x /= 4;
console.log("Part 1 final x:", x);

// ── 4. PART 2: THE SENTENCE (you write this, from nothing) ───────
// THE STEPS (write them in this order, below the line):
//   Step 1: make a const named  item  holding the text "tea"
//   Step 2: make a const named  cups  holding the number 3
//   Step 3: make a const named  price  holding the number 2.5   (price of ONE cup)
//   Step 4: print ONE sentence, using a template literal (backticks and ${ }), that comes out as:
//             3 cups of tea cost 7.5
//           The 3, the tea and the 7.5 must all come from the variables. The 7.5 must be
//           WORKED OUT inside a ${ } hole from cups and price. Do not type 3, tea or 7.5 in the text.
// THE RULES:
//   * End every instruction with a semicolon ;
//   * No looking back at the lesson file
// HOW TO CHECK: run the file. The last line must print exactly:  3 cups of tea cost 7.5
// Then change cups to 4 and run again: it must print  4 cups of tea cost 10
// ################################################################
// ▼▼▼▼▼▼▼▼▼▼▼▼  WRITE YOUR CODE BELOW THIS LINE  ▼▼▼▼▼▼▼▼▼▼▼▼
// ################################################################


// ################################################################
// ▲▲▲▲▲▲▲▲▲▲▲▲  WRITE YOUR CODE ABOVE THIS LINE  ▲▲▲▲▲▲▲▲▲▲▲▲
// ################################################################
//
// ── 5. WHEN IT WORKS, FILL IN THIS LINE ──────────────────────────
// MY CHECK: the first run printed ____ and the second run (cups = 4) printed ____
