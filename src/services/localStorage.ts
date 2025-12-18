/**
 * Core localStorage utilities for data persistence
 * Designed to be easily swappable with real API calls
 */

export const STORAGE_KEYS = {
  CART: "lofi-reads-cart",
  WISHLIST: "lofi-reads-wishlist",
  USER: "lofi-reads-user",
  USERS: "lofi-reads-users",
  ORDERS: "lofi-reads-orders",
  REVIEWS: "lofi-reads-reviews",
  PREFERENCES: "lofi-reads-preferences",
} as const;

/**
 * Generic localStorage get with error handling
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Failed to get ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Generic localStorage set with error handling
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to set ${key} in localStorage:`, error);
    return false;
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove ${key} from localStorage:`, error);
    return false;
  }
}

/**
 * Clear all app data from localStorage
 */
export function clearAllStorage(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    removeStorageItem(key);
  });
}

/**
 * Simulates API delay for realistic testing
 */
export async function simulateApiDelay(ms: number = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
