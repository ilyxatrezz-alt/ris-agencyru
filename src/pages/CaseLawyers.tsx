import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";

const CaseLawyers = () => {
  const cases = [
    {
      title: "Юридическая консультация по семейному праву — Рост заявок на 180%",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Юридическая фирма испытывала нехватку клиентов по семейным делам. Заявки приходили нерегулярно, стоимость лида была завышена.",
      solution: "Настроили точечную кампанию по ключевым запросам: 'развод', 'раздел имущества', 'алименты'. Создали релевантные объявления с юридическими гарантиями. Запустили ретаргетинг на посетителей сайта.",
      results: {
        budget: "85 000 ₽",
        period: "2 мес.",
        leads: "110 шт.",
        cpl: "770 ₽",
        roi: "+180%",
      },
    },
    {
      title: "Юридические услуги для бизнеса — Снижение CPL на 45%",
      platform: "Яндекс.Директ (Поиск + РСЯ)",
      problem: "Компания занималась корпоративным правом, но стоимость заявки была слишком высокой (более 2 000 ₽), что делало рекламу нерентабельной.",
      solution: "Провели аудит конкурентов и переработали семантику. Запустили РСЯ с креативами на типичные проблемы бизнеса: налоги, контракты, споры с партнерами. Внедрили коллтрекинг для точного отслеживания.",
      results: {
        budget: "120 000 ₽",
        period: "3 мес.",
        leads: "95 шт.",
        cpl: "1 260 ₽",
        roi: "+160%",
      },
    },
    {
      title: "Защита прав потребителей — 200+ заявок за 2 месяца",
      platform: "ВКонтакте (Таргет)",
      problem: "Юридическое бюро хотело привлечь людей, пострадавших от действий недобросовестных продавцов и застройщиков.",
      solution: "Запустили таргет на аудитории: 'дольщики', 'обманутые покупатели', интересы по защите прав. Создали серию креативов с реальными кейсами побед в суде. Добавили квиз 'Сможете ли вы подать в суд?'",
      results: {
        budget: "60 000 ₽",
        period: "2 мес.",
        leads: "210 шт.",
        cpl: "285 ₽",
        roi: "+195%",
      },
    },
    {
      title: "Услуги адвоката по уголовным делам — Целевые клиенты",
      platform: "ВКонтакте (Таргет)",
      problem: "Адвокат по уголовным делам нуждался в притоке клиентов по конкретным статьям УК РФ.",
      solution: "Настроили таргет по интересам: юридическая помощь, уголовное право. Сделали акцент на конфиденциальности и опыте. Запустили ретаргетинг на тех, кто посещал сайт, но не оставил заявку.",
      results: {
        budget: "75 000 ₽",
        period: "2 мес.",
        leads: "65 шт.",
        cpl: "1 150 ₽",
        roi: "+170%",
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
                <div className="text-3xl md:text-4xl font-bold text-primary">470+</div>
                <div className="text-sm text-muted-foreground mt-1">Заявок получено</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">от 285₽</div>
                <div className="text-sm text-muted-foreground mt-1">Стоимость заявки</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">+175%</div>
                <div className="text-sm text-muted-foreground mt-1">Средний ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground mt-1">Успешных проекта</div>
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
                  <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <h2 className="text-2xl md:text-3xl font-bold">{caseItem.title}</h2>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm">
                        {caseItem.platform}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-destructive mb-2">❌ Проблема клиента:</h3>
                        <p className="text-muted-foreground">{caseItem.problem}</p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary mb-2">✅ Решение G-TARGET:</h3>
                        <p className="text-muted-foreground">{caseItem.solution}</p>
                      </div>

                      <div>
                        <h3 className="font-bold mb-3">📊 Результаты:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">Бюджет</div>
                            <div className="font-bold text-lg">{caseItem.results.budget}</div>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">Период</div>
                            <div className="font-bold text-lg">{caseItem.results.period}</div>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">Заявки</div>
                            <div className="font-bold text-lg text-primary">{caseItem.results.leads}</div>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">CPL</div>
                            <div className="font-bold text-lg text-primary">{caseItem.results.cpl}</div>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
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
