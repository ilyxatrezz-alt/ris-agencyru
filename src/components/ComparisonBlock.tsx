import { Check, X, Users, TrendingUp, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const ComparisonBlock = () => {
  const comparisons = [
    {
      title: "Команда",
      agency: "Аналитик, таргетолог, контекстолог, дизайнер. Всегда на связи",
      freelancer: "Один человек: Болезнь, отпуск, пропал, нет запасных компетенций",
      icon: Users,
    },
    {
      title: "Результат",
      agency: "Прогнозируемый: Четкое ТЗ, сроки, договор",
      freelancer: "Непредсказуемый: 'Как получится', срыв сроков",
      icon: TrendingUp,
    },
    {
      title: "Аналитика",
      agency: "Системная: End-to-end (от клика до продажи)",
      freelancer: "Базовая: Только статистика из рекламного кабинета",
      icon: BarChart,
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Выберите <span className="text-gradient-accent">стабильность</span>, а не риск
          </h2>
          <p className="text-lg text-muted-foreground">
            Почему агентство G-TARGET надежнее фрилансера
          </p>
        </motion.div>

        <div className="space-y-8">
          {comparisons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="grid md:grid-cols-2 gap-4 p-6 rounded-2xl bg-card/80 backdrop-blur-sm shadow-card hover:shadow-card-hover transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <motion.div 
                  className="flex items-start space-x-4 p-6 rounded-xl bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary flex-shrink-0 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Check className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="flex-1 relative z-10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="font-bold text-primary">G-TARGET (Агентство)</h3>
                    </div>
                    <p className="text-sm text-foreground">{item.agency}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4 p-6 rounded-xl bg-destructive/5 border-2 border-destructive/20 hover:border-destructive/40 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, x: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive flex-shrink-0 shadow-lg"
                    whileHover={{ rotate: -360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <X className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="flex-1 relative z-10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="h-5 w-5 text-destructive" />
                      <h3 className="font-bold text-destructive">Фрилансер (Риски)</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.freelancer}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComparisonBlock;
