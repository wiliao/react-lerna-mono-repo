import { test, expect, describe } from "@jest/globals";
import { processOrders } from "../src/array-methods.js";

describe("processOrders - Original Behavior (returning number)", () => {
  // Original simple function for backward compatibility
  const processOrdersSimple = (orders = []) => {
    if (!Array.isArray(orders)) return 0;

    const TAX_RATE = 0.1;

    return orders
      .filter(
        ({ status, total }) => status === "completed" && Number.isFinite(total),
      )
      .flatMap((order) => {
        const totalWithTax = order.total * (1 + TAX_RATE);
        if (totalWithTax < 10) return [];
        return [{ ...order, totalWithTax }];
      })
      .reduce((sum, { totalWithTax }) => sum + totalWithTax, 0);
  };

  test("processes completed orders and calculates total with tax", () => {
    const orders = [
      { id: 1, status: "completed", total: 100 },
      { id: 2, status: "pending", total: 200 },
      { id: 3, status: "completed", total: 50 },
    ];

    const result = processOrdersSimple(orders);
    expect(result).toBeCloseTo(165, 2); // (100 + 50) * 1.1 = 165
  });

  test("ignores orders with invalid totals", () => {
    const orders = [
      { id: 1, status: "completed", total: 100 },
      { id: 2, status: "completed", total: NaN },
      { id: 3, status: "completed", total: "50" },
    ];

    const result = processOrdersSimple(orders);
    expect(result).toBeCloseTo(110, 2); // Only 100 * 1.1
  });

  test("returns 0 for empty input", () => {
    expect(processOrdersSimple([])).toBe(0);
  });

  test("returns 0 for non-array input", () => {
    expect(processOrdersSimple(null)).toBe(0);
    expect(processOrdersSimple(undefined)).toBe(0);
    expect(processOrdersSimple({})).toBe(0);
  });

  test("does not mutate the original array", () => {
    const orders = [{ id: 1, status: "completed", total: 100 }];
    const originalSnapshot = structuredClone(orders);
    processOrdersSimple(orders);
    expect(orders).toEqual(originalSnapshot);
  });

  test("drops orders below minimum total threshold after tax", () => {
    const orders = [
      { id: 1, status: "completed", total: 5 }, // 5.5 → dropped
      { id: 2, status: "completed", total: 20 }, // 22 → kept
    ];

    const result = processOrdersSimple(orders);
    expect(result).toBeCloseTo(22, 2);
  });
});

describe("processOrders - Enhanced Behavior (returning object)", () => {
  test("processes completed orders and returns comprehensive statistics", () => {
    const orders = [
      { id: 1, status: "completed", total: 100, customerId: "cust1" },
      { id: 2, status: "pending", total: 200, customerId: "cust2" },
      { id: 3, status: "completed", total: 50, customerId: "cust3" },
    ];

    const result = processOrders(orders);

    // Check structure
    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("totalRevenue");
    expect(result).toHaveProperty("processedOrders");
    expect(result).toHaveProperty("orderCount");

    // Check calculations
    expect(result.totalRevenue).toBeCloseTo(165, 2); // (100 + 50) * 1.1
    expect(result.orderCount).toBe(2);
    expect(result.processedOrders).toHaveLength(2);
  });

  test("throws TypeError for non-array input", () => {
    expect(() => processOrders(null)).toThrow(TypeError);
    expect(() => processOrders(undefined)).toThrow(TypeError);
    expect(() => processOrders({})).toThrow(TypeError);
  });

  test("returns comprehensive empty structure for empty array", () => {
    const result = processOrders([]);

    expect(result.totalRevenue).toBe(0);
    expect(result.averageOrderValue).toBe(0);
    expect(result.orderCount).toBe(0);
    expect(result.processedOrders).toEqual([]);
    expect(result.largestOrder).toBeNull();
    expect(result.hasLargeOrders).toBe(false);
  });

  test("filters orders below threshold correctly", () => {
    const orders = [
      { id: 1, status: "completed", total: 5, customerId: "cust1" },
      { id: 2, status: "completed", total: 9.09, customerId: "cust2" },
      { id: 3, status: "completed", total: 20, customerId: "cust3" },
    ];

    const result = processOrders(orders);

    // Note: 9.09 * 1.1 = 9.999 which is less than 10, so it's filtered out
    expect(result.orderCount).toBe(1);
    expect(result.totalRevenue).toBeCloseTo(22, 2); // 20 * 1.1
  });
});
