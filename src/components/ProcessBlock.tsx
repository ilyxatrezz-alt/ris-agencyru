import { FileText, Search, Lightbulb, Rocket, Settings, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const ProcessBlock = () => {
  const steps = [
    {
      icon: FileText,
      title: "Брифинг",
      description: "Заявка и глубокое интервью по вашему бизнесу",
      number: "01",
    },
    {
      icon: Search,
      title: "Аудит",
      description: "Анализ конкурентов, рынка, текущих рекламных кампаний/сайта",
      number: "02",
    },
    {
      icon: Lightbulb,
      title: "Стратегия",
      description: "Разработка медиаплана и технического задания",
      number: "03",
    },
    {
      icon: Rocket,
      title: "Запуск",
      description: "Создание сайта и/или настройка рекламных кампаний",
      number: "04",
    },
    {
      icon: Settings,
      title: "Оптимизация",
      description: "Ежедневный контроль, A/B-тестирование, снижение стоимости лида",
      number: "05",
    },
    {
      icon: FileCheck,
      title: "Отчетность",
      description: "Прозрачные отчеты и еженедельная связь",
      number: "06",
    },
  ];

  return (
    <section className="py-20 bg-secondary/50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Наш путь к <span className="text-gradient-primary">вашей прибыли</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            От заявки до стабильного потока клиентов — прозрачный процесс в 6 этапов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="relative group p-8 rounded-2xl bg-card/80 backdrop-blur-sm shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 hover:border-primary/30 overflow-hidden"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: "easeOut" 
                }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.5 }}
                />

                {/* Large Number Background */}
                <motion.div 
                  className="absolute -top-4 -right-4 text-8xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors duration-500"
                  initial={{ scale: 0.8, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  {step.number}
                </motion.div>

                <div className="relative space-y-4">
                  <motion.div 
                    className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary shadow-lg group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ 
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessBlock;
