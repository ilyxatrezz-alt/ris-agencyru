import { Target, TrendingUp, Users, Award, Calendar, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const StatsBlock = () => {
  const stats = [
    {
      icon: Calendar,
      value: "10+",
      label: "лет безупречной работы",
      description: "На рынке digital-маркетинга",
    },
    {
      icon: TrendingUp,
      value: "500 млн+",
      label: "рекламных бюджетов",
      description: "Освоено с максимальной отдачей",
    },
    {
      icon: ShieldCheck,
      value: "−40%",
      label: "стоимость лида",
      description: "Ниже среднерыночной",
    },
    {
      icon: Users,
      value: "70%",
      label: "постоянных клиентов",
      description: "Работают с нами 3+ года",
    },
    {
      icon: Award,
      value: "100+",
      label: "успешных проектов",
      description: "В разных нишах бизнеса",
    },
    {
      icon: Target,
      value: "24/7",
      label: "поддержка",
      description: "Всегда на связи с клиентами",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Почему выбирают нас
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Цифры, которые <span className="text-gradient-primary">говорят сами за себя</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Мы не просто настраиваем рекламу — мы погружаемся в ваш бизнес и работаем на результат
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="group relative p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 hover:border-primary/30 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  <motion.div 
                    className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-cta group-hover:shadow-glow transition-all duration-300"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </motion.div>
                  <div className="text-4xl md:text-5xl font-black text-primary">
                    {stat.value}
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBlock;
