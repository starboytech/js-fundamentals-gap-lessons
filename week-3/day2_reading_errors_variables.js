// ================================================================
// ! BOOTCAMP JS — DAY 2 of 19 — READING ERRORS, VARIABLES
// ! Material: materials/js_fundamentals.md §1.3, §2.1
// ! Sources: MDN Learn "What went wrong? Troubleshooting JavaScript" · MDN Learn "Variables" · Codecademy "Introduction to JavaScript", "Variables"
// ================================================================
// * SECTIONS TODAY: 1.3, 2.1
// * Every concept: 1 TRACE (fill the blanks BEFORE running) → 2 RUN → 3 MODIFY → 4 WRITE
// * This file runs cleanly any time. Its live blocks (F, H, I, J, K, L) print values.
// * Broken programs live in tiny separate files in the folder  week-3/day2_errors/
// * so that a broken line can never stop THIS file.

// ================================================================
// ! A - CONCEPT - THREE KINDS OF ERROR
// ================================================================
// Every programmer's code breaks, constantly. The skill is reading the error calmly.
// There are three kinds, and they behave differently:
//
//   SYNTAX ERROR  — the code is spelled or punctuated wrongly (a missing bracket or quote).
//                   Node checks the WHOLE file's spelling BEFORE running anything.
//   RUNTIME ERROR — the spelling is fine, so the program starts, then something fails
//                   while it runs (for example, calling something that is not a function).
//   LOGIC ERROR   — the program runs with no error message, but gives the wrong answer.
//
// To "call" something means to run it by writing its name followed by ( ).
// To "throw" an error means normal running stops. If nothing catches the error (catching comes on
// Day 19), the program ends and Node prints a report.
//
// Here are three programs. Each is restated in full, with its line numbers.
//
// PROGRAM 1 (file e1.js)
// L1  console.log("first line");
// L2  console.log("second line";        <- the ) that closes console.log( is missing
//
// PROGRAM 2 (file e2.js)
// L1  console.log("first line");
// L2  const score = 5;
// L3  score();                          <- score holds the number 5; 5 is not a function
//
// PROGRAM 3 (file e3.js)
// L1  const answer = 7;
// L2  const guess = 9;
// L3  if (guess > answer) {
// L4    console.log("Too low");         <- 9 is MORE than 7, so "too high" would be true
// L5  }

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running anything.
// ? Write: syntax / runtime / logic   and   prints ____
// ----------------------------------------------------------------
// PROGRAM 1  kind of error: syntax
// PROGRAM 1  does  first line  appear in the terminal? yes
// PROGRAM 2  kind of error: runtime
// PROGRAM 2  does  first line  appear in the terminal? yes
// PROGRAM 3  kind of error: logic   (does Node print an error message at all? no)
// ? MY CONFIDENCE on PROGRAM 1's  first line  answer (confident / unsure / guess): ____
//
// ? NOW RUN them, one at a time, from the bootcamp folder:
//     node week-3/day2_errors/e1.js
//     node week-3/day2_errors/e2.js
//     node week-3/day2_errors/e3.js
// ? Where did your trace differ from the terminal? ____

// ================================================================
// ! B - CONCEPT - READING THE ERROR REPORT
// ================================================================
// When Node throws an error it prints a block of text. It has four parts, top to bottom:
//   1. the FILE and LINE      (where Node noticed the problem)
//   2. the CODE LINE and a ^  (a caret, pointing at the spot it blames)
//   3. the ERROR LINE         (type, then a colon, then what went wrong)
//   4. indented "at ..." lines (where the error passed through; ignore these for now)
//
// Here is the program, restated, and the real report Node prints for it.
// PROGRAM (file e4.js)
// L1  const score = 5;
// L2  console.Log(score);          <- capital L
//
// REPORT:
//   file:///home/you/e4.js:2
//   console.Log(score);
//           ^
//
//   TypeError: console.Log is not a function
//       at file:///home/you/e4.js:2:9
//       at ModuleJob.run (node:internal/modules/esm/module_job:569:25)
//       ...two more "at" lines from node:internal...
//
// The "at" lines that start with node:internal are Node's own code: skip them. Look for the one
// that names YOUR file. For a SyntaxError, your file is named only in the FIRST line of the report;
// every "at" line is Node's own internals.
// * "at Object.<anonymous> (...)". This folder runs files as ES modules since Oct 12, so paths start file:///)
//
// In  e4.js:2:9  the numbers are: line 2, then character 9 on that line.

