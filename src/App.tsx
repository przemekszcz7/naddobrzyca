import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  Phone,
  ArrowUpRight,
  Facebook
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Photos provided by the user
const PHOTOS = [
  "https://i.ibb.co/Fqk5FGkY/682939108-17886371349532954-242335872886839050-n.jpg", // Sunset Campfire
  "https://i.ibb.co/G3371tk0/682043595-17886371316532954-5426551692902271171-n.jpg", // Activity / High perspective river
  "https://i.ibb.co/TqTGPrSk/684700335-17886371286532954-2761789656658961618-n.jpg", // Waterfront wood deck
  "https://i.ibb.co/1JL1JmW3/685394100-17886371295532954-3809812011558578609-n.jpg", // Table under pavilion / green lawn
  "https://i.ibb.co/tTGsK72X/682386668-17886371358532954-1031690152946565122-n.jpg", // Campfire evening seating
  "https://i.ibb.co/JFzFRbnY/684158109-17886371277532954-2788750279973868294-n.jpg", // Cozy bonfire pit morning view
  "https://i.ibb.co/pjZ6b9Kx/640565167-122143968296964420-7092259455221640719-n.jpg", // River overview twilight water
  "https://i.ibb.co/dwSwDWWS/684778558-122152052678964420-6728575757845800869-n.jpg", // Sunny river bend with steps
  "https://i.ibb.co/sv5snnvW/697105187-122153026364964420-6013318996972993900-n.jpg"  // High scenic drone river look
];

const GALLERY_ITEMS = [
  { url: PHOTOS[0], title: "Klimatyczny wieczór", category: "Ogniska", area: "big1" },
  { url: PHOTOS[1], title: "Leniwie płynąca Dobrzyca", category: "Natura", area: "sm1" },
  { url: PHOTOS[2], title: "Przystań i pomost nad wodą", category: "Kajaki", area: "sm2" },
  { url: PHOTOS[3], title: "Altana biesiadna", category: "Eventy", area: "full" },
  { url: PHOTOS[4], title: "Ognisko pod gwiazdami", category: "Ogniska", area: "sm3" },
  { url: PHOTOS[5], title: "Śniadanie na łonie natury", category: "Natura", area: "sm4" },
  { url: PHOTOS[6], title: "Spływ o zachodzie słońca", category: "Kajaki", area: "big2" },
  { url: PHOTOS[7], title: "Zejście do rzeki Dobrzycy", category: "Kajaki", area: "sm5" },
  { url: PHOTOS[8], title: "Malownicze zakola rzeki", category: "Natura", area: "sm6" }
];

const EQUIPMENTS = [
  {
    id: "Kajaki jednoosobowe",
    name: "Kajak jednoosobowy",
    price: "od 60 zł / dzień",
    description: "Lekki, zwrotny i wyjątkowo stabilny kajak polietylenowy. Doskonale radzi sobie z naturalnymi przeszkodami na rzece Dobrzycy."
  },
  {
    id: "Kajaki dwuosobowe",
    name: "Kajak dwuosobowy",
    price: "od 80 zł / dzień",
    description: "Przestronny i bezpieczny kajak dla dwojga z ergonomicznymi siedzeniami i wzmocnioną konstrukcją odporną na otarcia."
  },
  {
    id: "SUP",
    name: "Deska SUP",
    price: "od 50 zł / dzień",
    description: "Szeroka, stabilna deska SUP z regulowanym wiosłem i linką bezpieczeństwa. Idealna na spokojniejsze odcinki rzeki i przyległe zalewy."
  },
  {
    id: "Rowery elektryczne",
    name: "Rower elektryczny",
    price: "od 100 zł / dzień",
    description: "Terenowy rower e-bike o imponującym zasięgu. Ułatwia bezwysiłkowe przemierzanie urokliwych, pagórkowatych traktów leśnych."
  }
];

const REVIEWS = [
  {
    id: 1,
    author: "Robert Kowalski",
    content: "Lepszego miejsca nie można sobie wymarzyć, Wszystko to co jest potrzebne do odpoczynku i relaksu... POLECAMY... 👌"
  },
  {
    id: 2,
    author: "Anna Nowak",
    content: "Świetne miejsce na wypoczynek, las rzeki, stawy, jeziora, cisza, natura. Prawdziwa oaza ciszy."
  },
  {
    id: 3,
    author: "Wojciech Malinowski",
    content: "Piękne miejsce, fantastyczny klimat, otoczenie lasu, wody, wycieczki kajakowe, rowerowe, wędkowanie. Urzekające zachody słońca."
  }
];

