// @ts-nocheck
// TypeScript directive to skip type-checking
// Why? Destructuring patterns can be complex to type statically
// In production TS: Add explicit types (see advanced notes at end)

/* 
═══════════════════════════════════════════════════════════════
DESTRUCTURING & SPREAD: CORE CONCEPTS
═══════════════════════════════════════════════════════════════

DESTRUCTURING = Extracting values from objects/arrays into variables
SPREAD = Expanding iterables (arrays/objects) into individual elements

WHY THESE PATTERNS MATTER:
✅ Readability: "Show me what I need" vs "dig through nested structures"
✅ Immutability: Create new objects without modifying originals (critical for React/Redux)
✅ Conciseness: Replace verbose assignments with single-line patterns
✅ Safety: Provide default values for missing properties
✅ Flexibility: Handle variable-length data structures gracefully

REAL-WORLD ANALOGY:
Think of destructuring like unpacking a suitcase:
- Object destructuring: "Take out my passport (name), phone (email), and wallet (profile)"
- Nested destructuring: "From wallet, take cash (age)"
- Array destructuring: "Take first shirt (first), pack rest in drawer (rest)"
- Spread: "Copy all items from old suitcase into new one, add boarding pass (updatedAt)"
═══════════════════════════════════════════════════════════════
*/

// ═══════════════════════════════════════════════════════════════
// EXAMPLE 1: NESTED OBJECT DESTRUCTURING
// ═══════════════════════════════════════════════════════════════

/**
 * Formats user information with nested profile data
 *
 * SYNTAX BREAKDOWN:
 * ({ name, email, profile: { age } })
 *   │      │        │        └─ Extract 'age' from nested 'profile' object
 *   │      │        └─ Rename: Capture 'profile' property but immediately destructure it
 *   │      └─ Extract 'email' property
 *   └─ Extract 'name' property
 *
 * KEY MECHANICS:
 * 1. Function parameter is DESTRUCTURED immediately on entry
 * 2. Nested pattern `profile: { age }` does TWO things:
 *    - `profile:` = "I expect a property named 'profile'"
 *    - `{ age }` = "and I want to extract 'age' from that object"
 * 3. Original parameter object remains UNTOUCHED (no mutation)
 *
 * WHY THIS BEATS TRADITIONAL ACCESS:
 * ❌ Old way:
 *    const name = user.name;
 *    const email = user.email;
 *    const age = user.profile.age;
 * ✅ New way: Single-line extraction with clear intent
 *
 * CRITICAL EDGE CASE HANDLING:
 * If called with missing properties:
 *   getUserInfo({}) → TypeError: Cannot read properties of undefined
 * PRODUCTION FIX: Add default parameters (see advanced notes)
 */
export const getUserInfo = ({ name, email, profile: { age } }) => {
  // Returns formatted string using extracted values
  // Template literals enhance readability vs concatenation
  return `${name} (${age}) - ${email}`;
};

// ═══════════════════════════════════════════════════════════════
// EXAMPLE 2: ARRAY DESTRUCTURING + REST OPERATOR
// ═══════════════════════════════════════════════════════════════

/**
 * Splits array into first element and remaining elements
 *
 * SYNTAX BREAKDOWN:
 * ([first, ...rest])
 *   │       └─ REST OPERATOR: Collects ALL remaining elements into new array
 *   └─ Extract first element of array
 *
 * HOW REST OPERATOR WORKS:
 * Input: [1, 2, 3, 4, 5]
 *   first = 1
 *   rest = [2, 3, 4, 5]  ← New array containing elements AFTER first
 *
 * KEY DIFFERENCES: REST vs SPREAD
 * - REST (...rest): COLLECTS multiple elements INTO array (used in destructuring)
 * - SPREAD (...arr): EXPANDS array INTO individual elements (used in literals)
 *
 * REAL-WORLD USE CASES:
 * - Pagination: [currentPage, ...otherPages]
 * - Command-line args: [command, ...flags]
 * - React hooks: const [state, setState] = useState()
 * - Skipping elements: const [, , third] = array
 *
 * EDGE CASE BEHAVIOR:
 * getFirstAndRest([]) → { first: undefined, rest: [] }
 * getFirstAndRest([5]) → { first: 5, rest: [] }
 * → Rest operator ALWAYS returns array (never undefined/null)
 */
export const getFirstAndRest = ([first, ...rest]) => ({ first, rest });

// ═══════════════════════════════════════════════════════════════
// EXAMPLE 3: SPREAD FOR IMMUTABLE UPDATES
// ═══════════════════════════════════════════════════════════════

