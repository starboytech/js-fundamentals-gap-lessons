// ================================================================
// ! BOOTCAMP JS — DAY 4 of 19 — OPERATORS, COMPARISONS, AND STRINGS
// ! Material: materials/js_fundamentals.md §3.2, §4.1
// ! Sources: MDN Learn "Basic math in JavaScript" · MDN Learn "Strings in JavaScript" · MDN Reference "Operator precedence" · Codecademy "Introduction to JavaScript"
// ================================================================
// * SECTIONS TODAY: 3.2, 4.1
// * Every concept: 1 TRACE (fill the blanks BEFORE running) → 2 RUN → 3 MODIFY → 4 WRITE
// * Like Day 3, this file RUNS: every block has live code that prints.
// * Each block starts by printing a label like  --- A ---  so you can match output to block.
// * Run the whole file from the bootcamp folder:
// *     node week-4/day4_operators_strings.js

// ================================================================
// ! A - CONCEPT - OPERANDS, EXPRESSIONS, AND WHICH OPERATOR GOES FIRST
// ================================================================
// Source: MDN Learn "Basic math in JavaScript" (operator precedence) · MDN Reference "Operator precedence"
//
// In  4 * 3  the * is the OPERATOR (the symbol that does the task).
// The 4 and the 3 are its OPERANDS (the values the operator works on).
// An operand can be a plain value or a variable:  price * qty
// An EXPRESSION is any piece of code that works out to ONE value:  4 * 3  works out to 12.
// When one line has several operators, JavaScript does not just go left to right.
// It follows PRECEDENCE (the ranking of which operator goes first):
//   * / and %  rank higher than  + and -   so they go first.
//   Same rank: left to right, except ** , which groups right to left:  2 ** 3 ** 2  is  2 ** 9 = 512.
//   ( ) parentheses go before everything. Put part of the math in ( ) to force it first.
// This is the same ranking you know from Python. 
//
// WORKED EXAMPLE (already traced).
// L1  console.log(1 + 2 * 3);      prints 7     (2 * 3 first = 6, then 1 + 6) 
// L2  console.log((1 + 2) * 3);    prints 9     (the ( ) forces 1 + 2 first = 3, then 3 * 3) 

// ----------------------------------------------------------------
// ? TRACE — write what each line prints. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- A ---");
const price = 4;
const qty = 3;
console.log(price * qty);          // ? prints: ____
// prettier-ignore
console.log(2 + (3 * 4));            // ? prints: ____
console.log((2 + 3) * 4);          // ? prints: ____
console.log(10 - 4 - 3);           // ? prints: ____
console.log(price * qty + 1 * 2);  // ? prints: ____
// ? MY CONFIDENCE on the  2 + 3 * 4  line (confident / unsure / guess): ____
//
// ? RUN the file, find the block marked  --- A ---, and compare your answers. 
// ? MODIFY: put ( ) around  3 * 4  in the  2 + 3 * 4  line. Does the answer change? 
// ? WRITE: on the line below, print an expression of your own that uses price, qty and at least one pair of ( ). Say the answer out loud BEFORE you run.

