import { Target, TrendingUp, Users, Award, Calendar, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
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

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsBlock = () => {
  const stats = [
    {
      icon: Calendar,
      value: "10+",
      numValue: 10,
      suffix: "+",
      label: "лет безупречной работы",
      description: "На рынке digital-маркетинга",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: TrendingUp,
      value: "500 млн+",
      numValue: 500,
      suffix: " млн+",
      label: "рекламных бюджетов",
      description: "Освоено с максимальной отдачей",
      color: "from-primary to-red-400",
    },
    {
      icon: ShieldCheck,
      value: "−40%",
      numValue: 40,
      suffix: "%",
      prefix: "−",
      label: "стоимость лида",
      description: "Ниже среднерыночной",
      color: "from-red-600 to-red-400",
    },
    {
      icon: Users,
      value: "70%",
      numValue: 70,
      suffix: "%",
      label: "постоянных клиентов",
      description: "Работают с нами 3+ года",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Award,
      value: "200+",
      numValue: 200,
      suffix: "+",
      label: "успешных проектов",
      description: "В разных нишах бизнеса",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Target,
      value: "24/7",
      numValue: null,
      label: "поддержка",
      description: "Всегда на связи с клиентами",
      color: "from-red-400 to-red-600",
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-secondary/30 via-secondary/50 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-20 right-20 w-32 h-32 rounded-full border border-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full border border-primary/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <ArrowUpRight className="h-4 w-4" />
            Почему выбирают РИС
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Цифры, которые
            <br />
            <span className="text-gradient-primary">говорят за нас</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Мы не просто настраиваем рекламу — мы погружаемся в ваш бизнес и работаем на результат
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-red-400/50 rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                
                <motion.div 
                  className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden h-full"
                  whileHover={{ y: -8 }}
                >
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                  
                  <div className="flex flex-col items-center text-center space-y-5 relative z-10">
                    <motion.div 
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-glow transition-all duration-300`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    <div className="text-5xl md:text-6xl font-black text-primary tracking-tight">
                      {stat.prefix && stat.prefix}
                      {stat.numValue !== null ? (
                        <AnimatedCounter value={stat.numValue} suffix={stat.suffix || ""} />
                      ) : (
                        stat.value
                      )}
                    </div>
                    
                    <div>
                      <div className="font-bold text-lg text-foreground mb-1">{stat.label}</div>
                      <div className="text-sm text-muted-foreground">{stat.description}</div>
                    </div>
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

export default StatsBlock;
