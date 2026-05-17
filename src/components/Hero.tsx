import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const NICHE_TICKER = [
  { niche: "Медицина", cpl: "287₽", delta: "−68%" },
  { niche: "Стройка", cpl: "612₽", delta: "−54%" },
  { niche: "Юристы", cpl: "418₽", delta: "−71%" },
  { niche: "HoReCa", cpl: "194₽", delta: "−62%" },
  { niche: "E-com", cpl: "356₽", delta: "−49%" },
  { niche: "Авто", cpl: "528₽", delta: "−58%" },
];

const Hero = () => {
  const { settings } = useSiteSettingsMap();
  const heroCtaPrimary = getSetting(settings, "hero_cta_primary", "Получить аудит бесплатно");
  const heroCtaSecondary = getSetting(settings, "hero_cta_secondary", "Смотреть кейсы");

  // Live "leads today" counter — фейковая телеметрия, обновляется каждые 6с
  const [leadsToday, setLeadsToday] = useState(127);
  useEffect(() => {
    const id = setInterval(() => {
      setLeadsToday((n) => n + Math.floor(Math.random() * 3));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full bg-[#fafafa] text-foreground overflow-hidden selection:bg-primary selection:text-white">
      {/* Soft red ambient (no AI gradients in heads, just a whisper) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.10]"
        style={{ background: "hsl(9 96% 53%)" }}
      />

      {/* Decorative giant РИС watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 sm:-right-20 text-[12rem] sm:text-[20rem] lg:text-[26rem] font-black text-black/[0.035] select-none leading-none tracking-tighter z-0"
      >
        РИС.
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-20 min-h-[100vh] lg:min-h-screen flex flex-col">
        {/* TOP META BAR */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between border-t border-black/10 pt-4 mb-10 sm:mb-16 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-primary">§ Performance Marketing</span>
            <span className="hidden sm:inline text-black/30">/ с 2014</span>
          </div>
          <span className="text-black/40 hidden md:inline">Ростов · Москва · Краснодар · ДНР</span>
          <span className="text-black/50 font-mono normal-case tracking-tight">№ 2026 / 01</span>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8 flex-1">
          {/* LEFT RAIL — provocative quote + stats */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 lg:col-span-3 flex flex-col justify-between gap-10 order-2 lg:order-1"
          >
            <div className="border-l-2 border-primary pl-5 space-y-4">
              <p className="font-display-italic italic text-lg sm:text-xl leading-snug text-black/70">
                Большинство агентств продают <span className="text-primary">надежду</span>. Мы продаём
                <span className="text-foreground"> математику</span>.
              </p>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">
                — Манифест РИС
              </div>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
              <div className="border-t border-black/10 pt-3">
                <div className="text-3xl sm:text-4xl font-black tracking-tighter">200+</div>
                <div className="text-[10px] uppercase tracking-widest text-black/40 mt-1">Проектов в нишах</div>
              </div>
              <div className="border-t border-black/10 pt-3">
                <div className="text-3xl sm:text-4xl font-black tracking-tighter">
                  ×<span className="text-primary">4.7</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-black/40 mt-1">Средний ROI</div>
              </div>
              <div className="border-t border-black/10 pt-3">
                <div className="text-3xl sm:text-4xl font-black tracking-tighter">3 дня</div>
                <div className="text-[10px] uppercase tracking-widest text-black/40 mt-1">До запуска</div>
              </div>
            </div>
          </motion.aside>

          {/* CENTER — headline */}
          <div className="col-span-12 lg:col-span-9 order-1 lg:order-2 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase leading-[0.85] tracking-tighter text-[15vw] sm:text-[12vw] lg:text-[10.5vw]"
            >
              <span className="block">Хватит</span>
              <span className="block relative">
                <span className="relative inline-block">
                  ждать
                  {/* Hand-drawn underline swipe */}
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                    viewBox="0 0 400 20"
                    preserveAspectRatio="none"
                    className="absolute left-0 -bottom-2 sm:-bottom-3 w-full h-[0.12em] overflow-visible"
                  >
                    <motion.path
                      d="M2 12 C 80 4, 180 18, 398 8"
                      fill="none"
                      stroke="hsl(9 96% 53%)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
                <span className="text-black/30"> —</span>
              </span>
              <span className="block font-display-italic italic font-normal lowercase text-primary tracking-normal">
                заставьте
              </span>
              <span className="block">
                клиентов <span className="text-black/30">искать</span> вас.
              </span>
            </motion.h1>

            {/* Sub copy + CTAs row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 sm:mt-14 grid grid-cols-12 gap-6 items-end"
            >
              <p className="col-span-12 md:col-span-6 text-base sm:text-lg text-black/60 leading-relaxed max-w-xl">
                Проектируем маркетинговые системы из <span className="text-foreground font-semibold">Яндекс.Директ</span>,
                <span className="text-foreground font-semibold"> VK Ads</span> и
                <span className="text-foreground font-semibold"> Telegram Ads</span>, которые приводят клиентов на 2-й день после старта.
              </p>

              <div className="col-span-12 md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-3 sm:gap-4">
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
                    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM — live ticker + telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 sm:mt-16 border-t border-black/10 pt-5 grid grid-cols-12 gap-4 items-center"
        >
          {/* Live counter card */}
          <div className="col-span-12 md:col-span-3 flex items-center gap-3">
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/40">Заявок у клиентов сегодня</div>
              <div className="text-2xl font-black tracking-tighter tabular-nums">
                {leadsToday}
                <span className="text-emerald-600 text-sm ml-2">↑ live</span>
              </div>
            </div>
          </div>

          {/* Niche CPL ticker (marquee) */}
          <div className="col-span-12 md:col-span-9 overflow-hidden relative md:border-l border-black/10 md:pl-6">
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/40 mb-2">
              Стоимость заявки по нишам <span className="text-primary">/ live</span>
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
                    <span className="text-emerald-600 font-bold text-xs">{n.delta}</span>
                    <span className="text-black/15 ml-4">●</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer caption */}
        <div className="mt-6 flex justify-between text-[10px] uppercase tracking-[0.3em] font-bold text-black/30">
          <span>No bullshit · only numbers</span>
          <span className="hidden sm:inline">Scroll ↓</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