// ================================================================
// ! B - CONCEPT - POWERS, AND WHAT = REALLY DOES
// ================================================================
// Source: MDN Learn "Basic math in JavaScript" · MDN Reference "Math.pow()"
//
// You met  **  (the exponent operator, "to the power of") on Day 3:  2 ** 3  is 8.
// An OLDER way you will see in existing code is the method  Math.pow(2, 3). Recognise it; write  **
// (ESLint prefer-exponentiation-operator and the Airbnb style guide 12.3 say the same).
// ** ranks HIGHER than * and /, so it goes first.
// The single  =  is the ASSIGNMENT operator: it does NOT ask "are these equal?". 
// It takes the value on its RIGHT, works it out first, and stores it in the variable on its LEFT. 
// So  n = n * 2  means: work out  n * 2  with the old n, then store the answer back in n. `
//
// WORKED EXAMPLE (already traced)
// L1  console.log(2 * 3 ** 2);     prints 18    (3 ** 2 = 9 goes first, then 2 * 9)
// L2  console.log(Math.pow(2, 3)); prints 8     (2 to the power of 3)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- B ---");
// NEW: Math.pow — an OLDER Math method that takes two arguments (a base and a power) and gives back the base to that power,
//      same result as ** . Recognise it in old code; write ** in yours.
console.log(2 * 4 ** 2);           // ? prints: ____
console.log((2 * 4) ** 2);         // ? prints: ____
console.log(Math.pow(2, 5));       // ? prints: ____
console.log(2 ** 5);               // ? prints: ____
let n = 5;
n = n + n * 2;
console.log(n);                    // ? prints: ____
// ? MY CONFIDENCE on the  2 * 4 ** 2  line (confident / unsure / guess): ____
//
// ? RUN and compare. What do the Math.pow and ** lines have in common? ____
// ? MODIFY: change  n = n * 2  to  n = n + n * 2  and run again. What does n print now? ____
// ? WRITE: on the line below, make a variable  mySide  holding any whole number, then print the area of a square with that side (side times itself) using  **.  


// ================================================================
// ! C - CONCEPT - COMPOUND ASSIGNMENT: THE SHORT WAY TO UPDATE A VARIABLE
// ================================================================
// Source: MDN Learn "Basic math in JavaScript" (assignment operators) · Codecademy "Introduction to JavaScript"
//
// Updating a variable from its own value is so common that it has short forms.
//   score += 5   means exactly   score = score + 5
//   score -= 3   means exactly   score = score - 3
//   score *= 2   means exactly   score = score * 2
//   score /= 4   means exactly   score = score / 4
// Each one reads the variable, does the math, and stores the answer back in the SAME variable.
// Python has the same four. (JavaScript adds more, but these are the ones to know first.)
//
// WORKED EXAMPLE (already traced)
// L1  let total = 10;
// L2  total += 5;                  total is now 15   (same as total = total + 5)
// L3  console.log(total);          prints 15

// ----------------------------------------------------------------
// ? TRACE — follow score one line at a time. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- C ---");
// NEW: += -= *= /= — compound assignment operators: they update a variable using its own value, so  x += 5  means  x = x + 5
let score = 10;
score += 5;
console.log(score);                // ? prints: ____
score -= 3;
console.log(score);                // ? prints: ____
score *= 2;
console.log(score);                // ? prints: ____
score /= 4;
console.log(score);                // ? prints: ____
// ? MY CONFIDENCE on the last console.log line (confident / unsure / guess): ____
//
// ? RUN and compare. Each line used the value the line before it left behind.
// ? MODIFY: rewrite the  score *= 2  line the long way, as  score = score * 2  .  Same result? ____
// ? WRITE: on the line below, make a variable  myMoney  holding 100, add 25 to it with a compound operator, then print it.
// ================================================================
// ! D - CONCEPT - ++ AND --: ADD OR SUBTRACT ONE
// ================================================================
// Source: MDN Reference "Increment (++)" · Codecademy "Introduction to JavaScript" (increment and decrement)
//
// Adding 1 or subtracting 1 is the most common update of all, so it gets its own symbols.
//   count++   adds 1 to count       (INCREMENT)
//   count--   subtracts 1 from count (DECREMENT)
// Python has NO ++ . In Python you write  count += 1  . In JavaScript both work.
// ++ and -- only work on something that can STORE a value: a variable, or later an array element
// or object property ( scores[0]++ ). Never on a plain value:
//   Writing  5++  is a SyntaxError: there is no box to put the 6 into.
// There is a catch. ++ can go AFTER the variable (count++, "postfix") or BEFORE it (++count, "prefix"):
//   postfix  count++  gives back the OLD value, and THEN adds 1.
//   prefix   ++count  adds 1 first, and gives back the NEW value.
// On a line by itself the two do the same thing. The difference only shows when anything USES
// the value the ++ hands back: printing it, storing it ( const y = x++ ), or comparing it.
//
// WORKED EXAMPLE (already traced)
// L1  let lives = 3;
// L2  lives--;                     lives is now 2
// L3  console.log(lives);          prints 2

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running. Watch what each ++ GIVES BACK.
// ----------------------------------------------------------------
console.log("--- D ---");
// NEW: ++ and -- — increment and decrement operators: count++ adds 1 to count and count-- subtracts 1; put after the variable they give back the old value, put before they give back the new one
let count = 5;
count++;
console.log(count);                // ? prints: ____
count--;
console.log(count);                // ? prints: ____
let a = 5;
console.log(++a);                  // ? prints: ____
console.log(a);                    // ? prints: ____
let b = 5;
console.log(++b);                  // ? prints: ____
console.log(b);                    // ? prints: ____
// ? MY CONFIDENCE on the  console.log(a++)  line (confident / unsure / guess): ____
//
// ? RUN and compare. Both a and b end at 6. What is different about the line that printed it? ____
// ? MODIFY: change  console.log(a++)  to  console.log(++a)  and run again. What does it print now? ____
// ? WRITE: on the line below, make a variable  myLives  holding 3, take one away with --, then print it.

