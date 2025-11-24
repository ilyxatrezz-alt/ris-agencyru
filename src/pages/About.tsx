import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Award, Target, Users, Zap, Shield, TrendingUp } from "lucide-react";

const About = () => {
  const principles = [
    {
      icon: Target,
      title: "Результат превыше всего",
      description: "Мы не продаем клики и показы. Мы продаем результат: заявки, звонки, продажи.",
    },
    {
      icon: Shield,
      title: "Прозрачность",
      description: "Еженедельные отчеты, доступ к рекламным кабинетам, прозрачное расходование бюджета.",
    },
    {
      icon: Zap,
      title: "Скорость реакции",
      description: "Ответ на любой вопрос в течение 2 часов. Оптимизация кампаний — каждый день.",
    },
    {
      icon: Users,
      title: "Команда экспертов",
      description: "Аналитики, контекстологи, таргетологи, дизайнеры — все в одной команде.",
    },
    {
      icon: TrendingUp,
      title: "Постоянное улучшение",
      description: "A/B-тестирование, анализ конкурентов, внедрение новых инструментов.",
    },
    {
      icon: Award,
      title: "Долгосрочное партнерство",
      description: "70% клиентов работают с нами более 3 лет. Мы растем вместе с вашим бизнесом.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">С 2014 года на рынке</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">
                О <span className="text-gradient-primary">G-TARGET</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Мы — команда экспертов в digital-маркетинге, которая помогает бизнесу расти с 2014 года
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="p-8 md:p-12 rounded-3xl bg-card shadow-card">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Наша история</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    G-TARGET начал свой путь в 2014 году как небольшое агентство контекстной рекламы. За эти годы мы выросли в полноценное digital-агентство, которое предоставляет комплексные услуги по привлечению клиентов через интернет.
                  </p>
                  <p>
                    Мы специализируемся на запуске и ведении контекстной рекламы в Яндекс.Директ (Поиск и РСЯ) и таргетированной рекламы в ВКонтакте. Также мы создаем конверсионные сайты и лендинги, которые превращают посетителей в клиентов.
                  </p>
                  <p>
                    За 10+ лет работы мы освоили более <strong className="text-primary">500 млн рублей</strong> рекламных бюджетов, запустили <strong className="text-primary">2 200+ успешных кампаний</strong> и помогли сотням компаний по всей России увеличить продажи.
                  </p>
                  <p>
                    Наш главный показатель — <strong className="text-accent">70% клиентов</strong> работают с нами более 3 лет. Это значит, что мы не только привлекаем новых клиентов, но и строим долгосрочные партнерские отношения.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Наши <span className="text-gradient-primary">Принципы Работы</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                То, что делает нас надежным партнером для вашего бизнеса
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={index}
                    className="p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-base border border-border/50"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary mb-6">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{principle.title}</h3>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  G-TARGET в <span className="text-gradient-accent">Цифрах</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-8 rounded-2xl bg-card shadow-card">
                  <div className="text-5xl font-bold text-gradient-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">лет успешной работы на рынке</div>
                </div>
                <div className="text-center p-8 rounded-2xl bg-card shadow-card">
                  <div className="text-5xl font-bold text-gradient-primary mb-2">500 млн+</div>
                  <div className="text-sm text-muted-foreground">рублей рекламных бюджетов</div>
                </div>
                <div className="text-center p-8 rounded-2xl bg-card shadow-card">
                  <div className="text-5xl font-bold text-gradient-accent mb-2">2 200+</div>
                  <div className="text-sm text-muted-foreground">успешных кампаний</div>
                </div>
                <div className="text-center p-8 rounded-2xl bg-card shadow-card">
                  <div className="text-5xl font-bold text-gradient-accent mb-2">70%</div>
                  <div className="text-sm text-muted-foreground">клиентов работают с нами 3+ года</div>
                </div>
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

export default About;
