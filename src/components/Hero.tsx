import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const tickerItems = [
  "STRATEGY", "GROWTH", "ROI", "SCALE", "PROFITS",
  "EDITORIAL", "2026", "РЕКЛАМА", "САЙТЫ", "SMM", "SEO",
];

const Hero = () => {
  const { settings } = useSiteSettingsMap();
  const heroCtaPrimary = getSetting(settings, "hero_cta_primary", "Получить аудит бесплатно");
  const heroCtaSecondary = getSetting(settings, "hero_cta_secondary", "Смотреть кейсы");

  return (
    <section className="relative bg-[#f4f4f2] text-foreground py-4 sm:py-10 lg:py-14 px-3 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[420px] sm:max-w-3xl lg:max-w-6xl bg-background border border-foreground shadow-[6px_6px_0_0_hsl(var(--foreground))] sm:shadow-[10px_10px_0_0_hsl(var(--foreground))] flex flex-col overflow-hidden"
      >
        {/* Masthead */}
        <div className="p-4 sm:p-6 border-b-2 border-foreground flex flex-col gap-2">
          <div className="flex justify-between items-end border-b border-foreground pb-1.5 gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter">Issue №01</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter text-primary text-center">
              Price: Your Growth
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter">Editorial 2026</span>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-center">
            РИС
          </h1>
        </div>

        {/* Main */}
        <div className="p-4 sm:p-6 lg:p-10 flex flex-col gap-5 sm:gap-7">
          {/* Headline */}
          <div className="border-b-2 border-foreground pb-4 sm:pb-6">
            <h2 className="text-[42px] sm:text-[72px] lg:text-[104px] leading-[0.9] font-black uppercase tracking-tight">
              БОЛЬШЕ{" "}
              <span className="text-primary font-display-italic font-normal normal-case tracking-normal">
                клиентов,
              </span>
              <br />
              БОЛЬШЕ{" "}
              <span className="bg-foreground text-background px-1.5 sm:px-3">
                ПРИБЫЛИ.
              </span>
            </h2>
          </div>

          {/* Editorial columns */}
          <div className="grid grid-cols-12 gap-4 sm:gap-6">
            <div className="col-span-7 flex flex-col gap-2 sm:gap-3">
              <div className="aspect-square sm:aspect-[4/3] bg-muted border border-foreground relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,hsl(var(--foreground))_1px,transparent_0)] bg-[length:4px_4px]" />
                <div className="absolute inset-0 flex items-end p-3">
                  <span className="text-[10px] sm:text-xs font-bold uppercase opacity-60">
                    Photo: Agency Case 2026
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-primary text-background w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center font-black text-xs sm:text-base uppercase">
                  NEW
                </div>
              </div>
              <p className="text-[11px] sm:text-sm leading-tight">
                <span className="font-bold uppercase">Эксклюзив:</span> Мы внедряем стратегии, которые трансформируют рынок маркетинга. Масштабирование без границ.
              </p>
            </div>
            <div className="col-span-5 border-l border-foreground pl-3 sm:pl-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="h-px bg-foreground w-full" />
                <p className="text-[10px] sm:text-xs leading-none uppercase font-bold">Аналитика</p>
                <p className="text-[14px] sm:text-xl font-display-italic leading-tight">
                  «Рынок требует радикальных решений»
                </p>
                <div className="h-px bg-foreground w-full" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="text-3xl sm:text-5xl font-black leading-none text-primary">01</div>
                <div className="text-[9px] sm:text-xs leading-tight uppercase font-bold">
                  Первый шаг к доминированию
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-1">
            <Link
              to="/contacts"
              className="flex-1 bg-primary text-background font-black py-4 sm:py-5 px-4 text-center uppercase tracking-tight border-2 border-foreground hover:bg-foreground transition-colors text-sm sm:text-base"
            >
              {heroCtaPrimary}
            </Link>
            <Link
              to="/cases"
              className="flex-1 bg-background text-foreground font-bold py-3 sm:py-4 px-4 uppercase tracking-tight border-2 border-foreground hover:bg-muted transition-colors flex justify-between items-center text-sm sm:text-base"
            >
              <span>{heroCtaSecondary}</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>

        {/* Ticker */}
        <div className="bg-foreground text-background py-1.5 sm:py-2 overflow-hidden whitespace-nowrap border-t-2 border-foreground">
          <div className="flex animate-marquee">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 sm:px-4"
              >
                {item} •
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
