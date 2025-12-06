import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, DollarSign, Calendar, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

const CaseLawyers = () => {
  const cases = [
    {
      title: "Семейное право — 134 клиента за квартал",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Нерелевантные заявки сыпались потоком. Средний чек на дне. Куча консультаций без договоров. Юристы тратили время впустую на людей без денег.",
      solution: "Жёсткая сегментация по типам дел: разводы, раздел имущества, алименты. Отдельная посадка с ценами и кейсами для каждого. Квиз 'Оцените сложность дела' для квалификации. Конверсия в договор выросла в 2.5 раза.",
      results: {
        budget: "98 000 ₽",
        period: "3 месяца",
        leads: "134 заявки",
        cpl: "731 ₽",
        roi: "+195%",
      },
    },
    {
      title: "Банкротство физлиц — 89 договоров",
      platform: "Яндекс.Директ (Поиск + РСЯ)",
      problem: "Чек 120К, но конкуренция — ад. Рынок забит шарлатанами с обещаниями '100% списание'. Доверие к нише на нуле. Клиенты боятся обмана.",
      solution: "Стратегия доверия: лицензии, статистика дел, реальные отзывы. РСЯ на людей с кредитами и микрозаймами. Калькулятор 'Можете ли вы списать долги?'. Ретаргетинг с успешными кейсами. Средний чек вырос на 30%.",
      results: {
        budget: "156 000 ₽",
        period: "4 месяца",
        leads: "89 договоров",
        cpl: "1 752 ₽",
        roi: "+180%",
      },
    },
    {
      title: "Корпоративное право — 2.8 млн ₽ контрактов",
      platform: "ВКонтакте + LinkedIn",
      problem: "B2B-сегмент закрыт: длинный цикл, высокие требования к экспертизе. Сделки M&A и корпоративные споры — другой уровень. Как туда попасть?",
      solution: "Контент-маркетинг: статьи о налоговых рисках, вебинары по защите активов. Таргет на собственников и CFO. Email-рассылка с юридическими новостями. Lead Ads с оффером 'Бесплатный аудит договоров'. Первый контракт — через 3 недели.",
      results: {
        budget: "134 000 ₽",
        period: "5 месяцев",
        leads: "45 контрактов",
        cpl: "2 978 ₽",
        roi: "+220%",
      },
    },
    {
      title: "Защита прав потребителей — 267 обращений",
      platform: "ВКонтакте (Таргет)",
      problem: "Узкая специализация, но огромный потенциал. Люди не знают своих прав. Возврат денег за брак — золотая жила, если найти аудиторию.",
      solution: "Таргет на покупателей авто, дольщиков, клиентов турагентств. Креативы с реальными кейсами: '450 000₽ вернули за бракованный авто'. Квиз 'Можете ли вы вернуть деньги?'. Конверсия в обращение — 12%.",
      results: {
        budget: "67 000 ₽",
        period: "2 месяца",
        leads: "267 обращений",
        cpl: "251 ₽",
        roi: "+210%",
      },
    },
    {
      title: "Уголовное право — Адвокат по тяжким делам",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Деликатная тема. Чек от 300К. Клиенты в стрессе, решения принимаются быстро. Репутация — всё. Один негатив может убить практику.",
      solution: "Точечные показы на запросы по статьям УК. Лендинг с акцентом на конфиденциальность и 20-летний опыт. Коллтрекинг с записью для оценки качества. Показы 24/7 — арест может случиться в любое время. Конверсия звонка в клиента — 45%.",
      results: {
        budget: "112 000 ₽",
        period: "3 месяца",
        leads: "52 обращения",
        cpl: "2 153 ₽",
        roi: "+175%",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <motion.div
            className="absolute top-1/3 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/cases">
                <Button variant="ghost" size="sm" className="mb-4 group">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Все кейсы
                </Button>
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold">
                Юридические <span className="text-gradient-primary">услуги</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Платёжеспособные клиенты для юристов и адвокатов. Превращаем digital-рекламу в поток качественных обращений.
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
                { value: "587+", label: "Заявок получено", icon: Users },
                { value: "от 251₽", label: "Минимальный CPL", icon: Target },
                { value: "+196%", label: "Средний ROI", icon: TrendingUp, accent: true },
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

        {/* Website Screenshot */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">
                Пример нашей работы: <span className="text-gradient-primary">Юридическая компания «ЭГИДА»</span>
              </h3>
              <div className="rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-red-glow transition-all duration-500">
                <img 
                  src="/images/case-egida-lawyers.png" 
                  alt="Сайт юридической компании ЭГИДА" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              {cases.map((caseItem, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-card rounded-2xl shadow-card p-6 md:p-10 space-y-6 border border-border/50 hover:shadow-red-glow hover:border-primary/30 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <h2 className="text-2xl md:text-3xl font-bold">{caseItem.title}</h2>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm">
                        {caseItem.platform}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                        <h3 className="font-bold text-destructive mb-2">🔥 Проблема</h3>
                        <p className="text-muted-foreground">{caseItem.problem}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <h3 className="font-bold text-primary mb-2">⚡ Решение РИС</h3>
                        <p className="text-muted-foreground">{caseItem.solution}</p>
                      </div>

                      <div className="pt-6 border-t border-border/50">
                        <h3 className="font-bold mb-6">📊 Результаты</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {[
                            { icon: DollarSign, value: caseItem.results.budget, label: "Бюджет" },
                            { icon: Calendar, value: caseItem.results.period, label: "Период" },
                            { icon: Users, value: caseItem.results.leads, label: "Заявки" },
                            { icon: Target, value: caseItem.results.cpl, label: "CPL" },
                            { icon: TrendingUp, value: caseItem.results.roi, label: "ROI", accent: true },
                          ].map((item, i) => (
                            <motion.div 
                              key={i}
                              className="bg-secondary/50 p-4 rounded-lg text-center"
                              whileHover={{ scale: 1.05 }}
                            >
                              <item.icon className={`h-5 w-5 mx-auto mb-2 ${item.accent ? 'text-accent' : 'text-primary'}`} />
                              <div className={`font-bold text-lg ${item.accent ? 'text-accent' : 'text-foreground'}`}>
                                {item.value}
                              </div>
                              <div className="text-sm text-muted-foreground">{item.label}</div>
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
          </div>
        </section>

        {/* Websites Showcase */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <WebsitesShowcase category="lawyers" />
          </div>
        </section>

        <QuickContact />

        {/* CTA Banner */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary" />
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center space-y-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="h-16 w-16 mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Готовы получить такие же результаты?
              </h2>
              <p className="text-lg opacity-90">
                Бесплатный аудит вашей рекламы покажет точки роста. Увеличим поток клиентов на 150%+
              </p>
              <Button variant="cta" size="xl" asChild>
                <Link to="/contacts">Получить аудит бесплатно</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default CaseLawyers;
