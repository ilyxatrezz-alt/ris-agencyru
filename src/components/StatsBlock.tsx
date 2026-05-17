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
    <section ref={ref} className="py-20 md:py-32 overflow-hidden border-t border-foreground/10">
      <div className="container mx-auto px-4">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-4 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <span className="editorial-eyebrow text-foreground/60">§ 01 — Цифры</span>
            <div className="editorial-rule mt-4" />
          </div>
          <motion.div
            className="col-span-12 md:col-span-9"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.035em] leading-[0.95] uppercase">
              Почему бизнес <span className="font-display-italic font-normal normal-case text-primary">выбирает</span> нас,
              <br className="hidden sm:block" /> а не фрилансеров
            </h2>
            <p className="mt-6 text-base md:text-lg text-foreground/60 max-w-xl">
              Цифры, которые мы показываем клиентам на первой встрече.
            </p>
          </motion.div>
        </div>

        {/* Stats — editorial bento */}
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isAccent = stat.accent;
            const spans = [
              "col-span-12 md:col-span-7 md:row-span-2",
              "col-span-6 md:col-span-5",
              "col-span-6 md:col-span-5",
              "col-span-12 md:col-span-7",
            ];
            return (
              <motion.div
                key={index}
                className={`${spans[index]} relative group rounded-[28px] p-6 md:p-10 overflow-hidden flex flex-col justify-between min-h-[200px] md:min-h-[260px] transition-all duration-500 ${
                  isAccent
                    ? "bg-foreground text-background"
                    : "bg-secondary hover:bg-secondary/60 border border-foreground/5"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <div className="flex items-start justify-between">
                  <span className={`editorial-eyebrow ${isAccent ? "text-background/50" : "text-foreground/40"}`}>
                    № {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className={`h-5 w-5 ${isAccent ? "text-primary" : "text-foreground/40"}`} />
                </div>

                <div>
                  <div className={`font-display text-[clamp(4rem,11vw,9rem)] leading-[0.85] tracking-[-0.04em] ${
                    isAccent ? "text-background" : "text-foreground"
                  }`}>
                    {stat.numValue ? (
                      <>
                        {stat.prefix || ""}
                        <AnimatedCounter value={stat.numValue} />
                        <span className="text-primary">{stat.suffix || ""}</span>
                      </>
                    ) : (
                      <span>{stat.value}</span>
                    )}
                  </div>
                  <div className={`mt-4 editorial-rule ${isAccent ? "bg-background" : ""}`} />
                  <p className={`mt-4 text-sm md:text-base font-medium uppercase tracking-wider leading-snug ${
                    isAccent ? "text-background/70" : "text-foreground/60"
                  }`}>
                    {stat.label}
                  </p>
                </div>

                {isAccent && (
                  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Editorial CTA */}
        <motion.div
          className="flex items-center justify-between mt-16 pt-8 border-t border-foreground/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span className="font-display-italic text-3xl md:text-4xl text-foreground/30 hidden sm:block">
            Готовы убедиться?
          </span>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] group"
          >
            <span>Получить аудит</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background group-hover:bg-primary transition-colors">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBlock;