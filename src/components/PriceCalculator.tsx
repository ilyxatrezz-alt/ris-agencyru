import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Gift, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

interface Service {
  id: string;
  name: string;
  setupPrice: number;
  monthlyPercent?: number;
  monthlyFixed?: number;
  isBonus?: boolean;
}

const PriceCalculator = () => {
  const { settings } = useSiteSettingsMap();

  const title = getSetting(settings, "home_price_calculator_title", "Калькулятор Стоимости");
  const subtitle = getSetting(
    settings,
    "home_price_calculator_subtitle",
    "Рассчитайте стоимость продвижения за 1 минуту"
  );
  const leftTitle = getSetting(settings, "home_price_calculator_left_title", "Выберите услуги");
  const nicheLabel = getSetting(settings, "home_price_calculator_niche_label", "Ниша бизнеса");
  const rightTitle = getSetting(settings, "home_price_calculator_right_title", "Расчет стоимости");
  const rightSubtitle = getSetting(settings, "home_price_calculator_right_subtitle", "Прозрачное ценообразование");
  const discountText = getSetting(settings, "home_price_calculator_discount", "Скидка 10% за комплекс");
  const bonusText = getSetting(settings, "home_price_calculator_bonus", "Telegram в подарок!");
  const ctaText = getSetting(settings, "home_price_calculator_cta", "Получить предложение");
  const roiTitle = getSetting(settings, "home_price_calculator_roi_title", "Средний ROI клиентов");
  const roiValue = getSetting(settings, "home_price_calculator_roi_value", "+180%");
  const roiSubtitle = getSetting(settings, "home_price_calculator_roi_subtitle", "За первые 3 месяца");

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [niche, setNiche] = useState("");
  const [adBudget, setAdBudget] = useState([50000]);
  const [period, setPeriod] = useState("3");

  const services: Service[] = [
    {
      id: "website",
      name: "Создание сайта",
      setupPrice: 80000,
    },
    {
      id: "yandex",
      name: "Яндекс.Директ",
      setupPrice: 25000,
      monthlyPercent: 15,
      monthlyFixed: 20000,
    },
    {
      id: "vk",
      name: "ВКонтакте",
      setupPrice: 18000,
      monthlyPercent: 15,
      monthlyFixed: 15000,
    },
    {
      id: "telegram",
      name: "Telegram Ads",
      setupPrice: 15000,
      monthlyPercent: 15,
      monthlyFixed: 12000,
      isBonus: true,
    },
  ];

  const hasWebsite = selectedServices.includes("website");
  const hasYandex = selectedServices.includes("yandex");
  const hasVK = selectedServices.includes("vk");
  const hasTelegram = selectedServices.includes("telegram");
  const telegramIsBonus = hasWebsite && (hasYandex || hasVK);

  const calculateTotal = () => {
    let setupCost = 0;
    let monthlyCost = 0;

    selectedServices.forEach((serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      if (!service) return;

      if (service.id === "telegram" && telegramIsBonus) {
        return;
      }

      setupCost += service.setupPrice;

      if (service.monthlyPercent || service.monthlyFixed) {
        const percentCost = service.monthlyPercent ? (adBudget[0] * service.monthlyPercent) / 100 : 0;
        const fixedCost = service.monthlyFixed || 0;
        monthlyCost += Math.max(percentCost, fixedCost);
      }
    });

    if (selectedServices.length >= 3 && !telegramIsBonus) {
      setupCost *= 0.9;
      monthlyCost *= 0.9;
    }

    const totalForPeriod = setupCost + monthlyCost * parseInt(period);

    return {
      setup: Math.round(setupCost),
      monthly: Math.round(monthlyCost),
      total: Math.round(totalForPeriod),
      discount: selectedServices.length >= 3 && !telegramIsBonus,
    };
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => (prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]));
  };

  const costs = calculateTotal();

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5 w-full overflow-hidden">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
              {title.split(" ")[0]}{" "}
              <span className="text-gradient-primary">{title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {/* Левая часть - Настройки */}
            <div className="space-y-4 md:space-y-6 min-w-0">
              <Card className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">
                    {leftTitle}
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {services.map((service) => {
                      const isDisabled = service.id === "telegram" && telegramIsBonus && !hasTelegram;
                      const showBonus = service.id === "telegram" && telegramIsBonus && hasTelegram;

                      return (
                        <div
                          key={service.id}
                          className={`flex items-start gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 rounded-lg border-2 transition-base ${
                            selectedServices.includes(service.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Checkbox
                            id={service.id}
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={() => toggleService(service.id)}
                            disabled={isDisabled}
                            className="mt-0.5 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <Label
                              htmlFor={service.id}
                              className="text-xs sm:text-sm md:text-base font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 flex-wrap"
                            >
                              <span className="break-words">{service.name}</span>
                              {showBonus && (
                                <Badge
                                  variant="secondary"
                                  className="bg-accent text-accent-foreground text-[10px] sm:text-xs px-1 sm:px-2"
                                >
                                  <Gift className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                                  БОНУС
                                </Badge>
                              )}
                            </Label>
                            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                              {service.id === "website" && "Лендинг или сайт под ключ"}
                              {service.id === "yandex" && "Контекстная реклама"}
                              {service.id === "vk" && "Таргетированная реклама"}
                              {service.id === "telegram" && "Реклама в Telegram"}
                            </p>
                            {showBonus && (
                              <p className="text-[10px] sm:text-xs text-accent font-medium mt-1 sm:mt-2">
                                🎁 Бесплатно при покупке сайта + реклама!
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="niche" className="text-xs sm:text-sm md:text-base font-semibold">
                    {nicheLabel}
                  </Label>
                  <Select value={niche} onValueChange={setNiche}>
                    <SelectTrigger id="niche" className="mt-1.5 sm:mt-2 text-xs sm:text-sm">
                      <SelectValue placeholder="Выберите нишу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medicine-beauty">Медицина & Beauty</SelectItem>
                      <SelectItem value="construction">Строительство</SelectItem>
                      <SelectItem value="horeca">Рестораны</SelectItem>
                      <SelectItem value="lawyers">Юридические услуги</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedServices.some((s) => ["yandex", "vk", "telegram"].includes(s)) && (
                  <>
                    <div>
                      <Label className="text-xs sm:text-sm md:text-base font-semibold">
                        Бюджет: {adBudget[0].toLocaleString("ru-RU")} ₽/мес
                      </Label>
                      <Slider
                        value={adBudget}
                        onValueChange={setAdBudget}
                        min={20000}
                        max={500000}
                        step={10000}
                        className="mt-3 sm:mt-4"
                      />
                      <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">
                        <span>20 000 ₽</span>
                        <span>500 000 ₽</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="period" className="text-xs sm:text-sm md:text-base font-semibold">
                        Период ведения
                      </Label>
                      <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger id="period" className="mt-1.5 sm:mt-2 text-xs sm:text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 месяц</SelectItem>
                          <SelectItem value="3">3 месяца</SelectItem>
                          <SelectItem value="6">6 месяцев</SelectItem>
                          <SelectItem value="12">12 месяцев</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </Card>
            </div>

            {/* Правая часть - Результат */}
            <div className="space-y-4 md:space-y-6 min-w-0">
              <Card className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6 bg-card shadow-card-hover lg:sticky lg:top-4">
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                    {rightTitle}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">{rightSubtitle}</p>
                </div>

                <div className="space-y-2 sm:space-y-3 md:space-y-4 py-2 sm:py-3 md:py-4 border-y">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-muted-foreground">
                      Настройка:
                    </span>
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold whitespace-nowrap">
                      {costs.setup.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                  {costs.monthly > 0 && (
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-muted-foreground">
                        Ведение/мес:
                      </span>
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold whitespace-nowrap">
                        {costs.monthly.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                  )}
                  {costs.discount && (
                    <div className="flex items-center gap-1.5 sm:gap-2 text-accent text-[10px] sm:text-xs md:text-sm font-medium">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{discountText}</span>
                    </div>
                  )}
                  {telegramIsBonus && hasTelegram && (
                    <div className="flex items-center gap-1.5 sm:gap-2 text-accent text-[10px] sm:text-xs md:text-sm font-medium">
                      <Gift className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{bonusText}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
                      Итого за {period} мес:
                    </span>
                    <div>
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary">
                        {costs.total.toLocaleString("ru-RU")} ₽
                      </div>
                      {costs.monthly > 0 && (
                        <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                          + {adBudget[0].toLocaleString("ru-RU")} ₽/мес на рекламу
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="cta"
                    size="lg"
                    className="w-full text-xs sm:text-sm md:text-base h-10 sm:h-11 md:h-12"
                    asChild
                    disabled={selectedServices.length === 0}
                  >
                    <Link to="/contacts">{ctaText}</Link>
                  </Button>
                </div>

                <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 md:pt-4 border-t">
                  <div className="flex items-start gap-2 sm:gap-3 text-[10px] sm:text-xs md:text-sm">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Прогноз ROI до старта</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 text-[10px] sm:text-xs md:text-sm">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Еженедельные отчеты</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 text-[10px] sm:text-xs md:text-sm">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Гарантия снижения CPL</span>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-lg p-2 sm:p-3 md:p-4 border border-primary/20">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-primary">
                        {roiTitle}
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{roiValue}</p>
                      <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">{roiSubtitle}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