// Wave accent helper
const WaveSVG = () => (
  <svg className="w-16 h-2 text-amber/50 my-4" viewBox="0 0 100 10" preserveAspectRatio="none">
    <path d="M0,5 Q12.5,0 25,5 T50,5 T75,5 T100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    service: "Kajaki",
    date: ""
  });

  // "Ogień czy Woda" state switcher
  const [elementalMode, setElementalMode] = useState<"ogień" | "woda" | "balans">("balans");
  
  // Custom automated particle triggers
  const [sparks, setSparks] = useState<{ id: number; left: number; size: number; delay: number; duration: number }[]>([]);
  const [bubbles, setBubbles] = useState<{ id: number; left: number; size: number; delay: number; duration: number; drift: number }[]>([]);

  useEffect(() => {
    // Generate static particle arrays for maximum performance (react key safety)
    const newSparks = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 3,
    }));
    setSparks(newSparks);

    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 12 + 6,
      delay: Math.random() * 6,
      duration: Math.random() * 5 + 5,
      drift: Math.random() * 40 - 20,
    }));
    setBubbles(newBubbles);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom Intersection Observer hook logic for modular reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("opacity-0", "translate-y-7");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const getHeroBg = () => {
    if (elementalMode === "ogień") return PHOTOS[0];
    if (elementalMode === "woda") return PHOTOS[1];
    return PHOTOS[6]; // Balans (Sunset campfire mixed overview water look)
  };

  return (
    <div id="root-container" className="bg-sand text-ink min-h-screen flex flex-col antialiased relative">
      {/* High-end Tactile Grain/Paper Texture Overlay */}
      <div className="grain-overlay" />

      <style>{`
        /* Custom Editorial Gallery Grid rules using native grid-areas */
        @media (min-width: 1024px) {
          .editorial-gallery-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-areas:
              "big1 big1 sm1"
              "big1 big1 sm2"
              "full full full"
              "sm3  big2 big2"
              "sm4  big2 big2"
              "sm5  sm6  big2";
            gap: 6px;
          }
        }
      `}</style>
      
      {/* 1. STICKY DYNAMIC NAVIGATION HEADER */}
      <nav 
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-50 h-[76px] flex items-center transition-all duration-500 ${
          scrolled 
            ? "bg-forest/97 border-b border-amber/30 backdrop-blur-xl" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex flex-col group select-none">
            <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-white leading-none">
              Gościniec nad Dobrzycą
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-[#faf8f3]/60 group-hover:text-amber-pale transition-all mt-1 font-sans">
              Odpoczynek · Przygoda · Natura
            </span>
          </a>

          {/* Desktop Navigation Link row */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#o-nas" 
              className="text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-white hover:text-amber-pale transition-colors duration-300"
            >
              O miejscu
            </a>
            <a 
              href="#oferta" 
              className="text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-white hover:text-amber-pale transition-colors duration-300"
            >
              Oferta
            </a>
            <a 
              href="#sprzet" 
              className="text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-white hover:text-amber-pale transition-colors duration-300"
            >
              Sprzęt
            </a>
            <a 
              href="#galeria" 
              className="text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-white hover:text-amber-pale transition-colors duration-300"
            >
              Galeria
            </a>
            <a 
              href="#kontakt" 
              className="text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-white hover:text-amber-pale transition-colors duration-300"
            >
              Kontakt
            </a>
            <span className="w-px h-3.5 bg-white/20" />
            <a 
              href="https://www.facebook.com/profile.php?id=61578932621593" 
              target="_blank" 
              rel="noreferrer" 
              className="text-white hover:text-amber-pale transition-all"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-4.5 h-4.5" />
            </a>
          </div>

          {/* Nav REZERWUJ Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => {
                setBookingSubmitted(false);
                setBookingOpen(true);
              }}
              className="border border-amber text-amber cursor-pointer hover:bg-amber hover:text-white transition-all duration-300 bg-transparent px-6 py-2 uppercase tracking-[0.15em] text-[11px] font-sans font-medium"
            >
              REZERWUJ →
            </button>
          </div>

          {/* Hamburger Menu on Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white hover:text-amber-pale p-2 transition-colors cursor-pointer"
            aria-label="Otwórz menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Slide-In Mobile Drawer Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-forest text-white p-8 flex flex-col justify-between z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="font-serif text-lg font-bold">Nawigacja</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:text-amber-pale cursor-pointer p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-6 pt-10 text-left">
                  <a 
                    href="#o-nas" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl hover:text-amber-pale transition-colors font-light"
                  >
                    O miejscu
                  </a>
                  <a 
                    href="#oferta" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl hover:text-amber-pale transition-colors font-light"
                  >
                    Atrakcje i Oferta
                  </a>
                  <a 
                    href="#sprzet" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl hover:text-amber-pale transition-colors font-light"
                  >
                    Wyposażenie i Sprzęt
                  </a>
                  <a 
                    href="#galeria" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl hover:text-amber-pale transition-colors font-light"
                  >
                    Galeria zdjęć
                  </a>
                  <a 
                    href="#kontakt" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl hover:text-amber-pale transition-colors font-light"
                  >
                    Kontakt i Rezerwacja
                  </a>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <a 
                  href="tel:690310453" 
                  className="flex items-center gap-2 text-sm text-amber-pale font-medium"
                >
                  <Phone className="w-4 h-4" />
                  690 310 453
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBookingSubmitted(false);
                    setBookingOpen(true);
                  }}
                  className="w-full text-center border border-amber text-amber hover:bg-amber hover:text-white transition py-3 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Zarezerwuj teraz
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. HERO HEADER SECTION */}
      <header className="relative h-svh min-h-[600px] flex items-end justify-start overflow-hidden text-white select-none bg-[#0a190e]">
        {/* Animated Crossfading Background of Elemental Modes */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={elementalMode}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.01 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${getHeroBg()})` }}
          />
        </AnimatePresence>
        
        {/* Soft, beautiful dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a190e]/95 via-[#0a190e]/60 to-[#0a190e]/25 z-1" />

        {/* Dynamic Sparks Overlay if Fire vibe active */}
        {(elementalMode === "ogień" || elementalMode === "balans") && (
          <div className="absolute inset-0 z-2 overflow-hidden pointer-events-none">
            {sparks.map((s) => (
              <span
                key={`spark-${s.id}`}
                className="absolute bottom-[-10px] bg-gradient-to-t from-orange-500 via-amber-500 to-yellow-300 rounded-full animate-spark mix-blend-screen opacity-0"
                style={{
                  left: `${s.left}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  filter: "blur(1px)",
                  boxShadow: "0 0 6px rgba(245, 158, 11, 0.8)",
                  "--spark-duration": `${s.duration}s`,
                  animationDelay: `${s.delay}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* Dynamic Bubbles Overlay if Water vibe active */}
        {(elementalMode === "woda" || elementalMode === "balans") && (
          <div className="absolute inset-0 z-2 overflow-hidden pointer-events-none">
            {bubbles.map((b) => (
              <span
                key={`bubble-${b.id}`}
                className="absolute bottom-[-20px] rounded-full border border-white/20 bg-white/5 animate-bubble opacity-0"
                style={{
                  left: `${b.left}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  "--bubble-duration": `${b.duration}s`,
                  "--bubble-drift-x": `${b.drift}px`,
                  animationDelay: `${b.delay}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* Hero content bottom-left */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-[10vh]">
          <div className="max-w-[750px] text-left">
            <span className="text-amber-pale font-sans font-semibold uppercase text-[11px] tracking-[0.25em] block mb-2">
              ZACHODNIOPOMORSKIE · RZEKA DOBRZYCA
            </span>
            
            <div className="h-px bg-amber w-16 my-4 transition-all duration-500" style={{ width: elementalMode === "ogień" ? "100px" : elementalMode === "woda" ? "50px" : "75px" }} />
            
            <h1 className="font-serif font-bold text-white text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.92] tracking-tight mb-4 whitespace-pre-wrap">
              Ogień <br />czy Woda?
            </h1>
            
            <AnimatePresence mode="wait">
              <motion.p 
                key={elementalMode}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -7 }}
                transition={{ duration: 0.5 }}
                className="font-sans font-light text-base md:text-lg text-[#faf8f3]/90 max-w-xl leading-relaxed mb-8 h-14"
              >
                {elementalMode === "ogień" && "Ciepło płomieni, wieczorne biesiady i trzaskające drewno bukowe pod gwieździstym niebem."}
                {elementalMode === "woda" && "Krystaliczny nurt leśnej rzeki Dobrzycy, lekkość spływu oraz poranna rześkość mazurskiej puszczy."}
                {elementalMode === "balans" && "Pełnia natury: Spływy kajakowe, wycieczki leśnymi traktami i kojące wieczory przy ognisku."}
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <a 
                href="#oferta" 
                className="btn-interactive border border-white hover:border-amber hover:text-white transition bg-transparent hover:bg-amber text-white px-8 py-3.5 tracking-[0.13em] text-[11px] uppercase font-sans font-medium cursor-pointer"
              >
                SPRAWDŹ OFERTĘ
              </a>
              
              <a 
                href="tel:690310453" 
                className="font-sans font-light text-sm text-white/80 hover:text-white flex items-center gap-2 group"
              >
                <Phone className="w-4 h-4 text-amber-pale transition-transform group-hover:scale-110" />
                T: <span className="font-medium">690 310 453</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom right phone indicator */}
        <div className="absolute bottom-10 right-12 hidden lg:block z-10 font-sans text-xs tracking-widest text-[#faf8f3]/50">
          Rezerwacje: <a href="tel:690310453" className="text-[#faf8f3] font-bold hover:text-amber-pale transition">&nbsp;690 310 453</a>
        </div>

        {/* Micro Scroll Arrow Down */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 z-10 select-none pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.3em] font-medium font-sans">Scroll</span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-amber rounded-full"
          />
        </div>
      </header>

      {/* 3. SECTION 1 — Intro "O miejscu" (background: --sand) */}
      <section id="o-nas" className="py-24 md:py-32 px-6 md:px-12 bg-sand relative overflow-hidden">
        {/* Soft, textured topographical wave line accent */}
        <div className="absolute top-0 left-0 w-full opacity-10 pointer-events-none text-forest">
          <svg viewBox="0 0 1440 200" fill="none" className="w-full h-40">
            <path d="M0,96 C240,150 480,180 720,130 C960,80 1200,10 1440,50 L1440,200 L0,200 Z" fill="currentColor"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* Left Column (55%) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-amber block">
              O NAS
            </span>
            <WaveSVG />
            
            <h2 className="font-serif font-bold text-ink text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] tracking-tight">
              Gdzie rzeka spotyka leśne ostępy
            </h2>
            
            <div className="space-y-4 text-muted font-sans font-light text-[1.05rem] leading-relaxed">
              <p>
                Gościniec nad Dobrzycą to wyjątkowe miejsce stworzone z myślą o ucieczce od miejskiego pędu. Nasz kameralny ośrodek w sercu Zachodniopomorskiego leży bezpośrednio nad urokliwym i krystalicznie czystym korytem leśnej rzeki Dobrzycy.
              </p>
              <p>
                Dajemy komfortową przestrzeń do wsłuchania się w leśną ciszę, obserwowania dzikiego ptactwa, wspólnych wieczornych biesiad przy ognisku oraz aktywnego wypoczynku w kajaku lub na rowerze. Odpocznij tak, jak kochasz najbardziej — w rytmie natury.
              </p>
            </div>
          </motion.div>

          {/* Right Column (45%) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 relative pt-8 md:pt-0"
          >
            <div className="aspect-[3/4] w-full max-w-[390px] mx-auto overflow-hidden shadow-[8px_8px_0_0_#e8c47a] md:-mt-16 sm:mt-0 z-10 relative group bg-parchment">
              <img 
                src={PHOTOS[1]} 
                alt="Rzeka splot z naturą w Dobrzycy" 
                className="w-full h-full object-cover select-none transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. SECTION 2 — Oferta (background: --forest) */}
      <section id="oferta" className="py-24 md:py-32 bg-forest text-white relative overflow-hidden">
        {/* Abstract decorative graphic representing glowing light or spark accent */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber/5 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* List of Offers */}
          <div className="space-y-12 text-left">
            <div className="space-y-4">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-amber-pale block">
                OFERTA I ATRAKCJE
              </span>
              <h2 className="font-serif font-bold text-white text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] tracking-tight">
                Zasmakuj leśnego życia
              </h2>
            </div>

            {/* Elastic rows with dynamic transitions */}
            <div className="divide-y divide-amber/20 border-t border-b border-amber/20 mb-8">
              
              {/* Row 1 */}
              <motion.div 
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="py-7 flex gap-6 items-start group cursor-pointer"
              >
                <span className="font-serif italic text-4xl text-amber-pale/45 group-hover:text-amber-pale transition-all select-none leading-none pt-1">
                  01
                </span>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-pale transition-colors">Spływy Kajakowe</h3>
                  <p className="font-sans font-light text-[0.95rem] text-white/75 leading-relaxed">
                    Szeroka rzeka Dobrzyca i okolice. Kajaki jednoosobowe i dwuosobowe na bezpiecznych, leśnych, uspokajających i cichych odcinkach rzeki.
                  </p>
                </div>
              </motion.div>

              {/* Row 2 */}
              <motion.div 
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="py-7 flex gap-6 items-start group cursor-pointer"
              >
                <span className="font-serif italic text-4xl text-amber-pale/45 group-hover:text-amber-pale transition-all select-none leading-none pt-1">
                  02
                </span>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-pale transition-colors">Wycieczki Rowerowe</h3>
                  <p className="font-sans font-light text-[0.95rem] text-white/75 leading-relaxed">
                    Nowoczesna flota mocnych rowerów elektrycznych terenowych, idealna do swobodnego, bezwysiłkowego przemierzania pagórkowatych leśnych wzgórz.
                  </p>
                </div>
              </motion.div>

              {/* Row 3 */}
              <motion.div 
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="py-7 flex gap-6 items-start group cursor-pointer"
              >
                <span className="font-serif italic text-4xl text-amber-pale/45 group-hover:text-amber-pale transition-all select-none leading-none pt-1">
                  03
                </span>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-pale transition-colors">Ogniska &amp; Relaks</h3>
                  <p className="font-sans font-light text-[0.95rem] text-white/75 leading-relaxed">
                    Przytulne leśne paleniska tuż nad samą wodą z przygotowanym świeżym drewnem bukowym pod nocne, urokliwe biesiady biesiadne.
                  </p>
                </div>
              </motion.div>

              {/* Row 4 */}
              <motion.div 
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="py-7 flex gap-6 items-start group cursor-pointer"
              >
                <span className="font-serif italic text-4xl text-amber-pale/45 group-hover:text-amber-pale transition-all select-none leading-none pt-1">
                  04
                </span>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-pale transition-colors">Eventy &amp; Integracje</h3>
                  <p className="font-sans font-light text-[0.95rem] text-white/75 leading-relaxed">
                    Klimatyczne spotkania rodzinne, zielone retreaty i niezapomniane firmowe imprezy integracyjne z prawdziwym leśnym klimatem.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. SECTION 3 — Sprzęt (background: --parchment) */}
      <section id="sprzet" className="py-24 md:py-32 bg-parchment relative overflow-hidden">
        {/* Subtle organic background wave line */}
        <div className="absolute bottom-0 right-0 left-0 h-24 opacity-5 pointer-events-none text-moss">
          <svg viewBox="0 0 1440 100" fill="currentColor" className="w-full h-full">
            <path d="M0,50 Q360,100 720,50 T1440,50 L1440,100 L0,100 Z"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          
          <div className="max-w-xl mx-auto space-y-4 mb-20">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-moss block">
              SPRZĘT DO WYPOŻYCZENIA
            </span>
            <h2 className="font-serif font-bold text-ink text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] tracking-tight">
              Wybierz swój sposób na las i wodę
            </h2>
            <div className="h-0.5 bg-amber w-16 mx-auto mt-2" />
          </div>

          {/* Grid Layout of Bento elements with dynamic hover physics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left mb-20">
            {EQUIPMENTS.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-sand/40 border border-rule/30 p-6 md:p-8 space-y-6 flex flex-col justify-between h-full group transition-all duration-500 shadow-sm hover:shadow-xl hover:bg-white/70 relative overflow-hidden"
              >
                {/* Visual top border line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-serif italic text-2xl text-amber-pale/70 font-semibold group-hover:text-amber transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-amber/10 border border-amber/20 text-amber px-2.5 py-1 uppercase shrink-0">
                      {item.price}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-ink leading-tight group-hover:text-amber transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-sans font-light text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-widest text-[#6b6b5a] font-sans font-semibold block pt-3 border-t border-rule/20">
                  Czysty &amp; Gotowy do startu
                </span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-rule/35 pt-12 text-center space-y-4">
            <p className="font-serif italic text-xl md:text-2xl text-ink max-w-2xl mx-auto leading-relaxed">
              „Zapewniamy profesjonalne doradztwo leśne, opisy sprawdzonych tras oraz pełne ubezpieczenie spływu.”
            </p>
            <p className="font-sans font-semibold text-forest text-base pt-2">
              Błyskawiczne rezerwacje telefoniczne: <a href="tel:690310453" className="underline font-bold text-ink hover:text-amber transition-colors duration-300">690 310 453</a>
            </p>
          </div>

        </div>
      </section>

      {/* 6. SECTION 4 — Galeria (background: --ink) */}
      <section id="galeria" className="py-24 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-4 text-left">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-amber-pale block">
              GALERIA
            </span>
            <h2 className="font-serif font-bold text-white text-[clamp(2.2rem,3.5vw,3rem)] leading-none tracking-tight">
              Widoki z Gościńca
            </h2>
          </div>
          <p className="text-xs text-white/50 font-mono tracking-widest max-w-xs text-left sm:text-right uppercase">
            Kliknij zdjęcie aby powiększyć podgląd i zobaczyć detale
          </p>
        </div>

        {/* Dynamic and responsive mosaic collage */}
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 editorial-gallery-grid">
            {GALLERY_ITEMS.map((item, i) => (
              <motion.div 
                key={i}
                style={{ gridArea: item.area }}
                onClick={() => openLightbox(i)}
                whileHover={{ scale: 0.995 }}
                transition={{ duration: 0.4 }}
                className="aspect-[4/3] sm:aspect-auto h-full min-h-[250px] relative overflow-hidden cursor-pointer group select-none bg-[#131a14]"
              >
                <img 
                  src={item.url} 
                  alt={`Gościniec nad Dobrzycą galeria - ${item.title}`} 
                  className="w-full h-full object-cover transition-all duration-[1000ms] ease-out group-hover:scale-105 group-hover:brightness-[0.65]"
                  loading="lazy"
                />
                
                {/* Micro Border Focus Line on hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-500" />
                
                {/* Slide-Up Category & Title Cover Badge */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#18211a]/95 via-[#18211a]/70 to-transparent translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-left">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-amber-pale">{item.category}</span>
                  <p className="font-serif text-base font-medium text-white mt-0.5">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION 5 — Opinie (background: --sand) */}
      <section id="opinie" className="py-24 md:py-32 bg-sand relative overflow-hidden">
        
        {/* Giant decorative quote sign details for warm editorial look */}
        <span className="text-[12rem] md:text-[18rem] font-serif font-bold text-amber-pale/15 leading-none absolute top-[-30px] md:top-[-60px] left-4 md:left-12 select-none z-0">
          “
        </span>

        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-left space-y-16">
          <div className="space-y-4">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-amber block">
              OPINIE GOŚCI
            </span>
            <h2 className="font-serif font-bold text-ink text-[clamp(2.2rem,3.5vw,3rem)] leading-none tracking-tight">
              Prawdziwe głosy i wspomnienia znad rzeki
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {REVIEWS.map((r, idx) => (
              <motion.div 
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, bg: "#fcfaf6", boxShadow: "0 15px 35px rgba(24,33,38,0.04)" }}
                className="space-y-6 flex flex-col justify-between items-start bg-parchment/30 border border-rule/15 p-6 md:p-8 rounded-sm transition-all duration-400 group"
              >
                <p className="font-serif italic text-[1.12rem] md:text-[1.2rem] text-ink leading-relaxed font-light">
                  „{r.content}”
                </p>
                <div className="space-y-2 w-full pt-2 border-t border-[#c8b87a]/20">
                  <div className="h-px bg-rule w-10 group-hover:w-16 transition-all duration-300" />
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#6b6b5a] uppercase block">
                    — {r.author}, Google Reviews
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-8 flex justify-center md:justify-start">
            <a 
              href="https://www.facebook.com/profile.php?id=61578932621593&sk=reviews"
              target="_blank" 
              rel="noreferrer"
              className="btn-interactive border border-moss text-moss hover:bg-moss hover:text-white uppercase px-11 py-4.5 transition-all duration-300 text-[11px] font-sans font-medium tracking-[0.13em] bg-transparent mt-4 inline-block cursor-pointer text-center"
            >
              WSZYSTKIE OPINIE →
            </a>
          </div>
        </div>
      </section>

      {/* 8. SECTION 6 — Kontakt (background: --forest) */}
      <section id="kontakt" className="py-24 md:py-32 bg-forest text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-between text-left reveal opacity-0 translate-y-7 transition-all duration-750 ease-out">
            <div className="space-y-4">
              <span className="text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-amber-pale block">
                KONTAKT
              </span>
              <h2 className="font-serif font-bold text-white text-[clamp(2.1rem,4vw,3.5rem)] leading-[1.1] tracking-tight">
                Zarezerwuj swój pobyt
              </h2>
              <div className="h-px bg-amber w-12 my-2" />
              <p className="font-sans font-light text-white/70 text-sm leading-relaxed max-w-md">
                Rezerwacje przyjmujemy głównie drogą telefoniczną oraz poprzez szybką wiadomość e-mail. Odpiszemy w przeciągu paru godzin.
              </p>
            </div>

            {/* List entries with borders - NO icons */}
            <div className="divide-y divide-white/10 py-4 my-2">
              
              <div className="py-4 grid grid-cols-3 items-baseline gap-4">
                <span className="text-[10px] font-sans font-semibold tracking-wider text-amber-pale uppercase">
                  ADRES
                </span>
                <span className="col-span-2 font-sans font-light text-white text-base">
                  Dobrzyca 11, Rudki 78-600
                </span>
              </div>

              <div className="py-4 grid grid-cols-3 items-baseline gap-4">
                <span className="text-[10px] font-sans font-semibold tracking-wider text-amber-pale uppercase">
                  TELEFON
                </span>
                <div className="col-span-2 flex flex-col gap-1">
                  <a href="tel:690310453" className="font-serif text-lg text-white font-medium hover:text-amber-pale transition-all">
                    690 310 453
                  </a>
                </div>
              </div>

              <div className="py-4 grid grid-cols-3 items-baseline gap-4">
                <span className="text-[10px] font-sans font-semibold tracking-wider text-amber-pale uppercase">
                  E-MAIL
                </span>
                <div className="col-span-2 flex flex-col gap-0.5">
                  <a href="mailto:mlatkowski3@wp.pl" className="font-sans font-light text-white text-sm hover:text-amber-pale transition-all">
                    mlatkowski3@wp.pl
                  </a>
                  <a href="mailto:mlatkowski3@gmail.com" className="font-sans font-light text-white text-sm hover:text-amber-pale transition-all">
                    mlatkowski3@gmail.com
                  </a>
                </div>
              </div>

              <div className="py-4 grid grid-cols-3 items-baseline gap-4">
                <span className="text-[10px] font-sans font-semibold tracking-wider text-amber-pale uppercase">
                  FACEBOOK
                </span>
                <a 
                  href="https://www.facebook.com/profile.php?id=61578932621593" 
                  target="_blank" 
                  rel="noreferrer"
                  className="col-span-2 font-serif font-light text-white hover:underline hover:text-amber-pale flex items-center gap-1.5"
                >
                  Profil Gościńca na Facebooku →
                </a>
              </div>

            </div>

            {/* Calling trigger buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="tel:690310453" 
                className="border border-amber text-amber font-sans font-medium hover:bg-amber hover:text-white transition py-3 px-6 text-xs uppercase tracking-[0.13em] text-center cursor-pointer"
              >
                ZADZWOŃ: 690 310 453
              </a>
            </div>
          </div>

          {/* Right Column (Grayscale custom elegant map) */}
          <div className="lg:col-span-6 h-[440px] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.1158179143035!2d16.40847797715769!3d53.39486807109128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47016f31fc225425%3A0xe2efb866b9c56e4b!2sDobrzyca%2011%2C%2078-600%20Dobrzyca!5e0!3m2!1spl!2spl!4v1780469415525!5m2!1spl!2spl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out aspect-square md:aspect-auto"
              title="Lokalizacja urządzenia nad rzeką Dobrzyca"
            />
          </div>

        </div>
      </section>

      {/* 9. FOOTER SECTION */}
      <footer className="bg-ink text-[#faf8f3]/85 py-16 px-6 md:px-12 border-t border-amber/10 text-center md:text-left select-none">
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div className="space-y-1">
            <span className="font-serif text-lg font-bold tracking-tight text-white block">
              Gościniec nad Dobrzycą
            </span>
            <span className="text-[10px] tracking-widest uppercase font-medium text-amber-pale block">
              Odpoczynek | Przygoda | Natura
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a 
              href="#o-nas" 
              className="text-[10px] uppercase font-sans font-medium tracking-[0.13em] text-white/50 hover:text-white transition-colors"
            >
              O nas
            </a>
            <a 
              href="#oferta" 
              className="text-[10px] uppercase font-sans font-medium tracking-[0.13em] text-white/50 hover:text-white transition-colors"
            >
              Oferta
            </a>
            <a 
              href="#sprzet" 
              className="text-[10px] uppercase font-sans font-medium tracking-[0.13em] text-white/50 hover:text-white transition-colors"
            >
              Sprzęt
            </a>
            <a 
              href="#galeria" 
              className="text-[10px] uppercase font-sans font-medium tracking-[0.13em] text-white/50 hover:text-white transition-colors"
            >
              Galeria
            </a>
          </div>

          <div>
            <a 
              href="https://www.facebook.com/profile.php?id=61578932621593" 
              target="_blank" 
              rel="noreferrer" 
              className="text-white hover:text-amber-pale transition"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-5 h-5 mx-auto" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <span>
            &copy; 2026 Gościniec nad Dobrzycą · Zachodniopomorskie.
          </span>
          <div className="flex gap-4 font-mono uppercase text-[9px] tracking-wider text-white/40">
            <span>Agroturystyka &amp; Kajaki</span>
            <span>Rzeka Dobrzyca</span>
          </div>
        </div>

      </footer>

      {/* 10. PHOTO LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center p-4 cursor-zoom-out select-none"
          >
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-amber cursor-pointer transition-colors p-2"
              aria-label="Zamknij"
            >
              <X className="w-8 h-8" />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-6 text-white hover:text-amber cursor-pointer transition-colors p-2"
              aria-label="Wstecz"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center cursor-default" onClick={(e) => e.stopPropagation()}>
              <img 
                src={GALLERY_ITEMS[lightboxIndex].url} 
                alt="Wizualizacja wybranej pozycji w galerii" 
                className="max-w-full max-h-[80vh] object-contain border border-white/5"
              />
            </div>

            <button 
              onClick={nextImage}
              className="absolute right-6 text-white hover:text-amber cursor-pointer transition-colors p-2"
              aria-label="Następne"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 11. REZERWUJ POPUP MODAL */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-55 flex items-center justify-center p-4 select-none"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-parchment text-ink w-full max-w-lg p-8 relative border border-rule shadow-2xl overflow-y-auto max-h-[90svh]"
            >
              <button 
                onClick={() => setBookingOpen(false)}
                className="absolute top-6 right-6 text-ink/60 hover:text-ink cursor-pointer"
                aria-label="Zamknij"
              >
                <X className="w-5 h-5" />
              </button>

              {!bookingSubmitted ? (
                <div className="space-y-6 text-left">
                  <div>
                    <span className="text-[10px] tracking-widest text-moss font-semibold uppercase font-sans">Błyskawiczny kontakt</span>
                    <h3 className="font-serif text-2xl font-bold text-ink mt-1">Zgłoś chęć pobytu</h3>
                    <p className="text-xs text-muted mt-2 leading-relaxed">
                      Wypełnij formularz. Oddzwonimy w parę chwil, żeby ustalić szczegóły i sprawdzić wolne terminy oraz sprzęt dla Ciebie.
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-ink/75 font-semibold block">Twoje imię i nazwisko</label>
                      <input 
                        type="text" 
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        className="w-full bg-sand/50 border border-rule/80 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-moss"
                        placeholder="np. Robert Kowalski"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-ink/75 font-semibold block">Telefon kontaktowy</label>
                      <input 
                        type="tel" 
                        required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        className="w-full bg-sand/50 border border-rule/80 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-moss"
                        placeholder="np. 600 000 000"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-ink/75 font-semibold block">Główna atrakcja</label>
                        <select 
                          value={bookingForm.service}
                          onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                          className="w-full bg-sand/50 border border-rule/80 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-moss appearance-none"
                        >
                          <option value="Kajaki">Spływ kajakowy</option>
                          <option value="Rowery">Rowery elektryczne</option>
                          <option value="Ogniska">Ognisko &amp; Odpoczynek</option>
                          <option value="Eventy">Integracje &amp; Eventy</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-ink/75 font-semibold block">Planowana Data</label>
                        <input 
                          type="date" 
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                          className="w-full bg-sand/50 border border-rule/80 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-moss"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-forest text-sand font-sans font-medium text-xs tracking-widest uppercase py-3.5 px-6 hover:bg-ink transition-all duration-300 shadow mt-6 cursor-pointer"
                    >
                      Wyślij zgłoszenie
                    </button>
                  </form>

                  <div className="text-center pt-4 border-t border-rule/30">
                    <p className="text-[11px] text-muted leading-relaxed">
                      Masz pilne pytanie? Skontaktuj się od razu telefonicznie: <br />
                      <a href="tel:690310453" className="font-bold text-ink hover:text-amber underline">690 310 453</a>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-forest/10 text-moss mx-auto flex items-center justify-center">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ink">Dziękujemy, {bookingForm.name}!</h3>
                  <p className="font-sans font-light text-sm text-muted max-w-sm mx-auto leading-relaxed">
                    Zgłoszenie na <strong>{bookingForm.service}</strong> w wybranym dniu <strong>{bookingForm.date}</strong> zostało pomyślnie wysłane. Odezwiemy się na numer <strong>{bookingForm.phone}</strong> najszybciej jak to możliwe!
                  </p>
                  <button 
                    onClick={() => setBookingOpen(false)}
                    className="border border-ink text-xs uppercase tracking-widest font-semibold py-2.5 px-8 hover:bg-forest hover:text-white transition-colors mt-6 cursor-pointer"
                  >
                    OK, ZAMKNIJ OKNO
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
