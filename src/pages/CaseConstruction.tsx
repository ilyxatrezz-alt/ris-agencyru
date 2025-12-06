import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
import { ArrowLeft, TrendingUp, Users, DollarSign, Calendar, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CaseConstruction = () => {
  const cases = [
    {
      title: "Дома из ЖБ-панелей — 47 договоров за 4 месяца",
      platform: "Яндекс.Директ (Поиск + РСЯ)",
      problem: "Новый игрок на рынке ДНР. Нулевая узнаваемость, скепсис к новой технологии, жёсткая конкуренция с традиционными застройщиками. Бюджет ограничен, каждый рубль на счету.",
      solution: "Двухэтапная воронка: сначала РСЯ с образовательным контентом о преимуществах технологии. Затем — поисковые кампании на горячие запросы. Квиз-лендинг с расчётом стоимости. Геотаргетинг на новые территории. Результат превзошёл ожидания в 3 раза.",
      results: {
        budget: "285 000 ₽",
        period: "4 месяца",
        leads: "156 заявок",
        cpl: "1 827 ₽",
        roi: "+195%",
      },
    },
    {
      title: "Пожарная безопасность — Рост B2B-заявок на 230%",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Компания тонула в мелких частных заказах с чеком 15-30 тысяч. Крупные контракты на склады и производства уходили конкурентам. Нужен был прорыв в B2B-сегмент.",
      solution: "Полная перестройка семантики на B2B: 'монтаж АПС на производстве', 'лицензия МЧС подрядчик'. Отдельные посадочные под каждый тип объекта. Корректировки ставок на рабочее время и десктоп. Средний чек вырос в 8 раз.",
      results: {
        budget: "178 000 ₽",
        period: "3 месяца",
        leads: "89 заявок",
        cpl: "2 000 ₽",
        roi: "+230%",
      },
    },
    {
      title: "Каркасные дома — Снижение CPL на 42%",
      platform: "Яндекс.Директ (РСЯ)",
      problem: "CPL был космический — 4 500₽ за заявку. Конкуренция в Подмосковье выжигала бюджет. Доверие к каркасникам на дне. Застройщик был на грани закрытия рекламы.",
      solution: "Видеокреативы процесса строительства в РСЯ. Акцент на скорости (45 дней) и экономии на отоплении. Look-alike на клиентов за 2 года. Калькулятор с захватом. За первый месяц CPL упал на 35%.",
      results: {
        budget: "195 000 ₽",
        period: "3 месяца",
        leads: "78 заявок",
        cpl: "2 500 ₽",
        roi: "+168%",
      },
    },
    {
      title: "Коттеджный посёлок премиум — 12 продаж участков",
      platform: "ВКонтакте (Таргет)",
      problem: "Премиум-сегмент: участки от 8 млн ₽. Узкая аудитория, длинный цикл сделки, высокие требования к качеству лидов. Нужны были не просто заявки — нужны были покупатели.",
      solution: "Точечный таргет на владельцев бизнеса, топ-менеджеров, IT с доходом 300K+. Серия из 12 постов с 3D-турами и интервью с архитектором. Закрытый клуб будущих жителей. Конверсия в сделку — 18%.",
      results: {
        budget: "340 000 ₽",
        period: "5 месяцев",
        leads: "67 показов",
        cpl: "5 074 ₽",
        roi: "+280%",
      },
    },
    {
      title: "Ремонт под ключ — 94 договора за сезон",
      platform: "Яндекс.Директ (Поиск + Мастер кампаний)",
      problem: "Потолок по заявкам при масштабировании. Частники демпингуют цены. Московский рынок перегрет. Компания не могла вырваться из стагнации третий год.",
      solution: "Сегментация по типам ремонта: косметический, капитальный, дизайнерский. Своя посадка с портфолио и ценами для каждого. Мастер кампаний на автостратегии. Коллтрекинг + сквозная аналитика. Прирост заявок — 127%.",
      results: {
        budget: "420 000 ₽",
        period: "4 месяца",
        leads: "312 заявок",
        cpl: "1 346 ₽",
        roi: "+175%",
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
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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
                Строительство & <span className="text-gradient-primary">Коттеджи</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                От нуля до потока заявок. Как мы превращаем строительный бизнес в машину по генерации клиентов.
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
                { value: "702+", label: "Заявок получено", icon: Users },
                { value: "от 1 346₽", label: "Минимальный CPL", icon: Target },
                { value: "+210%", label: "Средний ROI", icon: TrendingUp, accent: true },
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
              className="max-w-6xl mx-auto space-y-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* ЭонКонкрит */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Пример нашей работы: <span className="text-gradient-primary">ЭонКонкрит — Дома из ЖБ-панелей</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { src: "/images/case-eonconcrete-1.png", alt: "Главная страница ЭонКонкрит" },
                    { src: "/images/case-eonconcrete-2.png", alt: "Проекты домов" },
                    { src: "/images/case-eonconcrete-3.png", alt: "Процесс строительства" },
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
                      <img src={img.src} alt={img.alt} className="w-full h-auto" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Пожарная безопасность */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Пример нашей работы: <span className="text-gradient-primary">Компания по пожарной безопасности</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { src: "/images/case-fire-safety-1.png", alt: "Главная страница" },
                    { src: "/images/case-fire-safety-2.png", alt: "Страница услуг" },
                    { src: "/images/case-fire-safety-3.png", alt: "Процесс работы" },
                    { src: "/images/case-fire-safety-4.png", alt: "Портфолио" },
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
                      <img src={img.src} alt={img.alt} className="w-full h-auto" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Никатэн и Погода в Доме */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Ещё примеры: <span className="text-gradient-primary">Интернет-магазины</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="rounded-xl overflow-hidden border border-border/50 shadow-card hover:shadow-red-glow transition-all duration-500"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img src="/images/case-nikaten.png" alt="Интернет-магазин НИКАТЭН" className="w-full h-auto" />
                    <div className="p-4 bg-card">
                      <h4 className="font-bold">НИКАТЭН — Керамические панели отопления</h4>
                      <p className="text-sm text-muted-foreground">Официальный дилер в ДНР</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="rounded-xl overflow-hidden border border-border/50 shadow-card hover:shadow-red-glow transition-all duration-500"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img src="/images/case-pogoda-v-dome.png" alt="Интернет-магазин Погода в Доме" className="w-full h-auto" />
                    <div className="p-4 bg-card">
                      <h4 className="font-bold">Погода в Доме — Сантехника</h4>
                      <p className="text-sm text-muted-foreground">Интернет-магазин сантехники</p>
                    </div>
                  </motion.div>
                </div>
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

        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <WebsitesShowcase category="construction" />
          </div>
        </section>
        
        <QuickContact />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default CaseConstruction;
