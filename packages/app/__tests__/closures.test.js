import { createCounter } from "../src/closures.js";

test("counter maintains private state via closure", () => {
  const counter = createCounter(5); // ✅ TypeScript now knows this is Counter type!
  counter.increment();
  counter.increment();
  expect(counter.getCount()).toBe(7);

  // Verify TRUE closure behavior: independent state per instance
  const counter2 = createCounter(10);
  expect(counter2.getCount()).toBe(10);

  counter.increment();
  expect(counter.getCount()).toBe(8);
  expect(counter2.getCount()).toBe(10); // ✅ Unchanged = true encapsulation
});
