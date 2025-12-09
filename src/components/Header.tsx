import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingBag, Home } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Header() {
  const location = useLocation();
  const { totalItems } = useCart();
  const isHome = location.pathname === "/";

  if (isHome) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
            Nightingale
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/books"
            className={`font-sans text-sm tracking-wide transition-colors hover:text-primary ${
              location.pathname === "/books" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Books
          </Link>
          <Link
            to="/about"
            className={`font-sans text-sm tracking-wide transition-colors hover:text-primary ${
              location.pathname === "/about" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
          <Link
            to="/coming-soon"
            className={`font-sans text-sm tracking-wide transition-colors hover:text-primary ${
              location.pathname === "/coming-soon" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Coming Soon
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
