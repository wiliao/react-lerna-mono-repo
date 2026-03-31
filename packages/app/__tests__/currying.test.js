import { test, expect, jest } from "@jest/globals";
import { double, triple, createApiClient } from "../src/currying.js";

test("curried functions", () => {
  expect(double(5)).toBe(10);
  expect(triple(5)).toBe(15);
});

test("configurable API client", async () => {
  const mockResponse = { data: "test" };
  const originalFetch = global.fetch; // ✅ Save original reference

  try {
    // ✅ Type-safe mock with minimal Response interface compliance
    // @ts-ignore - Intentional override for test isolation (justified)
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
      ok: true, // Critical: satisfies Response.ok contract
    });

    const api = createApiClient("https://api.example.com");
    const data = await api("/users");

    expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/users");
    expect(data).toEqual(mockResponse);
  } finally {
    // ✅ RESTORE instead of delete (TypeScript-safe cleanup)
    // @ts-ignore - Restore may be undefined (safe in test context)
    global.fetch = originalFetch;
    jest.clearAllMocks(); // Reset mock state
  }
});
