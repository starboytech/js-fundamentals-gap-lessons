// ================================================================
// ! BOOTCAMP JS — DAY 5 of 19 — STRING METHODS AND ARRAYS
// ! Material: materials/js_fundamentals.md §4.2, §5.1
// ! Sources: MDN Learn "Useful string methods" · MDN Learn "Arrays" · MDN Reference "String", "Array" · Codecademy "Introduction to JavaScript", "Arrays"
// ================================================================
// * SECTIONS TODAY: 4.2, 5.1
// * Every concept: 1 TRACE (fill the blanks BEFORE running) → 2 RUN → 3 MODIFY → 4 WRITE
// * This file RUNS: every block has live code that prints.
// * Each block starts by printing a label like  --- A ---  so you can match output to block.
// * Run the whole file from the bootcamp folder:
// *     node week-4/day5_strings_arrays.js
// * WRITE lines use names that start with my. Re-read the WRITE spec before you move on.
// * The confidence blank takes ONE word: confident, unsure or guess.

// ================================================================
// ! A - CONCEPT - A STRING HAS A LENGTH AND NUMBERED POSITIONS
// ================================================================
// Source: MDN Learn "Useful string methods" (finding the length, retrieving a specific character)
//
// A string is a PRIMITIVE, not an object (Day 3), but JavaScript lets you use PROPERTIES (facts)
// and METHODS (actions) on it as if it were one, reached with a dot.
// .length is a PROPERTY: how many characters the string holds. It has NO ( ) after it.
//   (Strictly, it counts UTF-16 code units: the same as characters for ordinary text, but an emoji
//   like '😀' counts 2.)
//   Spaces and punctuation count as characters.
// Each character has a position number, an INDEX, and counting starts at 0 (same as arrays):
//   word[0] is the first character, word[1] the second.
// The LAST character is at  length - 1 , because counting began at 0.
// Python: len(word) is  word.length  here (no parentheses), and word[-1] is the last character
// in Python but gives undefined in JavaScript, so use  word[word.length - 1].
//
// WORKED EXAMPLE (already traced)
// L1  const tool = "hammer";
// L2  console.log(tool.length);               prints 6
// L3  console.log(tool[0]);                   prints h
// L4  console.log(tool[tool.length - 1]);     prints r    (index 5 is the last of six)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- A ---')
// NEW: .length — a property (a fact stored on a value, written with no parentheses) that gives how many characters a string holds (an emoji counts 2, see above), or how many elements an array holds
const word = 'planet'
console.log(word.length) // ? prints: ____
console.log(word[0]) // ? prints: ____
console.log(word[5]) // ? prints: ____
console.log(word[word.length - 1]) // ? prints: ____
console.log(word[-1]) // ? prints: ____
console.log('hi there'.length) // ? prints: ____
// ? MY CONFIDENCE on the  word[word.length - 1]  line (confident / unsure / guess): ____
//
// ? RUN and compare. Why is the last index 5 and not 6 for a six-letter word? ____
// ? MODIFY: add a new line  console.log(word[6]);  and run again. What does it print? ____
// ? WRITE: on the line below, make a variable  myText  holding any word, then print its LAST character using .length.

// ================================================================
// ! B - CONCEPT - SEARCHING INSIDE A STRING: includes, startsWith, endsWith
// ================================================================
// Source: MDN Learn "Useful string methods" (searching for a substring) · MDN Reference "String.prototype.includes()"
//
// A SUBSTRING is a piece of a longer string:  "Java"  is a substring of  "JavaScript".
// A METHOD is called with a dot and ( ). The value you put inside the ( ) when you CALL it is an
// ARGUMENT (Day 3). It can be a plain value or a variable. (The name a function's definition gives
// that input is a PARAMETER; you will write those on Day 8.)
// Three methods ask a yes/no question about a string, so each gives back a BOOLEAN:
//   text.includes("ab")     is "ab" anywhere inside text?
//   text.startsWith("ab")   does text begin with "ab"?
//   text.endsWith("ab")     does text finish with "ab"?
// They are CASE SENSITIVE: "Java" is not "java".
// Python: includes is  "ab" in text . Python has startswith / endswith (all lowercase);
// JavaScript writes the second word with a capital: startsWith / endsWith.
//
// WORKED EXAMPLE (already traced)
// L1  const song = "Blue Moon";
// L2  console.log(song.includes("Moon"));       prints true
// L3  console.log(song.startsWith("Moon"));     prints false   (it starts with Blue)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- B ---')
// NEW: .includes() .startsWith() .endsWith() — string methods that take a substring and give back true or false: is it anywhere inside, at the start, or at the end
const line = 'Learn JavaScript today'
console.log(line.includes('Java')) // ? prints: ____
console.log(line.includes('java')) // ? prints: ____
console.log(line.startsWith('Learn')) // ? prints: ____
console.log(line.endsWith('Learn')) // ? prints: ____
const ending = 'today'
console.log(line.endsWith(ending)) // ? prints: ____
// ? MY CONFIDENCE on the  line.includes("java")  line (confident / unsure / guess): ____
//
// ? RUN and compare. What did the variable  ending  do in the last line? ____
// ? MODIFY: add a new line  console.log(line.includes(""));  and run again. What does it print? ____
// ? WRITE: on the line below, make a variable  myEmail  holding "sam@mail.com", then print a test that is true exactly when it ends with ".com".