// ================================================================
// ! E - CONCEPT - COMPARISON OPERATORS: TESTS THAT ANSWER true OR false
// ================================================================
// Source: MDN Learn "Basic math in JavaScript" (comparison operators) · Codecademy "Introduction to JavaScript" (comparison operators)
//
// A COMPARISON OPERATOR is a symbol that compares two values and answers true or false.
// The answer is always a BOOLEAN (Day 3), so a comparison is an expression that works out to a boolean.
// The four size tests (called RELATIONAL operators):
//   <    less than                   >    greater than
//   <=   less than OR equal to       >=   greater than OR equal to
// Write the two-symbol ones with no space and the = LAST:  <=  and  >=  (never =< or =>).
// Later today these tests will decide what code runs. Right now we only read the answer.
//
// WORKED EXAMPLE (already traced)
// L1  console.log(5 > 2);          prints true
// L2  console.log(5 <= 5);         prints true    (5 is not LESS than 5, but it IS equal to 5)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- E ---");
// NEW: <= and >= — relational operators: <= asks "less than or equal to?" and >= asks "greater than or equal to?", and the answer is true or false
const age = 17;
console.log(age >= 18);            // ? prints: ____
console.log(age > 18);             // ? prints: ____
console.log(age <= 17);            // ? prints: ____
console.log(age < 100);            // ? prints: ____
const canVote = age >= 18;
console.log(canVote);              // ? prints: ____
// ? MY CONFIDENCE on the  age > 18  line (confident / unsure / guess): ____
//
// ? RUN and compare. Why do  age >= 18  and  age > 18  differ when age is exactly 18? ____
// ? MODIFY: change  const age = 18  to  const age = 17  and run again. Which of the five lines now print false? ____
// ? WRITE: on the line below, make a variable  myTemp  holding 30, then print a test that is true exactly when myTemp is 25 or higher.

