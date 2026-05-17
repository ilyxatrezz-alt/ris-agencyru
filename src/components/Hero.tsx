import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const Hero = () => {
  const { settings } = useSiteSettingsMap();
  const heroCtaPrimary = getSetting(settings, "hero_cta_primary", "Получить аудит бесплатно");
  const heroCtaSecondary = getSetting(settings, "hero_cta_secondary", "Смотреть кейсы");

  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden selection:bg-primary selection:text-white">
      {/* Ambient red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] rounded-full blur-[80px] sm:blur-[120px]"
        style={{ background: "hsl(9 96% 53% / 0.18)" }}
      />

      {/* Top-right wordmark */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20">
        <span className="font-black text-xl sm:text-2xl text-white tracking-tighter">
          РИС<span className="text-primary">.</span>
        </span>
      </div>

      {/* Scroll hint (desktop) */}
      <div className="absolute bottom-12 left-12 hidden lg:block z-20">
        <div className="text-[10px] text-white/20 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
          Scroll to explore
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32 min-h-[88vh] sm:min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center w-full"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 border border-white/10 rounded-full mb-8 sm:mb-12 bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-white/60 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              Digital Growth Agency
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-white leading-[0.9] tracking-tighter mb-8 sm:mb-12">
            <span className="block font-black text-5xl sm:text-8xl md:text-9xl uppercase">
              Больше
            </span>
            <span className="block font-display-italic italic text-6xl sm:text-9xl md:text-[10rem] text-primary -mt-2 sm:-mt-8 leading-none">
              клиентов
            </span>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
              <div className="hidden md:block h-px w-16 lg:w-24 bg-white/20" />
              <span className="font-black text-4xl sm:text-7xl md:text-8xl uppercase text-white/90">
                Больше прибыли
              </span>
              <div className="hidden md:block h-px w-16 lg:w-24 bg-white/20" />
            </div>
          </h1>

          {/* Description */}
          <p className="max-w-xl mx-auto text-white/55 text-base sm:text-lg md:text-xl mb-10 sm:mb-16 leading-relaxed font-light px-2">
            Проектируем маркетинговые системы, которые масштабируют ваш бизнес через взрывной рост охватов и конверсий.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-6 px-2 sm:px-0">
            <Link
              to="/contacts"
              className="group relative px-6 sm:px-8 py-4 sm:py-5 bg-primary text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_hsl(9_96%_53%/0.6)] text-sm sm:text-base"
            >
              <span className="relative z-10">{heroCtaPrimary}</span>
              <span className="absolute inset-0 bg-black/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            <Link
              to="/cases"
              className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 text-white font-bold border border-white/15 rounded-full hover:bg-white/5 transition-all text-sm sm:text-base"
            >
              <span>{heroCtaSecondary}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
