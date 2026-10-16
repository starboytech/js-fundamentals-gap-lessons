// ################################################################
// #  DAY 2 EXIT CHECK — three broken programs: name each error, find its line, fix it
// ################################################################
//
// ── 1. THE GOAL ──────────────────────────────────────────────────
// Three programs are broken. For each one you write: the KIND of error, the error TYPE Node
// prints (or "none"), the LINE that causes it, and then you fix it.
//
// ── 2. THE THREE PROGRAMS (restated here; the real files are in week-3/exit_day2/) ──
//
// SNIPPET 1 (file s1.js)
// L1  let fruit = 'apple';
// L2  console.log(Fruit);
//
// SNIPPET 2 (file s2.js)
// L1  let isRaining = false;
// L2  if (isRaining = true) {
// L3    console.log("Take an umbrella");
// L4  }
//
// SNIPPET 3 (file s3.js)
// L1  let count = 3;
// L2  console.log("Count is", count;
//
// ── 3. THE STEPS ─────────────────────────────────────────────────
//   Step 1: BEFORE running anything, fill the answer lines in section 5 for all three.
//   Step 2: run each:   node week-3/exit_day2/s1.js   (then s2.js, s3.js) and check your answers.
//   Step 3: fix each file in week-3/exit_day2/ (edit the real file, then save with Ctrl+S).
//   Step 4: run each again. s1 and s3 must print the intended line; s2 must print nothing,
//           because isRaining is false.
//
// ── 4. THE RULES ─────────────────────────────────────────────────
//   * Kind of error is one of: syntax / runtime / logic
//   * No looking back at the lesson file
//
// ── 5. YOUR ANSWERS (fill before running) ────────────────────────
// SNIPPET 1: kind ____   Node prints ____   line ____
// SNIPPET 2: kind ____   Node prints ____   line ____   (hint: does Node print an error?)
// SNIPPET 3: kind ____   Node prints ____   line ____
//
// ── 6. WHEN ALL THREE ARE FIXED, FILL IN THIS LINE ───────────────
// MY CHECK: s1 prints ____ , s2 prints ____ , s3 prints ____
