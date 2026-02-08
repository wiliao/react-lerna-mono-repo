/**
 * JavaScript Array Interview Preparation - Complete Demo
 * Covers all essential array concepts for interviews
 *
 * To run:
 * 1. Save as array-concepts-demo.ts
 * 2. Compile with: tsc array-concepts-demo.ts
 * 3. Run with: node array-concepts-demo.js
 */

// ============================================
// 1. CREATION & BASIC OPERATIONS
// ============================================

console.log("=== 1. CREATION & BASIC OPERATIONS ===");

// Different ways to create arrays
const arr1: number[] = [1, 2, 3]; // Literal (most common)
const arr2: number[] = new Array(1, 2, 3); // Constructor
const arr3: number[] = Array.of(1, 2, 3); // ES6 Array.of()
const arr4: string[] = Array.from("123"); // ES6 Array.from()
const arr5: number[] = Array(5).fill(0); // Create array with 5 zeros
const sparseArray: (number | undefined)[] = [1, , 3]; // Sparse array with hole

console.log("Different creations:", {
  arr1,
  arr2,
  arr3,
  arr4,
  arr5,
  sparseArray,
});

// Array length property (mutable!)
const mutableLength: number[] = [1, 2, 3];
mutableLength.length = 5; // Adds empty slots
console.log("Mutable length:", mutableLength); // [1, 2, 3, empty × 2]
mutableLength.length = 2; // Truncates array
console.log("Truncated:", mutableLength); // [1, 2]

// ============================================
// 2. ACCESS & MODIFICATION
// ============================================

console.log("\n=== 2. ACCESS & MODIFICATION ===");

const fruits: string[] = ["apple", "banana", "cherry"];

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

const numbers: number[] = [1, 2, 3, 4, 5];

// map() - transform each element
const doubled: number[] = numbers.map((num) => num * 2);
console.log("map doubled:", doubled); // [2, 4, 6, 8, 10]

// filter() - select elements
const evens: number[] = numbers.filter((num) => num % 2 === 0);
console.log("filter evens:", evens); // [2, 4]

// reduce() - accumulate values
const sum: number = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("reduce sum:", sum); // 15

const grouped: { even: number[]; odd: number[] } = numbers.reduce(
  (acc: { even: number[]; odd: number[] }, curr: number) => {
    acc[curr % 2 === 0 ? "even" : "odd"].push(curr);
    return acc;
  },
  { even: [], odd: [] },
);
console.log("reduce grouped:", grouped); // { even: [2, 4], odd: [1, 3, 5] }

// flat() & flatMap()
const nested: any[] = [1, [2, [3, [4]]]];
console.log("flat(1):", nested.flat()); // [1, 2, [3, [4]]]
console.log("flat(Infinity):", nested.flat(Infinity)); // [1, 2, 3, 4]

const flatMapped: number[] = [1, 2, 3].flatMap((x) => [x, x * 2]);
console.log("flatMap:", flatMapped); // [1, 2, 2, 4, 3, 6]

// ============================================
// 4. MUTATOR METHODS (CHANGE ORIGINAL)
// ============================================

console.log("\n=== 4. MUTATOR METHODS (CHANGE ORIGINAL) ===");

// Use a union type for arrays that will contain mixed types
let mutable: (number | string)[] = [1, 2, 3];
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

// splice - versatile mutator (now works because array is (number | string)[])
mutable.splice(1, 0, "a", "b"); // Insert at index 1
console.log("After splice(insert):", mutable); // [1, 'a', 'b', 2, 3]
mutable.splice(1, 2); // Remove 2 elements from index 1
console.log("After splice(remove):", mutable); // [1, 2, 3]
mutable.splice(1, 1, "x"); // Replace at index 1
console.log("After splice(replace):", mutable); // [1, 'x', 3]

// Alternative: Use separate arrays for clarity
console.log("\n--- Alternative: Separate arrays for clarity ---");
const numbersArray: number[] = [1, 2, 3, 4, 5];
const stringsArray: string[] = ["a", "b", "c", "d", "e"];

// sort (with compare function)
const unsorted: number[] = [3, 1, 4, 1, 5, 9];
const sorted: number[] = [...unsorted].sort((a, b) => a - b); // Copy first!
console.log("Sorted numbers:", sorted); // [1, 1, 3, 4, 5, 9]

const words: string[] = ["banana", "apple", "cherry"];
words.sort(); // Default string sort
console.log("Sorted strings:", words); // ['apple', 'banana', 'cherry']

// reverse
const reversed: number[] = [...numbers].reverse();
console.log("Reversed:", reversed); // [5, 4, 3, 2, 1]

