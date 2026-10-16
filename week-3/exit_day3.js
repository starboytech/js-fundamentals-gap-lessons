// ################################################################
// #  DAY 3 EXIT CHECK — predict five types, then roll a 6-sided die
// ################################################################
//
// ── 1. THE GOAL ──────────────────────────────────────────────────
// Part 1: for five values, say what typeof gives BEFORE you run anything.
// Part 2: write a program that rolls a 6-sided die using Math.random and Math.floor.
//
// ── 2. THE FIVE VALUES (restated here; the live lines are in section 4) ──
//   VALUE 1:  "7"                    (a 7 inside quotes)
//   VALUE 2:  7.5
//   VALUE 3:  3 > 2                  (a comparison)
//   VALUE 4:  [1, 2]                 (an array)
//   VALUE 5:  (2.456).toFixed(1)     (the number 2.456, rounded to 1 decimal place)
//
// ── 3. YOUR ANSWERS (fill before running) ────────────────────────
// Write one word each: number / string / boolean / object / undefined
// VALUE 1 typeof: ____
// VALUE 2 typeof: ____
// VALUE 3 typeof: ____
// VALUE 4 typeof: ____
// VALUE 5 typeof: ____
// MY CONFIDENCE on VALUE 5 (confident / unsure / guess): ____
//
// ── 4. PART 1 LIVE LINES (already written; do not change) ────────
// Run the file AFTER you fill section 3:
//   node week-3/exit_day3.js
console.log("1:", typeof "7");
console.log("2:", typeof 7.5);
console.log("3:", typeof (3 > 2));
console.log("4:", typeof [1, 2]);
console.log("5:", typeof (2.456).toFixed(1));

// ── 5. PART 2: THE DIE (you write this, from nothing) ────────────
// THE STEPS (write them in this order, below the line):
//   Step 1: make a const named  roll  that holds a random WHOLE number from 1 to 6,
//           using Math.random and Math.floor
//   Step 2: print roll with console.log
//   Step 3: print  Number.isInteger(roll)  on its own line
// THE RULES:
//   * End every instruction with a semicolon ;
//   * No looking back at the lesson file
// HOW TO CHECK: run the file five times. roll must always be 1, 2, 3, 4, 5 or 6,
// and the Number.isInteger line must always print true.
// ################################################################
// ▼▼▼▼▼▼▼▼▼▼▼▼  WRITE YOUR CODE BELOW THIS LINE  ▼▼▼▼▼▼▼▼▼▼▼▼
// ################################################################



// ################################################################
// ▲▲▲▲▲▲▲▲▲▲▲▲  WRITE YOUR CODE ABOVE THIS LINE  ▲▲▲▲▲▲▲▲▲▲▲▲
// ################################################################
//
// ── 6. WHEN IT WORKS, FILL IN THIS LINE ──────────────────────────
// MY CHECK: the five runs gave rolls of 1 - 6 and the Number.isInteger line always printed ____
