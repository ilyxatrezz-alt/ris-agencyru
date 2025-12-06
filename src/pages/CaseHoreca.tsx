import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
import { ArrowLeft, TrendingUp, Users, DollarSign, Calendar, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CaseHoreca = () => {
  const cases = [
    {
      title: "Доставка суши — 2 340 заказов за месяц",
      platform: "Яндекс.Директ (РСЯ + Поиск)",
      problem: "Агрегаторы пожирали 30% маржи. Яндекс.Еда и Delivery Club забирали львиную долю заказов. Собственный сайт генерировал жалкие 15%. Бизнес работал на агрегаторов, а не на себя.",
      solution: "Агрессивная атака на брендовые запросы конкурентов. Акция 'Закажи напрямую — ролл в подарок'. РСЯ с геотаргетингом в радиусе доставки. Показы в обеденное и вечернее время. Доля прямых заказов выросла до 67%.",
      results: {
        budget: "127 000 ₽",
        period: "1 месяц",
        leads: "2 340 заказов",
        cpl: "54 ₽",
        roi: "+245%",
      },
    },
    {
      title: "Грузинский ресторан — 1 200 гостей на открытие",
      platform: "ВКонтакте + Яндекс.Директ",
      problem: "Новый ресторан в спальнике без имени и репутации. Ноль базы, ноль узнаваемости. Нужно было взорвать старт и запустить сарафан, иначе провал.",
      solution: "Тизерная кампания за 2 недели до открытия: 'Скоро в вашем районе'. Бомба в день открытия — 'Хинкали за 1₽' (5 шт. на гостя). Таргет на жителей в радиусе 3 км. Результат — очередь на улице в первый день.",
      results: {
        budget: "89 000 ₽",
        period: "1.5 месяца",
        leads: "1 200 посещений",
        cpl: "74 ₽",
        roi: "+198%",
      },
    },
    {
      title: "Кофейни to-go — Рост выручки на 85%",
      platform: "ВКонтакте (Таргет)",
      problem: "5 точек в бизнес-центрах. Пандемия и удалёнка убили трафик. Офисные сотрудники исчезли. Выручка упала на 60%. Владелец думал закрываться.",
      solution: "Разворот позиционирования на 'кофе по дороге'. Таргет на жителей ближайших домов с утренним временем показа (7:00-10:00). Программа лояльности '6-й кофе бесплатно' через Telegram-бота. Новая аудитория компенсировала потери.",
      results: {
        budget: "45 000 ₽",
        period: "2 месяца",
        leads: "890 клиентов",
        cpl: "51 ₽",
        roi: "+185%",
      },
    },
    {
      title: "Банкетный зал — 34 свадьбы за сезон",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Зал на 120 человек простаивал. Корпоративы давали копейки. Свадьбы — золотая жила, но заявок почти не было. Сезон уходил впустую.",
      solution: "Отдельный лендинг для свадеб: виртуальный тур, примеры оформления, калькулятор банкета. Поиск на 'свадьба под ключ', 'банкетный зал свадьба'. Ретаргетинг на посетителей свадебных порталов. Сезон закрыт на 95%.",
      results: {
        budget: "156 000 ₽",
        period: "4 месяца",
        leads: "89 заявок",
        cpl: "1 752 ₽",
        roi: "+320%",
      },
    },
    {
      title: "Корпоративный кейтеринг — 4.2 млн ₽ контрактов",
      platform: "ВКонтакте + LinkedIn",
      problem: "Хотели захватить B2B-рынок, но без портфолио и связей. Кейтеринг для офисов — закрытый клуб. Двери не открывались.",
      solution: "Таргет на HR-директоров, офис-менеджеров, организаторов мероприятий. Кейсы 'было-стало' с фото и отзывами. Бесплатная дегустация для компаний 50+ человек. Lead Ads для быстрого захвата. Портфель клиентов вырос в 5 раз.",
      results: {
        budget: "78 000 ₽",
        period: "3 месяца",
        leads: "42 контракта",
        cpl: "1 857 ₽",
        roi: "+280%",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <motion.div
            className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/cases" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Все кейсы
              </Link>
            </motion.div>
            <motion.div 
              className="max-w-4xl space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold">
                Рестораны & <span className="text-gradient-primary">HoReCa</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Полные залы, очереди на доставку, забитые банкетные книги. Превращаем рекламный бюджет в поток гостей.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b border-border/50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                { value: "4 500+", label: "Заказов/посещений", icon: Users },
                { value: "от 51₽", label: "Минимальный CPL", icon: Target },
                { value: "+320%", label: "Максимальный ROI", icon: TrendingUp, accent: true },
                { value: "5", label: "Успешных проектов", icon: Zap },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-4 rounded-xl bg-card/50 border border-border/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.accent ? 'text-accent' : 'text-primary'}`} />
                  <div className={`text-2xl md:text-3xl font-bold ${stat.accent ? 'text-accent' : 'text-primary'}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Website Screenshots - REELS Донецк */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 text-center">
                Пример нашей работы: <span className="text-gradient-primary">REELS Донецк — Видео-продакшен</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { src: "/images/case-reels-1.png", alt: "Главная страница REELS Донецк" },
                  { src: "/images/case-reels-2.png", alt: "Сравнение с SMM" },
                  { src: "/images/case-reels-3.png", alt: "Портфолио видео-работ" },
                  { src: "/images/case-reels-4.png", alt: "Команда и процесс работы" },
                ].map((img, index) => (
                  <motion.div
                    key={index}
                    className="rounded-xl overflow-hidden border border-border/50 shadow-card hover:shadow-red-glow transition-all duration-500"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-auto"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 space-y-12 md:space-y-16">
            {cases.map((caseItem, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="max-w-5xl mx-auto p-6 md:p-10 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-red-glow hover:border-primary/30 transition-all duration-500">
                  <div className="inline-flex px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                    {caseItem.platform}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">{caseItem.title}</h2>

                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                      <h3 className="text-lg font-semibold text-destructive mb-2">🔥 Проблема</h3>
                      <p className="text-muted-foreground">{caseItem.problem}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <h3 className="text-lg font-semibold text-primary mb-2">⚡ Решение РИС</h3>
                      <p className="text-muted-foreground">{caseItem.solution}</p>
                    </div>

                    <div className="pt-6 border-t border-border/50">
                      <h3 className="text-lg font-semibold mb-6">📊 Результаты</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                          { icon: DollarSign, value: caseItem.results.budget, label: "Бюджет" },
                          { icon: Calendar, value: caseItem.results.period, label: "Период" },
                          { icon: Users, value: caseItem.results.leads, label: "Результат" },
                          { icon: Target, value: caseItem.results.cpl, label: "CPL" },
                          { icon: TrendingUp, value: caseItem.results.roi, label: "ROI", accent: true },
                        ].map((item, i) => (
                          <motion.div 
                            key={i}
                            className="p-3 rounded-lg bg-secondary/50 text-center"
                            whileHover={{ scale: 1.05 }}
                          >
                            <item.icon className={`h-5 w-5 mx-auto mb-2 ${item.accent ? 'text-accent' : 'text-primary'}`} />
                            <div className={`text-xl font-bold ${item.accent ? 'text-accent' : 'text-foreground'}`}>
                              {item.value}
                            </div>
                            <div className="text-xs text-muted-foreground">{item.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {index < cases.length - 1 && <QuickContact />}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <WebsitesShowcase category="horeca" />
          </div>
        </section>
        
        <QuickContact />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default CaseHoreca;
