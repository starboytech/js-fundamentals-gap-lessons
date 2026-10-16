// ================================================================
// ! BOOTCAMP JS — DAY 3 of 19 — TYPES AND const, NUMBERS AND Math
// ! Material: materials/js_fundamentals.md §2.2, §3.1
// ! Sources: MDN Learn "Variables" · MDN Learn "Basic math in JavaScript" · MDN Learn "A first splash into JavaScript" · Codecademy "Introduction to JavaScript", "Variables", "Arrays"
// ================================================================
// * SECTIONS TODAY: 2.2, 3.1
// * Every concept: 1 TRACE (fill the blanks BEFORE running) → 2 RUN → 3 MODIFY → 4 WRITE
// * Unlike Day 2, this file RUNS: every block has live code that prints.
// * Each block starts by printing a label like  --- A ---  so you can match output to block.
// * Run the whole file from the bootcamp folder:
// *     node week-3/day3_types_numbers.js
// * so they never clash with a name already used in the file.

// ================================================================
// ! A - CONCEPT - STRINGS, NUMBERS, BOOLEANS, AND TESTS THAT ANSWER true OR false
// ================================================================
// Source: Codecademy "Introduction to JavaScript" (printing the number 40: "notice we did not
// use quotes") · MDN Learn "Variables" (booleans: "they can have two values, true or false")
//
// Three kinds of value you can give console.log:
//   TEXT     goes inside quotes:   "JavaScript"      (called a STRING)
//   NUMBER   has NO quotes:        40
//   BOOLEAN  only two possible values, written  true  and  false
//            lowercase, NO quotes. It stores the answer to a yes/no question.
// A COMPARISON is a test such as  6 < 3  (read: "is 6 less than 3?").
// The answer to a comparison is always a boolean.
// There is also a type called Symbol (a unique identifier). You only need to know the
// name exists. We never use it in this course.
//
// WORKED EXAMPLE (already traced)
// L1  console.log(2 < 9);       prints true    (2 is less than 9, so the answer is yes)
// L2  console.log("true");      prints true    (here the quotes make it TEXT: four letters)

// ----------------------------------------------------------------
// ? TRACE — write what each line prints. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- A ---");
const isOpen = true;
const isEmpty = false;
console.log(isOpen);               // ? prints: ____
console.log(isEmpty);              // ? prints: ____
console.log(6 < 3);                // ? prints: ____
const answer = 6 < 3;
console.log(answer);               // ? prints: ____
console.log(true === "true");      // ? prints: ____
// ? MY CONFIDENCE on the  console.log(answer)  line (confident / unsure / guess): ____
//
// ? RUN the file, find the block marked  --- A ---, and compare your five answers.
// ? MODIFY: change  6 < 3  in the  const answer  line to  3 < 6  and run again. What does answer print now? ____
// ? WRITE: on the line below, make a variable  myTest  that holds a comparison of any two
// ?        numbers, then print it on the next line.
// ================================================================
// ! B - CONCEPT - ARRAYS: A LIST UNDER ONE NAME, COUNTED FROM 0
// ================================================================
// Source: MDN Learn "Variables" (arrays) · Codecademy "Arrays"
//
// An ARRAY is one value that holds a list of values.
//   It is written inside [ ] (square brackets), with a , (comma) between the items.
//   One item in the list is called an ELEMENT.
// Arrays are ORDERED: every element has a numbered position, called its INDEX.
// Counting starts at 0, not 1, so the FIRST element has index 0.
// To read one element, write the array's name and then the index inside [ ]:   planets[0]
//
// WORKED EXAMPLE (already traced)
// L1  const planets = ["Mars", "Venus", "Earth"];
// L2  console.log(planets[0]);      prints Mars     (index 0 is the first element)
// L3  console.log(planets[2]);      prints Earth    (three elements sit at indexes 0, 1 and 2)

