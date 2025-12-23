import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";
import GarlandLights from "./GarlandLights";
import HolidayBanner from "./HolidayBanner";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSiteSettingsMap();
  
  const garlandEnabled = getSetting(settings, "effects_garland_enabled", "true") === "true";
  const bannerEnabled = getSetting(settings, "effects_banner_enabled", "true") === "true";
  const bannerText = getSetting(settings, "effects_banner_text", "С Новым 2025 годом! 🎄 Желаем успехов и процветания вашему бизнесу!");

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
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 relative">
        {garlandEnabled && <GarlandLights />}
      <div className="container mx-auto px-4">
        <nav className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-cta"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-black text-primary-foreground">РИС</span>
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors">РИС</span>
              <p className="text-[10px] text-muted-foreground leading-tight">Реклама и Сайты</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
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
