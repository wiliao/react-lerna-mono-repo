/**
 * Processes orders with comprehensive array operations and data validation
 * Demonstrates important JavaScript array concepts including:
 * - Type validation and error handling
 * - Functional programming with map/filter/reduce
 * - Array methods: flatMap, find, some, every
 * - Performance considerations (memory, time complexity)
 * - Immutability patterns
 * - ES2023+ array methods
 *
 * @param {Array<Object>} orders - Array of order objects
 * @returns {Object} Processed order summary with statistics
 * @throws {TypeError} If input is not an array
 */
export const processOrders = (orders) => {
  // 1. Input validation with explicit error
  if (!Array.isArray(orders)) {
    throw new TypeError("orders parameter must be an array");
  }

  // 2. Constants and configuration
  const TAX_RATE = 0.1;
  const MIN_ORDER_THRESHOLD = 10;
  const STATUSES = {
    COMPLETED: "completed",
    PENDING: "pending",
    CANCELLED: "cancelled",
  };

  // 3. Data normalization, validation, and deduplication pipeline
  const deduplicatedMap = orders
    .filter((order) => order != null)
    .filter((order) =>
      ["id", "status", "total", "customerId"].every(
        (prop) => prop in order && order[prop] != null,
      ),
    )
    // ✅ COMBINED VALIDATION + TAX CALCULATION (single efficient pass)
    .map((order) => {
      const total = Number(order.total);
      const totalWithTax = total * (1 + TAX_RATE);
      const taxAmount = total * TAX_RATE;
      const isLargeOrder = totalWithTax > 100;
      const isValidId = order.id != null && String(order.id).trim().length > 0;

      return {
        ...order,
        total,
        totalWithTax,
        taxAmount,
        isLargeOrder,
        isValid:
          isValidId &&
          Number.isFinite(total) &&
          total > 0 &&
          order.status === STATUSES.COMPLETED,
      };
    })
    .filter(({ isValid }) => isValid) // Remove invalid orders
    .flatMap((order) =>
      order.totalWithTax >= MIN_ORDER_THRESHOLD ? [order] : [],
    )
    // ✅ DEDUPLICATION: Keep only first occurrence of each ID
    .reduce((map, order) => {
      const normalizedId = String(order.id).trim();
      console.log(
        `🔍 Checking order ID: ${normalizedId}, map has it: ${map.has(normalizedId)}`,
      );
      if (!map.has(normalizedId)) {
        map.set(normalizedId, order);
        console.log(`✅ Added order ID: ${normalizedId}`);
      } else {
        console.log(`❌ Skipped duplicate order ID: ${normalizedId}`);
      }
      return map;
    }, new Map());

  // Convert Map to array
  const processedOrdersArray = Array.from(deduplicatedMap.values());

  // ✅ SAFE SORTING: Sort by totalWithTax descending
  const processedOrders = processedOrdersArray.toSorted
    ? processedOrdersArray.toSorted((a, b) => b.totalWithTax - a.totalWithTax)
    : [...processedOrdersArray].sort((a, b) => b.totalWithTax - a.totalWithTax);
  console.log("Deduplicated map size:", deduplicatedMap.size);
  console.log("Processed orders length:", processedOrders.length);
  console.log(
    "Order IDs:",
    processedOrders.map((o) => o.id),
  );

  // 4. Calculate statistics (SAFE FOR EMPTY ARRAYS)
  const statistics = processedOrders.reduce(
    (acc, order, index, array) => {
      acc.totalRevenue += order.totalWithTax;
      acc.largestOrder = index === 0 ? order : acc.largestOrder;
      acc.smallestOrder =
        index === array.length - 1 ? order : acc.smallestOrder;
      acc.customerIds.add(order.customerId);
      const category = order.isLargeOrder ? "large" : "regular";
      acc.orderCountByCategory[category] =
        (acc.orderCountByCategory[category] || 0) + 1;
      return acc;
    },
    {
      totalRevenue: 0,
      largestOrder: null,
      smallestOrder: null,
      customerIds: new Set(),
      orderCountByCategory: {},
    },
  );

  // 5. Calculate additional metrics
  const averageOrderValue =
    processedOrders.length > 0
      ? statistics.totalRevenue / processedOrders.length
      : 0;

  const firstLargeOrder = processedOrders.find((order) => order.isLargeOrder);
  const hasLargeOrders = processedOrders.some((order) => order.isLargeOrder);
  const allOrdersHaveCustomer = processedOrders.every(
    (order) => order.customerId,
  );
  const orderTotals = processedOrders.map((order) => order.totalWithTax);

  // 6. Calculate total tax collected
  let totalTaxCollected = 0;
  for (const order of processedOrders) {
    totalTaxCollected += order.taxAmount;
    if (totalTaxCollected > 10000) break;
  }

  // 7. RETURN CONSISTENT STRUCTURE
  return {
    totalRevenue: Number(statistics.totalRevenue.toFixed(2)),
    averageOrderValue: Number(averageOrderValue.toFixed(2)),
    orderCount: processedOrders.length,
    processedOrders,
    largestOrder: statistics.largestOrder,
    smallestOrder: statistics.smallestOrder,
    firstLargeOrder,
    hasLargeOrders,
    allOrdersHaveCustomer,
    isEmpty: processedOrders.length === 0,
    totalTaxCollected: Number(totalTaxCollected.toFixed(2)),
    uniqueCustomers: statistics.customerIds.size,
    orderCountByCategory: statistics.orderCountByCategory,
    orderTotals,
    customerIds: Array.from(statistics.customerIds),
  };
};

// Utility functions
export const validateAndProcessOrders = (orders) => {
  try {
    return {
      success: true,
      data: processOrders(orders),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const orderAnalysisExample = (orders) => {
  const result = processOrders(orders);
  const customerOrders = result.processedOrders.reduce((acc, order) => {
    if (!acc[order.customerId]) acc[order.customerId] = [];
    acc[order.customerId].push(order);
    return acc;
  }, {});

  const topCustomerId =
    Object.entries(customerOrders)
      .map(([customerId, orders]) => ({
        customerId,
        totalSpent: orders.reduce((sum, order) => sum + order.totalWithTax, 0),
      }))
      .sort((a, b) => b.totalSpent - a.totalSpent)[0]?.customerId ?? null;

  return {
    ...result,
    customerOrders,
    topCustomerId,
  };
};