// ----------------------------------------------------------------
// ? TRACE — same idea, a different array. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- B ---");
const snacks = ["chips", "grapes", "popcorn", "lasagna"];
console.log(snacks[0]);            // ? prints: ____
console.log(snacks[2]);            // ? prints: ____
console.log(snacks[1]);            // ? prints: ____
console.log(snacks[3]);            // ? prints: ____
// ? MY CONFIDENCE on the  snacks[3]  line (confident / unsure / guess): ____
// (snacks has three elements. Index 3 is one past the last one.)
// *   MODIFY the array has FOUR elements, so snacks[3] now prints lasagna. Worked examples and tutor code
// *   in this file now use const where the name is never reassigned.)
//
// ? RUN and compare. Then tell me in chat what the  snacks[3]  line did.
// ? MODIFY: change the first line of this block's array to hold FOUR elements
// ?         (add "candy" at the end, with a comma before it). Run again. Now what does snacks[3] print? ____
// ? WRITE: on the line below, make an array  myColors  with three colors and print the LAST one.
// ================================================================
// ! C - CONCEPT - OBJECTS: RELATED FACTS UNDER ONE NAME
// ================================================================
// Source: MDN Learn "Variables" (objects) · Codecademy "Introduction to JavaScript"
//
// An OBJECT is a structure of code that models a real-life thing: a dog, a book, a user.
// It keeps related facts together under ONE variable name.
//   { and } are curly braces. They wrap the whole object.
//   Each fact is written  label: value   (the : colon separates the two).
//   A , comma goes between one fact and the next.
//   To read one fact: the variable, then a . (dot), then the label:   dog.name
//   Read dog.name as "dog's name". (The dot is defined properly later today, in section 3.1.)
//
// WORKED EXAMPLE (already traced)
// L1  const book = { title: "Dune", pages: 412 };
// L2  console.log(book.title);      prints Dune
// L3  console.log(book.pages);      prints 412

// ----------------------------------------------------------------
// ? TRACE — a different object, plus one array to compare it with. Fill every ____.
// ----------------------------------------------------------------
console.log("--- C ---");
const dog = { name: "Spot", breed: "Dalmatian", age: "4" };
console.log(dog.name);             // ? prints: ____
console.log(dog.breed);            // ? prints: ____
const pets = ["Rex", "Mia"];
console.log(pets[1]);              // ? prints: ____
// ? One word each: an array finds an element by its index (like pets[1]);
// ?                an object finds a fact by its variable and fact with a dot in the middle (like dog.name).
//
// ? RUN and compare.
// ? MODIFY: add a third fact to dog, a comma after "Dalmatian" then  age: 4  , and print dog.age. It prints: ____
// ? WRITE: on the line below, make an object  myBook  with a title and an author, and print both.
// ================================================================
// ! D - CONCEPT - JS NEVER ASKS FOR A TYPE, AND typeof TELLS YOU WHAT YOU HAVE
// ================================================================
// Source: MDN Learn "Variables" (dynamic typing, typeof) · Codecademy "Variables" (typeof)
//
// DYNAMIC TYPING: you never write a type when you make a variable. JavaScript looks at the
// VALUE you put in and works the type out. The same  let  can hold a number, text, or a list.
// The quotes decide the type, not what is inside them: "500" is TEXT, even though it is
// digits. MDN: "Even if the value enclosed in quotes is just digits, it is still a
// string — not a number".
//
// NEW: typeof — an operator (a word that does a task on a value) that gives back the type of the value, as text
//
// How to read it: write  typeof  then a space then the value or variable.
// WORKED EXAMPLE (already traced)
// L1  console.log(typeof 42);        prints number
// L2  console.log(typeof "hi");      prints string
// L3  console.log(typeof false);     prints boolean
// (Python habit: type(x) shows  <class 'int'>. JS typeof needs no parentheses and gives a word.
//  You will also see  typeof(x) , which works the same: the parentheses only group.)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- D ---");
const label = 500;
const quantity = "500";
console.log(typeof quantity);      // ? prints: ____
console.log(typeof label);         // ? prints: ____
console.log(quantity === label);   // ? prints: ____
let nothing;
console.log(typeof nothing);       // ? prints: ____
console.log(typeof [1, 2]);        // ? prints: ____
let mood = "happy";
console.log(typeof mood);          // ? prints: ____
mood = 7;
console.log(typeof mood);          // ? prints: ____
// ? MY CONFIDENCE on the  typeof label  line (confident / unsure / guess): ____
//
// ? RUN and compare. Where did you differ?
// ? MODIFY: change the quantity/label pair so  label  holds the number 500 (no quotes).
// ?         Run again. What does  quantity === label  print now? ____
// ? WRITE: on the line below, make a variable  myThing  holding any value and print its typeof.
// ?        Then give myThing a value of a DIFFERENT type on the next line and print its typeof again.

