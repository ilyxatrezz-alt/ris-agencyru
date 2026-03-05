import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Megaphone, BarChart3, Globe, Video, Share2, Search,
  ChevronLeft, ChevronRight, ExternalLink
} from "lucide-react";

const services = [
  {
    title: "Запуск рекламы",
    subtitle: "Launching Ads",
    icon: Megaphone,
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    border: "border-orange-500/30",
    iconBg: "from-orange-500 to-amber-500",
    link: "/services",
    external: false,
  },
  {
    title: "Создание сайтов",
    subtitle: "Web Development",
    icon: Globe,
    gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/20",
    border: "border-blue-500/30",
    iconBg: "from-blue-500 to-indigo-500",
    link: "/web-development",
    external: false,
  },
  {
    title: "SMM продвижение",
    subtitle: "Social Media Marketing",
    icon: Share2,
    gradient: "from-pink-500/20 via-rose-500/10 to-red-500/20",
    border: "border-pink-500/30",
    iconBg: "from-pink-500 to-rose-500",
    link: "/smm",
    external: false,
  },
  {
    title: "Съёмка видео",
    subtitle: "Video Production",
    icon: Video,
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-pink-500/20",
    border: "border-purple-500/30",
    iconBg: "from-purple-500 to-fuchsia-500",
    link: "https://reels-doneck.ru/",
    external: true,
  },
  {
    title: "Аналитика и Аудит",
    subtitle: "Analytics & Audit",
    icon: BarChart3,
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    border: "border-emerald-500/30",
    iconBg: "from-emerald-500 to-teal-500",
    link: "/services",
    external: false,
  },
  {
    title: "SEO оптимизация",
    subtitle: "Search Engine Optimization",
    icon: Search,
    gradient: "from-cyan-500/20 via-sky-500/10 to-blue-500/20",
    border: "border-cyan-500/30",
    iconBg: "from-cyan-500 to-sky-500",
    link: "/services",
    external: false,
  },
];

const ServicesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  }, []);

  // Auto-rotate with pause on interaction
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 5500);
  }, [next]);

  useEffect(() => {
    resetAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [resetAutoPlay]);

  // Touch/swipe support
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
    // Center card → navigate
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

  return (
    <div className="relative w-full select-none">
      {/* 3D Carousel */}
      <div 
        className="relative h-[340px] sm:h-[460px] md:h-[560px] flex items-center justify-center overflow-hidden"
        style={{ perspective: "1800px" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          const offset = getOffset(index);
          const absOffset = Math.abs(offset);
          
          if (absOffset > 2) return null;

          const isCenter = offset === 0;
          const xPos = offset * (window.innerWidth < 640 ? 120 : window.innerWidth < 768 ? 180 : 240);

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
                rotateY: offset * -20,
                scale: 1 - absOffset * 0.12,
                opacity: 1 - absOffset * 0.3,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
              }}
              onClick={() => handleCardClick(service, offset)}
            >
              <motion.div
                className={`
                  relative rounded-2xl sm:rounded-3xl overflow-hidden
                  w-[230px] sm:w-[300px] md:w-[380px]
                  border ${service.border}
                  backdrop-blur-xl
                  p-6 sm:p-7 md:p-8
                  ${isCenter ? 'shadow-2xl ring-1 ring-white/10' : 'shadow-lg'}
                `}
                style={{
                  background: isCenter 
                    ? `linear-gradient(135deg, rgba(30,30,35,0.95), rgba(20,20,25,0.98))`
                    : `linear-gradient(135deg, rgba(25,25,30,0.8), rgba(15,15,20,0.85))`,
                }}
                whileHover={isCenter ? { y: -10, scale: 1.04 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Shimmer */}
                {isCenter && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                )}

                {/* Color overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30`} />

                {/* Icon */}
                <motion.div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center mb-6 shadow-lg`}
                  animate={isCenter ? { 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
                </motion.div>

                {/* Text */}
                <h3 className="text-white font-black text-xl sm:text-2xl md:text-3xl leading-tight mb-2 relative z-10">
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider relative z-10">
                  {service.subtitle}
                </p>

                {/* Link indicator for center */}
                {isCenter && (
                  <motion.div
                    className="mt-4 flex items-center gap-1.5 text-xs text-zinc-400 relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {service.external ? (
                      <ExternalLink className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                    <span>Подробнее</span>
                  </motion.div>
                )}

                {/* Dots decoration */}
                <div className="absolute top-3 right-3 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/15" />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2">
        <motion.button
          onClick={() => { prev(); resetAutoPlay(); }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-zinc-700/50 bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-white hover:border-primary/50 transition-all backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Предыдущая услуга"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex gap-2">
          {services.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setActiveIndex(i); resetAutoPlay(); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex 
                  ? "bg-primary w-8" 
                  : "bg-zinc-700 w-2 hover:bg-zinc-500"
              }`}
              whileHover={{ scale: 1.3 }}
              aria-label={`Услуга ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={() => { next(); resetAutoPlay(); }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-zinc-700/50 bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-white hover:border-primary/50 transition-all backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
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
        ← Свайпайте для просмотра →
      </motion.p>
    </div>
  );
};

export default ServicesCarousel;
