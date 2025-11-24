import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  };

  return (
    <section className="relative min-h-[600px] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80" />
      </motion.div>

      {/* Floating Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
        animate={floatingAnimation}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, -20, 0], transition: { duration: 5, repeat: Infinity, repeatType: "loop" as const, delay: 1 } }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            variants={itemVariants}
          >
            <span className="text-gradient-primary inline-block">Реклама и Сайты,</span>
            <br />
            <span className="text-foreground">которые приносят прибыль</span>
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Работаем с 2014 года. Привлекаем клиентов через Яндекс.Директ, ВКонтакте, Telegram и другие каналы.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4"
            variants={itemVariants}
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto gradient-primary hover:scale-105 transition-base shadow-cta group text-sm sm:text-base"
            >
              <Link to="/contacts">
                Получить расчет
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-primary/20 hover:bg-primary/10 transition-base text-sm sm:text-base"
            >
              <Link to="/cases">Смотреть кейсы</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[
            { icon: TrendingUp, value: "500+ млн ₽", label: "освоено на рекламе", delay: 0 },
            { icon: Users, value: "100+ проектов", label: "успешно запущено", delay: 0.1 },
            { icon: Target, value: "10+ лет", label: "на рынке", delay: 0.2 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center gap-3 p-3 md:p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-card hover:shadow-card-hover hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + stat.delay, duration: 0.5 }}
            >
              <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
              <div className="text-left">
                <div className="text-lg md:text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
