import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCityContext } from "@/contexts/CityContext";
import { cities } from "@/config/cities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CityHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { city, isLocalPage } = useCityContext();

  const getNavigation = () => {
    const basePath = isLocalPage && city ? `/${city.slug}` : "";
    return [
      { name: "Главная", href: basePath || "/" },
      { name: "Услуги", href: "/services" },
      { name: "Кейсы", href: "/cases" },
      { name: "О нас", href: "/about" },
      { name: "Контакты", href: "/contacts" },
    ];
  };

  const navigation = getNavigation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <nav className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={isLocalPage && city ? `/${city.slug}` : "/"} className="flex items-center space-x-3 group">
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

            {/* City Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{isLocalPage && city ? city.name : "Все города"}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <span>Все города</span>
                  </Link>
                </DropdownMenuItem>
                {cities.map((c) => (
                  <DropdownMenuItem key={c.slug} asChild>
                    <Link to={`/${c.slug}`} className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{c.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
                {/* City selector for mobile */}
                <div className="px-4 py-2 mb-2">
                  <p className="text-xs text-muted-foreground mb-2">Выберите город:</p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                        !isLocalPage ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                      )}
                    >
                      Все
                    </Link>
                    {cities.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/${c.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                          city?.slug === c.slug ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                        )}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>

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
  );
};

export default CityHeader;
