import { TrendingUp, Users, Award, Zap, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";
import { Link } from "react-router-dom";

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
      accent: true,
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
    <section ref={ref} className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground text-center leading-[1.1] mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Почему бизнес{" "}
            <span className="text-primary">выбирает нас</span>,{" "}
            а не фрилансеров
          </motion.h2>
          <motion.p
            className="text-center text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Цифры, которые мы показываем клиентам на первой встрече
          </motion.p>
        </div>

        {/* Stats — bento cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isAccent = stat.accent;
            return (
              <motion.div
                key={index}
                className={`relative group rounded-3xl p-5 md:p-7 overflow-hidden transition-all duration-300 ${
                  isAccent
                    ? "bg-accent text-accent-foreground col-span-2 md:col-span-1"
                    : "bg-secondary/70 hover:bg-secondary"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-10 h-10 md:w-11 md:h-11 rounded-2xl flex items-center justify-center mb-4 ${
                  isAccent ? "bg-primary-foreground/15" : "bg-primary/10"
                }`}>
                  <Icon className={`h-5 w-5 ${isAccent ? "text-primary-foreground" : "text-primary"}`} />
                </div>

                <div className={`text-4xl md:text-5xl font-black tracking-tight mb-2 ${
                  isAccent ? "" : "text-foreground"
                }`}>
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

                <p className={`text-sm md:text-base font-medium leading-snug ${
                  isAccent ? "text-accent-foreground/70" : "text-muted-foreground"
                }`}>
                  {stat.label}
                </p>

                {isAccent && (
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-10 md:mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm md:text-base hover:gap-3 transition-all duration-300 group"
          >
            Получить бесплатный аудит
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBlock;