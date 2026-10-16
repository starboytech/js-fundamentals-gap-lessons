// ================================================================
// ! BOOTCAMP JS — DAYS 6 AND 7 of 19 — CONDITIONALS AND LOOPS
// ! Material: materials/js_fundamentals.md §6.1, §6.2, §7.1
// ! Sources: MDN Learn "Making decisions in your code: conditionals" · Codecademy "Introduction to JavaScript", "Control Flow" and "Loops"
// ================================================================
// * SECTIONS TODAY: 6.1, 6.2, 7.1
// * DAYS TODAY: 6, 7
// * Every concept: 1 TRACE (fill the blanks BEFORE running) → 2 RUN → 3 MODIFY → 4 WRITE
// * This file RUNS: every block has live code that prints.
// * Each block starts by printing a label like  --- A ---  so you can match output to block.
// * Run the whole file from the bootcamp folder:
// *     node week-4/day6_conditionals_loops.js
// * WRITE lines use names that start with my. Re-read the WRITE spec before you move on.
// * The confidence blank takes ONE word: confident, unsure or guess.
// * Every block lists the skills it teaches on a  SKILLS  line. lesson_file_check.py reads those lines:
// * a skill that no block claims fails the check, so nothing in today's sections can be skipped.

// ================================================================
// ! A - CONCEPT - CONTROL FLOW AND if / else: TWO PATHS, ONE TAKEN
// ================================================================
// * SKILLS: control_flow_concept, conditional_statements_purpose, if_else_syntax, code_block_runs_if_true, binary_decision, condition_returns_boolean
// Source: Codecademy "Control Flow": "Control flow is the order in which statements are executed in a program."
//         MDN Learn "conditionals": "Conditional statements allow us to represent such decision making in JavaScript."
//         Codecademy: "If the condition evaluates to true, the code inside the curly braces {} runs, or executes."
//         Codecademy: if...else handles "yes-or-no questions, also known as binary decisions."
//
// So far your programs ran top to bottom, every line, once. That order is the CONTROL FLOW.
// A CONDITIONAL STATEMENT changes it: it asks a yes/no question and runs different lines depending on the answer.
// Without one, a program does the same thing whatever the data says.
// BINARY means two options: yes or no, true or false. An if / else is a binary decision.
//
// The shape:   if (question) { lines that run when the answer is true } else { lines for false }
//   ( )  right after  if  hold the CONDITION: anything that comes out true or false.
//        MDN: the condition "makes use of the comparison operators ... and returns true or false."
//        Those are the comparisons from Day 4:  >  <  >=  <=  ===  !==
//   { }  wrap a BLOCK: a group of lines that run together, or are skipped together.
//        The block after the condition runs ONLY when the condition is true.
// EXACTLY ONE of the two blocks runs. Never both, never neither. An else cannot stand alone: it is paired with an if.
// Python: there is no colon, and the block is the { } braces, not the indentation.
//
// WORKED EXAMPLE (already traced)
// L1  const hour = 9;
// L2  if (hour < 12) {  console.log('morning')  } else {  console.log('afternoon')  }
//     9 < 12 is true, so the first block runs: prints morning. The else block is skipped completely.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. One word each: true / false / runs / skipped, then OUTPUT.
// ----------------------------------------------------------------
console.log('--- A ---');
// NEW: if — the keyword that starts a conditional; the condition goes in ( ) and the block it controls goes in { }
// NEW: else — the second block of an if, which runs only when the condition was false
// NEW: { } block — curly braces that group lines so they run together or are skipped together
const temp = 30;
if (temp > 25) {
  // ? 30 > 25 → ____
  console.log('sunscreen'); // ? this block: ____
} else {
  console.log('jacket'); // ? this block: ____
}
// ? OUTPUT: ____
// ? MY CONFIDENCE (confident / unsure / guess): ____
//
// ? RUN and compare. Only one of the two console.log lines printed. Which one did not, and what made it skip? ____
// ? MODIFY: add a new line  const cold = 10  and, under it, a copy of the whole if / else that tests  cold > 25  instead. What prints? ____
// ? WRITE: on the line below, make  myAge  holding any number, then an if / else that prints  adult  when myAge is 18 or more and  minor  otherwise.

// ================================================================
// ! B - CONCEPT - else IS OPTIONAL, AND CODE AFTER THE } ALWAYS RUNS
// ================================================================
// * SKILLS: else_optional
// Source: MDN Learn "conditionals": "the second block of code is not controlled by the conditional statement, so it always runs."
//
// You can write an  if  with NO else. True: the block runs. False: the block is skipped and nothing extra happens.
// Any line AFTER the closing  }  is not part of the conditional, so it runs either way.
//
// WORKED EXAMPLE (already traced)
// L1  const n = 5;
// L2  if (n > 8) {  console.log('big')  }
// L3  console.log('done')
//     5 > 8 is false, so 'big' is skipped. 'done' sits outside the braces: prints done.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- B ---');
const cups = 3;
if (cups > 2) {
  // ? 3 > 2 → ____
  console.log('refill'); // ? this line: ____
}
console.log('closing'); // ? this line: ____
const lamps = 1;
if (lamps > 2) {
  // ? 1 > 2 → ____
  console.log('bright'); // ? this line: ____
}
console.log('bye'); // ? this line: ____
// ? OUTPUT (all lines under --- B ---, in order): ____
// ? MY CONFIDENCE (confident / unsure / guess): ____
//
// ? RUN and compare. Which line under --- B --- prints ____, and why? closing and bye. They are outside of the if block so they print regardless.
// ? MODIFY: add a new line  if (cups > 5) { console.log('extra') }  and run again. What changes in the output? ____

// ? WRITE: on the line below, make  myBags  holding 4, then an if (no else) that prints  full  when myBags is more than 3, then a line AFTER the braces that prints  done.

// ================================================================
// ! C - CONCEPT - BRACES ARE OPTIONAL FOR ONE LINE, BUT ALWAYS WRITE THEM
// ================================================================
// * SKILLS: if_without_braces, braces_indentation_readability
// Source: MDN Learn "conditionals": "while not recommended, you may sometimes see if...else statements written without the curly braces."
//         MDN Learn "conditionals": "it is much easier to understand the code if you use the curly braces to delimit the blocks of code, and use multiple lines and indentation."
//
// Leave the { } off and the if controls only the SINGLE NEXT STATEMENT. That is valid JavaScript,
// and you WILL see it in other people's code, so you must be able to read it. Do not write it yourself.
// (To DELIMIT is to mark where something starts and ends.)
//
// The trap: add a second line under a brace-less  if  and only the FIRST line is controlled.
// The second line runs every time, however far you indent it, because JavaScript ignores indentation.
// Indentation is for human readers. Only the braces group lines.
// Python: indentation IS the block in Python. Here it is only decoration, which is why you always write the braces.
//
// WORKED EXAMPLE (already traced)
// L1  const wet = true;
// L2  if (wet) console.log('umbrella')
// L3  else console.log('sunhat')
//     wet is true, so the single line after the if runs: prints umbrella. The line after else is skipped.

// ----------------------------------------------------------------
// ? TRACE — mark every line runs or skipped
// ----------------------------------------------------------------
console.log('--- C ---');
const raining = false;
if (raining)
  console.log('coat'); // ? raining is false, so this line: ____
else console.log('shades'); // ? this line: ____
if (raining) console.log('boots'); // ? this line (the only line the if controls): ____
console.log('hat'); // ? this line (indented, but is it controlled?): no, it prints ____
// ? OUTPUT (all lines under --- C ---, in order): ____
// ? MY CONFIDENCE (confident / unsure / guess): ____
//
// ? RUN and compare. Why did  hat  print when raining is false and the line is indented under the if? ____
// ? MODIFY: add a new line  const snowing = false  then a copy of the two-line trap tested on  snowing,  but with { } around BOTH console.log lines. What prints ____, they are both false
// ? WRITE: on the line below, make  myLight  holding false, then an if / else WITH braces where each block has two console.log lines, each on its own indented line.

// ================================================================
// ! D - CONCEPT - else if: MORE THAN TWO PATHS, FIRST TRUE WINS, else IS THE LAST RESORT
// ================================================================
// * SKILLS: else_if_chain, first_true_branch_wins, else_last_resort
// Source: MDN Learn "conditionals": "There is a way to chain on extra choices/outcomes to your if...else — using else if."
//         Codecademy "Control Flow": "the first condition that evaluates to true from the top to bottom is the block that gets executed."
//         MDN Learn "conditionals": "the code inside it will be run if none of the conditions are true."
//
// More than two outcomes? Put  else if  blocks between the  if  and the final  else  (an ELSE IF CHAIN).
// JavaScript tests the conditions top to bottom and runs the FIRST block whose condition is true.
// Then the WHOLE chain is finished: lower tests are never even checked, even if they would be true too.
// The last  else  is the LAST RESORT: it runs only when nothing above it was true. It is optional.
// Leave it off and, when nothing matches, nothing in the chain runs.
// Python: the keyword is  else if  (two words), not  elif.
//
// Because the first true test wins, a test that catches MANY values, placed too high, swallows the values
// meant for the narrower tests below it. No error appears. The program just gives the wrong answer.
//
// WORKED EXAMPLE (already traced)
// L1  const s = 75;
// L2  if (s >= 90) {  console.log('A')  } else if (s >= 70) {  console.log('C')  } else {  console.log('F')  }
//     75 >= 90 is false, 75 >= 70 is true: prints C. The else is skipped.
//
// L1  const t = 95;
// L2  if (t >= 70) {  console.log('C')  } else if (t >= 90) {  console.log('A')  }
//     95 >= 70 is true, so C prints and the chain ends. 95 >= 90 is never checked. 95 gets a C, not an A.

