// ================================================================
// ! BOOTCAMP JS — DAY 1 of 19 — WHAT JS IS, RUNNING IT, A FIRST PROGRAM
// ! Material: materials/js_fundamentals.md §1.1, §1.2
// ! Sources: MDN Learn "What is JavaScript?" · Node.js "Run Node.js scripts from the command line"
// ================================================================
// * SECTIONS TODAY: 1.1, 1.2
// * Every concept: 1 TRACE (fill the blanks BEFORE running) → 2 RUN → 3 MODIFY → 4 WRITE

// ================================================================
// ! A - CONCEPT - RUNNING A FILE, AND COMMENTS
// ================================================================
// JavaScript is a programming language: words and symbols you write so a computer carries out
// instructions. It started inside web browsers (client-side). Node.js runs it OUTSIDE a browser,
// which is how you will run every file in this course.
//
// HOW TO RUN THIS FILE: in the VS Code terminal (Ctrl + `), type:
//     node week-3/day1_running_js.js
// "node" is the program. The long part is the path to this file.
//
// A COMMENT is text the computer SKIPS. It is a note for humans.
//   a double slash starts a single-line comment: everything after it on that line is skipped
//   /*  */    wraps a multi-line comment: everything between them is skipped

/*
  This is a multi-line comment.
  Node skips every line in here.
*/

// ----------------------------------------------------------------
// ? TRACE — this whole file, so far, is made of comments.
// ? Before you run it: what will the terminal show?
// ----------------------------------------------------------------
// ? MY PREDICTION (exactly what appears): ____


// ----------------------------------------------------------------
// ? MODIFY — add two comments of your own BELOW this line:
// here is one
// ? Then run the file again. Prediction first: what will the terminal show now?
// ----------------------------------------------------------------
// MY PREDICTION: ____


// * Missed (minor): the // comment should say what the file is FOR, and /* */ should span 2 lines.

// ================================================================
// ! B - CONCEPT - VARIABLES: let AND const   (Source: MDN Learn "Variables"; Codecademy "Variables")
// ================================================================
// A VARIABLE is a name for a value. Without variables a program could not remember anything:
// a score, a name, a guess. Every value would vanish the moment it was used.
// To make one you use a KEYWORD: a word built into JavaScript that the computer treats specially.
// Most keywords are RESERVED: you cannot use them as your own names. Two keywords make variables:
//
// NEW: let — makes a variable whose value CAN be changed later
// NEW: const — (short for "constant") makes a variable that can NOT be given a NEW value (reassigned).
//      If it holds an array or object, the contents inside can still change (part R below).
//
// A line that makes a variable has four parts, in this order:
//     keyword   name   =   value
// The = sign is the ASSIGNMENT operator. Read it as "gets", not "equals": score = 10 means "score gets 10".
// Running this part prints NOTHING: these lines only create and change names.

let score = 10
const maxScore = 100
score = 20

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. Say what the name holds right AFTER that line runs.
// ----------------------------------------------------------------
// let score = 10         // ? score holds ____
// const maxScore = 100   // ? maxScore holds ____
// score = 20             // ? score now holds ____   (is this line allowed? yes — hint: how was score made?)
// ? Does running this file print anything? ____

// ----------------------------------------------------------------
// ? MODIFY + PREDICT — now try to change the const.
// ?   1. UN-comment the line below (delete its // — Ctrl + / does it)
// ?   2. BEFORE running, write your prediction: what happens? (prints? error? which words?)
// ?   3. Run the file and compare
// ?   4. Put the // back (comment the line out again) so the file runs cleanly afterwards
// ----------------------------------------------------------------
// maxScore = 50
// MY PREDICTION: ____
// MY CONFIDENCE (confident / unsure / guess): ____
// * HOW TO READ THAT ERROR (top to bottom):
// *   file path : line number   → where Node stopped (…day1_running_js.js:87)
// *   the code line + a ^ caret → the exact spot it objected to
// *   TypeError                 → the KIND of error: an operation JavaScript could not carry out
// *                               (often a value of the wrong type; here, reassigning a const)

