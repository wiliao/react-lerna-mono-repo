For JavaScript array interview preparation, focus on these **essential concepts**:

## **1. Core Array Methods**

### **Transformation Methods** (Return new arrays)

- `map()` - transform each element
- `filter()` - select elements based on condition
- `reduce()`/`reduceRight()` - accumulate values
- `flat()`/`flatMap()` - flatten nested arrays

### **Accessor Methods** (Don't mutate)

- `slice()` - extract portion of array
- `concat()` - merge arrays
- `indexOf()`/`lastIndexOf()` - find element position
- `includes()` - check if element exists
- `find()`/`findIndex()` - find first matching element
- `some()`/`every()` - test condition on elements

### **Mutator Methods** (Change original array)

- `push()`/`pop()` - add/remove from end
- `shift()`/`unshift()` - add/remove from start
- `splice()` - add/remove elements at index
- `sort()` - sort elements (with compare function)
- `reverse()` - reverse order
- `fill()` - fill array with value

## **2. Important Concepts**

- **Immutability** vs **Mutation**: Know which methods modify original array
- **Chaining methods**: `array.filter().map().reduce()`
- **Array spread operator**: `[...arr]` for copying/merging
- **Destructuring**: `const [first, ...rest] = arr`
- **Array-like objects**: Convert with `Array.from()` or spread operator
- **Sparse arrays**: Arrays with "holes" (empty slots)

## **3. Performance & Optimization**

- **Time complexity** of common operations
- Memory considerations for large arrays
- When to use `Set` instead of array for lookups
- Avoiding unnecessary array creations in loops

## **4. Common Interview Questions**

1. **Remove duplicates** from array
2. **Find max/min** without Math.max
3. **Flatten nested array** (with varying depth)
4. **Group array elements** by property
5. **Chunk array** into smaller arrays
6. **Implement polyfills** for `map`, `filter`, `reduce`
7. **Find missing number** in sequence
8. **Merge/interleave** multiple arrays
9. **Rotate array** by k positions
10. **Find intersection/union** of arrays

## **5. ES6+ Features to Know**

- `Array.from()` for array-like conversion
- `Array.of()` for creating arrays
- `findIndex()` vs `indexOf()`
- `includes()` vs `indexOf()`
- Rest parameters: `function(...args)`
- Default parameters with arrays

## **6. Tricky Edge Cases**

- `typeof []` returns "object"
- `Array.isArray()` for type checking
- Comparing arrays: `[] === []` is false
- `sort()` default behavior (string conversion)
- `delete arr[2]` vs `splice(2, 1)`

## **7. Practice Problems**

- Implement common array methods from scratch
- Solve problems using different approaches (loops vs array methods)
- Optimize solutions for time/space complexity
- Handle edge cases (empty arrays, null values, large inputs)

**Pro Tip**: Understand not just _how_ to use array methods, but _when_ to use each one. Interviewers often ask you to compare approaches (e.g., "When would you use `reduce` instead of `map` + `filter`?").

Would you like me to elaborate on any specific area or provide example interview questions for practice?
