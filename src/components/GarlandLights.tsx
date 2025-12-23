import { motion } from "framer-motion";

const GarlandLights = () => {
  const lights = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    color: ["#ff3333", "#33ff33", "#3333ff", "#ffff33", "#ff33ff", "#33ffff"][i % 6],
    delay: i * 0.2,
  }));

  return (
    <div className="absolute bottom-0 left-0 right-0 translate-y-full flex justify-around px-8 pointer-events-none z-50">
      {lights.map((light) => (
        <div key={light.id} className="flex flex-col items-center">
          {/* Wire */}
          <div 
            className="w-0.5 bg-green-700"
            style={{ height: light.id % 2 === 0 ? "12px" : "20px" }}
          />
          
          {/* Bulb holder */}
          <div className="w-2.5 h-1.5 bg-green-800 rounded-t-sm" />
          
          {/* Light bulb */}
          <motion.div
            className="w-3.5 h-5 rounded-b-full"
            style={{
              backgroundColor: light.color,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              boxShadow: [
                `0 0 8px 2px ${light.color}`,
                `0 0 20px 8px ${light.color}`,
                `0 0 8px 2px ${light.color}`,
              ],
            }}
            transition={{
              duration: 1 + Math.random() * 0.5,
              delay: light.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default GarlandLights;
