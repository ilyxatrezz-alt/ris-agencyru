import { Phone, Loader2, ArrowUpRight } from "lucide-react";
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
import { Checkbox } from "./ui/checkbox";
import { Link } from "react-router-dom";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const QuickContact = () => {
  const { toast } = useToast();
  const { settings } = useSiteSettingsMap();
  const [isLoading, setIsLoading] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
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
    <section className="relative bg-foreground text-background overflow-hidden border-t border-foreground/10">
      {/* Editorial header */}
      <div className="container mx-auto px-4 pt-20 md:pt-28 pb-10 md:pb-16">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-12 md:col-span-3">
            <span className="editorial-eyebrow text-background/50">§ — {badgeText}</span>
            <div className="h-px bg-background/20 mt-4" />
          </div>
          <motion.div
            className="col-span-12 md:col-span-9"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.035em] leading-[0.95] uppercase">
              Позвоните <span className="font-display-italic font-normal normal-case text-primary">прямо</span> сейчас
            </h2>
            <p className="mt-6 text-base md:text-lg text-background/60 max-w-xl">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Asymmetric body */}
      <div className="container mx-auto px-4 pb-20 md:pb-28">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-stretch">
          {/* Phone CTA — left, massive */}
          <motion.div
            className="col-span-12 md:col-span-7 flex flex-col justify-between gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-background/40 mb-4">
                / звонок напрямую
              </div>
              <a
                href={`tel:${phoneRaw}`}
                className="group block"
              >
                <div className="flex items-start gap-3">
                  <span className="font-display-italic text-3xl md:text-5xl text-primary italic leading-none mt-2">+</span>
                  <span className="text-[14vw] md:text-[8vw] lg:text-[6.5vw] font-black leading-[0.85] tracking-[-0.05em] text-background group-hover:text-primary transition-colors">
                    {phoneDisplay.replace(/^\+/, "")}
                  </span>
                </div>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <a
                href={`tel:${phoneRaw}`}
                className="inline-flex items-center gap-3 self-start text-sm font-bold uppercase tracking-[0.18em] group text-background"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-background group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5" />
                </span>
                <span>Позвонить сейчас</span>
              </a>
              <div className="hidden sm:block h-10 w-px bg-background/20" />
              <span className="font-display-italic text-lg md:text-xl text-background/50 italic">
                ответим в течение 60 секунд
              </span>
            </div>
          </motion.div>

          {/* Form — right, white card */}
          <motion.div
            className="col-span-12 md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-background text-foreground rounded-[28px] md:rounded-[36px] p-6 md:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl md:text-2xl font-black tracking-tight uppercase">{formTitle}</h4>
                <ArrowUpRight className="h-5 w-5 text-primary" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isLoading}
                  maxLength={100}
                  className="h-12 rounded-xl border-foreground/15 bg-transparent focus-visible:ring-primary"
                />
                <Input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  disabled={isLoading}
                  maxLength={30}
                  className="h-12 rounded-xl border-foreground/15 bg-transparent focus-visible:ring-primary"
                />
                <Select
                  value={formData.niche}
                  onValueChange={(value) => setFormData({ ...formData, niche: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-12 rounded-xl border-foreground/15 bg-transparent focus:ring-primary">
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

                <div className="flex items-start gap-3 pt-1">
                  <Checkbox
                    id="privacy-quick"
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                    disabled={isLoading}
                    className="mt-0.5"
                  />
                  <label htmlFor="privacy-quick" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    Я даю согласие на{" "}
                    <Link to="/privacy-policy" className="text-primary underline hover:no-underline" target="_blank">
                      обработку персональных данных
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !privacyAccepted}
                  className="w-full h-14 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-bold uppercase tracking-[0.12em] text-sm group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <span className="flex items-center gap-2">
                      {submitText}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;
