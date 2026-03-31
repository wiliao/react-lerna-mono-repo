// @ts-nocheck
/**
 * JavaScript Array Interview Preparation - Complete Demo
 * Covers all essential array concepts for interviews
 */

// ============================================
// 1. CREATION & BASIC OPERATIONS
// ============================================

console.log("=== 1. CREATION & BASIC OPERATIONS ===");

// Different ways to create arrays
const arr1 = [1, 2, 3]; // Literal (most common)
const arr2 = new Array(1, 2, 3); // Constructor
const arr3 = Array.of(1, 2, 3); // ES6 Array.of()
const arr4 = Array.from("123"); // ES6 Array.from()
const arr5 = Array(5).fill(0); // Create array with 5 zeros
const sparseArray = [1, , 3]; // Sparse array with hole

console.log("Different creations:", {
  arr1,
  arr2,
  arr3,
  arr4,
  arr5,
  sparseArray,
});

// Array length property (mutable!)
const mutableLength = [1, 2, 3];
mutableLength.length = 5; // Adds empty slots
console.log("Mutable length:", mutableLength); // [1, 2, 3, empty × 2]
mutableLength.length = 2; // Truncates array
console.log("Truncated:", mutableLength); // [1, 2]

// ============================================
// 2. ACCESS & MODIFICATION
// ============================================

console.log("\n=== 2. ACCESS & MODIFICATION ===");

const fruits = ["apple", "banana", "cherry"];

// Basic access
console.log("fruits[0]:", fruits[0]); // 'apple'
console.log("fruits.at(-1):", fruits.at(-1)); // 'cherry' (ES2022)

// Check if array
console.log("Array.isArray(fruits):", Array.isArray(fruits)); // true
console.log("fruits instanceof Array:", fruits instanceof Array); // true
console.log("typeof fruits:", typeof fruits); // 'object' (tricky!)

// ============================================
// 3. TRANSFORMATION METHODS (IMMUTABLE)
// ============================================

console.log("\n=== 3. TRANSFORMATION METHODS (IMMUTABLE) ===");

const numbers = [1, 2, 3, 4, 5];

// map() - transform each element
const doubled = numbers.map((num) => num * 2);
console.log("map doubled:", doubled); // [2, 4, 6, 8, 10]

// filter() - select elements
const evens = numbers.filter((num) => num % 2 === 0);
console.log("filter evens:", evens); // [2, 4]

// reduce() - accumulate values
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("reduce sum:", sum); // 15

// Fixed with JSDoc type annotation
/**
 * @typedef {Object} NumberGroups
 * @property {number[]} even
 * @property {number[]} odd
 */

/** @type {NumberGroups} */
const grouped = numbers.reduce(
  /**
   * @param {NumberGroups} acc
   * @param {number} curr
   * @returns {NumberGroups}
   */
  (acc, curr) => {
    if (curr % 2 === 0) {
      acc.even.push(curr);
    } else {
      acc.odd.push(curr);
    }
    return acc;
  },
  { even: [], odd: [] },
);
console.log("reduce grouped:", grouped); // { even: [2, 4], odd: [1, 3, 5] }

// Alternative fix without JSDoc (simpler):
const groupedAlt = numbers.reduce(
  (acc, curr) => {
    if (curr % 2 === 0) {
      acc.even.push(curr);
    } else {
      acc.odd.push(curr);
    }
    return acc;
  },
  { even: [], odd: [] },
);
console.log("reduce grouped alternative:", groupedAlt);

// flat() & flatMap()
const nested = [1, [2, [3, [4]]]];
console.log("flat(1):", nested.flat()); // [1, 2, [3, [4]]]
console.log("flat(Infinity):", nested.flat(Infinity)); // [1, 2, 3, 4]

const flatMapped = [1, 2, 3].flatMap((x) => [x, x * 2]);
console.log("flatMap:", flatMapped); // [1, 2, 2, 4, 3, 6]

// ============================================
// 4. MUTATOR METHODS (CHANGE ORIGINAL)
// ============================================

console.log("\n=== 4. MUTATOR METHODS (CHANGE ORIGINAL) ===");

// Create array that accepts both numbers and strings
/** @type {(number|string)[]} */
const mutable = [1, 2, 3];
console.log("Original before mutations:", [...mutable]);

// push/pop - end operations
mutable.push(4);
console.log("After push(4):", mutable); // [1, 2, 3, 4]
const popped = mutable.pop();
console.log("After pop():", mutable, "popped:", popped); // [1, 2, 3], 4

// unshift/shift - start operations
mutable.unshift(0);
console.log("After unshift(0):", mutable); // [0, 1, 2, 3]
const shifted = mutable.shift();
console.log("After shift():", mutable, "shifted:", shifted); // [1, 2, 3], 0

