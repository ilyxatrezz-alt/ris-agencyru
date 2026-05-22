import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, Clock, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

const Contacts = () => {
  const { settings } = useSiteSettingsMap();

  const phone = getSetting(settings, "phone", "+7 (949) 021-51-51");
  const phoneRaw = getSetting(settings, "phone_raw", "+79490215151");
  const email = getSetting(settings, "email", "info@ris-agency.ru");
  const telegram = getSetting(settings, "telegram", "@ris_agency");
  const telegramUrl = getSetting(settings, "telegram_url", "https://t.me/ris_agency");
  const weekdays = getSetting(settings, "working_hours_weekdays", "Пн-Пт: 9:00 - 21:00");
  const weekend = getSetting(settings, "working_hours_weekend", "Сб-Вс: по договорённости");
  const callTime = getSetting(settings, "working_hours_call_time", "с 9:00 до 21:00");

  const heroTitle = getSetting(settings, "contacts_title", "Свяжитесь с нами");
  const heroSubtitle = getSetting(
    settings,
    "contacts_description",
    "Готовы обсудить ваш проект? Ответим за 15 минут и предложим решение, которое принесёт результат."
  );


  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      value: phone,
      description: `Звоните ${callTime}`,
      href: `tel:${phoneRaw}`,
    },
    {
      icon: Send,
      title: "Telegram",
      value: telegram,
      description: "Отвечаем за 15 минут",
      href: telegramUrl,
    },
    {
      icon: Mail,
      title: "Email",
      value: email,
      description: "Для коммерческих предложений",
      href: `mailto:${email}`,
    },
    {
      icon: Clock,
      title: "Режим работы",
      value: weekdays,
      description: weekend,
    },
  ];

  const benefits = [
    {
      title: "Ответ за 15 минут",
      description: "Не заставляем ждать. Менеджер свяжется с вами в течение 15 минут в рабочее время.",
    },
    {
      title: "Бесплатная консультация",
      description: "Разберём вашу ситуацию, ответим на вопросы и дадим рекомендации — без обязательств.",
    },
    {
      title: "Аудит текущей рекламы",
      description: "Проанализируем ваши кампании и найдём минимум 3 точки роста.",
    },
    {
      title: "Персональное предложение",
      description: "Подготовим стратегию, медиаплан и коммерческое предложение под ваши цели.",
    },
  ];

  const seoTitle = "Контакты — РИС";
  const seoDescription = "Контакты агентства РИС: телефон, Telegram, email и режим работы. Свяжитесь с нами и получите бесплатную консультацию.";
  const canonical = `${window.location.origin}/contacts`;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <Header />
      <main>
        {/* Hero */}
        <section className="py-24 bg-accent text-accent-foreground relative overflow-hidden noise">
          <div className="absolute inset-0 gradient-hero" />
          <motion.div
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full gradient-red-glow opacity-40"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black">
                <span className="text-gradient-primary">{heroTitle}</span>
              </h1>
              <p className="text-lg md:text-xl text-accent-foreground/70 max-w-2xl mx-auto">
                {heroSubtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const Wrapper = info.href ? "a" : "div";
                const wrapperProps = info.href
                  ? { href: info.href, target: info.href.startsWith("http") ? "_blank" : undefined }
                  : {};

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Wrapper
                      {...wrapperProps}
                      className="block text-center p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 hover:border-primary/30 group"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary mx-auto mb-4 shadow-cta group-hover:shadow-glow transition-all">
                        <Icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                      <p className="text-primary font-bold mb-1">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>

            {/* Why Contact Us */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-8 md:p-12 rounded-3xl bg-card shadow-card border border-border/50">
                <h2 className="text-3xl font-black mb-8 text-center">
                  Что вы получите после <span className="text-gradient-primary">обращения?</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary flex-shrink-0 shadow-cta">
                        <CheckCircle className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;
