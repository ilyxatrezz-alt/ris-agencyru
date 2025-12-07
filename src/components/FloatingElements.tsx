import { motion } from "framer-motion";

const FloatingElements = () => {
  const elements = [
    { size: 120, x: "10%", y: "20%", delay: 0, color: "primary" },
    { size: 80, x: "85%", y: "15%", delay: 1, color: "primary" },
    { size: 60, x: "70%", y: "70%", delay: 2, color: "zinc" },
    { size: 100, x: "15%", y: "75%", delay: 1.5, color: "primary" },
    { size: 40, x: "50%", y: "10%", delay: 0.5, color: "zinc" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
            background: el.color === "primary" 
              ? "radial-gradient(circle, hsl(9 96% 53% / 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, hsl(0 0% 50% / 0.05) 0%, transparent 70%)",
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Animated lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{
            width: "30%",
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            transform: "rotate(-15deg)",
          }}
          animate={{
            opacity: [0, 0.5, 0],
            x: [-100, 100],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
