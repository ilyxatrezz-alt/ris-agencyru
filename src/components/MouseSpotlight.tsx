import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const MouseSpotlight = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${spotlightX.get()}px ${spotlightY.get()}px, hsl(9 96% 53% / 0.06), transparent 40%)`,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, hsl(9 96% 53% / 0.04) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
};

export default MouseSpotlight;