// ================================================================
// ! C - CONCEPT - WHERE IS IT? indexOf
// ================================================================
// Source: MDN Learn "Useful string methods" (finding the position) · MDN Reference "String.prototype.indexOf()"
//
// text.indexOf("ab") gives back the INDEX where "ab" first starts, or -1 if it is not there.
//   It stops at the FIRST match.
//   A second parameter says where to START looking:  text.indexOf("ab", 3)  begins at index 3.
// -1 is a number that cannot be a real index, so it means "not found". It is not an error.
// Python: .find() is the same (gives -1); Python's .index() raises an error instead.
//
// WORKED EXAMPLE (already traced)
// L1  const tree = "oak";
// L2  console.log(tree.indexOf("k"));      prints 2
// L3  console.log(tree.indexOf("x"));      prints -1

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- C ---')
// NEW: .indexOf() — a string method that gives back the index where the substring first starts, or -1 when it is not found; an optional second parameter is the index to start looking from
const fruit = 'banana'
console.log(fruit.indexOf('a')) // ? prints: ____
console.log(fruit.indexOf('n')) // ? prints: ____
console.log(fruit.indexOf('ana')) // ? prints: ____
console.log(fruit.indexOf('a', 2)) // ? prints: ____
console.log(fruit.indexOf('z')) // ? prints: ____
// ? MY CONFIDENCE on the  fruit.indexOf("z")  line (confident / unsure / guess): ____
//
// ? RUN and compare. Why does  indexOf("a")  print 1 even though there are three a's? ____
// ? MODIFY: add a new line  console.log(fruit.indexOf("a", 4));  and run again. What does it print? ____
// ? WRITE: on the line below, make a variable  myPath  holding "docs/notes.txt", then print the index of the "/" in it.

// ================================================================
// ! D - CONCEPT - CUTTING A PIECE OUT: slice
// ================================================================
// Source: MDN Learn "Useful string methods" (extracting a substring) · MDN Reference "String.prototype.slice()"
//
// text.slice(start, end) gives back a NEW string: the characters from index start UP TO BUT NOT INCLUDING index end.
//   The end index is NOT included (the same rule as Python's text[start:end]).
//   Leave the end off and it goes to the end of the string:  text.slice(3)
// The original string is not changed. slice hands you a copy of the piece.
//
// WORKED EXAMPLE (already traced)
// L1  const planet = "Jupiter";
// L2  console.log(planet.slice(0, 3));     prints Jup    (indexes 0, 1, 2)
// L3  console.log(planet.slice(3));        prints iter   (index 3 to the end)

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- D ---')
// NEW: .slice() — a string method that gives back a new string holding the characters from the start index up to, but not including, the end index; with no end index it goes to the end of the string
const city = 'Barcelona'
console.log(city.slice(0, 3)) // ? prints: ____
console.log(city.slice(3, 6)) // ? prints: ____
console.log(city.slice(3)) // ? prints: ____
console.log(city.slice(0, city.length - 1)) // ? prints: ____
console.log(city) // ? prints: ____
// ? MY CONFIDENCE on the  city.slice(3, 6)  line (confident / unsure / guess): ____
//
// ? RUN and compare. Why does the last line still print the whole word? it prints ____

// ? MODIFY: add a new line  console.log(city.slice(3, 3));  and run again. What does it print? ____
// ? WRITE: on the line below, make a variable  myName  holding any name of 4 or more letters, then print its FIRST THREE letters using slice.

