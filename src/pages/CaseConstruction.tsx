import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
import { ArrowLeft, TrendingUp, Users, DollarSign, Calendar, Target } from "lucide-react";
import { Link } from "react-router-dom";

const CaseConstruction = () => {
  const cases = [
    {
      title: "Строительство домов из ЖБ-панелей — 47 договоров за 4 месяца",
      platform: "Яндекс.Директ (Поиск + РСЯ)",
      problem: "Компания ЭонКонкрит выходила на рынок ДНР с уникальной технологией строительства из ЖБ-панелей. Низкая узнаваемость бренда, высокая конкуренция с традиционными застройщиками, скептицизм аудитории к новым технологиям.",
      solution: "Разработали стратегию двухэтапной воронки: на первом этапе РСЯ с образовательным контентом о преимуществах технологии (скорость, цена, качество). На втором — поисковые кампании на горячие запросы. Создали квиз-лендинг с расчётом стоимости дома. Использовали геотаргетинг на новые территории.",
      results: {
        budget: "285 000 ₽",
        period: "4 месяца",
        leads: "156 заявок",
        cpl: "1 827 ₽",
        roi: "+195%",
      },
    },
    {
      title: "Пожарная безопасность под ключ — Рост B2B-заявок на 230%",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Компания ПожБезопасность получала мало заявок от коммерческих клиентов (склады, офисы, производства). Основной трафик — частные лица с низким чеком. Нужно было привлечь крупные объекты.",
      solution: "Перестроили семантику на B2B-запросы: 'пожарная сигнализация для склада', 'монтаж АПС на производстве', 'лицензия МЧС подрядчик'. Создали отдельные посадочные страницы под каждый тип объекта. Настроили корректировки ставок на рабочее время и десктоп.",
      results: {
        budget: "178 000 ₽",
        period: "3 месяца",
        leads: "89 заявок",
        cpl: "2 000 ₽",
        roi: "+230%",
      },
    },
    {
      title: "Строительство каркасных домов — Снижение CPL на 42%",
      platform: "Яндекс.Директ (РСЯ)",
      problem: "Застройщик каркасных домов получал дорогие заявки (более 4 500 ₽ за лид). Высокая конкуренция в Московской области, низкое доверие к каркасной технологии.",
      solution: "Запустили РСЯ с видеокреативами процесса строительства. Акцент на скорости (дом за 45 дней) и экономии на отоплении. Использовали look-alike на базу клиентов за 2 года. Создали калькулятор со встроенной формой захвата.",
      results: {
        budget: "195 000 ₽",
        period: "3 месяца",
        leads: "78 заявок",
        cpl: "2 500 ₽",
        roi: "+168%",
      },
    },
    {
      title: "Коттеджный посёлок премиум-класса — 12 продаж участков",
      platform: "ВКонтакте (Таргет)",
      problem: "Девелопер запускал продажи участков в новом посёлке бизнес-класса. Высокий средний чек (от 8 млн ₽), узкая целевая аудитория, длинный цикл принятия решения.",
      solution: "Таргетировались на владельцев бизнеса, топ-менеджеров, IT-специалистов с доходом от 300 000 ₽. Создали серию из 12 постов с 3D-турами, интервью с архитектором, обзором инфраструктуры. Запустили закрытый клуб будущих жителей в ВК.",
      results: {
        budget: "340 000 ₽",
        period: "5 месяцев",
        leads: "67 показов",
        cpl: "5 074 ₽",
        roi: "+280%",
      },
    },
    {
      title: "Ремонт квартир под ключ — 94 договора за сезон",
      platform: "Яндекс.Директ (Поиск + Мастер кампаний)",
      problem: "Ремонтная компания хотела масштабировать бизнес, но упиралась в потолок по заявкам. Конкуренция в Москве огромная, частники демпингуют цены.",
      solution: "Сегментировали кампании по типам ремонта: косметический, капитальный, дизайнерский. Для каждого сегмента — своя посадочная страница с портфолио и ценами. Запустили Мастер кампаний на автостратегии. Внедрили коллтрекинг и сквозную аналитику.",
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
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <Link to="/cases" className="inline-flex items-center text-primary hover:underline mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться к кейсам
            </Link>
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Кейсы: <span className="text-gradient-primary">Строительство & Коттеджи</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Успешные рекламные кампании для строительных компаний, застройщиков и ремонтных бригад
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">702+</div>
                <div className="text-sm text-muted-foreground mt-1">Заявок получено</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">от 1 346₽</div>
                <div className="text-sm text-muted-foreground mt-1">Минимальный CPL</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">+210%</div>
                <div className="text-sm text-muted-foreground mt-1">Средний ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground mt-1">Успешных проектов</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 space-y-12 md:space-y-16">
            {cases.map((caseItem, index) => (
              <div key={index}>
                <div className="max-w-5xl mx-auto p-6 md:p-12 rounded-2xl md:rounded-3xl bg-card shadow-card border border-border/50">
                  <div className="inline-flex px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-medium mb-4 md:mb-6">
                    {caseItem.platform}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">{caseItem.title}</h2>

                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-destructive mb-2">Проблема клиента:</h3>
                      <p className="text-sm md:text-base text-muted-foreground">{caseItem.problem}</p>
                    </div>

                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-primary mb-2">Решение G-TARGET:</h3>
                      <p className="text-sm md:text-base text-muted-foreground">{caseItem.solution}</p>
                    </div>

                    <div className="pt-4 md:pt-6 border-t">
                      <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Результаты:</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                          <div className="text-xl md:text-2xl font-bold text-primary">{caseItem.results.budget}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">Бюджет</div>
                        </div>
                        <div className="space-y-2">
                          <Calendar className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                          <div className="text-xl md:text-2xl font-bold text-primary">{caseItem.results.period}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">Период</div>
                        </div>
                        <div className="space-y-2">
                          <Users className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                          <div className="text-xl md:text-2xl font-bold text-primary">{caseItem.results.leads}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">Лиды</div>
                        </div>
                        <div className="space-y-2">
                          <Target className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                          <div className="text-xl md:text-2xl font-bold text-primary">{caseItem.results.cpl}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">CPL</div>
                        </div>
                        <div className="space-y-2">
                          <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                          <div className="text-xl md:text-2xl font-bold text-accent">{caseItem.results.roi}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">ROI</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {index < cases.length - 1 && <QuickContact />}
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 md:py-20 bg-muted/30">
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