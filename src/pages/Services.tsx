import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Target, Globe, BarChart, TrendingUp, Users, Send, Gift } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Search,
      title: "Контекстная реклама Яндекс.Директ",
      description: "Запуск и ведение контекстной рекламы на поиске Яндекса и в рекламной сети (РСЯ)",
      features: [
        "Настройка рекламных кампаний в Яндекс.Директ",
        "Поиск: показы по ключевым запросам",
        "РСЯ: охват аудитории на партнерских площадках",
        "Ежедневная оптимизация ставок и объявлений",
        "Подбор и расширение семантического ядра",
        "A/B тестирование объявлений",
      ],
      benefits: [
        "Быстрый старт кампании — от 3 дней",
        "Средний CPL на 40% ниже рынка",
        "Прозрачная отчетность каждую неделю",
      ],
    },
    {
      icon: Target,
      title: "Таргетированная реклама ВКонтакте",
      description: "Настройка и ведение таргетированной рекламы в социальной сети ВКонтакте",
      features: [
        "Точный таргетинг по интересам и поведению",
        "Ретаргетинг на базу клиентов и посетителей сайта",
        "Создание креативов и посадочных страниц",
        "Тестирование аудиторий и форматов",
        "Работа с look-alike аудиториями",
        "Воронка продаж от охвата до конверсии",
      ],
      benefits: [
        "Охват целевой аудитории по всей России",
        "Высокая вовлеченность пользователей",
        "Низкая стоимость клика (CPC)",
      ],
    },
    {
      icon: Send,
      title: "Реклама в Telegram",
      description: "Размещение рекламы в Telegram каналах и через Telegram Ads платформу",
      features: [
        "Подбор релевантных каналов для вашей ниши",
        "Настройка рекламы через Telegram Ads",
        "Создание продающих креативов и текстов",
        "Геотаргетинг и таргетинг по интересам",
        "Аналитика и отчетность по показам",
        "Оптимизация рекламных кампаний",
      ],
      benefits: [
        "Высокая вовлеченность аудитории Telegram",
        "Точный таргетинг на целевую аудиторию",
        "Прозрачная статистика по каждому каналу",
      ],
      isBonus: true,
    },
    {
      icon: Globe,
      title: "Создание сайтов",
      description: "Разработка конверсионных сайтов и лендингов под ключ",
      features: [
        "Лендинги с высокой конверсией",
        "Корпоративные сайты",
        "Интернет-магазины",
        "Адаптивный дизайн для всех устройств",
        "SEO-оптимизация",
        "Интеграция с CRM и аналитикой",
      ],
      benefits: [
        "Срок разработки от 2 недель",
        "Рост конверсии в среднем на 35%",
        "Поддержка и техническое обслуживание",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Наши <span className="text-gradient-primary">Услуги</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Полный спектр digital-маркетинга для роста вашего бизнеса
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-20">
          <div className="container mx-auto px-4 space-y-20">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="grid md:grid-cols-2 gap-12 items-center"
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold">{service.title}</h2>
                        {service.isBonus && (
                          <div className="flex items-center gap-2 mt-2">
                            <Gift className="h-4 w-4 text-accent" />
                            <span className="text-sm font-semibold text-accent">
                              БОНУС при покупке сайта + Яндекс/ВК реклама
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground">{service.description}</p>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Что входит:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-accent/10 border border-accent/20 space-y-2">
                      <h4 className="font-semibold text-accent">Преимущества:</h4>
                      {service.benefits.map((benefit, idx) => (
                        <p key={idx} className="text-sm">{benefit}</p>
                      ))}
                    </div>

                    <Button variant="cta" size="lg" asChild>
                      <Link to="/contacts">Заказать услугу</Link>
                    </Button>
                  </div>

                  <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-card shadow-card">
                          <BarChart className="h-8 w-8 text-accent mb-2" />
                          <div className="text-2xl font-bold text-primary">95%</div>
                          <div className="text-xs text-muted-foreground">Удовлетворенность</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-card shadow-card">
                          <TrendingUp className="h-8 w-8 text-accent mb-2" />
                          <div className="text-2xl font-bold text-primary">+150%</div>
                          <div className="text-xs text-muted-foreground">Средний рост</div>
                        </div>
                      </div>
                      <div className="mt-8 space-y-4">
                        <div className="p-6 rounded-2xl bg-card shadow-card">
                          <Users className="h-8 w-8 text-accent mb-2" />
                          <div className="text-2xl font-bold text-primary">100+</div>
                          <div className="text-xs text-muted-foreground">Проектов</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-card shadow-card">
                          <Target className="h-8 w-8 text-accent mb-2" />
                          <div className="text-2xl font-bold text-primary">-40%</div>
                          <div className="text-xs text-muted-foreground">CPL vs рынок</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
