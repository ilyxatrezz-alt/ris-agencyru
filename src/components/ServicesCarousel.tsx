import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Megaphone, BarChart3, Globe, Video, Share2, Search,
  ChevronLeft, ChevronRight, ExternalLink, Sparkles
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const services = [
  {
    title: "Запуск рекламы",
    subtitle: "Launching Ads",
    desc: "Таргет, контекст, медийка",
    icon: Megaphone,
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    border: "border-orange-500/30",
    iconBg: "from-orange-500 to-amber-600",
    glow: "shadow-orange-500/20",
    link: "/services",
    external: false,
  },
  {
    title: "Создание сайтов",
    subtitle: "Web Development",
    desc: "Лендинги, интернет-магазины",
    icon: Globe,
    gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/20",
    border: "border-blue-500/30",
    iconBg: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/20",
    link: "/web-development",
    external: false,
  },
  {
    title: "SMM продвижение",
    subtitle: "Social Media Marketing",
    desc: "Ведение, контент, стратегия",
    icon: Share2,
    gradient: "from-pink-500/20 via-rose-500/10 to-red-500/20",
    border: "border-pink-500/30",
    iconBg: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/20",
    link: "/smm",
    external: false,
  },
  {
    title: "Съёмка видео",
    subtitle: "Video Production",
    desc: "Reels, клипы, продакшн",
    icon: Video,
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-pink-500/20",
    border: "border-purple-500/30",
    iconBg: "from-purple-500 to-fuchsia-600",
    glow: "shadow-purple-500/20",
    link: "https://reels-doneck.ru/",
    external: true,
  },
  {
    title: "Аналитика и Аудит",
    subtitle: "Analytics & Audit",
    desc: "Разбор, стратегия, KPI",
    icon: BarChart3,
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    border: "border-emerald-500/30",
    iconBg: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    link: "/services",
    external: false,
  },
  {
    title: "SEO оптимизация",
    subtitle: "Search Engine Optimization",
    desc: "Продвижение в поиске",
    icon: Search,
    gradient: "from-cyan-500/20 via-sky-500/10 to-blue-500/20",
    border: "border-cyan-500/30",
    iconBg: "from-cyan-500 to-sky-600",
    glow: "shadow-cyan-500/20",
    link: "/services",
    external: false,
  },
];

const ServicesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  }, []);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 7000);
  }, [next]);

  useEffect(() => {
    resetAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [resetAutoPlay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
      resetAutoPlay();
    }
  };

  const handleCardClick = (service: typeof services[0], offset: number) => {
    if (offset !== 0) {
      if (offset > 0) next(); else prev();
      resetAutoPlay();
      return;
    }
    if (service.external) {
      window.open(service.link, "_blank");
    } else {
      navigate(service.link);
    }
  };

  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > services.length / 2) diff -= services.length;
    if (diff < -services.length / 2) diff += services.length;
    return diff;
  };

  const cardW = isMobile ? 240 : 400;
  const spacing = isMobile ? 130 : 260;

  return (
    <div className="relative w-full select-none">
      {/* Glow behind active card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full opacity-30 blur-[100px]"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 3D Carousel */}
      <div 
        className="relative h-[380px] sm:h-[520px] md:h-[580px] flex items-center justify-center overflow-hidden"
        style={{ perspective: "2200px" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence>
          {services.map((service, index) => {
            const Icon = service.icon;
            const offset = getOffset(index);
            const absOffset = Math.abs(offset);
            
            if (absOffset > 2) return null;

            const isCenter = offset === 0;
            const xPos = offset * spacing;

            return (
              <motion.div
                key={index}
                className="absolute cursor-pointer"
                style={{
                  zIndex: 10 - absOffset,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  x: xPos,
                  rotateY: offset * -18,
                  scale: isCenter ? 1 : 1 - absOffset * 0.15,
                  opacity: 1 - absOffset * 0.35,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 28,
                  mass: 1.2,
                }}
                onClick={() => handleCardClick(service, offset)}
              >
                <motion.div
                  className={`
                    relative rounded-3xl overflow-hidden
                    border ${service.border}
                    backdrop-blur-2xl
                    p-7 sm:p-9 md:p-10
                    ${isCenter ? `shadow-2xl ring-1 ring-white/10 ${service.glow}` : 'shadow-lg'}
                  `}
                  style={{
                    width: `${cardW}px`,
                    background: isCenter 
                      ? `linear-gradient(145deg, rgba(30,30,38,0.97), rgba(18,18,24,0.99))`
                      : `linear-gradient(145deg, rgba(22,22,28,0.75), rgba(12,12,16,0.8))`,
                  }}
                  whileHover={isCenter ? { y: -12, scale: 1.03 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {/* Animated border glow for center */}
                  {isCenter && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                          background: "conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.3), transparent, transparent)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950" />
                    </>
                  )}

                  {/* Shimmer */}
                  {isCenter && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                    />
                  )}

                  {/* Color overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-40 rounded-3xl`} />

                  {/* Icon */}
                  <motion.div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center mb-5 sm:mb-6`}
                    style={{
                      boxShadow: isCenter ? `0 8px 32px -4px rgba(0,0,0,0.5)` : undefined,
                    }}
                    animate={isCenter ? { 
                      rotate: [0, 3, -3, 0],
                      scale: [1, 1.06, 1],
                    } : {}}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-lg" strokeWidth={1.5} />
                  </motion.div>

                  {/* Text */}
                  <h3 className="text-white font-black text-xl sm:text-2xl md:text-3xl leading-tight mb-1.5 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] relative z-10 mb-3">
                    {service.subtitle}
                  </p>

                  {/* Short description for center */}
                  {isCenter && (
                    <motion.p
                      className="text-zinc-400 text-sm sm:text-base relative z-10 mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {service.desc}
                    </motion.p>
                  )}

                  {/* Link indicator for center */}
                  {isCenter && (
                    <motion.div
                      className="flex items-center gap-2 text-xs sm:text-sm text-primary font-semibold relative z-10"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {service.external ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <span>Подробнее</span>
                    </motion.div>
                  )}

                  {/* Corner sparkle */}
                  {isCenter && (
                    <motion.div 
                      className="absolute top-4 right-4 text-primary/40"
                      animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  )}

                  {/* Dots decoration */}
                  <div className="absolute top-4 left-4 flex gap-1.5 relative z-10">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${isCenter ? 'bg-primary/40' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-5 sm:gap-8 mt-0">
        <motion.button
          onClick={() => { prev(); resetAutoPlay(); }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-zinc-700/50 bg-zinc-900/80 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/50 transition-all backdrop-blur-xl"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Предыдущая услуга"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex gap-2.5">
          {services.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setActiveIndex(i); resetAutoPlay(); }}
              className={`rounded-full transition-all duration-500 ${
                i === activeIndex 
                  ? "bg-primary w-10 h-2.5 shadow-lg shadow-primary/30" 
                  : "bg-zinc-700/50 w-2.5 h-2.5 hover:bg-zinc-500"
              }`}
              whileHover={{ scale: 1.4 }}
              aria-label={`Услуга ${i + 1}`}
              layout
            />
          ))}
        </div>

        <motion.button
          onClick={() => { next(); resetAutoPlay(); }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-zinc-700/50 bg-zinc-900/80 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/50 transition-all backdrop-blur-xl"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Следующая услуга"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Swipe hint on mobile */}
      <motion.p
        className="text-center text-zinc-600 text-xs mt-3 sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        ← Свайпайте →
      </motion.p>
    </div>
  );
};

export default ServicesCarousel;
