import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import ServicesCarousel from "./ServicesCarousel";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const Hero = () => {
  const containerRef = useRef(null);
  const { settings } = useSiteSettingsMap();

  const heroCtaPrimary = getSetting(settings, "hero_cta_primary", "Получить аудит бесплатно");
  const heroCtaSecondary = getSetting(settings, "hero_cta_secondary", "Смотреть кейсы");

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-zinc-950">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      
      {/* Single accent glow — subtle */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(9 96% 53% / 0.12) 0%, transparent 60%)" }}
      />

      {/* Content — NO parallax opacity so buttons stay clickable */}
      <div className="container relative z-10 mx-auto px-4 pt-8 pb-20 sm:py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Social proof bar */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-zinc-400 text-sm font-medium">200+ проектов с 2014 года</span>
          </motion.div>

          {/* Main Heading — readable, clear hierarchy */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="text-white">Превращаем рекламу</span>
              <br />
              <span className="text-white">в </span>
              <span className="text-primary">реальную прибыль</span>
            </h1>
          </motion.div>

          {/* Subtitle — one clear sentence */}
          <motion.p
            className="text-center text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Создаём <span className="text-white font-semibold">сайты</span>, запускаем{" "}
            <span className="text-white font-semibold">рекламу</span>,{" "}
            <span className="text-white font-semibold">SMM</span> — всё для роста бизнеса в Донецке и по всей России.
            <span className="block text-sm text-zinc-500 mt-2">Директолог, таргетолог, веб-разработка — средний CPL на 40% ниже рынка</span>
          </motion.p>

          {/* CTA Buttons — ABOVE carousel, always visible */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Button
              asChild
              size="lg"
              className="gradient-primary shadow-cta hover:shadow-glow text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 font-bold group"
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
              className="border-zinc-700 bg-zinc-800/50 text-white hover:bg-zinc-800 hover:border-primary/50 text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 font-semibold"
            >
              <Link to="/cases" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                {heroCtaSecondary}
              </Link>
            </Button>
          </motion.div>

          {/* Services Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <ServicesCarousel />
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
