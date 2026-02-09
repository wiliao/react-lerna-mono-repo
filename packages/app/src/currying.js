// @ts-nocheck
// TypeScript directive to skip type-checking
// Why here? Currying patterns can be complex to type statically
// In production TS: Use generics for proper typing (see advanced notes below)

/* 
═══════════════════════════════════════════════════════════════
WHAT IS CURRYING?
═══════════════════════════════════════════════════════════════

Currying transforms a function with multiple arguments into a sequence 
of functions that each take a single argument.

BEFORE (Uncurried):
  const multiply = (a, b) => a * b;
  multiply(2, 3); // 6

AFTER (Curried):
  const multiply = (a) => (b) => a * b;
  multiply(2)(3); // 6

KEY BENEFITS:
✅ Partial application: Create specialized functions from general ones
✅ Reusability: Pre-configure functions for specific contexts
✅ Readability: Express intent clearly ("double" vs "multiply by 2")
✅ Composition: Chain functions naturally in functional pipelines
✅ Configuration: Separate setup from execution (critical for APIs)

REAL-WORLD ANALOGY:
Think of currying like a coffee machine:
1. First slot: Insert coffee type (espresso, latte) → returns machine configured for that drink
2. Second slot: Insert cup size (small, large) → returns your prepared drink
3. You can save the "espresso machine" to make multiple espressos without reconfiguring
═══════════════════════════════════════════════════════════════
*/

// ═══════════════════════════════════════════════════════════════
// EXAMPLE 1: CLASSIC MATHEMATICAL CURRYING
// ═══════════════════════════════════════════════════════════════

/**
 * Curried multiplication function
 *
 * HOW IT WORKS (step-by-step):
 * 1. multiply(2) → returns function: (b) => 2 * b
 *    - 'a' is captured in closure (lexical scope)
 *    - This returned function "remembers" a=2
 * 2. multiply(2)(3) → executes (b) => 2 * b with b=3 → returns 6
 *
 * CLOSURE IN ACTION:
 * The inner function retains access to 'a' even after multiply()
 * finishes executing. This is the magic that makes currying work!
 *
 * SYNTAX BREAKDOWN:
 * (a) => (b) => a * b
 *  │      │      └─ Operation using both captured values
 *  │      └─ Returns function expecting second argument
 *  └─ Takes first argument, captures it in closure
 */
export const multiply = (a) => (b) => a * b;

/**
 * Specialized function: Doubles any number
 * Created by PARTIAL APPLICATION of multiply
 *
 * WHY THIS IS POWERFUL:
 * - No need to remember "multiply by 2" every time
 * - Self-documenting: double(5) > multiply(2,5)
 * - Reusable across entire codebase
 * - Testable as independent unit
 *
 * MEMORY FOOTPRINT:
 * Only ONE closure created (for a=2), reused for all calls
 * double(5) → uses same captured 'a=2' as double(10)
 */
export const double = multiply(2); // Returns: (b) => 2 * b

/**
 * Specialized function: Triples any number
 * Another partial application with different configuration
 *
 * KEY INSIGHT:
 * Each specialization creates its OWN closure with unique captured value
 * double and triple have SEPARATE closures (a=2 vs a=3)
 */
export const triple = multiply(3); // Returns: (b) => 3 * b

// ═══════════════════════════════════════════════════════════════
// EXAMPLE 2: PRACTICAL REAL-WORLD CURRYING (API CLIENT)
// ═══════════════════════════════════════════════════════════════

/**
 * Creates a configured API client with base URL pre-set
 *
 * WHY CURRYING SHINES HERE:
 * 1. SEPARATION OF CONCERNS:
 *    - Configuration (baseUrl) happens ONCE at app startup
 *    - Usage (endpoint) happens repeatedly during app lifetime
 *
 * 2. DRY PRINCIPLE:
 *    - No repeating baseUrl in every API call
 *    - Change baseUrl in ONE place (e.g., dev → prod)
 *
 * 3. TESTABILITY:
 *    - Mock API client by passing test baseUrl
 *    - No dependency injection framework needed
 *
 * 4. TYPE SAFETY (in TS):
 *    - baseUrl validated once at creation
 *    - All endpoints guaranteed to use correct base
 *
 * EXECUTION FLOW:
 * 1. createApiClient('https://api.example.com')
 *    → Returns: (endpoint) => fetch(`https://api.example.com${endpoint}`)...
 *    (baseUrl captured in closure)
 *
 * 2. apiClient('/users')
 *    → Executes: fetch('https://api.example.com/users')...
 *
 * ADVANTAGE OVER OBJECT PATTERN:
 * const api = { baseUrl: '...', get: (endpoint) => ... }
 * → Currying is PURE FUNCTION (no 'this' binding issues, easier to compose)
 */
