import { Target, TrendingUp, Users, Award, Calendar, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const StatsBlock = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);
  const stats = [
    {
      icon: Calendar,
      value: "10+",
      label: "лет на рынке",
    },
    {
      icon: TrendingUp,
      value: "500 млн+",
      label: "₽ рекламных бюджетов освоено",
    },
    {
      icon: ShieldCheck,
      value: "40%",
      label: "средний CPL ниже, чем у конкурентов",
    },
    {
      icon: Users,
      value: "70%",
      label: "клиентов остаются с нами более 3 лет",
    },
    {
      icon: Award,
      value: "100+",
      label: "успешных проектов",
    },
    {
      icon: Target,
      value: "2014",
      label: "год основания",
    },
  ];

  return (
    <section className="py-20 bg-secondary/50 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Мы знаем, <span className="text-gradient-primary">как работает ваш рынок</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Наша специализация – это не только настройка, но и глубокое погружение в вашу бизнес-нишу
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="group relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 hover:border-primary/30 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                  initial={false}
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  <motion.div 
                    className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary transition-transform duration-300 group-hover:scale-110"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold text-primary"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.1 + 0.3 
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
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
