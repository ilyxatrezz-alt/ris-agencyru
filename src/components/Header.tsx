import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";
import GarlandLights from "./GarlandLights";
import HolidayBanner from "./HolidayBanner";
import risIcon from "@/assets/ris-icon.png";

const slogans = [
  "Зерно вашего роста",
  "Результат, а не обещания",
  "Бизнес растёт с нами",
  "Прибыль — наша цель",
  "Масштабируем успех",
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sloganIndex, setSloganIndex] = useState(0);
  const location = useLocation();
  const { settings } = useSiteSettingsMap();
  
  const garlandEnabled = getSetting(settings, "effects_garland_enabled", "true") === "true";
  const bannerEnabled = getSetting(settings, "effects_banner_enabled", "true") === "true";
  const bannerText = getSetting(settings, "effects_banner_text", "С Новым 2026 годом! 🎄 Желаем успехов и процветания вашему бизнесу!");

  useEffect(() => {
    const interval = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "/services" },
    { name: "Кейсы", href: "/cases" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contacts" },
  ];

  return (
    <>
      {bannerEnabled && <HolidayBanner text={bannerText} />}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 relative overflow-visible pb-4">
        {garlandEnabled && <GarlandLights />}
      <div className="container mx-auto px-4">
        <nav className="flex h-20 items-center justify-between">
          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div 
              className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <img 
                src={risIcon} 
                alt="РИС" 
                className="w-full h-full object-contain drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)]" 
              />
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
                РИС
              </span>
              <p className="text-[10px] text-muted-foreground leading-tight font-medium tracking-wider uppercase">
                Реклама и Сайты
              </p>
            </div>
          </Link>

          {/* Center slogan — desktop only */}
          <div className="hidden lg:flex flex-1 justify-center items-center overflow-hidden mx-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={sloganIndex}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.9 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)", scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 hsl(var(--primary) / 0.6)",
                      "0 0 0 6px hsl(var(--primary) / 0)",
                      "0 0 0 0 hsl(var(--primary) / 0.6)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-bold text-muted-foreground tracking-wide whitespace-nowrap">
                  {slogans[sloganIndex].split("").map((char, i) => (
                    <motion.span
                      key={`${sloganIndex}-${i}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02, duration: 0.3 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 hsl(var(--primary) / 0.6)",
                      "0 0 0 6px hsl(var(--primary) / 0)",
                      "0 0 0 0 hsl(var(--primary) / 0.6)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 shrink-0">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground shadow-cta"
                    : "text-foreground hover:text-primary"
                )}
              >
                {item.name}
              </Link>
            ))}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                className="ml-4 gradient-primary shadow-cta font-bold hover:shadow-glow transition-all duration-300" 
                asChild
              >
                <Link to="/contacts">Бесплатный аудит</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden py-4 border-t border-border/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile slogan */}
              <motion.div
                className="flex items-center justify-center gap-2 pb-3 mb-3 border-b border-border/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={sloganIndex}
                    className="text-xs font-bold text-muted-foreground tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {slogans[sloganIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </motion.div>

              <div className="flex flex-col space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-sm font-semibold transition-all",
                        location.pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-secondary"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigation.length * 0.1 }}
                >
                  <Button className="w-full gradient-primary shadow-cta font-bold" asChild>
                    <Link to="/contacts" onClick={() => setIsMenuOpen(false)}>
                      Бесплатный аудит
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
    </>
  );
};

export default Header;