export const createApiClient = (baseUrl) => (endpoint) =>
  // Fetch chain: Request → Response → JSON parsing
  fetch(`${baseUrl}${endpoint}`).then((res) => {
    // ⚠️ PRODUCTION ENHANCEMENT: Add error handling
    if (!res.ok) {
      throw new Error(`API Error ${res.status}: ${res.statusText}`);
    }
    return res.json();
  });

/* 
═══════════════════════════════════════════════════════════════
LEARNING LAB: Try These Experiments!
═══════════════════════════════════════════════════════════════

✅ EXPERIMENT 1: Verify partial application
console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(multiply(4)(5)); // 20 (full application)

✅ EXPERIMENT 2: Create specialized API clients
const devApi = createApiClient('http://localhost:3000/api');
const prodApi = createApiClient('https://api.prod.com/v1');

// Usage:
// devApi('/users') → fetches http://localhost:3000/api/users
// prodApi('/users') → fetches https://api.prod.com/v1/users

✅ EXPERIMENT 3: Compose with other functions
const getUsers = () => devApi('/users');
const getUserById = (id) => devApi(`/users/${id}`);

✅ EXPERIMENT 4: See closure in action
const timesTen = multiply(10);
console.dir(timesTen); // Inspect in browser: [[Scopes]] shows a=10!

❌ COMMON PITFALL: Forgetting parentheses
multiply(2, 3) // Returns function (b) => 2 * b, NOT 6!
→ Must call as multiply(2)(3)

💡 INTERVIEW GOLD:
"When would you choose currying over default parameters?"
→ "For configuration separation:
   - Default params: 'Same function, sometimes different values'
   - Currying: 'Different specialized functions from same blueprint'
   Example: 
     Default param: fetchUser(id, {cache: true}) 
     Currying: const cachedFetch = createFetch({cache: true})"

🔧 PRODUCTION ENHANCEMENTS:
// Add these in real applications:
- Error boundaries: .catch(handleApiError)
- Request headers: Accept, Authorization
- Timeout handling
- Retry logic (combine with fetchWithRetry from earlier!)
- Response caching
- TypeScript generics for type safety

🎯 ADVANCED: AUTOMATED CURRYING
// For functions with many parameters:
const curry = (fn) => (...args) =>
  args.length >= fn.length 
    ? fn(...args) 
    : (...more) => curry(fn)(...args, ...more);

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6 (flexible arity)

🧠 KEY TAKEAWAYS:
1. Currying = Function that returns function that returns function...
2. Each returned function captures previous arguments via CLOSURE
3. Creates specialized, reusable functions from general ones
4. Separates configuration from execution (critical for APIs)
5. Foundation for functional composition pipelines

✨ WHY THIS MATTERS IN MODERN JS:
- React hooks: useState(initial) → [state, setState]
- Redux middleware: store => next => action => ...
- Express.js: app.get(path, handler) uses partial application
- Lodash/fp: All functions auto-curried for composition
═══════════════════════════════════════════════════════════════

TYPESCRIPT PRO TIP (remove @ts-nocheck and add):
export const multiply = (a: number) => (b: number): number => a * b;

export const createApiClient = (baseUrl: string) => <T = unknown>(
  endpoint: string
): Promise<T> =>
  fetch(`${baseUrl}${endpoint}`).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<T>;
  });

// Usage with types:
const api = createApiClient('https://api.example.com');
const users = await api<{ id: number; name: string }>('/users');
// users is now typed! ✨
*/