/**
 * Creates updated user object WITHOUT mutating original
 * Implements critical immutability pattern for state management
 *
 * SYNTAX BREAKDOWN:
 * {
 *   ...user,      // SPREAD: Copy ALL properties from original user
 *   ...updates,   // SPREAD: Override with update properties (later spreads win)
 *   updatedAt: ... // Add new property
 * }
 *
 * IMMUTABILITY IN ACTION:
 * const original = { id: 1, name: "Alice", role: "user" };
 * const updated = updateUser(original, { role: "admin" });
 *
 * Result:
 *   updated = { id: 1, name: "Alice", role: "admin", updatedAt: "2024-..." }
 *   original.role → STILL "user" (unchanged!) ✅
 *
 * WHY ORDER MATTERS IN SPREAD:
 * { ...user, ...updates } vs { ...updates, ...user }
 * - LATER spreads OVERRIDE earlier ones
 * - Critical for update patterns: updates should override user properties
 *
 * SHALLOW COPY WARNING ⚠️:
 * Spread creates SHALLOW copy only!
 * If user has nested objects:
 *   user: { settings: { theme: "dark" } }
 *   ...user → copies reference to settings object
 *   Modifying settings in new object affects original!
 * PRODUCTION FIX: Use deep merge libraries or recursive spread
 *
 * REAL-WORLD CONTEXT:
 * This pattern is FOUNDATION of:
 * - React state updates: setUser(prev => ({ ...prev, name: "New" }))
 * - Redux reducers: return { ...state, loading: false }
 * - Immer alternative (when you don't need deep immutability)
 */
export const updateUser = (user, updates) => ({
  ...user, // Copy original properties FIRST
  ...updates, // Override with updates SECOND (order matters!)
  updatedAt: new Date().toISOString(), // Add metadata LAST
});

/* 
═══════════════════════════════════════════════════════════════
LEARNING LAB: Critical Experiments & Pitfalls
═══════════════════════════════════════════════════════════════

✅ EXPERIMENT 1: Nested destructuring safety
try {
  getUserInfo({ name: "Test", email: "test@test.com" }); // Missing profile!
} catch (e) {
  console.error("Crashes on missing nested property!"); // TypeError
}
// ✅ FIX: Add default values
// ({ name, email, profile: { age } = {} } = {}) 

✅ EXPERIMENT 2: Rest operator behavior
console.log(getFirstAndRest([1])); 
// { first: 1, rest: [] } → Rest is ALWAYS array (even empty)

✅ EXPERIMENT 3: Spread property override order
const a = { x: 1, y: 2 };
const b = { y: 99, z: 3 };
console.log({ ...a, ...b }); // { x:1, y:99, z:3 } → b overrides a
console.log({ ...b, ...a }); // { x:1, y:2, z:3 } → a overrides b

✅ EXPERIMENT 4: Shallow copy limitation
const original = { settings: { theme: "dark" } };
const updated = { ...original, settings: { ...original.settings, fontSize: 14 } };
updated.settings.theme = "light";
console.log(original.settings.theme); // "dark" ✅ (deep copy worked)
// But without nested spread: would be "light" ❌

❌ COMMON PITFALLS:
1. Forgetting defaults for optional properties → runtime errors
2. Assuming spread does deep copy → accidental mutations
3. Misordering spreads → unintended property overrides
4. Using rest on non-iterables → TypeError

💡 INTERVIEW GOLD:
"When would you choose destructuring over direct property access?"
→ "For function parameters and state updates:
   - Signals 'these are the ONLY properties I need'
   - Enables safe refactoring (rename parameter without breaking callers)
   - Provides built-in documentation in function signature
   - Combined with defaults: handles optional parameters elegantly
   Direct access better for: one-off accesses, performance-critical loops"

🔧 PRODUCTION ENHANCEMENTS:
// Add these in real applications:
- Default values: ({ name = 'Guest', profile: { age = 18 } = {} } = {})
- TypeScript types: 
  type User = { name: string; email: string; profile: { age: number } };
- Deep merge for nested objects (use libraries like lodash.merge)
- Validation before destructuring (Zod, Yup)

🎯 ADVANCED PATTERNS:
// Skipping elements in arrays
const [first, , third] = [1, 2, 3]; // third = 3

// Renaming during destructuring
const { name: userName, email: userEmail } = user;

// Computed property names
const key = 'email';
const { [key]: value } = user; // value = user.email

// Destructuring in loops
for (const { id, name } of users) { ... }

🧠 KEY TAKEAWAYS:
1. DESTRUCTURING = Extraction pattern (pull values OUT)
2. SPREAD = Expansion pattern (push values IN)
3. REST = Collection pattern (gather remaining values)
4. Order matters in object spread (last wins)
5. ALWAYS handle missing properties with defaults in production
6. Spread = shallow copy only (critical for nested objects)

✨ WHY THIS MATTERS IN MODERN JS:
- React: const { children, ...props } = this.props
- Redux: const { user, loading } = state.auth
- API responses: const { data: items } = await fetch().then(res => res.json())
- Configuration: const { port = 3000, host = 'localhost' } = config
- Functional programming: Enables point-free style and composition

═══════════════════════════════════════════════════════════════
TYPESCRIPT PRO UPGRADE (remove @ts-nocheck and add):
═══════════════════════════════════════════════════════════════

interface Profile {
  age: number;
  [key: string]: any; // Allow additional properties
}

interface User {
  name: string;
  email: string;
  profile: Profile;
}

// With safety defaults
export const getUserInfo = (
  { 
    name = 'Anonymous', 
    email = 'unknown@example.com', 
    profile: { age = 0 } = {} 
  }: User = {} as User
) => `${name} (${age}) - ${email}`;

// Type-safe update function
export const updateUser = <T extends object>(
  user: T, 
  updates: Partial<T>
): T & { updatedAt: string } => ({
  ...user,
  ...updates,
  updatedAt: new Date().toISOString(),
});
*/
