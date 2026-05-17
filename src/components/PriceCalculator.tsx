import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, TrendingUp, Gift, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useSiteSettingsMap, getSetting } from "@/hooks/useSiteSettings";

interface Service {
  id: string;
  name: string;
  setupPrice: number;
  monthlyPercent?: number;
  monthlyFixed?: number;
}

const useAnimatedNumber = (value: number, duration = 600) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    startRef.current = null;
    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(from + (to - from) * eased);
      setDisplay(v);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
};

const PriceCalculator = () => {
  const { settings } = useSiteSettingsMap();

  const title = getSetting(settings, "home_price_calculator_title", "Калькулятор Стоимости");
  const subtitle = getSetting(
    settings,
    "home_price_calculator_subtitle",
    "Настройте параметры продвижения в реальном времени"
  );
  const ctaText = getSetting(settings, "home_price_calculator_cta", "Получить предложение");
  const roiValue = getSetting(settings, "home_price_calculator_roi_value", "+180%");

  const [selectedServices, setSelectedServices] = useState<string[]>(["website"]);
  const [niche, setNiche] = useState("");
  const [adBudget, setAdBudget] = useState([50000]);
  const [period, setPeriod] = useState("3");

  const services: Service[] = [
    { id: "website", name: "Создание сайта", setupPrice: 80000 },
    { id: "yandex", name: "Яндекс.Директ", setupPrice: 25000, monthlyPercent: 15, monthlyFixed: 20000 },
    { id: "vk", name: "ВКонтакте", setupPrice: 18000, monthlyPercent: 15, monthlyFixed: 15000 },
    { id: "telegram", name: "Telegram Ads", setupPrice: 15000, monthlyPercent: 15, monthlyFixed: 12000 },
  ];

  const hasWebsite = selectedServices.includes("website");
  const hasYandex = selectedServices.includes("yandex");
  const hasVK = selectedServices.includes("vk");
  const hasTelegram = selectedServices.includes("telegram");
  const telegramIsBonus = hasWebsite && (hasYandex || hasVK);

  const hasAds = selectedServices.some((s) => ["yandex", "vk", "telegram"].includes(s));

  const calculateTotal = () => {
    let setupCost = 0;
    let monthlyCost = 0;

    selectedServices.forEach((serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      if (!service) return;
      if (service.id === "telegram" && telegramIsBonus) return;

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
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const costs = calculateTotal();
  const animated = useAnimatedNumber(costs.total);

  // ROI progress fill: scales with number of services selected
  const fillPercent = Math.min(100, 25 + selectedServices.length * 18);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Format with thousands grouping
  const formatRub = (n: number) => n.toLocaleString("ru-RU");

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-muted/30"
    >
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-background rounded-[28px] md:rounded-[40px] border border-border shadow-[0_24px_60px_-24px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 md:p-10 pb-4 sm:pb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <span className="text-primary text-lg font-medium leading-none">§</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Investment Calculator
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-2 md:mb-3">
              {title.split(" ")[0]}{" "}
              <span className="font-display-italic italic text-primary font-normal">
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm">{subtitle}</p>
          </div>

          {/* Service Chips */}
          <div className="px-6 sm:px-8 md:px-10 py-5 sm:py-6 border-y border-border bg-muted/40">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 md:mb-4 text-center font-semibold">
              Выберите услуги
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {services.map((service) => {
                const isActive = selectedServices.includes(service.id);
                const showBonus = service.id === "telegram" && telegramIsBonus && isActive;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`relative px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-full border-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "border-border bg-background text-foreground/70 hover:border-foreground/30"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {service.name}
                      {showBonus && (
                        <Gift className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            {telegramIsBonus && hasTelegram && (
              <p className="text-[11px] text-emerald-600 font-medium mt-3 text-center">
                🎁 Telegram Ads — в подарок к пакету
              </p>
            )}
            {costs.discount && (
              <p className="text-[11px] text-emerald-600 font-medium mt-2 text-center">
                ✓ Скидка 10% за комплекс уже применена
              </p>
            )}
          </div>

          {/* Massive Ticker */}
          <div className="p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
              Итого за {period} {parseInt(period) === 1 ? "месяц" : "мес."}
            </div>
            <div className="flex items-baseline justify-center gap-1.5 sm:gap-2 leading-none">
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] tabular-nums text-foreground">
                {formatRub(animated)}
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">₽</span>
            </div>

            {costs.monthly > 0 && (
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-3 tabular-nums">
                Настройка {formatRub(costs.setup)} ₽ + ведение {formatRub(costs.monthly)} ₽/мес
              </p>
            )}

            <div className="flex items-center gap-2 text-emerald-600 text-xs sm:text-sm font-semibold mt-3 sm:mt-4">
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ROI {roiValue} прогнозируемо
            </div>
          </div>

          {/* ROI Progress Bar */}
          <div className="px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 md:pb-10">
            <div className="relative w-full h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden mb-6 sm:mb-8">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/70 rounded-full shadow-[0_0_15px_rgba(250,55,20,0.4)]"
                initial={{ width: 0 }}
                animate={{ width: `${fillPercent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>

            {/* Niche + Budget + Period + CTA */}
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-semibold">
                    Ниша бизнеса
                  </div>
                  <Select value={niche} onValueChange={setNiche}>
                    <SelectTrigger className="bg-muted/60 border-border rounded-xl h-11 text-sm">
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
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-semibold">
                    Период
                  </div>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="bg-muted/60 border-border rounded-xl h-11 text-sm">
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
              </div>

              {hasAds && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                      Рекламный бюджет
                    </span>
                    <span className="text-sm font-bold tabular-nums">
                      {formatRub(adBudget[0])} ₽/мес
                    </span>
                  </div>
                  <Slider
                    value={adBudget}
                    onValueChange={setAdBudget}
                    min={20000}
                    max={500000}
                    step={10000}
                  />
                </div>
              )}

              <Button
                asChild
                size="lg"
                disabled={selectedServices.length === 0}
                className="w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-semibold text-base shadow-[0_20px_40px_-12px_hsl(var(--foreground)/0.3)]"
              >
                <Link to="/contacts" className="flex items-center justify-center gap-3">
                  {ctaText}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center sm:justify-between items-center gap-x-4 gap-y-2 text-[10px] sm:text-[11px] text-muted-foreground border-t border-border pt-5 sm:pt-6">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Прозрачное ценообразование
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Еженедельные отчеты
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Гарантия KPI
              </div>
            </div>

            {/* Social proof */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>
                <span className="font-bold text-foreground">+247</span> расчётов на этой неделе
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PriceCalculator;