// ----------------------------------------------------------------
// ? TRACE — mark every test true or false, or skipped when JavaScript never gets to it
// ----------------------------------------------------------------
console.log('--- D1 ---');
// NEW: else if — an extra condition tested only when every condition above it was false
const score = 82;
if (score >= 90) {
  // ? 82 >= 90 → ____
  console.log('A'); // ? this block: ____
} else if (score >= 80) {
  // ? 82 >= 80 → ____
  console.log('B'); // ? this block: ____
} else if (score >= 70) {
  // ? 82 >= 70 → ____ (checked at all? yes/no: ____)   * a test that is never checked is marked skipped, not true
  console.log('C'); // ? this block: ____
} else {
  console.log('F'); // ? this block: ____
}
// ? OUTPUT: ____
console.log('--- D2 ---');
const low = 40;
if (low >= 90) {
  // ? 40 >= 90 → ____
  console.log('A'); // ? this block: ____
} else if (low >= 70) {
  // ? 40 >= 70 → ____
  console.log('C'); // ? this block: ____
} else {
  console.log('F'); // ? this block (the last resort): ____
}
// ? OUTPUT: ____
console.log('--- D3 ---');
const pts = 95;
if (pts >= 60) {
  // ? 95 >= 60 → ____
  console.log('pass'); // ? this block: ____
} else if (pts >= 90) {
  // ? 95 >= 90 → ____ (checked at all? yes/no: ____)
  console.log('top'); // ? this block: ____
} else {
  console.log('fail'); // ? this block: ____
}
// ? OUTPUT: ____
// ? MY CONFIDENCE (confident / unsure / guess): ____
//
// ? RUN and compare. In D1,  82 >= 70  is also true. Why did C not print? ____
// ? MODIFY: add a new line below D3, a copy of the chain with the two tests swapped so  pts >= 90  comes first. What does 95 print now? ____
console.log('--- D3 MODIFY ---');
if (pts >= 90) {
  console.log('top');
} else if (pts >= 60) {
  console.log('pass');
} else {
  console.log('fail');
}
// * prints top. Narrowest test first: 95 now gets the label meant for it. Same chain, only the ORDER changed.
// ? WRITE: on the line below, make  myTemp  holding any number, then an else if chain that prints  hot  for 30 or more,  warm  for 20 or more,  mild  for 10 or more and  cold  otherwise.

// ================================================================
// ! RETRIEVAL GATE - DAY 5: WHAT A METHOD HANDS BACK. From memory, BEFORE running, no looking back.
// ================================================================
// Last time  q.shift()  was written as  ['w'] . One line each: a number, a single element, or an array?
console.log('--- GATE ---');
const shelf = ['ink', 'pad', 'pen'];
const gotA = shelf.push('cup');
console.log(gotA); // ? prints: ____
const gotB = shelf.shift();
console.log(gotB); // ? prints: ____
const gotC = shelf.splice(1, 1);
console.log(gotC); // ? prints: ____
const gotD = shelf.slice(0, 1);
console.log(gotD); // ? prints: ____
console.log(shelf); // ? prints: ____
// ? MY CONFIDENCE on the  gotB  line (confident / unsure / guess): ____

// ================================================================
// ! E - CONCEPT - COMPARISON OPERATORS BUILD THE TEST
// ================================================================
// * SKILLS: comparison_operators_in_conditions
// Source: MDN Learn "conditionals": "Comparison operators are used to test the conditions inside our conditional statements."
//
// The ( ) of an if needs something that comes out true or false. The comparisons from Day 4 do exactly that:
//   ===  same value AND type      !==  not the same      <  >  <=  >=  sizes
// So every if you write is: work out the comparison first, THEN decide which block runs.
// Reminder from Day 1: ONE = inside the ( ) does not compare. It stores a value, and the if then tests THAT value:
// it runs when the stored value is truthy (x = 7) and is skipped when it is falsy (x = 0).
//
// WORKED EXAMPLE (already traced)
// L1  const level = 3
// L2  if (level !== 0) {  console.log('playing')  }
//     3 !== 0 is true, so the block runs: prints playing.

// ----------------------------------------------------------------
// ? TRACE — the comparison first (true / false), then the block (runs / skipped)
// ----------------------------------------------------------------
console.log('--- E ---');
const role = 'editor';
if (role === 'admin') {
  // ? 'editor' === 'admin' → ____
  console.log('settings page'); // ? this block: ____
}
if (role !== 'guest') {
  // ? 'editor' !== 'guest' → ____
  console.log('logout button'); // ? this block: ____
}
const stock = 0;
if (stock <= 0) {
  // ? 0 <= 0 → ____
  console.log('sold out'); // ? this block: ____
}
if (stock === '0') {
  // ? 0 === '0' → ____
  console.log('text zero'); // ? this block: ____
}
// ? OUTPUT (all lines under --- E ---, in order): ____
// ? MY CONFIDENCE on the  stock === '0'  line (confident / unsure / guess): ____
//
// ? RUN and compare. Why did the last test give the answer it did, when 0 and '0' look the same? ____
// ? MODIFY: add a new line  const stockLeft = 5  and, under it, a copy of the  sold out  if tested on stockLeft. What prints? ____
// ? WRITE: on the line below, make  myPin  holding the text '1234', then an if / else that prints  unlocked  when myPin is exactly '1234' and  locked  otherwise.

// ================================================================
// ! F - CONCEPT - TRUTHY AND FALSY: ANY VALUE CAN BE A TEST
// ================================================================
// * SKILLS: truthy_falsy
// Source: MDN Learn "conditionals": "Any value that is not false, undefined, null, 0, NaN, or an empty string ('') actually returns true when tested as a conditional statement."
//
// The ( ) does not have to hold a comparison. Put ANY value there and JavaScript decides whether it COUNTS as true.
//   A value that counts as true is TRUTHY. A value that counts as false is FALSY.
// The falsy list is short. Learn these six now, and treat everything else as truthy:
//   false   undefined   null   0   NaN   ''  (the empty string)
// This also explains the  =  bug: role = 'admin' hands back the text 'admin', and non-empty text is truthy.
// Watch the look-alikes: '0' (text holding a zero) and ' ' (text holding a space) are NOT on the list.
//
// WORKED EXAMPLE (already traced)
// L1  if (0) {  console.log('yes')  } else {  console.log('no')  }
//     0 is falsy, so the else runs: prints no.

// ----------------------------------------------------------------
// ? TRACE — write truthy or falsy for each value, then runs / skipped for the line
// ----------------------------------------------------------------
console.log('--- F ---');
if ('') {
  // ? '' → ____
  console.log('empty text'); // ? this line: ____
}
if ('0') {
  // ? '0' → ____
  console.log('text zero'); // ? this line: ____
}
if (null) {
  // ? null → ____
  console.log('null'); // ? this line: ____
}
if (' ') {
  // ? ' ' (one space) → ____
  console.log('a space'); // ? this line: ____
}
if (-1) {
  // ? -1 → ____
  console.log('minus one'); // ? this line: ____
}
if (Number('abc')) {
  // ? Number('abc') is NaN → ____
  console.log('not a number'); // ? this line: ____
}
// ? OUTPUT (all lines under --- F ---, in order): ____
// ? MY CONFIDENCE on the  '0'  line (confident / unsure / guess): ____
//
// ? RUN and compare. Which of the six values above are on the falsy list? ____
// ? MODIFY: add a new line with an if that tests  0  and prints ____, then run: does zero print? no
// ? WRITE: on the line below, an if / else on  undefined  that prints  truthy  or  falsy . Say the answer out loud BEFORE you run.

// ================================================================
// ! G - CONCEPT - A VARIABLE ON ITS OWN AS THE TEST
// ================================================================
// * SKILLS: variable_as_condition
// Source: MDN Learn "conditionals": "you can use a variable name on its own to test whether it is true, or even that it exists"
//         Codecademy "Control Flow": "you'll only check to see if the variable has been assigned a value."
//
// Because of truthy and falsy, you can put just a variable's NAME in the ( ):  if (cheese) { ... }
// It asks: does cheese hold something truthy? A declared-but-empty variable holds undefined, which is falsy.
// Python habit that breaks here: an EMPTY array  []  is falsy in Python but TRUTHY in JavaScript,
// because [] is not on the six-value list. To ask "is this array empty?", test its length:  if (cart.length === 0)
//
// WORKED EXAMPLE (already traced)
// L1  let cheese = 'Cheddar'
// L2  if (cheese) {  console.log('toast')  } else {  console.log('no toast')  }
//     'Cheddar' is non-empty text, so truthy: prints toast.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- G ---');
let username;
if (username) {
  // ? username holds ____ , which is falsy (truthy / falsy)
  console.log('logged in'); // ? this block: ____
} else {
  console.log('please log in'); // ? this block: ____
}
username = 'Mo';
if (username) {
  // ? username holds ____ , which is truthy
  console.log('logged in'); // ? this block: ____
} else {
  console.log('please log in'); // ? this block: ____
}
const basket = [];
if (basket) {
  // ? [] → ____
  console.log('basket is truthy'); // ? this line: ____
}
if (basket.length === 0) {
  // ? 0 === 0 → ____
  console.log('basket is empty'); // ? this line: ____
}
// ? OUTPUT (all lines under --- G ---, in order): ____
// ? MY CONFIDENCE on the  if (basket)  line (confident / unsure / guess): ____
//
// ? RUN and compare. Why does the second  if (username)  give a different answer from the first? ____
// ? MODIFY: add a new line  username = ''  and, under it, a copy of the  if (username)  if / else. What prints? ____

// ? WRITE: on the line below, make  myNickname  with let and no value, then an if / else on it alone that prints  has nickname  or  no nickname . Then give it a value and run the same if / else again.

// ================================================================
// ! H - CONCEPT - AN if INSIDE AN if, AND && (AND)
// ================================================================
// * SKILLS: nested_if_else, logical_operators_concept, logical_and
// Source: MDN Learn "conditionals": "It is perfectly OK to put one if...else statement inside another one — to nest them."
//         Codecademy "Control Flow": "In JavaScript, there are operators that work with boolean values known as logical operators."
//         Codecademy "Control Flow": "both conditions must evaluate to true for the entire condition to evaluate to true and execute."
//
// NESTING: an if / else can sit inside another one's { }. The inner one is only looked at when the outer
// block runs. If the outer test is false, the inner if is never even checked. (You met this on Day 1, block L.)
// LOGICAL OPERATORS combine true / false values so one test can ask two questions at once. The first is  &&
// (read "and"): the whole test is true ONLY when BOTH sides are true. It often replaces a nested if.
//   true  && true   ->  true          true  && false  ->  false
//   false && true   ->  false         false && false  ->  false
// Python habit that breaks here: the word  and  does not work. Write  && .
//
// WORKED EXAMPLE (already traced)
// L1  const sunny = true
// L2  const warm = 70 > 60
// L3  if (sunny && warm) {  console.log('beach')  }
//     true && true is true: prints beach.

