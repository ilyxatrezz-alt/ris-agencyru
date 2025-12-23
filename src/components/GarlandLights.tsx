import { motion } from "framer-motion";

const GarlandLights = () => {
  const lights = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: ["#ff4444", "#44ff44", "#4444ff", "#ffff44", "#ff44ff", "#44ffff"][i % 6],
    delay: i * 0.15,
  }));

  return (
    <div className="absolute -bottom-3 left-0 right-0 flex justify-between px-4 pointer-events-none z-10">
      {/* Wire */}
      <svg className="absolute inset-x-0 -top-1 w-full h-6" preserveAspectRatio="none">
        <path
          d={`M 0 12 ${lights.map((_, i) => `Q ${(i + 0.5) * (100 / lights.length)}% ${i % 2 === 0 ? 20 : 8}, ${(i + 1) * (100 / lights.length)}% 12`).join(" ")}`}
          fill="none"
          stroke="#2a5a2a"
          strokeWidth="2"
        />
      </svg>
      
      {lights.map((light) => (
        <motion.div
          key={light.id}
          className="relative"
          style={{
            marginTop: light.id % 2 === 0 ? "8px" : "0px",
          }}
        >
          {/* Bulb holder */}
          <div className="w-2 h-2 bg-green-800 rounded-t-sm mx-auto" />
          
          {/* Light bulb */}
          <motion.div
            className="w-3 h-4 rounded-b-full relative"
            style={{
              backgroundColor: light.color,
              boxShadow: `0 0 10px ${light.color}, 0 0 20px ${light.color}`,
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              boxShadow: [
                `0 0 5px ${light.color}, 0 0 10px ${light.color}`,
                `0 0 15px ${light.color}, 0 0 30px ${light.color}, 0 0 40px ${light.color}`,
                `0 0 5px ${light.color}, 0 0 10px ${light.color}`,
              ],
            }}
            transition={{
              duration: 1.5 + Math.random() * 0.5,
              delay: light.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default GarlandLights;
