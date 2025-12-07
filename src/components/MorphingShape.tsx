import { motion } from "framer-motion";

const MorphingShape = () => {
  const paths = [
    "M400,100 C500,100 600,200 600,300 C600,400 500,500 400,500 C300,500 200,400 200,300 C200,200 300,100 400,100",
    "M400,150 C550,150 550,250 500,300 C450,350 550,450 400,450 C250,450 350,350 300,300 C250,250 250,150 400,150",
    "M350,100 C450,150 600,150 600,300 C600,450 450,450 350,500 C250,450 200,450 200,300 C200,150 250,150 350,100",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.svg
        className="absolute w-full h-full opacity-10"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(9, 96%, 53%)" />
            <stop offset="100%" stopColor="hsl(9, 90%, 60%)" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#morphGradient)"
          animate={{
            d: paths,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
};

export default MorphingShape;