// ----------------------------------------------------------------
// ? TRACE — the nested version first, then the same decision with &&
// ----------------------------------------------------------------
console.log('--- H1 ---');
const sky = 'sunny';
const heat = 90;
if (sky === 'sunny') {
  // ? 'sunny' === 'sunny' → ____
  if (heat < 86) {
    // ? 90 < 86 → ____
    console.log('go to the beach'); // ? this line: ____
  } else {
    console.log('stay in the shade'); // ? this line: ____
  }
}
// ? OUTPUT: ____
console.log('--- H2 ---');
// NEW: && — the logical AND operator: the whole test is true only when the left side AND the right side are both true
if (sky === 'sunny' && heat < 86) {
  // ? true && false → ____
  console.log('go to the beach'); // ? this block: ____
} else {
  console.log('not beach weather'); // ? this block: ____
}
console.log(true && false); // ? prints: ____
console.log(5 > 2 && 3 > 1); // ? prints: ____
// ? OUTPUT (all lines under --- H2 ---, in order): ____
// ? MY CONFIDENCE on the  true && false  line (confident / unsure / guess): ____
//
// ? RUN and compare. In H1, if  sky  were 'rainy', would the  heat < 86  test be checked at all? ____
// ? MODIFY: add a new line  const heatToday = 75  and, under it, a copy of the H2 if / else using heatToday instead of heat. What prints? ____

// ? WRITE: on the line below, make  myTicket  holding true and  myAgeNow  holding any number, then ONE if / else using && that prints  enter  only when myTicket is true AND myAgeNow is 18 or more, and  no entry  otherwise.

// ================================================================
// ! I - CONCEPT - || (OR): AT LEAST ONE SIDE TRUE
// ================================================================
// * SKILLS: logical_or
// Source: MDN Learn "conditionals": OR "allows you to chain together two or more expressions so that one or more of them have to individually evaluate to true."
//         Codecademy "Control Flow": "only one of the conditions must evaluate to true for the overall statement to evaluate to true."
//
// ||  is two vertical bars (Shift + the backslash key), read "or". The whole test is true when AT LEAST ONE side is true.
// It is false only when BOTH sides are false. Compare with && from block H, which needs both sides true.
//   true  || true   ->  true          true  || false  ->  true
//   false || true   ->  true          false || false  ->  false
// Python habit that breaks here: the word  or  does not work. Write  || .
//
// WORKED EXAMPLE (already traced)
// L1  const weekend = false
// L2  const holiday = true
// L3  if (weekend || holiday) {  console.log('sleep in')  }
//     false || true is true: prints sleep in.

// ----------------------------------------------------------------
// ? TRACE — each side first (true / false), then the whole test, then the block
// ----------------------------------------------------------------
console.log('--- I ---');
// NEW: || — the logical OR operator: the whole test is true when the left side OR the right side (or both) is true
const vanOutside = false;
const houseStatus = 'on fire';
if (vanOutside || houseStatus === 'on fire') {
  // ? false || true → ____
  console.log('leave the house'); // ? this block: ____
} else {
  console.log('stay in'); // ? this block: ____
}
const rainy = false;
const windy = false;
if (rainy || windy) {
  // ? false || false → ____
  console.log('take a coat'); // ? this block: ____
} else {
  console.log('no coat'); // ? this block: ____
}
console.log(true || false); // ? prints: ____
console.log(2 > 5 || 1 > 9); // ? prints: ____
// ? OUTPUT (all lines under --- I ---, in order): ____
// ? MY CONFIDENCE on the  2 > 5 || 1 > 9  line (confident / unsure / guess): ____
//
// ? RUN and compare. When is an || test false? ____
// * Sharper: an || test is false ONLY when BOTH sides are false (falsy). One true side is enough to make it true.
// ? MODIFY: add a new line  const windyNow = true  and, under it, a copy of the coat if / else using  rainy || windyNow . What prints? ____

// ? WRITE: on the line below, make  myDay  holding 'Sat', then ONE if / else using || that prints  weekend  when myDay is 'Sat' or 'Sun', and  weekday  otherwise.

// ================================================================
// ! J - CONCEPT - SHORT-CIRCUIT: || STOPS AS SOON AS IT KNOWS, AND HANDS BACK A VALUE
// ================================================================
// * SKILLS: or_short_circuit_check, short_circuit_assignment, short_circuit_term
// Source: Codecademy "Control Flow": "If the first condition in an || statement evaluates to true, the second condition won't even be checked."
//         Codecademy "Control Flow": "JavaScript assigns the truthy value to a variable if you use the || operator in your assignment."
//         Codecademy "Control Flow": "This concept is also referred to as short-circuit evaluation."
//
// || reads LEFT to RIGHT and stops the moment it knows the answer. If the left side is truthy, the whole thing
// is already true, so the right side is NEVER LOOKED AT. That is SHORT-CIRCUIT EVALUATION.
// Second fact: || does not just give true or false. It hands back the actual VALUE where it stopped:
//   left side truthy  ->  you get the left value          left side falsy  ->  you get the right value
// That makes || a quick way to give a DEFAULT (a fallback value):   let shown = typed || 'Stranger'
// The trap: a REAL value that happens to be falsy (0, or '') gets replaced by the default too.
// The professional fix (gap lesson 2.13): the ?? operator gives the default ONLY for null or undefined, so a real
// 0 or '' is kept. Today: recognise || defaults; from Oct 16: write ?? when 0 or '' are valid values.
//
// WORKED EXAMPLE (already traced)
// L1  const nick = ''
// L2  console.log(nick || 'Anonymous')
//     '' is falsy, so || moves on and hands back the right side: prints Anonymous.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- J1 ---');
const isLoggedIn = true;
isLoggedIn || console.log('checking the right side'); // ? left side true, so is the right side looked at? no  this line prints: nothing prints ____
const isGuest = false;
isGuest || console.log('checking the right side'); // ? left side false, so is the right side looked at? yes  this line prints: ____
// ? OUTPUT (all lines under --- J1 ---, in order): ____
console.log('--- J2 ---');
let typedName = '';
let shownName = typedName || 'Stranger';
console.log(shownName); // ? '' is ____ , so || hands back: ____
typedName = 'Mo';
shownName = typedName || 'Stranger';
console.log(shownName); // ? 'Mo' is ____ , so || hands back: ____
const itemsInCart = 0;
const shownCount = itemsInCart || 10;
console.log(shownCount); // ? prints: ____
// ? MY CONFIDENCE on the  shownCount  line (confident / unsure / guess): ____
//
// ? RUN and compare. The cart really has 0 items. Why did the  shownCount  line print what it did? ____
// ? MODIFY: add a new line  const itemsNow = 3  and, under it,  console.log(itemsNow || 10) . What prints? ____

// ? WRITE: on the line below, make  myColor  holding '' (empty), then make  myTheme  that is myColor OR 'dark' using ||, and print myTheme.

// ================================================================
// ! K - CONCEPT - ! (NOT): FLIP IT
// ================================================================
// * SKILLS: logical_not
// Source: MDN Learn "conditionals": NOT "can be used to negate an expression."
//         Codecademy "Control Flow": "The ! not operator reverses, or negates, the value of a boolean."
//
// ! (an exclamation mark) goes IN FRONT of a value and flips it: truthy becomes false, falsy becomes true.
// To NEGATE is to turn into the opposite. Common use: "if there is NO error message":  if (!errorMessage)
// It is a different thing from  !==  (Day 4), which compares two values. A lone ! has nothing on its left.
// Python habit that breaks here: the word  not  does not work. Write  ! .
//
// WORKED EXAMPLE (already traced)
// L1  const open = true
// L2  console.log(!open)
//     open is true, ! flips it: prints false.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- K ---');
// NEW: ! — the logical NOT operator: put in front of a value, it gives the opposite: false for truthy, true for falsy
const excited = true;
console.log(!excited); // ? prints: ____
console.log(!false); // ? prints: ____
console.log(!0); // ? 0 is ____ , so !0 prints: true
console.log(!'hello'); // ? 'hello' is ____ , so it prints: false
const errorMessage = '';
if (!errorMessage) {
  // ? errorMessage is '' (falsy), so !errorMessage → ____
  console.log('no errors'); // ? this block: ____
}
// ? OUTPUT (all lines under --- K ---, in order): ____
// ? MY CONFIDENCE on the  !0  line (confident / unsure / guess): ____
//
// ? RUN and compare. Read  if (!errorMessage)  out loud as a sentence in plain English: ____
// * That describes what ! DOES. As a sentence it reads: "if there is NO error message". Reading ! as "no" or
// *   "not" in a sentence is how you will read it in real code:  if (!user)  = "if there is no user".
// ? MODIFY: add a new line  const errorNow = 'disk full'  and, under it, a copy of the  no errors  if tested on  !errorNow . What prints? ____

// ? WRITE: on the line below, make  myDone  holding false, then an if that prints  keep going  when myDone is NOT true, using ! .

// ================================================================
// ! L - CONCEPT - COMBINING && || ! WITH ( ), AND THE INCOMPLETE || MISTAKE
// ================================================================
// * SKILLS: combining_logical_operators, or_common_mistake
// Source: MDN Learn "conditionals": "You can combine as many logical statements together as you want, in whatever structure."
//         MDN Learn "conditionals": "you've got to specify a complete test on either side of each OR operator"
//
// You can mix && || ! in one test. Use ( ) to group, exactly as in maths (Day 4): the ( ) decide what belongs together.
// But && and || can SKIP a whole ( ) group: in  false && (anything) , the ( ) part never runs at all.
// THE MISTAKE: to ask "is x 5 or 7?" you might write  x === 5 || 7 . JavaScript reads it as  (x === 5) || 7 .
// If x is not 5, || moves on to the right side, which is just  7  on its own: a non-zero number, so TRUTHY.
// The test is then true for EVERY x. Node gives no error, but ESLint now flags it (no-constant-binary-expression).
// Write a complete test on each side:  x === 5 || x === 7
//
// WORKED EXAMPLE (already traced)
// L1  const a = true, b = false, c = true
// L2  if ((a || b) && c) {  console.log('yes')  }
//     ( ) first: true || false is true. Then true && true is true: prints yes.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- L1 ---');
const fire = true;
const hasKeys = true;
const vanHere = false;
if ((vanHere || fire) && hasKeys) {
  // ? ( ) first: false || true → ____
  console.log('grab keys and go'); // ? this block: ____
}
if (!(vanHere || fire)) {
  // ? ( ) first: true , then ! flips it → ____
  console.log('stay in'); // ? this block: ____
}
// ? OUTPUT: ____
console.log('--- L2 ---');
const pick = 4;
if (pick === 5 || 7) {
  // ? 4 === 5 → ____ (truthy / falsy)
  console.log('matched'); // ? this block: ____
} else {
  console.log('no match'); // ? this block: ____
}
if (pick === 5 || pick === 7) {
  // ? 4 === 5 → ____
  console.log('matched'); // ? this block: ____
} else {
  console.log('no match'); // ? this block: ____
}
// ? OUTPUT: ____
// ? MY CONFIDENCE on the first L2 test,  pick === 5 || 7  (confident / unsure / guess): ____
//
// ? RUN and compare. pick is 4. Why did the first L2 test say what it did? ____
// ? MODIFY: add a new line  const pickNow = 7  and, under it, a copy of the CORRECT test (the second one) using pickNow. What prints? ____

