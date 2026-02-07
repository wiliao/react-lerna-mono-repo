import { test, expect, jest, afterEach } from "@jest/globals";
import { double, triple, createApiClient } from "../src/currying.js";

test("curried functions", () => {
  expect(double(5)).toBe(10);
  expect(triple(5)).toBe(15);
});

test("configurable API client", async () => {
  const mockResponse = { data: "test" }; // ✅ Fixed colon syntax

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    }),
  );

  const api = createApiClient("https://api.example.com");
  const data = await api("/users");

  expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/users");
  expect(data).toEqual(mockResponse);
});

afterEach(() => {
  jest.clearAllMocks();
});
