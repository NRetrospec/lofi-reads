import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { books } from "@/data/books";
import { BookCard } from "@/components/BookCard";
import { BookOpen, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BookDetailModal } from "./BookDetailModal";
import { Book } from "@/types/book";
import { CartDrawer } from "./CartDrawer";

interface BooksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BooksModal({ open, onOpenChange }: BooksModalProps) {
  const { totalItems } = useCart();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 text-accent">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-sans text-sm uppercase tracking-widest">Collection</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag className="h-4 w-4" />
                Cart ({totalItems})
              </Button>
            </div>
            <DialogTitle className="font-serif text-4xl md:text-5xl text-foreground">
              Our Books
            </DialogTitle>
            <p className="text-muted-foreground text-base mt-2">
              Explore our curated collection of stories that transport you to other worlds.
            </p>
          </DialogHeader>

          {/* Scrollable Books Grid */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book, index) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="cursor-pointer"
                >
                  <BookCard book={book} index={index} />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        open={!!selectedBook}
        onOpenChange={(open) => !open && setSelectedBook(null)}
      />

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
