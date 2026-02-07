import { fetchUser, fetchWithRetry } from "../src/async.js";

test("fetchUser returns user data", async () => {
  const user = await fetchUser(42);
  expect(user).toEqual({ id: 42, name: "User 42" });
});

test("fetchWithRetry handles failures", async () => {
  let attempts = 0;
  const flaky = () => {
    attempts++;
    if (attempts < 2) throw new Error("Network error");
    return { success: true };
  };

  const result = await fetchWithRetry(flaky);
  expect(attempts).toBe(2);
  expect(result).toEqual({ success: true });
});
