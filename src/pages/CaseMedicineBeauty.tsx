import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
import { ArrowLeft, TrendingUp, Users, DollarSign, Calendar, Target } from "lucide-react";
import { Link } from "react-router-dom";

const CaseMedicineBeauty = () => {
  const cases = [
    {
      title: "Имплантация зубов под ключ — 89 договоров за квартал",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Стоматологическая клиника 'ДентаПремиум' в Краснодаре получала мало заявок на имплантацию (средний чек 180 000₽). Высокая конкуренция, дорогие клики (до 850₽), низкая конверсия сайта.",
      solution: "Провели аудит конкурентов и нашли незанятые ниши: 'имплантация за 1 день', 'All-on-4 под ключ'. Переработали посадочную страницу с акцентом на гарантии и рассрочку. Настроили коллтрекинг и связали с CRM для оптимизации по квалифицированным лидам.",
      results: {
        budget: "245 000 ₽",
        period: "3 месяца",
        leads: "142 заявки",
        cpl: "1 725 ₽",
        roi: "+215%",
      },
    },
    {
      title: "Косметология — Рост записей на инъекции на 180%",
      platform: "ВКонтакте (Таргет)",
      problem: "Косметологический центр 'Эстетика' хотел привлечь новых клиентов на ботулинотерапию и контурную пластику. Основная аудитория — женщины 30-50 лет с доходом выше среднего.",
      solution: "Запустили таргет с визуальным контентом 'до/после' (с согласия пациентов). Использовали видео-отзывы от реальных клиентов. Создали воронку: бесплатная консультация → запись на процедуру. Таргетинг по интересам: anti-age, премиум-косметика, фитнес.",
      results: {
        budget: "78 000 ₽",
        period: "2 месяца",
        leads: "156 записей",
        cpl: "500 ₽",
        roi: "+180%",
      },
    },
    {
      title: "Пластическая хирургия — 67 консультаций на ринопластику",
      platform: "Яндекс.Директ (Поиск + РСЯ)",
      problem: "Пластический хирург с 15-летним опытом хотел увеличить поток пациентов на ринопластику. Высокая стоимость операции (от 350 000₽) и длинный цикл принятия решения.",
      solution: "Разработали контент-стратегию: серия статей о подготовке к операции, видео с результатами, ответы на частые вопросы. Запустили ретаргетинг на посетителей сайта с оффером 'Бесплатная 3D-визуализация результата'. Использовали look-alike на базу пациентов.",
      results: {
        budget: "189 000 ₽",
        period: "4 месяца",
        leads: "67 консультаций",
        cpl: "2 821 ₽",
        roi: "+240%",
      },
    },
    {
      title: "Урологическая клиника — Снижение CPL на 48%",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Частная урологическая клиника получала дорогие заявки (более 3 500₽ за лид). Деликатная тематика требовала особого подхода к рекламе.",
      solution: "Сегментировали кампании по симптомам и заболеваниям. Создали анонимный онлайн-тест 'Проверьте своё здоровье'. Использовали мягкие формулировки в объявлениях. Настроили показы в вечернее время (когда пациенты ищут информацию приватно).",
      results: {
        budget: "95 000 ₽",
        period: "2 месяца",
        leads: "112 заявок",
        cpl: "848 ₽",
        roi: "+165%",
      },
    },
    {
      title: "Сеть медицинских лабораторий — 3 200 записей на анализы",
      platform: "Яндекс.Директ + ВКонтакте",
      problem: "Региональная сеть лабораторий 'МедТест' конкурировала с федеральными игроками (Инвитро, Гемотест). Нужно было привлечь аудиторию выгодными ценами и скоростью.",
      solution: "Запустили акции на популярные чекапы: 'Полное обследование за 2 990₽'. Таргетинг на аудиторию 25-55 лет с интересами: здоровье, ЗОЖ, семья. Интегрировали онлайн-запись с выбором ближайшего филиала. Геотаргетинг на районы с высокой плотностью населения.",
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
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <Link to="/cases" className="inline-flex items-center text-primary hover:underline mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться к кейсам
            </Link>
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Кейсы: <span className="text-gradient-primary">Медицина & Beauty</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Успешные рекламные кампании для клиник, косметологов, стоматологов и пластических хирургов
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">3 677+</div>
                <div className="text-sm text-muted-foreground mt-1">Заявок получено</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">от 42₽</div>
                <div className="text-sm text-muted-foreground mt-1">Минимальный CPL</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">+199%</div>
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

        {/* Websites Showcase */}
        <section className="py-12 md:py-20 bg-muted/30">
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