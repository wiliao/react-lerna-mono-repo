import { processOrders } from "../src/array-methods.js";

test("processes orders pipeline", () => {
  const orders = [
    { id: 1, status: "completed", total: 100 },
    { id: 2, status: "pending", total: 200 },
    { id: 3, status: "completed", total: 50 },
  ];

  const result = processOrders(orders);
  // (100 * 1.1) + (50 * 1.1) = 165
  expect(result).toBe(165);
});
