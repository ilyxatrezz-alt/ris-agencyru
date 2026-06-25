import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Phone, Check } from "lucide-react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";
import { siteConfig } from "@/config/siteConfig";

type ServiceKey = "site" | "ads" | "smm" | "complex";

const SERVICES: { key: ServiceKey; title: string; desc: string; price: string; }[] = [
  { key: "site",    title: "Сайт под ключ",        desc: "Лендинг, корпоративный, интернет-магазин", price: "от 45 000 ₽" },
  { key: "ads",     title: "Реклама Яндекс/VK",    desc: "Заявки со 2-го дня после запуска",         price: "от 25 000 ₽" },
  { key: "smm",     title: "SMM и контент",        desc: "Ведение, дизайн, аналитика",               price: "от 30 000 ₽" },
  { key: "complex", title: "Комплексное продвижение", desc: "Сайт + реклама + аналитика",            price: "от 75 000 ₽" },
];

const NICHE_TICKER = [
  { niche: "Медицина", cpl: "287 ₽" },
  { niche: "Стройка", cpl: "612 ₽" },
  { niche: "Юристы", cpl: "418 ₽" },
  { niche: "HoReCa", cpl: "194 ₽" },
  { niche: "E-com", cpl: "356 ₽" },
  { niche: "Авто", cpl: "528 ₽" },
];

const Hero = () => {
  const { settings } = useSiteSettingsMap();
  const heroCtaPrimary = getSetting(settings, "hero_cta_primary", "Получить аудит бесплатно");

  const [service, setService] = useState<ServiceKey>("ads");
  const selected = SERVICES.find((s) => s.key === service)!;

  const [leadsToday, setLeadsToday] = useState(127);
  useEffect(() => {
    const id = setInterval(() => setLeadsToday((n) => n + Math.floor(Math.random() * 3)), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full bg-[#fafafa] text-foreground overflow-hidden font-sans">
      {/* Subtle ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full blur-[160px] opacity-[0.10]"
        style={{ background: "hsl(9 96% 53%)" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-10 sm:pb-16">
        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-3 mb-6 sm:mb-10 text-xs text-black/60"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-semibold text-primary">Агентство роста</span>
            <span className="hidden sm:inline text-black/30">·</span>
            <span className="hidden sm:inline">с 2014 года · 200+ проектов</span>
          </div>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="hidden md:inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {siteConfig.phone}
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT — Headline + CTA */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold leading-[1.0] tracking-[-0.04em] text-[clamp(2.25rem,6.5vw,5rem)]"
            >
              <span className="text-primary font-black">РИС</span>кни получить
              <br />
              <span className="text-foreground">гарантированный</span> результат.
            </motion.h1>



            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-5 text-base sm:text-lg text-black/60 max-w-md leading-relaxed"
            >
              Сайты и реклама, которые приносят клиентов{" "}
              <span className="text-foreground font-semibold">со 2-го дня после старта.</span>
            </motion.p>

            {/* Quick proof chips */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {["200+ проектов", "с 2014 года", "Гарантия в договоре"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/10 text-xs font-medium text-black/70"
                >
                  <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                  {t}
                </span>
              ))}
            </motion.div>


            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link
                to={`/contacts?service=${service}`}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary text-white font-semibold rounded-full shadow-[0_18px_40px_-12px_hsl(9_96%_53%/0.55)] hover:bg-primary/90 transition-colors"
              >
                {heroCtaPrimary}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-foreground/20 text-foreground font-semibold rounded-full hover:border-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Написать в Telegram
              </a>
            </motion.div>

            <p className="mt-3 text-xs text-black/45">Ответим за 30 минут · без спама</p>

          </div>

          {/* RIGHT — Service picker card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl bg-white border border-black/[0.07] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)] p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-primary">Шаг 1 из 2</div>
                  <h2 className="text-lg sm:text-xl font-display font-semibold mt-1">С чего начнём?</h2>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-black/50">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  online
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {SERVICES.map((s) => {
                  const active = s.key === service;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setService(s.key)}
                      className={`text-left rounded-xl border p-3.5 transition-all ${
                        active
                          ? "border-primary bg-primary/[0.04] shadow-[0_8px_24px_-12px_hsl(9_96%_53%/0.45)]"
                          : "border-black/[0.08] hover:border-black/25 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-semibold text-sm sm:text-[15px] flex items-center gap-2">
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                active ? "border-primary bg-primary" : "border-black/20"
                              }`}
                            >
                              {active && <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />}
                            </span>
                            {s.title}
                          </div>
                          <p className="mt-1 text-xs text-black/55 pl-6">{s.desc}</p>
                        </div>
                        <span className="text-xs font-semibold text-foreground tabular-nums whitespace-nowrap shrink-0">
                          {s.price}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-black/[0.06] flex items-center justify-between gap-3">
                <div className="text-xs text-black/55 min-w-0">
                  Выбрано: <span className="text-foreground font-semibold">{selected.title}</span>
                </div>
                <Link
                  to={`/contacts?service=${service}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-foreground text-background text-sm font-semibold rounded-full hover:bg-primary transition-colors shrink-0"
                >
                  Дальше
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Live stats below card */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white border border-black/[0.07] p-4">
                <div className="text-[10px] uppercase tracking-wider font-bold text-black/45">Заявок сегодня</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-display font-bold tabular-nums">{leadsToday}</span>
                  <span className="text-emerald-600 text-[11px] font-semibold">↑ live</span>
                </div>
              </div>
              <div className="rounded-2xl bg-foreground text-background p-4">
                <div className="text-[10px] uppercase tracking-wider font-bold text-white/50">Средний CPL</div>
                <div className="mt-1 text-2xl font-display font-bold tabular-nums">
                  342 ₽
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom niche ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 sm:mt-14 border-t border-black/10 pt-4"
        >
          <div className="flex items-center gap-3 text-xs sm:text-sm font-display font-extrabold uppercase tracking-[0.12em] text-black/60 mb-2">
            <span>CPL по нишам</span>
            <span className="text-primary">· LIVE</span>
          </div>

          <div className="overflow-hidden">
            <motion.div
              className="flex shrink-0 gap-8 pr-8 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {[...NICHE_TICKER, ...NICHE_TICKER].map((n, i) => (
                <div key={i} className="flex items-baseline gap-2 text-sm">
                  <span className="text-black/50">{n.niche}</span>
                  <span className="font-display font-bold tabular-nums">{n.cpl}</span>
                  <span className="text-black/15 ml-3">●</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