// ================================================================
// ! F - CONCEPT - === VERSUS ==: DOES THE TYPE MATTER?
// ================================================================
// Source: MDN Reference "Strict equality (===)" · MDN Reference "Equality (==)" · Codecademy "Introduction to JavaScript"
//
// Two ways to ask "are these equal?":
//   ===  STRICT equality: true only if the VALUE and the TYPE both match.   1 === "1" is false
//   ==   LOOSE equality: converts the types first, then compares values.   1 == "1" is true
// The opposites are  !==  ("not strictly equal") and  !=  ("not loosely equal").
// Rule for this course: ALWAYS use === and !== . Loose == hides bugs by quietly changing a value's type.
// Do not mix this up with the single =  , which STORES a value and asks nothing.
// Python's  ==  behaves like JavaScript's  ===  : in Python, 1 == "1" is False.
//
// WORKED EXAMPLE (already traced)
// L1  console.log(3 === 3);        prints true     (same value, same type)
// L2  console.log(3 === "3");      prints false    (the number 3 is not the text "3")
// L3  console.log(3 == "3");       prints true     (loose == turns "3" into a number first)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- F ---");
// NEW: === and !== — strict equality operators: === is true only when value AND type both match, and !== is true when they do not
console.log(7 === 7);              // ? prints: ____
console.log(7 === Number("7"));            // ? prints: ____
console.log(7 !== "7");            // ? prints: ____
// NEW: == and != — loose equality operators: they convert the types first and then compare values, which hides bugs, so we use === and !== instead
console.log(7 == "7");             // ? prints: ____
console.log(0 == false);           // ? prints: ____
console.log(0 === false);          // ? prints: ____
// ? MY CONFIDENCE on the  7 === "7"  line (confident / unsure / guess): ____
//
// ? RUN and compare. Which operator hides the fact that "7" is text? ____
// ? MODIFY: change  7 === "7"  to  7 === Number("7")  and run again. What does it print now? ____
// ? WRITE: on the line below, print a strict-equality test that is true, using a number and a variable named  myNum  that you make first.

// ================================================================
// ! G - CONCEPT - COMPARING STRINGS
// ================================================================
// Source: MDN Reference "Strict equality (===)" · MDN Learn "Strings in JavaScript"
//
// Comparison operators work on text too.
//   ===  asks whether two strings are exactly the same, letter for letter.
//   It is CASE SENSITIVE:  "Hi" === "hi"  is false, because H and h are different characters.
//   < and >  compare strings character by character, using each character's number code.
//   That is NOT dictionary order: "Zebra" < "apple" and "10" < "9" are both true.
//   (For real alphabetical order there is  a.localeCompare(b) , later.)
//   Every capital letter has a SMALLER code than every lowercase letter,
//   so ALL capitals sort before ALL lowercase letters: "Zebra" < "apple" is true.
// The same is true in Python.
//
// WORKED EXAMPLE (already traced)
// L1  console.log("cat" === "cat");     prints true
// L2  console.log("cat" < "dog");       prints true     (c comes before d)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- G ---");
console.log("Hi" === "Hi");        // ? prints: ____
console.log("Hi" === "hi");        // ? prints: ____
console.log("apple" < "banana");   // ? prints: ____
console.log("Zebra" < "apple");    // ? prints: ____
console.log("b" > "a");            // ? prints: ____
const wanted = "yes";
const typed = "yes";
console.log(typed === wanted);     // ? prints: ____
// ? MY CONFIDENCE on the  "Zebra" < "apple"  line (confident / unsure / guess): ____
//
// ? RUN and compare. In one sentence, why is  typed === wanted  false? ____
// ? MODIFY: change  typed  to  "yes"  and run again. What does the last line print now? ____
// ? WRITE: on the line below, make a variable  myWord  holding "Banana", then print a test that is true exactly when myWord is "Banana".

// ================================================================
// ! H - CONCEPT - TESTS DECIDE WHAT RUNS: THE TOGGLE PATTERN
// ================================================================
// Source: Codecademy "Introduction to JavaScript" (if...else statements)
//
// You saw if / else on Day 1. Day 6 teaches it fully. Here we only READ one.
//   if ( test ) { code A } else { code B }
//   JavaScript works out the test. true: it runs code A. false: it runs code B.
// The test is exactly the kind of comparison you just traced.
// A TOGGLE is code that flips a variable between two states each time it runs:
//   if the variable is one state, set it to the other; else set it back.
//
// WORKED EXAMPLE (already traced)
// L1  let door = "closed";
// L2  if (door === "closed") { door = "open"; } else { door = "closed"; }
// L3  console.log(door);           prints open    (the test was true, so code A ran)

