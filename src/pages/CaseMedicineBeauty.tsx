import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { ArrowLeft, TrendingUp, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import caseDentistry from "@/assets/case-dentistry.jpg";

const CaseMedicineBeauty = () => {
  const cases = [
    {
      title: "Рост записей на имплантацию на 150% для стоматологии 'Дента Смайл'",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Клиника испытывала недостаток записей на дорогостоящие процедуры имплантации. Конкуренция в нише высокая, стоимость клика растет.",
      solution: "Запустили кампании на поиске с акцентом на коммерческие запросы ('имплантация зубов под ключ', 'сколько стоит имплант'). Использовали расширения объявлений с указанием цен и акций. Настроили ретаргетинг на посетителей сайта.",
      results: {
        budget: "180 000 ₽",
        period: "3 месяца",
        leads: "72 заявки",
        cpl: "2 500 ₽",
        roi: "+150%",
      },
    },
    {
      title: "Увеличение потока пациентов для косметологической клиники на 200%",
      platform: "Яндекс.Директ (РСЯ)",
      problem: "Клиника хотела расширить базу клиентов на услуги инъекционной косметологии. Требовалось привлечение новой аудитории.",
      solution: "Запустили РСЯ с визуальными креативами 'до/после'. Использовали таргетинг по интересам (красота, здоровье, anti-age). Настроили связку с Яндекс.Метрикой для отслеживания звонков.",
      results: {
        budget: "95 000 ₽",
        period: "2 месяца",
        leads: "118 заявок",
        cpl: "805 ₽",
        roi: "+200%",
      },
    },
    {
      title: "Снижение CPL на 35% для урологической клиники",
      platform: "ВКонтакте (Таргет)",
      problem: "Клиника получала дорогие заявки через другие каналы. Нужно было найти более экономичный источник пациентов.",
      solution: "Запустили таргетированную рекламу в ВК с фокусом на мужскую аудиторию 35-55 лет. Создали цепочку объявлений с образовательным контентом и призывом к консультации. Использовали look-alike аудитории.",
      results: {
        budget: "65 000 ₽",
        period: "2 месяца",
        leads: "95 заявок",
        cpl: "684 ₽",
        roi: "+165%",
      },
    },
    {
      title: "Привлечение 140 новых клиентов для салона пластической хирургии",
      platform: "ВКонтакте (Таргет)",
      problem: "Салон нуждался в стабильном потоке консультаций на дорогостоящие операции. Аудитория узкая и требовательная.",
      solution: "Разработали стратегию доверия: запустили серию статей и видео с отзывами реальных пациентов. Таргетировались на женскую аудиторию 25-45 лет с доходом выше среднего. Настроили воронку от консультации до записи.",
      results: {
        budget: "220 000 ₽",
        period: "4 месяца",
        leads: "140 консультаций",
        cpl: "1 571 ₽",
        roi: "+190%",
      },
    },
  ];

  const websiteCases = [
    {
      title: "Корпоративный сайт стоматологической клиники",
      task: "Создать современный сайт с онлайн-записью и каталогом услуг",
      result: "Конверсия в запись выросла на 45%. Интеграция с CRM для автоматической обработки заявок.",
      image: caseDentistry,
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
                Успешные рекламные кампании для косметологов, стоматологов, урологов и пластических хирургов
              </p>
            </div>
          </div>
        </section>

        {/* Cases */}
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

        {/* Website Cases */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Создание Сайтов для <span className="text-gradient-primary">Медицины</span>
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

export default CaseMedicineBeauty;
