export const processOrders = (orders = []) => {
  if (!Array.isArray(orders)) return 0;

  const TAX_RATE = 0.1;

  return (
    orders
      // Normalize + guard against bad data
      .filter(
        ({ status, total }) => status === "completed" && Number.isFinite(total),
      )

      // flatMap allows conditional mapping (skip or expand)
      .flatMap((order) => {
        const totalWithTax = order.total * (1 + TAX_RATE);

        // Example: drop orders below a threshold
        if (totalWithTax < 10) return [];

        return [
          {
            ...order,
            totalWithTax,
          },
        ];
      })

      // Non-mutating sort (ES2023+)
      .toSorted((a, b) => b.totalWithTax - a.totalWithTax)

      // ES6 non-mutating sort
      //.slice()
      //.sort((a, b) => b.totalWithTax - a.totalWithTax)

      // Recommended ES6 equivalent (most common)
      //[...array].sort((a, b) => b.totalWithTax - a.totalWithTax);
      // Note: 1. [...] creates a shallow copy
      //       2. sort() mutates the copy, not the original

      // Reduce with destructuring
      .reduce((sum, { totalWithTax }) => sum + totalWithTax, 0)
  );
};
