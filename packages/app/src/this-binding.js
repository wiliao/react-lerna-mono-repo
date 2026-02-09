// @ts-nocheck

/**
 * Demonstrates context preservation and resource lifecycle management.
 */
export class Timer {
  #seconds = 0; // Private class field (ES2022) for true encapsulation
  #intervalId = null;

  /**
   * ✅ PATTERN: Arrow function as a class field.
   * PRO: 'this' is lexically bound to the instance; safe to pass as a callback.
   * CON: The method exists on the instance rather than the prototype.
   */
  tick = () => {
    this.#seconds++;
    console.log(`Elapsed: ${this.#seconds}s`);
  };

  start() {
    if (this.#intervalId) return; // Prevent multiple concurrent intervals
    this.#intervalId = setInterval(this.tick, 1000);
  }

  /**
   * ✅ CRITICAL: Cleanup method to prevent memory leaks.
   * Always provide a way to tear down side effects in long-running applications.
   */
  stop() {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }
}
