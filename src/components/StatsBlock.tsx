import { TrendingUp, Users, Award, Zap, ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
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

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const StatsBlock = () => {
  const stats = [
    {
      icon: TrendingUp,
      numValue: 40,
      suffix: "%",
      prefix: "−",
      label: "Стоимость лида ниже рынка",
    },
    {
      icon: Award,
      numValue: 200,
      suffix: "+",
      label: "Успешных проектов",
    },
    {
      icon: Users,
      numValue: 70,
      suffix: "%",
      label: "Клиентов с нами 3+ года",
    },
    {
      icon: Zap,
      value: "3 дня",
      label: "До запуска рекламы",
    },
  ];

  return (
    <section className="relative py-0">
      {/* Top transition gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div 
          className="relative rounded-3xl bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border border-border/30 p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-3xl" />
          
          {/* Badge */}
          <motion.div 
            className="absolute -top-4 right-8 md:right-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg">
              Топ-1 агентство
            </span>
          </motion.div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <motion.div 
                    className="flex justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </motion.div>
                  
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2">
                    {stat.numValue ? (
                      <AnimatedCounter 
                        value={stat.numValue} 
                        suffix={stat.suffix || ""} 
                        prefix={stat.prefix || ""}
                      />
                    ) : (
                      stat.value
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA text */}
          <motion.p 
            className="text-center text-muted-foreground mt-8 pt-6 border-t border-border/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Бесплатный аудит покажет точки роста
          </motion.p>
        </motion.div>
      </div>
      
      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default StatsBlock;
