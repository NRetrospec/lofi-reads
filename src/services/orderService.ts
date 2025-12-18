/**
 * Order service layer
 * Manages order creation, retrieval, and history
 */

import { CartItem } from "@/types/book";
import { getStorageItem, setStorageItem, STORAGE_KEYS, simulateApiDelay } from "./localStorage";
import { Address } from "./userService";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface PaymentMethod {
  type: "card" | "paypal" | "test";
  last4?: string;
  brand?: string;
}

export interface CreateOrderData {
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
}

/**
 * Create a new order
 */
export async function createOrder(data: CreateOrderData): Promise<Order> {
  await simulateApiDelay(500);

  const subtotal = data.items.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  // Simple shipping calculation (free over $50, otherwise $5.99)
  const shipping = subtotal >= 50 ? 0 : 5.99;

  // Simple tax calculation (8% for demo)
  const tax = (subtotal + shipping) * 0.08;

  const total = subtotal + shipping + tax;

  const order: Order = {
    id: generateOrderId(),
    userId: data.userId,
    items: data.items,
    subtotal,
    shipping,
    tax,
    total,
    shippingAddress: data.shippingAddress,
    billingAddress: data.billingAddress,
    paymentMethod: data.paymentMethod,
    status: "processing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedDelivery: getEstimatedDelivery(),
  };

  // Save order to localStorage
  const orders = getStorageItem<Order[]>(STORAGE_KEYS.ORDERS, []);
  orders.push(order);
  setStorageItem(STORAGE_KEYS.ORDERS, orders);

  return order;
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  await simulateApiDelay(200);
  const orders = getStorageItem<Order[]>(STORAGE_KEYS.ORDERS, []);
  return orders.find((order) => order.id === orderId) || null;
}

/**
 * Get all orders for a user
 */
export async function getUserOrders(userId: string): Promise<Order[]> {
  await simulateApiDelay(300);
  const orders = getStorageItem<Order[]>(STORAGE_KEYS.ORDERS, []);
  return orders
    .filter((order) => order.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  trackingNumber?: string
): Promise<Order | null> {
  await simulateApiDelay(200);

  const orders = getStorageItem<Order[]>(STORAGE_KEYS.ORDERS, []);
  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex === -1) return null;

  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date().toISOString();

  if (trackingNumber) {
    orders[orderIndex].trackingNumber = trackingNumber;
  }

  setStorageItem(STORAGE_KEYS.ORDERS, orders);
  return orders[orderIndex];
}

/**
 * Cancel order
 */
export async function cancelOrder(orderId: string): Promise<Order | null> {
  return updateOrderStatus(orderId, "cancelled");
}

/**
 * Get all orders (admin only)
 */
export async function getAllOrders(): Promise<Order[]> {
  await simulateApiDelay(300);
  const orders = getStorageItem<Order[]>(STORAGE_KEYS.ORDERS, []);
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Calculate estimated delivery date (7-10 business days from now)
 */
function getEstimatedDelivery(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7 + Math.floor(Math.random() * 4));
  return date.toISOString();
}

/**
 * Generate order ID
 */
function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}
