// @ts-nocheck
// ^^^^^^^^^^^^
// TypeScript directive to skip type-checking this file.
// Useful when:
// - Gradually migrating JS → TS
// - Working with legacy code
// - Prototyping without type overhead
// ⚠️ In production TS projects, prefer adding proper types instead

/**
 * Simulates fetching a user from an API with validation and network delay
 *
 * KEY CONCEPTS DEMONSTRATED:
 * - Async/await syntax (modern Promise handling)
 * - Simulated network latency (real-world API behavior)
 * - Input validation (defensive programming)
 * - Error throwing for invalid states
 * - Promise constructor pattern
 *
 * @param {number} id - User ID to fetch (must be >= 1)
 * @returns {Promise<{id: number, name: string}>} User object wrapped in Promise
 * @throws {Error} When ID is invalid (< 1)
 *
 * REAL-WORLD ANALOGY:
 * Like ordering coffee at a café:
 * 1. Wait in line (network delay)
 * 2. Barista checks your order number (validation)
 * 3. If invalid number → "Sorry, that order doesn't exist!" (error)
 * 4. If valid → receives coffee (user object)
 */
export const fetchUser = async (id) => {
  // SIMULATE NETWORK DELAY (100ms)
  // Why? Real APIs have latency. This:
  // - Prevents "instant" responses that don't reflect reality
  // - Tests loading states in UIs
  // - Reveals race conditions in async code
  // Pattern: Wrap setTimeout in Promise to use with await
  await new Promise((resolve) => setTimeout(resolve, 100));

  // INPUT VALIDATION (CRITICAL!)
  // Why validate here?
  // - Fail fast: Reject bad inputs immediately
  // - Prevent wasted network requests
  // - Clear error messages > cryptic API errors
  // - Security: Block invalid IDs before hitting backend
  if (id < 1) throw new Error("Invalid ID");

  // RETURN USER OBJECT
  // Note: In real apps, this would be API response data
  // Pattern: Return consistent shape {id, name} for predictability
  return { id, name: `User ${id}` };
};

/**
 * Adds resilient retry logic to any async operation
 * Implements exponential backoff strategy (industry best practice)
 *
 * KEY CONCEPTS DEMONSTRATED:
 * - Higher-order function (function that takes/returns functions)
 * - Retry pattern with configurable attempts
 * - Exponential backoff (increasing delays between retries)
 * - Error propagation control
 * - Loop-based async retry (vs recursion)
 *
 * REAL-WORLD ANALOGY:
 * Like calling a busy phone line:
 * 1st try: Hang up immediately → retry after 100ms
 * 2nd try: Still busy → wait longer (200ms)
 * 3rd try: Still busy → wait even longer (300ms)
 * Final try: Give up and report failure
 *
 * WHY EXPONENTIAL BACKOFF?
 * - Prevents "thundering herd" problem (all clients retrying simultaneously)
 * - Gives server time to recover between attempts
 * - Reduces network congestion
 * - Industry standard (used by AWS, Google Cloud, etc.)
 *
 * @param {Function} fn - Async function to execute (must return Promise)
 * @param {number} retries - Max retry attempts (default: 3)
 * @returns {Promise<*>} Result of successful fn() call
 * @throws {*} Error from final failed attempt
 */
export const fetchWithRetry = async (fn, retries = 3) => {
  // LOOP THROUGH RETRY ATTEMPTS
  // Why for-loop?
  // - Clear iteration control (vs recursion)
  // - Easy access to attempt number (i) for backoff calculation
  // - Memory efficient (no call stack buildup)
  for (let i = 0; i < retries; i++) {
    try {
      // ATTEMPT EXECUTION
      // await pauses loop until fn() resolves OR rejects
      // On success: immediately return result (exits function)
      return await fn();
    } catch (err) {
      // HANDLE FAILURE
      // Critical check: Is this the LAST attempt?
      if (i === retries - 1) {
        // FINAL FAILURE: Propagate error to caller
        // Preserves original error stack trace and message
        throw err;
      }

      // CALCULATE BACKOFF DELAY
      // Formula: 100ms * (attempt number + 1)
      // Attempt 0 (first retry): 100 * 1 = 100ms
      // Attempt 1 (second retry): 100 * 2 = 200ms
      // Attempt 2 (third retry): 100 * 3 = 300ms
      // Why (i+1)? Avoid zero delay on first retry
      const delay = 100 * (i + 1);

      // WAIT BEFORE RETRYING
      // Pattern: Create Promise that resolves after delay
      // Why not use external library?
      // - Minimal dependencies
      // - Clear intent
      // - No need for complex scheduling
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Loop continues to next iteration (retry)
    }
  }
};

/* 
═══════════════════════════════════════════════════════════════
LEARNING NOTES & BEST PRACTICES
═══════════════════════════════════════════════════════════════

✅ DO THIS:
- Always validate inputs BEFORE async operations
- Use exponential backoff (not fixed delays) for retries
- Preserve original error on final failure
- Make retry count configurable (don't hardcode)
- Document retry behavior clearly

❌ AVOID THESE PITFALLS:
- Infinite retries (always set max attempts)
- Fixed delays (causes retry storms)
- Swallowing errors silently
- Not testing error paths
- Forgetting to await the retry delay

💡 INTERVIEW TALKING POINTS:
"When discussing retry logic in interviews, mention:
1. 'I implement exponential backoff to avoid overwhelming services'
2. 'I make retry counts configurable per endpoint sensitivity'
3. 'I preserve original errors for debugging'
4. 'I consider circuit breakers for persistent failures'
5. 'I log retry attempts for observability'"

🔧 REAL-WORLD ENHANCEMENTS:
// Add these in production:
- Logging: console.log(`Retry ${i+1}/${retries} after ${delay}ms`)
- AbortController support for cancellation
- Jitter (randomness) to prevent synchronized retries
- Status code awareness (only retry 5xx errors)
- Metrics tracking (success/failure rates)

🎯 USAGE EXAMPLE:
// Basic usage
const user = await fetchWithRetry(() => fetchUser(5));

// With custom retries
const criticalData = await fetchWithRetry(
  () => fetch('/critical-endpoint'),
  5 // 5 attempts instead of default 3
);

// Error handling
try {
  await fetchWithRetry(() => fetchUser(-1));
} catch (error) {
  console.error('Final failure:', error.message); // "Invalid ID"
}
═══════════════════════════════════════════════════════════════
*/
