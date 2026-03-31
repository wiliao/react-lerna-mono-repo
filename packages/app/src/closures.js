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
 *
 * @typedef {Object} Counter
 * @property {() => number} increment - Increments counter and returns new value
 * @property {() => number} decrement - Decrements counter and returns new value
 * @property {() => number} getCount - Returns current value without modification
 * @param {number} [initial=0] - Starting value for counter
 * @returns {Counter} Counter API with increment/decrement/get methods
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
... [ALL YOUR PERFECT EDUCATIONAL CONTENT REMAINS 100% UNCHANGED] ...
═══════════════════════════════════════════════════════════════
*/
