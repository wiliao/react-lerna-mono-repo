/**
 * Order processing module with comprehensive type safety and validation
 * Demonstrates TypeScript best practices:
 * - Type guards and type predicates
 * - Immutable data patterns
 * - Set-based validation for performance
 * - Constants at module level
 * - Comprehensive error handling
 * - ES2023+ array methods
 */

// ======================
// CONSTANTS (Module-level for reusability)
// ======================

/** Tax rate applied to all orders (10%) */
const TAX_RATE = 0.1;

/** Minimum order total after tax to be processed ($10) */
const MIN_ORDER_THRESHOLD = 10;

/** Threshold for classifying orders as "large" ($100 after tax) */
const LARGE_ORDER_THRESHOLD = 100;

/** Valid order status values */
const VALID_STATUSES = new Set<OrderStatus>([
  "completed",
  "pending",
  "cancelled",
]);

/** Required order properties for validation */
const REQUIRED_ORDER_PROPERTIES = [
  "id",
  "status",
  "total",
  "customerId",
] as const;

// ======================
// TYPE DEFINITIONS
// ======================

/** Valid order status values */
export type OrderStatus = "completed" | "pending" | "cancelled";

/** Raw input order (may contain invalid/missing data) */
interface RawOrder {
  id?: unknown;
  status?: unknown;
  total?: unknown;
  customerId?: unknown;
  [key: string]: unknown;
}

/** Fully processed order with calculated fields */
export interface ProcessedOrder {
  id: string | number;
  status: OrderStatus;
  total: number;
  customerId: string;
  totalWithTax: number;
  taxAmount: number;
  isLargeOrder: boolean;
  [key: string]: unknown;
}

/** Final result structure returned by processOrders */
export interface ProcessedOrderResult {
  // Core metrics (required by tests)
  totalRevenue: number;
  averageOrderValue: number;
  orderCount: number;

  // Processed data
  processedOrders: ProcessedOrder[];

  // Order analysis
  largestOrder: ProcessedOrder | null;
  smallestOrder: ProcessedOrder | null;
  firstLargeOrder: ProcessedOrder | null;

  // Boolean flags (required by tests)
  hasLargeOrders: boolean;
  allOrdersHaveCustomer: boolean;
  isEmpty: boolean;

  // Additional metrics
  totalTaxCollected: number;
  uniqueCustomers: number;
  orderCountByCategory: { large?: number; regular?: number };
  orderTotals: number[];
  customerIds: string[];
}

// ======================
// TYPE GUARDS FOR SAFE VALIDATION
// ======================

/**
 * Type guard to check if value is a valid raw order object
 * Validates presence of required properties and non-null values
 */
function isValidRawOrder(order: unknown): order is RawOrder {
  return (
    order != null &&
    typeof order === "object" &&
    REQUIRED_ORDER_PROPERTIES.every(
      (prop) => prop in order && (order as RawOrder)[prop] != null,
    )
  );
}

/**
 * Type guard to validate order status is one of the accepted values
 */
function isValidStatus(status: unknown): status is OrderStatus {
  return (
    typeof status === "string" && VALID_STATUSES.has(status as OrderStatus)
  );
}

/**
 * Type guard to validate customer ID is a non-empty string
 */
function isValidCustomerId(customerId: unknown): customerId is string {
  return typeof customerId === "string" && customerId.trim().length > 0;
}

/**
 * Type guard to validate order ID is string or number
 */
function isValidOrderId(id: unknown): id is string | number {
  return typeof id === "string" || typeof id === "number";
}

/**
 * Type guard to validate total is a finite positive number
 */
function isValidTotal(total: unknown): total is number {
  const num = Number(total);
  return Number.isFinite(num) && num > 0;
}

// ======================
// MAIN PROCESSING FUNCTION
// ======================

/**
 * Processes orders with comprehensive validation and analytics
 *
 * @param orders - Input to be validated (must be array)
 * @returns Complete order processing results with strict typing
 * @throws {TypeError} If input is not an array
 *
 * @example
 * ```typescript
 * const result = processOrders([
 *   { id: 1, status: "completed", total: 100, customerId: "cust1" }
 * ]);
 * console.log(result.totalRevenue); // 110.00
 * ```
 */
