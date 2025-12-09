import { Button } from "@/components/ui/button";
import { Sparkles, Bell, BookOpen, Feather } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when new content is available.",
      });
      setEmail("");
    }
  };

  const upcomingItems = [
    {
      icon: BookOpen,
      title: "New Novel: 'The Lighthouse Keeper'",
      description: "A sweeping tale of love and loss set on a remote island. Expected Spring 2025.",
      status: "In Progress",
    },
    {
      icon: Feather,
      title: "Poetry Collection",
      description: "Elena's first poetry collection, featuring works written over the past decade.",
      status: "Coming 2025",
    },
    {
      icon: Sparkles,
      title: "Signed Editions",
      description: "Special signed hardcover editions of all books with exclusive artwork.",
      status: "Limited Release",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 text-accent mb-4">
            <Sparkles className="h-5 w-5" />
            <span className="font-sans text-sm uppercase tracking-widest">Coming Soon</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
            What's Next
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Exciting new stories and features are on the horizon. 
            Here's a glimpse of what's coming.
          </p>
        </header>

        {/* Coming Soon Items */}
        <div className="space-y-6 mb-16">
          {upcomingItems.map((item, index) => (
            <div
              key={item.title}
              className="bg-card rounded-xl p-6 md:p-8 shadow-soft flex flex-col md:flex-row gap-6 items-start animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                  <h3 className="font-serif text-xl text-foreground">{item.title}</h3>
                  <span className="inline-flex text-xs font-sans uppercase tracking-wider px-3 py-1 rounded-full bg-accent/10 text-accent w-fit">
                    {item.status}
                  </span>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div
          className="bg-gradient-warm rounded-2xl p-8 md:p-12 text-center animate-fade-in"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
            <Bell className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-serif text-3xl text-foreground mb-3">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Be the first to know about new releases, events, and exclusive content.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" size="lg">
              Notify Me
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
