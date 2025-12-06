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
          className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-800 backdrop-blur-xl border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl" />
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          
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
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </motion.div>
                  
                  <div className="text-3xl md:text-4xl font-black text-white mb-2">
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
                  
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA text */}
          <motion.p 
            className="text-center text-zinc-500 mt-8 pt-6 border-t border-white/10"
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