// ----------------------------------------------------------------
// ? TRACE — answer from the REPORT above. Fill every ____.
// ----------------------------------------------------------------
// The error TYPE (the word before the colon):  TypeError which is a runtimeError i believe
// What went wrong (the words after the colon): console.Log isn't a function 
// The line number Node reports:                2
// The character-number Node reports:           9
// ? RUN:  node week-3/day2_errors/e4.js   and check your four answers against the terminal.
//
// * "is not a function" usually means a TYPO. JavaScript is CASE SENSITIVE:
// * console.log (lowercase l) exists; console.Log (capital L) does not.
// ? MODIFY: open week-3/day2_errors/e4.js, change Log to log, run it again.
// ? What prints ____

// ================================================================
// ! C - CONCEPT - A MISSPELLED NAME, AND LOOKING THINGS UP
// ================================================================
// Case matters: total and Total are DIFFERENT names. A name that was never made gives a
// ReferenceError (a runtime error). The words say "is not defined", and they mean
// "this name was never declared (never made with let or const)".
//
// PROGRAM (file e5.js)
// L1  let total = 5;
// L2  console.log(totl);           <- the variable is called total, not totl
//
// When you are unsure how something is spelled, LOOK IT UP. The standard JavaScript
// reference is MDN Web Docs: https://developer.mozilla.org  Looking things up is part of the job.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
// Error type Node will print:  ReferenceError
// Which line it points at:     2
// ? RUN:  node week-3/day2_errors/e5.js   Was your type right? Yes

// ================================================================
// ! D - CONCEPT - A MISTAKE INSIDE A FUNCTION WAITS UNTIL THE FUNCTION RUNS
// ================================================================
// From Day 1: declaring a function runs NOTHING. Only calling it runs its body.
// So a runtime mistake inside a function stays hidden until the function is called.
//
// PROGRAM 1 (file e6.js)
// L1  function showScore() {
// L2    consol.log("score shown");     <- misspelled: consol, not console
// L3  }
// L4  console.log("program finished");
//
// PROGRAM 2 (file e7.js) = the same four lines, plus one more:
// L5  showScore();
//
// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. Write: the lines that print, or an error type.
// ----------------------------------------------------------------
// PROGRAM 1 terminal shows:  program finished
// PROGRAM 2 terminal shows:  ReferenceError
// *   THEN the ReferenceError. The body's typo only fails when showScore() is called. So it was not "same".
// ? MY CONFIDENCE on PROGRAM 1 (confident / unsure / guess): ____
// ? RUN:  node week-3/day2_errors/e6.js   then   node week-3/day2_errors/e7.js
// ? Where did your trace differ from the terminal? ____

// ================================================================
// ! E - CONCEPT - DEBUGGING WITH console.log, AND THE = BUG
// ================================================================
// When a program gives a WRONG answer (a logic error) there is no error message to read.
// The tool: add console.log lines that PRINT what your variables hold. A label in quotes,
// a comma, then the variable, tells you which line printed which value.
//
// PROGRAM (file e8.js)
// L1  let guess = 3;
// L2  console.log("guess before the if:", guess);
// L3  if (guess = 7) {                 <- ONE equals sign: assignment, not comparison
// L4    console.log("guess inside the if:", guess);
// L5    console.log("Correct!");
// L6  }
//
// From Day 1: = puts a value INTO a variable. === compares two values.
// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. Write each line the terminal will show, or "nothing".
// ----------------------------------------------------------------
// L2 prints:  3
// L4 prints:  7
// L5 prints:  Correct!
// ? MY CONFIDENCE on whether L5 prints ____
// ? RUN:  node week-3/day2_errors/e8.js
// ? FIX: in e8.js change  =  to  ===  on line 3, save, run again. What prints ____