// splice - versatile mutator
// This now works because mutable is typed as (number|string)[]
mutable.splice(1, 0, "a", "b"); // Insert at index 1
console.log("After splice(insert):", mutable); // [1, 'a', 'b', 2, 3]
mutable.splice(1, 2); // Remove 2 elements from index 1
console.log("After splice(remove):", mutable); // [1, 2, 3]
mutable.splice(1, 1, "x"); // Replace at index 1
console.log("After splice(replace):", mutable); // [1, 'x', 3]

// Alternative: Use separate example for string insertion
console.log("\n--- Alternative: Clearer type separation ---");
const mutableNumbers = [1, 2, 3];
const mutableStrings = ["a", "b", "c"];
mutableStrings.splice(1, 0, "x", "y");
console.log("String array after splice:", mutableStrings);

// sort (with compare function)
const unsorted = [3, 1, 4, 1, 5, 9];
const sorted = [...unsorted].sort((a, b) => a - b); // Copy first!
console.log("Sorted numbers:", sorted); // [1, 1, 3, 4, 5, 9]

const words = ["banana", "apple", "cherry"];
words.sort(); // Default string sort
console.log("Sorted strings:", words); // ['apple', 'banana', 'cherry']

// reverse
const reversed = [...numbers].reverse();
console.log("Reversed:", reversed); // [5, 4, 3, 2, 1]

// ============================================
// 5. ACCESSOR METHODS (NON-MUTATING)
// ============================================

console.log("\n=== 5. ACCESSOR METHODS (NON-MUTATING) ===");

const arr = [10, 20, 30, 40, 50];

// slice - extract portion
const slice1 = arr.slice(1, 3);
console.log("slice(1, 3):", slice1); // [20, 30]
const slice2 = arr.slice(-2);
console.log("slice(-2):", slice2); // [40, 50]

// concat - merge arrays
const merged = arr.concat([60, 70], [80, 90]);
console.log("concat result:", merged); // [10, 20, 30, 40, 50, 60, 70, 80, 90]

// indexOf/lastIndexOf
const duplicates = [1, 2, 3, 2, 1];
console.log("indexOf(2):", duplicates.indexOf(2)); // 1
console.log("lastIndexOf(2):", duplicates.lastIndexOf(2)); // 3

// includes (ES7)
console.log("includes(30):", arr.includes(30)); // true
console.log("includes(35):", arr.includes(35)); // false

// find/findIndex
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const user = users.find((u) => u.id === 2);
console.log("find id=2:", user); // { id: 2, name: 'Bob' }
const userIndex = users.findIndex((u) => u.name === "Charlie");
console.log("findIndex name=Charlie:", userIndex); // 2

// some/every
const hasEven = numbers.some((n) => n % 2 === 0);
console.log("some even?:", hasEven); // true
const allPositive = numbers.every((n) => n > 0);
console.log("every positive?:", allPositive); // true

// ============================================
// 6. DESTRUCTURING & SPREAD OPERATOR
// ============================================

console.log("\n=== 6. DESTRUCTURING & SPREAD OPERATOR ===");

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log("Destructured:", { first, second, rest }); // 1, 2, [3, 4, 5]

// Swapping variables
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log("Swapped:", a, b); // 2, 1

// Spread operator
const original = [1, 2, 3];
const copy = [...original]; // Shallow copy
const extended = [0, ...original, 4]; // Merge and extend
console.log("Spread copy:", copy);
console.log("Spread extended:", extended);

// ============================================
// 7. ITERATION METHODS
// ============================================

console.log("\n=== 7. ITERATION METHODS ===");

const iterArr = ["a", "b", "c"];

// forEach (side effects)
iterArr.forEach((item, index) => {
  console.log(`forEach: ${index} = ${item}`);
});

// for...of loop (ES6)
for (const item of iterArr) {
  console.log(`for...of: ${item}`);
}

// for...in (not recommended for arrays, but works)
for (const index in iterArr) {
  console.log(`for...in: ${index} = ${iterArr[index]}`);
}

// Entries, keys, values
console.log("Array.entries():", Array.from(iterArr.entries())); // [[0, 'a'], [1, 'b'], [2, 'c']]
console.log("Array.keys():", Array.from(iterArr.keys())); // [0, 1, 2]
console.log("Array.values():", Array.from(iterArr.values())); // ['a', 'b', 'c']

// ============================================
// 8. COMMON INTERVIEW PROBLEMS
// ============================================

console.log("\n=== 8. COMMON INTERVIEW PROBLEMS ===");

// 1. Remove duplicates
const withDuplicates = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(withDuplicates)]; // Using Set
const uniqueFilter = withDuplicates.filter(
  (item, index) => withDuplicates.indexOf(item) === index,
);
console.log("Remove duplicates:", unique);
console.log("Remove duplicates (filter):", uniqueFilter);

// 2. Find max/min without Math.max
const findMax = (arr) =>
  arr.reduce((max, curr) => (curr > max ? curr : max), -Infinity);
console.log("Find max:", findMax([3, 1, 4, 1, 5])); // 5

