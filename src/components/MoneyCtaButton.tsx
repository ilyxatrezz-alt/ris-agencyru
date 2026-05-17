import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  Check,
  Send,
  Sparkles,
  Stethoscope,
  HardHat,
  UtensilsCrossed,
  ShoppingBag,
  Briefcase,
  MoreHorizontal,
  PhoneCall,
  TrendingUp,
  MonitorSmartphone,
  Megaphone,
} from "lucide-react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Step = 0 | 1 | 2 | 3 | 4;

const NICHES = [
  { value: "medicine", label: "Медицина / Красота", Icon: Stethoscope },
  { value: "construction", label: "Строительство / Ремонт", Icon: HardHat },
  { value: "horeca", label: "HoReCa / Рестораны", Icon: UtensilsCrossed },
  { value: "ecommerce", label: "Интернет-магазин", Icon: ShoppingBag },
  { value: "services", label: "Услуги B2B / B2C", Icon: Briefcase },
  { value: "other", label: "Другое", Icon: MoreHorizontal },
];

const GOALS = [
  { value: "leads", label: "Поток заявок", Icon: PhoneCall },
  { value: "sales", label: "Рост продаж", Icon: TrendingUp },
  { value: "site", label: "Новый сайт", Icon: MonitorSmartphone },
  { value: "smm", label: "Соцсети / SMM", Icon: Megaphone },
];

const BUDGETS = [
  { value: "<50", label: "до 50 000 ₽" },
  { value: "50-150", label: "50 — 150 000 ₽" },
  { value: "150-500", label: "150 — 500 000 ₽" },
  { value: ">500", label: "более 500 000 ₽" },
];

const MoneyCtaButton = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(0);
  const [niche, setNiche] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const progress = ((step + 1) / 4) * 100;

  const handlePick = (setter: (v: string) => void, value: string, next: Step) => {
    setter(value);
    setTimeout(() => setStep(next), 180);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-telegram", {
        body: {
          formType: "money_quiz",
          name,
          phone,
          niche,
          goal,
          budget,
        },
      });
      if (error) throw error;
      setDone(true);
      toast({
        title: "План в работе!",
        description: "Свяжемся в течение 24 часов с готовой стратегией.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или позвоните нам напрямую.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = ["Ниша", "Цель", "Бюджет", "Контакты"];

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden bg-background">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[700px] sm:h-[700px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, hsl(9 96% 53% / 0.18), transparent 70%)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              Рекламный план за 24 часа
            </div>
            <h2 className="mt-4 text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Ответьте на <span className="text-primary">3 вопроса</span> —<br className="hidden sm:block" />
              {" "}составим стратегию роста бесплатно
            </h2>
          </motion.div>

          {/* Quiz card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-card rounded-3xl border border-border shadow-card overflow-hidden"
          >
            {/* Progress */}
            {!done && (
              <div className="px-5 sm:px-8 pt-5 sm:pt-7">
                <div className="flex items-center justify-between mb-3 text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                    {stepLabels.map((label, i) => (
                      <span
                        key={i}
                        className={`transition-colors ${
                          i === step ? "text-primary" : i < step ? "text-foreground" : ""
                        }`}
                      >
                        {i < step ? <Check className="inline w-3 h-3" /> : `0${i + 1}`}
                        <span className="hidden sm:inline ml-1">{label}</span>
                        {i < stepLabels.length - 1 && <span className="ml-1.5 sm:ml-2 opacity-30">/</span>}
                      </span>
                    ))}
                  </div>
                  <span className="text-primary font-black">{Math.round(progress)}%</span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Steps */}
            <div className="p-5 sm:p-8 min-h-[320px] flex flex-col">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">План в работе!</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Готовим персональную стратегию роста. Свяжемся с вами в течение 24 часов.
                    </p>
                  </motion.div>
                ) : step === 0 ? (
                  <motion.div
                    key="s0"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg sm:text-xl font-black mb-1">Чем занимается ваш бизнес?</h3>
                    <p className="text-sm text-muted-foreground mb-5">Выберите ближайшую нишу</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {NICHES.map((n) => (
                        <button
                          key={n.value}
                          onClick={() => handlePick(setNiche, n.value, 1)}
                          className={`group text-left p-3 sm:p-4 rounded-2xl border-2 transition-all hover:border-primary hover:bg-primary/5 ${
                            niche === n.value
                              ? "border-primary bg-primary/10"
                              : "border-border bg-background"
                          }`}
                        >
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <n.Icon className="w-5 h-5" strokeWidth={2} />
                          </div>
                          <div className="text-xs sm:text-sm font-bold leading-tight">{n.label}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg sm:text-xl font-black mb-1">Какая главная цель?</h3>
                    <p className="text-sm text-muted-foreground mb-5">Что важнее всего прямо сейчас</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {GOALS.map((g) => (
                        <button
                          key={g.value}
                          onClick={() => handlePick(setGoal, g.value, 2)}
                          className={`group text-left p-3 sm:p-4 rounded-2xl border-2 transition-all hover:border-primary hover:bg-primary/5 ${
                            goal === g.value
                              ? "border-primary bg-primary/10"
                              : "border-border bg-background"
                          }`}
                        >
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <g.Icon className="w-5 h-5" strokeWidth={2} />
                          </div>
                          <div className="text-xs sm:text-sm font-bold leading-tight">{g.label}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg sm:text-xl font-black mb-1">Бюджет на маркетинг в месяц?</h3>
                    <p className="text-sm text-muted-foreground mb-5">Подберём подходящий формат работы</p>
                    <div className="flex flex-col gap-2.5">
                      {BUDGETS.map((b) => (
                        <button
                          key={b.value}
                          onClick={() => handlePick(setBudget, b.value, 3)}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all hover:border-primary hover:bg-primary/5 ${
                            budget === b.value
                              ? "border-primary bg-primary/10"
                              : "border-border bg-background"
                          }`}
                        >
                          <span className="font-bold">{b.label}</span>
                          <ArrowRight className="w-4 h-4 opacity-40" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="s3"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-black mb-1">Куда отправить план?</h3>
                      <p className="text-sm text-muted-foreground">
                        Свяжемся в течение 24 часов с готовой стратегией
                      </p>
                    </div>
                    <Input
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={loading}
                      className="h-12"
                    />
                    <Input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      disabled={loading}
                      className="h-12"
                    />
                    <div className="flex items-start gap-2.5">
                      <Checkbox
                        id="privacy-quiz"
                        checked={privacy}
                        onCheckedChange={(c) => setPrivacy(c === true)}
                        disabled={loading}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor="privacy-quiz"
                        className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        Согласен на{" "}
                        <Link
                          to="/privacy-policy"
                          target="_blank"
                          className="text-primary underline hover:no-underline"
                        >
                          обработку персональных данных
                        </Link>
                      </label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        disabled={loading}
                        className="sm:w-auto"
                      >
                        Назад
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading || !privacy || !name || !phone}
                        className="flex-1 h-12 gradient-primary shadow-cta hover:shadow-glow font-bold text-base"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Получить план бесплатно
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Trust line */}
          {!done && (
            <p className="text-center text-xs text-muted-foreground mt-4">
              Без спама и навязчивых звонков · ИП Кузьмин А.А.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MoneyCtaButton;
