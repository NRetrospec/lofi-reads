import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Book } from "@/types/book";
import { WishlistItem, getWishlist, addToWishlist, removeFromWishlist, clearWishlist } from "@/services/wishlistService";

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (book: Book) => Promise<void>;
  removeFromWishlist: (bookId: string) => Promise<void>;
  isInWishlist: (bookId: string) => boolean;
  toggleWishlist: (book: Book) => Promise<void>;
  clearWishlist: () => Promise<void>;
  totalItems: number;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("guest"); // Will be replaced with actual user ID from auth

  // Load wishlist on mount
  useEffect(() => {
    loadWishlist();
  }, [userId]);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const wishlist = await getWishlist(userId);
      setItems(wishlist);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = useCallback(
    async (book: Book) => {
      try {
        const updatedWishlist = await addToWishlist(userId, book);
        setItems(updatedWishlist);
      } catch (error) {
        console.error("Failed to add to wishlist:", error);
      }
    },
    [userId]
  );

  const handleRemoveFromWishlist = useCallback(
    async (bookId: string) => {
      try {
        const updatedWishlist = await removeFromWishlist(userId, bookId);
        setItems(updatedWishlist);
      } catch (error) {
        console.error("Failed to remove from wishlist:", error);
      }
    },
    [userId]
  );

  const isInWishlistCheck = useCallback(
    (bookId: string) => {
      return items.some((item) => item.book.id === bookId);
    },
    [items]
  );

  const handleToggleWishlist = useCallback(
    async (book: Book) => {
      if (isInWishlistCheck(book.id)) {
        await handleRemoveFromWishlist(book.id);
      } else {
        await handleAddToWishlist(book);
      }
    },
    [isInWishlistCheck, handleRemoveFromWishlist, handleAddToWishlist]
  );

  const handleClearWishlist = useCallback(async () => {
    try {
      await clearWishlist(userId);
      setItems([]);
    } catch (error) {
      console.error("Failed to clear wishlist:", error);
    }
  }, [userId]);

  const totalItems = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist: handleAddToWishlist,
        removeFromWishlist: handleRemoveFromWishlist,
        isInWishlist: isInWishlistCheck,
        toggleWishlist: handleToggleWishlist,
        clearWishlist: handleClearWishlist,
        totalItems,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