// ============================================
// 5. ACCESSOR METHODS (NON-MUTATING)
// ============================================

console.log("\n=== 5. ACCESSOR METHODS (NON-MUTATING) ===");

const arr: number[] = [10, 20, 30, 40, 50];

// slice - extract portion
const slice1: number[] = arr.slice(1, 3);
console.log("slice(1, 3):", slice1); // [20, 30]
const slice2: number[] = arr.slice(-2);
console.log("slice(-2):", slice2); // [40, 50]

// concat - merge arrays
const merged: number[] = arr.concat([60, 70], [80, 90]);
console.log("concat result:", merged); // [10, 20, 30, 40, 50, 60, 70, 80, 90]

// indexOf/lastIndexOf
const duplicates: number[] = [1, 2, 3, 2, 1];
console.log("indexOf(2):", duplicates.indexOf(2)); // 1
console.log("lastIndexOf(2):", duplicates.lastIndexOf(2)); // 3

// includes (ES7)
console.log("includes(30):", arr.includes(30)); // true
console.log("includes(35):", arr.includes(35)); // false

// find/findIndex
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const user = users.find((u) => u.id === 2);
console.log("find id=2:", user); // { id: 2, name: 'Bob' }
const userIndex: number = users.findIndex((u) => u.name === "Charlie");
console.log("findIndex name=Charlie:", userIndex); // 2

// some/every
const hasEven: boolean = numbers.some((n) => n % 2 === 0);
console.log("some even?:", hasEven); // true
const allPositive: boolean = numbers.every((n) => n > 0);
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
const original: number[] = [1, 2, 3];
const copy: number[] = [...original]; // Shallow copy
const extended: number[] = [0, ...original, 4]; // Merge and extend
console.log("Spread copy:", copy);
console.log("Spread extended:", extended);

// ============================================
// 7. ITERATION METHODS
// ============================================

console.log("\n=== 7. ITERATION METHODS ===");

const iterArr: string[] = ["a", "b", "c"];

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
const withDuplicates: number[] = [1, 2, 2, 3, 4, 4, 5];
const unique: number[] = [...new Set(withDuplicates)]; // Using Set
const uniqueFilter: number[] = withDuplicates.filter(
  (item, index) => withDuplicates.indexOf(item) === index,
);
console.log("Remove duplicates:", unique);
console.log("Remove duplicates (filter):", uniqueFilter);

// 2. Find max/min without Math.max
const findMax = (arr: number[]): number =>
  arr.reduce((max, curr) => (curr > max ? curr : max), -Infinity);
console.log("Find max:", findMax([3, 1, 4, 1, 5])); // 5

