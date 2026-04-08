import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, Target, Globe, BarChart, TrendingUp, Users, Send, Gift, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      icon: Search,
      title: "Контекстная реклама Яндекс.Директ",
      description: "Находим клиентов, которые уже ищут ваш продукт. Показываемся в момент максимальной готовности к покупке.",
      features: [
        "Глубокий анализ ниши и конкурентов",
        "Сбор и кластеризация семантического ядра",
        "Настройка поисковых и РСЯ-кампаний",
        "Ежедневная оптимизация ставок",
        "A/B-тестирование объявлений",
        "Сквозная аналитика до продажи",
      ],
      results: [
        "Запуск за 3-5 дней",
        "CPL на 40% ниже рынка",
        "ROI от 300%",
      ],
      price: "от 30 000 ₽/мес",
    },
    {
      icon: Target,
      title: "Таргетированная реклама ВКонтакте",
      description: "Достаём вашу аудиторию там, где она проводит время. Работаем с холодным и тёплым трафиком.",
      features: [
        "Парсинг и сегментация аудиторий",
        "Создание продающих креативов",
        "Ретаргетинг и look-alike",
        "Тестирование гипотез",
        "Прогрев аудитории через контент",
        "Интеграция с CRM",
      ],
      results: [
        "Охват от 100 000 человек/мес",
        "CTR выше среднего в 2 раза",
        "Конверсия в заявку до 15%",
      ],
      price: "от 25 000 ₽/мес",
    },
    {
      icon: Send,
      title: "Реклама в Telegram",
      description: "Размещение в каналах и через Telegram Ads. Самая платёжеспособная аудитория рунета.",
      features: [
        "Подбор релевантных каналов",
        "Настройка Telegram Ads",
        "Создание нативных интеграций",
        "Геотаргетинг по городам",
        "Аналитика переходов и конверсий",
        "Оптимизация размещений",
      ],
      results: [
        "Вовлечённость до 30%",
        "Доверие к рекомендациям",
        "Быстрый охват ЦА",
      ],
      price: "от 20 000 ₽/мес",
      isBonus: true,
    },
    {
      icon: Globe,
      title: "Создание сайтов под ключ",
      description: "Сайты, которые продают. Не просто красивые картинки, а инструменты для бизнеса с высокой конверсией.",
      features: [
        "Продающие лендинги от 2 недель",
        "Корпоративные сайты",
        "Интернет-магазины",
        "Адаптив под все устройства",
        "SEO-оптимизация",
        "Интеграция с CRM и аналитикой",
      ],
      results: [
        "Конверсия от 5%",
        "Загрузка менее 3 секунд",
        "Техподдержка 12 месяцев",
      ],
      price: "от 80 000 ₽",
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Услуги digital-агентства РИС в Донецке — Реклама, сайты, SMM</title>
        <meta name="description" content="Услуги digital-агентства в Донецке: контекстная реклама Яндекс.Директ, таргетированная реклама ВКонтакте, создание сайтов, SMM продвижение. Директолог и таргетолог в Донецке." />
        <meta name="keywords" content="реклама Донецк, директолог Донецк, таргетолог Донецк, создание рекламы Донецк, digital агентство Донецк, маркетинг ДНР" />
      </Helmet>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24 bg-accent text-accent-foreground relative overflow-hidden noise">
          <div className="absolute inset-0 gradient-hero" />
          <motion.div
            className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full gradient-red-glow opacity-30"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black">
                Наши <span className="text-gradient-primary">услуги</span>
              </h1>
              <p className="text-lg md:text-xl text-accent-foreground/70 max-w-2xl mx-auto">
                Комплексный digital-маркетинг для роста вашего бизнеса. 
                От первого клика до повторной продажи.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-24">
          <div className="container mx-auto px-4 space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 1;
              
              return (
                <motion.div
                  key={index}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`space-y-6 ${isEven ? "lg:order-2" : ""}`}>
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-cta flex-shrink-0"
                        whileHover={{ rotate: 10, scale: 1.05 }}
                      >
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-black">{service.title}</h2>
                        {service.isBonus && (
                          <div className="flex items-center gap-2 mt-2">
                            <Gift className="h-4 w-4 text-primary" />
                            <span className="text-sm font-bold text-primary">
                              БОНУС при заказе сайта + реклама
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3">
                      <h3 className="font-bold text-lg">Что входит:</h3>
                      <ul className="grid gap-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
                      <h4 className="font-bold text-primary">Результаты:</h4>
                      {service.results.map((result, idx) => (
                        <p key={idx} className="text-sm font-medium">{result}</p>
                      ))}
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Стоимость:</span>
                        <p className="text-2xl font-black text-primary">{service.price}</p>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="gradient-primary shadow-cta font-bold group" asChild>
                          <Link to="/contacts">
                            Заказать
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </div>

                  <div className={`${isEven ? "lg:order-1" : ""}`}>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: BarChart, value: "95%", label: "Клиенты довольны" },
                        { icon: TrendingUp, value: "+150%", label: "Средний рост" },
                        { icon: Users, value: "100+", label: "Проектов" },
                        { icon: Target, value: "−40%", label: "CPL vs рынок" },
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          className="p-6 rounded-2xl bg-card shadow-card border border-border/50 hover:border-primary/30 hover:shadow-card-hover transition-all"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ y: -3 }}
                        >
                          <stat.icon className="h-8 w-8 text-primary mb-3" />
                          <div className="text-2xl font-black text-primary">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Packages CTA */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black">
                Не знаете, что выбрать?
              </h2>
              <p className="text-lg text-muted-foreground">
                Закажите бесплатный аудит — мы проанализируем вашу ситуацию и предложим 
                оптимальную стратегию для достижения ваших целей.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="gradient-primary shadow-cta h-14 px-8 font-bold text-lg" asChild>
                  <Link to="/contacts">
                    Получить бесплатный аудит
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