// ================================================================
// ! F - CONCEPT - null: "NOTHING ON PURPOSE"
// ================================================================
// A DATA TYPE is the kind of value something is: number, string, boolean (true/false), and more.
// NEW: null — a value that means "nothing" or "no value yet", put there on purpose (no quotes)
// This block is live code in THIS file. Run the whole file to see it.

let winner = null;
console.log(winner);
winner = "Ada";
console.log(winner);

// ----------------------------------------------------------------
// ? TRACE — what do the two console.log lines above print, in order?
// ----------------------------------------------------------------
// FIRST line printed:  null
// SECOND line printed: Ada
// ? RUN:  node week-3/day2_reading_errors_variables.js   and check.

// ================================================================
// ! G - CONCEPT - THE COMMON SYNTAX ERRORS, AND THE LINE THAT IS NOT QUITE RIGHT
// ================================================================
// Three punctuation slips cause most beginner syntax errors. Node prints SyntaxError and runs
// nothing. Here are the three programs (files e9.js, e10.js, e11.js), restated in full:
//
// PROGRAM e9
// L1  const playerName = "Ada";
// L2  console.log("Hello", playerName;       <- the closing ) is missing
//
// PROGRAM e10
// L1  console.log("Hello);                    <- the closing " is missing
//
// PROGRAM e11
// L1  function greet() {
// L2    console.log("hi");
// L3                                         <- the closing } should be here
// L4  greet();
//
// And here are the three messages Node prints (one belongs to each program):
//   (a) SyntaxError: missing ) after argument list
//   (b) SyntaxError: Invalid or unexpected token
//   (c) SyntaxError: Unexpected end of input
//
// Also worth knowing: a missing colon inside an object ({ name "Ada" }) gives a message that
// mentions a missing colon or an unexpected string. Objects come much later; for now, just
// recognise that such a message means the shape of an object is wrong.
//
// KEY IDEA: the line Node REPORTS is where it NOTICED the problem, which can be LATER than
// where you MADE it. When the reported line looks fine, look UPWARD from it.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. Match each program to a message letter (a, b or c).
// ----------------------------------------------------------------
// e9  message: a
// e10 message: b
// e11 message: c
// e11: the line where the } is really missing:       L3
// e11: the line number you expect Node to REPORT:    L33
// ? RUN each:  node week-3/day2_errors/e9.js  (then e10.js, e11.js)
// ? Where did your trace differ from the terminal? ____

// ================================================================
// ! H - CONCEPT - VARIABLES IN DETAIL: DECLARE, undefined, INITIALIZE
// ================================================================
// A VARIABLE is a named container that holds a value. The variable is the box; the value is
// what is inside. You can swap the contents, and the box and its label stay the same.
//   to DECLARE a variable means to create it (make the box):    let myName;
//   to INITIALIZE it means to give it its first value:          myName = 'Arya';
//   you can do both in one line:                                let myDog = 'Rover';
// To REFERENCE a variable means to use its name to get the value inside.
// NEW: undefined — the value of a declared variable that has nothing in it yet (no quotes)
// A box that exists but is empty holds undefined. It is a VALUE, and the program keeps running.
//
// This part is live code in THIS file:
console.log('---------------------------------------')
let myName;
console.log(myName);
myName = 'Arya';
console.log(myName);
let myDog = 'Rover';
console.log(myDog);

// ----------------------------------------------------------------
// ? TRACE — the three console.log lines above print, in order:
// ----------------------------------------------------------------
// FIRST:  undefined
// SECOND: Arya
// THIRD:  Rover
//
// UNDEFINED vs UNDECLARED. These are two very different things:
//   undefined  = the variable EXISTS (declared), but nothing is in it. The program keeps running.
//   undeclared = the variable was NEVER made. Using it is a ReferenceError and the program stops.
//
// PROGRAM (file e12.js)
// L1  let city;
// L2  console.log(city);
// L3  console.log(town);              <- town was never declared
//
// ? PREDICT, then confidence — fill before running e12.js:
// e12.js prints, in order:  undefined then referenceeError
// ? MY CONFIDENCE (confident / unsure / guess): ____
// ? RUN:  node week-3/day2_reading_errors_variables.js   then   node week-3/day2_errors/e12.js

