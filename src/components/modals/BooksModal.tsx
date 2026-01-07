import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookCard } from "@/components/BookCard";
import { BookOpen, ShoppingBag, Search, SlidersHorizontal, X, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import { Book } from "@/types/book";
import { CartDrawer } from "./CartDrawer";
import { WishlistModal } from "./WishlistModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { getBooks, getGenres, getPriceRange, getYearRange, type SortOption } from "@/services/bookService";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSearchParams } from "react-router-dom";

interface BooksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BooksModal({ open, onOpenChange }: BooksModalProps) {
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get filter options
  const genres = useMemo(() => getGenres(), []);
  const initialPriceRange = useMemo(() => getPriceRange(), []);
  const initialYearRange = useMemo(() => getYearRange(), []);

  // Initialize state from URL params or defaults
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => {
    const genresParam = searchParams.get("genres");
    return genresParam ? genresParam.split(",") : [];
  });
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    return [
      minPrice ? Number(minPrice) : initialPriceRange.min,
      maxPrice ? Number(maxPrice) : initialPriceRange.max,
    ];
  });
  const [yearRange, setYearRange] = useState<[number, number]>(() => {
    const minYear = searchParams.get("minYear");
    const maxYear = searchParams.get("maxYear");
    return [
      minYear ? Number(minYear) : initialYearRange.min,
      maxYear ? Number(maxYear) : initialYearRange.max,
    ];
  });
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "title-asc"
  );
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("search", searchQuery);
    if (selectedGenres.length > 0) params.set("genres", selectedGenres.join(","));
    if (priceRange[0] !== initialPriceRange.min) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] !== initialPriceRange.max) params.set("maxPrice", priceRange[1].toString());
    if (yearRange[0] !== initialYearRange.min) params.set("minYear", yearRange[0].toString());
    if (yearRange[1] !== initialYearRange.max) params.set("maxYear", yearRange[1].toString());
    if (sortBy !== "title-asc") params.set("sort", sortBy);

    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedGenres, priceRange, yearRange, sortBy, initialPriceRange, initialYearRange, setSearchParams]);

  // Fetch filtered books
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const books = await getBooks(
          {
            searchQuery: searchQuery || undefined,
            genres: selectedGenres.length > 0 ? selectedGenres : undefined,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            minYear: yearRange[0],
            maxYear: yearRange[1],
          },
          sortBy
        );
        setFilteredBooks(books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery, selectedGenres, priceRange, yearRange, sortBy]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setPriceRange([initialPriceRange.min, initialPriceRange.max]);
    setYearRange([initialYearRange.min, initialYearRange.max]);
    setSortBy("title-asc");
  };

  const activeFiltersCount =
    selectedGenres.length +
    (searchQuery ? 1 : 0) +
    (priceRange[0] !== initialPriceRange.min || priceRange[1] !== initialPriceRange.max ? 1 : 0) +
    (yearRange[0] !== initialYearRange.min || yearRange[1] !== initialYearRange.max ? 1 : 0);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl w-[95vw] h-[90vh] sm:max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 text-accent">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-sans text-xs sm:text-sm uppercase tracking-widest">Collection</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                  onClick={() => setWishlistOpen(true)}
                >
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Wishlist</span>
                  <span className="sm:hidden">({wishlistCount})</span>
                  <span className="hidden sm:inline">({wishlistCount})</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Cart</span>
                  <span className="sm:hidden">({totalItems})</span>
                  <span className="hidden sm:inline">({totalItems})</span>
                </Button>
              </div>
            </div>
            <DialogTitle className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
              Our Books
            </DialogTitle>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Explore our curated collection of stories that transport you to other worlds.
            </p>

            {/* Search and Filter Controls */}
            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-sm sm:text-base h-10 sm:h-11"
                />
              </div>

              {/* Sort and Filters Row */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-full sm:w-[180px] h-9 sm:h-10 text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                    <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                    <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    <SelectItem value="author-asc">Author (A-Z)</SelectItem>
                    <SelectItem value="year-desc">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="gap-2 flex-1 sm:flex-none h-9 sm:h-10 text-sm"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters</span>
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>

                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 sm:h-10 text-sm">
                      Clear all
                    </Button>
                  )}
                </div>

                <span className="text-xs sm:text-sm text-muted-foreground sm:ml-auto order-first sm:order-last">
                  {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
                </span>
              </div>

              {/* Collapsible Filters */}
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CollapsibleContent className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                  {/* Genre Filter */}
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm font-medium">Genres</Label>
                    <div className="flex flex-wrap gap-2">
                      {genres.map((genre) => (
                        <Badge
                          key={genre}
                          variant={selectedGenres.includes(genre) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-accent text-xs sm:text-sm py-1 px-2 sm:py-1.5 sm:px-3"
                          onClick={() => handleGenreToggle(genre)}
                        >
                          {genre}
                          {selectedGenres.includes(genre) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs sm:text-sm font-medium">Price Range</Label>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      min={initialPriceRange.min}
                      max={initialPriceRange.max}
                      step={1}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="w-full"
                    />
                  </div>

                  {/* Year Range Filter */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs sm:text-sm font-medium">Publication Year</Label>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {yearRange[0]} - {yearRange[1]}
                      </span>
                    </div>
                    <Slider
                      min={initialYearRange.min}
                      max={initialYearRange.max}
                      step={1}
                      value={yearRange}
                      onValueChange={(value) => setYearRange(value as [number, number])}
                      className="w-full"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </DialogHeader>

          {/* Scrollable Books Grid */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground text-sm sm:text-base">Loading books...</div>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
                <h3 className="text-base sm:text-lg font-medium mb-2">No books found</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button variant="outline" onClick={clearFilters} size="sm">
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredBooks.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Wishlist Modal */}
      <WishlistModal open={wishlistOpen} onOpenChange={setWishlistOpen} />

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
