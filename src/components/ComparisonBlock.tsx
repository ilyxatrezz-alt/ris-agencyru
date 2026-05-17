import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";
import { Link } from "react-router-dom";

const rows = [
  { criterion: "Сроки", agency: "Строго по договору", freelancer: "Как пойдёт" },
  { criterion: "Команда", agency: "Целый отдел экспертов", freelancer: "Один человек-оркестр" },
  { criterion: "Гарантии", agency: "Юридическая защита", freelancer: "Честное слово" },
  { criterion: "Масштаб", agency: "Любая сложность", freelancer: "Ограничен ресурсом" },
  { criterion: "Связь", agency: "Аккаунт всегда на связи", freelancer: "Абонент недоступен" },
  { criterion: "Результат", agency: "Профит и рост", freelancer: "Риск потери бюджета" },
];

const AnimatedScore = ({ value, color }: { value: number; color: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (value === 0) {
      setN(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="block text-[6rem] sm:text-[8rem] md:text-[10rem] font-black leading-none tracking-[-0.04em] tabular-nums"
      style={{ color }}
    >
      {n}
    </span>
  );
};

const ComparisonBlock = () => {
  const { settings } = useSiteSettingsMap();
  const badge = getSetting(settings, "home_comparison_badge", "Сравнение ресурсов");
  const title = getSetting(settings, "home_comparison_title", "Агентство РИС vs Фрилансер");
  const ctaTitle = getSetting(settings, "home_comparison_cta_title", "Не рискуйте бюджетом");
  const ctaButton = getSetting(settings, "home_comparison_cta_button", "Выбрать победителя");

  const [left, right] = title.includes(" vs ")
    ? title.split(" vs ")
    : ["Агентство РИС", "Фрилансер"];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Eyebrow pill */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 border border-foreground/15 rounded-full text-[11px] md:text-xs font-medium uppercase tracking-tight">
              § {badge}
            </span>
          </motion.div>

          {/* Title (mobile) */}
          <motion.h2
            className="text-center md:hidden text-3xl font-black tracking-tight uppercase mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {left}{" "}
            <span className="font-display-italic font-normal normal-case text-primary lowercase">
              vs
            </span>{" "}
            {right}
          </motion.h2>

          {/* Scoreboard */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <div className="text-right">
                <p className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider mb-2 text-emerald-600">
                  РИС
                </p>
                <AnimatedScore value={6} color="hsl(152 72% 35%)" />
              </div>
              <div className="mt-4 sm:mt-6">
                <span className="font-display-italic text-5xl sm:text-6xl md:text-7xl font-light text-foreground/15 tracking-tighter italic">
                  vs
                </span>
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider mb-2 text-primary">
                  Фрилансер
                </p>
                <AnimatedScore value={0} color="hsl(var(--primary))" />
              </div>
            </div>
            <p className="mt-6 md:mt-8 text-foreground/40 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium">
              Итоговый результат матча
            </p>
          </motion.div>

          {/* Ledger Table */}
          <div className="border-t border-foreground">
            {rows.map((row, i) => (
              <motion.div
                key={row.criterion}
                className={`grid grid-cols-12 gap-2 py-4 md:py-5 transition-colors hover:bg-muted/40 ${
                  i === rows.length - 1
                    ? "border-b border-foreground"
                    : "border-b border-foreground/5"
                }`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {/* Criterion (full width on mobile) */}
                <div className="col-span-12 md:col-span-4 flex items-center mb-2 md:mb-0">
                  <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                    {row.criterion}
                  </span>
                </div>

                {/* Agency */}
                <div className="col-span-6 md:col-span-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-xs md:text-sm font-medium leading-tight">
                    {row.agency}
                  </span>
                </div>

                {/* Freelancer */}
                <div className="col-span-6 md:col-span-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-xs md:text-sm text-foreground/40 leading-tight line-through decoration-foreground/20">
                    {row.freelancer}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-10 md:mt-12 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm md:text-base font-bold uppercase tracking-wide text-center">
              {ctaTitle}
            </p>
            <Link
              to="/contacts"
              className="bg-foreground text-background px-7 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-primary transition-colors"
            >
              {ctaButton}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonBlock;
