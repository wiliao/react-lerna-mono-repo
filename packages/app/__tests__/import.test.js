import { version } from "@tuomo/common/src/version.js";

test.skip("can import from @tuomo/app", () => {
  expect(version).toBe("0.1.0");
});
