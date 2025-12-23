import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  swing: number;
}

const SnowEffect = () => {
  const [isVisible, setIsVisible] = useState(true);

  const snowflakes = useMemo(() => {
    return Array.from({ length: 50 }, (_, i): Snowflake => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.4,
      swing: Math.random() * 40 - 20,
    }));
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-white select-none"
          style={{
            left: `${flake.x}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            textShadow: "0 0 5px rgba(255,255,255,0.5)",
          }}
          initial={{ y: -20, x: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, flake.swing, -flake.swing, flake.swing / 2, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: flake.duration / 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          ❄
        </motion.div>
      ))}
      
      {/* Sparkles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.8)",
          }}
          initial={{ y: -10, opacity: 0 }}
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            delay: Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
