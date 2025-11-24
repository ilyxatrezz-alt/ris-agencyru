import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
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

        {/* Cases */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 space-y-12 md:space-y-16">
            {cases.map((caseItem, index) => (
              <div key={index}>
                <div className="max-w-5xl mx-auto p-6 md:p-12 rounded-2xl md:rounded-3xl bg-card shadow-card border border-border/50">
                  {/* ... keep existing code */}
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
