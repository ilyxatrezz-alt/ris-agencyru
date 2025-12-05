import { Check, X, Users, TrendingUp, BarChart, Clock, Shield, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const ComparisonBlock = () => {
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
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Сравнение подходов
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Агентство РИС <span className="text-gradient-primary">vs</span> Фрилансер
          </h2>
          <p className="text-lg text-muted-foreground">
            Сравните и сделайте правильный выбор для вашего бизнеса
          </p>
        </motion.div>

        <div className="space-y-6">
          {comparisons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="grid md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Agency Card */}
                <motion.div 
                  className="flex items-start gap-4 p-6 rounded-2xl bg-primary/5 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-cta flex-shrink-0">
                    <Check className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="font-bold text-primary">РИС (Агентство)</h3>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{item.agency}</p>
                  </div>
                </motion.div>

                {/* Freelancer Card */}
                <motion.div 
                  className="flex items-start gap-4 p-6 rounded-2xl bg-destructive/5 border-2 border-destructive/20 hover:border-destructive/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive shadow-lg flex-shrink-0">
                    <X className="h-6 w-6 text-destructive-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-destructive" />
                      <h3 className="font-bold text-destructive">Фрилансер (Риски)</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.freelancer}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xl font-bold text-foreground mb-2">
            Не рискуйте своим бюджетом
          </p>
          <p className="text-muted-foreground">
            Выбирайте профессиональную команду с гарантией результата
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonBlock;
