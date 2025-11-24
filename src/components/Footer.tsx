import { Link } from "react-router-dom";
import { Target, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <Target className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">G-TARGET</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Digital-реклама и сайты с гарантией результата. Работаем с 2014 года.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-base">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-base">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/cases" className="hover:text-primary transition-base">
                  Кейсы
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-base">
                  О нас
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Контекстная реклама</li>
              <li>Таргетированная реклама</li>
              <li>Создание сайтов</li>
              <li>Аналитика и аудит</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+7 (XXX) XXX-XX-XX</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>info@g-target.ru</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Россия</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} G-TARGET. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