// ----------------------------------------------------------------
// ? TRACE — the same toggle runs TWICE. Fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- H ---");
let light = "on";
if (light === "off") { light = "on"; } else { light = "off"; }
console.log(light);                // ? prints: ____
if (light === "off") { light = "on"; } else { light = "off"; }
console.log(light);                // ? prints: ____
if (light === "off") { light = "on"; } else { light = "off"; }
console.log(light);                // ? prints: ____
// ? MY CONFIDENCE on the SECOND console.log line (confident / unsure / guess): ____
//
// ? RUN and compare. After three runs of the toggle, which two states has light been between? ____
// ? MODIFY: change the first line to  let light = "on"  and run again. What are the three prints now? ____
// ? WRITE: on the line below, make a variable  myMode  holding "day", then write ONE toggle (an if / else like above) that flips it between "day" and "night", then print myMode.
// ================================================================
// ! I - CONCEPT - STRINGS NEED QUOTES, AND THREE KINDS OF QUOTE
// ================================================================
// Source: MDN Learn "Strings in JavaScript" (quotes) · Codecademy "Introduction to JavaScript" (strings)
//
// A STRING is text. JavaScript knows it is text only because of the QUOTES around it.
//   "hello"   is a string: the letters h-e-l-l-o as text.
//   hello     has NO quotes, so JavaScript reads it as the NAME of a variable (or a keyword).
//             If no variable called hello exists, that is a ReferenceError. Day 2 type of error.
// There are three kinds of quote, and any of them makes a string:
//   'single quotes'    "double quotes"    `backticks`  (the key left of 1 on most keyboards)
// Rule 1: the quote that CLOSES must be the same character as the one that OPENED.
//         "cat'  never closes. (Python has the same rule.)
// Rule 2: pick one style and use it everywhere in a file. This course uses double quotes.
// * Updated 2026-10-12 (JS audit S1): the formatter now picks the style, and this course uses SINGLE quotes
// *   (Google 5.6.1 and Airbnb 6.1). The project's .prettierrc enforces it on save.
// Copying: const copy = greeting;  stores the same text in a second variable. Changing greeting
// later does NOT change copy, because copy already holds its own text.
//
// WORKED EXAMPLE (already traced)
// L1  let city = "Oslo";
// L2  const town = city;
// L3  city = "Rome";
// L4  console.log(town);           prints Oslo   (town kept the text it was given)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- I ---");
let greeting = "Hello";
const copy = greeting;
greeting = "Bye";
console.log(greeting);             // ? prints: ____
console.log(copy);                 // ? prints: ____
const singleQ = 'cat';
// prettier-ignore
const doubleQ = "cat";
console.log(singleQ === doubleQ);  // ? prints: ____
// ? NOW THE UNQUOTED CASE. The file week-4/day4_errors/c1.js has three lines; the middle one is
// ?   console.log(hello);     (no quotes). Write your prediction, THEN run it:
// ?     node week-4/day4_errors/c1.js
// ? Which words print, and which kind of error appears? ____
// ? MY CONFIDENCE on that prediction (confident / unsure / guess): ____
//
// ? RUN and compare. Why did hello (no quotes) cause an error but "hello" would not? ____
// ? MODIFY: in c1.js, add quotes around hello. What prints ____, hello, end
// ? WRITE: on the line below, make a variable  myPet  holding a word in SINGLE quotes, then make  myPetCopy  from it and print both.

