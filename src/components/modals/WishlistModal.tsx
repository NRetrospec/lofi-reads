import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface WishlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WishlistModal({ open, onOpenChange }: WishlistModalProps) {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (book: { id: string; title: string; [key: string]: any }) => {
    addToCart(book);
    await removeFromWishlist(book.id);
    toast({
      title: "Added to cart",
      description: `"${book.title}" has been moved to your cart.`,
    });
  };

  const handleRemove = async (bookId: string, title: string) => {
    await removeFromWishlist(bookId);
    toast({
      title: "Removed from wishlist",
      description: `"${title}" has been removed from your wishlist.`,
    });
  };

  const handleClearAll = async () => {
    await clearWishlist();
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  const handleAddAllToCart = async () => {
    if (items.length === 0) return;

    items.forEach((item) => {
      addToCart(item.book);
    });

    await clearWishlist();

    toast({
      title: "Added to cart",
      description: `${items.length} ${items.length === 1 ? "item" : "items"} moved to cart.`,
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <DialogTitle className="font-serif text-2xl">
                  My Wishlist
                </DialogTitle>
              </div>
              <span className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <DialogDescription className="text-muted-foreground text-sm mt-2">
              Books you've saved for later
            </DialogDescription>
          </DialogHeader>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-4">
                  Start adding books you love to your wishlist
                </p>
                <Button onClick={() => onOpenChange(false)}>
                  Browse Books
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.book.id}
                    className="flex gap-4 p-4 rounded-lg border border-border hover:bg-accent/5 transition-colors group"
                  >
                    {/* Book Cover */}
                    <div
                      className="relative w-20 h-28 rounded-md overflow-hidden flex-shrink-0 cursor-pointer"
                      onClick={() => navigate(`/books/${item.book.id}`)}
                    >
                      <img
                        src={item.book.cover}
                        alt={item.book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wider text-accent mb-1">
                        {item.book.genre}
                      </p>
                      <h4
                        className="font-serif text-lg font-medium cursor-pointer hover:text-accent transition-colors"
                        onClick={() => navigate(`/books/${item.book.id}`)}
                      >
                        {item.book.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        by {item.book.author}
                      </p>
                      <p className="font-sans text-lg font-semibold text-primary">
                        ${item.book.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Added {new Date(item.addedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 justify-center">
                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={() => handleAddToCart(item.book)}
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemove(item.book.id, item.book.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="px-6 py-4 border-t border-border flex-shrink-0 space-y-3">
              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleAddAllToCart}
              >
                <ShoppingBag className="h-5 w-5" />
                Add All to Cart ({items.length})
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                size="sm"
                onClick={handleClearAll}
              >
                Clear Wishlist
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