// ================================================================
// ! E - CONCEPT - const: A VARIABLE THAT CANNOT BE REASSIGNED
// ================================================================
// Source: MDN Learn "Variables" ("you must initialize them when you declare them" and
// "you can't assign them a new value after you've initialized them") · Codecademy "Variables"
//
// You met const on Day 1. It has two rules that let does not have:
//   RULE 1: a const must get its value on the SAME line it is made.
//           (To INITIALIZE means to give a variable its first value.)
//   RULE 2: after that, it can never be given a new value.
// Why have a variable that can't be reassigned? It is a promise to whoever reads the code:
// the variable will always hold the value from that line. If that value is an array or object,
// its CONTENTS can still change (push on a const array works, Day 5).
// MDN's rule of thumb: "Use const when you can, and use let when you have to."
//
// Two broken programs live in separate files so they cannot stop THIS file. Restated here:
//
// PROGRAM 1 (file week-3/day3_errors/c1.js)
// L1  console.log("start");
// L2  const birthYear;              <- no value given 
// L3  console.log("end");
//
// PROGRAM 2 (file week-3/day3_errors/c2.js)
// L1  const birthYear = 1999;
// L2  console.log(birthYear);
// L3  birthYear = 2001;             <- tries to give a const a new value
// L4  console.log("after");

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. kind = syntax / runtime / logic.
// ----------------------------------------------------------------
// PROGRAM 1  does  start  print? nothing    kind: syntax    error TYPE: syntax    line: 2
// ? MY CONFIDENCE on PROGRAM 1's  start  answer (confident / unsure / guess): ____
// PROGRAM 2  does  1999  print? yes    does  after  print? no    kind: syntax    error TYPE: syntax    line: 3
//
// ? RUN them, one at a time, from the bootcamp folder:
//     node week-3/day3_errors/c1.js
//     node week-3/day3_errors/c2.js
// ? Where did your trace differ from the terminal? ____
//
// Live code for this block (const for what never changes, let for what does):
console.log("--- E ---");
const userName = "Jasmine";
let loginCount = 1;
loginCount = 2;
console.log(userName, loginCount);     // ? prints: ____
// ? Write const or let for each one:
// ?   a year of birth that never changes: ____
// ?   a score that goes up during a game: ____
// ?   a username typed once at sign-up: ____
//
// ? MODIFY: open the REAL file  week-3/day3_errors/c2.js  (in the sidebar, not this copy).
// ?         Change  const  to  let  on line 1, save, run it again. What prints? ____
// ? WRITE: on the lines below, make a const  myCity  holding any city, and a let  myVisits  holding 1,
// ?        change myVisits to 2, then print both on one line with one console.log.

