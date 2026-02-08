// Make Jest globals available in ESM mode
// This ensures test(), describe(), etc. work in both JS and TS files

global.test = test;
global.describe = describe;
global.expect = expect;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.jest = jest;
