import { Check, X, Users, TrendingUp, BarChart, Clock, Shield, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const ComparisonBlock = () => {
  const { settings } = useSiteSettingsMap();

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
    <section className="py-24 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            {title.split(" vs ")[0]} <span className="text-gradient-primary">vs</span>{" "}
            {title.split(" vs ")[1] || "Фрилансер"}
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="space-y-6">
          {comparisons.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className="grid md:grid-cols-2 gap-4"
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {/* Agency Card - Green */}
                <motion.div
                  className="relative flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-green-500/10 border-2 border-emerald-500/30 overflow-hidden group cursor-pointer"
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgb(16, 185, 129)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Animated glow on hover */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* Floating particles */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400/50"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-8 w-1.5 h-1.5 rounded-full bg-green-400/40"
                    animate={{ y: [0, -8, 0], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                  />

                  {/* Check icon with pulse */}
                  <motion.div
                    className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30 flex-shrink-0"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-emerald-400/50"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Check className="h-6 w-6 text-white relative z-10" />
                  </motion.div>

                  <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-emerald-500" />
                      <h3 className="font-bold text-emerald-600 dark:text-emerald-400">РИС (Агентство)</h3>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{item.agency}</p>
                  </div>
                </motion.div>

                {/* Freelancer Card - Red */}
                <motion.div
                  className="relative flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-rose-500/10 border-2 border-red-500/30 overflow-hidden group cursor-pointer"
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgb(239, 68, 68)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Animated warning stripes */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* Warning flicker */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400/50"
                    animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
                  />

                  {/* X icon with shake */}
                  <motion.div
                    className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/30 flex-shrink-0"
                    whileHover={{ x: [0, -3, 3, -3, 3, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-red-400/30"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <X className="h-6 w-6 text-white relative z-10" />
                  </motion.div>

                  <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-red-500" />
                      <h3 className="font-bold text-red-600 dark:text-red-400">Фрилансер (Риски)</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.freelancer}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA with animated gradient */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.p
            className="text-xl font-bold text-foreground mb-2"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {ctaTitle}
          </motion.p>
          <p className="text-muted-foreground">{ctaSubtitle}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonBlock;
