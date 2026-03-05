import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { 
  Megaphone, BarChart3, Globe, Video, Share2, Search,
  ChevronLeft, ChevronRight
} from "lucide-react";

const services = [
  {
    title: "Запуск рекламы",
    subtitle: "Launching Ads",
    icon: Megaphone,
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    border: "border-orange-500/30",
    iconBg: "from-orange-500 to-amber-500",
    glow: "orange",
  },
  {
    title: "Аналитика и Аудит",
    subtitle: "Analytics & Audit",
    icon: BarChart3,
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    border: "border-emerald-500/30",
    iconBg: "from-emerald-500 to-teal-500",
    glow: "emerald",
  },
  {
    title: "Создание сайтов",
    subtitle: "Web Development",
    icon: Globe,
    gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/20",
    border: "border-blue-500/30",
    iconBg: "from-blue-500 to-indigo-500",
    glow: "blue",
  },
  {
    title: "Съёмка видео",
    subtitle: "Video Production",
    icon: Video,
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-pink-500/20",
    border: "border-purple-500/30",
    iconBg: "from-purple-500 to-fuchsia-500",
    glow: "purple",
  },
  {
    title: "SMM продвижение",
    subtitle: "Social Media Marketing",
    icon: Share2,
    gradient: "from-pink-500/20 via-rose-500/10 to-red-500/20",
    border: "border-pink-500/30",
    iconBg: "from-pink-500 to-rose-500",
    glow: "pink",
  },
  {
    title: "SEO оптимизация",
    subtitle: "Search Engine Optimization",
    icon: Search,
    gradient: "from-cyan-500/20 via-sky-500/10 to-blue-500/20",
    border: "border-cyan-500/30",
    iconBg: "from-cyan-500 to-sky-500",
    glow: "cyan",
  },
];

const ServicesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % services.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next]);

  const getCardStyle = (offset: number) => {
    // offset: -2, -1, 0, 1, 2
    const absOffset = Math.abs(offset);
    return {
      x: offset * 110,
      z: -absOffset * 120,
      rotateY: offset * -25,
      scale: 1 - absOffset * 0.15,
      opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.25,
    };
  };

  const getVisibleCards = () => {
    const cards: { service: typeof services[0]; offset: number; index: number }[] = [];
    for (let i = -2; i <= 2; i++) {
      const idx = (activeIndex + i + services.length) % services.length;
      cards.push({ service: services[idx], offset: i, index: idx });
    }
    return cards;
  };

  return (
    <div className="relative w-full">
      {/* 3D Carousel Container */}
      <div 
        className="relative h-[340px] sm:h-[380px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <AnimatePresence mode="popLayout">
          {getVisibleCards().map(({ service, offset, index }) => {
            const Icon = service.icon;
            const style = getCardStyle(offset);
            const isCenter = offset === 0;

            return (
              <motion.div
                key={`${index}-${activeIndex}`}
                className={`absolute w-[200px] sm:w-[240px] cursor-pointer`}
                style={{
                  zIndex: 10 - Math.abs(offset),
                  transformStyle: "preserve-3d",
                }}
                initial={{ 
                  x: direction > 0 ? 300 : -300, 
                  rotateY: direction > 0 ? -40 : 40, 
                  opacity: 0, 
                  scale: 0.7 
                }}
                animate={{
                  x: style.x,
                  rotateY: style.rotateY,
                  scale: style.scale,
                  opacity: style.opacity,
                  z: style.z,
                }}
                exit={{ 
                  x: direction > 0 ? -300 : 300, 
                  rotateY: direction > 0 ? 40 : -40, 
                  opacity: 0, 
                  scale: 0.7 
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  mass: 0.8,
                }}
                onClick={() => {
                  if (offset > 0) next();
                  if (offset < 0) prev();
                }}
              >
                <motion.div
                  className={`
                    relative rounded-2xl sm:rounded-3xl overflow-hidden
                    bg-gradient-to-br ${service.gradient}
                    border ${service.border}
                    backdrop-blur-xl
                    p-5 sm:p-6
                    ${isCenter ? 'shadow-2xl ring-1 ring-white/10' : 'shadow-lg'}
                  `}
                  style={{
                    background: isCenter 
                      ? `linear-gradient(135deg, rgba(30,30,35,0.95), rgba(20,20,25,0.98))`
                      : `linear-gradient(135deg, rgba(25,25,30,0.85), rgba(15,15,20,0.9))`,
                  }}
                  whileHover={isCenter ? { y: -8, scale: 1.03 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {/* Shimmer effect */}
                  {isCenter && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                  )}

                  {/* Gradient overlay top */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30`} />

                  {/* Icon */}
                  <motion.div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center mb-4 shadow-lg`}
                    animate={isCenter ? { 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
                  </motion.div>

                  {/* Text */}
                  <h3 className="text-white font-black text-lg sm:text-xl leading-tight mb-1.5 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm font-medium uppercase tracking-wider relative z-10">
                    {service.subtitle}
                  </p>

                  {/* Arrow for center card */}
                  {isCenter && (
                    <motion.div
                      className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronRight className="w-4 h-4 text-white/70" />
                    </motion.div>
                  )}

                  {/* Decorative dots */}
                  <div className="absolute top-3 right-3 flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/15" />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <motion.button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-zinc-700/50 bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-white hover:border-primary/50 transition-all backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {services.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > activeIndex ? 1 : -1);
                setActiveIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex 
                  ? "bg-primary w-8" 
                  : "bg-zinc-700 w-2 hover:bg-zinc-500"
              }`}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>

        <motion.button
          onClick={next}
          className="w-10 h-10 rounded-full border border-zinc-700/50 bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-white hover:border-primary/50 transition-all backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ServicesCarousel;
