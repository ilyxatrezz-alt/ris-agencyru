import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, DollarSign, Calendar, Target } from "lucide-react";

const CaseLawyers = () => {
  const cases = [
    {
      title: "Семейное право — 134 клиента на разводы и алименты",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Юридическая компания 'Правозащита' специализировалась на семейных делах, но получала нерелевантные заявки. Средний чек низкий, много консультаций без заключения договора.",
      solution: "Сегментировали кампании по типам дел: разводы, раздел имущества, алименты, определение места жительства ребёнка. Для каждого сегмента — отдельная посадочная страница с ценами и кейсами. Настроили квалификацию лидов через квиз 'Оцените сложность вашего дела'.",
      results: {
        budget: "98 000 ₽",
        period: "3 месяца",
        leads: "134 заявки",
        cpl: "731 ₽",
        roi: "+195%",
      },
    },
    {
      title: "Банкротство физических лиц — 89 договоров",
      platform: "Яндекс.Директ (Поиск + РСЯ)",
      problem: "Юридическая фирма хотела привлечь клиентов на банкротство (средний чек 120 000₽). Высокая конкуренция, много недобросовестных игроков на рынке.",
      solution: "Акцент на надёжность: показали лицензии, отзывы, статистику выигранных дел. Запустили РСЯ с таргетингом на людей с кредитами, микрозаймами. Создали калькулятор 'Можете ли вы списать долги?'. Использовали ретаргетинг с кейсами успешных банкротств.",
      results: {
        budget: "156 000 ₽",
        period: "4 месяца",
        leads: "89 договоров",
        cpl: "1 752 ₽",
        roi: "+180%",
      },
    },
    {
      title: "Корпоративное право — Контракты на 2.8 млн ₽",
      platform: "ВКонтакте + LinkedIn",
      problem: "Адвокатское бюро хотело выйти на B2B-сегмент: юридическое сопровождение бизнеса, сделки M&A, корпоративные споры. Длинный цикл продаж, высокие требования к экспертизе.",
      solution: "Построили воронку через контент-маркетинг: статьи о налоговых рисках, вебинары по защите активов. Таргет на собственников бизнеса, финансовых директоров. Запустили email-рассылку с юридическими новостями. Использовали Lead Ads с оффером 'Бесплатный аудит договоров'.",
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
      problem: "Юрист-специалист по защите прав потребителей хотел масштабировать практику. Основной запрос — возврат денег за некачественные товары и услуги.",
      solution: "Таргетировались на аудитории: покупатели автомобилей, дольщики, клиенты туристических агентств. Создали серию креативов с реальными кейсами: '450 000₽ вернули за бракованный автомобиль'. Использовали квиз 'Можете ли вы вернуть деньги?'.",
      results: {
        budget: "67 000 ₽",
        period: "2 месяца",
        leads: "267 обращений",
        cpl: "251 ₽",
        roi: "+210%",
      },
    },
    {
      title: "Уголовное право — Адвокат по тяжким статьям",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Адвокат с 20-летним опытом по уголовным делам нуждался в стабильном потоке клиентов. Деликатная тематика, высокая стоимость услуг (от 300 000₽), требовательная аудитория.",
      solution: "Настроили показы на целевые запросы по статьям УК РФ. Создали лендинг с акцентом на конфиденциальность и опыт. Использовали коллтрекинг с записью звонков для оценки качества лидов. Показы — круглосуточно (арест может произойти в любое время).",
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
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <Link to="/cases">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Все кейсы
                </Button>
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold">
                Кейсы: <span className="text-gradient-primary">Юридические услуги</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Как мы помогаем юристам и адвокатам привлекать платежеспособных клиентов через digital-рекламу
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">587+</div>
                <div className="text-sm text-muted-foreground mt-1">Заявок получено</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">от 251₽</div>
                <div className="text-sm text-muted-foreground mt-1">Минимальный CPL</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">+196%</div>
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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              {cases.map((caseItem, index) => (
                <div key={index}>
                  <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 space-y-6 border border-border/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <h2 className="text-2xl md:text-3xl font-bold">{caseItem.title}</h2>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm">
                        {caseItem.platform}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-destructive mb-2">Проблема клиента:</h3>
                        <p className="text-muted-foreground">{caseItem.problem}</p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary mb-2">Решение G-TARGET:</h3>
                        <p className="text-muted-foreground">{caseItem.solution}</p>
                      </div>

                      <div className="pt-4 border-t">
                        <h3 className="font-bold mb-4">Результаты:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <DollarSign className="h-5 w-5 text-accent mb-2" />
                            <div className="text-sm text-muted-foreground mb-1">Бюджет</div>
                            <div className="font-bold text-lg">{caseItem.results.budget}</div>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <Calendar className="h-5 w-5 text-accent mb-2" />
                            <div className="text-sm text-muted-foreground mb-1">Период</div>
                            <div className="font-bold text-lg">{caseItem.results.period}</div>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <Users className="h-5 w-5 text-accent mb-2" />
                            <div className="text-sm text-muted-foreground mb-1">Заявки</div>
                            <div className="font-bold text-lg text-primary">{caseItem.results.leads}</div>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <Target className="h-5 w-5 text-accent mb-2" />
                            <div className="text-sm text-muted-foreground mb-1">CPL</div>
                            <div className="font-bold text-lg text-primary">{caseItem.results.cpl}</div>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-accent mb-2" />
                            <div className="text-sm text-muted-foreground mb-1">ROI</div>
                            <div className="font-bold text-lg text-accent">{caseItem.results.roi}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < cases.length - 1 && <QuickContact />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Websites Showcase */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <WebsitesShowcase category="lawyers" />
          </div>
        </section>

        <QuickContact />

        {/* CTA Banner */}
        <section className="py-16 md:py-24 gradient-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6 text-white">
              <TrendingUp className="h-16 w-16 mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Готовы получить такие же результаты?
              </h2>
              <p className="text-lg opacity-90">
                Получите бесплатный аудит вашей рекламы и узнайте, как увеличить количество клиентов на 150%+
              </p>
              <Button variant="cta" size="xl" asChild>
                <Link to="/contacts">Получить аудит бесплатно</Link>
              </Button>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default CaseLawyers;