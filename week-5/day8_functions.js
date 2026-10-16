// ================================================================
// ! BOOTCAMP JS — DAY 8 of 19 — FUNCTIONS: DEFINING, PARAMETERS, ARROWS, CALLBACKS
// ! Material: materials/js_fundamentals.md §8.1, §8.2
// ! Sources: MDN Learn "Functions — reusable blocks of code" · Codecademy "Functions" and "Higher-Order Functions"
// ================================================================
// * SECTIONS TODAY: 8.1, 8.2
// * Every concept: 1 TRACE (fill the blanks BEFORE running) → 2 RUN → 3 MODIFY → 4 WRITE
// * Each block starts by printing a label like  --- 8A ---  so you can match output to block.
// * Run the whole file from the bootcamp folder:
// *     node week-5/day8_functions.js
// * WRITE lines use names that start with my. Re-read the WRITE spec before you move on.
// * The confidence blank takes ONE word: confident, unsure or guess.
// * OUTPUT lines: read them off your own per-line marks, top to bottom, and count the lines AFTER a loop or a call too.
// * Why this day matters tonight: the instructor's  btn.addEventListener('click', () => { ... })  is a function handed to
// *   another function. Blocks 8A-8D build the pieces; the arrow and the callback come in the later blocks.

// ================================================================
// ! RETRIEVAL GATE - DAY 7. From memory, BEFORE running, no looking back.
// ================================================================
console.log('--- GATE 8 ---');
const gateNums = [4, 0, 9];
for (const gateNum of gateNums) {
  if (gateNum === 0) {
    break;
  }
  console.log(gateNum);
}
console.log('after');
// ? OUTPUT (every line under --- GATE 8 ---, up to here, in order): ____
// ? Is the 9 ever printed? ____  Why? ____
const gateCart = ['pen', 'ink'];
const gateResult = gateCart.push('pad');
console.log(gateResult); // ? prints: ____
// ? MY CONFIDENCE on the OUTPUT line (confident / unsure / guess): ____

// ================================================================
// ! 8A - CONCEPT - WHAT A FUNCTION IS FOR, AND SPOTTING ONE
// ================================================================
// * SKILLS: functions_purpose, abstraction, parentheses_signal_function, built_in_functions, functions_vs_methods
// Source: MDN Learn "Functions": functions "allow you to store a piece of code that does a single task inside a
//         defined block, and then call that code whenever" you want.
//         Codecademy "Functions": functions are the way "to use 'abstraction' in programming."
//         MDN Learn: if you see a name with parentheses after it and "you're not using a common language structure
//         like a for loop, while or do...while loop, or if...else statement, you are making use of a function."
//         MDN Learn: "Functions that are part of objects are called methods."
//
// A FUNCTION is a block of code that does ONE job, usually with a name. You write the code once, then run it
// whenever you need it by using the name.
// Why it exists: without functions you copy the same lines every time you need them. A bug in those lines then has
// to be fixed in every copy, and you will miss one.
// ABSTRACTION means hiding HOW a job is done behind a name that says WHAT is done. Reading  Math.floor(4.7)  you
// do not need to know how rounding down works inside; the name tells you the job.
// SPOTTING ONE: a name followed straight by ( ) almost always means a function is being used.
//   The exception: the ( ) after  if ,  for ,  while  belong to the language itself, not to a function.
// BUILT-IN functions come with JavaScript, so you use them without writing them. You already have:
//   Math.floor()  Math.random()  .toUpperCase()  .join()  .push()  console.log()
// A METHOD is a function that belongs to an object. The dot  .  reaches inside the object to get it:
//   Math.floor  is the  floor  function inside the  Math  object;  .toUpperCase  lives on every string.
//
// WORKED EXAMPLE (already traced)
// L1  console.log(Math.floor(9.8));
//     Two functions here, both methods: floor (inside Math) runs first and gives 9; then log (inside console)
//     prints it: 9.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running
// ----------------------------------------------------------------
console.log('--- 8A ---');
const price = 4.7;
console.log(Math.floor(price)); // ? prints: ____
console.log('quiet'.toUpperCase()); // ? prints: ____
if (price > 4) {
  // ? the ( ) right after  if  : a function call? (yes / no) ____
  console.log('over 4'); // ? this line: ____
}
// ? In  Math.floor(price) : the OBJECT is ____ and the FUNCTION (method) is ____
// ? Is  log  in  console.log  a method? (yes / no) ____
// ? OUTPUT (all lines under --- 8A ---, in order): ____
// ? MY CONFIDENCE (confident / unsure / guess): ____
//
// ? RUN and compare. Where did it differ from your marks? ____
// ? MODIFY: add a new line  console.log('LOUD'.toLowerCase());  under the toUpperCase line. What prints? ____
// ? WRITE (words, no code): in one sentence, what does the name  Math.floor  tell you, and what does it hide? ____

