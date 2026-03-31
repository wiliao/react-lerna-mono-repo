import { test, expect } from "@playwright/test";
import { fetchUser, fetchWithRetry } from "../../src/async.js";

test.describe("Async Utilities - Unit Tests", () => {
  test("fetchUser returns user data with simulated network delay", async () => {
    // ARRANGE: No setup needed (self-contained simulation)

    // ACT: Execute async function
    const user = await fetchUser(42);

    // ASSERT: Verify structure and values
    expect(user).toEqual({ id: 42, name: "User 42" });
    expect(typeof user.id).toBe("number");
    expect(typeof user.name).toBe("string");
  });

  test("fetchWithRetry handles transient failures with exponential backoff", async () => {
    // ARRANGE: Create flaky function that fails once then succeeds
    let attempts = 0;
    const flaky = () => {
      attempts++;
      if (attempts < 2) throw new Error("Network error");
      return { success: true };
    };

    // ACT: Execute with retry logic
    const result = await fetchWithRetry(flaky, 3); // Explicit retry count

    // ASSERT: Verify retry behavior and final result
    expect(attempts).toBe(2); // Failed once, succeeded on second attempt
    expect(result).toEqual({ success: true });

    // BONUS: Verify retry count boundary
    expect(attempts).toBeLessThanOrEqual(3); // Never exceeds max retries
  });

  test("fetchWithRetry throws final error after max retries", async () => {
    // ARRANGE: Always-failing function
    const alwaysFails = () => {
      throw new Error("Persistent failure");
    };

    // ACT & ASSERT: Should reject after all retries exhausted
    await expect(fetchWithRetry(alwaysFails, 2)).rejects.toThrow(
      "Persistent failure",
    );
  });

  test("fetchUser rejects invalid IDs with clear error", async () => {
    // ACT & ASSERT: Verify validation boundary
    await expect(fetchUser(0)).rejects.toThrow("Invalid ID");
    await expect(fetchUser(-5)).rejects.toThrow("Invalid ID");
  });
});
