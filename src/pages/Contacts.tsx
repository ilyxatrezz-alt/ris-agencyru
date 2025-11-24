import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contacts = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      value: "+7 (XXX) XXX-XX-XX",
      description: "Звоните в рабочее время",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@g-target.ru",
      description: "Ответим в течение 2 часов",
    },
    {
      icon: MapPin,
      title: "География",
      value: "Работаем по всей России",
      description: "Офисы и удаленная работа",
    },
    {
      icon: Clock,
      title: "Режим работы",
      value: "Пн-Пт: 9:00 - 19:00",
      description: "Сб-Вс: по договоренности",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="text-gradient-primary">Свяжитесь</span> с нами
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Готовы обсудить ваш проект? Мы ответим в течение 2 часов и предложим решение
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-base border border-border/50"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary mx-auto mb-4">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                    <p className="text-primary font-semibold mb-1">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Why Contact Us */}
            <div className="max-w-4xl mx-auto">
              <div className="p-8 md:p-12 rounded-3xl bg-card shadow-card border border-border/50">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Что вы получите после <span className="text-gradient-accent">обращения?</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Быстрый ответ</h3>
                      <p className="text-sm text-muted-foreground">
                        Мы свяжемся с вами в течение 2 часов в рабочее время
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Бесплатная консультация</h3>
                      <p className="text-sm text-muted-foreground">
                        Обсудим ваш проект, поделимся опытом и идеями
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Аудит рекламы или сайта</h3>
                      <p className="text-sm text-muted-foreground">
                        Проанализируем текущую ситуацию и дадим рекомендации
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Коммерческое предложение</h3>
                      <p className="text-sm text-muted-foreground">
                        Предложим стратегию, сроки и стоимость работ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
