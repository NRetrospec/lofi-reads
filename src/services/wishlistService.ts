/**
 * Wishlist service layer
 * Manages user wishlists with localStorage persistence
 */

import { Book } from "@/types/book";
import { getStorageItem, setStorageItem, STORAGE_KEYS, simulateApiDelay } from "./localStorage";

export interface WishlistItem {
  book: Book;
  addedAt: string;
}

interface WishlistData {
  [userId: string]: WishlistItem[];
}

/**
 * Get wishlist for a user
 */
export async function getWishlist(userId: string): Promise<WishlistItem[]> {
  await simulateApiDelay(150);
  const wishlistData = getStorageItem<WishlistData>(STORAGE_KEYS.WISHLIST, {});
  return wishlistData[userId] || [];
}

/**
 * Add book to wishlist
 */
export async function addToWishlist(userId: string, book: Book): Promise<WishlistItem[]> {
  await simulateApiDelay(200);

  const wishlistData = getStorageItem<WishlistData>(STORAGE_KEYS.WISHLIST, {});
  const userWishlist = wishlistData[userId] || [];

  // Check if already in wishlist
  if (userWishlist.some((item) => item.book.id === book.id)) {
    return userWishlist;
  }

  const newItem: WishlistItem = {
    book,
    addedAt: new Date().toISOString(),
  };

  wishlistData[userId] = [...userWishlist, newItem];
  setStorageItem(STORAGE_KEYS.WISHLIST, wishlistData);

  return wishlistData[userId];
}

/**
 * Remove book from wishlist
 */
export async function removeFromWishlist(
  userId: string,
  bookId: string
): Promise<WishlistItem[]> {
  await simulateApiDelay(150);

  const wishlistData = getStorageItem<WishlistData>(STORAGE_KEYS.WISHLIST, {});
  const userWishlist = wishlistData[userId] || [];

  wishlistData[userId] = userWishlist.filter((item) => item.book.id !== bookId);
  setStorageItem(STORAGE_KEYS.WISHLIST, wishlistData);

  return wishlistData[userId];
}

/**
 * Check if book is in wishlist
 */
export async function isInWishlist(userId: string, bookId: string): Promise<boolean> {
  const wishlist = await getWishlist(userId);
  return wishlist.some((item) => item.book.id === bookId);
}

/**
 * Toggle book in wishlist
 */
export async function toggleWishlist(
  userId: string,
  book: Book
): Promise<{ inWishlist: boolean; wishlist: WishlistItem[] }> {
  const isIn = await isInWishlist(userId, book.id);

  if (isIn) {
    const wishlist = await removeFromWishlist(userId, book.id);
    return { inWishlist: false, wishlist };
  } else {
    const wishlist = await addToWishlist(userId, book);
    return { inWishlist: true, wishlist };
  }
}

/**
 * Clear entire wishlist
 */
export async function clearWishlist(userId: string): Promise<void> {
  await simulateApiDelay(150);

  const wishlistData = getStorageItem<WishlistData>(STORAGE_KEYS.WISHLIST, {});
  wishlistData[userId] = [];
  setStorageItem(STORAGE_KEYS.WISHLIST, wishlistData);
}

/**
 * Move all wishlist items to cart
 */
export async function moveWishlistToCart(userId: string): Promise<Book[]> {
  await simulateApiDelay(200);

  const wishlist = await getWishlist(userId);
  const books = wishlist.map((item) => item.book);

  // Clear wishlist after getting books
  await clearWishlist(userId);

  return books;
}