// ================================================================
// ! I - CONCEPT - var, THE OLD KEYWORD (RECOGNISE IT, DO NOT WRITE IT)
// ================================================================
// NEW: var — the original, older way to declare a variable; confusing and error-prone, so avoid it
// You will see var in older code and tutorials. let and const are the modern replacements. Two odd things:
//   1. HOISTING: with var, a variable can be used on a line ABOVE its declaration.
//   2. REDECLARING: with var, you can declare the same name twice and Node does not complain.
//      (the second  = 'blue'  is what overwrites the value; this folder's ESLint DOES flag it: no-redeclare)
// let does neither: it is stricter, which is what you want.
//
// This part is live code in THIS file (both parts are allowed because they use var):
console.log('------------------------------------')
/* eslint-disable no-var -- deliberate demo: block I shows what var does, so it is written on purpose */
petName = 'Biscuit';
console.log(petName);
var petName;

var color = 'red';
var color = 'blue';
console.log(color);
/* eslint-enable no-var */

// ----------------------------------------------------------------
// ? TRACE — the two console.log lines above print, in order:
// ----------------------------------------------------------------
// FIRST:  Biscuit
// SECOND: blue
//
// Now the SAME ideas with let instead of var. Both programs are restated in full:
//
// PROGRAM e13.js                          PROGRAM e14.js
// L1  let color = 'red';                  L1  petName = 'Biscuit';
// L2  let color = 'blue';                 L2  console.log(petName);
// L3  console.log(color);                 L3  let petName;
//
// ? PREDICT — fill before running:
// e13.js: does anything print? no   what kind of error: syntax
// e14.js: does anything print? no   what kind of error: reference
// ? MY CONFIDENCE on e13.js (confident / unsure / guess): ____
// ? RUN:  node week-3/day2_errors/e13.js   then   node week-3/day2_errors/e14.js
// * RULE: use const by default, and let only when the value will be reassigned (Day 3).
// * Recognise var when you read it; do not write it.

// ================================================================
// ! J - CONCEPT - UPDATING A VARIABLE, AND NAMING RULES
// ================================================================
// To UPDATE (reassign) a variable you use = again WITHOUT let, because the box already exists.
// Writing let again would be a second declaration, which is a SyntaxError (you saw it in e13).
//
// NAMING RULES — you choose every variable's name, but:
//   * use only letters a-z A-Z, digits 0-9, and the underscore _
//   * NEVER start a name with a digit: that is an ERROR
//   * do not start a name with an underscore: it is allowed, but it confuses readers
//   * a RESERVED word cannot be a name (let, const, var, function, for ...)
//   * use lower camel case for several words: start lowercase, capitalise each later word
//       pageCount  (good)      page_count  (runs, but looks out of place in JavaScript)
//   * pick names that say what the data is: bookTitle is better than x
//   * names are CASE SENSITIVE: myAge and myage are two different variables
//
// This part is live code in THIS file:
console.log('-------------------------')
let mood = 'sleepy';
console.log(mood);
mood = 'awake';
console.log(mood);

const bookTitle = 'Dune';
const pageCount = 412;
console.log(bookTitle);
console.log(pageCount);

const myAge = 30;
const myage = 99;
console.log(myAge);
console.log(myage);

// ----------------------------------------------------------------
// ? TRACE — the six console.log lines above print, in order. Fill every ____
// ----------------------------------------------------------------
// 1 sleepy 2 awake 3 Dune  4 412   5 30   6 99
//
// The six lines print: mood, mood, bookTitle, pageCount, myAge, myage (in that order).
// ? Which two names above are DIFFERENT variables only because of capital letters? ____
//
// ? NAME CHECK — for each name write: ok / avoid / error
// ?   place1 ____     1place ____     _total ____     page_count ____     for ____     pageCount ____
//
// Two of those are files you can run. Both are restated:
// PROGRAM e15.js                          PROGRAM e16.js
// L1  let 1stPlace = 'Ana';               L1  let for = 'loop';
// L2  console.log(1stPlace);              L2  console.log(for);
// ? PREDICT: e15.js: does anything print? ____
// ?          e16.js: does anything print? ____
// ? MY CONFIDENCE on e16.js (confident / unsure / guess): ____
// ? RUN: node week-3/day2_reading_errors_variables.js   then   e15.js and e16.js