// ================================================================
// ! F - CONCEPT - NUMBERS: ONE TYPE, EVEN THOUGH THEY LOOK LIKE TWO
// ================================================================
// Source: MDN Learn "Basic math in JavaScript" · Codecademy "Introduction to JavaScript"
//
// An INTEGER is a whole number, with no fractional part:   12   400   0
// A FLOAT has a decimal point and decimal places:           2.5   56.7786543
// PYTHON HABIT: Python has two types, int and float. JavaScript has ONE type for both,
// called number. MDN: "JavaScript has only one data type to represent basic numbers —
// both integers and decimals." So typeof says  number  for both. There is no answer
// "integer" or "float".
//
// Two things to RECOGNISE (mentions only, you will not use them in this course):
//   BigInt: a second number type for very, very large whole numbers. It ends in n:
//           1234567890123456789n   and  typeof  gives  bigint.
//   Other number systems: everyday counting is base 10 (decimal). 0xff is hexadecimal
//           (base 16) and 0b101 is binary (base 2). console.log prints them in decimal.
//
// The eight types you have met: Number, BigInt, String, Boolean, Null, Undefined, Symbol, Object.
// The first seven are PRIMITIVE: each is a single simple value (one number, one piece of
// text, one true). Object is the eighth: a COLLECTION that holds many values.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- F ---");
const wholeCookies = 12;
const cupsOfFlour = 3;
console.log(wholeCookies);             // ? prints: ____
console.log(cupsOfFlour);              // ? prints: ____
console.log(typeof wholeCookies);      // ? prints: ____
console.log(typeof cupsOfFlour);       // ? prints: ____
console.log(typeof "seven");           // ? prints: ____
console.log(typeof { count: 7 });      // ? prints: ____
// ? MY CONFIDENCE on the  typeof cupsOfFlour  line (confident / unsure / guess): ____
// ? Of the 8 types, how many are primitive? ____    Which one is NOT primitive? ____
//
// Not traced, just look at the output (the two mentions above):
console.log(0xff);
console.log(typeof 7n);
//
// ? RUN and compare.
// ? MODIFY: change cupsOfFlour to the whole number 3 and run again. What does its typeof print now? ____
// ? WRITE: on the lines below, make a const  myPrice  holding 9.99 and a const  myCount  holding 3,
// ?        then print the typeof of each one.
// ================================================================
// ! G - CONCEPT - VALUES, PROPERTIES, METHODS, AND THE DOT
// ================================================================
// Source: Codecademy "Introduction to JavaScript" (instances, properties, methods,
// "The . is another operator! We call it the dot operator.")
//
// Every value belongs to a TYPE. One particular value is an INSTANCE of its type:
//   "hello" is one instance of the string type, "goodbye" is another, 42 is an instance of number.
//   (Think of the type as a cookie cutter and each instance as one cookie.)
// A PROPERTY is a piece of information a value carries about itself.
//   cat.name reads the  name  property of cat.
// A METHOD is an ACTION a value can perform. A property IS information. A method DOES something.
// The . (dot) is an operator, called the DOT OPERATOR: "reach inside this value and get
// the thing named next".
// To CALL a method (make it run) you write four parts:
//   1. the value   2. a dot   3. the method's name   4. ( ) parentheses
// The ( ) are what make it run. Anything you put inside them is an ARGUMENT, an input the
// method needs. Several arguments are separated by commas.
//
// You have been calling a method since Day 1:
//   console.log("Hello", "world")
//   console           the value (a built-in object that stands for the terminal)
//   .                 the dot
//   log               the method name: the ACTION is "print this"
//   ("Hello", "world")  the parentheses, holding TWO arguments
//
// WORKED EXAMPLE (already traced)
// L1  const band = { name: "Queen", members: 4 };
// L2  console.log(band.name);               prints Queen     (band.name is a PROPERTY: no ( ))
// L3  console.log("Band:", band.name);      prints Band: Queen   (log is a METHOD: it has ( ))

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- G ---");
const cat = { name: "Tom", lives: 9 };
console.log(cat.name);                 // ? prints: ____
console.log(cat.lives);                // ? prints: ____
console.log("Cat:", cat.name, cat.lives);         // ? prints: ____
// ? Look at the LAST line above,  console.log("Cat:", cat.name);  and fill in:
// ?   the value the dot reaches into: console
// ?   the method's name: log
// ?   how many arguments (a number): 2
// ?   is  cat.name  a property or a method? ____
//
// ? RUN and compare.
// ? MODIFY: change the last line so it prints ____, cat.name, cat.lives. It prints: Cat: Tom 9
// ? WRITE: on the line below, make an object  myPet  with a name and an age, then print both with
// ?        ONE console.log that has two arguments.
// ================================================================
// ! H - CONCEPT - BUILT-IN OBJECTS: Math, A STRING METHOD, AND LOOKING THINGS UP
// ================================================================
// Source: Codecademy "Introduction to JavaScript" (the Math object, .trim()) · MDN Learn
// "A first splash into JavaScript" (Math.random, Math.floor)
//
// A BUILT-IN OBJECT is one JavaScript gives you ready-made, with nothing to set up.
// Math is one. It holds math methods, called the same way: Math, a dot, the name, ( ).
//
// NEW: Math — a built-in object that holds math methods; you write Math, a dot, the method name, then ( )
//
//   Math.random()   gives a random decimal from 0 up to (but never including) 1.
//   Math.floor(x)   rounds x down to the nearest whole number AT OR BELOW it. x is the argument.
//                   Math.floor(4.7) is 4, Math.floor(5) stays 5, Math.floor(-4.2) is -5.
//
// Strings are values too, so they have methods:
//
// NEW: .trim() — a string method that gives back a copy of the text with WHITESPACE (spaces, tabs, line breaks) removed from both ends
//
// WORKED EXAMPLE (already traced)
// L1  console.log(Math.floor(9.9));     prints 9     (down, never up, even though 9.9 is almost 10)
//
// A common mistake: expecting Math.floor(4.7) to give 5. It does NOT round to the nearest.
// It always goes DOWN.

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. The [ ] just show where the text starts and ends.
// ----------------------------------------------------------------
console.log("--- H ---");
const typed = "   Remember to code   ";
console.log(`[${typed}]`);              // ? prints: ____
console.log(`[${typed.trim()}]`);       // ? prints: ____
console.log(Math.floor(4.7));           // ? prints: ____
console.log(Math.floor(4.2));           // ? prints: ____
const roll = Math.random();
console.log(roll < 1);                  // ? prints: ____
// ? MY CONFIDENCE on the  Math.floor(4.7)  line (confident / unsure / guess): ____
//
// ? RUN and compare. (Math.random gives a different number every run, so the file only checks it is below 1.)
//
// ? LOOK IT UP (this is the skill from Day 2: find it on MDN, do not guess).
// ?   Open https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
// ?   Find the Math method that returns the smallest integer greater than or equal to a given number.
// ?   Its name:  ____
// ?   Open https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
// ?   Find the Number method that checks whether a value is an integer.
// ?   Its name:  ____
// ? WRITE: on the lines below, use the two methods you found: print the first one with 4.2 as the
// ?        argument, and the second one with 5.5 as the argument.

