import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
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
                <span className="text-xl font-black text-primary-foreground">РИС</span>
              </motion.div>
              <div>
                <span className="text-xl font-black">РИС</span>
                <p className="text-xs text-accent-foreground/60">Реклама и Сайты</p>
              </div>
            </Link>
            <p className="text-sm text-accent-foreground/70 leading-relaxed">
              Превращаем рекламные бюджеты в прибыль. Работаем с 2014 года. 
              Гарантия результата или возврат денег.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://t.me/ris_agency" 
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
              <li className="hover:text-primary transition-colors cursor-pointer">Создание сайтов</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Аналитика и аудит</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-bold text-lg mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+79493388689" 
                  className="flex items-center gap-3 text-sm text-accent-foreground/70 hover:text-primary transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">+7 (949) 338-86-89</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@ris-agency.ru" 
                  className="flex items-center gap-3 text-sm text-accent-foreground/70 hover:text-primary transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>info@ris-agency.ru</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-accent-foreground/70">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Работаем по всей России</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-accent-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-accent-foreground/50">
            © {new Date().getFullYear()} РИС — Реклама и Сайты. Все права защищены.
          </p>
          <p className="text-xs text-accent-foreground/40">
            ИП Иванов И.И. • ИНН 000000000000 • ОГРНИП 000000000000000
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