// ? WRITE: on the line below, make  myFruit  holding 'kiwi', then ONE if / else that prints  tropical  when myFruit is 'kiwi' or 'mango' (a complete test on each side) and  local  otherwise.

// ================================================================
// ! M - CONCEPT - switch: ONE VALUE, MANY EXACT CHOICES, AND break
// ================================================================
// * SKILLS: switch_when_to_use, switch_syntax, switch_break
// Source: MDN Learn "conditionals": switches "take a single expression/value as an input, and then look through several choices until they find one that matches that value"
//         Codecademy "Control Flow": "The switch keyword initiates the statement and is followed by ( ... ), which contains the value that each case will compare."
//         Codecademy "Control Flow": "The break keyword tells the computer to exit the block and not execute any more code or check any other cases"
//
// When ONE value is compared against a long list of EXACT options, an else if chain repeats itself:
//   if (fruit === 'kiwi') ... else if (fruit === 'lime') ... else if (fruit === 'fig') ...
// A SWITCH statement is built for that. The pieces, in order:
//   switch (value) { ... }   the value being tested goes in the ( ); the { } wraps all the choices
//   case choice:             a possible value, then a COLON. Its lines run when value === choice (STRICT, like ===)
//   break                    "leave the switch NOW": jump to the first line after the closing }
// RULE OF THUMB: switch for one value against exact options; if / else if for RANGES like score >= 90 (block D).
// Python: older Python has no switch at all (3.10 added match, which works differently). This is new.
//
// WORKED EXAMPLE (already traced)
// L1  const size = 'M'
// L2  switch (size) {  case 'S': console.log('small'); break;  case 'M': console.log('medium'); break;  }
//     'M' === 'S' is false, skip. 'M' === 'M' is true: prints medium, then break leaves the switch.

// ----------------------------------------------------------------
// ? TRACE — for each case: does it match (yes / no / not checked)? then runs / skipped for each line
// ----------------------------------------------------------------
console.log('--- M ---');
// NEW: switch — compares one value against a list of case choices and runs the lines of the first one that matches
// NEW: case — one choice inside a switch: case, a value, a colon; its lines run when the switch value === that choice
// NEW: break — leaves the switch at once and carries on after its closing }
const groceryItem = 'papaya';
switch (groceryItem) {
  case 'tomato':
    // ? 'papaya' === 'tomato'? ____
    console.log('Tomatoes are $0.49'); // ? this line: ____
    break;
  case 'papaya':
    // ? 'papaya' === 'papaya'? ____
    console.log('Papayas are $1.29'); // ? this line: ____
    break;
  case 'lime':
    // ? checked at all? ____
    console.log('Limes are $1.49'); // ? this line: ____
    break;
}
console.log('Thanks for shopping'); // ? this line (after the switch): ____
// ? OUTPUT (all lines under --- M ---, in order): ____
// ? MY CONFIDENCE on the  lime  case line (confident / unsure / guess): ____
//
// ? RUN and compare. After 'Papayas are $1.29' printed, what did  break  do? ____
// ? MODIFY: add a new line  const groceryNow = 'lime'  and, under it, a copy of the whole switch using groceryNow. What prints? ____

// ? WRITE: on the line below, make  mySize  holding 'L', then a switch with cases 'S', 'M' and 'L' that print  small ,  medium ,  large , each case ending with break.

// ================================================================
// ! N - CONCEPT - FORGETTING break (FALL-THROUGH), AND default
// ================================================================
// * SKILLS: switch_fallthrough, switch_default
// Source: Codecademy "Control Flow": "Without break keywords, the first matching case will run, but so will every subsequent case"
//         MDN Learn "conditionals": "This is the default option that runs if none of the choices match."
//         Google JavaScript Style Guide 5.8.3.2: "Each switch statement includes a default statement group, even if it contains no code."
//
// FALL-THROUGH: leave out break and, once a case matches, its lines run AND every case below it runs too,
// whether those cases match or not. Node gives no error; ESLint now flags it (no-fallthrough). Forgetting a break is one of
// DEFAULT: default: marks the lines that run when NO case matched. By convention it goes last (MDN: the language allows it
// (nothing comes after it). Without one, an unmatched value runs nothing in the switch.
// THE PROFESSIONAL RULES (Google's style guide, the one the instructor shared on Oct 1; Google no longer updates it, but these two rules
// are also enforced by ESLint: no-fallthrough is in the recommended set, default-case is an optional rule Airbnb turns on):
//   1. every switch has a default, even an empty one (5.8.3.2)
//   2. every case ends with break, OR carries a comment saying the fall-through is on purpose (5.8.3.1)
// One more trap: case compares with STRICT equality, so the text '1' never matches the number 1 (block E's idea).
//
// WORKED EXAMPLE (already traced)
// L1  const coin = 'gold'
// L2  switch (coin) {  case 'silver': console.log('5'); break;  default: console.log('unknown coin')  }
//     'gold' matches no case, so default runs: prints unknown coin.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- N1 ---');
const level = 1;
switch (level) {
  case 1:
    // ? 1 === 1? ____
    console.log('one'); // ? this line: ____
  case 2:
    // ? 1 === 2? ____
    console.log('two'); // ? this line: ____
  case 3:
    console.log('three'); // ? this line: ____
}
// ? OUTPUT: ____
console.log('--- N2 ---');
// NEW: default — the last part of a switch: its lines run when no case matched
const fruitPick = 'kiwi';
switch (fruitPick) {
  case 'tomato':
    console.log('Tomatoes are $0.49'); // ? this line: ____
    break;
  case 'papaya':
    console.log('Papayas are $1.29'); // ? this line: ____
    break;
  default:
    console.log('Invalid item'); // ? this line: ____
}
console.log('--- N3 ---');
const choiceText = '1';
switch (choiceText) {
  case 1:
    // ? '1' === 1? ____
    console.log('matched the number 1'); // ? this line: ____
    break;
  default:
    console.log('no match'); // ? this line: ____
}
// ? OUTPUT (N2 then N3): ____
// ? MY CONFIDENCE on the N1 output (confident / unsure / guess): ____
//
// ? RUN and compare. In N1 only  case 1  matched. Why did more than one line print? ____
// ? MODIFY: add a new line  const levelNow = 2  and, under it, a copy of the N1 switch using levelNow, with  break  added after EVERY console.log. What prints? ____
// ? WRITE: on the line below, make  myAnimal  holding 'cat', then a switch with cases 'dog' (prints woof) and 'cow' (prints moo), each with break, and a default that prints  unknown animal . Predict what prints before you run.

// ================================================================
// ! O - CONCEPT - THE TERNARY: A ONE-LINE TWO-WAY CHOICE THAT GIVES A VALUE
// ================================================================
// * SKILLS: ternary_operator, ternary_runs_code
// Source: MDN Learn "conditionals": it "tests a condition and returns one value/expression if it is true, and another if it is false"
//         Codecademy "Control Flow": "Two expressions follow the ? and are separated by a colon :."
//         MDN Learn "conditionals": "The ternary operator is not just for setting variable values; you can also run functions, or lines of code — anything you like."
//         ESLint rule "no-unused-expressions" (an optional rule, on in Airbnb's and typescript-eslint's recommended setups): with its
//         default option (allowTernary: false) it reports a ternary used as a statement (a ? b() : c())
//
// The TERNARY OPERATOR is a compact if / else that PRODUCES A VALUE. Shape:   condition ? valueIfTrue : valueIfFalse
//   ?  comes after the condition       :  separates the two possible results
// The condition is worked out first (truthy / falsy, block F). True: you get the value before the : . False: the one after.
// Its real job is choosing a VALUE:  const label = age >= 18 ? 'adult' : 'minor'
// RUNNING CODE with it: MDN shows you CAN write  isNight ? console.log('on') : console.log('off')  as a line on its own.
//   Recognise it when you read it, but do not write it. ESLint, the very widely used JavaScript checker, reports it when the
//   no-unused-expressions rule is on (it is not in the recommended set this folder uses, so YOUR editor stays quiet here).
//   When each side DOES something, write an if / else.
// Keep ternaries for simple two-way choices of a value. Anything longer: if / else.
// Python habit that breaks here: Python writes  a if cond else b . JavaScript puts the condition FIRST:  cond ? a : b
//
// WORKED EXAMPLE (already traced)
// L1  const tempNow = 5
// L2  const wear = tempNow < 10 ? 'coat' : 't-shirt'
//     5 < 10 is true, so wear gets the value before the colon: 'coat'.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- O ---');
// NEW: ? : — the ternary operator: condition ? valueIfTrue : valueIfFalse gives back one of the two values
const isBirthday = true;
const greeting = isBirthday ? 'Happy birthday!' : 'Good morning.';
console.log(greeting); // ? isBirthday is ____ , so greeting gets: ____
const points = 40;
const result = points >= 50 ? 'pass' : 'fail';
console.log(result); // ? 40 >= 50 → ____
const guestCount = 0;
console.log(guestCount ? 'party' : 'quiet night'); // ? 0 is ____ , so this prints: quiet night
const isNightTime = false;
isNightTime
  ? console.log('Turn on the lights!')
  : console.log('Turn off the lights!'); // ? this line prints: ____
// ? OUTPUT (all lines under --- O ---, in order): ____
// ? MY CONFIDENCE on the  guestCount  line (confident / unsure / guess): ____
//
// ? RUN and compare. The last line works. Why should you write it as an if / else instead in your own code? ____
// ? MODIFY: add a new line  const pointsNow = 75  and, under it, a copy of the  result  line and its console.log using pointsNow. What prints? ____

// ? WRITE: on the line below, make  myScore  holding any number, then  myGrade  that is 'A' when myScore is 90 or more and 'B' otherwise, using a ternary. Print myGrade.

// ================================================================
// ! P - CONCEPT - REFACTORING, AND A PREVIEW: A FUNCTION THAT TAKES INPUTS
// ================================================================
// * SKILLS: refactor_term, function_parameters_preview
// Source: Codecademy "Control Flow": "Refactor, or edit, the first if...else block to use a ternary operator."
//         MDN Learn "conditionals": update is a function "which takes two colors as parameters (inputs)."
//
// To REFACTOR is to rewrite code so it reads better WITHOUT changing what it does. The output before and after
// must be identical: that is how you know the refactor is safe. Turning an if / else that only picks a VALUE
// into a ternary is a classic small refactor.
//
// PREVIEW (read only, no code to run): MDN's ternary example calls a function named update:
//   theme === 'black' ? update('black', 'white') : update('white', 'black')
// update is a FUNCTION (Day 1: a named, reusable block of code). The values inside the ( ) of a CALL are its ARGUMENTS:
// the inputs it receives. (The names a function gives its inputs when it is DEFINED are its PARAMETERS: Day 8.)
// take parameters on Day 8; for now, only recognise the shape  name(input1, input2) .
// (You already pass inputs this way:  console.log('a', 'b')  hands two values to log.)
//
// WORKED EXAMPLE (already traced)
// BEFORE:  let msg;  if (isLocked) { msg = 'need a key' } else { msg = 'no key needed' }
// AFTER:   const msg = isLocked ? 'need a key' : 'no key needed'
//          Same value in msg either way: a refactor. Shorter, and msg can now be const.

// ----------------------------------------------------------------
// ? TRACE — the BEFORE and AFTER versions must print the same thing
// ----------------------------------------------------------------
console.log('--- P ---');
const isLocked = false;
let doorNote;
if (isLocked) {
  doorNote = 'You will need a key.';
} else {
  doorNote = 'You will not need a key.';
}
console.log(doorNote); // ? BEFORE prints: ____
const doorNote2 = isLocked
  ? 'You will need a key.'
  : 'You will not need a key.';
console.log(doorNote2); // ? AFTER prints: ____
// ? Is this a refactor (same output)? ____
// ? MY CONFIDENCE (confident / unsure / guess): ____
//
// ? PREVIEW CHECK (read the comment above, no running): ____
// * update: right, a function. 'white' and 'black' are NOT properties: they are the INPUTS handed to the
// *   function when it is called (they are the call's ARGUMENTS; the names a function gives its inputs when it is DEFINED are its PARAMETERS). A property is a fact stored ON a value
// *   (Day 3: word.length, dog.name). Inputs go INSIDE the ( ) of a call. Day 8 teaches this in full.
// ? RUN and compare. Why could  doorNote2  be a const when  doorNote  had to be a let? ____
// * Not quite: it never equals isLocked (that is true/false, doorNote2 is text). The reason: doorNote was
// *   made EMPTY first and given its value LATER, inside the if or the else, so it had to be reassignable (let).
// *   doorNote2 gets its value on the SAME line it is made, from the ternary, and never changes, so const works.
// *   That is a common reason to refactor to a ternary: the variable can become const.
// ? MODIFY: add a new line  const isLockedNow = true  and, under it, a copy of the AFTER line and its console.log using isLockedNow. What prints? ____
// ? WRITE: refactor this into ONE ternary line, then print it. Run before and after to check the output is the same:
// let myMsg;  if (myScore >= 50) { myMsg = 'well done' } else { myMsg = 'try again' }

// ################################################################
// ! DAY 7 of 19 — LOOPS (§7.1, 28 skills) · blocks 7A-7L, labels print as  --- 7A ---  so they never clash with Day 6
// ! Sources: MDN Learn "Looping code" · Codecademy "Loops" · MDN Reference "for", "for...of"
// ! Written after the JS audit checked §7.1 (progress/audit/S3a_days7-9/VERIFIED.md): its corrections are built in.
// ################################################################

// ================================================================
// ! RETRIEVAL GATE - DAY 6. From memory, BEFORE running, no looking back.
// ================================================================
console.log('--- GATE 7 ---');
const gateList = [];
if (gateList) {
  console.log('the empty array counted as true'); // ? this line: ____
}
if (gateList.length === 0) {
  console.log('the array is empty'); // ? this line: ____
}
const gateText = '0';
const gateLabel = gateText ? 'truthy' : 'falsy';
console.log(gateLabel); // ? prints: ____
// ? MY CONFIDENCE on the first line (confident / unsure / guess): ____

// ================================================================
// ! 7A - CONCEPT - WHY LOOPS: THE SAME JOB, OVER AND OVER
// ================================================================
// * SKILLS: loops_purpose, iteration_term, loop_vs_repetition
// Source: MDN Learn "Looping code": "Loops are all about doing the same thing over and over again."
//         Codecademy "Loops": "iterate simply means 'to repeat'."
//         MDN Learn "Looping code": "The amount of code needed would be the same whether we were drawing 100 circles, 1000, or 10,000."
//
// A LOOP runs the same block of code again and again, usually with a slightly different value each time.
// One full run through the loop's body is called an ITERATION (to iterate = to repeat).
// Why it matters: without a loop, the amount of code grows with the amount of work. Greeting 3 guests by hand
// takes 3 lines; greeting 3,000 takes 3,000. A loop stays the same size whatever the count.
// You met one loop on Day 1: for...of. Today it gets its full lesson (7B), then three more kinds.
//
// WORKED EXAMPLE (already traced)
// L1  const pets = ['Rex', 'Mia'];
// L2  for (const pet of pets) {  console.log(pet);  }
//     2 items, so 2 iterations: prints Rex, then Mia.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- 7A ---');
console.log('Hello Ada');
console.log('Hello Grace');
console.log('Hello Linus');
const guests = ['Ada', 'Grace', 'Linus'];
for (const guest of guests) {
  console.log(`Hello ${guest}`); // ? this line runs ____ times in total (once per ITERATION)
}
// ? OUTPUT (all lines under --- 7A ---, in order): ____
// ? How many ITERATIONS did the loop do? ____
// ? MY CONFIDENCE (confident / unsure / guess): ____
//
// ? RUN and compare. The by-hand part and the loop printed the same three lines. If there were 1,000 guests,
// ?   how many lines would the by-hand version need, and how many would the loop need? ____
// ? MODIFY: add a new line  const moreGuests = ['Ada', 'Grace', 'Linus', 'Alan', 'Joan'];  and under it a copy of the loop that uses  moreGuests  and the loop variable  moreGuest  (new names, so nothing is declared twice).
// ? WRITE: on the lines below, make  myFoods  holding four foods, then a for...of loop with the loop variable myFood  that prints  I like <food>  for each one.

// ================================================================
// ! 7B - CONCEPT - for...of: ONE ROUND PER ITEM OF A COLLECTION
// ================================================================
// * SKILLS: collections_concept, for_of_loop, for_of_steps
// Source: MDN Learn "Looping code": "The basic tool for looping through a collection is the for...of loop."
//         MDN Learn "Looping code": "Get the next item, and repeat (2) until you've reached the end of the collection."
//         MDN Reference "for...of": it loops over "a sequence of values sourced from an iterable object" (arrays,
//         strings and more)
//
// A COLLECTION is a value that holds a group of other values. An array is one kind. JavaScript also has
// collections called Set and Map; this block does not cover them.
// The shape:   for (const item of collection) { body }
//   for       starts the loop
//   of        connects the item's name (left) to the collection (right)
//   { }       the body: runs once per item
// The steps, every time:
//   1. take the FIRST item and put it in the name   2. run the body with it
//   3. take the NEXT item and repeat step 2, until there are no items left. Then carry on after the closing }.
// const is fine for the item's name: each iteration makes a FRESH one, so nothing is ever reassigned.
// for...of is not only for arrays: anything ITERABLE works. A string is iterable, one character per round.
// Python habit that breaks here: Python's  for x in items  is  for (const x of items)  here, with OF.
//   JavaScript also has a for...in loop, but it gives you the KEYS (index numbers as text), not the items.
//
// WORKED EXAMPLE (already traced)
// L1  const nums = [4, 9];
// L2  for (const n of nums) {  console.log(n * 10);  }
//     round 1: n holds 4, prints 40. round 2: n holds 9, prints 90. No items left: the loop ends.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. One word each: true / false / runs / skipped, then OUTPUT.
// ----------------------------------------------------------------
console.log('--- 7B ---');
const cats = ['Leopard', 'Serval', 'Jaguar'];
for (const cat of cats) {
  console.log(cat);
}
// ? round 1: cat holds ____ , prints ____
// ? round 2: cat holds ____ , prints ____
// ? round 3: cat holds ____ , prints ____
// ? is there a round 4? (yes / no, and why): ____
console.log('after the loop'); // ? this line runs ____ time(s): before, during or after the rounds? after
const shortWord = 'hey';
for (const letter of shortWord) {
  console.log(letter); // ? this line runs ____ times, printing: h, e, y
}
// ? OUTPUT (all lines under --- 7B ---, in order): ____
// ? MY CONFIDENCE on the  shortWord  loop (confident / unsure / guess): ____
//
// ? RUN and compare. Why did  after the loop  print only once, and only after Jaguar? ____
// ? MODIFY: add a new line  const bigCats = ['Lion', 'Tiger'];  and under it a copy of the first loop using
// ?   bigCats  and the loop variable  bigCat . What prints? ____
// ? WRITE: on the lines below, make  myWord  holding any word, then a for...of loop with the loop variable  myChar that prints each character on its own line, then ONE line after the loop that prints  done .

// ================================================================
// ! 7C - CONCEPT - THE CLASSIC for LOOP: A COUNTER WITH THREE PARTS
// ================================================================
// * SKILLS: for_loop_syntax, iterator_variable, for_initializer_counter, for_condition, for_final_expression
// Source: MDN Learn "Looping code": "Inside the parentheses we have three items, separated by semicolons."
//         Codecademy "Loops": "The typical for loop includes an iterator variable that usually appears in all three expressions."
//         MDN Learn "Looping code": the final-expression "is always evaluated (or run) each time the loop has gone through a full iteration."
//
// Use the classic for loop to run code a SET NUMBER OF TIMES, or when you need a position number (7E).
// The shape:   for (initializer; condition; final-expression) { body }   three parts, separated by ;
//   1. INITIALIZER        runs ONCE, before anything else. Usually makes the counter:  let i = 1
//   2. CONDITION          checked BEFORE every round. true: the body runs. false: the loop ends.  i < 4
//   3. FINAL-EXPRESSION   runs AFTER every round, usually moving the counter on:  i++
// The counter is called the ITERATOR VARIABLE: it appears in all three parts.
// The order, every time:  initializer once → check → body → final-expression → check → body → ... → check is false → end.
// (Each round actually gets its own fresh copy of i, carrying the value forward. It matters on Day 10, closures.)
// Python habit that breaks here:  for i in range(1, 4):  is  for (let i = 1; i < 4; i++)  here. Both stop BEFORE 4.
//
// WORKED EXAMPLE (already traced)
// L1  for (let i = 0; i < 2; i++) {  console.log(i);  }
//     let i = 0 runs once. 0 < 2 true: prints 0, then i++ makes 1. 1 < 2 true: prints 1, then i is 2.
//     2 < 2 false: the loop ends. The body ran 2 times.

// ----------------------------------------------------------------
// ? TRACE — follow i round by round. Fill every blank BEFORE running
// ----------------------------------------------------------------
console.log('--- 7C ---');
// NEW: classic for (;;) — a loop with three parts in its ( ): initializer (runs once), condition (checked before each round), final-expression (runs after each round)
for (let i = 1; i < 4; i++) {
  console.log(i);
}
// ? before round 1:  let i = 1  runs ONCE → ____
// ? round 1: 1 < 4 → true , body prints ____ , then i++ makes i 2
// ? round 2: 2 < 4 → true , body prints ____ , then i++ makes i 3
// ? round 3: 3 < 4 → true , body prints ____ , then i++ makes i 4
// ? check:   4 < 4 → false , so the loop ends. The body ran ____ times.
for (let n = 0; n < 10; n += 3) {
  console.log(n); // ? the values printed, in order: ____
}
// ? (n += 3 is the final-expression here: the counter can move by any amount)
// ? MY CONFIDENCE on the  n  loop (confident / unsure / guess): ____
//
// ? RUN and compare. In the first loop, i ended at 4 but 4 was never printed. Why? ____
// ? MODIFY: add a new line with a copy of the first loop, using the counter  k  instead of i and  k <= 4  as the condition. What prints, and how many rounds? ____

// ? WRITE: on the lines below, a classic for loop with the counter  myStep  that prints 2, 4, 6, 8, 10
// ?   (choose the initializer, condition and final-expression yourself).

// ================================================================
// ! 7D - CONCEPT - THE COUNTER MUST BE let, NOT const
// ================================================================
// * SKILLS: for_counter_uses_let
// Source: MDN Learn "Looping code": "we have to use let for the counter, because we're incrementing it with i++ (which is a reassignment) each time we go round."
//
// The final-expression  i++  gives the counter a NEW value after every round. That is a REASSIGNMENT (Day 3),
// and a const cannot be reassigned. So a classic for loop's counter must be  let .
// With const, the first round runs fine. The crash comes at the first  i++ , AFTER the body has run once.
// Compare 7B: for...of uses const happily, because each round makes a fresh name and nothing is reassigned.
//
// The broken program lives in its own file so it cannot stop THIS file. Restated:
// PROGRAM (file week-4/day7_errors/c1.js)
// L1  for (const i = 0; i < 3; i++) {
// L2    console.log(i);
// L3  }
// L4  console.log('after');

// ----------------------------------------------------------------
// ? TRACE — fill BEFORE running the broken file
// ----------------------------------------------------------------
// ? Does anything print before the error? ____
// ? Error KIND (syntax / runtime / logic): ____
// ? Does  after  print? ____
// ? MY CONFIDENCE on the KIND (confident / unsure / guess): ____
// ? RUN it from the bootcamp folder:   node week-4/day7_errors/c1.js
// ? Where did your trace differ from the terminal? ____
//
// ? MODIFY: open the REAL file week-4/day7_errors/c1.js, change  const  to  let  on line 1, save, run it again.
// ?   What prints now? ____
console.log('--- 7D ---');
// ? WRITE: on the lines below, a classic for loop with the counter  lap  (made with let) that prints
// ?   lap 1 , lap 2 , lap 3  using a template literal.

// ================================================================
// ! 7E - CONCEPT - LOOPING THROUGH AN ARRAY BY POSITION, AND THE LAST ITEM
// ================================================================
// * SKILLS: for_loop_array_index, array_last_item, i_naming_convention
// Source: Codecademy "Loops": "To loop through each element in an array, a for loop should use the array's .length property in its condition."
//         MDN Learn "Looping code": "we're starting i at 0, and stopping when i reaches the length of the array."
//         Codecademy "Loops": "the index of the last element of an array is equivalent to the length of that array minus 1."
//
// To visit every element BY POSITION: start the counter at 0 (the first index, Day 3) and stop BEFORE .length.
//   for (let i = 0; i < arr.length; i++) {  ... arr[i] ...  }
// Inside the body, arr[i] is the element at the current position.
// With 3 elements, .length is 3, so i takes 0, 1, 2: exactly the three valid indexes.
// Why the name i? It is short for INDEX. Any name works, but every programmer expects i (and j for a second one, 7G).
// The LAST element is at  arr.length - 1 , because counting starts at 0.
// Python habit that breaks here: Python's arr[-1] gives undefined in JavaScript (Day 5). Use arr[arr.length - 1].
//   (Newer JavaScript also has arr.at(-1), which works like Python's [-1]. It comes with the array methods on Day 12.)
//
// WORKED EXAMPLE (already traced)
// L1  const days = ['Mon', 'Tue'];
// L2  for (let i = 0; i < days.length; i++) {  console.log(`${i}: ${days[i]}`);  }
//     .length is 2. i = 0: prints 0: Mon. i = 1: prints 1: Tue. i = 2: 2 < 2 is false, the loop ends.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. One word each: true / false / runs / skipped, then OUTPUT.
// ----------------------------------------------------------------
console.log('--- 7E ---');
const planets = ['Mercury', 'Venus', 'Earth'];
for (let i = 0; i < planets.length; i++) {
  console.log(`${i}: ${planets[i]}`);
}
// ? planets.length is ____ , so the condition is  i < 3
// ? round 1: i is ____ , planets[i] is ____ , prints ____
// ? round 2: i is ____ , planets[i] is ____ , prints ____
// ? round 3: i is ____ , planets[i] is ____ , prints ____
// ? check: i is ____ , 3 < 3 → false , the loop ends
console.log(planets[planets.length - 1]); // ? planets.length - 1 is ____ , so this prints: Earth
console.log(planets[-1]); // ? prints: ____
// ? OUTPUT (write it LAST, by reading your marks above top to bottom): ____
// ? MY CONFIDENCE on the  planets[-1]  line (confident / unsure / guess): ____
//
// ? RUN and compare. Why does the condition use  <  and not  <= ? ____
// ? MODIFY: add a new line  const morePlanets = ['Mars', 'Jupiter', 'Saturn', 'Uranus'];  and under it a copy of the loop
// ?   that uses  morePlanets  (keep i as the counter: each loop's i lives only inside its own loop). How many rounds now,
// ?   and did you have to change the number in the condition? ____

// ? WRITE: on the lines below, make  myScores  holding four numbers, then a classic for loop that prints
// ?   score 0 is <value> , score 1 is <value> ... for each one, then ONE line after the loop that prints the LAST score
// ?   using .length.


// ================================================================
// ! 7F - CONCEPT - OFF-BY-ONE BUGS, AND WHEN YOU REALLY NEED THE INDEX
// ================================================================
// * SKILLS: for_index_bugs, for_when_index_needed
// Source: MDN Learn "Looping code": "For reasons like this, it's usually best to use for...of if you can."
//         MDN Learn "Looping code": "to do this we need to know when we are on the final loop iteration, and to do that we can use a for loop."
//
// An OFF-BY-ONE bug: the loop runs one time too many or one time too few. The usual cause is  <=  where  <  belongs.
// With  i <= arr.length , i reaches .length itself, and arr[.length] does not exist: it gives undefined. No error appears
// (Node is silent, and so is ESLint), just a wrong extra line. Starting at 1 instead of 0 silently skips the first item.
// for...of has no counter, so there is nothing to get wrong. MDN's advice: use for...of when you can.
// When you DO need the position: for example to treat the LAST item differently. for...of does not hand you the position
// on its own, so the classic for loop is the simple tool. (There is a way to get it with for...of too:
// for (const [i, item] of arr.entries()) . It needs a technique taught on Day 15, so for now: classic for.)
// += on a string adds text onto the end of it (Day 4): label += 'x' means label = label + 'x'.
//
// WORKED EXAMPLE (already traced)
// L1  const two = ['a', 'b'];
// L2  for (let i = 0; i <= two.length; i++) {  console.log(two[i]);  }
//     <= lets i reach 2. Prints a, b, then undefined (two[2] does not exist). One round too many.

