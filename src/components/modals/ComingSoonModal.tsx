import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Bell, BookOpen, Feather } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ComingSoonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComingSoonModal({ open, onOpenChange }: ComingSoonModalProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6 md:p-8">
          <DialogHeader className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-2 text-accent mb-2">
              <Sparkles className="h-4 w-4" />
              <span className="font-sans text-xs uppercase tracking-widest">Coming Soon</span>
            </div>
            <DialogTitle className="font-serif text-4xl md:text-5xl text-foreground">
              What's Next
            </DialogTitle>
            <p className="text-muted-foreground mt-3">
              Exciting new stories and features are on the horizon.
            </p>
          </DialogHeader>

          {/* Coming Soon Items */}
          <div className="space-y-4 mb-8">
            {upcomingItems.map((item) => (
              <div
                key={item.title}
                className="bg-secondary/50 rounded-xl p-5 flex gap-4 items-start"
              >
                <div className="w-11 h-11 rounded-lg bg-card flex items-center justify-center flex-shrink-0 shadow-sm">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                    <h3 className="font-serif text-lg text-foreground">{item.title}</h3>
                    <span className="inline-flex text-xs font-sans uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent w-fit">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-warm rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 mb-4">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-serif text-xl text-foreground mb-2">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-5 text-sm">
              Be the first to know about new releases and events.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-10 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                required
              />
              <Button type="submit" size="default">
                Notify Me
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