// ================================================================
// ! E - CONCEPT - CHANGING CASE: toUpperCase and toLowerCase
// ================================================================
// Source: MDN Learn "Useful string methods" (changing case) · MDN Reference "String.prototype.toUpperCase()"
//
// text.toUpperCase() gives back a NEW string with every letter in capitals.
// text.toLowerCase() gives back a NEW string with every letter in small letters.
// Both have NO value inside the ( ). Spaces, digits and punctuation stay as they are.
// Why bother: "Yes" and "yes" are DIFFERENT strings (Block B was case sensitive). Lowercase
// both sides first and a match no longer depends on how someone typed it.
// Python: .upper() and .lower() are  .toUpperCase() and .toLowerCase()  here (capital C, capital U/L).
//
// WORKED EXAMPLE (already traced)
// L1  const team = "Red Fox";
// L2  console.log(team.toUpperCase());     prints RED FOX
// L3  console.log(team.toLowerCase());     prints red fox

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- E ---')
// NEW: .toUpperCase() .toLowerCase() — string methods that give back a new string with every letter in capitals, or every letter in small letters
const shout = 'Hello World'
console.log(shout.toUpperCase()) // ? prints: ____
console.log(shout.toLowerCase()) // ? prints: ____
console.log('Yes' === 'yes') // ? prints: ____
console.log('Yes'.toLowerCase() === 'yes') // ? prints: ____
console.log(shout.toLowerCase().includes('world')) // ? prints: ____
// ? MY CONFIDENCE on the  'Yes'.toLowerCase() === 'yes'  line (confident / unsure / guess): ____
//
// ? RUN and compare. Why did the  includes('world')  line print what it did when shout holds ____
// *   BEFORE it that removed the capital: shout.toLowerCase() gives 'hello world', THEN includes('world') finds it.
// ? MODIFY: add a new line  console.log(shout.toUpperCase().length);  and run again. What does it print? ____
// ? WRITE: on the line below, make a variable  myCity  holding any city name, then print it in ALL CAPITALS.

// ================================================================
// ! F - CONCEPT - SWAPPING TEXT: replace and replaceAll
// ================================================================
// Source: MDN Learn "Useful string methods" (replacing parts of a string) · MDN Reference "String.prototype.replace()", "replaceAll()"
//
// text.replace("old", "new") gives back a NEW string where the FIRST "old" is swapped for "new".
// text.replaceAll("old", "new") swaps EVERY "old".
// If "old" is not in the text, you get the same text back. It is not an error.
// Swap something for "" (two quotes with nothing between) and you REMOVE it.
// Python: Python's .replace() changes every match. JavaScript's .replace() stops after the FIRST,
// so it can look half-done. Use .replaceAll() when you mean "all".
//
// WORKED EXAMPLE (already traced)
// L1  const road = "up-up-up";
// L2  console.log(road.replace("up", "down"));       prints down-up-up
// L3  console.log(road.replaceAll("up", "down"));    prints down-down-down

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- F ---')
// NEW: .replace() .replaceAll() — string methods that give back a new string with the first match (replace) or every match (replaceAll) of the old text swapped for the new text
const note = 'a-b-c-d'
console.log(note.replace('-', '+')) // ? prints: ____
console.log(note.replaceAll('-', '+')) // ? prints: ____
console.log(note.replace('x', '+')) // ? prints: ____
console.log(note.replaceAll('-', '')) // ? prints: ____
console.log(note) // ? prints: ____
// ? MY CONFIDENCE on the  note.replaceAll('-', '')  line (confident / unsure / guess): ____
//
// ? RUN and compare. Which of the lines above proved that replace does not touch the original? ____
// ? MODIFY: add a new line  console.log(note.replace('-', ' - '));  and run again. What does it print (count the spaces)? ____
// ? WRITE: on the line below, make a variable  myDate  holding "2026-10-08", then print it with EVERY "-" swapped for "/".

