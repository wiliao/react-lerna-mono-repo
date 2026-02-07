export const processOrders = (orders) => {
  return (
    orders
      // Filter completed orders
      .filter((order) => order.status === "completed")

      // Add tax calculation
      .map((order) => ({
        ...order,
        totalWithTax: order.total * 1.1,
      }))

      // Sort by total (descending)
      .sort((a, b) => b.totalWithTax - a.totalWithTax)

      // Calculate grand total
      .reduce((sum, order) => sum + order.totalWithTax, 0)
  );
};
