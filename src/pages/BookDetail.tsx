import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { getBookById } from "@/services/bookService";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Heart, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="font-serif text-4xl text-foreground">Book Not Found</h1>
        <p className="text-muted-foreground">The book you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-b from-cream to-background">
      {/* Navigation Bar */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </Button>
          <h1 className="font-serif text-xl text-foreground/80">Nightingale Books</h1>
        </div>
      </nav>

      {/* Book Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Left: Book Cover */}
          <div className="md:col-span-2">
            <div className="sticky top-24">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-warm-brown/20">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Book Details */}
          <div className="md:col-span-3 space-y-8">
            {/* Genre Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-xs font-sans uppercase tracking-widest text-accent font-medium">
                {book.genre}
              </span>
            </div>

            {/* Title & Author */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground font-light">
                by <span className="text-foreground/80">{book.author}</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4
                        ? "fill-soft-orange text-soft-orange"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.0 out of 5</span>
            </div>

            {/* Price */}
            <div className="pt-4 border-t border-border/40">
              <p className="text-3xl font-serif text-primary font-medium">
                ${book.price.toFixed(2)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="group relative flex-1 px-8 py-4 rounded-lg bg-primary text-primary-foreground overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-sans font-medium tracking-wide">Add to Cart</span>
                </div>
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`group relative px-8 py-4 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] ${
                  inWishlist
                    ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
                    : "border-border bg-background hover:border-accent hover:bg-accent/5"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Heart
                    className={`h-5 w-5 transition-all ${
                      inWishlist ? "fill-red-500" : "group-hover:scale-110"
                    }`}
                  />
                  <span className="font-sans font-medium tracking-wide sm:inline hidden">
                    {inWishlist ? "Saved" : "Save"}
                  </span>
                </div>
              </button>
            </div>

            {/* Description */}
            <div className="pt-8 space-y-4">
              <h2 className="font-serif text-2xl text-foreground">About This Book</h2>
              <p className="text-foreground/70 leading-relaxed text-lg font-light">
                {book.description}
              </p>
            </div>

            {/* Book Details Grid */}
            <div className="pt-8 border-t border-border/40">
              <h3 className="font-serif text-xl text-foreground mb-6">Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Publication Year
                  </p>
                  <p className="font-sans text-lg text-foreground">{book.year}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Pages
                  </p>
                  <p className="font-sans text-lg text-foreground">{book.pages}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    ISBN
                  </p>
                  <p className="font-sans text-sm text-foreground">{book.isbn}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Genre
                  </p>
                  <p className="font-sans text-lg text-foreground">{book.genre}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Author
                  </p>
                  <p className="font-sans text-lg text-foreground">{book.author}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Format
                  </p>
                  <p className="font-sans text-lg text-foreground">Hardcover</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-8 space-y-4 pb-12">
              <div className="p-6 rounded-xl bg-accent/5 border border-accent/10">
                <h4 className="font-sans text-sm font-medium text-foreground mb-2">
                  Free Shipping
                </h4>
                <p className="text-sm text-muted-foreground">
                  Orders over $50 ship free. Expected delivery in 7-10 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
