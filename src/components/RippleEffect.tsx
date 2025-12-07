import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const RippleEffect = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Multiple ripple rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40"
                initial={{ width: 20, height: 20, opacity: 0.8 }}
                animate={{ 
                  width: 200 + i * 50, 
                  height: 200 + i * 50, 
                  opacity: 0 
                }}
                transition={{ 
                  duration: 0.6 + i * 0.1, 
                  ease: "easeOut",
                  delay: i * 0.05
                }}
              />
            ))}
            
            {/* Particle burst */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{
                  left: "50%",
                  top: "50%",
                  boxShadow: "0 0 10px hsl(9 96% 53% / 0.8)",
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 1,
                  opacity: 1 
                }}
                animate={{ 
                  x: Math.cos((i * Math.PI * 2) / 8) * 100,
                  y: Math.sin((i * Math.PI * 2) / 8) * 100,
                  scale: 0,
                  opacity: 0
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut" 
                }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RippleEffect;