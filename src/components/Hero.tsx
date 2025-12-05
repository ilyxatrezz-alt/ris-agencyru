import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-accent noise">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 gradient-hero" />
      
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full gradient-red-glow opacity-60"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full gradient-red-glow opacity-40"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div 
          className="max-w-5xl mx-auto text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
              <Zap className="h-4 w-4" />
              Работаем с 2014 года • 500+ млн ₽ рекламных бюджетов
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-accent-foreground">Превращаем</span>
            <br />
            <span className="text-gradient-primary">рекламу в прибыль</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-accent-foreground/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Создаём сайты и запускаем рекламу, которая окупается. 
            <span className="text-primary font-semibold"> Яндекс.Директ</span>, 
            <span className="text-primary font-semibold"> ВКонтакте</span>, 
            <span className="text-primary font-semibold"> Telegram</span> — 
            комплексный маркетинг под ключ.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto gradient-primary shadow-cta hover:shadow-glow text-lg h-14 px-8 font-bold group"
              >
                <Link to="/contacts">
                  Получить аудит бесплатно
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-primary/50 bg-primary/10 text-primary-foreground hover:bg-primary/20 hover:border-primary text-lg h-14 px-8 font-semibold"
              >
                <Link to="/cases">Смотреть кейсы</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {[
            { icon: TrendingUp, value: "−40%", label: "стоимость лида ниже рынка", color: "text-primary" },
            { icon: Shield, value: "70%", label: "клиентов с нами 3+ года", color: "text-primary" },
            { icon: Zap, value: "3 дня", label: "до запуска рекламы", color: "text-primary" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="group flex items-center gap-4 p-6 rounded-2xl glass border border-accent-foreground/10 hover:border-primary/30 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary shadow-cta group-hover:shadow-glow transition-all duration-300">
                <stat.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="text-left">
                <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-accent-foreground/60">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
