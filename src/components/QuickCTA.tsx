import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

interface QuickCTAProps {
  variant?: "default" | "compact" | "gradient";
  text?: string;
  phone?: string;
  phoneRaw?: string;
  telegramUrl?: string;
}

const QuickCTA = ({ variant = "default", text, phone, phoneRaw, telegramUrl }: QuickCTAProps) => {
  const displayPhone = phone || siteConfig.phone;
  const rawPhone = phoneRaw || siteConfig.phoneRaw;
  const tgUrl = telegramUrl || siteConfig.telegramUrl;
  if (variant === "compact") {
    return (
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 pt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Button
          size="sm"
          className="gradient-primary shadow-cta gap-2"
          asChild
        >
          <a href={tgUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4" />
            Telegram
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-2"
          asChild
        >
          <a href={`tel:${rawPhone}`}>
            <Phone className="w-4 h-4" />
            Позвонить
          </a>
        </Button>
      </motion.div>
    );
  }

  if (variant === "gradient") {
    return (
      <motion.div
        className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">
              {text || "Готовы обсудить ваш проект?"}
            </h3>
            <p className="text-muted-foreground">
              Ответим за 30 минут в рабочее время
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="gradient-primary shadow-cta gap-2 group"
              asChild
            >
              <a href={tgUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Написать в Telegram
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-2"
              asChild
            >
              <a href={`tel:${rawPhone}`}>
                <Phone className="w-5 h-5" />
                {displayPhone}
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="text-muted-foreground font-medium">
        {text || "Хотите так же?"}
      </span>
      <div className="flex gap-3">
        <Button
          className="gradient-primary shadow-cta gap-2 group"
          asChild
        >
          <a href={tgUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4" />
            Telegram
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-2"
          asChild
        >
          <a href={`tel:${rawPhone}`}>
            <Phone className="w-4 h-4" />
            Позвонить
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

export default QuickCTA;
