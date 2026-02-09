/**
 * Creates a counter with encapsulated state using JavaScript closures
 *
 * CLOSURE FUNDAMENTALS DEMONSTRATED:
 * - Lexical scope retention (inner functions "remember" outer scope)
 * - Data encapsulation (private state inaccessible from outside)
 * - Factory function pattern (creates customized objects)
 * - Stateful function factories (each instance maintains independent state)
 *
 * KEY CONCEPT: What is a Closure?
 * "A closure is the combination of a function bundled together with references
 * to its surrounding state (the lexical environment). In other words, a closure
 * gives you access to an outer function's scope from an inner function."
 * - MDN Web Docs
 *
 * REAL-WORLD ANALOGY:
 * Think of a closure like a vending machine:
 * - The machine's internal counter (count) is PRIVATE (you can't reach inside)
 * - Buttons (methods) let you interact with the counter safely
 * - Each machine has its own independent counter
 * - The machine "remembers" its state between button presses
 *
 * @param {number} initial - Starting value for counter (default: 0)
 * @returns {Object} Counter API with increment/decrement/get methods
 *
 * MEMORY MODEL VISUALIZATION:
 * ┌─────────────────────────────────────────────────────┐
 * │ createCounter Execution Context (when called)       │
 * │  ┌─────────────────────────────────────────────┐   │
 * │  │ Lexical Environment:                        │   │
 * │  │   count = 5  ←──┐                          │   │
 * │  │                 │                          │   │
 * │  └─────────────────┼──────────────────────────┘   │
 * │                    │                               │
 * │  Returned Object:  │                               │
 * │  {                 │                               │
 * │    increment() ────┼──→ "Sees" count via closure  │
 * │    decrement() ────┼──→ "Sees" count via closure  │
 * │    getCount() ─────┼──→ "Sees" count via closure  │
 * │  }                 │                               │
 * └────────────────────┼───────────────────────────────┘
 *                      │
 *                      ▼
 *              Persistent connection
 *              even after function exits!
 */
export function createCounter(initial = 0) {
  // PRIVATE STATE (Encapsulated via closure)
  // Why 'let' not 'const'?
  // - Needs reassignment (increment/decrement modify it)
  // - 'const' would prevent modification (would cause runtime error)
  //
  // Why is this PRIVATE?
  // - No external reference exists after function returns
  // - Only inner functions (closure) can access it
  // - Cannot be accessed via counterInstance.count (undefined)
  // - Cannot be modified accidentally from outside
  //
  // MEMORY NOTE:
  // This variable persists in memory as long as any returned
  // function references it (garbage collection won't reclaim it)
  let count = initial;

  // RETURN PUBLIC API (Revealing Module Pattern)
  // Returns object with methods that CLOSE OVER 'count' variable
  // Each method forms a closure capturing the lexical environment
  return {
    /**
     * Increments counter and returns NEW value (pre-increment)
     * Uses prefix increment (++count) for immediate update
     *
     * CLOSURE IN ACTION:
     * - This arrow function "remembers" the 'count' variable
     * - Even after createCounter() finishes executing
     * - JavaScript engine maintains reference to outer scope
     *
     * WHY ARROW FUNCTION?
     * - Lexical 'this' binding (though not critical here)
     * - More concise syntax
     * - Shares parent scope (no separate 'arguments' object)
     *
     * ⚠️ NOTE: Returns updated value (like ++i in C/Java)
     * Contrast with postfix: count++ would return OLD value
     */
    increment: () => ++count,

    /**
     * Decrements counter and returns NEW value (pre-decrement)
     * Mirror pattern of increment with prefix decrement
     *
     * SAFETY GUARANTEE:
     * Since 'count' is private and only modified through these methods,
     * we prevent invalid states (e.g., accidental string assignment)
     */
    decrement: () => --count,

    /**
     * Returns current counter value WITHOUT modification
     * Pure getter pattern (no side effects)
     *
     * WHY NOT EXPOSE 'count' DIRECTLY?
     * - Prevents external mutation: counter.count = 999
     * - Maintains control over state access
     * - Allows future validation/logic without breaking API
     * - Enables adding logging/metrics later transparently
     */
    getCount: () => count,

    // 💡 ADVANCED EXTENSION IDEAS (for learning):
    // reset: (value = 0) => (count = value),  // Reset to specific value
    // incrementBy: (n) => (count += n),        // Increment by amount
    // isEven: () => count % 2 === 0,           // Derived state check
  };
}

/* 
═══════════════════════════════════════════════════════════════
LEARNING LAB: Try These Experiments!
═══════════════════════════════════════════════════════════════

✅ EXPERIMENT 1: Independent Instances
const counter1 = createCounter(0);
const counter2 = createCounter(100);
counter1.increment(); // 1
counter2.increment(); // 101
console.log(counter1.getCount()); // 1 (NOT affected by counter2!)
→ PROVES: Each closure maintains SEPARATE state

✅ EXPERIMENT 2: Privacy Enforcement
const counter = createCounter(5);
console.log(counter.count); // undefined! ✅
counter.count = 999;        // Creates NEW public property!
console.log(counter.getCount()); // 5 (original state untouched) ✅
→ PROVES: True encapsulation (unlike class public properties)

✅ EXPERIMENT 3: Memory Persistence
function demo() {
  const c = createCounter(10);
  return c.increment; // Returns ONLY the function
}
const inc = demo(); 
console.log(inc()); // 11 → STILL works! Closure preserved!
console.log(inc()); // 12 → State persists across calls!
→ PROVES: Closure outlives original function execution

❌ COMMON MISCONCEPTION:
"People think closures are only for 'private variables'"
→ TRUTH: Closures enable ANY function to remember its creation environment
   (callbacks, event handlers, currying, partial application, etc.)

💡 INTERVIEW GOLD:
"When would you choose closures over classes?"
→ "For simple state encapsulation without inheritance needs:
   - Lighter syntax (no 'this' binding issues)
   - True privacy (no underscore conventions like _count)
   - Functional style (composes well with other FP patterns)
   - Memory efficiency for single-method objects
   Classes better for: complex hierarchies, instanceof checks, 
   prototype methods shared across instances"

🔧 REAL-WORLD USE CASES:
- React hooks (useState is essentially a closure-based counter!)
- Module patterns (private implementation details)
- Event handlers with preserved context
- Memoization caches
- Debounce/throttle functions
- Configuration factories

🎯 USAGE PATTERNS:
// Basic usage
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getCount()); // 2

// Functional composition
const doubleCounter = createCounter();
[1, 2, 3].forEach(() => doubleCounter.increment());
console.log(doubleCounter.getCount()); // 3

// As callback context
button.addEventListener('click', createCounter().increment);
═══════════════════════════════════════════════════════════════

🧠 CLOSURE MINDSET SHIFT:
Before closures: "How do I expose this data?"
After closures: "What minimal interface does the user NEED?"
→ Leads to more robust, maintainable APIs
→ Prevents tight coupling between components
→ Enables fearless refactoring of internal implementation

✨ KEY TAKEAWAY:
Closures aren't just a JavaScript quirk—they're a fundamental 
programming pattern for managing state and scope. Mastering them 
unlocks advanced patterns in React, Node.js, and modern frameworks!
═══════════════════════════════════════════════════════════════
*/
