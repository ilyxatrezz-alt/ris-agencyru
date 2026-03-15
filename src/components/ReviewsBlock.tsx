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
    <section className="py-20 relative overflow-hidden">
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
            {title.split(" ").slice(0, 1).join(" ")}{" "}
            <span className="text-gradient-primary">{title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
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
                {ratingValue}
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
              <p className="text-sm text-muted-foreground">{basedOnText}</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-2xl font-bold text-foreground">{totalValue}</div>
                <p className="text-xs text-muted-foreground">{totalLabel}</p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-2xl font-bold text-primary">{recommendValue}</div>
                <p className="text-xs text-muted-foreground">{recommendLabel}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {reviews.length === 0 && (
            <div className="col-span-2 text-center py-12 text-muted-foreground">
              Отзывы скоро появятся
            </div>
          )}
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
                <motion.div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg flex-shrink-0 shadow-lg">
                  {review.initials}
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{review.name}</h3>
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

export default ReviewsBlock;
