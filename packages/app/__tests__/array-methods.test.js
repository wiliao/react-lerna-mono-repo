import { test, expect } from "@jest/globals";
import { processOrders } from "../src/array-methods.js";

test("processes orders pipeline", () => {
  const orders = [
    { id: 1, status: "completed", total: 100 },
    { id: 2, status: "pending", total: 200 },
    { id: 3, status: "completed", total: 50 },
  ];

  const result = processOrders(orders);

  // ✅ Allow tiny floating-point error (default tolerance: 2 decimal places)
  expect(result).toBeCloseTo(165);

  // OR be explicit about precision:
  expect(result).toBeCloseTo(165, 2); // 2 decimal places
});
