// @ts-nocheck

/**
 * Infinite sequence generator using BigInt to prevent precision loss
 * after the 78th iteration (Number.MAX_SAFE_INTEGER).
 */
export function* fibonacci() {
  let a = 0n;
  let b = 1n;
  while (true) {
    yield a;
    [a, b] = [b, a + b]; // O(1) space complexity swap
  }
}

/**
 * Async Generator for seamless pagination.
 * WHY: Abstracts the complex 'fetch-check-loop' logic away from the UI.
 * TRADE-OFF: Uses 'async function*' to allow 'for await...of' syntax on the consumer side,
 * providing a cleaner DX (Developer Experience) than standard generators.
 */
export async function* paginate(fetchPage, startPage = 1) {
  let page = startPage;

  while (true) {
    // Encapsulates the request logic; 'await' works natively inside async generators
    const { items, hasNext } = await fetchPage(page);

    yield items; // Yield only the data the UI cares about

    if (!hasNext) break;
    page++;
  }
}

/* 
  INTERVIEW NOTE: 
  The 'paginate' function demonstrates 'Lazy Loading'. 
  We only fetch the next page when the consumer requests it from the iterator.
*/