// ================================================================
// ! J - CONCEPT - CONCATENATION: JOINING STRINGS WITH +
// ================================================================
// Source: MDN Learn "Strings in JavaScript" (concatenation) · Codecademy "Introduction to JavaScript" (string concatenation)
//
// CONCATENATION means joining strings end to end into one longer string.
// The operator is +. With numbers + adds. With strings + joins.  "sun" + "shine"  is "sunshine".
// + adds NOTHING between the pieces: no space, no comma. If you want a space, it is a
// piece of its own:  " "  (a string holding one space).
// You can chain as many + as you like; they run left to right, and variables work too.
// Python joins strings with + as well. The space rule is the same.
//
// WORKED EXAMPLE (already traced)
// L1  console.log("sun" + "shine");           prints sunshine
// L2  console.log("sun" + " " + "shine");     prints sun shine

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- J ---");
const first = "Ada";
const last = "Lovelace";
console.log("Hi " + first);              // ? prints: ____
console.log(first + ". " + last);              // ? prints: ____
console.log(first + " " + last);        // ? prints: ____
console.log("Hi" + " " + first + "!");  // ? prints: ____
console.log("a" + "b" + "c");           // ? prints: ____
// ? MY CONFIDENCE on the  first + last  line (confident / unsure / guess): ____
//
// ? RUN and compare. What did  first + last  leave out that a sentence needs? ____
// ? MODIFY: change  first + last  to  last + ", " + first  and run again. What prints? ____
// ? WRITE: on the line below, make two variables  myFirst  and  myLast  with any names, then print them joined as  "Last, First"  (comma and space between).

// ================================================================
// ! K - CONCEPT - TEMPLATE LITERALS: A SENTENCE WITH HOLES IN IT
// ================================================================
// Source: MDN Learn "Strings in JavaScript" (template literals) · Codecademy "Introduction to JavaScript" (template literals)
//
// A TEMPLATE LITERAL is a string written with BACKTICKS instead of quotes.
// Inside it you can put  ${ }  : a hole. JavaScript works out whatever is inside the hole and
// puts the result into the text. This is called INTERPOLATION.
//   `Hi ${pet}`   gives   Hi Rex   (when pet holds "Rex")
// The hole holds any expression, so  ${2 + 3}  gives  5  and  ${price * qty}  works too.
// Interpolation ONLY works in backticks. In ordinary quotes, ${pet} is just plain characters.
// The same sentence built with + (block J) and with backticks (here) gives the same result;
// the template version has no stray + and " " pieces, so it reads like the sentence.
// Python's f"Hi {pet}" is the same idea.
//
// WORKED EXAMPLE (already traced)
// L1  const planet = "Mars";
// L2  console.log(`Hello ${planet}`);       prints Hello Mars
// L3  console.log("Hello ${planet}");       prints Hello ${planet}   (plain quotes: no hole)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- K ---");
const pet = "Rex";
const years = 3;
// NEW: template literal — a string written with backticks; ${ } inside it is a hole that is replaced by the value of whatever expression you put in it
console.log(`Hi ${pet}`);                    // ? prints: ____
console.log(`${pet} is ${years} years old`);  // ? prints: ____
console.log(`2 + 3 = ${2 + 3}`);              // ? prints: ____
console.log(`In 5 years: ${years + 5}`);      // ? prints: ____
console.log("Hi ${pet}");                     // ? prints: ____
// ? MY CONFIDENCE on the last line, the one with plain quotes (confident / unsure / guess): ____
//
// ? RUN and compare. Why did the last line not put Rex into the text? ____
// ? MODIFY: rewrite the  `${pet} is ${years} years old`  line using only + and quotes. What do you write? ____
// ? WRITE: on the line below, make a variable  myCity  and a variable  myDays  (a number), then print one template sentence that uses BOTH, plus one expression inside a hole.