// ================================================================
// ! I - CONCEPT - OPERATORS, ARITHMETIC, AND WHAT console.log REALLY PRINTS
// ================================================================
// Source: Codecademy "Introduction to JavaScript" ("An operator is a character that performs a
// task in our code", console.log "will evaluate the expression inside the parentheses and print
// that result") · MDN Learn "Basic math in JavaScript"
//
// An OPERATOR is a symbol (or a keyword like typeof) that performs a task. You already know three:
//   =   puts a value into a variable      ===   compares two values      .   the dot
// The ARITHMETIC operators do maths on numbers:
//
// NEW: arithmetic + - * / — operators that add, subtract, multiply and divide (* is multiply, / is divide)
//
//   +  add      -  subtract      *  multiply (an asterisk, not the letter x)      /  divide
// An EXPRESSION is any piece of code that produces a value. 3 + 4 is an expression.
// console.log WORKS OUT (evaluates) the expression first, then prints only the answer.
// It never sees  3 + 4  , it receives  7. But  "3 + 4"  in QUOTES is just text, no maths.
//
// WORKED EXAMPLE (already traced)
// L1  console.log(2 + 2);        prints 4
// L2  console.log("2 + 2");      prints 2 + 2    (quotes: it is text, so it is printed as written)
// L3  console.log(8 / 2);        prints 4

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- I ---");
console.log("JavaScript");             // ? prints: ____
console.log(40);                       // ? prints: ____
console.log("40");                     // ? prints: ____
console.log(3 + 4);                    // ? prints: ____
console.log("3 + 4");                  // ? prints: ____
console.log(10 - 4);                   // ? prints: ____
console.log(6 * 7);                    // ? prints: ____
console.log(10 / 4);                   // ? prints: ____
const unitPrice = 20;
const boxes = 5;
console.log(unitPrice * boxes);        // ? prints: ____
// ? MY CONFIDENCE on the  console.log("3 + 4")  line (confident / unsure / guess): ____
//
// ? RUN and compare.
// ? MODIFY: change  boxes  to 5 and run again. The last line of block I prints: ____
// ? WRITE: on the line below, print the result of 7 multiplied by 4, using the right operator.


