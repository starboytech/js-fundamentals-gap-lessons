# JavaScript Fundamentals — reference material

**What this is.** The material the bootcamp JS fundamentals block teaches from, in teaching
order. Every section lists the skills it covers (ids from `progress/SKILLS_INVENTORY.json`) and
the real curriculum pages those skills come from: MDN Learn *Dynamic scripting with
JavaScript*, Codecademy *Learn JavaScript*, the Node.js docs, and MDN's reference pages for
closures and spread.

**How it was built (2026-10-05).** Written after a lesson used `const` and `console.log` before
teaching them. Two rules hold throughout, and both are checked mechanically:
- **Nothing is used before it is taught.** No code example uses syntax from a later section.
- **Every example runs.** Each ```js block was run with `node`, and its output matches the
  `// prints:` lines exactly. Blocks marked `// ERROR EXAMPLE:` really throw that error.

**How to read it.** Examples are short on purpose, so you can trace them line by line before
you run them. Copy any block into a `.js` file and run `node file.js` to see it yourself.

## 1.1 What JavaScript is and how to run it

**Sources:** [MDN: What is JavaScript?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript) · [MDN: A first splash into JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/A_first_splash) · [Node.js: Run Node.js scripts from the command line](https://nodejs.org/en/learn/command-line/run-nodejs-scripts-from-the-command-line) · [Codecademy: Introduction to JavaScript](https://www.codecademy.com/courses/introduction-to-javascript/lessons/introduction-to-javascript/exercises/intro) · [Codecademy: Iterators intro](https://www.codecademy.com/courses/introduction-to-javascript/lessons/javascript-iterators/exercises/intro)
**Skills:** js_purpose, web_layer_cake, execution_environment, top_to_bottom_order, define_before_use, hoisting_mention, interpreted_vs_compiled, jit_compiling, client_vs_server_side, js_on_server_node, dynamic_vs_static, case_sensitive, comments_purpose, single_line_comment, multi_line_comment, comment_inline_block, comment_out_code, uncomment_code, comment_judgment, run_file_with_node, console_concept, think_like_programmer

This section has almost no code on purpose. Before you write a line of JavaScript you need a clear
picture of what it is, where it runs, and how your computer reads it. Every later section leans on
these ideas.

### What JavaScript is for, and where it sits

**JavaScript** is a programming language: a set of words and symbols you write so a computer will
carry out instructions. MDN describes it as "a scripting language that enables you to create
dynamically updating content, control multimedia, animate images, and pretty much everything else."
Codecademy puts it more simply: JavaScript "powers the dynamic behavior on most websites."

Two words in that description need unpacking:

- **Dynamic** means a page can produce new content when it is needed: a score that goes up, a
  message that appears after you click, a list that fills in as data arrives.
- **Static** is the opposite. MDN: "A web page with no dynamically updating content is referred to
  as static — it just shows the same content all the time."

A web page is built from three technologies stacked on each other. MDN calls JavaScript "the third
layer of the layer cake of standard web technologies":

1. **HTML** gives the page its structure (headings, paragraphs, buttons).
2. **CSS** gives it style (colors, fonts, layout).
3. **JavaScript** gives it behavior (what happens when something changes).

Without the third layer, a page can look good but cannot react to anything.

### Where JavaScript runs

Code has to run *somewhere*, on some computer.

- **Client-side code** runs on the user's own computer, inside their web browser. MDN: "Client-side
  code is code that is run on the user's computer." This is JavaScript's original home.
- **Server-side code** runs on a server, a computer somewhere else that sends pages and data to
  users. JavaScript can do this job too: MDN notes it "can also be used as a server-side language,
  for example in the popular Node.js environment."

**Node.js** (usually just "Node") is a program that runs JavaScript outside a browser. That is how
you will run everything in this material: from a terminal, with no web page involved.

One more idea, at "just know it exists" level: in a browser, each tab has its own separate space
for running code. MDN: "these buckets are called 'execution environments' in technical terms." In
most cases code in one tab cannot directly affect code in another; tabs can only exchange data
through deliberate, safe channels.

### How the computer reads your code: interpreted, top to bottom

A computer cannot follow English. Something has to translate your code into instructions the
machine understands. There are two broad ways to do that:

- A **compiled** language (C and C++ are examples) is translated in full, ahead of time, into a
  separate program file, and that file is what runs.
- An **interpreted** language is run straight from the text you wrote. MDN: "JavaScript is a
  lightweight interpreted programming language."

Modern JavaScript engines actually use a trick called **just-in-time compiling**: they translate
your code into faster machine instructions while the program runs. JavaScript is still called an
interpreted language, because you never produce a separate compiled file yourself. The engine
inside Chrome is called **V8**, and Node runs on the same V8 engine. That is why Node and Chrome
print the same error messages (1.3).

Separately from how it is translated, the order you write things in matters, as it does in almost
every language. MDN: "it generally runs it in order, from top to bottom." Line 1 runs, then line 2, then line 3.

That leads to a rule you will hit constantly: **a name must be defined before you use it.** MDN:
"generally items need to be defined before you can use them. This is a common source of errors." If
the computer reaches a name it has never been told about, it stops with an error called a
`ReferenceError`.

Here is the smallest possible example. The file's only line is a word, `greeting`, that was never
defined anywhere:

```js
// ERROR EXAMPLE: ReferenceError
greeting
```

Node stops and reports `ReferenceError: greeting is not defined`. You will learn to create names
properly in 1.2, and to read error messages in 1.3.

The word "generally" in that rule is honest. MDN adds: "It is not always true that JavaScript runs
exactly in order from top to bottom, due to behaviors like hoisting." **Hoisting** is a behavior
where some definitions are treated as if they were moved to the top. You do not need it yet; just
know the name, so it does not surprise you later.

### JavaScript is case sensitive and exact

**Case sensitive** means uppercase and lowercase letters count as different. To JavaScript,
`score`, `Score` and `SCORE` are three unrelated names. MDN: "JavaScript is case sensitive, and very
fussy, so you need to enter the syntax exactly as shown, otherwise it may not work."

**Syntax** is the set of spelling and punctuation rules of a language. Get one character wrong and
the program can fail. This is normal, and 1.3 shows you how to find the mistake quickly.

### Comments: notes for humans

A **comment** is text in your code that the computer skips. MDN: comments are "ignored by the
browser" (Node ignores them too). They exist so you, or someone else, can understand the code later.
Without them, a file that made sense today can be a puzzle in a month.

There are two kinds.

**Single-line comment.** `//` is two forward slashes. Everything after them, to the end of that
line, is a comment.

**Multi-line comment.** `/*` (slash, star) starts a comment and `*/` (star, slash) ends it.
Everything between them is skipped, even across many lines.

This block contains only comments, so running it prints nothing at all:

```js
// This is a single-line comment. Node skips this whole line.

/*
  This is a multi-line comment.
  It can run over as many lines as you like.
*/
```

Because `/* */` has a clear start and end, you can also use it to skip **part of a line**, in the
middle of code. You will see that in 1.2, once there is code to put it in.

**Commenting out code.** Comments are also a tool for switching code off. If you put `//` in front
of a line of code, that line becomes a comment and does not run. Codecademy: multi-line comments
"are often best suited to prevent a block of code from running", because one `/*` and one `*/` can
switch off many lines at once.

**Uncommenting** is the reverse: delete the `//` (or the `/*` and `*/`) and the code runs again.
Codecademy phrases it as "uncomment (delete the // before) the last line of the program before you
run the code."

**How many comments?** MDN: "In general more comments are usually better than less." Professional
practice puts it differently: a comment should explain **why** the code exists (a reason, a
constraint, a workaround), and the code itself should say **what** it does. Google's code-review
guide: "Usually comments are useful when they explain why some code exists, and should not be
explaining what some code is doing." So a comment should not be a patch over confusing code. If you
need a comment to explain what a badly named thing means, rename it instead. (The lesson files in
this course are full of comments on purpose, as learning scaffolds; project code is not written
that way.)

### Running a file with Node, and what the console is

The **console** is where a program shows you messages. Codecademy: "The console is a panel that
displays important messages, like errors, for developers." In a browser it is a panel in the
developer tools. When you run code with Node, the console is simply your **terminal**: the text
window where you type commands.

To run a JavaScript file, you type `node` followed by the file's name. The Node.js docs: "The usual
way to run a Node.js program is to run the globally available node command (once you install
Node.js) and pass the name of the file you want to execute."

So if you have a file called `hello.js` in the folder your terminal is in:

```bash
node hello.js
```

Node reads `hello.js` from top to bottom and runs it. Anything the program prints, and any error it
hits, appears right there in the terminal. If the file only contains comments, nothing appears and
you get your prompt back. That is a successful run of a program with nothing to say. In 1.2 you will
learn the instruction that makes a program print.

### Thinking like a programmer

Before writing code, break the job down. MDN's advice for a new project is to "start breaking it
down into simple actionable tasks, in as much of a programmer mindset as possible."

For example, "make a number-guessing game" is too big to code directly. Broken down, it becomes:
pick a secret number; take a guess; compare the guess to the number; say whether it was right, too
high or too low; count the guesses; stop after a limit. Each of those small steps is something you
can write a few lines for. That habit matters more than any single piece of syntax.

## 1.2 Your first program: a quick tour

**Sources:** [MDN: A first splash into JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/A_first_splash) · [MDN: Storing the information you need — Variables](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables) · [Codecademy: Introduction to JavaScript](https://www.codecademy.com/courses/introduction-to-javascript/lessons/introduction-to-javascript/exercises/intro) · [Codecademy: Introduction cheatsheet](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-introduction/cheatsheet) · [Codecademy: Variables](https://www.codecademy.com/courses/introduction-to-javascript/lessons/variables/exercises/intro) · [Codecademy: Functions](https://www.codecademy.com/courses/introduction-to-javascript/lessons/functions/exercises/intro) · [Codecademy: Loops](https://www.codecademy.com/courses/introduction-to-javascript/lessons/loops/exercises/intro)
**Skills:** variable_concept_intro, keyword_concept, let_intro, const_intro, es6_concept, assign_equals_intro, function_concept_intro, function_declaration_intro, function_call_intro, console_log_intro, comment_after_code, console_log_multiple, semicolon, string_intro, string_quotes_intro, template_literal_intro, conditional_concept, number_constructor_intro, if_intro, strict_equality_intro, else_if_intro, else_intro, nested_conditional_intro, increment_intro, boolean_property_intro, empty_string, loop_concept, array_intro, for_of_intro, const_inner_props_change_intro

This is a tour, not a deep dive. You will meet each building block once, see it work, and move on.
Every item here gets its own full section later. The goal is that nothing in those later sections
is a total stranger. The pieces arrive in an order where each one only uses pieces you have
already seen, so the first few examples print nothing. That is expected.

### Variables, keywords, `let` and `const`

A **variable** is a name for a value. MDN: "Variables are basically names for values (such as
numbers, or strings of text)." Codecademy calls it "a container for a value." Without variables you
could not remember anything: a score, a name, a guess. Every value would vanish the moment it was
used.

To create a variable you use a **keyword**. Codecademy: "Keywords are words that are built into the
JavaScript language, so the computer recognizes them and treats them specially." Most keywords are
**reserved**: you cannot use them as your own names, because JavaScript has already claimed them.

Two keywords create variables:

- **`let`** creates a variable whose value can be changed later. Codecademy: "The let keyword
  signals that the variable can be reassigned a different value later on."
- **`const`** (short for *constant*) creates a variable that cannot be given a new value once set.
  Codecademy: "a const variable cannot be reassigned because it is constant."

Both arrived in **ES6**, the 2015 version of JavaScript. Codecademy: "There were a lot of changes
introduced in the ES6 version of JavaScript in 2015." You will see older code use a third keyword instead; a later section covers it.

To put a value into a variable you use `=`, the **assignment operator**. MDN: "You can assign a
value to a variable or constant with an equals sign (=) followed by the value you want to give it."
Read `=` as "gets", not "equals": `score = 10` means "score gets 10".

So a line that creates a variable has four parts, in this order: the keyword (`let` or `const`), the
name you choose, `=`, and the value.

```js
let score = 10
const maxScore = 100
score = 20
// nothing is printed: these lines only create and change names
```

Line 1 creates `score` holding 10. Line 2 creates `maxScore` holding 100. Line 3 gives `score` a new
value, 20. That is allowed because `score` was made with `let`.

**Common mistake:** giving a `const` a new value. JavaScript refuses:

```js
// ERROR EXAMPLE: TypeError
const maxScore = 100
maxScore = 50
```

Node stops on line 2 with `TypeError: Assignment to constant variable.` If a value needs to change,
create it with `let`.

### Functions: write once, run many times

A **function** is a named, reusable block of code. MDN: "Functions are reusable blocks of code that
you can write once and run again and again." Without functions, you would copy and paste
the same lines everywhere you needed them, and fixing a bug would mean fixing every copy.

Creating a function is called **declaring** it. A function declaration is: the keyword `function`,
a name, a pair of parentheses `( )`, then a pair of **curly braces** `{ }`. The curly braces wrap the
function's **body**, the lines that run when the function is used. MDN: "we have defined a function
by using the keyword function, followed by a name, with parentheses put after it."

Declaring a function does not run it. To run it you **call** it: write its name followed by
parentheses. Codecademy: "To call a function, type the function name followed by parentheses."

```js
function startGame() {
  const score = 0
}

startGame()
startGame()
// nothing is printed: the body only creates a variable
```

Lines 1 to 3 declare `startGame`. Nothing runs yet. Line 5 calls it, so its body runs once. Line 6
calls it again, so the body runs a second time. You can see that nothing appears on screen. That is
what the next piece fixes.

### Printing with `console.log()`, and comments after code

`console.log()` is the instruction that prints to the console (your terminal, when using Node). Read
it as three parts: `console` is the console, the dot means "the part belonging to", and `log` is the
action of writing a line to it. Codecademy: "When we write console.log(), what we put inside the
parentheses will get printed, or logged, to the console."

Remember the comments from 1.1. A single-line comment can also go **after** code on the same line;
the code runs, and everything from `//` onward is skipped. Every example in this material uses this
to show you the output: a comment like `// prints: 10` tells you exactly what appears in the
terminal.

```js
let score = 10
console.log(score) // prints: 10
score = 20
console.log(score) // prints: 20
```

Line 2 prints the value of `score` at that moment, 10. Line 3 changes it. Line 4 prints the new
value. Each `console.log()` prints on its own line.

The `/* */` comment from 1.1 can also sit in the middle of a line, skipping just that part:

```js
const score = 10
console.log(/* the current score */ score) // prints: 10
```

You can print **several values in one line** by separating them with commas. They come out on one
line with a space between each:

```js
const score = 10
const maxScore = 100
console.log(score, maxScore) // prints: 10 100
```

### Semicolons

`;` is a **semicolon**. It marks the end of one instruction. Codecademy: "The semicolon denotes the
end of the line or statement." MDN: "all code instructions should end with a semicolon."

JavaScript can often guess where an instruction ends without one, which is why the examples above
still worked. But it can guess wrong, so from here on every instruction ends with `;`. The braces
of a block (a function declaration, an `if`, a loop) do not get a semicolon after them. But when the
braces are part of a value, as in `const add = function () { ... };` or `const player = { ... };`
(both come later), the statement still ends with `;`. The project's formatter adds it for you.

```js
const score = 10;
console.log(score); // prints: 10
```

### Strings, quotes and template literals

A **string** is a piece of text. MDN: "Strings are used for representing text." Without strings a
program could only work with numbers: no names, no messages.

You write a string by putting text between quote marks: either double quotes `"` or single quotes
`'`. MDN: "you must use the same form for the start and end." The quotes tell JavaScript where the
text begins and ends. They are not part of the text, so they do not print.

```js
const playerName = "Ada";
const greeting = 'Welcome back';
console.log(greeting, playerName); // prints: Welcome back Ada
```

A third kind of quote is the **backtick** `` ` `` (on most keyboards, top left, under Esc). A string
written with backticks is called a **template literal**. Its special power: inside it, `${ }`
(a dollar sign followed by curly braces) drops in the value of a variable. MDN: "you can embed other
variables or even expressions in them."

```js
const playerName = "Ada";
const score = 10;
console.log(`${playerName} has ${score} points`); // prints: Ada has 10 points
```

JavaScript replaces `${playerName}` with `Ada` and `${score}` with `10`, then prints the finished
text.

**Common mistake:** using `${ }` inside ordinary quotes. It only works between backticks:

```js
const playerName = "Ada";
console.log("Hi ${playerName}"); // prints: Hi ${playerName}
```

**Python habit that breaks here:** Python's f-strings put an `f` before the quotes and use
`{name}`. JavaScript has no `f` prefix; it needs backticks and a dollar sign: `` `${name}` ``.

A string can also be **empty**: two quotes with nothing between them, `""`. That is a real string
with no characters in it. It is useful as a starting value, or for clearing a message:

```js
let message = "Too high!";
console.log(message); // prints: Too high!
message = "";
console.log(message); // prints:
```

The last line prints an empty line, because `message` now holds no characters.

### Conditionals: `if`, `===`, `else if`, `else`

A **conditional** lets a program make a decision. MDN: "Conditional code blocks allows you to run
code selectively, depending on whether a certain condition is true or not." Without them, a program
would do exactly the same thing every time, whatever happened.

First, one small helper the guessing game needs. Text a user types arrives as a string, even when it
looks like a number. `"7"` (with quotes) is text; `7` is a number. **`Number()`** is a built-in tool
that turns a value into a number. MDN runs the user's guess "through the built-in Number()
constructor, just to make sure the value is definitely a number." You will see why it matters in a
moment.

**`if`.** MDN: "The simplest form of conditional block starts with the keyword if, then some
parentheses, then some curly braces." Inside the parentheses goes a **test**. If the test comes out
**true**, the code in the curly braces runs. If it comes out **false**, that code is skipped.
`true` and `false` are themselves values you can write directly, and store in variables:

```js
const isLoggedIn = true;
if (isLoggedIn) {
  console.log("Welcome!"); // prints: Welcome!
}
console.log("Done"); // prints: Done
```

`isLoggedIn` is true, so line 3 runs. Line 5 is outside the braces, so it runs either way.

**`===`** (three equals signs) is the **strict equality** operator. It tests whether two values are
the same, and gives back `true` or `false`. MDN uses it to "test whether the guessCount variable is
equal to 1." Keep it apart from `=`: one `=` gives a value, three `===` compare two values.

Now the `Number()` payoff. A number and a string that look alike are not the same value:

```js
const answer = 7;
const typed = "7";
if (typed === answer) {
  console.log("match without Number()");
}
if (Number(typed) === answer) {
  console.log("match with Number()"); // prints: match with Number()
}
```

The first test compares the text `"7"` with the number `7`: false, so line 4 is skipped. The second
test turns `"7"` into the number 7 first: true, so line 7 runs.

**`else if` and `else`.** You can chain more tests. `else if` (the word `else`, meaning
"otherwise", then a new `if` test) is checked only when the test before it was false. MDN: "we've
chained another test onto the end of the last one using an else if (){ } structure." A final `else`,
with no test of its own, catches everything left over: it "contains code that is only run if
neither of the other two tests returns true." At most one block in the chain runs. With a final
`else`, exactly one does.

**Nested conditionals.** A conditional can sit inside another one's braces. MDN's guessing game does
this to check "whether the guess was higher or lower than the answer." For that it uses `<`
(**less than**) and `>` (**greater than**), which also give back `true` or `false`.

```js
const answer = 7;
const guess = 4;
const guessCount = 1;
if (guess === answer) {
  console.log("You got it!");
} else if (guessCount === 10) {
  console.log("Game over");
} else {
  console.log("Wrong!"); // prints: Wrong!
  if (guess < answer) {
    console.log("Too low"); // prints: Too low
  } else if (guess > answer) {
    console.log("Too high");
  }
}
```

Walk through it: is 4 `===` 7? No, skip. Is `guessCount` `===` 10? No, skip. So the `else` block
runs: it prints `Wrong!`, then meets the inner test. Is 4 `<` 7? Yes, so it prints `Too low` and
the inner `else if` is skipped.

### Small but useful: `++` and true/false switches

**`++`** is the **increment** operator: it adds 1 to a variable. MDN: "++ is an increment operation —
increase by 1." It only makes sense on a `let` variable, since it changes the value.

```js
let guessCount = 1;
guessCount++;
console.log(guessCount); // prints: 2
```

Programs often keep a true/false value as a switch, and flip it when something happens. In MDN's
game, when the game ends, it switches the input box and button off by setting their `disabled`
setting to `true`. That code talks to a web page, which only exists in a browser, so here is the same
idea with a plain variable:

```js
let gameOver = false;
gameOver = true;
console.log(gameOver); // prints: true
```

### Loops, arrays and `for...of`

A **loop** runs the same code again and again. MDN: loops "allow you to keep running a piece of code
over and over again, until a certain condition is met." Codecademy calls the point where it stops the
"stopping condition." Without loops, doing something to 100 items would mean writing 100 lines.

An **array** is a collection of values kept together in one variable, in order. MDN: it "creates an
array, which is a collection of values (in this case strings)." Without arrays, three guesses would
need three separate variables. You write an array with **square brackets** `[ ]` around the values
and a comma between each value:

```js
const guesses = ["4", "9", "7"];
console.log(guesses); // prints: [ '4', '9', '7' ]
```

Node shows an array by printing the brackets and each value. It uses single quotes to show that the
values are strings. Arrays get a full section of their own later.

The loop MDN uses here is **`for...of`**. Read `for (const item of collection) { }` as: "for each
item in this collection, put it in the name `item`, then run the code in the braces." MDN: "We then
use a for...of loop to get each item in the array and run some JavaScript on it." The loop stops by
itself when it runs out of items.

```js
const guesses = ["4", "9", "7"];
for (const guess of guesses) {
  console.log(`You guessed ${guess}`);
}
// prints: You guessed 4
// prints: You guessed 9
// prints: You guessed 7
```

The braces run three times, once per item. The first time, `guess` holds `"4"`. The second time it
holds `"9"`, and the third time `"7"`. Then there are no items left, so the loop ends. Notice that
`guess` is a `const` but holds a different value each time. Each pass round the loop gets a brand
new `guess`.

### A preview: `const` does not freeze everything

One last note to keep in mind. `const` stops a name from being given a *new* value. But if the value
is a container with parts inside it (like an array, or the page elements MDN's game works with), the
parts inside can still change. MDN: "even though resetPara is a constant, we can change its internal
properties." You will see exactly how once arrays and objects are taught.

## 1.3 When things go wrong: reading errors

**Sources:** [MDN: What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong) · [Codecademy: Introduction to JavaScript](https://www.codecademy.com/courses/introduction-to-javascript/lessons/introduction-to-javascript/exercises/intro)
**Skills:** syntax_error, logic_error, runtime_error, read_console_error_location, typeerror_not_a_function, lookup_on_mdn, case_sensitive_errors, function_scope_preview, console_log_debugging, data_types_concept, null_value, assign_vs_equality_bug, error_missing_paren, error_missing_colon_property, error_missing_brace, error_missing_quote, error_line_not_exact

Every programmer's code breaks, constantly. The skill is not avoiding errors; it is reading them
calmly and finding the cause fast. An error message is the computer telling you what it could not
do, and usually where.

### Three kinds of error

**Syntax errors.** MDN: "These are spelling errors in your code that actually cause the program not
to run at all, or stop working partway through." A missing bracket, a missing quote, a misspelled
keyword. (The "partway" case belongs to a browser page that loads several scripts: an earlier
script can run before a broken later one. In one Node file, nothing runs.) Node checks the whole
file's syntax *before* running anything, so with a syntax error, not a single line runs, not even
the correct lines above the mistake:

```js
// ERROR EXAMPLE: SyntaxError
console.log("first line");
console.log("second line";
```

Line 2 is missing its `)`. Nothing prints, not even `first line`. Node only reports the error.
(Line numbers in this material count from the first line of code. The `// ERROR EXAMPLE` label is
only there to mark the block, so it is not counted.)

**Runtime errors.** The syntax is fine, so the program starts, but something goes wrong while it is
running. MDN: "trying to call something that isn't actually a function will cause a runtime error."
The lines before the problem do run:

```js
// ERROR EXAMPLE: TypeError
console.log("first line");
const score = 5;
score();
```

This prints `first line`, then crashes on line 3, because `score` holds a number, and you cannot call
a number like a function.

**Logic errors.** The code runs, prints no error, and gives the wrong answer. MDN: "the syntax is
actually correct, but the code is not what you intended it to be." These are the hardest, because
nothing warns you:

```js
const answer = 7;
const guess = 9;
if (guess > answer) {
  console.log("Too low"); // prints: Too low
}
```

9 is greater than 7, so the guess is too *high*, but the message says the opposite. Node is happy;
the bug is in the thinking.

### Reading an error message in the terminal

When Node hits an error, it prints a block of text. Here is a real one, from a file called
`score.js`:

```js
// ERROR EXAMPLE: TypeError
const score = 5;
console.Log(score);
```

Running `node score.js` prints this (the trailing lines are trimmed here):

```text
file:///home/you/score.js:2
console.Log(score);
        ^

TypeError: console.Log is not a function
    at file:///home/you/score.js:2:9
    ...
Node.js v26.11.1
```

The `file:///` in front of the path is how Node names a file in an ES module, which is what every
`.js` file in this course folder is (its `package.json` says `"type": "module"`). In an older
CommonJS file the same report shows a plain path and `at Object.<anonymous> (...)` instead.

Read it in this order:

1. **The error line**, `TypeError: console.Log is not a function`. The part before the colon is the
   error's type; the part after is what went wrong.
2. **The location**, `score.js:2:9`. That is file name, then line 2, then character 9 on that line.
   MDN describes the same thing in a browser: "line 87, character 19 of the file."
3. **The code and the caret.** Node repeats the line and puts `^` (a caret) under the spot it
   blames.
4. The indented `at ...` lines below are where the error passed through. While starting out, look
   for the line that names *your* file and ignore the rest. For a `SyntaxError`, your file is named
   only in the first line of the report; the `at` lines are all Node's own internals.

### "is not a function" usually means a typo, because case matters

What went wrong above? JavaScript has `console.log`, with a lowercase `l`, and nothing called
`console.Log`. MDN: "Often, this error message actually means that we've misspelled something."

This is the case sensitivity from 1.1 coming back. MDN: "JavaScript is case-sensitive, so any slight
difference in spelling or casing will cause an error." A misspelled *variable* name gives a
different error, a `ReferenceError`, because the name was never defined:

```js
// ERROR EXAMPLE: ReferenceError
const total = 5;
console.log(totl);
```

Node reports `ReferenceError: totl is not defined`, pointing at line 2.

When you are not sure how something is spelled, check the documentation instead of guessing. MDN:
"If you are not sure of the correct spelling of a piece of syntax, look it up on MDN." The MDN Web
Docs site (developer.mozilla.org) is the standard JavaScript reference. Codecademy: "Developers use
documentation as a reference tool." Looking things up is part of the job, not a sign of weakness.

### Errors inside functions wait until the function runs

Code inside a function is kept apart from code outside it. MDN: "code inside functions runs in a
separate scope than code outside functions." **Scope** means the region of code where a name exists;
it gets a full section later. Separately, and more useful right now: a function's body does not run
until the function is called, so a runtime mistake inside it does not show up until then. (Scope is
not the reason. A typo inside a plain `{ }` block, which also has its own scope, throws at once.)

```js
function showScore() {
  consol.log("score shown");
}
console.log("program finished"); // prints: program finished
```

`consol` is misspelled, yet this runs cleanly, because `showScore` is never called. Add one call and
the hidden bug appears:

```js
// ERROR EXAMPLE: ReferenceError
function showScore() {
  consol.log("score shown");
}
showScore();
```

So "it ran without errors" only means the lines that *ran* had no errors.

### Debugging with `console.log()`

When a program gives a wrong answer, you need to see what your variables actually hold. The simplest
tool is to add `console.log()` lines that print them. MDN adds one to "print the value of lowOrHi to
the console after we tried to set it." Printing a label next to the value (two values, separated by a
comma) tells you which log is which.

### Data types, and `null`

To debug you need to know what kind of value you are looking at. **Data types** are, in Codecademy's
words, "the classifications we give to the different kinds of data that we use in programming."
JavaScript has eight: number, string, boolean (`true`/`false`), null, undefined, bigint, symbol, and
object. You have already met numbers, strings and booleans; the rest come later.

**`null`** is a value that means "nothing". MDN: "The null value means 'nothing', or 'no value'."
Codecademy: it "represents the intentional absence of a value." You write it as the keyword `null`,
without quotes. Use it when you deliberately want to say "no value yet":

```js
let winner = null;
console.log(winner); // prints: null
winner = "Ada";
console.log(winner); // prints: Ada
```

### A classic logic bug: `=` instead of `===`

`=` gives a variable a value. `===` compares two values. Writing `=` inside an `if` test, where you
meant `===`, does not cause an error. It quietly *changes* the variable, and the test then checks
the new value: any truthy value (like 7) passes, while 0 or "" would fail. The project's ESLint
flags it as you type (`no-cond-assign`). MDN
calls a symptom like this "another symptom of mixing up the assignment and strict equality
operators."

Here `console.log()` debugging catches it in the act:

```js
let guess = 3;
console.log("guess before the if:", guess); // prints: guess before the if: 3
if (guess = 7) {
  console.log("guess inside the if:", guess); // prints: guess inside the if: 7
  console.log("Correct!"); // prints: Correct!
}
```

The guess was 3, so it should not be correct. The two debug lines show `guess` changing from 3 to 7
on line 3. That is the `=` assigning 7 instead of comparing. The fix is `if (guess === 7)`.

### Common syntax error messages

MDN lists the messages a beginner meets most. MDN's messages are Firefox's. Chrome and Edge use V8,
the same engine as Node, so they print Node's wording; both are given here. In every case Node
prints `SyntaxError` and runs nothing.

**A missing closing parenthesis.** MDN: "it generally means that you've missed the closing
parenthesis at the end of a function/method call." Node's message is the same as MDN's:

```js
// ERROR EXAMPLE: SyntaxError
const playerName = "Ada";
console.log("Hello", playerName;
```

Node: `SyntaxError: missing ) after argument list`, at line 2.

**A missing quote mark.** MDN: "These errors generally mean you've missed an opening or closing
quotation mark from a string value."

```js
// ERROR EXAMPLE: SyntaxError
console.log("Hello);
```

Node: `SyntaxError: Invalid or unexpected token`. The string never ends, so the `)` and `;` are
swallowed into it.

**A missing curly brace.** Firefox's message (the one MDN shows) is "missing } after function body", which "generally
means you've missed a curly brace from a function or conditional structure."

```js
// ERROR EXAMPLE: SyntaxError
function greet() {
  console.log("hi");

greet();
```

Node (and Chrome) word this one differently: `SyntaxError: Unexpected end of input`. It means "I reached the end
of the file while still waiting for something", here the `}` that closes `greet`.

**A missing colon in an object.** MDN: "missing : after property id" "usually relates to an
incorrectly formed JavaScript object." Objects come much later. For now, just know that when you see
this message (Node often says `Unexpected string` instead), the problem is in the shape of an
object.

### The reported line is not always the broken line

MDN: "Bear in mind that the error will not necessarily be on that line." The reported location is
where the computer *noticed* the problem, which can be later than where you *made* it.

The missing-brace example above shows this clearly. The missing `}` belongs on line 3, after the
`console.log`. But Node only realizes something is wrong when the file runs out, so it reports a line
*past* the end of the file:

```text
file:///home/you/greet.js:5

SyntaxError: Unexpected end of input
```

So when the reported line looks fine, look *upward* from it, especially for an unclosed `(`, `{` or
quote.

---

## 2.1 Variables: storing values

**Sources:** [MDN — Storing the information you need: Variables](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables) · [Codecademy — Introduction to JavaScript](https://www.codecademy.com/courses/introduction-to-javascript/lessons/introduction-to-javascript/exercises/intro) · [Codecademy — Variables](https://www.codecademy.com/courses/introduction-to-javascript/lessons/variables/exercises/intro)
**Skills:** variable_container, variables_hold_anything, declare_let, type_undefined, undefined_value, undefined_vs_undeclared, initialize_variable, declare_and_initialize, var_keyword, reference_variable, var_hoisting, let_no_redeclare, prefer_let_over_var, update_variable, naming_allowed_chars, naming_no_leading_underscore, naming_no_leading_digit, lower_camel_case, descriptive_names, names_case_sensitive, reserved_words, number_type, string_type

### A variable is a container, not the value

A **variable** is a named container that holds a value. Section 1.2 gave you a quick look at one. This section slows down and explains every part.

The key idea, in MDN's words: "Variables aren't the values themselves; they are containers for values." Picture a labeled box. The label is the variable's name. What sits inside the box is the value. You can take the value out, look at it, or swap in a different one, and the box and its label stay the same.

Why have containers at all? Without them, a program could not remember anything from one line to the next. Every value would have to be typed out again each time you needed it.

A variable can hold almost anything. MDN notes that variables "can also contain complex data and even entire functions". You will see those later. For now, the values are numbers and text.

### Declaring a variable with `let`

To **declare** a variable means to create it, which makes the box and puts its label on. To declare one, MDN says: "we type the keyword let followed by the name you want to call your variable". A **keyword** is a word with a special meaning in JavaScript's syntax; most keywords are reserved and cannot be used as names. `let` is the keyword that means "make a new variable".

The program below declares a variable named `myName`. The `;` (semicolon) at the end marks the end of the instruction, as in section 1.2.

```js
let myName;
console.log(myName);
// prints: undefined
```

Line 1 creates the box. Line 2 asks what is inside it. The answer is `undefined`, explained next.

### `undefined`: the box exists but is empty

`undefined` is a special JavaScript value meaning "there is no value here". Codecademy puts it this way: "undefined means that a given value does not exist."

It matters because JavaScript needs *something* to give back when you ask what is in an empty box. Rather than crash, it hands you `undefined`. As Codecademy says: "If we don't assign a value to a variable declared using the let keyword, it automatically has a value of undefined."

You can type `undefined` yourself too:

```js
let score;
console.log(score === undefined);
// prints: true
```

Line 2 uses `===` (strict equality, from section 1.2) to ask, "is `score` exactly `undefined`?" It is, so the program prints `true`.

**Python habit that breaks here:** Python has no step where you create a variable without giving it a value, so there is no "declared but empty" state. In JavaScript that state is normal, and its value is `undefined`. JavaScript's `undefined` is also not the same thing as Python's `None`. The closest match to `None` is `null` (section 1.3).

### Undefined vs undeclared: two very different things

MDN warns: "Don't confuse a variable that exists but has no defined value with a variable that doesn't exist at all".

- **Undefined:** you declared the variable with `let`, but never put a value in it. Reading it gives `undefined`, and the program keeps running.
- **Undeclared:** you never declared it at all. There is no box. Reading it is an error that stops the program.

```js
// ERROR EXAMPLE: ReferenceError
let city;
console.log(city);
console.log(town);
```

Line 2 prints `undefined`, because `city` exists. Line 3 stops the program with `ReferenceError: town is not defined`. A **ReferenceError** is the error JavaScript throws when you use a name it cannot use at that point: most often a name that was never declared (`... is not defined`). Notice the confusing wording: the error says "not defined", but it means "not *declared*".

### Initializing: putting the first value in

To **initialize** a variable means to give it its first value. MDN describes the steps: type "the variable name, followed by an equals sign (=), followed by the value you want to give it."

Here `=` is the **assignment operator**. It does not mean "is equal to". It means "put the value on the right into the variable on the left".

```js
let myName;
myName = 'Arya';
console.log(myName);
// prints: Arya
```

Line 1 declares the variable. Line 2 initializes it. Codecademy would say "the myName variable is initialized with a value of 'Arya'."

### Declaring and initializing in one line

Doing this in two steps is rare. MDN: "You can declare and initialize a variable at the same time". You write `let`, the name, `=`, and the value, all on one line.

```js
let myDog = 'Rover';
console.log(myDog);
// prints: Rover
```

Declaring and initializing in one line is the form you will write almost every time, and usually
with `const` rather than `let` (2.2 covers when to choose `let`). This section uses `let` because
`let` is what it is teaching.

### Using a variable: say its name

To **reference** a variable means to use its name to get the value stored inside. In the last two examples, `console.log(myDog)` did exactly that. Codecademy describes it as a value "printed to the console by referencing the variable name". You never write the value again. You write the name, and JavaScript looks inside the box for you.

```js
const favoriteFood = 'pizza';
console.log(favoriteFood);
console.log(`I really like ${favoriteFood}`);
// prints: pizza
// prints: I really like pizza
```

Both lines reference `favoriteFood`. The second puts it inside a template literal (section 1.2).

### `var`: the old way, and why to avoid it

You will see another keyword in older code and in tutorials: `var`. Codecademy: "var, short for variable, is a JavaScript keyword that creates, or declares, a new variable." It was the only option at first. MDN: "Back when JavaScript was first created, this was the only way to declare variables. The design of var is confusing and error-prone."

```js
var petName = 'Biscuit';
console.log(petName);
// prints: Biscuit
```

That looks harmless. The trouble comes from two odd behaviors.

**Odd behavior 1: hoisting.** With `var`, you can use a variable on a line *above* the line that declares it. This is called **hoisting**: JavaScript acts as if the declaration had been lifted to the top of its function (or of the file, when it is not inside a function).

```js
petName = 'Biscuit';
console.log(petName);
var petName;
// prints: Biscuit
```

Line 1 assigns a variable that has not been declared yet, and it works anyway. MDN: "Hoisting no longer works with let. If we changed var to let in the above example, it would fail with an error."

```js
// ERROR EXAMPLE: ReferenceError
petName = 'Biscuit';
let petName;
```

With `let`, using the name before its declaration line is a `ReferenceError`. That is what you want. Code that runs out of order is hard to read. Notice the message: `Cannot access 'petName' before initialization`, not `petName is not defined`. JavaScript already knows the name; its line just has not run yet. That window is called the **temporal dead zone** (TDZ), a common interview topic, covered properly in 10.3.

**Odd behavior 2: declaring the same name twice.** MDN: "when you use var, you can declare the same variable as many times as you like, but with let you can't."

```js
var color = 'red';
var color = 'blue';
console.log(color);
// prints: blue
```

With `var`, the second `var` is allowed, and its `= 'blue'` simply overwrites the value. Node gives no warning, but the project's ESLint does (`no-redeclare`). In a long file you could do this by accident and never notice. `let` refuses:

```js
// ERROR EXAMPLE: SyntaxError
let color = 'red';
let color = 'blue';
```

This is a **SyntaxError**: JavaScript reports `Identifier 'color' has already been declared`. A syntax error is caught while the file is being read, before any line runs, so not even line 1 runs.

**The rule:** MDN says "we recommend that you use let in your code, rather than var." You need to *recognize* `var` when you read it. Do not write it.

### Updating a variable

Once a variable has a value, you can change it. MDN: "you can change (or update) that value by giving it a different value." Codecademy calls this **reassigning**. You use `=` again, but **without** `let`, because the box already exists.

```js
let mood = 'sleepy';
console.log(mood);
mood = 'awake';
console.log(mood);
// prints: sleepy
// prints: awake
```

Line 1 creates `mood` holding `'sleepy'`. Line 2 prints it. Line 3 replaces the contents with `'awake'`. Line 4 prints the new value. The old value is gone.

**Common mistake:** writing `let` again when you only mean to update. That is a second declaration, and it gives the same `SyntaxError` you saw above.

```js
// ERROR EXAMPLE: SyntaxError
let mood = 'sleepy';
let mood = 'awake';
```

### Naming rules

You choose every variable's name, but some names are not allowed and some are just poor choices.

**Characters to stick to.** MDN: "you should stick to just using Latin characters (0-9, a-z, A-Z) and the underscore character." The underscore is `_`. (`$` is also legal; you will see it in some libraries.)

**Don't start with an underscore.** `_total` is legal, but MDN says: "Don't use underscores at the start of variable names". A leading underscore has a special meaning in some JavaScript code (you will meet it with objects much later), so using it casually confuses readers. That old meaning, "private, don't touch", is now done with real private class fields written with `#` (12.6). A lone `_` for a parameter you deliberately do not use is a common exception.

**Never start with a digit.** This one is a hard rule. MDN: "This isn't allowed and causes an error."

```js
// ERROR EXAMPLE: SyntaxError
let 1stPlace = 'Ana';
```

In this course's files (ES modules) Node's message is `Unexpected strict mode reserved word`, with
the `^` under `let`. It blames `let`, but the real problem is the name starting with a digit. (An
older CommonJS file says `Invalid or unexpected token` instead.)

Digits are fine *after* the first character, as in `place1` or `player2Score`.

**Use lower camel case.** When a name has several words, you can't put spaces in it. MDN says: "A safe convention to stick to is lower camel case". That means you start lowercase, then capitalize the first letter of each later word: `myAge`, `initialColor`, `finalOutputValue`. Codecademy calls this "camel casing", because the capitals stick up like a camel's humps.

**Make names describe the data.** MDN: "Make variable names intuitive, so they describe the data they contain." `x`, `a`, or `thing` tells the next reader nothing. `bookTitle` tells them everything.

```js
const bookTitle = 'Dune';
const pageCount = 412;
console.log(bookTitle);
console.log(pageCount);
// prints: Dune
// prints: 412
```

**Python habit that breaks here:** Python style uses `snake_case` (`page_count`). JavaScript style is `camelCase` (`pageCount`). `page_count` would still run, but it looks out of place in JavaScript code.

### Names are case sensitive

JavaScript treats capital and lowercase letters as different characters. MDN: "myage is a different variable from myAge."

```js
const myAge = 30;
const myage = 99;
console.log(myAge);
console.log(myage);
// prints: 30
// prints: 99
```

These are two separate boxes. This is why a single wrong capital letter can produce a `ReferenceError`: to JavaScript, `myname` is a name nobody declared.

### Reserved words can't be names

A **reserved word** is a word JavaScript has already claimed for its own syntax, such as most keywords (a few, like `async` and `of`, are not reserved and can be names). MDN: "you can't use words like var, function, let, and for as variable names." Codecademy: "Variable names cannot be the same as keywords."

```js
// ERROR EXAMPLE: SyntaxError
let for = 'loop';
```

JavaScript sees `for` and expects a loop, not a name, so it can't make sense of the line. In an ES module Node's printed message is `Unexpected strict mode reserved word`, with the `^` under `let`, like the digit example above.

### The two kinds of value so far: numbers and strings

Every value has a **data type**, a category that decides what you can do with it (section 1.3 introduced the idea). For now you need two.

**Numbers.** A number value is written as plain digits, with no quotes. Codecademy: "Any number, including numbers with decimals: 4, 8, 1516, 23.42." MDN: "When you give a variable a number value, you don't include quotes".

**Strings.** A **string** is a piece of text. MDN: "When you give a variable a string value, you need to wrap it in single or double quote marks". Codecademy says strings are "surrounded by single quotes: ' ... ' or double quotes " ... ", though we prefer single quotes." From here on this material uses single quotes; the project's formatter (Prettier) enforces that. Examples in 1.2 and 1.3, and some later ones, still use double quotes; both kinds make the same string, and the formatter rewrites them when you paste them into a file.

```js
const myAge = 17;
const price = 23.42;
const greeting = 'Hello';
const farewell = "Goodbye";
console.log(myAge);
console.log(price);
console.log(greeting);
console.log(farewell);
// prints: 17
// prints: 23.42
// prints: Hello
// prints: Goodbye
```

The quotes are not part of the text. They only mark where the string starts and stops, so `console.log` prints the text without them.

**Common mistake:** forgetting the quotes on a string. Without quotes, JavaScript reads the word as a variable name, and if no such variable exists you get a `ReferenceError`.

```js
// ERROR EXAMPLE: ReferenceError
const greeting = Hello;
```


## 2.2 Variables: types and const

**Sources:** [MDN — Variables](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables) · [MDN — Basic math in JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Math) · [Codecademy — Introduction to JavaScript](https://www.codecademy.com/courses/introduction-to-javascript/lessons/introduction-to-javascript/exercises/intro) · [Codecademy — Variables](https://www.codecademy.com/courses/introduction-to-javascript/lessons/variables/exercises/intro) · [Codecademy — Arrays](https://www.codecademy.com/courses/introduction-to-javascript/lessons/arrays/exercises/intro)
**Skills:** log_string_vs_number, boolean_type, type_symbol, comparison_gives_boolean_intro, array_type, array_ordered, array_index_access, index_out_of_range, zero_indexed, object_concept, object_literal_preview, dynamic_typing, quoted_digits_are_strings, typeof_operator, typeof_after_reassign, const_must_initialize, const_no_reassign, const_vs_let_rule, integers_floats, number_bases, single_number_type, bigint_mention, primitive_types, typeof_number

### Printing strings vs printing numbers

You can hand `console.log` a value directly, without a variable. Codecademy points out the difference: when printing the number 40, "notice we did not use quotes."

```js
console.log('JavaScript');
console.log(40);
// prints: JavaScript
// prints: 40
```

Text goes in quotes. Numbers do not.

### Booleans: true or false

A **boolean** is a data type with only two possible values. MDN: "Booleans are true/false values — they can have two values, true or false." Codecademy adds the important detail: "either true or false (without quotes)."

Booleans exist so a program can store the answer to a yes-or-no question, such as "is the user logged in?" or "is the game over?".

```js
const isLoggedIn = true;
const gameOver = false;
console.log(isLoggedIn);
console.log(gameOver);
// prints: true
// prints: false
```

**Common mistake:** `'true'` in quotes is a *string* made of four letters, not a boolean.

**Python habit that breaks here:** Python capitalizes `True` and `False`. JavaScript uses lowercase `true` and `false`. If you write `True`, JavaScript looks for a variable named `True` and throws a `ReferenceError`.

### Symbol: a type you can skip for now

JavaScript has a type called **Symbol**. Codecademy: "symbols are unique identifiers that are useful in more complex coding. No need to worry about these for now." You only need to know it exists.

### A comparison produces a boolean

You don't usually type `true` or `false` yourself. More often, a boolean is the *answer* to a test. MDN shows this with `6 < 3`: it uses "the 'less than' operator (<) to test whether 6 is less than 3."

```js
const test = 6 < 3;
console.log(test);
console.log(2 < 9);
// prints: false
// prints: true
```

Line 1 works out `6 < 3`, gets `false`, and stores that in `test`. Line 3 does the test and prints the answer directly. Section 3.2 covers all the comparison operators.

### Arrays: many values in one variable

An **array** is a single value that holds a list of values. MDN: "An array is a single object that contains multiple values enclosed in square brackets and separated by commas."

Arrays exist because many things in programs are lists: a shopping list, a class roster, a set of scores. Without arrays you would need one variable per item (`item1`, `item2`, `item3`, and so on) and no way to treat them as a group.

The syntax has two parts. `[` and `]` are **square brackets**: they mark the start and end of the array. `,` is a **comma**: it separates one item from the next.

```js
const snacks = ['chips', 'grapes', 'popcorn'];
const scores = [10, 15, 40];
console.log(snacks);
console.log(scores);
// prints: [ 'chips', 'grapes', 'popcorn' ]
// prints: [ 10, 15, 40 ]
```

Node prints arrays with spaces inside the brackets. That is only how it displays them.

### Arrays are ordered, and counting starts at 0

Codecademy: "arrays are ordered, meaning each item has a numbered position." That numbered position is the item's **index**. To read one item, write the array's name, then the index inside square brackets. MDN: "The square brackets specify an index value corresponding to the position of the value you want returned."

Counting starts at zero. MDN: "the first element is at index 0." Codecademy: "the positions start counting from 0 rather than 1." An **element** is one item in the array.

```js
const snacks = ['chips', 'grapes', 'popcorn'];
console.log(snacks[0]);
console.log(snacks[1]);
console.log(snacks[2]);
// prints: chips
// prints: grapes
// prints: popcorn
```

Three items sit at positions 0, 1 and 2. There is no position 3.

**Common mistake:** writing `snacks[1]` when you want the first item. Index 1 is the *second* item.

What happens if you ask for an index past the end? Codecademy leaves you to try it. In JavaScript you get no error, just `undefined`: the box at that position doesn't exist.

```js
const snacks = ['chips', 'grapes', 'popcorn'];
console.log(snacks[3]);
// prints: undefined
```

**Python habit that breaks here:** in Python, reading past the end of a list raises an `IndexError` and stops the program. JavaScript quietly gives back `undefined` and keeps going, so the bug can surface much later.

### Objects: a group of related data

An **object** is a structure of code that models a real-life thing. Codecademy describes objects as "Collections of related data." A dog has a name and a breed. A book has a title and an author. An object keeps those facts together under one variable.

Here is a short preview; the full treatment comes in chapter 12. The new syntax is:

- `{` and `}` are **curly braces**. They wrap the whole object.
- Inside, each fact is written as `name: value`. The `:` (colon) separates a label from its value.
- `,` separates one fact from the next.
- To read a fact back, you write the variable, a `.` (dot), then the label. You can read `dog.name` as "the name inside dog".

```js
const dog = { name: 'Spot', breed: 'Dalmatian' };
console.log(dog.name);
console.log(dog.breed);
// prints: Spot
// prints: Dalmatian
```

The difference from an array: an array finds things by *position* (`snacks[0]`), and an object finds things by *label* (`dog.name`).

### Dynamic typing: you never state a type

MDN: "you don't need to specify what data type a variable will contain". JavaScript works out the type from the value you put in. This is called **dynamic typing**. The same `let` creates a number variable, a string variable, or an array variable. Only the value decides. (TypeScript, which the bootcamp reaches in week 13, adds the type checking that plain JavaScript skips.)

### Digits in quotes are a string

MDN: "Even if the value enclosed in quotes is just digits, it is still a string — not a number". The quotes decide the type, not what's inside them.

```js
const quantity = 500;
const label = '500';
console.log(quantity === label);
// prints: false
```

They look the same when printed, but `===` says they are not equal, because one is a number and the other is a string. Section 3.1 shows the bug this causes with `+`.

### `typeof`: asking a value for its type

Since you never write the type down, you need a way to check it. That is `typeof`. MDN calls it "a special operator called typeof — this returns the data type of the variable you type after it." An **operator** is a symbol or word that performs a task on values. Codecademy adds that `typeof` "returns, or passes back, a string of the data type."

```js
const quantity = 500;
const label = '500';
console.log(typeof quantity);
console.log(typeof label);
console.log(typeof true);
let nothing;
console.log(typeof nothing);
// prints: number
// prints: string
// prints: boolean
// prints: undefined
```

Each line puts `typeof` in front of a value and prints the type name it gives back. This is how you settle the `500` vs `'500'` question.

Two surprises to know about: arrays report `object` (to test for an array, use `Array.isArray(x)`), and so does `null` (`typeof null` is `'object'`, an old bug kept so that existing code does not break).

```js
console.log(typeof ['a', 'b']);
// prints: object
```

That is because an array is a special kind of object, as MDN's definition ("a single object that contains multiple values") already said.

### A variable can change type

Because of dynamic typing, putting a new value in a `let` variable can change its type. Codecademy: "Since you assigned this new value to newVariable, it has a new type!"

```js
let newVariable = 'Playing around with typeof.';
console.log(typeof newVariable);
newVariable = 1;
console.log(typeof newVariable);
// prints: string
// prints: number
```

Line 2 checks the type while the box holds a string. Line 3 reassigns. Line 4 checks again and gets a different answer. The box is the same, but its contents now have a different type.

### `const`: a variable that can't be reassigned

`const` (short for "constant") is a second keyword for declaring a variable. Section 1.2 used it briefly. It has two rules that `let` does not.

**Rule 1: it must get a value when declared.** MDN: "you must initialize them when you declare them." Codecademy: "If we try to declare a const variable without a value, we'll get a SyntaxError."

```js
// ERROR EXAMPLE: SyntaxError
const birthYear;
```

The message is `Missing initializer in const declaration`. An **initializer** is the `= value` part.

**Rule 2: it can't be given a new value.** MDN: "you can't assign them a new value after you've initialized them." Codecademy: "If we try to reassign a const variable, we'll get a TypeError." A **TypeError** is the error JavaScript throws when an operation cannot be carried out: often a value of the wrong type, and here, reassigning a `const`.

```js
// ERROR EXAMPLE: TypeError
const birthYear = 1999;
console.log(birthYear);
birthYear = 2001;
```

Line 2 runs and prints `1999`. Line 3 stops the program with `TypeError: Assignment to constant variable.` This is a runtime error (section 1.3): the file was valid, and the problem only appears when that line runs.

Why have a variable that can't be reassigned? It is a promise. When a reader sees `const`, they know the variable will always hold the value from that line. They don't have to hunt for a later line that reassigned it. If that value is an array or object, its contents can still change (`push` on a `const` array works, section 5.1); `const` only stops the variable being given a new value.

### When to use `const` and when to use `let`

MDN's rule: "Use const when you can, and use let when you have to." Codecademy says the same thing: "If we need to reassign the variable, use let; otherwise, use const."

In practice, start with `const`. If you later find you need to reassign the variable, switch it to `let`.

```js
const userName = 'Jasmine';
let loginCount = 1;
loginCount = 2;
console.log(userName);
console.log(loginCount);
// prints: Jasmine
// prints: 2
```

`userName` never changes, so it is `const`. `loginCount` gets reassigned on line 3, so it has to be `let`.

### Numbers in more detail: integers and floats

MDN separates two kinds of number by how they look:

- An **integer** is a whole number. MDN: "Integers are numbers without a fractional part", for example `10`, `400`, or `0`.
- A **float** (short for "floating point number") has a decimal point and decimal places, for example `12.5` or `56.7786543`. Decimals are stored in binary, so some are not exact: `0.1 + 0.2` prints `0.30000000000000004`. That is true in Python too; it matters when you compare decimals or handle money.

```js
const wholeCookies = 12;
const cupsOfFlour = 2.5;
console.log(wholeCookies);
console.log(cupsOfFlour);
// prints: 12
// prints: 2.5
```

### One number type for both

The two kinds look different, but MDN points out that "JavaScript has only one data type to represent basic numbers — both integers and decimals." That type is called **Number**. Whole number or decimal, `typeof` gives the same answer. MDN: "You should get 'number' returned in both cases".

```js
const wholeCookies = 12;
const cupsOfFlour = 2.5;
console.log(typeof wholeCookies);
console.log(typeof cupsOfFlour);
// prints: number
// prints: number
```

**Python habit that breaks here:** Python has two separate types, `int` and `float`. JavaScript uses one type, Number, for both. (BigInt, below, is a separate type only for huge whole numbers.) There is no `typeof` answer of "integer" or "float".

### Other number systems (mention only)

People normally count in base 10, called **decimal**, which uses the digits 0–9. MDN notes that programmers also meet other bases, such as hexadecimal: "Base 16, uses 0–9 and then a–f in each digit." There is also binary (base 2) and octal (base 8). JavaScript can read them. Here `0x` marks a hexadecimal number and `0b` marks a binary one, and `console.log` prints both in decimal:

```js
console.log(0xff);
console.log(0b101);
// prints: 255
// prints: 5
```

This course uses decimal throughout.

### BigInt (mention only)

MDN: "JavaScript has a second number type, BigInt, used for very, very large integers." Ordinary Numbers lose precision at extremely large values: whole numbers are exact only up to `Number.MAX_SAFE_INTEGER`, which is 9007199254740991 (`9007199254740993` prints as `9007199254740992`). A BigInt is written "with n appended to the number: 1234567890123456n."

```js
const huge = 1234567890123456789n;
console.log(typeof huge);
// prints: bigint
```

You won't need it in this course. Just recognize the trailing `n` when you see it.

### Primitive types and objects

Here is the full list of JavaScript's data types, as Codecademy gives it: Number, BigInt, String, Boolean, Null, Undefined, Symbol, and Object. You have now met every one of them by name. (`null`, an intentionally empty value, came up in section 1.3.)

Codecademy: "The first seven of those types are considered primitive data types." A **primitive** is a single, simple value: one number, one piece of text, one `true`. An **object** is the eighth type and the odd one out, because it is a *collection* that can hold many values, as the `dog` object and the arrays above did.

```js
console.log(typeof 7);
console.log(typeof 'seven');
console.log(typeof { count: 7 });
// prints: number
// prints: string
// prints: object
```

The first two values are primitives. The third is an object. (`null` is a primitive too, even though `typeof null` says `'object'`: that is the old bug from earlier in this section.)


## 3.1 Numbers: methods, Math and arithmetic

**Sources:** [MDN — A first splash into JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/A_first_splash) · [MDN — Basic math in JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Math) · [MDN — What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong) · [Codecademy — Introduction to JavaScript](https://www.codecademy.com/courses/introduction-to-javascript/lessons/introduction-to-javascript/exercises/intro) · [Codecademy — Variables](https://www.codecademy.com/courses/introduction-to-javascript/lessons/variables/exercises/intro) · [Codecademy — Introduction cheatsheet](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-introduction/cheatsheet)
**Skills:** data_instance, property_concept, dot_operator, method_concept, method_call_syntax, arguments_intro, console_log_is_method, string_trim, builtin_objects, math_random, math_floor, math_ceil_lookup, number_isInteger_lookup, method_call_on_number, to_fixed, string_number_concat_pitfall, number_conversion, operator_concept, arithmetic_basic, log_evaluates_expression, random_scale, random_int_recipe, update_with_math, remainder_operator, exponent_operator

### Every value is an instance of a type

The Codecademy cheatsheet: "An instance is an individual case of a data type." `'hello'` is one instance of the string type. `'goodbye'` is another. `42` is an instance of the number type. A type is the general category, and an instance is one particular value in that category.

### Instances come with properties

Codecademy: "All data types have access to specific properties that are passed down to each instance." A **property** is a piece of information a value carries about itself. For example, every string knows how many characters it holds; you will read that property in chapter 4.

You have already read a property once. In section 2.2, `dog.name` read the `name` property of the `dog` object.

### The dot operator

Codecademy: "The . is another operator! We call it the dot operator." The **dot operator** `.` means "reach inside this value and get the thing named next". You can read `dog.name` as "dog, then its name".

### Methods: actions you can perform on a value

Codecademy: "methods are actions we can perform." A **method** is an action attached to a value. A property *is* information. A method *does* something.

How you call one, in Codecademy's words: "Methods are called by appending the object or instance with a period, the method name, and parentheses." To **call** a method means to make it run. It has four parts:

1. the value (the instance),
2. a `.` (dot),
3. the method's name,
4. `()` (parentheses) right after the name.

The parentheses are what make it run. Without them you are only naming the method.

### Arguments: the inputs inside the parentheses

Some methods need information to do their job. You put that information between the parentheses. Codecademy calls these input values **arguments**. One method it shows "accepts the character 'H' as an input, or argument, between the parentheses." When a method takes more than one argument, you separate them with commas.

### `console.log()` is a method call

You have been calling a method since your first program. Codecademy: "When we use console.log(), we're calling the .log() method on the console object." `console` is an object built into Node, and `log` is one of its methods. Whatever you put in the parentheses is the argument.

```js
console.log('Hello', 'world');
// prints: Hello world
```

Here `log` gets two arguments, separated by a comma. It prints both on one line with a space between.

### A first string method: `.trim()`

Strings have methods too. Codecademy: "The one method that seems ideal for us is .trim()." `.trim()` gives back a copy of the string with whitespace (spaces, tabs and line breaks) removed from both ends. That matters when text comes from a person typing, who might have added stray spaces.

```js
const typed = '   Remember to code   ';
console.log(`[${typed}]`);
console.log(`[${typed.trim()}]`);
// prints: [   Remember to code   ]
// prints: [Remember to code]
```

The `[` and `]` inside the template literals are just characters printed around the text, so you can see where the spaces are. Line 3 follows the four-part method recipe: instance `typed`, dot, method name `trim`, parentheses. `.trim()` needs no arguments, so its parentheses are empty.

### Built-in objects: `Math`

Codecademy: "JavaScript has the built-in Math object." A **built-in object** is one JavaScript provides ready-made, with no setup from you. `Math` holds math methods. You call them the same way: `Math`, a dot, the method name, parentheses.

**`Math.random()`** gives a random decimal number. MDN Learn: "a random decimal number between 0 and 1". MDN's reference page (and Codecademy) are more exact: "between 0 (inclusive) and 1 (exclusive)". So 0 is possible, but you never get 1 itself. It is fine for dice and games, but MDN warns it does "not provide cryptographically secure random numbers": never use it for passwords or tokens (Node's `crypto.randomInt()` is the secure version).

```js
const roll = Math.random();
console.log(roll < 1);
// prints: true
```

The actual number is different every run (something like `0.7383...`), so this example prints a check instead of the number: is it below 1? Always `true`. Try `console.log(roll)` yourself a few times to see the changing values.

**`Math.floor()`** rounds down. Codecademy: "Math.floor() takes a decimal number and rounds it down to the nearest whole number." The number goes in as the argument.

```js
console.log(Math.floor(4.7));
console.log(Math.floor(4.2));
// prints: 4
// prints: 4
```

"Down" means it goes to the nearest whole number at or below it, even from `4.7`. A whole number stays as it is (`Math.floor(5)` is `5`), and a negative number goes further from zero (`Math.floor(-4.2)` is `-5`).

**Common mistake:** expecting `Math.floor(4.7)` to give `5`. It doesn't round to the *nearest* whole number. It always rounds down.

### Looking methods up: `Math.ceil()` and `Number.isInteger()` (mention)

Codecademy deliberately doesn't name the next two methods. It asks you to find them in the MDN documentation, which is a skill in itself (section 1.3).

- "the smallest integer greater than or equal to a given number" is **`Math.ceil()`**, which rounds *up*. ("Ceil" is short for ceiling.)
- The method "on the built-in Number object that checks if a number is an integer" is **`Number.isInteger()`**. It gives back a boolean.

```js
console.log(Math.ceil(4.2));
console.log(Number.isInteger(5));
console.log(Number.isInteger(5.5));
// prints: 5
// prints: true
// prints: false
```

### Calling a method on a number: `.toFixed()`

MDN notes that the Number type "provides several methods to manipulate numbers", and you call them on a number value with the dot. The one to know first: "to round your number to a fixed number of decimal places, use the toFixed() method." The argument is how many decimal places you want.

```js
const lotsOfDecimal = 1.7665849587;
const twoPlaces = lotsOfDecimal.toFixed(2);
console.log(twoPlaces);
console.log(typeof twoPlaces);
// prints: 1.77
// prints: string
```

Line 2 rounds to 2 places, so `1.766...` becomes `1.77`. Line 4 shows the catch: the result is a **string**, not a number.

**Python habit that breaks here:** Python's `round(x, 2)` gives back a number. JavaScript's `.toFixed(2)` gives back a string, ready for display but not for more math.

One more catch: `.toFixed()` rounds the value as it is stored in binary (see 2.2's `0.1 + 0.2`), so `(1.005).toFixed(2)` is `'1.00'`, not `'1.01'`. For showing money and other formatted numbers, professional code uses `Intl.NumberFormat`, a later topic.

### When a "number" is really a string

This is one of the most common beginner bugs, and MDN shows it directly. To see it, you need the `+` sign. Between two numbers, `+` adds them (the next heading covers all the math signs). But when either side is a string, `+` *joins* the two as text instead.

```js
const myNumber = '74';
console.log(myNumber + 3);
// prints: 743
```

MDN: "You end up with the result 743, not 77, because myNumber is actually defined as a string." The quotes around `'74'` made it a string (section 2.2), so `+` glued `'3'` onto the end.

**Python habit that breaks here:** in Python, `'74' + 3` crashes with a `TypeError`, so you notice at once. JavaScript doesn't complain. It quietly turns `3` into text and gives you `'743'`.

### Converting a string to a number: `Number()`

The fix, per MDN, is "passing the string value in to the Number() constructor to return a number version of the same value." You put the string in as the argument, and you get the number back.

```js
const myNumber = '74';
const realNumber = Number(myNumber);
console.log(realNumber + 3);
console.log(typeof realNumber);
// prints: 77
// prints: number
```

Line 2 converts `'74'` into `74`. Now `+` adds instead of joining. If the string isn't a number at all, such as `Number('hello')`, the result is `NaN`, which means "Not a Number". (Oddly, `typeof NaN` is `'number'`: NaN is a special value of the Number type.)

Two notes for later. An empty or all-space string converts to `0`, not `NaN`: `Number('')` and `Number('   ')` are both `0`, which is a trap when a user just presses Enter. And call `Number()` without `new`: `new Number('74')` makes a wrapper object (`typeof` gives `'object'`), which nobody writes (ESLint `no-new-wrappers`).

### Operators and arithmetic

Codecademy: "An operator is a character that performs a task in our code." (It need not be one character: `===` is three, and `typeof` is a word.) You've met several already: `=` assigns, `===` compares, `.` reaches into a value. The **arithmetic operators** "are used for performing mathematical calculations":

- Add: `+`
- Subtract: `-`
- Multiply: `*` (an asterisk, not the letter x)
- Divide: `/` (a forward slash)

```js
console.log(3 + 4);
console.log(10 - 4);
console.log(6 * 7);
console.log(15 / 3);
console.log(10 / 4);
// prints: 7
// prints: 6
// prints: 42
// prints: 5
// prints: 2.5
```

Dividing two whole numbers can give a decimal, as `10 / 4` does on the last line. There is only one Number type (section 2.2), so nothing special happens.

### `console.log` works out the answer first

Codecademy: "the computer will evaluate the expression inside the parentheses and print that result to the console." To **evaluate** means to work out the value. An **expression** is any piece of code that produces a value, such as `3 + 4`. `console.log` never sees `3 + 4`. It only receives `7`, and prints that.

The same goes for variables in the expression:

```js
const price = 20;
const quantity = 3;
console.log(price * quantity);
// prints: 60
```

JavaScript looks up `price` (20) and `quantity` (3), multiplies them to get `60`, then hands `60` to `console.log`.

### Bigger random numbers

`Math.random()` alone only gives values from 0 up to (but not including) 1. To get a bigger range you multiply. Codecademy: "To generate a random number between 0 and 50, we could multiply this result by 50".

```js
const big = Math.random() * 50;
console.log(big < 50);
// prints: true
```

The value is random, so again the example checks it: anything from 0 up to just below 50, still with decimals.

### The random-whole-number recipe

For a whole number such as a dice roll or a guessing game, MDN builds it in steps:

1. `Math.random() * 100` gives a decimal from 0 up to just below 100.
2. `Math.floor(...)` rounds it down, giving a whole number from 0 to 99.
3. `+ 1` moves the range up by one. MDN: "We therefore want to add 1 to give us a random number between 1 and 100".

Put together:

```js
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(Number.isInteger(randomNumber));
console.log(0 < randomNumber);
console.log(randomNumber < 101);
// prints: true
// prints: true
// prints: true
```

Read line 1 from the inside out. `Math.random()` runs first. Its result is multiplied by 100. That product is the argument to `Math.floor`, which rounds it down. Then 1 is added. The three checks confirm the result is a whole number from 1 to 100.

**Common mistake:** writing `Math.floor(Math.random() * 100)` and forgetting the `+ 1`. That gives 0 to 99, not 1 to 100.

### Updating a variable using its own value

Codecademy: "The following line, w = w + 1, increases the value of w from 4 to 5."

```js
let w = 4;
w = w + 1;
console.log(w);
// prints: 5
```

Line 2 runs in two steps. First the right side is evaluated: look up `w` (4), add 1, get `5`. Then `=` puts `5` back into `w`. This is why `=` must be read as "store into" and not "equals": as math, `w = w + 1` makes no sense, but as an instruction it is perfectly clear. The variable must be `let`, because it gets reassigned.

### Remainder: `%`

The **remainder operator** `%` is a percent sign, but it has nothing to do with percentages. MDN: it "Returns the remainder left over after you've divided the left number into multiple integer portions equal to the right number." The Codecademy cheatsheet notes it is "sometimes called modulo".

```js
console.log(10 % 3);
console.log(8 % 2);
console.log(11 % 2);
// prints: 1
// prints: 0
// prints: 1
```

Three goes into 10 three whole times (9), and 1 is left over. Two goes into 8 exactly, so 0 is left. For a positive whole number, `% 2` is `0` if it is even and `1` if it is odd, which makes `%` the usual even/odd test. A negative odd number gives `-1` (`-3 % 2` is `-1`), so test "odd" with `n % 2 !== 0`, not `n % 2 === 1`.

**Python habit that breaks here:** Python's `%` follows the sign of the right side, so `-3 % 2` is `1` in Python. JavaScript's `%` is a true *remainder*: MDN says it "always takes the sign of the dividend" (the left side), so it is `-1`.

### Exponent: `**`

The **exponent operator** `**` (two asterisks) raises a number to a power. MDN: it "Raises a base number to the exponent power, that is, the base number multiplied by itself, exponent times."

```js
console.log(5 ** 2);
console.log(2 ** 3);
console.log(10 ** 3);
// prints: 25
// prints: 8
// prints: 1000
```

`5 ** 2` is 5 × 5. `2 ** 3` is 2 × 2 × 2.

**Common mistake:** using `^` for a power, as some calculators do. In JavaScript, `^` is a different operator entirely, so `5 ^ 2` gives `7`, not `25`. Use `**`.

---

## 3.2 Operators and comparisons

**Sources:** [MDN: Basic math in JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Math) · [Codecademy: Variables](https://www.codecademy.com/courses/introduction-to-javascript/lessons/variables/exercises/intro) · [Codecademy: Conditional Statements](https://www.codecademy.com/courses/introduction-to-javascript/lessons/control-flow/exercises/intro) · [Codecademy cheatsheet: Conditionals](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-control-flow/cheatsheet) · [Codecademy cheatsheet: Scope](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-scope/cheatsheet)
**Skills:** math_pow, operands_term, variables_in_arithmetic, expression_term, operator_precedence, parentheses_override, exponent_precedence, assignment_operator, compound_assignment, increment_decrement, increment_variable_only, postfix_returns_old, prefix_increment, comparison_operators_concept, compare_strings, strict_equality, strict_equal_checks_type, relational_operators, loose_equality, comparisons_return_booleans, toggle_pattern

### The older way to write exponents: `Math.pow()`

In 3.1 you met `**`, the exponent operator: `2 ** 3` means "2 multiplied by itself 3 times". You may also see an older way to write the same thing in other people's code: `Math.pow(base, exponent)`. `Math.pow` is a method on the built-in `Math` object. You give it two arguments, the base first and the exponent second, separated by a comma.

```js
console.log(2 ** 3);
// prints: 8
console.log(Math.pow(2, 3));
// prints: 8
```

Both lines give the same answer. You only need to recognize `Math.pow()` when you read it. When you write your own code, `**` is shorter.

### Operands and variables in arithmetic

An **operand** is a value that an operator works on. In `7 + 5`, the operator is `+` and the two operands are `7` and `5`. You need the word because documentation uses it all the time: "the `+` operator takes two operands".

An operand does not have to be a number typed straight into the code. It can be a variable. A variable used in a calculation behaves exactly like the value it holds. JavaScript looks up the value inside the box, then does the math with that value.

```js
const price = 12;
const quantity = 3;
console.log(price * quantity);
// prints: 36
```

Trace it: line 1 stores `12` in `price`. Line 2 stores `3` in `quantity`. Line 3 looks up both values, so `price * quantity` becomes `12 * 3`, which is `36`.

### Expressions and the order things are calculated in

An **expression** is any piece of code that produces a value. `7 + 5` is an expression (it produces `12`). `price * quantity` is an expression. Even a lone `7` is an expression. This word matters because many rules in JavaScript say "you can put any expression here", and now you know what that allows.

When an expression has more than one operator, JavaScript has to decide which one to do first. The rule that decides is called **operator precedence**. It is the same as in school math:

1. `*` (multiply), `/` (divide) and `%` (remainder, 3.1) happen first.
2. `+` (add) and `-` (subtract) happen after.
3. Operators at the same level go from left to right, except `**` (below), which groups right to left.

```js
console.log(2 + 3 * 4);
// prints: 14
console.log(10 - 4 - 3);
// prints: 3
console.log(20 / 2 * 5);
// prints: 50
```

Walk through each line. In line 1, `3 * 4` runs first and gives `12`, then `2 + 12` gives `14`. In line 3, `-` and `-` are the same level, so they go left to right: `10 - 4` is `6`, then `6 - 3` is `3`. In line 5, `/` and `*` are the same level, so left to right again: `20 / 2` is `10`, then `10 * 5` is `50`.

### Parentheses: forcing something to go first

`( )` are parentheses. Around part of an expression, they mean "calculate this part first", overriding the normal precedence. They exist because the normal order is not always the order you need.

```js
console.log(2 + 3 * 4);
// prints: 14
console.log((2 + 3) * 4);
// prints: 20
```

Line 1 multiplies first. Line 3 adds first, because `2 + 3` sits inside parentheses: `5 * 4` is `20`.

### Where `**` fits in the order

The exponent operator `**` has its own place in the order. It runs after anything in parentheses, but before `*`, `/`, `+` and `-`.

```js
console.log(2 + 3 ** 2);
// prints: 11
console.log((2 + 3) ** 2);
// prints: 25
```

In line 1, `3 ** 2` runs first and gives `9`, then `2 + 9` gives `11`. In line 3, the parentheses go first: `2 + 3` is `5`, then `5 ** 2` is `25`.

Two `**` in a row group from the right: `2 ** 3 ** 2` is `2 ** 9`, which is `512` (Python does the same).

**Python habit that breaks here:** in Python `-2 ** 2` is `-4`. In JavaScript it is a `SyntaxError` ("Unary operator used immediately before exponentiation expression"): write `(-2) ** 2` or `-(2 ** 2)` to say which one you mean.

The full order you need for now: parentheses, then `**`, then `*`, `/` and `%`, then `+` and `-`. When you are not sure, add parentheses. They cost nothing and make your intent obvious to the next reader. One thing to expect: the project's formatter removes parentheses that change nothing (`2 + (3 * 4)` becomes `2 + 3 * 4`) and keeps or adds ones that help reading (`a % 3 * 2` becomes `(a % 3) * 2`).

### `=` is the assignment operator

`=` is the **assignment operator**. It takes the value on the right and stores it in the variable on the left. It is an instruction ("put this in that box"), not a statement that two things are equal.

Because the right side is worked out first, a variable can appear on both sides:

```js
let score = 10;
score = score + 5;
console.log(score);
// prints: 15
```

Trace line 2 from right to left: JavaScript reads `score` (which is `10`), adds `5` to get `15`, then stores `15` back into `score`.

**Python habit that breaks here:** one difference: in Python `if x = 5:` is a `SyntaxError`; in JavaScript `=` inside a condition is allowed and silently assigns (1.3). ESLint's `no-cond-assign` flags it. The other trap is the next idea: JavaScript's `===` for comparison has three equal signs, not two.

### Shortcut assignment: `+=`, `-=`, `*=`, `/=`

Writing `score = score + 5` repeats the variable's name. JavaScript has shortcut operators, called **compound assignment** operators, that do the math and the storing in one step:

- `+=` adds the right value to the variable, then stores the result. `x += 4` means `x = x + 4`.
- `-=` subtracts. `x -= 4` means `x = x - 4`.
- `*=` multiplies. `x *= 4` means `x = x * 4`.
- `/=` divides. `x /= 4` means `x = x / 4`.

```js
let w = 4;
w += 1;
console.log(w);
// prints: 5
w *= 3;
console.log(w);
// prints: 15
w -= 5;
console.log(w);
// prints: 10
w /= 2;
console.log(w);
// prints: 5
```

Trace it: `w` starts at `4`. `w += 1` makes it `5`. `w *= 3` makes it `15`. `w -= 5` makes it `10`. `w /= 2` makes it `5`.

**Common mistake:** using a compound operator on a `const`. A `const` can never be given a new value, and `+=` is a way of giving it one.

```js
// ERROR EXAMPLE: TypeError
const total = 10;
total += 5;
```

Node stops with `TypeError: Assignment to constant variable.` Use `let` for any variable you plan to update.

### Adding or removing one: `++` and `--`

Adding or subtracting exactly 1 is so common that it has its own operators. You saw `++` in 1.2. Here is the full pair:

- `++` is the **increment** operator. It increases a variable's value by one.
- `--` is the **decrement** operator. It decreases a variable's value by one.

```js
let lives = 3;
lives--;
console.log(lives);
// prints: 2
lives++;
lives++;
console.log(lives);
// prints: 4
```

`lives` starts at `3`. `lives--` takes it to `2`. The two `lives++` lines take it to `3`, then `4`.

**Common mistake:** putting `++` on a plain number. `++` changes a stored value, so it only works on something that can store a value: a variable, or an object property or array element (`scores[0]++`). A literal number like `3` is not a box that can be changed.

```js
// ERROR EXAMPLE: SyntaxError
console.log(3++);
```

Node refuses to run the file and reports `SyntaxError: Invalid left-hand side expression in postfix operation`. "Left-hand side" here means "the thing `++` is attached to", and a number is not a valid target.

### Before or after: `num++` versus `++num`

The position of `++` matters when you use the result in the same line.

**Postfix** means the operator comes after the variable: `num++`. It hands back the *current* value first, then increments the variable.

```js
let num = 5;
console.log(num++);
// prints: 5
console.log(num);
// prints: 6
```

Line 2 prints `5`, the old value, and only then does `num` become `6`. Line 4 shows the change happened.

**Prefix** means the operator comes before the variable: `++num` (or `--num`). It changes the variable *first*, then hands back the new value.

```js
let num = 5;
console.log(++num);
// prints: 6
console.log(--num);
// prints: 5
```

Line 2 adds one first, so it prints `6`. Line 4 subtracts one first, so it prints `5`.

When `++` sits alone on its own line (`num++;`), there is no difference: nothing uses the handed-back value. The difference only shows when the same line also uses the value. In your own code, keep `++` on a line of its own (or in a loop header) and do not rely on the handed-back value; the prefix/postfix difference is something to read correctly, not to use.

**Python habit that breaks here:** Python has no `++` or `--` at all. In JavaScript they are common, especially in the `for` loops you will meet in 7.1. Some teams (Airbnb's style guide, ESLint `no-plusplus`) write `+= 1` instead; Google's guide uses `++`. Both are current.

### Comparison operators: true/false tests

Programs often need to ask a yes-or-no question and act on the answer: "is the score over 100?", "is the password correct?". A **comparison operator** runs that kind of true/false test. It compares the value on its left with the value on its right, and the answer is always one of the two booleans, `true` or `false`.

You met one comparison already: `===` in 1.2. The next headings cover the whole family. They work on strings as well as numbers:

```js
console.log('apples' === 'oranges');
// prints: false
console.log('apples' === 'apples');
// prints: true
```

Comparing two strings with `===` checks whether they contain exactly the same characters in the same order. Capital letters count as different characters, so `'Apples' === 'apples'` is `false`.

### Equal and not equal: `===` and `!==`

- `===` is the **strict equality** operator (Codecademy calls it the identity operator; MDN names it "Strict equality"). It tests whether the left and right values are identical. Read it as "is exactly equal to".
- `!==` is **strict inequality**. Read it as "is not equal to". It is `true` when the two values are different.

```js
const fruit = 'apples';
console.log(fruit === 'apples');
// prints: true
console.log(fruit !== 'apples');
// prints: false
console.log(fruit !== 'pears');
// prints: true
```

"Identical" includes the type. A number and a string are never identical, even when they look alike:

```js
console.log(1 === 1);
// prints: true
console.log(1 === '1');
// prints: false
```

In line 3, the left side is the number `1` and the right side is the string `'1'`. Different types, so `===` says `false`. This matters in real code because anything a user types arrives as a string.

**Common mistake:** writing one `=` when you mean to compare. One `=` stores a value. It does not ask a question. To compare, use `===`.

### Bigger and smaller: `<`, `>`, `<=`, `>=`

These four are the **relational operators**. They test how two values compare in size:

- `<` less than
- `>` greater than
- `<=` less than or equal to (the left value is smaller than, or the same as, the right one)
- `>=` greater than or equal to

```js
const age = 18;
console.log(age < 18);
// prints: false
console.log(age <= 18);
// prints: true
console.log(age > 21);
// prints: false
console.log(age >= 13);
// prints: true
```

On strings, `<` and `>` compare character by character using each character's code. That is NOT dictionary order: `'Zebra' < 'apple'` and `'10' < '9'` are both `true`, because capitals come before lowercase and `'1'` comes before `'9'`. For real alphabetical order you use `a.localeCompare(b)` (11.1 uses it for sorting).

The difference between `<` and `<=` is exactly the case where the values are equal. `18 < 18` is `false`, but `18 <= 18` is `true`. Getting this wrong by one is a very common source of bugs, so say the words out loud: "less than *or equal to*".

### The loose versions: `==` and `!=`

You will see `==` and `!=` (two characters, not three) in older code and tutorials, for example `if (isLoggedIn == true)`, and in one current idiom, `x == null` (true for both `null` and `undefined`; Google's style guide allows exactly this case). They are valid JavaScript, but they differ from `===` and `!==`: when the two types differ, they quietly convert one side to match the other first; when the types match, they behave like `===`.

```js
console.log(1 == '1');
// prints: true
console.log(1 === '1');
// prints: false
```

That silent conversion causes surprises, so use `===` and `!==` in your own code. Just recognize `==` and `!=` when you read them.

**Python habit that breaks here:** in Python, `1 == '1'` is `False`. In JavaScript, `1 == '1'` is `true`. Python's `==` behaves more like JavaScript's `===`, so type three equal signs.

### Every comparison produces a boolean

All the comparisons above produce `true` or `false`. Every comparison is made of three parts: a value on the left, a comparison operator, and a value on the right. Because the result is a value, you can store it in a variable like any other value:

```js
const temperature = 30;
const isHot = temperature > 25;
console.log(isHot);
// prints: true
console.log(typeof isHot);
// prints: boolean
```

Line 2 works out `30 > 25`, which is `true`, and stores that boolean in `isHot`.

That boolean is what drives decisions. An `if` statement (from 1.2, covered fully in 6.1) runs its block only when its condition comes out `true` (or "truthy", 6.1: `if ('hi')` runs too):

```js
const temperature = 30;
if (temperature > 25) {
  console.log('Wear a T-shirt');
} else {
  console.log('Bring a jacket');
}
// prints: Wear a T-shirt
```

The comparison `30 > 25` is `true`, so the first block runs and the `else` block is skipped.

### The toggle pattern

A **toggle** is code that swaps something between two states, like a light switch: on becomes off, off becomes on. The usual shape is an `if`/`else` that tests the current state with `===` and sets the other one. MDN's version toggles a button on a web page. Here is the same idea with `console.log` instead:

```js
let light = 'off';
if (light === 'off') {
  light = 'on';
} else {
  light = 'off';
}
console.log(light);
// prints: on
```

`light` starts as `'off'`, so the test in line 2 is `true`, and line 3 sets it to `'on'`. If `light` had started as `'on'`, the test would be `false`, the `else` block would run, and it would become `'off'`. Run the same `if`/`else` again and the state flips back.

---

## 4.1 Strings: making and joining text

**Sources:** [MDN: Handling text — strings in JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Strings) · [Codecademy: Variables](https://www.codecademy.com/courses/introduction-to-javascript/lessons/variables/exercises/intro) · [Codecademy: Introduction to JavaScript](https://www.codecademy.com/courses/introduction-to-javascript/lessons/introduction-to-javascript/exercises/intro) · [Codecademy cheatsheet: Introduction](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-introduction/cheatsheet) · [Codecademy: Loops](https://www.codecademy.com/courses/introduction-to-javascript/lessons/loops/exercises/intro) · [Codecademy: Conditional Statements](https://www.codecademy.com/courses/introduction-to-javascript/lessons/control-flow/exercises/intro) · [Codecademy: Advanced Objects](https://www.codecademy.com/courses/introduction-to-javascript/lessons/advanced-objects/exercises/intro)
**Skills:** string_needs_quotes, unquoted_text_is_code, copy_string_variable, three_quote_kinds, matching_quotes, consistent_quote_style, template_literal, template_interpolation, concatenation_term, interpolation_only_in_template, plus_concatenation, concatenation_spaces, chain_operations, concat_with_variables, template_more_readable, expressions_in_template, multiline_template, newline_escape, quotes_inside_strings_alt, escape_characters, number_string_auto_convert, type_coercion_side_effect, number_function_convert, string_function_convert

### A string needs quotes

A **string** is a piece of text: a name, a message, a sentence. Storing a string in a variable works just like storing a number. The only difference is that you must surround the text with quotes. The quotes tell JavaScript where the text starts and stops.

```js
const greeting = 'Hello';
console.log(greeting);
// prints: Hello
```

The quotes are not part of the text. `console.log` prints `Hello`, not `'Hello'`.

### Text without quotes is read as code

Without quotes, JavaScript does not see text. It sees a name, and tries to find a variable (or property, or reserved word) with that name. If nothing has that name, the program stops.

```js
// ERROR EXAMPLE: ReferenceError
const greeting = Hello;
```

Node reports `ReferenceError: Hello is not defined`. It looked for a variable called `Hello` and found none. The fix is quotes: `'Hello'`.

### Copying a string from one variable to another

A variable name on the right side of `=` (without quotes) means "the value inside this variable". So you can copy one string into a second variable:

```js
const string = 'The revolution will not be televised.';
const copy = string;
console.log(copy);
// prints: The revolution will not be televised.
```

Line 2 has no quotes around `string`, so JavaScript reads it as the variable and copies its value into `copy`. Had you written `'string'` in quotes, `copy` would hold the six-letter word "string" instead.

### Three kinds of quotes

You can wrap a string in any of three characters:

- `'` single quotes
- `"` double quotes
- `` ` `` backticks (the key usually left of `1` on the keyboard)

```js
const single = 'Single quotes';
const double = "Double quotes";
const backtick = `Backtick`;
console.log(single);
// prints: Single quotes
console.log(double);
// prints: Double quotes
console.log(backtick);
// prints: Backtick
```

All three hold ordinary text. Backticks have extra powers, covered below. (If you copy this block into a lesson file, put `// prettier-ignore` above line 2: on save the formatter rewrites `"Double quotes"` to `'Double quotes'`, and the demo of three quote kinds is lost.)

**Common mistake:** the start and end characters must match. If a string starts with `'`, it must end with `'`.

```js
// ERROR EXAMPLE: SyntaxError
const badQuotes = 'This is a test";
```

JavaScript sees the opening `'` and keeps looking for another `'` to close the string. The `"` does not count. It reaches the end of the line still inside the string and stops with a `SyntaxError`.

Single and double quotes behave the same, so pick one per project; the formatter (Prettier) enforces it for you. Consistency makes code easier to scan. This course uses single quotes.

### Template literals: strings in backticks

A string written with backticks is a special kind of string called a **template literal**. You first saw one in 1.2. Its main power is the **placeholder**: inside a template literal, `${ }` (a dollar sign followed by curly braces) wraps a variable or expression, and its value is placed into the string at that spot. Putting a value into a string this way is called **interpolation**.

```js
const myPet = 'armadillo';
console.log(`I own a pet ${myPet}.`);
// prints: I own a pet armadillo.
```

When line 2 runs, JavaScript replaces `${myPet}` with the value of `myPet` and builds the full sentence.

Joining strings together into one longer string, as that example does, is called **concatenation**.

**Common mistake:** `${ }` works only inside backticks. In single or double quotes it is just ordinary characters, printed as-is.

```js
const myPet = 'armadillo';
console.log('I own a pet ${myPet}.');
// prints: I own a pet ${myPet}.
```

No error appears, which makes this mistake easy to miss: Node is silent, and so is the project's ESLint (an opt-in rule, `no-template-curly-in-string`, would catch it, but it is not switched on here). Check the quote character first whenever a placeholder prints literally.

**Python habit that breaks here:** Python's f-strings put an `f` before the quotes and use `{name}`. JavaScript has no `f` prefix. It needs backticks and a `$` before the braces.

### Joining with `+`

You can also concatenate ordinary (non-template) strings with the `+` operator. When `+` sits between two strings, it does not add. It sticks the right string onto the end of the left one.

```js
console.log('hi' + 'ya');
// prints: hiya
console.log('wo' + 'ah');
// prints: woah
```

**Common mistake:** concatenation adds nothing between the pieces, not even a space. JavaScript joins the strings exactly, so you must include any space yourself.

```js
console.log('Hello' + 'world');
// prints: Helloworld
console.log('Hello' + ' ' + 'world');
// prints: Hello world
```

Line 3 also shows **chaining**: like math, you can combine several operations in one expression. JavaScript works left to right: `'Hello' + ' '` gives `'Hello '`, then adding `'world'` gives `'Hello world'`.

The strings can come from variables too. A variable on either side of `+` is replaced by the string it holds:

```js
const firstName = 'Ada';
const lastName = 'Lovelace';
const fullName = firstName + ' ' + lastName;
console.log(fullName);
// prints: Ada Lovelace
```

### Why template literals usually read better

Here is the same sentence built both ways:

```js
const name = 'Chris';
const greeting = 'Hello';
console.log(greeting + ', ' + name);
// prints: Hello, Chris
console.log(`${greeting}, ${name}`);
// prints: Hello, Chris
```

Both work. The template literal in line 5 looks like the final sentence, with no `+` signs or separate space strings to track. That makes it easier to read and easier to get the spacing right, so template literals are usually the better choice.

### Whole expressions inside `${ }`

`${ }` can hold any expression, not just a variable name. JavaScript works out the expression, then puts the result into the string.

```js
const price = 4;
const quantity = 3;
console.log(`Total: ${price * quantity} dollars`);
// prints: Total: 12 dollars
console.log(`Next year you will be ${29 + 1}.`);
// prints: Next year you will be 30.
```

In line 3, `price * quantity` becomes `12` before the string is built.

### Strings on more than one line

A template literal keeps the line breaks you type in the source code. Press Enter inside the backticks and the string will contain a new line:

```js
const poem = `Roses are red,
violets are blue.`;
console.log(poem);
// prints: Roses are red,
// prints: violets are blue.
```

Ordinary quotes cannot span lines like that. To put a line break inside a single-quoted or double-quoted string, write `\n` (a backslash followed by the letter n). `\n` is one special character meaning "new line here".

```js
const poem = 'Roses are red,\nviolets are blue.';
console.log(poem);
// prints: Roses are red,
// prints: violets are blue.
```

### Quotes inside a string

What if the text itself contains a quote, like the apostrophe in "It's"? Inside single quotes, that apostrophe would end the string too early.

**Option 1: use a different quote character** to wrap the string. An apostrophe inside double quotes is just text:

```js
const sentence = "It's winter!";
console.log(sentence);
// prints: It's winter!
```

**Option 2: escape the character.** **Escaping** means marking a character so JavaScript treats it as text, not as part of the code. You escape a character by putting a backslash `\` in front of it.

```js
const sentence = 'It\'s winter! Everything is covered in snow.';
console.log(sentence);
// prints: It's winter! Everything is covered in snow.
```

`\'` means "an apostrophe that is part of the text". The backslash itself does not print. `\n` from the last heading is also an escape: a backslash that gives the next character a special meaning.

In real projects you will mostly see Option 1. The formatter (Prettier) picks whichever quote needs the fewest escapes, so on save it rewrites `'It\'s winter!'` to `"It's winter!"`, even though this project prefers single quotes. (So if you copy Option 2 into a lesson file to practise escaping, put `// prettier-ignore` above the line, or the escape disappears.)

### Mixing strings and numbers with `+`

When `+` has a string on one side and a number on the other, JavaScript converts the number into a string, then concatenates the two strings.

```js
const name = 'Front ';
const number = 242;
console.log(name + number);
// prints: Front 242
```

The number `242` becomes the text `'242'`, and the result is the string `'Front 242'`.

This automatic conversion is called **type coercion**: JavaScript quietly changes a value's type to make an operation work. It sometimes gives odd results, as a side effect:

```js
console.log('5' + 2);
// prints: 52
console.log('5' - 2);
// prints: 3
```

`+` with a string joins text, so `'5' + 2` is `'52'`. `-` has no text meaning, so JavaScript turns `'5'` into a number and subtracts, giving `3`. When you see a result like `52` where you expected `7`, suspect a number that is secretly a string.

**Python habit that breaks here:** Python refuses to run `'5' + 2` and raises a `TypeError`. JavaScript does not complain. It joins the two and carries on, so the bug shows up later as a strange value.

### Converting on purpose: `Number()` and `String()`

To avoid surprises, convert values yourself before using them.

`Number()` is a built-in function that converts what you pass it into a number, if it can. You met it in 1.2. It fixes the `'52'` problem:

```js
const typed = '5';
console.log(Number(typed) + 2);
// prints: 7
console.log(Number('hello'));
// prints: NaN
```

`'hello'` has no sensible number value, so `Number` returns `NaN`, a special value meaning "Not a Number".

`String()` works the other way: it converts its argument to a string.

```js
const myNum = 123;
const myString = String(myNum);
console.log(typeof myNum);
// prints: number
console.log(typeof myString);
// prints: string
```

`myNum` still holds the number `123`. `String(myNum)` gives back a new value, the text `'123'`, which is stored in `myString`.

---

## 4.2 String methods

**Sources:** [MDN: Useful string methods](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Useful_string_methods) · [Codecademy: Introduction to JavaScript](https://www.codecademy.com/courses/introduction-to-javascript/lessons/introduction-to-javascript/exercises/intro) · [Codecademy: Arrays](https://www.codecademy.com/courses/introduction-to-javascript/lessons/arrays/exercises/intro)
**Skills:** strings_as_objects, string_length, string_char_by_index, count_from_zero_strings, last_char_length_minus_one, substring_term, method_parameter_term, string_includes, starts_ends_with, string_index_of, index_of_from_position, string_slice, slice_to_end, change_case, string_replace, strings_immutable_methods_return_new, let_when_reassigning, replace_all, method_args_can_be_variables

### Strings come with built-in tools

In 3.1 you learned that a **property** is a piece of information attached to a value, and a **method** is an action attached to a value. You reach both with a dot (`.`). A string is not an object, but JavaScript lets you use it as if it were one, so every string has many properties and methods ready to use. You already used one: `.trim()`.

This section covers the most useful ones.

### How long is a string? `.length`

`.length` is a property that every string has. It holds the number of characters in the string. Spaces and punctuation count as characters. (Strictly it counts UTF-16 code units: the same as characters for ordinary text, but an emoji like `'😀'` counts 2.)

```js
const browserType = 'mozilla';
console.log(browserType.length);
// prints: 7
console.log('Hi there!'.length);
// prints: 9
```

`length` is a property, not a method, so it has no parentheses after it.

**Common mistake:** writing `.length()` with parentheses. Parentheses mean "call this method", and `length` is a number, not a method.

```js
// ERROR EXAMPLE: TypeError
const browserType = 'mozilla';
console.log(browserType.length());
```

Node reports `TypeError: browserType.length is not a function`.

**Python habit that breaks here:** Python uses `len(s)`. JavaScript has no `len`. Use `s.length`.

### One character at a time: `str[index]`

Each character in a string has a numbered position, called its **index**. You get the character at a position with square brackets after the string: `str[0]`.

Positions count from 0, not 1. The first character is at index `0`, the second at index `1`, and so on. This is the same zero-based counting you saw with arrays in 2.2.

```js
const browserType = 'mozilla';
console.log(browserType[0]);
// prints: m
console.log(browserType[1]);
// prints: o
console.log(browserType[6]);
// prints: a
```

`'mozilla'` has 7 characters, so the positions run from `0` to `6`.

### The last character: `str[str.length - 1]`

Because counting starts at 0, the last character's position is always one less than the length. For `'mozilla'`, the length is `7`, so the last character is at index `6`. You can calculate that instead of counting by hand:

```js
const browserType = 'mozilla';
console.log(browserType[browserType.length - 1]);
// prints: a
```

JavaScript works out the inside of the brackets first: `browserType.length` is `7`, `7 - 1` is `6`, and `browserType[6]` is `'a'`. This works for a string of any length.

**Common mistake:** using `str[str.length]` instead. That position is one past the end, so there is no character there and you get `undefined`.

```js
const word = 'cat';
console.log(word[word.length]);
// prints: undefined
```

**Python habit that breaks here:** in Python, `s[-1]` gives the last character. In JavaScript, `word[-1]` gives `undefined`. There is no character at a negative position, so use `word[word.length - 1]`, or `word.at(-1)`: the `.at()` method does accept a negative position, counting from the end, and is the direct equivalent of Python's `[-1]` (available everywhere since 2022). You still need the `length - 1` form when you work with positions in loops.

### Substrings and method parameters

A **substring** is a smaller string inside a larger one. `'zil'` is a substring of `'mozilla'`. Many string methods search for or pull out substrings.

The values you pass inside a method's parentheses are its **arguments**, and the slots the method defines to receive them are called its **parameters**. Documentation often says "this method takes one parameter", meaning "put one value in the parentheses".

### Does it contain this? `.includes()`

`.includes()` checks whether a string contains a substring. It takes one parameter, the substring to search for, and returns `true` if the string contains it, `false` otherwise.

```js
const browserType = 'mozilla';
console.log(browserType.includes('zilla'));
// prints: true
console.log(browserType.includes('fire'));
// prints: false
```

The search is case-sensitive: `'mozilla'.includes('Zilla')` is `false`, because `Z` and `z` are different characters.

**Python habit that breaks here:** Python writes `'zilla' in s`. In JavaScript, use `s.includes('zilla')`.

### Start and end: `.startsWith()` and `.endsWith()`

To check only the beginning or only the end of a string, use `.startsWith()` and `.endsWith()`. Each takes one substring and returns `true` or `false`.

```js
console.log('Hey'.startsWith('H'));
// prints: true
const fileName = 'notes.txt';
console.log(fileName.endsWith('.txt'));
// prints: true
console.log(fileName.startsWith('txt'));
// prints: false
```

`'notes.txt'` contains `'txt'`, but it does not *start* with it, so the last line is `false`.

### Where is it? `.indexOf()`

`.indexOf()` tells you *where* a substring is. It returns the index where the substring first starts. If the string does not contain the substring at all, it returns `-1`. `-1` can never be a real position, so it works as a signal for "not found".

```js
const tagline = 'MDN - Resources for developers, by developers';
console.log(tagline.indexOf('developers'));
// prints: 20
console.log(tagline.indexOf('x'));
// prints: -1
```

Line 2 prints `20` because `'developers'` first starts at index 20 (counting from 0, spaces included).

To find a *later* occurrence, give `.indexOf()` a second argument: the position to start searching from. Pass a number greater than the index of the previous match:

```js
const tagline = 'MDN - Resources for developers, by developers';
console.log(tagline.indexOf('developers', 21));
// prints: 35
```

The search starts at index 21, which skips the first `'developers'` (at 20) and finds the second at 35.

### Cutting out a piece: `.slice()`

`.slice(start, end)` returns the substring that runs from index `start` up to, but **not including**, index `end`. "Not including" is called *exclusive*: the character at the `end` index is left out.

```js
const browserType = 'mozilla';
console.log(browserType.slice(1, 4));
// prints: ozi
```

Trace the positions: `m` is 0, `o` is 1, `z` is 2, `i` is 3, `l` is 4. `slice(1, 4)` takes positions 1, 2 and 3, which are `o`, `z`, `i`. Position 4 is the stopping point and is not included. A handy check: `end - start` is how many characters you get (`4 - 1` is 3).

Leave out the second argument and `.slice()` takes everything from `start` to the end of the string:

```js
const browserType = 'mozilla';
console.log(browserType.slice(2));
// prints: zilla
```

**Python habit that breaks here:** Python slices with `s[1:4]`. That syntax does not exist in JavaScript and is a `SyntaxError`. Use `s.slice(1, 4)`. The start-included, end-excluded rule is the same.

In older code you will also see `substring()` (similar to `slice`) and `substr()` (deprecated). Recognise them; write `slice`.

### Changing case: `.toLowerCase()` and `.toUpperCase()`

`.toLowerCase()` returns the string with every letter in lowercase. `.toUpperCase()` returns it in all capitals. Neither takes an argument, but both still need their empty `()` because they are methods.

```js
const radData = 'My NaMe Is MuD';
console.log(radData.toLowerCase());
// prints: my name is mud
console.log(radData.toUpperCase());
// prints: MY NAME IS MUD
```

This is useful before comparing text a user typed. Both `'YES'` and `'yes'` become `'yes'`, so one comparison catches both.

### Swapping text: `.replace()`

`.replace(old, new)` returns a string where the substring `old` has been replaced by `new`. It takes two parameters, in that order.

```js
const browserType = 'mozilla';
console.log(browserType.replace('moz', 'van'));
// prints: vanilla
```

### String methods never change the original

`.replace()`, like every string method, does not change the string it was called on. It builds and returns a **new** string. The original stays exactly as it was:

```js
const browserType = 'mozilla';
const updated = browserType.replace('moz', 'van');
console.log(updated);
// prints: vanilla
console.log(browserType);
// prints: mozilla
```

To keep the new version under the same name, store it back into the variable. That is reassigning, so the variable must be declared with `let`, not `const`:

```js
let browserType = 'mozilla';
browserType = browserType.replace('moz', 'van');
console.log(browserType);
// prints: vanilla
```

Line 2 runs the right side first (building `'vanilla'`), then stores that new string in `browserType`.

**Common mistake:** calling the method but never saving the result. The line runs, the new string is thrown away, and nothing seems to happen:

```js
let browserType = 'mozilla';
browserType.toUpperCase();
console.log(browserType);
// prints: mozilla
```

**Common mistake:** reassigning a `const`. Once you decide to store the result back, the variable needs `let`.

```js
// ERROR EXAMPLE: TypeError
const browserType = 'mozilla';
browserType = browserType.replace('moz', 'van');
```

Node reports `TypeError: Assignment to constant variable.`

### Every match: `.replaceAll()`

`.replace()` with a string only changes the **first** match. To change every match, use `.replaceAll()`, which takes the same two parameters.

```js
const quote = 'To be or not to be';
console.log(quote.replace('be', 'code'));
// prints: To code or not to be
console.log(quote.replaceAll('be', 'code'));
// prints: To code or not to code
```

**Python habit that breaks here:** Python's `str.replace()` changes every match by default. JavaScript's `.replace()` stops after the first one, so it can look like it half-worked. Reach for `.replaceAll()` when you mean "all".

Three more you will meet in other people's code: `.trimStart()` and `.trimEnd()` remove spaces from one end only (`'  hi  '.trimStart()` is `'hi  '`), and `.repeat(n)` joins n copies (`'-'.repeat(5)` is `'-----'`).

### Arguments can be variables

A method's arguments do not have to be text typed in quotes. Any expression works: a variable, or even the result of another method call.

```js
const sentence = 'I love cats. cats are great.';
const oldWord = 'cats';
const newWord = 'dogs';
console.log(sentence.replaceAll(oldWord, newWord));
// prints: I love dogs. dogs are great.
console.log(sentence.slice(0, sentence.indexOf('.')));
// prints: I love cats
```

In line 4, `oldWord` and `newWord` are replaced by the strings they hold. In line 6, JavaScript works out the inner call first: `sentence.indexOf('.')` is `11`, so the call becomes `sentence.slice(0, 11)`, which returns everything before the first period.

---

## 5.1 Arrays: many values under one name

**Sources:** [MDN — Arrays](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays) · [Codecademy — Arrays](https://www.codecademy.com/courses/introduction-to-javascript/lessons/arrays/exercises/intro) · [Codecademy — Loops](https://www.codecademy.com/courses/introduction-to-javascript/lessons/loops/exercises/intro) · [Codecademy — Iterators](https://www.codecademy.com/courses/introduction-to-javascript/lessons/javascript-iterators/exercises/intro)
**Skills:** array_concept, why_arrays, create_array, array_element, array_in_variable, empty_array, mixed_type_arrays, array_length, dot_notation_term, array_index_term, array_bracket_access, array_modify_item, const_array_mutable, let_array_reassign, multidimensional_array, array_push, mutate_destructive, non_mutating_methods, more_array_methods_list, array_index_of, array_slice, array_unshift, array_pop, array_shift, array_splice, array_for_of, string_split, array_join, array_to_string

### What an array is, and why it exists

An **array** is one value that holds a list of other values, kept in order, under a single name. Codecademy puts it simply: "Arrays are JavaScript's way of making lists." MDN describes them as "single objects that contain multiple values stored in a list."

Why it exists: without arrays, every item needs its own variable. MDN: "If we didn't have arrays, we'd have to store every item in a separate variable." Here is what that looks like for a three-item shopping list:

```js
const groceryOne = "bread";
const groceryTwo = "milk";
const groceryThree = "eggs";
console.log(groceryOne);
// prints: bread
console.log(groceryTwo);
// prints: milk
console.log(groceryThree);
// prints: eggs
```

Three items means three names and three `console.log` lines. With 100 items it becomes 100 names, and there is no way to say "do this to every item." An array fixes both problems: one name for the whole list, and (in the last part of this section and in 7.1) a way to visit every item in turn.

### Creating an array: square brackets, commas, elements

Two new symbols:

- `[` and `]` are **square brackets**. They mark where the list starts and ends.
- `,` is a **comma**. It separates one item from the next.

MDN: "Arrays consist of square brackets and items that are separated by commas." An array written out directly in your code like this is called an **array literal**. Each item inside it is called an **element** (Codecademy: "Each content item inside an array is called an element.").

```js
console.log(["bread", "milk", "eggs"]);
// prints: [ 'bread', 'milk', 'eggs' ]
```

Notice how Node *displays* the array: a space inside each bracket, and single quotes around the strings. That is only Node's display style. Your strings are exactly what you typed; the quote style you used makes no difference.

**Saving an array to a variable.** An array is a value, so you can store it in a variable like any other value. Codecademy: "We can also save an array to a variable."

```js
const groceries = ["bread", "milk", "eggs"];
console.log(groceries);
// prints: [ 'bread', 'milk', 'eggs' ]
```

**The empty array.** `[]` with nothing inside is an **empty array**: a list with zero items. You use it when you know you will need a list but don't have the items yet. You fill it later (`.push()`, below, is how).

```js
const mutualFollowers = [];
console.log(mutualFollowers);
// prints: []
```

### Any type of value, even other arrays

An array doesn't care what kind of values it holds. MDN: "We can also mix data types in a single array." Codecademy: "Arrays can store any data types (including strings, numbers, and booleans)." That includes another array. An array inside an array is called a **nested array**.

```js
const mixed = ["tree", 795, true, [0, 1, 2]];
console.log(mixed);
// prints: [ 'tree', 795, true, [ 0, 1, 2 ] ]
```

This array has four elements: a string, a number, a boolean, and a whole array as the fourth element.

### How many items: `.length` and dot notation

A **property** is a piece of information attached to a value. Every array has a property called `length` that holds the number of items in it. Codecademy: "One of an array's built-in properties is length, and it returns the number of items in the array."

To read a property you use **dot notation**: the value (or the variable holding it), then a `.` (a period), then the property's name. Codecademy: "We use dot notation, chaining a period with the property name to the array." This is the same `.length` you used on strings. MDN: you find an array's length "in exactly the same way."

```js
const groceries = ["bread", "milk", "eggs"];
console.log(groceries.length);
// prints: 3
const nothing = [];
console.log(nothing.length);
// prints: 0
```

**Common mistake:** adding parentheses. `length` is a property (a stored piece of information), not a method (an action), so it takes no `()`.

```js
// ERROR EXAMPLE: TypeError
const groceries = ["bread", "milk", "eggs"];
console.log(groceries.length());
```

Node stops with `TypeError: groceries.length is not a function`.

### Positions: the index and bracket access

Every element has a position number called its **index**. MDN: "Items in an array are numbered, starting from zero. This number is called the item's index." So the first element is index `0`, the second is index `1`, and so on.

To read one element, write the array's name, then square brackets with the index inside. This is called **bracket notation**. MDN: "You can access individual items in the array using bracket notation and supplying the item's index."

```js
const cities = ["Manchester", "London", "Liverpool"];
console.log(cities[0]);
// prints: Manchester
console.log(cities[2]);
// prints: Liverpool
console.log(cities[3]);
// prints: undefined
```

Line by line: `cities[0]` is the first element. `cities[2]` is the third (indexes 0, 1, 2). `cities[3]` asks for a fourth element that doesn't exist. JavaScript doesn't stop with an error here. It hands back `undefined`, meaning "no value."

**Python habit that breaks here:** in Python, `cities[-1]` gives the last item, and a too-big index raises `IndexError`. In JavaScript, both just give `undefined`, silently:

```js
const cities = ["Manchester", "London", "Liverpool"];
console.log(cities[-1]);
// prints: undefined
```

Section 7.1 shows the usual way to reach the last item, `cities[cities.length - 1]`. The direct equivalent of Python's `[-1]` is `cities.at(-1)` (4.2): `.at()` counts a negative position from the end.

### Changing one item

Bracket notation also works on the left side of `=`. That replaces whatever was at that index with a new value. MDN: "You can also modify an item in an array by giving a single array item a new value."

```js
const cities = ["Manchester", "London", "Liverpool"];
cities[0] = "Leeds";
console.log(cities);
// prints: [ 'Leeds', 'London', 'Liverpool' ]
```

### `const` arrays can change inside; `let` arrays can be replaced

The example above changed an array stored with `const`, and it worked. That surprises most people.

`const` protects the **variable**, not the array's contents. The variable must keep pointing at the same array forever, but the elements inside that array can still be changed. Codecademy: "elements in an array declared with const remain mutable." (**Mutable** means "able to be changed.")

```js
const pets = ["cat", "dog"];
pets[1] = "fish";
console.log(pets);
// prints: [ 'cat', 'fish' ]
```

What `const` forbids is pointing the variable at a *different* array:

```js
// ERROR EXAMPLE: TypeError
const pets = ["cat", "dog"];
pets = ["hamster"];
```

Node stops with `TypeError: Assignment to constant variable.`

With `let`, both are allowed: you can change elements, and you can replace the whole array. Codecademy: "you can reassign elements in an array and reassign an entirely new array to a variable declared using the let keyword."

```js
let pets = ["cat", "dog"];
pets[0] = "rabbit";
console.log(pets);
// prints: [ 'rabbit', 'dog' ]
pets = ["hamster", "parrot"];
console.log(pets);
// prints: [ 'hamster', 'parrot' ]
```

### Arrays inside arrays

MDN: "an array inside an array is called a multidimensional array." To reach an element inside the inner array, you add a second set of brackets. Codecademy: "we can access the elements within the nested array by chaining, or adding on, more bracket notation with index values."

```js
const random = ["tree", 795, [0, 1, 2]];
console.log(random[2]);
// prints: [ 0, 1, 2 ]
console.log(random[2][2]);
// prints: 2
```

Read `random[2][2]` from left to right. `random[2]` is the third element, which is the inner array `[0, 1, 2]`. The second `[2]` then picks index 2 of *that* array, which is `2`.

### Adding to the end: `.push()`

A **method** is an action attached to a value. You call it with dot notation plus `()`, and the values you put inside the parentheses are its **arguments** (its inputs). Arrays come with many built-in methods.

`.push()` adds one or more items to the end of an array. MDN: "To add one or more items to the end of an array we can use push()." Codecademy: ".push() can take a single argument or multiple arguments separated by commas."

```js
const groceries = ["bread", "milk"];
groceries.push("eggs");
console.log(groceries);
// prints: [ 'bread', 'milk', 'eggs' ]
groceries.push("rice", "beans");
console.log(groceries);
// prints: [ 'bread', 'milk', 'eggs', 'rice', 'beans' ]
```

`groceries` is a `const`, and `.push()` still works. It changes the contents and never points the variable at a different array.

`.push()` also hands back a value: the array's new length.

```js
const letters = ["a"];
const newLength = letters.push("b", "c");
console.log(newLength);
// prints: 3
```

### Mutating and non-mutating methods

Some methods **mutate** the array: they change the original array itself. Codecademy: ".push() is sometimes also referred to as a destructive array method since it changes the initial array." *Destructive* and *mutating* mean the same thing here: the old version of the array is gone.

Other methods are **non-mutating**: they leave the original untouched and hand you back a new value instead. Codecademy: "there are times when we don't want to mutate the original array, and we can use non-mutating array methods." The string methods you already know (`.slice()`, `.toUpperCase()`) behave this way.

Why it matters: if you mutate an array that other code is also using, that code sees the change too. Before you call a method, know which kind it is. The table below, after `.splice()`, sorts them.

### Other array methods, at a glance

Codecademy: "Some other array methods that are available to JavaScript developers include: .join(), .slice(), .splice(), .shift(), .unshift(), and .concat()." All of these except `.concat()` are covered below. `.concat()` joins arrays (any number of them) and values into a new array and leaves the originals alone.

### Finding an item: `.indexOf()`

`.indexOf()` takes a value and tells you its index. MDN: it "will either return the item's index or -1 if the item is not in the array." It doesn't change the array.

```js
const birds = ["Parrot", "Falcon", "Owl"];
console.log(birds.indexOf("Owl"));
// prints: 2
console.log(birds.indexOf("Rabbit"));
// prints: -1
```

`-1` can never be a real index, because indexes start at 0. That makes it a safe signal for "not found." Use `indexOf` when you need the position. When you only want to know "is it there?", arrays also have `.includes()`, the same yes/no check strings have (4.2).

### Copying part of an array: `.slice()`

`.slice(start, end)` hands back a new array holding the elements from index `start` up to, but **not including**, index `end`. It works like the string `.slice()` you already know. Codecademy: ".slice() is non-mutating!"

```js
const groceryList = ["orange juice", "bananas", "coffee beans", "brown rice"];
const middle = groceryList.slice(1, 3);
console.log(middle);
// prints: [ 'bananas', 'coffee beans' ]
console.log(groceryList);
// prints: [ 'orange juice', 'bananas', 'coffee beans', 'brown rice' ]
```

Index 1 (`bananas`) and index 2 (`coffee beans`) are copied. Index 3 is where it stops, so it's left out. The original list is unchanged.

### Adding to the start, removing from either end

**`.unshift()`** adds one or more items to the start, and hands back the new length. MDN: "To add an item to the start of the array, use unshift()." It mutates.

```js
const queue = ["b", "c"];
queue.unshift("a");
console.log(queue);
// prints: [ 'a', 'b', 'c' ]
```

**`.pop()`** removes the last item. MDN: "To remove the last item from the array, use pop()." Codecademy: ".pop() does not take any arguments — it simply removes the last element." It mutates, and it hands back the item it removed, so you can keep it:

```js
const cities = ["Manchester", "London", "Liverpool"];
const removedCity = cities.pop();
console.log(removedCity);
// prints: Liverpool
console.log(cities);
// prints: [ 'Manchester', 'London' ]
```

**`.shift()`** removes the first item. MDN: "To remove the first item from an array, use shift()." It also mutates and hands back what it removed.

```js
const groceryList = ["popcorn", "bananas", "rice"];
const first = groceryList.shift();
console.log(first);
// prints: popcorn
console.log(groceryList);
// prints: [ 'bananas', 'rice' ]
```

### Removing from the middle: `.splice()`, guarded by `.indexOf()`

`.splice(start, count)` removes `count` items starting at index `start`. MDN: "the first argument says where to start removing items, and the second argument says how many items should be removed." It mutates.

You usually don't know the index by heart, so you find it first with `.indexOf()`. Then you check it isn't `-1` before removing anything. `!==` is the strict not-equal operator: `index !== -1` is true when `index` is anything other than `-1`.

```js
const cities = ["Manchester", "Liverpool", "Edinburgh", "Carlisle"];
const index = cities.indexOf("Liverpool");
if (index !== -1) {
  cities.splice(index, 1);
}
console.log(cities);
// prints: [ 'Manchester', 'Edinburgh', 'Carlisle' ]
```

Trace: `indexOf` finds `Liverpool` at index 1. `1 !== -1` is true, so the `if` block runs and `splice(1, 1)` removes one item at index 1.

**Common mistake:** skipping the guard. When the item isn't there, `indexOf` returns `-1`, and `.splice()` treats a negative start as "count from the end." The last item gets removed instead, with no error.

```js
const cities = ["Manchester", "Edinburgh"];
const index = cities.indexOf("Paris");
cities.splice(index, 1);
console.log(cities);
// prints: [ 'Manchester' ]
```

"Paris" was never in the list, but "Edinburgh" is gone.

**Which methods change the original?**

| Mutating (changes the array) | Non-mutating (original untouched) |
|---|---|
| `.push()` `.pop()` `.unshift()` `.shift()` `.splice()` | `.slice()` `.indexOf()` `.join()` `.toString()` `.concat()` |

Newer JavaScript adds non-mutating twins for some mutating methods: `.toSpliced()` does what `.splice()` does but returns a new array, and `.toSorted()` and `.toReversed()` do the same for `.sort()` and `.reverse()` (11.1). Code that must never change the original, such as React state, uses them (or `.filter()`).

### Visiting every item: `for...of`

Usually you want to do something with *every* item. MDN: "Very often you will want to access every item in the array. You can do this using the for...of statement." A **loop** is code that repeats. Section 7.1 covers loops properly; here is the shape you need now:

- `for` starts the loop.
- Inside `( )` you write `const bird of birds`. That means "take each element of `birds` in turn and call it `bird`."
- The `{ }` braces hold the **body**, the code that runs once per element.

```js
const birds = ["Parrot", "Falcon", "Owl"];
for (const bird of birds) {
  console.log(bird);
}
// prints: Parrot
// prints: Falcon
// prints: Owl
```

The body runs three times, once per element, with `bird` holding `"Parrot"`, then `"Falcon"`, then `"Owl"`.

### Between strings and arrays: `.split()`, `.join()`, `.toString()`

**`.split(separator)`** is a *string* method. It cuts a string wherever the separator appears and, as MDN puts it, "returns the substrings between the separator as items in an array." This is how you turn something like a line of comma-separated data into a list you can work with.

```js
const data = "Manchester,London,Liverpool";
const cities = data.split(",");
console.log(cities);
// prints: [ 'Manchester', 'London', 'Liverpool' ]
console.log(cities.length);
// prints: 3
```

**`.join(separator)`** goes the other way. MDN: "You can also go the opposite way using the join() method." It glues an array's elements into one string, with the separator placed between each pair. It doesn't change the array.

```js
const cities = ["Manchester", "London", "Liverpool"];
console.log(cities.join("; "));
// prints: Manchester; London; Liverpool
const secretMessage = ["L", "e", "a", "r", "n"];
console.log(secretMessage.join(""));
// prints: Learn
```

`.join("")` with an empty string as the separator puts nothing between elements. That's how Codecademy's `secretMessage.join('')` turns separate letters back into a word.

**`.toString()`** also turns an array into a string, but you don't get to pick the separator. MDN: "With join() you can specify different separators, whereas toString() always uses a comma."

```js
const dogNames = ["Rocket", "Flash", "Bella", "Slugger"];
console.log(dogNames.toString());
// prints: Rocket,Flash,Bella,Slugger
```

You will rarely call `.toString()` yourself; write `.join(', ')` when you want a list as text. It matters because JavaScript calls it for you: `${dogNames}` inside a template literal and `'Dogs: ' + dogNames` both quietly use it, which is why an array dropped into a string comes out comma-separated with no spaces.

---

## 6.1 Conditionals: if, else if, else

**Sources:** [MDN — Making decisions in your code: conditionals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals) · [Codecademy — Conditional Statements](https://www.codecademy.com/courses/introduction-to-javascript/lessons/control-flow/exercises/intro) · [Codecademy — Control Flow cheatsheet](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-control-flow/cheatsheet)
**Skills:** control_flow_concept, conditional_statements_purpose, if_else_syntax, code_block_runs_if_true, binary_decision, condition_returns_boolean, else_optional, if_without_braces, braces_indentation_readability, else_if_chain, first_true_branch_wins, else_last_resort, comparison_operators_in_conditions, truthy_falsy, variable_as_condition, nested_if_else, logical_operators_concept, logical_and

### Control flow: the order lines run in

**Control flow** is the order in which your program's statements run. Codecademy: "Control flow is the order in which statements are executed in a program." So far that order has been plain: top to bottom, every line, once.

Real programs need to skip some lines and run others depending on the situation. A conditional is the first tool that changes control flow.

### Conditional statements: code that decides

A **conditional statement** checks something and runs different code depending on the answer. MDN: "Conditional statements allow us to represent such decision making in JavaScript." Codecademy: "A conditional statement checks a specific condition(s) and performs a task based on the condition(s)."

Without one, a program does the same thing every time, whatever the data says.

### `if...else`: two paths, one taken

New syntax, named before it's used:

- `if` is the keyword that starts a conditional.
- `( )` **parentheses** right after `if` hold the **condition**, the question being asked.
- `{ }` **curly braces** wrap a **code block** (also called a **block statement**): a group of lines that run together. Codecademy: "The if keyword followed by a set of parentheses () which is followed by a code block, or block statement."
- `else` is followed by a second block, the one that runs when the condition is false.

MDN sums up the meaning: "if the condition returns true, run code A, else run code B."

```js
const hour = 9;
if (hour < 12) {
  console.log("Good morning");
} else {
  console.log("Good afternoon");
}
// prints: Good morning
```

Trace: `hour < 12` is `9 < 12`, which is `true`. So the first block runs and prints `Good morning`. The `else` block is skipped completely. Codecademy: "If the condition evaluates to true, the code inside the curly braces {} runs, or executes."

Change one value and the other path runs:

```js
const hour = 15;
if (hour < 12) {
  console.log("Good morning");
} else {
  console.log("Good afternoon");
}
// prints: Good afternoon
```

Exactly one of the two blocks runs, never both and never neither. That's why Codecademy says `if...else` handles "yes-or-no questions, also known as binary decisions." **Binary** means two options. An `else` can't stand alone either: "An else statement must be paired with an if statement."

**What goes in the parentheses.** The condition is usually a comparison that produces `true` or `false`. Any value works there, though (truthy and falsy, below). MDN: "The condition makes use of the comparison operators we discussed earlier in the module and returns true or false."

### `else` is optional

You can write an `if` with no `else`. Then the block runs when the condition is true, and nothing extra happens when it's false. Any code *after* the closing `}` isn't part of the conditional, so it always runs. MDN: "the second block of code is not controlled by the conditional statement, so it always runs."

```js
const temperature = 30;
if (temperature > 25) {
  console.log("Wear sunscreen");
}
console.log("Have a nice day");
// prints: Wear sunscreen
// prints: Have a nice day
```

```js
const temperature = 10;
if (temperature > 25) {
  console.log("Wear sunscreen");
}
console.log("Have a nice day");
// prints: Have a nice day
```

In the second version `10 > 25` is false, so the block is skipped. The last line still runs because it sits outside the braces.

### Braces and indentation

MDN: "while not recommended, you may sometimes see if...else statements written without the curly braces." Without braces, only the **single next statement** belongs to the `if` or `else`:

```js
const raining = true;
if (raining) console.log("Take an umbrella");
else console.log("Leave the umbrella");
// prints: Take an umbrella
```

That's valid, and you'll see it in other people's code. Don't write it yourself. (Some style guides allow a one-line `if (x) return;` with no `else`; the safe default is braces.) MDN: "it is much easier to understand the code if you use the curly braces to delimit the blocks of code, and use multiple lines and indentation." (To **delimit** is to mark where something starts and ends.)

**Common mistake:** adding a second line to a brace-less `if`. Only the first line is controlled. The second line runs every time, however it is indented:

```js
const raining = false;
if (raining)
  console.log("Take an umbrella");
  console.log("Wear boots");
// prints: Wear boots
```

`raining` is false, so `Take an umbrella` is skipped. `Wear boots` prints anyway, because JavaScript ignores indentation. Only braces group lines.

**Python habit that breaks here:** in Python, indentation *is* the block. In JavaScript, indentation is only for human readers, and the braces are the block. That's why you should always write the braces.

### `else if`: more than two paths

When there are more than two possible outcomes, put `else if` blocks between the `if` and the `else`. MDN: "There is a way to chain on extra choices/outcomes to your if...else — using else if." Codecademy: "The else if statement allows for more than two possible outcomes."

`>=` is "greater than or equal to."

```js
const score = 82;
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}
// prints: B
```

Trace: `82 >= 90` is false, so JavaScript moves to the next test. `82 >= 80` is true, so `B` prints and the whole chain is finished. `82 >= 70` is also true, but it's never checked. Codecademy: "the first condition that evaluates to true from the top to bottom is the block that gets executed."

The final `else` is the last resort. MDN: "the code inside it will be run if none of the conditions are true." It's optional. Leave it off and, when nothing matches, nothing in the chain runs.

**Common mistake:** putting the conditions in the wrong order. Because the first true test wins, a broad test placed early hides the narrower ones below it.

```js
const score = 95;
if (score >= 70) {
  console.log("C");
} else if (score >= 90) {
  console.log("A");
}
// prints: C
```

`95 >= 70` is true, so `C` prints and the `A` test is never reached. Put the narrowest test first.

**Python habit that breaks here:** `elif` doesn't exist. Write `else if`, as two words.

### Comparison operators build the test

MDN: "Comparison operators are used to test the conditions inside our conditional statements." All of these produce `true` or `false`:

| Operator | Meaning |
|---|---|
| `===` | strictly equal (same value and same type) |
| `!==` | strictly not equal |
| `<` / `>` | less than / greater than |
| `<=` / `>=` | less than or equal / greater than or equal |

```js
const role = "admin";
if (role === "admin") {
  console.log("Show the settings page");
}
if (role !== "guest") {
  console.log("Show the logout button");
}
// prints: Show the settings page
// prints: Show the logout button
```

**Common mistake:** one `=` where you meant `===`. A single `=` *assigns* a value. It doesn't compare. Inside a condition it quietly changes your variable, and the `if` runs whenever the assigned value is truthy (the next part explains why; `if (role = "")` would not run). The project's ESLint flags it as you type (`no-cond-assign`):

```js
let role = "guest";
if (role = "admin") {
  console.log("Welcome, admin");
}
console.log(role);
// prints: Welcome, admin
// prints: admin
```

### Truthy and falsy

A condition doesn't have to be an actual `true` or `false`. JavaScript accepts any value there and decides whether it counts as true or false. A value that counts as true in a condition is **truthy**. A value that counts as false is **falsy**.

The falsy list is short. Learn it, and treat everything else as truthy. MDN: "Any value that is not false, undefined, null, 0, NaN, or an empty string ('') actually returns true when tested as a conditional statement."

The falsy values you will meet are `false`, `undefined`, `null`, `0`, `NaN` (the "not a number" value you get from something like `Number("abc")`), and `""` (the empty string). MDN's complete list also has `-0` and `0n` (the BigInt zero), plus `document.all` in browsers; the falsy list is a common interview question.

```js
if (0) {
  console.log("0 is truthy");
} else {
  console.log("0 is falsy");
}
if ("") {
  console.log("empty string is truthy");
} else {
  console.log("empty string is falsy");
}
if ("hello") {
  console.log("hello is truthy");
}
// prints: 0 is falsy
// prints: empty string is falsy
// prints: hello is truthy
```

This explains the `=` mistake above. `role = "admin"` produces the string `"admin"`, and a non-empty string is truthy.

### A variable on its own as the condition

Because of truthy and falsy, you can put just a variable name in the parentheses. MDN: "you can use a variable name on its own to test whether it is true, or even that it exists (that is, it is not undefined.)" Codecademy: "you'll only check to see if the variable has been assigned a value." Two limits on those sentences: a name that was never declared at all does not test false, it throws a `ReferenceError`; and a variable that holds a falsy value, like `let n = 0`, has been assigned a value but still tests false.

```js
const cheese = "Cheddar";
if (cheese) {
  console.log("Yay! Cheese available for making cheese on toast.");
} else {
  console.log("No cheese on toast for you today.");
}
// prints: Yay! Cheese available for making cheese on toast.
```

```js
let username;
if (username) {
  console.log("Logged in");
} else {
  console.log("Please log in");
}
// prints: Please log in
```

`let username;` declares the variable without giving it a value, so it holds `undefined`, which is falsy.

**Python habit that breaks here:** in Python an empty list is falsy. In JavaScript an empty array `[]` is **truthy**, because it isn't on the falsy list. To ask "is this array empty?", test its length:

```js
const cart = [];
if (cart) {
  console.log("cart is truthy, even though it is empty");
}
if (cart.length === 0) {
  console.log("cart is empty");
}
// prints: cart is truthy, even though it is empty
// prints: cart is empty
```

### Nesting: an `if` inside an `if`

MDN: "It is perfectly OK to put one if...else statement inside another one — to nest them." The inner one only gets checked when the outer block runs, and each works on its own.

```js
const choice = "sunny";
const temperature = 90;
if (choice === "sunny") {
  if (temperature < 86) {
    console.log("Nice and sunny. Go to the beach.");
  } else {
    console.log("Really hot. Stay in the shade.");
  }
}
// prints: Really hot. Stay in the shade.
```

Trace: the outer test `choice === "sunny"` is true, so its block runs. Inside it, `90 < 86` is false, so the inner `else` runs. If `choice` were `"rainy"`, the inner `if...else` would never be looked at.

### Logical operators, starting with `&&` (AND)

**Logical operators** combine or flip true/false values. Codecademy: "In JavaScript, there are operators that work with boolean values known as logical operators." They let one condition ask several questions at once, often replacing a nested `if`.

The first is `&&`, read "and." The whole test is true only when **both** sides are true. MDN: it "allows you to chain together two or more expressions so that all of them have to individually evaluate to true." Codecademy: "both conditions must evaluate to true for the entire condition to evaluate to true and execute."

```text
true  && true   ->  true
true  && false  ->  false
false && true   ->  false
false && false  ->  false
```

Here is the nested weather example written with `&&`:

```js
const choice = "sunny";
const temperature = 75;
if (choice === "sunny" && temperature < 86) {
  console.log("Nice and sunny. Go to the beach.");
} else {
  console.log("Not beach weather.");
}
// prints: Nice and sunny. Go to the beach.
```

Both `choice === "sunny"` and `75 < 86` are true, so the whole condition is true. Make either one false and the `else` runs.

**Python habit that breaks here:** the word `and` doesn't work. Write `&&`.

---

## 6.2 Logic, switch and the ternary

**Sources:** [MDN — Making decisions in your code: conditionals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals) · [Codecademy — Conditional Statements](https://www.codecademy.com/courses/introduction-to-javascript/lessons/control-flow/exercises/intro)
**Skills:** logical_or, or_short_circuit_check, short_circuit_assignment, short_circuit_term, logical_not, combining_logical_operators, or_common_mistake, switch_when_to_use, switch_syntax, switch_break, switch_fallthrough, switch_default, ternary_operator, ternary_runs_code, refactor_term, function_parameters_preview

### `||` (OR): at least one side true

`||` is two vertical bars, read "or." The whole test is true if **at least one** side is true. MDN: it "allows you to chain together two or more expressions so that one or more of them have to individually evaluate to true." Codecademy: "only one of the conditions must evaluate to true for the overall statement to evaluate to true."

```text
true  || true   ->  true
true  || false  ->  true
false || true   ->  true
false || false  ->  false
```

```js
const iceCreamVanOutside = false;
const houseStatus = "on fire";
if (iceCreamVanOutside || houseStatus === "on fire") {
  console.log("You should leave the house quickly.");
} else {
  console.log("Probably should just stay in then.");
}
// prints: You should leave the house quickly.
```

The left side is false, but the right side is true, and one true side is enough.

**Python habit that breaks here:** the word `or` doesn't work. Write `||`.

### Short-circuit evaluation

`||` reads left to right and stops as soon as it knows the answer. If the left side is truthy, the whole thing is already true, so the right side is never looked at. Codecademy: "If the first condition in an || statement evaluates to true, the second condition won't even be checked." This is called **short-circuit evaluation** (Codecademy: "This concept is also referred to as short-circuit evaluation").

You can watch it happen by putting a `console.log` on the right side:

```js
const isLoggedIn = true;
isLoggedIn || console.log("checking the right side");
console.log("done");
// prints: done
```

```js
const isLoggedIn = false;
isLoggedIn || console.log("checking the right side");
console.log("done");
// prints: checking the right side
// prints: done
```

In the first version the left side is true, so the right side never runs. In the second it's false, so JavaScript has to check the right side, and that runs the `console.log`. (`&&` short-circuits the opposite way: when its left side is falsy, it stops there.)

These two blocks are demos, to make the short-circuit visible. As a line on its own, `isLoggedIn || console.log(...)` is what the opt-in ESLint rule `no-unused-expressions` reports (Airbnb's config turns it on). In real code, write `if (!isLoggedIn) { ... }`.

**Using it to give a default value.** `||` doesn't just produce `true` or `false`. It hands back the actual value where it stopped. If the left value is truthy you get that value; otherwise you get the right one. Codecademy: "JavaScript assigns the truthy value to a variable if you use the || operator in your assignment." That makes `||` a quick way to supply a fallback:

```js
let username = "";
let defaultName = username || "Stranger";
console.log(defaultName);
// prints: Stranger
username = "Jasmine";
defaultName = username || "Stranger";
console.log(defaultName);
// prints: Jasmine
```

**Common mistake:** relying on this when a real value can be falsy. `0` is falsy, so a genuine zero gets replaced by the fallback:

```js
const itemsInCart = 0;
const shown = itemsInCart || 10;
console.log(shown);
// prints: 10
```

The cart really has 0 items, but the fallback 10 wins. Use the `||` default only when no valid value is ever falsy.

Modern JavaScript has a second operator for exactly this: `??`, the **nullish coalescing** operator. It falls back only when the left side is missing (`null` or `undefined`), so `itemsInCart ?? 10` keeps the 0. Professional code uses `??` for "missing → default" (settings, API fields, counts) and `||` when an empty string or 0 should also be replaced (a typed name). Gap lesson 2.13 teaches `??` properly.

### `!` (NOT): flip it

`!`, an exclamation mark placed in front of a value, flips it: truthy becomes `false` and falsy becomes `true`. MDN: it "can be used to negate an expression." Codecademy: "The ! not operator reverses, or negates, the value of a boolean."

```js
const excited = true;
console.log(!excited);
// prints: false
const errorMessage = "";
if (!errorMessage) {
  console.log("No errors.");
}
// prints: No errors.
```

`errorMessage` is the empty string, which is falsy, so `!errorMessage` is `true` and the block runs. You will also read `!!value` in other people's code: two flips turn any value into its plain boolean (`!!'hi'` is `true`). `Boolean(value)` says the same thing more explicitly.

**Python habit that breaks here:** the word `not` doesn't work. Write `!`.

### Combining `&&`, `||` and `!`

MDN: "You can combine as many logical statements together as you want, in whatever structure." Use parentheses to group parts, just as in arithmetic. Parentheses decide what GROUPS with what, and the grouping is clear to anyone reading. JavaScript still reads left to right, though, and `&&` / `||` may skip a grouped part completely: in `hasKeys && (...)`, the `( )` part never runs when `hasKeys` is false.

```js
const iceCreamVanOutside = false;
const houseStatus = "on fire";
const hasKeys = true;
if ((iceCreamVanOutside || houseStatus === "on fire") && hasKeys) {
  console.log("Grab your keys and go.");
}
if (!(iceCreamVanOutside || houseStatus === "on fire")) {
  console.log("Stay in.");
}
// prints: Grab your keys and go.
```

First `if`: the parentheses give `false || true`, which is `true`, then `true && hasKeys` is `true`. Second `if`: the same parentheses give `true`, and `!` flips it to `false`, so nothing prints.

### Common mistake: an incomplete test after `||`

This looks like it asks "is x 5, 7, 10, or 20?":

```js
const x = 4;
if (x === 5 || 7 || 10 || 20) {
  console.log("Matched!");
}
// prints: Matched!
```

It prints `Matched!` even though `x` is 4. JavaScript reads it as `(x === 5) || 7 || ...`. `x === 5` is false, so it moves on to `7`, and `7` on its own is a truthy number. The test is always true. Node shows no error, but the project's ESLint flags this line as you type (`no-constant-condition`). MDN: "you've got to specify a complete test on either side of each OR operator":

```js
const x = 4;
if (x === 5 || x === 7 || x === 10 || x === 20) {
  console.log("Matched!");
} else {
  console.log("No match.");
}
// prints: No match.
```

For a long list of options, `[5, 7, 10, 20].includes(x)` reads better: it asks "is `x` one of these?" in one call.

### `switch`: one value, many exact choices

When you compare one value against a long list of exact options, an `else if` chain gets repetitive. A `switch` statement is built for that. MDN: switches "take a single expression/value as an input, and then look through several choices until they find one that matches that value." They suit cases where each choice just sets a value or prints something.

**The syntax.** The new pieces are:

- `switch` followed by `( )`: the value being tested goes in the parentheses. Codecademy: "The switch keyword initiates the statement and is followed by ( ... ), which contains the value that each case will compare."
- `{ }` wraps all the choices.
- `case` followed by a possible value and a `:` (colon). MDN: "The keyword case, followed by a choice that the expression/value could be, followed by a colon." The code under it runs when the value matches. Codecademy: "The case keyword checks if the expression matches the specified value that comes after it." The match uses strict equality, the same as `===`.
- `break;` ends a case (explained just below).
- `default:` is the fallback (explained after `break`).

```text
switch (value) {
  case choiceOne:
    // runs if value === choiceOne
    break;
  case choiceTwo:
    // runs if value === choiceTwo
    break;
  default:
    // runs if nothing matched
}
```

**`break` ends the case.** `break` means "leave the switch now." Codecademy: "The break keyword tells the computer to exit the block and not execute any more code or check any other cases." MDN: when the choice matches, execution stops at the `break` and "moves on to any code that appears below the switch statement."

```js
const groceryItem = "papaya";
switch (groceryItem) {
  case "tomato":
    console.log("Tomatoes are $0.49");
    break;
  case "papaya":
    console.log("Papayas are $1.29");
    break;
  case "lime":
    console.log("Limes are $1.49");
    break;
}
console.log("Thanks for shopping");
// prints: Papayas are $1.29
// prints: Thanks for shopping
```

Trace: `"papaya" === "tomato"` is false, so that case is skipped. `"papaya" === "papaya"` is true, so it prints the price and hits `break`, which jumps to the line after the closing `}`.

**Common mistake: forgetting `break` (fall-through).** Without `break`, the matching case runs, and so does every case below it, whether it matches or not. Codecademy: "Without break keywords, the first matching case will run, but so will every subsequent case." This is called **fall-through**.

```js
const level = 1;
switch (level) {
  case 1:
    console.log("one");
  case 2:
    console.log("two");
  case 3:
    console.log("three");
}
// prints: one
// prints: two
// prints: three
```

Only `case 1` matched, but with no `break` the code falls straight through cases 2 and 3. Node shows no error, but the project's ESLint flags each fall-through as you type (`no-fallthrough`). When a fall-through is on purpose, professionals mark it with a `// falls through` comment, which also silences the rule.

**`default` for no match.** `default:` marks code that runs when no case matched. MDN: "This is the default option that runs if none of the choices match." It's optional. By convention it goes last (Google's style guide; ESLint `default-case-last`), and then nothing comes after it, so it doesn't need a `break`. JavaScript itself allows it anywhere, and a `default` that is not last falls through like any case unless it ends with `break`.

```js
const groceryItem = "kiwi";
switch (groceryItem) {
  case "tomato":
    console.log("Tomatoes are $0.49");
    break;
  case "papaya":
    console.log("Papayas are $1.29");
    break;
  default:
    console.log("Invalid item");
}
// prints: Invalid item
```

**Common mistake:** a type mismatch. Because `case` compares with strict equality, the string `"1"` never matches the number `1`:

```js
const choice = "1";
switch (choice) {
  case 1:
    console.log("matched the number 1");
    break;
  default:
    console.log("no match");
}
// prints: no match
```

**Rule of thumb:** use `switch` for one value checked against exact options. Use `if...else if` for ranges, such as `score >= 90`.

### The ternary operator: a one-line two-way choice

The **ternary operator** is a compact `if...else` that produces a value. MDN: it "tests a condition and returns one value/expression if it is true, and another if it is false." Its shape is `condition ? valueIfTrue : valueIfFalse`, with two new symbols:

- `?` (a question mark) comes after the condition.
- `:` (a colon) separates the two possible results. Codecademy: "Two expressions follow the ? and are separated by a colon :."

```js
const isBirthday = true;
const greeting = isBirthday ? "Happy birthday, Mrs. Smith!" : "Good morning, Mrs. Smith.";
console.log(greeting);
// prints: Happy birthday, Mrs. Smith!
```

`isBirthday` is true, so the value before the `:` is chosen and stored in `greeting`. If it were false, the value after the `:` would be.

**Running code, not just choosing values.** MDN: "The ternary operator is not just for setting variable values; you can also run functions, or lines of code — anything you like."

```js
const isNightTime = false;
isNightTime ? console.log("Turn on the lights!") : console.log("Turn off the lights!");
// prints: Turn off the lights!
```

This form is something to recognise, not to write. A ternary used only to run code is what the opt-in ESLint rule `no-unused-expressions` reports (its `allowTernary` option is off by default, and Airbnb's config turns the rule on). When each side *does* something, write `if...else`; use a ternary to choose a *value*, as in `console.log(isNightTime ? "Turn on the lights!" : "Turn off the lights!");`.

Keep ternaries for simple two-way choices. When either side needs more than one line, use `if...else`. Do not nest one ternary inside another; a chain of them is an `if...else if` in disguise and is hard to read.

**Python habit that breaks here:** Python writes `a if cond else b`. JavaScript puts the condition first: `cond ? a : b`.

### Refactoring

To **refactor** is to rewrite code so it reads better without changing what it does. Codecademy's exercise: "Refactor, or edit, the first if...else block to use a ternary operator." These two blocks print the same thing:

```js
const isLocked = false;
if (isLocked) {
  console.log("You will need a key to open the door.");
} else {
  console.log("You will not need a key to open the door.");
}
console.log(isLocked ? "You will need a key to open the door." : "You will not need a key to open the door.");
// prints: You will not need a key to open the door.
// prints: You will not need a key to open the door.
```

The refactored line uses the ternary to choose a *value* (the message) and calls `console.log` once, which is the form professionals write. Codecademy's exercise puts a `console.log` on each side instead; as explained above, that form is one to recognise, not write.

### Preview: a function that takes parameters

MDN's ternary example is written for a web page, and it calls a function named `update`:

```text
select.value === "black" ? update("black", "white") : update("white", "black");
```

`update` is a function, a named, reusable block of code. MDN describes it as one "which takes two colors as parameters (inputs)." **Parameters** are the names a function's definition gives to its inputs; the values you supply inside the parentheses when you call it are **arguments** (the same split as for methods in 4.2). Here the ternary chooses which pair of colors to send. You'll write functions like this yourself in a later section; for now, just recognize the shape `name(input1, input2)`. (The `select.value` part reads a dropdown on a web page. That's a browser feature this material doesn't use.)

---

## 7.1 Loops

**Sources:** [MDN — Looping code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops) · [MDN — Arrays](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays) · [Codecademy — Loops](https://www.codecademy.com/courses/introduction-to-javascript/lessons/loops/exercises/intro)
**Skills:** loops_purpose, iteration_term, loop_vs_repetition, collections_concept, for_of_loop, for_of_steps, for_loop_syntax, iterator_variable, for_initializer_counter, for_condition, for_final_expression, for_counter_uses_let, for_loop_array_index, array_last_item, i_naming_convention, for_index_bugs, for_when_index_needed, nested_loops, break_loop, continue_loop, math_sqrt, while_loop, while_when_to_use, do_while_loop, infinite_loop, countdown_decrement, negative_slice, choosing_loop_type

### Why loops exist

A **loop** runs the same block of code over and over, often with a slightly different value each time. MDN: "Loops are all about doing the same thing over and over again." One full run through the loop's body is called an **iteration**. (Codecademy: "iterate simply means 'to repeat'.")

What breaks without loops: the amount of code grows with the amount of work. Printing five greetings by hand takes five lines, and printing five thousand takes five thousand. A loop stays the same size whatever the count. MDN: "The amount of code needed would be the same whether we were drawing 100 circles, 1000, or 10,000."

### Collections

A **collection** is a value that holds a group of other values. MDN: "One type of collection is the Array, which we met in the Arrays chapter of this course." JavaScript also has collections called `Set` and `Map`, which come later (12.3). Most of the time, a loop is how you work through a collection.

### `for...of`: one round per item

MDN: "The basic tool for looping through a collection is the for...of loop." You met its shape in 5.1:

- `for` starts the loop.
- `(const cat of cats)` means "take each item of `cats` in turn and call it `cat`." The word `of` connects the item's name to the collection.
- `{ }` holds the body that runs once per item.

```js
const cats = ["Leopard", "Serval", "Jaguar"];
for (const cat of cats) {
  console.log(cat);
}
// prints: Leopard
// prints: Serval
// prints: Jaguar
```

What happens, step by step:

1. Take the first item (`"Leopard"`) and put it in `cat`.
2. Run the body with that value.
3. Get the next item and repeat step 2. MDN: "Get the next item, and repeat (2) until you've reached the end of the collection."

Using `const` for `cat` is fine because each iteration creates a fresh `cat`. Nothing is ever reassigned.

**Python habit that breaks here:** Python's `for x in list` becomes `for (const x of list)` in JavaScript, with `of` and not `in`. JavaScript also has a `for...in` loop, but on an array it gives you the index numbers as strings, not the items. It's a different tool for a later section.

### The classic `for` loop: a counter with three parts

Sometimes you want to run code a set number of times, or you need to know the position of each item. For that there's the `for` loop. Its parentheses hold three parts separated by `;` semicolons. MDN: "Inside the parentheses we have three items, separated by semicolons." Codecademy: "A for loop contains three expressions separated by ; inside the parentheses."

```text
for (initializer; condition; final-expression) {
  // code to run
}
```

All three parts usually involve one variable, the **iterator variable** (or counter). Codecademy: "The typical for loop includes an iterator variable that usually appears in all three expressions." The initializer sets it up once; after that it is checked and updated on every round.

1. **Initializer**: runs once, before anything else. MDN: "this is usually a variable set to a number, which is incremented to count the number of times the loop has run." Codecademy: it "starts the loop and can also be used to declare the iterator variable."
2. **Condition**: checked before every round. If it's true the body runs; if it's false the loop ends. MDN: "this defines when the loop should stop looping." Codecademy calls it the "stopping condition."
3. **Final-expression**: runs after every round, and usually adds 1 to the counter with `++`. MDN: it "is always evaluated (or run) each time the loop has gone through a full iteration."

```js
for (let i = 1; i < 4; i++) {
  console.log(i);
}
// prints: 1
// prints: 2
// prints: 3
```

Trace: `let i = 1` runs once. `1 < 4` is true, so the body prints 1, then `i++` makes `i` 2. `2 < 4` is true, so it prints 2, and `i` becomes 3. `3 < 4` is true, so it prints 3, and `i` becomes 4. `4 < 4` is false, so the loop ends. The body ran 3 times.

**The counter must be `let`.** MDN: "we have to use let for the counter, because we're incrementing it with i++ (which is a reassignment) each time we go round."

**Common mistake:** using `const` for the counter. The first round runs, then `i++` tries to reassign a constant:

```js
// ERROR EXAMPLE: TypeError
for (const i = 0; i < 3; i++) {
  console.log(i);
}
```

It prints `0`, then Node stops with `TypeError: Assignment to constant variable.`

**Python habit that breaks here:** `for i in range(3):` becomes `for (let i = 0; i < 3; i++)`. Both stop *before* 3.

### Looping through an array by index

To visit every element by position, start the counter at `0` (the first index) and stop before `.length`. Codecademy: "To loop through each element in an array, a for loop should use the array's .length property in its condition." MDN: "we're starting i at 0, and stopping when i reaches the length of the array." Inside the body, `cats[i]` is the current element.

```js
const cats = ["Pete", "Biggles", "Jasmine"];
for (let i = 0; i < cats.length; i++) {
  console.log(`${i}: ${cats[i]}`);
}
// prints: 0: Pete
// prints: 1: Biggles
// prints: 2: Jasmine
```

`cats.length` is 3, so `i` takes the values 0, 1, 2, which are exactly the valid indexes.

**Why `i`?** It's the conventional name for a counter that walks through indexes. Codecademy: "we can think of it as being short-hand for the word index." Any name works, but other programmers expect `i`.

**The last item.** The last index is always one less than the length, because counting starts at 0. Codecademy: "the index of the last element of an array is equivalent to the length of that array minus 1." This is the usual way to do what Python's `[-1]` does (`cities.at(-1)`, from 4.2, is the direct equivalent):

```js
const cities = ["Manchester", "London", "Liverpool"];
console.log(cities[cities.length - 1]);
// prints: Liverpool
```

### Off-by-one bugs

An **off-by-one bug** is a loop that runs one time too many or one time too few. The usual cause is `<=` where `<` belongs:

```js
const colors = ["red", "green", "blue"];
for (let i = 0; i <= colors.length; i++) {
  console.log(colors[i]);
}
// prints: red
// prints: green
// prints: blue
// prints: undefined
```

`<=` lets `i` reach 3, and `colors[3]` doesn't exist. There's no error, just an `undefined`. Starting at 1 instead of 0 is the other common slip: it silently skips the first item. MDN's advice: "For reasons like this, it's usually best to use for...of if you can." A `for...of` loop has no counter, so there's nothing to get wrong.

### When you do need the index

Use the counting `for` loop when the position matters, for example to treat the last item differently. MDN: "to do this we need to know when we are on the final loop iteration, and to do that we can use a for loop." This builds a sentence and puts "and" before the last name (`+=` adds onto the end of the existing string):

```js
const cats = ["Pete", "Biggles", "Jasmine"];
let myFavoriteCats = "My cats are called ";
for (let i = 0; i < cats.length; i++) {
  if (i === cats.length - 1) {
    myFavoriteCats += `and ${cats[i]}.`;
  } else {
    myFavoriteCats += `${cats[i]}, `;
  }
}
console.log(myFavoriteCats);
// prints: My cats are called Pete, Biggles, and Jasmine.
```

Trace: when `i` is 0 or 1, it isn't the last index (2), so the `else` adds `"Pete, "` and then `"Biggles, "`. When `i` is 2, the `if` is true and it adds `"and Jasmine."`. A plain `for...of` doesn't give you the position. When you need both the item and its position, `for (const [i, cat] of cats.entries())` does (the `[i, cat]` part is array destructuring, 12.3); the counting `for` is the classic way. (In real code this exact sentence would come from `new Intl.ListFormat('en').format(cats)`, which prints `Pete, Biggles, and Jasmine`; the loop is the exercise.)

### Nested loops

A **nested loop** is a loop inside another loop's body. Codecademy: "For each round of the outer for loop, the inner for loop will run completely."

```js
for (let row = 1; row <= 2; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log(`${row}-${col}`);
  }
}
// prints: 1-1
// prints: 1-2
// prints: 1-3
// prints: 2-1
// prints: 2-2
// prints: 2-3
```

The outer loop runs 2 times, and on each of those the inner loop runs all 3 of its rounds, so the inner body runs 6 times in total. A common real use is comparing every item of one array with every item of another:

```js
const myArray = [6, 19, 20];
const yourArray = [19, 81, 2];
for (let i = 0; i < myArray.length; i++) {
  for (let j = 0; j < yourArray.length; j++) {
    if (myArray[i] === yourArray[j]) {
      console.log(`Both arrays have the number: ${yourArray[j]}`);
    }
  }
}
// prints: Both arrays have the number: 19
```

The inner loop needs its own counter name (`j`) so the body can use both positions, `myArray[i]` and `yourArray[j]`. A second `let i` would hide the outer one inside the inner loop.

### `break`: leave the loop early

`break` (the same keyword that ends a `switch` case) exits the innermost loop (or `switch`) it is in, at once; an outer loop keeps going. MDN: it "will immediately exit the loop and make the browser move on to any code that follows it." Codecademy: "The break keyword allows programs to 'break' out of the loop from within the loop's block." You use it when you've found what you were looking for and the remaining rounds would be wasted.

MDN's example searches a contact list typed into a web page. Here is the same idea with `console.log`:

```js
const contacts = ["Chris:2232322", "Sarah:3453456", "Bill:7654322", "Mary:9998769"];
const searchName = "Bill";
for (const contact of contacts) {
  const splitContact = contact.split(":");
  if (splitContact[0] === searchName) {
    console.log(`${splitContact[0]}'s number is ${splitContact[1]}.`);
    break;
  }
  console.log(`Checked ${splitContact[0]}`);
}
// prints: Checked Chris
// prints: Checked Sarah
// prints: Bill's number is 7654322.
```

Trace: each contact is split at `:` into a name and a number. Chris and Sarah don't match, so their rounds reach the `Checked` line. Bill matches, so his number prints and `break` ends the loop. Mary is never checked.

### `continue`: skip to the next round

`continue` ends only the *current* round and jumps to the next one. MDN: it "works similarly to break, but instead of breaking out of the loop entirely, it skips to the next iteration of the loop." In a `for` loop the final-expression (`i++`) still runs before the next round. In a `while` loop it does not: `continue` skips the `i++` too, if it sits below the `continue`, so put the update first.

MDN's example prints the perfect squares (numbers whose square root is a whole number). It uses `Math.sqrt()`, a built-in method that gives the square root of a number (`Math.sqrt(9)` is 3). `Math.floor()` rounds down, so if rounding down changes the root, the root wasn't whole. (`Number.isInteger(sqRoot)`, from 3.1, asks the same question more directly.)

```js
const num = 20;
for (let i = 1; i <= num; i++) {
  const sqRoot = Math.sqrt(i);
  if (Math.floor(sqRoot) !== sqRoot) {
    continue;
  }
  console.log(i);
}
// prints: 1
// prints: 4
// prints: 9
// prints: 16
```

Trace for `i = 2`: the root is about 1.414, which rounds down to 1, and they differ, so `continue` skips the `console.log`. For `i = 4`: the root is 2 and rounds down to 2, they're equal, so `continue` is skipped and 4 prints.

### `while`: repeat while a condition holds

`while` runs its body again and again as long as its condition is true. Codecademy: "While the condition evaluates to true, the block will continue to run." It has the same three parts as a `for` loop, just in different places. MDN: "the initializer variable is set before the loop, and the final-expression is included inside the loop after the code to run."

```js
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
// prints: 0
// prints: 1
// prints: 2
```

Trace: `i` starts at 0 (initializer, before the loop). `0 < 3` is true, so it prints 0 and `i++` makes it 1. The same happens for 1 and 2. When `i` is 3, `3 < 3` is false and the loop ends.

**When to choose `while`.** Codecademy: it is "ideal when we don't know in advance how many times the loop should run." For example, how many times must 1 be doubled to pass 100? You don't know the count ahead of time, only when to stop:

```js
let amount = 1;
let doublings = 0;
while (amount < 100) {
  amount = amount * 2;
  doublings++;
}
console.log(amount);
// prints: 128
console.log(doublings);
// prints: 7
```

### `do...while`: always runs at least once

`do` starts a loop whose body comes *first*, with the `while (condition);` check after it. Because the check happens after the body, the body always runs at least once. MDN: "the code inside a do...while loop is always executed at least once." Codecademy: "Unlike the while loop, do...while will run at least once, whether or not the condition evaluates to true." Note the `;` after the closing `)`.

```js
let i = 10;
do {
  console.log(`i is ${i}`);
  i++;
} while (i < 3);
// prints: i is 10
```

`10 < 3` was false from the start, but the body had already run once before the check.

**Python habit that breaks here:** Python has no `do...while`.

### Infinite loops

If the condition never becomes false, the loop never ends. This is an **infinite loop**. Codecademy: it "occurs when the loop's stopping condition is never met, causing the loop to continue iterating." MDN: "the loop will go on forever, and either the browser will force it to stop, or it will crash." The usual cause is forgetting to update the counter:

```text
let i = 0;
while (i < 3) {
  console.log(i);    // prints 0 forever: nothing ever changes i
}
```

If this happens in your terminal, press **Ctrl+C** to stop Node. The fix is always the same: make sure something inside the loop moves the condition toward false, or reaches a `break`.

### Counting down

To count down, start the counter at the highest value, use `>=` in the condition, and use `i--` (subtract 1) as the final-expression. Codecademy: "Set the iterator variable to the highest desired value in the initialization expression." MDN: "we are counting down after each iteration, not up, so you don't want i++."

```js
for (let i = 3; i >= 1; i--) {
  console.log(i);
}
console.log("Blast off!");
// prints: 3
// prints: 2
// prints: 1
// prints: Blast off!
```

**Common mistake:** keeping `i++` in a countdown. `i` grows, `i >= 1` stays true forever, and you get an infinite loop. `i -= 2` would count down in steps of 2.

### Trimming the end of a string: `slice(0, -2)`

Loops that build text often leave an extra `", "` on the end. MDN's loop exercise asks you to "slice the last comma off." A negative number in `.slice()` counts from the end, so `.slice(0, -2)` keeps everything except the last two characters:

```js
const list = "Pete, Biggles, ";
console.log(list.slice(0, -2));
// prints: Pete, Biggles
```

(Remember from 5.1: negative numbers don't work this way inside `[ ]` brackets.)

Building a list with `+=` and then trimming the extra `", "` is a beginner pattern. Professionals collect the items into an array and call `.join(', ')` (5.1), which never adds the extra separator.

### Choosing a loop

MDN: "If you're iterating through an array or some other object that supports it, and don't need access to the index position of each item, then for...of is the best choice." Otherwise, MDN recommends `for` to start with, since it keeps all three parts in one place.

| Situation | Loop |
|---|---|
| Every item of an array, position not needed | `for...of` |
| Need the index (last item, every other item, comparing positions) | `for` |
| Repeat a known number of times | `for` |
| Unknown number of repeats, stop when something changes | `while` |
| Must run at least once, then maybe repeat | `do...while` |
| Every item, to transform it, filter it or find one | an array method (11.1) |

---

## 8.1 Functions: calling and defining

**Sources:** [MDN: Functions — reusable blocks of code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions) · [Codecademy: Functions](https://www.codecademy.com/courses/introduction-to-javascript/lessons/functions/exercises/intro) · [Codecademy: Functions cheatsheet](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-functions/cheatsheet) · [Codecademy: Higher-Order Functions](https://www.codecademy.com/courses/introduction-to-javascript/lessons/higher-order-functions/exercises/intro)
**Skills:** functions_purpose, abstraction, parentheses_signal_function, built_in_functions, functions_vs_methods, custom_functions, identifier_term, function_body, invoke_function, body_runs_on_call, function_declaration_hoisted, parameters, arguments_concept, argument_order, parameters_vs_arguments, no_argument_functions, multiple_args_commas, optional_parameters, default_parameters

### What a function is for

A **function** is a block of code that does one job, usually with a name. You write the code once, give it a name, and then run that code whenever you need it by using the name. MDN puts it this way: functions "allow you to store a piece of code that does a single task inside a defined block, and then call that code whenever" you want.

Why this matters: without functions, every time you needed the same three lines you would copy them. If one of those lines had a bug, you would have to fix every copy, and you would probably miss one.

Functions also give you **abstraction**. Abstraction means hiding the details of *how* something is done behind a simple name that says *what* is done. When you read `console.log("hi")` you do not need to know how Node writes characters to your terminal. The name tells you the job; the details stay hidden. Codecademy introduces functions as the way "to use 'abstraction' in programming." When you write your own functions, you get to create names like that for your own jobs.

### Spotting a function: the parentheses

`()` is a pair of parentheses. In JavaScript, a name followed directly by `()` almost always means "a function is being used here." MDN's rule of thumb: if you see a name with parentheses after it and "you're not using a common language structure like a for loop, while or do...while loop, or if...else statement, you are making use of a function."

So in `if (score > 10)` the parentheses belong to `if`, which is part of the language, not a function. In `Math.random()` the parentheses tell you a function is being run.

### Built-in functions and methods

A **built-in function** is one that JavaScript already provides, so you can use it without writing it. MDN: "The JavaScript language has many built-in functions that allow you to do useful things without writing all that code yourself." You have already used several: `Math.random()`, `Math.floor()`, and the string methods `.replace()` and `.toUpperCase()`, plus `.join()` on arrays.

Some of those are called **methods**. A method is simply a function that belongs to an object. MDN: "Functions that are part of objects are called methods." `Math.floor` is the `floor` function that lives inside the `Math` object; `.toUpperCase()` is a function that lives on every string. The dot `.` is how you reach inside the object to get the function.

```js
console.log(Math.floor(4.7));
// prints: 4
console.log("quiet".toUpperCase());
// prints: QUIET
```

`console.log` itself is a method too: the `log` function that belongs to the `console` object.

### Custom functions: writing your own

A **custom function** is one you define in your own code. MDN describes them as "functions defined in your code, not inside the browser." (Here, not inside Node either.)

You write one with a **function declaration**. These are its parts, in the order they appear:

- `function` is a keyword: a word reserved by JavaScript that says "a function definition starts here."
- Then the **identifier**, which is the name you give the function. Codecademy: "The name of the function, or its identifier, followed by parentheses." An identifier is just the name bound to a function or a variable.
- Then `()`, the parentheses, which will later hold the function's inputs. They can be empty.
- Then `{ }`, curly braces, which wrap the **function body**: the statements that do the job. Codecademy: "A function body, or the block of statements required to perform a specific task, enclosed in the function's curly brackets, { }."

```js
function sayHello() {
  console.log("Hello!");
}
```

This block prints nothing. That is not a mistake, and the next heading explains why.

### Calling a function: the body runs only then

To **call** a function (also called **invoking** it) you write its name followed by parentheses. MDN: "This is done by including the function's name in the code somewhere, followed by parentheses." The `;` after it is the usual semicolon that ends an instruction.

Declaring a function only *stores* the code. Calling it *runs* the code. Codecademy: "The code inside a function body runs, or executes, only when the function is called."

```js
function sayHello() {
  console.log("Hello!");
}

sayHello();
// prints: Hello!
sayHello();
// prints: Hello!
```

Trace: lines 1–3 store the function and print nothing. Line 5 calls it, so the body runs and prints `Hello!`. Line 7 calls it again, so the body runs a second time.

**Common mistake:** writing the name without `()`. That mentions the function but does not run it, so nothing is printed.

```js
function sayHello() {
  console.log("Hello!");
}

sayHello;
console.log("done");
// prints: done
```

### Calling before the declaration: hoisting

**Hoisting** is JavaScript's behavior of making certain definitions available before the line where they are written. A function declaration is hoisted. MDN: "This form of creating a function is also known as function declaration. It is always hoisted." Codecademy calls it "the hoisting feature in JavaScript, which allows access to function declarations before they're defined."

What that means in practice: you can call a declared function on a line *above* its definition.

```js
greet();
// prints: Hi from below!

function greet() {
  console.log("Hi from below!");
}
```

Before running line 1, JavaScript has already read the whole file and registered `greet`, so the call works. Even so, most code is easier to read when functions are defined before they are used. Hoisting is something to recognize, not something to rely on. (Section 8.2 shows a way of writing functions that is *not* hoisted.)

### Parameters and arguments: giving a function input

A function that always prints "Hello!" is limited. To make it work on different values, you give it **parameters**. A parameter is a named input written inside the parentheses of the definition. Codecademy: "Parameters allow functions to accept input(s) and perform a task using the input(s)." Inside the body, a parameter behaves like a variable.

An **argument** is the actual value you put inside the parentheses when you call the function. MDN: arguments are "values that need to be included inside the function parentheses for the function to do its job properly." Codecademy: "The values that are passed to the function when it is called are called arguments."

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("Jasmine");
// prints: Hello, Jasmine!
greet("Ana");
// prints: Hello, Ana!
```

Trace: on the first call, the argument `"Jasmine"` is placed into the parameter `name`, then the body runs. On the second call, `name` holds `"Ana"` instead.

The two words are easy to mix up, so here is the distinction from MDN: "Parameters are the variables listed in a function definition, while arguments are the values passed to the function to represent the parameters." In the example, `name` is the parameter; `"Jasmine"` and `"Ana"` are arguments.

### Several inputs: commas and order

When a function needs more than one input, you separate them with `,`, a comma. MDN: "When you need to specify multiple parameters or arguments, you separate them with commas."

Arguments are matched to parameters by **position**, not by name. Codecademy: "the order in which arguments are passed and assigned follows the order in which the parameters are declared." The first argument goes into the first parameter, the second into the second, and so on.

```js
function describePet(animal, petName) {
  console.log(`${petName} is a ${animal}.`);
}

describePet("cat", "Milo");
// prints: Milo is a cat.
describePet("Milo", "cat");
// prints: cat is a Milo.
```

The second call is the same two values in swapped order, and JavaScript cannot tell that you meant otherwise. It just fills `animal` first and `petName` second.

**Common mistake:** swapping arguments. Nothing crashes, so the bug is easy to miss. Check the definition's parameter order when the output looks wrong.

### Functions with no arguments

Some functions need no input at all. MDN: "The Math.random() function doesn't require any arguments." You still write the parentheses; they are just empty. `sayHello()` above was the same kind of function.

```js
const roll = Math.random();
console.log(roll < 1);
// prints: true
```

(`Math.random()` gives a different number each run, so this example prints a comparison that is always true instead of the number itself.)

### Optional parameters and default values

Some parameters are **optional**: you can leave the argument out and the function still works. MDN: "If you don't, the function generally uses a default value." For example, the array method `.join()` takes an optional separator. Leave it out and it uses a comma.

```js
const letters = ["a", "b", "c"];
console.log(letters.join(" - "));
// prints: a - b - c
console.log(letters.join());
// prints: a,b,c
```

You can make your own parameters optional with a **default parameter**. You write `=` after the parameter's name, followed by the value to use when the argument is missing or `undefined` (passing `null` does not trigger it: `hello(null)` prints `Hello null!`). MDN: "you can specify default values by adding = after the name of the parameter, followed by the default value." Codecademy: "Default parameters allow parameters to have a predetermined value in case no argument is passed into the function." This feature arrived in ES6, the 2015 version of JavaScript.

```js
function hello(name = "Chris") {
  console.log(`Hello ${name}!`);
}

hello("Ari");
// prints: Hello Ari!
hello();
// prints: Hello Chris!
```

Trace: the first call passes `"Ari"`, so the default is ignored. The second call passes nothing, so `name` gets `"Chris"`.

**Python habit that breaks here:** a Python default is created once, when the function is defined. A JavaScript default is worked out again on every call that needs it, so a default like `= []` gives a fresh array each time.

**Common mistake:** expecting an error when you leave out an argument that has no default. JavaScript does not complain; the parameter is simply `undefined`.

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet();
// prints: Hello, undefined!
```

**Python habit that breaks here:** in Python, calling a function with too few arguments raises a `TypeError`. JavaScript raises nothing and fills the missing parameter with `undefined`, so the mistake shows up later as strange output instead of an error.

## 8.2 Functions: expressions, arrows and callbacks

**Sources:** [Codecademy: Functions](https://www.codecademy.com/courses/introduction-to-javascript/lessons/functions/exercises/intro) · [MDN: Functions — reusable blocks of code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions) · [Codecademy: Higher-Order Functions](https://www.codecademy.com/courses/introduction-to-javascript/lessons/higher-order-functions/exercises/intro) · [MDN: A first splash into JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/A_first_splash) · [MDN: Build your own function](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Build_your_own_function) · [MDN Glossary — IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) · [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
**Skills:** function_expression, invoke_term, anonymous_function, function_as_argument, function_expression_not_hoisted, arrow_function, functions_as_data, assign_function_no_parens, function_reference, first_class_objects, function_name_property, higher_order_function, arrow_zero_or_many_params, arrow_single_param_no_parens, callback_term, pass_function_by_name, anonymous_callback, prefer_arrow_functions, arrow_subtle_differences, iife_recognise

### Function expressions and anonymous functions

Section 8.1 used a function declaration: a line that starts with `function`. Codecademy: "Another way to define a function is to use a function expression." A **function expression** creates a function as a *value* and stores it in a variable, the same way you would store a number or a string.

The function in a function expression is usually written without a name. A function written with no name is called an **anonymous function** (JavaScript then names it after the variable: `sayBye.name` is `"sayBye"`). MDN: "This is called an anonymous function, because it has no name." It looks like `function () { ... }`: the keyword, then empty space where the name would go, then the parentheses and body.

```js
const sayBye = function () {
  console.log("Bye!");
};

sayBye();
// prints: Bye!
```

Trace: line 1 creates an anonymous function and stores it in the variable `sayBye`. Nothing runs yet. Line 5 calls it.

The word **invoke** means run, or execute. MDN calls it "a fancy word for run, or execute." Codecademy: "To invoke a function expression, write the name of the variable in which the function is stored, followed by parentheses." So `sayBye()` invokes the function stored in `sayBye`.

Notice the `;` after the closing `}` on line 3. The whole thing is one `const` statement, so it ends with a semicolon like any other.

This exact form, an anonymous `function` stored in a `const`, is mostly found in older code: read it, and learn it for the hoisting contrast below. New code stores an arrow function instead (`const sayBye = () => { ... };`, next) or uses a declaration. Style guides differ in detail: Google's guide prefers arrows for nested functions, and Airbnb's prefers a function expression that has its own name (`const sayBye = function sayGoodbye() { ... };`).

### Function expressions are not hoisted

A function declaration can be called above the line that defines it (section 8.1). A function expression cannot. MDN: "Unlike function declarations, function expressions are not hoisted." Codecademy: they "cannot be called before they are defined."

```js
// ERROR EXAMPLE: ReferenceError
sayBye();

const sayBye = function () {
  console.log("Bye!");
};
```

Node stops on line 2 with `ReferenceError: Cannot access 'sayBye' before initialization`. The variable `sayBye` does not have its function yet when line 2 runs, because the `const` line below has not run.

### Arrow functions

An **arrow function** is a shorter way to write a function expression. It drops the `function` keyword and puts `=>` (an equals sign followed by a greater-than sign, read as "arrow") between the parameters and the body. Codecademy: "Arrow functions remove the need to type out the keyword function every time we create a function." MDN: "Instead of function(event), you write (event) =>". Arrow functions arrived in ES6.

These two do the same job:

```js
const doubleA = function (n) {
  console.log(n * 2);
};

const doubleB = (n) => {
  console.log(n * 2);
};

doubleA(4);
// prints: 8
doubleB(4);
// prints: 8
```

Read `(n) => { ... }` as "takes `n`, then does this."

**Parentheses rules.** If the function takes **zero** parameters or **more than one**, the parentheses are required. Codecademy: "if a function takes zero or multiple parameters, parentheses are required." If it takes **exactly one plain parameter** (no `=` default, no `...`), you may leave them out. MDN: "If the function only takes one argument, you can omit the parentheses around it." With a default the parentheses are required: `name = 'Chris' => ...` is a `SyntaxError`, `(name = 'Chris') => ...` works.

```js
const ping = () => {
  console.log("ping");
};
// prettier-ignore
const shout = word => {
  console.log(word.toUpperCase());
};
const add = (a, b) => {
  console.log(a + b);
};

ping();
// prints: ping
shout("hey");
// prints: HEY
add(2, 3);
// prints: 5
```

(The `// prettier-ignore` line keeps the formatter from changing `word =>` to `(word) =>`, which it does on save. Formatters and Airbnb's guide always write the parentheses; you will read the bare form in older code. Write what the formatter writes.)

Arrow functions have an even shorter form with no curly braces. It depends on return values, which are taught at the end of section 10.1, so until then always write the curly braces.

**Which to use.** MDN: "We recommend using arrow functions, as they can make your code shorter and more readable." MDN also notes "There are some subtle differences between arrow functions and normal functions." Those differences are mostly about a keyword called `this`, which belongs to objects (section 12); arrows also have no `arguments` and cannot be called with `new`. For now, treat the two as interchangeable.

### Functions are values

In JavaScript a function is a value, just like `42` or `"hi"`. Codecademy: "we can assign functions to variables, and we can reassign them to new variables."

To store an existing function in another variable, write its name **without** parentheses. With parentheses you would *run* it; without them you *refer to* it.

```js
function announce() {
  console.log("Doing important work!");
}

const busy = announce;
busy();
// prints: Doing important work!
```

Codecademy, on a version of this example: "Notice how we assign announceThatIAmDoingImportantWork without parentheses as the value to the busy variable." And: "busy is a variable that holds a reference to our original function."

A **reference** means `busy` does not get a copy of the function. Both names point to the very same function, the way two labels can stick to one box.

**Common mistake:** writing `const busy = announce();`. That runs `announce` right away (printing once) and stores whatever comes out of it, which is not the function.

### Functions have properties

Codecademy: "In JavaScript, functions are first-class objects." **First-class** means a function can be treated like any other value: stored, passed around, and given to other functions. Being an **object** means it also has properties and methods, like strings and arrays do. Codecademy: "they have properties such as .length and .name, and methods such as .toString()."

- `.name` is the function's name as a string.
- `.length` is the number of parameters it declares before the first one with a default value (so `hello(name = "Chris")` has length 0).
- `.toString()` gives back the function's source code as text.

```js
function describePet(animal, petName) {
  console.log(`${petName} is a ${animal}.`);
}

const busy = describePet;
console.log(busy.name);
// prints: describePet
console.log(busy.length);
// prints: 2
```

Notice `busy.name` is `describePet`: further evidence that `busy` refers to the original function rather than a new one.

### Passing a function to a function: higher-order functions and callbacks

Because functions are values, you can pass one as an argument to another function. A **higher-order function** is a function that does this. Codecademy: "A higher-order function is a function that either accepts functions as parameters, returns a function, or both!" (Giving a function back comes later; here we only pass them in.)

The function you pass in is called a **callback function**. Codecademy: "We call functions that get passed in as parameters callback functions." The receiving function decides when to call it back.

```js
function runTwice(action) {
  action();
  action();
}

function cheer() {
  console.log("Go!");
}

runTwice(cheer);
// prints: Go!
// prints: Go!
```

Trace: line 10 passes the function `cheer` (no parentheses) into `runTwice`. Inside, the parameter `action` now refers to `cheer`. Lines 2 and 3 each call `action()`, which runs `cheer`'s body, so `Go!` prints twice.

This is **passing a function by name**: you give the function itself, without parentheses, so the other function can run it later. Codecademy: "we pass in the function itself by typing the function name without the parentheses." MDN's example passes a function to a browser feature that runs it when a button is clicked; this guide uses `runTwice` instead, so the same idea runs in Node.

**Common mistake:** adding parentheses when passing a callback. `runTwice(cheer())` runs `cheer` immediately, once, and then hands `runTwice` the result instead of the function. `runTwice` then tries to call something that is not a function.

```js
// ERROR EXAMPLE: TypeError
function runTwice(action) {
  action();
  action();
}

function cheer() {
  console.log("Go!");
}

runTwice(cheer());
```

This prints `Go!` once (from the early call), then stops with `TypeError: action is not a function`.

### Anonymous callbacks

You do not have to name a callback first. You can write an anonymous function right inside the call. Codecademy: "Anonymous functions can be arguments too!" MDN: "You'll often see anonymous functions when a function expects to receive another function as an argument."

```js
function runTwice(action) {
  action();
  action();
}

runTwice(function () {
  console.log("anonymous");
});
// prints: anonymous
// prints: anonymous

runTwice(() => {
  console.log("arrow");
});
// prints: arrow
// prints: arrow
```

The first call passes a regular anonymous function; the second passes an arrow function. Both are callbacks. Write the second form: inline callbacks in current code are arrows. You will read `function () { }` callbacks in older code, and in the few places where `this` must come from the caller (section 12). MDN shows the same comparison when it rewrites a `map()` call "to use a regular anonymous callback function." (`map()` is an array method taught in section 11.)

### Recognise: a function that runs the moment it is made (IIFE)

The instructor showed this one in class. Wrap a function expression in brackets and put `()` straight after it, and the function is created and called in one go. MDN: "An IIFE (Immediately Invoked Function Expression) is an idiom in which a JavaScript function runs as soon as it is defined."

```js
(function () {
  const secret = "only in here";
  console.log(secret);
})();

(() => {
  console.log("arrow version");
})();
// prints: only in here
// prints: arrow version
```

Trace: the first pair of brackets holds a function expression, a value, as at the top of this section. The `()` after it invokes that value at once. Nothing is stored in a variable, so it can never be called again, and `secret` exists only inside it.

The instructor's version puts the call inside the outer brackets, `(function () { ... }())`; it does the same thing. MDN lists what it was for, starting with "Avoiding polluting the global namespace by creating a new scope." Your files are ES modules, so each file already has its own scope (9.1), and Airbnb's guide notes that "in a world with modules everywhere, you almost never need an IIFE." Recognise it in older code and in the instructor's examples; do not write it to hide variables.

## 9.1 Scope: where a variable can be seen

**Sources:** [Codecademy: Scope](https://www.codecademy.com/courses/introduction-to-javascript/lessons/scope/exercises/intro) · [Codecademy: Scope cheatsheet](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-scope/cheatsheet) · [MDN: Functions — reusable blocks of code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions)
**Skills:** scope_concept, block_concept, scope_types_list, function_scope, global_scope, global_namespace, scope_pollution, accidental_global_reassign, scope_why, no_redeclare_same_scope, function_redeclare_last_wins, lock_code_in_functions, block_scope, reference_error_scope, local_variables, tight_scoping, same_name_inner_block, var_not_block_scoped

### Scope and blocks

**Scope** is the region of your code where a variable exists and can be used. Codecademy: "Scope defines where variables can be accessed or referenced." Outside its scope, a variable's name means nothing.

Why it exists: in a large program, many parts use names like `total` or `count`. Scope keeps those names from colliding.

A **block** is the code inside a pair of curly braces. Codecademy: "A block is the code found inside a set of curly braces {}." You have already written several kinds: a function body, the body of an `if`, the body of a loop. (Not every pair of braces is a block: braces used as a value, like `{ name: 'Mo' }`, make an object instead, as in 2.2 and section 12.)

There are several kinds of scope. Codecademy lists them as: **global** scope (the whole program), **file or module** scope ("the value/function can only be accessed from within the file"), **function** scope, and **block** scope. The sections below cover function and block scope, and the top level of a file. File (module) scope applies to every file you run in this folder already (its `package.json` says `"type": "module"`); it starts to matter visibly when you split a program into several files (gap lesson 2.14).

### Function scope and top-level (module) scope

Variables declared inside a function live only inside that function. MDN: "the variables and other things defined inside the function are inside their own separate scope." Code outside the function cannot reach them.

The top level of your file, outside every function and block, is **module scope**: every function in the file can see it, but other files cannot, and it is not global (`globalThis.greeting` is `undefined` for the example below). Codecademy and MDN Learn call this level the global scope. Codecademy: "In the global scope, variables are declared outside of blocks. These variables are called global variables." That is accurate for an old browser `<script>`, where the top level really is global. In your files, true global scope holds only the built-ins that every file shares, like `console`, `Math` and `globalThis`. MDN's sentence "Values defined in the global scope are accessible from everywhere in the code" describes those. (In an older CommonJS file, Node also keeps the top level out of the global scope, by wrapping each file in a function.)

```js
const greeting = "Hello";

function welcome() {
  const guest = "Ana";
  console.log(`${greeting}, ${guest}`);
}

welcome();
// prints: Hello, Ana
```

Line 5 uses both: `greeting` is at the top level, so the function can see it; `guest` is declared inside the function, so it is visible there.

But try to use `guest` from outside:

```js
// ERROR EXAMPLE: ReferenceError
function welcome() {
  const guest = "Ana";
  console.log(guest);
}

welcome();
console.log(guest);
```

The call on line 7 prints `Ana`. Then line 8 stops with `ReferenceError: guest is not defined`, because `guest` only exists inside `welcome`'s body. Codecademy: "If we try to log the same variable outside the function, it throws a ReferenceError."

**Reading this error.** MDN's advice: "If you get this error and you are sure that you have defined the variable in question, check what scope it is in." The variable may exist, just not where you are using it.

### The global namespace and scope pollution

A **namespace** is the collection of names a part of the program can see. Codecademy calls the top level the **global namespace**: "The global namespace allows the variables to be accessible from anywhere in the program." In your files that means the module's top level: names there stay until the program finishes and every function in the file can reach them.

Being reachable from everywhere sounds convenient, but it is also the danger. Codecademy: "Scope pollution occurs when we have too many variables in the global namespace, or when we reuse variables across different scopes." Any function in the file can reassign a top-level `let` (and change the contents of any top-level array or object), so a bug in one place can show up somewhere unrelated. (A top-level `const` cannot be reassigned; trying throws a `TypeError`.)

A common way to cause it: you meant to create a new variable inside a function, but "forgot to use the let keyword" (Codecademy). Without `let`, the line does not create a new variable; it reassigns the outer one that already has that name.

```js
let stars = "North Star";

function showConstellation() {
  stars = "Sirius";
  console.log(stars);
}

showConstellation();
// prints: Sirius
console.log(stars);
// prints: Sirius
```

Trace: line 1 sets the top-level `stars`. Line 4 has no `let`, so it overwrites that outer variable. After the function runs, line 10 shows the outer `stars` has been changed for good. If line 4 had been `let stars = "Sirius";`, the outer one would still be `North Star`.

**Python habit that breaks here:** in Python, assigning to a name inside a function creates a new local variable unless you write `global`. In JavaScript it is the reverse: assigning without `let` or `const` changes the outer variable, and if there is no outer variable, your files throw `ReferenceError: stars is not defined` (ES modules are strict; an old non-module script would silently create a global instead). Always declare new variables with `let` or `const`.

### Why scope exists, and duplicate names

MDN: "JavaScript works like this mainly for security and organization." Its example: a page loads two scripts written by different people, and both happen to define a function with the same name. Only one can win, so one script silently breaks.

Two rules decide what happens with duplicate names in the same scope.

**Variables: you cannot declare the same name twice.** MDN: "you can't declare the same constant twice in the same scope." The same goes for `let`. JavaScript refuses to run the file at all:

```js
// ERROR EXAMPLE: SyntaxError
const tax = 5;
const tax = 8;
```

Node reports `SyntaxError: Identifier 'tax' has already been declared`, before any line runs.

**Functions: the same name twice at the top level is also refused here.** In your files (ES modules) two function declarations with the same name at the top level are a `SyntaxError`, before any line runs. MDN: "At the top level of a module or a block in strict mode, function declarations behave like let and cannot be redeclared."

```js
// ERROR EXAMPLE: SyntaxError
function greet() {
  console.log("from script A");
}
greet();

function greet() {
  console.log("from script B");
}
greet();
```

Node reports `SyntaxError: Identifier 'greet' has already been declared`, and nothing prints.

Older code behaves differently, and it is the case MDN's Learn page describes: "If a function is redeclared, the last declaration in the source order is used." At the top level of a classic browser `<script>` or a CommonJS file, and inside any function body (even in a module), the last declaration wins silently: function declarations are hoisted (section 8.1), so both are registered before anything runs and the second replaces the first, so even the first call above would print `from script B`. Imagine those two declarations coming from two different people's scripts: this is the conflict MDN describes. ESLint's `no-redeclare` (in the project's rules) flags it in all of those places.

The fix MDN recommends: put your code inside functions, so its variables live in the function's scope instead of the global one. "Locking parts of your code away in functions avoids such problems and is considered a best practice." Since 2015 the main fix is **modules**: each file has its own scope, which is why every file in this course already keeps its names to itself. (Older code often wrapped a whole file in a function that runs at once, an IIFE; in modules you rarely need one.)

### Block scope and local variables

Function bodies are not the only blocks that create scope. MDN: "the scope of values declared inside conditionals and loops works the same as function scope when declaring values with let and const." Codecademy: "When a variable is defined inside a block, it is only accessible to the code within the curly braces {}." This is **block scope**.

Codecademy adds: "const and let are block scoped variables, meaning they are only accessible in their block or nested blocks." A nested block is a block inside another block; it can see its outer block's variables, but not the other way round.

```js
// ERROR EXAMPLE: ReferenceError
const temperature = 30;

if (temperature > 25) {
  const advice = "Wear a hat";
  console.log(advice);
}

console.log(advice);
```

Line 6 prints `Wear a hat`. Line 9 throws `ReferenceError: advice is not defined`, because `advice` belongs to the `if` block and cannot be named outside it. (The variable is not always destroyed: a function created inside the block can keep using it, as closures in 10.2 show. Its *name* is what stays inside.)

The same applies to a loop's counter: a `let i` declared in a `for` loop's parentheses exists only inside that loop.

Variables declared with block scope are called **local variables**. Codecademy: "Variables declared with block scope are known as local variables." Local (block or function) variables are the opposite of top-level ones.

**Python habit that breaks here:** in Python, an `if` or `for` does not create a new scope; a variable made inside one is still usable after it. In JavaScript, `let` and `const` inside any `{ }` cannot be named outside that block.

### Scope tightly, and same names in different blocks

Codecademy's advice: "we should follow best practices for scoping our variables as tightly as possible using block scope." Declare each variable in the smallest block that needs it. The fewer lines that can see a variable, the fewer lines that can break it.

One consequence of block scope is that an inner block can declare its own variable with the same name as an outer one. Inside the block you get the inner variable; outside you get the outer one. Codecademy's example: "Within the if block, the color variable holds the value 'pink', though outside the if block" it holds its original value.

```js
const color = "blue";

if (true) {
  const color = "pink";
  console.log(color);
  // prints: pink
}

console.log(color);
// prints: blue
```

Line 4 has `const`, so it makes a new `color` that lives only in the block. The outer `color` is never touched. Compare this with the `stars` example above, where the missing keyword changed the outer variable.

This is legal, but two variables sharing one name is confusing to read. It is better to give them different names.

### Why `var` behaves differently

`var` is the older way to declare a variable. It ignores block scope: a `var` declared inside an `if` or a loop is still usable after the block ends. It does respect function scope, so a `var` inside a function stays inside that function.

```js
if (true) {
  var size = "large";
}

console.log(size);
// prints: large
```

With `let`, line 5 would throw a ReferenceError. With `var`, the variable leaks out of the block. MDN: "This inconsistency can cause confusion and errors and is another reason why let and const should be used instead of var." Recognise `var` when you read it; do not write it (the project's ESLint has `no-var` on).

## 10.1 Building your own functions

**Sources:** [MDN: Build your own function](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Build_your_own_function) · [MDN: Function return values](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Return_values) · [Codecademy: Functions](https://www.codecademy.com/courses/introduction-to-javascript/lessons/functions/exercises/intro) · [Codecademy: Arrays](https://www.codecademy.com/courses/introduction-to-javascript/lessons/arrays/exercises/intro) · [Codecademy: Iterators](https://www.codecademy.com/courses/introduction-to-javascript/lessons/javascript-iterators/exercises/intro)
**Skills:** function_naming_rules, function_definition_anatomy, call_runs_immediately, reusable_function_call, invocation_operator, add_parameters, use_parameter_in_body, array_mutated_in_function, pass_by_reference_term, wrap_call_with_args_in_arrow, parameter_drives_conditional, else_default_makes_param_optional, return_value_concept, check_reference_return_value, read_mdn_docs, no_return_undefined, return_for_intermediate_steps, return_keyword

This section builds one function step by step, the way MDN's "Build your own function" guide does. MDN's version shows a message box on a web page; this version prints the message to the terminal instead, so it runs in Node.

### Naming and anatomy

MDN: "For function naming conventions, you should follow the same rules as variable naming conventions." That means lower camel case (`displayMessage`, not `display_message` or `DisplayMessage`) and a name that says what the function does. Usually that is a verb: `displayMessage`, `calculateTotal`. Functions and variables follow the same naming rules, so name functions with a verb (`calculateTotal`) and values with a noun (`total`). They also share one set of names: `const total = 5;` plus `function total() {}` in the same scope is a `SyntaxError`, and a function name written without `()` is itself a value (8.2).

The anatomy of a definition, in MDN's words: the `function` keyword, then the name, then parentheses: "Any parameters we want to give to our function go inside the parentheses, and the code that runs when we call the function goes inside" the curly braces.

```js
function displayMessage() {
  console.log("=== MESSAGE ===");
  console.log("This is a message box");
}

displayMessage();
// prints: === MESSAGE ===
// prints: This is a message box
```

### Calling runs it now, every time

MDN, about a line like `displayMessage();`: "This line invokes the function, making it run immediately." Each call runs the body once, from top to bottom, and then the program continues on the line after the call.

And you can do it as often as you like. MDN: "we now have a reusable function that we can call any time we like." Codecademy: "We can call the same function as many times as needed."

```js
function displayMessage() {
  console.log("--- message ---");
}

console.log("start");
// prints: start
displayMessage();
// prints: --- message ---
console.log("middle");
// prints: middle
displayMessage();
// prints: --- message ---
```

Trace: line 5 prints `start`. Line 7 jumps into the function, prints, and comes back. Line 9 prints `middle`. Line 11 jumps in again.

### `()` is the invocation operator

The parentheses after a function's name have a name of their own. MDN: they "are sometimes called the 'function invocation operator'. You only use them when you want to run the function immediately." An **operator** is a symbol that does something to a value; this one runs a function.

So the rule from section 8.2 now has a name. Write `displayMessage` (no operator) to hand the function to something else. Write `displayMessage()` (with the operator) to run it right now.

### Adding parameters

The message is fixed so far. MDN's next step is to add parameters, "Now when we call the function, we can provide two variable values inside the parentheses to specify the message to display" and what kind of message it is.

Inside the body, each parameter is used exactly like a variable. Codecademy: "inside the function body, they act just like regular variables."

```js
function displayMessage(msgText, msgType) {
  console.log(`[${msgType}] ${msgText}`);
}

displayMessage("Your inbox is almost full", "warning");
// prints: [warning] Your inbox is almost full
displayMessage("Brian: Hi there", "chat");
// prints: [chat] Brian: Hi there
```

### Arrays passed into a function: one shared array

If you pass an array to a function and the function changes it (for example with `.push()`), the change is still there after the function finishes. Codecademy: "if the array is mutated inside the function, that change will be maintained outside the function as well."

```js
const groceries = ["milk", "eggs"];

function addBread(list) {
  list.push("bread");
}

addBread(groceries);
console.log(groceries);
// prints: [ 'milk', 'eggs', 'bread' ]
```

Trace: line 7 passes `groceries`. The parameter `list` now refers to the same array, not a copy. Line 4 pushes onto that one array, so line 8 shows the change.

Codecademy: "This concept is also sometimes called pass-by-reference". The function receives a **reference** (a pointer to where the array lives), the same idea as two variable names sharing one function in section 8.2. MDN gives the precise name: JavaScript always passes arguments **by value**, and for an array or object that value *is* a reference, so caller and function share one array. MDN calls this "passed by sharing". So mutating `list` changes the caller's array, but `list = ['bread']` inside the function only points the parameter at a new array and leaves the caller's `groceries` alone. (True pass-by-reference, as in some other languages, would change the caller's variable too. This is a classic interview question.)

**Common mistake:** assuming the function worked on a copy and the original is safe. If you need the original unchanged, do not mutate the parameter inside the function; build and return a new array instead (unless changing the array is the function's whole job).

### Wrapping a call that needs arguments

Here is a puzzle. Section 8.2's `runTwice` takes a callback and calls it. How do you pass `displayMessage` *with* arguments? `runTwice(displayMessage("Hi", "chat"))` uses the invocation operator, so it runs `displayMessage` immediately and passes `runTwice` the leftover result, not a function.

MDN's answer: "we need to put it inside an anonymous function so that it isn't in the immediate scope and therefore isn't called immediately." You wrap the call in an arrow function. The wrapper is the callback; when it gets called, it makes the real call with the arguments.

```js
function runTwice(action) {
  action();
  action();
}

function displayMessage(msgText, msgType) {
  console.log(`[${msgType}] ${msgText}`);
}

runTwice(() => {
  displayMessage("Hi", "chat");
});
// prints: [chat] Hi
// prints: [chat] Hi
```

Trace: line 10 passes an arrow function. Nothing prints yet. Inside `runTwice`, each `action()` runs the arrow function's body, which calls `displayMessage("Hi", "chat")`.

### A parameter that chooses a branch

Inside the body, you can use a parameter in an `if`/`else if`/`else` chain so the function behaves differently depending on what was passed. MDN: "depending on what the msgType parameter is set to, the function will display a different icon and a different background color." Here, a different label:

```js
function displayMessage(msgText, msgType) {
  if (msgType === "warning") {
    console.log(`WARNING: ${msgText}`);
  } else if (msgType === "chat") {
    console.log(`CHAT: ${msgText}`);
  } else {
    console.log(msgText);
  }
}

displayMessage("Low battery", "warning");
// prints: WARNING: Low battery
displayMessage("Hi there", "chat");
// prints: CHAT: Hi there
displayMessage("Saved");
// prints: Saved
```

Trace: the first call matches the `if` on line 2. The second fails line 2 and matches line 4. The third call passes no second argument, so `msgType` is `undefined`; neither test matches and the `else` on line 6 runs.

That last call shows the trick. The `else` branch handles "anything else, including nothing." MDN: "This provides a default state if no msgType parameter is provided, meaning that it is an optional parameter!" The `else` catches anything unexpected, including a missing argument. When there is one real default, write it as a default value, `msgType = "info"` (section 8.1); testing for a missing argument in the body is the older, pre-2015 way.

### Return values: what a function gives back

Every function above *does* something (prints) but hands nothing back to the line that called it. Many functions work differently: they compute a value and give it back. MDN: "Return values are just what they sound like — the values that a function returns when it completes."

You have used these already. `"cat".toUpperCase()` gives back `"CAT"`, which you can store in a variable. `.replace()` gives back a new string.

**How to find out what a function gives back.** Look it up. MDN: "If you look at the replace() function MDN reference page, you'll see a section called return value." Codecademy: "The documentation for each method contains several sections:" a short description, the **syntax** (how to write the call), the **parameters** (what to pass in), the **return value** (what comes back), and **examples**. When you meet a new method, the "Return value" section answers "what do I get?"

**Functions that give back nothing.** MDN: "Some functions don't return any value. (In these cases, our reference pages list the return value as void or undefined.)" Codecademy: "By default, the resulting value is undefined." Every function you have written so far is one of these. Store the result of a call and you get `undefined`:

```js
function displayMessage(msgText) {
  console.log(msgText);
}

const result = displayMessage("Hello");
// prints: Hello
console.log(result);
// prints: undefined
```

The call on line 5 prints `Hello`, but the function hands back nothing, so `result` holds `undefined`.

**Why give a value back.** MDN: "Generally, a return value is used where the function is an intermediate step in a calculation of some kind." A function that only prints can show you a number, but no other code can use it. A function that gives the number back lets the next step build on it.

### The `return` keyword

To make your own function give a value back, use `return`. `return` is a keyword: write it, then the value to give back. MDN: "To return a value from a custom function, you need to use the return keyword." Codecademy: "To create a return statement, we use the return keyword followed by the value that we wish to return."

```js
function squared(num) {
  return num * num;
}

const area = squared(5);
console.log(area);
// prints: 25
console.log(squared(3) + 1);
// prints: 10
```

Trace: line 5 calls `squared(5)`. Inside, `num` is `5`, line 2 computes `25`, and `return` hands `25` back to line 5, where it is stored in `area`. On line 8, `squared(3)` gives back `9`, which then becomes one step in a larger calculation: `9 + 1`.

Here is a function as an intermediate step, the use MDN describes:

```js
function squared(num) {
  return num * num;
}

function describeSquare(side) {
  const area = squared(side);
  console.log(`A ${side}x${side} square has area ${area}`);
}

describeSquare(4);
// prints: A 4x4 square has area 16
```

**Common mistake:** printing inside a function when you meant to return. Swap the `return` for `console.log` and the number shows on screen, but `area` on line 6 becomes `undefined`.

What else `return` does (it also stops the function immediately) and the shorter arrow-function form that returns without the keyword are the start of section 10.2.

---

## 10.2 Return values and closures

**Sources:** [MDN, Functions](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions) · [MDN, Function return values](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Return_values) · [MDN, Arrays](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays) · [MDN Guide, Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) · [Codecademy, Functions](https://www.codecademy.com/courses/introduction-to-javascript/lessons/functions/exercises/intro) · [Codecademy, Arrays](https://www.codecademy.com/courses/introduction-to-javascript/lessons/arrays/exercises/intro) · [Codecademy, Arrays cheatsheet](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-arrays/cheatsheet) · [MDN — parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) · [React — Keeping Components Pure](https://react.dev/learn/keeping-components-pure) · [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
**Skills:** functions_call_functions, arrow_implicit_return, concise_body, store_return_value, push_returns_length, pop_returns_item, return_stops_function, return_expression_directly, return_value_substitutes_call, early_return_guard, call_functions_in_template, parse_float, parse_int_radix, is_nan, validate_parameters, pure_function_side_effects, function_library, closure_definition, lexical_scope, closure_created_every_function, var_loop_closure_bug

In 10.1 you met `return`: the keyword that hands a value back to whoever called the function. This section is about what you can *do* with that value, and then about a surprising thing functions can remember.

### Functions can call other functions

A function body can hold any code you like, and that includes calls to other functions. MDN puts it simply: "Functions can contain whatever code you like, even other function calls." A small function that another function calls to do one piece of its job is called a **helper function**.

Why bother? Each function stays small and does one thing. If the helper has a bug, you fix it in one place and every function that uses it is fixed too.

```js
function square(n) {
  return n * n;
}

function sumOfSquares(a, b) {
  return square(a) + square(b);
}

console.log(sumOfSquares(3, 4)); // prints: 25
```

Tracing it: `sumOfSquares(3, 4)` runs its one line. That line calls `square(3)`, which returns `9`, then `square(4)`, which returns `16`. `9 + 16` is `25`, and that is what `sumOfSquares` returns. Here `square` is the helper.

### The arrow shortcut: implicit return and the concise body

An arrow function (8.2) normally has a **block body**: curly braces `{ }` around its lines, and a `return` inside to send a value back.

When the whole body is just "return this one expression", you can drop both the braces and the word `return`. Whatever that one expression works out to is sent back automatically. This is called an **implicit return**: "implicit" means it happens without you writing it out. Codecademy: "Without the curly braces, whatever that line evaluates will be automatically returned."

A body with no braces is called an **expression body** (MDN's name); Codecademy calls it the **concise body**: "The most condensed form of the function is known as a concise body." Separately, a single plain parameter may be written without its parentheses (8.2), but this project's formatter puts them back: Prettier's default `arrowParens: "always"` turns `n => n * 2` into `(n) => n * 2` on save, and Airbnb's guide says "Always include parentheses around arguments". Read both forms; write what the formatter writes, as below.

The two functions below do exactly the same job. The first uses a block body; the second uses a concise body.

```js
const doubleLong = (n) => {
  return n * 2;
};

const doubleShort = (n) => n * 2;

console.log(doubleLong(5)); // prints: 10
console.log(doubleShort(5)); // prints: 10
```

**Common mistake:** keeping the braces but forgetting `return`. With braces, nothing is returned unless you say `return`, so you get `undefined`.

```js
const doubleBroken = (n) => {
  n * 2;
};

console.log(doubleBroken(5)); // prints: undefined
```

The rule to remember: **braces mean you must write `return`; no braces means the expression is returned for you.**

### Storing a return value

A return value is only useful if you catch it. The usual way is to put the call on the right side of `=`, so the value it returns gets saved in a variable. Codecademy: "We can then save the output to a variable for later use."

MDN's example uses the string method `replace()` (4.2), which returns a new string:

```js
const myText = "The weather is cold";
const newString = myText.replace("cold", "warm");

console.log(newString); // prints: The weather is warm
console.log(myText); // prints: The weather is cold
```

As MDN says, "the result of this return value is saved in the variable newString." The original `myText` is untouched, because a string can never be changed (strings are immutable, 4.2), so a method like `replace()` builds and returns a new string instead.

### push() and pop() return something too

Two array methods you already know (5.1) quietly return a value that is easy to ignore:

- `push()` adds one or more items to the end of an array **and returns the new length** of the array. MDN: "The new length of the array is returned when the method call completes."
- `pop()` removes the last item **and returns the item it removed**. MDN: "The pop() method returns the item that was removed."

```js
const pets = ["cat", "dog"];

const newLength = pets.push("fish");
console.log(newLength); // prints: 3

const removed = pets.pop();
console.log(removed); // prints: fish
console.log(pets); // prints: [ 'cat', 'dog' ]
```

Both methods still change the original array (they *mutate* it, 5.1). The return value is a bonus report about what they did.

**Common mistake:** expecting `push()` to give you back the array.

```js
const letters = ["a"];
const result = letters.push("b");

console.log(result); // prints: 2
console.log(letters); // prints: [ 'a', 'b' ]
```

`result` is the number `2`, not the array.

### return stops the function

`return` does two jobs at once: it hands back a value, and it **ends the function right there**. Any lines after it in the body never run. Codecademy: "When a return statement is used in a function body, the execution of the function is stopped".

```js
function stopEarly() {
  console.log("before return");
  return "done";
  console.log("after return");
}

const result = stopEarly();
console.log(result);
// prints: before return
// prints: done
```

Tracing it: the first line logs `before return`. The `return` line sends `"done"` back and the function is over. The third `console.log` is skipped completely. Back outside, `result` holds `"done"`, which is then logged.

### Return the expression directly

You do not need a variable inside the function just to hold the answer before returning it. You can put the expression straight after `return`. These two functions behave identically:

```js
function areaStored(width, height) {
  const area = width * height;
  return area;
}

function areaDirect(width, height) {
  return width * height;
}

console.log(areaStored(3, 5)); // prints: 15
console.log(areaDirect(3, 5)); // prints: 15
```

MDN on the short version: "the first version is quicker to write, and more compact." The longer version is still fine when a named variable makes the code easier to read.

### A call is replaced by its return value

MDN: "The function calls on the line are run first, and their return values are substituted for the function calls, before the line itself is then" executed. More precisely, JavaScript works through the line left to right; each call runs when it is reached, and its return value takes its place. One exception: a call behind `&&`, `||` or `? :` that is skipped never runs at all (`false && square(3)` never calls `square`, 6.2).

```js
function square(n) {
  return n * n;
}

const total = square(3) + square(4);
console.log(total); // prints: 25
```

Step by step, the second-to-last line turns into:

```text
const total = square(3) + square(4);
const total = 9 + 16;
const total = 25;
```

This is the most useful picture to keep in your head: **a function call is a placeholder for the value it will return.**

### Returning early with a guard

Sometimes a function gets a value it cannot work with. A **guard** is an `if` near the top of the function that returns straight away in that case, so the rest of the body never has to deal with it. MDN's `factorial()` function "returns the factorial of the given number", and it starts with a guard for negative numbers. (The factorial of 5 is 5 × 4 × 3 × 2 × 1.)

```js
function factorial(num) {
  if (num < 0) return undefined;
  if (num === 0) return 1;
  let x = num - 1;
  while (x > 1) {
    num = num * x;
    x--;
  }
  return num;
}

console.log(factorial(5)); // prints: 120
console.log(factorial(-2)); // prints: undefined
```

For `factorial(-2)`, the first `if` is true, so the function returns `undefined` at once and the loop never starts. For `factorial(5)`, both guards are false, the loop runs, and the final `return` sends back `120`.

(Guards like these are current practice. One thing in MDN's version is not: it changes its own parameter, `num = num * x`, which Airbnb's guide forbids (ESLint `no-param-reassign`). A professional would start a separate `let result = num;` and multiply that.)

### Calling functions inside a template literal

Because a call is replaced by its return value, you can put calls inside `${ }` in a template literal (4.1). MDN builds one sentence that "calls the squared(), cubed(), and factorial() functions to calculate the required values."

```js
function squared(num) {
  return num * num;
}

function cubed(num) {
  return num * num * num;
}

const num = 3;
console.log(`${num} squared is ${squared(num)}. ${num} cubed is ${cubed(num)}.`);
// prints: 3 squared is 9. 3 cubed is 27.
```

### Turning text into a number: parseFloat()

Values that come from a user (a web form, a file, a terminal) usually arrive as **text**, even when they look like numbers. `parseFloat()` is a built-in function that reads a string and returns the number at its start. "Float" is short for *floating-point number*, a number that can have a decimal point.

In MDN's example the text comes from an input box on a web page; here a plain string stands in for it.

```js
const typed = "4.5";
const num = parseFloat(typed);

console.log(num + 1); // prints: 5.5
console.log(typed + 1); // prints: 4.51
```

Without the conversion, `+` joins the text instead of adding (4.1), so you get `4.51`.

`parseFloat()` *parses*: it reads a number from the start of the text and ignores what follows (`parseFloat('12px')` is `12`). `Number()` (3.1) *converts* the whole string and is strict about extra text (`Number('12px')` is `NaN`), though it turns `''` into `0`. Both are current; for checking user input, professionals usually convert with `Number()` and then check the result (next headings).

If the string does not start with a number, `parseFloat()` returns **`NaN`**. `NaN` is a special number value that means "Not a Number": the result of a number operation that had no sensible answer.

```js
console.log(parseFloat("twelve")); // prints: NaN
```

### Whole numbers from text: parseInt(text, 10)

`parseInt()` is the whole-number sibling of `parseFloat()`. MDN: "The parseInt() function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems)." The **radix** is the number base: 10 for ordinary numbers. Always pass the `10`. It is optional, but without it the function guesses the base from the text (`parseInt('0x1F')` is read as hexadecimal and gives `31`). Airbnb: "Use `Number` for type casting and `parseInt` always with a radix for parsing strings." (ESLint has an opt-in `radix` rule for it.)

```js
console.log(parseInt("42px", 10)); // prints: 42
console.log(parseInt("3.9", 10)); // prints: 3
console.log(parseInt("abc", 10)); // prints: NaN
console.log(Number("42px")); // prints: NaN
```

Like `parseFloat()`, it reads digits from the start and stops at the first character that does not fit. So `"3.9"` gives `3`: it stops at the dot and drops the rest, it does not round. You will meet it on Express route parameters and query strings (week 7), which always arrive as text. `Number()` is still the strict choice when the whole string must be a number.

### Checking for NaN: isNaN()

MDN Learn introduces `isNaN()` like this: "The isNaN() function tests whether the num value is not a number — if so, it returns true, and if not, it returns false." That is a simplification. The global `isNaN()` first *converts* its argument to a number, then checks for `NaN`, so `isNaN('')`, `isNaN(null)` and `isNaN(true)` are all `false`. MDN's reference page says it "answers neither the question "is the input the floating point NaN value" nor the question "is the input not a number"". Modern code uses `Number.isNaN()` (no conversion: true only for `NaN` itself) and, to ask "is this a usable number?", `Number.isFinite()`. Recognise the global `isNaN()` in older code and in MDN Learn.

On a `parseFloat()` result, as here, all of them agree, because that result is always a number:

```js
console.log(isNaN(parseFloat("12"))); // prints: false
console.log(isNaN(parseFloat("twelve"))); // prints: true
```

Because these checks return `true` or `false`, they fit straight into an `if` condition. That is how the next idea uses them.

### Validate what a function receives

A function cannot control what callers pass in. MDN's advice: "It is generally a good idea to check that any necessary parameters are validated, and that any optional parameters have some kind of default value". In plain words:

- a **necessary** parameter, one the function cannot work without, gets checked with a guard;
- an **optional** parameter gets a default value (8.1), so leaving it out is not an error.

```js
function describeSquare(side, unit = "cm") {
  if (!Number.isFinite(side)) {
    return "Please give a number.";
  }
  return `Area: ${side * side} ${unit}`;
}

console.log(describeSquare(4)); // prints: Area: 16 cm
console.log(describeSquare(4, "m")); // prints: Area: 16 m
console.log(describeSquare("big")); // prints: Please give a number.
console.log(describeSquare()); // prints: Please give a number.
```

The last call passes nothing, so `side` is `undefined`. `Number.isFinite(undefined)` is `false`, the guard returns early, and the caller gets a clear message instead of `Area: NaN cm`. The guard also catches what the older `isNaN(side)` let through: an empty answer `''`, `null` and `true` (each of which `isNaN` converts to a number, giving `Area: 0 cm` or `Area: 1 cm`). It is strict, so a typed `'4'` is rejected too: convert input first with `Number(text)` (3.1), then guard with `Number.isFinite`.

### Pure functions and side effects

A **side effect** is anything a function does besides handing back its return value: changing a variable outside itself, changing an array or object it was given, printing, saving a file. A **pure function** has none, and its answer depends only on its parameters. React's docs (week 11) define it in two lines: "It minds its own business. It does not change any objects or variables that existed before it was called." and "Same inputs, same output. Given the same inputs, a pure function should always return the same result."

```js
let total = 0;
function addToTotal(n) {
  total = total + n;
  return total;
}
console.log(addToTotal(2)); // prints: 2
console.log(addToTotal(2)); // prints: 4

function add(a, b) {
  return a + b;
}
console.log(add(0, 2)); // prints: 2
console.log(add(0, 2)); // prints: 2
```

`addToTotal(2)` gave two different answers to the same question, because it changes `total`, a variable outside itself. `add` uses only its parameters and changes nothing, so the same call always gives the same answer, which makes it easy to test and safe to call from anywhere. Programs still need side effects (printing is one); the habit is to keep them in a few obvious places and make the rest of your functions pure. That is the reason behind 10.1's advice not to change an array you were given. Airbnb: "Dealing with pure functions that return values is easier to reason about than side effects."

### Build your own function library

Once a function works, keep it. MDN: "It is a good idea to create your own library of utility functions to do these sorts of things." A **utility function** is a small, general helper (like `squared()`, `cubed()` or `factorial()` above) that is not tied to one program. A **library** here just means your own collection of them that you copy or reuse instead of rewriting each time. Later in the course you will learn to keep them in their own file and load them where needed.

### Closures: a function bundled with the place it was made

Here is something that looks impossible at first. A function creates a variable, returns an inner function, and finishes. Then the inner function is called later and *still sees that variable*.

```js
function makeGreeter() {
  const greeting = "Hello from inside makeGreeter";
  function sayIt() {
    console.log(greeting);
  }
  return sayIt;
}

const greeter = makeGreeter();
greeter(); // prints: Hello from inside makeGreeter
```

Tracing it: `makeGreeter()` runs. It creates `greeting`, defines `sayIt`, and returns `sayIt` itself (no parentheses, so the function is returned, not called; 8.2). `makeGreeter` is now finished. `greeter` holds the `sayIt` function. Calling `greeter()` logs `greeting`, even though the function that created `greeting` already ended.

This works because of a **closure**. MDN: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment)." In plain words: a function carries with it a link to the variables that were around it when it was **created**. It keeps that link for as long as the function itself exists. Each run of the outer function creates new variables and a new inner function linked to them (makeCounter, below, shows two).

The variable is still private, though. Code outside `makeGreeter` cannot reach `greeting` directly:

```js
// ERROR EXAMPLE: ReferenceError
function makeGreeter() {
  const greeting = "Hello from inside makeGreeter";
  return () => console.log(greeting);
}

const greeter = makeGreeter();
console.log(greeting);
```

`greeting` lives in `makeGreeter`'s function scope (9.1). Only functions written inside `makeGreeter` can see it.

### Lexical scope: where you write a variable decides who can see it

"Lexical" means "to do with the written text". MDN: "lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available." A function can see the variables in the blocks and functions it is **written inside**. Where it is later **called from** does not matter.

```js
const label = "outer";

function show() {
  console.log(label);
}

function run() {
  const label = "inside run";
  show();
}

run(); // prints: outer
```

Tracing it: `run()` creates its own `label` and then calls `show()`. But `show` was written at the top level, not inside `run`. So when `show` looks up `label`, it looks where it was *written* and finds `"outer"`. The `label` inside `run` is invisible to it.

### Every function gets a closure: makeCounter

MDN: "In JavaScript, closures are created every time a function is created, at function creation time." So a closure is not a special kind of function you opt into. Every function has one; you only *notice* it when a function outlives the place it was made.

The classic demonstration is a counter. Each call to `makeCounter()` creates a fresh `count` variable and a fresh inner function that is closed over *that* `count`.

```js
function makeCounter() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

const counterA = makeCounter();
const counterB = makeCounter();

console.log(counterA()); // prints: 1
console.log(counterA()); // prints: 2
console.log(counterB()); // prints: 1
console.log(counterA()); // prints: 3
```

Tracing it: `counterA` and `counterB` come from two separate runs of `makeCounter()`, so each has its own `count`, both starting at `0`. Calling `counterA()` adds one to *its* `count`: 1, then 2. Calling `counterB()` touches only *its* `count`, so it says 1. Back to `counterA()`, which carries on from 2 to 3.

Nothing outside can reset or change `count`. The only way to touch it is through the returned function. That is why closures are used to keep data private.

**Python habit that breaks here:** in Python, an inner function that wants to *reassign* an outer variable needs the `nonlocal` keyword, or the assignment creates a new local variable instead. JavaScript has no such keyword: `count++` inside the inner function changes the outer `count` directly.

### The classic closure bug: `var` in a loop

A closure keeps the *variable*, not a copy of its value. With `let`, a `for` loop makes a fresh variable for every round, so each function made in the loop remembers its own. With `var` there is only one variable for the whole loop (`var` ignores blocks, 9.1), and every function shares it.

```js
const withVar = [];
for (var i = 0; i < 3; i++) {
  withVar.push(() => i);
}
const withLet = [];
for (let j = 0; j < 3; j++) {
  withLet.push(() => j);
}
console.log(withVar[0](), withVar[1](), withVar[2]());
console.log(withLet[0](), withLet[1](), withLet[2]());
// prints: 3 3 3
// prints: 0 1 2
```

Trace: the `var` loop pushes three arrow functions that all read the same `i`. They are only called after the loop has finished, when `i` is `3`, so all three say `3`. The `let` loop gave each function its own `j`: 0, 1 and 2. (`withVar[0]()` reads the function at index 0, then calls it.) MDN's Closures guide calls this "Creating closures in loops: A common mistake": "Three closures have been created by the loop, but each one shares the same single lexical environment, which has a variable with changing values". It is an interview favourite and a real bug in old code. In your code `let` prevents it, and the project's ESLint flags the `var` (`no-var`); if you copy this demo into a lesson file, put `// eslint-disable-next-line no-var` above the `for (var` line.

## 10.3 How JavaScript runs your code: execution context, call stack, scope chain, hoisting

**Sources:** [MDN Reference, JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model) · [MDN Glossary, Call stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack) · [MDN Glossary, Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope) · [MDN Guide, Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) · [MDN Glossary, Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) · [MDN Reference, let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) · [MDN — Error: stack](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) · [MDN Glossary — Recursion](https://developer.mozilla.org/en-US/docs/Glossary/Recursion) · [MDN — debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger) · [Node.js — Debugger](https://nodejs.org/api/debugger.html) · [VS Code — Node.js debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging) · [VS Code — Debug code with Visual Studio Code](https://code.visualstudio.com/docs/debugtest/debugging)
**Skills:** execution_context, call_stack, read_stack_trace_frames, recursion_base_and_recursive_case, recursion_waits_on_stack, stack_overflow, scope_chain, scope_child_sees_parent_only, hoisting_definition, hoisting_kinds_compared, temporal_dead_zone, tdz_is_about_time, tdz_hides_outer_variable, debugger_breakpoint_run, debugger_step_controls, debugger_read_panels

Sections 8.1 to 10.2 taught you what functions, scope and closures **do**. This section is about **how** JavaScript keeps track of it all while your program runs. Nothing here is new syntax. It is the model that lets you predict the output of code you have never seen, which is exactly what an interviewer is checking with a what-does-this-print question.

### Every call gets its own execution context

When a function is called, JavaScript sets up a fresh record for that one call: its parameters, its local variables, and where to go back to when it finishes. MDN calls this record an execution context: "An execution context, also known generally as a stack frame, is the smallest unit of execution."

That is why two calls to the same function never mix up their variables. Each call has its own `total`:

```js
function addTax(price) {
  const total = price * 1.1;
  return Math.floor(total);
}
console.log(addTax(10));
console.log(addTax(50));
// prints: 11
// prints: 55
```

The first call's context held `price` as `10` and `total` as about `11`. When it returned, that context came off the stack. Its variables are discarded unless a function created during the call still refers to them, which is what kept `count` alive in makeCounter (10.2); MDN: "these variable bindings can outlive the execution context." The second call got a brand-new one with `price` as `50`. There is also one context for the file itself, made before any function runs, which holds your top-level variables and functions.

### The call stack: who called whom

Contexts are kept in a pile called the **call stack**. MDN: "When a script calls a function, the interpreter adds it to the call stack and then starts carrying out the function." And when it finishes: "When the current function is finished, the interpreter takes it off the stack and resumes execution where it left off in the last code listing."

The newest call always sits on top, and only the top one is running. Trace this one line by line, writing the stack down as you go:

```js
function greet(name) {
  console.log("greet starts");
  const text = shout(name);
  console.log("greet ends");
  return text;
}
function shout(word) {
  console.log("shout runs");
  return word.toUpperCase();
}
console.log(greet("ana"));
// prints: greet starts
// prints: shout runs
// prints: greet ends
// prints: ANA
```

| Moment | Stack (top first) |
|---|---|
| file starts | (file) |
| `greet("ana")` is called | greet, (file) |
| `greet` calls `shout(name)` | shout, greet, (file) |
| `shout` returns `"ANA"` | greet, (file) |
| `greet` returns `"ANA"` | (file) |

`greet ends` prints **after** `shout runs`, because `greet` was paused, still on the stack, until `shout` came off the top. This is the same order you see in an error's stack trace (1.3): the top `at` line is the function that was running when it broke, and each line below it is the call that led there.

### Reading a stack trace: the `at` lines are the call stack

In 1.3 you were told to find the line that names your file and ignore the rest. Now the rest makes sense: the `at` lines **are** the call stack at the moment of the crash, newest call on top. MDN: "The stack string proceeds from the most recent calls to earlier ones, leading back to the original global scope call."

```js
// ERROR EXAMPLE: TypeError
function loadUser() {
  return null;
}
function showName() {
  const user = loadUser();
  return user.name;
}
function render() {
  return showName();
}
render();
```

Saved as `app.js` and run, it prints (Node's own internal lines trimmed):

```text
file:///home/you/app.js:6
  return user.name;
              ^

TypeError: Cannot read properties of null (reading 'name')
    at showName (file:///home/you/app.js:6:15)
    at render (file:///home/you/app.js:9:10)
    at file:///home/you/app.js:11:1
```

Read it from the top as: where it broke, then who called that. `showName` broke on line 6, column 15; `render` had called it from line 9; and the top level of the file had called `render` from line 11. It is the stack table above, written by Node. `loadUser` is missing: it had already returned `null` and come off the stack before the crash. So the *cause* of a bug can sit in a function the trace never names; the trace tells you where to start looking. Lines that name `node:internal/...` are Node's own code, so skip those. (The format is Node's own: MDN marks `stack` as non-standard, and browsers print it differently.)

### A function that calls itself: recursion

A function may call itself. That is **recursion**. MDN: "A recursive function can receive two inputs: a base case (ends recursion) or a recursive case (resumes recursion)." The **base case** is the input answered directly, with no further call. The **recursive case** answers by calling the same function on a smaller input, one step closer to the base case.

```js
function countdown(n) {
  if (n === 0) {
    console.log("liftoff");
    return;
  }
  console.log(n);
  countdown(n - 1);
}
countdown(3);
// prints: 3
// prints: 2
// prints: 1
// prints: liftoff
```

`n === 0` is the base case: it prints and stops. Every other call prints `n` and calls `countdown(n - 1)`, a smaller problem.

### Each recursive call waits on the stack

When the answer of the inner call is part of the result, each call waits on the stack for the one it made, exactly as `greet` waited for `shout`:

```js
function sumTo(n) {
  if (n === 1) {
    return 1;
  }
  return n + sumTo(n - 1);
}
console.log(sumTo(4)); // prints: 10
```

Trace: `sumTo(4)` cannot finish until `sumTo(3)` answers, which waits for `sumTo(2)`, which waits for `sumTo(1)`. At that moment there are four `sumTo` contexts on the stack, `sumTo(1)` on top. `sumTo(1)` is the base case and returns `1`. Then the waiting calls finish in reverse order: `2 + 1` is `3`, `3 + 3` is `6`, `4 + 6` is `10`.

Recursion fits data that holds smaller copies of itself: folders inside folders, replies to replies, a Pokémon's evolution chain. For a plain count, a loop is simpler. A recursive function whose base case is never reached keeps calling until the stack runs out, which is the next heading.

**Python habit that breaks here:** Python stops a runaway recursion at about 1,000 calls with `RecursionError`. Node's limit comes from the stack's size, and the error is a `RangeError`.

### When the stack runs out: stack overflow

The stack has a size limit. MDN: "If the stack takes up more space than it was assigned", the program fails with what is called a stack overflow. A function that calls itself with nothing to stop it piles up contexts until that happens. In Node it is a `RangeError`:

```js
// ERROR EXAMPLE: RangeError
function forever() {
  forever();
}
forever();
```

Node says `RangeError: Maximum call stack size exceeded`. When you see that message, look for a function that calls itself (or two that call each other) with no way to stop.

### The scope chain: looking a name up, from the inside out

When code uses a variable, JavaScript looks for it in the current scope first. If it is not there, it looks in the scope around that one, then the one around that, out to the top level of the file and, last, the global scope. In your files (ES modules) the top level is **module scope** (MDN Scope: "Module scope: The scope for code running in module mode"); the global scope holds the built-ins such as `console`, `Math` and `globalThis`. This walk outward is the **scope chain**. MDN: "A nested function's access to the outer function's scope includes the enclosing scope of the outer function—effectively creating a chain of function scopes."

```js
const level = "module";
function outer() {
  const area = "outer";
  function inner() {
    const spot = "inner";
    console.log(spot, area, level);
  }
  inner();
}
outer();
// prints: inner outer module
```

`spot` is found right away in `inner`. `area` is not in `inner`, so the lookup goes one step out to `outer` and finds it. `level` takes two steps out, to the top level of the file (module scope). `console` takes one more step, to the global scope. The first match wins, so if `inner` had its own `area`, that one would be used and the outer one never reached (9.1, same name in an inner block).

### The chain only goes outward

MDN: "Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa." The inner function can read the outer function's variables. The outer function can never read the inner one's.

```js
// ERROR EXAMPLE: ReferenceError
function outer() {
  function inner() {
    const secret = 42;
  }
  inner();
  console.log(secret);
}
outer();
```

**Common mistake:** describing lexical scope as the outer function having access to the inner one. It is the other way round. If you remember one direction, remember the lookup: it starts where the code is and only ever walks **out**.

### Hoisting: what exists before its line runs

Before running a scope's code, JavaScript reads through it and sets up every declaration in it. MDN: "JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables, classes, or imports to the top of their scope, prior to execution of the code." Notice the word *appears*: nothing is moved. The names are simply registered before the first line runs, which is why some of them can be used early.

You have met hoisting three times already: `var` in 2.1, function declarations in 8.1, function expressions in 8.2. One thing to reconcile: 8.2 quoted MDN Learn saying function expressions "are not hoisted". Precisely, the **variable** that holds one is hoisted (into the TDZ for `let`/`const`, as `undefined` for `var`), but the function value only arrives on its line. MDN's reference calls `let`/`const`/`class` hoisting "type 3" and notes "Some prefer to see let, const, and class as non-hoisting". Expect both answers in interviews; the behaviour is the table below. Here is the whole picture in one place.

### The hoisting table

What happens if you use a name **above** the line that declares it?

| Declared with | Used before its line | Why |
|---|---|---|
| `function name() {}` | works fully | the whole function is ready before the first line |
| `var x = 5` | `undefined`, no error | the name exists, the value arrives on its line |
| `let` / `const` / `class` | `ReferenceError` | the name exists but is in the temporal dead zone |
| `const f = function () {}` or an arrow | `ReferenceError` | it is a `const`, so the same rule |
| `var f = function () {}` | `TypeError: f is not a function` | `f` is `undefined` until its line, and `undefined` cannot be called |

MDN on the `var` row: "Being able to reference a variable in its scope before the line it is declared, without throwing a ReferenceError, but the value is always undefined."

```js
console.log(ready());
console.log(count);
function ready() {
  return "declared function works";
}
var count = 5;
// prints: declared function works
// prints: undefined
```

```js
// ERROR EXAMPLE: TypeError
console.log("before");
early();
var early = function () {
  return "too late";
};
// prints: before
```

The last row is the sneaky one: the error is a `TypeError`, not a `ReferenceError`, because the name `early` exists (as `undefined`) and the problem is that you tried to call `undefined`.

In real code you never rely on any of this: declare before use. An opt-in ESLint rule, `no-use-before-define` (Airbnb turns it on), flags a name used above its declaration. It checks **position**, not time, so it is stricter than the language: it also flags the valid `report()` example in the next-but-one heading.

### The temporal dead zone

For `let`, `const` and `class`, the stretch from the start of the block until the declaration line has **run** is called the **temporal dead zone** (TDZ). MDN: "While inside the TDZ, the variable has not been initialized with a value, and any attempt to access it will result in a ReferenceError."

```js
// ERROR EXAMPLE: ReferenceError
console.log("start");
console.log(points);
const points = 10;
// prints: start
```

Node says `ReferenceError: Cannot access 'points' before initialization`. That message is your clue that you are in a TDZ. Compare it with `points is not defined`, which means there is no such name in any scope on the chain.

**Python habit that breaks here:** Python's `UnboundLocalError` (a local name used before it is assigned) is the same idea under another name, inside a function. At the top level, as in the example above, Python says `NameError` instead.

### "Temporal" means time, not position

The TDZ is about **when** the line runs, not where it is written. MDN: the zone "depends on the order of execution (time) rather than the order in which the code is written (position)". A function written above a `let` can use it, as long as the function is **called** after the `let` line has run:

```js
const report = () => console.log(score);
const score = 3;
report();
// prints: 3
```

`report` mentions `score` on the first line, but nothing runs inside `report` until the third line. By then `score` has been set, so it works. Move `report();` above `const score = 3;` and the same code throws a `ReferenceError`.

### A TDZ hides the outer variable too

Because the inner `let` or `const` is registered at the top of its block, it hides an outer variable with the same name for the **whole** block, even the lines above it. MDN, on its example: the lookup "reads the x from the const x = 2 declaration instead, which is not yet initialized, and throws a ReferenceError."

```js
// ERROR EXAMPLE: ReferenceError
const x = 1;
{
  console.log(x);
  const x = 2;
}
```

You might expect `1` from the outer `x`. But the scope chain stops at the first match, and the first match is the inner `x`, which is still in its dead zone.

### Watching the stack live: the debugger

Writing the stack table by hand is how you learn it. Professionals also let a tool show it. A **debugger** pauses a running program at a line you choose, a **breakpoint**, shows every variable and the whole call stack at that moment, and then runs on one line at a time. Node has one built in (Node docs: "Node.js includes a command-line debugging utility."), and VS Code drives it with buttons.

**Set a breakpoint and run.** Click in the gutter to the left of a line number; a red dot appears. Then open a JavaScript Debug Terminal (Command Palette, then Debug: Create JavaScript Debug Terminal) and run `node yourfile.js` in it as usual. VS Code's docs: "the JavaScript Debug Terminal will automatically debug any Node.js process you run in it." The program stops just before the red-dot line runs.

You can also write the breakpoint into the code. MDN: "The debugger statement invokes any available debugging functionality, such as setting a breakpoint. If no debugging functionality is available, this statement has no effect."

```js
function addTax(price) {
  const tax = price * 0.1;
  debugger;
  return price + tax;
}
console.log(addTax(50)); // prints: 55
```

Run with plain `node`, `debugger;` does nothing and the file prints `55`. Run in the Debug Terminal, it pauses on that line. Delete it when you are done: ESLint's recommended rules flag it (`no-debugger`), because a forgotten one pauses the program for whoever runs it next.

**Step through.** While paused, the debug toolbar runs the program in small pieces. VS Code's docs: Step Over (F10), "Run the current line without stepping into function calls on that line."; Step Into (F11), "Step into the function called on the current line."; Step Out (Shift+F11), "Finish the current function and pause in the calling function." Continue (F5) runs on to the next breakpoint.

**Read the panels.** VS Code's docs: "When execution pauses at the breakpoint, inspect values in the VARIABLES section and review the function calls in the CALL STACK section." VARIABLES groups the names by scope, the innermost first, which is the scope chain from above. CALL STACK lists the same frames a stack trace prints, top first. Paused inside `addTax`, CALL STACK shows `addTax` above the file's top level, and VARIABLES shows `price` as `50` and `tax` as `5`.

## 11.1 Iterators: callbacks and array methods

**Sources:** [Codecademy, Iterators](https://www.codecademy.com/courses/introduction-to-javascript/lessons/javascript-iterators/exercises/intro) · [MDN, Arrays](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays) · [MDN, Loops](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops) · [MDN Reference, Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) · [MDN Reference, Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) · [MDN Reference, Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) · [MDN — Array.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) · [MDN — Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) · [MDN — Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) · [MDN — Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
**Skills:** iterators_concept, forEach, array_map, map_non_mutating, array_filter, findIndex, findIndex_minus_one, array_at_method, map_as_loop, filter_as_loop, function_expression_preview, some, every, array_includes, forEach_returns_undefined, callback_three_forms, callback_index_array_args, map_parseint_trap, reduce, reduce_accumulator, reduce_initial_value, choose_iterator, array_find, find_undefined_no_match, sort_default_text_order, sort_compare_function, sort_mutates_in_place, sort_without_mutating, method_chaining

Two words from 8.2 carry this whole section:

- a **callback** is a function you pass into another function as an argument, so the other function can call it;
- a **higher-order function** is a function that takes a function as an argument (or returns one).

Every method in this section is a higher-order function. You give it a callback, and it calls your callback for you.

### Array methods that loop for themselves

Codecademy: "Iterators are methods called on arrays to manipulate elements and return values." Codecademy calls these **iterators**; MDN calls them **iterative methods**. Each is a built-in array method that walks through the array one element at a time, like a loop (7.1), and runs your callback on each element. (In JavaScript an *iterator* is something else: the object `for...of` uses to step through strings, arrays, Maps and Sets, and since 2025 iterators have their own `.map()` and `.filter()`. In code reviews and interviews, say "array methods" or "iterative methods".) You write what should happen to *one* element; the method handles the looping.

Why do they exist? Loops over arrays all look much the same: a counter or `for...of`, a body, often a new array being filled. Iterator methods remove that repeated scaffolding, so the code says *what* you want (double these, keep those) instead of *how* to step through.

### .forEach(): do something with each element

`.forEach()` runs your callback once for every element, in order. Codecademy: ".forEach() will execute the same code for each element of an array."

```js
const fruits = ["mango", "papaya", "pineapple"];

fruits.forEach(fruit => {
  console.log(`I want to eat a ${fruit}`);
});
// prints: I want to eat a mango
// prints: I want to eat a papaya
// prints: I want to eat a pineapple
```

Tracing it: `forEach` calls the arrow function three times. The first time, the parameter `fruit` holds `"mango"`; the second time `"papaya"`; the third time `"pineapple"`. You choose the parameter name. `fruit` is a good one because it says what one element is.

Two things to know. `forEach`, `map`, `filter` and the others actually pass your callback three arguments, `(element, index, array)`; most callbacks only name the first. And `.forEach()` cannot be stopped early with `break`, and does not wait for `await` (a later topic): when you need either, use `for...of` (7.1).

### .map(): build a new array of changed items

`.map()` also calls your callback once per element, but it **collects whatever your callback returns** into a new array, and gives you that array. MDN: "We give a function to the map(), and map() calls the function once for each item in the array, passing in the item." Codecademy: ".map() works in a similar manner to .forEach()— the major difference is that .map() returns a new array."

```js
const numbers = [1, 2, 3, 4, 5];
const bigNumbers = numbers.map(number => number * 10);

console.log(bigNumbers); // prints: [ 10, 20, 30, 40, 50 ]
console.log(numbers); // prints: [ 1, 2, 3, 4, 5 ]
```

The callback here has a concise body (10.2), so `number * 10` is returned automatically, and `.map()` puts each returned value into the new array in the same position.

Look at the second line of output: `numbers` is unchanged. `.map()` is **non-mutating**: `.map()` itself does not change the original array (5.1). (Your callback could, through that third argument, and should not.) Codecademy: "Notice that the elements in numbers were not altered and bigNumbers is a new array." If you want to keep the result, store it in a variable, as above.

**Common mistake:** braces in the callback without `return`. The callback then returns `undefined` for every element, and `.map()` dutifully collects those.

```js
const tripled = [1, 2, 3].map(n => {
  n * 3;
});

console.log(tripled); // prints: [ undefined, undefined, undefined ]
```

Either drop the braces (`n => n * 3`) or write `return n * 3;` inside them.

### .filter(): keep only the items that pass a test

`.filter()` calls your callback on each element. Your callback should return `true` or `false`; strictly, any truthy value keeps the element and any falsy value drops it (6.1). Codecademy: "The callback function for the .filter() method should return true or false depending on the element that is passed to it." MDN describes what happens next: "If the function returns true, then the item is added to a new array. Finally it returns the new array."

```js
const words = ["chair", "music", "pillow", "brick", "pen", "door"];
const shortWords = words.filter(word => word.length < 6);

console.log(shortWords); // prints: [ 'chair', 'music', 'brick', 'pen', 'door' ]
```

Tracing it: for `"chair"`, `5 < 6` is `true`, so it is kept. For `"pillow"`, `6 < 6` is `false`, so it is left out. The others are all shorter than 6 and kept. Like `.map()`, `.filter()` leaves `words` itself unchanged.

### .findIndex(): where is the first match?

`.findIndex()` gives you a **position**, not a new array. Codecademy: "Calling .findIndex() on an array will return the index of the first element that evaluates to true in the callback function." Remember indexes start at 0 (2.2).

```js
const jumbledNums = [123, 25, 78, 5, 9];
const lessThanTen = jumbledNums.findIndex(num => num < 10);

console.log(lessThanTen); // prints: 3
console.log(jumbledNums[lessThanTen]); // prints: 5
```

Tracing it: `123 < 10` is false, `25 < 10` false, `78 < 10` false, `5 < 10` true. That is index 3, so `.findIndex()` stops there and returns `3`. It never even looks at `9`.

If no element passes the test, there is no index to give, so `.findIndex()` returns `-1`. Codecademy: "If there isn't a single element in the array that satisfies the condition in the callback, then .findIndex() will return -1."

```js
const jumbledNums = [123, 25, 78, 5, 9];
const greaterThan1000 = jumbledNums.findIndex(num => num > 1000);

console.log(greaterThan1000); // prints: -1
```

`-1` can never be a real index, which is why it is used to mean "not found". Check for it before you use the result:

```js
const jumbledNums = [123, 25, 78, 5, 9];
const position = jumbledNums.findIndex(num => num > 1000);

if (position === -1) {
  console.log("No match"); // prints: No match
} else {
  console.log(jumbledNums[position]);
}
```

**Python habit that breaks here:** in Python, `list[-1]` gives you the last item. In JavaScript, square brackets with `-1` look for an element *named* `-1`, find nothing, and give `undefined`. So a forgotten "not found" check does not crash; it silently gives you `undefined`. (`jumbledNums.at(-1)` is the method that does mean "the last item", 4.2; it would quietly give you the last element here, which is just as wrong.)

```js
const jumbledNums = [123, 25, 78, 5, 9];
console.log(jumbledNums[-1]); // prints: undefined
```

### `.at()`: counting from the end, and its trap

`.at()` (met on strings in 4.2) reads a position and accepts negative numbers. MDN: "The at() method of Array instances takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array." So `.at(-1)` is the last item, the short form of `arr[arr.length - 1]` (7.1).

```js
const nums = [4, 7, 9];
console.log(nums.at(-1)); // prints: 9
console.log(nums.at(0)); // prints: 4
const where = nums.findIndex(num => num > 100);
console.log(where); // prints: -1
console.log(nums.at(where)); // prints: 9
```

The last two lines are the trap from the Python note above: a failed `.findIndex()` gives `-1`, and `.at(-1)` turns that into the last element without any error. Check for `-1` before you use a found position, however you read it.

### .find(): give me the first match itself

`.findIndex()` tells you **where** the first match is. Often you want the match itself, and `.find()` gives you that directly. MDN: "The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function."

```js
const jumbledNums = [123, 25, 78, 5, 9];
const firstSmall = jumbledNums.find(num => num < 10);
const whereSmall = jumbledNums.findIndex(num => num < 10);
console.log(firstSmall);
console.log(whereSmall);
// prints: 5
// prints: 3
```

Same test, same stopping point (it stops at `5` and never looks at `9`). The only difference is what comes back: `.find()` returns the element, `.findIndex()` returns its index.

When nothing passes, `.find()` has no element to give. MDN: "If no values satisfy the testing function, undefined is returned." Not `-1`: that is `.findIndex()`'s "not found".

```js
const jumbledNums = [123, 25, 78, 5, 9];
const huge = jumbledNums.find(num => num > 1000);
console.log(huge);
if (huge === undefined) {
  console.log("No match");
}
// prints: undefined
// prints: No match
```

**Common mistake:** checking a `.find()` result with `=== -1`. "Not found" is never `-1` (only a found element that happens to be `-1` is), so the "not found" branch never runs, and the `undefined` sneaks through to the next line. One edge case: if the array itself can hold `undefined`, a found `undefined` looks the same as "not found"; use `.findIndex()` or `.some()` there.

### map() and filter() are loops you did not have to write

MDN frames both methods as special-purpose loops. You could build the same results yourself with `for...of` (7.1) and `push()`:

```js
const cats = ["Leopard", "Serval", "Jaguar", "Tiger", "Caracal", "Lion"];

const upperLoop = [];
for (const cat of cats) {
  upperLoop.push(cat.toUpperCase());
}

console.log(upperLoop); // prints: [ 'LEOPARD', 'SERVAL', 'JAGUAR', 'TIGER', 'CARACAL', 'LION' ]
```

Now the `.map()` version. MDN: "You can use map() to do something to each item in a collection and create a new collection containing the changed items". MDN's own example passes a named function, `toUpper`, as the callback:

```js
const cats = ["Leopard", "Serval", "Jaguar", "Tiger", "Caracal", "Lion"];

function toUpper(text) {
  return text.toUpperCase();
}

const upperCats = cats.map(toUpper);
console.log(upperCats); // prints: [ 'LEOPARD', 'SERVAL', 'JAGUAR', 'TIGER', 'CARACAL', 'LION' ]
```

The empty array, the loop and the `push()` are gone. `.map()` does all three; you only supply the "change one item" part.

`.filter()` is the same idea for "keep some items". MDN: "the function we pass in returns a boolean: if it returns true, then the item is included in the new array." (A **boolean** is a `true` or `false` value, 2.2.)

```js
const cats = ["Leopard", "Serval", "Jaguar", "Tiger", "Caracal", "Lion"];

const lCats = cats.filter(cat => cat.startsWith("L"));
console.log(lCats); // prints: [ 'Leopard', 'Lion' ]
```

The callback `cat => cat.startsWith("L")` is an arrow function written right inside the call, the compact form you learned in 8.2. MDN notes that `map()` and `filter()` "are both often used with function expressions", and this short arrow form is by far the most common way you will see callbacks written.

### .some() and .every(): yes-or-no questions about the whole array

Codecademy introduces these two by sending you to the MDN docs to look them up (10.1), which is the habit to build: when you need an array method you have not met, check the documentation.

- `.some()` returns `true` if **at least one** element passes your test.
- `.every()` returns `true` only if **all** elements pass your test (and `true` for an empty array: nothing failed. `[].some(...)` is `false`. A classic interview question).

Both return a single boolean, not a new array.

```js
const words = ["unique", "uncanny", "pique", "oxymoron", "guise"];

console.log(words.some(word => word.length < 6)); // prints: true
console.log(words.every(word => word.length > 5)); // prints: false
```

Codecademy on the first line: "The .some() method returned true, which means there are some words in the array that are shorter than six characters." (`"pique"` and `"guise"` have 5.) The second line asks whether every word has more than 5 characters. Those same two words fail, so the answer is `false`.

### `.includes()`: is this exact value in the array?

Arrays have the same yes/no check strings have (4.2). MDN: "The includes() method of Array instances determines whether an array includes a certain value among its entries, returning true or false as appropriate." It takes a **value**, not a callback.

```js
const tags = ["js", "css", "html"];
console.log(tags.includes("css")); // prints: true
console.log(tags.includes("CSS")); // prints: false
console.log([1, 2, 3].includes("2")); // prints: false
console.log([NaN].includes(NaN)); // prints: true
```

It compares like `===`: no type conversion, so the string `"2"` is not the number `2`. MDN names the one exception: "This algorithm works like strict equality === (where -0 and +0 are considered equal), with the exception that NaN is considered equal to itself." (`[NaN].indexOf(NaN)` is `-1`; `.includes()` finds it.) Which one to reach for: a value you know, `.includes()`; a test, `.some()`; a position, `.findIndex()`.

**Python habit that breaks here:** Python writes `"css" in tags`. In JavaScript, `in` asks about keys, not values: `"css" in tags` is `false`, and `0 in tags` is `true` because index 0 exists. Use `tags.includes("css")`.

### .forEach() always returns undefined

`.forEach()` is only for *doing* something with each element, like logging it. It does not collect anything. Codecademy: "The return value for .forEach() will always be undefined."

**Common mistake:** using `.forEach()` when you wanted a new array.

```js
const doubled = [1, 2, 3].forEach(n => n * 2);
console.log(doubled); // prints: undefined
```

The callback did return `2`, `4` and `6`, but `.forEach()` threw those away. If you want the results, use `.map()`.

### Three ways to write the callback

Any of the function forms you know can be the callback. Codecademy: "we can use any of the three examples to supply a callback function as an argument to the iterator."

```js
const nums = [1, 2];

// 1. An arrow function, written inside the call
nums.forEach(n => console.log(n * 10));

// 2. A function expression, also written inside the call
nums.forEach(function (n) {
  console.log(n * 100);
});

// 3. A named function defined first, then passed by name
function printTimesThousand(n) {
  console.log(n * 1000);
}
nums.forEach(printTimesThousand);

// prints: 10
// prints: 20
// prints: 100
// prints: 200
// prints: 1000
// prints: 2000
```

Form 3 is worth it when the callback is long or you reuse it. For short, one-off callbacks, current code writes form 1, an arrow (Airbnb: "When you must use an anonymous function (as when passing an inline callback), use arrow function notation"; Google prefers arrows for nested functions too). Form 2 is what you will read in older code, and in the instructor's.

**Common mistake:** adding parentheses when passing a named function. `printTimesThousand` means "here is the function". `printTimesThousand()` means "run it now", with no argument, and pass whatever it returns to `.forEach()`.

```js
// ERROR EXAMPLE: TypeError
function shout(word) {
  console.log(word.toUpperCase());
}

["a", "b"].forEach(shout());
```

`shout()` runs immediately with `word` set to `undefined`, and `undefined` has no `toUpperCase()` method, so it throws a `TypeError` before `.forEach()` even starts.

### The callback also gets the index and the whole array

So far every callback had one parameter. The method actually passes three arguments every round. MDN, on `.map()`: "The function is called with the following arguments:" the **element** ("The current element being processed in the array."), the **index** ("The index of the current element being processed in the array.") and the **array** ("The array map() was called upon."). `.forEach()`, `.filter()`, `.find()`, `.findIndex()`, `.some()` and `.every()` pass the same three. Name only as many as you need; a function ignores arguments it has no parameter for.

```js
const names = ["ana", "ben", "cy"];
names.forEach((name, index, array) => {
  console.log(`${index + 1}/${array.length}: ${name}`);
});
const numbered = names.map((name, i) => `${i}-${name}`);
console.log(numbered);
// prints: 1/3: ana
// prints: 2/3: ben
// prints: 3/3: cy
// prints: [ '0-ana', '1-ben', '2-cy' ]
```

The instructor writes `usernames.forEach((_, i, arr) => { ... })`. When you need a later parameter but not the element, a lone `_` is the usual name for "I am ignoring this one". It is an ordinary parameter name, not special syntax.

### The `map(parseInt)` trap

Those extra arguments are why passing a built-in function straight to `.map()` can go wrong. MDN's own example is `["1", "2", "3"].map(parseInt)`: "While one might expect [1, 2, 3], the actual result is [1, NaN, NaN]. parseInt is often used with one argument, but takes two."

```js
const typed = ["1", "2", "3"];
console.log(typed.map(parseInt)); // prints: [ 1, NaN, NaN ]
console.log(typed.map(text => parseInt(text, 10))); // prints: [ 1, 2, 3 ]
console.log(typed.map(Number)); // prints: [ 1, 2, 3 ]
```

Trace the first line: `.map()` calls `parseInt("1", 0, typed)`, then `parseInt("2", 1, typed)`, then `parseInt("3", 2, typed)`. The index lands in `parseInt`'s second parameter, the radix (10.2). Radix 0 means "work it out", which reads `1`; there is no base 1, so `NaN`; and base 2 has only the digits 0 and 1, so `"3"` is `NaN`. Wrap the call in an arrow so you choose the arguments, or pass `Number`, which uses only one.

### .reduce(): boil the whole array down to one value

`.reduce()` walks through the array and combines all the elements into **one** value, such as a total. Codecademy: "The .reduce() method returns a single value after iterating through the elements of an array, thereby reducing the array."

Its callback takes two parameters. Codecademy: "The callback function has two parameters, accumulator and currentValue." (Strictly it receives up to four arguments: accumulator, currentValue, then the index and the array, like the other methods' `(element, index, array)`. Most code uses the first two.)

- The **accumulator** is the running result so far. ("Accumulate" means "build up".) Whatever your callback returns becomes the accumulator for the next step.
- The **currentValue** is the element being looked at right now.

```js
const numbers = [1, 2, 4, 10];

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
});

console.log(sum); // prints: 17
```

With no starting value given, the accumulator begins as the **first element**, and the callback starts from the second:

| Step | accumulator | currentValue | callback returns |
|---|---|---|---|
| 1 | 1 | 2 | 3 |
| 2 | 3 | 4 | 7 |
| 3 | 7 | 10 | 17 |

After the last step there are no elements left, so `.reduce()` returns the last value, `17`.

### Giving reduce a starting value

You can pass a second argument to `.reduce()`, after the callback. Codecademy: "The .reduce() method can also take an optional second parameter to set an initial value for accumulator". The accumulator then starts as that value, and the callback runs on **every** element, including the first.

```js
const numbers = [1, 2, 4, 10];

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 100);

console.log(sum); // prints: 117
```

| Step | accumulator | currentValue | callback returns |
|---|---|---|---|
| 1 | 100 | 1 | 101 |
| 2 | 101 | 2 | 103 |
| 3 | 103 | 4 | 107 |
| 4 | 107 | 10 | 117 |

**Common mistake:** leaving out the starting value when the array might be empty. With no elements and no starting value, there is nothing to start the accumulator with, and MDN's reference page says a `TypeError` is thrown. With a starting value, an empty array simply returns that value.

```js
const empty = [];
console.log(empty.reduce((acc, cur) => acc + cur, 0)); // prints: 0
```

```js
// ERROR EXAMPLE: TypeError
const empty = [];
console.log(empty.reduce((acc, cur) => acc + cur));
```

A safe habit: always pass the starting value.

### .sort(): putting an array in order

`.sort()` rearranges an array. With nothing inside the parentheses (no compare function), strings come out in character-code order. That matches alphabetical order only when every word has the same capitals and no accents, as here: `['apple', 'Banana'].sort()` gives `[ 'Banana', 'apple' ]`. For real alphabetical order write `.sort((a, b) => a.localeCompare(b))` (compare functions are two headings down). (`.sort()` takes a callback but MDN does not count it as an iterative method.)

```js
const months = ["March", "Jan", "Feb", "Dec"];
months.sort();
console.log(months);
// prints: [ 'Dec', 'Feb', 'Jan', 'March' ]
```

### The number trap: .sort() compares as text

Try the same thing with numbers and the order looks broken:

```js
const nums = [1, 30, 4, 21, 100000];
nums.sort();
console.log(nums);
// prints: [ 1, 100000, 21, 30, 4 ]
```

It is not broken; it is doing exactly what it says. MDN: "If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value." As text, `"100000"` starts with `"1"`, so it comes before `"21"`, the same way `"apple"` comes before `"banana"`. Text is compared one character at a time, not by size.

**Python habit that breaks here:** Python's `sorted([1, 30, 4])` sorts numbers by size. JavaScript's `.sort()` with no function never does. It can look right by luck: `[3, 1, 2].sort()` gives `[ 1, 2, 3 ]`, but `[10, 9, 1].sort()` gives `[ 1, 10, 9 ]`.

### A compare function decides the order

To sort by something other than text, you pass `.sort()` a callback with two parameters, `a` and `b`: any two elements it wants to compare. Your callback returns a number, and the **sign** of that number is the answer. MDN:

- "A negative value indicates that a should come before b."
- "A positive value indicates that a should come after b."
- "Zero or NaN indicates that a and b are considered equal."

For numbers, subtracting does all three at once. MDN: "To memorize this, remember that (a, b) => a - b sorts numbers in ascending order."

```js
const nums = [1, 30, 4, 21, 100000];
nums.sort((a, b) => a - b);
console.log(nums);
nums.sort((a, b) => b - a);
console.log(nums);
// prints: [ 1, 4, 21, 30, 100000 ]
// prints: [ 100000, 30, 21, 4, 1 ]
```

Trace one comparison: with `a` as `30` and `b` as `4`, `a - b` is `26`, positive, so `30` goes after `4`. Swap to `b - a` and every sign flips, so the order flips: biggest first.

### .sort() changes the original

Unlike `.map()` and `.filter()`, `.sort()` does not build a new array. MDN: "Note that the array is sorted in place, and no copy is made." It is a mutating method, like `.push()` (5.1). It also returns that same array, so `const sorted = scores.sort(...)` does not give you a separate copy: `sorted` and `scores` are two names for one array.

```js
const scores = [40, 10, 30];
scores.sort((a, b) => a - b);
console.log(scores);
// prints: [ 10, 30, 40 ]
```

To keep the original order, sort a copy. MDN: "To sort the elements in an array without mutating the original array, use toSorted()." It takes the same compare function, and works in every current browser (MDN: Baseline since July 2023) and in Node 20 and later. Copying first with `.slice()` (5.1) and sorting the copy also works, including in older engines; you will also see `[...scores].sort()` (spread, 12.3):

```js
const scores = [40, 10, 30];
const ranked = scores.toSorted((a, b) => b - a);
const ranked2 = scores.slice().sort((a, b) => b - a);
console.log(ranked);
console.log(ranked2);
console.log(scores);
// prints: [ 40, 30, 10 ]
// prints: [ 40, 30, 10 ]
// prints: [ 40, 10, 30 ]
```

`toSorted()` has copying siblings that also leave the original alone: `toReversed()` (a reversed copy), `toSpliced()` (a copy with items removed or inserted) and `with(index, value)` (a copy with one position replaced: `[1, 2, 3].with(0, 99)` is `[ 99, 2, 3 ]`). Recognise them; they are as new as `toSorted()`.

### Choosing the right array method

Codecademy: "it is also important to learn how to choose the correct method for different scenarios." Ask what you want back:

| You want | Use | It returns |
|---|---|---|
| to do something with each element (log it, save it) | `.forEach()` | `undefined` |
| a new array with every element changed | `.map()` | new array, same length |
| a new array with only some elements | `.filter()` | new array, same length or shorter |
| the position of the first match | `.findIndex()` | an index, or `-1` |
| the first match itself | `.find()` | the element, or `undefined` |
| the same elements in a new order | `.sort()` / `.toSorted()` | the same array, sorted / a new sorted array |
| "does at least one pass?" | `.some()` | `true` or `false` |
| "do all of them pass?" | `.every()` | `true` or `false` |
| one combined value (total, longest, count) | `.reduce()` | one value |
| to stop early (`break`) or wait with `await` | a `for...of` loop (7.1) | (a loop returns nothing) |

One example, three questions about the same array:

```js
const prices = [4, 12, 7, 20];

const doubledPrices = prices.map(price => price * 2);
const cheap = prices.filter(price => price < 10);
const total = prices.reduce((acc, price) => acc + price, 0);

console.log(doubledPrices); // prints: [ 8, 24, 14, 40 ]
console.log(cheap); // prints: [ 4, 7 ]
console.log(total); // prints: 43
```

### Chaining: one method's result feeds the next

`.filter()` and `.map()` return arrays, so you can call the next array method straight on the result, with no variable in between. That is **method chaining**. MDN writes it as ordinary advice: "If you want to delete the element instead, chain a filter() method".

```js
const prices = [4, 12, 7, 20];
const cheapDoubledTotal = prices
  .filter(price => price < 10)
  .map(price => price * 2)
  .reduce((acc, price) => acc + price, 0);
console.log(cheapDoubledTotal); // prints: 22
```

Read it top to bottom as a pipeline: `[4, 12, 7, 20]`, keep the cheap ones `[4, 7]`, double them `[8, 14]`, add them up `22`. One method per line, each line starting with its dot, is how the formatter lays out a chain this long. A chain continues only while each step returns an array: `.reduce()` returns a number here, so it ends the chain, and `.forEach()` returns `undefined`. MDN: "Unlike map(), forEach() always returns undefined and is not chainable."

Also recognise, from code you will read: `.findLast()` and `.findLastIndex()` (search from the end), `.flat()` and `.flatMap()` (flatten arrays inside an array: `[[1, 2], [3]].flat()` is `[ 1, 2, 3 ]`), and `Array.from()` (make a real array from an array-like list, such as the DOM lists in week 5).

---

## 12.1 Objects: building one and reading what is inside

**Sources:** [MDN — JavaScript object basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics) · [Codecademy — Objects (lesson)](https://www.codecademy.com/courses/introduction-to-javascript/lessons/objects/exercises/intro) · [Codecademy — Advanced Objects (lesson)](https://www.codecademy.com/courses/introduction-to-javascript/lessons/advanced-objects/exercises/intro) · [Codecademy — Objects cheatsheet](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-objects/cheatsheet) · [MDN — typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) · [MDN — Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
**Skills:** object_definition, properties_methods_terms, empty_object_literal, object_members_syntax, quoted_keys, key_naming_restrictions, member_values_anything, data_members_are_properties, function_members_are_methods, property_vs_method, method_shorthand, object_literal_term, why_object_literals, dot_notation, missing_property_undefined, object_instance_methods, object_namespace, array_property_index, nested_objects, array_of_objects, array_is_array, typeof_null_object, bracket_notation, bracket_required_invalid_keys, chain_nested_access, associative_arrays, prefer_dot_notation, bracket_with_variable

### What an object is

An **object** is a collection of related data and/or functionality, kept together under one name. Think of a contact card: a name, an age, a phone number, all about the same person.

Why objects exist: without them, information about one thing gets scattered across separate variables (`personName`, `personAge`, `personCity`) and nothing in the code says they belong together. An object puts them in one container.

Inside an object, the pieces have special names:

- A named value stored in an object is called a **property**. (It is not a variable: code inside the object cannot use it by its bare name, as 12.2 shows.)
- A property whose value is a function is called a **method**. "Property" on its own usually means the data ones.

### Creating an object: `{ }`, keys, colons and commas

`{ }` (a pair of curly braces) used as a value creates an object. With nothing between the braces, you get an **empty object**: a valid object that holds nothing yet, so there is not much you can do with it.

```js
const person = {};
console.log(person);
// prints: {}
```

To put something inside, write **key-value pairs**, also called **members**:

- The **key** is the member's name. It comes first.
- `:` is a colon. It separates the key from its value.
- `,` is a comma. It separates one key-value pair from the next.

```js
const person = {
  name: "Ana",
  age: 30,
};
console.log(person);
// prints: { name: 'Ana', age: 30 }
```

The comma after `30` is optional. JavaScript allows a comma after the last pair, and many people leave it there so that adding a new line later only touches one line. Prettier, this folder's formatter, adds it for you on multi-line objects (its `trailingComma` default became `"all"` in version 3.0).

Notice that Node prints strings inside an object with single quotes. That is just how Node displays them; it does not change the value.

**Common mistake:** forgetting the comma between two pairs. JavaScript cannot tell where one member ends and the next begins.

```js
// ERROR EXAMPLE: SyntaxError
const person = {
  name: "Ana"
  age: 30
};
```

### What a key can be

Every key is a string (or a Symbol, a later topic); a number key such as `1:` is turned into the string `'1'`. When the key is a plain name with no special characters, JavaScript lets you leave the quotation marks off, which is why `name:` above needs no quotes.

The rule: a key must be a quoted string, a valid identifier, or a number. (A key can also be computed: `[expression]: value` uses the value of the expression as the key, MDN's "computed property names". `const k = 'age'; { [k]: 30 }` makes `{ age: 30 }`.) An **identifier** is a name you could also use for a variable: letters, digits, `_` and `$`, not starting with a digit, no spaces. If the key has a space or a dash in it, it is not a valid identifier, so it must be written as a quoted string. Keys are looser than variable names in one way: reserved words such as `class` or `new` work unquoted as keys (`{ class: 'fullstack-12' }`, as the instructor writes).

```js
const car = {
  "Fuel Type": "diesel",
  wheels: 4,
};
console.log(car);
// prints: { 'Fuel Type': 'diesel', wheels: 4 }
```

### What a value can be

The value of a member can be pretty much anything: a number, a string, a boolean, an array, another object, or a function.

```js
const person = {
  name: ["Ana", "Lopez"],
  age: 30,
  likesTea: true,
};
console.log(person.likesTea);
// prints: true
```

(The `person.likesTea` part is explained under "Reading a member: dot notation" below.)

### Properties and methods

The two kinds of member have names:

- A member whose value is **data** (a string, number, array, and so on) is a **property**.
- A member whose value is a **function** is a **method**. The key is the method's name; the value is an anonymous function expression, written `function () { ... }` (JavaScript names it after the key: `person.greet.name` is `'greet'`).

```js
const person = {
  name: "Ana",
  age: 30,
  greet: function () {
    console.log("Hello!");
  },
};
person.greet();
// prints: Hello!
```

Here `name` and `age` are properties, and `greet` is a method.

An easy way to keep them apart: **a property is what an object has; a method is what an object does.** A person *has* a name. A person *does* greet.

### The shorter way to write a method

Writing `greet: function () { ... }` every time is wordy. Inside an object, there is a shorter syntax for methods: leave out the colon and the word `function`, and write the name straight before the parentheses.

```js
const person = {
  name: "Ana",
  greet() {
    console.log("Hello!");
  },
};
person.greet();
// prints: Hello!
```

`greet() { ... }` and `greet: function () { ... }` do the same job. Most modern code uses the short form, called **method shorthand** (Airbnb: "Use object method shorthand", ESLint `object-shorthand`).

### Object literals, and why use one

An object written out directly in your code, between `{ }`, is called an **object literal**. "Literal" because you have literally written out its contents as you create it. Every object so far has been an object literal.

Why not just use an array? An array identifies items by position (`[0]`, `[1]`). An object identifies items by **name**. When you want to say "the age" rather than "item number 1", an object is easier to work with.

### Reading a member: dot notation

`.` is a dot. **Dot notation** reads a member: write the object's name, a dot, then the key.

- `person.age` reads a property.
- `person.greet()` calls a method. The `()` after the name is what makes it run.

```js
const person = {
  name: "Ana",
  age: 30,
  greet() {
    console.log("Hello!");
  },
};
console.log(person.age);
person.greet();
// prints: 30
// prints: Hello!
```

The object name comes first because it acts as a **namespace**: a label you must go through to reach anything stored inside. `age` on its own means nothing to JavaScript here; `person.age` means "the `age` that lives inside `person`".

```js
// ERROR EXAMPLE: ReferenceError
const person = { age: 30 };
console.log(age);
```

There is no variable called `age`. The only `age` is inside `person`, so you must say `person.age`.

### Reading a key that does not exist

If you read a property that the object does not have, you do not get an error. You get `undefined`.

```js
const person = { name: "Ana" };
console.log(person.email);
// prints: undefined
```

**Common mistake:** a typo in a key name gives `undefined` silently, not an error. If a value you expected comes out `undefined`, check the spelling of the key first.

```js
const person = { name: "Ana" };
console.log(person.Name);
// prints: undefined
```

Keys are case-sensitive: `Name` and `name` are different keys.

### Built-in methods (almost) every object has

Even an object you write yourself comes with some built-in methods, called **object instance methods**. Two examples are `.hasOwnProperty()`, which answers `true` or `false` for "does this object have a key with this name?", and `.valueOf()`, which gives back the object itself. ("Almost" every object: one made with `Object.create(null)`, 12.8, has none of them.)

To ask "does it have this key?", modern code writes `Object.hasOwn(person, "name")`. MDN recommends it over `hasOwnProperty()`, and the project's ESLint (`no-prototype-builtins`, in its recommended rules) flags `person.hasOwnProperty(...)`, so that form shows red in VS Code. You will read `hasOwnProperty` in older code.

```js
const person = { name: "Ana" };
console.log(Object.hasOwn(person, "name"));
console.log(Object.hasOwn(person, "email"));
// prints: true
// prints: false
```

`"name" in person` also answers, but it counts inherited keys too: `"toString" in {}` is `true`.

### Arrays inside objects, and objects inside objects

After the dot you can name a simple property, call a method, or reach into an array stored in a property. Because `person.name` below *is* an array, you can put `[0]` right after it to get its first item.

```js
const person = {
  name: ["Ana", "Lopez"],
};
console.log(person.name[0]);
console.log(person.name[1]);
// prints: Ana
// prints: Lopez
```

A property can also be an object. That is a **nested object**: an object inside an object. To reach inside, add another dot.

```js
const person = {
  name: {
    first: "Ana",
    last: "Lopez",
  },
};
console.log(person.name.first);
// prints: Ana
```

Read `person.name.first` left to right: start at `person`, go into its `name` (an object), then take that object's `first`.

It also works the other way round: an array can hold objects. This is the usual shape for a list of similar things, such as a list of passengers.

```js
const passengers = [
  { name: "Ana", seat: 3 },
  { name: "Ben", seat: 7 },
];
console.log(passengers[1].name);
for (const p of passengers) {
  console.log(`${p.name} is in seat ${p.seat}`);
}
// prints: Ben
// prints: Ana is in seat 3
// prints: Ben is in seat 7
```

`passengers[1]` is the second object in the array, so `passengers[1].name` is `"Ben"`. The loop then runs its body twice: once with `p` as Ana's object, once with Ben's.

### Telling arrays, objects and `null` apart

`typeof` (2.2) cannot tell these three apart: it says `'object'` for all of them. MDN's typeof page lists `typeof null === "object"` with the comment "This stands since the beginning of JavaScript": a mistake in the first version, kept so that old code would not break. For arrays, ask `Array.isArray()`. MDN: "The Array.isArray() static method determines whether the passed value is an Array."

```js
const list = ["a", "b"];
const box = { size: 2 };
const nothing = null;
console.log(typeof list, typeof box, typeof nothing);
console.log(Array.isArray(list), Array.isArray(box));
console.log(nothing === null);
// prints: object object object
// prints: true false
// prints: true
```

So to check for `null`, compare with `=== null`. To check for an array, use `Array.isArray(x)`. A plain object is what is left: `typeof x === "object" && x !== null && !Array.isArray(x)`. You need this when data can arrive in more than one shape, such as an API field that is sometimes one item and sometimes a list.

### Bracket notation

**Bracket notation** is a second way to read a property: put the key, as a string, inside square brackets `[ ]` after the object's name.

```js
const person = { name: "Ana", age: 30 };
console.log(person["age"]);
// prints: 30
```

`person["age"]` and `person.age` read the same property.

Bracket notation is **required** when the key is not a valid identifier, such as a key with a space. Dot notation cannot express it:

```js
const car = { "Fuel Type": "diesel" };
console.log(car["Fuel Type"]);
// prints: diesel
```

```js
// ERROR EXAMPLE: SyntaxError
const car = { "Fuel Type": "diesel" };
console.log(car.Fuel Type);
```

### Chaining dots and brackets

You can chain `.` and `[ ]` in any mix to reach deep inside nested data. Each step works on the result of the step before it.

```js
const spaceship = {
  crew: {
    captain: { name: "Lily", skills: ["steering", "maps"] },
  },
};
console.log(spaceship.crew.captain.skills[1]);
console.log(spaceship["crew"]["captain"].name);
// prints: maps
// prints: Lily
```

The first line goes: `spaceship` → its `crew` → its `captain` → its `skills` array → item `1`, which is `"maps"`.

### Objects as "associative arrays"

An array maps numbers (positions) to values. An object maps strings (keys) to values. Bracket notation makes the resemblance obvious, which is why objects are sometimes called **associative arrays**.

### Which notation to use

Use dot notation whenever you can. It is shorter and easier to read. Reach for brackets in two cases: the key is not a valid identifier (as above), or the key's name is held in a variable.

That second case: if the property name is stored in a variable, dot notation cannot use it, because dot notation always takes the word after the dot literally. Bracket notation evaluates what is inside the brackets first, so a variable works there.

```js
const person = { name: "Ana", age: 30 };
const field = "age";
console.log(person[field]);
console.log(person.field);
// prints: 30
// prints: undefined
```

`person[field]` looks up the value of `field`, which is `"age"`, so it reads `person.age`. `person.field` looks for a key literally called `field`, which does not exist, so it gives `undefined`.

**Python habit that breaks here:** in Python, `d["missing"]` raises a `KeyError`. In JavaScript, a missing key quietly gives `undefined` and the program keeps going. Python dictionaries also have no dot notation; in JavaScript, dot notation is the normal way to read a property.

## 12.2 Objects: changing them, looping over them, `this`, getters and setters

**Sources:** [MDN — JavaScript object basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics) · [MDN — Storing the information you need: Variables](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables) · [Codecademy — Objects (lesson)](https://www.codecademy.com/courses/introduction-to-javascript/lessons/objects/exercises/intro) · [Codecademy — Advanced Objects (lesson)](https://www.codecademy.com/courses/introduction-to-javascript/lessons/advanced-objects/exercises/intro) · [Codecademy — Objects cheatsheet](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-objects/cheatsheet) · [MDN — Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) · [MDN — Strict equality (===)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) · [MDN — Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) · [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
**Skills:** for_in_loop, for_in_key_variable, set_object_members, const_object_mutable, delete_operator, objects_pass_by_reference, reassign_param_no_effect, object_equality_by_reference, privacy_underscore, add_new_members, dynamic_member_names, computed_property_names, object_keys, object_values, object_entries, object_assign, this_keyword, method_no_auto_access, arrow_this_global_object, avoid_arrow_methods, this_outside_object, getter, getter_no_parens, getter_setter_name_clash, setter, setter_no_parens, setter_not_enforced

### Looping over an object's keys: `for...in`

A `for...of` loop walks through the items of an array. Objects need a different loop. **`for...in`** runs a block of code once for each enumerable property in an object, **including inherited ones** (properties the object gets from another object it is linked to, 12.8). The word `in` replaces `of`.

Each time round, the loop variable holds **one key**, as a string. To get the value, use that key with bracket notation (bracket notation, because the key is in a variable).

```js
const crew = {
  captain: "Lily",
  doctor: "Omar",
};
for (const role in crew) {
  console.log(`${role}: ${crew[role]}`);
}
// prints: captain: Lily
// prints: doctor: Omar
```

First round: `role` is `"captain"`, so `crew[role]` is `"Lily"`. Second round: `role` is `"doctor"`, so `crew[role]` is `"Omar"`. Then there are no keys left and the loop ends.

**Common mistake:** writing `crew.role` inside the loop. That looks for a key literally named `role` and gives `undefined`.

Recognise `for...in`; for your own loops, write `for (const role of Object.keys(crew))` (or `Object.entries`, below), which lists only the object's **own** keys. MDN: "Many JavaScript style guides and linters recommend against the use of for...in". An object made with `Object.create(parent)` (12.8) shows the difference: `for...in` also lists the parent's keys, `Object.keys` does not.

### Changing a member's value

To update a member, point at it with dot or bracket notation and use `=` (the assignment operator) to give it a new value.

```js
const person = { name: "Ana", age: 30 };
person.age = 31;
person["name"] = "Anna";
console.log(person);
// prints: { name: 'Anna', age: 31 }
```

### `const` objects can still change

This often surprises people. `const` stops you from making the **variable** point at a different object. It does not stop you from changing what is **inside** the object. You can update, add, or remove properties of an object declared with `const`.

```js
const person = { age: 30 };
person.age = 31;
console.log(person.age);
// prints: 31
```

Replacing the whole object is what `const` forbids:

```js
// ERROR EXAMPLE: TypeError
const person = { age: 30 };
person = { age: 31 };
```

Picture the variable as a label tied to a box. `const` glues the label to that box. You can still rearrange what is in the box.

If you need an object whose properties really cannot change, `Object.freeze(obj)` locks its top level; in your files, assigning to a frozen property then throws `TypeError: Cannot assign to read only property`. Recognise it; most code simply avoids changing shared objects.

### Removing a member: `delete`

`delete` is an operator that removes a property from an object, key and value both.

```js
const person = { name: "Ana", age: 30 };
delete person.age;
console.log(person);
console.log(person.age);
// prints: { name: 'Ana' }
// prints: undefined
```

### Adding brand-new members

Assigning to a key that does not exist yet does not cause an error. It creates the member. This works for properties and for methods.

```js
const person = { name: "Ana" };
person.city = "Austin";
person.wave = function () {
  console.log("*waves*");
};
console.log(person.city);
person.wave();
// prints: Austin
// prints: *waves*
```

### Choosing the member's name while the program runs

Dot notation only accepts a name typed literally after the dot. It cannot use the value of a variable. Bracket notation can, so it is how you create a member whose name comes from data:

```js
const settings = {};
const optionName = "theme";
const optionValue = "dark";
settings[optionName] = optionValue;
console.log(settings);
// prints: { theme: 'dark' }
```

The key became `theme` because that is what `optionName` held.

### Computed property names: `{ [key]: value }`

When you build the object in one go, put the brackets inside the object literal instead. MDN: "The object initializer syntax also supports computed property names. That allows you to put an expression in square brackets [], that will be computed and used as the property name."

```js
const optionName = "theme";
const settings = { [optionName]: "dark", [`${optionName}Locked`]: false };
console.log(settings);
// prints: { theme: 'dark', themeLocked: false }
```

Any expression goes inside the brackets: a variable, or a template literal built from one. Airbnb: "Use computed property names when creating objects with dynamic property names." You will write it in React forms (week 11), where `{ ...form, [field]: value }` updates whichever field changed.

**Python habit that breaks here:** in a Python dict, `{key: 1}` uses the variable `key`. In a JavaScript object literal, `{ key: 1 }` makes a key literally called `key`; only `{ [key]: 1 }` uses the variable.

### Objects passed into functions

When you pass an object into a function, the function receives a way to reach **the same object**, not a copy. Strictly, JavaScript passes every argument by value; for an object, the value is a reference to it, so caller and function share ONE object. MDN calls this "passed by sharing" (the same point as arrays in 10.1). So if the function changes a property, the change is still there after the function finishes. True pass-by-reference would also let the function replace the caller's variable, which the next example shows does not happen.

```js
const ship = { speed: 10 };
function boost(s) {
  s.speed = 99;
}
boost(ship);
console.log(ship.speed);
// prints: 99
```

`s` and `ship` are two names for one object, so `s.speed = 99` changed `ship` too.

But **reassigning** the parameter is different. If the function makes its parameter point at a brand-new object, only the parameter moves. The variable outside still points at the original object.

```js
const ship = { speed: 10 };
function replace(s) {
  s = { speed: 0 };
}
replace(ship);
console.log(ship.speed);
// prints: 10
```

Rule of thumb: changing a property through the parameter sticks; replacing the parameter does not.

### Two objects are equal only if they are the same object

`===` on two objects (or two arrays) does not compare what is inside. MDN: "If both operands are objects, return true only if they refer to the same object."

```js
const a = { speed: 10 };
const b = { speed: 10 };
const c = a;
console.log(a === b); // prints: false
console.log(a === c); // prints: true
console.log(a.speed === b.speed); // prints: true
console.log([1, 2] === [1, 2]); // prints: false
```

`a` and `b` look identical but are two separate objects, so `a === b` is `false`. `c` is a second name for `a`'s object, as above, so `a === c` is `true`. To ask "same contents?", compare the fields you care about, usually an id: `post.id === target.id`. The project's ESLint flags the last line as you type (`no-constant-binary-expression`, in its recommended rules): two brand-new literals can never be the same object.

**Python habit that breaks here:** Python's `==` compares the contents of lists and dicts, so `[1, 2] == [1, 2]` is `True`. JavaScript's `===` on objects behaves like Python's `is`.

### `Object.keys()`, `Object.values()`, `Object.entries()`, `Object.assign()`

`Object` is a built-in object that comes with helper methods for working with any object.

`Object.keys(obj)` gives back an array of the object's keys:

```js
const robot = { model: "1E78V2", energyLevel: 100 };
const robotKeys = Object.keys(robot);
console.log(robotKeys);
// prints: [ 'model', 'energyLevel' ]
```

`Object.values(obj)` gives back an array of the values, in the same order. MDN: "The Object.values() static method returns an array of a given object's own enumerable string-keyed property values."

```js
const robot = { model: "1E78V2", energyLevel: 100 };
console.log(Object.values(robot));
// prints: [ '1E78V2', 100 ]
```

Use it when the keys do not matter, such as adding up every value: `Object.values(scores).reduce((sum, n) => sum + n, 0)`.

`Object.entries(obj)` gives back an array of smaller arrays. Each small array holds two items: a key, then its value.

```js
const robot = { model: "1E78V2", energyLevel: 100 };
console.log(Object.entries(robot));
// prints: [ [ 'model', '1E78V2' ], [ 'energyLevel', 100 ] ]
```

The reverse exists too: `Object.fromEntries(pairs)` builds an object from `[key, value]` pairs (`Object.fromEntries([['a', 1]])` is `{ a: 1 }`). Recognise it; code uses it to turn `Object.entries(obj)`, changed with `.map()`, back into an object.

`Object.assign(target, source)` copies every **own, enumerable** property of `source` into `target` (a getter is run and its current value copied), and returns `target`. Using a fresh object `{ }` (or one with a few properties) as the target gives you a **new** object that has the original's properties plus the extra ones, without touching the original.

```js
const robot = { model: "1E78V2" };
const newRobot = Object.assign({ laserBlaster: true }, robot);
console.log(newRobot);
console.log(robot);
// prints: { laserBlaster: true, model: '1E78V2' }
// prints: { model: '1E78V2' }
```

Modern code writes this with spread (12.3): `{ laserBlaster: true, ...robot }` (Airbnb's guide; ESLint `prefer-object-spread`). Use `Object.assign` when you mean to change an existing target in place.

### `this`: the object a method was called on

A method often needs the object's own data. But inside a method, the object's other properties are **not** automatically available by their bare names.

```js
// ERROR EXAMPLE: ReferenceError
const goat = {
  dietType: "herbivore",
  diet() {
    console.log(dietType);
  },
};
goat.diet();
```

`dietType` is a property of `goat`, not a variable, so the method cannot see it by that name.

The fix is the keyword **`this`**. Inside a method, `this` refers to the object the method was called on. In `goat.diet()`, the object before the dot is `goat`, so inside `diet`, `this` is `goat`.

```js
const goat = {
  dietType: "herbivore",
  diet() {
    console.log(this.dietType);
  },
};
goat.diet();
// prints: herbivore
```

`this.dietType` means "the `dietType` of whatever object called me".

### Do not use arrow functions for methods that use `this`

An arrow function (`() => { }`) does not get its own `this`. It uses the `this` from the code around it, which is **not** the object. Here the code around it is the top level of the file. In an ES module (every file in this folder) the top-level `this` is `undefined`, so `goat.diet()` **throws**:

```js
// ERROR EXAMPLE: TypeError
const goat = {
  dietType: "herbivore",
  diet: () => {
    console.log(this.dietType);
  },
};
goat.diet();
```

Node reports `TypeError: Cannot read properties of undefined (reading 'dietType')`. The Codecademy lesson describes the outer `this` as the global object; that is true in a browser script (`window`). In an old CommonJS file (the instructor's files, and any folder without `"type": "module"`) it is `module.exports`, an empty object, and you would get `undefined` silently instead of an error.

The takeaway: **avoid arrow functions when a method uses `this`.** Use `diet() { }` or `diet: function () { }` instead.

**Common mistake:** writing every method as an arrow function out of habit. It looks fine until the first time the method uses `this`, and then it fails: with a `TypeError` in your files, or with a silent `undefined` in old scripts. (The project's ESLint does not catch it; an opt-in rule, `no-invalid-this`, would.)

### `this` outside an object

A plain function defined outside any object and called on its own (with nothing before a dot) has no calling object. In strict mode, which every ES module and every class is in, such a plain call gets `this` as `undefined`. MDN: `this` is the global object "or undefined (in strict mode)".

```js
function whoAmI() {
  console.log(this);
}
whoAmI();
// prints: undefined
```

Only old sloppy-mode scripts substitute the **global object** here: the one object that holds things available everywhere in the program (`window` in a browser, `global` in Node, both reachable as `globalThis`). In such a script `this === globalThis` would be `true`. This is why a method passed somewhere as a callback "loses" its object in modern code (12.5).

### The underscore convention: "please don't touch"

An object literal has no built-in way to make a property private; classes do, with `#name` (12.6, available everywhere since 2021). A common **convention** (an agreement between programmers, not a rule the language enforces) is to start the key with an underscore `_`. It means "this property should not be changed directly from outside."

```js
const bankAccount = {
  _amount: 1000,
};
bankAccount._amount = 1000000;
console.log(bankAccount._amount);
// prints: 1000000
```

Nothing stopped the change. The `_` is only a signal to other people reading the code. You will read it often in older code and in Codecademy; Airbnb's guide says not to write it ("Do not use trailing or leading underscores"), and in classes you write `#name` instead.

### Getters: a method you read like a property

A **getter** is a method that runs when you *read* a property. You write the keyword `get`, then a method name, then a function body that returns a value.

Why they exist: some values are best worked out from other properties at the moment you ask for them, such as a full name made from a first and last name.

```js
const person = {
  _firstName: "John",
  _lastName: "Doe",
  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  },
};
console.log(person.fullName);
// prints: John Doe
```

Notice `person.fullName` has **no parentheses**. A getter is read like a property, even though a function runs behind the scenes. With only a getter and no setter, assigning `person.fullName = "x"` throws in your files (`TypeError: Cannot set property fullName of #<Object> which has only a getter`); old non-strict scripts ignore it silently.

**Common mistake:** calling a getter with `()`. The getter runs and returns a string, and then JavaScript tries to call that string as a function.

```js
// ERROR EXAMPLE: TypeError
const person = {
  _firstName: "John",
  get fullName() {
    return this._firstName;
  },
};
console.log(person.fullName());
```

### Setters: a method that runs when you assign

A **setter** is a method that runs when you *assign* to a property with `=`. You write the keyword `set`, a method name, and one parameter, which receives the value being assigned. A setter typically checks that value before reassigning a real property.

```js
const person = {
  _age: 37,
  set age(newAge) {
    if (typeof newAge === "number") {
      this._age = newAge;
    } else {
      console.log("You must assign a number to age");
    }
  },
};
person.age = 40;
console.log(person._age);
person.age = "forty";
console.log(person._age);
// prints: 40
// prints: You must assign a number to age
// prints: 40
```

Walkthrough: `person.age = 40` runs the setter with `newAge` as `40`. It is a number, so `_age` becomes `40`. `person.age = "forty"` runs the setter again; this time the `if` is false, so the `else` prints the warning and `_age` stays `40`.

Like getters, setters are used **without parentheses**: `person.age = 40`, not `person.age(40)`.

### Why the real property gets an underscore

A property cannot share its name with a getter or setter. If the setter `age` tried to store the value in a property also called `age`, the assignment `this.age = ...` would just call the setter again, which would call it again, forever, until JavaScript gives up:

```js
// ERROR EXAMPLE: RangeError
const person = {
  set age(newAge) {
    this.age = newAge;
  },
};
person.age = 40;
```

That is the job of the `_` prefix: the stored value lives in `_age`, and the getter/setter is named `age`, so the names never clash.

### A setter does not lock anything

Even with a setter in place, nothing stops code from skipping it and assigning to the underscore property directly. The setter's check simply does not run.

```js
const person = {
  _age: 37,
  set age(newAge) {
    if (typeof newAge === "number") {
      this._age = newAge;
    }
  },
};
person._age = "forty";
console.log(person._age);
// prints: forty
```

The setter only protects people who go through it. The `_` is what asks them to.

## 12.3 Making many objects: factories, destructuring, constructors and spread

**Sources:** [MDN — JavaScript object basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics) · [MDN — Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) · [Codecademy — Advanced Objects (lesson)](https://www.codecademy.com/courses/introduction-to-javascript/lessons/advanced-objects/exercises/intro) · [Codecademy — Objects cheatsheet](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-objects/cheatsheet) · [MDN Reference — Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) · [MDN Reference — Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) · [MDN Reference — Date.now()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) · [MDN Reference — Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) · [MDN Glossary — Deep copy](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) · [MDN Reference — structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) · [MDN — Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) · [MDN — Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) · [MDN — Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) · [MDN — Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) · [MDN — Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) · [MDN — Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) · [MDN — Date.prototype.toLocaleDateString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) · [MDN — String.prototype.padStart()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) · [MDN — String.prototype.localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) · [MDN — console.table()](https://developer.mozilla.org/en-US/docs/Web/API/console/table_static) · [MDN — The arguments object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) · [Node.js — CommonJS modules](https://nodejs.org/api/modules.html) · [Node.js — Packages](https://nodejs.org/api/packages.html)
**Skills:** getters_setters_intercept, this_reuse_method, object_literal_limits, factory_function, destructuring_term, property_value_shorthand, destructured_assignment, destructure_multiple, destructure_nested, array_destructuring, entries_destructuring_loop, constructor_new, constructor_capitalised, constructor_this_assign, call_constructor_with_new, builtins_are_objects, string_instance, explicit_instantiation, objects_encapsulate, spread_syntax, spread_copy_array, spread_combine_arrays, spread_merge_objects, spread_last_wins, spread_shallow_only, arrow_return_object_parens, set_unique_values, map_key_value_store, map_vs_object, date_now_timestamp, new_date_display, date_months_zero_based, pad_start, find_object_by_property, sort_objects_by_property, sort_strings_locale_compare, console_table, rest_parameters, rest_parameter_last, rest_vs_spread, deep_copy_concept, structured_clone, commonjs_recognise

### What getters and setters really give you

Putting 12.2 together: getters and setters let you **intercept** property access. Reading `obj.age` can run your getter code; writing `obj.age = 5` can run your setter code. The outside code looks like plain property use, but you get a chance to compute, check, or refuse the value in between.

```js
const thermostat = {
  _celsius: 20,
  get fahrenheit() {
    return this._celsius * 9 / 5 + 32;
  },
  set fahrenheit(f) {
    this._celsius = (f - 32) * 5 / 9;
  },
};
console.log(thermostat.fahrenheit);
thermostat.fahrenheit = 212;
console.log(thermostat._celsius);
// prints: 68
// prints: 100
```

Only `_celsius` is stored. Reading `fahrenheit` converts on the way out; assigning to it converts on the way in.

### One method, many objects, thanks to `this`

Because `this` means "whichever object called me", one function can serve as a method on several objects and use each object's own data.

```js
function introduce() {
  console.log(`Hi, I'm ${this.name}`);
}
const ana = { name: "Ana", introduce: introduce };
const ben = { name: "Ben", introduce: introduce };
ana.introduce();
ben.introduce();
// prints: Hi, I'm Ana
// prints: Hi, I'm Ben
```

There is only one `introduce` function. When `ana` calls it, `this` is `ana`; when `ben` calls it, `this` is `ben`. (Once you meet property value shorthand later in this section, you will write `{ name: "Ana", introduce }` instead of `introduce: introduce`; ESLint's `object-shorthand` rule asks for that.)

### When object literals stop being enough

Writing an object literal is fine when you need **one** object. When you need many objects with the same shape (fifty users, each with a name and a greeting), writing fifty literals by hand repeats the same code fifty times, and a fix to the greeting would need fifty edits.

### Factory functions

A **factory function** is a function that creates a new object, fills it in, and returns it, every time you call it. Call it again and you get another, separate object of the same shape.

```js
function createPerson(name) {
  const obj = {};
  obj.name = name;
  obj.introduce = function () {
    console.log(`Hi! I'm ${this.name}.`);
  };
  return obj;
}
const salva = createPerson("Salva");
const frankie = createPerson("Frankie");
salva.introduce();
frankie.introduce();
// prints: Hi! I'm Salva.
// prints: Hi! I'm Frankie.
```

Each call runs the function body once: make an empty object, give it a `name` and an `introduce` method, hand it back. The method is written once, inside the factory, and every object gets it.

### Destructuring: the idea

This part covers two shortcuts (both added to JavaScript in the 2015 version, called ES6) for moving properties between objects and variables with less typing. **Destructuring** is the one that pulls values OUT of an object or array into variables. MDN: it is a way to "unpack values from arrays, or properties from objects, into distinct variables". The other direction, building an object from variables with `{ name }`, is a separate shortcut called **shorthand property names**. Codecademy files both under one lesson, which is why they are taught together here.

### Property value shorthand

When a key and the variable that holds its value have the same name, you can write the name once. `{ name }` means `{ name: name }`.

```js
function createMonster(name, age) {
  return { name, age };
}
console.log(createMonster("Ghouly", 3));
// prints: { name: 'Ghouly', age: 3 }
```

`{ name, age }` builds an object with key `name` set to the variable `name`, and key `age` set to the variable `age`.

**Python habit that breaks here:** in Python, `{name}` makes a *set* containing one value. In JavaScript, `{ name }` makes an *object* with a key called `name`.

### Destructured assignment

To pull a property **out** of an object into a variable of the same name, wrap the variable name in curly braces on the left side of `=`:

```js
const vampire = {
  name: "Dracula",
  residence: "Transylvania",
};
const { residence } = vampire;
console.log(residence);
// prints: Transylvania
```

`const { residence } = vampire;` is the short way of writing `const residence = vampire.residence;`.

You can pull out several properties at once by listing them with commas. You do not have to take them all; the number of variables can be less than the number of properties.

```js
const vampire = {
  name: "Dracula",
  residence: "Transylvania",
  age: 600,
};
const { name, age } = vampire;
console.log(name);
console.log(age);
// prints: Dracula
// prints: 600
```

If you name a key that the object does not have, that variable is `undefined`, just as reading a missing property is.

To reach into a nested object, name the outer key, a colon, and then another pair of braces with the inner key:

```js
const vampire = {
  preferences: {
    day: "stay inside",
    night: "satisfy appetite",
  },
};
const { day } = vampire.preferences;
const { preferences: { night } } = vampire;
console.log(day);
console.log(night);
// prints: stay inside
// prints: satisfy appetite
```

The first line destructures from `vampire.preferences` directly. The second does the same job from `vampire` itself; only `night` becomes a variable (`preferences` here is a path, not a variable).

### Array destructuring: unpacking by position

The same idea works on arrays, with square brackets on the left. MDN's definition covers both: "The destructuring syntax is a JavaScript syntax that makes it possible to unpack values from arrays, or properties from objects, into distinct variables." An object is unpacked by **name**; an array is unpacked by **position**: the first variable gets item 0, the second gets item 1.

```js
const point = [3, 7];
const [x, y] = point;
console.log(x, y);
const [winner, runnerUp] = ["ana", "ben", "cy"];
console.log(winner, runnerUp);
const [first, , third] = ["a", "b", "c"];
console.log(first, third);
// prints: 3 7
// prints: ana ben
// prints: a c
```

Items with no variable are simply not taken (`"cy"`), and an empty slot between two commas skips a position. You will read this in every React component (week 11), `const [count, setCount] = useState(0)`, and with `Promise.all` in week 6.

**Python habit that breaks here:** Python unpacks with no brackets, `x, y = point`, and raises an error when the counts differ. JavaScript needs the `[ ]` and never complains: a variable with no matching item is `undefined`.

### Looping over an object: `for (const [key, value] of Object.entries(obj))`

`Object.entries()` (12.2) gives `[key, value]` pairs. Destructure each pair right in the `for...of` line (7.1). MDN: "Using array destructuring, you can iterate through objects easily."

```js
const robot = { model: "1E78V2", energyLevel: 100 };
for (const [key, value] of Object.entries(robot)) {
  console.log(`${key}: ${value}`);
}
// prints: model: 1E78V2
// prints: energyLevel: 100
```

This is the modern way to loop over an object when you need both halves, the same job as Python's `for key, value in d.items():`. Use `Object.keys()` when you need only the keys and `Object.values()` when you need only the values. Unlike `for...in` (12.2), it never picks up inherited keys.

### Constructors and `new`

A **constructor** is just a function that you call using the keyword **`new`**. It is the built-in way to do what a factory function does by hand. The `function Person` form shown here is the pre-2015 pattern: modern code writes a `class` (12.4) for the same job (Airbnb: "Always use `class`"), and you will read constructor functions in older code and tutorials (12.8 shows the two side by side). What `new` does, below, is still current: every class instance, `new Date()` and `new Map()` work the same way.

When you call a function with `new`, JavaScript:

1. creates a new, empty object,
2. links it to `Person.prototype` (12.8 explains this link),
3. sets `this` to that new object,
4. runs the code in the function body,
5. returns the new object (unless the function itself returns a different object).

So inside a constructor, you use `this` to put properties and methods on the object being built. You do not create the object or `return` it yourself.

By convention, a constructor's name **starts with a capital letter** and is named for the type of object it creates: `Person`, not `createPerson`. The capital tells readers "call this with `new`".

```js
function Person(name) {
  this.name = name;
  this.introduce = function () {
    console.log(`Hi! I'm ${this.name}.`);
  };
}
const salva = new Person("Salva");
const frankie = new Person("Frankie");
console.log(salva.name);
frankie.introduce();
// prints: Salva
// prints: Hi! I'm Frankie.
```

Compare with `createPerson` above: no `const obj = {}`, no `return obj`. `new` does both. `this.name = name` means "the new object's `name` property gets the value of the parameter `name`".

**Common mistake:** forgetting `new`. Then no new object is made, and `this` inside the call is `undefined` (strict mode, as in every ES module), so the function itself throws at `this.name = name`: `TypeError: Cannot set properties of undefined (setting 'name')`, and `salva` is never assigned. (Old sloppy scripts silently create a global `name` instead, return `undefined`, and fail one line later at `salva.name`.)

```js
// ERROR EXAMPLE: TypeError
function Person(name) {
  this.name = name;
}
const salva = Person("Salva");
console.log(salva.name);
```

### You have been using objects all along

Arrays and `Math` are objects. Every time you wrote `Math.round(2.6)` or `list.push(x)`, you were calling a method on an object with dot notation.

A string is different: it is a **primitive**, not an object (`typeof "hello"` is `'string'`, and `"hello" instanceof String` is `false`). MDN Learn says strings are instances of `String`; MDN's reference is more precise: when you call a method on a string, "JavaScript will automatically wrap the string primitive and call the method ... on the wrapper object instead". An **instance** is one object made from a general blueprint, the way `salva` above is one object made from `Person`, and that temporary wrapper is an instance of `String`. That is why every string has methods like `.toUpperCase()` and `.length` without you defining them: they come from `String`.

```js
const word = "hello";
console.log(word.toUpperCase());
console.log(Math.round(2.6));
// prints: HELLO
// prints: 3
```

Not every built-in object is created for you automatically. Some built-in tools must be created explicitly with `new`, the same way you call `new Person(...)`. The MDN example is `new Notification("Hello!")`, which is a browser feature and does not exist in Node. One you can run in Node is `new Date()`, which makes an object for the current date and time.

### Why bother with objects at all

Objects keep related data and the functions that use it together in one package, under one name. That keeps things organized, and it avoids name clashes: two objects can each have a `name` and an `introduce` without interfering, because each one lives behind its own namespace (`salva.name`, `frankie.name`).

### Spread syntax `...`

`...` is three dots, called **spread syntax**. Placed before any iterable (an array, a string, and later a Set or a Map), it expands it into its individual items, wherever a list of items is expected: inside an array literal `[ ]`, or in the arguments of a function call.

```js
const nums = [3, 9, 4];
console.log(Math.max(...nums));
console.log([..."hey"]);
// prints: 9
// prints: [ 'h', 'e', 'y' ]
```

`Math.max(...nums)` is the same as writing `Math.max(3, 9, 4)`. `[..."hey"]` spreads the string into its letters.

### Copying and combining arrays with spread

`[...arr]` builds a **new** array holding the same items. Because it is a separate array, changing the copy does not change the original.

```js
const original = ["a", "b"];
const copy = [...original];
copy.push("c");
console.log(original);
console.log(copy);
// prints: [ 'a', 'b' ]
// prints: [ 'a', 'b', 'c' ]
```

**Common mistake:** `const copy = original;` does not copy. It gives the same array a second name, so pushing to `copy` changes `original` too.

Spread also lets an existing array be one part of a new array, alongside other items or other arrays. Without spread, putting `parts` inside `[ ]` would nest the whole array as one item instead of its contents.

```js
const parts = ["shoulders", "knees"];
const lyrics = ["head", ...parts, "and", "toes"];
const more = [...parts, ...["elbows"]];
console.log(lyrics);
console.log(more);
// prints: [ 'head', 'shoulders', 'knees', 'and', 'toes' ]
// prints: [ 'shoulders', 'knees', 'elbows' ]
```

### Spreading objects

Inside an object literal, `...obj` copies all of `obj`'s own, enumerable properties into the new object (a getter is run and its current value copied). Spreading two objects merges them into one new object; the originals are not changed.

```js
const a = { x: 1, y: 2 };
const b = { y: 99, z: 3 };
const merged = { ...a, ...b };
console.log(merged);
console.log(a);
// prints: { x: 1, y: 99, z: 3 }
// prints: { x: 1, y: 2 }
```

When both objects have the same key, **the last one wins**. Here `y` is first set to `2` from `a`, then overwritten with `99` from `b`, because `b` comes later. Swap the order to `{ ...b, ...a }` and `y` would be `2`.

### Spread copies only one level deep

Spread makes a **shallow copy**: the outer array or object is new, but anything nested inside (an inner array or object) is not copied. The copy holds a reference to the same inner value, so a change through one shows up in the other.

```js
const original = { name: "Ana", tags: ["admin"] };
const copy = { ...original };
copy.name = "Ben";
copy.tags.push("editor");
console.log(original.name);
console.log(original.tags);
// prints: Ana
// prints: [ 'admin', 'editor' ]
```

Changing `copy.name` did not touch `original`, because `name` is a top-level property and was copied. But `copy.tags` and `original.tags` are the **same** array, so pushing into one shows up in both.

### An arrow that returns an object needs `( )`

A concise arrow (10.2) returns its expression. But if that expression is an object literal, its `{` is read as the start of a function body. MDN: "Returning object literals using the expression body syntax (params) => { object: literal } does not work as expected." MDN's fix: "wrap the object literal in parentheses".

```js
const songs = [
  { id: 1, plays: 3 },
  { id: 2, plays: 9 },
];
const broken = songs.map(s => { id: s.id });
const reset = songs.map(s => ({ ...s, plays: 0 }));
console.log(broken);
console.log(reset);
console.log(songs[1].plays);
// prints: [ undefined, undefined ]
// prints: [ { id: 1, plays: 0 }, { id: 2, plays: 0 } ]
// prints: 9
```

In `broken`, `{ id: s.id }` became a function body holding a label `id:` and a statement `s.id` that does nothing. There is no `return`, so every item is `undefined`, and nothing crashes. With `( )` around it, it is an object. `({ ...s, plays: 0 })` is the everyday pattern for "a changed copy of each record" (React state updates, week 11), and `songs` itself is untouched. The project's ESLint flags the broken form (`no-unused-labels` and `array-callback-return`). If you copy it into a lesson file, put `// prettier-ignore` above that line, because the formatter rewrites it into a block on save.

### `Set`: a collection with no duplicates

In 7.1 you read that JavaScript has collections besides arrays. A **Set** holds values with no repeats. MDN: "A value in the set may only occur once; it is unique in the set's collection." You make one with `new` (above), and you can give it an array to start from.

```js
const tags = ["js", "css", "js", "html", "css"];
const unique = new Set(tags);
console.log(unique.size);
console.log(unique.has("css"));
unique.add("js");
console.log(unique.size);
console.log([...unique]);
// prints: 3
// prints: true
// prints: 3
// prints: [ 'js', 'css', 'html' ]
```

`new Set(tags)` keeps the first of each value, in order. `.has()` asks "is it in?", `.add()` adds (adding a value that is already there does nothing), and `.size` is the count (a property, not `.length`). `[...unique]` spreads the Set back into an array, so `[...new Set(arr)]` is the one-line way to remove duplicates from an array; MDN's own example does exactly that. For a list you check often, a Set is also quicker. MDN: "The has method checks if a value is in the set, using an approach that is, on average, quicker than testing most of the elements that have previously been added to the set."

**Python habit that breaks here:** Python writes `set(tags)` or `{"js", "css"}`. JavaScript needs `new Set(...)`, and `{ }` is always an object, never a set.

### `Map`: key-value pairs with keys of any type

A **Map** stores key-value pairs, like an object, but it is a collection with its own methods. MDN: "The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value."

```js
const likes = new Map();
likes.set("ana", 3);
likes.set("ben", 9);
likes.set("ana", 4);
console.log(likes.get("ana"));
console.log(likes.get("cy"));
console.log(likes.has("ben"), likes.size);
for (const [user, count] of likes) {
  console.log(`${user}: ${count}`);
}
// prints: 4
// prints: undefined
// prints: true 2
// prints: ana: 4
// prints: ben: 9
```

`.set(key, value)` adds or replaces, `.get(key)` reads (`undefined` when the key is missing, as with an object), `.has(key)` asks, `.size` counts, and `for...of` gives `[key, value]` pairs that destructure exactly like `Object.entries()` above.

### `Map` or a plain object?

MDN: "Object is similar to Map—both let you set keys to values, retrieve those values, delete keys, and detect whether something is stored at a key. For this reason (and because there were no built-in alternatives), Object has been used as Map historically." The difference that bites: an object's keys are always strings (or Symbols, 2.2), so an object used as a key is turned into the text `"[object Object]"`.

```js
const ana = { name: "ana" };
const ben = { name: "ben" };
const asObject = {};
asObject[ana] = 3;
asObject[ben] = 9;
console.log(Object.keys(asObject));
const asMap = new Map();
asMap.set(ana, 3);
asMap.set(ben, 9);
console.log(asMap.get(ana), asMap.size);
// prints: [ '[object Object]' ]
// prints: 3 2
```

Both writes to `asObject` landed on the same key, so `ben`'s 9 replaced `ana`'s 3. The Map kept two entries. Rule of thumb: a **record** with fixed, known fields (a user, a song, anything that becomes JSON) is a plain object. A **lookup table** filled from data, with keys added and removed while the program runs, or keys that are not strings, is a Map. MDN's comparison table says a Map "Performs better in scenarios involving frequent additions and removals of key-value pairs."

### Rest parameters: the same dots, the opposite job

Spread **unpacks** an array into separate items. The same three dots in a function's **parameter list** do the reverse: they **gather** separate arguments into one array. That is called a rest parameter. MDN: "The rest parameter syntax allows a function to accept an indefinite number of arguments as an array, providing a way to represent variadic functions in JavaScript." (A variadic function is one that takes any number of arguments.)

```js
function total(...prices) {
  console.log(prices);
  return prices.reduce((sum, p) => sum + p, 0);
}
console.log(total(4, 6));
console.log(total(1, 2, 3, 4));
// prints: [ 4, 6 ]
// prints: 10
// prints: [ 1, 2, 3, 4 ]
// prints: 10
```

`prices` is a real array, so every array method from 5.1 and 11.1 works on it. Named parameters can come first; the rest parameter takes whatever is left over, which is why MDN says "The rest parameter must be the last parameter in the function definition."

```js
function tag(label, ...items) {
  return label + ": " + items.join(", ");
}
console.log(tag("fruit", "apple", "pear", "fig"));
// prints: fruit: apple, pear, fig
```

How to tell them apart: dots where values are RECEIVED gather (rest): a function definition's parameter list, or the left side of a destructuring `=` (`const { password, ...safeUser } = user` keeps every property except `password`). Dots where values are SUPPLIED unpack (spread): a call, an array literal, an object literal.

```js
function largest(...nums) {
  return Math.max(...nums);
}
console.log(largest(3, 9, 4));
// prints: 9
```

Both appear in that one example: `...nums` in the definition gathers `3, 9, 4` into an array, and `...nums` in the call to `Math.max` spreads that array back out into three arguments.

Older code reads extra arguments through `arguments`, an array-like object that every non-arrow function gets automatically: it has `.length` and indexes but no array methods. MDN: "In modern code, rest parameters should be preferred." Recognise it; write `...rest`.

### Deep copies with structuredClone()

Spread stops one level down. When you need a copy where **nothing** is shared, that is a **deep copy**. MDN: "A deep copy of an object is a copy whose properties do not share the same references (point to the same underlying values) as those of the source object from which the copy was made." Browsers and Node provide a global function for it, `structuredClone()` (available everywhere since 2022). Strictly it is a web API, not part of the JavaScript language: MDN notes that "no native operation in JavaScript does a deep clone. The web API method structuredClone() allows deep copying". MDN: "This function can be used to deep copy JavaScript values."

Here is the shallow-copy example from above again, with `structuredClone()` instead of spread:

```js
const original = { name: "Ana", tags: ["admin"] };
const copy = structuredClone(original);
copy.name = "Ben";
copy.tags.push("editor");
console.log(original.name);
console.log(original.tags);
console.log(copy.tags);
// prints: Ana
// prints: [ 'admin' ]
// prints: [ 'admin', 'editor' ]
```

This time `original.tags` did not change: the copy got its own `tags` array.

| You want | Use |
|---|---|
| a new array or object, top level only, nested values still shared | spread `[...arr]` / `{ ...obj }` |
| a fully separate copy, nested values too | `structuredClone(value)` |

**Common mistake:** expecting `structuredClone()` to copy everything. It copies data (numbers, strings, arrays, plain objects, dates, Maps and Sets), not behaviour: an object holding a function makes it throw a `DataCloneError`. A class instance (12.4) does NOT throw: it comes back as a plain object without its methods (`copy instanceof Song` is `false`). For plain data like a list of records, it is the right tool. Older code deep-copies with `JSON.parse(JSON.stringify(x))`: recognise it, do not write it, because it turns a Date into a string.

### Putting it together: an array of objects as a tiny database

Real apps keep lists of objects: users, orders, songs. Everything from 11.1 works on them; the callback just reads a property off each object instead of using the element directly.

### A timestamp with Date.now()

Records often store **when** they were made. MDN: "The Date.now() static method returns the number of milliseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC." It is a plain number, so later times are bigger **or equal** numbers. `Date.now()` counts whole milliseconds, and records made one after another in the same script usually get the same number. So when you sort by time, break ties by id: `b.timestamp - a.timestamp || b.id - a.id` (the `||` moves on to the id only when the times are equal, giving 0).

```js
const before = Date.now();
const after = Date.now();
console.log(typeof before);
console.log(after >= before);
// prints: number
// prints: true
```

The number itself changes every millisecond, so the examples below use fixed timestamps to make their output predictable.

### Showing a date: `new Date()` and `toLocaleDateString()`

A timestamp is good for sorting but unreadable. `new Date(ms)` wraps it in a **Date** object, which has methods to show it. MDN, on `Date()`: "When called as a constructor, returns a new Date object." With no argument, the object holds "now". `toLocaleDateString()` formats the date part for people. MDN: it "returns a string with a language-sensitive representation of the date portion of this date in the local timezone." Its two arguments are a language and an options object.

```js
const addedAt = 1791819000000;
const when = new Date(addedAt);
console.log(when.toISOString());
console.log(when.toLocaleDateString("en-US", { timeZone: "UTC" }));
console.log(when.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }));
// prints: 2026-10-12T15:30:00.000Z
// prints: 10/12/2026
// prints: Oct
```

`toISOString()` gives the standard, sortable text form, always in UTC (the `Z`); it is what APIs and databases exchange. `toLocaleDateString()` is for display. `timeZone: "UTC"` is here only so the output is the same on every machine; leave it out and the date is shown in the computer's own time zone, which is what a user wants. The instructor's class used `new Date().toLocaleDateString("en-US", { month: "short" })` to get the current month's short name.

### Months count from 0

MDN: "months are zero-based, so December is 11". January is month `0`.

```js
const d = new Date(2026, 0, 31);
console.log(d.getMonth());
console.log(d.getMonth() + 1);
console.log(d.getDate());
// prints: 0
// prints: 1
// prints: 31
```

`new Date(2026, 0, 31)` is 31 January 2026 (year, month, day, in local time). Days of the month count from 1 as usual; only the month is off by one. Add 1 before you show a month number, and pass `month - 1` when you build a date from one.

MDN calls `Date` legacy: "Note: With the introduction of the Temporal API, the Date object is considered a legacy feature. Consider using Temporal for new code". Temporal is the replacement. Official Node 26 ships it, but this laptop's Node is a distro build without it (`typeof Temporal` is `'undefined'` here), and not every browser has it yet (MDN Baseline: limited). So the instructor's code and almost every codebase you will read use `Date`: learn it, and expect Temporal later.

### Padding numbers: `padStart()`

`padStart()` adds characters to the front of a string until it is long enough. MDN: "The padStart() method of String values pads this string with a given string (repeated and/or truncated, if needed) so that the resulting string has a given length." It works on strings, so turn a number into one with `String()` (4.1) first.

```js
console.log(String(25).padStart(4, "0"));
console.log(`#${String(7).padStart(3, "0")}`);
const minutes = 5;
console.log(`9:${String(minutes).padStart(2, "0")}`);
// prints: 0025
// prints: #007
// prints: 9:05
```

The first argument is the length you want, the second the filler. A string that is already long enough comes back unchanged. That is how the Pokédex shows `#0025` (week 6) and how a clock shows `9:05`. `padEnd()` does the same at the back.

### Finding one object by a property

Give `.find()` a test that reads a property. MDN's own example is titled "Find an object in an array by one of its properties".

```js
const songs = [
  { id: 1, artist: "ana", title: "Rain", plays: 3, addedAt: 1000 },
  { id: 2, artist: "ben", title: "Sun", plays: 9, addedAt: 3000 },
  { id: 3, artist: "ana", title: "Snow", plays: 5, addedAt: 2000 },
];
const song = songs.find(s => s.id === 2);
console.log(song.title);
song.plays = song.plays + 1;
console.log(songs[1].plays);
// prints: Sun
// prints: 10
```

`.find()` hands back the object **itself**, not a copy (objects are shared, as in the spread section above). So changing `song.plays` changed the object inside `songs`. That is how a button on one item updates the right record.

If no id matches, `.find()` gives `undefined` (11.1), and `song.plays` then throws `TypeError: Cannot read properties of undefined`. Check first: `if (!song) return;` inside a function.

### Sorting objects by a property

The compare function reads the property from `a` and from `b`. MDN: "Arrays of objects can be sorted by comparing the value of one of their properties."

```js
const songs = [
  { id: 1, artist: "ana", plays: 3, addedAt: 1000 },
  { id: 2, artist: "ben", plays: 9, addedAt: 3000 },
  { id: 3, artist: "ana", plays: 5, addedAt: 2000 },
];
const mostPlayed = songs.toSorted((a, b) => b.plays - a.plays);
const newest = songs.toSorted((a, b) => b.addedAt - a.addedAt);
const byAna = songs.filter(s => s.artist === "ana");
console.log(mostPlayed.map(s => s.id));
console.log(newest.map(s => s.id));
console.log(byAna.map(s => s.id));
console.log(songs.map(s => s.id));
// prints: [ 2, 3, 1 ]
// prints: [ 2, 3, 1 ]
// prints: [ 1, 3 ]
// prints: [ 1, 2, 3 ]
```

`b.plays - a.plays` is the descending pattern from 11.1, applied to a property. Because it used `toSorted()`, `songs` kept its original order, which the last line proves. With `.sort()` the list itself would have been reordered.

Ties keep their original order: `sort` and `toSorted` are **stable**. MDN: "Since version 10 (or ECMAScript 2019), the specification dictates that Array.prototype.sort is stable." That is why records with the same timestamp come out oldest-first unless you add the id tie-break above.

### Sorting by a text property: `localeCompare()`

`a - b` only works on numbers. On two strings it gives `NaN`, which `.sort()` treats as "equal", so nothing moves and no error appears. The default text sort is no better for names, because capitals come before every lowercase letter (11.1). For text, compare with `localeCompare()`. MDN: "The localeCompare() method of String values returns a number indicating whether this string comes before, or after, or is the same as the given string in sort order." That number is exactly what a compare function returns.

```js
const names = ["bob", "Cara", "ann"];
console.log(names.toSorted());
console.log(names.toSorted((a, b) => a - b));
console.log(names.toSorted((a, b) => a.localeCompare(b)));
const songs = [{ title: "rain" }, { title: "Sun" }, { title: "apple" }];
const byTitle = songs.toSorted((a, b) => a.title.localeCompare(b.title));
console.log(byTitle.map(s => s.title));
// prints: [ 'Cara', 'ann', 'bob' ]
// prints: [ 'bob', 'Cara', 'ann' ]
// prints: [ 'ann', 'bob', 'Cara' ]
// prints: [ 'apple', 'rain', 'Sun' ]
```

For Z to A, swap them: `b.localeCompare(a)`.

### Seeing records as a table: `console.table()`

Printed with `console.log`, an array of objects is a pile of braces. `console.table()` lays it out in rows and columns. MDN: "The console.table() static method displays tabular data as a table." Each object is a row, each key a column, and the `(index)` column is the position in the array.

```js
const songs = [
  { id: 1, title: "Rain", plays: 3 },
  { id: 2, title: "Sun", plays: 9 },
];
console.table(songs);
// prints: ┌─────────┬────┬────────┬───────┐
// prints: │ (index) │ id │ title  │ plays │
// prints: ├─────────┼────┼────────┼───────┤
// prints: │ 0       │ 1  │ 'Rain' │ 3     │
// prints: │ 1       │ 2  │ 'Sun'  │ 9     │
// prints: └─────────┴────┴────────┴───────┘
```

It is a debugging view, like `console.log` in 1.3: use it to check your tiny database in the middle of a script, then remove it. A second argument picks the columns: `console.table(songs, ["title"])`.

### Giving each new object a unique id

A counter variable outside the function is the simplest way: use it, then add one, so no two objects get the same number.

```js
const playlist = [];
let nextId = 1;
function addSong(artist, title) {
  const song = { id: nextId, artist, title, plays: 0, addedAt: Date.now() };
  nextId = nextId + 1;
  playlist.push(song);
  return song;
}
addSong("ana", "Rain");
addSong("ben", "Sun");
console.log(playlist.map(s => s.id));
console.log(playlist[1].plays);
// prints: [ 1, 2 ]
// prints: 0
```

`artist, title` inside the object is the property value shorthand from earlier in this section.

### Reading the instructor's files: `require` and `module.exports`

Your files share code between files with `import` and `export` (gap lesson 2.14). The instructor's class files, and his week-7 Express project, use Node's older system, **CommonJS**. Node docs: "CommonJS modules are the original way to package JavaScript code for Node.js." Which system a `.js` file uses is decided by the nearest `package.json`. Node docs: "If a package.json file does not have a "type" field, .js files are treated as CommonJS." This course folder's `package.json` says `"type": "module"`, so your files are ES modules.

What CommonJS looks like (read only: it does not run in this folder):

```text
// greetStudents.js, as in the instructor's class code: what the file hands out
function greetStudents(names) { ... }
module.exports = greetStudents;

// app.js: how another CommonJS file loads it
const greetStudents = require("./greetStudents");
```

`module.exports = x` says what the file hands out; `require("./file")` loads another file and gives back whatever it exported. The ES module version is `export default greetStudents;` and `import greetStudents from "./greetStudents.js";` (2.14). Put CommonJS code in a file in this folder, like this one:

```text
function greetStudents(name) {
  return `Hi ${name}`;
}
module.exports = greetStudents;
```

and Node refuses. It stops with `ReferenceError: module is not defined in ES module scope`, and a `require(...)` call fails the same way: `ReferenceError: require is not defined in ES module scope, you can use import instead`. Read the instructor's CommonJS; write ES modules here. Browsers understand only ES modules, and a lot of existing Node code and npm packages are still CommonJS, so you will read both for years.

## 12.4 Classes: a template for objects

**Sources:** [MDN — Object-oriented programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming) · [MDN — Classes in JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Classes_in_JavaScript) · [MDN — Using classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) · [MDN — Classes (reference)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) · [MDN — Public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)
**Skills:** oop_modeling, class_as_template, instance_term, class_declaration, class_constructor_method, class_constructor_this, class_new_instance, class_call_without_new, class_instance_methods, class_methods_shared, class_default_constructor, class_one_constructor, class_field_declaration, class_field_default, class_field_no_keyword, class_field_vs_this, class_field_init_order, class_not_hoisted, class_strict_mode, class_expression, class_per_instance_function_waste, class_constructor_no_return

### Modelling a system with objects

In 12.1 to 12.3 you built objects one at a time, then many at a time with factory functions and constructors. A **class** is the built-in, tidier way to do the same job. It is the standard syntax when you need many objects of one kind with shared methods; much modern code uses plain objects and functions instead (12.7 discusses when to choose which).

First the idea behind it. MDN: "Object-oriented programming is about modeling a system as a collection of objects, where each object represents some particular aspect of the system." A shop might have one object per customer, one per order, one per product. Each object bundles its own data (a name, a price) with the actions that belong to it (add to cart, apply discount). That style is called **object-oriented programming**, or OOP.

### A class is a template, an instance is one object made from it

MDN: "On its own, a class doesn't do anything: it's a kind of template for creating concrete objects of that type." Think of a cookie cutter: the cutter is the class, each cookie is one object cut from it.

Each object made from a class is called an **instance** of it. MDN: "Each time you call new, a different instance is created." Two instances made from the same class have the same shape but their own separate values.

### Declaring a class

You declare a class with the `class` keyword, then a name. MDN: "You can declare a class using the class keyword." By the same rule you met for constructors in 12.3, the name starts with a capital letter. You create an instance by calling the class by name with `new`, just as you did with a constructor function.

```js
class Cat {}
const tom = new Cat();
console.log(tom);
// prints: Cat {}
```

`Cat {}` is how `console.log` shows an instance: the class name, then its properties. This cat has none yet, so the braces are empty.

### The constructor method

A class gets its starting values from a special method named `constructor`. MDN: "The constructor is defined using the constructor keyword." It runs once, automatically, every time you use `new`.

Inside the constructor, `this` is the new instance. MDN: "Within a class constructor, the value of this points to the newly created instance." So `this.name = name` puts a property on the object being built, exactly like the constructor functions in 12.3.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const ada = new Person("Ada", 36);
console.log(ada);
console.log(ada.name);
// prints: Person { name: 'Ada', age: 36 }
// prints: Ada
```

You create the instance with the class name and `new`. MDN: "Note that we call the constructor using the name of the class, Person in this example." The values in the parentheses go straight to the constructor's parameters.

Here is the old way and the new way side by side. They build the same kind of object:

```js
function PersonFn(name) {
  this.name = name;
}
class PersonCls {
  constructor(name) {
    this.name = name;
  }
}
console.log(new PersonFn("Ada"));
console.log(new PersonCls("Ada"));
// prints: PersonFn { name: 'Ada' }
// prints: PersonCls { name: 'Ada' }
```

**Python habit that breaks here:** a Python class is `class Person:` with `def __init__(self, name):`, and you write `self.name = name`. In JavaScript the setup method is called `constructor`, it takes no `self` parameter, and the new object is `this` automatically.

### A class cannot be called without `new`

A constructor function called without `new` misbehaves: in an old script it quietly writes to the global object, and in your ES-module files it throws `TypeError: Cannot set properties of undefined` (12.3). A class always refuses, with a clearer message. MDN: "However, attempting to "call" a class without new will result in an error."

```js
// ERROR EXAMPLE: TypeError
class Person {
  constructor(name) {
    this.name = name;
  }
}
const ada = Person("Ada");
```

Node stops with `TypeError: Class constructor Person cannot be invoked without 'new'`. This is a runtime error: the syntax is fine, so lines before it would have run.

**Python habit that breaks here:** in Python you call a class like a function, `Person("Ada")`, with no keyword. JavaScript needs `new`.

### Methods

Actions go in the class body as methods. You write the method name, parentheses, and a body in braces. There is no `function` keyword and no commas between members. MDN: "an introduceSelf() method that can refer to the object's properties using this."

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hi, I'm ${this.name}`;
  }
}
const ada = new Person("Ada");
const bo = new Person("Bo");
console.log(ada.greet());
console.log(bo.greet());
// prints: Hi, I'm Ada
// prints: Hi, I'm Bo
```

When `ada` calls `greet()`, `this` is `ada`, so it uses Ada's name. Bo's call uses Bo's. The same method serves every instance.

**Common mistake:** putting a comma between members, the way you do between the properties of an object literal. A class body is not a list of properties, so the comma is a `SyntaxError`:

```js
// ERROR EXAMPLE: SyntaxError
class Person {
  greet() {
    return "hi";
  },
  wave() {
    return "wave";
  }
}
```

**Python habit that breaks here:** a Python method is `def greet(self):`. A JavaScript method has no `self` parameter, and you reach the instance with `this`.

### Methods are shared; functions made in the constructor are not

MDN: "Methods are defined on the prototype of each class instance and are shared by all instances." You will see what a prototype is in 12.8. For now the effect is what matters: there is **one** copy of each method, however many instances you make.

A function created inside the constructor is different. MDN: "However, a problem is that this creates a new function every time a Color instance is created, even when they all do the same thing!" (In MDN's example the class is called `Color`.) You can see the difference with `===`, which is only `true` when both sides are the very same function:

```js
class Wasteful {
  constructor() {
    this.hello = function () {
      return "hi";
    };
  }
}
class Shared {
  hello() {
    return "hi";
  }
}
console.log(new Wasteful().hello === new Wasteful().hello);
console.log(new Shared().hello === new Shared().hello);
// prints: false
// prints: true
```

Two `Wasteful` instances each carry their own copy of the function. Two `Shared` instances use the same one. Write ordinary actions as methods in the class body.

### A class with no constructor

If an object needs no starting values, leave the constructor out. MDN: "If you don't need to do any special initialization, you can omit the constructor, and a default constructor will be generated for you:"

```js
class Greeter {
  hello() {
    return "hi";
  }
}
const g = new Greeter();
console.log(g.hello());
console.log(g);
// prints: hi
// prints: Greeter {}
```

### Only one constructor

A class can have only one constructor. MDN: "There can only be one special method with the name "constructor" in a class — a SyntaxError is thrown if the class contains more than one occurrence of a constructor method."

```js
// ERROR EXAMPLE: SyntaxError
class Person {
  constructor(name) {
    this.name = name;
  }
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

This is a syntax error, so Node reports `SyntaxError: A class may only have one constructor` and runs **nothing** in the file, not even lines above the class.

### Fields: listing a class's properties up front

You can list a class's properties at the top of the body. MDN: "However, listing properties explicitly in the class declaration might make it easier for people reading your code to see which properties are part of this class." A **field** is a property declared in the class body. Give it a starting value with `=`, or leave the value off.

```js
class Player {
  name;
  score = 0;
  constructor(name) {
    this.name = name;
  }
}
const p = new Player("Kim");
console.log(p);
console.log(p.score);
// prints: Player { name: 'Kim', score: 0 }
// prints: 0
```

`score = 0` gives every new player a score of 0 without any code in the constructor. A field with no value is `undefined`. MDN: "Fields without default values default to undefined." It still exists on the instance:

```js
class Player {
  nickname;
}
console.log(new Player().nickname);
console.log(new Player());
// prints: undefined
// prints: Player { nickname: undefined }
```

**Common mistake:** declaring a field with `let` or `const`. MDN: "Class fields are similar to object properties, not variables, so we don't use keywords such as const to declare them." Write just the name:

```js
// ERROR EXAMPLE: SyntaxError
class Player {
  const score = 0;
}
```

A field with a value is nearly the same as assigning to `this` in the constructor. MDN: "Public fields are almost equivalent to assigning a property to this." These two classes build the same instance:

```js
class WithField {
  count = 1;
}
class WithConstructor {
  constructor() {
    this.count = 1;
  }
}
console.log(new WithField());
console.log(new WithConstructor());
// prints: WithField { count: 1 }
// prints: WithConstructor { count: 1 }
```

Fields are set up one at a time, from the top of the class down. MDN: "Fields are added one-by-one. Field initializers can refer to field values above it, but not below it." A field can use one above it, but a field below it does not exist yet, so reading it gives `undefined`:

```js
class Box {
  width = 2;
  doubled = this.width * 2;
  tripled = this.later * 3;
  later = 5;
}
console.log(new Box());
// prints: Box { width: 2, doubled: 4, tripled: NaN, later: 5 }
```

`doubled` worked because `width` was above it. `tripled` read `this.later` before `later` was set, got `undefined`, and `undefined * 3` is `NaN`.

### A class must be declared before you use it

A function declaration is hoisted, so you can call it above its definition (8.1). A class is not. MDN says classes follow the same rules as `let` and `const`, "which means you cannot use a class before it is declared."

```js
// ERROR EXAMPLE: ReferenceError
const x = new Late();
class Late {}
```

Node stops with `ReferenceError: Cannot access 'Late' before initialization`. Put the class above the code that uses it.

### Class code runs in strict mode

MDN: "The body of a class is executed in strict mode even without the "use strict" directive." **Strict mode** is a stricter set of rules in which some quiet mistakes become real errors. Here is one you met in 9.1: assigning to a name that was never declared. Your files are ES modules, and **all module code is strict** too, so in this folder a plain function already refuses:

```js
// ERROR EXAMPLE: ReferenceError
function sloppy() {
  oops = 5;
}
sloppy();
```

Node stops with `ReferenceError: oops is not defined`. In an old-style script (a CommonJS file, or a browser `<script>` without `type="module"`) the same plain function would quietly create a global variable `oops` instead. Class bodies are strict *everywhere*, even in those old scripts, so the same slip inside a class always crashes:

```js
// ERROR EXAMPLE: ReferenceError
class Strict {
  run() {
    typo = 5;
  }
}
new Strict().run();
```

Node reports `ReferenceError: typo is not defined`, which is much easier to catch than a silent global. (The project's ESLint flags both lines as you type, `no-undef`.)

### Class expressions

Like functions (8.2), a class can also be written as an expression and stored in a variable. MDN: "Similar to functions, class declarations also have their expression counterparts." You will mostly see declarations, so this is only for recognising it.

```js
const Point = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};
console.log(new Point(1, 2));
// prints: Point { x: 1, y: 2 }
```

### Do not return a value from a constructor

MDN: "You are advised to not return any value from the constructor — because if you return a non-primitive value, it will become the value of the new expression, and the value of this is dropped." If you return an object, it replaces the instance you were building:

```js
class Odd {
  constructor() {
    this.kept = "lost";
    return { replaced: true };
  }
}
console.log(new Odd());
// prints: { replaced: true }
```

`this.kept` was set, but the returned object won the exchange and the instance is gone. Let the constructor finish without a `return` and `new` hands back the instance for you.

## 12.5 Class members: accessors, static and this

**Sources:** [MDN — Using classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) · [MDN — Classes (reference)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) · [MDN — static](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) · [MDN — this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) · [MDN — Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) · [MDN — Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) · [MDN — throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
**Skills:** class_accessors_as_properties, class_accessor_not_a_property, class_getter_only_readonly, class_getter_assign_silent, throw_refuses_bad_input, static_keyword, static_purpose, static_not_on_instance, static_this_is_class, static_from_instance_method, static_via_class_name, static_accessors_mention, static_block, this_lost_when_extracted, this_lost_error_on_access, this_callback_depends_on_caller, bind_fixes_this, bind_methods_in_constructor, arrow_this_lexical, arrow_field_auto_bound, arrow_field_memory_cost, bind_partial_application, bound_this_cannot_be_rebound, instance_field_this

### Getters and setters in a class

You met `get` and `set` on object literals in 12.2. They work the same way in a class body. MDN: "Accessor fields allow us to manipulate something as if it is an "actual property"." Reading the property runs the getter, assigning to it runs the setter, and neither needs parentheses. As in 12.2, the stored value uses a name with a leading underscore so it does not clash with the accessor's name. (In a class, use a `#private` field instead, 12.6: that is what to write. Airbnb's guide says "Do not use trailing or leading underscores".)

```js
class Thermostat {
  constructor(celsius) {
    this._celsius = celsius;
  }
  get fahrenheit() {
    return this._celsius * 9 / 5 + 32;
  }
  set fahrenheit(f) {
    this._celsius = (f - 32) * 5 / 9;
  }
}
const t = new Thermostat(20);
console.log(t.fahrenheit);
t.fahrenheit = 212;
console.log(t._celsius);
// prints: 68
// prints: 100
```

Only `_celsius` is stored on the instance. `fahrenheit` is worked out when you read it and converted back when you assign to it.

Style guides disagree about accessors: Airbnb's bans them, while Google's TypeScript guide allows them as long as the getter is pure ("getters must not change observable state"), and MDN and TypeScript use them freely. Keep getters cheap and free of side effects, and back them with `#private` fields, not `_name`.

### An accessor looks like a property but is not one

MDN: "It looks as if the object has a property called red — but actually, no such property exists on the instance!" (In MDN's example the accessor is called `red`.) You can see this by listing the instance's own keys:

```js
class Square {
  constructor(side) {
    this.side = side;
  }
  get area() {
    return this.side * this.side;
  }
}
const sq = new Square(4);
console.log(sq.area);
console.log(Object.keys(sq));
console.log(sq);
// prints: 16
// prints: [ 'side' ]
// prints: Square { side: 4 }
```

`area` is not in the list and not in the printout. It is a method pretending to be a property.

### A getter with no setter is read-only

MDN: "If a field only has a getter but no setter, it will be effectively read-only." What happens when you try to assign to it depends on strict mode (12.4). Your `.js` files are ES modules, which are always strict, so the assignment throws:

```js
// ERROR EXAMPLE: TypeError
class Square {
  constructor(side) {
    this.side = side;
  }
  get area() {
    return this.side * this.side;
  }
}
const sq = new Square(4);
sq.area = 99;
```

Node stops with `TypeError: Cannot set property area of #<Square> which has only a getter`. MDN describes the same error for strict mode ("the red.red = 0 line will throw a type error") and the other case too: "In non-strict mode, the assignment is silently ignored." That silent version only happens in old non-strict scripts. Old scripts turn strict mode on by putting the line `"use strict";` at the very top of the file. ES modules and class bodies are already strict, so modern code never writes that line. A silent failure is the worse of the two, which is one reason strict mode became the default.

### Refusing bad input: `throw`

A setter can do more than store a value: it can say no. `throw` stops the current function on the spot and sends an error to whoever called it. MDN: "The throw statement throws a user-defined exception. Execution of the current function will stop (the statements after throw won't be executed), and control will be passed to the first catch block in the call stack. If no catch block exists among caller functions, the program will terminate." Catching comes in 12.9. Until then a throw ends the program with your message, just as Node's own errors have all along.

```js
// ERROR EXAMPLE: RangeError
class Thermostat {
  constructor(celsius) {
    this._celsius = celsius;
  }
  get celsius() {
    return this._celsius;
  }
  set celsius(value) {
    if (value < -50 || value > 50) {
      throw new RangeError("celsius must be between -50 and 50");
    }
    this._celsius = value;
  }
}
const t = new Thermostat(20);
t.celsius = 22;
console.log(t.celsius);
t.celsius = 900;
console.log("never reached");
// prints: 22
```

`22` passes the check and is stored. `900` fails it: the `throw` line runs, the line below it never does, `_celsius` stays 22, and Node stops with `RangeError: celsius must be between -50 and 50`. `new RangeError("...")` builds an error object, the way `new Date()` builds a date (12.3). `RangeError` is the built-in kind for a number outside the allowed range; use `TypeError` for the wrong kind of value, or a plain `Error`. Always throw an error object, never a bare string like `throw "too hot"`: only an error object records where it happened (its stack, 10.3), and the project's ESLint enforces it (`no-throw-literal`).

### Static members belong to the class

Put `static` in front of a method or field and it belongs to the **class itself**, not to the instances. MDN: "Static properties cannot be directly accessed on instances of the class. Instead, they're accessed on the class itself."

```js
class MathTools {
  static double(n) {
    return n * 2;
  }
}
console.log(MathTools.double(4));
// prints: 8
```

You call it on the class name, with no `new` at all.

### What static is for

MDN: "Static methods are often utility functions, such as functions to create or clone objects, whereas static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances." Two common uses are a function that builds instances in a handy way, and one value shared by every instance:

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  static fromText(text) {
    const parts = text.split(" ");
    return new Person(parts[0], Number(parts[1]));
  }
}
console.log(Person.fromText("Ada 36"));
// prints: Person { name: 'Ada', age: 36 }
```

```js
class Ticket {
  static issued = 0;
  constructor() {
    Ticket.issued += 1;
    this.number = Ticket.issued;
  }
}
new Ticket();
new Ticket();
console.log(Ticket.issued);
console.log(new Ticket());
// prints: 2
// prints: Ticket { number: 3 }
```

`issued` exists once, on `Ticket`, and counts every ticket made. Each ticket's own `number` is a normal per-instance property.

### An instance cannot reach a static member

MDN: "They are not accessible from instances." Reading one off an instance gives `undefined`, and calling it is a `TypeError`:

```js
// ERROR EXAMPLE: TypeError
class MathTools {
  static double(n) {
    return n * 2;
  }
}
const m = new MathTools();
console.log(m.double);
console.log(m.double(4));
// prints: undefined
```

The first line prints `undefined`. The call then stops with `TypeError: m.double is not a function`.

### `this` in a static method is the class

Inside a static method, `this` is the class. MDN: "In order to call a static method or property within another static method of the same class, you can use the this keyword."

```js
class Calc {
  static double(n) {
    return n * 2;
  }
  static quadruple(n) {
    return this.double(this.double(n));
  }
}
console.log(Calc.quadruple(3));
// prints: 12
```

### Reaching a static member from a normal method

A normal method's `this` is the instance, and the instance has no static members. MDN: "Static members are not directly accessible using the this keyword from non-static methods."

```js
// ERROR EXAMPLE: TypeError
class Calc {
  static double(n) {
    return n * 2;
  }
  run() {
    return this.double(5);
  }
}
console.log(new Calc().run());
```

Node stops with `TypeError: this.double is not a function`. MDN: "You need to call them using the class name:" Write `Calc.double(5)` instead. MDN also shows `this.constructor.double(5)` as another way to reach the class from an instance. It works because every class's `prototype` object (12.8) has a `constructor` property pointing back to the class, so `this.constructor` is the class itself. `ClassName.member` is the usual form; `this.constructor.member` is used when a subclass should reach its own version.

```js
class Calc {
  static double(n) {
    return n * 2;
  }
  run() {
    return Calc.double(5);
  }
}
console.log(new Calc().run());
// prints: 10
```

### Static accessors and static blocks

You will rarely write these, but you should recognise them. MDN: "This page introduces public static properties of classes, which include static methods, static accessors, and static fields." A static accessor is `static get` or `static set`:

```js
class Config {
  static get version() {
    return "1.0";
  }
}
console.log(Config.version);
// prints: 1.0
```

A **static initialization block** is a `static { }` block of setup code. MDN: "There is also a special construct called a static initialization block, which is a block of code that runs when the class is first loaded." Inside it, `this` is the class:

```js
class Setup {
  static ready;
  static {
    this.ready = "yes";
  }
}
console.log(Setup.ready);
// prints: yes
```

### When `this` is lost

A method gets its `this` from **how it is called**, not from where it was written. Call it as `c.increment()` and `this` is `c`. Copy it into a variable and call that, and there is nothing in front of the dot, so `this` is `undefined`. MDN: "the this value will be undefined inside the method." Class code is strict (12.4), which is why it is `undefined` rather than the global object.

```js
// ERROR EXAMPLE: TypeError
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count += 1;
    return this.count;
  }
}
const c = new Counter();
console.log(c.increment());
const inc = c.increment;
console.log(inc());
// prints: 1
```

The first call works. The second crashes with `TypeError: Cannot read properties of undefined (reading 'count')`. MDN: "Calling methods with an undefined this will throw an error if the method tries to access properties on this." That is exactly what `this.count` did.

**Python habit that breaks here:** a Python method remembers its object, so `inc = c.increment` still works later. A JavaScript method does not carry its object with it.

### Callbacks decide `this` for you

The same thing happens when you pass a method to something else as a callback. MDN: "When a function is passed as a callback, the value of this depends on how the callback is called, which is determined by the implementor of the API." You hand over the function, and `forEach` (11.1) calls it as a plain function with nothing in front of it (unless you pass `forEach` a second argument, `thisArg`, which it then uses as `this`).

```js
// ERROR EXAMPLE: TypeError
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count += 1;
    return this.count;
  }
}
const c = new Counter();
[1, 2, 3].forEach(c.increment);
```

Node stops with the same `TypeError: Cannot read properties of undefined (reading 'count')`.

### Fix 1: `.bind()`

`.bind(object)` makes a new function whose `this` is permanently that object. MDN says `.bind()` "creates a new function that, when called, calls this function with its this keyword set to the provided value, and a given sequence of arguments preceding any provided when the new function is called." In that sentence, "this function" is the one you called `.bind()` on.

```js
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count += 1;
    return this.count;
  }
}
const c = new Counter();
const inc = c.increment.bind(c);
console.log(inc());
console.log(inc());
[1, 2].forEach(inc);
console.log(c.count);
// prints: 1
// prints: 2
// prints: 4
```

`inc` is no longer the plain method; it is a bound copy that always uses `c`. Passing it to `forEach` works too.

### Fix 1 inside the class: bind in the constructor

To make every instance safe, bind the method once when the instance is built. MDN: "To achieve this, bind the class methods in the constructor:"

```js
class Counter {
  constructor() {
    this.count = 0;
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.count += 1;
    return this.count;
  }
}
const c = new Counter();
const inc = c.increment;
console.log(inc());
console.log(inc());
// prints: 1
// prints: 2
```

`this.increment = this.increment.bind(this)` replaces the plain method on this instance with a bound one. Now copying it into a variable is safe.

### Fix 2: arrow functions take `this` from around them

An arrow function has no `this` of its own. MDN: "this retains the value of the enclosing lexical context's this." In plain words: it uses whatever `this` meant on the line where it was written. Inside a method, that is the instance.

```js
class Team {
  constructor(name, members) {
    this.name = name;
    this.members = members;
  }
  list() {
    return this.members.map((m) => `${m} of ${this.name}`);
  }
}
console.log(new Team("Red", ["Ann", "Bo"]).list());
// prints: [ 'Ann of Red', 'Bo of Red' ]
```

The arrow function passed to `map` uses the `this` of `list()`, which is the team. An ordinary `function` in the same spot would get a lost `this` and crash:

```js
// ERROR EXAMPLE: TypeError
class Team {
  constructor(name, members) {
    this.name = name;
    this.members = members;
  }
  list() {
    return this.members.map(function (m) {
      return `${m} of ${this.name}`;
    });
  }
}
console.log(new Team("Red", ["Ann", "Bo"]).list());
```

This is the same rule as in 12.2, where an arrow function used as a *method* of an object literal got the wrong `this`. An arrow function does not choose its `this`; it borrows it from the code around it.

The same fix works from outside the class, at the place where you hand the method over: wrap the call in an arrow, `[1, 2].forEach(() => c.increment());`. The method is still called as `c.increment()`, so `this` is `c`. This is the most common fix in everyday code (`button.addEventListener('click', () => this.save())` is the same shape): it costs nothing per instance and works with ordinary shared methods.

### Fix 2 in a class: an arrow function stored in a field

Put an arrow function in a field and it is built for each instance, in the constructor's context, so its `this` is that instance forever. MDN: "Arrow function properties are often said to be "auto-bound methods"".

```js
class Counter {
  count = 0;
  increment = () => {
    this.count += 1;
    return this.count;
  };
}
const c = new Counter();
const inc = c.increment;
console.log(inc());
console.log(inc());
// prints: 1
// prints: 2
```

This works because a field initializer runs with `this` set to the instance being built. MDN: "Instance fields are evaluated with this set to the instance being constructed."

```js
class Holder {
  self = this;
}
const h = new Holder();
console.log(h.self === h);
// prints: true
```

### The price of binding

A normal method is shared by every instance (12.4). A bound method and an arrow-function field are not. MDN: "each instance of the class will have its own copy of the method, which increases memory usage. Only use it where absolutely necessary." For a handful of objects this does not matter; for thousands it adds up.

The two auto-binding forms differ in one more way. The arrow field lives on each instance, not on the prototype (12.8), so a subclass (12.7) cannot override it with an ordinary method that calls `super.go()`: the instance's own field hides the override. Binding in the constructor keeps the method on the prototype, so `super.go()` keeps working. The field form is shorter; the constructor form is the one to choose when subclasses will override the method. Prefer the arrow at the call site when it is enough.

```js
class Plain {
  go() {}
}
class Arrow {
  go = () => {};
}
console.log(new Plain().go === new Plain().go);
console.log(new Arrow().go === new Arrow().go);
// prints: true
// prints: false
```

### Two more things `.bind()` can do

**Fill in the first arguments early.** MDN: "Another use of bind() is to make a function with pre-specified initial arguments." The first parameter of `.bind()` is the `this` value; `null` means you do not care about `this`.

```js
function add(a, b) {
  return a + b;
}
const addTen = add.bind(null, 10);
console.log(addTen(5));
// prints: 15
```

**It cannot be changed afterwards.** MDN: "The newly bound thisArg value is ignored, because the target function of boundFn2, which is boundFn, already has a bound this." Binding a function that is already bound does not change its `this`:

```js
function who() {
  return this.name;
}
const first = { name: "first" };
const second = { name: "second" };
const bound = who.bind(first);
const rebound = bound.bind(second);
console.log(bound());
console.log(rebound());
// prints: first
// prints: first
```

## 12.6 Privacy and encapsulation

**Sources:** [MDN — Object-oriented programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming) · [MDN — Using classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) · [MDN — Classes in JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Classes_in_JavaScript) · [MDN — Classes (reference)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) · [TypeScript Handbook — Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) · [MDN — Private elements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements)
**Skills:** encapsulation_term, encapsulation_benefit, encapsulated_logic_in_method, privacy_convention_vs_enforced, private_field_syntax, private_must_be_declared, private_outside_syntax_error, private_hard_private, private_missing_throws, private_methods, private_accessors, private_validation_via_setters, private_same_class_instances, private_unique_names, class_element_taxonomy, ts_bridge_visibility, ts_bridge_private_vs_hash, ts_bridge_readonly, ts_bridge_parameter_properties, ts_bridge_implements

### Encapsulation

MDN: "Keeping an object's internal state private, and generally making a clear division between its public interface and its private internal state, is called encapsulation." The **public interface** is what other code is allowed to use (the methods and properties you meant to share). The **private internal state** is everything else.

### Why hide anything

MDN: "This is a useful feature because it enables the programmer to change the internal implementation of an object without having to find and update all the code that uses it: it creates a kind of firewall between this object and the rest of the system." If outside code only uses the public interface, you can rewrite the inside later and nothing outside breaks.

### Put a rule in one method

MDN's example is a student who may join an archery class only in some years. MDN: "It would be better to have a canStudyArchery() method on Student objects, that implements the logic in one place:" Compare checking the property from outside, everywhere, with asking the object:

```js
class Student {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  canStudyArchery() {
    return this.year > 1;
  }
}
const ana = new Student("Ana", 1);
const bo = new Student("Bo", 3);
console.log(ana.year > 1, bo.year > 1);
console.log(ana.canStudyArchery(), bo.canStudyArchery());
// prints: false true
// prints: false true
```

The first line repeats the rule (`> 1`) wherever it is needed. If the rule changes to `> 2`, you have to find every copy. The second line asks the object, so the rule lives in one place and changes in one place.

### A leading underscore is only a signal

MDN: "In languages that don't enforce access like this, programmers use naming conventions, such as starting the name with an underscore, to indicate that the property should be considered private." You used this in 12.2. It is a note to other programmers, and nothing stops them:

```js
class Wallet {
  constructor() {
    this._cash = 10;
  }
}
const w = new Wallet();
w._cash = -500;
console.log(w._cash);
// prints: -500
```

### Real privacy: the `#` prefix

JavaScript can enforce privacy. MDN: "A private field is an identifier prefixed with # (the hash symbol)." The `#` is part of the name, and only code inside the class body can use it.

```js
class Account {
  #balance = 0;
  deposit(amount) {
    this.#balance += amount;
  }
  get balance() {
    return this.#balance;
  }
}
const acct = new Account();
acct.deposit(50);
console.log(acct.balance);
console.log(acct);
console.log(Object.keys(acct));
// prints: 50
// prints: Account {}
// prints: []
```

The class reads and writes `#balance` freely. From outside, you can only go through `deposit()` and the `balance` getter. A private field does not show up when you print the object or list its keys. (Chrome DevTools is a debugging exception: MDN notes that code run in the Chrome console can reach private elements, "a DevTools-only relaxation of the JavaScript syntax restriction".)

**Python habit that breaks here:** in Python, `_balance` is only a convention, and `__balance` is name-mangled to `_Account__balance`, which can still be reached. A JavaScript `#balance` is truly enforced.

### Declare private fields up front

MDN: "In order to refer to a private field anywhere in the class, you must declare it in the class body (you can't create a private element on the fly)." Ordinary properties can be created by assigning to them. Private ones cannot:

```js
// ERROR EXAMPLE: SyntaxError
class Account {
  deposit(amount) {
    this.#balance = amount;
  }
}
```

Node reports `SyntaxError: Private field '#balance' must be declared in an enclosing class`.

### Outside access is an error before anything runs

MDN: "Accessing private fields outside the class is an early syntax error." **Early** means it is found while Node reads the file, before it runs a single line. That is the syntax-error rule from 1.3: nothing in the file runs, not even the lines that came first.

```js
// ERROR EXAMPLE: SyntaxError
class Account {
  #balance = 0;
}
console.log("this line never runs");
const acct = new Account();
console.log(acct.#balance);
```

`this line never runs` really never runs, because the error is in the last line and Node stops before starting.

### Hard private

MDN: "Private fields in JavaScript are hard private: if the class does not implement methods that expose these private fields, there's absolutely no mechanism to retrieve them from outside the class." (Apart from the Chrome DevTools exception above.) The `#` is special syntax, not a string, so `"#balance"` is just an ordinary name that does not exist:

```js
class Account {
  #balance = 99;
}
const acct = new Account();
console.log(acct["#balance"]);
// prints: undefined
```

### A missing private field throws

An ordinary missing property gives `undefined`. A private field that is not there is an error. MDN: "Accessing a nonexistent private element throws an error instead of returning undefined like normal properties do."

```js
// ERROR EXAMPLE: TypeError
class Box {
  #secret = 1;
  static peek(other) {
    return other.#secret;
  }
}
console.log(Box.peek(new Box()));
console.log(Box.peek({}));
// prints: 1
```

The first call works. The second passes a plain object that never had `#secret`, so Node stops with `TypeError: Cannot read private member #secret from an object whose class did not declare it`.

To ask whether an object has a private field without risking that error, write `#secret in other` inside the class: it gives `true` or `false` (MDN: "You can use the in operator to check whether an externally defined object possesses a private element."). Recognise it.

### Private methods

Methods can be private too. MDN: "Just like private fields, private methods' names start with #, and they can only be called by the object's own methods:"

```js
class Login {
  #check(password) {
    return password === "open";
  }
  try(password) {
    return this.#check(password) ? "welcome" : "denied";
  }
}
const door = new Login();
console.log(door.try("open"));
console.log(door.try("nope"));
// prints: welcome
// prints: denied
```

Calling `door.#check("open")` from outside is the same early `SyntaxError` as a private field.

### Private getters and setters

MDN: "Private methods and accessors can also be defined using the same syntax as their public counterparts, but with the identifier starting with #." You will see them less often, but they follow the same rule:

```js
class Cart {
  #prices = [5, 10];
  get #total() {
    return this.#prices.reduce((sum, p) => sum + p, 0);
  }
  summary() {
    return `Total: ${this.#total}`;
  }
}
console.log(new Cart().summary());
// prints: Total: 15
```

### Private data plus a setter keeps bad data out

MDN: "But with a well-encapsulated API, we can make our code more robust and prevent logic errors downstream." Keep the value private and let a setter decide what is allowed:

```js
// ERROR EXAMPLE: RangeError
class Score {
  #points = 0;
  get points() {
    return this.#points;
  }
  set points(value) {
    if (value < 0) {
      throw new RangeError("points cannot be negative");
    }
    this.#points = value;
  }
}
const s = new Score();
s.points = 40;
console.log(s.points);
s.points = -5;
// prints: 40
```

The negative value was refused, loudly: the `throw` (12.5) stops the program with `RangeError: points cannot be negative`, and `#points` stays 40. A setter that silently ignores bad data would hide the bug, and a silent failure is the worse of the two (12.5). Professional setters throw a `RangeError` or `TypeError`; 12.9 shows how the calling code catches it. With a plain public property there would be no gate at all.

### Instances of the same class can read each other's private fields

MDN: "A class method can read the private fields of other instances, as long as they belong to the same class."

```js
class Coin {
  #value;
  constructor(value) {
    this.#value = value;
  }
  sameValueAs(other) {
    return this.#value === other.#value;
  }
}
console.log(new Coin(5).sameValueAs(new Coin(5)));
console.log(new Coin(5).sameValueAs(new Coin(9)));
// prints: true
// prints: false
```

### Private names must be unique

MDN: "Private elements have the restriction that all private names declared in the same class must be unique." Declaring the same private name twice is a syntax error, unless the two are a `get #x` / `set #x` pair (MDN: "The only exception is when the two declarations define a getter-setter pair"). An instance `#x` and a `static #x` also clash:

```js
// ERROR EXAMPLE: SyntaxError
class Twice {
  #x = 1;
  #x = 2;
}
```

### Every class member has three properties

MDN: "Together, they add up to 16 possible combinations." Every member of a class has a **kind**, a **place** and a **visibility**:

| | Kind: getter · setter · method · field |
|---|---|
| **Place** | instance (fields on each object; methods and accessors shared on the prototype, 12.8) or `static` (on the class) |
| **Visibility** | public (any code) or private (`#name`, class body only) |

Four kinds, times two places, times two visibilities, gives 16. You have now met all of them; this is the map. A private static member is just both rules together:

```js
class IdMaker {
  static #next = 1;
  static make() {
    const id = IdMaker.#next;
    IdMaker.#next += 1;
    return id;
  }
}
console.log(IdMaker.make());
console.log(IdMaker.make());
// prints: 1
// prints: 2
```

### TypeScript has its own privacy keywords

A TypeScript codebase (the StudyApp example in the gap lessons), and TypeScript adds keywords on top of JavaScript classes. They are **not** JavaScript, and they disappear when the code is compiled. You have seen the first thing already: MDN says JavaScript class fields have no `public` or `private` keywords. TypeScript does. The TypeScript Handbook: "The default visibility of class members is public." TypeScript adds `protected` as well, and the compiler refuses code that breaks the rule:

```ts
// TS ERROR: TS2341
class Account {
  public owner: string;
  private balance: number;
  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }
}
const acct = new Account("Ada", 10);
console.log(acct.balance);
```

TypeScript's `private` is only a check made while compiling. It is not the same as JavaScript's `#`. The Handbook: "private also allows access using bracket notation during type checking." The compiler lets this through, and at run time `balance` is an ordinary property that anyone can read. A `#field` is enforced when the code runs.

```ts
class Account {
  private balance = 10;
}
const acct = new Account();
console.log(acct["balance"]);
```

TypeScript also has `readonly`. The Handbook: "Fields may be prefixed with the readonly modifier. This prevents assignments to the field outside of the constructor."

```ts
// TS ERROR: TS2540
class Point {
  readonly x: number;
  constructor(x: number) {
    this.x = x;
  }
}
const p = new Point(1);
p.x = 2;
```

A constructor can declare and set its fields in one go. The Handbook: "TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value." The word before the parameter is what creates the property:

```ts
class Person {
  constructor(public name: string, private age: number) {}
}
const p = new Person("Ada", 36);
console.log(p.name);
```

That is why a TypeScript app's error classes can declare `public readonly errorClass` inside the constructor's parentheses, with no `this.errorClass = ...` line. These **parameter properties** are valid TypeScript, and Google's TypeScript guide recommends them. But they are not allowed when a project runs `.ts` files through Node's built-in type stripping (Node 26 rejects them with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`) or sets the compiler option `erasableSyntaxOnly`; there you write a field plus a constructor assignment. Follow the project.

Finally, `implements` checks a class against an interface. The Handbook: "You can use an implements clause to check that a class satisfies a particular interface." It adds nothing at run time; it only makes the compiler complain if a promised method is missing:

```ts
// TS ERROR: TS2420
interface Speaker {
  speak(): string;
}
class Cat implements Speaker {
  purr() {
    return "purr";
  }
}
```

You will meet all of this properly in the TypeScript phase. The only goal here is that you do not mistake `private readonly` or `implements` for JavaScript.

## 12.7 Inheritance: extends and super

**Sources:** [MDN — Object prototypes](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object_prototypes) · [MDN — Object-oriented programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming) · [MDN — Classes in JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Classes_in_JavaScript) · [MDN — Using classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) · [MDN — Classes (reference)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) · [MDN — extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) · [MDN — JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
**Skills:** inheritance_concept, superclass_subclass_terms, extends_keyword, inherits_properties, inherits_methods, subclass_adds_fields, super_constructor_call, super_must_come_first, super_before_this, method_overriding, super_method_call, polymorphism_term, default_tostring_useless, json_stringify_returns_string, json_skips_functions_undefined, json_only_own_enumerable, json_tojson_method, instanceof_inheritance, static_inherited, private_not_inherited, single_inheritance, mixins_mention, composition_over_inheritance, extends_needs_constructor, when_to_use_classes, classes_are_a_choice, deep_hierarchy_hazard

### The idea: a more specialised version

Some things are special cases of others. A dog is an animal, a student is a person. MDN: "Inheritance is a feature of object-oriented programming languages that lets programmers express the idea that some objects in a system are more specialized versions of other objects." You write what all animals share once, then write only what is different about dogs.

MDN's names: "In this case, we would say that Person is the superclass or parent class of both Professor and Student." The class that inherits is the **subclass** or **child class**. MDN also says **derived class** for the same thing, and you will see that word in its pages.

### `extends`

MDN: "We use the extends keyword to say that this class inherits from another class." After `extends` you name the parent.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound.`;
  }
}
class Dog extends Animal {}
const rex = new Dog("Rex");
console.log(rex.name);
console.log(rex.speak());
console.log(rex);
// prints: Rex
// prints: Rex makes a sound.
// prints: Dog { name: 'Rex' }
```

`Dog` has an empty body, yet `rex` has a `name` and a `speak()` method. MDN: "The derived class has access to all public properties of the parent class." and "A derived class inherits all methods from its parent." Getters and setters count as methods, so they are inherited too:

```js
class Shape {
  constructor(sides) {
    this.sides = sides;
  }
  get description() {
    return `${this.sides} sides`;
  }
}
class Triangle extends Shape {}
console.log(new Triangle(3).description);
// prints: 3 sides
```

**Python habit that breaks here:** Python writes the parent in brackets, `class Dog(Animal):`. JavaScript uses the word `extends`.

### A subclass can add its own fields

MDN: "The Professor class adds a new property teaches, so we declare that." A subclass declares what is new about it, exactly as in 12.4:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Dog extends Animal {
  tricks = [];
}
const rex = new Dog("Rex");
rex.tricks.push("sit");
console.log(rex);
// prints: Dog { name: 'Rex', tricks: [ 'sit' ] }
```

### `super()`: running the parent's constructor

When a subclass needs its own setup, it writes its own constructor. It must then run the parent's constructor, and the way is `super(...)`. MDN: "The first thing this constructor does is call the superclass constructor using super(), passing up the name parameter."

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
console.log(new Dog("Rex", "collie"));
// prints: Dog { name: 'Rex', breed: 'collie' }
```

`super(name)` hands `name` up to `Animal`'s constructor, which sets `this.name`. Then `Dog` sets its own `breed`.

**Python habit that breaks here:** Python writes `super().__init__(name)`. JavaScript writes `super(name)`.

### `super()` has to come first

MDN: "If a subclass has any of its own initialization to do, it must first call the superclass constructor using super(), passing up any parameters that the superclass constructor is expecting." The reason is that the parent builds the object; until it has, `this` does not exist yet. MDN: "You can have code before super(), but you cannot access this before super()". Code that does not touch `this` is fine, such as working out a value to hand up:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Dog extends Animal {
  constructor(name) {
    const shouted = name.toUpperCase();
    super(shouted);
  }
}
console.log(new Dog("Rex").name);
// prints: REX
```

Using `this` first is an error, and so is forgetting `super()` altogether:

```js
// ERROR EXAMPLE: ReferenceError
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    this.breed = breed;
    super(name);
  }
}
new Dog("Rex", "collie");
```

Node stops with `ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor`. That is a runtime error, so lines before the failing one would have run. You do not have to wait for the run: the project's ESLint catches both mistakes as you type (`no-this-before-super`, and `constructor-super` for a missing `super()`, both in its recommended rules).

### Overriding a method

A subclass can write a method with the same name as one it inherited. Its version wins. MDN: "When a method in a subclass replaces the superclass's implementation, we say that the subclass overrides the version in the superclass."

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound.`;
  }
}
class Dog extends Animal {
  speak() {
    return `${this.name} barks.`;
  }
}
console.log(new Animal("Generic").speak());
console.log(new Dog("Rex").speak());
// prints: Generic makes a sound.
// prints: Rex barks.
```

### Calling the parent's version with `super.method()`

Sometimes you want the parent's behaviour **plus** something extra. MDN: "Within derived classes, you can access the parent class's methods by using super."

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound.`;
  }
}
class Dog extends Animal {
  speak() {
    return `${super.speak()} Woof!`;
  }
}
console.log(new Dog("Rex").speak());
// prints: Rex makes a sound. Woof!
```

### Polymorphism

MDN: "This feature - when a method has the same name but a different implementation in different classes - is called polymorphism." The payoff: code can call `.speak()` on any animal without checking which kind it is, and each object does the right thing.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound.`;
  }
}
class Dog extends Animal {
  speak() {
    return `${this.name} barks.`;
  }
}
class Cat extends Animal {
  speak() {
    return `${this.name} meows.`;
  }
}
const pets = [new Dog("Rex"), new Cat("Tom"), new Animal("Thing")];
for (const pet of pets) {
  console.log(pet.speak());
}
// prints: Rex barks.
// prints: Tom meows.
// prints: Thing makes a sound.
```

Interviewers often ask for the four pillars of OOP. You have all four: **encapsulation** (12.6), **abstraction** (hiding the how behind a method you just call, 8.1), **inheritance** (this section) and **polymorphism** (just above).

### Turning an instance into text: `toString()`

Almost every object inherits a `toString()` method (an object made with `Object.create(null)`, 12.8, has none, and putting it in a template literal throws `TypeError: Cannot convert object to primitive value`), and by default it is not much help. MDN: "However, the base toString() method is notoriously useless, because it prints [object Object] in most cases:" A class can override it, and then anything that needs the object as text, such as a template literal, uses your version:

```js
class Plain {}
class Named {
  constructor(name) {
    this.name = name;
  }
  toString() {
    return `Named: ${this.name}`;
  }
}
console.log(`${new Plain()}`);
console.log(`${new Named("Ada")}`);
// prints: [object Object]
// prints: Named: Ada
```

### Turning an instance into JSON text

To send an object to another program or save it, you usually turn it into **JSON**, a text format. `JSON.stringify()` does that. MDN says it returns "A JSON string representing the given value, or undefined." You get back a plain string:

```js
class Book {
  constructor(title, pages) {
    this.title = title;
    this.pages = pages;
  }
}
const text = JSON.stringify(new Book("Dune", 412));
console.log(text);
console.log(typeof text);
// prints: {"title":"Dune","pages":412}
// prints: string
```

JSON has no way to write a function, so those are left out. MDN: "If any such values are encountered during conversion, they are either omitted (when found in an object) or changed to null (when found in an array)." The same is true of `undefined`:

```js
console.log(JSON.stringify({ a: 1, f() {}, u: undefined }));
console.log(JSON.stringify([1, undefined, () => {}]));
// prints: {"a":1}
// prints: [1,null,null]
```

For a class instance this means only its own data reaches the text. MDN: "Only enumerable own properties are visited." Methods and getters live on the class's prototype (12.8), not on the instance, so they are not written:

```js
class Square {
  constructor(side) {
    this.side = side;
  }
  get area() {
    return this.side * this.side;
  }
  describe() {
    return "a square";
  }
}
console.log(JSON.stringify(new Square(3)));
// prints: {"side":3}
```

If you want to control the text, give the class a `toJSON()` method. MDN: "If the value has a toJSON() method, it's responsible for defining what data will be serialized."

```js
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  toJSON() {
    return { celsius: this.celsius, fahrenheit: this.celsius * 9 / 5 + 32 };
  }
}
console.log(JSON.stringify(new Temperature(100)));
// prints: {"celsius":100,"fahrenheit":212}
```

### `instanceof`: was this object made from this class?

`x instanceof C` is `true` when `x` was made from `C` **or from a class that extends `C`**. MDN's inheritance example is `console.log(color instanceof Color); // true`, and an instance of a child class counts for every ancestor above it:

```js
class Animal {}
class Dog extends Animal {}
const rex = new Dog();
console.log(rex instanceof Dog);
console.log(rex instanceof Animal);
console.log(new Animal() instanceof Dog);
console.log(rex instanceof Array);
// prints: true
// prints: true
// prints: false
// prints: false
```

A dog is a dog and also an animal, but a plain animal is not a dog. You will see exactly how `instanceof` decides in 12.8.

### Static members are inherited too

MDN: "When you use extends, the static methods inherit from each other as well, so you can also override or enhance them." A subclass can call the parent's static method directly, or override it and use `super` inside:

```js
class A {
  static hello() {
    return "hello from A";
  }
}
class B extends A {
  static hello() {
    return `${super.hello()} and B`;
  }
}
class C extends A {}
console.log(A.hello());
console.log(B.hello());
console.log(C.hello());
// prints: hello from A
// prints: hello from A and B
// prints: hello from A
```

### A subclass cannot read the parent's private fields

MDN: "Derived classes don't have access to the parent class's private fields — this is another key aspect to JavaScript private fields being "hard private"." The parent has to expose what it wants shared, through a method:

```js
// ERROR EXAMPLE: SyntaxError
class Parent {
  #secret = 42;
}
class Child extends Parent {
  reveal() {
    return this.#secret;
  }
}
```

This is the same early `SyntaxError` as in 12.6: `Private field '#secret' must be declared in an enclosing class`. The working version has the parent hand it out:

```js
class Parent {
  #secret = 42;
  reveal() {
    return this.#secret;
  }
}
class Child extends Parent {}
console.log(new Child().reveal());
// prints: 42
```

### A class can extend only one class

MDN: "A class can only extend from one class." There is no list after `extends`:

```js
// ERROR EXAMPLE: SyntaxError
class A {}
class B {}
class C extends A, B {}
```

When one parent is not enough, there are other designs. MDN: "Abstract subclasses or mix-ins are templates for classes." A **mix-in** is a function that takes a class and returns a new class with extra behaviour added. It is here so you recognise the word; you will rarely write one.

```js
const Walks = (Base) =>
  class extends Base {
    walk() {
      return `${this.name} walks`;
    }
  };
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Dog extends Walks(Animal) {}
console.log(new Dog("Rex").walk());
// prints: Rex walks
```

### Prefer composition

Inheritance ties a child tightly to its parent: change the parent and every child can break. MDN: "In general, unless there's a very good reason to use inheritance, it's better to use composition instead." **Composition** means one object *holds* another and passes work along, instead of *being* a kind of it:

```js
class Engine {
  start() {
    return "vroom";
  }
}
class Car {
  constructor() {
    this.engine = new Engine();
  }
  start() {
    return this.engine.start();
  }
}
console.log(new Car().start());
// prints: vroom
```

A car is not a kind of engine, so `Car extends Engine` would be the wrong model. A car *has* an engine.

### What `extends` accepts

MDN: "It must evaluate to a valid constructor function or null, or a TypeError is thrown." You can only extend something that can be used with `new`:

```js
// ERROR EXAMPLE: TypeError
class Broken extends 5 {}
```

### Deep family trees get hard to describe

MDN: "However, it is often hard to describe inheritance cleanly when one class can only extend one other class." A chain like `Animal`, `Mammal`, `Dog`, `Retriever`, `GoldenRetriever` looks tidy until something fits two branches, such as a flying mammal. Keep hierarchies shallow.

### When to use a class at all

MDN: "In general, you should consider using classes when you want to create objects that store their own internal data and expose a lot of behavior." You have three ways to make many objects now. A **factory function** (12.3) returns a fresh object each call; a **constructor function** (12.3) is the older `new` pattern; a **class** is the current, tidier form with `#` privacy that keeps methods shared, inheritance and `static`. (A factory can keep data private too, through a closure, 10.2, but then each object gets its own copy of every function.) All three work.

And the choice is yours. MDN: "JavaScript offers the mechanism to organize your code in a canonical object-oriented way, but whether and how to use it is entirely up to the programmer's discretion." A plain object, a factory function or a few separate functions is often simpler. Reach for a class when the object holds its own data and has several actions, or when you need privacy or a family of related types.

## 12.8 Prototypes: what classes are made of

**Sources:** [MDN — Object prototypes](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object_prototypes) · [MDN — Object-oriented programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming) · [MDN — Classes in JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Classes_in_JavaScript) · [MDN — Using classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) · [MDN — extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) · [MDN — instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
**Skills:** classes_sugar_over_prototypes, prototype_chain, prototype_property_lookup, object_prototype_root, get_prototype_of, prototype_varies, instanceof_walks_prototype_chain, instanceof_classes_same, instanceof_primitive_not_instance, instanceof_negation_precedence, instanceof_right_side_error, property_shadowing, object_create, constructor_prototype_property, methods_on_prototype_data_in_constructor, own_properties, prefer_object_hasown, function_constructor_equivalence, extends_wires_prototypes, delegation_pattern, class_vs_object_separation, objects_without_classes, private_no_legacy_equivalent

### Classes sit on top of prototypes

Everything in 12.4 to 12.7 works, but you have not yet seen how. MDN: "It's worth keeping in mind that the features described here are not a new way of combining objects: under the hood, they still use prototypes." A class is a tidier way of setting up something JavaScript already had. Its methods are stored on an object called the class's **prototype**:

```js
class Dog {
  speak() {
    return "woof";
  }
}
console.log(typeof Dog);
console.log(typeof Dog.prototype.speak);
console.log(Object.getPrototypeOf(new Dog()) === Dog.prototype);
// prints: function
// prints: function
// prints: true
```

`Dog` is a function underneath. `Dog.prototype` is an object that holds `speak`. And every dog made with `new` has `Dog.prototype` as **its** prototype.

### Every object has a prototype

Almost every object points to another object, its **prototype**, and that one points to another, and so on. These links are the **prototype chain**. (`Object.prototype`, at the top, and objects made with `Object.create(null)` have `null` as their prototype.) MDN: "The chain ends when we reach a prototype that has null for its own prototype."

You can ask any object for its prototype with `Object.getPrototypeOf()`. MDN: "What is the prototype for myObject? To find out, we can use the function Object.getPrototypeOf():"

```js
const plain = { a: 1 };
const p = Object.getPrototypeOf(plain);
console.log(p === Object.prototype);
console.log(Object.getPrototypeOf(p));
// prints: true
// prints: null
```

A plain object's prototype is `Object.prototype`, and `Object.prototype` has no prototype, so the chain stops there with `null`. MDN: "This is an object called Object.prototype, and it is the most basic prototype, that all objects have by default."

Node and the browser's devtools show an object's prototype as `[[Prototype]]`, and older code reads it as `obj.__proto__` (`[].__proto__ === Array.prototype` is `true`). MDN marks `__proto__` as discouraged and points to `Object.getPrototypeOf()` instead. Recognise it; write `Object.getPrototypeOf()`.

### A prototype is not always `Object.prototype`

MDN: "The prototype of an object is not always Object.prototype." A date's prototype is `Date.prototype`, and an array's is `Array.prototype`. Each of those has `Object.prototype` further up the chain:

```js
const d = new Date();
console.log(Object.getPrototypeOf(d) === Date.prototype);
console.log(Object.getPrototypeOf(d) === Object.prototype);
console.log(Object.getPrototypeOf([]) === Array.prototype);
// prints: true
// prints: false
// prints: true
```

### How a property is looked up

MDN: "When you try to access a property of an object: if the property can't be found in the object itself, the prototype is searched for the property." Then that object's prototype, and so on up the chain, until it is found or the chain ends. If it never turns up, you get `undefined`.

This is why a plain object has a `toString()` you never wrote: it was found on `Object.prototype` at the end of the chain.

```js
const plain = { a: 1 };
console.log(plain.a);
console.log(typeof plain.toString);
console.log(plain.missing);
// prints: 1
// prints: function
// prints: undefined
```

Here is the whole chain for a dog. It is exactly what `extends` builds:

```js
class Animal {}
class Dog extends Animal {}
const rex = new Dog();
const first = Object.getPrototypeOf(rex);
const second = Object.getPrototypeOf(first);
const third = Object.getPrototypeOf(second);
console.log(first === Dog.prototype);
console.log(second === Animal.prototype);
console.log(third === Object.prototype);
console.log(Object.getPrototypeOf(third));
// prints: true
// prints: true
// prints: true
// prints: null
```

`rex` leads to `Dog.prototype`, then `Animal.prototype`, then `Object.prototype`, then `null`.

### What `instanceof` really does

In 12.7 you used `instanceof` to ask whether an object was made from a class or one of its parents. Now you can see how it decides. MDN: `instanceof` "tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object. The return value is a boolean value." You can write it yourself with `Object.getPrototypeOf()` and a loop:

```js
class Animal {}
class Dog extends Animal {}
const rex = new Dog();
function chainHas(obj, proto) {
  let current = Object.getPrototypeOf(obj);
  while (current !== null) {
    if (current === proto) {
      return true;
    }
    current = Object.getPrototypeOf(current);
  }
  return false;
}
console.log(chainHas(rex, Animal.prototype), rex instanceof Animal);
console.log(chainHas(rex, Array.prototype), rex instanceof Array);
// prints: true true
// prints: false false
```

The two columns agree: `instanceof` is that walk up the chain. (The only exception is a class that customises `instanceof` with `Symbol.hasInstance`, which is rare. MDN: "Its behavior can be customized with Symbol.hasInstance.")

It works for classes in the same way as for the older constructor functions. MDN: "Classes behave in the same way, because classes also have the prototype property."

```js
function Cat() {}
class Bird {}
console.log(new Cat() instanceof Cat);
console.log(new Bird() instanceof Bird);
// prints: true
// prints: true
```

### A plain string is not an instance of `String`

A string written in quotes is a **primitive**, not an object, and `instanceof` answers `false` for any primitive straight away. (Its methods still come from `String.prototype`, through a temporary wrapper, so `Object.getPrototypeOf("hi") === String.prototype` is `true`.) MDN's example is `literalString instanceof String; // false, string primitive is not a String`, while an object made with `new String(...)` is, as in `stringObject instanceof String; // true`:

```js
const literal = "hi";
const boxed = new String("hi");
console.log(literal instanceof String);
console.log(boxed instanceof String);
// prints: false
// prints: true
```

(Strings still have methods like `.toUpperCase()`; JavaScript quietly wraps the primitive for the moment of the call.) You will never write `new String(...)` yourself: it makes an object (`typeof boxed` is `'object'`), not a string. Google's guide: "Never use new on the primitive object wrappers"; ESLint `no-new-wrappers`. It appears here only to show the difference.

### Negating `instanceof` needs parentheses

MDN warns that `!myCar instanceof Car` goes wrong: "!myCar will be evaluated before instanceof, so you always try to know if a boolean is an instance of Car". The `!` happens first and turns the object into `false`. Put the whole test in parentheses:

```js
class Animal {}
class Dog extends Animal {}
const cat = new Animal();
console.log(!cat instanceof Dog);
console.log(!(cat instanceof Dog));
// prints: false
// prints: true
```

The first line asks whether the boolean `false` is a `Dog`, which is always `false`. The second asks the question you meant. The project's ESLint flags the first form as you type (`no-unsafe-negation`, in its recommended rules). If you copy this block into a lesson file, put `// prettier-ignore` above the first `console.log`: on save the formatter rewrites it to `(!cat) instanceof Dog`, which shows the mistake instead of hiding it, so the trap disappears.

### The right-hand side must be a constructor

MDN: "Thrown if constructor is not an object." The right side must be a class or a function you can use with `new`:

```js
// ERROR EXAMPLE: TypeError
const rex = {};
console.log(rex instanceof 5);
```

### Shadowing: an object's own property wins

MDN: 'This is called "shadowing" the property.' If an object has its own property with the same name as one further up the chain, the lookup stops at the object itself:

```js
class Dog {
  speak() {
    return "woof";
  }
}
const rex = new Dog();
rex.speak = () => "meow";
console.log(rex.speak());
console.log(new Dog().speak());
// prints: meow
// prints: woof
```

Only `rex` has its own `speak`. Other dogs still find the class's version on the prototype.

### Making an object with a chosen prototype: `Object.create()`

MDN: "The Object.create() method creates a new object and allows you to specify an object that will be used as the new object's prototype."

```js
const animalMethods = {
  speak() {
    return `${this.name} makes a sound`;
  },
};
const rex = Object.create(animalMethods);
rex.name = "Rex";
console.log(rex.speak());
console.log(Object.getPrototypeOf(rex) === animalMethods);
// prints: Rex makes a sound
// prints: true
```

`rex` has only a `name` of its own. `speak` is found by looking up the chain, on `animalMethods`.

### How constructor functions use prototypes

Before classes, a constructor function (12.3) had a `prototype` property of its own. MDN: "So if we set the prototype of a constructor, we can ensure that all objects created with that constructor are given that prototype:" Shared methods go on `Person.prototype`, and every object made with `new Person(...)` can use them.

```js
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return `Hi, ${this.name}`;
};
const ana = new Person("Ana");
console.log(ana.greet());
console.log(Object.getPrototypeOf(ana) === Person.prototype);
console.log(Object.keys(ana));
// prints: Hi, Ana
// prints: true
// prints: [ 'name' ]
```

MDN: "It's common to see this pattern, in which methods are defined on the prototype, but data properties are defined in the constructor." The object itself holds only its own data (`name`). The method lives once on the prototype. That is exactly what a class does for you, and it is why a class method is shared by all instances (12.4).

### Own properties and `Object.hasOwn()`

MDN: "Properties that are defined directly in the object, like name here, are called own properties, and you can check whether a property is an own property using the static Object.hasOwn() method:" The one on the prototype is reachable, but it is not the object's own:

```js
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return `Hi, ${this.name}`;
};
const ana = new Person("Ana");
console.log(Object.hasOwn(ana, "name"));
console.log(Object.hasOwn(ana, "greet"));
console.log(typeof ana.greet);
// prints: true
// prints: false
// prints: function
```

`ana.greet` works, because the lookup finds it up the chain, but `greet` is not one of `ana`'s own properties. MDN also mentions an older method with the same job, `hasOwnProperty()`, which you met in 12.1: "but we recommend that you use Object.hasOwn() if you can."

### The old pattern and the class, side by side

If you came across an older codebase, you will see the constructor-function form. MDN: "If you came from a pre-ES6 world, you may be more familiar with using functions as constructors." The two do the same job:

```js
function DogFn(name) {
  this.name = name;
}
DogFn.prototype.speak = function () {
  return `${this.name} barks`;
};
class DogCls {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} barks`;
  }
}
const a = new DogFn("Rex");
const b = new DogCls("Rex");
console.log(a.speak());
console.log(b.speak());
console.log(Object.keys(a), Object.keys(b));
// prints: Rex barks
// prints: Rex barks
// prints: [ 'name' ] [ 'name' ]
```

### What `extends` does to the chain

MDN: "extends sets the prototype for both ChildClass and ChildClass.prototype." The second link is the one you saw above, for instances. The first is why static members are inherited (12.7): the child **class** itself has the parent **class** as its prototype.

```js
class Animal {}
class Dog extends Animal {}
console.log(Object.getPrototypeOf(Dog) === Animal);
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);
// prints: true
// prints: true
```

### Delegation

The word for the lookup is **delegation**. MDN: "Delegation is a programming pattern where an object, when asked to perform a task, can perform the task itself or ask another object (its delegate) to perform the task on its behalf." When you call `rex.speak()`, `rex` does not have `speak`, so it hands the request along its prototype chain until something does.

```js
class Animal {
  speak() {
    return "a sound";
  }
}
class Dog extends Animal {}
const rex = new Dog();
console.log(Object.hasOwn(rex, "speak"));
console.log(Object.hasOwn(Dog.prototype, "speak"));
console.log(rex.speak());
// prints: false
// prints: false
// prints: a sound
```

Neither `rex` nor `Dog.prototype` has `speak`. The request travels up to `Animal.prototype`, which does.

### How this differs from other languages

MDN: "First, in class-based OOP, classes and objects are two separate constructs, and objects are always created as instances of classes." In a language like Java, the class is a blueprint and the object is something different. In JavaScript the "class" is itself an object (a function) and instances just link to its prototype, so the line between them is blurred. That is why JavaScript can do things other languages cannot.

### Objects do not need classes at all

MDN: "In JavaScript, we can and often do create objects without any separate class definition, either using a function or an object literal." A literal, a factory function and `Object.create()` all make real objects with a prototype and no class in sight:

```js
const literal = { kind: "literal" };
function makeThing() {
  return { kind: "factory" };
}
const made = Object.create({ kind: "created" });
console.log(literal.kind, makeThing().kind, made.kind);
console.log(Object.getPrototypeOf(literal) === Object.prototype);
// prints: literal factory created
// prints: true
```

### Privacy has no old equivalent

MDN: "Private fields and methods are new features in classes with no trivial equivalent in function constructors." Constructor functions plus prototypes can imitate nearly everything in 12.4 to 12.7. They can get hard privacy only the roundabout way: from a closure (one copy of each function per object) or from a `WeakMap` keyed by the object (clumsy; MDN: private behaviour "may be emulated with WeakMap objects or closures"). `#` does the same job with ordinary syntax and shared methods. That is one real reason to prefer a class today.

## 12.9 Errors as objects: throw, catch and custom error classes

**Sources:** [MDN — Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) · [MDN — try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) · [MDN — console.error()](https://developer.mozilla.org/en-US/docs/Web/API/console/error_static) · [MDN — JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) · [MDN — Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
**Skills:** error_object, error_message_property, error_name_property, error_stack_property, throw_new_error, try_catch_runs_catch_on_throw, throw_jumps_to_catch, caught_error_variable, console_error, builtin_error_types, json_parse_round_trip, json_parse_invalid_throws, catch_specific_error_type, custom_error_types_why, custom_error_class_syntax, error_cause_option, float_precision_money

### An error is an object

In 1.3 you read errors off the screen. They are also **objects** you can hold, inspect and make yourself. MDN: "Runtime errors result in new Error objects being created and thrown." When Node says `TypeError: ...`, a `TypeError` object was created and **thrown**, meaning it was sent up the call chain looking for something to deal with it.

You can create one yourself with `new Error(...)`, a class like any other from this block (unlike your own classes, `Error("x")` also works without `new`; always write `new` anyway, as Google's guide says: "Always use new when constructing an Error"). Creating one does nothing yet; it is just an object.

```js
const problem = new Error("disk full");
console.log(typeof problem);
console.log(problem instanceof Error);
// prints: object
// prints: true
```

### `message`, `name` and `stack`

An error object carries three useful things. MDN on `message`: "Error message. For user-created Error objects, this is the string provided as the constructor's first argument." On `name`: "Represents the name for the type of error. For Error.prototype.name, the initial value is "Error"." On `stack`: "A non-standard property for a stack trace." The stack is a string listing where the error was raised.

```js
const problem = new Error("disk full");
console.log(problem.message);
console.log(problem.name);
console.log(new TypeError("wrong kind").name);
console.log(typeof problem.stack);
console.log(problem.stack.split("\n")[0]);
// prints: disk full
// prints: Error
// prints: TypeError
// prints: string
// prints: Error: disk full
```

In Node and Chrome (V8) the first line of the stack is the name and message. (Firefox's stacks have no such line, and MDN warns "You cannot rely on the precise content of the stack string".) The rest are file paths and line numbers, which change from machine to machine, so this block prints only the first.

### Throwing an error

You met `throw` in 12.5: it sends an error up. MDN's example is `throw new Error("Whoops!");`. When nothing catches it, the program stops there and Node prints it, as you saw all through 1.3.

```js
// ERROR EXAMPLE: Error
console.log("start");
throw new Error("Whoops!");
console.log("never reached");
// prints: start
```

`start` prints, then the throw stops everything. `never reached` is skipped.

**Python habit that breaks here:** Python writes `raise ValueError("bad")`. JavaScript writes `throw new Error("bad")` and can throw any value, though an `Error` object is the right choice because it records the stack.

### `try` and `catch`

To handle a thrown error instead of crashing, wrap the risky code in `try { }` and put the response in `catch (e) { }`. MDN: "The code in the try block is executed first, and if it throws an exception, the code in the catch block will be executed."

```js
try {
  console.log("before");
  throw new Error("boom");
  console.log("skipped");
} catch (e) {
  console.log("caught:", e.message);
}
console.log("after");
// prints: before
// prints: caught: boom
// prints: after
```

The throw jumped straight out of `try` into `catch`, so the line after it never ran. Then the program carried on after the whole `try`/`catch` block, without crashing.

### A throw can come from deep inside a function

MDN: "If any statement within the try block (or in a function called from within the try block) throws an exception, control is immediately shifted to the catch block." The `try` does not need the `throw` on its own lines. Anything that happens while it runs counts:

```js
function check(age) {
  if (age < 0) {
    throw new Error("age cannot be negative");
  }
  return "ok";
}
try {
  console.log(check(5));
  console.log(check(-1));
  console.log(check(9));
} catch (e) {
  console.log("problem:", e.message);
}
// prints: ok
// prints: problem: age cannot be negative
```

`check(5)` worked. `check(-1)` threw from inside the function, control jumped to `catch`, and `check(9)` never ran.

### The caught value

MDN: "When an exception is thrown in the try block, exceptionVar (i.e., the e in catch (e)) holds the exception value." You choose the name; `e` and `error` are common. It exists only inside the `catch` block:

```js
// ERROR EXAMPLE: ReferenceError
try {
  throw new Error("boom");
} catch (e) {
  console.log("inside:", e.message);
}
console.log(e.message);
// prints: inside: boom
```

If a `catch` block does not need the error at all, you may drop the brackets: `catch { ... }` (ES2019). Recognise it.

### Report errors with `console.error()`

Inside a `catch`, print with `console.error()`, not `console.log()`. MDN: "The console.error() static method outputs a message to the console at the "error" log level." In Node that sends it to **stderr**, the error output, instead of **stdout**, the normal output. In the terminal both look the same, but tools treat them differently: `node app.js > out.txt` saves only stdout, so errors still show on screen, and logging services colour and alert on stderr.

```js
function parseAge(text) {
  const age = Number(text);
  if (!Number.isFinite(age)) {
    throw new TypeError(`not a number: ${text}`);
  }
  return age;
}
try {
  parseAge("ten");
} catch (e) {
  console.error("could not read age:", e.message);
}
console.log("carried on");
// prints: carried on
```

Only `carried on` goes to stdout. The terminal also shows `could not read age: not a number: ten`, which `console.error` sent to stderr.

### JavaScript's built-in error types

Besides plain `Error`, JavaScript has others, each for a kind of mistake. MDN: "Besides the generic Error constructor, there are other core error constructors in JavaScript." You have met three. Each one's `name` tells you which it is:

```js
try {
  null.x;
} catch (e) {
  console.log(e.name);
}
try {
  undeclaredName;
} catch (e) {
  console.log(e.name);
}
try {
  new Array(-1);
} catch (e) {
  console.log(e.name);
}
// prints: TypeError
// prints: ReferenceError
// prints: RangeError
```

A `SyntaxError` is the odd one out: the file is read before it runs, so a mistake in your own code stops everything and a `try`/`catch` in the same file never gets the chance. But a `SyntaxError` thrown while the program runs is caught like any other: `JSON.parse('{bad')` throws one when the text is not valid JSON, and that is the `SyntaxError` you will actually catch.

### `JSON.parse()`: text back into data

`JSON.stringify()` (12.7) turns data into JSON text for saving or sending. `JSON.parse()` is the way back. MDN: "The JSON.parse() static method parses a JSON string, constructing the JavaScript value or object described by the string."

```js
const account = { id: 7, owner: "ana", balanceCents: 1250 };
const text = JSON.stringify(account);
const back = JSON.parse(text);
console.log(typeof text, typeof back);
console.log(back.balanceCents);
console.log(back === account);
// prints: string object
// prints: 1250
// prints: false
```

`back` holds the same data but is a new object, so `===` is `false` (12.2). Whatever JSON cannot hold does not survive the trip: methods are dropped, and a `Date` comes back as a string. Data from a file, from `localStorage` or from an API arrives as text and goes through `JSON.parse()` (in week 6, `response.json()` does it for you).

### Bad JSON throws a `SyntaxError`

MDN, on what `JSON.parse()` throws: `SyntaxError`, "Thrown if the string to parse is not valid JSON." JSON is stricter than a JavaScript object literal: every key needs double quotes, and single quotes are not allowed at all. Text you did not write can always be broken, so parse it inside `try`:

```js
function loadSettings(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.log(e.name);
    return {};
  }
}
console.log(loadSettings('{"theme":"dark"}'));
console.log(loadSettings("{theme: 'dark'}"));
// prints: { theme: 'dark' }
// prints: SyntaxError
// prints: {}
```

The second string is a fine JavaScript object literal but not JSON, because its key has no double quotes. `JSON.parse()` throws, and the `catch` reports it and hands back an empty object instead of crashing.

### Handling only the errors you expect

A `catch` block catches **everything** that is thrown, and unlike Python's `except ValueError`, you cannot say "only this kind" in the brackets. Instead, test the type inside, and throw the rest back out. MDN: "You can choose to handle only specific error types by testing the error type with the instanceof keyword:"

```js
// ERROR EXAMPLE: Error
function attempt(kind) {
  try {
    if (kind === "range") {
      new Array(-1);
    }
    if (kind === "type") {
      null.x;
    }
    throw new Error("something else");
  } catch (e) {
    if (e instanceof RangeError) {
      return "range problem";
    }
    if (e instanceof TypeError) {
      return "type problem";
    }
    throw e;
  }
}
console.log(attempt("range"));
console.log(attempt("type"));
console.log(attempt("other"));
// prints: range problem
// prints: type problem
```

The first two errors were ones the handler knew how to deal with. The third was a plain `Error`, so `throw e` sent it back out and, with nobody else to catch it, the program stopped. Swallowing errors you did not expect hides real bugs, which is why you rethrow.

### Your own error types

A plain `Error` says only that something went wrong. MDN: "You might want to define your own error types deriving from Error to be able to throw new MyError() and use instanceof MyError to check the kind of error in the exception handler." This is `extends` (12.7) used on `Error`.

A bare subclass works, but its `name` is still `"Error"`:

```js
class ValidationError extends Error {}
const e = new ValidationError("bad age");
console.log(e instanceof ValidationError);
console.log(e instanceof Error);
console.log(e.name);
// prints: true
// prints: true
// prints: Error
```

### The standard shape of a custom error

MDN's version begins `class CustomError extends Error {`. The usual form takes `(message, options)` and passes both on with `super(message, options)` first, as you must in any subclass constructor (12.7), then sets the `name` so it reports itself correctly. Forwarding `options` is what lets your error carry a `cause` (next heading); MDN: "Custom error types can also use the cause property, provided the subclasses' constructor passes the options parameter when calling super()." Extra detail, like the field that failed, goes in its own property:

```js
class ValidationError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "ValidationError";
    this.field = options.field;
  }
}
function setAge(age) {
  if (age < 0) {
    throw new ValidationError("age cannot be negative", { field: "age" });
  }
  return age;
}
try {
  setAge(-3);
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(`${e.name}: ${e.message} (field: ${e.field})`);
  }
}
console.log(String(new ValidationError("x", { field: "y" })));
// prints: ValidationError: age cannot be negative (field: age)
// prints: ValidationError: x
```

`super(message, options)` sets `message` (and `cause`, when the options hold one) for you. A constructor written as `(message, field)` with `super(message)` cannot carry a `cause`: it is silently lost. The extra `field` is just a normal property on this error, which is how real code attaches useful detail to an error. The check `e instanceof ValidationError` is how the handler knows it is a case it can deal with.

### Wrapping the original error with `cause`

Sometimes you catch a low-level error and want to throw a better-named one without losing what really happened. MDN: "This ensures that the original error and stack trace are available to higher-level try/catch blocks." Pass the original as the `cause` option:

```js
try {
  try {
    null.x;
  } catch (low) {
    throw new Error("could not read the file", { cause: low });
  }
} catch (high) {
  console.log(high.message);
  console.log(high.cause.name);
}
// prints: could not read the file
// prints: TypeError
```

The outer handler sees the friendly message and can still reach the real problem through `.cause`.

### Before NetBanking: money and floating-point numbers

NetBanking adds and subtracts money, and JavaScript numbers cannot hold most decimal fractions exactly. MDN: "The JavaScript Number type is a double-precision 64-bit binary format IEEE 754 value, like double in Java or C#. This means it can represent fractional values, but there are some limits to the stored number's magnitude and precision."

```js
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
const totalCents = 10 + 20;
console.log(totalCents === 30);
console.log((totalCents / 100).toFixed(2));
// prints: 0.30000000000000004
// prints: false
// prints: true
// prints: 0.30
```

`0.1` and `0.2` are each stored as the nearest binary fraction, and the tiny errors add up. So money code stores **whole cents** as integers (`1250` for $12.50), does all the adding and subtracting in cents, which is exact, and divides by 100 only to show the amount, with `toFixed(2)` (3.1). Never compare two calculated dollar amounts with `===`. For display with a currency sign and thousands separators, recognise `(1234.5).toLocaleString("en-US", { style: "currency", currency: "USD" })`, which gives `$1,234.50`.

**Python habit that breaks here:** Python's floats behave the same (`0.1 + 0.2` is `0.30000000000000004` there too), and Python programmers reach for `decimal.Decimal`. JavaScript has no built-in decimal type; integer cents is the answer.
