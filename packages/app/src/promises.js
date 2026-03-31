// @ts-nocheck
// TEMP: Disabled during migration; replace with proper TS types in production

// ═══════════════════════════════════════════════════════════════
// delay: Promise-based timer utility
// REAL-WORLD: Simulate network latency in tests; implement retry backoff; debounce/throttle delays
// KEY DESIGN:
//   • Returns Promise → seamless async/await integration
//   • Minimal wrapper → zero dependencies, maximum reuse
//   • Pure function → no side effects beyond timer resolution
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ═══════════════════════════════════════════════════════════════
// fetchData: Mock async data fetch with realistic latency
// REAL-WORLD: Frontend development with mock APIs; testing loading states; demo environments
// KEY DESIGN:
//   • Fixed 100ms delay → simulates real network latency (not instant)
//   • Consistent shape → matches production API structure ({ data: ... })
//   • Async function → integrates naturally with async/await workflows
export async function fetchData() {
  await delay(100);
  return { data: "hello" };
}

/* ═══════════════════════════════════════════════════════════════
WHY THESE PATTERNS MATTER: REAL-WORLD CONTEXT
═══════════════════════════════════════════════════════════════

| Pattern      | Without Pattern                | With Pattern                     | Impact                          |
|--------------|--------------------------------|----------------------------------|---------------------------------|
| delay()      | Callback hell with setTimeout  | Clean async/await pauses         | ✅ Readable async workflows     |
| Mock Fetch   | Instant returns (unrealistic)  | Simulated latency + real shape   | ✅ Tests actual loading states  |

KEY PRINCIPLES:
1. Simulate reality: Mocks should mimic production behavior (latency, structure)
2. Async hygiene: Promises > callbacks for composable workflows
3. Development velocity: Decouple frontend work from backend availability

INTERVIEW INSIGHT:
"delay() transforms setTimeout from a callback API into a composable async primitive. 
It's the building block for retries, debouncing, and testing loading states – 
turning time itself into a testable dependency." ⏱️
═══════════════════════════════════════════════════════════════ */