// ================================================================
// ! K - CONCEPT - THE TWO KINDS OF VALUE SO FAR: NUMBERS AND STRINGS
// ================================================================
// NUMBER: written as plain digits, NO quotes. Whole numbers and decimals are both numbers.
// STRING: a piece of text wrapped in single quotes ' ' or double quotes " ".
// The quotes are not part of the text: they only mark where it starts and stops.
// Without quotes, JavaScript reads a word as a variable NAME.
//
// This part is live code in THIS file:
console.log('-------------------')
const age = 17;
const price = 23.42;
const greeting = 'Hello';
// prettier-ignore
const farewell = "Goodbye";
console.log(age);
console.log(price);
console.log(greeting);
console.log(farewell);

// ----------------------------------------------------------------
// ? TRACE — the four console.log lines above print, in order:
// ----------------------------------------------------------------
// 1 17   2 23.42   3 Hello   4 Goodbye
// ? Is 23.42 a number or a string? ____   Is 'Hello' a number or a string? ____
//
// PROGRAM e17.js
// L1  let greeting2 = Hello;             <- no quotes around Hello
// L2  console.log(greeting2);
// ? PREDICT: does e17.js print Hello, or throw an error? ____
// ? RUN: node week-3/day2_reading_errors_variables.js   then   node week-3/day2_errors/e17.js

// ================================================================
// ! L - CONCEPT - THE ERROR LOCATION, AND WHAT A VARIABLE CAN HOLD
// ================================================================
// THE LOCATION. In an error report, the LOCATION is the three-part address after the file name:
//   file : line : character      for example      app.js:14:3
// means: in the file app.js, on line 14, at character 3 of that line.
//
// SCOPE (a preview): code inside a function lives in its own separate region, called its SCOPE.
// A name made inside a function exists only in that region. Day 9 teaches this in full.
// Scope is about WHERE a name can be used. A typo inside a function waits for a different reason
// (Block D): the body does not run until the function is CALLED.
//
// ----------------------------------------------------------------
// ? TRACE — a real report line says:   score.js:7:12
// ----------------------------------------------------------------
// The file is score.js   the line is 7   the character is 12
//
// WHAT A VARIABLE CAN HOLD. A variable is a container, and the container does not care what
// goes in it: a number, text, true/false, or "nothing" (null). Later you will also store arrays,
// objects and even whole functions in variables. This part is live code in THIS file:
console.log('--------------------------')
const seats = 40;
const airline = 'Skyline';
const isFull = false;
const pilot = null;
console.log(seats);
console.log(airline);
console.log(isFull);
console.log(pilot);

// ----------------------------------------------------------------
// ? TRACE — the four console.log lines above print, in order:
// ----------------------------------------------------------------
// 1 40   2 Skyline   3 false   4 null
// ? How many different kinds of value are held in those four variables? ____
// ? RUN: node week-3/day2_reading_errors_variables.js   and check.

// ================================================================
// ! M - CONCEPT - THE EIGHT DATA TYPES, AND THE BROWSER'S WORDING FOR A MISSING }
// ================================================================
// A DATA TYPE is the kind of value something is. JavaScript has exactly EIGHT:
//   number · string · boolean (true / false) · null · undefined · bigint · symbol · object
// Five of the eight have already appeared in this file. The last three (bigint, symbol, object)
// come in later days. You do not need them yet.
//
// ? TRACE — from the list above, write the FIVE types this file has already used,
// ? one example value each (for example: number, 40):
// 1 number 40   2 string skyline   3 boolean true   4 null   5 undefined
//
// MISSING }  — one mistake, two wordings. Block G's e11.js has a function whose closing } is missing.
//   * Node says:                 SyntaxError: Unexpected end of input
//   * Firefox says:              SyntaxError: missing } after function body
//   * Chrome and Edge use the same engine as Node (V8), so they say  Unexpected end of input,
//     exactly like Node.
// Same mistake, different words, depending on the ENGINE.
//
// ? TRACE — the character that is missing in both cases is: }
// ? Which wording points more directly at what is wrong, Node's or the browser's? ____
