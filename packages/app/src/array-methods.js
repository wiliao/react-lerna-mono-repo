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
  // REMOVED DEFAULT PARAMETER (fixes undefined handling)
  // 1. Input validation with explicit error (NOW CATCHES undefined)
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

  // REMOVED EARLY RETURN BLOCK - critical fix for consistent structure
  // (Empty arrays now flow through full pipeline to generate complete response object)

  // 3. Data normalization and validation pipeline
  const processedOrders = orders
    .filter((order) => order != null)
    .filter((order) =>
      ["id", "status", "total", "customerId"].every(
        (prop) => prop in order && order[prop] != null,
      ),
    )
    .map((order) => ({
      ...order,
      total: Number(order.total),
      isValid:
        Number.isFinite(Number(order.total)) &&
        order.status === STATUSES.COMPLETED,
    }))
    .filter(({ isValid, total }) => isValid && total > 0)
    .map((order) => {
      const totalWithTax = order.total * (1 + TAX_RATE);
      const taxAmount = order.total * TAX_RATE;
      const isLargeOrder = totalWithTax > 100;

      return {
        ...order,
        totalWithTax,
        taxAmount,
        isLargeOrder,
        isValid: undefined,
      };
    })
    .flatMap((order) =>
      order.totalWithTax >= MIN_ORDER_THRESHOLD ? [order] : [],
    )
    .reduce((uniqueOrders, order) => {
      if (!uniqueOrders.some((existing) => existing.id === order.id)) {
        uniqueOrders.push(order);
      }
      return uniqueOrders;
    }, [])
    .toSorted((a, b) => b.totalWithTax - a.totalWithTax); // ES2023+ non-mutating sort

  // 4. Calculate statistics using reduce (SAFE FOR EMPTY ARRAYS)
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
      largestOrder: null, // Critical: initialized to null for empty arrays
      smallestOrder: null,
      customerIds: new Set(),
      orderCountByCategory: {},
    },
  );

  // 5. Calculate additional metrics (HANDLES EMPTY ARRAYS)
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

  // 6. Calculate total tax collected (SAFE FOR EMPTY ARRAYS)
  let totalTaxCollected = 0;
  for (const order of processedOrders) {
    totalTaxCollected += order.taxAmount;
    if (totalTaxCollected > 10000) break;
  }

  // 7. RETURN CONSISTENT STRUCTURE FOR ALL CASES (fixes missing properties)
  return {
    // Core metrics required by tests
    totalRevenue: Number(statistics.totalRevenue.toFixed(2)),
    averageOrderValue: Number(averageOrderValue.toFixed(2)),
    orderCount: processedOrders.length, // CRITICAL: Always present (was missing in early return)

    // Processed data
    processedOrders,

    // Order analysis
    largestOrder: statistics.largestOrder, // null for empty arrays
    smallestOrder: statistics.smallestOrder,
    firstLargeOrder,

    // Boolean flags required by tests
    hasLargeOrders, // false for empty arrays
    allOrdersHaveCustomer,
    isEmpty: processedOrders.length === 0,

    // Additional metrics
    totalTaxCollected: Number(totalTaxCollected.toFixed(2)),
    uniqueCustomers: statistics.customerIds.size,
    orderCountByCategory: statistics.orderCountByCategory,
    orderTotals,
    customerIds: Array.from(statistics.customerIds),
  };
};

// Utility functions remain unchanged (no fixes needed)
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
