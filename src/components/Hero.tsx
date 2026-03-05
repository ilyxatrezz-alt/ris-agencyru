import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import GlitchText from "./GlitchText";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import MorphingShape from "./MorphingShape";
import ServicesCarousel from "./ServicesCarousel";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const rotatingPhrases = [
  "Продаём",
  "Масштабируем",
  "Приносим прибыль",
  "Повышаем узнаваемость",
];

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

  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const heroCtaPrimary = getSetting(settings, "hero_cta_primary", "Получить аудит бесплатно");
  const heroCtaSecondary = getSetting(settings, "hero_cta_secondary", "Смотреть кейсы");

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
        <div className="max-w-7xl mx-auto">
          {/* Top - Title centered */}
          <motion.div 
            className="text-center mb-6 sm:mb-8 lg:mb-12 space-y-4 sm:space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Rotating Phrases Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-12 sm:h-14 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIndex}
                  className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-primary/25 via-primary/15 to-primary/25 border border-primary/40 text-primary text-base sm:text-lg font-black uppercase tracking-wider backdrop-blur-md"
                  initial={{ opacity: 0, y: 20, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ 
                    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
                    textShadow: [
                      "0 0 8px hsl(9 96% 53% / 0.8)",
                      "0 0 20px hsl(9 96% 53% / 0.4)",
                      "0 0 8px hsl(9 96% 53% / 0.8)",
                    ],
                  }}
                  exit={{ opacity: 0, y: -20, scale: 0.8, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span
                    className="w-2.5 h-2.5 rounded-full bg-primary"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                      boxShadow: [
                        "0 0 0 0 hsl(9 96% 53% / 0.7)",
                        "0 0 0 8px hsl(9 96% 53% / 0)",
                        "0 0 0 0 hsl(9 96% 53% / 0.7)",
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  {rotatingPhrases[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight uppercase">
                <span className="text-white block">
                  <TextReveal delay={0.5}>РИС: Зерно вашего</TextReveal>
                </span>
                <span className="block">
                  <GlitchText text="роста" className="text-primary" />
                  <span className="text-white"> в </span>
                  <GlitchText text="интернете" className="text-primary" />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div 
              className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span>Превращаем любой бизнес в </span>
              <motion.span 
                className="text-white font-bold relative inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 0px hsl(9 96% 53% / 0)",
                    "0 0 20px hsl(9 96% 53% / 0.6)",
                    "0 0 0px hsl(9 96% 53% / 0)",
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                машину по генерации прибыли
              </motion.span>
              <span>. </span>
              <br className="hidden sm:block" />
              <span>Создаём </span>
              {["Сайты", "Рекламу", "SMM"].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block text-primary font-black"
                  initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
                >
                  {word}{i < 2 ? <span className="text-zinc-400 font-normal">, </span> : " "}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                и всё, что нужно для роста
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Services Carousel - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <ServicesCarousel />
          </motion.div>

          {/* CTA Buttons centered below carousel */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
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