// ================================================================
// ! J - CONCEPT - UPDATING A VARIABLE FROM ITS OWN VALUE, REMAINDER, AND POWERS
// ================================================================
// Source: Codecademy "Introduction to JavaScript" (w = w + 1) · MDN Learn "Basic math in
// JavaScript" (remainder, exponent)
//
// UPDATING: a variable can be changed using its OWN old value.   w = w + 1
// = does not mean "equals" here. It means "store into". The line runs in two steps:
//   step 1: work out the RIGHT side first (look up w, add 1)
//   step 2: store that answer back into w
// The variable must be  let , because it is being reassigned.
//
// REMAINDER: the amount left over after dividing.
//
// NEW: % — the remainder operator: the amount left over after dividing the left number by the right (nothing to do with percentages)
//
//   10 % 3 is 1 : 3 goes into 10 three whole times (that uses 9), and 1 is left.
//   For a POSITIVE whole number, % 2 is 0 if it is even and 1 if it is odd. A negative odd number
//   gives -1 (-3 % 2 is -1; Python gives 1), so test "odd" with  n % 2 !== 0 .
//
// POWERS:
//
// NEW: ** — the exponent operator: raises the left number to the power of the right one (2 ** 3 is 2 times 2 times 2)
//
// PYTHON HABIT: // starts a COMMENT in JavaScript (it is not floor division as in Python).
//
// WORKED EXAMPLE (already traced)
// L1  let n = 4;
// L2  n = n + 1;                 n is now 5   (4 + 1 stored back into n)
// L3  console.log(9 % 4);        prints 1     (4 goes into 9 twice, 8, and 1 is left)
// L4  console.log(2 ** 4);       prints 16    (2 * 2 * 2 * 2)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- J ---");
let w = 10;
w = w + 1;
console.log(w);                        // ? prints: ____
w = w * 2;
console.log(w);                        // ? prints: ____
console.log(10 % 3);                   // ? prints: ____
console.log(8 % 2);                    // ? prints: ____
console.log(11 % 2);                   // ? prints: ____
console.log(5 % 10);                   // ? prints: ____
console.log(2 ** 3);                   // ? prints: ____
console.log(3 ** 2);                   // ? prints: ____
// ? MY CONFIDENCE on the  5 % 10  line (confident / unsure / guess): ____
//
// ? RUN and compare.
// ? MODIFY: change the first line of the block to  let w = 10;  and run again. The two w lines print: ____ and ____
// ? WRITE: on the line below, print the remainder when 17 is divided by 5.
// ================================================================
// ! K - CONCEPT - METHODS ON NUMBERS, AND WHEN A "NUMBER" IS REALLY TEXT
// ================================================================
// Source: MDN Learn "Basic math in JavaScript" ("provides several methods to manipulate
// numbers", toFixed, "You end up with the result 743, not 77", Number())
//
// Numbers are values too, so they have methods, called with the dot like any method.
//
// NEW: .toFixed() — a number method that rounds to a set number of decimal places and gives back TEXT, not a number
//
//   toFixed(2) means "keep 2 decimal places". The 2 is the argument.
//
// THE BIG TRAP: the + sign ADDS numbers, but when either side is TEXT, + JOINS them as text.
//   "74" + 3   gives   "743"   (text joined), NOT 77.
// PYTHON HABIT: Python crashes on "74" + 3 with a TypeError, so you notice at once.
// JavaScript says nothing and gives you "743".
// The fix is Number( ): put the text inside the parentheses and you get a real number back.
// If the text is not a number at all, Number gives NaN, which means "Not a Number".
//
// WORKED EXAMPLE (already traced)
// L1  const price = 2.456;
// L2  console.log(price.toFixed(1));       prints 2.5
// L3  console.log(Number("5") + 1);        prints 6      (Number turned "5" into 5 first)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- K ---");
const lotsOfDecimal = 1.7665849587;
const twoPlaces = lotsOfDecimal.toFixed(0);
console.log(twoPlaces);                // ? prints: ____
console.log(typeof twoPlaces);         // ? prints: ____
const numText = "74";
console.log(numText + 3);              // ? prints: ____
const realNum = Number(numText);
console.log(realNum + 3);              // ? prints: ____
console.log(typeof realNum);           // ? prints: ____
console.log(Number("hello"));          // ? prints: ____
console.log(twoPlaces + 1);            // ? prints: ____
// ? MY CONFIDENCE on the  numText + 3  line (confident / unsure / guess): ____
//
// ? RUN and compare. The last line is the surprise: look at what  twoPlaces  is.
// ? MODIFY: change  toFixed(2)  to  toFixed(0)  and run again. The first line of block K prints: ____
// ? WRITE: on the lines below, make a const  myText  holding "20", convert it with Number( ), and
// ?        print the converted value plus 5.
// ================================================================
// ! L - CONCEPT - A RANDOM WHOLE NUMBER: THE DICE RECIPE
// ================================================================
// Source: Codecademy "Introduction to JavaScript" ("multiply this result by 50") · MDN Learn
// "A first splash into JavaScript" ("We therefore want to add 1")
//
// Math.random() alone gives a decimal from 0 up to just below 1. Three steps turn it into a
// whole number in the range you want. Example: a number from 1 to 100.
//   step 1: MULTIPLY:   Math.random() * 100     gives a decimal from 0 up to just below 100
//   step 2: ROUND DOWN: Math.floor( ... )       gives a whole number from 0 to 99
//   step 3: ADD 1:      ... + 1                 moves the range up to 1 to 100
//   all together:       Math.floor(Math.random() * 100) + 1
// Read it from the INSIDE OUT: Math.random() runs first, then * 100, then Math.floor, then + 1.
// Common mistake: forgetting the + 1. Then you get 0 to 99.
//
// Random numbers change every run, so to TRACE, we pretend Math.random() gave a fixed value.
//
// WORKED EXAMPLE (already traced), pretend Math.random() gave 0.25
// L1  0.25 * 100              is 25
// L2  Math.floor(25)          is 25
// L3  25 + 1                  is 26

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. For a 6-sided die the multiplier is 6.
// ----------------------------------------------------------------
console.log("--- L ---");
const fakeLow = 0;
const fakeMid = 0.5;
const fakeHigh = 0.999;
console.log(fakeMid * 50);                         // ? prints: ____
console.log(Math.floor(fakeMid * 100));            // ? prints: ____
console.log(Math.floor(fakeMid * 100) + 1);        // ? prints: ____
console.log(Math.floor(fakeLow * 6) + 1);          // ? prints: ____
console.log(Math.floor(fakeHigh * 6) + 1);         // ? prints: ____
console.log(Math.floor(fakeLow * 6));              // ? prints: ____
// ? MY CONFIDENCE on the  Math.floor(fakeHigh * 6) + 1  line (confident / unsure / guess): ____
//
// The REAL die (random, so we only check it): all three lines must print true.
const die = Math.floor(Math.random() * 20) + 1;
console.log(Number.isInteger(die));
console.log(0 < die);
console.log(die < 7);
//
// ? RUN and compare. Then run the file three or four times: does the block still print true, true, true? ____
// ? MODIFY: change the 6 in the  const die  line to 20 and run it a few times. Which of the three lines can now print false? ____
// ? WRITE: on the lines below, make a const  myRoll  that is a random whole number from 1 to 10,
// ?        and print it.