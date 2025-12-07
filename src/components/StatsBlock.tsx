import { TrendingUp, Users, Award, Zap } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TiltCard from "./TiltCard";

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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

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
    <section ref={containerRef} className="relative py-0">
      {/* Top transition gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div style={{ scale, opacity }}>
          <TiltCard>
            <motion.div 
              className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-800 backdrop-blur-xl border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Animated background patterns */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    x: [0, 20, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    x: [0, -15, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
              </div>
              
              {/* Badge - centered on mobile, top-right on desktop */}
              <motion.div 
                className="flex justify-center mb-6 md:mb-0 md:absolute md:top-6 md:right-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <motion.span 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/30"
                  animate={{ 
                    boxShadow: [
                      "0 0 10px hsl(9 96% 53% / 0.3)",
                      "0 0 25px hsl(9 96% 53% / 0.5)",
                      "0 0 10px hsl(9 96% 53% / 0.3)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Award className="h-3.5 w-3.5" />
                  Топ-1 агентство
                </motion.span>
              </motion.div>

              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-0 md:pt-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      className="text-center group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                    >
                      <motion.div 
                        className="flex justify-center mb-4"
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div 
                          className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/20 relative overflow-hidden"
                          animate={{ 
                            boxShadow: [
                              "0 0 10px hsl(9 96% 53% / 0.2)",
                              "0 0 20px hsl(9 96% 53% / 0.4)",
                              "0 0 10px hsl(9 96% 53% / 0.2)",
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                        >
                          <Icon className="h-6 w-6 text-primary relative z-10" />
                          {/* Shimmer effect */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          />
                        </motion.div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-primary transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {stat.numValue ? (
                          <AnimatedCounter 
                            value={stat.numValue} 
                            suffix={stat.suffix || ""} 
                            prefix={stat.prefix || ""}
                          />
                        ) : (
                          stat.value
                        )}
                      </motion.div>
                      
                      <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        {stat.label}
                      </div>
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
          </TiltCard>
        </motion.div>
      </div>
      
      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default StatsBlock;
