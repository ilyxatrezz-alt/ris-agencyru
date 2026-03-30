import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const Footer = () => {
  const { settings, isLoading } = useSiteSettingsMap();

  // Fallback values while loading
  const phone = getSetting(settings, "phone", "+7 (949) 882-33-51");
  const phoneRaw = getSetting(settings, "phone_raw", "+79498823351");
  const email = getSetting(settings, "email", "info@ris-agency.ru");
  const telegramUrl = getSetting(settings, "telegram_url", "https://t.me/ris_agency");
  const location = getSetting(settings, "location", "Работаем по всей России");
  const companyName = getSetting(settings, "company_name", "РИС");
  const companyFullName = getSetting(settings, "company_full_name", "РИС — Реклама и Сайты");
  const companyTagline = getSetting(settings, "company_tagline", "Реклама и Сайты");
  const companyDescription = getSetting(settings, "company_description", "Превращаем рекламные бюджеты в прибыль. Работаем с 2014 года. Гарантия результата или возврат денег.");
  const legalName = getSetting(settings, "legal_name", "ИП Кузьмин А.А.");
  const legalInn = getSetting(settings, "legal_inn", "165811695515");
  const legalOgrnip = getSetting(settings, "legal_ogrnip", "314169024600232");

  return (
    <footer className="bg-accent text-accent-foreground border-t border-border/10 noise">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-cta"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <span className="text-xl font-black text-primary-foreground">{companyName}</span>
              </motion.div>
              <div>
                <span className="text-xl font-black">{companyName}</span>
                <p className="text-xs text-accent-foreground/60">{companyTagline}</p>
              </div>
            </Link>
            <p className="text-sm text-accent-foreground/70 leading-relaxed">
              {companyDescription}
            </p>
            <div className="flex items-center gap-4">
              <a 
                href={telegramUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-foreground/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Навигация</h3>
            <ul className="space-y-3">
              {[
                { name: "Главная", href: "/" },
                { name: "Услуги", href: "/services" },
                { name: "Кейсы", href: "/cases" },
                { name: "О нас", href: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-accent-foreground/70 hover:text-primary transition-colors animated-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Услуги</h3>
            <ul className="space-y-3 text-sm text-accent-foreground/70">
              <li className="hover:text-primary transition-colors cursor-pointer">Контекстная реклама</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Таргетированная реклама</li>
              <li>
                <Link to="/web-development" className="hover:text-primary transition-colors">
                  Создание сайтов
                </Link>
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">Аналитика и аудит</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-bold text-lg mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`tel:${phoneRaw}`}
                  className="flex items-center gap-3 text-sm text-accent-foreground/70 hover:text-primary transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">{phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-accent-foreground/70 hover:text-primary transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>{email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-accent-foreground/70">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>{location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-accent-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 pb-24 md:pb-0">
          <p className="text-sm text-accent-foreground/50">
            © {new Date().getFullYear()} {companyFullName}. Все права защищены.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <Link to="/privacy-policy" className="text-xs text-accent-foreground/40 hover:text-primary transition-colors underline">
              Политика обработки персональных данных
            </Link>
            <p className="text-xs text-accent-foreground/40">
              {legalName} • ИНН {legalInn} • ОГРНИП {legalOgrnip}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
