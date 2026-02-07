import { createCounter } from "../src/closures.js";

test("counter maintains private state", () => {
  const counter = createCounter(5);
  counter.increment();
  counter.increment();
  expect(counter.getCount()).toBe(7);

  // Separate instance has independent state
  const counter2 = createCounter(10);
  expect(counter2.getCount()).toBe(10);
});