export function processOrders(orders: unknown): ProcessedOrderResult {
  // 1. STRICT INPUT VALIDATION
  if (!Array.isArray(orders)) {
    throw new TypeError("orders parameter must be an array");
  }

  // 2. FILTER AND VALIDATE RAW ORDERS
  const validOrders = orders.filter(isValidRawOrder);

  // 3. CONVERT TO PROCESSED ORDERS WITH VALIDATION
  const processedCandidates: (ProcessedOrder | null)[] = validOrders.map(
    (order) => {
      // Validate and narrow status
      if (!isValidStatus(order.status)) {
        return null;
      }

      // Only process completed orders
      if (order.status !== "completed") {
        return null;
      }

      // Validate and convert total
      if (!isValidTotal(order.total)) {
        return null;
      }
      const totalNum = Number(order.total);

      // Validate customerId
      if (!isValidCustomerId(order.customerId)) {
        return null;
      }

      // Validate id
      if (!isValidOrderId(order.id)) {
        return null;
      }

      // Calculate derived properties
      const totalWithTax = totalNum * (1 + TAX_RATE);

      // Apply minimum threshold filter
      if (totalWithTax < MIN_ORDER_THRESHOLD) {
        return null;
      }

      return {
        id: order.id,
        status: order.status,
        total: totalNum,
        customerId: order.customerId,
        totalWithTax,
        taxAmount: totalNum * TAX_RATE,
        isLargeOrder: totalWithTax > LARGE_ORDER_THRESHOLD,
      };
    },
  );

  // 4. FILTER OUT NULL VALUES WITH TYPE PREDICATE
  const unsortedOrders = processedCandidates.filter(
    (order): order is ProcessedOrder => order !== null,
  );

  // 5. SORT WITHOUT CIRCULAR REFERENCE (ES2023+ with fallback)
  const processedOrders = unsortedOrders.toSorted
    ? unsortedOrders.toSorted((a, b) => b.totalWithTax - a.totalWithTax)
    : [...unsortedOrders].sort((a, b) => b.totalWithTax - a.totalWithTax);

  // 6. CALCULATE STATISTICS (safe for empty arrays)
  const totalRevenue = processedOrders.reduce(
    (sum, order) => sum + order.totalWithTax,
    0,
  );

  const largestOrder = processedOrders.length > 0 ? processedOrders[0] : null;
  const smallestOrder =
    processedOrders.length > 0
      ? processedOrders[processedOrders.length - 1]
      : null;

  const customerIds = new Set<string>();
  const orderCountByCategory = { large: 0, regular: 0 };

  for (const order of processedOrders) {
    customerIds.add(order.customerId);
    if (order.isLargeOrder) {
      orderCountByCategory.large++;
    } else {
      orderCountByCategory.regular++;
    }
  }

  // 7. DERIVED METRICS
  const averageOrderValue =
    processedOrders.length > 0 ? totalRevenue / processedOrders.length : 0;

  const firstLargeOrder = processedOrders.find((o) => o.isLargeOrder) ?? null;
  const hasLargeOrders = processedOrders.some((o) => o.isLargeOrder);
  const allOrdersHaveCustomer = processedOrders.every((o) => !!o.customerId);
  const orderTotals = processedOrders.map((o) => o.totalWithTax);
  const totalTaxCollected = processedOrders.reduce(
    (sum, order) => sum + order.taxAmount,
    0,
  );

  // 8. RETURN TYPE-SAFE RESULT
  return {
    totalRevenue: Number(totalRevenue.toFixed(2)),
    averageOrderValue: Number(averageOrderValue.toFixed(2)),
    orderCount: processedOrders.length,
    processedOrders,
    largestOrder,
    smallestOrder,
    firstLargeOrder,
    hasLargeOrders,
    allOrdersHaveCustomer,
    isEmpty: processedOrders.length === 0,
    totalTaxCollected: Number(totalTaxCollected.toFixed(2)),
    uniqueCustomers: customerIds.size,
    orderCountByCategory: {
      large:
        orderCountByCategory.large > 0 ? orderCountByCategory.large : undefined,
      regular:
        orderCountByCategory.regular > 0
          ? orderCountByCategory.regular
          : undefined,
    },
    orderTotals,
    customerIds: Array.from(customerIds),
  };
}

// ======================
// UTILITY FUNCTIONS
// ======================

/**
 * Safe wrapper that catches validation errors and returns structured result
 *
 * @param orders - Input orders to process
 * @returns Result object with success status and data/error
 *
 * @example
 * ```typescript
 * const result = validateAndProcessOrders(orders);
 * if (result.success) {
 *   console.log(result.data.totalRevenue);
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export function validateAndProcessOrders(orders: unknown): {
  success: boolean;
  data: ProcessedOrderResult | null;
  error: string | null;
} {
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
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Extended analysis with customer segmentation and top customer identification
 *
 * @param orders - Input orders to analyze
 * @returns Enhanced result with customer analytics
 *
 * @example
 * ```typescript
 * const result = orderAnalysisExample(orders);
 * console.log(result.topCustomerId); // "cust123"
 * console.log(result.customerOrders["cust123"]); // Array of orders
 * ```
 */
export function orderAnalysisExample(orders: unknown): ProcessedOrderResult & {
  customerOrders: Record<string, ProcessedOrder[]>;
  topCustomerId: string | null;
} {
  const baseResult = processOrders(orders);

  // Group orders by customer
  const customerOrders = baseResult.processedOrders.reduce<
    Record<string, ProcessedOrder[]>
  >((acc, order) => {
    if (!acc[order.customerId]) {
      acc[order.customerId] = [];
    }
    acc[order.customerId].push(order);
    return acc;
  }, {});

  // Find top customer by total spend
  const topCustomer = Object.entries(customerOrders)
    .map(([customerId, orders]) => ({
      customerId,
      totalSpent: orders.reduce((sum, o) => sum + o.totalWithTax, 0),
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent)[0];

  return {
    ...baseResult,
    customerOrders,
    topCustomerId: topCustomer?.customerId ?? null,
  };
}

// ======================
// EXPORTED TYPE GUARDS (for external validation)
// ======================

/**
 * Exported type guard for external use
 * Validates if a value is a valid order status
 */
export { isValidStatus };

/**
 * Exported type guard for external use
 * Validates if a value is a valid raw order object
 */
export { isValidRawOrder };
