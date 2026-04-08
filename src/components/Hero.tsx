import { ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const services = [
  "Запуск рекламы", "Создание сайтов", "SMM продвижение", 
  "Съёмка видео", "Аналитика", "SEO оптимизация",
  "Яндекс.Директ", "VK Таргет", "Контент-маркетинг",
];

const Hero = () => {
  const containerRef = useRef(null);
  const { settings } = useSiteSettingsMap();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroCtaPrimary = getSetting(settings, "hero_cta_primary", "Получить аудит бесплатно");
  const heroCtaSecondary = getSetting(settings, "hero_cta_secondary", "Смотреть кейсы");

  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-zinc-950">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      
      {/* Subtle accent glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(9 96% 53% / 0.08) 0%, transparent 60%)" }}
      />

      {/* Content */}
      <motion.div 
        className="container relative z-10 mx-auto px-4 pt-24 pb-16 sm:pt-28 sm:pb-20"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="max-w-6xl mx-auto">
          
          {/* Social proof badge */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex -space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-zinc-500 text-xs font-medium tracking-wide uppercase">200+ проектов с 2014 года</span>
          </motion.div>

          {/* BOLD Main Heading — Upperquad-style oversized */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h1 className="text-[2.5rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black tracking-[-0.03em] uppercase">
              <span className="text-white block">Превращаем</span>
              <span className="text-white block">рекламу в</span>
              <motion.span 
                className="text-primary block"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                реальную прибыль
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle — clean, editorial */}
          <motion.p
            className="text-center text-sm sm:text-base md:text-lg text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Создаём <span className="text-zinc-300">сайты</span>, запускаем{" "}
            <span className="text-zinc-300">рекламу</span>,{" "}
            <span className="text-zinc-300">SMM</span> — всё для роста бизнеса
            <span className="block text-xs text-zinc-600 mt-1.5">Средний CPL на 40% ниже рынка</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button
              asChild
              size="lg"
              className="gradient-primary shadow-cta hover:shadow-glow text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-10 font-bold group rounded-full"
            >
              <Link to="/contacts">
                {heroCtaPrimary}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800/50 hover:border-zinc-600 text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-10 font-medium rounded-full"
            >
              <Link to="/cases">
                {heroCtaSecondary}
              </Link>
            </Button>
          </motion.div>

          {/* Services marquee — infinite scroll ticker */}
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex animate-marquee whitespace-nowrap">
              {[...services, ...services, ...services].map((service, i) => (
                <span
                  key={i}
                  className="inline-flex items-center mx-3 sm:mx-4 px-4 sm:px-5 py-2 rounded-full border border-zinc-800 text-zinc-500 text-xs sm:text-sm font-medium hover:border-primary/30 hover:text-zinc-300 transition-colors duration-300 cursor-default"
                >
                  {service}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
