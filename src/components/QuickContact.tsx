import { Phone, Zap } from "lucide-react";
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

const QuickContact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    niche: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Заявка принята!",
      description: "Перезвоним в течение 15 минут",
    });
    setFormData({ name: "", phone: "", niche: "" });
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
                <span className="text-sm font-semibold">Быстрая связь</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black">
                Позвоните прямо сейчас
              </h3>
              <p className="text-muted-foreground">
                Или оставьте заявку — перезвоним за 15 минут
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="w-full md:w-auto gradient-primary shadow-cta hover:shadow-glow text-lg h-14 px-8 font-bold group"
                >
                  <a href="tel:+79493388689" className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Phone className="h-5 w-5" />
                    </motion.div>
                    +7 (949) 338-86-89
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
              <h4 className="text-lg font-bold mb-4 text-center">
                Быстрая заявка
              </h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12"
                />
                <Input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="h-12"
                />
                <Select
                  value={formData.niche}
                  onValueChange={(value) => setFormData({ ...formData, niche: value })}
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
                  className="w-full h-12 gradient-primary shadow-cta hover:shadow-glow font-bold"
                >
                  Перезвоните мне
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
