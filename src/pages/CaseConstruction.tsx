import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { ArrowLeft, TrendingUp, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import caseConstruction from "@/assets/case-construction.jpg";

const CaseConstruction = () => {
  const cases = [
    {
      title: "Рост заявок на строительство загородных домов на 180%",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Строительная компания испытывала сезонность спроса. Высокая конкуренция и дорогие ключевые слова делали рекламу убыточной.",
      solution: "Разработали стратегию на долгосрочные запросы ('строительство коттеджей под ключ', 'проекты домов'). Использовали геотаргетинг на пригородные районы. Настроили умные кампании для снижения цены клика.",
      results: {
        budget: "320 000 ₽",
        period: "4 месяца",
        leads: "89 заявок",
        cpl: "3 595 ₽",
        roi: "+180%",
      },
    },
    {
      title: "Привлечение 65 клиентов для компании по строительству каркасных домов",
      platform: "Яндекс.Директ (РСЯ)",
      problem: "Компания хотела привлечь внимание к новой технологии строительства. Требовалось образование аудитории и повышение доверия.",
      solution: "Запустили РСЯ с визуальным контентом: фото готовых проектов, видео процесса строительства. Создали лендинг с подробным описанием технологии и калькулятором стоимости.",
      results: {
        budget: "155 000 ₽",
        period: "3 месяца",
        leads: "65 консультаций",
        cpl: "2 384 ₽",
        roi: "+165%",
      },
    },
    {
      title: "Запуск продаж элитных коттеджей через ВКонтакте",
      platform: "ВКонтакте (Таргет)",
      problem: "Девелопер запускал новый проект элитных коттеджей. Нужно было найти состоятельную аудиторию, готовую к крупной покупке.",
      solution: "Таргетировались на аудиторию с высоким доходом, интересующуюся недвижимостью и инвестициями. Создали серию постов с 3D-визуализацией проекта, инфраструктурой поселка. Запустили воронку от виртуального тура до встречи на объекте.",
      results: {
        budget: "280 000 ₽",
        period: "5 месяцев",
        leads: "42 показа",
        cpl: "6 666 ₽",
        roi: "+210%",
      },
    },
  ];

  const websiteCases = [
    {
      title: "Каталог проектов для строительной компании",
      task: "Создать сайт-каталог с проектами домов, калькулятором стоимости и онлайн-заявкой",
      result: "Увеличение конверсии на 55%. Интерактивный калькулятор снизил нагрузку на менеджеров и улучшил качество лидов.",
      image: caseConstruction,
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
                Успешные рекламные кампании для строительных компаний
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 space-y-16">
            {cases.map((caseItem, index) => (
              <div
                key={index}
                className="max-w-5xl mx-auto p-8 md:p-12 rounded-3xl bg-card shadow-card border border-border/50"
              >
                <div className="inline-flex px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                  {caseItem.platform}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{caseItem.title}</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-destructive mb-2">Проблема клиента:</h3>
                    <p className="text-muted-foreground">{caseItem.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Решение G-TARGET:</h3>
                    <p className="text-muted-foreground">{caseItem.solution}</p>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-6">Результаты:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                      <div className="space-y-2">
                        <DollarSign className="h-6 w-6 text-accent" />
                        <div className="text-2xl font-bold text-primary">{caseItem.results.budget}</div>
                        <div className="text-sm text-muted-foreground">Бюджет</div>
                      </div>
                      <div className="space-y-2">
                        <TrendingUp className="h-6 w-6 text-accent" />
                        <div className="text-2xl font-bold text-primary">{caseItem.results.period}</div>
                        <div className="text-sm text-muted-foreground">Период</div>
                      </div>
                      <div className="space-y-2">
                        <Users className="h-6 w-6 text-accent" />
                        <div className="text-2xl font-bold text-primary">{caseItem.results.leads}</div>
                        <div className="text-sm text-muted-foreground">Лиды</div>
                      </div>
                      <div className="space-y-2">
                        <DollarSign className="h-6 w-6 text-accent" />
                        <div className="text-2xl font-bold text-primary">{caseItem.results.cpl}</div>
                        <div className="text-sm text-muted-foreground">CPL</div>
                      </div>
                      <div className="space-y-2">
                        <TrendingUp className="h-6 w-6 text-accent" />
                        <div className="text-2xl font-bold text-accent">{caseItem.results.roi}</div>
                        <div className="text-sm text-muted-foreground">ROI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Создание Сайтов для <span className="text-gradient-primary">Строительства</span>
              </h2>

              <div className="space-y-8">
                {websiteCases.map((site, index) => (
                  <div key={index} className="grid md:grid-cols-2 gap-8 p-8 rounded-2xl bg-card shadow-card">
                    <div className="rounded-xl overflow-hidden">
                      <img src={site.image} alt={site.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-4 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold">{site.title}</h3>
                      <div>
                        <span className="font-semibold text-primary">Задача:</span>
                        <p className="text-muted-foreground mt-1">{site.task}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-accent">Результат:</span>
                        <p className="text-muted-foreground mt-1">{site.result}</p>
                      </div>
                      <Button variant="cta" asChild>
                        <Link to="/contacts">Заказать сайт</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default CaseConstruction;
