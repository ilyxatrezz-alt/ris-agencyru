import { ArrowUpRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const services = [
  "Реклама", "Сайты", "SMM", "Видео", "Аналитика",
  "SEO", "Яндекс.Директ", "VK Ads", "Контент",
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

  const blockY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden"
    >
      {/* Top editorial bar */}
      <div className="relative z-10 border-b border-foreground/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase font-semibold text-foreground/60">
          <span>Vol. 14 — Est. 2014</span>
          <span className="hidden sm:inline">Реклама / Сайты / Рост</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            На связи
          </span>
        </div>
      </div>

      {/* Main editorial composition */}
      <motion.div
        className="container relative z-10 mx-auto px-4 pt-10 sm:pt-14 pb-12 flex-1 flex flex-col"
        style={{ opacity: fadeOut }}
      >
        {/* Top meta row */}
        <div className="grid grid-cols-12 gap-4 mb-8 sm:mb-10">
          <div className="col-span-6 sm:col-span-4 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-foreground text-foreground" />
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-foreground/60">
              200+ проектов
            </span>
          </div>
          <div className="hidden sm:flex col-span-4 items-center justify-center">
            <span className="font-display-italic text-2xl text-primary">№ 001</span>
          </div>
          <div className="col-span-6 sm:col-span-4 flex items-center justify-end">
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-foreground/60">
              Donetsk · Russia
            </span>
          </div>
        </div>

        {/* MASSIVE headline — asymmetric magazine layout */}
        <motion.div
          className="grid grid-cols-12 gap-x-4 gap-y-2 mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: blockY }}
        >
          {/* Line 1 */}
          <div className="col-span-12 flex items-baseline gap-4 sm:gap-8">
            <h1 className="text-[14vw] sm:text-[11vw] lg:text-[9.5vw] font-black tracking-[-0.045em] leading-[0.85] uppercase">
              Превра
              <span className="font-display-italic font-normal text-primary normal-case tracking-tight">щаем</span>
            </h1>
          </div>

          {/* Line 2 — with inline meta */}
          <div className="col-span-12 grid grid-cols-12 gap-4 items-end mt-1 sm:mt-2">
            <div className="hidden lg:block col-span-3">
              <div className="editorial-rule mb-3" />
              <p className="text-xs leading-relaxed text-foreground/60 max-w-[14rem]">
                Создаём сайты, запускаем рекламу, выстраиваем поток клиентов. 10+ лет, без воды.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h1 className="text-[14vw] sm:text-[11vw] lg:text-[9.5vw] font-black tracking-[-0.045em] leading-[0.85] uppercase">
                рекламу <span className="font-display-italic font-normal normal-case text-foreground/40">в</span>
              </h1>
            </div>
          </div>

          {/* Line 3 — bold accent */}
          <div className="col-span-12 mt-1 sm:mt-2">
            <h1 className="text-[14vw] sm:text-[11vw] lg:text-[9.5vw] font-black tracking-[-0.045em] leading-[0.85] uppercase text-primary">
              прибыль.
            </h1>
          </div>
        </motion.div>

        {/* CTA + side meta row */}
        <div className="grid grid-cols-12 gap-4 items-end mt-auto">
          {/* Left: CTAs */}
          <motion.div
            className="col-span-12 lg:col-span-7 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              asChild
              size="lg"
              className="group bg-foreground hover:bg-primary text-background rounded-full h-14 px-7 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <Link to="/contacts">
                {heroCtaPrimary}
                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:rotate-45" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="rounded-full h-14 px-7 text-sm font-bold uppercase tracking-wider border border-foreground/20 hover:bg-foreground hover:text-background"
            >
              <Link to="/cases">
                {heroCtaSecondary} →
              </Link>
            </Button>
          </motion.div>

          {/* Right: editorial stat */}
          <motion.div
            className="hidden lg:flex col-span-5 justify-end items-end gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-right">
              <div className="font-display text-7xl leading-none text-foreground">−40<span className="text-primary">%</span></div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/60 mt-1">CPL ниже рынка</div>
            </div>
            <div className="editorial-rule rotate-90 w-12" />
            <div className="text-right">
              <div className="font-display text-7xl leading-none text-foreground">10<span className="text-primary">+</span></div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/60 mt-1">Лет в digital</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom marquee — editorial ticker */}
      <div className="relative z-10 border-t border-b border-foreground/10 py-4 bg-background">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...services, ...services, ...services].map((service, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 mx-6 text-foreground"
            >
              <span className="text-2xl font-display-italic text-primary">✦</span>
              <span className="text-base sm:text-lg font-bold uppercase tracking-wider">{service}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
