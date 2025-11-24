import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { ArrowLeft, TrendingUp, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import caseRestaurant from "@/assets/case-restaurant.jpg";

const CaseHoreca = () => {
  const cases = [
    {
      title: "Рост заказов доставки еды на 220% для сети ресторанов",
      platform: "Яндекс.Директ (РСЯ)",
      problem: "Сеть ресторанов хотела увеличить онлайн-заказы через собственный сайт. Конкуренция с агрегаторами была высокой.",
      solution: "Запустили РСЯ с аппетитными фото блюд и акционными предложениями ('Скидка 20% на первый заказ'). Использовали ретаргетинг на посетителей сайта. Настроили кампании на пиковые часы заказов (обед, ужин).",
      results: {
        budget: "85 000 ₽",
        period: "2 месяца",
        leads: "1 520 заказов",
        cpl: "56 ₽",
        roi: "+220%",
      },
    },
    {
      title: "Привлечение 850 гостей для нового ресторана премиум-класса",
      platform: "ВКонтакте (Таргет)",
      problem: "Новый ресторан в центре города нуждался в быстром наборе базы постоянных гостей. Требовалось создать ажиотаж вокруг открытия.",
      solution: "Разработали кампанию запуска с акцентом на эксклюзивность: таргетировались на аудиторию с высоким доходом в радиусе 5 км от ресторана. Создали цепочку объявлений с виртуальным туром по ресторану, интервью с шеф-поваром. Запустили конкурс на бесплатный ужин.",
      results: {
        budget: "120 000 ₽",
        period: "3 месяца",
        leads: "850 бронирований",
        cpl: "141 ₽",
        roi: "+180%",
      },
    },
    {
      title: "Увеличение заказов кейтеринга на корпоративы на 165%",
      platform: "ВКонтакте (Таргет)",
      problem: "Кейтеринговая компания хотела увеличить продажи в сегменте корпоративных мероприятий. Сезонность спроса создавала проблемы с прогнозированием.",
      solution: "Таргетировались на руководителей компаний, HR-менеджеров, организаторов мероприятий. Создали контент с кейсами успешных корпоративов, меню для разных бюджетов. Использовали lead-ads для быстрого сбора заявок.",
      results: {
        budget: "95 000 ₽",
        period: "4 месяца",
        leads: "78 контрактов",
        cpl: "1 217 ₽",
        roi: "+165%",
      },
    },
  ];

  const websiteCases = [
    {
      title: "Сайт с онлайн-меню и бронированием для ресторана",
      task: "Создать стильный сайт с интеграцией системы бронирования столиков и онлайн-заказа еды",
      result: "Онлайн-заказы выросли на 180%. Снижение нагрузки на администраторов. Автоматическое управление бронированиями через личный кабинет.",
      image: caseRestaurant,
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
                Кейсы: <span className="text-gradient-primary">Рестораны & Общепит</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Успешные рекламные кампании для ресторанов, кафе и служб доставки
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
                Создание Сайтов для <span className="text-gradient-primary">HoReCa</span>
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

export default CaseHoreca;
