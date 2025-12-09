import { CartItem as CartItemType } from "@/types/book";
import { Button } from "./ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { book, quantity } = item;

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl shadow-soft">
      {/* Book Cover */}
      <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Book Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-lg text-foreground mb-1 truncate">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
        
        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(book.id, quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(book.id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <p className="font-sans text-lg font-medium text-primary">
            ${(book.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 text-muted-foreground hover:text-destructive"
        onClick={() => removeFromCart(book.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
