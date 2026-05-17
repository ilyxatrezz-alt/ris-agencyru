import { Star, ThumbsUp, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";
import { useReviews } from "@/hooks/useReviews";

const ReviewsBlock = () => {
  const { settings } = useSiteSettingsMap();
  const { data: reviewsData } = useReviews();

  const title = getSetting(settings, "home_reviews_title", "Отзывы наших клиентов");
  const subtitle = getSetting(settings, "home_reviews_subtitle", "Реальные истории успеха от владельцев бизнеса");
  const ratingValue = getSetting(settings, "home_reviews_rating_value", "5.0");
  const basedOnText = getSetting(settings, "home_reviews_based_on", "На основе 47 отзывов");
  const totalValue = getSetting(settings, "home_reviews_total_value", "47");
  const totalLabel = getSetting(settings, "home_reviews_total_label", "Всего отзывов");
  const recommendValue = getSetting(settings, "home_reviews_recommend_value", "100%");
  const recommendLabel = getSetting(settings, "home_reviews_recommend_label", "Рекомендуют");

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  };

  const reviews = reviewsData?.map((review) => ({
    name: review.author,
    initials: getInitials(review.author),
    date: new Date(review.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
    location: review.position,
    text: review.text,
    helpful: 0,
    rating: review.rating,
  })) || [];

  return (
    <section className="py-20 md:py-32 bg-secondary/40 relative overflow-hidden border-t border-foreground/10">
      <div className="container mx-auto px-4 relative z-10">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-4 mb-14">
          <div className="col-span-12 md:col-span-3">
            <span className="editorial-eyebrow text-foreground/60">§ 04 — Голоса</span>
            <div className="editorial-rule mt-4" />
            <p className="text-sm text-foreground/60 mt-6 leading-relaxed max-w-[16rem]">
              {subtitle}
            </p>
          </div>
          <motion.div
            className="col-span-12 md:col-span-9"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.035em] leading-[0.95] uppercase">
              {title.split(" ").slice(0, 1).join(" ")} <span className="font-display-italic font-normal normal-case text-primary">{title.split(" ").slice(1).join(" ")}</span>
            </h2>
          </motion.div>
        </div>

        {/* Rating Summary — sticky on desktop */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sticky rating card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              className="p-6 rounded-2xl bg-card shadow-card border border-border/50 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-primary mb-2">{ratingValue}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{basedOnText}</p>
              <div className="flex justify-center gap-6 pt-4 border-t border-border/50">
                <div>
                  <div className="text-xl font-bold">{totalValue}</div>
                  <p className="text-xs text-muted-foreground">{totalLabel}</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-primary">{recommendValue}</div>
                  <p className="text-xs text-muted-foreground">{recommendLabel}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scrolling reviews */}
          <div className="space-y-4">
            {reviews.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Отзывы скоро появятся
              </div>
            )}
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="p-5 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-card-hover hover:border-primary/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-sm flex-shrink-0">
                    {review.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-sm">{review.name}</h3>
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

                <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsBlock;
