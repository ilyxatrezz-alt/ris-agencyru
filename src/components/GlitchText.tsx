import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Основной текст всегда видимый */}
      <span className="relative z-10 inline-block">{text}</span>
      
      {/* Glitch эффекты только при активации */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-primary opacity-70 pointer-events-none"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
            initial={{ x: 0 }}
            animate={{ x: [-2, 2, -2], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 0.1, repeat: 2 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-cyan-400 opacity-70 pointer-events-none"
            style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
            initial={{ x: 0 }}
            animate={{ x: [2, -2, 2], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 0.1, repeat: 2 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
