import { Star, ThumbsUp, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ReviewsBlock = () => {
  const reviews = [
    {
      name: "Анна Петрова",
      initials: "АП",
      date: "15 января 2024",
      rating: 5,
      location: "Москва",
      text: "Обратились в G-TARGET для запуска рекламы нашей стоматологии. Результат превзошел все ожидания — за 2 месяца получили 87 записей при стоимости лида 2 100 рублей. Андрей и его команда работают профессионально, каждую неделю присылают детальные отчеты. Особенно понравилось, что они сразу честно сказали, какие каналы будут работать, а какие нет. Рекомендую!",
      helpful: 12,
    },
    {
      name: "Дмитрий Соколов",
      initials: "ДС",
      date: "8 января 2024",
      rating: 5,
      location: "Санкт-Петербург",
      text: "Заказывали комплекс: сайт + Яндекс.Директ. Сайт сделали за 3 недели, получился современный и удобный. Рекламу настроили быстро, первые заявки пошли на 4-й день. За 3 месяца работы стоимость заявки снизилась с 3 500 до 2 200 рублей. Очень довольны сотрудничеством, продолжаем работать.",
      helpful: 8,
    },
    {
      name: "Ольга Волкова",
      initials: "ОВ",
      date: "2 января 2024",
      rating: 5,
      location: "Краснодар",
      text: "Работаем с агентством уже полгода. Ведут таргет в ВК для нашего ресторана. Качество лидов отличное — люди реально приходят и делают заказы. Средний чек гостя из рекламы — 3 200 рублей при стоимости привлечения 180 рублей. ROI около 220%. Ребята всегда на связи, оперативно вносят правки. Спасибо!",
      helpful: 15,
    },
    {
      name: "Сергей Новиков",
      initials: "СН",
      date: "28 декабря 2023",
      rating: 5,
      location: "Екатеринбург",
      text: "Долго искали подрядчика для строительной компании. Попробовали G-TARGET — не пожалели. Запустили Яндекс.Директ на поиске, за 4 месяца получили 67 заявок на строительство домов. Конверсия из заявки в договор — 18%, что для нашей ниши очень хорошо. Стоимость лида держится в районе 3 800 рублей. Планируем масштабировать бюджет.",
      helpful: 6,
    },
    {
      name: "Марина Ковалева",
      initials: "МК",
      date: "20 декабря 2023",
      rating: 5,
      location: "Казань",
      text: "Обратилась за рекламой для косметологического кабинета. Настроили таргет ВКонтакте, результаты пошли уже через неделю. За 2 месяца записалось 94 новых клиента, средний чек процедуры 8 500 рублей. Окупили вложения в рекламу в первый же месяц! Отдельное спасибо за консультации по креативам — помогли подобрать правильные фото и тексты.",
      helpful: 19,
    },
    {
      name: "Александр Морозов",
      initials: "АМ",
      date: "12 декабря 2023",
      rating: 5,
      location: "Новосибирск",
      text: "Сотрудничаем около года. За это время попробовали разные каналы: Яндекс, ВК, Telegram. Везде стабильный результат. Нравится подход к работе — все делается системно, с аналитикой и постоянной оптимизацией. Стоимость лида за год снизилась на 42%. Бюджет вырос с 80 тысяч до 320 тысяч в месяц — нам выгодно масштабироваться с ними.",
      helpful: 11,
    },
  ];

  const averageRating = 5.0;
  const totalReviews = reviews.length;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Отзывы <span className="text-gradient-primary">Клиентов</span>
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-6 w-6 fill-accent text-accent"
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold">{averageRating}</span>
              </div>
              <span className="text-muted-foreground">
                • {totalReviews} отзывов
              </span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card
                key={index}
                className="p-6 space-y-4 hover:shadow-card-hover transition-base"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 bg-primary/10">
                      <AvatarFallback className="text-primary font-semibold">
                        {review.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{review.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {review.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "fill-accent text-accent"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.text}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-2 pt-2 border-t text-xs text-muted-foreground">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Полезно ({review.helpful})</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="text-center py-6">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/5 border border-primary/20">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="text-sm font-medium">
                Проверенные отзывы реальных клиентов
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsBlock;
