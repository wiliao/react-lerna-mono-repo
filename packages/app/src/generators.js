export function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Practical: Paginated API iterator
export function* paginate(fetchPage, startPage = 1) {
  let page = startPage;
  while (true) {
    const { items, hasNext } = yield fetchPage(page);
    if (!hasNext) return;
    page++;
  }
}
