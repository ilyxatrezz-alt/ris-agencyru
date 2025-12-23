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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative z-[60]"
      >
        <div 
          className="py-3 px-4"
          style={{
            background: "linear-gradient(90deg, #c41e3a 0%, #1a5f2a 25%, #c41e3a 50%, #1a5f2a 75%, #c41e3a 100%)",
            backgroundSize: "200% 100%",
            animation: "gradient 4s ease infinite",
          }}
        >
          <div className="container mx-auto flex items-center justify-center gap-3 relative">
            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-yellow-300 drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]" />
            </motion.div>
            
            <p className="text-white text-sm md:text-base font-semibold text-center drop-shadow-lg">
              {text}
            </p>
            
            <motion.div
              animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-yellow-300 drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]" />
            </motion.div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 h-7 w-7 text-white/80 hover:text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HolidayBanner;