// ================================================================
// ! G - CONCEPT - STRING METHODS NEVER CHANGE THE ORIGINAL
// ================================================================
// Source: MDN Learn "Useful string methods" · MDN Reference "String" (strings are immutable)
//
// A string can never be edited in place (it is IMMUTABLE). Every method in Blocks A-F hands you
// a NEW string and leaves the old one exactly as it was.
// If you want to keep the new string you must SAVE it:
//   const loud = tag.toUpperCase();   a new variable catches it
//   tag = tag.toUpperCase();          or the same variable takes the new value (needs let, not const)
// Calling the method and not saving the result: the line runs, the new string is thrown away,
// and nothing seems to happen. This is a very common string bug.
// Same rule as Day 4: a variable keeps its newest value on the lines below.
//
// WORKED EXAMPLE (already traced)
// L1  let pet = "cat";
// L2  pet.toUpperCase();               (result thrown away)
// L3  console.log(pet);                prints cat
// L4  pet = pet.toUpperCase();         (result saved back)
// L5  console.log(pet);                prints CAT

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- G ---')
// NEW: immutable — a string cannot be changed in place; every string method gives back a new string, so you must save the result to keep it
let tag = 'new'
tag.toUpperCase()
console.log(tag) // ? prints: ____
const loud = tag.toUpperCase()
console.log(loud) // ? prints: ____
console.log(tag) // ? prints: ____
tag = tag.toUpperCase()
console.log(tag) // ? prints: ____
console.log(tag.toLowerCase()) // ? prints: ____
console.log(tag) // ? prints: ____
// ? MY CONFIDENCE on the  first console.log(tag)  line (confident / unsure / guess): ____
//
// ? RUN and compare. Which line is the ONLY one that changed what tag holds? ____
// ? If tag had been declared with const, the line  tag = tag.toUpperCase()  would stop with which ERROR TYPE (the word before the colon)? ____
// ? MODIFY: add a new line  let quiet = loud.toLowerCase();  then  console.log(quiet, loud);  and run again. What does it print? ____
// ? WRITE: on the line below, make  myWord  holding "quiet", save its capital-letter version in a NEW variable  myLoud,  then print both.

// ================================================================
// ! H - CONCEPT - AN ARRAY: A LIST WITH NUMBERED POSITIONS
// ================================================================
// Source: MDN Learn "Arrays" (creating arrays, accessing and modifying items) · Codecademy "Arrays"
//
// An ARRAY holds many values under one name, in order. Square brackets, items separated by commas:
//   const colors = ["red", "green", "blue"];
// Each item is an ELEMENT. Same rules as a string's characters (Block A):
//   colors[0] is the first element (counting starts at 0)
//   colors.length is how many elements (a property, NO parentheses)
//   colors[colors.length - 1] is the last element
//   an index with nothing there (colors[3], colors[-1]) gives undefined, silently, no error
// Unlike a string, you CAN change one element in place:  colors[1] = "pink";
// A const array can still change inside (the elements); const only stops you replacing the whole array.
// console.log prints an array as  [ 'red', 'green', 'blue' ]
// Python: a list is an array. colors[-1] works in Python but gives undefined here.
//
// WORKED EXAMPLE (already traced)
// L1  const nums = [10, 20, 30];
// L2  console.log(nums[1]);                  prints 20
// L3  console.log(nums.length);              prints 3
// L4  nums[0] = 99;
// L5  console.log(nums);                     prints [ 99, 20, 30 ]

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- H ---')
// NEW: array — an ordered list of values in [ ] separated by commas; each value is an element found by its index, starting at 0
const colors = ['red', 'green', 'blue']
console.log(colors.length) // ? prints: ____
console.log(colors[0]) // ? prints: ____
console.log(colors[colors.length - 1]) // ? prints: ____
console.log(colors[3]) // ? prints: ____
console.log(colors[-1]) // ? prints: ____
colors[1] = 'pink'
console.log(colors) // ? prints: ____
const nums = [1, 2, 3]
nums[0] = 9
console.log(nums) // ? prints: ____
// ? MY CONFIDENCE on the  console.log(nums)  line, where nums is a const (confident / unsure / guess): ____
//
// ? RUN and compare. Why is changing nums[0] allowed when nums is a const? ____
// ? MODIFY: add a new line  console.log(colors[1].length);  and run again. What does it print, and why? ____
// ? WRITE: on the line below, make  myList  holding three foods, print its LAST element using .length, then change the FIRST element to a different food and print the whole array.

// ================================================================
// ! RETRIEVAL GATE - answer from memory BEFORE running, no looking back at Block F
// ================================================================
console.log('--- GATE ---')
console.log('a.b.c'.replace('.', '-')) // ? prints: ____
console.log('a.b.c'.replaceAll('.', '-')) // ? prints: ____
// ? MY CONFIDENCE (confident / unsure / guess): ____

