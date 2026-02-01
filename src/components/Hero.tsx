import { ArrowRight, Zap, Shield, TrendingUp, Play, Star, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GlitchText from "./GlitchText";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import MorphingShape from "./MorphingShape";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const Hero = () => {
  const containerRef = useRef(null);
  const { settings } = useSiteSettingsMap();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.95]);

  // Get settings with fallbacks
  const heroBadge = getSetting(settings, "hero_badge", "С 2014 года • 500+ млн ₽ рекламных бюджетов");
  const heroSubtitle = getSetting(settings, "hero_subtitle", "Создаём сайты и запускаем рекламу, которая окупается. Комплексный digital-маркетинг с гарантией результата.");
  const heroCtaPrimary = getSetting(settings, "hero_cta_primary", "Получить аудит бесплатно");
  const heroCtaSecondary = getSetting(settings, "hero_cta_secondary", "Смотреть кейсы");
  const statsProjects = getSetting(settings, "stats_projects", "200+");
  const statsLoyalty = getSetting(settings, "stats_clients_loyalty", "70%");
  const statsLaunchTime = getSetting(settings, "stats_launch_time", "3 дня");

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Morphing background shape */}
      <MorphingShape />
      
      {/* Deep Black Background with noise texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      
      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Animated Gradient Orbs - more vibrant */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(9 96% 53% / 0.25) 0%, hsl(9 96% 53% / 0.1) 30%, transparent 60%)",
        }}
        animate={{
          x: [-50, 100, -50],
          y: [-30, 80, -30],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-[-30%] right-[-15%] w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(9 96% 53% / 0.2) 0%, hsl(20 90% 50% / 0.1) 40%, transparent 60%)",
        }}
        animate={{
          x: [80, -80, 80],
          y: [40, -60, 40],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Subtle center glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(9 96% 53% / 0.05) 0%, transparent 50%)",
        }}
      />

      {/* Floating Particles - brighter with 3D effect */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? 'hsl(9 96% 53% / 0.8)' : 'rgba(255,255,255,0.4)',
            boxShadow: i % 3 === 0 ? '0 0 10px hsl(9 96% 53% / 0.5)' : 'none',
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Grid Pattern - more visible */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.05]">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[400%] bg-gradient-to-b from-transparent via-primary/60 to-transparent -rotate-45"
            style={{ left: `${i * 12}%`, top: '-150%' }}
            animate={{ y: [0, 150, 0] }}
            transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Content with parallax */}
      <motion.div 
        className="container relative z-10 mx-auto px-4 py-24"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div 
              className="space-y-8 text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge with pulse effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block"
              >
                <motion.span 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 text-primary text-sm font-bold backdrop-blur-sm"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 hsl(9 96% 53% / 0.4)",
                      "0 0 0 10px hsl(9 96% 53% / 0)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="h-4 w-4 fill-primary" />
                  {heroBadge}
                </motion.span>
              </motion.div>

              {/* Main Heading with glitch effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                  <span className="text-white block mb-2">
                    <TextReveal delay={0.5}>Превращаем</TextReveal>
                  </span>
                  <span className="relative inline-block">
                    <GlitchText text="рекламу" className="text-primary" />
                    <motion.span 
                      className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    />
                  </span>
                  <br />
                  <span className="text-white">в </span>
                  <GlitchText text="прибыль" className="text-primary" />
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p 
                className="text-lg sm:text-xl text-zinc-400 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {heroSubtitle}
              </motion.p>

              {/* Trust Points */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {["Яндекс.Директ", "ВКонтакте", "Telegram"].map((platform, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-sm text-zinc-500">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {platform}
                  </span>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto gradient-primary shadow-cta hover:shadow-glow text-lg h-14 px-8 font-bold group relative overflow-hidden"
                  >
                    <Link to="/contacts">
                      <span className="relative z-10 flex items-center">
                        {heroCtaPrimary}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <motion.span 
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-zinc-700 bg-zinc-800/50 text-white hover:bg-zinc-800 hover:border-primary/50 text-lg h-14 px-8 font-semibold backdrop-blur-sm"
                  >
                    <Link to="/cases" className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      {heroCtaSecondary}
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Stats Cards */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Main Stats Card */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-primary/15 rounded-3xl blur-3xl" />
                
                <motion.div 
                  className="relative bg-gradient-to-br from-zinc-800/90 via-zinc-800/70 to-zinc-900/90 backdrop-blur-xl rounded-3xl p-8 border border-zinc-700/50 shadow-2xl"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "−40%", label: "Стоимость лида ниже рынка", icon: TrendingUp },
                      { value: statsProjects, label: "Успешных проектов", icon: Zap },
                      { value: statsLoyalty, label: "Клиентов с нами 3+ года", icon: Shield },
                      { value: statsLaunchTime, label: "До запуска рекламы", icon: Star },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-5 rounded-2xl bg-zinc-900/80 border border-zinc-700/30 hover:border-primary/40 transition-all duration-300 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.03, backgroundColor: "rgba(250, 55, 20, 0.1)" }}
                      >
                        <div className="flex justify-center mb-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:shadow-glow transition-all">
                            <stat.icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-primary">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-zinc-400 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <motion.div 
                    className="mt-6 pt-6 border-t border-zinc-700/50 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    <p className="text-zinc-500 text-sm">
                      Бесплатный аудит покажет точки роста
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full gradient-primary shadow-cta text-white text-sm font-bold"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              >
                Топ-1 агентство
              </motion.div>

            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - fixed at center bottom */}
      <motion.div 
        className="absolute bottom-8 inset-x-0 flex justify-center z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div 
          className="flex flex-col items-center gap-2 text-zinc-500"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Скролл</span>
          <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex justify-center p-2">
            <motion.div 
              className="w-1 h-2 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
