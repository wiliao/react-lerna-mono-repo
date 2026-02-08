/**
 * TypeScript test suite - minimal version to verify setup works
 */

import { test, expect, describe } from "@jest/globals";
import { processOrders } from "../src/array-methods.js";

describe("processOrders - TypeScript Basic Tests", () => {
  test("processes completed orders correctly", () => {
    const orders = [
      { id: 1, status: "completed", total: 100, customerId: "cust1" },
      { id: 2, status: "pending", total: 200, customerId: "cust2" },
      { id: 3, status: "completed", total: 50, customerId: "cust3" },
    ];

    const result = processOrders(orders);

    expect(result.totalRevenue).toBeCloseTo(165, 2);
    expect(result.orderCount).toBe(2);
  });

  test("throws TypeError for non-array input", () => {
    expect(() => processOrders(null)).toThrow(TypeError);
    expect(() => processOrders(undefined)).toThrow(TypeError);
  });

  test("handles empty array correctly", () => {
    const result = processOrders([]);

    expect(result.totalRevenue).toBe(0);
    expect(result.orderCount).toBe(0);
    expect(result.largestOrder).toBeNull();
    expect(result.hasLargeOrders).toBe(false);
  });
});
