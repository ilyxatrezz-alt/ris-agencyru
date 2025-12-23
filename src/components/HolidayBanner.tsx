import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface HolidayBannerProps {
  text: string;
}

const HolidayBanner = ({ text }: HolidayBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative overflow-hidden"
      >
        <div className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite] py-2.5 px-4">
          <div className="container mx-auto flex items-center justify-center gap-3 relative">
            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-yellow-300" />
            </motion.div>
            
            <motion.p
              className="text-white text-sm md:text-base font-medium text-center"
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {text}
            </motion.p>
            
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-yellow-300" />
            </motion.div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Animated snow on banner */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{ left: `${10 + i * 12}%` }}
              animate={{
                y: ["-10px", "50px"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HolidayBanner;
