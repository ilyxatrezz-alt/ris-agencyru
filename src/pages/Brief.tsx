import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles, Send, Upload, X, FileImage } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type UploadedFile = { name: string; url: string };

type BriefData = {
  // Step 1 — Контакты
  name: string;
  phone: string;
  messenger: string;
  // Step 2 — Компания
  company: string;
  niche: string;
  geo: string;
  currentSite: string;
  products: string;
  competitors: string;
  // Step 3 — Задача
  siteType: string;
  goal: string;
  audience: string;
  // Step 4 — Функционал
  features: string[];
  // Step 5 — Дизайн
  style: string;
  colors: string[];
  colorCombo: string;
  references: string;
  designWishes: string;
  // Step 6 — Контент
  content: string;
  branding: string;
  logoFiles: UploadedFile[];
  photoFiles: UploadedFile[];
  // Step 7 — Сроки
  deadline: string;
  additional: string;
};

const initialData: BriefData = {
  name: "", phone: "", messenger: "",
  company: "", niche: "", geo: "", currentSite: "", products: "", competitors: "",
  siteType: "", goal: "", audience: "",
  features: [],
  style: "", colors: [], colorCombo: "", references: "", designWishes: "",
  content: "", branding: "", logoFiles: [], photoFiles: [],
  deadline: "", additional: "",
};

const SITE_TYPES = ["Лендинг (1 страница)", "Многостраничный сайт", "Интернет-магазин", "Корпоративный портал", "Квиз-сайт", "Не знаю — нужна консультация"];
const FEATURES = [
  "Форма заявки", "Онлайн-чат", "Калькулятор стоимости", "Каталог товаров/услуг",
  "Корзина и оплата", "Личный кабинет", "Блог / новости", "Интеграция с CRM",
  "Интеграция с 1С", "Мультиязычность", "SEO-оптимизация", "Подключение аналитики"
];
const STYLES = ["Минимализм", "Корпоративный строгий", "Яркий и продающий", "Премиум / люкс", "Креативный / необычный", "Доверюсь дизайнеру"];

// Палитра цветов для выбора
const COLOR_PALETTE = [
  { name: "Синий", hex: "#2563EB" },
  { name: "Голубой", hex: "#0EA5E9" },
  { name: "Бирюза", hex: "#14B8A6" },
  { name: "Зелёный", hex: "#22C55E" },
  { name: "Жёлтый", hex: "#EAB308" },
  { name: "Оранжевый", hex: "#F97316" },
  { name: "Красный", hex: "#EF4444" },
  { name: "Розовый", hex: "#EC4899" },
  { name: "Фиолетовый", hex: "#8B5CF6" },
  { name: "Индиго", hex: "#6366F1" },
  { name: "Чёрный", hex: "#0A0A0A" },
  { name: "Белый", hex: "#FFFFFF" },
  { name: "Серый", hex: "#6B7280" },
  { name: "Бежевый", hex: "#D6C7A8" },
  { name: "Золотой", hex: "#D4AF37" },
];

// Готовые сочетания
const COLOR_COMBOS = [
  { name: "Классика", colors: ["#0A0A0A", "#FFFFFF", "#2563EB"] },
  { name: "Премиум", colors: ["#0A0A0A", "#D4AF37", "#FFFFFF"] },
  { name: "Минимализм", colors: ["#FFFFFF", "#0A0A0A", "#6B7280"] },
  { name: "Яркий", colors: ["#F97316", "#0A0A0A", "#FFFFFF"] },
  { name: "Природа", colors: ["#22C55E", "#FFFFFF", "#D6C7A8"] },
  { name: "Технологии", colors: ["#0EA5E9", "#6366F1", "#0A0A0A"] },
  { name: "Энергия", colors: ["#EF4444", "#EAB308", "#0A0A0A"] },
  { name: "Уют", colors: ["#D6C7A8", "#8B5CF6", "#FFFFFF"] },
];

const DEADLINES = ["Срочно (до 2 недель)", "1 месяц", "2-3 месяца", "Не горит"];

