import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";
import { Link } from "react-router-dom";

const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
  suffixClass = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  suffixClass?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 1800;
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
      <span className={suffixClass}>{suffix}</span>
    </span>
  );
};

const StatsBlock = () => {
  const { settings } = useSiteSettingsMap();

  const numOr = (key: string, fallback: number) => {
    const raw = getSetting(settings, key, String(fallback)).replace(/\s/g, "");
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  };

  const v1 = numOr("home_stats_1_value", 40);
  const s1 = getSetting(settings, "home_stats_1_suffix", "%");
  const p1 = getSetting(settings, "home_stats_1_prefix", "−");
  const l1 = getSetting(settings, "home_stats_1_label", "стоимость лида ниже рынка");

  const v2 = numOr("home_stats_2_value", 200);
  const s2 = getSetting(settings, "home_stats_2_suffix", "+");
  const l2 = getSetting(settings, "home_stats_2_label", "успешных проектов");

  const v3 = numOr("home_stats_3_value", 70);
  const s3 = getSetting(settings, "home_stats_3_suffix", "%");
  const l3 = getSetting(settings, "home_stats_3_label", "клиентов с нами");

  const v4 = getSetting(settings, "home_stats_4_value", "3 ДНЯ");
  const l4 = getSetting(settings, "home_stats_4_label", "до запуска рекламы");

  return (
    <section className="relative bg-foreground text-background overflow-hidden border-t border-foreground/10">
      {/* Top editorial header */}
      <div className="relative z-20 container mx-auto px-4 pt-20 md:pt-28 pb-10 md:pb-16">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-12 md:col-span-3">
            <span className="editorial-eyebrow text-background/50">§ 01 — Цифры</span>
            <div className="h-px bg-background/20 mt-4" />
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
            <p className="mt-6 text-base md:text-lg text-background/60 max-w-xl">
              Цифры, которые мы показываем клиентам на первой встрече.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Kinetic editorial composition */}
      <div className="relative w-full px-4 sm:px-6 pt-8 pb-16 md:pb-28">
        <div className="relative w-full max-w-7xl mx-auto h-[560px] sm:h-[640px] md:h-[680px] lg:h-[720px]">
          {/* Watermark word — МЫ */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none select-none">
            <span className="text-[60vw] sm:text-[48vw] md:text-[40vw] font-black text-background leading-[0.8] tracking-[-0.06em]">
              МЫ
            </span>
          </div>

          {/* Metric 1 — top-left, primary red, massive */}
          <motion.div
            className="absolute top-0 left-0 sm:-translate-x-2 md:-translate-x-6 z-30"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col">
              <span className="text-primary text-[22vw] sm:text-[18vw] md:text-[14vw] lg:text-[12.5vw] font-black leading-[0.8] tracking-[-0.05em]">
                <AnimatedCounter value={v1} prefix={p1} suffix={s1} />
              </span>
              <span className="font-display-italic text-xl sm:text-2xl md:text-4xl text-background italic ml-2 sm:ml-4 mt-2 max-w-[12rem] md:max-w-[18rem] leading-tight">
                {l1}
              </span>
            </div>
          </motion.div>

          {/* Metric 2 — top-right (moved up so sticker doesn't clash) */}
          <motion.div
            className="absolute top-[6%] sm:top-[4%] right-0 sm:translate-x-4 md:translate-x-10 z-10 text-right"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-end">
              <span className="text-[26vw] sm:text-[20vw] md:text-[16vw] lg:text-[14vw] font-black leading-[0.72] tracking-[-0.05em] text-background/90">
                <AnimatedCounter value={v2} suffix={s2} suffixClass="text-primary" />
              </span>
              <span className="font-display-italic text-2xl sm:text-3xl md:text-5xl italic text-primary mr-4 md:mr-12 mt-1 md:mt-2">
                {l2}
              </span>
            </div>
          </motion.div>

          {/* Metric 3 — bottom-left */}
          <motion.div
            className="absolute bottom-2 left-2 sm:bottom-10 sm:left-6 md:left-16 z-40"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex items-baseline gap-3 md:gap-4">
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-background leading-none tracking-[-0.04em]">
                <AnimatedCounter value={v3} suffix={s3} />
              </span>
              <div className="flex flex-col">
                <span className="font-display-italic text-base sm:text-xl md:text-3xl text-background italic leading-tight">
                  {l3}
                </span>
                <span className="text-sm sm:text-base md:text-2xl font-black uppercase tracking-widest text-primary leading-tight">
                  3+ года
                </span>
              </div>
            </div>
          </motion.div>

          {/* Metric 4 — angled red sticker, bottom-right corner clear of 200+ */}
          <motion.div
            className="absolute bottom-0 right-0 sm:right-2 md:right-6 z-50 bg-primary p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_-12px_hsl(var(--primary)/0.6)]"
            initial={{ opacity: 0, rotate: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0 }}
          >
            <div className="flex flex-col">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground leading-none uppercase tracking-tight">
                {v4}
              </span>
              <span className="font-display-italic text-base sm:text-xl md:text-2xl text-foreground italic mt-1">
                {l4}
              </span>
            </div>
          </motion.div>

          {/* Decorative kinetic lines */}
          <div className="absolute top-1/4 left-1/3 w-px h-48 md:h-64 bg-primary rotate-[-45deg] hidden md:block opacity-60 pointer-events-none" />
          <div className="absolute top-1/2 left-[15%] w-[180px] h-px bg-background/30 hidden md:block pointer-events-none" />
        </div>

        {/* Editorial CTA */}
        <motion.div
          className="container mx-auto flex items-center justify-between mt-12 md:mt-16 pt-8 border-t border-background/15"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-display-italic text-2xl md:text-4xl text-background/30 hidden sm:block">
            Готовы убедиться?
          </span>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] group text-background"
          >
            <span>Получить аудит</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-background group-hover:bg-background group-hover:text-foreground transition-colors">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBlock;