// ? FINISH + EXPLAIN:
// ?   1. Put the // back in front of  maxScore = 50  so the file runs cleanly again (step 4 above)
// ?   2. Complete this sentence in your own words:
// MY SENTENCE: ____

// ================================================================
// ! C - CONCEPT - FUNCTIONS: DECLARE ONCE, CALL MANY TIMES   (Source: MDN Learn "A first splash"; Codecademy "Functions")
// ================================================================
// A FUNCTION is a named, reusable block of code. You write it once and run it again and again.
// Without functions you would copy and paste the same lines everywhere, and fixing a bug would
// mean fixing every copy.
// DECLARING a function = creating it. The parts, in order:
//     the keyword function · a name · a pair of parentheses ( ) · a pair of curly braces { }
// The { } wrap the function's BODY: the lines that run when the function is used.
//
// NEW: function — the keyword that declares (creates) a function
//
// Declaring does NOT run the body. To run it you CALL it: write its name followed by ( ).

function startGame() {
  const lives = 3
}

startGame()
startGame()

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
// function startGame() {   // ? does DECLARING it run the body right now? (yes / no) ____
//   const lives = 3
// }
// startGame()              // ? the body has now run ____ time(s)
// startGame()              // ? the body has now run ____ time(s) in total
// ? Does running this file print anything? ____
// MY FIX: ____
// * Recipe analogy: DECLARING a function = writing the recipe down. CALLING it = cooking. Writing it down makes no dinner.

// ================================================================
// ! D - CONCEPT - PRINTING WITH console.log   (Source: MDN Learn "A first splash"; Codecademy "Introduction")
// ================================================================
// So far nothing you wrote showed anything on screen. This is the instruction that does.
// Read console.log( ) as three parts: console is the console (your terminal, when you use node),
// the dot means "the part belonging to", and log is the action of writing one line to it.
// What you put between the parentheses gets printed. A variable's NAME prints the value it holds right now.
//
// NEW: console.log — prints what is inside its ( ) to the terminal, one line per use

let points = 5
console.log(points)
points = 8
console.log(points)
console.log(points, maxScore)

// A comma between values prints them on ONE line, with a space between. maxScore is the const from part B (100).

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. Say what appears in the terminal for that line.
// ----------------------------------------------------------------
// let points = 5               // (creates points — nothing appears)
// console.log(points)          // ? appears: ____
// points = 8                   // (changes points — nothing appears)
// console.log(points)          // ? appears: ____
// console.log(points, maxScore) // ? appears: ____
// ? How many lines does the whole file print in total? ____

// ----------------------------------------------------------------
// ? PREDICT — declare vs call, now with a real screen. Two functions, only one is ever called:
// ----------------------------------------------------------------
function showPoints() {
  console.log(points)
}

function neverCalled() {
  console.log(maxScore)
}

showPoints()
showPoints()

// ? 1. Before running: how many lines will appear from THIS block only (not counting the 3 above)? ____
// ? 2. Which function's console.log never appears on screen, and why (one short sentence)? ____
// ? 3. Confidence (confident / unsure / guess): ____

// ----------------------------------------------------------------
// ? RE-CHECK — one step at a time. Everything you need is in this block.
// ----------------------------------------------------------------
// Values right now:  points holds 8  ·  maxScore holds 100
//
// The two functions (bodies shown inline):
//   showPoints()  has the body:  console.log(points)
//   neverCalled() has the body:  console.log(maxScore)
//
// The calls that appear in the file:
//   showPoints()
//   showPoints()
//   (neverCalled() is not written anywhere as a call)
//
// ? showPoints  was CALLED ____ time(s), so its console.log appeared ____ time(s)
// ? neverCalled was CALLED ____ time(s), so its console.log appeared ____ time(s)
// ? The function whose console.log NEVER appears on screen is: ____

// ----------------------------------------------------------------
// ? WRITTEN vs RUNS — the idea behind the last miss. Everything is in this block.
// ----------------------------------------------------------------
// Values right now:  points holds 8
// The function:      showPoints() has the body:  console.log(points)
// The calls:         showPoints()     <- call 1
//                    showPoints()     <- call 2
//
// RULE: every call runs the WHOLE body again, from its first line.
//
// ? call 1 runs the body, so  console.log(points)  prints: ____
// ? call 2 runs the body AGAIN, so it prints: ____
// ? In the body shown above, the line  console.log(points)  is written ____ time(s).
// ? Counting call 1 and call 2 above, that line runs ____ time(s) in total.

// ================================================================
// ! E - CONCEPT - THE SEMICOLON ;   (Source: MDN Learn "A first splash"; Codecademy "Introduction")
// ================================================================
// A SEMICOLON ; marks the END of one instruction. JavaScript can often guess where an instruction
// ends without it, which is why everything above worked. But it can guess wrong, so from here on
// every instruction ends with ;
// The braces of a block (a function declaration, an if, a loop) do not get one.
// But when the braces are part of a VALUE, like  const add = function () { ... };  the line still ends with ;
//
// NEW: ; — the semicolon: marks the end of one instruction

const total = 4;
console.log(total);

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// const total = 4;         // ? what does total hold after this line? ____
// console.log(total);      // ? what appears ____
// ? Which single character ends each of the two instructions above? ____
// ? Does the semicolon itself appear in the terminal output? (yes / no) ____

// ================================================================
// ! F - CONCEPT - STRINGS AND QUOTES   (Source: MDN Learn "A first splash"; Codecademy "Introduction")
// ================================================================
// A STRING is a piece of text. Without strings a program could only work with numbers: no names, no messages.
// You write one by putting the text between quote marks: double quotes " or single quotes '.
// The quotes tell JavaScript where the text starts and ends. They are NOT part of the text,
// so they do not print. The quote at the start and the quote at the end must be the same kind.
//
// NEW: " and ' — quote marks: wrap text to make a string

// prettier-ignore
const playerName = "Ada";
const greeting = 'Welcome back';
console.log(greeting, playerName);

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// const playerName = "Ada";         // ? playerName holds: ____
// const greeting = 'Welcome back';  // ? greeting holds: ____
// console.log(greeting, playerName); // ? the terminal shows exactly: ____
// ? Do the quote marks appear in the terminal? (yes / no) ____

// ================================================================
// ! G - CONCEPT - TEMPLATE LITERALS: DROP A VARIABLE INTO TEXT   (Source: MDN Learn "A first splash")
// ================================================================
// A third kind of quote is the BACKTICK ` (on most keyboards: top-left, under the Esc key).
// A string written with backticks is called a TEMPLATE LITERAL. Its special power: inside it,
// ${ } (a dollar sign, then curly braces) drops in the VALUE of a variable.
// JavaScript replaces ${teamName} with what teamName holds, then prints the finished text.
//
// NEW: ` — the backtick: wraps a template literal (a string that can contain ${ })
// NEW: ${} — drops the value of a variable into a template literal

const teamName = "Reds";
const wins = 10;
console.log(`${teamName} has ${wins} wins`);

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// const teamName = "Reds";                        // teamName holds Reds
// const wins = 10;                                // wins holds 10
// console.log(`${teamName} has ${wins} wins`); // ? ${teamName} is replaced by: ____
// ? ${wins} is replaced by: ____
// ? the terminal shows exactly: ____
// ? Do the backticks and the ${ } appear in the terminal? (yes / no) ____

// ================================================================
// ! H - CONCEPT - CONDITIONALS (FIRST LOOK): if, true, false   (Source: MDN Learn "A first splash")
// ================================================================
// This is a first look. The full lesson on conditionals is on Day 6.
// A CONDITIONAL lets a program make a decision. Without one, a program would do exactly the same
// thing every time, whatever happened.
// An if has a TEST inside parentheses ( ). If the test comes out TRUE, the code in the curly braces
// { } runs. If it comes out FALSE, that code is skipped.
// true and false are values you can write directly, and keep in variables.
//
// NEW: if — runs the code in its { } only when the test inside its ( ) is true
// NEW: true / false — the two yes-or-no values

const hasTicket = true;
if (hasTicket) {
  console.log("Welcome!");
}
console.log("Done");

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// const hasTicket = true;       // ? hasTicket holds: ____
// if (hasTicket) {              // ? the test inside ( ) comes out: ____  (true / false)
//   console.log("Welcome!");    // ? this line: ____
// }
// console.log("Done");          // ? this line: skipped  (runs / skipped) ____
// ? Everything the terminal shows, in order, one item per line: ____
// * Rule: only the code INSIDE the { } is controlled by the if. A line after the closing } always runs.

// ----------------------------------------------------------------
// ? MODIFY + PREDICT — the same code with one change. Everything is in this block.
// ----------------------------------------------------------------
// BEFORE (what you just traced):            AFTER (the only change is true -> false):
//   const hasTicket = true;                    const hasTicket = false;
//   if (hasTicket) {                          if (hasTicket) {
//     console.log("Welcome!");                  console.log("Welcome!");
//   }                                         }
//   console.log("Done");                      console.log("Done");
//   The terminal shows: Welcome! / Done       The terminal shows: Welcome (one item per line)
// Done
// ? Fill in the AFTER output above BEFORE doing anything else.
// ? Then change  const hasTicket = true;  to  false  in the H code above, run the file, and compare.
// ? Confidence (confident / unsure / guess): ____
// * Rule again: a false test skips the whole { } block. The line after the closing } always runs.

// ================================================================
// ! I - CONCEPT - COMPARING WITH ===   (Source: MDN Learn "A first splash")
// ================================================================
// === (three equals signs) is the STRICT EQUALITY operator. It tests whether two values are the same,
// and gives back true or false. It changes nothing; it only asks.
// Keep it apart from = : one = PUTS a value in a variable. Three === COMPARE two values.
//
// NEW: === — strict equality: gives true if both sides are the same value, otherwise false

const answer = 7;
const guess = 4;
console.log(guess === answer);
console.log(guess === 4);

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// const answer = 7;
// const guess = 4;
// console.log(guess === answer);   // ? 4 === 7 gives: ____  (true / false), so the terminal shows: ____
// console.log(guess === 4);        // ? 4 === 4 gives: ____  (true / false), so the terminal shows: ____

// ================================================================
// ! J - CONCEPT - else if AND else: A CHAIN OF TESTS   (Source: MDN Learn "A first splash")
// ================================================================
// You can chain more tests onto an if. else if means "otherwise, if this next test is true". It is
// checked ONLY when every test before it was false. A final else has no test of its own: it catches
// everything left over. In one chain, AT MOST ONE block runs (exactly one when there is a final else).
// Reminder: only the code INSIDE a { } belongs to the chain. A line after the last } always runs.
//
// NEW: else if — "otherwise, if": another test, checked only when the earlier tests were false
// NEW: else — the leftover block: runs only when no test above it was true

const speed = 50;
if (speed === 100) {
  console.log("Too fast");
} else if (speed === 50) {
  console.log("Perfect");
} else {
  console.log("Too slow");
}
console.log("Trip over");

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// const speed = 50;                        // speed holds 50
// if (speed === 100) {                     // ? 50 === 100 gives: ____
//   console.log("Too fast");               // ? ____  (runs / skipped)
// } else if (speed === 50) {               // ? 50 === 50 gives: ____
//   console.log("Perfect");                // ? ____  (runs / skipped)
// } else {
//   console.log("Too slow");               // ? ____  (runs / skipped)
// }
// console.log("Trip over");                // ? ____  (runs / skipped)
// ? Everything the terminal shows, in order, one item per line: ____
// Trip over
// * METHOD: the output is the console.log lines you marked "runs", in the order they appear. Read it straight off your marks.

// ? FIX — use your own marks. These are your marks from the J trace, repeated here:
//     "Too fast" : skipped      "Perfect" : runs      "Too slow" : skipped      "Trip over" : runs
// ? The terminal shows, in order, one item per line:
//   Perfect
//   Trip over

// ================================================================
// ! K - CONCEPT - Number(): TURN TEXT INTO A NUMBER   (Source: MDN Learn "A first splash")
// ================================================================
// Text that a user types arrives as a STRING, even when it looks like a number.
// "7" (with quotes) is text. 7 (no quotes) is a number. They are different TYPES of value.
// Number( ) is a built-in tool: you put a value inside the parentheses and it gives back that
// value as a number.
//
// NEW: Number() — a built-in tool that turns a value into a number

const target = 7;
const typed = "7";
console.log(typed === target);
console.log(Number(typed) === target);

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// const target = 7;                          // target holds the NUMBER 7
// const typed = "7";                         // typed holds the TEXT "7"
// console.log(typed === target);             // ? text "7" === number 7 gives: ____  (true / false), terminal shows: ____
// console.log(Number(typed) === target);     // ? Number(typed) turns the text "7" into: ____
// ? then 7 === 7 gives: ____  (true / false), terminal shows: ____


// ================================================================
// ! L - CONCEPT - A CONDITIONAL INSIDE A CONDITIONAL, WITH < AND >   (Source: MDN Learn "A first splash")
// ================================================================
// A conditional can sit INSIDE another one's { }. This is called nesting.
// < means "less than" and > means "greater than". Like ===, they give back true or false.
// Method reminder: the output is the console.log lines marked "runs", in order.
//
// NEW: < and > — less than, greater than: compare two values, give true or false

const secretNumber = 7;
const attempt = 4;
if (attempt === secretNumber) {
  console.log("You got it!");
} else {
  console.log("Wrong!");
  if (attempt < secretNumber) {
    console.log("Too low");
  } else if (attempt > secretNumber) {
    console.log("Too high");
  }
}

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running. (secretNumber holds 7, attempt holds 4)
// ----------------------------------------------------------------
// if (attempt === secretNumber) {            // ? 4 === 7 gives: ____
//   console.log("You got it!");              // ? ____  (runs / skipped)
// } else {                                   //   (the else block is entered when the test above is false)
//   console.log("Wrong!");                   // ? ____  (runs / skipped)
//   if (attempt < secretNumber) {            // ? 4 < 7 gives: ____
//     console.log("Too low");                // ? ____  (runs / skipped)
//   } else if (attempt > secretNumber) {     // ? 4 > 7 is checked? ____
//     console.log("Too high");               // ? ____  (runs / skipped)
//   }
// }
// ? The terminal shows, in order, one item per line (use only the lines marked "runs"):
//   Wrong!
//   Too low


// ================================================================
// ! M - CONCEPT - ++ : ADD 1 TO A VARIABLE   (Source: MDN Learn "A first splash")
// ================================================================
// ++ is the INCREMENT operator: it adds 1 to a variable.
// Write it right after the variable's name: lives++ means "lives gets lives plus 1".
// It changes the variable's value, so the variable must have been made with let, not const.
//
// NEW: ++ — the increment operator: adds 1 to the variable written before it

let lives = 3;
lives++;
lives++;
console.log(lives);

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// let lives = 3;          // ? lives holds: ____
// lives++;                // ? lives holds: ____
// lives++;                // ? lives holds: ____
// console.log(lives);     // ? the terminal shows: ____


// ================================================================
// ! N - CONCEPT - true / false AS A SWITCH YOU FLIP   (Source: MDN Learn "A first splash")
// ================================================================
// Programs often keep a true/false value in a variable, like a light switch, and flip it when
// something happens. In MDN's guessing game, when the game ends, a setting called disabled is
// set to true. That code talks to a web page, which only exists in a browser, so here is the same
// idea with a plain variable. The variable must be made with let so its value can change.

let gameOver = false;
console.log(gameOver);
gameOver = true;
console.log(gameOver);

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// let gameOver = false;      // ? gameOver holds: ____
// console.log(gameOver);     // ? the terminal shows: ____
// gameOver = true;           // ? gameOver holds: ____
// console.log(gameOver);     // ? the terminal shows: ____


