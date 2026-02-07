import { test, expect, describe } from "@jest/globals";
import { processOrders } from "../src/array-methods.js";

describe("processOrders", () => {
  test("processes completed orders and calculates total with tax", () => {
    const orders = [
      { id: 1, status: "completed", total: 100 },
      { id: 2, status: "pending", total: 200 },
      { id: 3, status: "completed", total: 50 },
    ];

    const result = processOrders(orders);

    // (100 + 50) * 1.1 = 165
    expect(result).toBeCloseTo(165, 2);
  });

  test("ignores orders with invalid totals", () => {
    const orders = [
      { id: 1, status: "completed", total: 100 },
      { id: 2, status: "completed", total: NaN },
      { id: 3, status: "completed", total: "50" },
    ];

    const result = processOrders(orders);

    // Only the valid numeric total is counted
    expect(result).toBeCloseTo(110, 2);
  });

  test("returns 0 for empty input", () => {
    expect(processOrders([])).toBe(0);
  });

  test("returns 0 for non-array input", () => {
    expect(processOrders(null)).toBe(0);
    expect(processOrders(undefined)).toBe(0);
    expect(processOrders({})).toBe(0);
  });

  test("does not mutate the original array", () => {
    const orders = [{ id: 1, status: "completed", total: 100 }];

    const originalSnapshot = structuredClone(orders);

    processOrders(orders);

    expect(orders).toEqual(originalSnapshot);
  });

  test("drops orders below minimum total threshold after tax", () => {
    const orders = [
      { id: 1, status: "completed", total: 5 }, // 5.5 → dropped
      { id: 2, status: "completed", total: 20 }, // 22 → kept
    ];

    const result = processOrders(orders);

    expect(result).toBeCloseTo(22, 2);
  });
});
