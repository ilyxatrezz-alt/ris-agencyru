import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Send } from "lucide-react";

const MONEY_EMOJIS = ["💵", "💰", "💸", "🤑", "💲"];

interface FlyingBill {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
}

let billId = 0;

const MoneyCtaButton = () => {
  const [bills, setBills] = useState<FlyingBill[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const spawnBills = useCallback(() => {
    const newBills: FlyingBill[] = Array.from({ length: 6 }, () => ({
      id: billId++,
      emoji: MONEY_EMOJIS[Math.floor(Math.random() * MONEY_EMOJIS.length)],
      x: (Math.random() - 0.5) * 300,
      y: -(Math.random() * 120 + 40),
      rotation: (Math.random() - 0.5) * 120,
      scale: 0.7 + Math.random() * 0.6,
      delay: Math.random() * 0.15,
    }));
    setBills((prev) => [...prev, ...newBills]);
    setTimeout(() => {
      setBills((prev) => prev.filter((b) => !newBills.find((nb) => nb.id === b.id)));
    }, 1200);
  }, []);

  useEffect(() => {
    if (!isHovering) return;
    spawnBills();
    const interval = setInterval(spawnBills, 800);
    return () => clearInterval(interval);
  }, [isHovering, spawnBills]);

  const handleClick = () => {
    spawnBills();
    window.open("https://t.me/ris_agency_bot", "_blank");
  };

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <motion.p
            className="text-muted-foreground text-sm sm:text-base text-center max-w-md"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Расскажите о бизнесе — составим план продвижения за&nbsp;24&nbsp;часа
          </motion.p>

          {/* Button wrapper with flying bills */}
          <div className="relative">
            {/* Flying money */}
            <AnimatePresence>
              {bills.map((bill) => (
                <motion.span
                  key={bill.id}
                  className="absolute left-1/2 top-1/2 pointer-events-none text-2xl sm:text-3xl select-none z-20"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 0.3,
                    rotate: 0,
                  }}
                  animate={{
                    x: bill.x,
                    y: bill.y,
                    opacity: 0,
                    scale: bill.scale,
                    rotate: bill.rotation,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: bill.delay,
                    ease: "easeOut",
                  }}
                >
                  {bill.emoji}
                </motion.span>
              ))}
            </AnimatePresence>

            {/* The button */}
            <motion.button
              onClick={handleClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onTouchStart={() => { setIsHovering(true); setTimeout(() => setIsHovering(false), 1500); }}
              className="relative z-10 gradient-primary text-white font-black text-base sm:text-lg md:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-cta hover:shadow-glow transition-shadow duration-300 flex items-center gap-3 uppercase tracking-wide"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              Получи рекламный план бесплатно
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyCtaButton;
