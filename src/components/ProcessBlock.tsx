import { FileText, Search, Lightbulb, Rocket, Settings, FileCheck, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./TiltCard";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const ProcessBlock = () => {
  const { settings } = useSiteSettingsMap();

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const badge = getSetting(settings, "home_process_badge", "Как мы работаем");
  const titlePrefix = getSetting(settings, "home_process_title_prefix", "От заявки до");
  const titleHighlight = getSetting(
    settings,
    "home_process_title_highlight",
    "стабильного потока клиентов"
  );
  const subtitle = getSetting(
    settings,
    "home_process_subtitle",
    "Прозрачный процесс в 6 этапов. Вы всегда знаете, что происходит с вашим проектом."
  );

  const steps = [
    {
      icon: FileText,
      title: "Брифинг",
      description: "Глубокое интервью о вашем бизнесе, целях, конкурентах. Понимаем задачу на 100%.",
      duration: "1 день",
      number: "01",
    },
    {
      icon: Search,
      title: "Аудит",
      description: "Анализируем рынок, конкурентов, текущую рекламу. Находим точки роста.",
      duration: "2-3 дня",
      number: "02",
    },
    {
      icon: Lightbulb,
      title: "Стратегия",
      description: "Разрабатываем медиаплан с прогнозом бюджета, лидов и ROI.",
      duration: "2 дня",
      number: "03",
    },
    {
      icon: Rocket,
      title: "Запуск",
      description: "Создаём сайт, настраиваем рекламу, подключаем аналитику. Поехали!",
      duration: "3-7 дней",
      number: "04",
    },
    {
      icon: Settings,
      title: "Оптимизация",
      description: "Ежедневный контроль, A/B-тесты, снижение CPL. Выжимаем максимум.",
      duration: "Постоянно",
      number: "05",
    },
    {
      icon: FileCheck,
      title: "Отчётность",
      description: "Прозрачные отчёты каждую неделю. Видите каждый потраченный рубль.",
      duration: "Еженедельно",
      number: "06",
    },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-accent text-accent-foreground relative overflow-hidden noise">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full gradient-red-glow opacity-30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full gradient-red-glow opacity-20"
        animate={{ scale: [1.1, 0.9, 1.1], x: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Animated connecting lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.line
            x1="10%"
            y1="30%"
            x2="90%"
            y2="30%"
            stroke="hsl(9, 96%, 53%)"
            strokeWidth="1"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 3, delay: 0.5 }}
          />
          <motion.line
            x1="10%"
            y1="70%"
            x2="90%"
            y2="70%"
            stroke="hsl(9, 96%, 53%)"
            strokeWidth="1"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 3, delay: 1 }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4"
            animate={{
              boxShadow: [
                "0 0 0 0 hsl(9 96% 53% / 0.4)",
                "0 0 0 15px hsl(9 96% 53% / 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {badge}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            {titlePrefix} <span className="text-gradient-primary">{titleHighlight}</span>
          </h2>
          <p className="text-lg text-accent-foreground/70">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <TiltCard key={index}>
                <motion.div
                  className="group relative p-8 rounded-2xl glass border border-accent-foreground/10 hover:border-primary/30 transition-all duration-500 overflow-hidden h-full"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Large Number with animation */}
                  <motion.div
                    className="absolute -top-4 -right-4 text-8xl font-black text-primary/10 group-hover:text-primary/25 transition-colors duration-500"
                    animate={{ y: [0, -5, 0], scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Hover Gradient with animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    whileHover={{ scale: 1.05 }}
                  />

                  <div className="relative space-y-4" style={{ transform: "translateZ(50px)" }}>
                    <motion.div
                      className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary shadow-cta group-hover:shadow-glow transition-all duration-300"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </motion.div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-accent-foreground group-hover:text-primary transition-colors glow-text">
                        {step.title}
                      </h3>
                      <motion.span
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary"
                        whileHover={{ scale: 1.1 }}
                      >
                        {step.duration}
                      </motion.span>
                    </div>

                    <p className="text-sm text-accent-foreground/70 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Connection Arrow */}
                  {index < steps.length - 1 && index !== 2 && (
                    <motion.div
                      className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-6 w-6 text-primary/50" />
                    </motion.div>
                  )}
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessBlock;
