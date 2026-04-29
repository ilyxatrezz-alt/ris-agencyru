import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WebDevQuiz from "@/components/WebDevQuiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Rocket, 
  Zap, 
  Shield, 
  TrendingUp, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  Smartphone,
  Search,
  BarChart3,
  Sparkles,
  Star,
  MessageSquare,
  Phone,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Eye,
  Scale,
  Handshake,
  Target,
  Award
} from "lucide-react";
import ParallaxSection from "@/components/ParallaxSection";
import QuickCTA from "@/components/QuickCTA";
import { siteConfig } from "@/config/siteConfig";
import alexeyTokovPhoto from "@/assets/alexey-tokov.jpg";

const WebDevelopment = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const features = [
    {
      icon: Rocket,
      title: "Быстрый запуск",
      description: "Сайт готов за 3-7 дней. Никаких задержек — вы получаете работающий бизнес-инструмент в кратчайшие сроки.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Smartphone,
      title: "Адаптивный дизайн",
      description: "Идеально выглядит на любом устройстве: смартфоне, планшете, компьютере. 60% клиентов приходят с мобильных.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Search,
      title: "SEO-оптимизация",
      description: "Сайт сразу готов к продвижению в поисковиках. Правильная структура, мета-теги, скорость загрузки.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Конверсия до 15%",
      description: "Продающий дизайн и грамотная структура увеличивают конверсию посетителей в заявки в 3-5 раз.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Безопасность",
      description: "SSL-сертификат, защита от взлома, резервные копии. Ваш сайт и данные клиентов под надёжной защитой.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Zap,
      title: "Высокая скорость",
      description: "Загрузка менее 2 секунд. Быстрый сайт = больше заявок, выше позиции в Google и Яндекс.",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  const packages = [
    {
      name: "Лендинг",
      price: "от 25 000 ₽",
      description: "Одностраничный продающий сайт для одной услуги или продукта",
      features: [
        "1 продающая страница",
        "Адаптивный дизайн",
        "Форма заявки + уведомления",
        "Базовая SEO-настройка",
        "Подключение аналитики",
        "Срок: 3-5 дней",
      ],
      popular: false,
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      name: "Корпоративный",
      price: "от 60 000 ₽",
      description: "Полноценный сайт компании с каталогом услуг и портфолио",
      features: [
        "До 10 страниц",
        "Уникальный дизайн",
        "Админ-панель для управления",
        "Интеграция с CRM",
        "Расширенная SEO-оптимизация",
        "Срок: 7-14 дней",
      ],
      popular: true,
      gradient: "from-primary/30 to-accent/30",
    },
    {
      name: "Интернет-магазин",
      price: "от 130 000 ₽",
      description: "Полнофункциональный магазин с корзиной и онлайн-оплатой",
      features: [
        "Каталог до 1000 товаров",
        "Корзина и онлайн-оплата",
        "Интеграция с 1С/МойСклад",
        "Личный кабинет покупателя",
        "Полная SEO-оптимизация",
        "Срок: 14-30 дней",
      ],
      popular: false,
      gradient: "from-purple-500/20 to-pink-500/20",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Брифинг",
      description: "Изучаем ваш бизнес, конкурентов и целевую аудиторию. Составляем ТЗ и структуру сайта.",
      duration: "1 день",
    },
    {
      step: "02",
      title: "Дизайн",
      description: "Создаём макет, который продаёт. Согласовываем каждую деталь до начала разработки.",
      duration: "2-3 дня",
    },
    {
      step: "03",
      title: "Разработка",
      description: "Верстаем и программируем сайт на современных технологиях с чистым кодом.",
      duration: "3-7 дней",
    },
    {
      step: "04",
      title: "Тестирование",
      description: "Проверяем работу на всех устройствах, скорость загрузки, формы заявок.",
      duration: "1 день",
    },
    {
      step: "05",
      title: "Запуск",
      description: "Размещаем сайт на хостинге, подключаем домен, настраиваем аналитику и передаём вам.",
      duration: "1 день",
    },
  ];

  const stats = [
    { value: "200+", label: "Сайтов создано", icon: Globe },
    { value: "98%", label: "Довольных клиентов", icon: Star },
    { value: "3 дня", label: "Минимальный срок", icon: Clock },
    { value: "10 лет", label: "Опыт работы", icon: Users },
  ];

  const testimonials = [
    {
      text: "Сайт окупился за первый месяц! Заявки пошли уже на следующий день после запуска. Рекомендую РИС всем знакомым предпринимателям.",
      author: "Алексей Петров",
      position: "Владелец строительной компании",
      rating: 5,
    },
    {
      text: "Наконец-то нашли команду, которая понимает что нужно бизнесу. Сделали сайт быстро, качественно, и главное — он приносит клиентов.",
      author: "Марина Соколова",
      position: "Директор клиники красоты",
      rating: 5,
    },
    {
      text: "Третий сайт заказываю у РИС. Всё как всегда: в срок, без лишних вопросов, результат превосходит ожидания.",
      author: "Дмитрий Козлов",
      position: "Владелец сети ресторанов",
      rating: 5,
    },
  ];

  // Portfolio cases
  const portfolioCases = [
    {
      id: "bioline",
      title: "Био-Лайн",
      subtitle: "Крупнейшая медицинская лаборатория ДНР и ЛНР",
      url: "https://bioline-med.ru/",
      category: "Медицина",
      description: "Разработали современный сайт для медицинского центра с функционалом записи на анализы, онлайн-просмотром результатов и интеграцией с лабораторной системой.",
      images: [
        "/images/case-bioline-1.png",
        "/images/case-bioline-2.png",
        "/images/case-bioline-3.png",
      ],
    },
    {
      id: "prokat",
      title: "Аренда Техники",
      subtitle: "Крупнейший арендатор строительной техники в Донецке",
      url: "https://prokat-donetsk.ru/",
      category: "Аренда / Стройка",
      description: "Создали каталог с 500+ позициями техники, фильтрами, корзиной и системой онлайн-заказа. Удобный интерфейс для аренды и продажи оборудования.",
      images: [
        "/images/case-prokat-1.png",
        "/images/case-prokat-2.png",
        "/images/case-prokat-3.png",
      ],
    },
    {
      id: "rave",
      title: "Rave Delivery",
      subtitle: "Сеть ресторанов Rave Burger и AsiaBar в Донецке",
      url: "https://ravedelivery.ru/",
      category: "HoReCa / Доставка",
      description: "Разработали сайт доставки еды с красивым меню, корзиной, онлайн-оплатой и интеграцией с кухней. Современный дизайн в стиле бренда.",
      images: [
        "/images/case-rave-1.png",
        "/images/case-rave-2.png",
        "/images/case-rave-3.png",
        "/images/case-rave-4.png",
      ],
    },
    {
      id: "sushitoria",
      title: "Сушитория",
      subtitle: "Старейшая доставка роллов в Донецке",
      url: "https://sushitoria-dnr.ru/",
      category: "HoReCa / Доставка",
      description: "Создали интернет-магазин для одной из первых служб доставки японской кухни в республике. Полный функционал заказа, корзина, личный кабинет с историей заказов.",
      images: [
        "/images/case-sushi-1.png",
        "/images/case-sushi-2.png",
        "/images/case-sushi-3.png",
      ],
    },
    {
      id: "paa",
      title: "PAA Shop",
      subtitle: "Project Anti-Aging — магазин пептидов для США",
      url: "https://paashop.online/",
      category: "E-commerce / USA",
      description: "Разработали технологичный интернет-магазин для американского рынка. Премиальный дизайн, интеграция с платёжными системами США, мультивалютность.",
      images: [
        "/images/case-paa-1.png",
        "/images/case-paa-2.png",
      ],
    },
    {
      id: "randm",
      title: "R&M Beauty Style",
      subtitle: "Сеть салонов красоты в Техасе, США",
      url: "https://randmbeautystyle.com/",
      category: "Красота / USA",
      description: "Создали сайт для сети салонов в Plano и Waco, штат Техас. Калькулятор услуг, онлайн-запись, интеграция с рекламными кампаниями.",
      images: [
        "/images/case-randm-1.png",
        "/images/case-randm-2.png",
      ],
    },
    {
      id: "ffc",
      title: "Future Fitness Club",
      subtitle: "EMS-тренажёры нового поколения",
      url: "#",
      category: "Фитнес / Спорт",
      description: "Разработали рейтинговый сайт для компании EMS-тренажёров. Каталог продукции, сравнение моделей, интеграция с системой заказов.",
      images: [
        "/images/case-ffc-1.png",
      ],
    },
    {
      id: "nikaten",
      title: "НИКАТЭН ДНР",
      subtitle: "Официальный дилер керамических панелей НИКАТЭН",
      url: "https://nikaten-dnr.ru/",
      category: "Отопление / Продажи",
      description: "Создали интернет-магазин для дилера керамических панелей отопления. Каталог с фильтрами по мощности, калькулятор расхода электричества, корзина и онлайн-заказ.",
      images: [
        "/images/case-nikaten-1.png",
        "/images/case-nikaten-2.png",
        "/images/case-nikaten-3.png",
      ],
    },
    {
      id: "220volt",
      title: "220 Вольт",
      subtitle: "Служба срочного вызова электрика в Донецке",
      url: "https://220volt-dnr.ru/",
      category: "Услуги / Электрика",
      description: "Разработали продающий лендинг для службы электриков с быстрым откликом. Формы заявки, калькулятор стоимости работ, срочный вызов 24/7.",
      images: [
        "/images/case-220volt-1.png",
        "/images/case-220volt-2.png",
      ],
    },
  ];

  const [selectedCase, setSelectedCase] = useState<typeof portfolioCases[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (caseItem: typeof portfolioCases[0], imageIndex: number = 0) => {
    setSelectedCase(caseItem);
    setCurrentImageIndex(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedCase(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedCase) {
      setCurrentImageIndex((prev) => 
        prev === selectedCase.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedCase) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedCase.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Создание сайтов в Донецке под ключ — РИС | Лендинги, корпоративные сайты, интернет-магазины</title>
        <meta 
          name="description" 
          content="Создание сайтов в Донецке и ДНР за 3-7 дней. Лендинги от 25 000 ₽, корпоративные сайты, интернет-магазины. Веб-студия РИС — 200+ проектов, адаптивный дизайн, SEO-оптимизация." 
        />
        <meta name="keywords" content="создание сайтов Донецк, разработка сайтов ДНР, лендинг Донецк, интернет-магазин Донецк, веб-студия Донецк, сайт под ключ Донецк" />
      </Helmet>

      <Header />

      <main ref={containerRef} className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-primary/10 via-transparent to-transparent animate-pulse" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-accent/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
            
            {/* Floating elements */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <motion.div 
            className="container mx-auto px-4 relative z-10"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  Создаём сайты, которые продают
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Сайт, который{" "}
                <span className="relative">
                  <span className="text-gradient-primary">приносит клиентов</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
                {" "}каждый день
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Разрабатываем продающие сайты за 3-7 дней. 
                Современный дизайн, быстрая загрузка, высокая конверсия. 
                <span className="text-primary font-semibold"> 200+ успешных проектов</span>
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Button
                  size="lg"
                  className="gradient-primary shadow-cta hover:shadow-glow text-lg px-8 py-6 group"
                  asChild
                >
                  <Link to="/contacts">
                    Получить предложение
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 hover:bg-secondary"
                  asChild
                >
                  <a href="tel:+79490215151">
                    <Phone className="mr-2 w-5 h-5" />
                    +7 (949) 021-51-51
                  </a>
                </Button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="flex flex-wrap gap-6 justify-center pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {[
                  "✓ Гарантия результата",
                  "✓ Оплата по факту",
                  "✓ Бесплатная поддержка 30 дней",
                ].map((badge, i) => (
                  <span key={i} className="text-sm text-muted-foreground font-medium">
                    {badge}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

        </section>

        {/* Stats Ticker */}
        <section className="py-6 border-y border-border/30 bg-secondary/30 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap md:flex-nowrap">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2.5 group cursor-default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <stat.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-lg md:text-xl font-black text-foreground leading-tight">
                      {stat.value}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium leading-tight">
                      {stat.label}
                    </span>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="hidden md:block w-px h-8 bg-border/50 ml-3" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Developer — Алексей Токов */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary via-accent to-primary rounded-3xl blur-2xl opacity-30" />
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent rounded-3xl" />
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={alexeyTokovPhoto}
                      alt="Алексей Токов — ведущий разработчик сайтов в РИС"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="absolute -bottom-6 -right-2 md:-right-6 bg-card border border-border shadow-2xl rounded-2xl p-4 flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Опыт</div>
                      <div className="text-lg font-black">10+ лет</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="absolute -top-4 -left-2 md:-left-6 bg-card border border-border shadow-2xl rounded-2xl p-4 flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Проектов</div>
                      <div className="text-lg font-black">200+</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Знакомьтесь
                </span>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                  Алексей <span className="text-gradient-primary">Токов</span>
                </h2>

                <p className="text-xl text-muted-foreground font-medium">
                  Ведущий разработчик сайтов в РИС
                </p>

                <p className="text-lg text-foreground/80 leading-relaxed">
                  Каждый сайт, который вы видите в портфолио ниже — это моя работа.
                  Я не «студия из 100 человек», а конкретный человек, который сам
                  садится за код и доводит проект до результата. От первого экрана
                  до последней кнопки — отвечаю лично.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Сам пишу код — без посредников",
                    "На связи с понедельника по субботу",
                    "Знаю, как сайт превращается в заявки",
                    "Делаю долго работающие проекты",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    size="lg"
                    className="gradient-primary shadow-cta hover:shadow-glow group"
                    asChild
                  >
                    <Link to="/contacts">
                      Обсудить проект с Алексеем
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2"
                    asChild
                  >
                    <a href="https://t.me/manager_ris" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 w-5 h-5" />
                      Написать в Telegram
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Portfolio Cases Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Наши работы
              </span>
              <h2 className="text-3xl md:text-5xl font-black mt-4 mb-6">
                Сайты, которые мы{" "}
                <span className="text-gradient-primary">создали</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Реальные проекты для бизнеса в разных нишах. Нажмите на карточку, чтобы посмотреть подробнее.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {portfolioCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(caseItem)}
                >
                  <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={caseItem.images[0]}
                        alt={caseItem.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          {caseItem.images.slice(0, 4).map((img, i) => (
                            <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white/50">
                              <img src={img} alt="" className="w-full h-full object-cover object-top" />
                            </div>
                          ))}
                          {caseItem.images.length > 4 && (
                            <div className="w-12 h-12 rounded-lg bg-black/50 border-2 border-white/50 flex items-center justify-center text-white text-sm font-bold">
                              +{caseItem.images.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                          {caseItem.category}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                            {caseItem.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {caseItem.subtitle}
                          </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {caseItem.description}
                      </p>
                      <a 
                        href={caseItem.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline"
                      >
                        Посмотреть сайт
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <QuickCTA variant="gradient" text="Хотите такой же сайт?" phone="+7 (949) 021-51-51" phoneRaw="+79490215151" telegramUrl="https://t.me/manager_ris" />
          </div>
        </section>

        {/* Interactive Quiz */}
        <WebDevQuiz />

        {/* Testimonials Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Отзывы клиентов
              </span>
              <h2 className="text-3xl md:text-5xl font-black mt-4 mb-6">
                Нам{" "}
                <span className="text-gradient-primary">доверяют</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 hover:shadow-lg transition-all">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic">
                        "{testimonial.text}"
                      </p>
                      <div className="pt-4 border-t">
                        <div className="font-bold">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <QuickCTA variant="compact" text="Хотите такой же результат?" phone="+7 (949) 021-51-51" phoneRaw="+79490215151" telegramUrl="https://t.me/manager_ris" />
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Наш подход
              </span>
              <h2 className="text-3xl md:text-5xl font-black mt-4 mb-6">
                Наши{" "}
                <span className="text-gradient-primary">принципы</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Ценности, которые лежат в основе каждого нашего проекта
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Eye,
                  title: "Прозрачность",
                  description: "Вы всегда знаете, на что тратится каждый рубль. Никаких скрытых платежей, подводных камней и мелкого шрифта. Открытый диалог на каждом этапе.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Heart,
                  title: "Честность",
                  description: "Мы не обещаем невозможного. Если видим, что проект требует доработки — скажем прямо. Лучше горькая правда, чем сладкая ложь.",
                  gradient: "from-red-500 to-pink-500",
                },
                {
                  icon: Scale,
                  title: "Справедливость",
                  description: "Честные цены за реальную работу. Мы не завышаем стоимость и не экономим на качестве. Баланс цены и результата — наш приоритет.",
                  gradient: "from-amber-500 to-orange-500",
                },
                {
                  icon: Handshake,
                  title: "Партнёрство",
                  description: "Мы не просто подрядчики — мы ваши партнёры. Нам важен успех вашего бизнеса, потому что ваш рост — это и наш рост.",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: Target,
                  title: "Результативность",
                  description: "Красивый сайт — это хорошо, но нам важнее, чтобы он приносил вам клиентов и деньги. Каждое решение подчинено результату.",
                  gradient: "from-purple-500 to-violet-500",
                },
                {
                  icon: Award,
                  title: "Ответственность",
                  description: "Мы отвечаем за каждый проект. Гарантия на все работы, бесплатная поддержка и оперативное решение любых вопросов после запуска.",
                  gradient: "from-indigo-500 to-blue-500",
                },
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                    <CardContent className="p-6 space-y-4">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${principle.gradient} shadow-lg`}>
                        <principle.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {principle.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {principle.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Как мы работаем
              </span>
              <h2 className="text-3xl md:text-5xl font-black mt-4 mb-6">
                От идеи до{" "}
                <span className="text-gradient-primary">готового сайта</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Простой и прозрачный процесс. Вы всегда знаете, на каком этапе находится проект.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative flex gap-6 pb-12 last:pb-0"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {index !== process.length - 1 && (
                    <div className="absolute left-[27px] top-14 w-0.5 h-[calc(100%-3.5rem)] bg-gradient-to-b from-primary to-primary/20" />
                  )}
                  
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-lg shadow-cta">
                    {step.step}
                  </div>
                  
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <span className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <QuickCTA variant="gradient" text="Готовы начать проект?" phone="+7 (949) 021-51-51" phoneRaw="+79490215151" telegramUrl="https://t.me/manager_ris" />
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-24 bg-secondary/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Тарифы
              </span>
              <h2 className="text-3xl md:text-5xl font-black mt-4 mb-6">
                Выберите свой{" "}
                <span className="text-gradient-primary">идеальный сайт</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Прозрачные цены без скрытых платежей. Вы платите только за результат.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={`relative ${pkg.popular ? "md:-mt-4 md:mb-4" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-bold rounded-full shadow-cta">
                        Популярный выбор
                      </span>
                    </div>
                  )}
                  <Card className={`h-full border-2 ${pkg.popular ? "border-primary shadow-xl" : "border-border/50"}`}>
                    <div className={`h-2 bg-gradient-to-r ${pkg.gradient}`} />
                    <CardContent className="p-8 space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold">{pkg.name}</h3>
                        <p className="text-muted-foreground mt-2">{pkg.description}</p>
                      </div>
                      <div>
                        <span className="text-4xl font-black text-primary">{pkg.price}</span>
                      </div>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${pkg.popular ? "gradient-primary shadow-cta" : ""}`}
                        variant={pkg.popular ? "default" : "outline"}
                        size="lg"
                        asChild
                      >
                        <Link to="/contacts">Заказать</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick CTA */}
            <div className="text-center pt-12">
              <QuickCTA text="Не нашли подходящий тариф?" phone="+7 (949) 021-51-51" phoneRaw="+79490215151" telegramUrl="https://t.me/manager_ris" />
            </div>
          </div>
        </section>


        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedCase && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              {/* Close button - fixed position with high visibility */}
              <button
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                className="fixed top-4 right-4 z-[60] w-14 h-14 rounded-full bg-black/80 hover:bg-black flex items-center justify-center transition-colors border-2 border-white/40 shadow-xl"
              >
                <X className="w-8 h-8 text-white" />
              </button>

              <div className="min-h-screen flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>
                {/* Image section - takes full width on mobile */}
                <div className="relative w-full md:w-1/2 lg:w-3/5 bg-black flex flex-col">
                  {/* Main image container */}
                  <div className="relative flex-1 min-h-[50vh] md:min-h-screen flex items-center justify-center p-4">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedCase.images[currentImageIndex]}
                      alt={selectedCase.title}
                      className="max-w-full max-h-[60vh] md:max-h-[80vh] object-contain rounded-lg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Navigation arrows - larger touch targets */}
                    {selectedCase.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center transition-colors border border-white/20"
                        >
                          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center transition-colors border border-white/20"
                        >
                          <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnail strip - horizontal scrollable on mobile */}
                  <div className="p-4 bg-black/50">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {selectedCase.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                          className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            i === currentImageIndex 
                              ? "border-primary ring-2 ring-primary/50" 
                              : "border-white/20 hover:border-white/50"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover object-top" />
                        </button>
                      ))}
                    </div>
                    
                    {/* Image counter */}
                    <div className="text-center mt-2 text-white/60 text-sm">
                      {currentImageIndex + 1} / {selectedCase.images.length}
                    </div>
                  </div>
                </div>

                {/* Info panel */}
                <div className="w-full md:w-1/2 lg:w-2/5 bg-card p-6 md:p-8 space-y-6 md:overflow-y-auto md:max-h-screen">
                  <div>
                    <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                      {selectedCase.category}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black">{selectedCase.title}</h3>
                    <p className="text-base md:text-lg text-muted-foreground mt-2">{selectedCase.subtitle}</p>
                  </div>
                  
                  <p className="text-muted-foreground text-sm md:text-base">
                    {selectedCase.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button size="lg" className="gradient-primary flex-1" asChild>
                      <a href={selectedCase.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 w-4 h-4" />
                        Открыть сайт
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1" asChild>
                      <Link to="/contacts">
                        Заказать такой же
                      </Link>
                    </Button>
                  </div>

                  {/* Quick contact on mobile */}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Обсудить проект:</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href="https://t.me/manager_ris" target="_blank" rel="noopener noreferrer">
                          <MessageSquare className="mr-2 w-4 h-4" />
                          Telegram
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href="tel:+79490215151">
                          <Phone className="mr-2 w-4 h-4" />
                          Позвонить
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-90" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                  Готовы получить сайт, который продаёт?
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Оставьте заявку сейчас и получите бесплатный аудит вашего текущего сайта 
                  или коммерческое предложение по созданию нового
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 font-bold shadow-lg"
                  asChild
                >
                  <Link to="/contacts">
                    <MessageSquare className="mr-2 w-5 h-5" />
                    Получить предложение
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 font-bold transition-all"
                  asChild
                >
                  <a href="https://t.me/manager_ris" target="_blank" rel="noopener noreferrer">
                    Написать в Telegram
                  </a>
                </Button>
              </motion.div>

              <motion.p
                className="text-white/60 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Ответим в течение 30 минут в рабочее время
              </motion.p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default WebDevelopment;