// ================================================================
// ! O - CONCEPT - THE EMPTY STRING ""   (Source: Codecademy "Introduction")
// ================================================================
// A string can be EMPTY: two quote marks with nothing between them, "". It is a real string that
// holds no characters. It is useful as a starting value, or to clear a message.
// console.log( ) of an empty string still prints one line, and that line is blank.

let note = "Too high!";
console.log(note);
note = "";
console.log(note);

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// let note = "Too high!";   // ? note holds: ____
// console.log(note);        // ? the terminal shows: ____
// note = "";                // ? note now holds: ____  (the text "empty" / no characters at all)
// console.log(note);        // ? the terminal shows: ____  (a blank line / the word note / nothing, no line at all)
// ? How many lines does the terminal print in total, counting the blank one? ____


// ================================================================
// ! P - CONCEPT - ARRAYS: SEVERAL VALUES IN ONE VARIABLE   (Source: MDN Learn "A first splash")
// ================================================================
// An ARRAY is a collection of values kept together in ONE variable, in order.
// Without arrays, three guesses would need three separate variables.
// You write an array with SQUARE BRACKETS [ ] around the values, and a comma between each value.
// This is a first look. Arrays get a full section on Day 5.
//
// NEW: [ ] — square brackets: wrap the values of an array, separated by commas

const guesses = ["4", "9", "7"];
console.log(guesses);

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
// const guesses = ["4", "9", "7"];   // ? how many values does the array hold? ____
//                                    // ? is each value a string or a number? ____  (hint: look at the quote marks)
// console.log(guesses);              // ? does the terminal show ONE line or THREE lines? ____
// ? Now run the file and write below, exactly, the line Node prints ____
//   [ '4', '9', '7' ]

// ================================================================
// ! Q - CONCEPT - LOOPS: for...of WALKS THROUGH AN ARRAY   (Source: MDN Learn "A first splash"; Codecademy "Loops")
// ================================================================
// A LOOP runs the same code again and again, until a stopping point. Without loops, doing something
// to 100 items would mean writing 100 lines. This is a first look. Loops get a full section on Day 7.
// for...of loops over any ITERABLE (arrays, strings, and more later); today we use it on arrays. Read it as: "for each item in this array, put it in the
// name given, then run the code in the { }." The loop stops by itself when it runs out of items.
// Each pass round the loop gets a brand-new copy of that name, which is why a const works here.
//
// NEW: for...of — a loop that runs its { } once for each item in an array (or other iterable)

const players = ["Ada", "Grace", "Linus"];
for (const player of players) {
  console.log(`Hello ${player}`);
}

// ----------------------------------------------------------------
// ? TRACE — everything is in this block. Fill every ____ BEFORE running. (players holds the 3 names above)
// ----------------------------------------------------------------
// ? How many times does the { } block run in total? ____
// ? Pass 1: player holds ____ , so the terminal shows: ____
// ? Pass 2: player holds ____ , so the terminal shows: ____
// ? Pass 3: player holds ____ , so the terminal shows: ____
// ? player is a const but holds a different name on each pass. Does that cause an error? (yes / no) ____

// ================================================================
// ! R - CONCEPT - const DOES NOT FREEZE EVERYTHING   (Source: MDN Learn "A first splash"; Codecademy "Variables")
// ================================================================
// From part B you know what const stops: a NAME being given a brand-new value.
// Example of what it stops:  const list = ["x"];   then later   list = ["y"];   gives an error.
// But when the value is a container with parts inside it, like an array, those parts can still change.
// MDN: "even though resetPara is a constant, we can change its internal properties."
// You will see exactly how on Day 5 (arrays) and Days 13-14 (objects). For now, hold the idea only.
// There is no code to run in this block.

// ----------------------------------------------------------------
// ? CHECK — answer from the text in this block. Fill every ____ .
// ----------------------------------------------------------------
// ? 1. True or false: "const makes everything inside an array frozen forever." no
// ? 2. In one short line: what does const DO stop? ____
