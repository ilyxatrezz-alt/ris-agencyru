import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) return;
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    localStorage.setItem("cookie-consent", "accepted");
    setTimeout(() => setVisible(false), 600);
  };

  const handleDecline = () => {
    setAccepted(true);
    localStorage.setItem("cookie-consent", "declined");
    setTimeout(() => setVisible(false), 600);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[100]"
          initial={{ y: 200, opacity: 0, scale: 0.8, rotate: -3 }}
          animate={accepted 
            ? { y: 200, opacity: 0, scale: 0.5, rotate: 10 } 
            : { y: 0, opacity: 1, scale: 1, rotate: 0 }
          }
          exit={{ y: 200, opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl">
            {/* Decorative gradient strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            
            {/* Close button */}
            <button
              onClick={handleDecline}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-5 pt-6">
              {/* Cookie icon with bounce */}
              <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <motion.div
                  className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 shrink-0"
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Cookie className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="font-bold text-foreground text-base leading-tight">
                  Куки (cookie) 🍪
                </h3>
              </motion.div>

              <motion.p
                className="text-sm text-muted-foreground leading-relaxed mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Данный сайт использует файлы cookie (куки) для предоставления услуг и анализа посещаемости. Пользуясь сайтом, вы принимаете условия политики конфиденциальности.
              </motion.p>

              <motion.div
                className="flex items-center gap-2 text-xs text-muted-foreground/70 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Shield className="h-3.5 w-3.5 shrink-0" />
                <span>Ваши данные в безопасности</span>
              </motion.div>

              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={handleAccept}
                  className="flex-1 gradient-primary shadow-cta font-bold text-sm"
                  size="sm"
                >
                  Принять ✓
                </Button>
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="text-sm font-medium"
                  size="sm"
                >
                  Отклонить
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
