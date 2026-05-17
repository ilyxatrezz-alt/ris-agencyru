import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, TrendingUp, Target, Lightbulb, Trophy, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Extended case narrative content keyed by case id
const caseExtras: Record<
  string,
  {
    subtitle: string;
    challenge: string;
    solution: string[];
    result: string;
    period: string;
    geo: string;
    services: string[];
  }
> = {
  "62cda3ef-ddb2-4c8a-93dc-3cc1f2a7fa43": {
    subtitle: "Личный бренд пластического хирурга мирового уровня",
    challenge:
      "Эксперт международного уровня без онлайн-присутствия: телефон молчит, заявки только по сарафану, нет инструмента, чтобы донести компетенции и регалии до премиальной аудитории.",
    solution: [
      "Спроектировали и собрали премиум-сайт с акцентом на регалиях, кейсах операций и личной экспертизе",
      "Запустили Яндекс.Директ с упором на горячие запросы по липоскульптуре и Body Contouring",
      "Добавили навык в Алису ИИ — голосовой поиск ведёт пациента сразу на запись",
      "Настроили сквозную аналитику и коллтрекинг",
    ],
    result:
      "Стабильный поток заявок на премиум-консультации, окупаемость рекламы x6.2 уже на 2-й месяц.",
    period: "3 месяца",
    geo: "Москва, Россия",
    services: ["Сайт-визитка эксперта", "Яндекс.Директ", "Навык в Алисе", "SEO + аналитика"],
  },
  "e09adb35-ae8e-4369-93d5-2ba37402f2c0": {
    subtitle: "Запуск американского D2C-бренда пептидов и косметики",
    challenge:
      "Новый бренд на перегретом рынке anti-aging в США. Нужно было одновременно построить интернет-магазин и упаковать перформанс-маркетинг на холодную аудиторию.",
    solution: [
      "Разработали интернет-магазин с продающими карточками товаров и быстрым чек-аутом",
      "Запустили рекламу Google Shopping + Performance Max на ключевые штаты",
      "Подняли воронку в Meta (Facebook + Instagram) с UGC-креативами",
      "Параллельно — виральные ролики и таргет в TikTok Ads на молодую аудиторию",
    ],
    result:
      "Бренд вышел на стабильную unit-экономику с ROAS x4.8 и средним чеком $89 уже к третьему месяцу.",
    period: "4 месяца",
    geo: "США",
    services: ["E-commerce сайт", "Google Ads", "Meta Ads (FB/IG)", "TikTok Ads", "Креативы UGC"],
  },
  "517eb8b9-2e81-4d37-8b79-6e0a8f37a848": {
    subtitle: "Премиум-бренд натуральных материалов для наращивания волос",
    challenge:
      "Бренд из Стамбула с сильным продуктом, но без перформанс-машины. Нужно было выйти на турецкий рынок и продавать русскоязычной аудитории в СНГ.",
    solution: [
      "Собрали многоязычный сайт (TR/RU/EN) с каталогом и онлайн-записью в шоурум",
      "Запустили Meta Ads на Турцию: коллекции, видео-демо, lookalike по покупателям",
      "Подключили Google Search + контекст на русскоязычных пользователей в СНГ",
      "Внедрили чат-бота в WhatsApp для дожима горячих заявок",
    ],
    result:
      "x5.1 окупаемость рекламы, очередь на 3 недели вперёд по записи в шоурум.",
    period: "5 месяцев",
    geo: "Турция + СНГ",
    services: ["Многоязычный сайт", "Meta Ads", "Google Ads", "WhatsApp-бот"],
  },
};

const CaseSliderDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: caseItem, isLoading } = useQuery({
    queryKey: ["cases-slider-item", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases_slider_items")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Загружаем кейс…</div>
      </div>
    );
  }

  if (!caseItem) {
    return <Navigate to="/cases" replace />;
  }

  const extra = caseExtras[caseItem.id] || {
    subtitle: caseItem.description || "",
    challenge: caseItem.description || "",
    solution: [],
    result: "",
    period: "—",
    geo: "—",
    services: [],
  };

  const titleWords = caseItem.title.split(" ");
  const titleHead = titleWords.slice(0, -1).join(" ");
  const titleTail = titleWords.slice(-1)[0];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{caseItem.title} — Кейс РИС</title>
        <meta
          name="description"
          content={`${caseItem.title}: ${extra.subtitle}. Лидов ${caseItem.stats_leads}, CPL ${caseItem.stats_cpl}, ROI ${caseItem.stats_roi}.`}
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-20 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-primary font-bold">§</span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">
              Кейс / {caseItem.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.05] mb-6">
            {titleHead && <>{titleHead} </>}
            <span className="italic font-normal text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {titleTail}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
            {extra.subtitle}
          </p>

          {/* Hero image inside browser frame */}
          <div className="rounded-2xl border border-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden bg-background mb-12 md:mb-16">
            <div className="bg-muted/40 px-3 md:px-5 py-3 md:py-4 border-b border-border flex items-center gap-2">
              <div className="flex gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-muted-foreground/30" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-muted-foreground/30" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="mx-auto bg-background border border-border rounded-lg px-3 md:px-4 py-1 text-[10px] md:text-[11px] text-muted-foreground w-full max-w-sm text-center font-medium truncate">
                ris-agency.ru / case / {caseItem.category.toLowerCase()}
              </div>
            </div>
            <div className="bg-muted">
              <img
                src={`${caseItem.image_url}${caseItem.updated_at ? `?v=${encodeURIComponent(caseItem.updated_at)}` : ""}`}
                alt={`Кейс: ${caseItem.title}`}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16 md:mb-24 pb-12 border-b border-border">
            <div>
              <div className="text-3xl md:text-5xl font-bold text-primary mb-1">
                {caseItem.stats_leads}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground">
                Лидов
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-bold text-primary mb-1">
                {caseItem.stats_cpl}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground">
                Цена лида
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-bold text-primary mb-1 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 md:w-8 md:h-8" />
                {caseItem.stats_roi}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground">
                ROI
              </div>
            </div>
          </div>

          {/* Meta info row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2">
                География
              </div>
              <div className="text-lg font-semibold text-foreground">{extra.geo}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2">
                Срок работ
              </div>
              <div className="text-lg font-semibold text-foreground">{extra.period}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2">
                Услуги
              </div>
              <div className="flex flex-wrap gap-2">
                {extra.services.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-muted text-xs font-semibold text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Story blocks */}
          <div className="space-y-12 md:space-y-16">
            {/* Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Задача</h2>
                </div>
              </div>
              <div className="md:col-span-8">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {extra.challenge}
                </p>
              </div>
            </div>

            {/* Solution */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Решение</h2>
                </div>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-3">
                  {extra.solution.map((s, i) => (
                    <li key={i} className="flex gap-3 items-start text-base md:text-lg text-foreground">
                      <span className="text-primary font-bold mt-1">0{i + 1}</span>
                      <span className="text-muted-foreground leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Result */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Результат</h2>
                </div>
              </div>
              <div className="md:col-span-8">
                <p className="text-xl md:text-2xl text-foreground font-medium leading-snug">
                  {extra.result}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 md:mt-28 bg-foreground rounded-3xl p-8 md:p-14 text-background relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="text-xs uppercase tracking-widest font-bold text-background/60 mb-4">
                § Хотите такой же результат?
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                Обсудим ваш{" "}
                <span className="italic font-normal text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  проект
                </span>
              </h3>
              <p className="text-background/70 text-base md:text-lg mb-8">
                Бесплатная стратегическая сессия — разберём вашу нишу и покажем точки роста.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                  <Link to="/contacts">
                    <Phone className="w-4 h-4 mr-2" />
                    Получить план роста
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-background/20 bg-transparent text-background hover:bg-background/10">
                  <Link to="/cases">
                    Все кейсы
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseSliderDetail;
