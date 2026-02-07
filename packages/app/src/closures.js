export function createCounter(initial = 0) {
  let count = initial; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}
