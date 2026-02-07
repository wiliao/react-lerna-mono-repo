// packages/app/__tests__/import.test.js
import { version } from "@tuomo/common/src/version.js";

test.skip("can import from @tuomo/common", () => {
  expect(version).toBe("0.1.0");
});