// ================================================================
// ! L - CONCEPT - MORE THAN ONE LINE, AND QUOTES INSIDE QUOTES
// ================================================================
// Source: MDN Learn "Strings in JavaScript" (escaping characters, multiline strings) · Codecademy "Introduction to JavaScript"
//
// Two problems with strings, and their fixes.
// PROBLEM 1: text on more than one line.
//   Backticks may span several lines: the line break you type IS in the string.
//   In ordinary quotes use the code  \n  : it means "new line". Two characters in the file, one line break in the output.
// PROBLEM 2: the quote character is also inside the text.
//   "It's"  works, because the double quotes outside do not clash with the single quote inside.
//   When the same character is on both sides, put a \ (backslash) before the inside one:
//   'It\'s'  . The backslash is the ESCAPE character: it changes what the next character means.
//   \'  and  \\  become plain text (a quote, a backslash), and  \n  becomes a line break.
// Note: the formatter (Prettier) rewrites 'It\'s' to "It's" on save (it picks the quote that needs the
// fewest escapes), so in formatted code you mostly see the "It's" form. The demo lines below are protected.
// Python has the same \n and the same escape.
//
// WORKED EXAMPLE (already traced)
// L1  console.log("top\nbottom");        prints two lines:  top  then  bottom
// L2  console.log('Don\'t stop');        prints Don't stop

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- L ---");
// NEW: \n — an escape code inside a string that stands for one line break; the backslash \ is the escape character
console.log("one\n\ntwo");     // ? how many lines does this print? ____
console.log(`red
blue`);                              // ? how many lines does this print? ____
console.log("It's mine");            // ? prints: ____
// prettier-ignore
console.log('It\'s mine');           // ? prints: ____
// prettier-ignore
console.log("She said \"hi\"");      // ? prints: ____
console.log("a\\b");                 // ? prints: ____
// ? MY CONFIDENCE on the  one\ntwo\nthree  line (confident / unsure / guess): ____
//
// ? RUN and compare. Which two lines printed the same text in different ways? ____
// ? MODIFY: change  "one\ntwo\nthree"  to  "one\n\ntwo"  and run again. What does the output look like? ____
// ? WRITE: on the line below, print one string that spans TWO lines and contains an apostrophe (like  don't ), using  \n  and any quote style that works.

// ================================================================
// ! M - CONCEPT - NUMBER OR TEXT? JAVASCRIPT QUIETLY CONVERTS, AND YOU CAN CONVERT ON PURPOSE
// ================================================================
// Source: MDN Learn "Strings in JavaScript" (numbers vs strings) · MDN Reference "Type coercion" (glossary) · Codecademy "Introduction to JavaScript"
//
// You saw on Day 3:  "74" + 3  gives  "743"  : + met a string, so the 3 became text and they were joined.
// That quiet conversion has a name: COERCION (JavaScript changing a value's type for you).
// The rule depends on the operator:
//   +   if EITHER side is text, it joins:     "5" + 2   gives  "52"
//   -  *  /   have no meaning for text, so they turn the text into a number:   "5" - 2   gives  3
// The SIDE EFFECT: JavaScript never complains, so a number hiding inside quotes can change a
// result without any error. Python raises a TypeError for  "5" + 2 . JavaScript follows fixed
// coercion rules, which are easy to forget.
// To convert ON PURPOSE (no guessing), use two built-in functions:
//   Number("5")   gives the number 5.        String(5)   gives the text "5".
// If the text is not a number at all,  Number("hello")  gives  NaN  ("not a number", a special value).
//
// WORKED EXAMPLE (already traced)
// L1  console.log("7" + 1);        prints 71    (text on one side: joins)
// L2  console.log("7" - 1);        prints 6     (minus: the text becomes a number first)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log("--- M ---");
console.log("5" + Number(2));                // ? prints: ____
console.log(5 + 2);                  // ? prints: ____
console.log("5" - 2);                // ? prints: ____
console.log("5" * "2");              // ? prints: ____
console.log(Number("5") + 2);        // ? prints: ____
// NEW: String() — a built-in function that gives back the text version of any value, so String(5) is "5"
console.log(String(5) + 2);          // ? prints: ____
console.log(typeof String(5));       // ? prints: ____
console.log(Number("hello"));        // ? prints: ____
// ? MY CONFIDENCE on the  "5" - 2  line (confident / unsure / guess): ____
//
// ? RUN and compare. Which operator joined, and which operators converted? ____
// ? MODIFY: change the first line to  "5" + Number(2)  and run again. Does it still print 52? ____
// ? WRITE: on the line below, make a variable  myAge  holding the TEXT "30", then print myAge converted to a number plus 1, so the output is 31.
