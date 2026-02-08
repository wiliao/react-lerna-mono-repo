/**
 * JavaScript test suite for order processing module
 * Demonstrates runtime validation patterns with pure ESM syntax
 */

import { test, expect, describe } from "@jest/globals";

import {
  processOrders,
  validateAndProcessOrders,
  orderAnalysisExample,
} from "../src/array-methods.js";

// Helper for deep equality without mutation
const clone = (obj) => JSON.parse(JSON.stringify(obj));

describe("processOrders - Original Behavior Compatibility", () => {
  test("processes completed orders and calculates total with tax", () => {
    const orders = [
      { id: 1, status: "completed", total: 100, customerId: "cust1" },
      { id: 2, status: "pending", total: 200, customerId: "cust2" },
      { id: 3, status: "completed", total: 50, customerId: "cust3" },
    ];

    const result = processOrders(orders);
    expect(result.totalRevenue).toBeCloseTo(165, 2); // (100 + 50) * 1.1
    expect(result.orderCount).toBe(2);
  });

  // FIXED: String "50" is VALID after Number() conversion in your implementation
  test("ignores truly invalid totals (NaN, non-numeric strings)", () => {
    const orders = [
      { id: 1, status: "completed", total: 100, customerId: "cust1" },
      { id: 2, status: "completed", total: NaN, customerId: "cust2" }, // INVALID: NaN
      { id: 3, status: "completed", total: "invalid", customerId: "cust3" }, // INVALID: non-numeric string
      { id: 4, status: "completed", total: "50", customerId: "cust4" }, // VALID: numeric string converts to 50
    ];

    const result = processOrders(orders);
    // Orders 1 and 4 processed: (100 + 50) * 1.1 = 165
    expect(result.totalRevenue).toBeCloseTo(165, 2);
    expect(result.orderCount).toBe(2);
  });

  test("returns 0 revenue and 0 count for empty input", () => {
    const result = processOrders([]);
    expect(result.totalRevenue).toBe(0);
    expect(result.orderCount).toBe(0);
    expect(result.processedOrders).toEqual([]);
  });

  test("throws TypeError for non-array input", () => {
    expect(() => processOrders(null)).toThrow(TypeError);
    expect(() => processOrders(undefined)).toThrow(TypeError);
    expect(() => processOrders({})).toThrow(TypeError);
    expect(() => processOrders("not an array")).toThrow(TypeError);
  });

  test("does not mutate the original array", () => {
    const orders = [
      { id: 1, status: "completed", total: 100, customerId: "cust1" },
    ];
    const original = clone(orders);

    processOrders(orders);
    expect(orders).toEqual(original);
  });

  test("filters orders below minimum threshold after tax", () => {
    const orders = [
      { id: 1, status: "completed", total: 5, customerId: "cust1" }, // 5.5 → dropped
      { id: 2, status: "completed", total: 9.09, customerId: "cust2" }, // 9.999 → dropped
      { id: 3, status: "completed", total: 20, customerId: "cust3" }, // 22 → kept
    ];

    const result = processOrders(orders);
    expect(result.orderCount).toBe(1);
    expect(result.totalRevenue).toBeCloseTo(22, 2);
  });

  test("handles duplicate order IDs correctly", () => {
    const orders = [
      { id: 1, status: "completed", total: 100, customerId: "cust1" },
      { id: 1, status: "completed", total: 200, customerId: "cust1" }, // duplicate
      { id: 2, status: "completed", total: 50, customerId: "cust2" },
    ];

    const result = processOrders(orders);
    expect(result.orderCount).toBe(2); // Duplicate removed
    expect(result.processedOrders.map((o) => o.id)).toEqual([1, 2]);
  });
});

