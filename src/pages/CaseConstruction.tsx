import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import WebsitesShowcase from "@/components/WebsitesShowcase";
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
