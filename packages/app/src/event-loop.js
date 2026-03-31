/**
 * demonstrateEventLoop
 *
 * @pattern Execution Model Demonstration
 *
 * @responsibility
 * Illustrate JavaScript’s single-threaded execution model and
 * the relative priority of synchronous code, microtasks, and macrotasks.
 *
 * @design_intent
 * This function is intentionally deterministic and side-effectful
 * (console output) to make execution ordering observable.
 *
 * @architecture_notes
 * - Synchronous code executes to completion before the event loop advances
 * - Microtasks (Promises) are drained before macrotasks
 * - Long-running synchronous work blocks *all* task queues
 *
 * @tradeoffs
 * + Clear, minimal reproduction of event loop behavior
 * + Useful for reasoning about latency and scheduling bugs
 * − Uses intentional blocking, which must never exist in production code
 *
 * @usage_guidelines
 * Educational or diagnostic use only.
 * Not suitable for benchmarks or real workloads.
 */
export const demonstrateEventLoop = () => {
  // Phase 1: Synchronous execution (call stack)
  console.log("1. Sync start");

  // Phase 3: Macrotask queue (scheduled, lowest priority here)
  setTimeout(() => console.log("5. Macrotask (setTimeout)"), 0);

  // Phase 2: Microtask queue (drained before macrotasks)
  Promise.resolve().then(() => console.log("3. Microtask (Promise)"));

  console.log("2. Sync end");

  /**
   * Intentional event-loop blocking.
   *
   * @architecture_warning
   * Demonstrates how CPU-bound work starves both microtasks
   * and macrotasks, increasing latency system-wide.
   *
   * @tradeoff
   * Blocks observability and responsiveness to make the
   * scheduling effect unambiguous.
   */
  const start = Date.now();
  while (Date.now() - start < 100) {} // ~100ms busy wait

  console.log("4. After blocking");
};

/**
 * Expected execution order:
 *
 * 1. Sync start
 * 2. Sync end
 * 4. After blocking
 * 3. Microtask (Promise)
 * 5. Macrotask (setTimeout)
 *
 * @interpretation
 * Microtasks are queued earlier but cannot execute until
 * the synchronous call stack is fully drained.
 */
