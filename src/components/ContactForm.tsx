import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User, ArrowRight, Gift, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const ContactForm = () => {
  const { toast } = useToast();
  const { settings } = useSiteSettingsMap();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
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

  const emailLabel = getSetting(settings, "home_contact_form_email_label", "Email");
  const emailPlaceholder = getSetting(settings, "home_contact_form_email_placeholder", "email@example.com");

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
      setFormData({ name: "", phone: "", email: "", message: "" });
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
    <section className="py-24 gradient-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0_0%_100%/0.1),transparent_70%)]" />
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12 text-primary-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift className="h-4 w-4" />
              <span className="text-sm font-semibold">{badgeText}</span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-black mb-4">{title}</h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">{subtitle}</p>
          </motion.div>

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
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold">
                <Mail className="h-4 w-4 text-primary" />
                {emailLabel}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                className="h-12 border-border/50 focus:border-primary"
              />
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

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
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

            <p className="text-xs text-center text-muted-foreground">{privacyText}</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
