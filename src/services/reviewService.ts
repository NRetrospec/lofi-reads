/**
 * Review service layer
 * Manages book reviews and ratings
 */

import { getStorageItem, setStorageItem, STORAGE_KEYS, simulateApiDelay } from "./localStorage";

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  helpful: number; // Number of users who found this helpful
}

export interface BookRating {
  bookId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

/**
 * Create a new review
 */
export async function createReview(
  bookId: string,
  userId: string,
  userName: string,
  rating: number,
  title: string,
  content: string
): Promise<Review> {
  await simulateApiDelay(300);

  const review: Review = {
    id: generateReviewId(),
    bookId,
    userId,
    userName,
    rating: Math.max(1, Math.min(5, rating)), // Clamp between 1-5
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    helpful: 0,
  };

  const reviews = getStorageItem<Review[]>(STORAGE_KEYS.REVIEWS, []);
  reviews.push(review);
  setStorageItem(STORAGE_KEYS.REVIEWS, reviews);

  return review;
}

/**
 * Get all reviews for a book
 */
export async function getBookReviews(bookId: string): Promise<Review[]> {
  await simulateApiDelay(200);
  const reviews = getStorageItem<Review[]>(STORAGE_KEYS.REVIEWS, []);
  return reviews
    .filter((review) => review.bookId === bookId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Get review by ID
 */
export async function getReviewById(reviewId: string): Promise<Review | null> {
  await simulateApiDelay(100);
  const reviews = getStorageItem<Review[]>(STORAGE_KEYS.REVIEWS, []);
  return reviews.find((review) => review.id === reviewId) || null;
}

/**
 * Get user's review for a book (to check if already reviewed)
 */
export async function getUserReviewForBook(
  userId: string,
  bookId: string
): Promise<Review | null> {
  await simulateApiDelay(100);
  const reviews = getStorageItem<Review[]>(STORAGE_KEYS.REVIEWS, []);
  return (
    reviews.find((review) => review.userId === userId && review.bookId === bookId) || null
  );
}

/**
 * Update a review
 */
export async function updateReview(
  reviewId: string,
  updates: Partial<Pick<Review, "rating" | "title" | "content">>
): Promise<Review | null> {
  await simulateApiDelay(200);

  const reviews = getStorageItem<Review[]>(STORAGE_KEYS.REVIEWS, []);
  const reviewIndex = reviews.findIndex((review) => review.id === reviewId);

  if (reviewIndex === -1) return null;

  reviews[reviewIndex] = {
    ...reviews[reviewIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  setStorageItem(STORAGE_KEYS.REVIEWS, reviews);
  return reviews[reviewIndex];
}

/**
 * Delete a review
 */
export async function deleteReview(reviewId: string): Promise<boolean> {
  await simulateApiDelay(200);

  const reviews = getStorageItem<Review[]>(STORAGE_KEYS.REVIEWS, []);
  const filteredReviews = reviews.filter((review) => review.id !== reviewId);

  if (filteredReviews.length === reviews.length) return false;

  setStorageItem(STORAGE_KEYS.REVIEWS, filteredReviews);
  return true;
}

/**
 * Mark review as helpful
 */
export async function markReviewHelpful(reviewId: string): Promise<Review | null> {
  await simulateApiDelay(100);

  const reviews = getStorageItem<Review[]>(STORAGE_KEYS.REVIEWS, []);
  const reviewIndex = reviews.findIndex((review) => review.id === reviewId);

  if (reviewIndex === -1) return null;

  reviews[reviewIndex].helpful += 1;
  setStorageItem(STORAGE_KEYS.REVIEWS, reviews);

  return reviews[reviewIndex];
}

/**
 * Get book rating statistics
 */
export async function getBookRating(bookId: string): Promise<BookRating> {
  await simulateApiDelay(150);

  const reviews = await getBookReviews(bookId);

  const ratingDistribution = {
    1: reviews.filter((r) => r.rating === 1).length,
    2: reviews.filter((r) => r.rating === 2).length,
    3: reviews.filter((r) => r.rating === 3).length,
    4: reviews.filter((r) => r.rating === 4).length,
    5: reviews.filter((r) => r.rating === 5).length,
  };

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

  return {
    bookId,
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    totalReviews,
    ratingDistribution,
  };
}

/**
 * Get all reviews by a user
 */
export async function getUserReviews(userId: string): Promise<Review[]> {
  await simulateApiDelay(200);
  const reviews = getStorageItem<Review[]>(STORAGE_KEYS.REVIEWS, []);
  return reviews
    .filter((review) => review.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Generate review ID
 */
function generateReviewId(): string {
  return `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
