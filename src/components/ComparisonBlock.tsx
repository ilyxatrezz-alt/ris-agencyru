import { Check, X, Users, TrendingUp, BarChart, Clock, Shield, Headphones } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const ComparisonBlock = () => {
  const { settings } = useSiteSettingsMap();
  const sectionRef = useRef<HTMLDivElement>(null);

  const badge = getSetting(settings, "home_comparison_badge", "Сравнение подходов");
  const title = getSetting(settings, "home_comparison_title", "Агентство РИС vs Фрилансер");
  const subtitle = getSetting(
    settings,
    "home_comparison_subtitle",
    "Сравните и сделайте правильный выбор для вашего бизнеса"
  );
  const ctaTitle = getSetting(settings, "home_comparison_cta_title", "Не рискуйте своим бюджетом");
  const ctaSubtitle = getSetting(
    settings,
    "home_comparison_cta_subtitle",
    "Выбирайте профессиональную команду с гарантией результата"
  );

  const comparisons = [
    {
      title: "Команда профессионалов",
      agency: "Аналитик + таргетолог + контекстолог + дизайнер. Взаимозаменяемость и стабильность.",
      freelancer: "Один человек на всё. Заболел, ушёл в отпуск, пропал — проект встал.",
      icon: Users,
    },
    {
      title: "Гарантия результата",
      agency: "Договор, KPI, прогнозируемые сроки. Отвечаем за каждый рубль бюджета.",
      freelancer: "'Как получится'. Нет договора — нет ответственности. Риск потери денег.",
      icon: Shield,
    },
    {
      title: "Сквозная аналитика",
      agency: "End-to-end: от клика до продажи. Видим ROI каждого канала и объявления.",
      freelancer: "Только базовая статистика из рекламного кабинета. Не знаете реальную картину.",
      icon: BarChart,
    },
    {
      title: "Скорость реакции",
      agency: "Ответ в течение 2 часов. Оптимизация кампаний каждый день.",
      freelancer: "Ответ когда удобно. Может не выйти на связь днями.",
      icon: Clock,
    },
    {
      title: "Масштабирование",
      agency: "Готовы расти вместе с вами. Увеличение бюджета — не проблема.",
      freelancer: "Ограничен ресурсами одного человека. Потолок роста очевиден.",
      icon: TrendingUp,
    },
    {
      title: "Поддержка 24/7",
      agency: "Выделенный менеджер. Telegram, WhatsApp, звонки — как удобно.",
      freelancer: "Работает по своему графику. Срочный вопрос? Подождите до понедельника.",
      icon: Headphones,
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-4 mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="editorial-eyebrow text-foreground/60">§ 02 — Сравнение</span>
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
              {title.split(" vs ")[0]} <span className="font-display-italic font-normal normal-case text-primary lowercase">vs</span> {title.split(" vs ")[1] || "Фрилансер"}
            </h2>
          </motion.div>
        </div>

        {/* Sticky left label + scrolling comparisons */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Sticky side label — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-700 text-sm">РИС (Агентство)</p>
                    <p className="text-xs text-emerald-600">Проверенный результат</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500">
                    <X className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-red-700 text-sm">Фрилансер</p>
                    <p className="text-xs text-red-600">Непредсказуемые риски</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Листайте вниз, чтобы увидеть разницу по каждому критерию
              </p>
            </div>
          </div>

          {/* Scrolling comparison cards */}
          <div className="space-y-4">
            {comparisons.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="space-y-3"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  {/* Category title */}
                  <div className="flex items-center gap-2 px-1">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{item.title}</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    {/* Agency */}
                    <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 hover:border-emerald-300 transition-colors">
                      <p className="text-sm text-foreground leading-relaxed lg:hidden">
                        <span className="font-bold text-emerald-600 text-xs uppercase tracking-wide block mb-1">РИС</span>
                        {item.agency}
                      </p>
                      <p className="text-sm text-foreground leading-relaxed hidden lg:block">{item.agency}</p>
                    </div>

                    {/* Freelancer */}
                    <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200/40 hover:border-red-200 transition-colors">
                      <p className="text-sm text-muted-foreground leading-relaxed lg:hidden">
                        <span className="font-bold text-red-500 text-xs uppercase tracking-wide block mb-1">Фрилансер</span>
                        {item.freelancer}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed hidden lg:block">{item.freelancer}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xl font-bold text-foreground mb-2">{ctaTitle}</p>
          <p className="text-muted-foreground">{ctaSubtitle}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonBlock;
