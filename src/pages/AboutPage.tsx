import { Instagram, Twitter, Mail, BookOpen } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Author Image */}
          <div className="animate-slide-up order-2 lg:order-1" style={{ opacity: 0 }}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=750&fit=crop"
                  alt="Elena Nightingale"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-accent/10 -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-secondary -z-10" />
            </div>
          </div>

          {/* Author Bio */}
          <div className="order-1 lg:order-2 animate-slide-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <div className="inline-flex items-center gap-2 text-accent mb-4">
              <BookOpen className="h-5 w-5" />
              <span className="font-sans text-sm uppercase tracking-widest">The Author</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
              Elena Nightingale
            </h1>

            <div className="space-y-4 text-foreground/80 leading-relaxed mb-8">
              <p>
                Elena Nightingale is an award-winning author known for her atmospheric prose 
                and deeply emotional storytelling. Born in a small coastal town, she developed 
                a love for stories at an early age, spending countless hours in her grandmother's 
                library.
              </p>
              <p>
                Her writing explores themes of memory, identity, and the quiet moments that 
                shape our lives. With six published novels, Elena has captivated readers 
                worldwide with her ability to create immersive worlds that feel both familiar 
                and magical.
              </p>
              <p>
                When she's not writing, Elena can be found in coffee shops with her worn 
                notebook, tending to her garden, or exploring bookshops in whichever city 
                she happens to be visiting. She currently lives in Portland, Oregon, with 
                her two cats, Hemingway and Woolf.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border mb-8">
              <div className="text-center">
                <p className="font-serif text-3xl text-primary mb-1">6</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Books</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-primary mb-1">12</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Awards</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-primary mb-1">1M+</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Readers</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-24 text-center animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground/80 max-w-3xl mx-auto">
            "Stories are how we make sense of the world. They are the bridges between 
            hearts, the lanterns in the dark, the quiet companions on long journeys."
          </blockquote>
          <p className="mt-6 text-muted-foreground">— Elena Nightingale</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