const steps = [
  { id: 1, title: "Контакты", emoji: "👤" },
  { id: 2, title: "О компании", emoji: "🏢" },
  { id: 3, title: "Задача", emoji: "🎯" },
  { id: 4, title: "Функционал", emoji: "🛠" },
  { id: 5, title: "Дизайн", emoji: "🎨" },
  { id: 6, title: "Контент", emoji: "📦" },
  { id: 7, title: "Сроки", emoji: "⏱" },
];

const Brief = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BriefData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [skippedSteps, setSkippedSteps] = useState<number[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const SKIPPABLE_STEPS = [1, 2, 3, 6];
  const isSkipped = (s: number) => skippedSteps.includes(s);

  const skipStep = () => {
    if (!SKIPPABLE_STEPS.includes(step)) return;
    setSkippedSteps((prev) => prev.includes(step) ? prev : [...prev, step]);
    if (step < totalSteps) setStep(step + 1);
  };

  const totalSteps = steps.length;
  const progress = (step / totalSteps) * 100;

  const update = <K extends keyof BriefData>(key: K, value: BriefData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const toggleFeature = (f: string) => {
    setData((prev) => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter((x) => x !== f)
        : [...prev.features, f],
    }));
  };

  const toggleColor = (hex: string) => {
    setData((prev) => ({
      ...prev,
      colors: prev.colors.includes(hex)
        ? prev.colors.filter((c) => c !== hex)
        : [...prev.colors, hex],
      colorCombo: "", // сбрасываем готовое сочетание при ручном выборе
    }));
  };

  const selectCombo = (comboName: string, colors: string[]) => {
    setData((prev) => ({ ...prev, colorCombo: comboName, colors }));
  };

  const uploadFiles = async (
    files: FileList,
    folder: "logos" | "photos",
    setUploading: (v: boolean) => void,
    key: "logoFiles" | "photoFiles"
  ) => {
    setUploading(true);
    try {
      const uploaded: UploadedFile[] = [];
      for (const file of Array.from(files)) {
        if (file.size > 10 * 1024 * 1024) {
          toast({ title: "Файл слишком большой", description: `${file.name} больше 10MB`, variant: "destructive" });
          continue;
        }
        const ext = file.name.split(".").pop();
        const fileName = `brief/${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage.from("site-images").upload(fileName, file);
        if (error) throw error;
        const { data: pub } = supabase.storage.from("site-images").getPublicUrl(fileName);
        uploaded.push({ name: file.name, url: pub.publicUrl });
      }
      setData((prev) => ({ ...prev, [key]: [...prev[key], ...uploaded] }));
      if (uploaded.length) {
        toast({ title: "Загружено", description: `Файлов: ${uploaded.length}` });
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Ошибка загрузки", description: "Попробуйте ещё раз", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (key: "logoFiles" | "photoFiles", url: string) => {
    setData((prev) => ({ ...prev, [key]: prev[key].filter((f) => f.url !== url) }));
  };

  const canProceed = () => {
    if (isSkipped(step)) return true;
    switch (step) {
      case 1: return data.name.trim() && data.phone.trim();
      case 2: return data.company.trim() && data.niche.trim();
      case 3: return data.siteType && data.goal.trim();
      case 7: return privacyAccepted;
      default: return true;
    }
  };

  const next = () => step < totalSteps && setStep(step + 1);
  const prev = () => step > 1 && setStep(step - 1);

  const submit = async () => {
    if (!canProceed()) return;
    setIsLoading(true);
    try {
      const skippedLabels = skippedSteps
        .map((id) => steps.find((s) => s.id === id))
        .filter(Boolean)
        .map((s) => `${s!.emoji} ${s!.title}`)
        .join(", ");
      const payload = {
        ...data,
        colors: data.colors.join(", "),
        colorCombo: data.colorCombo,
        logoFiles: data.logoFiles.map((f) => `${f.name}: ${f.url}`).join("\n") || "—",
        photoFiles: data.photoFiles.map((f) => `${f.name}: ${f.url}`).join("\n") || "—",
        skippedSteps: skippedLabels || "—",
      };
      const { error } = await supabase.functions.invoke("send-telegram", {
        body: { formType: "brief", ...payload },
      });
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "Бриф отправлен! 🎉", description: "Свяжемся с вами в течение часа" });
    } catch (e) {
      console.error(e);
      toast({ title: "Ошибка отправки", description: "Попробуйте ещё раз или напишите в Telegram", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Бриф на создание сайта | РИС</title>
        <meta name="description" content="Заполните бриф на разработку сайта — получите готовое ТЗ и предложение от агентства РИС за 1 час" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> На главную
        </Link>

        {!submitted ? (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4" /> Бриф на создание сайта
              </div>
              <h1 className="text-3xl md:text-5xl font-black mb-3">
                Расскажите о проекте
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                7 коротких шагов — и вы получите готовое ТЗ + персональное предложение
              </p>
            </motion.div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-muted-foreground">
                  Шаг {step} из {totalSteps} • {steps[step - 1].emoji} {steps[step - 1].title}
                </span>
                <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />

              <div className="hidden md:flex justify-between mt-4">
                {steps.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => s.id < step && setStep(s.id)}
                    disabled={s.id > step}
                    className={`flex flex-col items-center gap-1 transition-all ${
                      s.id === step ? "scale-110" : s.id < step ? "opacity-100 cursor-pointer" : "opacity-40"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      s.id < step ? "bg-primary text-primary-foreground" :
                      s.id === step ? "bg-primary/20 text-primary border-2 border-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {s.id < step ? <Check className="h-4 w-4" /> : s.id}
                    </div>
                    <span className="text-[10px] font-medium hidden lg:block">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-10 shadow-card min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  {step === 1 && (
                    <>
                      <h2 className="text-2xl font-bold mb-1">Как с вами связаться?</h2>
                      <p className="text-muted-foreground text-sm mb-6">Эти контакты увидим только мы</p>
                      <div className="space-y-2">
                        <Label>Ваше имя *</Label>
                        <Input value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Иван" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Телефон *</Label>
                        <Input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+7 (___) ___-__-__" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Telegram или WhatsApp</Label>
                        <Input value={data.messenger} onChange={(e) => update("messenger", e.target.value)} placeholder="@username или номер" className="h-12" />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h2 className="text-2xl font-bold mb-1">Расскажите о компании</h2>
                      <p className="text-muted-foreground text-sm mb-6">Чем вы занимаетесь и где работаете</p>
                      <div className="space-y-2">
                        <Label>Название компании *</Label>
                        <Input value={data.company} onChange={(e) => update("company", e.target.value)} placeholder="ООО «Ромашка»" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Сфера деятельности *</Label>
                        <Input value={data.niche} onChange={(e) => update("niche", e.target.value)} placeholder="Стоматология / стройка / кафе…" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>География работы</Label>
                        <Input value={data.geo} onChange={(e) => update("geo", e.target.value)} placeholder="Донецк, ДНР, вся Россия…" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Текущий сайт (если есть)</Label>
                        <Input value={data.currentSite} onChange={(e) => update("currentSite", e.target.value)} placeholder="example.ru или «нет сайта»" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Основные продукты / услуги</Label>
                        <Textarea value={data.products} onChange={(e) => update("products", e.target.value)} placeholder="Что вы продаёте? Краткое описание основных товаров или услуг…" rows={3} />
                      </div>
                      <div className="space-y-2">
                        <Label>Прямые конкуренты</Label>
                        <Textarea value={data.competitors} onChange={(e) => update("competitors", e.target.value)} placeholder="Сайты или названия 2-5 конкурентов: konkurent1.ru, конкурент 2…" rows={2} />
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h2 className="text-2xl font-bold mb-1">Какой сайт нужен?</h2>
                      <p className="text-muted-foreground text-sm mb-6">Определимся с типом и задачей</p>
                      <div className="space-y-3">
                        <Label>Тип сайта *</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {SITE_TYPES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => update("siteType", t)}
                              className={`text-left p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                                data.siteType === t ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Главная цель сайта *</Label>
                        <Textarea value={data.goal} onChange={(e) => update("goal", e.target.value)} placeholder="Получать заявки, продавать товары, презентовать компанию…" rows={3} />
                      </div>
                      <div className="space-y-2">
                        <Label>Целевая аудитория</Label>
                        <Textarea value={data.audience} onChange={(e) => update("audience", e.target.value)} placeholder="Кто ваши клиенты? Возраст, пол, интересы…" rows={2} />
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <h2 className="text-2xl font-bold mb-1">Что должно быть на сайте?</h2>
                      <p className="text-muted-foreground text-sm mb-6">Выберите нужные функции (можно несколько)</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {FEATURES.map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => toggleFeature(f)}
                            className={`text-left p-3 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-2 ${
                              data.features.includes(f) ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                              data.features.includes(f) ? "bg-primary text-primary-foreground" : "border-2 border-border"
                            }`}>
                              {data.features.includes(f) && <Check className="h-3 w-3" />}
                            </div>
                            {f}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <h2 className="text-2xl font-bold mb-1">Дизайн и стиль</h2>
                      <p className="text-muted-foreground text-sm mb-6">Какой визуал вам ближе?</p>

                      <div className="space-y-3">
                        <Label>Стиль сайта</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {STYLES.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => update("style", s)}
                              className={`text-left p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                                data.style === s ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Палитра */}
                      <div className="space-y-3">
                        <Label>Выберите цвета (можно несколько)</Label>
                        <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                          {COLOR_PALETTE.map((c) => {
                            const selected = data.colors.includes(c.hex);
                            return (
                              <button
                                key={c.hex}
                                type="button"
                                onClick={() => toggleColor(c.hex)}
                                title={c.name}
                                className={`relative aspect-square rounded-xl border-2 transition-all hover:scale-110 ${
                                  selected ? "border-primary scale-110 shadow-glow" : "border-border/50"
                                }`}
                                style={{ backgroundColor: c.hex }}
                              >
                                {selected && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-background/90 rounded-full p-0.5">
                                      <Check className="h-3 w-3 text-primary" />
                                    </div>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {data.colors.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Выбрано: {data.colors.length} {data.colors.length === 1 ? "цвет" : "цвета"}
                          </p>
                        )}
                      </div>

                      {/* Готовые сочетания */}
                      <div className="space-y-3">
                        <Label>Или выберите готовое сочетание</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {COLOR_COMBOS.map((combo) => (
                            <button
                              key={combo.name}
                              type="button"
                              onClick={() => selectCombo(combo.name, combo.colors)}
                              className={`p-2 rounded-xl border-2 transition-all text-left ${
                                data.colorCombo === combo.name ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="flex gap-1 mb-2">
                                {combo.colors.map((c) => (
                                  <div key={c} className="flex-1 h-8 rounded-md border border-border/30" style={{ backgroundColor: c }} />
                                ))}
                              </div>
                              <span className="text-xs font-semibold">{combo.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Референсы (сайты, которые нравятся)</Label>
                        <Textarea value={data.references} onChange={(e) => update("references", e.target.value)} placeholder="apple.com, tilda.cc — что именно нравится?" rows={2} />
                      </div>
                    </>
                  )}

                  {step === 6 && (
                    <>
                      <h2 className="text-2xl font-bold mb-1">Контент и брендинг</h2>
                      <p className="text-muted-foreground text-sm mb-6">У вас уже есть материалы?</p>

                      <div className="space-y-2">
                        <Label>Тексты для сайта</Label>
                        <Textarea value={data.content} onChange={(e) => update("content", e.target.value)} placeholder="Готовы / напишем сами / нужна помощь копирайтера" rows={2} />
                      </div>

                      <div className="space-y-2">
                        <Label>Логотип и брендбук</Label>
                        <Textarea value={data.branding} onChange={(e) => update("branding", e.target.value)} placeholder="Есть логотип / нужно разработать / есть полный брендбук" rows={2} />
                      </div>

                      {/* Загрузка лого */}
                      <div className="space-y-2">
                        <Label>Загрузить логотип</Label>
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*,.pdf,.ai,.eps,.svg"
                          multiple
                          className="hidden"
                          onChange={(e) => e.target.files && uploadFiles(e.target.files, "logos", setUploadingLogo, "logoFiles")}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => logoInputRef.current?.click()}
                          disabled={uploadingLogo}
                          className="w-full h-12"
                        >
                          {uploadingLogo ? (
                            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Загружаем…</>
                          ) : (
                            <><Upload className="h-4 w-4 mr-2" /> Выбрать файл логотипа</>
                          )}
                        </Button>
                        {data.logoFiles.length > 0 && (
                          <div className="space-y-1 mt-2">
                            {data.logoFiles.map((f) => (
                              <div key={f.url} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                                <FileImage className="h-4 w-4 text-primary shrink-0" />
                                <span className="flex-1 truncate">{f.name}</span>
                                <button onClick={() => removeFile("logoFiles", f.url)} type="button" className="text-muted-foreground hover:text-destructive">
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Загрузка фото */}
                      <div className="space-y-2">
                        <Label>Загрузить фото для сайта</Label>
                        <input
                          ref={photoInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => e.target.files && uploadFiles(e.target.files, "photos", setUploadingPhoto, "photoFiles")}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => photoInputRef.current?.click()}
                          disabled={uploadingPhoto}
                          className="w-full h-12"
                        >
                          {uploadingPhoto ? (
                            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Загружаем…</>
                          ) : (
                            <><Upload className="h-4 w-4 mr-2" /> Выбрать фото (можно несколько)</>
                          )}
                        </Button>
                        {data.photoFiles.length > 0 && (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                            {data.photoFiles.map((f) => (
                              <div key={f.url} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                                <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                                <button
                                  onClick={() => removeFile("photoFiles", f.url)}
                                  type="button"
                                  className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">До 10MB на файл</p>
                      </div>
                    </>
                  )}

                  {step === 7 && (
                    <>
                      <h2 className="text-2xl font-bold mb-1">Сроки и пожелания</h2>
                      <p className="text-muted-foreground text-sm mb-6">Финальный шаг — почти всё!</p>

                      <div className="space-y-3">
                        <Label>Желаемые сроки</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {DEADLINES.map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => update("deadline", d)}
                              className={`text-left p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                                data.deadline === d ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                              }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Что ещё важно рассказать?</Label>
                        <Textarea value={data.additional} onChange={(e) => update("additional", e.target.value)} placeholder="Любые комментарии, пожелания, вопросы…" rows={4} />
                      </div>

                      <div className="flex items-start gap-3 pt-2">
                        <Checkbox id="privacy-brief" checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                        <label htmlFor="privacy-brief" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                          Я даю согласие на{" "}
                          <Link to="/privacy-policy" className="text-primary underline" target="_blank">
                            обработку персональных данных
                          </Link>
                        </label>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-3 mt-6">
              {SKIPPABLE_STEPS.includes(step) && step < totalSteps && (
                <button
                  type="button"
                  onClick={skipStep}
                  className="w-full text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors py-2"
                >
                  Это вы про меня уже знаете → пропустить шаг
                </button>
              )}

              <div className="flex justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={prev}
                  disabled={step === 1}
                  size="lg"
                  className="flex-1 sm:flex-none"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Назад
                </Button>

                {step < totalSteps ? (
                  <Button
                    onClick={next}
                    disabled={!canProceed()}
                    size="lg"
                    className="flex-1 gradient-primary shadow-cta hover:shadow-glow font-bold"
                  >
                    Далее <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={submit}
                    disabled={!canProceed() || isLoading}
                    size="lg"
                    className="flex-1 gradient-primary shadow-cta hover:shadow-glow font-bold"
                  >
                    {isLoading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Отправка…</>
                    ) : (
                      <>Отправить бриф <Send className="h-4 w-4 ml-2" /></>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary mb-6">
              <Check className="h-12 w-12" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">Бриф отправлен! 🎉</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Изучаем ваш проект и готовим персональное предложение. Свяжемся в течение часа.
            </p>
            <Button asChild size="lg" className="gradient-primary shadow-cta font-bold">
              <Link to="/">На главную</Link>
            </Button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Brief;
