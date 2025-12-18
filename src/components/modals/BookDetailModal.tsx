import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Star, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "@/hooks/use-toast";

interface BookDetailModalProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookDetailModal({ book, open, onOpenChange }: BookDetailModalProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!book) return null;

  const inWishlist = isInWishlist(book.id);

  const handleAddToCart = () => {
    addToCart(book);
    toast({
      title: "Added to cart",
      description: `"${book.title}" has been added to your cart.`,
    });
  };

  const handleWishlistToggle = async () => {
    await toggleWishlist(book);
    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: inWishlist
        ? `"${book.title}" has been removed from your wishlist.`
        : `"${book.title}" has been added to your wishlist.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Book Cover */}
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book Details */}
            <div className="flex flex-col">
              <p className="text-sm font-sans uppercase tracking-widest text-accent mb-2">
                {book.genre}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                {book.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < 4 ? "fill-soft-orange text-soft-orange" : "text-muted"}`}
                  />
                ))}
                <span className="ml-2 text-muted-foreground text-sm">(4.0)</span>
              </div>

              {/* Price */}
              <p className="font-sans text-2xl font-semibold text-primary mb-6">
                ${book.price.toFixed(2)}
              </p>

              {/* Description */}
              <p className="text-foreground/80 leading-relaxed mb-6 text-sm">
                {book.description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-y border-border">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Year</p>
                  <p className="font-medium text-sm">{book.year}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Pages</p>
                  <p className="font-medium text-sm">{book.pages}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">ISBN</p>
                  <p className="font-medium text-xs">{book.isbn}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <Button
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className={inWishlist ? "text-red-500 border-red-500 hover:bg-red-50" : ""}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? "fill-red-500" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
