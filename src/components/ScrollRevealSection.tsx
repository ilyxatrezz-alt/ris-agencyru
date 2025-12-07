import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const ScrollRevealSection = ({ 
  children, 
  className = "",
  delay = 0,
  direction = "up"
}: ScrollRevealSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 100, x: 0 };
      case "down": return { y: -100, x: 0 };
      case "left": return { x: 100, y: 0 };
      case "right": return { x: -100, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...getInitialPosition(),
        filter: "blur(10px)",
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
        filter: "blur(0px)",
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;