// ================================================================
// ! 8B - CONCEPT - WRITING YOUR OWN FUNCTION, AND CALLING IT
// ================================================================
// * SKILLS: custom_functions, identifier_term, function_body, invoke_function, body_runs_on_call
// Source: MDN Learn "Functions": custom functions are "functions defined in your code, not inside the browser."
//         Codecademy "Functions": "The name of the function, or its identifier, followed by parentheses."
//         Codecademy: "A function body, or the block of statements required to perform a specific task, enclosed
//         in the function's curly brackets, { }."
//         MDN Learn: calling "is done by including the function's name in the code somewhere, followed by
//         parentheses."
//         Codecademy: "The code inside a function body runs, or executes, only when the function is called."
//
// A CUSTOM function is one you write yourself, with a FUNCTION DECLARATION. Its parts, left to right:
//   function     the keyword: "a function definition starts here"
//   cheer        the IDENTIFIER: the name you give it (variables have identifiers too)
//   ( )          will hold its inputs later (8D). Empty for now.
//   { }          the BODY: the lines that do the job
// DECLARING a function only STORES the body. Nothing in it runs yet.
// CALLING it (also INVOKING it) RUNS the body: write the name, then ( ):   cheer();
// Each call runs the WHOLE body ONCE. Two calls → the body runs twice. Zero calls → it never runs.
// The name WITHOUT ( ) only mentions the function. It runs nothing.
// Analogy: a declaration is writing a recipe card and putting it in the drawer. A call is cooking it. You can cook
//   from the same card as many times as you like, and putting the card away cooks nothing.
// Python: same idea as  def cheer():  but with  function , braces instead of a colon, and no indentation rule.
//
// WORKED EXAMPLE (already traced)
// L1  function sayHi() {  console.log('Hi');  }
// L2  sayHi();
// L3  sayHi();
//     L1 stores the body and prints nothing. L2 calls it: prints Hi. L3 calls it again: prints Hi again.
//     Output: Hi, Hi (2 lines, one per call).

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running
// ----------------------------------------------------------------
console.log('--- 8B ---');
// NEW: function declaration — function name() { body } stores a body under a name; nothing in it runs yet
// NEW: calling (invoking) — the name followed by ( ) runs the body once, e.g. cheer();
function cheer() {
  console.log('Go team!'); // ? does this line run at the moment JS reads the declaration? (yes / no) ____
}
console.log('before the calls');
cheer(); // ? runs the body? (yes / no) ____
cheer; // ? runs the body? (yes / no) ____
cheer(); // ? runs the body? (yes / no) ____
console.log('after the calls');
// ? The function's IDENTIFIER is ____ , and its BODY is the line 127, Go team!
// ? 'Go team!' prints ____ time(s) in total
// ? OUTPUT (all lines under --- 8B ---, in order): ____
// ? MY CONFIDENCE (confident / unsure / guess): ____
//
// ? RUN and compare. Where did it differ from your marks? ____
// ? MODIFY: add a new line  cheer();  under the  'after the calls'  line. How many times does 'Go team!' print now? ____
// ? WRITE: on the lines below, declare a function  myIntro  whose body prints  I study JS , then call it ONE time.
// ================================================================
// ! 8C - CONCEPT - CALLING BEFORE THE DECLARATION: HOISTING
// ================================================================
// * SKILLS: function_declaration_hoisted
// Source: MDN Learn "Functions": "This form of creating a function is also known as function declaration. It is
//         always hoisted."
//         Codecademy "Functions": "the hoisting feature in JavaScript, which allows access to function declarations
//         before they're defined."
//
// HOISTING: before running line 1, JavaScript reads the whole file and registers every function DECLARATION.
// So a declared function can be called on a line ABOVE the one that defines it, and it works.
// Why you need to know it: you will see this in other people's code and in the instructor's, and it looks like a bug.
// It is something to RECOGNISE, not to rely on: define functions above where you call them, so the file reads
// top to bottom. Later today (8G) you meet a way of making functions that is NOT hoisted, and crashes if you try.
// Compare Day 2: a variable used before its  let  line is a ReferenceError. A function declaration is the exception.
//
// WORKED EXAMPLE (already traced)
// L1  wave();
// L2  function wave() {  console.log('wave');  }
//     wave was registered before L1 ran, so L1 works: prints wave.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running
// ----------------------------------------------------------------
console.log('--- 8C ---');
early(); // ? does this call work, though  early  is written BELOW it? (works / error) ____
function early() {
  console.log('called from above');
}
console.log('end of 8C');
// ? OUTPUT (all lines under --- 8C ---, in order): ____
// ? MY CONFIDENCE (confident / unsure / guess): ____
//
// ? RUN and compare. Where did it differ from your marks? ____
// ? MODIFY: add a new line  early();  under the  'end of 8C'  line. How many times does 'called from above' print now? ____
// ? WRITE (words, no code): in one sentence, why does the call on the line above the declaration work? ____

