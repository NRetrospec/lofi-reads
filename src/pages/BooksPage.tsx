import { books } from "@/data/books";
import { BookCard } from "@/components/BookCard";
import { BookOpen } from "lucide-react";

const BooksPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 text-accent mb-4">
            <BookOpen className="h-5 w-5" />
            <span className="font-sans text-sm uppercase tracking-widest">Collection</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
            Our Books
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Explore our curated collection of stories that transport you to other worlds, 
            one page at a time.
          </p>
        </header>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
