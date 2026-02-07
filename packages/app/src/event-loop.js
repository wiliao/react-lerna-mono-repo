export const demonstrateEventLoop = () => {
  console.log("1. Sync start");

  setTimeout(() => console.log("5. Macrotask (setTimeout)"), 0);

  Promise.resolve().then(() => console.log("3. Microtask (Promise)"));

  console.log("2. Sync end");

  // Blocking the loop (BAD practice - for demonstration only)
  const start = Date.now();
  while (Date.now() - start < 100) {} // 100ms block

  console.log("4. After blocking");
};

// Expected output order:
// 1. Sync start
// 2. Sync end
// 4. After blocking
// 3. Microtask (Promise)
// 5. Macrotask (setTimeout)
