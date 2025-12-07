import { Star, ThumbsUp, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useCityContext } from "@/contexts/CityContext";

const CityReviews = () => {
  const { city, isLocalPage } = useCityContext();

  // Default reviews for the main site
  const defaultReviews = [
    {
      name: "Елена Васильева",
      initials: "ЕВ",
      date: "15 ноября 2024",
      location: "Москва",
      text: "Заказали сайт и рекламу для стоматологии. РИС сделали невозможное — за 2 месяца 127 записей на услуги! Стоимость привлечения пациента всего 1 800₽. Команда работает как швейцарские часы: еженедельные отчёты, прозрачная аналитика, мгновенная реакция на запросы. Окупили вложения уже в первый месяц!",
      helpful: 24,
    },
    {
      name: "Игорь Кузнецов",
      initials: "ИК",
      date: "3 ноября 2024",
      location: "Санкт-Петербург",
      text: "Искали подрядчика полгода — все обещали золотые горы. РИС просто сделали: сайт за 2 недели, реклама заработала на 3-й день. За квартал снизили стоимость заявки с 4 200₽ до 1 900₽. Выручка выросла на 340%. Теперь планируем открывать филиал — ребята уже готовят запуск рекламы под новую локацию.",
      helpful: 18,
    },
    {
      name: "Наталья Романова",
      initials: "НР",
      date: "28 октября 2024",
      location: "Краснодар",
      text: "Ресторанный бизнес — сложная ниша. РИС разобрались за неделю и выстроили систему привлечения гостей. Средний чек с рекламы — 4 100₽, стоимость привлечения — 140₽. ROI 290%! Главное — качество аудитории: люди приходят, возвращаются, рекомендуют. За 8 месяцев база постоянных клиентов выросла втрое.",
      helpful: 31,
    },
    {
      name: "Артём Белов",
      initials: "АБ",
      date: "15 октября 2024",
      location: "Екатеринбург",
      text: "Строительство домов — это долгий цикл сделки и высокая конкуренция. РИС выстроили воронку, которая реально работает. За 5 месяцев — 89 целевых заявок, 14 подписанных договоров на общую сумму 47 млн рублей. Конверсия 15,7% — это фантастика для нашей ниши. Масштабируем бюджет в 3 раза.",
      helpful: 15,
    },
    {
      name: "Виктория Орлова",
      initials: "ВО",
      date: "2 октября 2024",
      location: "Казань",
      text: "Косметологический кабинет полностью загружен благодаря РИС. 156 новых клиентов за 3 месяца, средний чек 12 400₽. Вложения в рекламу окупились в 8 раз! Отдельная благодарность за помощь с позиционированием — помогли выделиться среди конкурентов. Теперь очередь расписана на месяц вперёд.",
      helpful: 27,
    },
    {
      name: "Максим Титов",
      initials: "МТ",
      date: "18 сентября 2024",
      location: "Новосибирск",
      text: "Работаем с РИС больше года. Начинали с бюджета 60 тысяч, сейчас инвестируем 450 тысяч ежемесячно — потому что это выгодно. Стоимость лида снизилась на 58%, конверсия в продажу выросла на 40%. Системный подход, постоянная оптимизация, честная коммуникация. Лучшее вложение в маркетинг.",
      helpful: 22,
    },
  ];

  // Use city reviews if on local page, otherwise default
  const reviews = isLocalPage && city 
    ? city.reviews.map(r => ({ ...r, location: city.name }))
    : defaultReviews;

  const sectionTitle = isLocalPage && city 
    ? `Отзывы клиентов из ${city.nameGenitive}`
    : "Отзывы наших клиентов";

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {isLocalPage && city ? (
              <>Отзывы клиентов из <span className="text-gradient-primary">{city.nameGenitive}</span></>
            ) : (
              <>Отзывы наших <span className="text-gradient-primary">клиентов</span></>
            )}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isLocalPage && city 
              ? `Реальные истории успеха бизнеса ${city.nameGenitive}`
              : "Реальные истории успеха от владельцев бизнеса"
            }
          </p>
        </motion.div>

        {/* Yandex-style Rating Summary */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12 p-8 rounded-2xl bg-card/80 backdrop-blur-sm shadow-card border border-border/50 hover:shadow-red-glow transition-all duration-500 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-center md:text-left">
              <motion.div 
                className="text-6xl font-bold text-primary mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                5.0
              </motion.div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {isLocalPage && city 
                  ? `${reviews.length} отзывов из ${city.nameGenitive}`
                  : "На основе 47 отзывов"
                }
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-2xl font-bold text-foreground">{isLocalPage ? reviews.length : 47}</div>
                <p className="text-xs text-muted-foreground">Всего отзывов</p>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-2xl font-bold text-primary">100%</div>
                <p className="text-xs text-muted-foreground">Рекомендуют</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm shadow-card border border-border/50 hover:shadow-red-glow hover:border-primary/30 transition-all duration-500 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Hover Gradient Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              {/* Header */}
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <motion.div 
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg flex-shrink-0 shadow-lg"
                >
                  {review.initials}
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{review.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {review.location}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-foreground mb-4 leading-relaxed relative z-10">{review.text}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50 relative z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Полезно ({review.helpful})
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityReviews;
