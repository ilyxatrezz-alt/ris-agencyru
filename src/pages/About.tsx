import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Award, Target, Users, Zap, Shield, TrendingUp, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const principles = [
    {
      icon: Target,
      title: "Результат — наша валюта",
      description: "Мы не продаём клики и показы. Мы продаём заявки, звонки и продажи. Если нет результата — возвращаем деньги.",
    },
    {
      icon: Shield,
      title: "Полная прозрачность",
      description: "Еженедельные отчёты, доступ к рекламным кабинетам, детализация каждого потраченного рубля.",
    },
    {
      icon: Zap,
      title: "Скорость без потери качества",
      description: "Ответ на любой вопрос — 2 часа. Оптимизация кампаний — каждый день. Запуск проекта — от 3 дней.",
    },
    {
      icon: Users,
      title: "Команда, а не один человек",
      description: "Аналитик, контекстолог, таргетолог, дизайнер — каждый эксперт в своём деле. Без простоев и срывов.",
    },
    {
      icon: TrendingUp,
      title: "Постоянный рост",
      description: "A/B-тесты, анализ конкурентов, новые инструменты. Мы не останавливаемся, пока есть куда расти.",
    },
    {
      icon: Award,
      title: "Долгосрочное партнёрство",
      description: "70% клиентов работают с нами более 3 лет. Мы не ищем разовые проекты — строим отношения.",
    },
  ];

  const milestones = [
    { year: "2014", title: "Старт", description: "Основание агентства. Первые проекты в Яндекс.Директ." },
    { year: "2016", title: "Рост", description: "Команда из 5 человек. Запуск направления таргетированной рекламы." },
    { year: "2018", title: "100 проектов", description: "Освоено 100 млн ₽ рекламных бюджетов. Выход на федеральный уровень." },
    { year: "2020", title: "Сайты под ключ", description: "Запуск собственной веб-студии. Комплексный маркетинг." },
    { year: "2024", title: "500+ млн ₽", description: "Более 500 млн ₽ освоенных бюджетов. 100+ постоянных клиентов." },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-24 bg-accent text-accent-foreground relative overflow-hidden noise">
          <div className="absolute inset-0 gradient-hero" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full gradient-red-glow opacity-40"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold">
                <Award className="h-4 w-4" />
                С 2014 года на рынке digital-маркетинга
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black">
                Агентство <span className="text-gradient-primary">РИС</span>
              </h1>
              <p className="text-lg md:text-xl text-accent-foreground/70 max-w-2xl mx-auto">
                Реклама и Сайты, которые работают на ваш бизнес. 
                Не обещаем чудес — показываем результаты в цифрах.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="p-8 md:p-12 rounded-3xl bg-card shadow-card border border-border/50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-black mb-8">
                  Кто мы и <span className="text-gradient-primary">почему нам доверяют</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">РИС</strong> — это команда маркетологов, которая знает цену каждому клику. 
                    Мы начинали в 2014 году как небольшое агентство контекстной рекламы, а сегодня предоставляем 
                    полный цикл услуг: от аудита до масштабирования бизнеса.
                  </p>
                  <p>
                    Наша специализация — <strong className="text-primary">Яндекс.Директ</strong>, 
                    <strong className="text-primary"> ВКонтакте</strong>, 
                    <strong className="text-primary"> Telegram</strong> и 
                    <strong className="text-primary"> создание конверсионных сайтов</strong>. 
                    Мы работаем с бизнесом любого масштаба: от локальных стоматологий до федеральных застройщиков.
                  </p>
                  <p>
                    За 10 лет мы освоили более <strong className="text-primary">500 млн рублей</strong> рекламных бюджетов 
                    и запустили <strong className="text-primary">2 200+ успешных кампаний</strong>. 
                    Но главное — <strong className="text-foreground">70% наших клиентов</strong> работают с нами более 3 лет. 
                    Это лучшее доказательство нашей эффективности.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Наш <span className="text-gradient-primary">путь</span>
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex gap-6 mb-8 last:mb-0"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-2xl font-black text-primary">{milestone.year}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-3 w-3 h-3 rounded-full bg-primary shadow-cta" />
                    <div className="absolute left-1 top-6 w-0.5 h-full bg-border" />
                  </div>
                  <div className="pl-6 pb-8">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Наши ценности
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Принципы, которые <span className="text-gradient-primary">делают нас сильнее</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={index}
                    className="group p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 hover:border-primary/30"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary mb-6 shadow-cta group-hover:shadow-glow transition-all">
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="py-24 bg-accent text-accent-foreground noise">
          <div className="absolute inset-0 gradient-hero" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                РИС в <span className="text-gradient-primary">цифрах</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { value: "10+", label: "лет на рынке" },
                { value: "500 млн+", label: "₽ рекламных бюджетов" },
                { value: "2 200+", label: "успешных кампаний" },
                { value: "70%", label: "клиентов с нами 3+ года" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-8 rounded-2xl glass border border-accent-foreground/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-accent-foreground/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default About;