// ================================================================
// ! I - CONCEPT - ADDING AND REMOVING AT THE END: push and pop
// ================================================================
// Source: MDN Learn "Arrays" (adding and removing items) · MDN Reference "Array.prototype.push()", "pop()"
//
// array.push(item) ADDS item to the END. You can push several: array.push("a", "b").
// array.pop() REMOVES the last element.
// Both CHANGE the array itself (the word is MUTATE). Unlike a string method, no new copy is made.
// Both also hand back a value you can save or ignore:
//   push gives back the NEW LENGTH of the array
//   pop  gives back the element it REMOVED (undefined if the array is empty)
// This works on a const array too: push and pop change the inside, not which array the name holds.
// Python: push is  .append(item) ; pop is  .pop() , the same.
//
// WORKED EXAMPLE (already traced)
// L1  const bag = ["pen"];
// L2  bag.push("cup");                  bag is now [ 'pen', 'cup' ]
// L3  const out = bag.pop();              out holds cup, bag is [ 'pen' ]
// L4  console.log(out, bag.length);     prints cup 1

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- I ---')
// NEW: .push() .pop() — array methods that add an element to the end, or remove the last element; both change the array itself, push gives back the new length and pop gives back the removed element
const stack = ['a', 'b']
stack.push('c')
console.log(stack) // ? prints: ____
const size = stack.push('d', 'e')
console.log(size) // ? prints: ____
const gone = stack.pop()
console.log(gone) // ? prints: ____
console.log(stack.length) // ? prints: ____
console.log(stack) // ? prints: ____
// ? MY CONFIDENCE on the  console.log(size)  line (confident / unsure / guess): ____
//
// ? RUN and compare. Strings (Block G) never changed in place. Which line proves arrays DO? ____
// ? MODIFY: add a new line  let empty = [];  then  console.log(empty.pop());  and run again. What does it print? ____
// ? WRITE: on the line below, make  myCart  as an EMPTY array, push two items into it, pop one off, then print the array.

// ================================================================
// ! J - CONCEPT - ADDING AND REMOVING AT THE FRONT: unshift and shift
// ================================================================
// Source: MDN Learn "Arrays" (adding and removing items) · MDN Reference "Array.prototype.unshift()", "shift()"
//
// array.unshift(item) ADDS item to the FRONT (index 0). Everything else moves one place along.
// array.shift() REMOVES the FIRST element. Everything else moves one place down.
// Same behaviour as push / pop: both MUTATE the array, and both hand back a value:
//   unshift gives back the NEW LENGTH
//   shift   gives back the element it REMOVED
//
//            front                 end
//   add      unshift               push
//   remove   shift                 pop
//
// With several items, unshift("x", "y") keeps them in the order you wrote: x then y.
// Python: unshift is  list.insert(0, item) ; shift is  list.pop(0) .
//
// WORKED EXAMPLE (already traced)
// L1  const line = ["Ann", "Bo"];
// L2  line.unshift("Zed");              line is [ 'Zed', 'Ann', 'Bo' ]
// L3  const served = line.shift();        served holds Zed, line is [ 'Ann', 'Bo' ]
// L4  console.log(served, line);        prints Zed [ 'Ann', 'Bo' ]

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- J ---')
// NEW: .unshift() .shift() — array methods that add an element to the front, or remove the first element; both change the array itself, unshift gives back the new length and shift gives back the removed element
const queue = ['b', 'c']
queue.unshift('a')
console.log(queue) // ? prints: ____
const n = queue.unshift('x', 'y')
console.log(n) // ? prints: ____
console.log(queue) // ? prints: ____
const first = queue.shift()
console.log(first) // ? prints: ____
console.log(queue) // ? prints: ____
// ? MY CONFIDENCE on the  console.log(queue)  after unshift('x', 'y')  (confident / unsure / guess): ____
//
// ? RUN and compare. After unshift('x', 'y'), which comes first in the array, x or y? ____
// ? MODIFY: add a new line  console.log(queue.shift(), queue.shift());  and run again. What does it print, and what does queue hold after? ____
// ? WRITE: on the line below, make  myLine  holding "Sam" and "Lee", push "Kai" onto the END, shift the FIRST person off, then print who left and who is still in the array.

