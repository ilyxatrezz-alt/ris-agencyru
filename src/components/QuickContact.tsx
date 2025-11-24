import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuickContact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    niche: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Отправка в WhatsApp
    const message = `Новая заявка!\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nНиша: ${formData.niche}`;
    const whatsappUrl = `https://wa.me/79493388689?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время",
    });

    setFormData({ name: "", phone: "", niche: "" });
  };

  return (
    <div className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Кнопка звонка */}
            <div className="text-center md:text-left space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">
                Готовы увеличить прибыль?
              </h3>
              <p className="text-muted-foreground">
                Позвоните прямо сейчас или оставьте заявку — мы перезвоним в течение 15 минут
              </p>
              <Button
                variant="cta"
                size="xl"
                className="w-full md:w-auto"
                asChild
              >
                <a href="tel:+79493388689">
                  <Phone className="mr-2 h-5 w-5" />
                  +7 (949) 338-86-89
                </a>
              </Button>
            </div>

            {/* Форма */}
            <div className="bg-card p-6 rounded-2xl shadow-card">
              <h4 className="text-xl font-bold mb-4">Быстрая заявка</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="quick-name">Ваше имя</Label>
                  <Input
                    id="quick-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="Иван"
                  />
                </div>
                <div>
                  <Label htmlFor="quick-phone">Телефон</Label>
                  <Input
                    id="quick-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <Label htmlFor="quick-niche">Ниша бизнеса</Label>
                  <Select
                    value={formData.niche}
                    onValueChange={(value) =>
                      setFormData({ ...formData, niche: value })
                    }
                    required
                  >
                    <SelectTrigger id="quick-niche">
                      <SelectValue placeholder="Выберите нишу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medicine-beauty">Медицина & Beauty</SelectItem>
                      <SelectItem value="construction">Строительство & Коттеджи</SelectItem>
                      <SelectItem value="horeca">Рестораны & Общепит</SelectItem>
                      <SelectItem value="lawyers">Юридические услуги</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" variant="hero">
                  Получить консультацию
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickContact;