// ----------------------------------------------------------------
// ? TRACE — two loops: the off-by-one bug, then the last-item sentence
// ----------------------------------------------------------------
console.log('--- 7F1 ---');
const colorList = ['red', 'green', 'blue'];
for (let i = 0; i <= colorList.length; i++) {
  console.log(colorList[i]); // ? this line runs ____ times, printing: red, green, blue, undefined
}
// ? Which round is the extra one, and what is i in that round? ____
console.log('--- 7F2 ---');
const catNames = ['Pete', 'Biggles', 'Jasmine'];
let catSentence = 'My cats are called ';
for (let i = 0; i < catNames.length; i++) {
  if (i === catNames.length - 1) {
    catSentence += `and ${catNames[i]}.`; // ? runs in round(s): ____
  } else {
    catSentence += `${catNames[i]}, `; // ? runs in round(s): ____
  }
}
console.log(catSentence); // ? prints: ____
// ? MY CONFIDENCE on the 7F2 sentence (confident / unsure / guess): ____
//
// ? RUN and compare. In 7F1, did Node show an error for the extra round? ____
// ? MODIFY: add a new line  const moreColors = ['cyan', 'magenta'];  and under it a copy of the 7F1 loop that uses
// ?   moreColors  but with the bug FIXED. What prints, and how many rounds? ____
// ? WRITE: on the lines below, make  myNames  holding four names and  myList  starting as 'Team: ' , then a classic for
// ?   loop that builds  Team: Ana, Bo, Cy and Dee  (the last name gets 'and ' before it and no comma after), then print myList.
// ================================================================
// ! 7G - CONCEPT - A LOOP INSIDE A LOOP
// ================================================================
// * SKILLS: nested_loops
// Source: Codecademy "Loops": "For each round of the outer for loop, the inner for loop will run completely."
//
// A NESTED loop is a loop inside another loop's body. For EACH round of the outer loop, the inner loop runs ALL of its
// rounds, start to finish. So an outer loop of 2 rounds around an inner loop of 3 rounds runs the inner body 2 × 3 = 6 times.
// Give the inner counter its own name (by convention j after i) so the body can use BOTH positions. (Reusing i would
// not crash: the inner i would just hide the outer one, and you could no longer read it.)
// A common real use: comparing every item of one array with every item of another.
//
// WORKED EXAMPLE (already traced)
// L1  for (let a = 1; a <= 2; a++) {  for (let b = 1; b <= 2; b++) {  console.log(`${a}-${b}`);  }  }
//     a = 1: b runs 1, 2 → 1-1, 1-2.  a = 2: b runs 1, 2 again → 2-1, 2-2.  The inner body ran 4 times.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- 7G1 ---');
for (let row = 1; row <= 2; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log(`${row}-${col}`);
  }
}
// ? outer round 1 (row is 1): the inner loop prints ____, 1-2, 1-3
// ? outer round 2 (row is 2): the inner loop prints ____, 2-2, 2-3
// ? the inner body ran ____ times in total
console.log('--- 7G2 ---');
const listA = [6, 19, 20];
const listB = [19, 81, 2];
for (let i = 0; i < listA.length; i++) {
  for (let j = 0; j < listB.length; j++) {
    if (listA[i] === listB[j]) {
      console.log(`Both lists have ${listB[j]}`); // ? runs when i is 19 and j is ____ , printing: ____
    }
  }
}
// ? How many times was the  ===  test checked in total? normally i would say 9, but from reading the code, ____ times
// * Two corrections. (1) i and j are POSITIONS, not values: the match happens when i is 1 (listA[1] is 19) and j is 0
// *   (listB[0] is 19). (2) Your first instinct was right: 9. The inner loop runs ALL 3 rounds for EACH of the 3 outer
// *   rounds, and nothing stops it early (no break), so the test runs 3 × 3 = 9 times, match or not.
// ? MY CONFIDENCE on the 7G1 total (confident / unsure / guess): ____
//
// ? RUN and compare. In 7G1, why does 1-1, 1-2, 1-3 all print BEFORE any line starting with 2? ____
// * Half of it. The key part: the inner loop must FINISH all its rounds (col 1, 2, 3) before the outer loop can do row++.
// ? MODIFY: add a new line with a copy of the 7G1 loops using the counters  r  and  c , with the outer loop going to 3
// ?   instead of 2. How many lines print now? ____

// ? WRITE: on the lines below, a nested loop with the counters  myRow  and  mySeat  that prints  row 1 seat A ,
// ?   row 1 seat B , row 2 seat A , row 2 seat B  (hint: an array ['A', 'B'] for the seats is allowed).

// ================================================================
// ! 7H - CONCEPT - break: LEAVE THE LOOP EARLY
// ================================================================
// * SKILLS: break_loop
// Source: MDN Learn "Looping code": break "will immediately exit the loop and make the browser move on to any code that follows it."
//         Codecademy "Loops": "The break keyword allows programs to 'break' out of the loop from within the loop's block."
//
// break (the same keyword that ends a switch case, Day 6 block M) exits the loop AT ONCE: the rest of the body is
// skipped, no more rounds run, and the program carries on after the loop's closing }.
// Use it when you have found what you were looking for and the remaining rounds would be wasted.
// break leaves only the INNERMOST loop (or switch) it sits in. In a nested loop, an outer loop keeps going.
// The example below also uses  .split(':')  from Day 5: it cuts 'Bill:7654322' into ['Bill', '7654322'].
//
// WORKED EXAMPLE (already traced)
// L1  for (const n of [3, 8, 5]) {  if (n > 4) {  console.log(`found ${n}`);  break;  }  console.log(`${n} is small`);  }
//     3: not > 4, prints 3 is small. 8: > 4, prints found 8, then break: 5 is never looked at.

// ----------------------------------------------------------------
// ? TRACE — mark each round
// ----------------------------------------------------------------
console.log('--- 7H ---');
const contacts = [
  'Chris:2232322',
  'Sarah:3453456',
  'Bill:7654322',
  'Mary:9998769',
];
const searchName = 'Bill';
for (const contact of contacts) {
  const parts = contact.split(':');
  if (parts[0] === searchName) {
    console.log(`${parts[0]}'s number is ${parts[1]}.`);
    break;
  }
  console.log(`Checked ${parts[0]}`);
}
console.log('search over');
// ? round 1 (Chris): match? no , prints ____
// ? round 2 (Sarah): match? no , prints ____
// ? round 3 (Bill):  match? yes , prints ____ , then break
// ? round 4 (Mary): ____
// ? does  search over  print? ____
// ? OUTPUT (write it LAST, from your marks): ____
// * Round 3 prints  Bill's number is 7654322.  (parts[0] is 'Bill' in that round, not Chris). And the OUTPUT line must
// *   hold EVERY printed line in order: Checked Chris, Checked Sarah, Bill's number is 7654322., search over.
// ? MY CONFIDENCE on round 4 (confident / unsure / guess): ____
//
// ? RUN and compare. Why does Bill's round never print  Checked Bill ? ____
// ? MODIFY: add a new line  const searchNow = 'Zoe';  and under it a copy of the loop that uses  searchNow  instead of
// ?   searchName, and the loop variable  contactNow  and  partsNow  instead of contact and parts. What prints? ____
// ? WRITE: on the lines below, make  myNumbers  holding [2, 4, 7, 8, 10], then a for...of loop with the loop variable
// ?   myNum  that prints each number until it finds the first ODD one (% 2 from Day 3), prints  first odd: <n>  and stops.

// ================================================================
// ! 7I - CONCEPT - continue: SKIP THE REST OF THIS ROUND ONLY
// ================================================================
// * SKILLS: continue_loop, math_sqrt
// Source: MDN Learn "Looping code": "The continue statement works similarly to break, but instead of breaking out of the loop entirely, it skips to the next iteration of the loop."
//         MDN Learn "Looping code": "we find the square root of each number using Math.sqrt(i)"
//
// break leaves the WHOLE loop (7H). continue ends only the CURRENT round: the rest of the body is skipped, and the loop
// goes straight on to the next round. In a classic for loop the final-expression (i++) still runs before that next round.
// Use it as a guard at the top of a body: "this item is not interesting, move on".
// Math.sqrt(n) gives the square root of n: the number that, times itself, makes n. Math.sqrt(9) is 3, Math.sqrt(2) is
// about 1.414. Math.floor (Day 3) rounds DOWN, so if rounding down changes the root, the root was not a whole number.
// (Number.isInteger(sqRoot), Day 3, asks the same question more directly.)
// Style note, two columns: Airbnb's ESLint rules ban continue (no-continue); Google's guide has no such rule, and our
// project config allows it. The same skip can always be written as an if around the lines you want to run.
//
// WORKED EXAMPLE (already traced)
// L1  for (const n of [1, 2, 3]) {  if (n === 2) {  continue;  }  console.log(n);  }
//     1: not 2, prints 1. 2: continue, so console.log is skipped for this round only. 3: prints 3. Output: 1, 3.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. One word each: true / false / runs / skipped, then OUTPUT.
// ----------------------------------------------------------------
console.log('--- 7I ---');
// NEW: continue — ends the current round at once and jumps to the next round (the loop itself keeps going)
// NEW: Math.sqrt() — gives the square root of a number: Math.sqrt(16) is 4
const num = 10;
for (let i = 1; i <= num; i++) {
  const sqRoot = Math.sqrt(i);
  if (Math.floor(sqRoot) !== sqRoot) {
    continue;
  }
  console.log(i);
}
// ? i is 2: sqRoot is about 1.4 , Math.floor(sqRoot) is ____ , are they different? yes , so continue runs? yes
// ? i is 4: sqRoot is ____ , Math.floor(sqRoot) is ____ , are they different? no , so continue runs? no
// ? i is 9: does it print? ____
// ? does the loop STOP at i = 2, or carry on to i = 3? ____
// ? OUTPUT (write it LAST, every printed line in order): ____
// ? MY CONFIDENCE on the OUTPUT (confident / unsure / guess): ____
//
// ? RUN and compare. If you swapped continue for break, what would print? ____
// ? MODIFY: add a new line  const numBig = 30;  and under it a copy of the loop that uses  numBig , the counter  k  and the
// ?   constant  kRoot  instead of num, i and sqRoot. What prints? ____

// ? WRITE: on the lines below, make  myWords  holding ['apple', '', 'kiwi', '', 'fig'], then a for...of loop with the loop
// ?   variable  myWord  that uses continue to skip the empty strings and prints every other word.