// 3. Flatten nested array (deep)
function flattenDeep(arr: any[]): any[] {
  return arr.reduce(
    (acc: any[], val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    [],
  );
}
console.log("Flatten deep:", flattenDeep([1, [2, [3, [4]], 5]])); // [1, 2, 3, 4, 5]

// 4. Chunk array
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
console.log("Chunk array:", chunkArray([1, 2, 3, 4, 5, 6], 2)); // [[1, 2], [3, 4], [5, 6]]

// 5. Array intersection/union
const arrA: number[] = [1, 2, 3, 4];
const arrB: number[] = [3, 4, 5, 6];
const intersection: number[] = arrA.filter((x) => arrB.includes(x));
const union: number[] = [...new Set([...arrA, ...arrB])];
console.log("Intersection:", intersection); // [3, 4]
console.log("Union:", union); // [1, 2, 3, 4, 5, 6]

// 6. Rotate array
function rotateArray<T>(arr: T[], k: number): T[] {
  const rotation = k % arr.length;
  return [...arr.slice(-rotation), ...arr.slice(0, arr.length - rotation)];
}
console.log("Rotate array:", rotateArray([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]

// 7. Group by property
interface Product {
  category: string;
  name: string;
}

const products: Product[] = [
  { category: "fruit", name: "apple" },
  { category: "vegetable", name: "carrot" },
  { category: "fruit", name: "banana" },
  { category: "dairy", name: "milk" },
];

const groupedByCategory = products.reduce(
  (acc: Record<string, Product[]>, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  },
  {},
);
console.log("Group by category:", groupedByCategory);

// ============================================
// 9. PERFORMANCE CONSIDERATIONS
// ============================================

console.log("\n=== 9. PERFORMANCE CONSIDERATIONS ===");

// Set vs Array for lookups
const largeArray: number[] = Array.from({ length: 10000 }, (_, i) => i);
const largeSet = new Set(largeArray);

console.time("Array includes");
largeArray.includes(9999);
console.timeEnd("Array includes"); // Slower: O(n)

console.time("Set has");
largeSet.has(9999);
console.timeEnd("Set has"); // Faster: O(1)

// Optimize array operations
const data: number[] = Array.from({ length: 1000 }, (_, i) => i);

// Inefficient: Creates multiple intermediate arrays
const inefficient: number[] = data
  .filter((x) => x % 2 === 0)
  .map((x) => x * 2)
  .filter((x) => x > 100);

// More efficient: Single reduce
const efficient: number[] = data.reduce((acc: number[], x) => {
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
// we'll create standalone functions that mimic array methods

// Custom map implementation
function myMap<T, U>(
  arr: T[],
  callback: (value: T, index: number, array: T[]) => U,
): U[] {
  const result: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

const myMapResult: number[] = myMap([1, 2, 3], (x) => x * 2);
console.log("Custom map:", myMapResult); // [2, 4, 6]

// Custom filter implementation
function myFilter<T>(
  arr: T[],
  callback: (value: T, index: number, array: T[]) => boolean,
): T[] {
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

const myFilterResult: number[] = myFilter([1, 2, 3, 4], (x) => x % 2 === 0);
console.log("Custom filter:", myFilterResult); // [2, 4]

// Custom reduce implementation
function myReduce<T, U>(
  arr: T[],
  callback: (accumulator: U, currentValue: T, index: number, array: T[]) => U,
  initialValue?: U,
): U {
  let accumulator: U;
  let startIndex: number;

  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    if (arr.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = arr[0] as unknown as U;
    startIndex = 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }

  return accumulator;
}

const myReduceResult: number = myReduce(
  [1, 2, 3, 4],
  (acc, curr) => acc + curr,
  0,
);
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
//console.log("[] == ![]:", [] == ![]); // true (wat!)
//console.log("[] === []:", [] === []); // false (different references)
console.log("Array.isArray([]):", Array.isArray([])); // true (correct way)

// Sort edge cases
const trickySort: number[] = [10, 2, 1, 20];
trickySort.sort(); // Default string sort!
console.log("Default sort (wrong):", trickySort); // [1, 10, 2, 20]
trickySort.sort((a, b) => a - b); // Correct numeric sort
console.log("Numeric sort (correct):", trickySort); // [1, 2, 10, 20]

// Mutation during iteration
const mutateDuringIteration: number[] = [1, 2, 3, 4, 5];
for (let i = 0; i < mutateDuringIteration.length; i++) {
  if (mutateDuringIteration[i] === 2) {
    mutateDuringIteration.splice(i, 1); // Removes 2
    i--; // Adjust index
  }
}
console.log("After mutation during iteration:", mutateDuringIteration); // [1, 3, 4, 5]

// ============================================
// 12. TYPED ARRAYS (BONUS)
// ============================================

console.log("\n=== 12. TYPED ARRAYS (BONUS) ===");

// Typed arrays for performance-sensitive operations
const intArray = new Int32Array([1, 2, 3, 4, 5]);
const floatArray = new Float64Array([1.1, 2.2, 3.3, 4.4, 5.5]);

console.log("Int32Array:", intArray);
console.log("Float64Array:", floatArray);
console.log("Int32Array buffer size:", intArray.buffer.byteLength, "bytes");

// ============================================
// 13. ARRAY-LIKE OBJECTS
// ============================================

console.log("\n=== 13. ARRAY-LIKE OBJECTS ===");

// Array-like objects (have length and indexed elements)
const arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

// Convert array-like to real array
const realArray1 = Array.from(arrayLike);
const realArray2 = Array.prototype.slice.call(arrayLike);
const realArray3 = [...(arrayLike as any)]; // Type assertion needed

console.log("Array-like to real array:", realArray1); // ['a', 'b', 'c']

// ============================================
// 14. ADDITIONAL ES6+ FEATURES
// ============================================

console.log("\n=== 14. ADDITIONAL ES6+ FEATURES ===");

// Array.of() - creates array from arguments
console.log("Array.of(7):", Array.of(7)); // [7] (not [7, empty × 6])
console.log("Array.of(1, 2, 3):", Array.of(1, 2, 3)); // [1, 2, 3]

// Array.from() with map function
console.log(
  "Array.from with map:",
  Array.from([1, 2, 3], (x) => x * x),
); // [1, 4, 9]

// Array fill with start and end
const fillArray = new Array(5).fill(0, 1, 4);
console.log("Fill with range:", fillArray); // [empty, 0, 0, 0, empty]

console.log("\n=== END OF DEMO ===");
