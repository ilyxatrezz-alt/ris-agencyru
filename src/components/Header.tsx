import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, FolderOpen, Users, Phone } from "lucide-react";
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

const navigation = [
  { name: "Главная", href: "/", icon: Home },
  { name: "Услуги", href: "/services", icon: Briefcase },
  { name: "Кейсы", href: "/cases", icon: FolderOpen },
  { name: "О нас", href: "/about", icon: Users },
  { name: "Контакты", href: "/contacts", icon: Phone },
];

const Header = () => {
  const [sloganIndex, setSloganIndex] = useState(0);
  const location = useLocation();
  const { settings } = useSiteSettingsMap();

  const garlandEnabled = getSetting(settings, "effects_garland_enabled", "true") === "true";
  const bannerEnabled = getSetting(settings, "effects_banner_enabled", "true") === "true";
  const bannerText = getSetting(settings, "effects_banner_text", "С Новым 2026 годом! 🎄 Желаем успехов и процветания вашему бизнесу!");

  useEffect(() => {
    const interval = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {bannerEnabled && <HolidayBanner text={bannerText} />}

      {/* Desktop + Mobile top header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 relative overflow-visible">
        {garlandEnabled && <GarlandLights />}
        <div className="container mx-auto px-4">
          <nav className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <motion.div
                className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <img
                  src={risIcon}
                  alt="РИС"
                  className="w-full h-full object-contain drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                />
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

            {/* Center slogan */}
            <div className="flex flex-1 justify-center items-center overflow-hidden mx-2 sm:mx-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sloganIndex}
                  className="flex items-center gap-1.5 sm:gap-2"
                  initial={{ opacity: 0, y: 24, filter: "blur(12px)", scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, y: -24, filter: "blur(12px)", scale: 0.85 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.span
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary shrink-0"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 hsl(var(--primary) / 0.6)",
                        "0 0 0 6px hsl(var(--primary) / 0)",
                        "0 0 0 0 hsl(var(--primary) / 0.6)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-muted-foreground tracking-wide whitespace-nowrap">
                    {slogans[sloganIndex].split("").map((char, i) => (
                      <motion.span
                        key={`${sloganIndex}-${i}`}
                        className="inline-block"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.4 }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </span>
                  <motion.span
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary shrink-0"
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
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-background/95 backdrop-blur-2xl border-t-2 border-primary/20 px-3 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_30px_-4px_hsl(0_0%_0%/0.15)]">
          <nav className="flex items-stretch justify-around h-20">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex flex-col items-center justify-center flex-1 relative py-2"
                >
                  {isActive && (
                    <motion.div
                      className="absolute top-0 inset-x-0 mx-auto w-12 h-[3px] rounded-b-full bg-primary shadow-[0_2px_12px_hsl(var(--primary)/0.5)]"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "flex flex-col items-center gap-1.5 transition-all duration-200",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200",
                      isActive ? "bg-primary/10" : ""
                    )}>
                      <Icon 
                        className={cn("h-6 w-6", isActive && "drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)]")} 
                        strokeWidth={isActive ? 2.5 : 1.8} 
                      />
                    </div>
                    <span className={cn(
                      "text-[11px] leading-none tracking-wide",
                      isActive ? "font-extrabold" : "font-semibold"
                    )}>
                      {item.name}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
