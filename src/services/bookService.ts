/**
 * Book service layer - API-ready architecture
 * Currently uses static data, easily swappable for real API calls
 */

import { Book } from "@/types/book";
import { books as staticBooks } from "@/data/books";
import { simulateApiDelay } from "./localStorage";

export interface BookFilters {
  genres?: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  searchQuery?: string;
  authors?: string[];
}

export type SortOption = "price-asc" | "price-desc" | "title-asc" | "title-desc" | "author-asc" | "rating-desc" | "year-desc";

/**
 * Get all books with optional filtering and sorting
 * Simulates API call with delay
 */
export async function getBooks(
  filters?: BookFilters,
  sortBy?: SortOption
): Promise<Book[]> {
  await simulateApiDelay(200);

  let results = [...staticBooks];

  // Apply filters
  if (filters) {
    if (filters.genres && filters.genres.length > 0) {
      results = results.filter((book) => filters.genres!.includes(book.genre));
    }

    if (filters.minPrice !== undefined) {
      results = results.filter((book) => book.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter((book) => book.price <= filters.maxPrice!);
    }

    if (filters.minYear !== undefined) {
      results = results.filter((book) => book.year >= filters.minYear!);
    }

    if (filters.maxYear !== undefined) {
      results = results.filter((book) => book.year <= filters.maxYear!);
    }

    if (filters.authors && filters.authors.length > 0) {
      results = results.filter((book) => filters.authors!.includes(book.author));
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query)
      );
    }
  }

  // Apply sorting
  if (sortBy) {
    results = sortBooks(results, sortBy);
  }

  return results;
}

/**
 * Get a single book by ID
 */
export async function getBookById(id: string): Promise<Book | null> {
  await simulateApiDelay(100);
  return staticBooks.find((book) => book.id === id) || null;
}

/**
 * Search books by query
 */
export async function searchBooks(query: string): Promise<Book[]> {
  return getBooks({ searchQuery: query });
}

/**
 * Get all unique genres from catalog
 */
export function getGenres(): string[] {
  const genres = new Set(staticBooks.map((book) => book.genre));
  return Array.from(genres).sort();
}

/**
 * Get all unique authors from catalog
 */
export function getAuthors(): string[] {
  const authors = new Set(staticBooks.map((book) => book.author));
  return Array.from(authors).sort();
}

/**
 * Get price range of all books
 */
export function getPriceRange(): { min: number; max: number } {
  const prices = staticBooks.map((book) => book.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Get year range of all books
 */
export function getYearRange(): { min: number; max: number } {
  const years = staticBooks.map((book) => book.year);
  return {
    min: Math.min(...years),
    max: Math.max(...years),
  };
}

/**
 * Get recommended books based on a book (by genre)
 */
export async function getRecommendedBooks(
  bookId: string,
  limit: number = 4
): Promise<Book[]> {
  const book = await getBookById(bookId);
  if (!book) return [];

  await simulateApiDelay(150);

  // Get books in same genre, excluding the current book
  const recommendations = staticBooks
    .filter((b) => b.genre === book.genre && b.id !== bookId)
    .slice(0, limit);

  // If not enough books in same genre, add random books
  if (recommendations.length < limit) {
    const remaining = staticBooks
      .filter((b) => b.id !== bookId && !recommendations.includes(b))
      .slice(0, limit - recommendations.length);
    recommendations.push(...remaining);
  }

  return recommendations;
}

/**
 * Sort books by given criteria
 */
function sortBooks(books: Book[], sortBy: SortOption): Book[] {
  const sorted = [...books];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "author-asc":
      return sorted.sort((a, b) => a.author.localeCompare(b.author));
    case "year-desc":
      return sorted.sort((a, b) => b.year - a.year);
    case "rating-desc":
      // TODO: Implement when rating system is added
      return sorted;
    default:
      return sorted;
  }
}
