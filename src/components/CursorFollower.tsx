import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Быстрый курсор - почти мгновенно
  const fastSpring = { damping: 50, stiffness: 1000, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, fastSpring);
  const cursorYSpring = useSpring(cursorY, fastSpring);
  
  // Медленный трейл для красивого эффекта
  const slowSpring = { damping: 20, stiffness: 150, mass: 0.5 };
  const trailXSpring = useSpring(cursorX, slowSpring);
  const trailYSpring = useSpring(cursorY, slowSpring);

  // Создание частиц при движении
  const addTrail = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setTrails(prev => [...prev.slice(-8), { id, x, y }]);
    setTimeout(() => {
      setTrails(prev => prev.filter(t => t.id !== id));
    }, 500);
  }, []);

  useEffect(() => {
    let lastTrailTime = 0;
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
      
      // Добавляем трейл каждые 50мс
      const now = Date.now();
      if (now - lastTrailTime > 50) {
        addTrail(e.clientX, e.clientY);
        lastTrailTime = now;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, addTrail]);

  // Don't show on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      {/* Particle trails */}
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="fixed pointer-events-none z-[9996] hidden md:block"
            initial={{ 
              x: trail.x - 4, 
              y: trail.y - 4, 
              scale: 1, 
              opacity: 0.8 
            }}
            animate={{ 
              scale: 0, 
              opacity: 0,
              x: trail.x - 4 + (Math.random() - 0.5) * 30,
              y: trail.y - 4 + (Math.random() - 0.5) * 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                background: `hsl(${9 + index * 2} 96% ${53 + index * 3}%)`,
                boxShadow: `0 0 10px hsl(9 96% 53% / 0.5)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] hidden md:block"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: isHovering ? 100 : 50,
            height: isHovering ? 100 : 50,
            opacity: isVisible ? 0.15 : 0,
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 0.4,
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
          style={{
            background: "conic-gradient(from 0deg, hsl(9 96% 53% / 0.5), transparent, hsl(9 96% 53% / 0.5))",
          }}
        />
      </motion.div>

      {/* Main cursor dot - instantly follows mouse */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            width: isClicking ? 8 : isHovering ? 60 : 12,
            height: isClicking ? 8 : isHovering ? 60 : 12,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </motion.div>
      
      {/* Inner ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          animate={{
            width: isClicking ? 20 : isHovering ? 80 : 36,
            height: isClicking ? 20 : isHovering ? 80 : 36,
            opacity: isVisible ? 0.6 : 0,
            borderColor: isHovering ? "hsl(9 96% 53%)" : "hsl(9 96% 53% / 0.5)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            boxShadow: isHovering ? "0 0 20px hsl(9 96% 53% / 0.4)" : "none",
          }}
        />
      </motion.div>

      {/* Magnetic field effect on hover */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9995] hidden md:block"
          style={{
            x: trailXSpring,
            y: trailYSpring,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
              initial={{ width: 80, height: 80, opacity: 0 }}
              animate={{ 
                width: [80, 150], 
                height: [80, 150], 
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default CursorFollower;