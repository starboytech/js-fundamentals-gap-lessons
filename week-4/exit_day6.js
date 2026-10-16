// ################################################################
// #  DAY 6 EXIT CHECK — an else-if chain, a switch, and a ternary
// ################################################################
//
// ── 1. THE GOAL ──────────────────────────────────────────────────
// Part 1: predict which branch of a chain runs, without running it.
// Part 2: a letter grade from a score with an else-if chain (with one && test).
// Part 3: a switch on a day name.
// Part 4: one ternary that chooses a value.
// Tools: blocks A-P of day6_conditionals_loops.js only. No hints below; no looking back at the file.
// Style (from the audit): const by default, semicolons, single quotes. Save with Ctrl+S and the formatter
// handles the layout.
//
// Run it with:
//   node week-4/exit_day6.js

// ── 2. PART 1: PREDICT (fill BEFORE running anything) ────────────
// Read this chain. It is already written and runs below. Do NOT change it.
console.log('--- PART 1 ---');
const temperature = 34;
if (temperature >= 20) {
  console.log('warm');
} else if (temperature >= 30) {
  console.log('hot');
} else {
  console.log('cold');
}
// ? It prints: ____
// ? Is the  temperature >= 30  test checked at all? (yes / no): ____
// ? Why? (one sentence): ____
// ? MY CONFIDENCE (confident / unsure / guess): ____

// ── 3. PART 2: THE GRADE ─────────────────────────────────────────
// Make a const  score  holding 88, and a const  onTime  holding true.
// Print exactly ONE of these, using ONE if / else if / else chain:
//   A+   when score is 97 or more AND onTime is true (use &&)
//   A    when score is 90 or more
//   B    when score is 80 or more
//   C    when score is 70 or more
//   F    otherwise
// With score 88 it must print  B . Then test it: change score to 97 (prints A+), set onTime to false
// (prints A), change score to 50 (prints F). Leave it at 88 when you finish.
// Write your lines below, from nothing:

// ── 4. PART 3: THE DAY ───────────────────────────────────────────
// Make a const  dayName  holding 'Wed'. Write a switch on dayName that prints:
//   'Mon'  → gym
//   'Wed'  → swim
//   'Fri'  → movie night
//   any other day → rest
// Every case ends with break. The "any other day" part is a default (the professional rule from block N).
// With 'Wed' it must print  swim . Then try 'Sun' (prints rest) and 'wed' in small letters: predict first.
// ? 'wed' in small letters prints: ____  because: ____
// Write your lines below:

// ── 5. PART 4: ONE TERNARY ───────────────────────────────────────
// Make a const  itemsLeft  holding 0. Make a const  stockLabel  that is 'in stock' when itemsLeft is more
// than 0 and 'sold out' otherwise, using a ternary (it chooses a VALUE). Print stockLabel.
// With 0 it must print  sold out .
// Write your lines below:
// ── 6. WHEN ALL FOUR WORK, FILL IN THIS LINE ─────────────────────
// MY CHECK: Part 1 printed ____ , Part 2 printed ____ , Part 3 printed ____ , Part 4 printed ____
