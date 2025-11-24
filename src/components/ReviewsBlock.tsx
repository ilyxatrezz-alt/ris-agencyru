import { Star, ThumbsUp, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const ReviewsBlock = () => {
  const reviews = [
    {
      name: "Анна Петрова",
      initials: "АП",
      date: "15 января 2024",
      location: "Москва",
      text: "Обратились в G-TARGET для запуска рекламы нашей стоматологии. Результат превзошел все ожидания — за 2 месяца получили 87 записей при стоимости лида 2 100 рублей. Андрей и его команда работают профессионально, каждую неделю присылают детальные отчеты. Особенно понравилось, что они сразу честно сказали, какие каналы будут работать, а какие нет. Рекомендую!",
      helpful: 12,
    },
    {
      name: "Дмитрий Соколов",
      initials: "ДС",
      date: "8 января 2024",
      location: "Санкт-Петербург",
      text: "Заказывали комплекс: сайт + Яндекс.Директ. Сайт сделали за 3 недели, получился современный и удобный. Рекламу настроили быстро, первые заявки пошли на 4-й день. За 3 месяца работы стоимость заявки снизилась с 3 500 до 2 200 рублей. Очень довольны сотрудничеством, продолжаем работать.",
      helpful: 8,
    },
    {
      name: "Ольга Волкова",
      initials: "ОВ",
      date: "2 января 2024",
      location: "Краснодар",
      text: "Работаем с агентством уже полгода. Ведут таргет в ВК для нашего ресторана. Качество лидов отличное — люди реально приходят и делают заказы. Средний чек гостя из рекламы — 3 200 рублей при стоимости привлечения 180 рублей. ROI около 220%. Ребята всегда на связи, оперативно вносят правки. Спасибо!",
      helpful: 15,
    },
    {
      name: "Сергей Новиков",
      initials: "СН",
      date: "28 декабря 2023",
      location: "Екатеринбург",
      text: "Долго искали подрядчика для строительной компании. Попробовали G-TARGET — не пожалели. Запустили Яндекс.Директ на поиске, за 4 месяца получили 67 заявок на строительство домов. Конверсия из заявки в договор — 18%, что для нашей ниши очень хорошо. Стоимость лида держится в районе 3 800 рублей. Планируем масштабировать бюджет.",
      helpful: 6,
    },
    {
      name: "Марина Ковалева",
      initials: "МК",
      date: "20 декабря 2023",
      location: "Казань",
      text: "Обратилась за рекламой для косметологического кабинета. Настроили таргет ВКонтакте, результаты пошли уже через неделю. За 2 месяца записалось 94 новых клиента, средний чек процедуры 8 500 рублей. Окупили вложения в рекламу в первый же месяц! Отдельное спасибо за консультации по креативам — помогли подобрать правильные фото и тексты.",
      helpful: 19,
    },
    {
      name: "Александр Морозов",
      initials: "АМ",
      date: "12 декабря 2023",
      location: "Новосибирск",
      text: "Сотрудничаем около года. За это время попробовали разные каналы: Яндекс, ВК, Telegram. Везде стабильный результат. Нравится подход к работе — все делается системно, с аналитикой и постоянной оптимизацией. Стоимость лида за год снизилась на 42%. Бюджет вырос с 80 тысяч до 320 тысяч в месяц — нам выгодно масштабироваться с ними.",
      helpful: 11,
    },
  ];

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
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
            Отзывы наших <span className="text-gradient-primary">клиентов</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Реальные отзывы о нашей работе
          </p>
        </motion.div>

        {/* Yandex-style Rating Summary */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12 p-8 rounded-2xl bg-card/80 backdrop-blur-sm shadow-card border border-border/50 hover:shadow-card-hover transition-all duration-500 relative overflow-hidden"
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
              <p className="text-sm text-muted-foreground">На основе 18 отзывов</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-2xl font-bold text-foreground">18</div>
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
              className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm shadow-card border border-border/50 hover:shadow-card-hover hover:border-primary/30 transition-all duration-500 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
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
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Полезно ({review.helpful})
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsBlock;
