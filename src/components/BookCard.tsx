import { Link } from "react-router-dom";
import { Book } from "@/types/book";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

interface BookCardProps {
  book: Book;
  index?: number;
}

export function BookCard({ book, index = 0 }: BookCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
    toast({
      title: "Added to cart",
      description: `"${book.title}" has been added to your cart.`,
    });
  };

  return (
    <Link
      to={`/books/${book.id}`}
      className="group block animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      <div className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-2">
        {/* Book Cover */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-3 py-2 rounded-lg bg-background/90 backdrop-blur-sm border border-border/50 hover:border-accent hover:bg-accent/5 shadow-lg text-foreground hover:text-accent flex items-center gap-1.5 text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {/* Book Info */}
        <div className="p-5">
          <p className="text-xs font-sans uppercase tracking-wider text-muted-foreground mb-2">
            {book.genre}
          </p>
          <h3 className="font-serif text-xl text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
          <p className="font-sans text-lg font-medium text-primary">
            ${book.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
