import { useState } from "react";
import { HeroVideo } from "@/components/HeroVideo";
import { BooksModal } from "@/components/modals/BooksModal";
import { AboutModal } from "@/components/modals/AboutModal";
import { ComingSoonModal } from "@/components/modals/ComingSoonModal";

const Index = () => {
  const [booksOpen, setBooksOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <HeroVideo
        onOpenBooks={() => setBooksOpen(true)}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenComingSoon={() => setComingSoonOpen(true)}
      />

      {/* Modals */}
      <BooksModal open={booksOpen} onOpenChange={setBooksOpen} />
      <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} />
    </main>
  );
};

export default Index;