// ================================================================
// ! 8D - CONCEPT - PARAMETERS AND ARGUMENTS: GIVING A FUNCTION INPUT
// ================================================================
// * SKILLS: parameters, arguments_concept, argument_order, parameters_vs_arguments
// Source: Codecademy "Functions": "Parameters allow functions to accept input(s) and perform a task using the
//         input(s)."
//         Codecademy: "The values that are passed to the function when it is called are called arguments."
//         Codecademy: "the order in which arguments are passed and assigned follows the order in which the
//         parameters are declared."
//         MDN: "Parameters are the variables listed in a function definition, while arguments are the values passed
//         to the function to represent the parameters."
//
// A function that always prints the same thing is limited. PARAMETERS let it work on different values.
// A PARAMETER is a NAME written inside the ( ) of the DEFINITION. Inside the body it behaves like a variable.
// An ARGUMENT is the actual VALUE written inside the ( ) of the CALL.
// When the call runs, each argument is put into its parameter, then the body runs.
//   function welcome(guest) { ... }     guest     is the PARAMETER (a name, in the definition)
//   welcome('Ada');                     'Ada'     is the ARGUMENT  (a value, in the call)
// They are NOT properties. A property is a fact stored on an object, reached with a dot ( 'hi'.length ).
// TWO OR MORE: arguments go into parameters by POSITION, not by name: first into first, second into second.
//   Swap the arguments and JavaScript cannot tell you meant otherwise. Nothing crashes; the output is just wrong.
// Analogy: parameters are the labelled boxes on a form ("animal", "pet name"); arguments are what you write in
//   them this time. Write the answers in the wrong boxes and the form still gets processed, wrongly.
//
// WORKED EXAMPLE (already traced)
// L1  function shout(word) {  console.log(word.toUpperCase());  }
// L2  shout('hey');
// L3  shout('bye');
//     L2: the argument 'hey' goes into the parameter word, prints HEY. L3: word now holds 'bye', prints BYE.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running
// ----------------------------------------------------------------
console.log('--- 8D ---');
// NEW: parameter — a name inside the DEFINITION's ( ) that receives an input; inside the body it acts like a variable
// NEW: argument — the value inside the CALL's ( ); it is put into the matching parameter before the body runs
function welcome(guest) {
  console.log(`Welcome, ${guest}!`);
}
welcome('Ada'); // ? guest holds ____ , prints ____
welcome('Linus'); // ? guest holds ____ , prints ____
function describePet(animal, petName) {
  console.log(`${petName} is a ${animal}.`);
}
describePet('cat', 'Milo'); // ? animal holds ____ , petName holds ____ , prints ____
describePet('Milo', 'cat'); // ? animal holds ____ , petName holds ____ , prints ____
// ? In  welcome('Ada') :  'Ada'  is the ____ and  guest  is the ____ (argument / parameter)
// ? In  update('white', 'black') :  'white'  and  'black'  are the call's ____ (arguments / parameters / properties)
// ? OUTPUT (all lines under --- 8D ---, in order): ____
// ? MY CONFIDENCE (confident / unsure / guess): ____
//
// ? RUN and compare. Where did it differ from your marks? ____
// ? MODIFY: add a new line  welcome('Grace');  under the  welcome('Linus')  line. What prints? ____
// ? WRITE: on the lines below, declare  myLabel  with the parameters  item  and  cost , whose body prints  <item>: $<cost> ; then call it with  'tea', 3  so it prints  tea: $3 .
