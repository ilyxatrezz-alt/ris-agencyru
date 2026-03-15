import { TrendingUp, Users, Award, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const StatsBlock = () => {
  const { settings } = useSiteSettingsMap();
  const ref = useRef(null);

  const badgeText = getSetting(settings, "home_stats_badge", "Топ-1 агентство");
  const footerText = getSetting(settings, "home_stats_footer", "Бесплатный аудит покажет точки роста");

  const numOr = (key: string, fallback: number) => {
    const raw = getSetting(settings, key, String(fallback)).replace(/\s/g, "");
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  };

  const stats = [
    {
      icon: TrendingUp,
      numValue: numOr("home_stats_1_value", 40),
      suffix: getSetting(settings, "home_stats_1_suffix", "%"),
      prefix: getSetting(settings, "home_stats_1_prefix", "−"),
      label: getSetting(settings, "home_stats_1_label", "Стоимость лида ниже рынка"),
    },
    {
      icon: Award,
      numValue: numOr("home_stats_2_value", 200),
      suffix: getSetting(settings, "home_stats_2_suffix", "+"),
      label: getSetting(settings, "home_stats_2_label", "Успешных проектов"),
    },
    {
      icon: Users,
      numValue: numOr("home_stats_3_value", 70),
      suffix: getSetting(settings, "home_stats_3_suffix", "%"),
      label: getSetting(settings, "home_stats_3_label", "Клиентов с нами 3+ года"),
    },
    {
      icon: Zap,
      value: getSetting(settings, "home_stats_4_value", "3 дня"),
      label: getSetting(settings, "home_stats_4_label", "До запуска рекламы"),
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
            <Award className="h-4 w-4" />
            {badgeText}
          </span>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center space-y-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-black text-foreground">
                  {stat.numValue ? (
                    <AnimatedCounter
                      value={stat.numValue}
                      suffix={stat.suffix || ""}
                      prefix={stat.prefix || ""}
                    />
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Footer text */}
        <motion.p
          className="text-center text-muted-foreground mt-10 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {footerText}
        </motion.p>
      </div>
    </section>
  );
};

export default StatsBlock;
