import { Button } from "./ui/button";
import { BookOpen, User, Sparkles } from "lucide-react";

interface HeroVideoProps {
  onOpenBooks: () => void;
  onOpenAbout: () => void;
  onOpenComingSoon: () => void;
}

export function HeroVideo({ onOpenBooks, onOpenAbout, onOpenComingSoon }: HeroVideoProps) {
  const navItems = [
    { label: "Books", icon: BookOpen, action: onOpenBooks },
    { label: "About the Author", icon: User, action: onOpenAbout },
    { label: "Coming Soon", icon: Sparkles, action: onOpenComingSoon },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '30% center' }}
      >
        <source src="/landing.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay - Enhanced for mobile readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/40 md:block hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:from-background/60" />

      {/* Desktop Navigation - Right Side (hidden on mobile) */}
      <nav className="hidden md:flex absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex-col gap-4 z-10">
        {navItems.map((item, index) => (
          <Button
            key={item.label}
            variant="nav"
            size="lg"
            onClick={item.action}
            className="justify-start gap-3 animate-slide-right min-w-[200px]"
            style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>

      {/* Mobile Navigation - Bottom Bar (visible only on mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-card/95 backdrop-blur-md border-t border-border/50 shadow-2xl safe-area-pb">
        <div className="grid grid-cols-3 gap-2 p-3">
          {navItems.map((item, index) => (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              onClick={item.action}
              className="flex-col gap-1.5 h-auto py-3 px-2 hover:bg-accent/20 active:bg-accent/30 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium leading-tight text-center">
                {item.label}
              </span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Logo/Title - Adjusted for mobile */}
      <div className="absolute left-4 md:left-8 lg:left-16 bottom-20 md:bottom-16 lg:bottom-24 z-10 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-foreground/90 mb-2 leading-tight">
          Lofi Reads
        </h1>
        <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground tracking-wide">
          Books & Stories
        </p>
      </div>
    </div>
  );
}
