/**
 * Order processing module with comprehensive type safety and validation
 * TypeScript version - demonstrates static type checking benefits
 */

// ======================
// TYPE DEFINITIONS
// ======================

export type OrderStatus = "completed" | "pending" | "cancelled";

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
// MAIN PROCESSING FUNCTION
// ======================

/**
 * Processes orders with comprehensive validation and analytics
 * 
 * @param orders - Input to be validated (must be array)
 * @returns Complete order processing results with strict typing
 * @throws {TypeError} If input is not an array
 */
export function processOrders(orders: unknown): ProcessedOrderResult {
  if (!Array.isArray(orders)) {
    throw new TypeError("orders parameter must be an array");
  }

  const TAX_RATE = 0.1;
  const MIN_ORDER_THRESHOLD = 10;
  const LARGE_ORDER_THRESHOLD = 100;

  const processedOrders = orders
    .filter((order): order is NonNullable<unknown> => order != null)
    .filter((order): order is Record<string, unknown> => 
      order &&
      typeof order === 'object' &&
      'id' in order && order.id != null &&
      'status' in order && order.status != null &&
      'total' in order && order.total != null &&
      'customerId' in order && order.customerId != null
    )
    .map((order): ProcessedOrder | null => {
      if (typeof order.status !== 'string' || !['completed', 'pending', 'cancelled'].includes(order.status)) {
        return null;
      }
      
      const totalNum = Number(order.total);
      if (!Number.isFinite(totalNum) || totalNum <= 0) {
        return null;
      }
      
      if (typeof order.customerId !== 'string') {
        return null;
      }
      
      if (typeof order.id !== 'string' && typeof order.id !== 'number') {
        return null;
      }
      
      if (order.status !== 'completed') {
        return null;
      }
      
      const totalWithTax = totalNum * (1 + TAX_RATE);
      
      if (totalWithTax < MIN_ORDER_THRESHOLD) {
        return null;
      }
      
      return {
        id: order.id,
        status: order.status as OrderStatus,
        total: totalNum,
        customerId: order.customerId,
        totalWithTax,
        taxAmount: totalNum * TAX_RATE,
        isLargeOrder: totalWithTax > LARGE_ORDER_THRESHOLD,
      };
    })
    .filter((order): order is ProcessedOrder => order !== null)
    .reduce<ProcessedOrder[]>((unique, order) => {
      if (!unique.some(o => o.id === order.id)) {
        unique.push(order);
      }
      return unique;
    }, [])
    .toSorted?.((a, b) => b.totalWithTax - a.totalWithTax) ?? 
    [...processedOrders].sort((a, b) => b.totalWithTax - a.totalWithTax);

  const totalRevenue = processedOrders.reduce((sum, order) => sum + order.totalWithTax, 0);
  
  const largestOrder = processedOrders.length > 0 ? processedOrders[0] : null;
  const smallestOrder = processedOrders.length > 0 ? processedOrders[processedOrders.length - 1] : null;
  
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

  const averageOrderValue = processedOrders.length > 0
    ? totalRevenue / processedOrders.length
    : 0;
  
  const firstLargeOrder = processedOrders.find(o => o.isLargeOrder) ?? null;
  const hasLargeOrders = processedOrders.some(o => o.isLargeOrder);
  const allOrdersHaveCustomer = processedOrders.every(o => !!o.customerId);
  const orderTotals = processedOrders.map(o => o.totalWithTax);
  const totalTaxCollected = processedOrders.reduce((sum, order) => sum + order.taxAmount, 0);

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
      large: orderCountByCategory.large > 0 ? orderCountByCategory.large : undefined,
      regular: orderCountByCategory.regular > 0 ? orderCountByCategory.regular : undefined,
    },
    orderTotals,
    customerIds: Array.from(customerIds),
  };
}

// ======================
// UTILITY FUNCTIONS
// ======================

export function validateAndProcessOrders(orders: unknown): {
  success: boolean;
   ProcessedOrderResult | null;
  error: string | null;
} {
  try {
    return {
      success: true,
       processOrders(orders),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
       null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export function orderAnalysisExample(orders: unknown): ProcessedOrderResult & {
  customerOrders: Record<string, ProcessedOrder[]>;
  topCustomerId: string | null;
} {
  const baseResult = processOrders(orders);
  
  const customerOrders = baseResult.processedOrders.reduce<Record<string, ProcessedOrder[]>>(
    (acc, order) => {
      if (!acc[order.customerId]) {
        acc[order.customerId] = [];
      }
      acc[order.customerId].push(order);
      return acc;
    },
    {}
  );
  
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