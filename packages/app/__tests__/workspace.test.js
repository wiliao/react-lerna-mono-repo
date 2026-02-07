// packages/app/__tests__/workspace.test.js
import { version } from "@tuomo/common/src/version.js";

test("workspace linking works", () => {
  expect(version).toBe("0.1.0");
});