// ================================================================
// ! 7J - CONCEPT - while: REPEAT WHILE A CONDITION HOLDS
// ================================================================
// * SKILLS: while_loop, while_when_to_use
// Source: Codecademy "Loops": "While the condition evaluates to true, the block will continue to run."
//         MDN Learn "Looping code": "the initializer variable is set before the loop, and the final-expression is included inside the loop after the code to run"
//         Codecademy "Loops": "The syntax of a while loop is ideal when we don't know in advance how many times the loop should run."
//
// A while loop has the SAME three parts as a classic for loop (7C), in different places:
//   let w = 0;            ← INITIALIZER, before the loop
//   while (w < 3) {       ← CONDITION, checked before every round, exactly like for
//     ...body...
//     w++;                ← FINAL-EXPRESSION, inside the body, at the end
//   }
// The counter is made with let OUTSIDE the loop, so it still exists after the loop ends (a for loop's i does not).
// When to choose while: when you do NOT know the number of rounds ahead, only WHEN TO STOP.
// "How many doublings until we pass 50?" You know the stop rule (amount >= 50), not the count. That is a while job.
// Python: same keyword and idea; JS needs the ( ) around the condition and { } for the body.
//
// WORKED EXAMPLE (already traced)
// L1  let t = 2;
// L2  while (t > 0) {  console.log(t);  t--;  }
//     2 > 0: prints 2, t becomes 1. 1 > 0: prints 1, t becomes 0. 0 > 0 is false: the loop ends.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. One word each: true / false / runs / skipped, then OUTPUT.
// ----------------------------------------------------------------
console.log('--- 7J1 ---');
// NEW: while — while (condition) { body } repeats the body as long as the condition is true; it is checked before every round
let w = 0;
while (w < 3) {
  console.log(`w is ${w}`);
  w++;
}
console.log(`after: w is ${w}`);
// ? round 1: w < 3 is ____ , prints ____ , then w becomes 1
// ? round 2: w < 3 is ____ , prints ____ , then w becomes 2
// ? round 3: w < 3 is ____ , prints ____ , then w becomes 3
// ? check: w < 3 is ____ , so the loop ends. The last line prints ____
console.log('--- 7J2 ---');
let amount = 1;
let doublings = 0;
while (amount < 50) {
  amount = amount * 2;
  doublings++;
}
console.log(amount); // ? prints: ____
console.log(doublings); // ? prints: ____
// ? MY CONFIDENCE on doublings (confident / unsure / guess): ____
//
// ? RUN and compare. In 7J2, why is while a better fit than a classic for loop? ____
// ? MODIFY: add new lines  let amountBig = 1;  and  let doublingsBig = 0;  and under them a copy of the 7J2 loop that uses
// ?   those two names and stops at 1000 instead of 50. What two numbers print? ____
// ? WRITE: on the lines below, make  mySavings  starting at 0 and  myWeeks  starting at 0, then a while loop that adds
// ?   15 to mySavings and 1 to myWeeks each round until mySavings reaches at least 100. Print  weeks: <n>  and  saved: <n> .

// ================================================================
// ! 7K - CONCEPT - do...while (ALWAYS ONCE) AND THE INFINITE LOOP
// ================================================================
// * SKILLS: do_while_loop, infinite_loop
// Source: MDN Learn "Looping code": "the code inside a do...while loop is always executed at least once."
//         Codecademy "Loops": "Unlike the while loop, do...while will run at least once, whether or not the condition evaluates to true."
//         Codecademy "Loops": an infinite loop "occurs when the loop's stopping condition is never met, causing the loop to continue iterating"
//
// do...while puts the body FIRST and the check AFTER it:   do { body } while (condition);   (note the ; at the end)
// Because the check comes after, the body always runs at least once, even when the condition is false from the start.
// It is rare in real code. The instructor says he hates it (loops.js): that is his taste, not a rule. Recognise it, write it when
// "do it once, then maybe again" is exactly what you mean.
// Python has no do...while.
//
// INFINITE LOOP: a condition that never becomes false, so the loop never ends. The usual cause: nothing in the body
// moves the counter (a forgotten i++), or a countdown that uses i++ (7L). A trap with continue (7I): in a WHILE loop,
// continue jumps straight back to the check, so an  i++  BELOW the continue is skipped too. Put the update first.
// If your terminal fills up and never stops: press  Ctrl+C  to stop Node. The fix is always the same: make sure something
// inside the loop moves the condition toward false (or reaches a break).
//
// WORKED EXAMPLE (already traced)
// L1  let d = 5;
// L2  do {  console.log(d);  d++;  } while (d < 3);
//     The body runs first: prints 5, d becomes 6. Then the check: 6 < 3 is false, the loop ends. One round, though
//     the condition was never true.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- 7K ---');
// NEW: do...while — do { body } while (condition); runs the body FIRST, then checks, so it always runs at least once
let tries = 10;
do {
  console.log(`tries is ${tries}`);
  tries++;
} while (tries < 3);
let triesW = 10;
while (triesW < 3) {
  console.log(`triesW is ${triesW}`);
  triesW++;
}
console.log('loops done');
// ? the do...while body runs ____ time(s), printing ____
// ? the while body runs ____ time(s), printing ____
// * 0 times is right, so the while body prints NOTHING.  loops done  comes from the separate line after both loops.
// ? OUTPUT (write it LAST, every printed line in order): ____
// ? MY CONFIDENCE on the do...while line (confident / unsure / guess): ____
//
// The infinite loop lives in its own file so it cannot stop THIS file. Restated:
// PROGRAM (file week-4/day7_errors/c2.js)
// L1  let i = 0;
// L2  while (i < 3) {
// L3    console.log(i);
// L4  }
// L5  console.log('after');
// ? What does the first round print? ____   What is i after round 1? ____   Does the loop ever end? ____
// ? Does  after  print? ____
// ? RUN it from the bootcamp folder:   node week-4/day7_errors/c2.js   then press  Ctrl+C  after a second.
// ? What did the terminal do? ____
//
// ? MODIFY: open the REAL file week-4/day7_errors/c2.js, add  i++;  as a new line after the console.log inside the loop,
// ?   save, and run it again. What prints now? ____

// ? WRITE: on the lines below, make  myAttempt  starting at 1, then a do...while loop that prints  attempt <n>  and adds 1,
// ?   repeating while myAttempt is 3 or less. Then answer: if myAttempt started at 9, how many lines would print? ____

// ================================================================
// ! 7L - CONCEPT - COUNTING DOWN, TRIMMING THE END, AND CHOOSING A LOOP
// ================================================================
// * SKILLS: countdown_decrement, negative_slice, choosing_loop_type
// Source: MDN Learn "Looping code": "we are counting down after each iteration, not up, so you don't want i++"
//         Codecademy "Loops": "Set the iterator variable to the highest desired value in the initialization expression."
//         MDN Learn "Looping code": "Can you work out how to write lines that slice the last comma off in each case, and add a full stop to the end?"
//         MDN Learn "Looping code": "If you're iterating through an array or some other object that supports it, and don't need access to the index position of each item, then for...of is the best choice."
//
// COUNTING DOWN: start the counter at the HIGHEST value, test with  >= , and step with  i--  (subtract 1, Day 4).
//   for (let n = 3; n >= 1; n--)   gives 3, 2, 1.   i -= 2  steps down by 2.
//   Mistake to avoid: keeping i++ in a countdown. i grows, i >= 1 stays true forever: an infinite loop (7K).
// TRIMMING THE END: loops that build text with += often leave an extra ', ' on the end. A NEGATIVE number in .slice()
//   (Day 5) counts from the end, so  text.slice(0, -2)  keeps everything except the last 2 characters.
//   (Reminder from Day 5: negatives do NOT work that way inside [ ] brackets: text[-1] is undefined.)
//   What professionals write instead: put the items in an array and call  .join(', ')  (Day 5), which never adds the
//   extra separator, so there is nothing to trim.
// CHOOSING A LOOP:
//   every item of an array, position not needed ............ for...of
//   need the position (last item, compare positions) ........ classic for
//   repeat a KNOWN number of times ........................... classic for
//   UNKNOWN number of repeats, you only know when to stop .... while
//   must run at least once, then maybe repeat ................ do...while
//   transform, filter or find items in an array .............. an array method (Day 12)
// Ask in this order: (1) Do I have a list at all, or am I just counting? Just counting: classic for (for...of needs
//   something to walk over; a plain number like 10 is not one). (2) I have a list: do I need each item's POSITION?
//   No: for...of. Yes: classic for.
// The two classic-for shapes differ: counting 1 to n is  let i = 1; i <= n  (n itself included); walking array
//   positions is  let i = 0; i < arr.length  (the last position is length - 1, the 7F off-by-one).
//
// WORKED EXAMPLE (already traced)
// L1  for (let n = 2; n >= 1; n--) {  console.log(n);  }
//     n = 2: 2 >= 1, prints 2, n-- makes 1. 1 >= 1, prints 1, n becomes 0. 0 >= 1 is false: the loop ends.

// ----------------------------------------------------------------
// ? TRACE
// ----------------------------------------------------------------
console.log('--- 7L ---');
// NEW: .slice(0, -2) — a negative end in slice counts back from the end: everything except the last 2 characters
for (let n = 3; n >= 1; n--) {
  console.log(n);
}
console.log('Blast off!');
// ? round 1: n is ____ , n >= 1 is ____ , prints ____
// ? the last round: n is ____ ; then n-- makes n ____ , and ____ >= 1 is ____
// ? OUTPUT (every printed line in order, up to Blast off!): ____
const petText = 'Pete, Biggles, ';
console.log(petText.slice(0, -2)); // ? prints: ____
console.log(['Pete', 'Biggles'].join(', ')); // ? prints: ____
// ? MY CONFIDENCE on the slice line (confident / unsure / guess): ____
//
// ? CHOOSE: write the loop type for each job (for...of / classic for / while / do...while):
// ?   print every name in a guest list ____
// ?   print every name, with "and" before the LAST one ____
// ?   keep halving a number until it is below 1 ____
// ?   print a menu once, then again while the user keeps choosing "more" ____
//
// ? RUN and compare. What would happen if the countdown said  n++  instead of  n-- ? it would become an infinite loop
// ? MODIFY: add a new line with a copy of the countdown using the counter  m , starting at 10, stepping with  m -= 2 , and
// ?   stopping after 0. What prints? ____
// ? WRITE: on the lines below: (1) a WHILE loop with the counter  myCount  that counts down 5, 4, 3, 2, 1 and then prints
// ?   Go! ; (2) make  myFruits  holding ['fig', 'kiwi', 'plum'] and  myFruitText  starting as '' , a for...of loop with
// ?   myFruit  that adds each fruit plus ', ' , then print myFruitText with the last ', ' sliced off; (3) one line that
// ?   prints the same list with .join(', ') instead.
// TODO UNPACK first (comments only, no code yet):
// TODO   PARTS:  ____
// TODO   OUTPUT (every line, by hand):  ____
// TODO   RULES (must use / must not use):  ____
// TODO   BY HAND (part 2, step by step):  ____
// TODO   FIRST piece to run:____
