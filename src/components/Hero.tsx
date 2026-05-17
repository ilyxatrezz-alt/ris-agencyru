import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const NICHE_TICKER = [
  { niche: "Медицина", cpl: "287₽" },
  { niche: "Стройка", cpl: "612₽" },
  { niche: "Юристы", cpl: "418₽" },
  { niche: "HoReCa", cpl: "194₽" },
  { niche: "E-com", cpl: "356₽" },
  { niche: "Авто", cpl: "528₽" },
];

const Hero = () => {
  const { settings } = useSiteSettingsMap();
  const heroCtaPrimary = getSetting(settings, "hero_cta_primary", "Получить аудит бесплатно");
  const heroCtaSecondary = getSetting(settings, "hero_cta_secondary", "Смотреть кейсы");

  const [leadsToday, setLeadsToday] = useState(127);
  useEffect(() => {
    const id = setInterval(() => setLeadsToday((n) => n + Math.floor(Math.random() * 3)), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full bg-[#fafafa] text-foreground overflow-hidden selection:bg-primary selection:text-white">
      {/* Soft red ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.10]"
        style={{ background: "hsl(9 96% 53%)" }}
      />

      {/* Giant РИС watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-6 sm:-right-12 text-[10rem] sm:text-[16rem] lg:text-[22rem] font-black text-black/[0.04] select-none leading-none tracking-tighter z-0"
      >
        РИС.
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-14 min-h-[calc(100svh-80px)] lg:min-h-[88vh] flex flex-col">
        {/* TOP META BAR */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between gap-3 border-t border-black/10 pt-3 sm:pt-4 mb-6 sm:mb-10 text-[9px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] font-bold"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-primary truncate">§ Агентство роста</span>
            <span className="hidden sm:inline text-black/30">/ с 2014</span>
          </div>
          <span className="text-black/50 font-mono normal-case tracking-tight shrink-0">№ 2026/01</span>
        </motion.div>

        {/* MAIN — headline */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-black uppercase leading-[0.88] tracking-tighter"
          >
            <span className="block text-[clamp(2rem,10vw,7.5rem)]">Хватит доверять</span>
            <span className="block font-display-italic italic font-normal lowercase text-black/40 tracking-normal text-[clamp(1.75rem,8.5vw,7rem)]">
              непрофессионалам —
            </span>
            <span className="block mt-1 sm:mt-2 text-[clamp(2rem,9vw,7rem)]">
              <span className="relative inline-block">
                <span className="text-primary">РИС</span>кни
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
                  viewBox="0 0 400 20"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-[0.12em] overflow-visible"
                >
                  <motion.path
                    d="M2 12 C 80 4, 220 18, 398 8"
                    fill="none"
                    stroke="hsl(9 96% 53%)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>{" "}
              получить{" "}
              <span className="font-display-italic italic font-normal lowercase tracking-normal text-primary">
                гарантированный
              </span>{" "}
              результат.
            </span>
          </motion.h1>

          {/* Sub copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 sm:mt-12 grid grid-cols-12 gap-5 sm:gap-6 items-end"
          >
            <p className="col-span-12 md:col-span-5 text-sm sm:text-lg text-black/60 leading-relaxed">
              Яндекс.Директ · VK Ads · Telegram Ads.
              <br className="hidden sm:inline" />
              <span className="text-foreground font-semibold"> Клиенты со 2-го дня после старта.</span>
            </p>

            <div className="col-span-12 md:col-span-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-start md:justify-end gap-3 sm:gap-4">
              <Link
                to="/contacts"
                className="group relative inline-flex items-center justify-center px-5 sm:px-8 py-4 sm:py-5 bg-primary text-white font-bold uppercase tracking-widest text-[11px] sm:text-sm overflow-hidden rounded-full shadow-[0_20px_50px_-15px_hsl(9_96%_53%/0.5)] text-center"
              >
                <span className="relative z-10">{heroCtaPrimary}</span>
                <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link
                to="/cases"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-4 sm:py-5 border border-foreground/80 text-foreground font-bold uppercase tracking-widest text-[11px] sm:text-sm rounded-full hover:bg-foreground hover:text-background transition-colors"
              >
                <span>{heroCtaSecondary}</span>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM — live counter + niche ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-8 sm:mt-14 border-t border-black/10 pt-3 sm:pt-4 grid grid-cols-12 gap-3 sm:gap-4 items-center"
        >
          <div className="col-span-12 md:col-span-3 flex items-center gap-3">
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold text-black/40">Заявок сегодня</div>
              <div className="text-lg sm:text-xl font-black tracking-tighter tabular-nums">
                {leadsToday}
                <span className="text-emerald-600 text-[10px] sm:text-xs ml-2 font-bold">↑ live</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 overflow-hidden relative md:border-l border-black/10 md:pl-6 min-w-0">
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold text-black/40 mb-1.5">
              CPL по нишам <span className="text-primary">/ live</span>
            </div>
            <div className="flex overflow-hidden">
              <motion.div
                className="flex shrink-0 gap-6 sm:gap-8 pr-6 sm:pr-8 whitespace-nowrap"
                animate={{ x: ["0%", "-100%"] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              >
                {[...NICHE_TICKER, ...NICHE_TICKER].map((n, i) => (
                  <div key={i} className="flex items-baseline gap-2 text-xs sm:text-sm">
                    <span className="text-black/50 uppercase tracking-wider text-[10px] sm:text-xs">{n.niche}</span>
                    <span className="font-black tabular-nums">{n.cpl}</span>
                    <span className="text-black/15 ml-3 sm:ml-4">●</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

        {/* MAIN — headline */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-black uppercase leading-[0.86] tracking-tighter text-[12vw] sm:text-[9vw] lg:text-[7.5vw]"
          >
            <span className="block">Хватит доверять</span>
            <span className="block font-display-italic italic font-normal lowercase text-black/40 tracking-normal">
              непрофессионалам —
            </span>
            <span className="block mt-2">
              <span className="relative inline-block">
                <span className="text-primary">РИС</span>кни
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
                  viewBox="0 0 400 20"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-[0.12em] overflow-visible"
                >
                  <motion.path
                    d="M2 12 C 80 4, 220 18, 398 8"
                    fill="none"
                    stroke="hsl(9 96% 53%)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>{" "}
              получить{" "}
              <span className="whitespace-nowrap">
                <span className="font-display-italic italic font-normal lowercase tracking-normal text-primary">
                  гарантированный
                </span>{" "}
                результат.
              </span>
            </span>
          </motion.h1>

          {/* Sub copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 sm:mt-12 grid grid-cols-12 gap-6 items-end"
          >
            <p className="col-span-12 md:col-span-5 text-base sm:text-lg text-black/60 leading-relaxed">
              Яндекс.Директ · VK Ads · Telegram Ads.
              <br className="hidden sm:inline" />
              <span className="text-foreground font-semibold"> Клиенты со 2-го дня после старта.</span>
            </p>

            <div className="col-span-12 md:col-span-7 flex flex-wrap items-center justify-start md:justify-end gap-3 sm:gap-4">
              <Link
                to="/contacts"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-primary text-white font-bold uppercase tracking-widest text-xs sm:text-sm overflow-hidden rounded-full shadow-[0_20px_50px_-15px_hsl(9_96%_53%/0.5)]"
              >
                <span className="relative z-10">{heroCtaPrimary}</span>
                <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link
                to="/cases"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-5 border border-foreground/80 text-foreground font-bold uppercase tracking-widest text-xs sm:text-sm rounded-full hover:bg-foreground hover:text-background transition-colors"
              >
                <span>{heroCtaSecondary}</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM — live counter + niche ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 sm:mt-14 border-t border-black/10 pt-4 grid grid-cols-12 gap-4 items-center"
        >
          <div className="col-span-12 md:col-span-3 flex items-center gap-3">
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/40">Заявок сегодня</div>
              <div className="text-xl font-black tracking-tighter tabular-nums">
                {leadsToday}
                <span className="text-emerald-600 text-xs ml-2 font-bold">↑ live</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 overflow-hidden relative md:border-l border-black/10 md:pl-6">
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/40 mb-1.5">
              CPL по нишам <span className="text-primary">/ live</span>
            </div>
            <div className="flex overflow-hidden">
              <motion.div
                className="flex shrink-0 gap-8 pr-8 whitespace-nowrap"
                animate={{ x: ["0%", "-100%"] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              >
                {[...NICHE_TICKER, ...NICHE_TICKER].map((n, i) => (
                  <div key={i} className="flex items-baseline gap-2 text-sm">
                    <span className="text-black/50 uppercase tracking-wider text-xs">{n.niche}</span>
                    <span className="font-black tabular-nums">{n.cpl}</span>
                    <span className="text-black/15 ml-4">●</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
