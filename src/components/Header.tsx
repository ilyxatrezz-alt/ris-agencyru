import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, FolderOpen, Users, Phone, Globe } from "lucide-react";
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

const mobileNav = [
  { name: "Главная", href: "/", icon: Home },
  { name: "Услуги", href: "/services", icon: Briefcase },
  { name: "Сайты", href: "/web-development", icon: Globe, center: true },
  { name: "Кейсы", href: "/cases", icon: FolderOpen },
  { name: "Контакты", href: "/contacts", icon: Phone },
];

const Header = () => {
  const [sloganIndex, setSloganIndex] = useState(0);
  const location = useLocation();
  const { settings } = useSiteSettingsMap();

  const garlandEnabled = getSetting(settings, "effects_garland_enabled", "false") === "true";
  const bannerEnabled = getSetting(settings, "effects_banner_enabled", "false") === "true";
  const bannerText = getSetting(settings, "effects_banner_text", "");

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

      {/* Mobile Bottom Tab Bar — editorial, compact */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-[0_10px_40px_-12px_hsl(0_0%_0%/0.18)]">
          <nav className="flex items-stretch justify-around h-16 px-1">
            {mobileNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              const isCenter = item.center;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex flex-col items-center justify-center flex-1 relative gap-0.5"
                >
                  <motion.div
                    whileTap={{ scale: 0.88 }}
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-xl transition-colors",
                      isCenter
                        ? "bg-primary text-primary-foreground shadow-[0_4px_14px_-2px_hsl(var(--primary)/0.45)]"
                        : isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/60"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={isActive || isCenter ? 2.4 : 1.9} />
                  </motion.div>
                  <span className={cn(
                    "text-[10px] leading-none tracking-wide",
                    isActive ? "font-bold text-foreground" : "font-medium text-foreground/55"
                  )}>
                    {item.name}
                  </span>
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
