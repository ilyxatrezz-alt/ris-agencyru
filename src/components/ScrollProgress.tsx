import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{ 
        scaleX,
        background: "linear-gradient(90deg, hsl(9 96% 53%), hsl(9 90% 60%), hsl(9 96% 53%))",
        boxShadow: "0 0 10px hsl(9 96% 53% / 0.5)",
      }}
    />
  );
};

export default ScrollProgress;
