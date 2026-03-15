import { Phone, Zap, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const QuickContact = () => {
  const { toast } = useToast();
  const { settings } = useSiteSettingsMap();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    niche: "",
  });

  const phoneDisplay = getSetting(settings, "phone", "+7 (949) 882-33-51");
  const phoneRaw = getSetting(settings, "phone_raw", "+79498823351");

  const badgeText = getSetting(settings, "home_quick_contact_badge", "Быстрая связь");
  const title = getSetting(settings, "home_quick_contact_title", "Позвоните прямо сейчас");
  const subtitle = getSetting(
    settings,
    "home_quick_contact_subtitle",
    "Или оставьте заявку — перезвоним за 15 минут"
  );
  const formTitle = getSetting(settings, "home_quick_contact_form_title", "Быстрая заявка");
  const submitText = getSetting(settings, "home_quick_contact_submit", "Перезвоните мне");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-telegram", {
        body: {
          formType: "quick",
          ...formData,
        },
      });

      if (error) throw error;

      toast({
        title: "Заявка принята!",
        description: "Перезвоним в течение 15 минут",
      });
      setFormData({ name: "", phone: "", niche: "" });
    } catch (error) {
      console.error("Error sending form:", error);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позвонить нам напрямую",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(var(--primary)/0.1),transparent_50%)]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Call Button Section */}
            <motion.div
              className="text-center md:text-left space-y-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
                <Zap className="h-5 w-5" />
                <span className="text-sm font-semibold">{badgeText}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black">{title}</h3>
              <p className="text-muted-foreground">{subtitle}</p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="w-full md:w-auto gradient-primary shadow-cta hover:shadow-glow text-lg h-14 px-8 font-bold group"
                >
                  <a href={`tel:${phoneRaw}`} className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Phone className="h-5 w-5" />
                    </motion.div>
                    {phoneDisplay}
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Quick Form */}
            <motion.div
              className="p-6 rounded-2xl bg-card shadow-card border border-border/50"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-4 text-center">{formTitle}</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isLoading}
                  className="h-12"
                />
                <Input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  disabled={isLoading}
                  className="h-12"
                />
                <Select
                  value={formData.niche}
                  onValueChange={(value) => setFormData({ ...formData, niche: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Выберите нишу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicine">Медицина & Красота</SelectItem>
                    <SelectItem value="construction">Строительство</SelectItem>
                    <SelectItem value="horeca">HoReCa & Рестораны</SelectItem>
                    <SelectItem value="lawyers">Юридические услуги</SelectItem>
                    <SelectItem value="ecommerce">Интернет-магазин</SelectItem>
                    <SelectItem value="services">Услуги B2B/B2C</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 gradient-primary shadow-cta hover:shadow-glow font-bold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    submitText
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;