describe("processOrders - Enhanced Behavior Validation", () => {
  // FIXED: 110 > 100 threshold → hasLargeOrders MUST be true
  test("returns comprehensive statistics structure with correct large order detection", () => {
    const orders = [
      { id: 1, status: "completed", total: 100, customerId: "cust1" }, // 110 after tax → LARGE
      { id: 2, status: "pending", total: 200, customerId: "cust2" },
      { id: 3, status: "completed", total: 50, customerId: "cust3" }, // 55 after tax → regular
    ];

    const result = processOrders(orders);

    // Verify all required properties exist
    expect(result).toHaveProperty("totalRevenue");
    expect(result).toHaveProperty("averageOrderValue");
    expect(result).toHaveProperty("orderCount");
    expect(result).toHaveProperty("processedOrders");
    expect(result).toHaveProperty("largestOrder");
    expect(result).toHaveProperty("smallestOrder");
    expect(result).toHaveProperty("firstLargeOrder");
    expect(result).toHaveProperty("hasLargeOrders");
    expect(result).toHaveProperty("allOrdersHaveCustomer");
    expect(result).toHaveProperty("isEmpty");
    expect(result).toHaveProperty("totalTaxCollected");
    expect(result).toHaveProperty("uniqueCustomers");
    expect(result).toHaveProperty("orderCountByCategory");
    expect(result).toHaveProperty("orderTotals");
    expect(result).toHaveProperty("customerIds");

    // Verify calculations
    expect(result.totalRevenue).toBeCloseTo(165, 2);
    expect(result.orderCount).toBe(2);
    expect(result.processedOrders).toHaveLength(2);
    expect(result.hasLargeOrders).toBe(true); // 110 > 100 threshold → LARGE ORDER EXISTS
  });

  test("identifies large orders correctly", () => {
    const orders = [
      { id: 1, status: "completed", total: 90, customerId: "cust1" }, // 99 → regular
      { id: 2, status: "completed", total: 100, customerId: "cust2" }, // 110 → large
    ];

    const result = processOrders(orders);
    expect(result.hasLargeOrders).toBe(true);
    expect(result.orderCountByCategory).toEqual({ large: 1, regular: 1 });

    expect(result.firstLargeOrder).toBeDefined();
    expect(result.firstLargeOrder.isLargeOrder).toBe(true);
    expect(result.firstLargeOrder.totalWithTax).toBeCloseTo(110, 2);
  });

  test("handles edge cases gracefully", () => {
    // Missing customerId
    const orders = [
      { id: 1, status: "completed", total: 100 }, // missing customerId → filtered out
      { id: 2, status: "completed", total: 50, customerId: "cust2" },
    ];

    const result = processOrders(orders);
    expect(result.orderCount).toBe(1); // First order filtered out
    expect(result.allOrdersHaveCustomer).toBe(true); // Only valid orders counted
  });
});

describe("Utility Functions", () => {
  test("validateAndProcessOrders handles success case", () => {
    const orders = [
      { id: 1, status: "completed", total: 100, customerId: "cust1" },
    ];

    const result = validateAndProcessOrders(orders);
    expect(result.success).toBe(true);
    expect(result.error).toBeNull();
    expect(result.data).not.toBeNull();
    expect(result.data).toBeDefined();
    expect(result.data.orderCount).toBe(1);
  });

  test("validateAndProcessOrders handles error case", () => {
    const result = validateAndProcessOrders("invalid");
    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toContain("must be an array");
  });

  test("orderAnalysisExample adds customer segmentation", () => {
    const orders = [
      { id: 1, status: "completed", total: 100, customerId: "cust1" },
      { id: 2, status: "completed", total: 200, customerId: "cust2" },
      { id: 3, status: "completed", total: 150, customerId: "cust1" },
    ];

    const result = orderAnalysisExample(orders);

    expect(result).toHaveProperty("customerOrders");
    expect(result.customerOrders.cust1).toHaveLength(2);
    expect(result.customerOrders.cust2).toHaveLength(1);
    expect(result.topCustomerId).toBe("cust1"); // Higher total spend: (100+150)*1.1 = 275 vs 220
  });
});
