import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BookOpen, User, Sparkles } from "lucide-react";

export function HeroVideo() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Books", icon: BookOpen, path: "/books" },
    { label: "About the Author", icon: User, path: "/about" },
    { label: "Coming Soon", icon: Sparkles, path: "/coming-soon" },
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
      >
        <source src="/landing.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

      {/* Navigation on Right Side */}
      <nav className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
        {navItems.map((item, index) => (
          <Button
            key={item.path}
            variant="nav"
            size="lg"
            onClick={() => navigate(item.path)}
            className="justify-start gap-3 animate-slide-right min-w-[200px]"
            style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>

      {/* Logo/Title */}
      <div className="absolute left-8 md:left-16 bottom-16 md:bottom-24 z-10 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground/90 mb-2">
          Nightingale
        </h1>
        <p className="font-sans text-lg md:text-xl text-muted-foreground tracking-wide">
          Books & Stories
        </p>
      </div>
    </div>
  );
}
