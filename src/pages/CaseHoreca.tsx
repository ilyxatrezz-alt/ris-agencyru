import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
import { ArrowLeft, TrendingUp, Users, DollarSign, Calendar, Target } from "lucide-react";
import { Link } from "react-router-dom";

const CaseHoreca = () => {
  const cases = [
    {
      title: "Доставка суши — 2 340 заказов за месяц со средним чеком 1 850₽",
      platform: "Яндекс.Директ (РСЯ + Поиск)",
      problem: "Сеть суши-баров 'Токио' теряла заказы агрегаторам (Яндекс.Еда, Delivery Club), которые забирали 30% комиссии. Собственный сайт генерировал только 15% заказов.",
      solution: "Запустили агрессивную кампанию на брендовые запросы конкурентов и агрегаторов. Создали акцию 'Закажи напрямую — получи ролл в подарок'. РСЯ с геотаргетингом в радиусе доставки, показы в обеденное и вечернее время.",
      results: {
        budget: "127 000 ₽",
        period: "1 месяц",
        leads: "2 340 заказов",
        cpl: "54 ₽",
        roi: "+245%",
      },
    },
    {
      title: "Открытие ресторана грузинской кухни — 1 200 гостей за первый месяц",
      platform: "ВКонтакте (Таргет) + Яндекс.Директ",
      problem: "Новый ресторан 'Сахли' открывался в спальном районе Москвы без сформированной аудитории. Нужно было быстро создать поток гостей и запустить сарафанное радио.",
      solution: "За 2 недели до открытия запустили тизерную кампанию 'Скоро в вашем районе'. В день открытия — акция 'Хинкали за 1₽' (лимит 5 шт. на гостя). Таргетинг на жителей в радиусе 3 км с интересами: рестораны, кавказская кухня, семейный отдых.",
      results: {
        budget: "89 000 ₽",
        period: "1.5 месяца",
        leads: "1 200 посещений",
        cpl: "74 ₽",
        roi: "+198%",
      },
    },
    {
      title: "Кофейня формата to-go — Рост выручки на 85%",
      platform: "ВКонтакте (Таргет)",
      problem: "Сеть кофеен 'Wake Up' из 5 точек в бизнес-центрах испытывала спад после пандемии. Удалённая работа снизила трафик офисных сотрудников.",
      solution: "Переориентировали позиционирование на 'кофе по дороге'. Таргет на жителей ближайших домов с утренним временем показа (7:00-10:00). Запустили программу лояльности '6-й кофе бесплатно' с отслеживанием через Telegram-бота.",
      results: {
        budget: "45 000 ₽",
        period: "2 месяца",
        leads: "890 новых клиентов",
        cpl: "51 ₽",
        roi: "+185%",
      },
    },
    {
      title: "Банкетный зал — 34 свадьбы за сезон",
      platform: "Яндекс.Директ (Поиск)",
      problem: "Ресторан с банкетным залом на 120 человек получал мало заявок на свадьбы. Основной трафик — корпоративы, которые приносили меньше прибыли.",
      solution: "Создали отдельный лендинг для свадеб с виртуальным туром, примерами оформления и калькулятором банкета. Поисковые кампании на запросы 'свадьба под ключ', 'банкетный зал свадьба'. Ретаргетинг на посетителей свадебных порталов.",
      results: {
        budget: "156 000 ₽",
        period: "4 месяца",
        leads: "89 заявок",
        cpl: "1 752 ₽",
        roi: "+320%",
      },
    },
    {
      title: "Корпоративный кейтеринг — Контракты на 4.2 млн ₽",
      platform: "ВКонтакте + LinkedIn",
      problem: "Кейтеринговая компания хотела выйти на рынок корпоративных мероприятий, но не имела портфолио и контактов в B2B-сегменте.",
      solution: "Таргетировались на HR-директоров, офис-менеджеров, организаторов мероприятий. Создали кейсы 'было-стало' с фото и отзывами. Предлагали бесплатную дегустацию для компаний от 50 человек. Использовали Lead Ads для быстрого сбора контактов.",
      results: {
        budget: "78 000 ₽",
        period: "3 месяца",
        leads: "42 контракта",
        cpl: "1 857 ₽",
        roi: "+280%",
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
                Кейсы: <span className="text-gradient-primary">Рестораны & Общепит</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Успешные рекламные кампании для ресторанов, кафе, доставки еды и кейтеринга
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">4 500+</div>
                <div className="text-sm text-muted-foreground mt-1">Заказов/посещений</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">от 51₽</div>
                <div className="text-sm text-muted-foreground mt-1">Минимальный CPL</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">+245%</div>
                <div className="text-sm text-muted-foreground mt-1">Максимальный ROI</div>
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
            <WebsitesShowcase category="horeca" />
          </div>
        </section>
        
        <QuickContact />

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default CaseHoreca;