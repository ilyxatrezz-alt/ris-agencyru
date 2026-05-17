import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, User, ArrowRight, Gift, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const ContactForm = () => {
  const { toast } = useToast();
  const { settings } = useSiteSettingsMap();

  const [isLoading, setIsLoading] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const badgeText = getSetting(settings, "home_contact_form_badge", "Бесплатный аудит для новых клиентов");
  const title = getSetting(settings, "home_contact_form_title", "Хватит терять клиентов!");
  const subtitle = getSetting(
    settings,
    "home_contact_form_subtitle",
    "Получите бесплатный аудит вашей рекламы или сайта. Найдём минимум 3 критические ошибки, которые прямо сейчас сливают ваш бюджет."
  );

  const nameLabel = getSetting(settings, "home_contact_form_name_label", "Ваше имя");
  const namePlaceholder = getSetting(settings, "home_contact_form_name_placeholder", "Как к вам обращаться?");

  const phoneLabel = getSetting(settings, "home_contact_form_phone_label", "Телефон");
  const phonePlaceholder = getSetting(settings, "home_contact_form_phone_placeholder", "+7 (___) ___-__-__");


  const messageLabel = getSetting(settings, "home_contact_form_message_label", "Расскажите о проекте (необязательно)");
  const messagePlaceholder = getSetting(
    settings,
    "home_contact_form_message_placeholder",
    "Какая у вас ниша? Какой бюджет планируете? Какие цели?"
  );

  const submitText = getSetting(settings, "home_contact_form_submit", "Получить бесплатный аудит");
  const privacyText = getSetting(
    settings,
    "home_contact_form_privacy",
    "Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Мы не передаём ваши данные третьим лицам."
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-telegram", {
        body: {
          formType: "contact",
          ...formData,
        },
      });

      if (error) throw error;

      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в течение 2 часов.",
      });
      setFormData({ name: "", phone: "", message: "" });
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
    <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden border-t border-foreground/10">
      {/* Editorial background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/30 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Editorial header */}
          <div className="grid grid-cols-12 gap-4 mb-12">
            <div className="col-span-12 md:col-span-3">
              <span className="editorial-eyebrow text-background/60">§ 05 — Контакт</span>
              <div className="editorial-rule mt-4 bg-background" />
              <div className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-[0.18em] font-semibold text-primary">
                <Gift className="h-4 w-4" />
                {badgeText}
              </div>
            </div>
            <motion.div
              className="col-span-12 md:col-span-9"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.035em] leading-[0.95] uppercase">
                {title.split("!")[0]}<span className="text-primary">!</span>
              </h2>
              <p className="mt-6 text-base md:text-lg text-background/70 max-w-xl">{subtitle}</p>
            </motion.div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-card p-8 md:p-12 rounded-3xl shadow-2xl space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4 text-primary" />
                  {nameLabel}
                </Label>
                <Input
                  id="name"
                  placeholder={namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isLoading}
                  className="h-12 border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold">
                  <Phone className="h-4 w-4 text-primary" />
                  {phoneLabel}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  disabled={isLoading}
                  className="h-12 border-border/50 focus:border-primary"
                />
              </div>
            </div>


            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold">
                {messageLabel}
              </Label>
              <Textarea
                id="message"
                placeholder={messagePlaceholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                disabled={isLoading}
                className="border-border/50 focus:border-primary resize-none"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy-contact"
                checked={privacyAccepted}
                onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                disabled={isLoading}
                className="mt-0.5"
              />
              <label htmlFor="privacy-contact" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                Я даю согласие на{" "}
                <Link to="/privacy-policy" className="text-primary underline hover:no-underline" target="_blank">
                  обработку персональных данных
                </Link>
              </label>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                type="submit"
                size="lg"
                disabled={isLoading || !privacyAccepted}
                className="w-full h-14 gradient-primary shadow-cta hover:shadow-glow text-sm sm:text-lg font-bold group px-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    {submitText}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