// ================================================================
// ! K - CONCEPT - THE MIDDLE: splice CHANGES, slice COPIES
// ================================================================
// Source: MDN Learn "Arrays" · MDN Reference "Array.prototype.splice()", "Array.prototype.slice()"
//
// array.splice(start, count) REMOVES count elements beginning at index start.
//   It MUTATES the array and hands back an ARRAY of what it removed.
// array.splice(start, 0, item) removes nothing (count 0) and INSERTS item at index start.
//
// array.slice(start, end) hands back a NEW array copied from start UP TO BUT NOT INCLUDING end.
//   It does NOT change the original. Same end-excluded rule as Block D's string slice.
//   array.slice() with nothing inside copies the whole array.
//
// Memory hook: splice has a P for "pulls it out of the original"; slice only looks.
//
// WORKED EXAMPLE (already traced)
// L1  const abc = ["a", "b", "c", "d"];
// L2  const cut = abc.splice(1, 2);       cut is [ 'b', 'c' ], abc is [ 'a', 'd' ]
// L3  const look = abc.slice(0, 1);       look is [ 'a' ], abc is still [ 'a', 'd' ]
// L4  console.log(cut, look, abc);      prints [ 'b', 'c' ] [ 'a' ] [ 'a', 'd' ]
// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- K ---')
// NEW: .splice() .slice() — array methods: splice removes (or inserts) elements inside the array itself and gives back what it removed; slice gives back a new array copied from the start index up to, but not including, the end index and leaves the original alone
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const removed = days.splice(1, 2)
console.log(removed) // ? prints: ____
console.log(days) // ? prints: ____
days.splice(1, 0, 'Tue')
console.log(days) // ? prints: ____
const part = days.slice(1, 3)
console.log(part) // ? prints: ____
console.log(days) // ? prints: ____
// ? MY CONFIDENCE on the  console.log(part)  line (confident / unsure / guess): ____
//
// ? RUN and compare. Which of the two methods changed days, and which did not? ____
// ? MODIFY: add a new line  console.log(days.slice(2));  and run again. What does it print? ____
// ? WRITE: on the line below, make  myLetters  holding "a", "b", "c", "d", "e", use splice to remove ONLY "c", then print the array.

// ================================================================
// ! L - CONCEPT - FIND, BREAK APART, JOIN UP: indexOf, split, join
// ================================================================
// Source: MDN Learn "Arrays" (converting between strings and arrays) · MDN Reference "Array.prototype.indexOf()", "String.prototype.split()", "Array.prototype.join()"
//
// array.indexOf(item) gives back the INDEX of the first match, or -1 if it is not there
//   (the same idea as the string indexOf in Block C).
// text.split(sep) is a STRING method: it cuts the string at every sep and gives back an ARRAY of the pieces.
//   The separator is not kept. "a-b".split("-") is [ 'a', 'b' ].
// array.join(sep) is an ARRAY method: it glues the elements into ONE STRING with sep between them.
//   Leave the join parameter off and the glue is a comma.
// array.toString() is the same as join with commas: "a,b,c".
// split and join are opposites. Neither changes the thing it was called on.
// Remember Day 4: a space typed inside the quotes is part of the glue.
//
// WORKED EXAMPLE (already traced)
// L1  const parts = "x-y-z".split("-");     parts is [ 'x', 'y', 'z' ]
// L2  console.log(parts.join(" "));        prints x y z
// L3  console.log(parts.indexOf("z"));     prints 2

// ----------------------------------------------------------------
// ? TRACE — fill every ____ BEFORE running.
// ----------------------------------------------------------------
console.log('--- L ---')
// NEW: .indexOf() on arrays, .split() .join() .toString() — indexOf gives the index of the first matching element or -1; split cuts a string into an array at a separator; join and toString glue an array into one string
const langs = ['js', 'py', 'go']
console.log(langs.indexOf('py')) // ? prints: ____
console.log(langs.indexOf('rust')) // ? prints: ____
const sentence = 'one two three'
const words = sentence.split(' ')
console.log(words) // ? prints: ____
console.log(words.join('-')) // ? prints: ____
console.log(words.join('')) // ? prints: ____
console.log(words.toString()) // ? prints: ____
console.log(words.length) // ? prints: ____
// ? MY CONFIDENCE on the  words.join('')  line (confident / unsure / guess): ____
//
// ? RUN and compare. Is  words  an array or a string, and is  words.join('-')  an array or a string? ____
// ? MODIFY: add a new line  console.log(words.join(' + '));  and run again. What does it print (count the spaces)? ____
// ? WRITE: on the line below, make  myTags  holding "red,green,blue", split it on commas, then print the pieces joined with " | ".