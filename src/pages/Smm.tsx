import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickContact from "@/components/QuickContact";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Share2, Users, TrendingUp, BarChart3, Camera, MessageCircle,
  Target, Megaphone, CheckCircle, ArrowRight, ExternalLink, Star,
  Heart, Eye, UserPlus
} from "lucide-react";

const caseStudy = {
  name: "Гипермаркет ПАНДА",
  location: "Донецк",
  vk: "https://vk.com/panda_dpr",
  description: "Ведение сообщества ВКонтакте для гипермаркета одежды, обуви и товаров для дома. Полный цикл: контент-план, дизайн, публикации, вовлечение аудитории.",
  results: [
    { label: "Подписчики", value: "5 900+", icon: UserPlus },
    { label: "Охват постов", value: "15 000+", icon: Eye },
    { label: "Вовлечённость", value: "+340%", icon: Heart },
    { label: "Публикации/мес", value: "30+", icon: Camera },
  ],
  images: [
    "/images/case-smm-panda-1.jpg",
    "/images/case-smm-panda-2.jpg",
  ],
};

const smmServices = [
  {
    title: "Ведение соцсетей",
    description: "Контент-план, дизайн постов, сторис, публикации по графику. ВКонтакте, Telegram, Instagram*.",
    icon: Share2,
  },
  {
    title: "Таргетированная реклама",
    description: "Настройка и ведение рекламных кампаний в VK ADS, привлечение подписчиков и клиентов.",
    icon: Target,
  },
  {
    title: "Контент-маркетинг",
    description: "Фото и видео-съёмка, копирайтинг, визуальная концепция бренда в соцсетях.",
    icon: Camera,
  },
  {
    title: "Комьюнити-менеджмент",
    description: "Работа с комментариями, отзывами, модерация. Живое взаимодействие с аудиторией.",
    icon: MessageCircle,
  },
  {
    title: "Аналитика и отчёты",
    description: "Ежемесячные отчёты по охватам, вовлечённости, росту аудитории и конверсиям.",
    icon: BarChart3,
  },
  {
    title: "Продвижение мероприятий",
    description: "Анонсы открытий, акций, распродаж. Создание ажиотажа и вирусного эффекта.",
    icon: Megaphone,
  },
];

const tariffs = [
  {
    name: "Старт",
    price: "от 25 000 ₽",
    features: ["12 постов/мес", "Дизайн постов", "1 соцсеть", "Ежемесячный отчёт"],
    popular: false,
  },
  {
    name: "Бизнес",
    price: "от 45 000 ₽",
    features: ["20 постов/мес", "Сторис + Reels", "2 соцсети", "Таргет VK ADS", "Комьюнити-менеджмент", "Еженедельный отчёт"],
    popular: true,
  },
  {
    name: "Премиум",
    price: "от 80 000 ₽",
    features: ["30+ постов/мес", "Фото/видео-съёмка", "3+ соцсети", "Полная таргет-стратегия", "Инфлюенсер-маркетинг", "Персональный менеджер"],
    popular: false,
  },
];

const Smm = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>SMM продвижение в Донецке — Агентство РИС | Ведение соцсетей, таргетолог Донецк</title>
        <meta name="description" content="SMM продвижение в Донецке и ДНР. Таргетолог, ведение ВКонтакте и Telegram, контент-маркетинг, таргетированная реклама. Кейс: Гипермаркет ПАНДА — 5900+ подписчиков." />
        <meta name="keywords" content="SMM Донецк, таргетолог Донецк, ведение соцсетей Донецк, таргетированная реклама ДНР, SMM продвижение ДНР, реклама ВКонтакте Донецк" />
      </Helmet>
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-pink-950/20 to-zinc-950" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />

          {/* Floating orbs */}
          <motion.div
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(330 80% 50% / 0.15), transparent 60%)" }}
            animate={{ x: [-30, 30, -30], y: [-20, 40, -20] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container relative z-10 mx-auto px-4 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm font-bold mb-6"
                animate={{ boxShadow: ["0 0 0 0 hsl(330 80% 50% / 0.3)", "0 0 0 10px hsl(330 80% 50% / 0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Share2 className="h-4 w-4" />
                SMM Продвижение
              </motion.span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6">
                Ваш бренд —{" "}
                <span className="text-gradient-primary">в каждой ленте</span>
              </h1>

              <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
                Создаём контент, который продаёт. Ведём соцсети так, чтобы подписчики становились клиентами.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary shadow-cta text-lg h-14 px-8 font-bold">
                  <Link to="/contacts">
                    Обсудить проект <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-zinc-700 bg-zinc-800/50 text-white hover:bg-zinc-800 text-lg h-14 px-8">
                  <a href="#case">Смотреть кейс ↓</a>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        <QuickContact />

        {/* Services Grid */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Что мы делаем
              </span>
              <h2 className="text-3xl md:text-5xl font-black">
                Полный цикл <span className="text-gradient-primary">SMM</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {smmServices.map((service, i) => (
                <motion.div
                  key={i}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover-lift"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <QuickContact />

        {/* Case Study — PANDA */}
        <section id="case" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-semibold mb-4">
                Кейс
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                {caseStudy.name} — <span className="text-gradient-primary">{caseStudy.location}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{caseStudy.description}</p>
            </motion.div>

            {/* Results */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {caseStudy.results.map((r, i) => (
                <motion.div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-card border border-border"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <r.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                  <div className="text-2xl sm:text-3xl font-black text-primary">{r.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{r.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Screenshots */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {caseStudy.images.map((img, i) => (
                <motion.div
                  key={i}
                  className="rounded-2xl overflow-hidden border border-border shadow-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <img
                    src={img}
                    alt={`Кейс ${caseStudy.name} — скриншот ${i + 1}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>

            {/* VK Link */}
            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href={caseStudy.vk} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Посмотреть сообщество ВКонтакте
                </a>
              </Button>
            </div>
          </div>
        </section>

        <QuickContact />

        {/* Tariffs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Тарифы
              </span>
              <h2 className="text-3xl md:text-5xl font-black">
                Выберите <span className="text-gradient-primary">свой план</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tariffs.map((tariff, i) => (
                <motion.div
                  key={i}
                  className={`relative p-7 rounded-2xl border ${
                    tariff.popular 
                      ? "border-primary/50 bg-gradient-to-b from-primary/5 to-transparent shadow-card-hover" 
                      : "border-border bg-card"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  {tariff.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-white text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Популярный
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-2">{tariff.name}</h3>
                  <div className="text-3xl font-black text-primary mb-6">{tariff.price}</div>

                  <ul className="space-y-3 mb-8">
                    {tariff.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full ${tariff.popular ? "gradient-primary shadow-cta" : ""}`}
                    variant={tariff.popular ? "default" : "outline"}
                  >
                    <Link to="/contacts">Оставить заявку</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <QuickContact />
      </main>

      <Footer />
    </div>
  );
};

export default Smm;
