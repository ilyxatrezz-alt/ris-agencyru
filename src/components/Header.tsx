import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "/services" },
    { name: "Кейсы", href: "/cases" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <Target className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">G-TARGET</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-base",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="cta" size="lg" className="ml-4" asChild>
              <Link to="/contacts">Получить аудит</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
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
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-base",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="cta" className="w-full" asChild>
                <Link to="/contacts" onClick={() => setIsMenuOpen(false)}>
                  Получить аудит
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
