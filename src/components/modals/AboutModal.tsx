import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Instagram, Twitter, Mail, BookOpen } from "lucide-react";

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Author Image */}
            <div className="order-2 lg:order-1">
              <div className="relative max-w-sm mx-auto lg:max-w-none">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=750&fit=crop"
                    alt="Elena Nightingale"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements - smaller on mobile */}
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/10 -z-10" />
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary -z-10" />
              </div>
            </div>

            {/* Author Bio */}
            <div className="order-1 lg:order-2">
              <DialogHeader className="text-left mb-3 sm:mb-4">
                <div className="inline-flex items-center gap-2 text-accent mb-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-sans text-xs uppercase tracking-widest">The Author</span>
                </div>
                <DialogTitle className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
                  Elena Nightingale
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-2 sm:space-y-3 text-foreground/80 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                <p>
                  Elena Nightingale is an award-winning author known for her atmospheric prose
                  and deeply emotional storytelling. Born in a small coastal town, she developed
                  a love for stories at an early age.
                </p>
                <p>
                  Her writing explores themes of memory, identity, and the quiet moments that
                  shape our lives. With six published novels, Elena has captivated readers
                  worldwide with her ability to create immersive worlds.
                </p>
                <p>
                  When she's not writing, Elena can be found in coffee shops with her worn
                  notebook, or exploring bookshops. She lives in Portland, Oregon, with
                  her two cats, Hemingway and Woolf.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3 sm:py-4 border-y border-border mb-4 sm:mb-6">
                <div className="text-center">
                  <p className="font-serif text-xl sm:text-2xl text-primary mb-1">6</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Books</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-xl sm:text-2xl text-primary mb-1">12</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Awards</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-xl sm:text-2xl text-primary mb-1">1M+</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Readers</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="mt-8 sm:mt-10 text-center border-t border-border pt-6 sm:pt-8">
            <blockquote className="font-serif text-lg sm:text-xl md:text-2xl italic text-foreground/80 max-w-2xl mx-auto">
              "Stories are how we make sense of the world. They are the bridges between
              hearts, the lanterns in the dark."
            </blockquote>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-sm">— Elena Nightingale</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
