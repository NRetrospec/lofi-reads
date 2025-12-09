import { useParams, useNavigate } from "react-router-dom";
import { books } from "@/data/books";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Heart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Book not found</h1>
          <Button onClick={() => navigate("/books")}>Back to Books</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book);
    toast({
      title: "Added to cart",
      description: `"${book.title}" has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/books")}
          className="mb-8 gap-2 animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Book Cover */}
          <div className="animate-slide-up" style={{ opacity: 0 }}>
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="flex flex-col animate-slide-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <p className="text-sm font-sans uppercase tracking-widest text-accent mb-3">
              {book.genre}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">by {book.author}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < 4 ? "fill-soft-orange text-soft-orange" : "text-muted"}`}
                />
              ))}
              <span className="ml-2 text-muted-foreground text-sm">(4.0)</span>
            </div>

            {/* Price */}
            <p className="font-sans text-3xl font-semibold text-primary mb-8">
              ${book.price.toFixed(2)}
            </p>

            {/* Description */}
            <p className="text-foreground/80 leading-relaxed mb-8">
              {book.description}
            </p>

            {/* Meta Info */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-border">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Year</p>
                <p className="font-medium">{book.year}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Pages</p>
                <p className="font-medium">{book.pages}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">ISBN</p>
                <p className="font-medium text-sm">{book.isbn}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-auto">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
