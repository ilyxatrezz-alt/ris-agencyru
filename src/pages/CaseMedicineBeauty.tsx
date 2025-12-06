import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
import { ArrowLeft, TrendingUp, Users, DollarSign, Calendar, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CaseMedicineBeauty = () => {
  const cases = [
    {
      title: "Имплантация зубов — 89 договоров за квартал",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Клиника в Краснодаре тонула в конкуренции. Клики по 850₽, конверсия сайта — мизер. Чек 180К, но заявки шли на отбеливание за 5К. Бюджет утекал в никуда.",
      solution: "Нашли незанятые ниши: 'имплантация за 1 день', 'All-on-4 под ключ'. Полная переделка посадки с акцентом на гарантии и рассрочку. Коллтрекинг + CRM для оптимизации по целевым лидам. За месяц CPL упал на 40%.",
      results: {
        budget: "245 000 ₽",
        period: "3 месяца",
        leads: "142 заявки",
        cpl: "1 725 ₽",
        roi: "+215%",
      },
    },
    {
      title: "Косметология — Рост записей на 180%",
      platform: "ВКонтакте (Таргет)",
      problem: "Нужны клиенты на ботокс и контурную пластику. Аудитория — женщины 30-50 с деньгами. Как найти их и убедить прийти именно сюда?",
      solution: "Визуальный контент 'до/после' с согласия пациентов. Видео-отзывы от реальных клиентов. Воронка: бесплатная консультация → запись. Таргетинг по интересам: anti-age, премиум-косметика, фитнес. Записи выросли в 2.8 раза.",
      results: {
        budget: "78 000 ₽",
        period: "2 месяца",
        leads: "156 записей",
        cpl: "500 ₽",
        roi: "+180%",
      },
    },
    {
      title: "Пластика — 67 консультаций на ринопластику",
      platform: "Яндекс.Директ (Поиск + РСЯ)",
      problem: "Хирург с 15-летним опытом, но мало пациентов. Операция от 350К, решение принимается месяцами. Как догнать клиента и довести до операционной?",
      solution: "Контент-стратегия: статьи о подготовке, видео с результатами, ответы на страхи. Ретаргетинг с оффером '3D-визуализация результата бесплатно'. Look-alike на базу пациентов. Конверсия консультации в операцию — 34%.",
      results: {
        budget: "189 000 ₽",
        period: "4 месяца",
        leads: "67 консультаций",
        cpl: "2 821 ₽",
        roi: "+240%",
      },
    },
    {
      title: "Урология — Снижение CPL на 48%",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Деликатная тема, CPL космический — 3 500₽. Мужчины стесняются, ищут информацию тайком. Как достучаться и при этом не отпугнуть?",
      solution: "Сегментация по симптомам и заболеваниям. Анонимный онлайн-тест 'Проверьте здоровье'. Мягкие формулировки в объявлениях. Показы вечером — когда мужчины ищут информацию в одиночестве. CPL упал почти вдвое.",
      results: {
        budget: "95 000 ₽",
        period: "2 месяца",
        leads: "112 заявок",
        cpl: "848 ₽",
        roi: "+165%",
      },
    },
    {
      title: "Сеть лабораторий — 3 200 записей на анализы",
      platform: "Яндекс.Директ + ВКонтакте",
      problem: "Региональная сеть против федеральных гигантов: Инвитро, Гемотест. Бюджеты несопоставимы. Как забрать свою долю рынка?",
      solution: "Ставка на локальность и скорость. Акции на чекапы: 'Полное обследование за 2 990₽'. Таргет 25-55 лет с интересами к ЗОЖ. Онлайн-запись с выбором филиала. Геотаргетинг на густонаселённые районы. Доля рынка выросла на 12%.",
      results: {
        budget: "134 000 ₽",
        period: "2 месяца",
        leads: "3 200 записей",
        cpl: "42 ₽",
        roi: "+195%",
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
            className="absolute top-1/4 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
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
                Медицина & <span className="text-gradient-primary">Beauty</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Полные записи для клиник, косметологов и хирургов. Превращаем рекламу в поток платёжеспособных пациентов.
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
                { value: "3 677+", label: "Заявок получено", icon: Users },
                { value: "от 42₽", label: "Минимальный CPL", icon: Target },
                { value: "+199%", label: "Средний ROI", icon: TrendingUp, accent: true },
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

        {/* Website Screenshots */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-6xl mx-auto space-y-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Пластический хирург */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Пример нашей работы: <span className="text-gradient-primary">Пластический хирург Рахимов А.Я.</span>
                </h3>
                <motion.div
                  className="rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-red-glow transition-all duration-500"
                  whileHover={{ scale: 1.01 }}
                >
                  <img 
                    src="/images/case-rahimov-surgeon.png" 
                    alt="Сайт пластического хирурга Рахимова" 
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>

              {/* Студия красоты */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Пример нашей работы: <span className="text-gradient-primary">Majorhair — Студия наращивания волос</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { src: "/images/case-majorhair-1.png", alt: "Главная страница Majorhair" },
                    { src: "/images/case-majorhair-2.png", alt: "Каталог услуг" },
                    { src: "/images/case-majorhair-3.png", alt: "Профессиональные услуги" },
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
              </div>

              {/* Project Anti-Aging USA */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Пример нашей работы: <span className="text-gradient-primary">Project Anti-Aging — США</span>
                </h3>
                <motion.div
                  className="rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-red-glow transition-all duration-500"
                  whileHover={{ scale: 1.01 }}
                >
                  <img 
                    src="/images/case-paa-usa.png" 
                    alt="Интернет-магазин пептидов PAA USA" 
                    className="w-full h-auto"
                  />
                </motion.div>
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
                          { icon: Users, value: caseItem.results.leads, label: "Лиды" },
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

        {/* Websites Showcase */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <WebsitesShowcase category="medicine-beauty" />
          </div>
        </section>
        
        <QuickContact />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default CaseMedicineBeauty;
