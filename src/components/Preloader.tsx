import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Faster loading for better UX
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5; // Faster progress
      });
    }, 20);

    // Reduced preloader time for faster perceived loading
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1200); // Reduced from 2200ms to 1200ms

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 px-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated background particles - fewer on mobile */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -80, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Center glow - responsive size */}
          <motion.div
            className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(9 96% 53% / 0.15) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo container */}
          <div className="relative flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md">
            {/* Main logo */}
            <motion.div
              className="relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              {/* Rotating rings - responsive sizes */}
              <motion.div
                className="absolute -inset-4 sm:-inset-6 md:-inset-8 rounded-full border-2 border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 sm:-inset-10 md:-inset-12 rounded-full border border-primary/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Glowing dot on ring */}
              <motion.div
                className="absolute -inset-4 sm:-inset-6 md:-inset-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(9_96%_53%)]" />
              </motion.div>

              {/* Logo text - responsive sizes */}
              <div className="relative z-10 flex items-center justify-center">
                {["Р", "И", "С"].map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.15,
                      ease: "backOut",
                    }}
                  >
                    <motion.span
                      className="inline-block"
                      animate={{
                        color: ["#ffffff", "hsl(9, 96%, 53%)", "#ffffff"],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      {letter}
                    </motion.span>
                  </motion.span>
                ))}
              </div>

              {/* Underline glow */}
              <motion.div
                className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
            </motion.div>

            {/* Tagline - responsive text */}
            <motion.p
              className="mt-6 sm:mt-8 text-zinc-500 text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.3em] uppercase text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Рекламное интернет-агентство
            </motion.p>

            {/* Progress bar - responsive width */}
            <motion.div
              className="mt-6 sm:mt-8 w-32 sm:w-40 md:w-48 h-0.5 bg-zinc-800 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-orange-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Loading percentage */}
            <motion.span
              className="mt-2 sm:mt-3 text-xs text-zinc-600 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {progress}%
            </motion.span>
          </div>

          {/* Corner decorations - responsive sizes, hidden on very small screens */}
          <motion.div
            className="hidden sm:block absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-l-2 border-t-2 border-primary/30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.div
            className="hidden sm:block absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-r-2 border-b-2 border-primary/30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
