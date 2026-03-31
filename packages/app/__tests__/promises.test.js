import { fetchData } from "../src/promises.js";

test("fetchData returns data after delay", async () => {
  const result = await fetchData();
  expect(result).toEqual({ data: "hello" });
});
