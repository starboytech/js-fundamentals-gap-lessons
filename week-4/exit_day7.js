// ################################################################
// #  DAY 7 EXIT CHECK — one total three ways, then stop early with break
// ################################################################
//
// ── 1. THE GOAL ──────────────────────────────────────────────────
// Part 1: predict a loop that uses continue AND break, without running it.
// Part 2: total one array three ways: classic for, for...of, while.
// Part 3: spend a budget in order, and stop with break when the next item does not fit.
// Part 4: one sentence: which of your three loops you would keep, and why.
// Tools: blocks 7A-7L of day6_conditionals_loops.js only. No hints below; no looking back at the file.
// Style: const by default, semicolons, single quotes. Save with Ctrl+S and the formatter handles the layout.
//
// Run it with:
//   node week-4/exit_day7.js

// ── 2. PART 1: PREDICT (fill BEFORE running anything) ────────────
// Read this loop. It is already written and runs below. Do NOT change it.
console.log('--- PART 1 ---');
const codes = [3, 0, 7, -1, 5];
for (const code of codes) {
  if (code === 0) {
    continue;
  }
  if (code < 0) {
    break;
  }
  console.log(`code ${code}`);
}
console.log('done');
// ? OUTPUT (every printed line, in order): ____
// ? In the round where code is 0, does  console.log(`code ${code}`)  run? ____  Why? ____
// ? Is the 5 ever looked at? ____  Why? ____
// ? MY CONFIDENCE (confident / unsure / guess): ____

// ── 3. WORKED UNPACK (already done) — a DIFFERENT, similar prompt, to show how the five lines are filled ──
// The prompt it unpacks:
//   Make const temps = [3, 8, -2, 6]. (1) With a classic for, count the days above 0 and print  for count: <n> .
//   (2) Count them again with a while loop and print  while count: <n> . (3) With for...of, find the first day
//   below 0, print  first freezing day: <n>  and stop with break.
//
// PARTS:   (1) count days above 0, classic for   (2) same count, while   (3) for...of: first day below 0, then stop
// GIVEN:   temps = [3, 8, -2, 6] · the label texts 'for count:', 'while count:', 'first freezing day:'
// OUTPUT:  for count: 3
//          while count: 3
//          first freezing day: -2
// RULES:   (1) classic for: positions 0 to < temps.length   (2) while: the counter is made BEFORE the loop and moved
//          INSIDE it   (3) for...of + break · two counts in one file need two names (forCount, whileCount), or the
//          second const/let redeclares the first
// BY HAND (part 2): i = 0: 3 > 0, count 1 · i = 1: 8, count 2 · i = 2: -2, not counted · i = 3: 6, count 3 ·
//          i = 4: 4 < 4 is false, stop → 3
//          What BY HAND caught: the -2 round still has to move i on. If i++ sat INSIDE the "above 0" if, i would stay
//          at 2 forever: an infinite loop (7K). So i++ goes after the if, every round.
// FIRST:   part (1) alone. Run it, check  for count: 3 , then start part (2).

// ── 4. PARTS 2 AND 3: UNPACK FIRST (your turn, comments only, no code yet) ──
// The prompt (parts 2 and 3 below are ONE prompt; unpack both together):
//   Make const prices = [12, 5, 20, 8, 15].
//   PART 2: total the prices three ways, in this order, each with its own total variable:
//     a classic for (total in  forTotal ) printing  for total: <n> ,
//     a for...of (total in  ofTotal , loop variable  price ) printing  for...of total: <n> ,
//     a while (total in  whileTotal , counter  j ) printing  while total: <n> .
//     All three must print the same number.
//   PART 3: const budget = 30. With a for...of (loop variable  item ) and a running total  spent , go through the
//     prices in order. BEFORE adding an item, check: if adding it would take spent over budget, print
//     can't afford <item>  and stop with break. Otherwise add it. After the loop, print  spent: <n> .
// TODO UNPACK first:
// TODO   PARTS:  ____
// TODO   GIVEN:  ____
// TODO   OUTPUT (every line, by hand):____
// TODO   RULES (must use / must not use):____
// TODO   BY HAND (part 3, step by step): ____
// TODO   FIRST piece to run:____

// ── 5. PART 2: THE TOTAL, THREE WAYS ─────────────────────────────
console.log('--- PART 2 ---');
// Write your lines below, from nothing:

// ── 6. PART 3: THE BUDGET ────────────────────────────────────────
console.log('--- PART 3 ---');
// Write your lines below, from nothing:

// ── 7. PART 4: CHOOSE ────────────────────────────────────────────
// ? Of your three Part 2 loops, which would you keep in real code, and why? (one sentence): ____