// 3. Flatten nested array (deep)
function flattenDeep(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    [],
  );
}
console.log("Flatten deep:", flattenDeep([1, [2, [3, [4]], 5]])); // [1, 2, 3, 4, 5]

// 4. Chunk array
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
console.log("Chunk array:", chunkArray([1, 2, 3, 4, 5, 6], 2)); // [[1, 2], [3, 4], [5, 6]]

// 5. Array intersection/union
const arrA = [1, 2, 3, 4];
const arrB = [3, 4, 5, 6];
const intersection = arrA.filter((x) => arrB.includes(x));
const union = [...new Set([...arrA, ...arrB])];
console.log("Intersection:", intersection); // [3, 4]
console.log("Union:", union); // [1, 2, 3, 4, 5, 6]

// 6. Rotate array - Fixed the slice parameter
function rotateArray(arr, k) {
  const rotation = k % arr.length;
  return [...arr.slice(-rotation), ...arr.slice(0, arr.length - rotation)];
}
console.log("Rotate array:", rotateArray([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]

// 7. Group by property
const products = [
  { category: "fruit", name: "apple" },
  { category: "vegetable", name: "carrot" },
  { category: "fruit", name: "banana" },
  { category: "dairy", name: "milk" },
];

const groupedByCategory = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {});
console.log("Group by category:", groupedByCategory);

// ============================================
// 9. PERFORMANCE CONSIDERATIONS
// ============================================

console.log("\n=== 9. PERFORMANCE CONSIDERATIONS ===");

// Set vs Array for lookups
const largeArray = Array.from({ length: 10000 }, (_, i) => i);
const largeSet = new Set(largeArray);

console.time("Array includes");
largeArray.includes(9999);
console.timeEnd("Array includes"); // Slower: O(n)

console.time("Set has");
largeSet.has(9999);
console.timeEnd("Set has"); // Faster: O(1)

// Optimize array operations
const data = Array.from({ length: 1000 }, (_, i) => i);

// Inefficient: Creates multiple intermediate arrays
const inefficient = data
  .filter((x) => x % 2 === 0)
  .map((x) => x * 2)
  .filter((x) => x > 100);

// More efficient: Single reduce
const efficient = data.reduce((acc, x) => {
  if (x % 2 === 0) {
    const doubled = x * 2;
    if (doubled > 100) acc.push(doubled);
  }
  return acc;
}, []);

console.log(
  "Inefficient vs efficient results same?:",
  JSON.stringify(inefficient) === JSON.stringify(efficient),
); // true

// ============================================
// 10. POLYFILLS / CUSTOM IMPLEMENTATIONS
// ============================================

console.log("\n=== 10. POLYFILLS / CUSTOM IMPLEMENTATIONS ===");

// Instead of modifying Array.prototype (which causes TypeScript errors),
// create standalone functions

// Custom map implementation
function myMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

const myMapResult = myMap([1, 2, 3], (x) => x * 2);
console.log("Custom map:", myMapResult); // [2, 4, 6]

// Custom filter implementation
function myFilter(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

const myFilterResult = myFilter([1, 2, 3, 4], (x) => x % 2 === 0);
console.log("Custom filter:", myFilterResult); // [2, 4]

// Custom reduce implementation
function myReduce(arr, callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : arr[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }

  return accumulator;
}

const myReduceResult = myReduce([1, 2, 3, 4], (acc, curr) => acc + curr, 0);
console.log("Custom reduce:", myReduceResult); // 10

// ============================================
// 11. TRICKY EDGE CASES
// ============================================

console.log("\n=== 11. TRICKY EDGE CASES ===");

// Empty slots behavior
const withEmpty = [1, , 3]; // Sparse array
console.log("Sparse array:", withEmpty);
console.log("Sparse length:", withEmpty.length); // 3
console.log("Sparse forEach:");
withEmpty.forEach((item, i) => console.log(i, item)); // Skips empty slot!

// Comparison gotchas
console.log("[] == ![]:", [] == ![]); // true (wat!)
console.log("[] === []:", [] === []); // false (different references)
console.log("Array.isArray([]):", Array.isArray([])); // true (correct way)

// Sort edge cases
const trickySort = [10, 2, 1, 20];
trickySort.sort(); // Default string sort!
console.log("Default sort (wrong):", trickySort); // [1, 10, 2, 20]
trickySort.sort((a, b) => a - b); // Correct numeric sort
console.log("Numeric sort (correct):", trickySort); // [1, 2, 10, 20]

// Mutation during iteration
const mutateDuringIteration = [1, 2, 3, 4, 5];
for (let i = 0; i < mutateDuringIteration.length; i++) {
  if (mutateDuringIteration[i] === 2) {
    mutateDuringIteration.splice(i, 1); // Removes 2
    i--; // Adjust index
  }
}
console.log("After mutation during iteration:", mutateDuringIteration); // [1, 3, 4, 5]

console.log("\n=== END OF DEMO ===");
