import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, TrendingUp } from "lucide-react";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";
import { useCasesSliderItems } from "@/hooks/useCasesSliderItems";

const CasesSlider = () => {
  const { settings } = useSiteSettingsMap();
  const { data: casesData } = useCasesSliderItems();

  const title = getSetting(settings, "home_cases_slider_title", "Кейсы успеха");
  const subtitle = getSetting(
    settings,
    "home_cases_slider_subtitle",
    "Реальные цифры и интерфейсы проектов, которые мы вывели на новый уровень эффективности."
  );

  const cases =
    casesData?.map((item) => ({
      category: item.category,
      title: item.title,
      description: item.description || "",
      image: item.image_url,
      imageVersion: item.updated_at,
      stats: {
        leads: item.stats_leads || "—",
        cpl: item.stats_cpl || "—",
        roi: item.stats_roi || "—",
      },
      link: item.link,
    })) || [];

  const [active, setActive] = useState(0);
  const total = cases.length;
  const safeActive = total ? active % total : 0;
  const current = cases[safeActive];

  const prev = () => setActive((i) => (total ? (i - 1 + total) % total : 0));
  const next = () => setActive((i) => (total ? (i + 1) % total : 0));

  // Split title for serif accent on last word
  const titleWords = title.split(" ");
  const titleHead = titleWords.slice(0, -1).join(" ");
  const titleTail = titleWords.slice(-1)[0];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground leading-[1.05]">
                {titleHead && <>{titleHead} </>}
                <span className="italic font-normal text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {titleTail}
                </span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-md font-medium">
                {subtitle}
              </p>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex gap-3">
              <button
                onClick={prev}
                aria-label="Предыдущий кейс"
                className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-muted/50 transition-colors group"
              >
                <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
              <button
                onClick={next}
                aria-label="Следующий кейс"
                className="w-14 h-14 rounded-full border border-primary bg-primary flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                <ChevronRight className="w-6 h-6 text-primary-foreground" />
              </button>
            </div>
          </div>

          {total === 0 ? (
            <div className="text-center text-muted-foreground py-20">Кейсы скоро появятся</div>
          ) : (
            <>
              {/* Browser mockup */}
              <div className="relative">
                <div className="rounded-2xl border border-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden bg-background">
                  {/* Browser header */}
                  <div className="bg-muted/40 px-3 md:px-5 py-3 md:py-4 border-b border-border flex items-center gap-2">
                    <div className="flex gap-1.5 md:gap-2">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-muted-foreground/30" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-muted-foreground/30" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-muted-foreground/30" />
                    </div>
                    <div className="mx-auto bg-background border border-border rounded-lg px-3 md:px-4 py-1 text-[10px] md:text-[11px] text-muted-foreground w-full max-w-xs md:max-w-sm text-center font-medium truncate">
                      ris-agency.ru / case / {current.category.toLowerCase()}
                    </div>
                  </div>

                  {/* Screenshot */}
                  <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/10] bg-muted overflow-hidden">
                    <img
                      src={`${current.image}${current.imageVersion ? `?v=${encodeURIComponent(current.imageVersion)}` : ""}`}
                      alt={`Кейс: ${current.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />

                    {/* Stickers (desktop only - hide on mobile to avoid clutter) */}
                    <div className="absolute inset-0 pointer-events-none hidden md:block">
                      {/* ROI sticker top-left */}
                      <div className="absolute top-[8%] left-[4%] pointer-events-auto bg-background p-4 lg:p-5 rounded-2xl shadow-2xl border border-border flex flex-col transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                        <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-bold mb-1">ROI</span>
                        <span className="text-2xl lg:text-3xl font-bold text-foreground">{current.stats.roi}</span>
                      </div>

                      {/* Hero metric - leads */}
                      <div className="absolute bottom-[28%] left-[6%] pointer-events-auto bg-primary p-5 lg:p-6 rounded-3xl shadow-2xl shadow-primary/30 flex flex-col transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <span className="text-[11px] uppercase tracking-[0.1em] text-primary-foreground/80 font-bold mb-1">Лидов</span>
                        <span className="text-3xl lg:text-4xl font-bold text-primary-foreground">{current.stats.leads}</span>
                      </div>

                      {/* CPL sticker top-right */}
                      <div className="absolute top-[8%] right-[6%] pointer-events-auto bg-background/95 backdrop-blur-sm p-4 lg:p-5 rounded-2xl shadow-2xl border border-border flex items-center gap-3 lg:gap-4 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground font-bold">CPL</span>
                          <span className="block text-xl lg:text-2xl font-bold text-foreground">{current.stats.cpl}</span>
                        </div>
                      </div>

                      {/* Info card bottom-right */}
                      <div className="absolute bottom-[6%] right-[4%] pointer-events-auto max-w-sm bg-background/95 backdrop-blur-md p-6 lg:p-8 rounded-3xl shadow-2xl border border-border">
                        <div className="mb-3">
                          <span className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            {current.category}
                          </span>
                        </div>
                        <h3 className="text-lg lg:text-2xl font-bold text-foreground leading-tight mb-2 lg:mb-3 line-clamp-3">
                          {current.title}
                        </h3>
                        {current.description && (
                          <p className="text-sm text-muted-foreground mb-4 lg:mb-6 line-clamp-2">
                            {current.description}
                          </p>
                        )}
                        <Link
                          to={current.link}
                          className="pointer-events-auto inline-flex items-center text-sm lg:text-base font-bold text-primary group/link"
                        >
                          Смотреть детали кейса
                          <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual depth accents */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 w-3 md:w-6 h-[80%] bg-muted/40 rounded-l-3xl -z-10 border border-border hidden sm:block" />
                <div className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 w-3 md:w-6 h-[80%] bg-muted/40 rounded-r-3xl -z-10 border border-border hidden sm:block" />
              </div>

              {/* Mobile content card (stickers hidden on mobile) */}
              <div className="md:hidden mt-6 bg-card border border-border rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {current.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={prev}
                      aria-label="Назад"
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Вперёд"
                      className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
                    >
                      <ChevronRight className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground leading-tight mb-2">
                  {current.title}
                </h3>
                {current.description && (
                  <p className="text-sm text-muted-foreground mb-5">{current.description}</p>
                )}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border mb-5">
                  <div>
                    <div className="text-base font-bold text-primary">{current.stats.leads}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Лидов</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-primary">{current.stats.cpl}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">CPL</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-primary flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {current.stats.roi}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">ROI</div>
                  </div>
                </div>
                <Link
                  to={current.link}
                  className="inline-flex items-center text-sm font-bold text-primary"
                >
                  Смотреть детали кейса
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3 mt-10 md:mt-12">
                {cases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Кейс ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === safeActive
                        ? "w-12 bg-primary"
                        : "w-3 bg-muted hover:bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CasesSlider;
