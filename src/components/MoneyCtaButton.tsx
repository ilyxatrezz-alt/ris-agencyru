import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Send } from "lucide-react";

const MONEY_EMOJIS = ["💵", "💰", "💸", "🤑", "💲", "🪙", "💎"];

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
  const idleInterval = useRef<ReturnType<typeof setInterval>>();

  const spawnBills = useCallback((count = 5, spread = 250, height = 100) => {
    const newBills: FlyingBill[] = Array.from({ length: count }, () => ({
      id: billId++,
      emoji: MONEY_EMOJIS[Math.floor(Math.random() * MONEY_EMOJIS.length)],
      x: (Math.random() - 0.5) * spread,
      y: -(Math.random() * height + 30),
      rotation: (Math.random() - 0.5) * 150,
      scale: 0.6 + Math.random() * 0.8,
      delay: Math.random() * 0.2,
    }));
    setBills((prev) => [...prev, ...newBills]);
    setTimeout(() => {
      setBills((prev) => prev.filter((b) => !newBills.find((nb) => nb.id === b.id)));
    }, 1400);
  }, []);

  // Idle — spawn a couple bills every 3s even without hover
  useEffect(() => {
    idleInterval.current = setInterval(() => {
      if (!isHovering) spawnBills(2, 200, 70);
    }, 3000);
    return () => clearInterval(idleInterval.current);
  }, [isHovering, spawnBills]);

  // Hover — rapid spawn
  useEffect(() => {
    if (!isHovering) return;
    spawnBills(8, 350, 140);
    const interval = setInterval(() => spawnBills(6, 350, 140), 600);
    return () => clearInterval(interval);
  }, [isHovering, spawnBills]);

  const handleClick = () => {
    spawnBills(12, 400, 160);
    setTimeout(() => {
      window.open("https://t.me/ris_agency_bot", "_blank");
    }, 300);
  };

  return (
    <section className="py-10 sm:py-14 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-5">
          <motion.p
            className="text-muted-foreground text-sm sm:text-base text-center max-w-md"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Расскажите о бизнесе — составим план продвижения за&nbsp;24&nbsp;часа
          </motion.p>

          {/* Button wrapper */}
          <div className="relative">
            {/* Pulsing glow behind button */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "radial-gradient(ellipse at center, hsl(9 96% 53% / 0.4) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Flying money */}
            <AnimatePresence>
              {bills.map((bill) => (
                <motion.span
                  key={bill.id}
                  className="absolute left-1/2 top-1/2 pointer-events-none text-xl sm:text-2xl md:text-3xl select-none z-20"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 0.2,
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
                    duration: 1.1,
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
              onTouchStart={() => { setIsHovering(true); setTimeout(() => setIsHovering(false), 2000); }}
              className="relative z-10 gradient-primary text-white font-black text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-10 md:px-12 py-4 sm:py-5 rounded-2xl shadow-cta hover:shadow-glow transition-shadow duration-300 flex items-center gap-3 uppercase tracking-wide"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              }}
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
