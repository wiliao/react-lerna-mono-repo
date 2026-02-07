import {
  getUserInfo,
  getFirstAndRest,
  updateUser,
} from "../src/destructuring.js";

test("extracts nested data", () => {
  const user = {
    name: "Will",
    email: "will@example.com",
    profile: { age: 35 },
  };
  expect(getUserInfo(user)).toBe("Will (35) - will@example.com");
});

test("immutable update", () => {
  const original = { id: 1, name: "Old" };
  const updated = updateUser(original, { name: "New" });

  expect(updated.name).toBe("New");
  expect(updated.id).toBe(1);
  expect(updated).not.toBe(original); // New object reference
});
